"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredPhotos } from "@/lib/data";
import Reveal from "./Reveal";

export default function FeaturedPhotos() {
  return (
    <section className="relative py-24 md:py-36 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span
                className="text-[11px] tracking-[0.35em] uppercase text-[#2F6FED] font-medium"
                style={{ fontFamily: "var(--font-mono-label)" }}
              >
                Selected Work
              </span>
              <h2
                className="text-4xl md:text-6xl mt-3 text-[#14181F] tracking-tight"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
              >
                Featured Moments
              </h2>
              <p className="mt-3 text-sm text-[#5B6472] max-w-sm leading-relaxed">
                A curated look at some of our favourite frames from this academic year.
              </p>
            </div>
            <Link
              href="/gallery"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium text-[#14181F] hover:text-[#2F6FED] transition-colors group glass rounded-full px-5 py-2.5"
            >
              View all photos
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Editorial mixed-ratio grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {featuredPhotos.map((photo, i) => {
            const spanClass =
              i === 0
                ? "row-span-2"
                : i === 2
                ? "col-span-1 md:col-span-1 row-span-2"
                : i === 4
                ? "row-span-2"
                : "";

            const heightClass =
              i === 0 || i === 2 || i === 4
                ? "h-[460px] md:h-[600px]"
                : "h-[220px] md:h-[290px]";

            return (
              <Reveal key={photo.id} delay={i * 80} className={spanClass}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative w-full ${heightClass} rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-[0_4px_20px_-6px_rgba(20,24,31,0.1)] hover:shadow-[0_28px_56px_-12px_rgba(20,24,31,0.25)] transition-shadow duration-500`}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.description || "Featured photograph"}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Glass caption plate */}
                  {(photo.photographerName || photo.description) && (
                    <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="glass-dark rounded-xl px-3.5 py-2.5">
                        {photo.photographerName && (
                          <p className="text-white text-[13px] font-medium">
                            {photo.photographerName}
                          </p>
                        )}
                        {photo.description && (
                          <p className="text-white/65 text-[11px] mt-0.5">
                            {photo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Category pill */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[9px] tracking-widest uppercase text-white/90 glass-dark px-2.5 py-1 rounded-full font-medium">
                      {photo.category?.replace("-", " ")}
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-14 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass text-sm font-medium text-[#14181F] hover:bg-white/70 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(20,24,31,0.18)] transition-all duration-300"
            >
              Browse full gallery
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
