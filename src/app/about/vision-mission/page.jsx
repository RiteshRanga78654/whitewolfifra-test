"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SmoothScroll from "../../../components/SmoothScroll";
import {
  Handshake,
  Trees,
  CalendarCheck,
  Home,
  Lightbulb,
  Route,
  Layers,
  Activity,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.15 },
};

const fadeUpItem = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

/* ── Reusable 3-D tilt wrapper ── */
function TiltCard({ children, className = "", delay = 0 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  return (
    <motion.div
      {...fadeUp(delay)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Value card with tilt ── */
function ValueCard({ v, i }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 120, damping: 18 });
  const ySpring = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  return (
    <motion.div
      variants={fadeUpItem}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative"
    >
      <div
        className="relative p-6 rounded-2xl border border-[#212946]/8 bg-white hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-300 h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* floating icon */}
        <div
          className="w-11 h-11 rounded-xl bg-[#212946]/6 flex items-center justify-center text-[#212946] mb-5 group-hover:bg-[#212946] group-hover:text-white transition-all duration-300"
          style={{ transform: "translateZ(30px)" }}
        >
          <v.icon className="w-7 h-7" strokeWidth={1.5} />
        </div>

        {/* floating text */}
        <div style={{ transform: "translateZ(20px)" }}>
          <h4
            className="font-black text-lg text-[#212946] mb-2 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {v.title}
          </h4>
          <p className="text-[#212946]/45 text-sm leading-relaxed">{v.desc}</p>
        </div>

        {/* subtle shimmer line on hover */}
        <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#212946]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </motion.div>
  );
}

export default function PremiumVisionMission() {
 const coreValues = [
  {
    title: "Treasuring Trust",
    desc: "Trust wins people so do we.",
    icon: Handshake, // Represents trust, partnership, and winning people over
  },
  {
    title: "Prioritizing Environment",
    desc: "Surroundings builds civic structure.",
    icon: Trees, // Represents the surrounding environment and nature
  },
  {
    title: "Marking Time",
    desc: "Time driven world demands on time completions.",
    icon: CalendarCheck, // Represents timely completions and meeting deadlines
  },
  {
    title: "Procuring Livelihood",
    desc: "Living spaces brings life long settlements.",
    icon: Home, // Represents living spaces and lifelong settlements
  },
  {
    title: "Financial Innovation",
    desc: "Innovating financial way out for consumers.",
    icon: Lightbulb, // Alternately 'WalletCard'. Represents innovative financial solutions
  },
  {
    title: "Smooth Transit",
    desc: "Internal pathways development ensures smooth transport movement.",
    icon: Route, // Represents pathways, navigation, and transit movement
  },
  {
    title: "Unique Sizes",
    desc: "Sizes helps best civil development of structures.",
    icon: Layers, // Alternately 'Ruler'. Represents structural dimensions and civil development
  },
  {
    title: "Utility Infrastructure",
    desc: "Ensures consistent vital utilities supply.",
    icon: Activity, // Alternately 'Zap' or 'Droplet'. Represents consistent flow of vital infrastructure/utilities
  },
];
  return (
    <SmoothScroll>
      <div className="bg-white min-h-screen font-sans selection:bg-[#212946] selection:text-white">
        <Navbar />

        {/* ── HERO ── */}
        <section className="pt-48 pb-20 px-6 relative">
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
                The Blueprint of Tomorrow
              </p>

              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[0.9]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Vision &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#212946] to-[#3a4f8a]">
                  Mission
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                Detailing the aspects of green living and potential growth of estates
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── VISION & MISSION CARDS ── */}
        <section className="relative py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto" style={{ perspective: "1200px" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Vision Card */}
              <TiltCard delay={0}>
                <div
                  className="bg-white border border-[#212946]/8 p-12 lg:p-16 rounded-[2rem] hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-500 h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="w-16 h-16 bg-[#212946]/6 text-[#212946] rounded-full flex items-center justify-center mb-5"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>

                  <div style={{ transform: "translateZ(25px)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-6 h-[1px] bg-[#212946]/30" />
                      <span
                        className="text-[#212946]/40 text-[13px] uppercase tracking-[0.35em]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Our Vision
                      </span>
                    </div>
                    <h2
                      className="text-4xl lg:text-5xl font-black text-[#212946] mb-6 tracking-tight"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      The Direction Decoded
                    </h2>
                    <p className="text-[#212946]/50 text-lg leading-relaxed font-light">
                      White Wolf Infra is built on the perfect blend of business
                      expertise and on-ground experience. Rooted in strong
                      values and ethics, we understand customer priorities and
                      deliver solutions that truly matters.
                    </p>
                  </div>
                </div>
              </TiltCard>

              {/* Mission Card */}
              <TiltCard delay={0.15} className="lg:translate-y-16">
                <div
                  className="bg-white border border-[#212946]/8 p-12 lg:p-16 rounded-[2rem] hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-500 h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="w-16 h-16 bg-[#212946]/6 text-[#212946] rounded-full flex items-center justify-center mb-5"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>

                  <div style={{ transform: "translateZ(25px)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-6 h-[1px] bg-[#212946]/30" />
                      <span
                        className="text-[#212946]/40 text-[13px] uppercase tracking-[0.35em]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Our Mission
                      </span>
                    </div>
                    <h2
                      className="text-4xl lg:text-5xl font-black text-[#212946] mb-6 tracking-tight"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      The Target to Attain
                    </h2>
                    <p className="text-[#212946]/50 text-lg leading-relaxed font-light">
                      At White Wolf Infra, we believe true legacy goes beyond
                      numbers. Our commitment is to lead with trust,
                      transparency and lasting financial security for our
                      customers.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="py-32 px-6 bg-[#212946]/[0.025] border-t border-[#212946]/8 mt-16">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-[#212946]/30" />
              <span
                className="text-[#212946]/40 text-[10px] uppercase tracking-[0.35em]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                What We Stand For
              </span>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="max-w-3xl mb-20">
              <h3
                className="text-5xl lg:text-7xl font-black text-[#212946] tracking-tighter uppercase leading-[0.9] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Core{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#212946] to-[#3a4f8a]">
                  Foundations {" "} {" "}
                </span>
              </h3>
              <p className="text-lg text-[#212946]/50 font-light leading-relaxed">
                A take off demands 1/4th of the power to attain altitude which
                surely demands solid foundation.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              style={{ perspective: "1000px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {coreValues.map((v, i) => (
                <ValueCard key={i} v={v} i={i} />
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
