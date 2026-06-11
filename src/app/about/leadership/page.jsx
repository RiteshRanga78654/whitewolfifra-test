"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LeadershipTeam from "../../../components/LeadershipTeam";
import SmoothScroll from "../../../components/SmoothScroll";
import { Quote, ArrowRight, Award, Globe, Users } from "lucide-react";
const journeyImages = [
  "/assets/acme.png",


];

/* ── DATA ─────────────────────────────────────────────────────── */
const leaders = [
  {
    id: 1,
    category: "A Visionary Educationist and Social Reformer",
    specialty: "Purpose",
    name: "Shri Rampat Yadav",
    role: "Founder & Visionary",
    linkedin: null,
    image: "/assets/leadership/Untitled design (4).png",
    bio: `Shri Rampat Yadav has devoted his entire life to the noble cause of education and has played a pivotal role in spreading quality education among students across the Sohna region in South Gurgaon. His unwavering commitment to academic excellence and social development has positively transformed the lives of thousands of young learners.

Following his retirement from the Haryana State Government, Shri Yadav chose not to rest on his achievements. Instead, he embarked on a mission to contribute selflessly to society through education. Over the past two decades, his relentless efforts have emerged as a true game changer for the educational landscape of Sohna and its surrounding areas.

Under his visionary leadership and watchful guidance, Acme International School has become a beacon of learning and excellence. The institution has nurtured countless students, empowering them to achieve remarkable success in academics, professional careers, and personal development. His emphasis on values, discipline, and holistic education has helped shape responsible citizens and future leaders.
Shri Rampat Yadav's life stands as a shining example of how dedication, integrity, and a passion for education can create a lasting impact on society. His contribution to the educational and social advancement of the Sohna region will continue to inspire generations to come.
`,
    fullBio:
      "Rampat Yadav is the founding visionary behind the institution's guiding philosophy. With an unwavering belief in the power of education, he set the foundation for a learning environment that champions global perspectives, strong character, and well-rounded development. His vision has shaped every pillar of the institution — from curriculum design to community values — ensuring that every student graduates not just academically equipped but as a confident, principled individual ready to contribute to the world.",
    achievements: [
      "Founded the institution with a global learning mandate",
      "Championed holistic student development frameworks",
      "Established core values that define institutional culture",
      "Inspired a generation of educators and administrators",
    ],
    tags: ["Institutional Vision", "Holistic Growth", "Global Learning"],
  },
  {
    id: 2,
    category: "Governance & Leadership",
    specialty: "Vision & Strategy",
    name: "Ashok Yadav",
    role: "Founder & Chairman",
    linkedin: null,
    image: "/assets/leadership/ashok-yadav.jpeg",
    bio: `Shri Ashok Yadav is a distinguished educationist and social reformer whose lifelong mission has been to expand access to quality education for the students of Sohna and the surrounding regions. Guided by a scientific temperament and a progressive vision, he has been instrumental in transforming the educational landscape of the district.

Under his leadership, Acme International School became the first institution in the Sohna region to introduce state-of-the-art scientific laboratories and modern classroom infrastructure, setting new benchmarks for academic excellence and experiential learning. At a time when such facilities were largely confined to metropolitan schools, Shri Ashok Yadav envisioned a future where students from rural and semi-urban backgrounds would have access to the same quality of education and learning resources.

Today, the popularity and reputation of Acme International School are not the result of overnight success but the outcome of years of relentless dedication, visionary leadership, and an unwavering commitment to a singular philosophy, "Modern Education at an Affordable Price."

This guiding principle has enabled thousands of students from diverse socio-economic backgrounds to pursue their academic aspirations without compromise. Over the years, the school has evolved into a bedrock of social transformation across the district, empowering generations of young learners with knowledge, confidence, and opportunities for upward mobility.

Students from across Haryana seek admission to the institution, attracted by its reputation for academic rigor, holistic development, and value-based education. Through his pioneering efforts, Shri Ashok Yadav has not only built an educational institution but has also ignited a movement that continues to shape careers, uplift families, and contribute meaningfully to the social and economic development of the region.
`,
    fullBio:
      "Ashok Yadav brings deep commitment to academic quality and pedagogical innovation as Founder and Chairman. He has been instrumental in introducing modern teaching methodologies that shift classrooms from rote learning to critical thinking and creative problem-solving. Under his leadership, the institution has consistently raised its academic standards while keeping student confidence and personal growth at the centre of every initiative. His hands-on approach to governance ensures that quality is never compromised.",
    achievements: [
      "Introduced modern teaching methodologies institution-wide",
      "Raised academic standards across all departments",
      "Championed student-confidence development programmes",
      "Oversaw institution's growth to national recognition",
    ],
    tags: ["Modern Pedagogy", "Academic Quality", "Student Confidence"],
  },
];

const philosophies = [
  {
    title: "Consumer Harmony",
    desc: "While researching the bests in business across the globe the leadership realised one factor of business which leads to consistent demand is the Equilibrium experienced at consumers end.",
    icon: Award,
  },
  {
    title: "Modern Approach",
    desc: "With time we realised that only working hard with the traditional ways won't be enough to heal the current phase of expected demands of consumers.",
    icon: Globe,
  },
  {
    title: "Defined Vision",
    desc: "As a leader to any subject which involves a collective sentiment of expectation towards a service or product demands a crystal clear vision of ultimate detailing which can be bought with a vision which holds objective.",
    icon: Users,
  },
];

/* ── FRAMER VARIANTS ──────────────────────────────────────────── */
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── MODAL ────────────────────────────────────────────────────── */
// function Modal({ leader, onClose }) {
//   useEffect(() => {
//     const onKey = (e) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", onKey);
//     document.body.style.overflow = "hidden";
//     return () => {
//       window.removeEventListener("keydown", onKey);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   return (
//     <motion.div
//       className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.22 }}
//     >
//       {/* Backdrop */}
//       <motion.div
//         className="absolute inset-0"
//         style={{
//           background: "rgba(8,14,28,0.82)",
//           backdropFilter: "blur(20px)",
//         }}
//         onClick={onClose}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       />

//       {/* Panel */}
//       <motion.div
//         className="relative z-10 w-full max-w-[960px] max-h-[90vh] overflow-hidden rounded-[28px] flex flex-col md:flex-row bg-white"
//         style={{
//           boxShadow:
//             "0 48px 120px rgba(8,14,28,0.55), 0 8px 32px rgba(41,54,89,0.2)",
//         }}
//         initial={{ opacity: 0, scale: 0.94, y: 28 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.94, y: 28 }}
//         transition={{ type: "spring", stiffness: 340, damping: 30 }}
//       >
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
//           style={{ background: "rgba(0,0,0,0.05)" }}
//           aria-label="Close"
//         >
//           <svg
//             className="w-4 h-4 text-gray-500"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         {/* Image panel */}
//         <div className="relative md:w-[40%] h-56 md:h-auto flex-shrink-0 overflow-hidden rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none">
//           <motion.img
//             src={leader.image}
//             alt={leader.name}
//             className="w-full h-full object-cover object-top"
//             initial={{ scale: 1.07 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.55, ease: "easeOut" }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#293659]/70 via-transparent to-transparent" />

//           <div className="absolute bottom-6 left-6 right-6">
//             <p className="text-white/60 text-[10px] tracking-[0.28em] uppercase font-semibold mb-1">
//               {leader.role}
//             </p>
//             <h2
//               className="text-white text-2xl font-bold leading-tight"
//               style={{ fontFamily: "'Georgia', serif" }}
//             >
//               {leader.name}
//             </h2>
//           </div>

//           <motion.div
//             className="absolute bottom-0 left-0 right-0 h-[3px]"
//             style={{
//               background: "linear-gradient(90deg,#293659,#5b7ec9,#293659)",
//             }}
//             initial={{ scaleX: 0, originX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ delay: 0.25, duration: 0.55 }}
//           />
//         </div>

//         {/* Content panel */}
//         <div className="flex-1 overflow-y-auto p-8 md:p-11">
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.14 }}
//           >
//             <div className="flex items-center gap-2 mb-5">
//               <span className="text-[10px] font-semibold tracking-[0.24em] uppercase text-gray-400">
//                 {leader.category}
//               </span>
//               <span className="text-gray-300 text-xs">·</span>
//               <span
//                 className="text-[10px] font-bold tracking-[0.24em] uppercase"
//                 style={{ color: "#293659" }}
//               >
//                 {leader.specialty}
//               </span>
//             </div>

//             <h2
//               className="text-4xl md:text-[2.7rem] font-bold tracking-tight text-gray-900 leading-tight"
//               style={{ fontFamily: "'Georgia', serif" }}
//             >
//               {leader.name}
//             </h2>
//             <p className="mt-1.5 text-gray-500 text-sm font-medium">
//               {leader.role}
//             </p>
//             <div
//               className="mt-4 w-9 h-[2.5px] rounded-full"
//               style={{ background: "#293659" }}
//             />

//             <p className="mt-5 text-gray-500 text-[14px] leading-[1.8]">
//               {leader.fullBio}
//             </p>

//             {leader.achievements?.length > 0 && (
//               <div className="mt-7">
//                 <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-gray-400 mb-3">
//                   Key Highlights
//                 </p>
//                 <ul className="space-y-2.5">
//                   {leader.achievements.map((a, i) => (
//                     <motion.li
//                       key={i}
//                       className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-snug"
//                       initial={{ opacity: 0, x: -8 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 + i * 0.06 }}
//                     >
//                       <span
//                         className="mt-[5px] flex-shrink-0 w-1.5 h-1.5 rounded-full"
//                         style={{ background: "#293659" }}
//                       />
//                       {a}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div className="mt-6 flex flex-wrap gap-2">
//               {leader.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3.5 py-1.5 rounded-full border"
//                   style={{
//                     color: "#293659",
//                     borderColor: "rgba(41,54,89,0.2)",
//                     background: "rgba(41,54,89,0.05)",
//                   }}
//                 >
//                   <span
//                     className="w-1.5 h-1.5 rounded-full flex-shrink-0"
//                     style={{ background: "#293659" }}
//                   />
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             {leader.linkedin && (
//               <motion.a
//                 href={leader.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
//                 style={{ background: "#293659" }}
//                 whileHover={{ scale: 1.03, opacity: 0.9 }}
//                 whileTap={{ scale: 0.97 }}
//               >
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                 </svg>
//                 Connect on LinkedIn
//               </motion.a>
//             )}
//           </motion.div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

/* ── CARD ─────────────────────────────────────────────────────── */
function LeaderCard({ leader, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const BIO_LIMIT = 400;
  const isLong = leader.bio.length > BIO_LIMIT;
  const imageRight = index % 2 !== 0;

  return (
    <motion.article
      className={`relative w-full rounded-[20px] overflow-hidden flex flex-col ${
        imageRight ? "md:flex-row-reverse" : "md:flex-row"
      }`}
      style={{
        background: "#ffffff",
        border: "1px solid #ebebeb",
        boxShadow: hovered
          ? "0 20px 56px rgba(41,54,89,0.13), 0 4px 16px rgba(0,0,0,0.05)"
          : "0 2px 16px rgba(41,54,89,0.07)",
        transition: "box-shadow 0.4s ease",
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      animate={{ y: hovered ? -4 : 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated navy top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10"
        style={{
          height: 3,
          background: "linear-gradient(90deg,#293659,#5b7ec9)",
          borderRadius: "20px 20px 0 0",
          transformOrigin: imageRight ? "right" : "left",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />

      {/* IMAGE */}
      <div
        className={`
          relative flex-shrink-0 overflow-hidden cursor-pointer
          w-full h-[320px] 
          md:w-[35%] md:h-full
          ${
            imageRight
              ? "rounded-b-[20px] md:rounded-b-none md:rounded-r-[20px]"
              : "rounded-b-[20px] md:rounded-b-none md:rounded-l-[20px]"
          }
        `}
        style={{ minHeight: 280 }}
      >
        <motion.img
          src={leader.image}
          alt={leader.name}
          className="w-full h-full object-cover object-top"
          animate={{ scale: hovered ? 1.045 : 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(41,54,89,0.55) 0%, rgba(41,54,89,0.05) 55%, transparent 100%)",
          }}
        />

        <div className="absolute bottom-4 left-4">
          <span
            className="text-[10px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 rounded-full text-white"
            style={{
              background: "rgba(41,54,89,0.7)",
              backdropFilter: "blur(8px)",
            }}
          >
            {leader.role}
          </span>
        </div>
      </div>

      {/* TEXT */}
      <div className="flex-1 flex flex-col justify-center gap-5 p-8 md:p-12">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold tracking-[0.24em] uppercase"
            style={{ color: "#293659" }}
          >
            {leader.specialty}
          </span>
        </div>

        <div>
          <h3
            className="text-[2rem] md:text-[2.5rem] font-bold tracking-tight text-gray-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {leader.name}
          </h3>
          <p className="mt-1.5 text-gray-500 text-sm font-medium">
            {leader.role}
          </p>
          <motion.div
            className="mt-3 h-[2.5px] rounded-full"
            style={{ background: "#293659" }}
            animate={{ width: hovered ? 44 : 28 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* BIO with Read more / Read less */}
        <div>
          <p className="text-gray-500 text-[14.5px] leading-[1.8] max-w-[700px] whitespace-pre-line">
            {isLong && !expanded
              ? leader.bio.slice(0, BIO_LIMIT).trimEnd() + "…"
              : leader.bio}
          </p>

          {isLong && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((prev) => !prev);
              }}
              className="mt-2 inline-flex items-center gap-1 text-[18px] font-semibold tracking-wide transition-opacity hover:opacity-70"
              style={{ color: "#293659" }}
            >
              {expanded ? "Read less" : "Read more"}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "inline-block", fontSize: 11 }}
              >
                ▼
              </motion.span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── PAGE ─────────────────────────────────────────────────────── */
export default function Leadership() {
  const [active, setActive] = useState(null);
  const [currentJourneyIndex, setCurrentJourneyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJourneyIndex((prev) => (prev + 1) % journeyImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-[#fafaf9] min-h-screen font-sans selection:bg-[#293659] selection:text-white">
        <Navbar />

        {/* Hero */}
        <section className="pt-48 pb-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUpContainer}
            >
              <motion.p
                variants={fadeUpItem}
                className="text-brand-primary font-bold uppercase tracking-[0.2em] text-sm mb-6"
              >
                The vigour and valor for visionary estates
              </motion.p>

              <motion.h1
                variants={fadeUpItem}
                className="text-6xl md:text9xl lg:text-9xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[1.05]"
              >
                Our{"  "}
              <span
  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#293659] to-brand-primary pb-2  tracking-[-0.03em]"
>
  Leadership <span>{"  "}</span>
</span>
              </motion.h1>

              <motion.p
                variants={fadeUpItem}
                className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed"
              >
                Driven by visionary leaders building legacy beyond real estate
              </motion.p>
            </motion.div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#293659]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>

        {/* Executive Board */}
        <section
          className="relative py-20 px-4 md:px-8"
          style={{
            background:
              "linear-gradient(160deg, #f7f8fc 0%, #eef0f8 55%, #f5f6fb 100%)",
            fontFamily: "'system-ui', sans-serif",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.025]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="64"
                  height="64"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 64 0 L 0 0 0 64"
                    fill="none"
                    stroke="#293659"
                    strokeWidth="0.7"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div
              className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full opacity-[0.06]"
              style={{
                background:
                  "radial-gradient(circle, #293659 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.05]"
              style={{
                background:
                  "radial-gradient(circle, #293659 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col gap-6">
              {leaders.map((leader, i) => (
                <LeaderCard
                  key={leader.id}
                  leader={leader}
                  index={i}
                  onOpen={setActive}
                />
              ))}
            </div>
          </div>

          <AnimatePresence>
            {active && (
              <Modal leader={active} onClose={() => setActive(null)} />
            )}
          </AnimatePresence>
        </section>

        {/* { zwsxedcfvgbh} */}
        <LeadershipTeam />
        {/* Chairman's Message */}
        {/* <section className="py-24 lg:py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpContainer}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              <motion.div variants={fadeUpItem} className="lg:col-span-5">
                <div className="relative">
                  <Quote className="absolute -top-10 -left-10 w-32 h-32 text-gray-100 -z-10 rotate-180" />
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-tight mb-8">
                    "Building isn't enough to deliver{" "}
                    <span className="text-brand-primary">legacy.</span>"
                  </h2>
                </div>
              </motion.div>

              <motion.div variants={fadeUpItem} className="lg:col-span-7">
                <div className="prose prose-lg text-gray-500 font-medium leading-relaxed mb-10">
                  <p className="mb-6">
                    White Wolf Infra has a legacy of almost five decades with
                    the vision of the founder Shri Ram Pat Yadav, a retired
                    educationist and founder of ACME International School,
                    Sohna. Shri Ashok Yadav further added to the legacy with
                    progressive reforms and growth all over Haryana based on the
                    values of education, community development and social
                    impact.
                  </p>
                  <p>
                    Today the third generation headed by Mr. Vivek Yadav, an
                    alumnus of Berlin School of Economics and Law, Germany and
                    University of Salford, UK, carries forward this vision of
                    impactful real estate developments with a focus on value
                    creation and meaningful community growth.
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
                  <img
                    src="/assets/leadership/vivek-yadav.jpeg"
                    alt="Vivek Yadav"
                    className="w-16 h-16 rounded-full object-cover grayscale"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                      Vivek Yadav
                    </h4>
                    <p className="text-brand-primary text-sm font-bold tracking-widest uppercase">
                      Managing Director
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section> */}

        {/* Leadership Philosophy */}
        <section className="py-24 lg:py-32 px-6 bg-[#1a1a1a] relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6">
                Guiding <span className="text-white/40">Principles</span>
              </h2>
              <div className="w-16 h-1 bg-brand-primary mx-auto" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {philosophies.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpItem}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-colors duration-500 group"
                >
                  <item.icon className="w-10 h-10 text-brand-primary mb-8 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        </section>

        {/* Journey Section */}
        <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden font-sans">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Content */}
              <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#293659]" />
                  <span className="text-[10px] font-black text-[#293659] uppercase tracking-[0.3em]">
                    Our Journey
                  </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-[0.95]">
                  From a Vision{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#293659] to-gray-400">
                    To a Landmark
                  </span>
                </h2>

                <div className="space-y-4 text-gray-600 text-base md:text-lg font-medium leading-relaxed max-w-2xl pt-2">
                  <p>
                    It all started with a simple yet mighty dream to bring an
                    institution to Sohna that would offer a genuine global
                    education at an affordable price. Today, Acme International
                    School is a testament to that vision.
                  </p>
                  <p>
                    On a sprawling 3-acre campus, the institution has become a
                    haven for learning, values and community growth. With the
                    same philosophy of trust, value creation and long term
                    impact, the group is now stepping into real estate
                    development, expanding its legacy from Sohna to Jhajjar,
                    staying rooted to the values it was built on.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="lg:col-span-5 w-full order-1 lg:order-2 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full max-w-md mx-auto group"
                >
                  {/* <div className="absolute -top-8 left-0 text-[10px] tracking-[0.3em] text-[#293659] font-bold uppercase">
                    Our Journey — Auto Playing
                  </div> */}

                  <div className="relative aspect-[4/5] w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentJourneyIndex}
                        src={journeyImages[currentJourneyIndex]}
                        alt="Acme Journey"
                        initial={{ opacity: 0, x: 100, rotate: 10 }}
                        animate={{ opacity: 1, x: 0, rotate: -2 }}
                        exit={{ opacity: 0, x: -100, rotate: -10 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="absolute w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white"
                      />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-[#293659]/20 -z-10 translate-x-3 translate-y-3 rounded-3xl rotate-2" />

                    <div className="absolute inset-0 bg-[#293659]/10 -z-20 translate-x-6 translate-y-6 rounded-3xl -rotate-2" />
                  </div>

                  <div className="flex justify-center gap-2 mt-6">
                    {journeyImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentJourneyIndex(index)}
                        className={`transition-all duration-300 rounded-full ${
                          currentJourneyIndex === index
                            ? "w-8 h-2 bg-[#293659]"
                            : "w-2 h-2 bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gray-100" />
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
