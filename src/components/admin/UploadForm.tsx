"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, CheckCircle2 } from "lucide-react";
import { PhotoCategory, CATEGORY_LABELS } from "@/types/photo";
import { usePhotoStore } from "@/lib/PhotoStore";

const CATEGORY_OPTIONS: PhotoCategory[] = [
  "portraits",
  "nature",
  "campus-life",
  "events",
];

export default function UploadForm() {
  const { addPhoto } = usePhotoStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [photographerName, setPhotographerName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<PhotoCategory>("campus-life");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setPreview(null);
    setPhotographerName("");
    setDescription("");
    setCategory("campus-life");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) {
      setError("An image is required to upload a photo.");
      return;
    }
    setUploading(true);
    setError(null);

    // In production: upload `preview`'s source File to Cloudinary here,
    // then call addPhoto with the returned secure_url instead of the
    // base64 data URL.
    await new Promise((res) => setTimeout(res, 700));

    addPhoto({
      imageUrl: preview,
      category,
      photographerName: photographerName.trim() || undefined,
      description: description.trim() || undefined,
    });

    setUploading(false);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#E5E9F0] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
    >
      <h2
        className="text-xl text-[#111827] mb-1"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
      >
        Upload a Photo
      </h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Only the image is required — everything else can be added later.
      </p>

      {/* Dropzone */}
      <label
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors cursor-pointer overflow-hidden ${
          preview
            ? "border-transparent"
            : "border-[#CBD5E1] hover:border-[#2563EB] bg-[#F8FAFC]"
        }`}
        style={{ minHeight: 220 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Selected preview"
            className="w-full h-[260px] object-cover"
          />
        ) : (
          <>
            <UploadCloud size={28} className="text-[#9CA3AF]" />
            <span className="text-sm text-[#6B7280]">
              Click to select a photo, or drag it here
            </span>
            <span className="text-xs text-[#9CA3AF]">JPG, PNG, or WEBP</span>
          </>
        )}
      </label>

      {preview && (
        <button
          type="button"
          onClick={reset}
          className="text-xs text-[#6B7280] hover:text-[#2563EB] mt-2"
        >
          Choose a different photo
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">
            Category <span className="text-[#9CA3AF]">(optional)</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as PhotoCategory)}
            className="w-full rounded-lg border border-[#E5E9F0] px-3.5 py-2.5 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">
            Photographer Name <span className="text-[#9CA3AF]">(optional)</span>
          </label>
          <input
            type="text"
            value={photographerName}
            onChange={(e) => setPhotographerName(e.target.value)}
            placeholder="e.g. Ananya Rao"
            className="w-full rounded-lg border border-[#E5E9F0] px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-[#374151] mb-1.5">
            Description <span className="text-[#9CA3AF]">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Golden hour, Block C lawns"
            rows={2}
            className="w-full rounded-lg border border-[#E5E9F0] px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] resize-none"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Uploading…
          </>
        ) : success ? (
          <>
            <CheckCircle2 size={16} />
            Added to gallery
          </>
        ) : (
          "Upload Photo"
        )}
      </button>
    </form>
  );
}
