'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { X, Search, ChevronDown, Menu, CheckCircle, Loader2 } from 'lucide-react';

// ── Desktop Dropdown ──
// ── Desktop Dropdown ──
function DesktopDropdown({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = item.subItems?.some(s => s.path === pathname);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={`group flex items-center gap-1 text-[13px] font-black uppercase tracking-[0.15em] transition-colors duration-200 py-1 relative whitespace-nowrap
          ${isActive ? 'text-[#293659]' : 'text-gray-700 hover:text-black'}`}
      >
        {item.label}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </motion.div>
        <span className={`absolute bottom-0 left-0 h-[2px] bg-[#293659] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            /* CHANGED: Removed left-1/2 and -translate-x-1/2. Added left-0 to perfectly align with the left side of the link */
            className="absolute top-full left-0 mt-4 bg-white border border-black/[0.08] rounded-2xl shadow-2xl shadow-black/10 overflow-hidden min-w-[220px] z-[200]"
          >
            {/* Little Top Indicator Triangle */}
            {/* CHANGED: Adjusted little pointer to sit nicely near the left side instead of dead center */}
            <div className="absolute -top-2 left-6 w-4 h-2 overflow-hidden">
              <div className="w-3 h-3 bg-white border-l border-t border-black/[0.08] rotate-45 mx-auto -mt-1.5" />
            </div>
            
            <div className="p-2 mt-1">
              {item.subItems.map((sub) => {
                const isSubActive = sub.path === pathname;
                return (
                  <Link
                    key={sub.label}
                    href={sub.path}
                    className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-150
                      ${isSubActive ? 'bg-[#293659]/[0.08] text-[#293659]' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}
                    onClick={() => setOpen(false)}
                  >
                    {sub.label}
                    {isSubActive && <div className="w-1.5 h-1.5 rounded-full bg-[#293659] flex-shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// ── Contact Popup ──
function ContactPopup({ isOpen, onClose, mounted }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', message: '' });
      }, 400);
    }, 2200);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9990]"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden">

              {/* Header */}
              <div className="bg-[#293659] px-8 pt-8 pb-6 relative">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-1">White Wolf Infra</p>
                <h2 className="text-[35px] font-black text-white">Let's Talk</h2>
                <p className="text-white/60 text-sm mt-1 font-medium">Fill in your details and we'll reach out shortly.</p>
              </div>

              {/* Body */}
              <div className="px-8 py-7">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-8 gap-4"
                    >
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
                        <CheckCircle className="w-16 h-16 text-[#293659]" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-xl font-black text-gray-900">Thank You!</h3>
                      <p className="text-gray-500 text-sm text-center">We've received your message and will connect with you soon.</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-gray-800 placeholder:text-gray-300 outline-none transition-all duration-200
                            ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-[#293659] focus:bg-white'}`}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">Email *</label>
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-gray-800 placeholder:text-gray-300 outline-none transition-all duration-200
                              ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-[#293659] focus:bg-white'}`}
                          />
                          {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">Phone *</label>
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-gray-800 placeholder:text-gray-300 outline-none transition-all duration-200
                              ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-[#293659] focus:bg-white'}`}
                          />
                          {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">
                          Message <span className="text-gray-300 normal-case tracking-normal font-medium">(optional)</span>
                        </label>
                        <textarea
                          placeholder="Tell us about your requirements..."
                          rows={3}
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-[#293659] focus:bg-white text-sm font-medium text-gray-800 placeholder:text-gray-300 outline-none transition-all duration-200 resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#293659] text-white py-3.5 rounded-xl text-[11px] font-black tracking-[0.2em] uppercase mt-1 transition-all duration-300 hover:bg-[#1e2a47] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                        ) : 'Send Message'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ── Main Navbar ──
export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Mobile states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      setMounted(false);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  const menuItems = [
    { label: 'Home', path: '/' },
    {
      label: 'About',
      subItems: [
        { label: 'Vision & Mission', path: '/about/vision-mission' },
        { label: 'Our Leadership', path: '/about/leadership' }
      ]
    },
    {
      label: 'Projects',
      subItems: [
        { label: 'Township', path: '/projects/osiyan-habitat' },
        { label: 'Low Rise', path: '/projects/ats-sohna-floor' }
      ]
    },
    {
      label: 'Resources',
      subItems: [
        { label: 'Our Gallery', path: '/resources/our-gallery' },
        // { label: 'Our Videos', path: '/resources/our-videos' },
        { label: 'Our Creatives', path: '/resources/our-creative' },
        // { label: 'Press Coverage', path: '/resources/press-coverage' }
      ]
    },
    // { label: 'Blogs', path: '/blogs' },
    { label: 'Career', path: '/career' },
    { label: 'Partner Registration', path: '/partner-registration' },
    { label: 'Contact', path: '/contact' },

  ];

  const searchSuggestions = [
    { label: 'Township', path: '/projects/osiyan-habitat' },
    { label: 'ATS Luxury Floors', path: '/projects/ats-sohna-floor' },
    { label: 'Bespoke Creatives', path: '/resources/our-creative' },
    // { label: 'Media Press Coverage', path: '/resources/press-coverage' }
  ];

  const renderSearchOverlay = () => {
    if (!mounted) return null;
    return createPortal(
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-[10000] flex flex-col justify-between p-6 md:p-16"
          >
            <div className="flex justify-between items-center w-full">
              <img src="/whitelogo.png" alt="Logo" className="h-12 md:h-16 w-auto object-contain" />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-w-4xl w-full mx-auto my-auto px-4">
              <p className="text-[11px] font-black text-[#293659] uppercase tracking-[0.3em] mb-4">Search White Wolf</p>
              <div className="relative border-b-2 border-black/10 focus-within:border-[#293659] transition-colors py-4">
                <input
                  type="text"
                  placeholder="type here to explore..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setIsSearchOpen(false); }}
                  className="w-full bg-transparent border-none outline-none text-3xl md:text-5xl font-black lowercase tracking-tighter text-black placeholder:text-black/10 py-2"
                  autoFocus
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-black/20" />
              </div>
              <div className="mt-8">
                <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] mb-4">Quick Links</p>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => { router.push(item.path); setIsSearchOpen(false); }}
                      className="px-5 py-2.5 rounded-full bg-black/5 hover:bg-brand-primary text-black hover:text-white text-xs font-black lowercase tracking-wide transition-all border border-black/5"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[9px] font-bold text-black/30 tracking-[0.3em] uppercase text-center">
              explore white wolf premium infrastructure
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <header
        className={`hidden lg:flex fixed top-0 left-0 w-full z-[90] items-center justify-between px-4 xl:px-8 transition-all duration-500
          ${scrolled
            ? 'py-3 bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.07)] border-b border-black/5'
            : 'py-4 bg-white/80 backdrop-blur-md border-b border-black/5'}`}
        suppressHydrationWarning
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative z-[95] flex items-center mr-4 xl:mr-8">
          <Image
            src="/logo/Blue Logo.png"
            alt="White Wolf Infra Logo"
            width={244}
            height={84}
            sizes="244px"
            priority
            className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-12' : 'h-14'}`}
          />
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-3.5 xl:gap-5">
          {menuItems.map((item) => {
            if (item.subItems) return <DesktopDropdown key={item.label} item={item} pathname={pathname} />;
            const isActive = item.path === pathname;
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`group relative text-[13px] font-black uppercase tracking-[0.15em] transition-colors duration-200 py-1 whitespace-nowrap
                  ${isActive ? 'text-[#293659]' : 'text-gray-700 hover:text-black'}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#293659] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0 relative z-[95]">
          {/* Search */}
          

          <div className="w-px h-5 bg-black/10" />

          {/* Let's Talk — opens popup */}
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="relative overflow-hidden group px-6 py-2.5 rounded-full bg-[#293659] text-white text-[13px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg hover:shadow-[#293659]/25 hover:-translate-y-px active:translate-y-0 cursor-pointer"
          >
            <span className="relative z-10">Let's Talk</span>
            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" />
          </button>
        </div>
      </header>

      {/* ── MOBILE NAVBAR (unchanged) ── */}
      <div className="lg:hidden fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100]" suppressHydrationWarning>
        <nav className="relative flex justify-between items-center px-4 py-2 bg-white/95 backdrop-blur-md border border-black/5 rounded-full shadow-2xl text-gray-900">
          <Link href="/" className="flex items-center gap-1 group cursor-pointer relative z-[110]">
            <Image src="/logo/Blue Logo.png" alt="White Wolf Infra Logo" width={244} height={84} sizes="244px" priority className="h-14 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-3 relative z-[110]">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-black/5 text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                data-lenis-prevent="true"
                className="absolute top-0 left-0 w-full bg-white rounded-[2.5rem] shadow-2xl border border-black/5 pt-24 pb-12 px-6 lg:hidden z-[100] max-h-[90vh] overflow-y-auto overscroll-contain no-scrollbar"
              >
                <div className="flex flex-col gap-2">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-bold text-gray-900 border-b border-gray-50 flex items-center justify-between">
                    Home <ChevronDown className="w-4 h-4 -rotate-90 text-gray-300" />
                  </Link>

                  {/* About */}
                  <div className="border-b border-gray-50">
                    <button type="button" onClick={() => setIsAboutOpen(!isAboutOpen)} className="w-full px-4 py-3 text-lg font-bold text-gray-900 flex items-center justify-between">
                      About
                      <motion.div animate={{ rotate: isAboutOpen ? 180 : 0 }}><ChevronDown className="w-4 h-4 text-[#293659]" /></motion.div>
                    </button>
                    <AnimatePresence>
                      {isAboutOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-50/50 rounded-2xl mb-2">
                          <div className="p-2 space-y-1">
                            <Link href="/about/vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl hover:bg-white transition-colors">
                              <p className="text-[8px] font-black text-[#293659] uppercase tracking-widest mb-0.5">Our Purpose</p>
                              <h4 className="text-sm font-bold text-gray-700">Vision &amp; Mission</h4>
                            </Link>
                            <Link href="/about/leadership" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl hover:bg-white transition-colors">
                              <p className="text-[8px] font-black text-[#293659] uppercase tracking-widest mb-0.5">Our People</p>
                              <h4 className="text-sm font-bold text-gray-700">Our Leadership</h4>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Projects */}
                  <div className="border-b border-gray-50">
                    <button type="button" onClick={() => setIsProjectsOpen(!isProjectsOpen)} className="w-full px-4 py-3 text-lg font-bold text-gray-900 flex items-center justify-between">
                      Projects
                      <motion.div animate={{ rotate: isProjectsOpen ? 180 : 0 }}><ChevronDown className="w-4 h-4 text-[#293659]" /></motion.div>
                    </button>
                    <AnimatePresence>
                      {isProjectsOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-50/50 rounded-2xl mb-2">
                          <div className="p-2 space-y-1">
                            <Link href="/projects/osiyan-habitat" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl hover:bg-white transition-colors">
                              <p className="text-[8px] font-black text-[#293659] uppercase tracking-widest mb-0.5">Premium Plots</p>
                              <h4 className="text-sm font-bold text-gray-700">Township</h4>
                            </Link>
                            <Link href="/projects/ats-sohna-floor" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl hover:bg-white transition-colors">
                              <p className="text-[8px] font-black text-[#293659] uppercase tracking-widest mb-0.5">Luxury Floors</p>
                              <h4 className="text-sm font-bold text-gray-700">Low Rise</h4>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Resources */}
                  <div className="border-b border-gray-50">
                    <button type="button" onClick={() => setIsResourcesOpen(!isResourcesOpen)} className="w-full px-4 py-3 text-lg font-bold text-gray-900 flex items-center justify-between">
                      Resources
                      <motion.div animate={{ rotate: isResourcesOpen ? 180 : 0 }}><ChevronDown className="w-4 h-4 text-[#293659]" /></motion.div>
                    </button>
                    <AnimatePresence>
                      {isResourcesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-50/50 rounded-2xl mb-2">
                          <div className="p-2 grid grid-cols-1 gap-1">
                            {[
                              { sub: 'Visuals', label: 'Our Gallery', path: '/resources/our-gallery' },
                              // { sub: 'Motion', label: 'Our Videos', path: '/resources/our-videos' },
                              { sub: 'Design', label: 'Our Creatives', path: '/resources/our-creative' },
                              // { sub: 'Media', label: 'Press Coverage', path: '/resources/press-coverage' },
                            ].map(r => (
                              <Link key={r.path} href={r.path} onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl hover:bg-white transition-colors">
                                <p className="text-[8px] font-black text-[#293659] uppercase tracking-widest mb-0.5">{r.sub}</p>
                                <h4 className="text-[13px] font-bold text-gray-700">{r.label}</h4>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[16px] font-bold text-gray-900 border-b border-gray-50 flex items-center justify-between">
                    Blogs <ChevronDown className="w-4 h-4 -rotate-90 text-gray-300" />
                  </Link> */}
                  <Link href="/career" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[16px] font-bold text-gray-900 border-b border-gray-50 flex items-center justify-between">
                    Career <ChevronDown className="w-4 h-4 -rotate-90 text-gray-300" />
                  </Link>
                  <Link href="/partner-registration" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[16px] font-bold text-gray-900 border-b border-gray-50 flex items-center justify-between">
                    Partner Registration <ChevronDown className="w-4 h-4 -rotate-90 text-gray-300" />
                  </Link>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[16px] font-bold text-gray-900 border-b border-gray-50 flex items-center justify-between">
                    Contact <ChevronDown className="w-4 h-4 -rotate-90 text-gray-300" />
                  </Link>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { router.push('/contact'); setIsMobileMenuOpen(false); }}
                    className="w-full bg-[#293659] text-white py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase mt-6 shadow-xl shadow-[#293659]/20"
                  >
                    Connect with us
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Portals */}
      {renderSearchOverlay()}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} mounted={mounted} />
    </>
  );
}