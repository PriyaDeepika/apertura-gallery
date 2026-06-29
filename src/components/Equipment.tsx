"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const CAMERAS = [
  {
    id: "eq1",
    brand: "Canon",
    model: "EOS R6 Mark II",
    tagline: "Speed & Low-Light Mastery",
    description:
      "Our primary body for portraits and low-light events. With 40fps electronic burst and Dual Pixel CMOS AF II it locks onto any subject — even in corridors lit only by fluorescents.",
    specs: [
      { label: "Sensor", value: "20.1 MP Full-Frame" },
      { label: "Burst", value: "40 fps (electronic)" },
      { label: "ISO", value: "100 – 204,800" },
      { label: "Video", value: "4K 60p RAW" },
      { label: "AF System", value: "Dual Pixel CMOS AF II" },
      { label: "Weight", value: "588 g body" },
    ],
    accent: "#1F7A4D",
    accentBg: "var(--wash-green)",
    icon: (
      <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
        {/* Body */}
        <rect x="28" y="42" width="144" height="80" rx="8" fill="#1e2a3a" />
        {/* Top plate bump (mode dial side) */}
        <rect x="28" y="28" width="60" height="22" rx="4" fill="#1a2334" />
        {/* Grip */}
        <rect x="152" y="36" width="20" height="50" rx="5" fill="#151e2b" />
        {/* Lens mount circle */}
        <circle cx="95" cy="82" r="32" fill="#0f1923" stroke="#2a3a50" strokeWidth="2.5" />
        <circle cx="95" cy="82" r="24" fill="#0a1118" stroke="#1a2a3a" strokeWidth="1.5" />
        <circle cx="95" cy="82" r="10" fill="#050a0e" />
        <circle cx="95" cy="82" r="5" fill="#0d1720" />
        {/* Lens reflections */}
        <circle cx="87" cy="74" r="3" fill="#2563EB" opacity="0.4" />
        <circle cx="102" cy="70" r="1.5" fill="white" opacity="0.2" />
        {/* Viewfinder */}
        <rect x="68" y="31" width="28" height="16" rx="3" fill="#0d1720" stroke="#2a3a50" strokeWidth="1" />
        {/* Top controls */}
        <circle cx="38" cy="35" r="8" fill="#232e3d" stroke="#2a3a50" strokeWidth="1" />
        <rect x="100" y="29" width="16" height="8" rx="2" fill="#1a2334" />
        {/* Shutter button */}
        <circle cx="155" cy="40" r="5" fill="#2563EB" opacity="0.8" />
        {/* Screen */}
        <rect x="118" y="60" width="42" height="28" rx="3" fill="#0a1118" stroke="#1a2a3a" strokeWidth="1" />
        <rect x="120" y="62" width="38" height="24" rx="2" fill="#0d2340" opacity="0.6" />
        {/* Body texture lines */}
        <line x1="30" y1="55" x2="30" y2="115" stroke="#ffffff" strokeWidth="0.3" opacity="0.05" />
        <line x1="33" y1="55" x2="33" y2="115" stroke="#ffffff" strokeWidth="0.3" opacity="0.05" />
        {/* Canon logo text area */}
        <rect x="40" y="105" width="40" height="8" rx="1" fill="#0f1923" opacity="0.5" />
        {/* Strap lugs */}
        <rect x="28" y="55" width="4" height="12" rx="2" fill="#0f1923" />
        <rect x="168" y="55" width="4" height="12" rx="2" fill="#0f1923" />
      </svg>
    ),
  },
  {
    id: "eq2",
    brand: "Sony",
    model: "Alpha A7 IV",
    tagline: "Hybrid Versatility",
    description:
      "The club's go-to for video coverage and landscape stills. Its 33MP BSI sensor pairs with a 759-point PDAF system and 4K 60p for everything from documentary to graduation day.",
    specs: [
      { label: "Sensor", value: "33 MP Full-Frame BSI" },
      { label: "Burst", value: "10 fps (mechanical)" },
      { label: "ISO", value: "100 – 51,200" },
      { label: "Video", value: "4K 60p (Super 35)" },
      { label: "AF System", value: "759-pt Phase Detect" },
      { label: "Weight", value: "659 g body" },
    ],
    accent: "#2A9D8F",
    accentBg: "var(--wash-teal)",
    icon: (
      <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
        {/* Body */}
        <rect x="22" y="40" width="148" height="82" rx="7" fill="#1e2a2a" />
        {/* Top plate */}
        <rect x="22" y="26" width="148" height="22" rx="5" fill="#182020" />
        {/* Grip */}
        <rect x="148" y="34" width="22" height="52" rx="5" fill="#141e1e" />
        {/* Main lens mount */}
        <circle cx="90" cy="81" r="33" fill="#0d1a1a" stroke="#243030" strokeWidth="2.5" />
        <circle cx="90" cy="81" r="25" fill="#081212" stroke="#182020" strokeWidth="1.5" />
        <circle cx="90" cy="81" r="11" fill="#040c0c" />
        <circle cx="90" cy="81" r="5.5" fill="#0a1616" />
        {/* Lens reflections */}
        <circle cx="82" cy="73" r="3" fill="#0F766E" opacity="0.4" />
        <circle cx="97" cy="69" r="1.5" fill="white" opacity="0.2" />
        {/* Viewfinder hump */}
        <rect x="70" y="26" width="30" height="18" rx="3" fill="#0d1a1a" stroke="#243030" strokeWidth="1" />
        {/* Mode dial */}
        <circle cx="36" cy="33" r="9" fill="#212e2e" stroke="#243030" strokeWidth="1" />
        <rect x="34" y="27" width="4" height="4" rx="1" fill="#0F766E" opacity="0.7" />
        {/* Shutter */}
        <circle cx="150" cy="38" r="5.5" fill="#0F766E" opacity="0.8" />
        {/* Screen */}
        <rect x="120" y="58" width="40" height="30" rx="3" fill="#081212" stroke="#182020" strokeWidth="1" />
        <rect x="122" y="60" width="36" height="26" rx="2" fill="#031a15" opacity="0.7" />
        {/* Top controls */}
        <rect x="104" y="27" width="18" height="8" rx="2" fill="#182020" />
        <rect x="126" y="27" width="10" height="8" rx="2" fill="#182020" />
        {/* Body texture */}
        <line x1="24" y1="52" x2="24" y2="116" stroke="#ffffff" strokeWidth="0.3" opacity="0.05" />
        <line x1="27" y1="52" x2="27" y2="116" stroke="#ffffff" strokeWidth="0.3" opacity="0.05" />
        {/* Strap lugs */}
        <rect x="22" y="54" width="4" height="14" rx="2" fill="#0d1a1a" />
        <rect x="170" y="54" width="4" height="14" rx="2" fill="#0d1a1a" />
      </svg>
    ),
  },
];

export default function Equipment() {
  return (
    <section id="equipment" className="relative py-24 md:py-36 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14 md:mb-20">
            <span
              className="text-[11px] tracking-[0.35em] uppercase text-[#1F7A4D] font-medium"
              style={{ fontFamily: "var(--font-mono-label)" }}
            >
              The Gear
            </span>
            <h2
              className="text-4xl md:text-6xl mt-3 text-[#14181F] tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
            >
              Our Equipment
            </h2>
            <p className="mt-4 text-sm text-[#5B6472] max-w-md mx-auto leading-relaxed">
              Two bodies. Every situation covered — from intimate portraits to
              high-energy events.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {CAMERAS.map((cam, i) => (
            <Reveal key={cam.id} delay={i * 120}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative glass rounded-[1.75rem] overflow-hidden hover:shadow-[0_32px_64px_-16px_rgba(20,24,31,0.18)] transition-shadow duration-500"
              >
                {/* Camera illustration area */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, #0d1a2a 0%, #1a2a3a 50%, #0d1a2a 100%)`,
                    height: "240px",
                  }}
                >
                  {/* Subtle grid texture */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 24px)",
                    }}
                  />
                  {/* Accent glow */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(ellipse at 30% 60%, ${cam.accent}55 0%, transparent 65%)`,
                    }}
                  />
                  {/* Camera SVG */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105">
                    <div className="w-64 h-44 drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                      {cam.icon}
                    </div>
                  </div>
                  {/* Brand badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-block text-[10px] tracking-[0.25em] uppercase font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: cam.accent, color: "white" }}
                    >
                      {cam.brand}
                    </span>
                  </div>
                </div>

                {/* Info area */}
                <div className="p-7 md:p-8">
                  <div className="mb-1">
                    <span
                      className="text-[11px] tracking-[0.2em] uppercase font-medium"
                      style={{ color: cam.accent }}
                    >
                      {cam.tagline}
                    </span>
                  </div>
                  <h3
                    className="text-2xl text-[#14181F] mb-3"
                    style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
                  >
                    {cam.model}
                  </h3>
                  <p className="text-sm text-[#5B6472] leading-relaxed mb-6">
                    {cam.description}
                  </p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {cam.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex flex-col rounded-xl px-3 py-2.5"
                        style={{ background: cam.accentBg }}
                      >
                        <span className="text-[10px] tracking-[0.15em] uppercase text-[#9098A6] font-medium">
                          {spec.label}
                        </span>
                        <span className="text-[13px] font-semibold text-[#14181F] mt-0.5">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
