"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define your social media profiles here
  const socialLinks = [
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/118124033/admin/page-posts/published/",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/whitewolfinfra/",
      label: "Instagram",
    },
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/profile.php?id=61590076121908",
      label: "Facebook",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@WhiteWolfInfra",
      label: "YouTube",
    },
    { icon: FaTwitter, href: "https://x.com/WhiteWolfInfra", label: "Twitter" },
  ];

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about/vision-mission' },
      { name: 'Our Projects', href: '/projects/osiyan-habitat' },
      { name: 'Sustainability', href: '#' },
      { name: 'Careers', href: '/career' },
      { name: 'Partner Registration', href: '/partner-registration' },
      { name: 'Contact', href: '/contact' }
    ],
    services: [
      { name: "Osiyan Habitat", href: "/projects/osiyan-habitat" },
      { name: "ATS Sohna Floor", href: "/projects/ats-sohna-floor" },
    ],
    legal: [
      {
        name: "Sohna",
        href: "",
        address: "",
      },
      {
        name: "Jhajjar",
        href: "",
        address: "",
      },
      {
        name: "Tijara",
        href: "",
        address: "",
      },
    ],
  };

  return (
    <footer className="relative bg-black pt-20 pb-12 overflow-hidden selection:bg-white selection:text-black">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-3 space-y-6 ">
            <img
              src="/logo/White Logo.png"
              alt="White Wolf Infra Logo"
              className="h-18   -mt-[20] w-auto object-contain brightness-0 invert"
            />

            <p className="text-white/40 text-[14px] leading-relaxed max-w-sm font-bold  tracking-wider  mx-auto">
              Transforming landscapes and building legacies through innovative
              infrastructure and premium real estate developments.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -4, background: "#fff", color: "#000" }}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 bg-white/5"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h4 className="text-white font-black text-[15px] uppercase tracking-[0.3em]">
                Company
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white text-[15px] font-bold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-white font-black text-[15px] uppercase tracking-[0.3em]">
                Projects
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white text-[15px] font-bold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8 hidden md:block">
              <h4 className="text-white font-black text-[15px] uppercase tracking-[0.3em]">
                Locations
              </h4>
              <ul className="space-y-3">
                {" "}
                {/* Increased spacing slightly for cleaner looks */}
                {footerLinks.legal.map((link) => (
                  <li key={link.name} className="flex flex-col space-y-1">
                    {/* Location Name */}
                    <p
                      
                      className="text-white/40 hover:text-white text-[16px] tracking-[0.1em] font-bold transition-colors"
                    >
                      {link.name}
                    </p>

                    {/* Full Address Subline */}
                    <span className="text-white text-[13px] font-normal tracking-wide">
                      {link.address}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-white font-black text-[15px] uppercase tracking-[0.3em]">
              Get In Touch
            </h4>

            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="text-[15px] font-bold leading-relaxed text-white transition-colors">
                  Plot number E-02, ATS Homekraft Bonheur Avenue, Sohna road,
                  Sector 35, Sohna, Haryana-122103
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="text-[15px] font-bold text-white transition-colors self-center">
                  Whitewolfinfra@gmail.com
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="text-[15px] font-bold text-white transition-colors self-center">
                  +91 70707 08264
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[13px] font-black text-white/20 uppercase tracking-[0.4em]">
            © {currentYear} White Wolf Infra. All rights reserved.
          </div>

          <div className="flex items-center gap-8"></div>

          <a
            href="https://www.ireedindia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-[13px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2">
              POWERED BY{" "}
              <span className="text-white/40 hover:text-white">
                IREED Media
              </span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
