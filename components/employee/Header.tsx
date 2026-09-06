"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [name, setName] = useState("Employee");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("hikoo_name");
    const storedEmail = localStorage.getItem("hikoo_email");

    if (storedName) {
      setName(storedName);
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("hikoo_token");
    localStorage.removeItem("hikoo_role");
    localStorage.removeItem("hikoo_name");
    localStorage.removeItem("hikoo_email");

    window.location.href = "/employee/login";
  }

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-gray-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* LEFT */}
        <div className="min-w-0 pl-14 lg:pl-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-xs">
            Employee
          </p>

          <h1 className="mt-1 truncate text-sm font-semibold text-gray-950 sm:text-base">
            HIKOO Workspace
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Desktop user info */}
          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {name}
              </p>

              <p className="max-w-[220px] truncate text-xs text-gray-400">
                {email || "Employee"}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Mobile avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white sm:hidden">
            {name.charAt(0).toUpperCase()}
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950 sm:px-4"
          >
            <span className="hidden sm:inline">
              Logout
            </span>

            <span className="sm:hidden">
              ↪
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}