'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Specs() {
  const specs = [
    { label: "Structure", value: "RCC Framed Structure (Anti-Seismic)" },
    { label: "Flooring", value: "Premium Italian Marble & Hardwood" },
    { label: "Connectivity", value: "High-Speed Fiber & Smart Hub Ready" },
    { label: "Energy", value: "Solar Hybrid System & EV Charging" },
    { label: "Security", value: "AI-Powered 24/7 Surveillance" },
    { label: "Eco Rating", value: "Gold Certified Sustainable Building" },
  ];

  return (
    <section id="specs" className="w-full bg-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end border-b border-black/10 pb-8 mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-black tracking-tighter text-left">Technical <br/>Specifications</h2>
          <p className="text-black/40 mb-2 font-mono text-sm hidden md:block">ISO 9001:2015 // WHITE WOLF</p>
        </motion.div>

        <div className="flex flex-col">
          {specs.map((spec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex justify-between py-6 border-b border-black/5 group"
            >
              <span className="text-black/50 text-lg font-medium group-hover:text-black transition-colors">{spec.label}</span>
              <span className="text-black font-bold text-lg text-right">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
