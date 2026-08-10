export default function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-14 pt-32 sm:pb-16 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-40">
      {/* Soft Gradient Glows */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-20
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
        <div className="max-w-full">
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
            Careers at HIKOO
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
            Build your future
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
              with HIKOO.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-gray-600
              sm:text-lg
              sm:leading-8
            "
          >
            Join a growing technology team where you can learn,
            contribute, solve meaningful problems, and grow your
            career while building modern digital solutions.
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
                Learn
              </span>{" "}
              & Grow
            </div>

            <div className="hidden h-5 w-px bg-gray-200 sm:block" />

            <div>
              <span className="font-semibold text-gray-950">
                Build
              </span>{" "}
              Real Products
            </div>

            <div className="hidden h-5 w-px bg-gray-200 sm:block" />

            <div>
              <span className="font-semibold text-gray-950">
                Grow
              </span>{" "}
              With Us
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}