"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Amenities from "../../../components/Amenities";
import BlogSliderProject from "../../../components/BlogSliderProject";
import { ArrowRight } from "lucide-react";
import { Eye, Home, House, Percent, Maximize } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Moon, Dice5, Building2, Plane, Database } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const page = () => {
  

  const BRAND_GREEN = "#263659";

  const amenities = [
    {
      id: 1,
      title: "Vedic Reset & Signature Spa",
      image: "/assets/blog/pexels-pixabay-208504.jpg",
    },
    {
      id: 2,
      title: "Advanced Recovery Circuits",
      image: "/assets/blog/well.avif",
    },
    {
      id: 3,
      title: "Performance Training Studio",
      image: "/assets/blog/pexels-akshi-yogashala-1959421670-31185784.jpg",
    },
    {
      id: 4,
      title: "Cryo & Cold Therapy Suite",
      image: "/assets/blog/pexels-rishikeshyogpeeth-34047468.jpg",
    },
    {
      id: 5,
      title: "Infrared Sauna Lounge",
      image: "/assets/blog/pexels-yoga-course-india-932671557-20035463.jpg",
    },
  ];

 const timelineItems = [
  {
    id: 1,
    icon: Eye,
    title: "Spiritual Living",
    description:
      "Experience peaceful living just minutes away from the sacred temples of Vrindavan, surrounded by divine energy.",
  },
  {
    id: 2,
    icon: House,
    title: "Green & Serene Environment",
    description:
      "Wake up to lush landscapes, fresh air, and beautifully designed green spaces that promote a healthy lifestyle.",
  },
  {
    id: 3,
    icon: Home,
    title: "Premium Villa Lifestyle",
    description:
      "Enjoy thoughtfully designed villas with modern amenities, spacious interiors, and exceptional comfort for your family.",
  },
  {
    id: 4,
    icon: Percent,
    title: "High Investment Potential",
    description:
      "Benefit from Vrindavan's rapidly growing real estate market with strong appreciation and excellent future returns.",
  },
  {
    id: 5,
    icon: Maximize,
    title: "World-Class Amenities",
    description:
      "Access landscaped gardens, clubhouse, meditation zones, children's play areas, and recreational facilities within the community.",
  },
];

const benefits = [
  {
    title: "Prime Location",
    description:
      "Strategically located in the heart of Vrindavan with seamless connectivity to Prem Mandir, Banke Bihari Temple, ISKCON, and major highways.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="w-6 h-6"
      >
        <path d="M3 21h18" strokeLinecap="round" />
        <path
          d="M5 21V9l7-5 7 5v12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11h.01M12 11h.01M15 11h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Luxury Lifestyle",
    description:
      "Experience premium villas surrounded by lush greenery, landscaped gardens, modern infrastructure, and world-class amenities.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="w-6 h-6"
      >
        <rect x="4" y="3" width="9" height="18" rx="0.5" />
        <rect x="13" y="8" width="7" height="13" rx="0.5" />
        <path
          d="M7 7h.01M10 7h.01M7 11h.01M10 11h.01M7 15h.01M10 15h.01"
          strokeLinecap="round"
        />
        <path d="M16 12h.01M16 16h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Spiritual Living",
    description:
      "Enjoy a peaceful lifestyle inspired by the divine atmosphere of Vrindavan, with temples, meditation spaces, and serene surroundings.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="w-6 h-6"
      >
        <circle cx="9" cy="8" r="2.5" />
        <circle cx="17" cy="9" r="2" />
        <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5" strokeLinecap="round" />
        <path d="M14 14.5c2 .2 4 1.8 4 4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Secure Investment",
    description:
      "Invest in one of Vrindavan's fastest-growing destinations with high appreciation potential, clear legal documentation, and 24×7 gated security.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="w-6 h-6"
      >
        <path
          d="M14.5 6.5 18 3l1.5 1.5L16 8m-1.5-1.5L7 14l-1 3 3-1 7.5-7.5M14.5 6.5 16 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 21l3-1 1-3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 18l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

  return (
    <div>
      <Navbar />

      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/videos/20442432-hd_1920_1080_60fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-fallback.jpg"
        />

        {/* Dark Overlay - 40% black */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 flex justify-center">
            <div className="max-w-xl flex flex-col items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-white font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-[1.1]"
              >
                White Wolf Infra
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-white font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-[1.1]"
              >
                Vrindavan
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="text-white/90 text-sm sm:text-base lg:text-lg mt-6 sm:mt-8 leading-relaxed px-4"
              >
                Explore our exceptional projects and discover spaces designed
                for modern lifestyles and lasting value.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-black">
        {/* Background image */}
        <Image
          src="/assets/blog/vrindavan.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-10 sm:py-28 lg:px-16">
          <h2
            className="mb-10 sm:mb-14 bg-gradient-to-r from-[#293659] to-brand-primary bg-clip-text text-white text-[2.5rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "manrope, serif" }}
          >
            What White Wolf Infra
            <br />
            Gives You
          </h2>

          <div className="border-t border-white/25">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 items-start gap-3 border-b border-white/25 py-6 sm:py-7 sm:grid-cols-[280px_1fr] sm:items-center sm:gap-10 lg:grid-cols-[610px_1fr] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4 text-[#F3EEE3]">
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span
                    className="text-lg sm:text-xl lg:text-3xl"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="max-w-md pl-20 text-xl leading-relaxed text-[#fff] sm:pl-0 sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          {/* Left: Sticky Heading */}
          <div className="relative">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-['Playfair_Display'] uppercase font-bold leading-[1.05] text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#293659] to-brand-primary bg-clip-text text-transparent">
                Facilities &amp;
                <br />
                Experiences
              </h2>
            </div>
          </div>

          {/* Right: Vertical Timeline */}
          <div className="relative pl-2">
            {/* Vertical connecting line */}
            <div
              className="absolute left-[27px] top-[28px] bottom-[28px] w-px bg-gray-200"
              aria-hidden="true"
            />

            <ul className="space-y-12 sm:space-y-16">
              {timelineItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.id}
                    className="group relative flex gap-5 sm:gap-6 items-start cursor-default"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: [0, -10, 0, -4, 0],
                      transition: { duration: 0.6, ease: "easeInOut" },
                    }}
                  >
                    {/* Icon Circle */}
                    <div
                      className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-10 sm:h-14 rounded-full shrink-0 ring-4 ring-white shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#6CB52D]/40 group-hover:scale-110"
                      style={{ backgroundColor: BRAND_GREEN }}
                    >
                      <Icon
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        strokeWidth={1.75}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="pt-1 sm:pt-1.5">
                      <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-gray-900 mb-1.5 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

     

      <section className="relative w-full overflow-hidden bg-[#1d2944] py-16 px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Background texture / pattern image */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('/real_estate_hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 sm:mb-14">
            <h2 className="font-['Playfair_Display'] uppercase text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              Wellness
              <br />
              Amenities
            </h2>

            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-md md:text-right leading-relaxed">
              An integrated collection of precision health, performance, and
              restorative environments built to deliver measurable, long term
              vitality.
            </p>
          </div>

          {/* Swiper Slider */}
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={5}
            slidesPerView={1.1}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              480: { slidesPerView: 1.3, spaceBetween: 16 },
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="wellness-swiper !pb-14"
          >
            {amenities.map((item) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-xl overflow-hidden group cursor-default"
                  whileHover={{
                    y: [0, -14, 0, -6, 0],
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    {/* <h3 className="text-white text-base sm:text-lg md:text-xl font-bold drop-shadow-sm">
                      {item.title}
                    </h3> */}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Tagline */}
          <p className="font-['Playfair_Display'] text-white/90 text-lg sm:text-xl md:text-2xl mt-4">
            Designed for comfort.{" "}
            <span className="italic">Curated for experience.</span>
          </p>
        </div>

        {/* Swiper custom styling */}
        <style jsx global>{`
          .wellness-swiper .swiper-button-next,
          .wellness-swiper .swiper-button-prev {
            color: #ffffff;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            backdrop-filter: blur(4px);
          }
          .wellness-swiper .swiper-button-next::after,
          .wellness-swiper .swiper-button-prev::after {
            font-size: 16px;
            font-weight: bold;
          }
          .wellness-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
          }
          .wellness-swiper .swiper-pagination-bullet-active {
            background: #6cb52d;
          }
          @media (max-width: 640px) {
            .wellness-swiper .swiper-button-next,
            .wellness-swiper .swiper-button-prev {
              width: 32px;
              height: 32px;
            }
          }
        `}</style>
      </section>

       <div className="w-full h-60 sm:h-64 md:h-90 overflow-hidden my-12">
        <img
          src="/assets/blog/vrindavan-banner.png"
          alt="Team"
          className="w-full h-full object-cover hover:grayscale-0 hover:scale-[1.30] transition-transform duration-[2000ms]"
        />
      </div>

      <Amenities />
      <BlogSliderProject />

      <Footer />
    </div>
  );
};

export default page;
