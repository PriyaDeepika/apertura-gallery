"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredPhotos } from "@/lib/data";
import Reveal from "./Reveal";

export default function FeaturedPhotos() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#2563EB] font-medium">
                Selected Work
              </span>
              <h2
                className="text-3xl md:text-5xl mt-3 text-[#111827]"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
              >
                Featured Moments
              </h2>
              <p className="mt-3 text-sm text-[#6B7280] max-w-sm leading-relaxed">
                A curated look at some of our favourite frames from this academic year.
              </p>
            </div>
            <Link
              href="/gallery"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:text-[#1d4ed8] transition-colors group"
            >
              View all photos
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </Reveal>

        {/* Masonry-style grid — 3 columns with strategic row spans */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {featuredPhotos.map((photo, i) => {
            // Give tall spans to alternating items for a editorial layout
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
                ? "h-[520px] md:h-[620px]"
                : "h-[260px] md:h-[300px]";

            return (
              <Reveal key={photo.id} delay={i * 80} className={spanClass}>
                <div
                  className={`relative w-full ${heightClass} rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_32px_-8px_rgba(17,24,39,0.18)] transition-shadow duration-500`}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.description || "Featured photograph"}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Photo metadata on hover */}
                  {(photo.photographerName || photo.description) && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {photo.photographerName && (
                        <p className="text-white text-sm font-medium drop-shadow-sm">
                          {photo.photographerName}
                        </p>
                      )}
                      {photo.description && (
                        <p className="text-white/70 text-xs mt-0.5 drop-shadow-sm">
                          {photo.description}
                        </p>
                      )}
                    </div>
                  )}
                  {/* Category pill */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[9px] tracking-widest uppercase text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
                      {photo.category?.replace("-", " ")}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#E5E9F0] bg-white text-sm font-medium text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-[0_4px_16px_-4px_rgba(37,99,235,0.2)] transition-all duration-300"
            >
              Browse full gallery
              <span>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
