'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CRM_URL = 'https://white-wolf-infra.ftroverseas.com/';

export default function CrmButton() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.6, y: 20 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.6,
        }}
        className="fixed bottom-6 right-8 z-[1000]"
      >
        <motion.a
          href={CRM_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#293659] text-white border-[3px] border-white shadow-[0_15px_35px_rgba(37,99,235,0.35),0_5px_15px_rgba(0,0,0,0.1)] group overflow-hidden transition-colors duration-300 hover:bg-blue-700"
        >
          {/* Gloss Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#293659] via-transparent to-white/20 pointer-events-none" />

          {/* Hover Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Shine Effect */}
          <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-40 group-hover:left-[150%] transition-all duration-700 ease-in-out pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-1 transition-transform duration-300 group-hover:scale-105">
            <svg
              className="w-6 h-6 text-white drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>

            <span className="text-[10px] tracking-[0.2em] font-bold uppercase ml-[0.2em]">
              CRM
            </span>
          </div>

          {/* Animated Status Dot */}
          <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
        </motion.a>
      </motion.div>
    </AnimatePresence>
  );
}