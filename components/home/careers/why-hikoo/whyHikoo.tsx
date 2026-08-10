"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    number: "01",
    title: "Grow With the Team",
    description:
      "Work alongside a growing technology team and continuously develop your technical and professional capabilities.",
  },
  {
    number: "02",
    title: "Work on Real Projects",
    description:
      "Contribute to practical digital products and solutions where your work can make a meaningful difference.",
  },
  {
    number: "03",
    title: "Keep Learning",
    description:
      "Explore modern technologies, improve your problem-solving skills, and stay curious about better ways to build.",
  },
  {
    number: "04",
    title: "Take Ownership",
    description:
      "Get opportunities to take responsibility for your work, contribute ideas, and grow through real challenges.",
  },
];

export default function WhyWorkAtHikoo() {
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
      {/* Soft Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-1/2
          h-80
          w-80
          -translate-y-1/2
          rounded-full
          bg-blue-100/40
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
            Why Work at HIKOO
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
            Build. Learn.
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
              Grow together.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            At HIKOO, we believe strong teams are built through
            continuous learning, meaningful work, and a willingness
            to take on new challenges.
          </p>
        </div>

        {/* Reasons */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <div
              key={reason.number}
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
                sm:p-7
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }
              `}
              style={{
                transitionDelay: visible
                  ? `${index * 100}ms`
                  : "0ms",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400">
                  {reason.number}
                </span>

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-blue-500
                    transition-transform
                    duration-300
                    group-hover:scale-150
                  "
                />
              </div>

              <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-950">
                {reason.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {reason.description}
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