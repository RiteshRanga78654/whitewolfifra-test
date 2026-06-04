'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import { ExternalLink, ArrowRight, BookOpen } from 'lucide-react';

const pressItems = [
  {
    id: 1,
    publication: "The Economic Times",
    date: "October 12, 2026",
    title: "White Wolf Infra Redefines Luxury Living in South Gurgaon",
    excerpt: "With the launch of ATS Sohna Floors, White Wolf Infra continues to dominate the premium low-rise residential segment...",
    category: "Real Estate News",
    link: "#"
  },
  {
    id: 2,
    publication: "Forbes India",
    date: "September 05, 2026",
    title: "The Architecture of Tomorrow: Inside Osiyan Habitat",
    excerpt: "An exclusive look at how sustainable design meets uncompromising luxury in White Wolf's latest flagship project.",
    category: "Architecture",
    link: "#"
  },
  {
    id: 3,
    publication: "Architectural Digest",
    date: "August 21, 2026",
    title: "Minimalism Meets Grandeur: The Glass Pavilion",
    excerpt: "Exploring the design philosophy behind White Wolf's award-winning corporate headquarters in DLF Cyber City.",
    category: "Design",
    link: "#"
  },
  {
    id: 4,
    publication: "Times Property",
    date: "July 18, 2026",
    title: "Investment Hotspots: Why Sohna is the New Gurugram",
    excerpt: "A deep dive into the infrastructural boom and why developers like White Wolf are heavily investing in the region.",
    category: "Market Insights",
    link: "#"
  },
  {
    id: 5,
    publication: "Hindustan Times",
    date: "June 30, 2026",
    title: "White Wolf Infra Announces Expansion into Commercial Real Estate",
    excerpt: "The luxury residential powerhouse reveals plans for a new generation of boutique commercial spaces.",
    category: "Business",
    link: "#"
  },
  {
    id: 6,
    publication: "Vogue Living",
    date: "May 14, 2026",
    title: "The Most Coveted Addresses of 2026",
    excerpt: "Featuring Suncity Monarch and the rise of ultra-luxury gated communities in the NCR region.",
    category: "Lifestyle",
    link: "#"
  }
];

export default function PressCoverage() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <SmoothScroll>
      <div className="bg-[#fafaf9] min-h-screen font-sans selection:bg-[#293659] selection:text-white">
        <Navbar />
        
        {/* ── HERO ── */}
<section className="pt-48 pb-20 px-6 relative">
  <div className="max-w-7xl mx-auto text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div
        className="inline-flex items-center gap-3 text-[#212946] font-bold uppercase tracking-[0.2em] text-sm mb-6"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        <BookOpen className="w-4 h-4" />
        <span>Media & Publications</span>
      </div>

      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[0.9]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        In The{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#212946] to-[#3a4f8a]">
          Headlines.
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
        Discover what the world's leading publications are saying about
        White Wolf Infra's architectural milestones and industry impact.
      </p>
    </motion.div>
  </div>
</section>

        {/* Press Articles Grid */}
        <section className="py-20 px-6  relative z-10 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pressItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                   
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-[#293659]/5 border border-gray-100 flex flex-col h-full group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#293659]/10"
                >
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {item.date}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#293659]"></div>
                      {item.publication}
                    </h4>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-4 group-hover:text-[#293659] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-8">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-widest group-hover:text-brand-primary transition-colors flex items-center gap-2">
                      Read Article 
                      <motion.div
                        animate={{ x: hoveredId === item.id ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#293659] group-hover:text-white transition-all duration-300">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact Banner */}
        <section className="py-24 px-6 border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-6">
              Media Assistance
            </h2>
            <p className="text-lg text-gray-500 font-medium mb-10 max-w-2xl mx-auto">
              Connect with our press and communications team for interviews, media support, official announcements, or collaboration requests.
            </p>
            <a 
              href="mailto:press@whitewolfinfra.com"
              className="inline-flex items-center justify-center gap-3 bg-[#293659] text-white px-8 py-5 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-brand-primary hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Contact Press Office <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
