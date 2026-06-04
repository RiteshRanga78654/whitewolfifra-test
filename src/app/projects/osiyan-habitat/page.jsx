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
} from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { MAP_DATA } from "../../../data/mapData";

// --- DATA ---
const images = [
  "/Osiyan Habitat/osiyan-habitat-1.png",
  "/Osiyan Habitat/osiyan-habitat-2.png",
  "/Osiyan Habitat/osiyan-habitat-3.png",
  "/Osiyan Habitat/osiyan-habitat-4.png",
  "/Osiyan Habitat/osiyan-habitat-5.png",
];

const plotData = [
  { plotNo: "1", size: "166.378 Sq. Yrds", sqft: "NA", facing: "North East" },
  { plotNo: "2-8", size: "121.992 Sq. Yrds", sqft: "NA", facing: "North East" },
  { plotNo: "9", size: "151.037 Sq. Yrds", sqft: "NA", facing: "NE Corner" },
  { plotNo: "10-20", size: "134.267 Sq. Yrds", sqft: "NA", facing: "South East" },
  { plotNo: "21", size: "124.748 Sq. Yrds", sqft: "NA", facing: "South East" },
  { plotNo: "22", size: "105.686 Sq. Yrds", sqft: "NA", facing: "South East" },
  { plotNo: "23-32", size: "126.628 Sq. Yrds", sqft: "NA", facing: "North" },
  { plotNo: "33", size: "145.235 Sq. Yrds", sqft: "NA", facing: "SE Corner" },
  { plotNo: "34-48", size: "145.235 Sq. Yrds", sqft: "NA", facing: "East" },
  { plotNo: "49", size: "145.235 Sq. Yrds", sqft: "NA", facing: "NE Corner" },
  { plotNo: "50", size: "145.235 Sq. Yrds", sqft: "NA", facing: "NW Corner" },
  { plotNo: "51-65", size: "145.235 Sq. Yrds", sqft: "NA", facing: "West" },
  { plotNo: "66", size: "145.235 Sq. Yrds", sqft: "NA", facing: "SW Corner" },
  { plotNo: "67", size: "145.235 Sq. Yrds", sqft: "NA", facing: "SE Corner" },
  { plotNo: "68-82", size: "145.235 Sq. Yrds", sqft: "NA", facing: "East" },
  { plotNo: "83", size: "145.235 Sq. Yrds", sqft: "NA", facing: "NE Corner" },
  { plotNo: "84", size: "154.357 Sq. Yrds", sqft: "NA", facing: "NE Corner" },
  { plotNo: "85-93", size: "154.357 Sq. Yrds", sqft: "NA", facing: "North" },
  { plotNo: "94", size: "154.357 Sq. Yrds", sqft: "NA", facing: "NW Corner" },
];

const amenities = [
  { name: "Secure Gated Community", icon: <Lock className="w-6 h-6" /> },
  { name: "Wide Internal Roads", icon: <Construction className="w-6 h-6" /> },
  { name: "Parks & Green Spaces", icon: <Trees className="w-6 h-6" /> },
  { name: "Landscaped Common Areas", icon: <Leaf className="w-6 h-6" /> },
  { name: "Modern Electrical Infrastructure", icon: <Zap className="w-6 h-6" /> },
  { name: "Underground Water Pipeline", icon: <Droplets className="w-6 h-6" /> },
  { name: "Sewer Infrastructure", icon: <Waves className="w-6 h-6" /> },
  { name: "Smart Planned Connectivity", icon: <MapPin className="w-6 h-6" /> },
  { name: "Investor-Friendly", icon: <TrendingUp className="w-6 h-6" /> },
  { name: "Premium Entrance Gateway", icon: <ShieldCheck className="w-6 h-6" /> },
];

const highlights = [
  "DDJAY Approved Project",
  "Developer Linked Payment Plan (DLPP)",
  "Transparent Payment Structure",
  "Investor Friendly Development",
  "Smart Location with Strong Future Growth",
  "High Appreciation Potential",
  "Wide Roads & Strong Connectivity",
  "Modern Water, Sewer & Electrical Infrastructure",
  "Secure Gated Community with Parks & Green Spaces",
];

const whyInvest = [
  {
    title: "DDJAY Approved Project",
    desc: "Government-approved projects offer better legal security and smoother ownership processes.",
  },
  {
    title: "Developer Linked Payment Plan",
    desc: "Payments are linked with actual development progress, ensuring higher transparency.",
  },
  {
    title: "Rapidly Developing Jhajjar",
    desc: "Jhajjar is emerging as a strong real estate and infrastructure hub near NCR.",
  },
  {
    title: "High Appreciation Potential",
    desc: "Strategic location and ongoing infrastructure growth can significantly increase property value.",
  },
  {
    title: "Excellent Connectivity",
    desc: "Wide roads and well-planned access routes provide seamless travel connectivity.",
  },
  {
    title: "Modern Infrastructure",
    desc: "Includes water pipelines, sewer systems, and electrical infrastructure.",
  },
  {
    title: "Parks & Green Spaces",
    desc: "Landscaped parks and open green zones improve quality of life.",
  },
  {
    title: "Secure Gated Community",
    desc: "A gated environment offers better security and organized community living.",
  },
];

const faqs = [
  {
    q: "Is the project legally approved?",
    a: "Yes, the project is DDJAY approved, ensuring better legal transparency and secure ownership.",
  },
  {
    q: "What makes the Developer Linked Payment Plan (DLPP) beneficial?",
    a: "The DLPP structure links payments directly with construction progress, reducing upfront financial burden.",
  },
  {
    q: "Why is Jhajjar considered a strong investment destination?",
    a: "Jhajjar is rapidly developing with improving infrastructure, connectivity, and growing real estate demand.",
  },
  {
    q: "What infrastructure and amenities are included in the project?",
    a: "The project offers wide roads, water & sewer infrastructure, electrical ducting, landscaped parks, and a secure gated environment.",
  },
  {
    q: "Is this project suitable for both investment and end use?",
    a: "Yes, the project is designed for long-term investment growth as well as comfortable residential living.",
  },
];

const landmarkData = [
  { name: "Delhi Public School Jhajjar", distance: "26 KM", type: "School" },
  { name: "AIIMS Jhajjar", distance: "27 KM", type: "Hospital" },
  { name: "State Bank of India (SBI)", distance: "4.4 KM", type: "Bank" },
  { name: "Local Retail Markets", distance: "2-4 KM", type: "Shopping" },
  { name: "Town Park Jhajjar", distance: "4.3 KM", type: "Park" },
  { name: "Civil Hospital Jhajjar", distance: "6.9 KM", type: "Hospital" },
];

const neighbors = [
  {
    plot: "22",
    name: "Preetam Daniel",
    image: "/client3.png",
    quote: "For me, the bigger developers had a problem with valuation, the smaller ones had poor infrastructure. I own a plot in Osiyan Habitat and it was true value for money.",
  },
  {
    plot: "94",
    name: "Nirmal Raj",
    image: "/client2.png",
    quote: "It's easy to acquire property but maintaining it is a big headache. I think this is a good investment because they look after it and protect it.",
  },
];

const rawPlots = MAP_DATA.b.filter(
  (item) =>
    item.type?.toLowerCase() === "plot" &&
    item.name?.toLowerCase().startsWith("plot-"),
);
const rawRoads = MAP_DATA.b.filter(
  (item) =>
    (item.type?.toLowerCase() === "road" ||
      item.name?.toLowerCase().includes("road")) &&
    item.id !== "b-36",
);

const PREVIEW_PLOTS = [...rawPlots, ...rawRoads];

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
          ? "0 32px 80px rgba(165, 77, 33, 0.15), 0 12px 32px rgba(165, 77, 33, 0.08)"
          : "0 8px 32px rgba(165, 77, 33, 0.05), 0 2px 8px rgba(165, 77, 33, 0.02)",
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
    <div className="border-b border-[#a54d21]/20">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg md:text-xl font-bold text-gray-900">{faq.q}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-[#a54d21]" />
        ) : (
          <ChevronDown className="w-6 h-6 text-[#a54d21]" />
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
            <p className="pb-6 text-stone-600 leading-relaxed text-lg">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OsiyanHabitat = () => {
  const router = useRouter();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [brochureForm, setBrochureForm] = useState({ name: "", email: "", phone: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBrochureIndex, setCurrentBrochureIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("community");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeAutoPlot, setActiveAutoPlot] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    if (PREVIEW_PLOTS.length === 0) return;
    const interval = setInterval(() => {
      const isRoadTurn = Math.random() < 0.3;
      let targetIndex;

      if (isRoadTurn && rawRoads.length > 0) {
        const randomRoadIdx = Math.floor(Math.random() * rawRoads.length);
        targetIndex = rawPlots.length + randomRoadIdx;
      } else if (rawPlots.length > 0) {
        targetIndex = Math.floor(Math.random() * rawPlots.length);
      } else {
        targetIndex = 0;
      }

      setActiveAutoPlot(targetIndex);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  const activePlotItem = PREVIEW_PLOTS[activeAutoPlot];
  const isRoadItem =
    activePlotItem?.type?.toLowerCase() === "road" ||
    activePlotItem?.name?.toLowerCase().includes("road");
  const plotNoMatch = !isRoadItem ? activePlotItem?.name?.match(/\d+/) : null;
  const plotNo = plotNoMatch ? parseInt(plotNoMatch[0]) : null;
  const activePlotData = plotNo
    ? plotData.find((p) => p.plotNo == plotNo)
    : null;

  const handleBrochureDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/assets/pdf/osiyan-habitat-brochure.pdf";
    link.download = "Osiyan-Habitat-Brochure.pdf";
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
        className="relative min-h-screen text-gray-900 font-sans selection:bg-[#a54d21] selection:text-white overflow-x-hidden"
        style={{
          background: "linear-gradient(135deg, #f7f3ed 0%, #faf8f5 50%, #f0ebd8 100%)",
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
                className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#f7f3ed] z-[210] border-l border-[#a54d21]/20 p-12 flex flex-col justify-center shadow-2xl"
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-10 right-10 text-stone-500 hover:text-[#a54d21] text-3xl transition-colors"
                >
                  ✕
                </button>
                <nav className="flex flex-col gap-10">
                  {["Luxury Villas", "Invest in Plot", "Enjoy Clubhouse"].map((item, i) => (
                    <motion.a
                      key={item}
                      href={
                        item === "Luxury Villas" ? "/" : item === "Invest in Plot" ? "/plots" : "/clubhouse"
                      }
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl font-Condensed font-bold text-gray-900 hover:text-[#a54d21] transition-colors"
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
            {/* Keeping dark overlay so text is readable on hero image */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 -mt-10"
          >
            <h1 className="text-5xl md:text-[110px] leading-[0.85] font-Condensed mb-6 text-white tracking-tight font-bold">
              Secure Your <span className="text-white">Plot</span>
            </h1>
            <p className="text-[12px] md:text-[22px] font-bold tracking-[0.1em] mb-10 text-white opacity-90 uppercase">
              DDJAY Approved • High Growth • DLPP
              
            </p>
          </motion.div>

          {/* PROJECT INFO OVERLAY */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[95%] lg:max-w-6xl px-2">
            <div className="flex flex-wrap sm:flex-nowrap min-h-[90px] w-full items-center justify-center overflow-hidden shadow-2xl rounded-xl bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border border-gray-100">
              
              <div className="flex-1 flex flex-col items-center justify-center py-5 px-4 hover:bg-gray-50 transition-colors w-1/2 sm:w-auto">
                <span className="font-Condensed font-bold text-3xl md:text-4xl text-gray-900 mb-1">5.954 <span className="text-xl md:text-2xl text-stone-500">Acres</span></span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-[#a54d21]">Land Area</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center py-5 px-4 hover:bg-gray-50 transition-colors w-1/2 sm:w-auto">
                <span className="font-Condensed font-bold text-3xl md:text-4xl text-gray-900 mb-1">Mar <span className="text-xl md:text-2xl text-stone-500">2029</span></span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-[#a54d21]">Completion</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center py-5 px-4 hover:bg-gray-50 transition-colors w-1/2 sm:w-auto">
                <span className="font-Condensed font-bold text-3xl md:text-4xl text-gray-900 mb-1">Developing</span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-[#a54d21]">Status</span>
              </div>
              
              <div className="flex-[1.2] flex flex-col items-center justify-center py-5 px-4 hover:bg-gray-50 transition-colors w-1/2 sm:w-auto">
                <span className="font-Condensed font-bold text-xl md:text-2xl text-gray-900 mb-1 text-center">HRERA-PKL-JJR-702-2025</span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-[#a54d21]">RERA ID</span>
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
              className="text-5xl md:text-7xl font-semibold font-Condensed leading-tight text-gray-900"
            >
              Build your <span className="text-[#a54d21]">Dream Home</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-1 bg-[#a54d21] mb-8"></div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-stone-700">
                  Osiyan Habitat plots aren't just land parcels, they're your ticket to a premium lifestyle township. Where your morning coffee comes with peaceful surroundings and modern amenities.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-stone-600">
                  Secure Gated Community with Wide Roads, Landscaped Parks & Green Spaces, Modern Electrical Infrastructure, and excellent connectivity in Jhajjar.
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
          <div className="absolute inset-0 bg-black/40"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-3xl md:text-6xl font-Condensed font-bold mb-6 text-white tracking-tight drop-shadow-2xl">
              Most Townships Give You a House.<br />
              <span className="text-[#c8a96b]">We Give You a Complete Lifestyle.</span>
            </h1>
          </motion.div>
        </div>

        {/* PROJECT HIGHLIGHTS */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-Condensed font-bold text-gray-900 mb-4">Project Highlights</h2>
            <div className="h-1 w-20 bg-[#a54d21] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, idx) => (
              <TiltCard
                key={idx}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-[#a54d21]/10 h-full cursor-default"
              >
                <CheckCircle2 className="w-6 h-6 text-[#a54d21] flex-shrink-0 mt-1" />
                <p className="text-lg font-medium text-gray-800 leading-tight">{highlight}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* AMENITIES */}
        <section className="py-20 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] shadow-xl border border-gray-100 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-Condensed font-bold text-gray-900 mb-4">Premium Amenities</h2>
            <div className="h-1 w-20 bg-[#c8a96b] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 md:px-10">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4 group">
                <div className="w-16 h-16 rounded-full bg-[#f7f3ed] flex items-center justify-center text-[#a54d21] group-hover:bg-[#a54d21] group-hover:text-white transition-all shadow-md">
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
                <h3 className="text-4xl md:text-6xl font-Condensed font-bold text-gray-900">
                  Why invest in Osiyan Habitat?
                </h3>
                <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-lg">
                  Hassle-free ownership with zero maintenance issues. DDJAY approved project with transparent payment structures and high appreciation potential.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyInvest.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-[#a54d21]/10">
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-stone-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col gap-16">
              <div className="relative w-full max-w-sm mx-auto lg:ml-auto group">
                <div className="absolute -top-12 left-0 text-[10px] tracking-[0.3em] text-[#a54d21] font-bold opacity-80">
                  Digital Experience — Auto Playing
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
                  <div className="absolute inset-0 bg-[#c8a96b]/30 -z-10 translate-x-3 translate-y-3 rounded-2xl rotate-2"></div>
                  <div className="absolute inset-0 bg-[#a54d21]/20 -z-20 translate-x-6 translate-y-6 rounded-2xl -rotate-1"></div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center lg:text-right space-y-10"
              >
                <h4 className="text-3xl md:text-5xl font-Condensed font-bold text-gray-900 leading-tight">
                  Download our <br /> Digital Brochure
                </h4>
                <div className="pt-4 flex justify-center lg:justify-end">
                  <button
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="px-10 py-4 bg-gradient-to-r from-[#a54d21] to-[#c8a96b] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-lg tracking-wide"
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
                  <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative border border-[#a54d21]/20">
                    <button
                      onClick={() => setIsDownloadModalOpen(false)}
                      className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 text-2xl"
                    >
                      ✕
                    </button>
                    <h3 className="text-3xl md:text-4xl font-Condensed font-bold text-gray-900 mb-4">
                      Download Brochure
                    </h3>
                    <p className="text-stone-500 text-sm md:text-base mb-10">
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
                          className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#a54d21] placeholder-transparent font-medium"
                        />
                        <label className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-[#a54d21] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#a54d21] transition-all">
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
                          className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#a54d21] placeholder-transparent font-medium"
                        />
                        <label className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-[#a54d21] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#a54d21] transition-all">
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
                          className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#a54d21] placeholder-transparent font-medium"
                        />
                        <label className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-[#a54d21] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#a54d21] transition-all">
                          Phone Number
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-full mt-6 py-4 bg-gradient-to-r from-[#a54d21] to-[#c8a96b] text-white font-bold rounded-xl tracking-widest text-sm hover:shadow-lg transition-all"
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

        {/* NEIGHBOURS */}
        <section className="bg-white py-20 md:py-24 px-6 overflow-hidden border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 space-y-4"
            >
              <h2 className="text-4xl md:text-7xl font-bold font-Condensed text-gray-900 leading-tight">
                Spend a Few Minutes Getting <br /> to know Your{" "}
                <span className="text-[#a54d21]">Neighbours.</span>
              </h2>
              <div className="h-1 w-20 bg-[#c8a96b] mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {neighbors.map((neighbor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="flex flex-col group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg border border-stone-100 mb-8">
                    <img
                      src={neighbor.image}
                      alt={neighbor.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 border border-white/50 rounded-xl shadow-lg">
                      <p className="text-[#a54d21] text-[10px] tracking-[0.3em] font-black mb-1">
                        Estate Asset
                      </p>
                      <h4 className="text-gray-900 text-2xl font-Condensed font-bold tracking-tighter">
                        Plot {neighbor.plot}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-6 px-2">
                    <p className="text-stone-600 font-medium text-xl md:text-2xl leading-relaxed italic">
                      "{neighbor.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-[2px] w-12 bg-[#a54d21]" />
                      <span className="text-gray-900 font-bold tracking-widest text-xs uppercase">
                        {neighbor.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE INVENTORY & MASTERPLAN */}
        <section className="relative py-20 md:py-25 px-6 md:px-16 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-[#a54d21]" />
                  <span className="text-[#a54d21] text-xs font-black tracking-[0.5em] uppercase">
                    Project Blueprint
                  </span>
                </div>
                <h2 className="text-4xl md:text-7xl font-bold font-Condensed leading-[0.85] tracking-tighter text-gray-900">
                  Take an Aerial Tour <br />
                  <span className="text-[#c8a96b]">of Paradise.</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-5 pb-4"
              >
                <p className="text-stone-600 font-medium text-xl leading-relaxed">
                  A strategically located premium plotted development in Sector 27, Jhajjar. Featuring modern infrastructure, secure gated community, and excellent connectivity.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                  <h4 className="text-[#a54d21] text-[10px] font-black tracking-[0.4em] uppercase mb-8">
                    Live Configurations
                  </h4>
                  <div className="space-y-0 h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    <style>{`
                      .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                      .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
                      .custom-scrollbar::-webkit-scrollbar-thumb { background: #c8a96b; border-radius: 10px; }
                    `}</style>
                    {plotData.map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 10, backgroundColor: "#faf8f5" }}
                        className="grid grid-cols-3 py-5 border-b border-gray-100 group cursor-default transition-all rounded-lg px-2"
                      >
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Plot №</span>
                          <span className="text-lg font-Condensed font-bold text-gray-900">{item.plotNo}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Size</span>
                          <span className="text-lg font-Condensed font-bold text-gray-900">{item.size}</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[#a54d21] text-[9px] font-bold uppercase tracking-wider">Facing</span>
                          <span className="text-sm font-Condensed font-bold text-[#c8a96b]">{item.facing}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 relative">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="relative h-full min-h-[450px]"
                >
                  <div className="absolute inset-0 bg-[#c8a96b]/20 -rotate-2 scale-105 rounded-3xl" />
                  <div className="relative z-10 bg-[#faf8f5] border border-gray-200 p-4 shadow-2xl overflow-hidden rounded-3xl h-full flex flex-col cursor-pointer group" onClick={() => window.open("/3d-map", "_blank")}>
                    <div className="p-4 bg-gray-50 border-b border-gray-100 rounded-t-2xl flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-800">Interactive 3D Map</h3>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#faf8f5]/90 border border-[#e4ded5] backdrop-blur-md rounded-full shadow-sm">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a54d21]/60 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a54d21]"></span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#a54d21]">Live Scanner</span>
                      </div>
                    </div>
                    <div className="relative flex-1 bg-[#e3eae4] overflow-hidden group rounded-b-2xl flex items-center justify-center min-h-[400px]">
                      <img
                        src="/3d-map/MASTER-PLAN.svg"
                        alt="Osiyan Habitat 3D Master Plan"
                        className="w-full h-full object-contain select-none pointer-events-none opacity-90 absolute inset-0"
                      />
                      <svg
                        viewBox="0 0 4961 3508"
                        className="absolute inset-0 w-full h-full z-10 overflow-visible pointer-events-none"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        {PREVIEW_PLOTS.map((item, idx) => {
                          const isActive = idx === activeAutoPlot;
                          return (
                            <path
                              key={`${item.id}-${idx}`}
                              id={`preview-path-${item.id}-${idx}`}
                              d={item.svgPath}
                              transform={item.transform || ""}
                              fill={isActive ? "rgba(165, 77, 33, 0.55)" : "transparent"}
                              stroke={isActive ? "#a54d21" : "transparent"}
                              strokeWidth="18"
                              className="transition-all duration-300"
                            />
                          );
                        })}
                      </svg>
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] z-10 pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(165,77,33,0.8), transparent)" }}
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute bottom-4 left-4 z-20 w-[90%] text-left">
                        {isRoadItem ? (
                          <div className="mb-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e4ded5] inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-[#c8a96b] animate-pulse" />
                            <span>{activePlotItem?.name}</span>
                          </div>
                        ) : activePlotData ? (
                          <div className="mb-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e4ded5] inline-flex items-center gap-2 text-xs font-bold text-stone-700 shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-[#a54d21] animate-pulse" />
                            <span>Plot {plotNo}</span>
                            <span className="text-stone-300">•</span>
                            <span>{activePlotData.size}</span>
                            <span className="text-stone-300">•</span>
                            <span className="text-[#a54d21] font-extrabold">{activePlotData.facing}</span>
                          </div>
                        ) : null}
                        <div className="mt-1">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-1.5 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md bg-gradient-to-r from-[#a54d21] to-[#c8a96b]"
                          >
                            <span>Open Full Map</span>
                            <FiArrowRight />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -right-6 hidden md:flex flex-col bg-gradient-to-br from-[#a54d21] to-[#c8a96b] p-8 text-white shadow-2xl z-20 max-w-xs rounded-2xl">
                    <p className="text-xs font-bold tracking-widest uppercase mb-2 text-white/80">
                      Masterplan
                    </p>
                    <h4 className="text-2xl font-Condensed font-bold leading-tight mb-4">
                      Ready to secure your dream plot?
                    </h4>
                    <button className="px-6 py-3 bg-white text-[#a54d21] font-bold rounded-xl shadow-md hover:scale-105 transition-all text-sm">
                      Get HD PDF
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-20 mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-[#a54d21]/20 pt-16 text-center">
              {[
                { label: "Amenities", val: "10+" },
                { label: "Plot Units", val: "94" },
                { label: "Estate Scale", val: "Premium" },
                { label: "Electricity", val: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[#a54d21] text-xs md:text-sm font-black tracking-widest uppercase">
                    {stat.label}
                  </p>
                  <p className="text-4xl md:text-6xl font-Condensed font-bold text-gray-900 tabular-nums">
                    <RollingNumber value={stat.val} />
                  </p>
                </div>
              ))}
            </div>
          </div>
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
              <div className="absolute inset-0 bg-[#a54d21]/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
              <img
                src="/Osiyan Habitat/osiyan-habitat-3.png"
                alt="Regional Connectivity Map"
                className="w-full h-[500px] md:h-[650px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
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
                  <h3 className="text-gray-900 text-3xl font-Condensed font-bold tracking-wide">
                    Instant Registration Inquiry
                  </h3>
                  <p className="text-[#a54d21] text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
                    Approved by all major banks for loans
                  </p>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
                  <div className="relative group/input">
                    <input
                      type="text"
                      required
                      className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#a54d21] transition-all placeholder-transparent font-medium"
                      id="name"
                      placeholder="Name"
                    />
                    <label className="absolute left-0 -top-3.5 text-[#a54d21] text-xs font-bold tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#a54d21] peer-focus:text-xs">
                      Full Name
                    </label>
                  </div>
                  <div className="relative group/input">
                    <input
                      type="tel"
                      required
                      className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#a54d21] transition-all placeholder-transparent font-medium"
                      id="phone"
                      placeholder="Phone"
                    />
                    <label className="absolute left-0 -top-3.5 text-[#a54d21] text-xs font-bold tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#a54d21] peer-focus:text-xs">
                      Mobile Number
                    </label>
                  </div>
                  <div className="relative group/input">
                    <select className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-gray-900 focus:outline-none focus:border-[#a54d21] transition-all appearance-none cursor-pointer font-medium">
                      <option value="1200">105 - 130 sq.yrd</option>
                      <option value="2400">130 - 166 sq.yrd</option>
                    </select>
                    <label className="absolute left-0 -top-3.5 text-[#a54d21] text-xs font-bold tracking-widest">
                      Plot Dimension
                    </label>
                  </div>
                  <div>
                    <button className="w-full py-4 bg-gradient-to-r from-[#a54d21] to-[#c8a96b] text-white font-bold rounded-xl tracking-widest text-sm hover:shadow-xl transition-all">
                      Secure Plot
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
                <h2 className="text-5xl md:text-7xl font-bold font-Condensed text-gray-900 leading-[1.1]">
                  Gateway to <br />
                  <span className="text-[#a54d21]">Modern Living.</span>
                </h2>
                <p className="text-stone-600 font-medium text-xl leading-relaxed">
                  Perfectly positioned in Sector 27, Jhajjar, Osiyan Habitat offers an exceptional opportunity to experience premium villa plots with modern amenities in a rapidly developing growth corridor.
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
                      className="p-8 bg-[#f7f3ed] rounded-3xl border border-[#c8a96b]/30 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="h-1 w-12 bg-[#a54d21] mb-6 group-hover:w-full transition-all duration-500 rounded-full"></div>
                      <h4 className="text-gray-900 font-bold text-lg mb-2">{item.name}</h4>
                      <p className="text-stone-600 font-medium">{item.type} • {item.distance}</p>
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
            <h2 className="text-4xl md:text-6xl font-Condensed font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-[#a54d21] mx-auto rounded-full" />
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

export default OsiyanHabitat;
