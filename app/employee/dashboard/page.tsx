"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployeeDashboardPage() {
  const router = useRouter();

  const [name, setName] = useState("Employee");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hikoo_token");
    const role = localStorage.getItem("hikoo_role");
    const storedName = localStorage.getItem("hikoo_name");

    if (!token || role !== "EMPLOYEE") {
      router.replace("/employee/login");
      return;
    }

    if (storedName) {
      setName(storedName);
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-400">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-950">
          Welcome, {name} 👋
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here&apos;s an overview of your HIKOO workspace.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Students",
            value: "—",
            description: "Students assigned",
          },
          {
            title: "Attendance",
            value: "—",
            description: "Today&apos;s attendance",
          },
          {
            title: "Courses",
            value: "—",
            description: "Active courses",
          },
          {
            title: "Internships",
            value: "—",
            description: "Active internships",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-400">
              {card.title}
            </p>

            <p className="mt-3 text-3xl font-semibold text-gray-950">
              {card.value}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Workspace */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          Workspace
        </p>

        <h2 className="mt-2 text-xl font-semibold text-gray-950">
          Employee workspace
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Manage students, attendance, courses, internships and
          certificates from your employee workspace.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Students",
              description: "Manage assigned students",
              href: "/employee/dashboard/students",
            },
            {
              title: "Attendance",
              description: "View and manage attendance",
              href: "/employee/dashboard/attendance",
            },
            {
              title: "Courses",
              description: "Manage course activities",
              href: "/employee/dashboard/courses",
            },
            {
              title: "Internships",
              description: "Manage internship activities",
              href: "/employee/dashboard/internships",
            },
            {
              title: "Certificates",
              description: "Manage certificates",
              href: "/employee/dashboard/certificates",
            },
            {
              title: "Profile",
              description: "View your employee profile",
              href: "/employee/dashboard/profile",
            },
          ].map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => router.push(item.href)}
              className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-left transition hover:border-gray-200 hover:bg-white hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-gray-900">
                {item.title}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {item.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}