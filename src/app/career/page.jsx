"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const perks = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    title: "Visionary Developments",
    desc: "Contribute to landmark projects redefining skylines and communities across India.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
    title: "Accelerated Growth",
    desc: "Advance through structured learning, expert mentorship, and dynamic cross-functional exposure from the start.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
        />
      </svg>
    ),
    title: "People-Centric Culture",
    desc: "Experience a progressive workplace with flexibility, well-being initiatives, and a culture that values every perspective.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Exceptional Rewards",
    desc: "Benefit from competitive compensation, performance-driven incentives, and long-term growth opportunities.",
  },
];

const openings = [
  {
    id: 1,
    title: "Senior Architect",
    dept: "Design & Architecture",
    location: "Mumbai",
    type: "Full-time",
    exp: "6–10 yrs",
    desc: "Lead design vision for large-scale residential and mixed-use developments. Collaborate with engineering and sales to deliver award-worthy spaces.",
    tags: ["AutoCAD", "Revit", "BIM", "Team Lead"],
  },
  {
    id: 2,
    title: "Project Manager",
    dept: "Construction",
    location: "Pune",
    type: "Full-time",
    exp: "5–8 yrs",
    desc: "Own end-to-end project delivery, managing timelines, budgets, and contractor relationships on premium residential projects.",
    tags: ["MS Project", "Contract Mgmt", "Site Ops"],
  },
  {
    id: 3,
    title: "Marketing Lead",
    dept: "Brand & Marketing",
    location: "Mumbai · Hybrid",
    type: "Full-time",
    exp: "4–7 yrs",
    desc: "Build and execute integrated campaigns across digital and offline channels. Own brand identity and lead a growing creative team.",
    tags: ["Brand Strategy", "Digital", "Content", "SEO"],
  },
  {
    id: 4,
    title: "Sales Executive",
    dept: "Sales",
    location: "Bangalore",
    type: "Full-time",
    exp: "2–4 yrs",
    desc: "Drive residential unit sales through consultative selling, site visits, and relationship management with HNI clients.",
    tags: ["CRM", "HNI Sales", "Real Estate"],
  },
  {
    id: 5,
    title: "Interior Designer",
    dept: "Design & Architecture",
    location: "Mumbai",
    type: "Contract",
    exp: "3–5 yrs",
    desc: "Conceptualise and execute stunning interior fit-outs for model apartments, clubhouses, and common areas.",
    tags: ["3ds Max", "SketchUp", "FF&E", "Luxury"],
  },
  {
    id: 6,
    title: "Finance Analyst",
    dept: "Finance",
    location: "Mumbai · Remote",
    type: "Full-time",
    exp: "2–4 yrs",
    desc: "Support project financial modelling, cash-flow analysis, and board-level reporting for a growing portfolio of assets.",
    tags: ["Excel", "Financial Modelling", "Real Estate Finance"],
  },
];

const depts = ["All", ...Array.from(new Set(openings.map((o) => o.dept)))];

const JobCard = ({ job, onApply }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
    className="group bg-white border border-[#212946]/8 rounded-2xl p-7 hover:border-[#212946]/25 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-300"
  >
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
      <div>
        <span
          className="text-[9px] uppercase tracking-[0.3em] text-[#212946]/40 mb-2 block"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {job.dept}
        </span>
        <h3
          className="text-xl text-[#212946] font-light group-hover:text-[#2d3a62] transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {job.title}
        </h3>
      </div>
      <button
        onClick={() => onApply(job)}
        className="flex-shrink-0 flex items-center gap-2 bg-[#212946] text-white text-xs px-5 py-2.5 rounded-xl hover:bg-[#2d3a62] transition-colors duration-200"
        style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}
      >
        Apply Now
        <svg
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12h12m-6-6l6 6-6 6"
          />
        </svg>
      </button>
    </div>

    <p className="text-[#212946]/50 text-sm leading-relaxed mb-5">{job.desc}</p>

    <div className="flex flex-wrap gap-2 mb-5">
      {job.tags.map((t) => (
        <span
          key={t}
          className="px-3 py-1 rounded-full bg-[#212946]/5 text-[#212946]/60 text-[10px] uppercase tracking-wider"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {t}
        </span>
      ))}
    </div>

    <div className="flex flex-wrap gap-4 pt-4 border-t border-[#212946]/6">
      {[
        { icon: "📍", val: job.location },
        { icon: "⏱", val: job.type },
        { icon: "💼", val: job.exp },
      ].map((m) => (
        <span
          key={m.val}
          className="flex items-center gap-1.5 text-[#212946]/40 text-xs"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <span>{m.icon}</span> {m.val}
        </span>
      ))}
    </div>
  </motion.div>
);

// Apply Modal
const ApplyModal = ({ job, onClose }) => {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#212946]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#212946]/6 flex items-center justify-center text-[#212946]/50 hover:bg-[#212946]/12 transition-colors"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {sent ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#212946] flex items-center justify-center mb-5">
              <svg
                width="26"
                height="26"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h4
              className="text-2xl text-[#212946] mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Application Sent!
            </h4>
            <p className="text-[#212946]/40 text-sm">
              Our HR team will reach out within 3–5 business days.
            </p>
          </div>
        ) : (
          <>
            <p
              className="text-[9px] uppercase tracking-[0.3em] text-[#212946]/40 mb-1"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Applying for
            </p>
            <h3
              className="text-2xl text-[#212946] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {job.title}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Full Name", type: "text", ph: "Your name" },
                { label: "Email", type: "email", ph: "you@example.com" },
                { label: "Phone", type: "tel", ph: "+91 98200 00000" },
                {
                  label: "LinkedIn / Portfolio URL",
                  type: "url",
                  ph: "https://linkedin.com/in/...",
                },
              ].map((f) => (
                <div key={f.label}>
                  <label
                    className="block text-[9px] uppercase tracking-[0.3em] text-[#212946]/40 mb-1.5"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    required
                    className="w-full border-b border-[#212946]/15 focus:border-[#212946] outline-none text-[#212946] text-sm py-2.5 bg-transparent placeholder:text-[#212946]/25 transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              ))}
              <div>
                <label
                  className="block text-[9px] uppercase tracking-[0.3em] text-[#212946]/40 mb-1.5"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Cover Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Why you'd be a great fit..."
                  className="w-full border-b border-[#212946]/15 focus:border-[#212946] outline-none text-[#212946] text-sm py-2.5 bg-transparent placeholder:text-[#212946]/25 transition-colors resize-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#212946] text-white py-3.5 rounded-2xl text-sm hover:bg-[#2d3a62] transition-colors mt-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                Submit Application
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const CareersPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [applyJob, setApplyJob] = useState(null);

  const filtered =
    activeFilter === "All"
      ? openings
      : openings.filter((o) => o.dept === activeFilter);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── HERO ── */}
        <section className="pt-48 pb-20 px-6 relative">
          {/* subtle background grid */}
          {/* <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: `linear-gradient(#212946 1px, transparent 1px), linear-gradient(90deg, #212946 1px, transparent 1px)`,
      backgroundSize: '60px 60px',
    }}
  /> */}

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
                Join Us
              </p>

              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[0.9]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
               Cultivating next {""}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#212946] to-[#3a4f8a]">
                  leadership of estates
                </span>
                <br />
               
              </h1>

              <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                White wolf infra is dedicated to set a benchmark which draws attention towards the true potential of human resource
              </p>

            
            </motion.div>
          </div>
        </section>

        {/* ── PERKS ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-[#212946]/30" />
            <span
              className="text-[#212946]/40 text-[10px] uppercase tracking-[0.35em]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
             Where Talent Thrives
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-[clamp(1.8rem,3.5vw,3rem)] text-[#212946] font-light mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A place worth your talent.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp(i * 0.08)}
                className="group p-7 rounded-2xl border border-[#212946]/8 hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.1)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#212946]/6 flex items-center justify-center text-[#212946] mb-5 group-hover:bg-[#212946] group-hover:text-white transition-all duration-300">
                  {p.icon}
                </div>
                <h4
                  className="text-[#212946] text-base mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {p.title}
                </h4>
                <p className="text-[#212946]/45 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── OPENINGS ── */}
        {/* <div className="bg-[#212946]/[0.025] border-t border-[#212946]/8">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
            <motion.div
              {...fadeUp(0)}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-[1px] bg-[#212946]/30" />
                  <span
                    className="text-[#212946]/40 text-[10px] uppercase tracking-[0.35em]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Open Positions
                  </span>
                </div>
                <h2
                  className="text-[clamp(1.8rem,3.5vw,3rem)] text-[#212946] font-light"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Find your role.
                </h2>
              </div>

             
              <div className="flex flex-wrap gap-2">
                {depts.map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveFilter(d)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider border transition-all duration-200 ${activeFilter === d ? "bg-[#212946] text-white border-[#212946]" : "border-[#212946]/15 text-[#212946]/50 hover:border-[#212946]/30"}`}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
              <AnimatePresence>
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} onApply={setApplyJob} />
                ))}
              </AnimatePresence>
            </motion.div>

           
            <motion.div
              {...fadeUp(0.2)}
              className="mt-10 p-8 rounded-2xl bg-[#212946] text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <p
                  className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Don't see a fit?
                </p>
                <h4
                  className="text-xl font-light"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Send us an open application.
                </h4>
                <p className="text-white/40 text-sm mt-1">
                  We're always on the lookout for exceptional talent.
                </p>
              </div>
              <button
                onClick={() =>
                  setApplyJob({ title: "Open Application", dept: "General" })
                }
                className="flex-shrink-0 flex items-center gap-3 bg-white text-[#212946] px-7 py-3.5 rounded-2xl text-sm font-medium hover:bg-gray-100 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Apply Anyway
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12h12m-6-6l6 6-6 6"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </div> */}

        {/* Apply Modal */}
        <AnimatePresence>
          {applyJob && (
            <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default CareersPage;
