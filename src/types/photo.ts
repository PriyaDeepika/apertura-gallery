export type PhotoCategory = "portraits" | "nature" | "campus-life" | "events";

export interface Photo {
  id: string;
  imageUrl: string;
  category: PhotoCategory;
  photographerName?: string;
  description?: string;
  uploadDate: string; // ISO date
  width: number;
  height: number;
  featured?: boolean;
}

export interface CameraEquipment {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const CATEGORY_LABELS: Record<PhotoCategory, string> = {
  portraits: "Portraits",
  nature: "Nature",
  "campus-life": "Campus Life",
  events: "Events",
};
