import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutStrip from "@/components/AboutStrip";
import PhotoWall from "@/components/PhotoWall";
import FeaturedPhotos from "@/components/FeaturedPhotos";
import WhatWeCapture from "@/components/WhatWeCapture";
import Equipment from "@/components/Equipment";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutStrip />
        <PhotoWall />
        <FeaturedPhotos />
        <WhatWeCapture />
        <Equipment />
      </main>
      <Footer />
    </>
  );
}
