const technologies = [
  {
    name: "React",
    shortName: "R",
    description: "Modern web interfaces",
    gradient: "from-cyan-50 via-white to-blue-50",
  },
  {
    name: "Java",
    shortName: "J",
    description: "Scalable applications",
    gradient: "from-orange-50 via-white to-red-50",
  },
  {
    name: "iOS",
    shortName: "",
    description: "Native mobile experiences",
    gradient: "from-gray-50 via-white to-slate-100",
  },
  {
    name: "Python",
    shortName: "Py",
    description: "Powerful digital solutions",
    gradient: "from-blue-50 via-white to-yellow-50",
  },
  {
    name: "Next.js",
    shortName: "N",
    description: "High-performance web apps",
    gradient: "from-slate-50 via-white to-gray-100",
  },
];

export default function Technologies() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[450px]
          w-[450px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-50/70
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full">
        {/* Heading */}

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
            Technologies
          </span>

          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-950
              sm:text-5xl
            "
          >
            Powered by modern
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
              technology.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            We work with modern technologies to build fast, reliable,
            and scalable digital experiences.
          </p>
        </div>

        {/* Technology Cards */}

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {technologies.map((technology) => (
            <div
              key={technology.name}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-black/[0.06]
                bg-gradient-to-br
                ${technology.gradient}
                p-6
                shadow-[0_10px_35px_rgba(0,0,0,0.04)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]
              `}
            >
              {/* Glow */}

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
                {/* Technology Icon */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-black/[0.06]
                    bg-white/80
                    text-lg
                    font-bold
                    text-gray-900
                    shadow-sm
                    backdrop-blur-md
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                >
                  {technology.shortName}
                </div>

                {/* Name */}

                <h3 className="mt-7 text-lg font-semibold text-gray-950">
                  {technology.name}
                </h3>

                {/* Description */}

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {technology.description}
                </p>

                {/* Accent */}

                <div
                  className="
                    mt-6
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