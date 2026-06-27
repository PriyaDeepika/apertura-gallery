import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadForm from "@/components/admin/UploadForm";
import PhotoManager from "@/components/admin/PhotoManager";
import { PhotoStoreProvider } from "@/lib/PhotoStore";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span
              className="text-[11px] tracking-[0.35em] uppercase text-[#2F6FED] font-medium"
              style={{ fontFamily: "var(--font-mono-label)" }}
            >
              Admin
            </span>
            <h1
              className="text-4xl md:text-5xl mt-3 text-[#14181F] tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
            >
              Dashboard
            </h1>
            <p className="text-sm text-[#5B6472] mt-3">
              Upload, edit, or remove photographs. Changes appear in the
              gallery immediately — no code changes required.
            </p>
          </div>

          <PhotoStoreProvider>
            <div className="space-y-6">
              <UploadForm />
              <PhotoManager />
            </div>
          </PhotoStoreProvider>

          <p className="text-xs text-[#9098A6] mt-8 text-center">
            This demo dashboard stores changes in your browser only. In
            production, uploads go to Cloudinary and metadata is saved to
            Firebase Firestore — see the comments in{" "}
            <code className="text-[#5B6472]">src/lib/PhotoStore.tsx</code>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
