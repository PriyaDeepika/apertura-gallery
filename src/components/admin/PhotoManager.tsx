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
    <div className="flex flex-col md:flex-row gap-3 md:items-center bg-[#EFF4FE] rounded-xl p-3">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as PhotoCategory)}
        className="rounded-lg border border-[#E5E9F0] px-2.5 py-2 text-xs bg-white"
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
        className="flex-1 rounded-lg border border-[#E5E9F0] px-2.5 py-2 text-xs"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="flex-1 rounded-lg border border-[#E5E9F0] px-2.5 py-2 text-xs"
      />
      <div className="flex gap-2 self-end md:self-auto">
        <button
          onClick={save}
          aria-label="Save changes"
          className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-[#1d4ed8]"
        >
          <Check size={14} />
        </button>
        <button
          onClick={onDone}
          aria-label="Cancel"
          className="w-8 h-8 rounded-full bg-white border border-[#E5E9F0] text-[#6B7280] flex items-center justify-center hover:text-[#111827]"
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
    <div className="bg-white rounded-2xl border border-[#E5E9F0] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-xl text-[#111827]"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
        >
          Manage Photos
        </h2>
        <span className="text-xs text-[#9CA3AF]">{photos.length} total</span>
      </div>

      {photos.length === 0 ? (
        <p className="text-sm text-[#6B7280] py-10 text-center">
          No photos yet. Upload your first one above.
        </p>
      ) : (
        <div className="space-y-3">
          {photos.map((photo) => (
            <div key={photo.id}>
              {editingId === photo.id ? (
                <EditRow photo={photo} onDone={() => setEditingId(null)} />
              ) : (
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#F1F5F9]">
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
                      <span className="text-xs font-medium text-[#2563EB] bg-[#EFF4FE] px-2 py-0.5 rounded-full">
                        {CATEGORY_LABELS[photo.category]}
                      </span>
                      {photo.photographerName && (
                        <span className="text-sm text-[#111827] truncate">
                          {photo.photographerName}
                        </span>
                      )}
                    </div>
                    {photo.description && (
                      <p className="text-xs text-[#6B7280] truncate mt-1">
                        {photo.description}
                      </p>
                    )}
                  </div>

                  {confirmDeleteId === photo.id ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#6B7280]">Delete?</span>
                      <button
                        onClick={() => {
                          deletePhoto(photo.id);
                          setConfirmDeleteId(null);
                        }}
                        className="text-xs font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-xs text-[#6B7280] hover:text-[#111827] px-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setEditingId(photo.id)}
                        aria-label="Edit photo info"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#2563EB] hover:bg-[#EFF4FE] transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(photo.id)}
                        aria-label="Delete photo"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-colors"
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
