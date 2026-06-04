'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import KeyboardScroll from '../components/KeyboardScroll';
import WhyChooseUs from '../components/WhyChooseUs';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AboutUs from '../components/AboutUs';
import SmoothScroll from '../components/SmoothScroll';
import PromoPopup from '../components/PromoPopup';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsGlobalLoading(false);
  }, []);

  useEffect(() => {
    setHasMounted(true);
    window.scrollTo(0, 0);
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="bg-white min-h-screen relative" suppressHydrationWarning>
      <PromoPopup ready={!isGlobalLoading} />
      <SmoothScroll>
        {/* Global Premium Preloader */}
        <AnimatePresence>
          {isGlobalLoading && (
            <motion.div 
              key="global-loader"
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                  WHITE WOLF INFRA<span className="text-brand-primary">.</span>
                </h1>
                <div className="w-64 h-[1px] bg-white/10 rounded-full overflow-hidden relative mx-auto">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-brand-primary"
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-4 text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase">
                  Initializing Luxury // {progress}%
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className={`w-full relative ${isGlobalLoading ? 'h-screen overflow-hidden' : ''}`}>
          <Navbar />
          {/* Pass state up from KeyboardScroll */}
          <KeyboardScroll 
            onProgress={setProgress} 
            onLoadComplete={handleLoadComplete} 
          />
          {!isGlobalLoading && (
            <>
              <AboutUs />
              <WhyChooseUs />
              <Features />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          )}
        </main>
      </SmoothScroll>
    </div>
  );
}
