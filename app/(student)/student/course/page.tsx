"use client";

import { useState } from "react";

type ProgramType = "Course" | "Internship";

interface Program {
  id: number;
  title: string;
  type: ProgramType;
  duration: string;
  description: string;
  fee: number;
}

const availablePrograms: Program[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    type: "Course",
    duration: "6 Months",
    description:
      "Learn frontend, backend, databases and deployment through practical projects.",
    fee: 25000,
  },
  {
    id: 2,
    title: "Web Development Internship",
    type: "Internship",
    duration: "15 Days",
    description:
      "Get practical industry exposure by working on real-world development tasks.",
    fee: 3000,
  },
  {
    id: 3,
    title: "Web Development Internship",
    type: "Internship",
    duration: "1 Month",
    description:
      "A focused one-month internship designed around practical development experience.",
    fee: 5000,
  },
  {
    id: 4,
    title: "Web Development Internship",
    type: "Internship",
    duration: "3 Months",
    description:
      "Extended internship program with deeper project and industry experience.",
    fee: 10000,
  },
  {
    id: 5,
    title: "Lifetime Learning Program",
    type: "Course",
    duration: "Lifetime",
    description:
      "Long-term learning access with continued course resources and support.",
    fee: 35000,
  },
];

export default function StudentCoursePage() {
  const [selectedType, setSelectedType] =
    useState<"All" | ProgramType>("All");

  const filteredPrograms =
    selectedType === "All"
      ? availablePrograms
      : availablePrograms.filter(
          (program) => program.type === selectedType
        );

  return (
    <div className="p-5 sm:p-7 lg:p-10">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-8">
        <p className="text-sm font-medium text-gray-400">
          Student Portal
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          My Course
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          View your current program, track your learning progress
          and explore available courses and internships.
        </p>
      </div>

      {/* =====================================================
          CURRENT PROGRAM
      ===================================================== */}

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-950">
              Current Program
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your currently enrolled program
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            Active
          </span>
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          {/* Top */}
          <div className="border-b border-black/[0.06] p-6 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-6 w-6"
                  >
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
                    <path d="M4 5.5v16" />
                    <path d="M8 7h8" />
                    <path d="M8 11h6" />
                  </svg>
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
                      COURSE
                    </span>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
                      6 MONTHS
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-950">
                    Full Stack Web Development
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Enrollment ID: HIKOO-2026-00124
                  </p>
                </div>
              </div>

              <div className="lg:text-right">
                <p className="text-xs font-medium text-gray-400">
                  Enrollment Date
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-950">
                  01 August 2026
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid border-b border-black/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-black/[0.06] p-6 sm:border-r lg:border-b-0">
              <p className="text-xs font-medium text-gray-400">
                Start Date
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-950">
                01 Aug 2026
              </p>
            </div>

            <div className="border-b border-black/[0.06] p-6 lg:border-b-0 lg:border-r">
              <p className="text-xs font-medium text-gray-400">
                Expected Completion
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-950">
                31 Jan 2027
              </p>
            </div>

            <div className="border-b border-black/[0.06] p-6 sm:border-r sm:border-b-0">
              <p className="text-xs font-medium text-gray-400">
                Course Fee
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-950">
                ₹25,000
              </p>
            </div>

            <div className="p-6">
              <p className="text-xs font-medium text-gray-400">
                Payment Status
              </p>

              <p className="mt-2 text-sm font-semibold text-green-600">
                Paid
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="p-6 sm:p-7">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-950">
                  Course Progress
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Keep going — you're doing great!
                </p>
              </div>

              <span className="text-sm font-bold text-gray-950">
                32%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-950"
                style={{ width: "32%" }}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
              <span>Completed: 32%</span>
              <span>Remaining: 68%</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPLORE PROGRAMS
      ===================================================== */}

      <section>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-950">
              Explore Programs
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Explore courses and internship programs.
            </p>
          </div>

          {/* Filters */}
          <div className="flex w-fit rounded-xl border border-black/[0.06] bg-white p-1">
            {(["All", "Course", "Internship"] as const).map(
              (type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`
                    rounded-lg px-3.5 py-2 text-xs font-semibold
                    transition-all
                    ${
                      selectedType === type
                        ? "bg-gray-950 text-white"
                        : "text-gray-500 hover:text-gray-950"
                    }
                  `}
                >
                  {type}
                </button>
              )
            )}
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="group rounded-3xl border border-black/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(0,0,0,0.07)]"
            >
              {/* Icon */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-950">
                  {program.type === "Course" ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                    >
                      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
                      <path d="M4 5.5v16" />
                      <path d="M8 7h8" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                    >
                      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
                      <path d="M8 7h8" />
                      <path d="M8 11h5" />
                      <path d="M8 15h8" />
                    </svg>
                  )}
                </div>

                <span className="rounded-full bg-gray-50 px-3 py-1.5 text-[11px] font-semibold text-gray-500">
                  {program.type}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold leading-6 text-gray-950">
                {program.title}
              </h3>

              {/* Description */}
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                {program.description}
              </p>

              {/* Info */}
              <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-950">
                    {program.duration}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Fee
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-950">
                    ₹{program.fee.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
              >
                View Program

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}