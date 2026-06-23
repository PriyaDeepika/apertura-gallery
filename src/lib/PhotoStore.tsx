"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Photo, PhotoCategory } from "@/types/photo";
import { photos as seedPhotos } from "@/lib/data";

/**
 * Demo data store for the Admin Dashboard.
 *
 * This simulates the Firestore "photos" collection described in the spec.
 * Photos are persisted to localStorage purely so the demo survives a page
 * reload — it is NOT how the production app should work.
 *
 * To go live with real Firebase + Cloudinary:
 *   - addPhoto()    -> upload the file to Cloudinary, then
 *                      addDoc(collection(db, "photos"), { imageUrl, category, ... })
 *   - updatePhoto() -> updateDoc(doc(db, "photos", id), partial)
 *   - deletePhoto() -> deleteDoc(doc(db, "photos", id)) [+ delete from Cloudinary]
 *   - photos        -> sourced from onSnapshot(collection(db, "photos"))
 */

const STORAGE_KEY = "apertura-admin-photos-v1";

interface PhotoStoreContextValue {
  photos: Photo[];
  addPhoto: (input: {
    imageUrl: string;
    category: PhotoCategory;
    photographerName?: string;
    description?: string;
  }) => void;
  updatePhoto: (id: string, updates: Partial<Photo>) => void;
  deletePhoto: (id: string) => void;
}

const PhotoStoreContext = createContext<PhotoStoreContextValue | null>(null);

function loadInitialPhotos(): Photo[] {
  if (typeof window === "undefined") return seedPhotos;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedPhotos;
  } catch {
    return seedPhotos;
  }
}

export function PhotoStoreProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<Photo[]>(loadInitialPhotos);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch {
      // storage unavailable — demo continues in-memory only
    }
  }, [photos]);

  const addPhoto: PhotoStoreContextValue["addPhoto"] = (input) => {
    const newPhoto: Photo = {
      id: `local-${Date.now()}`,
      imageUrl: input.imageUrl,
      category: input.category,
      photographerName: input.photographerName || undefined,
      description: input.description || undefined,
      uploadDate: new Date().toISOString().slice(0, 10),
      width: 900,
      height: 1100,
    };
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const updatePhoto: PhotoStoreContextValue["updatePhoto"] = (id, updates) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePhoto: PhotoStoreContextValue["deletePhoto"] = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PhotoStoreContext.Provider
      value={{ photos, addPhoto, updatePhoto, deletePhoto }}
    >
      {children}
    </PhotoStoreContext.Provider>
  );
}

export function usePhotoStore() {
  const ctx = useContext(PhotoStoreContext);
  if (!ctx) {
    throw new Error("usePhotoStore must be used within PhotoStoreProvider");
  }
  return ctx;
}
