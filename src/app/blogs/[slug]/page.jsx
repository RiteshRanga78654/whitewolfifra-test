'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PostDetails = () => {
  // Demo Data - In a real app, this would come from a database based on the URL ID
  const post = {
    title: "Why Mumbai's Premium Residential Market Is Hitting Record Highs in 2025",
    category: 'Market Insights',
    author: 'Arjun Mehta',
    role: 'Head of Research',
    date: 'May 2, 2025',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1200',
    tags: ['Mumbai', 'Real Estate', 'Luxury'],
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* ── HEADER ── */}
      <header className="bg-[#212946] pt-32 pb-20 text-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-32" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-[0.2em]">{post.category}</span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="text-white/40 text-[10px] uppercase tracking-widest">{post.readTime}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-light leading-[1.1] mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </motion.h1>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                <p className="text-white/40 text-xs">{post.role}</p>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="text-xs text-white/40 uppercase tracking-widest">
              Published <br /> {post.date}
            </div>
          </div>
        </div>
      </header>

      {/* ── FEATURED IMAGE ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <img src={post.img} alt="Featured" className="w-full aspect-video object-cover" />
        </motion.div>
      </div>

      {/* ── ARTICLE CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Sidebar: Socials */}
        <aside className="lg:col-span-2 hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Share</p>
            <div className="flex flex-col gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-black transition-colors">Twitter</a>
              <a href="#" className="hover:text-black transition-colors">Copy Link</a>
            </div>
          </div>
        </aside>

        {/* Center: Text Body */}
        <article className="lg:col-span-7 prose prose-lg max-w-none">
          <p className="text-xl text-[#212946]/70 leading-relaxed italic mb-10">
            "The luxury real estate landscape in Mumbai isn't just growing; it's evolving into a world-class asset class that rivals London and Dubai."
          </p>
          
          <div className="text-[#212946]/80 space-y-6 leading-loose text-lg">
            <p>
              As we move into the second quarter of 2025, the data is undeniable. Premium residential transactions in South Mumbai and Bandra have reached a five-year peak. This surge is driven by a unique confluence of domestic wealth creation and a significant return of NRI capital.
            </p>
            
            <h3 className="text-2xl font-light pt-8 text-[#212946]" style={{ fontFamily: "'Playfair Display', serif" }}>
              The RERA 2.0 Impact
            </h3>
            <p>
              The recent amendments to the Real Estate Regulatory Authority (RERA) guidelines have provided a safety net that was previously missing. Investors now have higher transparency regarding project completion timelines and fund allocation.
            </p>

            <div className="my-12 p-8 bg-gray-50 rounded-2xl border-l-4 border-[#212946]">
              <p className="text-gray-600 m-0 italic font-serif">
                "We are seeing a trend where buyers are prioritizing developer reputation over micro-location for the first time in Mumbai's history."
              </p>
            </div>

            <p>
              Wild Wolf Infra is at the forefront of this shift. Our focus on biophilic design and integrated smart-home technologies has positioned our upcoming project, The Wolf's Den, as the most anticipated launch of the season.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-4 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] uppercase tracking-widest font-bold">
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* Right Sidebar: Related/Quick Info */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 bg-[#212946]/5 rounded-3xl p-8">
            <h4 className="text-[#212946] font-bold text-xs uppercase tracking-widest mb-6">Key Insights</h4>
            <div className="space-y-6">
              {[
                { label: 'Demand Rise', value: '24% YoY' },
                { label: 'Top Region', value: 'Bandra West' },
                { label: 'Asset Class', value: 'Residential' }
              ].map(item => (
                <div key={item.label}>
                  <p className="text-gray-400 text-[10px] uppercase mb-1">{item.label}</p>
                  <p className="text-[#212946] font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default PostDetails;