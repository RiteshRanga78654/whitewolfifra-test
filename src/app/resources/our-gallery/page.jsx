'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import { Maximize2 } from 'lucide-react';

// Categories for the filter
const categories = ["All", "Township", "Low Rise",];

// Gallery Data
const galleryItems = [
  // {
  //   id: 1,
  //   title: "The Glass Pavilion",
  //   category: "Township",
  //   image: "/Osiyan Habitat/osiyan-habitat-1.png",
  //   span: "col-span-1 md:col-span-2 row-span-2" // Large feature image
  // },
  {
    id: 2,
    title: "Bespoke Living Area",
    category: "Township",
    image: "/Osiyan Habitat/osiyan-habitat-2.png",
    span: "col-span-1"
  },
  {
    id: 3,
    title: "Infinity Pool Setup",
    category: "Township",
    image: "/Osiyan Habitat/osiyan-habitat-3.png",
    span: "col-span-1"
  },
  {
    id: 4,
    title: "Private Cinema",
    category: "Township",
    image: "/Osiyan Habitat/osiyan-habitat-4.png",
    span: "col-span-1"
  },
  {
    id: 5,
    title: "Master Suite",
    category: "Township",
    image: "/Osiyan Habitat/osiyan-habitat-5.png",
    span: "col-span-1"
  },
   {
    id: 6,
    title: "Zen Garden Walkway",
    category: "Low Rise",
    image: "/ATS-Sohna/ats-sohna-1.png",
    span: "col-span-1 md:col-span-2" // Wide image
  },
  {
    id: 7,
    title: "Master Suite",
    category: "Low Rise",
    image: "/ATS-Sohna/ats-sohna-2.png",
    span: "col-span-1"
  },  {
    id: 8,
    title: "Zen Garden Walkway",
    category: "Low Rise",
    image: "/ATS-Sohna/ats-sohna-3.png",
    span: "col-span-1 md:col-span-2" // Wide image
  },
  {
    id: 9,
    title: "Master Suite",
    category: "Low Rise",
    image: "/ATS-Sohna/ats-sohna-4.png",
    span: "col-span-1"
  },
  {
    id: 10,
    title: "Skyline Terrace",
    category: "Low Rise",
    image: "/ATS-Sohna/ats-sohna-5.png",
    span: "col-span-1"
  },
   {
    id: 11,
    title: "Master Suite",
    category: "Township",
    image: "/assets/gallery/township1.jpeg",
    span: "col-span-1"
  },
   {
    id: 12,
    title: "Master Suite",
    category: "Township",
    image: "/assets/gallery/township2.jpeg",
    span: "col-span-1"
  },
   {
    id: 13,
    title: "Master Suite",
    category: "Township",
    image: "/assets/gallery/township3.jpeg",
    span: "col-span-1"
  },
   {
    id: 14,
    title: "Master Suite",
    category: "Township",
    image: "/assets/gallery/township4.jpeg",
    span: "col-span-1"
  },
   {
    id: 15,
    title: "Master Suite",
    category: "Township",
    image: "/assets/gallery/township5.jpeg",
    span: "col-span-1"
  },
  
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter items based on selected category
  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <SmoothScroll>
      <div className="bg-[#fafaf9] min-h-screen font-sans selection:bg-[#293659] selection:text-white">
        <Navbar />
        
        {/* Minimalist Editorial Hero */}
        <section className="pt-48 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-brand-primary font-bold uppercase tracking-[0.2em] text-sm mb-6">
                Curated Spaces
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[0.9]">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#293659] to-brand-primary">Gallery</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                A visual journey through our most iconic architectural triumphs and bespoke interiors
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Gallery Section */}
        <section className="py-12 px-6 mb-32">
          <div className="max-w-7xl mx-auto">
            
            {/* Filter Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-16"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-500 
                    ${activeCategory === category 
                      ? "bg-[#293659] text-white shadow-lg shadow-[#293659]/20 scale-105" 
                      : "bg-white text-gray-500 border border-gray-200 hover:border-brand-primary hover:text-[#293659]"
                    }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Masonry-Style Grid using Framer Motion Layout */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout // This makes the grid smoothly re-sort itself
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative rounded-3xl overflow-hidden cursor-pointer `}
                    // ${item.span}
                  >
                    {/* Safe HTML Image Tag (No config needed) */}
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    
                    {/* Dark gradient overlay that appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Text content that slides up on hover */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase mb-2">
                              {item.category}
                            </p>
                            {/* <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                              {item.title}
                            </h3> */}
                          </div>
                          
                          {/* <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#293659] transition-colors duration-300">
                            <Maximize2 className="w-5 h-5" />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State Fallback (Just in case) */}
            {filteredItems.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p>No images found in this category.</p>
              </div>
            )}

          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}