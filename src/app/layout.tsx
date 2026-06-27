import type { Metadata } from "next";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";

// NOTE: This sandbox has no network access to fonts.googleapis.com, so we use
// a refined system-font fallback stack here. On Vercel (full network access),
// swap this block for next/font/google, e.g.:
//
//   import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
//   const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: ["300","400","500","600"] });
//   const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
//   const mono = JetBrains_Mono({ variable: "--font-mono-label", subsets: ["latin"] });
//
// and apply `${fraunces.variable} ${inter.variable} ${mono.variable}` to the <html> className below.

export const metadata: Metadata = {
  title: "Apertura Club — Capturing Perspectives, One Frame at a Time.",
  description:
    "Apertura Club is a college photography club showcasing portraits, nature, campus life, and event photography captured by our members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col relative"
        style={
          {
            "--font-fraunces":
              "'Iowan Old Style', 'Palatino Linotype', Palatino, 'URW Palladio L', P052, serif",
            "--font-inter":
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            "--font-mono-label":
              "'SF Mono', 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
          } as React.CSSProperties
        }
      >
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
