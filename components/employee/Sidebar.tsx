"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    label: "Profile",
    href: "/employee/dashboard/profile",
    icon: "●",
  },
  {
    label: "Dashboard",
    href: "/employee/dashboard",
    icon: "⌂",
  },
  {
    label: "Students",
    href: "/employee/dashboard/students",
    icon: "♙",
  },
  {
    label: "Attendance",
    href: "/employee/dashboard/attendance",
    icon: "✓",
  },
  // {
  //   label: "Courses",
  //   href: "/employee/dashboard/courses",
  //   icon: "▣",
  // },
  {
    label: "Internships",
    href: "/employee/dashboard/internships",
    icon: "◆",
  },
  {
    label: "Certificates",
    href: "/employee/dashboard/certificates",
    icon: "◇",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-900 shadow-sm transition hover:bg-gray-50 lg:hidden"
      >
        ☰
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[280px] max-w-[85vw] flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-300 ease-out
          lg:w-64
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 px-5">
          <Link
            href="/employee/dashboard"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-sm font-bold text-white">
              H
            </div>

            <div>
              <p className="text-lg font-semibold tracking-tight text-gray-950">
                HIKOO
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                Employee
              </p>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-base text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            Workspace
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/employee/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition
                    ${
                      isActive
                        ? "bg-gray-950 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-lg text-sm
                      ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="shrink-0 border-t border-gray-100 p-4">
          <div className="rounded-xl bg-gray-50 px-4 py-3">
            <p className="text-xs font-medium text-gray-400">
              Signed in as
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              Employee
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}