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
      <main className="flex-1 pt-32 md:pt-40 pb-20 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-[#2563EB] font-medium">
                The Collection
              </span>
              <h1
                className="text-4xl md:text-6xl mt-3 text-[#111827]"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
              >
                Gallery
              </h1>
              <p className="text-[#6B7280] mt-4 max-w-xl mx-auto">
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
