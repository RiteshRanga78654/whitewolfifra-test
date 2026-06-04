'use client';

import React from 'react';
import { motion } from 'framer-motion';

const awards = [
  {
    year: "2025",
    title: "Best Luxury Plotted Development",
    institution: "International Real Estate Awards",
    icon: "🏆"
  },
  {
    year: "2024",
    title: "Excellence in Sustainable Infrastructure",
    institution: "Global Green Building Council",
    icon: "🌱"
  },
  {
    year: "2024",
    title: "Most Trusted Premium Developer",
    institution: "Asian Business Leadership Forum",
    icon: "💎"
  },
  {
    year: "2023",
    title: "Architectural Landmark of the Year",
    institution: "National Design Excellence",
    icon: "🏢"
  }
];

export default function Recognition() {
  return (
    <section className="w-full bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          {/* User requested: All heading in one line, maybe smaller font */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6 whitespace-nowrap overflow-hidden text-ellipsis">
            RECOGNITION <span className="text-white/20 mx-4">/</span> AWARDS & ACCOLADES<span className="text-brand-primary">.</span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl font-medium">
            Industry-leading excellence recognized by prestigious institutions worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/5 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                {award.icon}
              </div>
              <div className="mb-4">
                <span className="text-[10px] font-black text-brand-primary tracking-[0.3em] uppercase">
                  {award.year}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 leading-tight group-hover:text-brand-primary transition-colors">
                  {award.title}
                </h3>
              </div>
              <p className="text-xs text-white/30 font-medium tracking-wide">
                {award.institution}
              </p>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Dynamic Counter/Stat Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-20 border-t border-white/5 flex flex-wrap justify-between gap-12"
        >
          {[
            { label: "Awards Won", value: "24+" },
            { label: "Global Partners", value: "150+" },
            { label: "Projects Completed", value: "12+" },
            { label: "Years of Excellence", value: "15" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
