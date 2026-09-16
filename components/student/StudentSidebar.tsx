"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  BriefcaseBusiness,
  Award,
  CreditCard,
  UserRound,
  X,
  LogOut,
  GraduationCap,
} from "lucide-react";

interface StudentSidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: "Profile",
    href: "/student/profile",
    icon: UserRound,
  },
  {
    label: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Courses",
    href: "/student/dashboard/courses",
    icon: BookOpen,
  },
  {
    label: "Internships",
    href: "/student/dashboard/internships",
    icon: BriefcaseBusiness,
  },
  {
    label: "Attendance",
    href: "/student/dashboard/attendance",
    icon: ClipboardCheck,
  },
  {
    label: "Jobs",
    href: "/student/dashboard/jobs",
    icon: GraduationCap,
  },
  {
    label: "Certificates",
    href: "/student/dashboard/certificates",
    icon: Award,
  },
  {
    label: "Fees",
    href: "/student/dashboard/fees",
    icon: CreditCard,
  },
];

export default function StudentSidebar({
  open,
  onClose,
}: StudentSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("hikoo_token");
    localStorage.removeItem("hikoo_role");
    localStorage.removeItem("hikoo_name");
    localStorage.removeItem("hikoo_email");

    router.replace("/student/login");
  };

  const isActive = (href: string) => {
    if (href === "/student/") {
      return pathname === href;
    } 

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-800
          bg-slate-950 text-white transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-950">
              H
            </div>

            <div>
              <p className="font-bold tracking-tight">HIKOO</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Student Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Student mini profile */}
        <div className="mx-4 mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
              S
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Student Portal
              </p>
              <p className="text-xs text-slate-500">
                Learning Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-medium transition
                    ${
                      active
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-5 w-5
                      ${
                        active
                          ? "text-slate-950"
                          : "text-slate-500 group-hover:text-white"
                      }
                    `}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}