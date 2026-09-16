"use client";

import { ReactNode, useEffect, useState , use } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMyEmployeeProfile } from "@/services/EmployeeProfileService";

import Sidebar from "@/components/employee/Sidebar";
import Header from "@/components/employee/Header";

interface EmployeeDashboardLayoutProps {
  children: ReactNode;
}

export default function EmployeeDashboardLayout({
  children,
}: EmployeeDashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");

    if (!token || role !== "EMPLOYEE") {
      router.replace("/employee/login");
      return;
    }

    // Profile page itself must remain accessible while completing the profile.
    if (pathname === "/employee/dashboard/profile") {
      setCheckingProfile(false);
      return;
    }

    async function checkProfileCompletion() {
      try {
        const profile = await getMyEmployeeProfile();

        localStorage.setItem(
          "hikoo_profile_completed",
          String(profile.profileCompleted)
        );

        if (!profile.profileCompleted) {
          router.replace("/employee/dashboard/profile");
          return;
        }

        setCheckingProfile(false);
      } catch (error) {
        console.error("Failed to check employee profile:", error);
        router.replace("/employee/dashboard/profile");
      }
    }

    checkProfileCompletion();
  }, [pathname, router]);

  if (checkingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <p className="text-sm text-gray-500">Checking profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f7f8fa]">

      <Sidebar />

      <div className="min-h-screen w-full lg:pl-64">

        <Header />

        <main className="w-full p-5 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}