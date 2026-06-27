"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Photo, CATEGORY_LABELS } from "@/types/photo";

export default function Lightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const photo = photos[activeIndex];

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + photos.length) % photos.length);
  }, [activeIndex, photos.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % photos.length);
  }, [activeIndex, photos.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-[#0A0C10]/92 backdrop-blur-md flex items-center justify-center px-4 py-8 md:px-10"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-5 right-5 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors z-10 p-2.5 rounded-full hover:bg-white/10"
        >
          <X size={24} />
        </button>

        <button
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2 md:p-3 rounded-full hover:bg-white/10"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2 md:p-3 rounded-full hover:bg-white/10"
        >
          <ChevronRight size={26} />
        </button>

        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
            style={{
              aspectRatio: `${photo.width} / ${photo.height}`,
              maxHeight: "72vh",
            }}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.description || "Apertura Club photograph"}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {(photo.photographerName || photo.description || photo.category) && (
            <div className="mt-5 glass-dark rounded-2xl px-6 py-3.5 text-center max-w-md">
              {photo.photographerName && (
                <p className="text-white text-sm font-medium">
                  {photo.photographerName}
                </p>
              )}
              {photo.description && (
                <p className="text-white/60 text-xs mt-1">
                  {photo.description}
                </p>
              )}
              <span
                className="inline-block mt-2 text-[10px] tracking-[0.25em] uppercase text-white/40"
                style={{ fontFamily: "var(--font-mono-label)" }}
              >
                {CATEGORY_LABELS[photo.category]} · {activeIndex + 1} / {photos.length}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
