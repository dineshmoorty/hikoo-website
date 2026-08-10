const reasons = [
  {
    number: "01",
    title: "Innovation First",
    description:
      "We explore modern technologies and practical ideas to create solutions that keep businesses moving forward.",
    gradient: "from-blue-50 via-white to-cyan-50",
  },
  {
    number: "02",
    title: "Quality Engineering",
    description:
      "We focus on clean development, reliable performance, and solutions that are built to last.",
    gradient: "from-violet-50 via-white to-purple-50",
  },
  {
    number: "03",
    title: "Scalable Solutions",
    description:
      "Our solutions are designed with growth in mind, making it easier to evolve as your business expands.",
    gradient: "from-indigo-50 via-white to-blue-50",
  },
  {
    number: "04",
    title: "Client Focused",
    description:
      "We work closely with our clients to understand their goals and turn requirements into meaningful digital experiences.",
    gradient: "from-rose-50 via-white to-orange-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gray-50/60 px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-1/2
          h-96
          w-96
          -translate-y-1/2
          rounded-full
          bg-violet-100/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-80
          w-80
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full">
        {/* Heading */}

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
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
              Why HIKOO?
            </span>

            <h2
              className="
                mt-6
                text-4xl
                md-text-5xl
                lg:text-6xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-950
                sm:text-5xl
              "
            >
              Built to make
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
                technology simpler.
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:ml-auto">
            We believe great technology should solve real problems
            without creating unnecessary complexity. Our approach
            combines thoughtful design, reliable engineering, and
            a clear understanding of every client's goals.
          </p>
        </div>

        {/* Reasons */}

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-black/[0.06]
                bg-gradient-to-br
                ${reason.gradient}
                p-7
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]
                sm:p-8
              `}
            >
              {/* Decorative Circle */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-white/70
                  blur-2xl
                  transition-transform
                  duration-500
                  group-hover:scale-150
                "
              />

              <div className="relative">
                {/* Number */}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-400">
                    {reason.number}
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-black/[0.06]
                      bg-white/70
                      text-gray-500
                      transition-all
                      duration-300
                      group-hover:bg-gray-950
                      group-hover:text-white
                    "
                  >
                    +
                  </span>
                </div>

                {/* Content */}

                <h3 className="mt-12 text-xl font-semibold tracking-tight text-gray-950">
                  {reason.title}
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-gray-600">
                  {reason.description}
                </p>

                {/* Bottom Accent */}

                <div
                  className="
                    mt-8
                    h-px
                    w-10
                    bg-gray-300
                    transition-all
                    duration-500
                    group-hover:w-24
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