"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
/* ── Design tokens ─────────────────────────────────────────────────────────── */
const P = {
  bg: "#f7f3ee",
  panel: "#FFFFFF",
  panelAlt: "#fdfaf6",
  gold: "#293659", // Primary Brand Navy
  goldBright: "#4f8ef7", // Accent Blue
  goldLine: "rgba(41,54,89,0.18)",
  ink: "#111827",
  inkMuted: "#6b7280",
  shadow: "rgba(41,54,89,0.10)",
};

/* ── Location data ─────────────────────────────────────────────────────────── */
const NEARBY = [
  {
    name: "Govt. Sr. Sec. School Jhajjar",
    category: "Education",
    dist: "2 km", time: "5 min",
    bearing: 350, ringFrac: 0.15,
    color: "#4f8ef7", icon: "🏫",
    detail: "Reputed school with quality education infrastructure nearby.",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
  },
  {
    name: "Civil Hospital Jhajjar",
    category: "Healthcare",
    dist: "4 km", time: "10 min",
    bearing: 55, ringFrac: 0.38,
    color: "#10b981", icon: "🏥",
    detail: "Government hospital with emergency & general facilities.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
  },
  {
    name: "Jhajjar Main Market",
    category: "Shopping",
    dist: "3 km", time: "8 min",
    bearing: 120, ringFrac: 0.52,
    color: "#f59e0b", icon: "🛒",
    detail: "Complete daily needs, grocery, and retail market.",
    img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80",
  },
  {
    name: "NH-48 (Delhi–Jaipur Highway)",
    category: "Connectivity",
    dist: "5 km", time: "12 min",
    bearing: 218, ringFrac: 0.65,
    color: "#a855f7", icon: "🛣️",
    detail: "Direct highway access for seamless NCR connectivity.",
    img: "https://images.unsplash.com/photo-1513689408665-27a96e2cc341?auto=format&fit=crop&q=80",
  },
  {
    name: "Gurugram (Cyber City)",
    category: "Employment Hub",
    dist: "55 km", time: "60 min",
    bearing: 38, ringFrac: 0.80,
    color: "#ef4444", icon: "🏙️",
    detail: "India's top IT & corporate hub reachable via NH-48.",
    img: "https://images.unsplash.com/photo-1605809701769-cf303db5d5c0?auto=format&fit=crop&q=80",
  },
  {
    name: "IGI Airport, Delhi",
    category: "Air Travel",
    dist: "70 km", time: "75 min",
    bearing: 32, ringFrac: 0.93,
    color: "#06b6d4", icon: "✈️",
    detail: "International airport accessible via expressway.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80",
  },
];

/* ── CSS animations ────────────────────────────────────────────────────────── */
const ANIM_CSS = `
@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes float-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes radar-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
`;

function polar(bearing, frac, R) {
  const rad = ((bearing - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * R * frac, y: Math.sin(rad) * R * frac };
}

const LBL_COS = Math.cos(((115 - 90) * Math.PI) / 180);
const LBL_SIN = Math.sin(((115 - 90) * Math.PI) / 180);

/* ── Radar Canvas ─────────────────────────────────────────────────────────── */
function RadarCanvas({ activePin, setActivePin }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const R = Math.min(canvas.width, canvas.height) * 0.40;
    let found = null;
    NEARBY.forEach((loc, i) => {
      const p = polar(loc.bearing, loc.ringFrac, R);
      if (Math.hypot(mx - cx - p.x, my - cy - p.y) < 22) found = i;
    });
    setActivePin(found);
  }, [setActivePin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const pr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * pr;
      canvas.height = rect.height * pr;
      ctx.scale(pr, pr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const t = tRef.current;
      const pr = window.devicePixelRatio || 1;
      const W = canvas.width / pr;
      const H = canvas.height / pr;
      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) * 0.40;

      ctx.clearRect(0, 0, W, H);

      /* ── Parchment disc ── */
      const bgG = ctx.createRadialGradient(cx, cy, 0, cx, cy, R + 22);
      bgG.addColorStop(0, "rgba(255,252,245,1)");
      bgG.addColorStop(0.78, "rgba(251,244,232,1)");
      bgG.addColorStop(1, "rgba(244,235,218,0.5)");
      ctx.beginPath(); ctx.arc(cx, cy, R + 22, 0, Math.PI * 2);
      ctx.fillStyle = bgG; ctx.fill();
      ctx.strokeStyle = "rgba(41,54,89,0.22)"; // Updated color
      ctx.lineWidth = 1; ctx.stroke();

      /* ── Concentric rings ── */
      const distLabels = ["15 km", "30 km", "50 km", "75 km"];
      for (let ring = 1; ring <= 4; ring++) {
        const rr = R * (ring / 4);
        ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(41,54,89,${0.08 + ring * 0.04})`; // Updated color
        ctx.lineWidth = ring === 4 ? 1.3 : 0.75;
        ctx.setLineDash(ring === 4 ? [] : [3, 7]);
        ctx.stroke();
        ctx.setLineDash([]);

        const lx = cx + LBL_COS * rr;
        const ly = cy + LBL_SIN * rr;
        ctx.save();
        ctx.font = "700 9px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const tw = ctx.measureText(distLabels[ring - 1]).width;
        const ph = 15, pw = tw + 12, pr2 = 4;
        ctx.fillStyle = "rgba(41,54,89,0.82)"; // Updated color
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(lx - pw / 2, ly - ph / 2, pw, ph, pr2);
        else ctx.rect(lx - pw / 2, ly - ph / 2, pw, ph);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.96)"; // Updated text
        ctx.fillText(distLabels[ring - 1], lx, ly);
        ctx.restore();
      }

      /* ── Cardinal grid lines ── */
      ctx.setLineDash([2, 10]);
      ctx.strokeStyle = "rgba(41,54,89,0.09)"; // Updated color
      ctx.lineWidth = 0.6;
      for (let a = 0; a < 8; a++) {
        const ang = (a / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      /* ── Sweep arm ── */
      const sweepAng = (t * 0.28) % (Math.PI * 2);
      ctx.save();
      ctx.translate(cx, cy); ctx.rotate(sweepAng);
      const sg = ctx.createLinearGradient(0, 0, R, 0);
      sg.addColorStop(0, "rgba(79,142,247,0.22)"); // Updated color
      sg.addColorStop(0.55, "rgba(79,142,247,0.06)"); // Updated color
      sg.addColorStop(1, "rgba(79,142,247,0)"); // Updated color
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, R, -0.40, 0.40); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(79,142,247,0.40)"; // Updated color
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(R, 0); ctx.stroke();
      ctx.restore();

      /* ── Location pins ── */
      NEARBY.forEach((loc, i) => {
        const p = polar(loc.bearing, loc.ringFrac, R);
        const px = cx + p.x, py = cy + p.y;
        const act = activePin === i;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + i * 1.1);

        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py);
        ctx.strokeStyle = act ? loc.color + "50" : "rgba(41,54,89,0.18)"; // Updated color
        ctx.lineWidth = act ? 1.0 : 0.55;
        ctx.setLineDash([3, 8]); ctx.stroke(); ctx.setLineDash([]);

        if (act) {
          ctx.beginPath(); ctx.arc(px, py, 14 * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = loc.color + "55"; ctx.lineWidth = 1.4; ctx.stroke();
        }

        ctx.shadowColor = act ? loc.color + "60" : "rgba(0,0,0,0.14)";
        ctx.shadowBlur = act ? 10 : 4;
        ctx.beginPath(); ctx.arc(px, py, act ? 7.5 : 5.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF"; ctx.fill();
        ctx.strokeStyle = loc.color; ctx.lineWidth = act ? 2.2 : 1.6; ctx.stroke();
        ctx.shadowBlur = 0; ctx.shadowColor = "transparent";
        ctx.beginPath(); ctx.arc(px, py, act ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = loc.color; ctx.fill();

        const above = p.y <= 0;
        const labelY = py + (above ? -14 : 17);
        ctx.font = `${act ? "700" : "400"} ${act ? 9.5 : 8}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (act) {
          const tw = ctx.measureText(loc.name).width;
          ctx.fillStyle = "rgba(41,54,89,0.94)"; // Updated color
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(px - tw / 2 - 5, labelY - 7, tw + 10, 14, 3);
          else ctx.rect(px - tw / 2 - 5, labelY - 7, tw + 10, 14);
          ctx.fill();
          ctx.strokeStyle = loc.color + "48"; ctx.lineWidth = 0.7; ctx.stroke();
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "rgba(41,54,89,0.70)"; // Updated color
        }
        ctx.fillText(loc.name, px, labelY);
        ctx.textBaseline = "alphabetic";
      });

      /* ── Centre beacon ── */
      const bp = 0.5 + 0.5 * Math.sin(t * 1.7);

      for (let ri = 3; ri >= 1; ri--) {
        ctx.beginPath(); ctx.arc(cx, cy, 20 + ri * 8 * bp, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(41,54,89,${0.03 * (4 - ri)})`; ctx.fill(); // Updated color
      }
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(41,54,89,${0.28 + 0.30 * bp})`; ctx.lineWidth = 1.2; ctx.stroke(); // Updated color

      ctx.shadowColor = "rgba(41,54,89,0.40)"; ctx.shadowBlur = 12; // Updated color
      ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF"; ctx.fill();
      ctx.strokeStyle = P.goldBright; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

      ctx.font = "15px sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("📍", cx, cy);

      const pTxt = "◆ OSIYAN HABITAT ◆";
      ctx.font = "700 6.5px Inter, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      const ptw = ctx.measureText(pTxt).width;
      ctx.fillStyle = "rgba(41,54,89,0.82)"; // Updated color
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx - ptw / 2 - 5, cy + 20, ptw + 10, 14, 3);
      else ctx.rect(cx - ptw / 2 - 5, cy + 20, ptw + 10, 14);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.96)"; // Updated color
      ctx.fillText(pTxt, cx, cy + 27);

      /* ── Compass ── */
      ctx.fillStyle = "rgba(41,54,89,0.55)"; // Updated color
      ctx.font = "700 8.5px Inter, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      [["N", 0, -1], ["E", 1, 0], ["S", 0, 1], ["W", -1, 0]].forEach(([l, dx, dy]) => {
        ctx.fillText(l, cx + dx * (R + 15), cy + dy * (R + 15));
      });
      ctx.textBaseline = "alphabetic";

      tRef.current += 0.016;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [activePin]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", cursor: "crosshair", display: "block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActivePin(null)}
    />
  );
}

/* ── LabelRow ─────────────────────────────────────────────────────────────── */
function LabelRow({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
      <div style={{ height: "1px", flex: 1, background: P.goldLine }} />
      <span style={{
        fontSize: "0.6rem", letterSpacing: "0.2em",
        textTransform: "uppercase", color: P.inkMuted, fontWeight: 700,
      }}>
        {text}
      </span>
      <div style={{ height: "1px", flex: 1, background: P.goldLine }} />
    </div>
  );
}

/* ── MapSection ───────────────────────────────────────────────────────────── */
export default function MapSection() {
  const [activePin, setActivePin] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const hx = useMotionValue(0);
  const hy = useMotionValue(0);
  const hSpringX = useSpring(hx, { stiffness: 100, damping: 20 });
  const hSpringY = useSpring(hy, { stiffness: 100, damping: 20 });
  const hRotateX = useTransform(hSpringY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const hRotateY = useTransform(hSpringX, [-0.5, 0.5], ["-15deg", "15deg"]);

  /* Intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.10 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const activeLoc = activePin !== null ? NEARBY[activePin] : null;

  return (
    <section
      ref={sectionRef}
      style={{
        background: P.bg,
        padding: "4rem 0 3rem",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{ANIM_CSS}</style>

      {/* Fine crosshatch bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(${P.goldLine} 1px, transparent 1px),
          linear-gradient(90deg, ${P.goldLine} 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
      }} />

      {/* Watermark coordinate */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%) rotate(-22deg)",
        fontSize: "clamp(3rem, 9vw, 9rem)",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900,
        color: "rgba(41,54,89,0.03)",
        whiteSpace: "nowrap",
        letterSpacing: "0.16em",
        pointerEvents: "none", userSelect: "none",
      }}>
        28°36′N · 76°39′E
      </div>

      {/* Top rule */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "1px", height: "52px",
        background: `linear-gradient(transparent, ${P.goldLine})`,
      }} />

      {/* ── Section header ── */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem", padding: "0 5%", position: "relative" }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: "1rem", marginBottom: "1.2rem",
        }}>
          <div style={{ height: "1px", width: "52px", background: `linear-gradient(to right, transparent, ${P.gold})` }} />
          <span style={{
            fontSize: "0.54rem", letterSpacing: "0.55em",
            textTransform: "uppercase", color: P.gold, fontWeight: 700,
          }}>
            Strategic Location
          </span>
          <div style={{ height: "1px", width: "52px", background: `linear-gradient(to left, transparent, ${P.gold})` }} />
        </div>

        <div
          className="relative py-4 cursor-default"
          style={{ perspective: "1200px" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            hx.set((e.clientX - rect.left) / rect.width - 0.5);
            hy.set((e.clientY - rect.top) / rect.height - 0.5);
          }}
          onMouseLeave={() => { hx.set(0); hy.set(0); }}
        >
          <motion.h2
            style={{
              rotateX: hRotateX,
              rotateY: hRotateY,
              transformStyle: "preserve-3d",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 900, color: P.ink,
              lineHeight: 1.1,
              letterSpacing: "-0.03em", textTransform: "uppercase"
            }}
            className="m-0 mb-[0.65rem]"
          >
            <motion.span style={{ z: 40, display: "inline-block", transformStyle: "preserve-3d", marginRight: "0.25em" }}>Location</motion.span>
            <motion.span style={{ z: 80, display: "inline-block", transformStyle: "preserve-3d", color: P.gold }}>Advantage.</motion.span>
          </motion.h2>
        </div>

        <p style={{
          color: P.inkMuted, fontSize: "0.82rem",
          letterSpacing: "0.07em", fontWeight: 400,
          fontFamily: "'Inter', sans-serif", margin: 0,
        }}>
          Sector 27, Jhajjar &nbsp;·&nbsp; NH-48, Haryana &nbsp;·&nbsp; Rapid Infrastructure Growth Zone
        </p>
      </div>

      {/* ── Panels wrapper ── */}
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 3%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 600px 1fr",
          gap: "0",
          border: `1px solid ${P.goldLine}`,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: `0 10px 50px ${P.shadow}, 0 2px 12px rgba(26,21,16,0.06)`,
          minHeight: "500px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>

          {/* ── LEFT: Radar ── */}
          <div style={{
            background: P.panel,
            padding: "2rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            animation: visible ? "slide-in-left 0.8s ease 0.2s both" : "none",
          }}>
            <LabelRow text="Proximity Radar" />

            {/* Full-height radar canvas */}
            <div style={{ flex: 1, minHeight: "280px", position: "relative" }}>
              <RadarCanvas activePin={activePin} setActivePin={setActivePin} />
            </div>

            {/* Scale bar */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              borderTop: `1px solid ${P.goldLine}`, paddingTop: "0.8rem",
            }}>
              {["0", "15 km", "30 km", "50 km"].map((l) => (
                <span key={l} style={{
                  fontSize: "0.56rem", letterSpacing: "0.10em",
                  color: P.inkMuted, fontVariantNumeric: "tabular-nums", fontWeight: "bold"
                }}>
                  {l}
                </span>
              ))}
            </div>

            {/* Active pin info card */}
            <div style={{
              borderRadius: "12px",
              border: `1.5px solid ${activeLoc ? activeLoc.color + "44" : P.goldLine}`,
              overflow: "hidden",
              background: "#FDFAF5",
              transition: "all 0.3s ease",
              boxShadow: activeLoc ? `0 8px 24px ${activeLoc.color}22` : `0 2px 8px ${P.shadow}`,
              minHeight: "70px",
            }}>
              <div style={{
                height: activeLoc ? "100px" : "0",
                overflow: "hidden",
                transition: "height 0.4s cubic-bezier(0.4,0,0.2,1)",
                position: "relative",
              }}>
                {activeLoc && (
                  <>
                    <img
                      key={activeLoc.name}
                      src={activeLoc.img}
                      alt={activeLoc.name}
                      style={{
                        width: "100%", height: "100px", objectFit: "cover", display: "block",
                        filter: "brightness(0.85) saturate(1.1) contrast(1.05)"
                      }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(transparent 35%, rgba(253,250,245,0.95))",
                    }} />
                    <div style={{
                      position: "absolute", bottom: "0.7rem", right: "0.8rem",
                      background: activeLoc.color, color: "#FFF",
                      fontSize: "0.54rem", fontWeight: 700,
                      padding: "0.22rem 0.65rem", borderRadius: "3rem",
                      letterSpacing: "0.05em",
                      boxShadow: `0 4px 12px ${activeLoc.color}40`,
                    }}>
                      {activeLoc.dist} · {activeLoc.time}
                    </div>
                  </>
                )}
              </div>
              <div style={{ padding: "0.75rem 1rem", minHeight: "60px" }}>
                {activeLoc ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "1rem", lineHeight: 1 }}>{activeLoc.icon}</span>
                      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: activeLoc.color, letterSpacing: "0.02em" }}>
                        {activeLoc.name}
                      </div>
                    </div>
                    <div style={{ fontSize: "0.6rem", color: P.inkMuted, lineHeight: 1.6 }}>
                      {activeLoc.detail}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: "0.58rem", color: P.inkMuted, textAlign: "center", paddingTop: "1rem", lineHeight: 1.7, fontWeight: 500 }}>
                    ✨ Hover on radar beacons<br />to explore nearby landmarks
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── CENTRE: Minimal Map ── */}
          <div style={{
            position: "relative",
            background: "linear-gradient(135deg, rgba(237,232,224,0.4), rgba(247,243,238,0.6))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem 1rem",
            borderLeft: `1px solid ${P.goldLine}`,
            borderRight: `1px solid ${P.goldLine}`,
          }}>
            <div style={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: "500px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.7!2d76.6568!3d28.6006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85b3d1f9b4a1%3A0x1234567890abcdef!2sSector%2027%2C%20Jhajjar%2C%20Haryana!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin"
                style={{
                  width: "100%", height: "100%", border: "none", display: "block",
                  filter: "sepia(8%) saturate(0.85) brightness(1.05)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Decorative corner marks */}
              <div style={{ position: "absolute", inset: "12px", pointerEvents: "none" }}>
                {[
                  { top: 0, left: 0, borderTop: "2px solid", borderLeft: "2px solid" },
                  { top: 0, right: 0, borderTop: "2px solid", borderRight: "2px solid" },
                  { bottom: 0, left: 0, borderBottom: "2px solid", borderLeft: "2px solid" },
                  { bottom: 0, right: 0, borderBottom: "2px solid", borderRight: "2px solid" },
                ].map((s, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                    borderColor: `${P.gold}60`,
                    ...s
                  }} />
                ))}
              </div>

              {/* Central location pill */}
              <div style={{
                position: "absolute", bottom: "1.5rem", left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255,252,248,0.96)",
                border: `1.5px solid ${P.goldLine}`,
                backdropFilter: "blur(12px)",
                color: P.ink,
                fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.5rem 1.2rem",
                borderRadius: "2.5rem",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: `0 6px 24px ${P.shadow}`,
              }}>
                <span style={{ color: P.gold, marginRight: "0.5em" }}>📍</span>
                Sector 27, Jhajjar
              </div>
            </div>
          </div>

          {/* ── RIGHT: Location cards ── */}
          <div style={{
            background: P.panel,
            padding: "2rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflowY: "auto",
            animation: visible ? "slide-in-right 0.8s ease 0.2s both" : "none",
          }}>
            <LabelRow text="Nearby Landmarks" />

            {NEARBY.map((loc, i) => {
              const isAct = activePin === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActivePin(i)}
                  onMouseLeave={() => setActivePin(null)}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "10px",
                    border: `1.5px solid ${isAct ? loc.color + "60" : P.goldLine}`,
                    background: isAct ? `${loc.color}11` : "transparent",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    transform: isAct ? "translateX(8px)" : "none",
                    boxShadow: isAct ? `0 6px 20px ${loc.color}24` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "9px",
                      background: isAct ? `${loc.color}18` : "#FDFAF5",
                      border: `1.5px solid ${isAct ? loc.color + "50" : P.goldLine}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.9rem", flexShrink: 0, transition: "all 0.25s",
                    }}>
                      {loc.icon}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: "0.75rem", fontWeight: 700, lineHeight: 1.4,
                        color: isAct ? loc.color : P.ink,
                        transition: "color 0.25s",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        letterSpacing: "0.01em",
                      }}>
                        {loc.name}
                      </div>
                      <div style={{ fontSize: "0.6rem", color: P.inkMuted, letterSpacing: "0.05em", marginTop: "2px", fontWeight: 500 }}>
                        {loc.category}
                      </div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{
                        fontSize: "0.7rem", fontWeight: 800,
                        color: isAct ? loc.color : P.gold,
                        fontVariantNumeric: "tabular-nums",
                      }}>
                        {loc.dist}
                      </div>
                      <div style={{ fontSize: "0.55rem", color: P.inkMuted, marginTop: "2px", fontWeight: 500 }}>
                        {loc.time}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    overflow: "hidden",
                    maxHeight: isAct ? "50px" : "0",
                    opacity: isAct ? 1 : 0,
                    transition: "max-height 0.3s ease, opacity 0.25s ease",
                    fontSize: "0.65rem", color: P.inkMuted,
                    marginTop: isAct ? "0.6rem" : 0,
                    paddingTop: isAct ? "0.5rem" : 0,
                    borderTop: isAct ? `1px solid ${loc.color}28` : "none",
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}>
                    {loc.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom coordinate strip ── */}
      <div style={{
        textAlign: "center", marginTop: "3.5rem",
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: "1.2rem",
      }}>
        <div style={{ height: "1px", width: "80px", background: `linear-gradient(to right, transparent, ${P.goldLine})` }} />
        <span style={{
          fontSize: "0.48rem", letterSpacing: "0.35em",
          color: P.inkMuted, textTransform: "uppercase",
          fontVariantNumeric: "tabular-nums",
          fontWeight: 700
        }}>
          28°36′04″N &nbsp;·&nbsp; 76°39′18″E &nbsp;·&nbsp; Sector 27 &nbsp;·&nbsp; Jhajjar &nbsp;·&nbsp; Haryana 124103
        </span>
        <div style={{ height: "1px", width: "80px", background: `linear-gradient(to left, transparent, ${P.goldLine})` }} />
      </div>

      {/* Bottom rule */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "1px", height: "52px",
        background: `linear-gradient(${P.goldLine}, transparent)`,
      }} />
    </section>
  );
}
