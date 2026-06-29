"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Equipment", href: "/#equipment" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:px-6 md:pt-5"
    >
      <nav
        className={`max-w-6xl mx-auto h-16 md:h-[68px] flex items-center justify-between rounded-full px-4 md:px-6 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-[0_8px_32px_-8px_rgba(20,24,31,0.14)]"
            : "glass"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/60 shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Apertura Club logo"
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span
            className="hidden sm:inline text-[0.95rem] tracking-[0.1em] font-medium text-[#14181F] uppercase"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Apertura
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm text-[#14181F]/80 hover:text-[#14181F] transition-colors tracking-wide rounded-full hover:bg-white/50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/gallery"
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full bg-[#14181F] text-white hover:bg-[#1F7A4D] transition-all duration-300 shadow-sm hover:shadow-[0_8px_24px_-6px_rgba(31,122,77,0.5)] hover:-translate-y-0.5"
        >
          Explore Gallery
        </Link>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden p-2 text-[#14181F] rounded-full hover:bg-white/50 transition-colors"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass-strong mt-2 mx-auto max-w-6xl rounded-3xl px-6 py-6 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-[#14181F]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className="text-sm font-medium px-5 py-3 rounded-full bg-[#14181F] text-white text-center"
            >
              Explore Gallery
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
