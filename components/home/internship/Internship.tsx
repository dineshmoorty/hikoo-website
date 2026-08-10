const internshipHighlights = [
  "Work on real-world projects",
  "Learn from experienced developers",
  "Explore modern technologies",
];

export default function Internship() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      {/* Background Gradient */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/2
          h-[450px]
          w-[450px]
          -translate-y-1/2
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          bottom-0
          h-80
          w-80
          rounded-full
          bg-violet-100/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full">
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-black/[0.06]
            bg-gradient-to-br
            from-blue-50
            via-white
            to-violet-50
            px-7
            py-12
            shadow-[0_20px_60px_rgba(0,0,0,0.06)]
            sm:px-10
            sm:py-14
            lg:px-16
            lg:py-16
          "
        >
          {/* Decorative Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-blue-200/30
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-20
              h-64
              w-64
              rounded-full
              bg-violet-200/25
              blur-3xl
            "
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Content */}

            <div>
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-black/[0.06]
                  bg-white/70
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-600
                  backdrop-blur-md
                "
              >
                Internship Program
              </span>

              <h2
                className="
                  mt-6
                  max-w-full
                  text-4xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-gray-950
                  sm:text-5xl
                "
              >
                Start your journey.
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
                  Build your future.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-full
                  text-base
                  leading-7
                  text-gray-600
                  sm:text-lg
                  sm:leading-8
                "
              >
                Get hands-on experience, work with modern technologies,
                and grow your skills by working on meaningful projects
                with the HIKOO team.
              </p>

              <div className="mt-8">
                <a
                  href="/internship"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-gray-300
                    px-7
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-gray-950/10
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-gray-400
                    hover:shadow-xl
                  "
                >
                  Explore Internships
                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Right Highlights */}

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {internshipHighlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="
                    group
                    rounded-2xl
                    border
                    border-black/[0.06]
                    bg-white/65
                    p-5
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white/85
                    hover:shadow-md
                  "
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-950
                        text-xs
                        font-semibold
                        text-white
                      "
                    >
                      0{index + 1}
                    </span>

                    <p className="pt-1 text-sm font-medium leading-6 text-gray-700">
                      {highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}