"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, UserRound, Leaf, GraduationCap, PartyPopper } from "lucide-react";
import Reveal from "./Reveal";

const CATEGORIES = [
  {
    icon: UserRound,
    title: "Portraits",
    desc: "Student portraits across campus, captured with permission and care — from golden-hour silhouettes to candid corridor moments.",
    href: "/gallery?category=portraits",
    imageUrl: "/images/gallery/cat-portraits.jpg",
    count: "5 photos",
    accent: "#7C6CE0",
    wash: "var(--wash-violet)",
  },
  {
    icon: Leaf,
    title: "Nature",
    desc: "The quieter corners of campus — ancient trees, monsoon skies, botanical paths, and morning light through leaves.",
    href: "/gallery?category=nature",
    imageUrl: "/images/gallery/cat-nature.jpg",
    count: "5 photos",
    accent: "#2A9D8F",
    wash: "var(--wash-teal)",
  },
  {
    icon: GraduationCap,
    title: "Campus Life",
    desc: "Everyday moments — libraries at midnight, corridors in the rush hour, cricket nets at dusk, and quiet study mornings.",
    href: "/gallery?category=campus-life",
    imageUrl: "/images/gallery/cat-campus.jpg",
    count: "5 photos",
    accent: "#2F6FED",
    wash: "var(--wash-blue)",
  },
  {
    icon: PartyPopper,
    title: "Events",
    desc: "Fests, ceremonies, and the electric energy of college life in motion — opening nights, cultural shows, and graduation days.",
    href: "/gallery?category=events",
    imageUrl: "/images/gallery/cat-events.jpg",
    count: "5 photos",
    accent: "#E08A3C",
    wash: "var(--wash-amber)",
  },
];

export default function WhatWeCapture() {
  return (
    <section className="relative py-24 md:py-36 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14 md:mb-20">
            <span
              className="text-[11px] tracking-[0.35em] uppercase text-[#2F6FED] font-medium"
              style={{ fontFamily: "var(--font-mono-label)" }}
            >
              Our Focus
            </span>
            <h2
              className="text-4xl md:text-6xl mt-3 text-[#14181F] tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
            >
              What We Capture
            </h2>
            <p className="mt-4 text-sm text-[#5B6472] max-w-md mx-auto leading-relaxed">
              Four categories. One common thread — honest, beautiful frames
              from everyday college life.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 100}>
              <Link href={cat.href} className="group block h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[1.75rem] overflow-hidden glass h-full"
                >
                  {/* Pastel wash backdrop visible at edges */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-70"
                    style={{ background: cat.wash }}
                  />

                  {/* Thumbnail */}
                  <div className="relative w-full h-56 overflow-hidden rounded-t-[1.75rem]">
                    <Image
                      src={cat.imageUrl}
                      alt={`${cat.title} photography`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] tracking-widest uppercase text-white/85 glass-dark px-3 py-1 rounded-full font-medium">
                        {cat.count}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="w-10 h-10 rounded-full glass-dark flex items-center justify-center">
                        <cat.icon size={18} className="text-white" />
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="relative p-6 md:p-7">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        className="text-xl md:text-2xl text-[#14181F]"
                        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
                      >
                        {cat.title}
                      </h3>
                      <span
                        className="mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45"
                        style={{ background: cat.accent }}
                      >
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                    <p className="text-sm text-[#5B6472] leading-relaxed">
                      {cat.desc}
                    </p>
                    <div
                      className="mt-4 h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-16"
                      style={{ background: cat.accent }}
                    />
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
