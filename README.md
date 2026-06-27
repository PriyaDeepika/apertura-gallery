# Apertura Club — Photography Website

A modern, responsive photography club website built with Next.js, TypeScript, and Tailwind CSS, matching the Apertura Club brief: a light, premium, photography-first portfolio site with a masonry gallery and a simple admin upload workflow.

## Glassmorphism redesign (latest pass)

The frontend was redesigned with a glassmorphism visual system on top of the original structure: a pastel ambient background, frosted-glass navbar/cards/footer, a parallax hero, Framer Motion scroll-reveal and hover animations, and an editorial mixed-aspect-ratio layout for Featured Moments and the gallery. Backend logic (Firebase, Cloudinary, auth) was intentionally left untouched — this was a frontend/styling-only pass.

**Performance note:** an earlier version of this redesign animated ~10 blurred ambient shapes via Framer Motion's `useScroll`, sitting underneath multiple `backdrop-filter: blur()` glass panels. That combination forces the browser into expensive offscreen compositing on every scroll frame and can spike CPU/fans on less powerful machines. It's been replaced with a small, fixed set of CSS-only animated blobs (no JS scroll-tracking) and lighter `backdrop-filter` values. If you ever add more glass panels or background effects, keep an eye on stacking `filter`/`backdrop-filter` blur on elements that animate every frame — that combination is the expensive one.

## What's included

- **Home page** — full-screen hero with floating logo + aperture-ring motif, Featured Moments grid, "What We Capture" category cards, Equipment section, footer.
- **Gallery page** (`/gallery`) — Pinterest-style masonry layout, category filters (All / Portraits / Nature / Campus Life / Events), fullscreen lightbox with keyboard navigation (←/→/Esc), and graceful hiding of optional photographer/description fields.
- **Admin dashboard** (`/admin`) — upload form (only the image is required; category, photographer name, and description are optional), plus a list view to edit or delete existing photos. No code changes are needed to add or remove photos.
- Scroll-triggered fade-ins, smooth hover/zoom effects, and a slow floating animation on the hero logo.
- Color palette, type scale, and section structure follow the brief's spec exactly (`#FFFFFF` / `#F8FAFC` / `#2563EB` / `#111827` / `#6B7280`, light theme only).

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Important: placeholder images & fonts

This build was created in a sandboxed environment without access to Unsplash or Google Fonts, so two things are simulated and should be swapped before you consider this "done":

1. **Photos** — `public/images/gallery/*.jpg` and `public/images/equipment/*.jpg` are generated gradient placeholders (color-graded per category) rather than real photographs, sized with the correct aspect ratios for the masonry layout. Replace them with real club photos, or once Cloudinary is wired up, replace the `imageUrl` values in `src/lib/data.ts` with real Cloudinary URLs.
2. **Fonts** — `src/app/layout.tsx` currently uses a system-font fallback stack instead of `next/font/google`. On Vercel (which has full network access), swap in the real fonts:

   ```tsx
   import { Fraunces, Inter } from "next/font/google";
   const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: ["300","400","500","600"] });
   const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
   ```

   then apply `${fraunces.variable} ${inter.variable}` to the `<html>` className.

## Connecting real Firebase + Cloudinary

The whole app is already shaped around this architecture — only the data layer needs to change.

- **`src/lib/data.ts`** — currently a static array simulating the Firestore `photos` collection. Replace with a Firestore query:
  ```ts
  const snap = await getDocs(collection(db, "photos"));
  const photos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  ```
- **`src/lib/PhotoStore.tsx`** — the admin dashboard's CRUD logic. Each function has a comment showing the real Firebase/Cloudinary call it should make:
  - `addPhoto()` → upload to Cloudinary, then `addDoc(collection(db, "photos"), {...})`
  - `updatePhoto()` → `updateDoc(doc(db, "photos", id), partial)`
  - `deletePhoto()` → `deleteDoc(doc(db, "photos", id))`

  Right now this store persists to `localStorage` in the browser purely so the admin demo survives a page refresh — replace it with live Firestore reads (e.g. `onSnapshot`) for production.

## Project structure

```
src/
  app/
    page.tsx              → home page
    gallery/page.tsx       → gallery page
    admin/page.tsx         → admin dashboard
    globals.css            → design tokens, animations
  components/
    Hero.tsx, FeaturedPhotos.tsx, WhatWeCapture.tsx,
    Equipment.tsx, Footer.tsx, Navbar.tsx
    MasonryGallery.tsx, Lightbox.tsx, Reveal.tsx
    admin/UploadForm.tsx, admin/PhotoManager.tsx
  lib/
    data.ts                → mock Firestore data
    PhotoStore.tsx          → admin CRUD store
    useReveal.ts            → scroll fade-in hook
  types/
    photo.ts                → Photo / CameraEquipment types
```

## Deploying

This is a standard Next.js App Router project — deploy to Vercel by pushing to a Git repo and importing it, or running `vercel` from this directory.
