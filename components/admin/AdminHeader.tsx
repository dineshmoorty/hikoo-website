"use client";

import { useEffect, useState } from "react";

export default function AdminHeader() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@hikoo.com");

  useEffect(() => {
    setName(localStorage.getItem("hikoo_name") || "Admin");
    setEmail(
      localStorage.getItem("hikoo_email") || "admin@hikoo.com"
    );
  }, []);

  const initial = name.charAt(0).toUpperCase();

  function openMobileMenu() {
    const button = document.getElementById(
      "admin-mobile-menu-trigger"
    ) as HTMLButtonElement | null;

    button?.click();
  }

  return (
    <header
      className="
        fixed
        right-0
        top-0
        z-40
        h-[76px]
        border-b
        border-slate-200
        bg-white/95
        backdrop-blur-xl
        lg:left-[330px]
      "
    >
      <div className="flex h-full items-center justify-between px-5 sm:px-7 lg:px-10">
        {/* =================================================
            LEFT
        ================================================== */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={openMobileMenu}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-lg
              text-slate-600
              lg:hidden
            "
          >
            ☰
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
              Admin Dashboard
            </h1>

            <p className="hidden text-xs text-slate-400 sm:block">
              Manage your HIKOO platform
            </p>
          </div>
        </div>

        {/* =================================================
            RIGHT
        ================================================== */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification */}
          <button
            type="button"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-lg
              text-slate-500
              transition
              hover:bg-slate-50
            "
          >
            ♧

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-[180px] truncate text-sm font-semibold text-slate-900">
                {name}
              </p>

              <p className="max-w-[180px] truncate text-xs text-slate-400">
                {email}
              </p>
            </div>

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#0b1220]
                text-sm
                font-bold
                text-white
              "
            >
              {initial}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}