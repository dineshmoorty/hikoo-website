"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "▦",
  },
  {
    label: "Companies",
    href: "/admin/companies",
    icon: "▥",
  },
  {
    label: "Roles",
    href: "/admin/roles",
    icon: "♙",
  },
  {
    label: "Admins",
    href: "/admin/admins",
    icon: "♢",
  },
  {
    label: "Employees",
    href: "/admin/employees",
    icon: "♧",
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: "⌑",
  },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  /* =====================================================
      OPEN MOBILE SIDEBAR FROM HEADER
  ====================================================== */

  useEffect(() => {
    const openSidebar = () => {
      setMobileOpen(true);
    };

    window.addEventListener(
      "open-superadmin-sidebar",
      openSidebar
    );

    return () => {
      window.removeEventListener(
        "open-superadmin-sidebar",
        openSidebar
      );
    };
  }, []);

  /* =====================================================
      ACTIVE NAVIGATION
  ====================================================== */

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  /* =====================================================
      LOGOUT
  ====================================================== */

  const handleLogout = () => {
    setMobileOpen(false);
    router.push("/admin/login");
  };

  /* =====================================================
      NAVIGATION
  ====================================================== */

  const handleNavigation = (href: string) => {
    setMobileOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            bg-black/30
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
        />
      )}

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
          w-[335px]
          border-r
          border-black/[0.06]
          bg-white
          lg:flex
          lg:flex-col
        "
      >
        {/* =================================================
            BRAND
        ================================================== */}

        <div className="flex h-[86px] items-center px-8">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-4"
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-gray-950
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-gray-950/10
              "
            >
              H
            </div>

            <div>
              <div
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-gray-950
                "
              >
                HIKOO
              </div>

              <div
                className="
                  text-xs
                  font-medium
                  tracking-wide
                  text-gray-400
                "
              >
                ADMINISTRATION
              </div>
            </div>
          </Link>
        </div>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav className="flex-1 px-6 py-8">
          <div className="space-y-2">
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
                    rounded-2xl
                    px-5
                    py-3.5
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      active
                        ? "bg-gray-300 text-white shadow-lg shadow-gray-950/10"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      text-lg
                      ${
                        active
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-950"
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

          {/* Divider */}

          <div className="my-8 border-t border-black/[0.06]" />

          {/* Settings */}

          <Link
            href="/admin/settings"
            className={`
              group
              flex
              items-center
              gap-4
              rounded-2xl
              px-5
              py-3.5
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                isActive("/admin/settings")
                  ? "bg-gray-950 text-white shadow-lg shadow-gray-950/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
              }
            `}
          >
            <span
              className={`
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                text-lg
                ${
                  isActive("/admin/settings")
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-950"
                }
              `}
            >
              ⚙
            </span>

            <span>Settings</span>
          </Link>
        </nav>

        {/* =================================================
            DESKTOP USER CARD
        ================================================== */}

        <div className="px-6 pb-6">
          <div
            className="
              rounded-2xl
              border
              border-black/[0.06]
              bg-gray-50
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-950
                  text-sm
                  font-semibold
                  text-white
                "
              >
                D
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-gray-950
                  "
                >
                  Dinesh
                </p>

                <p className="text-xs text-gray-500">
                  Super Admin
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-black/[0.06]
                bg-white
                px-4
                py-3
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
      </aside>

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-[70]
          flex
          w-[290px]
          flex-col
          border-r
          border-black/[0.06]
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          lg:hidden
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =================================================
            MOBILE BRAND
        ================================================== */}

        <div
          className="
            flex
            h-[86px]
            items-center
            justify-between
            px-6
          "
        >
          <Link
            href="/admin/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3"
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-gray-950
                text-sm
                font-bold
                text-white
              "
            >
              H
            </div>

            <div>
              <div
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-gray-950
                "
              >
                HIKOO
              </div>

              <div
                className="
                  text-[11px]
                  font-medium
                  tracking-wide
                  text-gray-400
                "
              >
                ADMINISTRATION
              </div>
            </div>
          </Link>

          {/* Close */}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-black/[0.06]
              text-xl
              text-gray-500
              transition
              hover:bg-gray-50
              hover:text-gray-950
            "
          >
            ×
          </button>
        </div>

        {/* =================================================
            MOBILE NAVIGATION
        ================================================== */}

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-2xl
                    px-5
                    py-3.5
                    text-left
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      active
                        ? "bg-gray-950 text-white shadow-lg shadow-gray-950/10"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      text-lg
                      ${
                        active
                          ? "text-white"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Divider */}

          <div className="my-8 border-t border-black/[0.06]" />

          {/* Settings */}

          <button
            type="button"
            onClick={() =>
              handleNavigation("/admin/settings")
            }
            className={`
              flex
              w-full
              items-center
              gap-4
              rounded-2xl
              px-5
              py-3.5
              text-left
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                isActive("/admin/settings")
                  ? "bg-gray-950 text-white shadow-lg shadow-gray-950/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
              }
            `}
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                text-lg
              "
            >
              ⚙
            </span>

            <span>Settings</span>
          </button>
        </nav>

        {/* =================================================
            MOBILE USER CARD
        ================================================== */}

        <div className="px-5 pb-5">
          <div
            className="
              rounded-2xl
              border
              border-black/[0.06]
              bg-gray-50
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-950
                  text-sm
                  font-semibold
                  text-white
                "
              >
                D
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-gray-950
                  "
                >
                  Dinesh
                </p>

                <p className="text-xs text-gray-500">
                  Super Admin
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-black/[0.06]
                bg-white
                px-4
                py-3
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
      </aside>
    </>
  );
}