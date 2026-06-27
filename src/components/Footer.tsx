"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative px-4 md:px-6 pb-6 pt-10 md:pt-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-[2rem] md:rounded-[2.5rem] px-6 sm:px-10 md:px-14 pt-12 pb-8 relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-60"
            style={{ background: "var(--wash-blue)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full blur-3xl opacity-50"
            style={{ background: "var(--wash-amber)" }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/70 shadow-sm">
                  <Image
                    src="/images/logo.png"
                    alt="Apertura Club logo"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span
                  className="text-base tracking-[0.1em] uppercase text-[#14181F]"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Apertura Club
                </span>
              </div>
              <p className="text-sm text-[#5B6472] leading-relaxed max-w-xs">
                A college photography club. Capturing perspectives, one frame
                at a time.
              </p>
            </div>

            <div>
              <h4
                className="text-[11px] tracking-[0.25em] uppercase text-[#14181F] font-medium mb-4"
                style={{ fontFamily: "var(--font-mono-label)" }}
              >
                Explore
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/" className="text-sm text-[#5B6472] hover:text-[#2F6FED] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-sm text-[#5B6472] hover:text-[#2F6FED] transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/#equipment" className="text-sm text-[#5B6472] hover:text-[#2F6FED] transition-colors">
                    Equipment
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-sm text-[#5B6472] hover:text-[#2F6FED] transition-colors">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className="text-[11px] tracking-[0.25em] uppercase text-[#14181F] font-medium mb-4"
                style={{ fontFamily: "var(--font-mono-label)" }}
              >
                Contact
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2 text-sm text-[#5B6472]">
                  <Mail size={15} className="text-[#9098A6]" />
                  apertura.club@college.edu
                </li>
                <li className="flex items-center gap-2 text-sm text-[#5B6472]">
                  <MapPin size={15} className="text-[#9098A6]" />
                  Student Activity Center, Room 214
                </li>
              </ul>
              <div className="flex items-center gap-3 mt-5">
                <a
                  href="#"
                  aria-label="Apertura Club on Instagram"
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#5B6472] hover:text-[#2F6FED] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  aria-label="Apertura Club on Twitter"
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#5B6472] hover:text-[#2F6FED] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#9098A6]">
              © {new Date().getFullYear()} Apertura Club. All photographs
              belong to their respective photographers.
            </p>
            <p className="text-xs text-[#9098A6]">Photography Club</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
