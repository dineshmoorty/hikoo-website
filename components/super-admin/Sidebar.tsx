"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MenuItem {
  name: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/super-admin/dashboard",
    icon: "⌂",
  },
  {
    name: "Admins",
    href: "/super-admin/dashboard/admins",
    icon: "👥",
  },
  {
    name: "Employees",
    href: "/super-admin/dashboard/employees",
    icon: "💼",
  },
  {
    name: "Students",
    href: "/super-admin/dashboard/students",
    icon: "🎓",
  },
  {
    name: "Assignments",
    href: "/super-admin/dashboard/assignments",
    icon: "🎓",
  },
  {
    name: "Courses",
    href: "/super-admin/dashboard/courses",
    icon: "📚",
  },
  {
    name: "Attendance",
    href: "/super-admin/dashboard/attendance",
    icon: "✓",
  },
  {
    name: "Internships",
    href: "/super-admin/dashboard/internships",
    icon: "💻",
  },
  {
    name: "Certificates",
    href: "/super-admin/dashboard/certificates",
    icon: "🏆",
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [name, setName] = useState("Super Admin");
  const [email, setEmail] = useState("superadmin@hikoo.com");

  useEffect(() => {
    const storedName = localStorage.getItem("hikoo_name");
    const storedEmail = localStorage.getItem("hikoo_email");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  function logout() {
    localStorage.removeItem("hikoo_token");
    localStorage.removeItem("hikoo_role");
    localStorage.removeItem("hikoo_name");
    localStorage.removeItem("hikoo_email");

    router.push("/super-admin/login");
  }

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:w-64 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <Link
            href="/super-admin/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              H
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-slate-900">
                HIKOO
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Super Admin
              </div>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Management
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/super-admin/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                      isActive
                        ? "bg-white/10"
                        : "bg-slate-100 group-hover:bg-white"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-slate-100 p-3">
          <div className="mb-2 rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                {name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {name}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {email}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}