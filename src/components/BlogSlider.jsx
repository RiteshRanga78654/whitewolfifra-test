"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// ---- Static project data (replace image with your real assets) ----
const PROJECTS = [
  {
    id: "vista-al-valle",
    name: "Vista Al Valle",
    location: "Vengurla, Sindhudurg",
    tag: "Studio Apartments",
    image: "/assets/blog/vridava.png",
    Link: "/blogs/vrindavan",
  },
  {
    id: "swaragya",
    name: "Swaragya by Innovest",
    location: "Vengurla, Sindhudurg",
    tag: "Farm Bungalows & Villas",
    image: "/assets/blog/ocean.png",
    Link: "/blogs/goa",
  },
  {
    id: "osiyan-habitat",
    name: "Osiyan Habitat",
    location: "Vengurla, Sindhudurg",
    tag: "Premium Villas",
    image: "/assets/blog/hills.png",
    Link: "/blogs/himachal-pardesh",
  },
];

const SWIPE_THRESHOLD = 60;
const AUTOPLAY_DELAY = 3500; // ms between auto-advances

export default function ProjectsSlider() {
  const [index, setIndex] = useState(0);
  // direction: +1 means moving forward (content flows right -> left)
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const len = PROJECTS.length;
  const getIdx = (offset) => (index + offset + len) % len;

  const goTo = useCallback(
    (newIndex, dir = 1) => {
      setDirection(dir);
      setIndex((prev) => (newIndex + len) % len);
    },
    [len],
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % len);
  }, [len]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + len) % len);
  }, [len]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  // ---- Autoplay: right -> left continuous loop ----
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      next();
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [isPaused, next]);

  const slots = [
    { offset: -1, role: "prev" },
    { offset: 0, role: "active" },
    { offset: 1, role: "next" },
  ];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F6F6F4] py-20 md:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-5xl px-6 text-center md:mb-16">
        <h2 className="text-4xl font-semibold tracking-tight text-[#1C2433] md:text-5xl">
          Building Dreams, Creating Landmarks
        </h2>
        <p className="mt-4 text-base mx-auto mb-12 max-w-2xl leading-relaxed text-[#6B7280] md:text-lg">
          Take a closer look at our exceptional projects and discover spaces
          designed for modern lifestyles and lasting value.
        </p>
      </div>

      {/* Slider stage */}
      <div className="relative mx-auto flex h-[420px] max-w-6xl items-center justify-center px-4 md:h-[520px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {slots.map(({ offset, role }) => {
            const project = PROJECTS[getIdx(offset)];
            const isActive = role === "active";
            const isPrev = role === "prev";

            return (
              <motion.div
                key={`${project.id}-${role}-${index}`}
                custom={direction}
                className={`absolute top-0 h-full overflow-hidden rounded-3xl ${
                  isActive
                    ? "z-20 cursor-grab active:cursor-grabbing"
                    : "z-10 cursor-pointer"
                }`}
                style={{
                  width: isActive ? "min(72vw, 1000px)" : "min(60vw, 620px)",
                }}
                initial={(dir) => ({
                  x: isActive
                    ? dir > 0
                      ? "30%"
                      : "-30%"
                    : isPrev
                      ? "-78%"
                      : "78%",
                  scale: isActive ? 0.96 : 0.88,
                  opacity: isActive ? 0 : 0.55,
                  filter: isActive ? "blur(4px)" : "blur(1px)",
                })}
                animate={{
                  x: isActive ? 0 : isPrev ? "-78%" : "78%",
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.55,
                  filter: isActive ? "blur(0px)" : "blur(1px)",
                }}
                exit={(dir) => ({
                  x: isActive
                    ? dir > 0
                      ? "-30%"
                      : "30%"
                    : isPrev
                      ? "-78%"
                      : "78%",
                  scale: isActive ? 0.96 : 0.88,
                  opacity: isActive ? 0 : 0,
                  filter: "blur(4px)",
                })}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (role === "prev") prev();
                  if (role === "next") next();
                }}
              >
                <SlideCard project={project} isActive={isActive} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Arrows */}
        <button
          aria-label="Previous project"
          onClick={prev}
          className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#293659] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:left-6"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        <button
          aria-label="Next project"
          onClick={next}
          className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#293659] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:right-6"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            aria-label={`Go to ${p.name}`}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-[#293659]" : "w-2 bg-[#D1D5CE]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function SlideCard({ project, isActive }) {
  return (
    <div className="relative h-full w-full select-none">
    <a href={project.Link} target="_blank" rel="noopener noreferrer">
      <Image
        src={project.image}
        alt={project.name}
        fill
        draggable={false}
        sizes="(max-width: 768px) 90vw, 1000px"
        className="object-cover"
        priority={isActive}
      />
    </a>

      {/* Bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* External link button */}
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1C2433] backdrop-blur-sm">
        <ArrowUpRight size={18} />
      </div>

      {/* Content */}
      <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3
            className={`font-semibold text-white ${
              isActive ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
            }`}
          >
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-white/80">{project.location}</p>
          <span className="mt-3 inline-block rounded-full bg-[#293659] px-4 py-1.5 text-sm font-medium text-[#fff]">
            {project.tag}
          </span>
        </div>

        {isActive && (
       <a href={project.Link} target="_blank" rel="noopener noreferrer">
          <button className="rounded-full bg-[#293659] px-5 py-2.5 text-sm font-medium text-[#fff] transition-transform hover:scale-105">
            Know More
          </button>
        </a>
        )}
      </div>
    </div>
  );
}
