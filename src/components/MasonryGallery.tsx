"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Photo, PhotoCategory, CATEGORY_LABELS } from "@/types/photo";
import Lightbox from "./Lightbox";

const FILTERS: { label: string; value: PhotoCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Portraits", value: "portraits" },
  { label: "Nature", value: "nature" },
  { label: "Campus Life", value: "campus-life" },
  { label: "Events", value: "events" },
];

export default function MasonryGallery({
  photos,
  initialCategory = "all",
}: {
  photos: Photo[];
  initialCategory?: PhotoCategory | "all";
}) {
  const [active, setActive] = useState<PhotoCategory | "all">(
    initialCategory
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? photos : photos.filter((p) => p.category === active)),
    [photos, active]
  );

  return (
    <div>
      {/* Floating glass filter bar */}
      <div className="sticky top-20 md:top-24 z-30 mb-10 md:mb-14 flex justify-center">
        <div className="glass-strong rounded-full p-1.5 flex gap-1 overflow-x-auto no-scrollbar max-w-full">
          <LayoutGroup>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`relative shrink-0 px-4 md:px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  active === f.value ? "text-white" : "text-[#5B6472] hover:text-[#14181F]"
                }`}
              >
                {active === f.value && (
                  <motion.span
                    layoutId="active-filter-pill"
                    className="absolute inset-0 rounded-full bg-[#14181F]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </LayoutGroup>
        </div>
      </div>

      {/* Masonry grid via CSS columns — exhibition wall */}
      <div className="[column-fill:_balance] sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((photo, i) => (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full mb-4 md:mb-5 rounded-2xl overflow-hidden break-inside-avoid shadow-[0_2px_10px_-4px_rgba(20,24,31,0.1)] hover:shadow-[0_24px_48px_-12px_rgba(20,24,31,0.28)] transition-shadow duration-500 focus-visible:outline-2 focus-visible:outline-[#1F7A4D]"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              aria-label={`Open photo${photo.photographerName ? ` by ${photo.photographerName}` : ""}`}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.description || CATEGORY_LABELS[photo.category]}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glass caption plate */}
              {(photo.photographerName || photo.description) && (
                <div className="absolute bottom-3 left-3 right-3 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="glass-dark rounded-xl px-3.5 py-2.5">
                    {photo.photographerName && (
                      <p className="text-white text-[13px] font-medium">
                        {photo.photographerName}
                      </p>
                    )}
                    {photo.description && (
                      <p className="text-white/65 text-[11px] mt-0.5 line-clamp-1">
                        {photo.description}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Category pill, always visible faintly */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[9px] tracking-widest uppercase text-white/90 glass-dark px-2.5 py-1 rounded-full font-medium">
                  {CATEGORY_LABELS[photo.category]}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#5B6472] py-20">
          No photographs in this category yet.
        </p>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </div>
  );
}
