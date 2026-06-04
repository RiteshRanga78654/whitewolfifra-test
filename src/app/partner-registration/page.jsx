'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';

import { 
  Handshake, 
  ArrowRight, 
  CheckCircle, 
  Loader2, 
  Building2, 
  ShieldCheck, 
  Percent, 
  Users 
} from 'lucide-react';

// Animation Variants
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.1 
    } 
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function PartnerRegistration() {
  const [form, setForm] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    aadhar: '',
    pan: '',
    designation: '',
    experience: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = 'Company Legal Name is required';
    if (!form.firstName.trim()) e.firstName = 'First Name is required';
    if (!form.lastName.trim()) e.lastName = 'Last Name is required';
    
    if (!form.email.trim()) {
      e.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = 'Please enter a valid email address';
    }
    
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) {
      e.phone = 'Please enter a valid phone number';
    }
    
    if (!form.address1.trim()) e.address1 = 'Address Line 1 is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    
    if (!form.aadhar.trim()) {
      e.aadhar = 'Aadhar Number is required';
    } else if (!/^\d{12}$/.test(form.aadhar.trim().replace(/\s/g, ''))) {
      e.aadhar = 'Aadhar number must be exactly 12 digits';
    }
    
    if (!form.pan.trim()) {
      e.pan = 'PAN Number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan.trim().toUpperCase())) {
      e.pan = 'Please enter a valid PAN (e.g. ABCDE1234F)';
    }
    
    if (!form.designation.trim()) e.designation = 'Designation is required';
    
    if (!agreed) {
      e.agreed = 'You must accept the Terms & Conditions to register';
    }
    
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { 
      setErrors(errs); 
      return; 
    }
    
    setErrors({});
    setLoading(true);
    
    try {
      const response = await fetch('/api/v1/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          message: form.experience || 'No additional notes provided.',
          requestHeading: 'Partner Registration',
          keyRequest: `Company: ${form.companyName} | Designation: ${form.designation} | Address: ${form.address1}${form.address2 ? ', ' + form.address2 : ''}, ${form.city}, ${form.state} | Aadhar: ${form.aadhar} | PAN: ${form.pan}`,
          source: 'Partner Registration Form',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      setLoading(false);
      setSubmitted(true);

      setForm({
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        aadhar: '',
        pan: '',
        designation: '',
        experience: ''
      });
      setAgreed(false);

    } catch (error) {
      setLoading(false);
      setErrors({ submit: 'Something went wrong. Please try again or contact us directly.' });
    }
  };

  return (
    <SmoothScroll>
      <div className="bg-[#fafaf9] min-h-screen font-sans selection:bg-[#212946] selection:text-white">
        <Navbar />
        
        {/* ── HERO ── */}
        <section className="pt-48 pb-16 px-6 relative overflow-hidden">
          {/* Decorative backdrop shapes matching Vision Page */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#212946]/[0.02] rounded-full blur-3xl -z-10" />
          
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
                <Handshake className="w-5 h-5 text-[#212946]" />
                <span>Empowering Alliance</span>
              </motion.div>

              <motion.h1
                variants={fadeUpItem}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase mb-8 leading-[0.9]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Partner{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#212946] to-[#3a4f8a]">
                  Registration.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUpItem}
                className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed"
              >
                Join the network of premium real estate alliances, channel partners, and professional consultants co-creating high-value land projects and luxury infrastructure portfolios.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── MAIN CONTENT SPLIT LAYOUT ── */}
        <section className="pb-10 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              
              {/* Left Column: Premium Value Cards */}
              <motion.div 
                className="lg:col-span-5 flex flex-col justify-between lg:h-full gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpContainer}
              >
                {/* Card 1 */}
                <motion.div 
                  variants={fadeUpItem} 
                  className="flex-1 bg-white p-6 rounded-[2rem] border border-[#212946]/8 hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#212946] transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />
                  <div>
                    <div className="w-11 h-11 bg-[#212946]/6 rounded-xl flex items-center justify-center mb-5 text-[#212946] group-hover:bg-[#212946] group-hover:text-white transition-all duration-300">
                      <Building2 className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 
                      className="text-xl font-black text-[#212946] tracking-tight mb-2"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Prime Inventory Access
                    </h3>
                  </div>
                  <p className="text-[#212946]/50 text-sm leading-relaxed font-light mt-4">
                    Offer your premium buyers exclusive access to high-demand plotted projects like Osiyan Habitat and luxury ATS floor portfolios in high-appreciation zones.
                  </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  variants={fadeUpItem} 
                  className="flex-1 bg-white p-6 rounded-[2rem] border border-[#212946]/8 hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#212946] transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />
                  <div>
                    <div className="w-11 h-11 bg-[#212946]/6 rounded-xl flex items-center justify-center mb-5 text-[#212946] group-hover:bg-[#212946] group-hover:text-white transition-all duration-300">
                      <Percent className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 
                      className="text-xl font-black text-[#212946] tracking-tight mb-2"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Unmatched Payout Structure
                    </h3>
                  </div>
                  <p className="text-[#212946]/50 text-sm leading-relaxed font-light mt-4">
                    Gain the benefits of swift commission settlement, highly competitive margin tiers, and dynamic quarterly growth milestones designed to fuel your agency.
                  </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                  variants={fadeUpItem} 
                  className="flex-1 bg-white p-6 rounded-[2rem] border border-[#212946]/8 hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#212946] transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />
                  <div>
                    <div className="w-11 h-11 bg-[#212946]/6 rounded-xl flex items-center justify-center mb-5 text-[#212946] group-hover:bg-[#212946] group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 
                      className="text-xl font-black text-[#212946] tracking-tight mb-2"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      RERA & Compliance Ease
                    </h3>
                  </div>
                  <p className="text-[#212946]/50 text-sm leading-relaxed font-light mt-4">
                    Partner with trust. We ensure absolute transparency with clear land titles, legal verification, and strict RERA compliance on every layout and development.
                  </p>
                </motion.div>

                {/* Card 4 */}
                <motion.div 
                  variants={fadeUpItem} 
                  className="flex-1 bg-white p-6 rounded-[2rem] border border-[#212946]/8 hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#212946] transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />
                  <div>
                    <div className="w-11 h-11 bg-[#212946]/6 rounded-xl flex items-center justify-center mb-5 text-[#212946] group-hover:bg-[#212946] group-hover:text-white transition-all duration-300">
                      <Users className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 
                      className="text-xl font-black text-[#212946] tracking-tight mb-2"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Marketing &amp; Sales Toolkit
                    </h3>
                  </div>
                  <p className="text-[#212946]/50 text-sm leading-relaxed font-light mt-4">
                    Empower your team with immersive 3D maps, premium high-definition brochures, interactive slider assets, and dedicated relationship manager guidance.
                  </p>
                </motion.div>
              </motion.div>

              {/* Right Column: Premium Interactive Compact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#212946]/8 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-500 relative overflow-hidden min-h-[550px]"
              >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div 
                      key="form-container"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <h3 
                          className="text-2xl font-black text-[#212946] uppercase tracking-tight mb-2"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          Register Your Interest
                        </h3>
                        <p className="text-[#212946]/50 font-medium text-xs">
                          Fill your details and share with us. We will connect with you soon.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* ── COMPANY INFORMATION ── */}
                        <div className="space-y-3">
                          <h4 
                            className="text-xs font-bold text-[#212946] uppercase tracking-wider border-b border-[#212946]/10 pb-1.5 pl-1"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            Company Information
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                Company Legal Name *
                              </label>
                              <input 
                                type="text" 
                                placeholder="Registered firm name"
                                value={form.companyName}
                                onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.companyName ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.companyName && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.companyName}</p>}
                            </div>

                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                Designation *
                              </label>
                              <input 
                                type="text" 
                                placeholder="e.g. Director, Partner"
                                value={form.designation}
                                onChange={e => setForm(f => ({ ...f, designation: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.designation ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.designation && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.designation}</p>}
                            </div>
                          </div>
                        </div>

                        {/* ── CONTACT PERSON DETAILS ── */}
                        <div className="space-y-3 pt-1">
                          <h4 
                            className="text-xs font-bold text-[#212946] uppercase tracking-wider border-b border-[#212946]/10 pb-1.5 pl-1"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            Contact Person Details
                          </h4>

                          {/* First Name & Last Name */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                First Name *
                              </label>
                              <input 
                                type="text" 
                                placeholder="First name"
                                value={form.firstName}
                                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.firstName ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.firstName && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.firstName}</p>}
                            </div>

                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                Last Name *
                              </label>
                              <input 
                                type="text" 
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.lastName ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.lastName && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.lastName}</p>}
                            </div>
                          </div>

                          {/* Email & Phone */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                Email Address *
                              </label>
                              <input 
                                type="email" 
                                placeholder="work@company.com"
                                value={form.email}
                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.email && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.email}</p>}
                            </div>

                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                Phone Number *
                              </label>
                              <input 
                                type="tel" 
                                placeholder="Mobile number"
                                value={form.phone}
                                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.phone && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.phone}</p>}
                            </div>
                          </div>

                          {/* Address Line 1 & Line 2 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                Address Line 1 *
                              </label>
                              <input 
                                type="text" 
                                placeholder="House/Plot/Street"
                                value={form.address1}
                                onChange={e => setForm(f => ({ ...f, address1: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.address1 ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.address1 && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.address1}</p>}
                            </div>

                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                Address Line 2 (Optional)
                              </label>
                              <input 
                                type="text" 
                                placeholder="Locality, Landmark"
                                value={form.address2}
                                onChange={e => setForm(f => ({ ...f, address2: e.target.value }))}
                                className="w-full bg-[#fafaf9] border border-gray-200 text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium"
                              />
                            </div>
                          </div>

                          {/* City & State */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                City *
                              </label>
                              <input 
                                type="text" 
                                placeholder="City"
                                value={form.city}
                                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.city ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.city && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.city}</p>}
                            </div>

                            <div className="space-y-1">
                              <label 
                                className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                State *
                              </label>
                              <input 
                                type="text" 
                                placeholder="State"
                                value={form.state}
                                onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.state ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.state && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.state}</p>}
                            </div>
                          </div>

                          {/* Aadhar & PAN */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="flex justify-between items-center pr-1">
                                <label 
                                  className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                  style={{ fontFamily: "'DM Mono', monospace" }}
                                >
                                  Aadhar Number *
                                </label>
                                <span className="text-[8px] text-[#212946]/40 font-bold uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>12 digits</span>
                              </div>
                              <input 
                                type="text" 
                                placeholder="1234 5678 9012"
                                value={form.aadhar}
                                onChange={e => setForm(f => ({ ...f, aadhar: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.aadhar ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.aadhar && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.aadhar}</p>}
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between items-center pr-1">
                                <label 
                                  className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                                  style={{ fontFamily: "'DM Mono', monospace" }}
                                >
                                  PAN Number *
                                </label>
                                <span className="text-[8px] text-[#212946]/40 font-bold uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>10 chars</span>
                              </div>
                              <input 
                                type="text" 
                                placeholder="ABCDE1234F"
                                value={form.pan}
                                onChange={e => setForm(f => ({ ...f, pan: e.target.value }))}
                                className={`w-full bg-[#fafaf9] border ${errors.pan ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 text-xs font-medium`}
                              />
                              {errors.pan && <p className="text-red-500 text-[9px] pl-1 font-bold">{errors.pan}</p>}
                            </div>
                          </div>
                        </div>

                        {/* ── EXPERIENCE & PORTFOLIO ── */}
                        <div className="space-y-3 pt-1">
                          <h4 
                            className="text-xs font-bold text-[#212946] uppercase tracking-wider border-b border-[#212946]/10 pb-1.5 pl-1"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            Experience &amp; Portfolio
                          </h4>

                          <div className="space-y-1">
                            <label 
                              className="text-[10px] font-bold text-[#212946]/80 uppercase tracking-widest pl-1"
                              style={{ fontFamily: "'DM Mono', monospace" }}
                            >
                              Core Competencies &amp; Projects
                            </label>
                            <textarea 
                              rows="2"
                              placeholder="Briefly describe your notable projects and competencies..."
                              value={form.experience}
                              onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                              className="w-full bg-[#fafaf9] border border-gray-200 text-gray-900 px-4 py-2.5 rounded-xl outline-none focus:border-[#212946] focus:ring-1 focus:ring-[#212946] transition-all duration-300 resize-none text-xs font-medium"
                            ></textarea>
                          </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="space-y-2 pt-1">
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={agreed}
                              onChange={e => setAgreed(e.target.checked)}
                              className="mt-1 w-3.5 h-3.5 rounded text-[#212946] border-gray-300 focus:ring-[#212946] cursor-pointer flex-shrink-0"
                            />
                            <span className="text-[11px] text-gray-500 font-medium leading-relaxed">
                              I accept and agree to the <a href="#terms-and-conditions" className="text-[#212946] font-bold hover:underline">Terms & Conditions</a> of registration with White Wolf Infra. *
                            </span>
                          </label>
                          {errors.agreed && <p className="text-red-500 text-[9px] pl-6 font-bold">{errors.agreed}</p>}
                        </div>

                        {/* API Error */}
                        {errors.submit && (
                          <p className="text-red-500 text-[10px] text-center font-bold py-1">
                            {errors.submit}
                          </p>
                        )}

                        {/* Submit Button */}
                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full bg-[#212946] text-white px-6 py-3.5 rounded-xl font-bold tracking-widest uppercase text-[10px] hover:bg-[#323d61] hover:shadow-lg hover:shadow-[#212946]/30 transition-all duration-300 flex items-center justify-center gap-2 mt-2 active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Processing Application...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Registration</span> 
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success-container"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                    >
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                        className="mb-4 text-[#212946]"
                      >
                        <CheckCircle className="w-16 h-16" strokeWidth={1.5} />
                      </motion.div>
                      
                      <h3 
                        className="text-2xl font-black text-[#212946] uppercase tracking-tight mb-2"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        Application Initiated
                      </h3>
                      
                      <p className="text-[#212946]/50 font-medium max-w-sm mx-auto mb-6 leading-relaxed text-xs">
                        Thank you for registering. Our Alliance &amp; Partnership Desk has received your profile and company details. A dedicated representative will review your application and contact you within 24 hours.
                      </p>

                      <button 
                        type="button" 
                        onClick={() => setSubmitted(false)}
                        className="bg-[#212946]/5 hover:bg-[#212946]/10 text-[#212946] px-5 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all duration-200"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Register Another Entity
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── TERMS & CONDITIONS SECTION ── */}
        <section id="terms-and-conditions" className="pb-20 px-6 relative z-10 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white p-8 md:p-14 rounded-[2.5rem] border border-[#212946]/8 hover:border-[#212946]/20 hover:shadow-[0_8px_40px_-12px_rgba(33,41,70,0.12)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-[1px] bg-[#212946]/30" />
                <span
                  className="text-[#212946]/40 text-[10px] uppercase tracking-[0.35em]"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Legal Guidelines
                </span>
              </div>

              <h3 
                className="text-3xl md:text-4xl font-black text-[#212946] uppercase tracking-tight mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Terms &amp; Conditions
              </h3>

              <div className="space-y-6 text-[#212946]/70 text-sm md:text-base font-light leading-relaxed">
                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#212946] mt-2 flex-shrink-0" />
                  <p>
                    Channel Partner should be registered as <strong className="font-bold text-[#212946]">'Agent'</strong> under provisions of the Real Estate (Regulation and Development) Act, 2016 and the Rules framed thereunder with the Real Estate Regulatory Authority (RERA).
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#212946] mt-2 flex-shrink-0" />
                  <p>
                    Channel Partner Form must be submitted for registration with <strong className="font-bold text-[#212946]">White Wolf Infra</strong> before any marketing and promotional activity undertaken by a Channel Partner.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#212946] mt-2 flex-shrink-0" />
                  <p>
                    Appointment of Channel Partner shall be sole discretion of <strong className="font-bold text-[#212946]">White Wolf Infra</strong> (which may change from project to project). Channel Partner registered with White Wolf Infra will not have authority to market projects unless approved on RERA website. Registration with White Wolf Infra does not classify someone as an authorized Channel Partner.
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-100 mt-8">
                  <h4 
                    className="text-xl font-bold text-[#212946] mb-4 uppercase tracking-wider"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Channel Partner Sales will be considered subject to the following terms:
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 mt-6">
                    <div className="bg-[#fafaf9] p-6 rounded-2xl border border-gray-100 flex gap-4">
                      <span className="text-[#212946] font-bold">01.</span>
                      <p className="text-[#212946]/70 text-sm leading-relaxed">
                        Every registered Channel Partner is required to offer professional conduct towards each client.
                      </p>
                    </div>

                    <div className="bg-[#fafaf9] p-6 rounded-2xl border border-gray-100 flex gap-4">
                      <span className="text-[#212946] font-bold">02.</span>
                      <p className="text-[#212946]/70 text-sm leading-relaxed">
                        Every client visit to the project site or sales office should be accompanied by a registered Channel Partner.
                      </p>
                    </div>

                    <div className="bg-[#fafaf9] p-6 rounded-2xl border border-gray-100 flex gap-4">
                      <span className="text-[#212946] font-bold">03.</span>
                      <p className="text-[#212946]/70 text-sm leading-relaxed">
                        Client registered towards a Channel Partner will remain mapped with the said Channel Partner for a period of 90 days.
                      </p>
                    </div>

                    <div className="bg-[#fafaf9] p-6 rounded-2xl border border-gray-100 flex gap-4">
                      <span className="text-[#212946] font-bold">04.</span>
                      <p className="text-[#212946]/70 text-sm leading-relaxed">
                        Brokerage will be equally divided between the two Channel Partners for an overlapping client, if sale is closed within 90 days of registration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
