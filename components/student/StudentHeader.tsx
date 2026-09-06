"use client";

import { useEffect, useState } from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";

interface StudentHeaderProps {
  onMenuClick: () => void;
}

export default function StudentHeader({
  onMenuClick,
}: StudentHeaderProps) {
  const [name, setName] = useState("Student");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("hikoo_name") || "Student");
    setEmail(localStorage.getItem("hikoo_email") || "");
  }, []);

  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
              H
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-950">
                HIKOO
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Student Portal
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {name}
              </p>

              <p className="max-w-[180px] truncate text-xs text-slate-400">
                {email}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {initial}
            </div>

            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
}