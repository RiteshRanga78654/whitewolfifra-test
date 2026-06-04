'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PromoPopup({ ready = false }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!ready) return; // preloader khatam hone ka wait karo
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [ready]);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0,
              zIndex: 9998,
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Popup Card */}
          <motion.div
            key="popup-card"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '700px',
                pointerEvents: 'auto',
                border: '6px solid white',
                borderRadius: '6px',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
              }}
            >
              {/* Close Button — inside card, top-right corner, above image */}
              <button
                onClick={handleClose}
                aria-label="Close popup"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.55)',
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  color: 'white',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 30,
                  transition: 'background 0.2s, border-color 0.2s',
                  lineHeight: 1,
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#c0392b';
                  e.currentTarget.style.borderColor = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.55)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                }}
              >
                ✕
              </button>

              {/* ── TOP HALF: Image Banner ── */}
              <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '0px', overflow: 'hidden' }}>
                <Image
                  src="/Osiyan Habitat/osiyan-habitat-1.png"
                  alt="Osiyan Habitat - Premium Residential Plots"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
                {/* Dark gradient overlay — navy tint */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(41,54,89,0.88) 100%)',
                }} />

                {/* Logo top-right */}
                <div style={{
                  position: 'absolute', top: 14, right: 16,
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px',
                }}>
                  <Image
                    src="/white_wolf_infra_logo.png"
                    alt="White Wolf Infra"
                    width={46}
                    height={46}
                    style={{ objectFit: 'contain' }}
                  />
                  <span style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '8px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}>White Wolf Infra</span>
                </div>

                {/* Badge top-left */}
                <div style={{
                  position: 'absolute', top: 14, left: 16,
                  background: 'rgba(201,168,76,0.92)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                }}>
                  <span style={{
                    color: '#1e2a47',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}>New Launch</span>
                </div>

                {/* Text overlay on image */}
                <div style={{
                  position: 'absolute', bottom: 18, left: 22,
                  display: 'flex', flexDirection: 'column', gap: '3px',
                }}>
                  <span style={{
                    color: 'rgba(201,168,76,0.9)',
                    fontSize: '9px',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}>INTRODUCING</span>
                  <h1 style={{
                    color: 'white',
                    fontSize: '30px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    lineHeight: 1.1,
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    margin: 0,
                  }}>OSIYAN HABITAT</h1>
                  <span style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}>Sector 27, Jhajjar, Haryana</span>
                </div>
              </div>

              {/* ── BOTTOM HALF: Navy Blue Info Bar ── */}
              <div style={{
                background: 'linear-gradient(135deg, #293659 0%, #1e2a47 60%, #141d33 100%)',
                padding: '18px 22px 20px',
                position: 'relative',
              }}>
                {/* Gold top line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, transparent, #c9a84c, #e8d48e, #c9a84c, transparent)',
                }} />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}>
                  {/* Stats row */}
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Project Type', value: 'Residential Plots' },
                      { label: 'Approval', value: 'DDJAY Approved' },
                      { label: 'Location', value: 'Jhajjar, Haryana' },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{
                          color: 'rgba(201,168,76,0.75)',
                          fontSize: '8px',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}>{label}</span>
                        <span style={{
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                        }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href="/projects/osiyan-habitat"
                    onClick={handleClose}
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c 0%, #e8d48e 50%, #c9a84c 100%)',
                      color: '#1e2a47',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '11px 22px',
                      textDecoration: 'none',
                      borderRadius: '3px',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,168,76,0.55)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.35)';
                    }}
                  >
                    Explore Project →
                  </a>
                </div>

                {/* Tagline */}
                <p style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginTop: '12px',
                  textAlign: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '10px',
                }}>
                  For Premium Residential Plots · White Wolf Infra
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
