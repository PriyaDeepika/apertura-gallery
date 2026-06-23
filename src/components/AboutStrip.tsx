"use client";

import Reveal from "./Reveal";

const STATS = [
  { value: "20+", label: "Active Members" },
  { value: "200+", label: "Photos Archived" },
  { value: "4", label: "Categories" },
  { value: "3 yrs", label: "Established" },
];

export default function AboutStrip() {
  return (
    <section className="py-16 md:py-20 px-6 md:px-10 bg-[#F8FAFC] border-y border-[#E5E9F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — About blurb */}
          <Reveal>
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#2563EB] font-medium">
                About the Club
              </span>
              <h2
                className="text-2xl md:text-4xl mt-3 mb-4 text-[#111827] leading-snug"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
              >
                Students with cameras,{" "}
                <em style={{ fontStyle: "italic" }}>a shared eye for beauty.</em>
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-md">
                Apertura Club is a student-run photography collective. We meet
                weekly, go on shoots together, and run a shared archive of
                everything worth remembering from college life. All skill levels
                welcome — from first‑timers to film photographers.
              </p>
            </div>
          </Reveal>

          {/* Right — Stats */}
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 border border-[#E5E9F0] hover:shadow-[0_8px_24px_-8px_rgba(17,24,39,0.08)] transition-shadow duration-300"
                >
                  <p
                    className="text-3xl md:text-4xl text-[#111827] mb-1"
                    style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
