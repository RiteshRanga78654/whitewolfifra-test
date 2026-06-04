'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageSquare, Landmark, ShieldCheck, MapPin, Handshake } from 'lucide-react';

const reasons = [
  {
    phase: "PHASE 01",
    title: "Pioneers Not Beginners",
    desc: " Good Beginnings have Great Stories",
    sub: "At White Wolf Infra we empathize with the financial growth every consumers expects from a real estate investment so our intentions are aligned with the Do’s and Dont’s .",
    icon: MessageSquare,
    tags: [" Aligned Intentions for profit", "Emphasized efforts"]
  },
  {
    phase: "PHASE 02",
    title: "We solve",
    desc: "People like to get solved not sold ",
    sub: " At White Wolf Infra, we don’t just sell real estate — we simplify decision-making for our consumers.",
    icon: Landmark,
    tags: ["Realising Emotions ", "Solving Doubts"]
  },
  {
    phase: "PHASE 03",
    title: "Transparency",
    desc: "Transparency Builds Trust",
    sub: " Consumers seek innovation and trust in real estate; White Wolf Infra aims to deliver transparent, principle-driven communication since entering the industry.",
    icon: ShieldCheck,
    tags: ["Genuine Communication", " Principles over Privileges"]
  },
  {
    phase: "PHASE 04",
    title: "Leadership",
    desc: "Leadership Through Knowledge",
    sub: "Many want the rewards of leadership but few want the challenges. We take the harder path to build trust and provide a worthy and secure environment for our consumers and employees.",
    icon: MapPin,
    tags: ["Leadership ensures ethnicity", "Ensures Objectives Achievement "]
  },
  {
    phase: "PHASE 05",
    title: "Hassle free Paper Work ",
    desc: "Happy to be with your hassles",
    sub: "We assure seamless process of every paper work which is actually a vital element of the info of your financial transaction and product allotment.",
    icon: Handshake,
    tags: ["Paper work made easy", "Allotment Is on us"]
  }
];

function TiltCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border-t-[8px] border-[#293659] relative group"
    >
      <motion.div
        style={{
          background: "radial-gradient(circle at center, rgba(41, 54, 89, 0.1) 0%, transparent 70%)",
          left: useTransform(x, [-0.5, 0.5], ["-50%", "50%"]),
          top: useTransform(y, [-0.5, 0.5], ["-50%", "50%"]),
        }}
        className="absolute inset-0 pointer-events-none blur-3xl z-0"
      />
      <div className="relative z-10" style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section className="relative bg-[#f5f5f5] font-geist pb-[10vh]">
      
      {/* Section Header */}
      <div className="absolute top-10 md:top-16 left-0 w-full flex justify-center z-40 pointer-events-none">
        <h1 className="text-3xl md:text-5xl font-serif text-[#1a1a1a] uppercase tracking-[0.2em] text-center px-4">
          Why Choose Us
        </h1>
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10 pt-28 md:pt-0">
        <div className="flex flex-col md:flex-row relative items-start gap-0 md:gap-12">
          
          {/* Left Column (Sticky Content - Desktop Only) */}
          <div className="hidden md:flex w-5/12 h-screen sticky top-0 flex-col justify-center pt-20 z-30 bg-transparent will-change-transform">
            <div className="relative w-full h-[400px]">
              {reasons.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: activePhase === i ? 1 : 0, 
                    y: activePhase === i ? 0 : (activePhase > i ? -30 : 30),
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-12 h-[2px] bg-[#293659]" />
                    <span className="text-[#293659] font-bold tracking-[0.2em] text-xs uppercase">{item.phase}</span>
                  </div>
                  <h2 className="text-6xl font-serif text-black mb-6 leading-[1.1]">
                    {item.title}<span className="text-[#293659]">.</span>
                  </h2>
                  <p className="text-2xl text-[#4b5563] font-medium italic line-clamp-none">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Pagination at Bottom Left */}
            <div className="absolute bottom-20 left-0 flex items-center gap-6 w-auto px-0">
              <span className="text-sm font-bold text-[#293659]">01</span>
              <div className="w-48 h-[2px] bg-gray-300 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-[#293659]"
                  animate={{ width: `${((activePhase + 1) / reasons.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm font-bold text-gray-400">0{reasons.length}</span>
            </div>
          </div>

          {/* Right Column (Scrolling Cards) - Desktop Only */}
          <div className="hidden md:flex w-full md:w-7/12 py-10 md:py-[25vh] pb-[10vh] md:pb-[20vh] flex-col gap-10 md:gap-[40vh] perspective-[2000px] z-10 relative">
            {reasons.map((item, i) => (
              <motion.div
                key={i}
                onViewportEnter={() => setActivePhase(i)}
                viewport={{ margin: "-30% 0px -30% 0px" }} // Trigger when card reaches middle of viewport
                className="will-change-transform"
              >
                <TiltCard>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 flex items-center justify-center text-[#293659] shadow-inner shrink-0">
                      <item.icon size={28} className="md:w-9 md:h-9" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-[0.2em] uppercase bg-gray-50 px-4 md:px-6 py-2 md:py-3 rounded-full w-max">
                      SYSTEM 0{i + 1}
                    </span>
                  </div>

                  <div className="border-l-4 border-[#293659] pl-8 mb-12 py-2">
                    <p className="text-lg md:text-xl text-[#4b5563] leading-relaxed">
                      {item.sub}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] text-gray-400 mb-5 uppercase">Specifications</p>
                    <div className="flex flex-wrap gap-3">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs font-bold text-[#293659] bg-[#293659]/5 px-5 py-2.5 rounded-lg tracking-wider border border-[#293659]/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Mobile Stacking Cards Layout */}
          <div className="md:hidden flex flex-col relative w-full pt-10 pb-[5vh]">
            {reasons.map((item, i) => (
              <div 
                key={i} 
                className={`sticky flex items-start justify-center w-full ${i !== reasons.length - 1 ? 'mb-[40vh]' : 'mb-0'}`}
                style={{ top: `calc(15vh + ${i * 1.5}rem)`, zIndex: i + 10 }}
              >
                {/* Mobile Card Design */}
                <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.15)] border-t-[6px] border-[#293659]">
                  {/* Title & Phase */}
                  <div className="mb-6 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-6 h-[2px] bg-[#293659]" />
                      <span className="text-[#293659] font-bold tracking-[0.2em] text-[10px] uppercase">{item.phase}</span>
                    </div>
                    <h2 className="text-2xl font-serif text-black mb-2 leading-tight">
                      {item.title}<span className="text-[#293659]">.</span>
                    </h2>
                    <p className="text-sm text-[#4b5563] font-medium italic">
                      {item.desc}
                    </p>
                  </div>

                  {/* Icon & Sub */}
                  <div className="flex items-center justify-between mb-6 gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-[#293659] shadow-inner shrink-0">
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase bg-gray-50 px-4 py-2 rounded-full w-max">
                      SYSTEM 0{i + 1}
                    </span>
                  </div>

                  <div className="border-l-[3px] border-[#293659] pl-4 mb-6 py-1">
                    <p className="text-sm text-[#4b5563] leading-relaxed">
                      {item.sub}
                    </p>
                  </div>

                  {/* Specs */}
                  <div>
                    <p className="text-[9px] font-black tracking-[0.3em] text-gray-400 mb-3 uppercase">Specifications</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold text-[#293659] bg-[#293659]/5 px-3 py-1.5 rounded-lg tracking-wider border border-[#293659]/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
