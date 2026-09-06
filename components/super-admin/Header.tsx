"use client";

import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const [name, setName] = useState("Super Admin");

  useEffect(() => {
    const storedName = localStorage.getItem("hikoo_name");

    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Super Admin Dashboard
            </p>

            <p className="text-xs text-slate-400">
              Manage your HIKOO platform
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {name}
            </p>

            <p className="text-xs text-slate-400">
              Super Administrator
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

      </div>
    </header>
  );
}