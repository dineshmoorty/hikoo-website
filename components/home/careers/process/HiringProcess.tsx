"use client";

import { useEffect, useRef, useState } from "react";

const hiringSteps = [
  {
    number: "01",
    title: "Application",
    description:
      "Send your profile and tell us about your skills, experience, and the role you're interested in.",
  },
  {
    number: "02",
    title: "Screening",
    description:
      "Our team reviews your profile and checks how your experience matches the opportunity.",
  },
  {
    number: "03",
    title: "Interview",
    description:
      "Discuss your technical knowledge, problem-solving approach, and experience with our team.",
  },
  {
    number: "04",
    title: "Selection",
    description:
      "Selected candidates receive the next steps and details about joining the HIKOO team.",
  },
  {
    number: "05",
    title: "Joining",
    description:
      "Begin your journey at HIKOO and start contributing, learning, and growing with the team.",
  },
];

export default function HiringProcess() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const element = timelineRef.current;

      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
        Timeline animation begins when
        the section enters the lower part
        of the viewport.
      */

      const start = viewportHeight * 0.82;

      /*
        Timeline completes when the section
        reaches the upper-middle area.
      */

      const end = viewportHeight * 0.25;

      const distance = start - end;

      const currentProgress =
        (start - rect.top) / distance;

      const nextProgress = Math.min(
        Math.max(currentProgress, 0),
        1
      );

      setProgress(nextProgress);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-100/30
          blur-[100px]
        "
      />

      <div className="relative mx-auto max-w-full">
        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mx-auto max-w-full text-center">
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
            Hiring Process
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-950
              sm:text-5xl
            "
          >
            Your journey to
            <span
              className="
                block
                bg-gradient-to-r
                from-blue-700
                via-indigo-600
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              HIKOO starts here.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600">
            A simple and transparent hiring journey designed to
            help you understand what happens at every stage.
          </p>
        </div>

        {/* =====================================================
            TIMELINE
        ====================================================== */}

        <div
          ref={timelineRef}
          className="relative mt-16"
        >
          {/* ===================================================
              DESKTOP TIMELINE
          ==================================================== */}

          <div className="hidden lg:block">
            {/* Base Track */}

            <div
              className="
                absolute
                left-[10%]
                right-[10%]
                top-[14px]
                h-[2px]
                rounded-full
                bg-gray-200
              "
            />

            {/* Progress Track */}

            <div
              className="
                absolute
                left-[10%]
                top-[14px]
                h-[2px]
                rounded-full
                bg-gradient-to-r
                from-blue-500
                via-indigo-500
                to-violet-500
                shadow-[0_0_12px_rgba(99,102,241,0.35)]
              "
              style={{
                width: `calc(${progress} * 80%)`,
              }}
            />

            {/* Moving Light */}

            <div
              className="
                pointer-events-none
                absolute
                top-[7px]
                h-4
                w-4
                -translate-x-1/2
                rounded-full
                bg-white
                shadow-[0_0_18px_5px_rgba(99,102,241,0.35)]
              "
              style={{
                left: `calc(10% + ${progress} * 80%)`,
                opacity: progress > 0.01 ? 1 : 0,
              }}
            />

            {/* Steps */}

            <div className="relative grid grid-cols-5 gap-5">
              {hiringSteps.map((step, index) => {
                const stepProgress =
                  index / (hiringSteps.length - 1);

                const isActive =
                  progress >= stepProgress;

                const isPassed =
                  progress > stepProgress + 0.05;

                return (
                  <div
                    key={step.number}
                    className="flex flex-col items-center"
                  >
                    {/* =================================================
                        NODE
                    ================================================== */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border-[5px]
                        border-white
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? "scale-110 bg-gray-950 shadow-[0_0_0_5px_rgba(99,102,241,0.10),0_0_20px_rgba(99,102,241,0.25)]"
                            : "scale-100 bg-gray-200"
                        }
                      `}
                    >
                      <span
                        className={`
                          h-2
                          w-2
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "bg-white"
                              : "bg-gray-300"
                          }
                        `}
                      />

                      {/* Active Pulse */}

                      {isActive && !isPassed && (
                        <span
                          className="
                            absolute
                            inset-[-6px]
                            rounded-full
                            border
                            border-indigo-400/30
                            animate-ping
                          "
                        />
                      )}
                    </div>

                    {/* =================================================
                        CARD
                    ================================================== */}

                    <div
                      className={`
                        relative
                        mt-8
                        w-full
                        rounded-[1.75rem]
                        border
                        p-6
                        backdrop-blur-xl
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? "border-indigo-200/70 bg-white/90 shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
                            : "border-black/[0.05] bg-gray-50/60"
                        }
                        ${
                          isActive
                            ? "-translate-y-2"
                            : "translate-y-0"
                        }
                      `}
                    >
                      {/* Gradient Edge */}

                      <div
                        className={`
                          absolute
                          left-6
                          right-6
                          top-0
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-indigo-400
                          to-transparent
                          transition-opacity
                          duration-500
                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        `}
                      />

                      <span
                        className={`
                          text-xs
                          font-bold
                          tracking-[0.2em]
                          transition-colors
                          duration-300
                          ${
                            isActive
                              ? "text-indigo-500"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {step.number}
                      </span>

                      <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-950">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {step.description}
                      </p>

                      {/* Bottom Progress */}

                      <div className="mt-6 h-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-blue-500
                            to-violet-500
                            transition-all
                            duration-500
                          "
                          style={{
                            width: isActive
                              ? "100%"
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===================================================
              MOBILE TIMELINE
          ==================================================== */}

          <div className="lg:hidden">
            {/* Base Line */}

            <div
              className="
                absolute
                bottom-8
                left-[13px]
                top-8
                w-[2px]
                rounded-full
                bg-gray-200
              "
            />

            {/* Progress Line */}

            <div
              className="
                absolute
                left-[13px]
                top-8
                w-[2px]
                origin-top
                rounded-full
                bg-gradient-to-b
                from-blue-500
                via-indigo-500
                to-violet-500
                shadow-[0_0_12px_rgba(99,102,241,0.30)]
              "
              style={{
                height: `calc(${progress} * (100% - 64px))`,
              }}
            />

            <div className="space-y-7">
              {hiringSteps.map((step, index) => {
                const stepProgress =
                  index / (hiringSteps.length - 1);

                const isActive =
                  progress >= stepProgress;

                const isPassed =
                  progress > stepProgress + 0.05;

                return (
                  <div
                    key={step.number}
                    className="relative flex items-start gap-6"
                  >
                    {/* Node */}

                    <div
                      className={`
                        relative
                        z-10
                        mt-1
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border-[5px]
                        border-white
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? "scale-110 bg-gray-950 shadow-[0_0_0_5px_rgba(99,102,241,0.10),0_0_18px_rgba(99,102,241,0.20)]"
                            : "bg-gray-200"
                        }
                      `}
                    >
                      <span
                        className={`
                          h-2
                          w-2
                          rounded-full
                          ${
                            isActive
                              ? "bg-white"
                              : "bg-gray-300"
                          }
                        `}
                      />

                      {isActive && !isPassed && (
                        <span
                          className="
                            absolute
                            inset-[-6px]
                            rounded-full
                            border
                            border-indigo-400/30
                            animate-ping
                          "
                        />
                      )}
                    </div>

                    {/* Card */}

                    <div
                      className={`
                        flex-1
                        rounded-[1.75rem]
                        border
                        p-6
                        backdrop-blur-xl
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? "translate-x-0 border-indigo-200/70 bg-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
                            : "translate-x-2 border-black/[0.05] bg-gray-50/60 opacity-70"
                        }
                      `}
                    >
                      <span
                        className={`
                          text-xs
                          font-bold
                          tracking-[0.2em]
                          ${
                            isActive
                              ? "text-indigo-500"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {step.number}
                      </span>

                      <h3 className="mt-3 text-xl font-semibold text-gray-950">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {step.description}
                      </p>

                      <div className="mt-6 h-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-blue-500
                            to-violet-500
                            transition-all
                            duration-500
                          "
                          style={{
                            width: isActive
                              ? "100%"
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Note */}

        <div
          className="
            mx-auto
            mt-10
            max-w-2xl
            text-center
            text-sm
            leading-6
            text-gray-500
          "
        >
          We believe the best hiring experiences are clear,
          thoughtful, and focused on finding the right fit for
          both the candidate and the team.
        </div>
      </div>
    </section>
  );
}