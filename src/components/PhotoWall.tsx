"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WallCard {
  id: string;
  img: string;
  tag: string;
  top: string;
  left: string;
  w: number;
  h: number;
  rotate: number;
  depth: number; // parallax speed multiplier — higher drifts further
}

const CARDS: WallCard[] = [
  { id: "c1", img: "/images/gallery/cat-portraits.jpg", tag: "MAIN LAWN, GOLDEN HOUR", top: "4%", left: "4%", w: 220, h: 290, rotate: -3, depth: 0.6 },
  { id: "c2", img: "/images/gallery/featured-2.jpg", tag: "THE OLD BANYAN", top: "0%", left: "36%", w: 320, h: 410, rotate: 1.5, depth: 0.9 },
  { id: "c3", img: "/images/gallery/cat-events.jpg", tag: "CULTURAL FEST, NIGHT ONE", top: "8%", left: "73%", w: 210, h: 280, rotate: -1.5, depth: 0.7 },
  { id: "c4", img: "/images/gallery/featured-3.jpg", tag: "LIBRARY, AFTER HOURS", top: "48%", left: "1%", w: 240, h: 310, rotate: 2.5, depth: 0.7 },
  { id: "c5", img: "/images/gallery/cat-nature.jpg", tag: "BOTANICAL PATH", top: "55%", left: "28%", w: 200, h: 260, rotate: -1, depth: 0.5 },
  { id: "c6", img: "/images/gallery/featured-6.jpg", tag: "PORTRAIT SESSION", top: "47%", left: "54%", w: 230, h: 300, rotate: 1, depth: 0.8 },
  { id: "c7", img: "/images/gallery/cat-campus.jpg", tag: "MAIN QUAD, MORNING RUSH", top: "54%", left: "84%", w: 180, h: 240, rotate: -2.5, depth: 0.6 },
];

function WallPhoto({ card, progress }: { card: WallCard; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const y = useTransform(progress, [0, 1], [40 * card.depth, -40 * card.depth]);

  return (
    <motion.div
      style={{ top: card.top, left: card.left, y }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, rotate: 0 }}
      className="absolute"
    >
      <div
        className="flex flex-col gap-2.5"
        style={{ transform: `rotate(${card.rotate}deg)`, width: card.w }}
      >
        <span
          className="text-[10px] tracking-[0.15em] uppercase text-[#5B6472]"
          style={{ fontFamily: "var(--font-mono-label)" }}
        >
          {card.tag}
        </span>
        <div
          className="relative rounded-xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(20,24,31,0.25)]"
          style={{ width: card.w, height: card.h }}
        >
          <Image
            src={card.img}
            alt={card.tag}
            fill
            sizes="(max-width: 768px) 60vw, 340px"
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function PhotoWall() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "var(--color-cream)" }}
    >
      {/* Decorative line art — thin curved strokes, static (cheap to render) */}
      <svg
        aria-hidden
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-50"
      >
        <path
          d="M -50 780 C 250 650, 450 900, 720 760 S 1150 560, 1500 700"
          fill="none"
          stroke="var(--color-cream-line)"
          strokeWidth="1"
        />
        <path
          d="M -50 120 C 300 280, 500 40, 760 180 S 1180 340, 1500 160"
          fill="none"
          stroke="var(--color-cream-line)"
          strokeWidth="1"
        />
        <circle cx="180" cy="200" r="120" fill="none" stroke="var(--color-cream-line)" strokeWidth="1" />
        <circle cx="1280" cy="700" r="160" fill="none" stroke="var(--color-cream-line)" strokeWidth="1" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 mb-12 md:mb-16 text-center">
        <span
          className="text-[11px] tracking-[0.35em] uppercase text-[#1F7A4D] font-medium"
          style={{ fontFamily: "var(--font-mono-label)" }}
        >
          On The Wall
        </span>
        <h2
          className="text-3xl md:text-5xl mt-3 text-[#14181F] tracking-tight"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
        >
          Photos of the Week
        </h2>
        <p className="mt-3 text-sm text-[#5B6472] max-w-md mx-auto leading-relaxed">
          A loose pin-up of whatever caught a member&rsquo;s eye this week —
          scroll to look around.
        </p>
      </div>

      {/* Desktop / tablet — scattered wall with scroll parallax */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 hidden sm:block">
        <div className="relative h-[640px] md:h-[820px]">
          {CARDS.map((card) => (
            <WallPhoto key={card.id} card={card} progress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* Mobile — horizontal scroll-snap strip, same photos and tags, no absolute layout */}
      <div className="sm:hidden relative">
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-2 snap-strip">
          {CARDS.map((card) => (
            <div key={card.id} className="shrink-0 flex flex-col gap-2.5 w-[200px]">
              <span
                className="text-[10px] tracking-[0.15em] uppercase text-[#5B6472]"
                style={{ fontFamily: "var(--font-mono-label)" }}
              >
                {card.tag}
              </span>
              <div className="relative w-[200px] h-[260px] rounded-xl overflow-hidden shadow-[0_16px_32px_-10px_rgba(20,24,31,0.22)]">
                <Image
                  src={card.img}
                  alt={card.tag}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
