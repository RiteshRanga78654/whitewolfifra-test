'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import Link from 'next/link';

const projects = [
  {
    id: "osiyan-habitat",
    name: "Osiyan Habitat",
    location: "Jhajjar, Haryana",
    scheme: "DDJAY",
    type: "Plotted Development",
    description: "In Jain Dharma, Osiyan (or Osian) is a highly significant ancient town, pilgrimage center, and the birthplace of the Oswal Jain community. It is widely celebrated for its architectural treasures and its role in the spread of Jainism in Western India.",
    details: [
      { label: "Project Identity", value: "Premium DDJAY plotted development." },
      { label: "Strategic Location", value: "Situated in the growing hub of Jhajjar." },
      { label: "Spacious Living", value: "5.95 acres with avg plot size of 145 sq.yd" },
      { label: "Limited Inventory", value: "Exclusive community with < 94 plots." }
    ],
    image: "/assets/o.jpeg"
  },
  {
    id: "ats-sohna-floor",
    name: "Ornate Floor",
    location: "Sohna, Gurgaon",
    scheme: "Premium Floors",
    type: "Low Rise Builder Floors",
    description: "Experience the pinnacle of luxury living with ATS Sohna Floor. These low-rise builder floors offer a perfect blend of modern amenities, secure living, and private spaces designed for the discerning elite.",
    details: [
      { label: "Starting From", value: "₹ 1.69* Cr Onwards" },
      { label: "Premium Living", value: "Elegantly designed spacious interiors." },
      { label: "Secure & Private", value: "Gated community with 24/7 security." },
      { label: "Modern Amenities", value: "Clubhouse, gym, and landscaped gardens." }
    ],
    image: "/ats_sohna_floor_1778484325269.png"
  }
];

function ProjectCard({ project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group w-full"
    >
      <div 
        className="relative overflow-hidden border border-gray-100 flex flex-col min-h-[420px] bg-white rounded-[1.5rem] shadow-xl transition-all duration-500 hover:shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image Section */}
        <div className="w-full h-[290px] relative overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute top-4 left-4" style={{ transform: "translateZ(40px)" }}>
            <span className="px-3 py-1 bg-brand-primary text-white rounded-full text-[9px] font-black tracking-[0.2em] uppercase shadow-lg">
              {project.scheme}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col justify-between flex-grow" style={{ transformStyle: "preserve-3d" }}>
          <div style={{ transform: "translateZ(60px)" }}>
            <div className="flex justify-between items-center mb-3">
              <p className="text-brand-primary font-black tracking-[0.2em] uppercase text-[11px]">
                {project.location}
              </p>
              <span className="text-black/20 font-mono text-[9px] uppercase tracking-widest font-bold">Featured</span>
            </div>
            
            <h3 className="text-3xl font-black text-black tracking-tighter mb-6 leading-tight">
              {project.name}<span className="text-brand-primary">.</span>
            </h3>

            <div className="grid grid-cols-2 gap-4" style={{ transform: "translateZ(30px)" }}>
              {project.details.slice(0, 4).map((detail, idx) => (
                <div key={idx} className="group/detail">
                  <p className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1 group-hover/detail:text-brand-primary transition-colors">{detail.label}</p>
                  <p className="text-[12px] text-black/80 font-bold leading-tight">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Link href={`/projects/${project.id}`} className="block w-full">
            <button 
              style={{ transform: "translateZ(50px)" }}
              className="mt-6 w-full py-3 bg-black text-white rounded-xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-brand-primary transition-all transform active:scale-95 shadow-xl"
            >
              View Details
            </button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="projects" className="w-full bg-[#fcfcfc] py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tighter mb-4 uppercase">
            Beginning with the Best <span className="text-brand-primary"></span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            "Beginning with consumer adaptable estates depicts intent of product innovation and the urge to deliver equilibrium."
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
