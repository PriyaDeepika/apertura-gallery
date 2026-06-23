import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E5E9F0] px-6 md:px-10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
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
                className="text-base tracking-[0.1em] uppercase text-[#111827]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Apertura Club
              </span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs">
              A college photography club. Capturing perspectives, one frame
              at a time.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#111827] font-medium mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#equipment" className="text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">
                  Equipment
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#111827] font-medium mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Mail size={15} className="text-[#9CA3AF]" />
                apertura.club@college.edu
              </li>
              <li className="flex items-center gap-2 text-sm text-[#6B7280]">
                <MapPin size={15} className="text-[#9CA3AF]" />
                Student Activity Center, Room 214
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Apertura Club on Instagram"
                className="w-9 h-9 rounded-full bg-white border border-[#E5E9F0] flex items-center justify-center text-[#6B7280] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Apertura Club on Twitter"
                className="w-9 h-9 rounded-full bg-white border border-[#E5E9F0] flex items-center justify-center text-[#6B7280] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E9F0] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#9CA3AF]">
            © {new Date().getFullYear()} Apertura Club. All photographs
            belong to their respective photographers.
          </p>
          <p className="text-xs text-[#9CA3AF]">Photography Club</p>
        </div>
      </div>
    </footer>
  );
}
