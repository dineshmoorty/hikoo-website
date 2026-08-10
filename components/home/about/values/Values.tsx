const values = [
  {
    number: "01",
    title: "Innovation",
    description:
      "We stay curious, explore new ideas, and use modern technology to create better solutions.",
  },
  {
    number: "02",
    title: "Quality",
    description:
      "We care about reliable engineering, thoughtful details, and delivering work we can be proud of.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "We believe the best results come from clear communication and working closely with our clients and team.",
  },
  {
    number: "04",
    title: "Growth",
    description:
      "We continuously learn, improve, and build solutions that can grow with changing business needs.",
  },
];

export default function Values() {
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
            Our Values
          </span>

          <h2
            className="
              mt-5
              text-4xl
              md-text-5xl
              lg-text-6xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-950
              sm:text-5xl
            "
          >
            Principles behind
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
              everything we build.
            </span>
          </h2>
        </div>

        {/* Values */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.number}
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
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400">
                  {value.number}
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
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}