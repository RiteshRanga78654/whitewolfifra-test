'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';

const FRAME_COUNT = 192;
const currentFrameBase = (index) => `/whitewolfsequence/${index.toString().padStart(5, '0')}.jpg`;

export default function Hero({ onProgress, onLoadComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(0);

  // Scroll mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const imagesArr = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        if (isMounted) setLoaded(prev => prev + 1);
      };
      img.onerror = () => {
        if (isMounted) setLoaded(prev => prev + 1);
      };
      img.src = currentFrameBase(i);
      imagesArr.push(img);
    }
    setImages(imagesArr);
    
    return () => { isMounted = false; };
  }, []);

  // Sync progress and completion to parent
  useEffect(() => {
    const p = Math.round((loaded / FRAME_COUNT) * 100);
    if (onProgress) onProgress(p);
    if (loaded >= FRAME_COUNT && onLoadComplete) {
      setTimeout(onLoadComplete, 500); // Slight delay for smooth transition
    }
  }, [loaded, onLoadComplete, onProgress]);

  // Map scroll progress to frame index
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    let requestId;
    const render = () => {
      const indexVal = frameIndex.get();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(indexVal)));
      const img = images[idx];
      
      const displayImg = (img && img.complete && img.naturalWidth !== 0) ? img : images[0];
      
      if (!displayImg || !displayImg.complete || displayImg.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
      
      const scaleX = canvas.width / displayImg.width;
      const scaleY = canvas.height / displayImg.height;
      const scale = Math.max(scaleX, scaleY);
      
      const width = displayImg.width * scale;
      const height = displayImg.height * scale;
      
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(displayImg, x, y, width, height);
    };

    render();

    const unsubscribe = frameIndex.on("change", () => {
      cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(render);
    });
    
    window.addEventListener("resize", render);
    
    return () => {
      unsubscribe();
      cancelAnimationFrame(requestId);
      window.removeEventListener("resize", render);
    };
  }, [images, loaded]);

  const textOpacity = useTransform(smoothProgress, [0, 0.05, 0.8, 0.95], [1, 0, 0, 1]);
  const textY = useTransform(smoothProgress, [0, 0.05, 0.8, 0.95], [0, -20, 20, 0]);
  const textScale = useTransform(smoothProgress, [0.8, 0.95], [0.9, 1]);

  return (
    <div ref={containerRef} className="h-[400vh] w-full bg-black relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80 pointer-events-none z-10" />

        <motion.div 
          style={{ 
            opacity: textOpacity,
            y: textY,
            scale: textScale
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20 mt-40"
        >
          <motion.h1 
            className="text-4xl md:text-[7.5rem] font-black text-white tracking-tighter mb-4 leading-tight drop-shadow-2xl whitespace-nowrap"
          >
            WHITE WOLF INFRA<span className="text-brand-primary">.</span>
          </motion.h1>
          <p className="text-lg md:text-xl text-white/90 font-bold tracking-[0.3em] uppercase mt-8">
            Building Landmarks & Creating Legacies
          </p>
          
          {/* Scroll Completion Indicator */}
          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0.95, 1], [0, 1]) }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
          
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#293659] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
