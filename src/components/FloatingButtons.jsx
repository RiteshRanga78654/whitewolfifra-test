"use client";

import React, { useState } from "react";

const PHONE_NUMBER = "917070708264";
const PHONE_CALL = "+91 70707 08264";
const SUPPORT_EMAIL = "Whitewolfinfra@gmail.com";

export default function FloatingButtons() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.message || "General Enquiry",
          email: "",
          requestHeading: "Website Contact Enquiry",
          keyRequest: "Floating Button Enquiry",
          source: "Floating Contact Buttons",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", phone: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Buttons - Always Visible */}
      <div className="fixed bottom-6 left-5 z-[9999] flex flex-col items-center gap-3">

        {/* Phone Button → Direct Call */}
        <a
          href={`tel:${PHONE_CALL}`}
          title="Call Now"
          className="w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#a54d21]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.9 1.37l.7 2.09a2 2 0 01-.45 2.11l-.93.93a16.06 16.06 0 006.96 6.96l.93-.93a2 2 0 012.11-.45l2.09.7A2 2 0 0121 17.72V20a2 2 0 01-2 2C9.94 22 2 14.06 2 5a2 2 0 011-1.73V5z" />
          </svg>
        </a>

        {/* WhatsApp Button → Direct WhatsApp */}
        <a
          href={`https://wa.me/${PHONE_NUMBER}?text=Hello%20White%20Wolf%20Infra%2C%20I%20am%20interested%20in%20your%20properties.`}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
          style={{ background: "#25D366", boxShadow: "0 8px 32px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 32 32" fill="white">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.67 4.61 1.832 6.51L4 29l7.697-1.817A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.95 9.95 0 01-5.03-1.356l-.36-.215-4.57 1.078 1.1-4.45-.235-.375A9.952 9.952 0 016 15c0-5.523 4.477-10 10-10zm-3.5 5c-.167 0-.434.063-.663.313-.228.25-.87.852-.87 2.077 0 1.225.892 2.41 1.016 2.578.124.167 1.748 2.773 4.296 3.782 2.124.839 2.549.672 3.008.63.459-.042 1.483-.607 1.692-1.193.209-.586.209-1.087.146-1.193-.063-.104-.23-.167-.48-.292-.25-.125-1.482-.73-1.712-.813-.23-.083-.396-.125-.563.125-.166.25-.645.812-.79.979-.146.167-.291.188-.541.063-.25-.125-1.055-.39-2.01-1.24-.743-.662-1.244-1.48-1.39-1.73-.146-.25-.016-.385.11-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.084-.167.042-.312-.02-.437-.063-.125-.563-1.354-.772-1.854-.197-.48-.403-.417-.563-.425L12.5 10z" />
          </svg>
        </a>
      </div>

      {/* Contact Form Modal — opens on Support icon click */}
      {showForm && (
        <div
          className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div className="bg-white w-full max-w-md mx-4 mb-4 sm:mb-0 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div
              className="p-6 text-white relative"
              style={{ background: "linear-gradient(135deg, #a54d21, #c8a96b)" }}
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight">Talk to Us</h3>
                  <p className="text-white/80 text-xs">We'll get back to you within 24 hrs</p>
                </div>
              </div>
              {/* Quick contact pills */}
              <div className="flex gap-2 mt-4">
                <a
                  href={`tel:${PHONE_CALL}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.9 1.37l.7 2.09a2 2 0 01-.45 2.11l-.93.93a16.06 16.06 0 006.96 6.96l.93-.93a2 2 0 012.11-.45l2.09.7A2 2 0 0121 17.72V20a2 2 0 01-2 2C9.94 22 2 14.06 2 5a2 2 0 011-1.73V5z" />
                  </svg>
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${PHONE_NUMBER}?text=Hello%20White%20Wolf%20Infra%2C%20I%20am%20interested%20in%20your%20properties.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe59] text-white text-xs font-bold transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="white">
                    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.67 4.61 1.832 6.51L4 29l7.697-1.817A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.95 9.95 0 01-5.03-1.356l-.36-.215-4.57 1.078 1.1-4.45-.235-.375A9.952 9.952 0 016 15c0-5.523 4.477-10 10-10zm-3.5 5c-.167 0-.434.063-.663.313-.228.25-.87.852-.87 2.077 0 1.225.892 2.41 1.016 2.578.124.167 1.748 2.773 4.296 3.782 2.124.839 2.549.672 3.008.63.459-.042 1.483-.607 1.692-1.193.209-.586.209-1.087.146-1.193-.063-.104-.23-.167-.48-.292-.25-.125-1.482-.73-1.712-.813-.23-.083-.396-.125-.563.125-.166.25-.645.812-.79.979-.146.167-.291.188-.541.063-.25-.125-1.055-.39-2.01-1.24-.743-.662-1.244-1.48-1.39-1.73-.146-.25-.016-.385.11-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.084-.167.042-.312-.02-.437-.063-.125-.563-1.354-.772-1.854-.197-.48-.403-.417-.563-.425L12.5 10z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#a54d21]/10 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#a54d21]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-gray-900 font-black text-lg">Thank You!</h4>
                  <p className="text-gray-500 text-sm">Our team will contact you shortly.</p>
                  <button
                    onClick={() => setShowForm(false)}
                    className="mt-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #a54d21, #c8a96b)" }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:border-[#a54d21] focus:ring-2 focus:ring-[#a54d21]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:border-[#a54d21] focus:ring-2 focus:ring-[#a54d21]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Message (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="I'm interested in..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:border-[#a54d21] focus:ring-2 focus:ring-[#a54d21]/10 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-white font-black text-sm tracking-wide transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #a54d21, #c8a96b)" }}
                  >
                    {loading ? "Sending..." : "Send Enquiry →"}
                  </button>
                  <p className="text-center text-[10px] text-gray-400">
                    Or email us at{" "}
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#a54d21] font-bold underline">
                      {SUPPORT_EMAIL}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
