"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { Photo, PhotoCategory, CATEGORY_LABELS } from "@/types/photo";
import { usePhotoStore } from "@/lib/PhotoStore";

const CATEGORY_OPTIONS: PhotoCategory[] = [
  "portraits",
  "nature",
  "campus-life",
  "events",
];

function EditRow({ photo, onDone }: { photo: Photo; onDone: () => void }) {
  const { updatePhoto } = usePhotoStore();
  const [photographerName, setPhotographerName] = useState(
    photo.photographerName || ""
  );
  const [description, setDescription] = useState(photo.description || "");
  const [category, setCategory] = useState<PhotoCategory>(photo.category);

  const save = () => {
    updatePhoto(photo.id, {
      photographerName: photographerName.trim() || undefined,
      description: description.trim() || undefined,
      category,
    });
    onDone();
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center bg-white/60 rounded-xl p-3">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as PhotoCategory)}
        className="rounded-lg border border-white/60 px-2.5 py-2 text-xs bg-white/80"
      >
        {CATEGORY_OPTIONS.map((c) => (
          <option key={c} value={c}>
            {CATEGORY_LABELS[c]}
          </option>
        ))}
      </select>
      <input
        value={photographerName}
        onChange={(e) => setPhotographerName(e.target.value)}
        placeholder="Photographer name"
        className="flex-1 rounded-lg border border-white/60 bg-white/80 px-2.5 py-2 text-xs"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="flex-1 rounded-lg border border-white/60 bg-white/80 px-2.5 py-2 text-xs"
      />
      <div className="flex gap-2 self-end md:self-auto">
        <button
          onClick={save}
          aria-label="Save changes"
          className="w-8 h-8 rounded-full bg-[#1F7A4D] text-white flex items-center justify-center hover:bg-[#145C39] transition-colors"
        >
          <Check size={14} />
        </button>
        <button
          onClick={onDone}
          aria-label="Cancel"
          className="w-8 h-8 rounded-full bg-white border border-white/60 text-[#5B6472] flex items-center justify-center hover:text-[#14181F] transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default function PhotoManager() {
  const { photos, deletePhoto } = usePhotoStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  return (
    <div className="glass rounded-[1.75rem] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-xl text-[#14181F]"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
        >
          Manage Photos
        </h2>
        <span className="text-xs text-[#9098A6]">{photos.length} total</span>
      </div>

      {photos.length === 0 ? (
        <p className="text-sm text-[#5B6472] py-10 text-center">
          No photos yet. Upload your first one above.
        </p>
      ) : (
        <div className="space-y-3">
          {photos.map((photo) => (
            <div key={photo.id}>
              {editingId === photo.id ? (
                <EditRow photo={photo} onDone={() => setEditingId(null)} />
              ) : (
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white/60">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.description || "Photo"}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#1F7A4D] bg-[var(--wash-green)] px-2 py-0.5 rounded-full">
                        {CATEGORY_LABELS[photo.category]}
                      </span>
                      {photo.photographerName && (
                        <span className="text-sm text-[#14181F] truncate">
                          {photo.photographerName}
                        </span>
                      )}
                    </div>
                    {photo.description && (
                      <p className="text-xs text-[#5B6472] truncate mt-1">
                        {photo.description}
                      </p>
                    )}
                  </div>

                  {confirmDeleteId === photo.id ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5B6472]">Delete?</span>
                      <button
                        onClick={() => {
                          deletePhoto(photo.id);
                          setConfirmDeleteId(null);
                        }}
                        className="text-xs font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-xs text-[#5B6472] hover:text-[#14181F] px-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setEditingId(photo.id)}
                        aria-label="Edit photo info"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6472] hover:text-[#1F7A4D] hover:bg-[var(--wash-green)] transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(photo.id)}
                        aria-label="Delete photo"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6472] hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
