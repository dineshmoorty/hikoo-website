"use client";

import { useEffect, useRef, useState } from "react";

const processSteps = [
  {
    number: "01",
    title: "Start Your Journey",
    description:
      "Choose the internship pathway that fits you. Job applicants can begin the internship process directly, while college students go through an assessment.",
  },
  {
    number: "02",
    title: "3 Months Internship",
    description:
      "Work on practical tasks, learn development workflows, and gain experience working in a professional technology environment.",
  },
  {
    number: "03",
    title: "3 Months Probation",
    description:
      "Continue developing your skills while taking on greater responsibility and becoming familiar with the expectations of the role.",
  },
  {
    number: "04",
    title: "Become Part of HIKOO",
    description:
      "After successfully progressing through the internship and probation journey, move forward as an employee at HIKOO.",
  },
];

export default function InternshipProcess() {
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
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Soft Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-80
          w-80
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-100/30
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
              bg-gray-50
              px-4
              py-2
              text-sm
              font-medium
              text-gray-600
            "
          >
            How It Works
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
            From learning
            <span
              className="
                bg-gradient-to-r
                from-blue-700
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              {" "}to becoming part of the team.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            Our internship journey is designed to gradually move
            you from practical learning toward professional
            responsibility.
          </p>
        </div>

        {/* Process */}

        <div className="relative mt-12">
          {/* Desktop Connecting Line */}

          <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-blue-200 via-violet-200 to-blue-200 lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className={`
                  relative
                  rounded-3xl
                  border
                  border-black/[0.06]
                  bg-gradient-to-br
                  from-gray-50
                  via-white
                  to-blue-50/40
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
                    ? `${index * 120}ms`
                    : "0ms",
                }}
              >
                {/* Number */}

                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.06] bg-white text-sm font-bold text-gray-950 shadow-sm">
                  {step.number}
                </div>

                {/* Content */}

                <h3 className="mt-7 text-xl font-semibold tracking-tight text-gray-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* College Note */}

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-blue-100
            bg-blue-50/50
            px-5
            py-4
            text-sm
            leading-6
            text-gray-600
          "
        >
          <span className="font-semibold text-gray-900">
            College Internship:
          </span>{" "}
          The journey begins with an assessment before the
          3-month internship. Job Internship candidates proceed
          directly to the internship stage.
        </div>
      </div>
    </section>
  );
}