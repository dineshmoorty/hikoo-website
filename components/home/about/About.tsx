export default function About() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      {/* Soft Gradient Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-96
          w-96
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-80
          w-80
          rounded-full
          bg-violet-100/30
          blur-3xl
        "
      />

      {/* Content */}
      <div className="relative mx-auto max-w-full">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          
          {/* Left Content */}
          <div>
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
              About HIKOO
            </span>

            <h2
              className="
                mt-6
                max-w-full
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
              Turning ideas into
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
                digital possibilities.
              </span>
            </h2>

            <p className="mt-6 max-w-full text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              HIKOO Technology is a growing technology company focused on
              building modern software solutions for businesses and
              organizations.
            </p>

            <p className="mt-4 max-w-full text-base leading-7 text-gray-600">
              We combine thoughtful design, reliable engineering, and
              emerging technologies to turn ideas into practical digital
              experiences.
            </p>

            <div className="mt-8">
              <a
                href="/about"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-gray-900
                  transition-all
                  duration-300
                  hover:gap-3
                "
              >
                Discover HIKOO
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-black/[0.06]
                bg-gradient-to-br
                from-blue-50
                via-white
                to-violet-50
                p-8
                shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                sm:p-10
              "
            >
              {/* Decorative Circle */}
              <div
                className="
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-blue-100/60
                  blur-2xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-16
                  -left-16
                  h-40
                  w-40
                  rounded-full
                  bg-violet-100/50
                  blur-2xl
                "
              />

              {/* Card Content */}
              <div className="relative">
                <div className="mb-10">
                  <p className="text-sm font-medium text-gray-500">
                    Our Focus
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-gray-950">
                    Technology with purpose.
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="
                      rounded-2xl
                      border
                      border-black/[0.05]
                      bg-white/70
                      p-5
                      backdrop-blur-md
                    "
                  >
                    <p className="text-3xl font-bold text-gray-950">
                      2026
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Established
                    </p>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-black/[0.05]
                      bg-white/70
                      p-5
                      backdrop-blur-md
                    "
                  >
                    <p className="text-3xl font-bold text-gray-950">
                      10+
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Team Members
                    </p>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-black/[0.05]
                      bg-white/70
                      p-5
                      backdrop-blur-md
                    "
                  >
                    <p className="text-3xl font-bold text-gray-950">
                      5+
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Technologies
                    </p>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-black/[0.05]
                      bg-white/70
                      p-5
                      backdrop-blur-md
                    "
                  >
                    <p className="text-3xl font-bold text-gray-950">
                      ∞
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Possibilities
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-black/[0.05] bg-white/60 p-5 backdrop-blur-md">
                  <p className="text-sm leading-6 text-gray-600">
                    From software development to digital innovation,
                    we focus on creating solutions that are simple,
                    scalable, and built for the future.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}