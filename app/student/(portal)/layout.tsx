"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import StudentHeader from "@/components/student/StudentHeader";
import StudentSidebar from "@/components/student/StudentSidebar";
import { getMyStudentProfile } from "@/services/StudentProfileService";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "STUDENT") {
      router.replace("/student/login");
      return;
    }

    // Profile page must remain accessible while the profile is incomplete.
    if (pathname === "/student/profile") {
      setChecking(false);
      return;
    }

    async function checkProfileCompletion() {
      try {
        const profile = await getMyStudentProfile();

        localStorage.setItem(
          "hikoo_profile_completed",
          String(profile.profileCompleted)
        );

        if (!profile.profileCompleted) {
          router.replace("/student/profile");
          return;
        }

        setChecking(false);
      } catch (error) {
        console.error("Failed to check student profile:", error);
        router.replace("/student/profile");
      }
    }

    checkProfileCompletion();
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          <p className="text-sm font-medium text-slate-500">
            Loading HIKOO...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <StudentSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 lg:ml-72">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
