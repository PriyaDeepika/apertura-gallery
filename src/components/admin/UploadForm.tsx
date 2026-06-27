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
      className="glass rounded-[1.75rem] p-6 md:p-8"
    >
      <h2
        className="text-xl text-[#14181F] mb-1"
        style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
      >
        Upload a Photo
      </h2>
      <p className="text-sm text-[#5B6472] mb-6">
        Only the image is required — everything else can be added later.
      </p>

      {/* Dropzone */}
      <label
        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors cursor-pointer overflow-hidden ${
          preview
            ? "border-transparent"
            : "border-[#C7CDD6] hover:border-[#2F6FED] bg-white/40"
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
            className="w-full h-[260px] object-cover rounded-xl"
          />
        ) : (
          <>
            <UploadCloud size={28} className="text-[#9098A6]" />
            <span className="text-sm text-[#5B6472]">
              Click to select a photo, or drag it here
            </span>
            <span className="text-xs text-[#9098A6]">JPG, PNG, or WEBP</span>
          </>
        )}
      </label>

      {preview && (
        <button
          type="button"
          onClick={reset}
          className="text-xs text-[#5B6472] hover:text-[#2F6FED] mt-2"
        >
          Choose a different photo
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">
            Category <span className="text-[#9098A6]">(optional)</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as PhotoCategory)}
            className="w-full rounded-xl border border-white/60 bg-white/60 px-3.5 py-2.5 text-sm text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]/40 focus:border-[#2F6FED]"
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
            Photographer Name <span className="text-[#9098A6]">(optional)</span>
          </label>
          <input
            type="text"
            value={photographerName}
            onChange={(e) => setPhotographerName(e.target.value)}
            placeholder="e.g. Ananya Rao"
            className="w-full rounded-xl border border-white/60 bg-white/60 px-3.5 py-2.5 text-sm text-[#14181F] placeholder:text-[#9098A6] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]/40 focus:border-[#2F6FED]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-[#374151] mb-1.5">
            Description <span className="text-[#9098A6]">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Golden hour, Block C lawns"
            rows={2}
            className="w-full rounded-xl border border-white/60 bg-white/60 px-3.5 py-2.5 text-sm text-[#14181F] placeholder:text-[#9098A6] focus:outline-none focus:ring-2 focus:ring-[#2F6FED]/40 focus:border-[#2F6FED] resize-none"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#14181F] text-white text-sm font-medium hover:bg-[#2F6FED] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
