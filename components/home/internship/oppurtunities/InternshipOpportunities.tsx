"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const internshipTypes = [
  {
    number: "01",
    type: "job",
    label: "For Job Seekers",
    title: "Job Internship",
    description:
      "Start your career journey with a structured internship designed to give you practical experience and a pathway toward becoming part of the HIKOO team.",
    steps: [
      "3 Months Internship",
      "3 Months Probation",
      "Employee",
    ],
    gradient: "from-blue-50 via-white to-cyan-50",
  },

  {
    number: "02",
    type: "college",
    label: "For College Students",
    title: "College Internship",
    description:
      "Gain practical industry exposure through an assessment-based internship pathway designed to help students build technical and professional skills.",
    steps: [
      "Assessment",
      "3 Months Internship",
      "3 Months Probation",
      "Employee",
    ],
    gradient: "from-violet-50 via-white to-purple-50",
  },
];

function Roadmap({ steps }: { steps: string[] }) {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = roadmapRef.current;

      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
        Animation starts when the roadmap
        reaches around 75% of viewport.
      */

      const start = viewportHeight * 0.75;

      /*
        Animation reaches 100%
        when roadmap reaches around 30%.
      */

      const end = viewportHeight * 0.3;

      const totalDistance = start - end;

      const currentProgress =
        (start - rect.top) / totalDistance;

      const clampedProgress = Math.min(
        Math.max(currentProgress, 0),
        1
      );

      setProgress(clampedProgress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div ref={roadmapRef} className="mt-8">
      {/* =====================================================
          ROADMAP LABEL
      ====================================================== */}

      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        Internship Roadmap
      </p>

      {/* =====================================================
          DESKTOP TIMELINE
      ====================================================== */}

      <div className="mt-7 hidden md:block">
        <div className="relative">
          {/* Background Line */}

          <div
            className="
              absolute
              left-[10px]
              right-[10px]
              top-[10px]
              h-px
              bg-gray-200
            "
          />

          {/* Scroll Progress Line */}

          <div
            className="
              absolute
              left-[10px]
              top-[10px]
              h-px
              origin-left
              bg-gradient-to-r
              from-blue-600
              to-violet-600
            "
            style={{
              width: `calc(${progress} * (100% - 20px))`,
            }}
          />

          {/* Steps */}

          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const stepProgress =
                index / (steps.length - 1);

              const isActive =
                progress >= stepProgress;

              return (
                <div
                  key={step}
                  className="
                    relative
                    flex
                    w-1/4
                    flex-col
                    items-center
                    text-center
                  "
                >
                  {/* Timeline Dot */}

                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      border-4
                      border-white
                      shadow-sm
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "scale-110 bg-gray-950"
                          : "scale-100 bg-gray-200"
                      }
                    `}
                  >
                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        transition-all
                        duration-200
                        ${
                          isActive
                            ? "bg-white"
                            : "bg-gray-300"
                        }
                      `}
                    />
                  </div>

                  {/* Step Content */}

                  <div
                    className={`
                      mt-4
                      px-2
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-40"
                      }
                    `}
                  >
                    <span className="text-xs font-semibold text-gray-400">
                      STEP {index + 1}
                    </span>

                    <p className="mt-1 text-sm font-semibold leading-5 text-gray-800">
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE TIMELINE
      ====================================================== */}

      <div className="mt-7 md:hidden">
        <div className="relative ml-2">
          {/* Background Line */}

          <div
            className="
              absolute
              bottom-5
              left-[9px]
              top-5
              w-px
              bg-gray-200
            "
          />

          {/* Scroll Progress */}

          <div
            className="
              absolute
              left-[9px]
              top-5
              w-px
              origin-top
              bg-gradient-to-b
              from-blue-600
              to-violet-600
            "
            style={{
              height: `calc(${progress} * (100% - 40px))`,
            }}
          />

          {/* Mobile Steps */}

          <div className="space-y-6">
            {steps.map((step, index) => {
              const stepProgress =
                index / (steps.length - 1);

              const isActive =
                progress >= stepProgress;

              return (
                <div
                  key={step}
                  className="
                    relative
                    flex
                    items-start
                    gap-5
                  "
                >
                  {/* Timeline Dot */}

                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border-4
                      border-white
                      shadow-sm
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "scale-110 bg-gray-950"
                          : "scale-100 bg-gray-200"
                      }
                    `}
                  >
                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${
                          isActive
                            ? "bg-white"
                            : "bg-gray-300"
                        }
                      `}
                    />
                  </div>

                  {/* Step Content */}

                  <div
                    className={`
                      -mt-1
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "translate-x-2 opacity-40"
                      }
                    `}
                  >
                    <span className="text-xs font-semibold text-gray-400">
                      STEP {index + 1}
                    </span>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InternshipOpportunities() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-full">
        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <div className="max-w-3xl">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-black/[0.06]
              bg-gray-50
              px-4
              py-2
              text-sm
              font-medium
              text-gray-600
            "
          >
            Internship Opportunities
          </span>

          <h2
            className="
              mt-5
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-950
              sm:text-5xl
            "
          >
            Choose your path.

            <span
              className="
                block
                bg-gradient-to-r
                from-blue-700
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              Build your career.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            HIKOO offers structured internship pathways for both
            job seekers and college students, with the opportunity
            to grow toward a full-time career.
          </p>
        </div>

        {/* =====================================================
            INTERNSHIP CARDS
        ====================================================== */}

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {internshipTypes.map((internship) => (
            <div
              key={internship.number}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-black/[0.06]
                bg-gradient-to-br
                ${internship.gradient}
                p-7
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]
                sm:p-8
              `}
            >
              {/* Card Header */}

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400">
                  {internship.number}
                </span>

                <span
                  className="
                    rounded-full
                    border
                    border-black/[0.06]
                    bg-white/70
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-gray-500
                    backdrop-blur-md
                  "
                >
                  {internship.label}
                </span>
              </div>

              {/* Title */}

              <h3 className="mt-7 text-3xl font-bold tracking-tight text-gray-950">
                {internship.title}
              </h3>

              {/* Description */}

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {internship.description}
              </p>

              {/* Animated Roadmap */}

              <Roadmap steps={internship.steps} />

              {/* =================================================
                  APPLY NOW
              ================================================== */}

              <div className="mt-8 flex justify-end">
                <Link
                  href={`/internship/apply?type=${internship.type}`}
                  className="
                    group/apply
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-gray-300
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-gray-400
                    hover:shadow-lg
                  "
                >
                  Apply Now

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover/apply:translate-x-1
                    "
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}