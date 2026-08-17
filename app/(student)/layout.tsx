"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface StudentLayoutProps {
  children: ReactNode;
}

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },

  {
    name: "Course",
    href: "/student/course",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
    ),
  },

  {
    name: "Attendance",
    href: "/student/attendance",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M5 12.5 9.2 17 19 7" />
      </svg>
    ),
  },

  {
    name: "Certificate",
    href: "/student/certificate",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 3 14.2 5.2 17.2 5.1 18.3 8 20.8 9.5 19.7 12.3 20.8 15 18.3 16.5 17.2 19.4 14.2 19.3 12 21.5 9.8 19.3 6.8 19.4 5.7 16.5 3.2 15 4.3 12.3 3.2 9.5 5.7 8 6.8 5.1 9.8 5.2z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },

  {
    name: "Fees",
    href: "/student/fees",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 3v18" />
        <path d="M16 7.5c-.8-1-2-1.5-4-1.5-2.2 0-4 1.1-4 3s1.5 2.8 4 3.2 4 1.2 4 3.3-1.8 3-4 3c-2 0-3.4-.6-4.2-1.8" />
      </svg>
    ),
  },

  {
    name: "Profile",
    href: "/student/profile",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
];

/* =========================================================
   MENU ICON
========================================================= */

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

/* =========================================================
   CLOSE ICON
========================================================= */

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

/* =========================================================
   BELL ICON
========================================================= */

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

/* =========================================================
   SETTINGS ICON
========================================================= */

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="3" />

      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4.5v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.1H13v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

/* =========================================================
   LOGOUT ICON
========================================================= */

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M9 5H5v14h4" />
      <path d="M13 8l4 4-4 4" />
      <path d="M17 12H9" />
    </svg>
  );
}

/* =========================================================
   STUDENT SIDEBAR
========================================================= */

function StudentSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    // Close mobile sidebar first
    onClose();

    // Dummy logout for now
    router.push("/student/login");
  };

  return (
    <>
      {/* ==========================================
          MOBILE BACKDROP
      ========================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[280px] flex-col
          border-r border-black/[0.06]
          bg-white
          shadow-xl
          transition-transform duration-300 ease-out

          lg:w-64
          lg:translate-x-0
          lg:shadow-none

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ==========================================
            BRAND
        ========================================== */}

        <div className="flex h-24 shrink-0 items-center justify-between px-7">
          <Link
            href="/student/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-lg font-bold text-white shadow-lg">
              H
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-gray-950">
                HIKOO
              </div>

              <div className="text-[11px] font-medium tracking-wide text-gray-400">
                STUDENT PORTAL
              </div>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] text-gray-600 transition hover:bg-gray-50 lg:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ==========================================
            NAVIGATION
        ========================================== */}

        <nav className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/student/dashboard" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center gap-4
                    rounded-2xl px-4 py-3.5
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-gray-950 text-white shadow-lg shadow-gray-950/10"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                    }
                  `}
                >
                  {/* Icon */}
                  <span
                    className={`
                      flex h-8 w-8 shrink-0
                      items-center justify-center

                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-950"
                      }
                    `}
                  >
                    <span className="h-[18px] w-[18px]">
                      {item.icon}
                    </span>
                  </span>

                  {/* Text */}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* ==========================================
              DIVIDER
          ========================================== */}

          <div className="my-7 border-t border-black/[0.06]" />

          {/* ==========================================
              SETTINGS
          ========================================== */}

          <Link
            href="/student/settings"
            onClick={onClose}
            className={`
              group flex items-center gap-4
              rounded-2xl px-4 py-3.5
              text-sm font-medium
              transition-all duration-200

              ${
                pathname.startsWith("/student/settings")
                  ? "bg-gray-950 text-white shadow-lg shadow-gray-950/10"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
              }
            `}
          >
            <span
              className={
                pathname.startsWith("/student/settings")
                  ? "text-white"
                  : "text-gray-400 group-hover:text-gray-950"
              }
            >
              <SettingsIcon />
            </span>

            <span>Settings</span>
          </Link>
        </nav>

        {/* ==========================================
            USER CARD
        ========================================== */}

        <div className="shrink-0 border-t border-black/[0.06] p-5">
          <div className="rounded-2xl border border-black/[0.06] bg-gray-50/70 p-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
                D
              </div>

              {/* User details */}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-950">
                  Dinesh
                </p>

                <p className="text-xs text-gray-400">
                  Student
                </p>
              </div>
            </div>

            {/* ======================================
                SIGN OUT
            ====================================== */}

            <button
              type="button"
              onClick={handleLogout}
              className="
                mt-4 flex w-full
                items-center justify-center
                gap-2 rounded-xl
                border border-black/[0.07]
                bg-white
                px-4 py-2.5
                text-sm font-medium
                text-gray-600
                transition-all duration-200
                hover:bg-gray-950
                hover:text-white
                active:scale-[0.98]
              "
            >
              <LogoutIcon />

              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   STUDENT HEADER
========================================================= */

function StudentHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 h-20 border-b border-black/[0.06] bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-5 sm:px-7 lg:px-10">
        {/* ==========================================
            LEFT
        ========================================== */}

        <div className="flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-xl
              border border-black/[0.07]
              bg-white
              text-gray-700
              transition
              hover:bg-gray-50
              lg:hidden
            "
          >
            <MenuIcon />
          </button>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Student Portal
            </p>

            <h1 className="text-base font-bold text-gray-950 sm:text-lg">
              Student Dashboard
            </h1>
          </div>
        </div>

        {/* ==========================================
            RIGHT
        ========================================== */}

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative flex h-11 w-11
              items-center justify-center
              rounded-xl
              border border-black/[0.07]
              text-gray-600
              transition
              hover:bg-gray-50
            "
          >
            <BellIcon />

            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-black/[0.08] sm:block" />

          {/* User name */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-950">
              Dinesh
            </p>

            <p className="text-xs uppercase tracking-wide text-gray-400">
              Student
            </p>
          </div>

          {/* Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
            D
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   MAIN LAYOUT
========================================================= */

export default function StudentLayout({
  children,
}: StudentLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==========================================
          FIXED SIDEBAR
      ========================================== */}

      <StudentSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* ==========================================
          MAIN APPLICATION
      ========================================== */}

      <div className="min-h-screen lg:ml-64">
        {/* Sticky Header */}
        <StudentHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* ==========================================
            PAGE CONTENT

            Do NOT add another sidebar/header here.
        ========================================== */}

        <main className="min-h-[calc(100vh-5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}