'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { X, Search, ChevronDown, Menu, CheckCircle, Loader2, ChevronRight } from 'lucide-react';

// ── Video Sub Dropdown (nested flyout) ──
function VideoSubDropdown({ isOpen }) {
  const videoSubItems = [
    { label: 'Township', path: '/resources/our-videos/township' },
    // { label: 'Low Rise', path: '/resources/our-videos/low-rise' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 8, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 8, scale: 0.97 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-0 left-full ml-2 overflow-hidden min-w-[180px] z-[210]"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(41,54,89,0.18), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          {/* Pointer triangle on the left side */}
          <div className="absolute -left-2 top-4 w-2 h-4 overflow-hidden">
            <div className="w-3 h-3 rotate-45 ml-0.5 mt-0.5" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' }} />
          </div>
          <div className="p-2 mt-1">
            {videoSubItems.map((sub) => (
              <Link
                key={sub.label}
                href={sub.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-150"
                style={{ color: 'rgba(255,255,255,0.85)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.5)' }} />
                {sub.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Desktop Dropdown ──
function DesktopDropdown({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const [videoSubOpen, setVideoSubOpen] = useState(false);
  const ref = useRef(null);
  const isActive = item.subItems?.some(s => s.path === pathname);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setVideoSubOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { setOpen(false); setVideoSubOpen(false); }}
    >
      <button
        type="button"
        className="group flex items-center gap-1 text-[13px] font-black uppercase tracking-[0.15em] transition-colors duration-200 py-1 relative whitespace-nowrap"
        style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.75)' }}
      >
        {item.label}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </motion.div>
        <span
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.8)',
            width: isActive ? '100%' : open ? '100%' : '0%',
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 mt-4 overflow-visible min-w-[220px] z-[200]"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.30)',
              borderRadius: '20px',
              boxShadow: '0 16px 48px rgba(41,54,89,0.25), inset 0 1px 0 rgba(255,255,255,0.45)',
            }}
          >
            {/* Little Top Indicator Triangle */}
            <div className="absolute -top-2 left-6 w-4 h-2 overflow-hidden">
              <div className="w-3 h-3 rotate-45 mx-auto -mt-1.5" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }} />
            </div>

            <div className="p-2 mt-1">
              {item.subItems.map((sub) => {
                const isSubActive = sub.path === pathname;
                const isVideos = sub.label === 'Project Updates';

                if (isVideos) {
                  return (
                    <div
                      key={sub.label}
                      className="relative"
                      onMouseEnter={() => setVideoSubOpen(true)}
                      onMouseLeave={() => setVideoSubOpen(false)}
                    >
                      <Link
                        href={sub.path}
                        className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-150"
                        style={{
                          background: isSubActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                          color: isSubActive ? '#fff' : 'rgba(255,255,255,0.75)',
                        }}
                        onMouseEnter={e => { if (!isSubActive) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                        onMouseLeave={e => { if (!isSubActive) e.currentTarget.style.background = 'transparent'; }}
                      >
                        {sub.label}
                        <ChevronRight className="w-3 h-3 opacity-50 flex-shrink-0" />
                      </Link>
                      <VideoSubDropdown isOpen={videoSubOpen} />
                    </div>
                  );
                }

                return (
                  <Link
                    key={sub.label}
                    href={sub.path}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-150"
                    style={{
                      background: isSubActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                      color: isSubActive ? '#fff' : 'rgba(255,255,255,0.75)',
                    }}
                    onMouseEnter={e => { if (!isSubActive) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                    onMouseLeave={e => { if (!isSubActive) e.currentTarget.style.background = 'transparent'; }}
                    onClick={() => setOpen(false)}
                  >
                    {sub.label}
                    {isSubActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.9)' }} />}
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
            className="fixed inset-0 z-[9990]"
            style={{ background: 'rgba(10,15,30,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg pointer-events-auto overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '28px',
                boxShadow: '0 32px 80px rgba(41,54,89,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              {/* Header */}
              <div className="px-8 pt-8 pb-6 relative" style={{ background: 'rgba(41,54,89,0.7)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>White Wolf Infra</p>
                <h2 className="text-[35px] font-black text-white">Let's Talk</h2>
                <p className="text-sm mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>Fill in your details and we'll reach out shortly.</p>
              </div>

              {/* Body */}
              <div className="px-8 py-7" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-8 gap-4"
                    >
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
                        <CheckCircle className="w-16 h-16 text-white" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-xl font-black text-white">Thank You!</h3>
                      <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>We've received your message and will connect with you soon.</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Full Name *</label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                          style={{
                            background: errors.name ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.1)',
                            border: errors.name ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.2)',
                            color: 'rgba(255,255,255,0.9)',
                          }}
                          placeholder="Full Name"
                        />
                        {errors.name && <p className="text-red-400 text-[10px] mt-1 font-bold">{errors.name}</p>}
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Email *</label>
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                            style={{
                              background: errors.email ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.1)',
                              border: errors.email ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.2)',
                              color: 'rgba(255,255,255,0.9)',
                            }}
                          />
                          {errors.email && <p className="text-red-400 text-[10px] mt-1 font-bold">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Phone *</label>
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                            style={{
                              background: errors.phone ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.1)',
                              border: errors.phone ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.2)',
                              color: 'rgba(255,255,255,0.9)',
                            }}
                          />
                          {errors.phone && <p className="text-red-400 text-[10px] mt-1 font-bold">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          Message <span className="normal-case tracking-normal font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>(optional)</span>
                        </label>
                        <textarea
                          placeholder="Tell us about your requirements..."
                          rows={3}
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 resize-none"
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'rgba(255,255,255,0.9)',
                          }}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl text-[11px] font-black tracking-[0.2em] uppercase mt-1 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                        style={{
                          background: 'rgba(255,255,255,0.95)',
                          color: '#293659',
                          boxShadow: '0 4px 20px rgba(255,255,255,0.2)',
                        }}
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
  const [isMobileVideosOpen, setIsMobileVideosOpen] = useState(false);

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
        { label: 'Project Updates', path: '' },
        { label: 'Our Creatives', path: '/resources/our-creative' },
        // { label: 'Press Coverage', path: '/resources/press-coverage' }
      ]
    },
    { label: 'Blogs', path: '/blogs' },
    // { label: 'Career', path: '/career' },
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
            className="fixed inset-0 z-[10000] flex flex-col justify-between p-6 md:p-16"
            style={{ background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}
          >
            <div className="flex justify-between items-center w-full">
              <img src="/whitelogo.png" alt="Logo" className="h-12 md:h-16 w-auto object-contain" />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-full text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-w-4xl w-full mx-auto my-auto px-4">
              <p className="text-[11px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">Search White Wolf</p>
              <div className="relative py-4" style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
                <input
                  type="text"
                  placeholder="type here to explore..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setIsSearchOpen(false); }}
                  className="w-full bg-transparent border-none outline-none text-3xl md:text-5xl font-black lowercase tracking-tighter py-2"
                  style={{ color: 'white' }}
                  autoFocus
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8" style={{ color: 'rgba(255,255,255,0.2)' }} />
              </div>
              <div className="mt-8">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Quick Links</p>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => { router.push(item.path); setIsSearchOpen(false); }}
                      className="px-5 py-2.5 rounded-full text-xs font-black lowercase tracking-wide transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.7)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
              explore white wolf premium infrastructure
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  };

  // Glassmorphic navbar styles
  const navStyle = scrolled
    ? {
      
      }
    : {
       
      };

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <header
        className={`hidden lg:flex fixed top-0 left-0 w-full z-[90] items-center justify-between px-4 xl:px-8 transition-all duration-500 ${scrolled ? 'py-3' : 'py-4'}`}
        style={navStyle}
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
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>

        {/* Nav Links — pill container */}
        <nav
          className="flex items-center gap-3.5 xl:gap-5 px-6 py-2.5 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {menuItems.map((item) => {
            if (item.subItems) return <DesktopDropdown key={item.label} item={item} pathname={pathname} />;
            const isActive = item.path === pathname;
            return (
              <Link
                key={item.label}
                href={item.path}
                className="group relative text-[13px] font-black uppercase tracking-[0.15em] transition-colors duration-200 py-1 whitespace-nowrap"
                //style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.72)' }}
                style={{ color: 'blue' }}
              >
                {item.label}
                <span
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    width: isActive ? '100%' : '0%',
                  }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0 relative z-[95]">
          {/* Divider */}
          <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.2)' }} />

          {/* Let's Talk */}
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="relative overflow-hidden group px-6 py-2.5 rounded-full text-[13px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-px active:translate-y-0 cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.95)',
              color: '#293659',
              boxShadow: '0 4px 20px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,1)',
            }}
          >
            <span className="relative z-10">Let's Talk</span>
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12" style={{ background: 'rgba(41,54,89,0.08)' }} />
          </button>
        </div>
      </header>

      {/* ── MOBILE NAVBAR ── */}
      <div className="lg:hidden fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100]" suppressHydrationWarning>
        <nav
          className="relative flex justify-between items-center px-4 py-2 rounded-full"
          style={{
            background: 'rgba(41,54,89,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 8px 32px rgba(41,54,89,0.3)',
          }}
        >
          <Link href="/" className="flex items-center gap-1 group cursor-pointer relative z-[110]">
            <Image
              src="/logo/Blue Logo.png"
              alt="White Wolf Infra Logo"
              width={244}
              height={84}
              sizes="244px"
              priority
              className="h-14 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          <div className="flex items-center gap-3 relative z-[110]">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.9)',
              }}
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
                className="absolute top-0 left-0 w-full pt-24 pb-12 px-6 lg:hidden z-[100] max-h-[90vh] overflow-y-auto overscroll-contain no-scrollbar"
                style={{
                  background: 'rgba(41,54,89,0.85)',
                  backdropFilter: 'blur(32px)',
                  WebkitBackdropFilter: 'blur(32px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '2.5rem',
                  boxShadow: '0 32px 80px rgba(41,54,89,0.4)',
                }}
              >
                <div className="flex flex-col gap-2">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-bold flex items-center justify-between" style={{ color: 'rgba(255,255,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    Home <ChevronDown className="w-4 h-4 -rotate-90 opacity-30" />
                  </Link>

                  {/* About */}
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <button type="button" onClick={() => setIsAboutOpen(!isAboutOpen)} className="w-full px-4 py-3 text-lg font-bold flex items-center justify-between" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      About
                      <motion.div animate={{ rotate: isAboutOpen ? 180 : 0 }}><ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} /></motion.div>
                    </button>
                    <AnimatePresence>
                      {isAboutOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden rounded-2xl mb-2">
                          <div className="p-2 space-y-1" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px' }}>
                            <Link href="/about/vision-mission" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl transition-colors" onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                              <p className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Our Purpose</p>
                              <h4 className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>Vision & Mission</h4>
                            </Link>
                            <Link href="/about/leadership" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl transition-colors" onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                              <p className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Our People</p>
                              <h4 className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>Our Leadership</h4>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Projects */}
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <button type="button" onClick={() => setIsProjectsOpen(!isProjectsOpen)} className="w-full px-4 py-3 text-lg font-bold flex items-center justify-between" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      Projects
                      <motion.div animate={{ rotate: isProjectsOpen ? 180 : 0 }}><ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} /></motion.div>
                    </button>
                    <AnimatePresence>
                      {isProjectsOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden rounded-2xl mb-2">
                          <div className="p-2 space-y-1" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px' }}>
                            <Link href="/projects/osiyan-habitat" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl transition-colors" onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                              <p className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Premium Plots</p>
                              <h4 className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>Township</h4>
                            </Link>
                            <Link href="/projects/ats-sohna-floor" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl transition-colors" onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                              <p className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Luxury Floors</p>
                              <h4 className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>Low Rise</h4>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Resources */}
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <button type="button" onClick={() => setIsResourcesOpen(!isResourcesOpen)} className="w-full px-4 py-3 text-lg font-bold flex items-center justify-between" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      Resources
                      <motion.div animate={{ rotate: isResourcesOpen ? 180 : 0 }}><ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} /></motion.div>
                    </button>
                    <AnimatePresence>
                      {isResourcesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden rounded-2xl mb-2">
                          <div className="p-2 grid grid-cols-1 gap-1" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px' }}>
                            <Link href="/resources/our-gallery" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl transition-colors" onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                              <p className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Visuals</p>
                              <h4 className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>Our Gallery</h4>
                            </Link>

                            {/* Project Updates — with nested expand */}
                            <div className="rounded-xl overflow-hidden">
                              <button
                                type="button"
                                onClick={() => setIsMobileVideosOpen(!isMobileVideosOpen)}
                                className="w-full p-3 transition-colors flex items-center justify-between"
                                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
                                onMouseLeave={e => e.currentTarget.style.background='transparent'}
                              >
                                <div className="text-left">
                                  <p className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Motion</p>
                                  <h4 className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>Project Updates</h4>
                                </div>
                                <motion.div animate={{ rotate: isMobileVideosOpen ? 180 : 0 }}>
                                  <ChevronDown className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.5)' }} />
                                </motion.div>
                              </button>
                              <AnimatePresence>
                                {isMobileVideosOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pl-4 pb-2 space-y-1 rounded-b-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                                      <Link
                                        href="/resources/our-videos/township"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2 p-2.5 rounded-lg transition-colors"
                                        onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
                                        onMouseLeave={e => e.currentTarget.style.background='transparent'}
                                      >
                                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.4)' }} />
                                        <h4 className="text-[12px] font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>Township</h4>
                                      </Link>
                                      <Link
                                        href="/resources/our-videos/low-rise"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2 p-2.5 rounded-lg transition-colors"
                                        onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
                                        onMouseLeave={e => e.currentTarget.style.background='transparent'}
                                      >
                                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.4)' }} />
                                        <h4 className="text-[12px] font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>Low Rise</h4>
                                      </Link>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <Link href="/resources/our-creative" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl transition-colors" onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                              <p className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Design</p>
                              <h4 className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>Our Creatives</h4>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link href="/career" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[16px] font-bold flex items-center justify-between" style={{ color: 'rgba(255,255,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    Career <ChevronDown className="w-4 h-4 -rotate-90 opacity-30" />
                  </Link>
                  <Link href="/partner-registration" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[16px] font-bold flex items-center justify-between" style={{ color: 'rgba(255,255,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    Partner Registration <ChevronDown className="w-4 h-4 -rotate-90 opacity-30" />
                  </Link>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-[16px] font-bold flex items-center justify-between" style={{ color: 'rgba(255,255,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    Contact <ChevronDown className="w-4 h-4 -rotate-90 opacity-30" />
                  </Link>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { router.push('/contact'); setIsMobileMenuOpen(false); }}
                    className="w-full py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase mt-6"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      color: '#293659',
                      boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
                    }}
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