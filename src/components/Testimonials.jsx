'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Vikram Singhania",
    role: "CEO, Horizon Ventures",
    quote: "White Wolf Infra doesn't just build apartments; they craft architectural masterpieces. Their commitment to RERA compliance and timely possession is truly world-class.",
    image: "/assets/testimoial/Pawan-Upadhaya.png"
  },
  {
    id: 2,
    name: "Ananya Deshmukh",
    role: "Luxury Interior Designer",
    quote: "As a designer, I highly appreciate the spatial planning of their premium layouts. Osiyan Habitat perfectly balances modern Vastu principles with contemporary utility.",
    image: "/assets/testimoial/Shruti-Purwar.png"
  },
  {
    id: 3,
    name: "Dr. Sameer Malhotra",
    role: "Senior Medical Consultant",
    quote: "Buying an ATS Sohna builder floor was the best investment for my family. The 3-tier security, power backup, and close-knit community vibe are exactly what we wanted.",
    image: "/assets/testimoial/Neeraj Patel.png"
  },
  {
    id: 4,
    name: "Meera Oberoi",
    role: "NRI Investor",
    quote: "The team at White Wolf Infra made the entire buying process seamless from abroad. Their digital site tours and completely transparent paperwork are exceptional.",
    image: "/assets/testimoial/Pooja-Galiyan.png"
  },
  {
    id: 5,
    name: "Kabir Thapar",
    role: "Tech Lead, Google",
    quote: "The 3D virtual walkthroughs and virtual reality site visits were a game changer. It helped us visualize our future 3BHK home with incredible precision before booking.",
    image: "/assets/testimoial/Kunwar-Udit.jpg.jpeg"
  }
];

function TestimonialCard({ item, isActive }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  return (
    <motion.div 
      onMouseMove={(e) => {
        if (!isActive) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={isActive ? { scale: 1.02, transition: { duration: 0.3 } } : {}}
      animate={{ 
          opacity: isActive ? 1 : 0.25,
          scale: isActive ? 1 : 0.8,
          filter: 'blur(0px)',
          zIndex: isActive ? 50 : 10
      }}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`w-full h-full bg-white border border-gray-100 rounded-[3rem] p-10 md:p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] flex flex-col justify-between group overflow-hidden relative ${isActive ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="relative z-10" style={{ transform: "translateZ(60px)" }}>
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#293659" className="text-brand-primary" />
            ))}
          </div>
          <Quote className="text-brand-primary/10" size={56} strokeWidth={1} />
        </div>
        
        <p className="text-xl md:text-2xl text-gray-800 font-bold leading-relaxed italic tracking-tight mb-8">
          "{item.quote}"
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-6 pt-8 border-t border-gray-100" style={{ transform: "translateZ(40px)" }}>
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 group-hover:border-brand-primary transition-colors duration-500 shadow-sm shrink-0">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 tracking-tight leading-none">{item.name}</h4>
          <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mt-2">{item.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const angleStep = 360 / testimonials.length;

  const rotateTo = (dir) => {
    setRotation(prev => prev + (dir * angleStep));
    setActiveIndex(prev => (prev - dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      rotateTo(-1);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="w-full bg-[#fafaf9] py-32 px-6 relative overflow-hidden font-sans min-h-[850px] flex items-center justify-center">
      {/* 3D Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(41,54,89,0.05)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 mb-6"
            >
              <span className="w-8 h-[1px] bg-brand-primary" />
              <span className="text-brand-primary font-bold tracking-[0.4em] text-[10px] uppercase">Testimonials</span>
              <span className="w-8 h-[1px] bg-brand-primary" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none"
            >
              VOICES OF <span className="text-brand-primary">TRUST.</span>
            </motion.h2>
        </div>

        {/* 3D Rotary Stage */}
        <div className="relative h-[550px] w-full flex items-center justify-center perspective-[1500px]">
          
          {/* Navigation Controls (Floating 3D) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-50 pointer-events-none">
            <button 
              onClick={() => rotateTo(1)}
              className="w-14 h-14 rounded-full border border-gray-200 bg-white shadow-xl flex items-center justify-center text-gray-900 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-500 pointer-events-auto group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => rotateTo(-1)}
              className="w-14 h-14 rounded-full border border-gray-200 bg-white shadow-xl flex items-center justify-center text-gray-900 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-500 pointer-events-auto group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* The 3D Wheel */}
          <motion.div
            animate={{ rotateY: rotation }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {testimonials.map((item, i) => {
              const itemAngle = i * angleStep;
              return (
                <div
                  key={item.id}
                  className="absolute w-[320px] md:w-[450px] min-h-[400px]"
                  style={{
                    transform: `rotateY(${itemAngle}deg) translateZ(480px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                  }}
                >
                  <TestimonialCard item={item} isActive={activeIndex === i} />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress Indicator (3D Line) */}
        <div className="mt-20 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const diff = i - activeIndex;
                rotateTo(-diff);
              }}
              className={`h-1 rounded-full transition-all duration-700 ${i === activeIndex ? 'w-12 bg-brand-primary' : 'w-3 bg-gray-200 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
