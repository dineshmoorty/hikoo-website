"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getMyAdminProfile } from "@/services/AdminProfileService";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    // Authentication check
    if (!token || role !== "ADMIN") {
      router.replace("/admin/login");
      return;
    }

    // Profile page must always remain accessible
    // so the Admin can complete the profile.
    if (pathname === "/admin/dashboard/profile") {
      setReady(true);
      return;
    }

    async function checkProfileCompletion() {
      try {
        const profile = await getMyAdminProfile();

        localStorage.setItem(
          "hikoo_profile_completed",
          String(profile.profileCompleted)
        );

        // Profile is incomplete -> only profile page is accessible
        if (!profile.profileCompleted) {
          router.replace("/admin/dashboard/profile");
          return;
        }

        // Profile completed -> allow dashboard pages
        setReady(true);
      } catch (error) {
        console.error("Failed to check admin profile:", error);

        // If profile cannot be verified,
        // send Admin to profile page.
        router.replace("/admin/dashboard/profile");
      }
    }

    checkProfileCompletion();
  }, [pathname, router]);

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