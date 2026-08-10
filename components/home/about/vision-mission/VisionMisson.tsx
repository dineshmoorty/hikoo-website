const values = [
  {
    label: "Our Vision",
    title: "Creating a future shaped by meaningful technology.",
    description:
      "We aim to build digital solutions that make technology more accessible, useful, and impactful for businesses and the people they serve.",
    gradient: "from-blue-50 via-white to-cyan-50",
  },
  {
    label: "Our Mission",
    title: "Turn ideas into reliable digital experiences.",
    description:
      "Our mission is to combine innovation, engineering, and thoughtful design to deliver practical solutions that solve real-world problems.",
    gradient: "from-violet-50 via-white to-purple-50",
  },
];

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-full">
        {/* Heading */}

        <div className="max-w-full">
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
            Our Direction
          </span>

          <h2
            className="
              mt-5
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
            Where we are
            <span
              className="
                bg-gradient-to-r
                from-blue-700
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              heading.
            </span>
          </h2>
        </div>

        {/* Cards */}

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.label}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-black/[0.06]
                bg-gradient-to-br
                ${value.gradient}
                p-7
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]
                sm:p-8
              `}
            >
              {/* Decorative Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-36
                  w-36
                  rounded-full
                  bg-white/70
                  blur-2xl
                  transition-transform
                  duration-500
                  group-hover:scale-150
                "
              />

              <div className="relative">
                <p className="text-sm font-semibold text-gray-500">
                  {value.label}
                </p>

                <h3 className="mt-5 max-w-lg text-2xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-3xl">
                  {value.title}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                  {value.description}
                </p>

                <div
                  className="
                    mt-8
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