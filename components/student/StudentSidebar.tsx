"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: "▦",
  },
  {
    name: "Course",
    href: "/student/course",
    icon: "▤",
  },
  {
    name: "Attendance",
    href: "/student/attendance",
    icon: "✓",
  },
  {
    name: "Certificate",
    href: "/student/certificate",
    icon: "◇",
  },
  {
    name: "Fees",
    href: "/student/fees",
    icon: "₹",
  },
  {
    name: "Profile",
    href: "/student/profile",
    icon: "♙",
  },
];

export default function StudentSidebar({
  isOpen,
  onClose,
}: StudentSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/30
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[270px]
          flex-col
          border-r
          border-gray-200
          bg-white
          shadow-xl
          transition-transform
          duration-300
          ease-in-out

          lg:relative
          lg:z-auto
          lg:translate-x-0
          lg:shadow-none

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Brand */}
        <div className="flex h-[100px] shrink-0 items-center justify-between border-b border-gray-100 px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-sm font-bold text-white shadow-sm">
              H
            </div>

            <div>
              <div className="text-lg font-bold text-gray-950">
                HIKOO
              </div>

              <div className="text-[11px] font-medium tracking-wide text-gray-400">
                STUDENT PORTAL
              </div>
            </div>

          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              bg-white
              text-xl
              text-gray-600
              transition
              hover:bg-gray-50
              lg:hidden
            "
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6">

          <nav className="space-y-2">

            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex
                    h-12
                    items-center
                    gap-4
                    rounded-xl
                    px-4
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-gray-950 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      w-5
                      items-center
                      justify-center
                      text-sm

                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </Link>
              );
            })}

          </nav>

          {/* Divider */}
          <div className="my-7 border-t border-gray-100" />

          {/* Settings */}
          <Link
            href="/student/settings"
            onClick={onClose}
            className={`
              flex
              h-12
              items-center
              gap-4
              rounded-xl
              px-4
              text-sm
              font-medium
              transition

              ${
                pathname.startsWith("/student/settings")
                  ? "bg-gray-950 text-white"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
              }
            `}
          >
            <span className="flex w-5 items-center justify-center text-sm">
              ⚙
            </span>

            <span>Settings</span>
          </Link>

          {/* Account */}
          <div className="mt-auto pt-8">

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-950 text-sm font-bold text-white">
                  D
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-950">
                    Dinesh
                  </div>

                  <div className="text-xs text-gray-500">
                    Student
                  </div>
                </div>

              </div>

              <button
                type="button"
                className="
                  mt-4
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  font-medium
                  text-gray-600
                  transition
                  hover:bg-gray-950
                  hover:text-white
                "
              >
                <span>↪</span>
                Sign out
              </button>

            </div>

          </div>
        </div>
      </aside>
    </>
  );
}