'use client';

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animationFrameId;
    let isHovering = false;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      
      // If hovering, width is 56px so offset is 28. Otherwise width is 36px so offset is 18.
      const offset = isHovering ? 28 : 18;
      ring.style.transform = `translate(${rx - offset}px, ${ry - offset}px)`;
      
      animationFrameId = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMouseMove);
    animateRing();

    // Hover logic for all interactive elements
    const handleMouseEnter = () => {
      isHovering = true;
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.opacity = '0.4';
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.opacity = '0.6';
    };

    // Use MutationObserver to attach events to newly rendered elements in React
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, [role="button"]').forEach(el => {
        // Prevent adding multiple listeners
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial attach
    document.querySelectorAll('a, button, input, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.querySelectorAll('a, button, input, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#b87333] rounded-full pointer-events-none z-[9999]" 
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-[36px] h-[36px] border border-[#b87333] rounded-full pointer-events-none z-[9998] opacity-60 transition-[width,height,opacity] duration-200" 
      />
      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
