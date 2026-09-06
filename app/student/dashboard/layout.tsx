"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StudentHeader from "@/components/student/StudentHeader";
import StudentSidebar from "@/components/student/StudentSidebar";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "STUDENT") {
      router.replace("/student/login");
      return;
    }

    setChecking(false);
  }, [router]);

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
      {/* Header */}
      <StudentHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* Sidebar */}
        <StudentSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="min-w-0 flex-1 lg:ml-72">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}