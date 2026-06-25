"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/assets/gallery/ori19.jpeg",
  "/assets/gallery/ori20.jpeg",
  "/assets/gallery/ori21.jpeg",
  "/assets/gallery/ori18.jpeg",
  "/assets/gallery/ori11.jpeg",
];

export default function ResortSlider() {
  const [activeImg, setActiveImg] = useState(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-9xl mx-auto">
        {" "}
        {/* Changed to 7xl for better proportions with 4 images */}
        {/* Section Heading */}
    <div className="text-center mb-12">
     <a href="/resources/our-videos/township" >         <h2 className="text-4xl md:text-6xl font-semibold font-manrope text-[#263659] mb-4">
            Infra Development @{" "}
            <span className="text-[#263659]">Osiyan Habitat</span>
          </h2>
</a>
          <div className="h-1 w-20 bg-[#263659] mx-auto rounded-full"></div>
        </div>
        {/* Slider Container */}
        <div className="relative group">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={15} // Reduced space slightly to accommodate more images
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // MODIFIED BREAKPOINTS FOR 4 IMAGES
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }, // Added 4 columns for large screens
            }}
            className="pb-12"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[350px] overflow-hidden rounded-2xl cursor-pointer shadow-lg group/item"
                  onClick={() => setActiveImg(index)}
                >
                  <img
                    src={src}
                    alt={`Clubhouse view ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white border border-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                      View Large
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button className="custom-prev absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl text-slate-800 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 group-hover:left-2">
            <ChevronLeft size={24} />
          </button>
          <button className="custom-next absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl text-slate-800 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 group-hover:right-2">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* --- Lightbox Modal --- */}
      {activeImg !== null && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setActiveImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setActiveImg(null)}
          >
            <X size={40} />
          </button>

          <button
            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-all bg-white/5 p-2 rounded-full hover:bg-white/10"
            onClick={showPrev}
          >
            <ChevronLeft size={48} />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <img
              src={images[activeImg]}
              className="max-h-[80vh] w-auto rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              alt="Clubhouse Large View"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-6 text-white/60 font-light flex items-center gap-4">
              <span className="h-[1px] w-8 bg-white/20"></span>
              {activeImg + 1} / {images.length}
              <span className="h-[1px] w-8 bg-white/20"></span>
            </div>
          </div>

          <button
            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-all bg-white/5 p-2 rounded-full hover:bg-white/10"
            onClick={showNext}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
}
