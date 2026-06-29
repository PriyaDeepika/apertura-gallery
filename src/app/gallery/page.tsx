"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MasonryGallery from "@/components/MasonryGallery";
import Reveal from "@/components/Reveal";
import { photos } from "@/lib/data";
import { PhotoCategory } from "@/types/photo";

const VALID_CATEGORIES: (PhotoCategory | "all")[] = [
  "all",
  "portraits",
  "nature",
  "campus-life",
  "events",
];

function GalleryContent() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const initialCategory = VALID_CATEGORIES.includes(
    requested as PhotoCategory | "all"
  )
    ? (requested as PhotoCategory | "all")
    : "all";

  return (
    <MasonryGallery photos={photos} initialCategory={initialCategory} />
  );
}

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 md:pt-40 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span
                className="text-[11px] tracking-[0.35em] uppercase text-[#1F7A4D] font-medium"
                style={{ fontFamily: "var(--font-mono-label)" }}
              >
                The Collection
              </span>
              <h1
                className="text-5xl md:text-7xl mt-3 text-[#14181F] tracking-tight"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
              >
                Gallery
              </h1>
              <p className="text-[#5B6472] mt-4 max-w-xl mx-auto">
                Every frame below was captured by an Apertura Club member —
                browse by category or take in the full collection.
              </p>
            </div>
          </Reveal>

          <Suspense fallback={null}>
            <GalleryContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
