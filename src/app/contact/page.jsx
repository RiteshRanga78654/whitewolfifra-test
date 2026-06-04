'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';

import { MapPin, Phone, Mail, Clock, ArrowRight, MessageSquare } from 'lucide-react';

// Animation Variants
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// ADD THIS:
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});


export default function Contact() {
  return (
    <SmoothScroll>
      <div className="bg-[#fafaf9] min-h-screen font-sans selection:bg-[#293659] selection:text-white">
        <Navbar />
        
       {/* ── HERO ── */}
<section className="pt-48 pb-20 px-6 relative">
  <div className="max-w-7xl mx-auto text-center relative z-10">
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeUpContainer}
    >
      <motion.div
        variants={fadeUpItem}
        className="inline-flex items-center gap-3 text-[#212946] font-bold uppercase tracking-[0.2em] text-sm mb-6"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        <MessageSquare className="w-4 h-4" />
        <span>Get In Touch</span>
      </motion.div>

      <motion.h1
        variants={fadeUpItem}
        className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[0.9]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >Start a{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#212946] to-[#3a4f8a]">
          Conversation
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUpItem}
        className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed"
      >
        Conversation leads to better understanding of crucial aspects involved in decision making before finalising estates
      </motion.p>
    </motion.div>
  </div>
</section>
        {/* Contact Split Layout */}
        <section className="py-20 px-6 -mt-10 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Contact Details (Bento Grid) */}
              <motion.div 
                className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpContainer}
              >
                {/* Headquarters Card */}
                <motion.div variants={fadeUpItem} className=" p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-[#293659]/5 border border-gray-100 sm:col-span-2 lg:col-span-1">
                  <div className="w-14 h-14 bg-[#293659]/5 rounded-2xl flex items-center justify-center mb-6 text-[#293659]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase mb-4">Headquarters</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6">
                    Plot number E-02, ATS Homekraft Bonheur Avenue, Sohna road, Sector 35, Sohna, Haryana-122103
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-[#293659] font-bold uppercase tracking-widest text-xs hover:text-brand-primary transition-colors">
                    Get Directions <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>

                {/* Contact Info Cards */}
                <motion.div variants={fadeUpItem} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#293659]/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-brand-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-2">Private Advisory</h4>
                  <p className="text-xl font-bold text-gray-900 tracking-tight">+91 70707 08264</p>
                </motion.div>

                <motion.div variants={fadeUpItem} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#293659]/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-brand-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-2">Email Desk</h4>
                  <p className="text-lg font-bold text-gray-900 tracking-tight">Whitewolfinfra@gmail.com</p>
                </motion.div>

              </motion.div>

              {/* Right Column: Interactive Form */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-[#293659]/10 border border-gray-100"
              >
                <div className="mb-10">
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase mb-3">
                    Send a Message
                  </h3>
                  <p className="text-gray-500 font-medium">
                    Fill out the form below and our concierge team will reach out within 24 hours.
                  </p>
                </div>

                <form className="space-y-6">
                  {/* Name & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-900 uppercase tracking-widest pl-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        className="w-full bg-[#fafaf9] border border-gray-200 text-gray-900 px-6 py-4 rounded-2xl outline-none focus:border-[#293659] focus:ring-1 focus:ring-[#293659] transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-900 uppercase tracking-widest pl-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Phone Number"
                        className="w-full bg-[#fafaf9] border border-gray-200 text-gray-900 px-6 py-4 rounded-2xl outline-none focus:border-[#293659] focus:ring-1 focus:ring-[#293659] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email Row */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest pl-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      className="w-full bg-[#fafaf9] border border-gray-200 text-gray-900 px-6 py-4 rounded-2xl outline-none focus:border-[#293659] focus:ring-1 focus:ring-[#293659] transition-all duration-300"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest pl-2">Area of Interest</label>
                    <select className="w-full bg-[#fafaf9] border border-gray-200 text-gray-900 px-6 py-4 rounded-2xl outline-none focus:border-[#293659] focus:ring-1 focus:ring-[#293659] transition-all duration-300 appearance-none cursor-pointer">
                      <option value="" disabled selected>Select an inquiry type...</option>
                      <option value="residential">Residential Properties</option>
                      <option value="commercial">Commercial Investments</option>
                      <option value="press">Press & Media</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message Area */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-widest pl-2">Message</label>
                    <textarea 
                      rows="4"
                      placeholder="How can we assist you?"
                      className="w-full bg-[#fafaf9] border border-gray-200 text-gray-900 px-6 py-4 rounded-2xl outline-none focus:border-[#293659] focus:ring-1 focus:ring-[#293659] transition-all duration-300 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="button" 
                    className="w-full bg-[#293659] text-white px-8 py-5 rounded-2xl font-bold tracking-widest uppercase text-sm hover:bg-brand-primary hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 flex items-center justify-center gap-3 mt-4"
                  >
                    Send Inquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

              </motion.div>

            </div>
          </div>
        </section>

        {/* Global Offices Marquee / Section */}
        <section className="py-24 px-6 border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                    Presence Acquired
                  </h3>
                  <div className="h-[2px] bg-gray-100 flex-grow rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        // { city: "Gurugram", desc: "A hub for architectural rendering and design.", time: "IST" },
                        { city: "Sohna", desc: "Experience refined floor living in Sohna.", time: "IST" },
                        { city: "Jhajjar", desc: "Pioneering high-value plotted corridors in Jhajjar.", time: "IST" },
                    ].map((office, i) => (
                        <div key={i} className="group border border-gray-100 p-8 rounded-3xl hover:border-[#293659] transition-colors duration-300">
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">{office.city}</h4>
                            <p className="text-gray-500 mb-6">{office.desc}</p>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#293659]">
                                <Clock className="w-4 h-4" /> Timezone: {office.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
          {/* ── MAP STRIP ── */}
      <div className="bg-[#212946]/[0.03] border-t border-[#212946]/8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
          >
            <div>
              <p
                className="text-[9px] uppercase tracking-[0.35em] text-[#212946]/40 mb-1"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Find Us
              </p>
              <h4
                className="text-2xl text-[#212946] font-light"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Visit Our Office
              </h4>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#212946] text-[10px] uppercase tracking-[0.3em] hover:opacity-60 transition-opacity"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Open in Maps
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </motion.div>

          {/* Map embed placeholder */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative rounded-2xl overflow-hidden border border-[#212946]/10"
            style={{ height: '280px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.865!3d19.065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQktD!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
              allowFullScreen=""
              loading="lazy"
              title="Wild Wolf Infra Office Location"
            />
            {/* overlay for branding */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-[#212946]/8">
              <p
                className="text-[8px] uppercase tracking-[0.3em] text-[#212946]/40 mb-0.5"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Headquarters
              </p>
              <p className="text-[#212946] text-sm font-medium">Wild Wolf Infra</p>
            </div>
          </motion.div>
        </div>
      </div>

        <Footer />
      </div>
    </SmoothScroll>
  );
}