import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadForm from "@/components/admin/UploadForm";
import PhotoManager from "@/components/admin/PhotoManager";
import { PhotoStoreProvider } from "@/lib/PhotoStore";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6 md:px-10 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="text-xs tracking-[0.3em] uppercase text-[#2563EB] font-medium">
              Admin
            </span>
            <h1
              className="text-3xl md:text-4xl mt-3 text-[#111827]"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
            >
              Dashboard
            </h1>
            <p className="text-sm text-[#6B7280] mt-3">
              Upload, edit, or remove photographs. Changes appear in the
              gallery immediately — no code changes required.
            </p>
          </div>

          <PhotoStoreProvider>
            <div className="space-y-8">
              <UploadForm />
              <PhotoManager />
            </div>
          </PhotoStoreProvider>

          <p className="text-xs text-[#9CA3AF] mt-8 text-center">
            This demo dashboard stores changes in your browser only. In
            production, uploads go to Cloudinary and metadata is saved to
            Firebase Firestore — see the comments in{" "}
            <code className="text-[#6B7280]">src/lib/PhotoStore.tsx</code>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
