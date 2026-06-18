// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import Navbar from '../components/Navbar';
// import KeyboardScroll from '../components/KeyboardScroll';
// import WhyChooseUs from '../components/WhyChooseUs';
// import Features from '../components/Features';
// import Footer from '../components/Footer';
// import Testimonials from '../components/Testimonials';
// import Contact from '../components/Contact';
// import AboutUs from '../components/AboutUs';
// import SmoothScroll from '../components/SmoothScroll';
// import PromoPopup from '../components/PromoPopup';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function Home() {
//   const [isGlobalLoading, setIsGlobalLoading] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const [hasMounted, setHasMounted] = useState(false);

//   const handleLoadComplete = useCallback(() => {
//     setIsGlobalLoading(false);
//   }, []);

//   useEffect(() => {
//     setHasMounted(true);
//     window.scrollTo(0, 0);
//     if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
//       window.history.scrollRestoration = 'manual';
//     }
//   }, []);

//   if (!hasMounted) return null;

//   return (
//     <div className="bg-white min-h-screen relative" suppressHydrationWarning>
//       <PromoPopup ready={!isGlobalLoading} />
//       <SmoothScroll>
//         {/* Global Premium Preloader */}
//         <AnimatePresence>
//           {isGlobalLoading && (
//             <motion.div 
//               key="global-loader"
//               exit={{ opacity: 0, scale: 1.1 }}
//               transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
//               className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black"
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//                 className="text-center"
//               >
//                 <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
//                   WHITE WOLF INFRA<span className="text-brand-primary">.</span>
//                 </h1>
//                 <div className="w-64 h-[1px] bg-white/10 rounded-full overflow-hidden relative mx-auto">
//                   <motion.div 
//                     className="absolute inset-y-0 left-0 bg-brand-primary"
//                     animate={{ width: `${progress}%` }}
//                   />
//                 </div>
//                 <p className="mt-4 text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase">
//                   Initializing Luxury // {progress}%
//                 </p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <main className={`w-full relative ${isGlobalLoading ? 'h-screen overflow-hidden' : ''}`}>
//           <Navbar />
//           {/* Pass state up from KeyboardScroll */}
//           <KeyboardScroll 
//             onProgress={setProgress} 
//             onLoadComplete={handleLoadComplete} 
//           />
//           {!isGlobalLoading && (
//             <>
//               <AboutUs />
//               <WhyChooseUs />
//               <Features />
//               <Testimonials />
//               <Contact />
//               <Footer />
//             </>
//           )}
//         </main>
//       </SmoothScroll>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import KeyboardScroll from '../components/KeyboardScroll';
import WhyChooseUs from '../components/WhyChooseUs';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AboutUs from '../components/AboutUs';
import SmoothScroll from '../components/SmoothScroll';
import PromoPopup from '../components/PromoPopup';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  // Replace this URL with your actual CRM link
  const CRM_URL = 'https://white-wolf-infra.ftroverseas.com/';

  const handleLoadComplete = useCallback(() => {
    setIsGlobalLoading(false);
  }, []);

  useEffect(() => {
    setHasMounted(true);
    window.scrollTo(0, 0);
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="bg-white min-h-screen relative" suppressHydrationWarning>
      <PromoPopup ready={!isGlobalLoading} />
      <SmoothScroll>
        {/* Global Premium Preloader */}
        <AnimatePresence>
          {isGlobalLoading && (
            <motion.div 
              key="global-loader"
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                  WHITE WOLF INFRA<span className="text-brand-primary">.</span>
                </h1>
                <div className="w-64 h-[1px] bg-white/10 rounded-full overflow-hidden relative mx-auto">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-brand-primary"
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-4 text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase">
                  Initializing Luxury // {progress}%
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className={`w-full relative ${isGlobalLoading ? 'h-screen overflow-hidden' : ''}`}>
          <Navbar />
          {/* Pass state up from KeyboardScroll */}
          <KeyboardScroll 
            onProgress={setProgress} 
            onLoadComplete={handleLoadComplete} 
          />
          {!isGlobalLoading && (
            <>
              <AboutUs />
              <WhyChooseUs />
              <Features />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          )}
        </main>
      </SmoothScroll>

      {/* Aesthetic Blue & White Border CRM Button */}
      <AnimatePresence>
        {!isGlobalLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="fixed bottom-8 right-8 z-[1000]"
          >
            <motion.a
              href={CRM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.94 }}
              className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#293659] text-white border-[3px] border-white shadow-[0_15px_35px_rgba(37,99,235,0.35),0_5px_15px_rgba(0,0,0,0.1)] group overflow-hidden transition-colors duration-300 hover:bg-blue-700"
            >
              {/* Luxury Gloss Shine Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#293659] via-transparent to-white/20 pointer-events-none" />
              
              {/* Dynamic Hover Radial Light */}
              <div className="absolute inset-0 bg-radial-gradient from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Animated Light Beam Sweep */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 group-hover:animate-[shine_0.8s_ease-in-out]" />

              {/* Content Container */}
              <div className="relative flex flex-col items-center justify-center gap-0.5 z-10 transition-transform duration-300 group-hover:scale-105">
                {/* Modern Enterprise Cloud Icon */}
                <svg 
                  className="w-6 h-6 text-white drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                
                {/* Clean, high-end tracking font */}
                <span className="text-[10px] tracking-[0.2em] font-bold text-white uppercase ml-[0.2em] drop-shadow-sm">
                  CRM
                </span>
              </div>

              {/* Clean White Micro Status Dot */}
              <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-white"></span>
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}