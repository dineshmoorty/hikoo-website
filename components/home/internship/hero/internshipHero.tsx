export default function InternshipHero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-14 pt-32 sm:pb-16 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-40">
      {/* Soft Gradient Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-24
          h-80
          w-80
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
          h-72
          w-72
          rounded-full
          bg-violet-100/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full">
        <div className="max-w-4xl">
          {/* Label */}

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
            HIKOO Internship Program
          </span>

          {/* Heading */}

          <h1
            className="
              mt-6
              text-5xl
              font-bold
              leading-[1.05]
              tracking-[-0.04em]
              text-gray-950
              sm:text-6xl
              lg:text-7xl
            "
          >
            Learn by building
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
              real things.
            </span>
          </h1>

          {/* Description */}

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
            Start your technology journey with practical experience,
            guided learning, and opportunities to work on real-world
            projects with the HIKOO team.
          </p>

          {/* Highlights */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              gap-x-8
              gap-y-4
              text-sm
              text-gray-500
            "
          >
            <div>
              <span className="font-semibold text-gray-950">
                Practical
              </span>{" "}
              Experience
            </div>

            <div className="hidden h-5 w-px bg-gray-200 sm:block" />

            <div>
              <span className="font-semibold text-gray-950">
                Real
              </span>{" "}
              Projects
            </div>

            <div className="hidden h-5 w-px bg-gray-200 sm:block" />

            <div>
              <span className="font-semibold text-gray-950">
                Guided
              </span>{" "}
              Learning
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}