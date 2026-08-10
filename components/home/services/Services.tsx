const services = [
  {
    number: "01",
    title: "Java Development",
    description:
      "Reliable and scalable Java applications designed for modern business requirements.",
    gradient: "from-orange-50 via-white to-amber-50",
  },
  {
    number: "02",
    title: "iOS Development",
    description:
      "Modern iOS applications focused on smooth experiences, performance, and usability.",
    gradient: "from-slate-50 via-white to-blue-50",
  },
  {
    number: "03",
    title: "React Development",
    description:
      "Fast and responsive web experiences built with modern React technologies.",
    gradient: "from-cyan-50 via-white to-blue-50",
  },
  {
    number: "04",
    title: "Python Development",
    description:
      "Flexible Python solutions for automation, applications, data, and intelligent systems.",
    gradient: "from-blue-50 via-white to-indigo-50",
  },
  {
    number: "05",
    title: "Full Stack Development",
    description:
      "Complete web solutions combining intuitive interfaces with powerful backend systems.",
    gradient: "from-violet-50 via-white to-purple-50",
  },
  {
    number: "06",
    title: "Custom Software Solutions",
    description:
      "Purpose-built software solutions tailored to your unique business goals.",
    gradient: "from-rose-50 via-white to-orange-50",
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      {/* Background Glow */}

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
          bg-blue-50/60
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full">
        {/* Section Heading */}

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
            Our Services
          </span>

          <h2
            className="
              sm-text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-950
              sm:text-5xl
            "
          >
            Technology built around
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
              your business.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            From application development to complete digital solutions,
            we create technology that is practical, scalable, and built
            to grow with your business.
          </p>
        </div>

        {/* Service Cards */}

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.number}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-black/[0.06]
                bg-gradient-to-br
                ${service.gradient}
                p-7
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
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
                {/* Number */}

                <div className="flex items-center justify-between">
                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-400
                    "
                  >
                    {service.number}
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
                      group-hover:-rotate-45
                      group-hover:bg-gray-950
                      group-hover:text-white
                    "
                  >
                    ↗
                  </span>
                </div>

                {/* Title */}

                <h3
                  className="
                    mt-12
                    text-xl
                    font-semibold
                    tracking-tight
                    text-gray-950
                  "
                >
                  {service.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-4
                    text-sm
                    leading-6
                    text-gray-600
                  "
                >
                  {service.description}
                </p>

                {/* Bottom Line */}

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