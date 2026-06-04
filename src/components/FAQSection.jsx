"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

function TiltHeader({ title, subtitle, center = true }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const words = title.split(' ');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 ${center ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1px] w-12 bg-[#293659]/20" />
          <span className="text-[0.7rem] uppercase tracking-[0.4em] font-bold text-[#293659]">{subtitle}</span>
          <div className="h-[1px] w-12 bg-[#293659]/20" />
        </div>
      )}
      
      <div 
        className="relative py-4 cursor-default"
        style={{ perspective: "1200px" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
      >
        <motion.h2
          style={{ 
            rotateX, rotateY, transformStyle: "preserve-3d",
            fontSize: "clamp(2rem, 4vw, 3.2rem)"
          }}
          className="font-black text-[#111827] tracking-tighter uppercase relative"
        >
          {words.map((word, i) => (
            <motion.span 
              key={i}
              style={{ 
                z: (i + 1) * 30, 
                display: "inline-block", 
                transformStyle: "preserve-3d",
                marginRight: "0.25em"
              }}
              className={i === words.length - 1 ? "text-[#293659]" : ""}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </motion.div>
  );
}

const FAQ_DATA = [
  {
    question: "Where exactly is Osiyan Habitat located?",
    answer: "Osiyan Habitat is strategically located in Sector 27, Jhajjar, Haryana. It enjoys excellent connectivity to the Delhi-Jaipur Highway (NH-48) and is part of a rapidly developing residential hub."
  },
  {
    question: "Is Osiyan Habitat a RERA approved project?",
    answer: "Yes, Osiyan Habitat is a fully RERA-compliant project under the Deen Dayal Jan Awas Yojna (DDJAY). It meets all government regulations and infrastructure standards for residential plotting."
  },
  {
    question: "What are the plot sizes available in the township?",
    answer: "The township offers a variety of residential plot sizes designed to cater to different needs, typically ranging from 100 sq. yards to 180 sq. yards. Please contact our sales team for the current availability."
  },
  {
    question: "What basic amenities are provided in the project?",
    answer: "The project features a grand entrance gate, 24/7 gated security, wide internal black-topped roads, landscaped parks, efficient drainage systems, and dedicated commercial spaces for daily needs."
  },
  {
    question: "How is the connectivity to Gurugram and Delhi?",
    answer: "The location offers seamless connectivity via the NH-48. Gurugram (Cyber City) is approximately 50-60 minutes away, making it a viable option for those looking for a peaceful lifestyle with access to major employment hubs."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-[#f7f3ee]">
      <div className="max-w-4xl mx-auto">
        <TiltHeader 
          title="Frequently Asked Questions." 
          subtitle="Assistance" 
          center={true} 
        />
        <div className="text-center mb-12 -mt-8">
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Everything you need to know about Osiyan Habitat. Can't find the answer you're looking for? Reach out to our team.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className={`border transition-all duration-300 rounded-3xl overflow-hidden ${
                  isOpen ? 'border-[#293659] bg-white shadow-xl shadow-[#293659]/5' : 'border-gray-200 bg-[#fafaf9] hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 px-8 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                    isOpen ? 'text-[#293659]' : 'text-gray-800 group-hover:text-[#293659]'
                  }`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-[#293659]" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#293659]" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
                        <div className="pt-2 border-t border-gray-100">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
