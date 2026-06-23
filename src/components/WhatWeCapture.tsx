"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const CATEGORIES = [
  {
    emoji: "👤",
    title: "Portraits",
    desc: "Student portraits across campus, captured with permission and care — from golden-hour silhouettes to candid corridor moments.",
    href: "/gallery?category=portraits",
    imageUrl: "/images/gallery/cat-portraits.jpg",
    count: "5 photos",
    accent: "#7C3AED",
  },
  {
    emoji: "🌿",
    title: "Nature",
    desc: "The quieter corners of campus — ancient trees, monsoon skies, botanical paths, and morning light through leaves.",
    href: "/gallery?category=nature",
    imageUrl: "/images/gallery/cat-nature.jpg",
    count: "5 photos",
    accent: "#059669",
  },
  {
    emoji: "🎓",
    title: "Campus Life",
    desc: "Everyday moments — libraries at midnight, corridors in the rush hour, cricket nets at dusk, and quiet study mornings.",
    href: "/gallery?category=campus-life",
    imageUrl: "/images/gallery/cat-campus.jpg",
    count: "5 photos",
    accent: "#2563EB",
  },
  {
    emoji: "🎉",
    title: "Events",
    desc: "Fests, ceremonies, and the electric energy of college life in motion — opening nights, cultural shows, and graduation days.",
    href: "/gallery?category=events",
    imageUrl: "/images/gallery/cat-events.jpg",
    count: "5 photos",
    accent: "#D97706",
  },
];

export default function WhatWeCapture() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-10 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14 md:mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-[#2563EB] font-medium">
              Our Focus
            </span>
            <h2
              className="text-3xl md:text-5xl mt-3 text-[#111827]"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
            >
              What We Capture
            </h2>
            <p className="mt-4 text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed">
              Four categories. One common thread — honest, beautiful frames
              from everyday college life.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 100}>
              <Link
                href={cat.href}
                className="group block relative rounded-2xl overflow-hidden bg-white border border-[#E5E9F0] hover:shadow-[0_24px_48px_-12px_rgba(17,24,39,0.15)] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={cat.imageUrl}
                    alt={`${cat.title} photography`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {/* Category count badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
                      {cat.count}
                    </span>
                  </div>
                  {/* Emoji icon */}
                  <div className="absolute top-4 left-4">
                    <span className="text-2xl">{cat.emoji}</span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className="text-xl text-[#111827] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontWeight: 500,
                      }}
                    >
                      {cat.title}
                    </h3>
                    <span
                      className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white transition-transform duration-500 group-hover:translate-x-0.5"
                      style={{ background: cat.accent }}
                    >
                      →
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="mt-4 h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-16" style={{ background: cat.accent }} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
