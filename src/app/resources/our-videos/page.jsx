'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import { Play, X, Clock, Film, Volume2, VolumeX } from 'lucide-react';

// Sample Video Data
const featuredVideo = {
  id: "feat-1",
  title: "Osiyan Habitat",
  subtitle: "Brand Film",
  duration: "3:45",
  videoSrc: "/assets/videos/second_aerial_cinematic_vid.mp4",
  videoUrl: "/assets/videos/second_aerial_cinematic_vid.mp4"
};

const videoGrid = [
  {
    id: 1,
    title: "RERA Approval Received",
    category: "Official HRERA Certified",
    duration: "5:20",
    videoSrc: "/assets/videos/fill-pillar.mp4",
    // videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
  },
  {
    id: 2,
    title: "Foundation curing in progress.",
    category: "Osiyan Habitat Work Progress",
    duration: "12:15",
    videoSrc: "/assets/videos/WhatsApp Video 2026-06-08 at 11.48.18 AM.mp4",
    // videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
  },
];

const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

// ── Featured Video Card ────────────────────────────────────────────────────────
function FeaturedCard({ video, onClick }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-[2.5rem] overflow-hidden cursor-pointer bg-gray-100 shadow-2xl shadow-[#293659]/10 border border-gray-200"
      style={{ aspectRatio: '16/7' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.videoSrc}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/85 via-[#0f0f0f]/15 to-transparent transition-opacity duration-500" />

      {/* Mute toggle */}
      {hovered && (
        <button
          onClick={(e) => { e.stopPropagation(); setMuted(m => !m); }}
          className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {/* Center play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center pl-1.5 shadow-xl transition-all duration-500
          ${hovered ? 'bg-[#293659] text-white scale-110' : 'bg-white/90 text-[#293659] backdrop-blur-md'}`}>
          <Play className="w-9 h-9 fill-current" />
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-[#6a85b8] font-bold tracking-[0.25em] text-xs uppercase mb-2">
            {video.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
            {video.title}
          </h2>
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>{video.duration}</span>
          </div>
        </div>
      </div>

      {/* "FEATURED" side label */}
      <div className="absolute top-8 left-0">
        <div className="bg-[#293659] text-white text-[10px] font-black tracking-[0.3em] uppercase px-5 py-2 rounded-r-full">
          Featured
        </div>
      </div>
    </motion.div>
  );
}

// ── Grid Video Card ────────────────────────────────────────────────────────────
function GridCard({ video, onClick }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="group cursor-pointer flex flex-col gap-5"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Video wrapper */}
      <motion.div
        className="relative rounded-2xl overflow-hidden border shadow-sm transition-shadow duration-500"
        style={{ aspectRatio: '16/9' }}
        animate={{
          borderColor: hovered ? 'rgba(41,54,89,0.35)' : 'rgba(229,231,235,1)',
          boxShadow: hovered
            ? '0 20px 48px -8px rgba(41,54,89,0.18)'
            : '0 1px 3px 0 rgba(0,0,0,0.05)',
        }}
        transition={{ duration: 0.4 }}
      >
        <video
          ref={videoRef}
          src={video.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Shimmer reveal on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%', opacity: 0.6 }}
              animate={{ x: '200%', opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: hovered ? 'rgba(41,54,89,0.28)' : 'rgba(0,0,0,0.18)' }}
          transition={{ duration: 0.4 }}
        />

        {/* Play circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center pl-1 shadow-md"
            animate={{
              scale: hovered ? 1.15 : 1,
              backgroundColor: hovered ? '#293659' : 'rgba(255,255,255,0.85)',
              color: hovered ? '#ffffff' : '#293659',
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Play className="w-5 h-5 fill-current" />
          </motion.div>
        </div>

        {/* Duration badge */}
        <motion.div
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-gray-900 text-xs font-bold shadow-sm"
          animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.35 }}
        >
          <Clock className="w-3 h-3" />
          {video.duration}
        </motion.div>

        {/* Category pill — slides in on hover */}
        <motion.div
          className="absolute top-3 left-3 bg-[#293659] text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          {video.category}
        </motion.div>
      </motion.div>

      {/* Text */}
      <div className="px-1">
        <p className="text-[#293659] text-[10px] font-black tracking-[0.25em] uppercase mb-1.5">
          {video.category}
        </p>
        <h4 className="relative inline-block text-xl font-black text-gray-900 tracking-tight leading-snug group-hover:text-[#293659] transition-colors duration-300">
          {video.title}
          {/* Animated underline */}
          <motion.span
            className="absolute -bottom-0.5 left-0 h-[2px] bg-[#293659] rounded-full"
            animate={{ width: hovered ? '100%' : '0%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block' }}
          />
        </h4>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const modalVideoRef = useRef(null);

  const closeModal = () => setActiveVideo(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeVideo]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isEmbed = (url) => url?.includes('youtube') || url?.includes('embed');
  const videoSrc = activeVideo
    ? (activeVideo.videoUrl || activeVideo.videoSrc)
    : null;

  return (
    <SmoothScroll>
      <div className="bg-[#fafaf9] min-h-screen font-sans selection:bg-[#293659] selection:text-white">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-48 pb-12 px-6 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial="hidden" animate="show" variants={fadeUpContainer}>
              <motion.div variants={fadeUpItem} className="flex items-center justify-center gap-3 text-brand-primary font-bold uppercase tracking-[0.2em] text-sm mb-6">
                <Film className="w-5 h-5" />
                <span>Cinematic Experiences</span>
              </motion.div>

              {/* <motion.h1
                variants={fadeUpItem}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-[0.9]"
              >
                OUR VIDEOS
              </motion.h1> */}
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[0.9]">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#293659] to-brand-primary">Gallery</span>
              </h1>

              <motion.p
                variants={fadeUpItem}
                className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed"
              >
                Indulge yourself in witnessing prime Architecture walkthroughs
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Featured ── */}
        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <FeaturedCard video={featuredVideo} onClick={() => setActiveVideo(featuredVideo)} />
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="py-16 px-6 mb-20 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section heading */}
            <div className="flex items-center gap-5 mb-12">
              <span className="text-[#293659] font-black text-xs tracking-[0.3em] uppercase">
                Latest Updates
              </span>
              <div className="h-px bg-gray-100 flex-grow" />
              <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                Osiyan Habitat
              </span>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUpContainer}
            >
              {videoGrid.map((video) => (
                <motion.div key={video.id} variants={fadeUpItem}>
                  <GridCard video={video} onClick={() => setActiveVideo(video)} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />

        {/* ── Modal ── */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-[#080808]/96 backdrop-blur-2xl"
              // Click backdrop to close
              onClick={closeModal}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 md:top-10 md:right-10 w-11 h-11 bg-white/10 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-gray-900 transition-all duration-300 z-[60]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Player — stop click from bubbling to backdrop */}
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 24 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
                className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/8"
                onClick={(e) => e.stopPropagation()}
              >
                {isEmbed(activeVideo.videoUrl) ? (
                  <iframe
                    src={activeVideo.videoUrl}
                    title={activeVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    ref={modalVideoRef}
                    key={videoSrc}
                    src={videoSrc}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}
              </motion.div>

              {/* Video title below player */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-white/40 text-xs tracking-widest uppercase font-semibold">
                  {activeVideo.title}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}


