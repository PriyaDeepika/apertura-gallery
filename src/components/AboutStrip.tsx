"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const FRAMES = [
  { value: "20+", label: "Active Members", note: "FRM. 01" },
  { value: "200+", label: "Photos Archived", note: "FRM. 02" },
  { value: "4", label: "Categories", note: "FRM. 03" },
  { value: "3 yrs", label: "Established", note: "FRM. 04" },
];

function SprocketRow() {
  return (
    <div className="flex justify-between px-3" aria-hidden>
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="block w-[7px] h-[7px] rounded-[2px] bg-black/70"
        />
      ))}
    </div>
  );
}

export default function AboutStrip() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12 px-1">
            <div>
              <span
                className="text-[11px] tracking-[0.35em] uppercase text-[#1F7A4D] font-medium"
                style={{ fontFamily: "var(--font-mono-label)" }}
              >
                About the Club
              </span>
              <h2
                className="text-2xl md:text-4xl mt-3 text-[#14181F] leading-snug max-w-lg"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
              >
                Students with cameras,{" "}
                <em style={{ fontStyle: "italic", color: "#1F7A4D" }}>
                  a shared eye for beauty.
                </em>
              </h2>
            </div>
            <p className="text-sm text-[#5B6472] leading-relaxed max-w-sm">
              Apertura Club is a student-run photography collective. We meet
              weekly, go on shoots together, and run a shared archive of
              everything worth remembering from college life — from
              first&#8209;timers to film photographers.
            </p>
          </div>
        </Reveal>

        {/* Contact-sheet film strip */}
        <Reveal delay={100}>
          <div className="rounded-[1.75rem] overflow-hidden bg-[#14181F] shadow-[0_24px_60px_-20px_rgba(20,24,31,0.35)]">
            <SprocketRow />
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {FRAMES.map((frame, i) => (
                <motion.div
                  key={frame.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative px-5 md:px-7 py-10 md:py-12 flex flex-col items-center text-center"
                >
                  <span
                    className="absolute top-3 left-4 text-[9px] tracking-[0.2em] text-white/30"
                    style={{ fontFamily: "var(--font-mono-label)" }}
                  >
                    {frame.note}
                  </span>
                  <p
                    className="text-4xl md:text-5xl text-white mb-2 transition-transform duration-500 group-hover:scale-105"
                    style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
                  >
                    {frame.value}
                  </p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-white/45 font-medium">
                    {frame.label}
                  </p>
                </motion.div>
              ))}
            </div>
            <SprocketRow />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
