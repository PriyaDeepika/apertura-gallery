"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_1px_0_0_#E5E9F0]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-black/5">
            <Image
              src="/images/logo.png"
              alt="Apertura Club logo"
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span
            className="text-[1.05rem] tracking-[0.12em] font-medium text-[#111827] uppercase"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Apertura Club
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#374151] hover:text-[#2563EB] transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/gallery"
            className="text-sm font-medium px-5 py-2.5 rounded-full bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors shadow-sm hover:shadow-md"
          >
            Explore Gallery
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden p-2 text-[#111827]"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-[#E5E9F0] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base text-[#111827]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/gallery"
            onClick={() => setOpen(false)}
            className="text-sm font-medium px-5 py-3 rounded-full bg-[#2563EB] text-white text-center"
          >
            Explore Gallery
          </Link>
        </div>
      )}
    </header>
  );
}
