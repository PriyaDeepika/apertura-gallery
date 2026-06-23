"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-6">
      {/* Aperture ring motif — subtle, large, behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-[640px] h-[640px] md:w-[820px] md:h-[820px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-[#E5E9F0]"
              style={{
                transform: `scale(${1 - i * 0.16})`,
                opacity: 0.7 - i * 0.15,
              }}
            />
          ))}
          {/* Aperture blade hints */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full opacity-[0.06]"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 95 * Math.cos((i * Math.PI) / 4)}
                y2={100 + 95 * Math.sin((i * Math.PI) / 4)}
                stroke="#2563EB"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Floating logo */}
        <div className="mb-8 hero-fade-in" style={{ animationDelay: "0ms" }}>
          <div className="animate-float-slow">
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full shadow-[0_30px_60px_-15px_rgba(37,99,235,0.25)]">
              <Image
                src="/images/logo.png"
                alt="Apertura Club logo"
                fill
                sizes="144px"
                className="object-contain rounded-full"
                priority
              />
            </div>
          </div>
        </div>

        <h2
          className="hero-fade-in text-xs md:text-sm tracking-[0.35em] text-[#6B7280] uppercase mb-5"
          style={{ animationDelay: "150ms" }}
        >
          Apertura Club
        </h2>

        <h1
          className="hero-fade-in text-4xl md:text-6xl lg:text-7xl leading-[1.08] text-[#111827] mb-6"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, animationDelay: "300ms" }}
        >
          Capturing Perspectives,
          <br />
          One Frame at a Time.
        </h1>

        <p
          className="hero-fade-in text-base md:text-lg text-[#6B7280] max-w-xl mb-10"
          style={{ animationDelay: "500ms" }}
        >
          A college photography club documenting portraits, nature, campus
          life, and events — one honest frame at a time.
        </p>

        <Link
          href="/gallery"
          className="hero-fade-in group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white text-sm font-medium tracking-wide shadow-[0_10px_30px_-8px_rgba(37,99,235,0.5)] hover:bg-[#1d4ed8] hover:shadow-[0_14px_36px_-8px_rgba(37,99,235,0.6)] transition-shadow transition-colors duration-300"
          style={{ animationDelay: "700ms" }}
        >
          Explore Gallery
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <div
        className="hero-fade-in absolute bottom-10 flex flex-col items-center gap-2 text-[#9CA3AF]"
        style={{ animationDelay: "1000ms" }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
