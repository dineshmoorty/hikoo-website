const expertise = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Modern, responsive web applications built with scalable architectures and thoughtful user experiences.",
    technologies: "React · Next.js",
    gradient: "from-blue-50 via-white to-cyan-50",
  },
  {
    number: "02",
    title: "Java Development",
    description:
      "Reliable application solutions designed for performance, maintainability, and long-term growth.",
    technologies: "Java",
    gradient: "from-orange-50 via-white to-amber-50",
  },
  {
    number: "03",
    title: "iOS Development",
    description:
      "Native mobile experiences focused on usability, performance, and seamless interaction.",
    technologies: "iOS",
    gradient: "from-slate-50 via-white to-blue-50",
  },
  {
    number: "04",
    title: "Python Solutions",
    description:
      "Flexible Python-based solutions for applications, automation, data-driven systems, and intelligent workflows.",
    technologies: "Python",
    gradient: "from-indigo-50 via-white to-violet-50",
  },
];

export default function Expertise() {
  return (
    <section className="relative overflow-hidden bg-gray-50/60 px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
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
            Our Expertise
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
            Technology that turns
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
              ideas into reality.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            Our technical capabilities span modern web, mobile, and
            application development, allowing us to approach different
            business challenges with the right technology.
          </p>
        </div>

        {/* Expertise Cards */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {expertise.map((item) => (
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
                shadow-[0_10px_35px_rgba(0,0,0,0.04)]
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)]
                sm:p-7
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
                      text-xs
                      font-medium
                      text-gray-500
                      backdrop-blur-md
                    "
                  >
                    {item.technologies}
                  </span>
                </div>

                <h3 className="mt-9 text-xl font-semibold tracking-tight text-gray-950">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                  {item.description}
                </p>

                <div
                  className="
                    mt-7
                    h-px
                    w-10
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