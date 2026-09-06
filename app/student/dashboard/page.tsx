"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  BookOpen,
  ClipboardCheck,
  Award,
  CreditCard,
  ArrowRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

export default function StudentDashboardPage() {
  const [name, setName] = useState("Student");

  useEffect(() => {
    setName(localStorage.getItem("hikoo_name") || "Student");
  }, []);

  const firstName = name.split(" ")[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300">
            <Sparkles className="h-3.5 w-3.5" />
            Student Dashboard
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {firstName} 👋
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Keep learning, track your progress and stay updated with your
            HIKOO journey.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/student/dashboard/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/student/dashboard/attendance"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Attendance
            </Link>
          </div>
        </div>

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="My Courses"
          value="0"
          subtitle="Currently enrolled"
          icon={<BookOpen className="h-5 w-5" />}
        />

        <StatCard
          title="Attendance"
          value="0%"
          subtitle="Overall attendance"
          icon={<ClipboardCheck className="h-5 w-5" />}
        />

        <StatCard
          title="Certificates"
          value="0"
          subtitle="Certificates earned"
          icon={<Award className="h-5 w-5" />}
        />

        <StatCard
          title="Fees"
          value="₹0"
          subtitle="Pending amount"
          icon={<CreditCard className="h-5 w-5" />}
        />
      </section>

      {/* Main grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Continue learning */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-950">
                Continue Learning
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your active learning programs
              </p>
            </div>

            <Link
              href="/student/dashboard/courses"
              className="text-sm font-semibold text-slate-700 hover:text-slate-950"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
            <div className="max-w-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <BookOpen className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No courses yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Explore available courses and start your learning journey.
              </p>

              <Link
                href="/student/dashboard/courses"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
              >
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-bold text-slate-950">
            Upcoming
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your upcoming classes
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                  <CalendarDays className="h-5 w-5 text-slate-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    No upcoming classes
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Your schedule will appear here.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                  <Clock3 className="h-5 w-5 text-slate-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Stay updated
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Check your dashboard regularly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>
      </div>
    </div>
  );
}