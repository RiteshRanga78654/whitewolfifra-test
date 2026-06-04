'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const posts = [
  {
    id: 1,
    category: 'Market Insights',
    title: "Why Mumbai's Premium Residential Market Is Hitting Record Highs in 2025",
    excerpt: "Despite global headwinds, India's financial capital continues to see unprecedented demand from HNI and NRI buyers. Here's what's driving the surge.",
    author: 'Arjun Mehta',
    role: 'Head of Research',
    date: 'May 2, 2025',
    readTime: '5 min read',
    featured: true,
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1200',
    tags: ['Mumbai', 'Real Estate', 'HNI'],
  },
  {
    id: 2,
    category: 'Design',
    title: 'The Rise of Biophilic Architecture in Indian Luxury Homes',
    excerpt: "Green walls, natural light corridors, and living roofs — how India's elite developers are weaving nature into stone and glass.",
    author: 'Priya Nair',
    role: 'Principal Architect',
    date: 'Apr 18, 2025',
    readTime: '4 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=900',
    tags: ['Architecture', 'Sustainability', 'Design'],
  },
  {
    id: 3,
    category: 'Investment',
    title: 'Commercial Real Estate vs Residential: Where Should You Invest in 2025?',
    excerpt: 'A deep-dive comparison of yields, risk profiles, and growth trajectories to help serious investors decide where to put their capital.',
    author: 'Rohit Shah',
    role: 'CFO, Wild Wolf Infra',
    date: 'Apr 10, 2025',
    readTime: '7 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900',
    tags: ['Investment', 'Commercial', 'Finance'],
  },
  {
    id: 4,
    category: 'Lifestyle',
    title: "Inside The Wolfs Den: A Tour of Our Most Ambitious Project Yet",
    excerpt: "We go behind the construction hoardings to give you an exclusive first look at The Wolf's Den — 42 stories of curated living above Bandra.",
    author: 'Sneha Kapoor',
    role: 'Marketing Lead',
    date: 'Mar 28, 2025',
    readTime: '6 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=900',
    tags: ['Project Tour', 'Bandra', 'Luxury'],
  },
  {
    id: 5,
    category: 'Market Insights',
    title: 'RERA 2.0: What the New Amendments Mean for Homebuyers',
    excerpt: 'The latest regulatory changes bring stronger protections for buyers. We break down the key amendments and what they mean for your next purchase.',
    author: 'Arjun Mehta',
    role: 'Head of Research',
    date: 'Mar 14, 2025',
    readTime: '5 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=900',
    tags: ['RERA', 'Policy', 'Buyers Guide'],
  },
  {
    id: 6,
    category: 'Sustainability',
    title: 'How Wild Wolf Infra Is Targeting Net-Zero by 2035',
    excerpt: 'From solar-integrated façades to greywater recycling systems, our roadmap for building a greener portfolio without compromising on luxury.',
    author: 'Vikram Joshi',
    role: 'Sustainability Director',
    date: 'Feb 28, 2025',
    readTime: '8 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=900',
    tags: ['Sustainability', 'ESG', 'Net Zero'],
  },
];

const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

const categoryColors = {
  'Market Insights': 'bg-blue-50 text-blue-700',
  'Design': 'bg-emerald-50 text-emerald-700',
  'Investment': 'bg-amber-50 text-amber-700',
  'Lifestyle': 'bg-rose-50 text-rose-700',
  'Sustainability': 'bg-teal-50 text-teal-700',
};

const BlogPage = () => {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  const filtered = rest.filter((p) => {
    const matchCat = active === 'All' || p.category === active;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
{/* ── HERO ── */}
<section className="pt-48 pb-12 px-6 relative">
  <div className="max-w-7xl mx-auto text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p
        className="text-[#212946] font-bold uppercase tracking-[0.2em] text-sm mb-6"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        Insights & Stories
      </p>

      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[0.9]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        The Wolf's{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#212946] to-[#3a4f8a]">
          Journal.
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
        Market insights, design stories, and project updates from the team
        building India's most celebrated real estate landmarks.
      </p>

      {/* Search bar */}
      <div className="relative max-w-md mx-auto">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#212946]/30"
          width="16" height="16" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth="1.8"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full border border-[#212946]/15 rounded-2xl pl-11 pr-5 py-3.5 text-[#212946] placeholder:text-[#212946]/30 text-sm outline-none focus:border-[#212946]/40 transition-colors bg-white"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
      </div>
    </motion.div>
  </div>
</section>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-12">

        {/* ── FEATURED POST ── */}
        {featured && (
          <motion.div {...fadeUp(0)} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-[#212946]/30" />
              <span className="text-[#212946]/40 text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "'DM Mono', monospace" }}>Featured Story</span>
            </div>

            <div className="group grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-[#212946]/8 hover:shadow-[0_16px_60px_-12px_rgba(33,41,70,0.15)] transition-all duration-500 cursor-pointer">
              {/* Image */}
              <div className="lg:col-span-7 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium ${categoryColors[featured.category] || 'bg-gray-100 text-gray-600'}`} style={{ fontFamily: "'DM Mono', monospace" }}>
                  {featured.category}
                </span>
              </div>

              {/* Content */}
              <div className="lg:col-span-5 flex flex-col justify-center p-8 lg:p-12 bg-white">
                <div className="flex flex-wrap gap-2 mb-5">
                  {featured.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-[#212946]/5 text-[#212946]/50 text-[9px] uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>{t}</span>
                  ))}
                </div>

                <h2 className="text-2xl md:text-3xl text-[#212946] font-light leading-snug mb-4 group-hover:text-[#2d3a62] transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {featured.title}
                </h2>
                <p className="text-[#212946]/50 text-sm leading-relaxed mb-6">{featured.excerpt}</p>

                <div className="flex items-center justify-between pt-5 border-t border-[#212946]/8">
                  <div>
                    <p className="text-[#212946] text-sm font-medium">{featured.author}</p>
                    <p className="text-[#212946]/40 text-xs">{featured.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#212946]/40 text-xs">{featured.date}</p>
                    <p className="text-[#212946]/40 text-xs">{featured.readTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FILTER TABS ── */}
        <motion.div {...fadeUp(0.05)} className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider border transition-all duration-200 ${active === c ? 'bg-[#212946] text-white border-[#212946]' : 'border-[#212946]/15 text-[#212946]/50 hover:border-[#212946]/30'}`}
              style={{ fontFamily: "'DM Mono', monospace" }}>
              {c}
            </button>
          ))}
        </motion.div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-white border border-[#212946]/8 rounded-2xl overflow-hidden hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`} style={{ fontFamily: "'DM Mono', monospace" }}>
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-[#212946]/4 text-[#212946]/40 text-[9px] uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>{t}</span>
                  ))}
                </div>

                <h3 className="text-lg text-[#212946] font-light leading-snug mb-3 group-hover:text-[#2d3a62] transition-colors flex-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {post.title}
                </h3>
                <p className="text-[#212946]/45 text-sm leading-relaxed line-clamp-2 mb-5">{post.excerpt}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#212946]/6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#212946]/10 flex items-center justify-center text-[#212946] text-[10px] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[#212946] text-xs font-medium leading-none">{post.author}</p>
                      <p className="text-[#212946]/35 text-[10px] mt-0.5">{post.date}</p>
                    </div>
                  </div>
                  <span className="text-[#212946]/35 text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#212946]/30 text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>No articles found.</p>
          </div>
        )}

        {/* ── NEWSLETTER ── */}
        <motion.div {...fadeUp(0.1)} className="mt-20 rounded-3xl bg-[#212946] overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
          <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-[#3a4f8a]/30 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-10 md:p-14">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.35em] mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Never Miss an Update</p>
              <h3 className="text-3xl text-white font-light mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Receive the Latest Stories</h3>
              <p className="text-white/40 text-sm">Fresh perspectives on real estate, design, and development — straight to your inbox.</p>
            </div>
            <div className="flex gap-3 flex-col sm:flex-row md:flex-col lg:flex-row w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-white/10 border border-white/15 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 text-sm outline-none focus:bg-white/15 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button className="flex-shrink-0 bg-white text-[#212946] px-7 py-3.5 rounded-2xl text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BlogPage;