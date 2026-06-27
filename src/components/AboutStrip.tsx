"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const STATS = [
  { value: "20+", label: "Active Members", accent: "#2F6FED", wash: "var(--wash-blue)" },
  { value: "200+", label: "Photos Archived", accent: "#E08A3C", wash: "var(--wash-amber)" },
  { value: "4", label: "Categories", accent: "#2A9D8F", wash: "var(--wash-teal)" },
  { value: "3 yrs", label: "Established", accent: "#7C6CE0", wash: "var(--wash-violet)" },
];

export default function AboutStrip() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left — About blurb */}
            <Reveal>
              <div>
                <span
                  className="text-[11px] tracking-[0.35em] uppercase text-[#2F6FED] font-medium"
                  style={{ fontFamily: "var(--font-mono-label)" }}
                >
                  About the Club
                </span>
                <h2
                  className="text-2xl md:text-4xl mt-4 mb-5 text-[#14181F] leading-snug"
                  style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
                >
                  Students with cameras,{" "}
                  <em style={{ fontStyle: "italic", color: "#2F6FED" }}>
                    a shared eye for beauty.
                  </em>
                </h2>
                <p className="text-sm md:text-[15px] text-[#5B6472] leading-relaxed max-w-md">
                  Apertura Club is a student-run photography collective. We meet
                  weekly, go on shoots together, and run a shared archive of
                  everything worth remembering from college life. All skill levels
                  welcome — from first&#8209;timers to film photographers.
                </p>
              </div>
            </Reveal>

            {/* Right — Stats */}
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl p-5 md:p-6 overflow-hidden glass-card cursor-default"
                    style={{ background: "rgba(255,255,255,0.65)" }}
                  >
                    <div
                      className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-50 blur-xl"
                      style={{ background: stat.wash }}
                    />
                    <p
                      className="relative text-3xl md:text-4xl mb-1"
                      style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500, color: stat.accent }}
                    >
                      {stat.value}
                    </p>
                    <p className="relative text-[11px] tracking-[0.15em] uppercase text-[#5B6472] font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
