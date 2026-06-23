import { Photo, CameraEquipment } from "@/types/photo";

/**
 * This file simulates the Firestore "photos" collection and the
 * Cloudinary-hosted image URLs described in the project spec.
 *
 * To go live:
 *  1. Replace this static array with a Firestore query, e.g.
 *       const snap = await getDocs(collection(db, "photos"));
 *  2. Replace imageUrl values with Cloudinary delivery URLs.
 *  3. Keep the Photo shape identical so every component below
 *     keeps working without changes.
 */

export const photos: Photo[] = [
  { id: "p1", imageUrl: "/images/gallery/portrait-1.jpg", category: "portraits", photographerName: "Ananya Rao", description: "Golden hour, Block C lawns", uploadDate: "2026-02-14", width: 900, height: 1200, featured: true },
  { id: "p2", imageUrl: "/images/gallery/portrait-2.jpg", category: "portraits", photographerName: "Devika Menon", description: "Library steps portrait series", uploadDate: "2026-02-02", width: 900, height: 1050 },
  { id: "p3", imageUrl: "/images/gallery/portrait-3.jpg", category: "portraits", photographerName: "Rohan Iyer", uploadDate: "2026-01-22", width: 900, height: 1300 },
  { id: "p4", imageUrl: "/images/gallery/portrait-4.jpg", category: "portraits", photographerName: "Ananya Rao", description: "Candid, Fine Arts corridor", uploadDate: "2026-03-01", width: 900, height: 1000 },
  { id: "p5", imageUrl: "/images/gallery/portrait-5.jpg", category: "portraits", photographerName: "Sahil Verma", uploadDate: "2026-03-10", width: 900, height: 1150 },

  { id: "n1", imageUrl: "/images/gallery/nature-1.jpg", category: "nature", photographerName: "Meera Pillai", description: "Banyan tree, main quad", uploadDate: "2026-02-18", width: 900, height: 700, featured: true },
  { id: "n2", imageUrl: "/images/gallery/nature-2.jpg", category: "nature", photographerName: "Kabir Singh", uploadDate: "2026-01-30", width: 900, height: 1100 },
  { id: "n3", imageUrl: "/images/gallery/nature-3.jpg", category: "nature", description: "Monsoon clouds over the hostel block", uploadDate: "2026-03-05", width: 900, height: 950 },
  { id: "n4", imageUrl: "/images/gallery/nature-4.jpg", category: "nature", photographerName: "Meera Pillai", uploadDate: "2026-02-25", width: 900, height: 1250 },
  { id: "n5", imageUrl: "/images/gallery/nature-5.jpg", category: "nature", photographerName: "Arjun Nair", description: "Botanical garden, early light", uploadDate: "2026-01-15", width: 900, height: 650 },

  { id: "c1", imageUrl: "/images/gallery/campus-1.jpg", category: "campus-life", photographerName: "Priya Das", description: "Late study night, central library", uploadDate: "2026-02-20", width: 900, height: 1000, featured: true },
  { id: "c2", imageUrl: "/images/gallery/campus-2.jpg", category: "campus-life", photographerName: "Vikram Shetty", uploadDate: "2026-01-28", width: 900, height: 1200 },
  { id: "c3", imageUrl: "/images/gallery/campus-3.jpg", category: "campus-life", description: "Morning rush, main corridor", uploadDate: "2026-03-08", width: 900, height: 750 },
  { id: "c4", imageUrl: "/images/gallery/campus-4.jpg", category: "campus-life", photographerName: "Priya Das", uploadDate: "2026-02-11", width: 900, height: 1100 },
  { id: "c5", imageUrl: "/images/gallery/campus-5.jpg", category: "campus-life", photographerName: "Aditya Kulkarni", description: "Cricket nets at dusk", uploadDate: "2026-01-19", width: 900, height: 950 },

  { id: "e1", imageUrl: "/images/gallery/events-1.jpg", category: "events", photographerName: "Tara Joseph", description: "Annual cultural fest, opening night", uploadDate: "2026-03-12", width: 900, height: 1150, featured: true },
  { id: "e2", imageUrl: "/images/gallery/events-2.jpg", category: "events", photographerName: "Tara Joseph", uploadDate: "2026-02-08", width: 900, height: 800 },
  { id: "e3", imageUrl: "/images/gallery/events-3.jpg", category: "events", description: "Inter-college photography meet", uploadDate: "2026-01-25", width: 900, height: 1250 },
  { id: "e4", imageUrl: "/images/gallery/events-4.jpg", category: "events", photographerName: "Nikhil Bhat", uploadDate: "2026-03-15", width: 900, height: 1000 },
  { id: "e5", imageUrl: "/images/gallery/events-5.jpg", category: "events", photographerName: "Tara Joseph", description: "Graduation day, Block A steps", uploadDate: "2026-02-28", width: 900, height: 700 },
];

export const featuredPhotos: Photo[] = [
  { id: "f1", imageUrl: "/images/gallery/featured-1.jpg", category: "portraits", photographerName: "Ananya Rao", description: "Golden hour, Block C lawns", uploadDate: "2026-02-14", width: 1200, height: 1500 },
  { id: "f2", imageUrl: "/images/gallery/featured-2.jpg", category: "nature", photographerName: "Meera Pillai", description: "Banyan tree, main quad", uploadDate: "2026-02-18", width: 1400, height: 1000 },
  { id: "f3", imageUrl: "/images/gallery/featured-3.jpg", category: "campus-life", photographerName: "Priya Das", description: "Late study night, central library", uploadDate: "2026-02-20", width: 1200, height: 1400 },
  { id: "f4", imageUrl: "/images/gallery/featured-4.jpg", category: "events", photographerName: "Tara Joseph", description: "Annual cultural fest, opening night", uploadDate: "2026-03-12", width: 1400, height: 1050 },
  { id: "f5", imageUrl: "/images/gallery/featured-5.jpg", category: "nature", photographerName: "Arjun Nair", description: "Botanical garden, early light", uploadDate: "2026-01-15", width: 1200, height: 1500 },
  { id: "f6", imageUrl: "/images/gallery/featured-6.jpg", category: "portraits", photographerName: "Sahil Verma", uploadDate: "2026-03-10", width: 1400, height: 1000 },
];

export const equipment: CameraEquipment[] = [
  { id: "eq1", name: "Canon EOS R6 Mark II", description: "Our primary body for portraits and low-light events — 40fps burst, Dual Pixel CMOS AF II, and reliable in any campus lighting condition.", imageUrl: "/images/equipment/camera-1.jpg" },
  { id: "eq2", name: "Sony Alpha A7 IV", description: "Hybrid full-frame body for both stills and short-form video — 33MP BSI sensor, 4K 60p, and superb dynamic range for outdoor shoots.", imageUrl: "/images/equipment/camera-2.jpg" },
];
