"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const navItems: NavItem[] = [

  {
    label: "Profile",
    href: "/admin/dashboard/profile",
    icon: "👤",
  },
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "⌂",
  },

  {
    label: "Employees",
    href: "/admin/dashboard/employees",
    icon: "▣",
  },
  {
    label: "Students",
    href: "/admin/dashboard/students",
    icon: "♢",
  },
  {
    label: "Courses",
    href: "/admin/dashboard/courses",
    icon: "▤",
  },
  {
    label: "Coupons",
    href: "/admin/dashboard/coupons",
    icon: "🏷️",
  },
  {
    label: "Assignments",
    href: "/admin/dashboard/assignments",
    icon: "♧",
  },
  {
    label: "Attendance",
    href: "/admin/dashboard/attendance",
    icon: "✓",
  },


];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  function logout() {
    localStorage.removeItem("hikoo_token");
    localStorage.removeItem("hikoo_role");
    localStorage.removeItem("hikoo_name");
    localStorage.removeItem("hikoo_email");

    setMobileOpen(false);

    router.replace("/admin/login");
  }

  function navigate(href: string) {
    setMobileOpen(false);
    router.push(href);
  }

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-50
          hidden
          w-[330px]
          flex-col
          border-r
          border-slate-200
          bg-white
          lg:flex
        "
      >
        {/* ===================================================
            BRAND
        ==================================================== */}
        <div className="flex h-[76px] shrink-0 items-center border-b border-slate-100 px-7">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#0b1220]
                text-sm
                font-bold
                text-white
              "
            >
              H
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-slate-950">
                HIKOO
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Admin Portal
              </div>
            </div>
          </Link>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}
        <nav className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Management
          </p>

          <div className="space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group
                    flex
                    items-center
                    gap-4
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      active
                        ? "bg-[#0b1220] text-white shadow-md shadow-slate-900/10"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-base
                      ${
                        active
                          ? "bg-white/10 text-white"
                          : "bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-slate-900"
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

          {/* =================================================
              ACCOUNT
          ================================================== */}
          {/* <div className="my-7 border-t border-slate-100" />

          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Account
          </p>

          <Link
            href="/admin/dashboard/profile"
            className={`
              group
              flex
              items-center
              gap-4
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              transition
              ${
                isActive("/admin/dashboard/profile")
                  ? "bg-[#0b1220] text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }
            `}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
              ○
            </span>

            <span>Profile</span>
          </Link>

          <Link
            href="/admin/settings"
            className={`
              mt-1.5
              flex
              items-center
              gap-4
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              transition
              ${
                isActive("/admin/settings")
                  ? "bg-[#0b1220] text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }
            `}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
              ⚙
            </span>

            <span>Settings</span>
          </Link> */}
        </nav>

        {/* ===================================================
            USER CARD
        ==================================================== */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-indigo-100
                text-sm
                font-bold
                text-indigo-700
              "
            >
              A
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {typeof window !== "undefined"
                  ? localStorage.getItem("hikoo_name") || "Admin"
                  : "Admin"}
              </p>

              <p className="truncate text-xs text-slate-400">
                {typeof window !== "undefined"
                  ? localStorage.getItem("hikoo_email") ||
                    "admin@hikoo.com"
                  : "admin@hikoo.com"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="
              mt-3
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-medium
              text-red-500
              transition
              hover:bg-red-50
            "
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-[290px]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          lg:hidden
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Mobile brand */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1220] text-sm font-bold text-white">
              H
            </div>

            <div>
              <div className="font-bold text-slate-950">
                HIKOO
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500">
                Admin Portal
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Management
          </p>

          <div className="space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-medium
                    ${
                      active
                        ? "bg-[#0b1220] text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="my-7 border-t border-slate-100" />

          <button
            type="button"
            onClick={() => navigate("/admin/dashboard/profile")}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
              ○
            </span>

            Profile
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/settings")}
            className="mt-1.5 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
              ⚙
            </span>

            Settings
          </button>
        </nav>

        <div className="shrink-0 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE MENU BUTTON ACCESS
      ====================================================== */}
      <button
        id="admin-mobile-menu-trigger"
        type="button"
        onClick={() => setMobileOpen(true)}
        className="hidden"
      >
        Open
      </button>
    </>
  );
}