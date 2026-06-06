// 'use client';

// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const categories = ['All', 'Facebook', 'Infographics', 'Instagram', 'LinkedIn'];

// const creatives = [
//   {
//     id: 1,
//     title: 'Osiyan Habitat',
//     category: 'Infographics',
//     image: '/assets/creative/1.webp',
//   },
//   {
//     id: 2,
//     title: 'ATS Sohna Floor',
//     category: 'Instagram',
//     image: '/assets/creative/2.webp',
//   },
//   {
//     id: 3,
//     title: 'Suncity Monarch',
//     category: 'Facebook',
//     image: '/assets/creative/3.webp',
//   },
//   {
//     id: 4,
//     title: 'Premium Villa',
//     category: 'LinkedIn',
//     image: '/assets/creative/1.webp',
//   },
//   {
//     id: 5,
//     title: 'Belmond Estate',
//     category: 'Infographics',
//     image: '/assets/creative/2.webp',
//   },
//   {
//     id: 6,
//     title: 'Royal Heights',
//     category: 'Facebook',
//     image: '/assets/creative/3.webp',
//   },
// ];

// export default function CreativeSlider() {
//   const [activeTab, setActiveTab] = useState('All');
//   const sliderRef = useRef(null);

//   const filtered =
//     activeTab === 'All'
//       ? creatives
//       : creatives.filter((c) => c.category === activeTab);

//   // Drag-to-scroll
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   const onMouseDown = (e) => {
//     isDragging.current = true;
//     startX.current = e.pageX - sliderRef.current.offsetLeft;
//     scrollLeft.current = sliderRef.current.scrollLeft;
//     sliderRef.current.style.cursor = 'grabbing';
//   };
//   const onMouseLeave = () => {
//     isDragging.current = false;
//     if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
//   };
//   const onMouseUp = () => {
//     isDragging.current = false;
//     if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
//   };
//   const onMouseMove = (e) => {
//     if (!isDragging.current) return;
//     e.preventDefault();
//     const x = e.pageX - sliderRef.current.offsetLeft;
//     const walk = (x - startX.current) * 1.5;
//     sliderRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   return (
//     <section className="relative w-full bg-white py-24 overflow-hidden font-sans">

//       <div className="max-w-7xl mx-auto px-6 relative z-10">

//         {/* Section header */}
//         <div className="mb-10 flex items-end justify-between">
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-2 h-2 rounded-full bg-brand-primary" />
//               <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">
//                 Our Work
//               </span>
//             </div>
//             <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
//               Our{' '}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#293659] to-gray-400">
//                 Creatives
//               </span>
//             </h2>
//           </div>

//           {/* Nav Arrows */}
//           <div className="flex items-center gap-3">
//             <motion.button
//               whileHover={{ scale: 1.08 }}
//               whileTap={{ scale: 0.93 }}
//               onClick={() => {
//                 sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
//               }}
//               className="flex items-center justify-center w-11 h-11 rounded-full focus:outline-none transition-all duration-300"
//               style={{
//                 border: '1.5px solid #293659',
//                 color: '#293659',
//                 background: 'transparent',
//               }}
//               onMouseEnter={e => { e.currentTarget.style.background = '#293659'; e.currentTarget.style.color = '#fff'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#293659'; }}
//               aria-label="Scroll left"
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="15 18 9 12 15 6" />
//               </svg>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.08 }}
//               whileTap={{ scale: 0.93 }}
//               onClick={() => {
//                 sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
//               }}
//               className="flex items-center justify-center w-11 h-11 rounded-full focus:outline-none transition-all duration-300"
//               style={{
//                 border: '1.5px solid #293659',
//                 color: '#fff',
//                 background: '#293659',
//               }}
//               onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#293659'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = '#293659'; e.currentTarget.style.color = '#fff'; }}
//               aria-label="Scroll right"
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="9 18 15 12 9 6" />
//               </svg>
//             </motion.button>
//           </div>
//         </div>

//         {/* Filter pills — centered */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {categories.map((cat) => {
//             const isActive = activeTab === cat;
//             return (
//               <motion.button
//                 key={cat}
//                 onClick={() => setActiveTab(cat)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 className="px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none"
//                 style={{
//                   background: isActive ? '#293659' : 'transparent',
//                   color: isActive ? '#fff' : '#293659',
//                   border: '1.5px solid #293659',
//                   boxShadow: isActive ? '0 4px 18px rgba(41,54,89,0.25)' : 'none',
//                 }}
//               >
//                 {cat}
//               </motion.button>
//             );
//           })}
//         </div>

//         {/* Slider */}
//         <div className="relative">
//           {/* Left fade */}
//           <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
//           {/* Right fade */}
//           <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

//           <div
//             ref={sliderRef}
//             className="flex gap-5 overflow-x-auto pb-4 select-none"
//             style={{
//               cursor: 'grab',
//               scrollbarWidth: 'none',
//               msOverflowStyle: 'none',
//             }}
//             onMouseDown={onMouseDown}
//             onMouseLeave={onMouseLeave}
//             onMouseUp={onMouseUp}
//             onMouseMove={onMouseMove}
//           >
//             <AnimatePresence mode="popLayout">
//               {filtered.map((item, idx) => (
//                 <motion.div
//                   key={item.id}
//                   layout
//                   initial={{ opacity: 0, scale: 0.92, y: 20 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.88, y: 20 }}
//                   transition={{ duration: 0.4, delay: idx * 0.06 }}
//                   className="group relative flex-shrink-0 overflow-hidden rounded-2xl"
//                   style={{
//                     width: '300px',
//                     height: '420px',
//                     border: '1px solid #E6E6E6',
//                     boxShadow: '0 8px 32px rgba(41,54,89,0.10)',
//                   }}
//                 >
//                   {/* Pure image — no overlay */}
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     draggable={false}
//                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                   />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           <style>{`div::-webkit-scrollbar { display: none; }`}</style>
//         </div>

//         {/* Bottom hairline */}
//         <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gray-100" />
//       </div>
//     </section>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const categories = ['All', 'Facebook', 'Infographics', 'Instagram', 'LinkedIn'];

// const creatives = [
//   {
//     id: 1,
//     title: 'Osiyan Habitat',
//     category: 'Infographics',
//     image: '/assets/creative/1.webp',
//   },
//   {
//     id: 2,
//     title: 'ATS Sohna Floor',
//     category: 'Instagram',
//     image: '/assets/creative/2.webp',
//   },
//   {
//     id: 3,
//     title: 'Suncity Monarch',
//     category: 'Facebook',
//     image: '/assets/creative/3.webp',
//   },
//   {
//     id: 4,
//     title: 'Premium Villa',
//     category: 'LinkedIn',
//     image: '/assets/creative/1.webp',
//   },
//   {
//     id: 5,
//     title: 'Belmond Estate',
//     category: 'Infographics',
//     image: '/assets/creative/2.webp',
//   },
//   {
//     id: 6,
//     title: 'Royal Heights',
//     category: 'Facebook',
//     image: '/assets/creative/3.webp',
//   },
// ];

// export default function CreativeGridFour() {
//   const [activeTab, setActiveTab] = useState('All');

//   const filtered =
//     activeTab === 'All'
//       ? creatives
//       : creatives.filter((c) => c.category === activeTab);

//   return (
//     <section className="relative w-full bg-white py-24 overflow-hidden font-sans">
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* Section header */}
//         <div className="mb-10 flex items-end justify-between">
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-2 h-2 rounded-full bg-brand-primary" />
//               <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">
//                 Our Work
//               </span>
//             </div>
//             <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
//               Our{' '}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#293659] to-gray-400">
//                 Creatives
//               </span>
//             </h2>
//           </div>
//         </div>

//         {/* Filter pills — centered */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {categories.map((cat) => {
//             const isActive = activeTab === cat;
//             return (
//               <motion.button
//                 key={cat}
//                 onClick={() => setActiveTab(cat)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 className="px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none"
//                 style={{
//                   background: isActive ? '#293659' : 'transparent',
//                   color: isActive ? '#fff' : '#293659',
//                   border: '1.5px solid #293659',
//                   boxShadow: isActive ? '0 4px 18px rgba(41,54,89,0.25)' : 'none',
//                 }}
//               >
//                 {cat}
//               </motion.button>
//             );
//           })}
//         </div>

//         {/* 4-Column Centered Grid */}
//         <motion.div 
//           layout
//           className="flex flex-wrap justify-center xl:grid xl:grid-cols-4 gap-5"
//         >
//           <AnimatePresence mode="popLayout">
//             {filtered.map((item, idx) => (
//               <motion.div
//                 key={item.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.92, y: 20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.88, y: 20 }}
//                 transition={{ duration: 0.4, delay: idx * 0.04 }}
//                 className="group relative overflow-hidden rounded-2xl w-full max-w-[300px] sm:w-[calc(50%-10px)] xl:w-auto"
//                 style={{
//                   height: '420px',
//                   border: '1px solid #E6E6E6',
//                   boxShadow: '0 8px 32px rgba(41,54,89,0.10)',
//                 }}
//               >
//                 {/* Pure image — no overlay */}
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   draggable={false}
//                   className="absolute inset-0 w-full h-full object-fit transition-transform duration-700 ease-out group-hover:scale-105"
//                 />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* Bottom hairline */}
//         <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gray-100" />
//       </div>
//     </section>
//   );
// }



'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Township', 'Low Rise'];

const creatives = [
  { id: 1, title: "Osiyan Habitat",  category: 'Township', image: '/assets/creative/1.jpeg' },
  { id: 2, title: "Osiyan Habitat",  category: 'Township',    image:  '/assets/creative/2.jpeg' },
  { id: 3, title: "Osiyan Habitat",  category: 'Township',     image: '/assets/creative/3.jpeg' },
  { id: 4, title: "Osiyan Habitat",  category: 'Township',     image: '/assets/creative/4.jpeg' },
  { id: 5, title: "Osiyan Habitat",  category: 'Township', image: '/assets/creative/5.jpeg' },
  { id: 6, title: "Osiyan Habitat",  category: 'Township',     image: '/assets/creative/6.jpeg' },
  { id: 7, title: "Osiyan Habitat",  category: 'Township',     image: '/assets/creative/7.jpeg' },
  { id: 8, title: "Osiyan Habitat",  category: 'Township', image: '/assets/creative/8.jpeg' },
  { id: 9, title: "Osiyan Habitat",  category: 'Township',     image: '/assets/creative/9.jpeg' },
];

const downloadImage = (url, filename) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
};

export default function CreativeGridFour() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? creatives
      : creatives.filter((c) => c.category === activeTab);

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">
                Our Work
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#293659] to-gray-400">
                Creatives
              </span>
            </h2>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveTab(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none"
                style={{
                  background: isActive ? '#293659' : 'transparent',
                  color: isActive ? '#fff' : '#293659',
                  border: '1.5px solid #293659',
                  boxShadow: isActive ? '0 4px 18px rgba(41,54,89,0.25)' : 'none',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="flex flex-wrap justify-center xl:grid xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group relative overflow-hidden rounded-2xl w-full max-w-[300px] sm:w-[calc(50%-10px)] xl:w-auto"
                style={{
                  height: '420px',
                  border: '1px solid #E6E6E6',
                  boxShadow: '0 8px 32px rgba(41,54,89,0.10)',
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-fit transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(item.image, `${item.title}.webp`);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/80 text-white cursor-pointer focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v13M7 11l5 5 5-5" />
                      <path d="M4 20h16" />
                    </svg>
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gray-100" />
      </div>
    </section>
  );
}