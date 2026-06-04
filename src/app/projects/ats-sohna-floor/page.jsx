"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { useRouter } from "next/navigation";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import {
  CheckCircle2,
  Lock,
  Construction,
  Trees,
  Leaf,
  Zap,
  Droplets,
  Waves,
  MapPin,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Building2,
  HeartPulse,
  Gamepad2,
  Footprints,
  Car,
  Users,
  Wind
} from "lucide-react";
import { FiArrowRight } from "react-icons/fi";

// --- DATA ---
const images = [
  "/ATS-Sohna/ats-sohna-1.png",
  "/ATS-Sohna/ats-sohna-2.png",
  "/ATS-Sohna/ats-sohna-3.png",
  "/ATS-Sohna/ats-sohna-4.png",
  "/ATS-Sohna/ats-sohna-5.png",
];

const amenities = [
  { name: "Grand Clubhouse", icon: <Building2 className="w-6 h-6" /> },
  { name: "Swimming Pool", icon: <Waves className="w-6 h-6" /> },
  { name: "Fully Equipped Gym", icon: <HeartPulse className="w-6 h-6" /> },
  { name: "Landscaped Greens", icon: <Trees className="w-6 h-6" /> },
  { name: "Kids Play Area", icon: <Gamepad2 className="w-6 h-6" /> },
  { name: "Jogging Tracks", icon: <Footprints className="w-6 h-6" /> },
  { name: "Sports Courts", icon: <Gamepad2 className="w-6 h-6" /> },
  { name: "24×7 Security", icon: <ShieldCheck className="w-6 h-6" /> },
  { name: "Dedicated Parking", icon: <Car className="w-6 h-6" /> },
  { name: "Yoga Zone", icon: <Wind className="w-6 h-6" /> },
];

const highlights = [
  "Prime Location in Sector 36, Sohna",
  "Seamless Connectivity to Gurgaon",
  "Premium Low-Rise Independent Floors",
  "Surrounded by Aravalli Greenery",
  "Gated Community with 24×7 Security",
  "Wide Internal Roads & Dedicated Parking",
  "Clubhouse with Modern Amenities",
  "Landscaped Parks & Green Spaces",
  "Strong Future Appreciation Potential",
];

const whyInvest = [
  {
    title: "Strategic Sohna Location",
    desc: "Located in a rapidly developing corridor with strong future growth prospects.",
  },
  {
    title: "Excellent Connectivity",
    desc: "Seamless access to Gurgaon, Delhi-Mumbai Expressway, and major NCR routes.",
  },
  {
    title: "Premium Low-Rise Living",
    desc: "Low-rise independent floors provide enhanced privacy, comfort, and spacious living.",
  },
  {
    title: "Aravalli Facing",
    desc: "The surrounding Aravalli greens create a peaceful and nature-inspired lifestyle.",
  },
  {
    title: "High Investment Appreciation",
    desc: "Ongoing infrastructure growth in Sohna increases long-term value potential.",
  },
  {
    title: "Safe Gated Community",
    desc: "24×7 security and planned community infrastructure ensure a secure environment.",
  },
];

const faqs = [
  {
    q: "What makes ATS Sohna Floors a strong investment opportunity?",
    a: "Its strategic location, rapid infrastructure growth, and rising demand for low-rise luxury living make it a high-potential investment.",
  },
  {
    q: "How is the connectivity of ATS Sohna Floors beneficial?",
    a: "The project offers seamless access to Gurgaon, Delhi-Mumbai Expressway, and major NCR corridors, ensuring convenient daily commuting.",
  },
  {
    q: "What lifestyle advantages do low-rise floors offer?",
    a: "Low-rise living provides greater privacy, better ventilation, spacious layouts, and a more exclusive residential experience.",
  },
  {
    q: "Why is Sohna emerging as a preferred real estate destination?",
    a: "Sohna is witnessing major infrastructure expansion, improved connectivity, and increasing premium residential developments.",
  },
];

const landmarkData = [
  { name: "GD Goenka World School", distance: "7.3 KM", type: "School" },
  { name: "Medanta Medicity", distance: "19 KM", type: "Hospital" },
  { name: "HDFC Bank", distance: "5.8 KM", type: "Bank" },
  { name: "Airia Mall", distance: "11 KM", type: "Shopping" },
  { name: "Aravalli Green Belt", distance: "Adjacent", type: "Park" },
  { name: "KR Mangalam University", distance: "3.1 KM", type: "School" },
];

// --- COMPONENTS ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseMove = (e) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotate({
      x: ((y - cy) / cy) * -8,
      y: ((x - cx) / cx) * 8,
    });
  };

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered
          ? "0 32px 80px rgba(37, 49, 88, 0.15), 0 12px 32px rgba(37, 49, 88, 0.08)"
          : "0 8px 32px rgba(37, 49, 88, 0.05), 0 2px 8px rgba(37, 49, 88, 0.02)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(16px)" }}>{children}</div>
    </motion.div>
  );
}

const RollingNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = value.match(/\d+/);
  const isComplex = value.includes("/");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView && !isComplex && numericPart) {
      motionValue.set(parseInt(numericPart[0]));
    }
  }, [isInView, motionValue, numericPart, isComplex]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current && !isComplex) {
        const suffix = value.replace(/[0-9]/g, "");
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
  }, [springValue, value, isComplex]);
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {isComplex ? value : "0"}
    </motion.span>
  );
};

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#253158]/20">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg md:text-xl font-bold text-gray-900">{faq.q}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-[#253158]" />
        ) : (
          <ChevronDown className="w-6 h-6 text-[#253158]" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed text-lg">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ATSSohnaFloors = () => {
  const router = useRouter();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [brochureForm, setBrochureForm] = useState({ name: "", email: "", phone: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBrochureIndex, setCurrentBrochureIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const containerRef = useRef(null);

  const handleBrochureDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/assets/pdf/ats-sohna-brochure.pdf";
    link.download = "ATS-Sohna-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloadModalOpen(false);
    setBrochureForm({ name: "", email: "", phone: "" });
  };

  const nextBrochure = () => {
    setCurrentBrochureIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const autoSlider = setInterval(() => {
      nextBrochure();
    }, 3000);
    return () => clearInterval(autoSlider);
  }, [currentBrochureIndex]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative min-h-screen text-gray-900 font-sans selection:bg-[#253158] selection:text-white overflow-x-hidden"
        style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 40%, #e8f4fd 100%)",
        }}
      >
        <div className="absolute top-0 left-0 w-full z-[100] transform-gpu">
          <Navbar />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#eef2ff] z-[210] border-l border-[#253158]/20 p-12 flex flex-col justify-center shadow-2xl"
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-10 right-10 text-slate-500 hover:text-[#253158] text-3xl transition-colors"
                >
                  ✕
                </button>
                <nav className="flex flex-col gap-10">
                  {["Overview", "Highlights", "Amenities", "Location"].map((item, i) => (
                    <motion.a
                      key={item}
                      href="#"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl font-bold text-gray-900 hover:text-[#253158] transition-colors tracking-tight"
                    >
                      {item}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* HEADER */}
       

        {/* HERO SECTION */}
        <section className="relative pt-24 h-[85vh] md:h-[90vh] w-full flex items-center justify-center overflow-visible">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={images[0]}
              alt="Hero"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#253158]/80"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 -mt-10"
          >
            <h1 className="text-5xl md:text-[90px] leading-[1] mb-6 text-white tracking-tight font-bold">
              Premium Low-Rise <br />
              <span className="text-[#bfdbfe]">Independent Floors</span>
            </h1>
            <p className="text-[12px] md:text-[20px] font-bold tracking-[0.1em] mb-10 text-white opacity-90 uppercase">
              Sector 36, Sohna • Aravalli Facing • Luxury Amenities
            </p>
          </motion.div>

          {/* PROJECT INFO OVERLAY */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[95%] lg:max-w-6xl px-2">
            <div className="flex flex-wrap sm:flex-nowrap min-h-[90px] w-full items-center justify-center overflow-hidden shadow-2xl rounded-xl bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border border-gray-100">
              
              <div className="flex-1 flex flex-col items-center justify-center py-5 px-4 hover:bg-gray-50 transition-colors w-1/2 sm:w-auto">
                <span className="font-bold text-3xl md:text-4xl text-[#253158] mb-1 tracking-tight">10+ <span className="text-xl md:text-2xl text-slate-500">Acres</span></span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400">Land Area</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center py-5 px-4 hover:bg-gray-50 transition-colors w-1/2 sm:w-auto">
                <span className="font-bold text-3xl md:text-4xl text-[#253158] mb-1 tracking-tight">2 & 3 <span className="text-xl md:text-2xl text-slate-500">BHK</span></span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400">Configurations</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center py-5 px-4 hover:bg-gray-50 transition-colors w-1/2 sm:w-auto">
                <span className="font-bold text-3xl md:text-4xl text-[#253158] mb-1 tracking-tight">ATS <span className="text-xl md:text-2xl text-slate-500">Group</span></span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400">Developer</span>
              </div>
              
              <div className="flex-[1.2] flex flex-col items-center justify-center py-5 px-4 hover:bg-gray-50 transition-colors w-1/2 sm:w-auto">
                <span className="font-bold text-xl md:text-2xl text-[#253158] mb-1 text-center tracking-tight">New Launch</span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400">Status</span>
              </div>

            </div>
          </div>
        </section>

        {/* DREAM HOME SECTION */}
        <section className="pt-32 md:pt-40 pb-20 px-6 md:px-32 text-gray-900">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 tracking-tight"
            >
              Experience True <span className="text-[#253158]">Luxury</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-1 bg-[#253158] mb-8"></div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-700">
                  ATS Sohna Floors in the south of Gurgaon is a masterpiece designed to make consumers not only earn an estate, but earn lifelong memories.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-slate-600">
                  The project combines modern architecture with lush greenery, providing a perfect setting for your family. Families looking for privacy with world-class amenities have found the right home.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LARGE QUOTE IMAGE */}
        <div className="relative group overflow-hidden h-[350px] md:h-[550px] w-full">
          <img
            src={images[1]}
            alt="Lifestyle"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#253158]/50"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-3xl md:text-6xl font-bold mb-6 text-white tracking-tight drop-shadow-2xl">
              More than just a residence.<br />
              <span className="text-[#bfdbfe]">A Signature Way of Life.</span>
            </h1>
          </motion.div>
        </div>

        {/* PROJECT HIGHLIGHTS */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Project Highlights</h2>
            <div className="h-1 w-20 bg-[#253158] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, idx) => (
              <TiltCard
                key={idx}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-[#253158]/10 h-full cursor-default"
              >
                <CheckCircle2 className="w-6 h-6 text-[#253158] flex-shrink-0 mt-1" />
                <p className="text-lg font-medium text-gray-800 leading-tight">{highlight}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* AMENITIES */}
        <section className="py-20 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] shadow-xl border border-gray-100 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Premium Amenities</h2>
            <div className="h-1 w-20 bg-[#3a4f8a] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 md:px-10">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4 group">
                <div className="w-16 h-16 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#253158] group-hover:bg-[#253158] group-hover:text-white transition-all shadow-md">
                  {amenity.icon}
                </div>
                <p className="text-sm font-bold text-gray-700">{amenity.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY INVEST & BROCHURE */}
        <section className="py-20 md:py-25 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6 mb-8">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  Why invest in ATS Sohna?
                </h3>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-lg">
                  A perfect blend of luxury living, strong connectivity, and the trusted brand value of ATS Group, ensuring high appreciation potential.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyInvest.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-[#253158]/10">
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col gap-16">
              <div className="relative w-full max-w-sm mx-auto lg:ml-auto group">
                <div className="absolute -top-12 left-0 text-[10px] tracking-[0.3em] text-[#253158] font-bold opacity-80 uppercase">
                  Digital Experience
                </div>
                <div className="relative aspect-[4/5] w-full flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentBrochureIndex}
                      src={images[currentBrochureIndex]}
                      initial={{ opacity: 0, x: 100, rotate: 10 }}
                      animate={{ opacity: 1, x: 0, rotate: -2 }}
                      exit={{ opacity: 0, x: -100, rotate: -10 }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white"
                      alt="Brochure Page"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-[#3a4f8a]/30 -z-10 translate-x-3 translate-y-3 rounded-2xl rotate-2"></div>
                  <div className="absolute inset-0 bg-[#253158]/20 -z-20 translate-x-6 translate-y-6 rounded-2xl -rotate-1"></div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center lg:text-right space-y-10"
              >
                <h4 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                  Download our <br /> Digital Brochure
                </h4>
                <div className="pt-4 flex justify-center lg:justify-end">
                  <button
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="px-10 py-4 bg-gradient-to-r from-[#253158] to-[#3a4f8a] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-lg tracking-wide"
                  >
                    Download PDF
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {isDownloadModalOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed inset-0 z-[310] flex items-center justify-center px-4"
                >
                  <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative border border-[#253158]/20">
                    <button
                      onClick={() => setIsDownloadModalOpen(false)}
                      className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 text-2xl"
                    >
                      ✕
                    </button>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                      Download Brochure
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base mb-10">
                      Enter your details to receive the digital brochure instantly.
                    </p>
                    <form className="space-y-8" onSubmit={handleBrochureDownload}>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={brochureForm.name}
                          onChange={(e) => setBrochureForm({ ...brochureForm, name: e.target.value })}
                          placeholder=" "
                          className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#253158] placeholder-transparent font-medium"
                        />
                        <label className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-[#253158] uppercase peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#253158] transition-all">
                          Full Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={brochureForm.email}
                          onChange={(e) => setBrochureForm({ ...brochureForm, email: e.target.value })}
                          placeholder=" "
                          className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#253158] placeholder-transparent font-medium"
                        />
                        <label className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-[#253158] uppercase peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#253158] transition-all">
                          Email Address
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={brochureForm.phone}
                          onChange={(e) => setBrochureForm({ ...brochureForm, phone: e.target.value })}
                          placeholder=" "
                          className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#253158] placeholder-transparent font-medium"
                        />
                        <label className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-[#253158] uppercase peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#253158] transition-all">
                          Phone Number
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-full mt-6 py-4 bg-gradient-to-r from-[#253158] to-[#3a4f8a] text-white font-bold rounded-xl tracking-widest text-sm hover:shadow-lg transition-all uppercase"
                      >
                        Download Now
                      </button>
                    </form>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </section>

        {/* CONNECTIVITY / GATEWAY TO MODERN LIVING */}
        <section className="relative bg-white py-20 md:py-32 px-4 md:px-6 overflow-visible border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-0 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border border-gray-200 group"
            >
              <div className="absolute inset-0 bg-[#253158]/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
              <img
                src={images[3]}
                alt="Regional Connectivity"
                className="w-full h-[400px] md:h-[550px] object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-20 -mt-24 md:-mt-32 mx-auto max-w-6xl px-4"
            >
              <div className="bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] p-8 md:p-12 border border-gray-200">
                <div className="text-center md:text-left mb-8">
                  <h3 className="text-gray-900 text-3xl font-bold tracking-tight">
                    Instant Registration Inquiry
                  </h3>
                  <p className="text-[#253158] text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
                    Connect with our sales expert today
                  </p>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
                  <div className="relative group/input">
                    <input
                      type="text"
                      required
                      className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#253158] transition-all placeholder-transparent font-medium"
                      id="inquiry_name"
                      placeholder="Name"
                    />
                    <label className="absolute left-0 -top-3.5 text-[#253158] text-xs font-bold tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#253158] peer-focus:text-xs">
                      Full Name
                    </label>
                  </div>
                  <div className="relative group/input">
                    <input
                      type="tel"
                      required
                      className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#253158] transition-all placeholder-transparent font-medium"
                      id="inquiry_phone"
                      placeholder="Phone"
                    />
                    <label className="absolute left-0 -top-3.5 text-[#253158] text-xs font-bold tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#253158] peer-focus:text-xs">
                      Mobile Number
                    </label>
                  </div>
                  <div className="relative group/input">
                    <select className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#253158] transition-all appearance-none cursor-pointer font-medium">
                      <option value="2bhk">2 BHK Independent Floor</option>
                      <option value="3bhk">3 BHK Independent Floor</option>
                    </select>
                    <label className="absolute left-0 -top-3.5 text-[#253158] text-xs font-bold tracking-widest">
                      Configuration
                    </label>
                  </div>
                  <div>
                    <button type="button" className="w-full py-4 bg-gradient-to-r from-[#253158] to-[#3a4f8a] text-white font-bold rounded-xl tracking-widest text-sm hover:shadow-xl transition-all uppercase">
                      Request Pricing
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 space-y-10 sticky top-32"
              >
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                  Seamlessly <br />
                  <span className="text-[#253158]">Connected.</span>
                </h2>
                <p className="text-slate-600 font-medium text-xl leading-relaxed">
                  Strategically located in Sector 36, Sohna, providing effortless connectivity to Gurgaon, major highways, and premium civic amenities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {landmarkData.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="p-8 bg-[#eef2ff] rounded-3xl border border-[#3a4f8a]/20 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="h-1 w-12 bg-[#253158] mb-6 group-hover:w-full transition-all duration-500 rounded-full"></div>
                      <h4 className="text-gray-900 font-bold text-lg mb-2">{item.name}</h4>
                      <p className="text-slate-600 font-medium">{item.type} • {item.distance}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 md:py-32 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-[#253158] mx-auto rounded-full" />
          </div>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                faq={faq}
                isOpen={openFaqIndex === idx}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ATSSohnaFloors;