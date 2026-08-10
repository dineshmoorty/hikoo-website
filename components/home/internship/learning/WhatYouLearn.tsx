"use client";

import { useEffect, useRef, useState } from "react";

const learningAreas = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Build modern responsive websites and applications using React, Next.js, and TypeScript.",
    technologies: "React · Next.js · TypeScript",
    gradient: "from-blue-50 via-white to-cyan-50",
  },
  {
    number: "02",
    title: "Java Development",
    description:
      "Understand application development, backend systems, APIs, and structured software architecture.",
    technologies: "Java · REST APIs",
    gradient: "from-orange-50 via-white to-amber-50",
  },
  {
    number: "03",
    title: "iOS Development",
    description:
      "Learn how modern iOS applications are designed, developed, tested, and improved.",
    technologies: "iOS · Swift · SwiftUI",
    gradient: "from-slate-50 via-white to-blue-50",
  },
  {
    number: "04",
    title: "Python Development",
    description:
      "Work with Python to develop applications, backend services, APIs, and automation solutions.",
    technologies: "Python · APIs",
    gradient: "from-indigo-50 via-white to-violet-50",
  },
  {
    number: "05",
    title: "Full Stack Development",
    description:
      "Understand how frontend interfaces, backend services, APIs, and databases work together.",
    technologies: "Frontend · Backend · Database",
    gradient: "from-cyan-50 via-white to-blue-50",
  },
  {
    number: "06",
    title: "Professional Skills",
    description:
      "Develop practical skills in Git, teamwork, communication, problem solving, and project workflows.",
    technologies: "Git · Teamwork · Workflow",
    gradient: "from-violet-50 via-white to-fuchsia-50",
  },
];

export default function WhatYouLearn() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50/60 px-6 py-14 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/2
          h-80
          w-80
          -translate-y-1/2
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-72
          w-72
          rounded-full
          bg-violet-100/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full">
        {/* Heading */}

        <div className="max-w-3xl">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-black/[0.06]
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-gray-600
              shadow-sm
            "
          >
            What You&apos;ll Learn
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
            Learn the skills that
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
              move your career forward.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            During your internship, you&apos;ll work across technical
            concepts and practical development workflows that help
            turn classroom knowledge into real-world experience.
          </p>
        </div>

        {/* Learning Cards */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningAreas.map((item, index) => (
            <div
              key={item.number}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-black/[0.06]
                bg-gradient-to-br
                ${item.gradient}
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }
              `}
              style={{
                transitionDelay: visible
                  ? `${index * 80}ms`
                  : "0ms",
              }}
            >
              {/* Soft Card Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-28
                  w-28
                  rounded-full
                  bg-white/70
                  blur-2xl
                  transition-transform
                  duration-500
                  group-hover:scale-150
                "
              />

              <div className="relative">
                {/* Number + Technology */}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-400">
                    {item.number}
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-black/[0.06]
                      bg-white/70
                      px-3
                      py-1
                      text-[11px]
                      font-medium
                      text-gray-500
                      backdrop-blur-md
                    "
                  >
                    {item.technologies}
                  </span>
                </div>

                {/* Title */}

                <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-950">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>

                {/* Bottom Line */}

                <div
                  className="
                    mt-7
                    h-px
                    w-8
                    bg-gray-300
                    transition-all
                    duration-500
                    group-hover:w-full
                    group-hover:bg-gray-900
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}