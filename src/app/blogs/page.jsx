"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogSlider from "../../components/BlogSlider";
import { getAllPosts } from "../../blogdata/blogData";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const categoryColors = {
  "Market Insights": "bg-blue-50 text-blue-700",
  Design: "bg-emerald-50 text-emerald-700",
  Investment: "bg-amber-50 text-amber-700",
  Lifestyle: "bg-rose-50 text-rose-700",
  Sustainability: "bg-teal-50 text-teal-700",
};

const BlogPage = () => {
  const router = useRouter();
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  // Fetch all items and sort them programmatically: Newest Dates First
  const rawPosts = getAllPosts() || [];
  const posts = [...rawPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  const filtered = rest.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Realigned to target your /blog/[slug]/page.jsx folder structure route
  const handlePostClick = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── HERO ── */}

        <section className="relative w-full h-screen overflow-hidden">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/videos/blog_herosectio.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-fallback.jpg"
          />

          {/* Dark Overlay - 40% black */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
              <div className="max-w-xl">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-white font-bold font-manrope  tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.1]"
                >
                  Building Premium <br />
                  Living Spaces <br />
                  Across India  
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                  className="text-white/90 text-base sm:text-lg mt-8 leading-relaxed"
                >
                  Welcome to a destination where luxury meets serenity. A
                  signature project by Whitewolf Infra, our villa was born from
                  a dream to create a space that transcends the ordinary,
                  offering an exclusive escape immersed in the beauty of nature.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  className="mt-10"
                >
                  <a
                    href="#explore"
                    className="group inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#293659] text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </span>
                    <span className="font-semibold text-[#1a1a1a]">
                      Explore White Wolf Infra
                    </span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <BlogSlider />

        <section className="pt-[110px] pb-2 px-6 relative">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
                The Wolf's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#212946] to-[#3a4f8a]">
                  Journal.
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed mb-5">
                Market insights, design stories, and project updates from the
                team building India's most celebrated real estate landmarks.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 md:pb-16">
          {/* ── FEATURED POST ── */}
          {featured && (
            <motion.div
              {...fadeUp(0)}
              className="mb-16"
              onClick={() => handlePostClick(featured.slug)}
            >
              <div className="group grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-[#212946]/8 hover:shadow-[0_16px_60px_-12px_rgba(33,41,70,0.15)] transition-all duration-500 cursor-pointer">
                {/* Image */}
                <div
                  className="lg:col-span-7 relative overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <img
                    src={featured.img}
                    alt={featured.title}
                    className="w-full h-full object-inherit group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span
                    className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium ${categoryColors[featured.category] || "bg-gray-100 text-gray-600"}`}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {featured.category}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 flex flex-col justify-center p-8 lg:p-6 bg-white">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-[#212946]/5 text-[#212946]/50 text-[9px] uppercase tracking-wider"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2
                    className="text-2xl md:text-3xl text-[#212946] font-light leading-snug mb-4 group-hover:text-[#2d3a62] transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[#212946]/50 text-sm leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-[#212946]/8">
                    <div>
                      <p className="text-[#212946] text-sm font-medium">
                        {featured.author}
                      </p>
                      <p className="text-[#212946]/40 text-xs">
                        {featured.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#212946]/40 text-xs">
                        {featured.date}
                      </p>
                      <p className="text-[#212946]/40 text-xs">
                        {featured.readTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── FILTER TABS ── */}
          <motion.div {...fadeUp(0.05)} className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider border transition-all duration-200 ${active === c ? "bg-[#212946] text-white border-[#212946]" : "border-[#212946]/15 text-[#212946]/50 hover:border-[#212946]/30"}`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
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
                onClick={() => handlePostClick(post.slug)}
                className="group bg-white border border-[#212946]/8 rounded-2xl overflow-hidden hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Thumbnail */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-inherit group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span
                    className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full bg-[#212946]/4 text-[#212946]/40 text-[9px] uppercase tracking-wider"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="text-lg text-[#212946] font-light leading-snug mb-3 group-hover:text-[#2d3a62] transition-colors flex-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-[#212946]/45 text-sm leading-relaxed line-clamp-2 mb-5">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#212946]/6">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full bg-[#212946]/10 flex items-center justify-center text-[#212946] text-[10px] font-bold"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[#212946] text-xs font-medium leading-none">
                          {post.author}
                        </p>
                        <p className="text-[#212946]/35 text-[10px] mt-0.5">
                          {post.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-[#212946]/35 text-[10px]"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p
                className="text-[#212946]/30 text-lg"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                No articles found.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
