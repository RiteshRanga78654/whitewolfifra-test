'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AboutUs = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[#fafaf9] relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#293659]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-gray-200/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-0"
            >
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white/20">
                <img 
                  src="/creative/herosectio/4_1 - Photo.webp" 
                  alt="Luxury Living"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-12 -right-12 md:-right-20 w-2/3 aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-[#fafaf9] hidden md:block"
              >
                <img 
                  src="/creative/herosectio/4_2 - Photo.webp" 
                  alt="Architecture Details"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute top-10 -left-6 md:-left-12 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col items-center justify-center text-center"
            >
              <span className="text-5xl md:text-6xl font-black text-[#293659] leading-none tracking-tighter">50+</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-3">Years of <br/>Legacy</span>
            </motion.div> */}
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <span className="w-12 h-[1px] bg-[#293659]" />
                <span className="text-[#293659] font-bold tracking-[0.3em] text-[10px] uppercase">Established 2011</span>
              </motion.div>
              
              {/* High-End CSS 3D Tilt Effect */}
              <div 
                className="relative py-4 cursor-default"
                style={{ perspective: "1000px" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  mouseX.set(x);
                  mouseY.set(y);
                }}
                onMouseLeave={() => {
                  mouseX.set(0);
                  mouseY.set(0);
                }}
              >
                <motion.h2
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                  }}
                  className="text-5xl md:text-7xl font-serif text-[#1a1a1a] leading-[1.1] tracking-tight relative will-change-transform"
                >
                  <motion.span 
                    style={{ z: 40, display: "inline-block", transformStyle: "preserve-3d" }}
                    className="drop-shadow-lg"
                  >
                    BUILDING
                  </motion.span> <br/>
                  <motion.span 
                    style={{ 
                      z: 80, 
                      display: "inline-block",
                      color: "#293659",
                      
                      transformStyle: "preserve-3d"
                    }}
                    className="drop-shadow-xl"
                  >
                    LEGACY 
                  </motion.span> <br/>
                  <motion.span 
                    style={{ z: 30, display: "inline-block", transformStyle: "preserve-3d" }}
                    className="drop-shadow-md"
                  >
                  OVER SPACES
                  </motion.span>
                </motion.h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed italic border-l-4 border-[#293659] pl-6">
                “Leadership Through Knowledge”
              </p>
              
              <div className="space-y-6 text-gray-500 leading-relaxed max-w-lg text-lg">
                <p>
                  We at White Wolf Infra have been the followers of  Business legends whose learnings eventually shaped our way towards becoming leaders and gradually with time we realised that the most demanded in business has been the most consistent and committed towards their decisions.
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-12 border-t border-gray-200"
            >
              <div>
                <h4 className="text-4xl font-black text-[#1a1a1a] tracking-tighter">50+ Years </h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">business legacy</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-[#1a1a1a] ml-10 tracking-tighter">2</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">ongoing projects</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-[#1a1a1a] tracking-tighter">100%</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Objective driven leadership</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
