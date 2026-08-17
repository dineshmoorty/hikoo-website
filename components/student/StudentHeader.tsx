"use client";

import { useState } from "react";

type StudentHeaderProps = {
  onMenuClick?: () => void;
};

export default function StudentHeader({
  onMenuClick,
}: StudentHeaderProps) {
  const [notifications, setNotifications] = useState(false);

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[86px]
        shrink-0
        items-center
        justify-between
        border-b
        border-black/[0.06]
        bg-white/95
        px-5
        backdrop-blur-md
        sm:px-7
        lg:px-10
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-black/[0.08]
            bg-white
            text-gray-700
            transition
            hover:bg-gray-50
            lg:hidden
          "
        >
          <span className="text-2xl leading-none">
            ☰
          </span>
        </button>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Student Portal
          </p>

          <h1 className="mt-1 text-lg font-semibold text-gray-950 sm:text-xl">
            Student Dashboard
          </h1>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notifications */}
        <div className="relative">

          <button
            type="button"
            onClick={() => setNotifications((prev) => !prev)}
            aria-label="Notifications"
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-black/[0.07]
              bg-white
              text-gray-600
              transition
              hover:bg-gray-50
            "
          >
            <span className="text-lg">
              ♧
            </span>

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
          </button>

          {notifications && (
            <div
              className="
                absolute
                right-0
                top-14
                z-50
                w-72
                rounded-2xl
                border
                border-black/[0.06]
                bg-white
                p-4
                shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              "
            >
              <p className="text-sm font-semibold text-gray-950">
                Notifications
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                No new notifications.
              </p>
            </div>
          )}

        </div>

        {/* Divider */}
        <div className="hidden h-9 w-px bg-black/[0.08] sm:block" />

        {/* Student */}
        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-950">
              Dinesh
            </p>

            <p className="text-xs text-gray-400">
              STUDENT
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white shadow-sm">
            D
          </div>

        </div>

      </div>
    </header>
  );
}