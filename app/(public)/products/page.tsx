"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Users,
  ShieldCheck,
  BarChart3,
  UserRoundCheck,
  ClipboardCheck,
  BriefcaseBusiness,
  Layers3,
  Sparkles,
} from "lucide-react";

const products = [
  {
    number: "01",
    title: "HIKOO Student Management",
    shortTitle: "Student Management",
    description:
      "A centralized student management platform designed to manage student accounts, profiles, courses, internships, attendance, assignments, certificates and other academic workflows.",
    icon: GraduationCap,
    status: "In Development",
    href: "#student-management",
    features: [
      "Student Account Management",
      "Student Profile Management",
      "Course & Internship Management",
      "Enrollment Management",
      "Attendance Tracking",
      "Employee Assignment",
      "Certificates & Progress",
      "Student Dashboard",
    ],
  },
  {
    number: "02",
    title: "HIKOO Employee Management",
    shortTitle: "Employee Management",
    description:
      "An employee management platform built to organize employee accounts, profiles, roles, specializations, assignments and day-to-day operational workflows.",
    icon: BriefcaseBusiness,
    status: "In Development",
    href: "#employee-management",
    features: [
      "Employee Account Management",
      "Employee Profile Management",
      "Department Management",
      "Designation Management",
      "Specialization Management",
      "Student Assignments",
      "Attendance Management",
      "Employee Dashboard",
    ],
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Different users get access to the features and information relevant to their role.",
  },
  {
    icon: Layers3,
    title: "Centralized Management",
    description:
      "Keep important organizational data and workflows together in one platform.",
  },
  {
    icon: BarChart3,
    title: "Operational Visibility",
    description:
      "Make it easier to understand users, assignments, attendance and progress.",
  },
  {
    icon: Sparkles,
    title: "Built for Growth",
    description:
      "The product architecture can grow as HIKOO adds more organizations and workflows.",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.07),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.05),_transparent_35%)]" />

        <div className="mx-auto max-w-full px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              HIKOO Products
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
              Software built to
              <span className="block text-slate-500">
                simplify management.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              HIKOO builds practical digital platforms that help organizations
              manage people, workflows, data and everyday operations from one
              connected system.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-300 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-300/90"
              >
                Talk to HIKOO
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS INTRO */}
      <section className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Our Products
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              One ecosystem.
              <br />
              Multiple management solutions.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600 lg:ml-auto">
            HIKOO products are designed around real operational needs. Each
            platform focuses on a specific area while following a scalable
            architecture that can connect with the wider HIKOO ecosystem.
          </p>
        </div>

        {/* PRODUCT CARDS */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <article
                key={product.number}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-slate-100/80 blur-3xl transition group-hover:bg-slate-200/80" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {product.status}
                    </span>
                  </div>

                  <div className="mt-8">
                    <p className="text-sm font-semibold tracking-widest text-slate-400">
                      PRODUCT {product.number}
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                      {product.title}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={product.href}
                    className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition group-hover:gap-3"
                  >
                    Explore product
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* STUDENT MANAGEMENT */}
      <section
        id="student-management"
        className="border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <GraduationCap className="h-7 w-7" />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Product 01
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                HIKOO Student
                <br />
                Management
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                A dedicated platform for managing the complete student
                lifecycle — from account creation and profile completion to
                courses, internships, enrollment, employee assignment,
                attendance and progress.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-300 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-300/90"
              >
                Discuss Student Management
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: UserRoundCheck,
                  title: "Student Profiles",
                  text: "Manage student information and profile completion.",
                },
                {
                  icon: ClipboardCheck,
                  title: "Enrollments",
                  text: "Connect students with courses and learning programs.",
                },
                {
                  icon: BarChart3,
                  title: "Attendance",
                  text: "Track student attendance and participation.",
                },
                {
                  icon: Users,
                  title: "Assignments",
                  text: "Connect students with the appropriate employees.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <Icon className="h-6 w-6 text-slate-800" />

                    <h3 className="mt-5 font-semibold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYEE MANAGEMENT */}
      <section id="employee-management">
        <div className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
              {[
                {
                  icon: UserRoundCheck,
                  title: "Employee Profiles",
                  text: "Centralize employee information and profile details.",
                },
                {
                  icon: BriefcaseBusiness,
                  title: "Organizational Roles",
                  text: "Manage designations, departments and specializations.",
                },
                {
                  icon: Users,
                  title: "Student Assignment",
                  text: "Assign students to the right employees.",
                },
                {
                  icon: ClipboardCheck,
                  title: "Attendance",
                  text: "Support employee workflows around assigned students.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <Icon className="h-6 w-6 text-slate-800" />

                    <h3 className="mt-5 font-semibold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <BriefcaseBusiness className="h-7 w-7" />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Product 02
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-300 sm:text-4xl lg:text-5xl">
                HIKOO Employee
                <br />
                Management
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                A structured employee management platform that helps
                organizations manage employee accounts, profiles,
                organizational information, student assignments and operational
                responsibilities.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-300 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-300/90"
              >
                Discuss Employee Management
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM HIGHLIGHTS */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Platform Principles
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Designed around real workflows.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              HIKOO products focus on making complex management processes
              simpler, clearer and easier to operate.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-5 w-5 text-slate-800" />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Build with HIKOO
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Looking for a management platform for your organization?
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Talk to HIKOO about your requirements and explore how our
                products and services can support your organization.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-700 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-700/90"
              >
                Contact HIKOO
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}