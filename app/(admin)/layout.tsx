import type { Metadata } from "next";

import SuperAdminSidebar from "@/components/admin/SuperAdminSidebar";
import SuperAdminHeader from "@/components/admin/SuperAdminHeader";

export const metadata: Metadata = {
  title: {
    default: "HIKOO Administration",
    template: "%s | HIKOO Administration",
  },
  description:
    "HIKOO Super Admin administration platform.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <SuperAdminSidebar />

      {/* Main Area */}
      <div className="min-h-screen lg:pl-[335px]">
        <SuperAdminHeader />

        <main className="min-h-[calc(100vh-86px)]">
          {children}
        </main>
      </div>
    </div>
  );
}