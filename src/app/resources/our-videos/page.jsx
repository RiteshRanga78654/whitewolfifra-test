'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import { Play, X, Clock, Film } from 'lucide-react';

// Sample Video Data
const featuredVideo = {
  id: "feat-1",
  title: "The White Wolf Anthem",
  subtitle: "Brand Film",
  duration: "3:45",
  thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" // Replace with your actual video link
};

const videoGrid = [
  {
    id: 1,
    title: "RERA Approval Received",
    category: "The project has received official HRERA",
    duration: "5:20",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
  },
  {
    id: 2,
    title: "New Launch in Sector 27, Jhajjar",
    category: "Osiyan Habitat has been launched",
    duration: "12:15",
    thumbnail: "https://images.unsplash.com/photo-1541881451963-38048126b8cb?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
  },
  {
    id: 3,
    title: "Strategic Growth Location",
    category: "The project is gaining attention due to strategic location",
    duration: "8:40",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
  },
  {
    id: 4,
    title: "Development Timeline Announced",
    category: "Launched in 2025 assuring possession in 2029",
    duration: "4:30",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
  }
];

// Animation Variants
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeVideo]);

  return (
    <SmoothScroll>
      {/* Light Theme Background Update Here */}
      <div className="bg-[#fafaf9] min-h-screen font-sans selection:bg-[#293659] selection:text-white">
        <Navbar />
        
        {/* Bright Editorial Hero Section */}
        <section className="pt-48 pb-12 px-6 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial="hidden" animate="show" variants={fadeUpContainer}>
              <motion.div variants={fadeUpItem} className="flex items-center justify-center gap-3 text-brand-primary font-bold uppercase tracking-[0.2em] text-sm mb-6">
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

        {/* Featured Video Section */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group rounded-[2.5rem] overflow-hidden cursor-pointer aspect-video bg-gray-100 shadow-2xl shadow-[#293659]/10 border border-gray-200"
              onClick={() => setActiveVideo(featuredVideo)}
            >
              <img 
                src={featuredVideo.thumbnail} 
                alt={featuredVideo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              
              {/* Keep a dark gradient over the image inside the card so the white text is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#293659] transform group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-xl pl-2">
                  <Play className="w-10 h-10 fill-current" />
                </div>
              </div>

              {/* Text Info (Kept white for contrast against the image) */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-brand-primary font-bold tracking-[0.2em] text-sm uppercase mb-3">
                    {featuredVideo.subtitle}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-4">
                    {featuredVideo.title}
                  </h2>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    <span>{featuredVideo.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Grid Section */}
        <section className="py-20 px-6 mb-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">
                4 Latest Releases / Updates Around Osiyan Habitat
              </h3>
              <div className="h-[2px] bg-gray-100 flex-grow rounded-full"></div>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpContainer}
            >
              {videoGrid.map((video) => (
                <motion.div 
                  key={video.id}
                  variants={fadeUpItem}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="relative rounded-[2rem] overflow-hidden aspect-video bg-gray-100 border border-gray-100 mb-6 shadow-sm group-hover:shadow-xl group-hover:shadow-[#293659]/5 transition-all duration-500">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Soft dark overlay on thumbnails */}
                    <div className="absolute inset-0 bg-[#1a1a1a]/20 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#293659] border border-white/50 transform group-hover:scale-110 group-hover:bg-[#293659] group-hover:text-white transition-all duration-500 shadow-md pl-1">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>

                    {/* Light Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-gray-900 text-xs font-bold shadow-sm">
                      <Clock className="w-3.5 h-3.5" />
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-2">
                      {video.category}
                    </p>
                    {/* Dark text for the light theme */}
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-[#293659] transition-colors">
                      {video.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />

        {/* Full Screen Video Modal - Kept Dark for the "Theater" Experience */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-[#0a0a0a]/95 backdrop-blur-xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-gray-900 transition-colors duration-300 z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Player Container */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              >
                <iframe 
                  src={activeVideo.videoUrl} 
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SmoothScroll>
  );
}