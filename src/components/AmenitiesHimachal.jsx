

"use client";
import React, { useState } from 'react';
import { 
  Home, 
  Building2, 
  Milestone, 
  Compass, 
  Sparkles, 
  MapPin, 
  Car, 
  Train 
} from 'lucide-react';

export default function AmenitiesSection() {
  const brandGreen = "#293659";

  // State to track how many items to show (Initialized to 18 to fit all data)
  const [benefitsCount, setBenefitsCount] = useState(15);

  const locationBenefits = [
    { id: 1, icon: Sparkles, title: "Prem Mandir", time: "5 MIN" },
    { id: 2, icon: Home, title: "Banke Bihari Mandir", time: "10 MIN" },
    { id: 3, icon: Building2, title: "ISKCON Vrindavan", time: "6 MIN" },
    { id: 4, icon: Sparkles, title: "Chandrodaya Mandir", time: "4 MIN" },
    { id: 5, icon: Milestone, title: "Yamuna Expressway", time: "12 MIN" },
    { id: 6, icon: Train, title: "Vrindavan Station", time: "8 MIN" },
    { id: 7, icon: Train, title: "Mathura Junction", time: "25 MIN" },
    { id: 8, icon: Compass, title: "Nidhivan", time: "12 MIN" },
    { id: 9, icon: MapPin, title: "Mata Vaishno Devi Dham", time: "7 MIN" },
    { id: 10, icon: Home, title: "Radha Raman Mandir", time: "12 MIN" },
    { id: 11, icon: Building2, title: "Sri Krishna Janmabhoomi", time: "22 MIN" },
    { id: 12, icon: Compass, title: "Gवर्धन Hill (Govardhan)", time: "40 MIN" },
    { id: 13, icon: MapPin, title: "Radha Kund", time: "35 MIN" },
    { id: 14, icon: Car, title: "National Highway 19 (NH2)", time: "10 MIN" },
    { id: 15, icon: Building2, title: "Nayati Multi-Specialty Hospital", time: "15 MIN" },
    { id: 16, icon: Sparkles, title: "Gita Mandir Mathura", time: "20 MIN" },
    { id: 17, icon: Home, title: "Dwarkadhish Mandir", time: "25 MIN" },
    { id: 18, icon: Compass, title: "Barsana (Radha Rani Mandir)", time: "50 MIN" },
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.85)), url('/assets/blog/himachal/loc.jpg')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col w-full">
          
          {/* Header Section */}
          <header className="mb-20">
            <h2 className="text-white font-manrope text-4xl md:text-7xl font-bold tracking-tighter uppercase">
              BENEFITS OF THE LOCATION
            </h2>
          </header>

          {/* 1 Row, 6 Column Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {locationBenefits.slice(0, benefitsCount).map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="group relative aspect-square border border-white/10 flex flex-col items-center justify-center overflow-hidden cursor-pointer">
                  {/* Sliding Background */}
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ backgroundColor: brandGreen }}></div>
                  
                  {/* Icon Wrapper */}
                  <div className="relative z-10 text-[#293659] group-hover:text-white transition-all duration-300 mb-2 group-hover:animate-bounce">
                    <IconComponent size={36} strokeWidth={1.2} />
                  </div>
                  
                  {/* Title */}
                  <span className="relative z-10 text-white text-[11px] md:text-[13px] font-bold tracking-widest text-center px-2 uppercase">
                    {item.title}
                  </span>

                  {/* Time Indicator */}
                  <span className="relative z-10 text-white/50 group-hover:text-white/80 text-[10px] md:text-[11px] font-medium tracking-wider mt-1 transition-colors duration-300">
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Button for Location Benefits */}
          {benefitsCount < locationBenefits.length && (
            <div className="mt-10 text-center">
              <button 
                onClick={() => setBenefitsCount(locationBenefits.length)}
                className="group relative cursor-pointer px-8 py-4 text-white font-bold tracking-widest text-[12px] overflow-hidden"
              >
                <span className="relative z-10">VIEW ALL BENEFITS</span>
                <div className="absolute inset-0 bg-[#293659] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <div className="absolute inset-0 border border-[#293659]"></div>
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}