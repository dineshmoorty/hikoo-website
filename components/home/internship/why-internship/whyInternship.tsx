const benefits = [
  {
    number: "01",
    title: "Real Project Experience",
    description:
      "Work on practical projects and understand how software is developed in a real working environment.",
  },
  {
    number: "02",
    title: "Guided Learning",
    description:
      "Learn through structured tasks, technical guidance, and continuous feedback from the development team.",
  },
  {
    number: "03",
    title: "Modern Technologies",
    description:
      "Get exposure to technologies and development practices used to build modern digital products.",
  },
  {
    number: "04",
    title: "Professional Growth",
    description:
      "Develop technical skills, communication, teamwork, and the confidence needed for your career.",
  },
];

export default function WhyHikooInternship() {
  return (
    <section className="relative overflow-hidden bg-gray-50/60 px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
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
            Why HIKOO
          </span>

          <h2
            className="
              mt-5
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
            More than an internship.
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
              A place to grow.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            Our internship experience is designed to help students
            connect what they learn with how technology is actually
            built and delivered.
          </p>
        </div>

        {/* Benefits */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="
                group
                rounded-3xl
                border
                border-black/[0.06]
                bg-white
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]
                sm:p-7
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400">
                  {benefit.number}
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

              <h3 className="mt-7 text-xl font-semibold tracking-tight text-gray-950">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}