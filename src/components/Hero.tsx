"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const APERTURE_BLADES = [
  "195.0,100.0 167.2,167.2 120.6,118.9 127.7,104.2",
  "167.2,167.2 100.0,195.0 101.2,128.0 116.6,122.5",
  "100.0,195.0 32.8,167.2 81.1,120.6 95.8,127.7",
  "32.8,167.2 5.0,100.0 72.0,101.2 77.5,116.6",
  "5.0,100.0 32.8,32.8 79.4,81.1 72.3,95.8",
  "32.8,32.8 100.0,5.0 98.8,72.0 83.4,77.5",
  "100.0,5.0 167.2,32.8 118.9,79.4 104.2,72.3",
  "167.2,32.8 195.0,100.0 128.0,98.8 122.5,83.4",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: content drifts up + fades as you scroll past the hero
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 35]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 md:px-6"
    >
      {/* Atmospheric backdrop — soft color wash, no live-blurred images (cheap to render) */}
      <motion.div
        aria-hidden
        style={{ scale: bgScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-[40%] opacity-40"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, var(--wash-teal), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[65%] h-[65%] rounded-[40%] opacity-40"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, var(--wash-amber), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FB]/30 via-[#F7F8FB]/60 to-[#F7F8FB]" />
      </motion.div>

      {/* Glass pedestal holding the hero content — now a black glass panel */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="hero-glass-dark rounded-[2.5rem] md:rounded-[3rem] px-6 sm:px-10 md:px-16 py-12 md:py-16 flex flex-col items-center text-center relative overflow-hidden">
          <div className="grain-overlay rounded-[2.5rem] md:rounded-[3rem]" />

          {/* Glowing aperture iris — replaces the old ring+spoke motif, sits behind the content, slow parallax rotation */}
          <motion.div
            aria-hidden
            style={{ rotate: ringRotate }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[460px] h-[460px] md:w-[640px] md:h-[640px]">
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                <defs>
                  <filter id="apertureGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="apertureFade" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="45%" stopColor="white" stopOpacity="0" />
                    <stop offset="75%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="1" />
                  </radialGradient>
                  <mask id="apertureMask">
                    <rect x="0" y="0" width="200" height="200" fill="url(#apertureFade)" />
                  </mask>
                </defs>
                <circle cx="100" cy="100" r="95" fill="none" stroke="white" strokeWidth="0.4" opacity="0.16" />
                <g mask="url(#apertureMask)">
                  <g fill="none" stroke="white" strokeWidth="0.7" opacity="0.55" filter="url(#apertureGlow)">
                    {APERTURE_BLADES.map((points, i) => (
                      <polygon key={i} points={points} />
                    ))}
                  </g>
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Floating logo */}
          <div className="relative mb-7 hero-fade-in" style={{ animationDelay: "0ms" }}>
            <div className="animate-float-slow">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.25)] ring-4 ring-white/15">
                <Image
                  src="/images/logo.png"
                  alt="Apertura Club logo"
                  fill
                  sizes="128px"
                  className="object-contain rounded-full"
                  priority
                />
              </div>
            </div>
          </div>

          <h2
            className="relative hero-fade-in text-[11px] md:text-xs tracking-[0.4em] text-white/50 uppercase mb-5"
            style={{ animationDelay: "150ms", fontFamily: "var(--font-mono-label)" }}
          >
            Apertura Club — Est. 2023
          </h2>

          <h1
            className="relative hero-fade-in text-[2.6rem] sm:text-6xl md:text-7xl leading-[1.02] text-white mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, animationDelay: "300ms" }}
          >
            Capturing
            <br />
            <span className="italic" style={{ fontStyle: "italic", color: "#7FA9FF" }}>
              Perspectives.
            </span>
          </h1>

          <p
            className="relative hero-fade-in text-base md:text-lg text-white/60 max-w-md mb-9 leading-relaxed"
            style={{ animationDelay: "500ms" }}
          >
            One honest frame at a time — portraits, nature, campus life, and
            events, captured by our members.
          </p>

          <div
            className="relative hero-fade-in flex flex-col sm:flex-row items-center gap-3"
            style={{ animationDelay: "700ms" }}
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#14181F] text-sm font-medium tracking-wide shadow-[0_10px_30px_-8px_rgba(255,255,255,0.3)] hover:bg-[#7FA9FF] hover:text-white hover:shadow-[0_14px_36px_-8px_rgba(127,169,255,0.55)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Gallery
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="hero-fade-in absolute bottom-8 flex flex-col items-center gap-2 text-[#9098A6]"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-mono-label)" }}
        >
          Scroll
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
