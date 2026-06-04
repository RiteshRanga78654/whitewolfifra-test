'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { countries } from './countryCodes';

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-white py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Left Side: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-7xl font-black text-black tracking-tighter mb-8 uppercase leading-none">
              LET'S CONNECT<span className="text-brand-primary">.</span><br/>
              <span className=" text-3xl md:text-5xl bg-gradient-to-r from-[#293659] to-brand-primary bg-clip-text text-transparent">Let's Start a Conversation</span>
            </h2>
            <p className="text-xl text-black/40 font-medium max-w-lg mb-12">
              Conversation leads to better understanding of crucial aspects involved in decision making before finalising estates.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.4em] mb-2">Visit Our Headquarters</p>
                <p className="text-lg font-bold text-black">Plot number E-02, ATS Homekraft Bonheur Avenue, Sohna road, Sector 35, Sohna, Haryana-122103</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.4em] mb-2">Direct Enquiry</p>
                <p className="text-lg font-bold text-black">+91 70707 08264</p>
                <p className="text-lg font-bold text-black">Whitewolfinfra@gmail.com</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full bg-[#f8f9fa] rounded-[3rem] p-6 sm:p-8 md:p-12 border border-black/5 shadow-2xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-black/30 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-brand-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2 w-full">
                  <label className="text-[10px] font-black text-black/30 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    {/* <div className="w-full sm:w-28 flex-shrink-0 relative">
                      <select className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm font-bold text-gray-900 appearance-none focus:outline-none focus:border-brand-primary/50 transition-colors">
                        {countries.sort((a, b) => a.name === "India" ? -1 : b.name === "India" ? 1 : 0).map((country) => (
                          <option key={country.iso} className="text-gray-900" value={country.code}>
                            {country.iso} ({country.code})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                    </div> */}
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      className="flex-1 w-full min-w-0 bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-brand-primary/50 transition-colors"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-black/30 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-brand-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-black/30 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows="4"
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-brand-primary/50 transition-colors resize-none"
                ></textarea>
              </div>

              <button className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs tracking-[0.4em] uppercase hover:bg-brand-primary transition-all transform active:scale-95 shadow-xl mt-4">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
