"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "ADMIN") {
      router.replace("/admin/auth/login");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

          <p className="mt-4 text-sm text-slate-500">
            Loading Admin Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-950">
      {/* =====================================================
          FIXED SIDEBAR
      ====================================================== */}
      <AdminSidebar />

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}
      <div className="min-h-screen lg:pl-[330px]">
        {/* FIXED HEADER */}
        <AdminHeader />

        {/* ===================================================
            SCROLLABLE CONTENT ONLY
        ==================================================== */}
        <main
          className="
            h-screen
            overflow-y-auto
            pt-[76px]
          "
        >
          <div className="min-h-full px-5 py-6 sm:px-7 lg:px-10 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}