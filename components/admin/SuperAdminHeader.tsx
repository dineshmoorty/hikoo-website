"use client";

import { useState } from "react";

export default function SuperAdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openSidebar = () => {
    window.dispatchEvent(new Event("open-superadmin-sidebar"));
    setMenuOpen(true);
  };

  return (
    <header
      className="
        sticky top-0 z-40
        flex h-[86px]
        items-center justify-between
        border-b border-black/[0.06]
        bg-white/95
        px-5
        backdrop-blur-xl
        sm:px-8
        lg:px-10
      "
    >
      {/* ================================
          MOBILE MENU BUTTON
      ================================= */}

      <button
        type="button"
        aria-label="Open navigation"
        onClick={openSidebar}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-black/[0.06]
          bg-white
          text-gray-700
          transition-all
          duration-200
          hover:bg-gray-50
          hover:text-gray-950
          lg:hidden
        "
      >
        <span className="flex flex-col gap-1.5">
          <span className="h-0.5 w-5 rounded-full bg-current" />
          <span className="h-0.5 w-5 rounded-full bg-current" />
          <span className="h-0.5 w-5 rounded-full bg-current" />
        </span>
      </button>

      {/* ================================
          DESKTOP TITLE
      ================================= */}

      <div className="hidden lg:block">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Administration
        </p>

        <h1 className="mt-1 text-base font-semibold text-gray-900">
          Super Admin Dashboard
        </h1>
      </div>

      {/* ================================
          MOBILE TITLE
      ================================= */}

      <div className="lg:hidden">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Administration
        </p>

        <h1 className="mt-1 text-base font-semibold text-gray-900">
          Super Admin
        </h1>
      </div>

      {/* ================================
          RIGHT SIDE
      ================================= */}

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification */}

        <button
          type="button"
          aria-label="Notifications"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-black/[0.06]
            bg-white
            text-lg
            text-gray-600
            transition
            hover:bg-gray-50
          "
        >
          ♧
        </button>

        {/* Divider */}

        <div className="hidden h-8 w-px bg-black/[0.06] sm:block" />

        {/* User */}

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-950">
            Dinesh
          </p>

          <p className="text-xs text-gray-400">
            SUPER_ADMIN
          </p>
        </div>

        {/* Avatar */}

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
      </div>
    </header>
  );
}