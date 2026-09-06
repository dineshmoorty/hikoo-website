import { ReactNode } from "react";

import Sidebar from "@/components/employee/Sidebar";
import Header from "@/components/employee/Header";

interface EmployeeDashboardLayoutProps {
  children: ReactNode;
}

export default function EmployeeDashboardLayout({
  children,
}: EmployeeDashboardLayoutProps) {
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