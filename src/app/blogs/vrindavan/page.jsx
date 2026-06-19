"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const page = () => {

const benefits = [
  {
    title: "Yield & Appreciation",
    description: "Capitalize on steady asset growth and premium rental yields as our ultra-luxury villa estates appreciate.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <path d="M3 21h18" strokeLinecap="round" />
        <path d="M5 21V9l7-5 7 5v12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11h.01M12 11h.01M15 11h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Bespoke Site Experiences",
    description:
      "Immerse yourself in our landscapes with guided, private estate viewings designed around your personal itinerary.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <rect x="4" y="3" width="9" height="18" rx="0.5" />
        <rect x="13" y="8" width="7" height="13" rx="0.5" />
        <path d="M7 7h.01M10 7h.01M7 11h.01M10 11h.01M7 15h.01M10 15h.01" strokeLinecap="round" />
        <path d="M16 12h.01M16 16h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Signature Retreat Access",
    description: "Indulge in 21 complimentary annual nights at your estate alongside preferred access to elite wellness sanctuaries.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <circle cx="9" cy="8" r="2.5" />
        <circle cx="17" cy="9" r="2" />
        <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5" strokeLinecap="round" />
        <path d="M14 14.5c2 .2 4 1.8 4 4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Privileged Club Pricing",
    description: "Enjoy curated, members-only pricing across all estate dining options, lounges, and signature spa treatments.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <path
          d="M14.5 6.5 18 3l1.5 1.5L16 8m-1.5-1.5L7 14l-1 3 3-1 7.5-7.5M14.5 6.5 16 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 21l3-1 1-3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 18l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];
 

  return (
    <div>
      <Navbar />

      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/videos/xyz.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-fallback.jpg"
        />

        {/* Dark Overlay - 40% black */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 flex justify-center">
            <div className="max-w-xl flex flex-col items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-white font-bold font-manrope tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.1]"
              >
                White Wolf Infra
              </motion.h1>

                  <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-white font-bold font-manrope tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.1]"
              >
                Vrindavan
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="text-white/90 text-base sm:text-lg mt-8 leading-relaxed"
              >
                Explore our exceptional projects and discover spaces designed
                for modern lifestyles and lasting value.
              </motion.p>

             
            </div>
          </div>
        </div>
      </section>


       <section className="relative w-full overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src="/assets/osiyan.jpeg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/45" />
 
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <h2
          className="mb-14 text-[2.5rem] leading-[1.05] tracking-tight text-[#F3EEE3] sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          What White Wolf Infra
          <br />
          Gives You
        </h2>
 
        <div className="border-t border-white/25">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 items-start gap-3 border-b border-white/25 py-7 sm:grid-cols-[280px_1fr] sm:items-center sm:gap-10 lg:grid-cols-[610px_1fr]"
            >
              <div className="flex items-center gap-4 text-[#F3EEE3]">
                <span className="flex-shrink-0">{item.icon}</span>
                <span
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </span>
              </div>
              <p className="max-w-md pl-10 text-sm leading-relaxed text-[#E8E3D6]/90 sm:pl-0 sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default page;
