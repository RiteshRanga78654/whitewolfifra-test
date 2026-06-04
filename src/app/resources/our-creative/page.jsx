'use client';

import React, { useRef, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import EditorialStatement from '../../../components/EditorialStatement';
import CreativeSlider from '../../../components/CreativeSlider';

const trailImages = [
  "/creative/herosectio/1 (1).webp",
  "/creative/herosectio/1_11 - Photo.webp",
  "/creative/herosectio/1_12 - Photo.webp",
  "/creative/herosectio/1_15 - Photo.webp",
  "/creative/herosectio/1_17 - Photo.webp",
  "/creative/herosectio/1_18 - Photo.webp",
  "/creative/herosectio/1_19 - Photo.webp",
  "/creative/herosectio/1_22 - Photo.webp",
  "/creative/herosectio/1_23 - Photo.webp",
  "/creative/herosectio/1_24 - Photo.webp",
  "/creative/herosectio/1_41 - Photo.webp",
  "/creative/herosectio/1_42 - Photo.webp",
  "/creative/herosectio/1_44 - Photo.webp",
  "/creative/herosectio/1_45 - Photo.webp",
  "/creative/herosectio/1_46 - Photo.webp",
];

// Create an array of 12 images to cycle through
const duplicatedImages = [...trailImages, ...trailImages];

function CreativeHero() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const mouseScreenPos = useRef({ x: 0, y: 0 });
  const mouseInside = useRef(false);
  const imageIndex = useRef(0);
  const timeoutsRef = useRef({});

  // Cleanup timeouts on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, []);

  // Extremely fast imperative mouse/scroll trail handler (Bypasses React State entirely)
  const triggerTrail = (clientX, clientY) => {
    if (!containerRef.current || !mouseInside.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const distance = Math.hypot(x - lastMousePos.current.x, y - lastMousePos.current.y);

    // Spawn new images when the distance threshold is crossed (either by mouse move or smooth scrolling)
    if (distance > 130) {
      lastMousePos.current = { x, y };

      const currentIndex = imageIndex.current % duplicatedImages.length;
      const node = itemsRef.current[currentIndex];
      if (!node) return;

      // 1. Instantly snap to cursor position and update z-index
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.zIndex = imageIndex.current;
      node.style.transform = `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 20}deg)`;

      // 2. Imperatively Animate IN — fast & visible
      animate(node,
        { opacity: [0, 1], scale: [0.75, 1] },
        { duration: 0.15, ease: "easeOut" }
      );

      // 3. Queue the Animate OUT — quick fade
      clearTimeout(timeoutsRef.current[currentIndex]);
      timeoutsRef.current[currentIndex] = setTimeout(() => {
        animate(node,
          { opacity: 0, scale: 0.9 },
          { duration: 0.35, ease: "easeIn" }
        );
      }, 350); // Shorter visible time = lighter feel

      imageIndex.current++;
    }
  };

  const handleMouseMove = (e) => {
    mouseInside.current = true;
    mouseScreenPos.current = { x: e.clientX, y: e.clientY };
    triggerTrail(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e) => {
    mouseInside.current = true;
    mouseScreenPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseLeave = () => {
    mouseInside.current = false;
  };

  // Sync scroll events with mouse trail spawning using Lenis!
  useLenis(() => {
    if (mouseInside.current) {
      triggerTrail(mouseScreenPos.current.x, mouseScreenPos.current.y);
    }
  });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-grow flex items-center justify-center overflow-hidden min-h-screen"
    >
      {/* Subtle Ambient Gradients for White Theme */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      {/* Imperative Mouse Trail Images - Pre-rendered for max performance */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {duplicatedImages.map((src, idx) => (
          <div
            key={idx}
            ref={(el) => (itemsRef.current[idx] = el)}
            className="absolute opacity-0 pointer-events-none overflow-hidden"
            style={{
              width: "clamp(150px, 14vw, 220px)",
              aspectRatio: "1/1",
              willChange: "transform, opacity",
              borderRadius: "14px",
              padding: "3px",
              boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
              background: "rgba(255,255,255,0.55)",
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ borderRadius: "12px" }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center pointer-events-none h-full">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15vw] md:text-[12vw] font-black text-black tracking-tighter leading-none whitespace-nowrap"
        >
          Our  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#293659] to-brand-primary">Creative</span>
        </motion.h1>
      </div>
    </section>
  );
}

export default function CreativePage() {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <div suppressHydrationWarning className="bg-white min-h-screen font-sans selection:bg-[#293659] selection:text-white flex flex-col">
          <CreativeHero />
          <EditorialStatement />
          <CreativeSlider />
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}