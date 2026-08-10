import { Suspense } from "react";
import InternshipApplyContent from "./InternshipApplyContent";

export default function InternshipApplyPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse">
              <div className="h-4 w-32 rounded bg-gray-200" />

              <div className="mt-8 h-12 max-w-xl rounded bg-gray-200" />

              <div className="mt-4 h-5 max-w-2xl rounded bg-gray-100" />

              <div className="mt-10 h-32 rounded-3xl bg-gray-100" />

              <div className="mt-8 h-[500px] rounded-[2rem] bg-gray-100" />
            </div>
          </div>
        </main>
      }
    >
      <InternshipApplyContent />
    </Suspense>
  );
}