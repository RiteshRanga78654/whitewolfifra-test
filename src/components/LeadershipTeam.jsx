"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

const TEAM = [
  {
    name: "Bhaswar Paul",
    title: "Strategic Advisor – Branding, Marketing & Project Conceptualization",
    photo: "/assets/leadership/Bhaswar_Paul_1.png",
    bio: `Mr. Bhaswar Paul is a seasoned real estate professional, a distinguished real estate strategist with over three decades of experience in driving transformative projects across residential, commercial, leisure and retail sectors. An author, coach, trainer and an entrepreneur, Bhaswar is the Founder & CEO of IREED India, one of India's leading real estate education and industry development platforms. 

Bhaswar has led high impact projects, leveraging his expertise in opportunity identification, project feasibility, and execution. With extensive experience in branding, marketing, sales strategy, and business development, he has played a pivotal role in shaping successful real estate ventures across the country.

As the Strategic Advisor to White Wolf Infra for its upcoming developments, Bhaswar is actively involved in project conceptualization, brand positioning, marketing strategy, and industry outreach. Leveraging his deep understanding of consumer behavior, market trends, and industry networks, he contributes towards creating differentiated project identities and enhancing market acceptance.

For Osiyan Habitat, Bhaswar brings his expertise in branding, concept development, and strategic marketing, ensuring that the project is positioned as a landmark development, value creation for homebuyers and investors alike. His strong industry connect and vision driven approach continue to support White Wolf Infra in creating projects that resonate with evolving customer aspirations and market dynamics.

`,
  },
  {
    name: "Rohan Vimal",
    title: "Building Upon a Legacy of Excellence, Integrity, and Lasting Value",
    photo: "/assets/leadership/Rohan.png",
    bio: `Mr. Rohan Vimal: Building Upon a Legacy of Excellence, an Engineering graduate in Civil Engineering from the prestigious Delhi College of Engineering, has demonstrated remarkable growth and achievement throughout his professional journey. With a strong technical foundation and an inherent passion for the built environment, he represents a new generation of real estate professionals committed to creating enduring value.

His interest in real estate and infrastructure was nurtured from an early age. Growing up, he was deeply influenced by his father, Mr. Shashi Shekhar Vimal, who played a significant role in the infrastructural development of the prominent residential and commercial hub of Shivalik, Malviya Nagar, New Delhi. Observing these developments firsthand provided Rohan with invaluable insights into the principles of quality construction, meticulous planning, and customer centric development.

Throughout his formative years, he was immersed in an environment where real estate was viewed not merely as a business transaction, but as a commitment to delivering excellence, trust, and long-term value to customers. The emphasis on superior construction standards, integrity, and customer satisfaction became deeply ingrained in his professional outlook. Inspired by this legacy, Rohan naturally gravitated towards a career in the real estate and built-environment sector. His objective has always been to uphold and further strengthen the values that shaped his upbringing delivering projects that exceed customer expectations and creating spaces that enrich lives.

Today, he continues to carry forward his family's legacy with a steadfast commitment to service excellence, quality craftsmanship, and customer satisfaction. By combining technical expertise with a deep understanding of client needs, he strives to contribute meaningfully to the development of sustainable and vibrant communities while maintaining the highest standards of professional integrity.`,
  },
  {
    name: "Vivek Yadav",
    title: "Carrying Forward a Legacy of Vision and Value Creation",
    photo: "/assets/leadership/vivek-yadav.jpeg",
    bio: `Today, the third generation of leadership is represented by Mr. Vivek Yadav, who carries forward the impactful vision and values established by his predecessors. An alumnus of the Berlin School of Economics and Law, Germany, and the University of Salford, United Kingdom, he brings a unique blend of global education, entrepreneurial thinking, and a deep commitment to community development.

While inheriting a rich legacy of educational excellence and social contribution, Mr. Vivek Yadav has charted his own path in the field of real estate development. Driven by a passion for value creation and sustainable community growth, he envisioned residential developments that go beyond conventional housing to create enduring assets for families and future generations. His exposure to international best practices in Germany and the United Kingdom has shaped his understanding of urban living, design efficiency, sustainability, and community-centric development. Drawing upon these experiences, he has sought to conceptualize and develop living spaces that offer not merely homes, but an enhanced quality of life, fostering well-being, connectivity, and long-term value for residents.

At the core of his philosophy lies a simple yet powerful belief, real estate should create meaningful and lasting value for its occupants while serving as a foundation for generational wealth creation. Guided by this principle, he continues to pursue projects that combine thoughtful planning, modern infrastructure, and a strong sense of community.
`,
  },
];

const HEADER_OFFSET = 120;

export default function LeadershipTeam() {
  const [idx, setIdx] = useState(null);
  const [dir, setDir] = useState(0);
  const panelRef = useRef(null);

  const prev = useCallback(() => {
    setDir(-1);
    setIdx((i) => (i === 0 ? TEAM.length - 1 : i - 1));
  }, []);

  const next = useCallback(() => {
    setDir(1);
    setIdx((i) => (i === TEAM.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    if (idx === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);

    if (panelRef.current) {
      const top =
        panelRef.current.getBoundingClientRect().top +
        window.scrollY -
        HEADER_OFFSET;
      const distance = Math.abs(window.scrollY - top);
      if (distance > 10) {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }

    return () => window.removeEventListener("keydown", onKey);
  }, [idx, prev, next]);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 150 : -150, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35 } },
    exit: (d) => ({
      x: d > 0 ? -150 : 150,
      opacity: 0,
      transition: { duration: 0.35 },
    }),
  };

  const LinkedInBadge = ({ url }) =>
    url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-2 z-10 p-[6px] backdrop-blur group-hover:bg-white shadow transition-colors duration-300"
      >
        <FaLinkedin className="text-[#0A66C2]" />
      </a>
    ) : null;

  return (
    <section className="font-manrope py-20 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 bg-white relative">
      {/* Title Header */}
      <div className="max-w-7xl mx-auto text-center mt-0 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-brand-primary font-bold uppercase tracking-[0.2em] text-sm mb-2">
            A TEAM WITH EXPERIENCE AND VISION
          </p>
        </motion.div>
      </div>

      <div className="max-w-8xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 place-items-center">
          {TEAM.map((p, i) => (
            <article
              key={p.name}
              onClick={() => {
                setIdx(i);
                setDir(0);
              }}
              className="group flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIdx(i);
                  setDir(0);
                }
              }}
            >
              <div className="relative w-full max-w-[320px] sm:max-w-[320px] md:max-w-[350px] aspect-[3/4] overflow-hidden rounded-md border-[1.5px] border-white/70 shadow-lg hover:shadow-2xl transition-all duration-300">
                <LinkedInBadge url={p.linkedin} />
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 350px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-90"
                  priority={i === 0}
                />
              </div>
              <h3
                className="mt-6 text-[16px] md:text-[1.6rem] font-bold tracking-tight text-gray-900 leading-tight text-center px-2 transition-colors duration-300 group-hover:text-brand-primary"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {p.name}
              </h3>
              <p className="text-sm md:text-base text-gray-500 font-medium tracking-wider text-center px-2 mt-2">
                {p.title}
              </p>
            </article>
          ))}
        </div>

        {/* Bio Drawer Panel */}
        {idx !== null && (
          <div
            ref={panelRef}
            className="relative mt-12 overflow-hidden rounded-lg flex flex-col lg:flex-row scroll-mt-20 sm:scroll-mt-32 md:scroll-mt-40 w-full shadow-2xl border border-gray-100 bg-gray-50"
          >
            {/* Close Button */}
            <button
              onClick={() => setIdx(null)}
              className="absolute top-4 right-4 z-20 text-2xl text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-full bg-white/80 hover:bg-white shadow-sm"
              aria-label="Close"
            >
              <FiX />
            </button>

            {/* Desktop Nav Arrows */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="hidden lg:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-12 h-14 bg-white/90 text-gray-800 rounded-r-md hover:bg-white transition-all shadow-md z-20 hover:text-brand-primary"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="hidden lg:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-12 h-14 bg-white/90 text-gray-800 rounded-l-md hover:bg-white transition-all shadow-md z-20 hover:text-brand-primary"
            >
              <FiChevronRight size={24} />
            </button>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col lg:flex-row w-full"
              >
                {/* ── MOBILE: natural aspect-ratio image (no crop) ── */}
                <div className="lg:hidden relative w-full">
                  {/* aspect-[3/4] lets the full portrait show without cutting */}
                  <div className="relative w-full aspect-[3/4]">
                    <LinkedInBadge url={TEAM[idx].linkedin} />
                    <Image
                      src={TEAM[idx].photo}
                      alt={TEAM[idx].name}
                      fill
                      sizes="100vw"
                      className="object-contain object-top bg-gray-100"
                    />
                  </div>

                  {/* Mobile nav arrows — sit just below the image */}
                  <div className="flex justify-center gap-4 py-3 bg-white">
                    <button
                      onClick={prev}
                      aria-label="Previous"
                      className="flex items-center justify-center w-10 h-10 bg-black/70 text-white rounded-full hover:bg-black transition-colors shadow-md"
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next"
                      className="flex items-center justify-center w-10 h-10 bg-black/70 text-white rounded-full hover:bg-black transition-colors shadow-md"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* ── DESKTOP: fixed-width sidebar image (original behaviour) ── */}
                <div className="hidden lg:block relative lg:basis-[35%] lg:min-h-[500px] lg:max-w-[500px]">
                  <LinkedInBadge url={TEAM[idx].linkedin} />
                  <Image
                    src={TEAM[idx].photo}
                    alt={TEAM[idx].name}
                    fill
                    sizes="35vw"
                    className="object-cover"
                  />
                </div>

                {/* Panel Text */}
                <div className="w-full lg:basis-[65%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white">
                  <h3 className="text-3xl lg:text-4xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                    {TEAM[idx].name}
                  </h3>
                  <p className="mt-2 text-base lg:text-lg font-bold text-brand-primary uppercase tracking-wide">
                    {TEAM[idx].title}
                  </p>
                  <div className="w-12 h-0.5 bg-gray-200 my-4" />
                  <p className="leading-relaxed text-gray-600 font-medium whitespace-pre-line text-sm sm:text-base md:text-lg">
                    {TEAM[idx].bio}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}