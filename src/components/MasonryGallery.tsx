"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
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
      {/* Filter bar */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 mb-10 md:mb-12 md:justify-center">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              active === f.value
                ? "bg-[#2563EB] text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.45)]"
                : "bg-[#F8FAFC] text-[#6B7280] hover:bg-[#EFF4FE] hover:text-[#2563EB]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry grid via CSS columns */}
      <div className="[column-fill:_balance] sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5">
        {filtered.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setLightboxIndex(i)}
            className="group relative block w-full mb-4 md:mb-5 rounded-2xl overflow-hidden break-inside-avoid shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            aria-label={`Open photo${photo.photographerName ? ` by ${photo.photographerName}` : ""}`}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.description || CATEGORY_LABELS[photo.category]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {(photo.photographerName || photo.description) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {photo.photographerName && (
                  <p className="text-white text-sm font-medium">
                    {photo.photographerName}
                  </p>
                )}
                {photo.description && (
                  <p className="text-white/75 text-xs mt-0.5 line-clamp-1">
                    {photo.description}
                  </p>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#6B7280] py-20">
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
