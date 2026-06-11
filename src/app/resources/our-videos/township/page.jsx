
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import SmoothScroll from '../../../../components/SmoothScroll';
import { Play, X, Clock, Film, Volume2, VolumeX, Calendar, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const featuredVideo = {
  id: "feat-1",
  title: "The White Wolf Anthem",
  subtitle: "Brand Film",
  duration: "3:45",
  videoSrc: "/assets/videos/second_aerial_cinematic_vid.mp4",
  videoUrl: "/assets/videos/second_aerial_cinematic_vid.mp4",
};

// Scalable JSON structure: months → weeks → videos
const monthlyData = [
  {
    id: "apr",
    label: "April",
    short: "Apr",
    weeks: [
      {
        id: "apr-w1",
        label: "Week 1",
        range: "Apr 1 – 7",
        videos: [
          {
            id: "apr-w1-v1",
            title: "Site Foundation Work Begins",
            category: "Construction Update",
            duration: "4:10",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
          {
            id: "apr-w1-v2",
            title: "Soil Testing & Survey",
            category: "Site Progress",
            duration: "2:55",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
        ],
      },
      {
        id: "apr-w2",
        label: "Week 2",
        range: "Apr 8 – 14",
        videos: [
          {
            id: "apr-w2-v1",
            title: "Pillar Construction Phase 1",
            category: "Construction Update",
            duration: "6:30",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
        ],
      },
      {
        id: "apr-w3",
        label: "Week 3",
        range: "Apr 15 – 21",
        videos: [
          {
            id: "apr-w3-v1",
            title: "Aerial View — April Progress",
            category: "Aerial Walkthrough",
            duration: "3:20",
            videoSrc: "/assets/videos/second_aerial_cinematic_vid.mp4",
          },
          {
            id: "apr-w3-v2",
            title: "Structural Review Meeting",
            category: "Official Update",
            duration: "8:00",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
        ],
      },
      {
        id: "apr-w4",
        label: "Week 4",
        range: "Apr 22 – 30",
        videos: [
          {
            id: "apr-w4-v1",
            title: "End of April Site Recap",
            category: "Monthly Recap",
            duration: "5:45",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "may",
    label: "May",
    short: "May",
    weeks: [
      {
        id: "may-w1",
        label: "Week 1",
        range: "May 1 – 7",
        videos: [
          {
            id: "may-w1-v1",
            title: "RERA Approval Received",
            category: "Official HRERA Certification",
            duration: "5:20",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
          {
            id: "may-w1-v2",
            title: "May Kickoff — Ground Activity",
            category: "Construction Update",
            duration: "3:40",
            videoSrc: "/assets/videos/second_aerial_cinematic_vid.mp4",
          },
        ],
      },
      {
        id: "may-w2",
        label: "Week 2",
        range: "May 8 – 14",
        videos: [
          {
            id: "may-w2-v1",
            title: "Slab Work Commences",
            category: "Construction Update",
            duration: "7:15",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
        ],
      },
      {
        id: "may-w3",
        label: "Week 3",
        range: "May 15 – 21",
        videos: [
          {
            id: "may-w3-v1",
            title: "Drone Footage — Mid May",
            category: "Aerial Walkthrough",
            duration: "4:00",
            videoSrc: "/assets/videos/second_aerial_cinematic_vid.mp4",
          },
          {
            id: "may-w3-v2",
            title: "Investor Site Visit Highlights",
            category: "Event Recap",
            duration: "9:30",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
        ],
      },
      {
        id: "may-w4",
        label: "Week 4",
        range: "May 22 – 31",
        videos: [
          {
            id: "may-w4-v1",
            title: "New Launch in Sector 27, Jhajjar",
            category: "Osiyan Habitat Launch",
            duration: "12:15",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "jun",
    label: "June",
    short: "Jun",
    weeks: [
      {
        id: "jun-w1",
        label: "Week 1",
        range: "Jun 1 – 7",
        videos: [
          {
            id: "jun-w1-v1",
            title: "June Site Walkthrough",
            category: "Construction Update",
            duration: "5:00",
            videoSrc: "/assets/videos/second_aerial_cinematic_vid.mp4",
          },
        ],
      },
      {
        id: "jun-w2",
        label: "Week 2",
        range: "Jun 8 – 14",
        videos: [
          {
            id: "jun-w2-v1",
            title: "Rooftop Progress Update",
            category: "Construction Update",
            duration: "6:10",
            videoSrc: "/assets/videos/fill-pillar.mp4",
          },
          {
            id: "jun-w2-v2",
            title: "Sales Team on Ground",
            category: "Team Update",
            duration: "3:25",
            videoSrc: "/assets/videos/second_aerial_cinematic_vid.mp4",
          },
        ],
      },
      {
        id: "jun-w3",
        label: "Week 3",
        range: "Jun 15 – 21",
        videos: [],
      },
      {
        id: "jun-w4",
        label: "Week 4",
        range: "Jun 22 – 30",
        videos: [],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

// ─────────────────────────────────────────────────────────────────────────────
// FEATURED CARD
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedCard({ video, onClick }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-[2.5rem] overflow-hidden cursor-pointer bg-gray-100 shadow-2xl shadow-[#293659]/10 border border-gray-200"
      style={{ aspectRatio: '16/7' }}
      onMouseEnter={() => { setHovered(true); videoRef.current?.play(); }}
      onMouseLeave={() => { setHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={video.videoSrc}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/85 via-[#0f0f0f]/15 to-transparent" />

      {hovered && (
        <button
          onClick={(e) => { e.stopPropagation(); setMuted(m => !m); }}
          className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center pl-1.5 shadow-xl transition-all duration-500
          ${hovered ? 'bg-[#293659] text-white scale-110' : 'bg-white/90 text-[#293659] backdrop-blur-md'}`}>
          <Play className="w-9 h-9 fill-current" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-[#6a85b8] font-bold tracking-[0.25em] text-xs uppercase mb-2">{video.subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">{video.title}</h2>
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>{video.duration}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-8 left-0">
        <div className="bg-[#293659] text-white text-[10px] font-black tracking-[0.3em] uppercase px-5 py-2 rounded-r-full">
          Featured
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID VIDEO CARD
// ─────────────────────────────────────────────────────────────────────────────

function GridCard({ video, onClick }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group cursor-pointer flex flex-col gap-5"
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); videoRef.current?.play(); }}
      onMouseLeave={() => { setHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden border shadow-sm"
        style={{ aspectRatio: '16/9' }}
        animate={{
          borderColor: hovered ? 'rgba(41,54,89,0.35)' : 'rgba(229,231,235,1)',
          boxShadow: hovered ? '0 20px 48px -8px rgba(41,54,89,0.18)' : '0 1px 3px 0 rgba(0,0,0,0.05)',
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

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%', opacity: 0.6 }}
              animate={{ x: '200%', opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)' }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: hovered ? 'rgba(41,54,89,0.28)' : 'rgba(0,0,0,0.18)' }}
          transition={{ duration: 0.4 }}
        />

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

        <motion.div
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-gray-900 text-xs font-bold shadow-sm"
          animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.35 }}
        >
          <Clock className="w-3 h-3" />
          {video.duration}
        </motion.div>

        <motion.div
          className="absolute top-3 left-3 bg-[#293659] text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg"
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          {video.category}
        </motion.div>
      </motion.div>

      <div className="px-1">
        <p className="text-[#293659] text-[10px] font-black tracking-[0.25em] uppercase mb-1.5">{video.category}</p>
        <h4 className="relative inline-block text-xl font-black text-gray-900 tracking-tight leading-snug group-hover:text-[#293659] transition-colors duration-300">
          {video.title}
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

// ─────────────────────────────────────────────────────────────────────────────
// MONTHLY TAB SECTION
// ─────────────────────────────────────────────────────────────────────────────

function MonthlySection({ onVideoClick }) {
  const [activeMonth, setActiveMonth] = useState(monthlyData[2].id); // default: June
  const [activeWeek, setActiveWeek] = useState(monthlyData[2].weeks[0].id);

  const currentMonth = monthlyData.find(m => m.id === activeMonth);
  const currentWeek = currentMonth?.weeks.find(w => w.id === activeWeek);

  const handleMonthChange = (monthId) => {
    setActiveMonth(monthId);
    const month = monthlyData.find(m => m.id === monthId);
    setActiveWeek(month?.weeks[0]?.id || '');
  };

  return (
    <section className="py-20 px-6 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-[#293659]" />
            <span className="text-[#293659] font-black text-xs tracking-[0.3em] uppercase">
              Monthly Updates
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Progress by <span className="text-[#293659]">Week</span>
          </h2>
          <p className="text-gray-400 mt-3 font-medium max-w-lg">
            Browse construction and project updates organised by month and week.
          </p>
        </motion.div>

        {/* Month Tabs */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {monthlyData.map((month) => (
            <button
              key={month.id}
              onClick={() => handleMonthChange(month.id)}
              className={`relative px-7 py-3 rounded-full text-sm font-black tracking-[0.15em] uppercase transition-all duration-300
                ${activeMonth === month.id
                  ? 'bg-[#293659] text-white shadow-lg shadow-[#293659]/25'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#293659]/30 hover:text-[#293659]'
                }`}
            >
              {month.label}
              <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full
                ${activeMonth === month.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {month.weeks.reduce((acc, w) => acc + w.videos.length, 0)}
              </span>
            </button>
          ))}
        </div>

        {/* Week Sub-tabs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMonth}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex gap-2 mb-12 flex-wrap">
              {currentMonth?.weeks.map((week) => (
                <button
                  key={week.id}
                  onClick={() => setActiveWeek(week.id)}
                  className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300
                    ${activeWeek === week.id
                      ? 'bg-[#293659]/10 text-[#293659] border border-[#293659]/25'
                      : 'bg-white text-gray-400 border border-gray-200 hover:border-gray-300 hover:text-gray-600'
                    }`}
                >
                  <span>{week.label}</span>
                  <span className={`text-[9px] font-semibold tracking-wider hidden sm:inline
                    ${activeWeek === week.id ? 'text-[#293659]/60' : 'text-gray-300'}`}>
                    {week.range}
                  </span>
                  {week.videos.length > 0 && (
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black
                      ${activeWeek === week.id ? 'bg-[#293659] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {week.videos.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Videos grid for selected week */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWeek}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentWeek?.videos.length > 0 ? (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-[#293659]" />
                        <span className="text-gray-900 font-black text-sm tracking-wide">
                          {currentMonth?.label} · {currentWeek?.label}
                        </span>
                        <span className="text-gray-400 text-xs font-medium">({currentWeek?.range})</span>
                      </div>
                      <div className="h-px bg-gray-100 flex-grow" />
                      <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                        {currentWeek.videos.length} video{currentWeek.videos.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                      variants={fadeUpContainer}
                      initial="hidden"
                      animate="show"
                    >
                      {currentWeek.videos.map((video) => (
                        <motion.div key={video.id} variants={fadeUpItem}>
                          <GridCard video={video} onClick={() => onVideoClick(video)} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-24 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                      <Film className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-gray-900 font-black text-lg tracking-tight mb-1">No videos yet</p>
                    <p className="text-gray-400 text-sm font-medium">
                      Videos for {currentMonth?.label} {currentWeek?.label} will appear here.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const modalVideoRef = useRef(null);

  const closeModal = () => setActiveVideo(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeVideo]);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isEmbed = (url) => url?.includes('youtube') || url?.includes('embed');
  const videoSrc = activeVideo ? (activeVideo.videoUrl || activeVideo.videoSrc) : null;

  return (
    <SmoothScroll>
      <div className="bg-[#fafaf9] min-h-screen font-sans selection:bg-[#293659] selection:text-white">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-48 pb-12 px-6 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial="hidden" animate="show" variants={fadeUpContainer}>
              <motion.div variants={fadeUpItem} className="flex items-center justify-center gap-3 text-[#293659] font-bold uppercase tracking-[0.2em] text-sm mb-6">
                <Film className="w-5 h-5" />
                <span>Cinematic Experiences</span>
              </motion.div>

              <motion.h1
                variants={fadeUpItem}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-[0.9]"
              >
                OUR VIDEOS
              </motion.h1>

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

        {/* ── Monthly Tab Section ── */}
        <MonthlySection onVideoClick={setActiveVideo} />

        <Footer />

        {/* ── Modal ── */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-[#080808]/96 backdrop-blur-2xl"
              onClick={closeModal}
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 md:top-10 md:right-10 w-11 h-11 bg-white/10 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-gray-900 transition-all duration-300 z-[60]"
              >
                <X className="w-5 h-5" />
              </button>

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

              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-white/40 text-xs tracking-widest uppercase font-semibold whitespace-nowrap">
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