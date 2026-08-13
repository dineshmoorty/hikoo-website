"use client";

import {
  Building2,
  Users,
  GraduationCap,
  ArrowUpRight,
  Activity,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    title: "Total Companies",
    value: "12",
    change: "+2 this month",
    icon: Building2,
  },
  {
    title: "Total Admins",
    value: "24",
    change: "+4 this month",
    icon: ShieldCheck,
  },
  {
    title: "Total Employees",
    value: "86",
    change: "+8 this month",
    icon: Users,
  },
  {
    title: "Total Students",
    value: "342",
    change: "+32 this month",
    icon: GraduationCap,
  },
];

const companies = [
  {
    name: "HIKOO Technologies",
    admin: "Arun Kumar",
    employees: 28,
    status: "Active",
  },
  {
    name: "Nova Digital Solutions",
    admin: "Priya Sharma",
    employees: 19,
    status: "Active",
  },
  {
    name: "Vertex Systems",
    admin: "Rahul Raj",
    employees: 14,
    status: "Active",
  },
  {
    name: "Pixelwave Labs",
    admin: "Karthik S",
    employees: 11,
    status: "Pending",
  },
];

const activities = [
  {
    title: "New company added",
    description: "Pixelwave Labs was added to HIKOO.",
    time: "12 minutes ago",
  },
  {
    title: "New admin created",
    description: "Karthik S was assigned as company admin.",
    time: "38 minutes ago",
  },
  {
    title: "New student registered",
    description: "A new student joined the internship platform.",
    time: "1 hour ago",
  },
  {
    title: "Employee account created",
    description: "A new employee account was created.",
    time: "2 hours ago",
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-950">
      {/* Background Glows */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-violet-100/30 blur-3xl" />

      {/* Dashboard Content */}

      <section className="relative px-6 py-8 lg:px-10 lg:py-10">
        <div className="relative mx-auto max-w-[1600px]">

          {/* Welcome */}

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex rounded-full border border-black/[0.06] bg-white px-4 py-2 text-xs font-medium text-gray-500 shadow-sm">
                Super Admin
              </span>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Good morning, Dinesh 👋
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Here's an overview of everything happening across the HIKOO
                platform.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Platform Status
              </p>

              <div className="mt-2 flex items-center gap-2 sm:justify-end">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-sm font-semibold text-gray-700">
                  All systems operational
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="
                    group
                    rounded-3xl
                    border
                    border-black/[0.06]
                    bg-white
                    p-6
                    shadow-[0_10px_40px_rgba(0,0,0,0.035)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]
                  "
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-950 text-white">
                      <Icon size={19} />
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-gray-300 transition group-hover:text-gray-950"
                    />
                  </div>

                  <p className="mt-6 text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-3">
                    <p className="text-3xl font-bold tracking-tight">
                      {stat.value}
                    </p>

                    <span className="mb-1 text-xs font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Grid */}

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.5fr_1fr]">

            {/* Recent Companies */}

            <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.035)] sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">
                    Recent Companies
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Recently added companies on HIKOO.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gray-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-black"
                >
                  View all
                  <ArrowUpRight size={13} />
                </button>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[620px]">
                  <thead>
                    <tr className="border-b border-black/[0.06] text-left">
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Company
                      </th>

                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Admin
                      </th>

                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Employees
                      </th>

                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {companies.map((company) => (
                      <tr
                        key={company.name}
                        className="border-b border-black/[0.04] last:border-0"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-xs font-bold text-gray-700">
                              {company.name.charAt(0)}
                            </div>

                            <span className="text-sm font-semibold text-gray-800">
                              {company.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 text-sm text-gray-500">
                          {company.admin}
                        </td>

                        <td className="py-4 text-sm font-medium text-gray-700">
                          {company.employees}
                        </td>

                        <td className="py-4">
                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-3
                              py-1
                              text-[11px]
                              font-semibold
                              ${
                                company.status === "Active"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-amber-50 text-amber-700"
                              }
                            `}
                          >
                            {company.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}

            <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.035)] sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-white">
                  <Activity size={17} />
                </div>

                <div>
                  <h2 className="text-lg font-bold tracking-tight">
                    Recent Activity
                  </h2>

                  <p className="text-xs text-gray-500">
                    Latest platform activity.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-6">
                {activities.map((activity, index) => (
                  <div key={activity.title} className="flex gap-4">
                    <div className="relative flex w-3 justify-center">
                      <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-gray-950" />

                      {index !== activities.length - 1 && (
                        <span className="absolute top-4 h-full w-px bg-gray-200" />
                      )}
                    </div>

                    <div className="-mt-1 flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {activity.description}
                      </p>

                      <p className="mt-1.5 text-[11px] font-medium text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Overview */}

          <div className="mt-8 rounded-3xl border border-black/[0.06] bg-gray-950 p-7 text-white shadow-[0_15px_50px_rgba(0,0,0,0.12)] sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  HIKOO Platform
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Everything under one roof.
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                  Manage companies, administrators, employees, students and
                  internship activities from one centralized platform.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-xs text-gray-400">
                    Active users
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    452
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-xs text-gray-400">
                    Companies
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    12
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}