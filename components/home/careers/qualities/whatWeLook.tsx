"use client";

import { useEffect, useRef, useState } from "react";

const qualities = [
  {
    number: "01",
    title: "Curiosity",
    description:
      "Stay curious, ask questions, explore new technologies, and keep looking for better ways to solve problems.",
  },
  {
    number: "02",
    title: "Problem Solving",
    description:
      "Approach challenges logically, break complex problems into smaller parts, and focus on practical solutions.",
  },
  {
    number: "03",
    title: "Teamwork",
    description:
      "Communicate clearly, collaborate with teammates, share ideas, and contribute to a positive working environment.",
  },
  {
    number: "04",
    title: "Ownership",
    description:
      "Take responsibility for your work, follow through on tasks, and learn from both successes and mistakes.",
  },
  {
    number: "05",
    title: "Adaptability",
    description:
      "Be open to learning new tools, technologies, workflows, and approaches as projects evolve.",
  },
  {
    number: "06",
    title: "Growth Mindset",
    description:
      "Focus on continuous improvement and be willing to learn, accept feedback, and develop your skills.",
  },
];

export default function WhatWeLookFor() {
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
      className="
        relative
        overflow-hidden
        bg-gray-50/60
        px-6
        py-14
        sm:py-16
        lg:px-8
        lg:py-20
      "
    >
      {/* Soft Gradient Glow */}

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
          bg-violet-100/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full">
        {/* Heading */}

        <div className="max-w-full">
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
            What We Look For
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
            Skills matter.
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
              Mindset matters too.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            We value people who are willing to learn, take
            responsibility, work together, and continuously improve
            the way they approach technology and problem solving.
          </p>
        </div>

        {/* Qualities */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality, index) => (
            <div
              key={quality.number}
              className={`
                group
                rounded-3xl
                border
                border-black/[0.06]
                bg-white
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]
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
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400">
                  {quality.number}
                </span>

                <span
                  className="
                    flex
                    h-2
                    w-2
                    rounded-full
                    bg-violet-500
                    transition-transform
                    duration-300
                    group-hover:scale-150
                  "
                />
              </div>

              <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-950">
                {quality.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {quality.description}
              </p>

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
          ))}
        </div>
      </div>
    </section>
  );
}