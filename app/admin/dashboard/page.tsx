"use client";

import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  GraduationCap,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [name, setName] = useState("Admin");

  useEffect(() => {
    const storedName = localStorage.getItem("hikoo_name");

    if (storedName) {
      setName(storedName);
    }
  }, []);

  const firstName = name.split(" ")[0];

  return (
    <div className="mx-auto w-full max-w-[1500px]">

      {/* =====================================================
          WELCOME
      ====================================================== */}

      <section className="mb-8">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-sm font-medium text-indigo-600">
              Administration
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Good morning, {firstName} 👋
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Here's an overview of your HIKOO workspace.
            </p>

          </div>

          <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            ● System Active
          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Students"
          value="—"
          description="Registered students"
          icon={<GraduationCap size={20} />}
          href="/admin/dashboard/students"
        />

        <StatCard
          title="Employees"
          value="—"
          description="Platform staff"
          icon={<BriefcaseBusiness size={20} />}
          href="/admin/dashboard/employees"
        />

        <StatCard
          title="Courses"
          value="—"
          description="Available programs"
          icon={<BookOpen size={20} />}
          href="/admin/dashboard/courses"
        />

        <StatCard
          title="Assignments"
          value="—"
          description="Student assignments"
          icon={<Users size={20} />}
          href="/admin/dashboard/assignments"
        />

      </section>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

        {/* PLATFORM OVERVIEW */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

          <div className="flex items-start justify-between">

            <div>

              <h3 className="text-lg font-bold tracking-tight text-slate-950">
                Platform Overview
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Manage the main areas of your HIKOO workspace.
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <CalendarCheck size={18} />
            </div>

          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <OverviewItem
              icon={<GraduationCap size={18} />}
              title="Students"
              description="View and manage student accounts."
              href="/admin/dashboard/students"
            />

            <OverviewItem
              icon={<BriefcaseBusiness size={18} />}
              title="Employees"
              description="Manage your HIKOO employees."
              href="/admin/dashboard/employees"
            />

            <OverviewItem
              icon={<Users size={18} />}
              title="Assignments"
              description="Assign students to employees."
              href="/admin/dashboard/assignments"
            />

            <OverviewItem
              icon={<BookOpen size={18} />}
              title="Courses"
              description="Manage course availability."
              href="/admin/dashboard/courses"
            />

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

          <h3 className="text-lg font-bold tracking-tight text-slate-950">
            Quick Actions
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Common administration tasks.
          </p>

          <div className="mt-6 space-y-3">

            <QuickAction
              title="Manage Employees"
              description="View employee accounts"
              href="/admin/dashboard/employees"
            />

            <QuickAction
              title="View Students"
              description="Manage registered students"
              href="/admin/dashboard/students"
            />

            <QuickAction
              title="Student Assignments"
              description="Assign students to employees"
              href="/admin/dashboard/assignments"
            />

            <QuickAction
              title="Course Management"
              description="Activate or deactivate courses"
              href="/admin/dashboard/courses"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          ADMIN NOTE
      ====================================================== */}

      <section className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
            <Users size={19} />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-950">
              Admin Workspace
            </h3>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              You can manage employees, students, assignments,
              course status and attendance from this workspace.
              Full platform administration remains with the
              Super Admin.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  description,
  icon,
  href,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-slate-950 group-hover:text-white">
          {icon}
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-300 transition group-hover:text-slate-700"
        />

      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>

    </Link>
  );
}

/* =========================================================
   OVERVIEW ITEM
========================================================= */

function OverviewItem({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>

      </div>

      <ArrowUpRight
        size={16}
        className="text-slate-300 transition group-hover:text-slate-700"
      />

    </Link>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50"
    >

      <div>

        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>

      </div>

      <ArrowUpRight
        size={16}
        className="text-slate-300"
      />

    </Link>
  );
}