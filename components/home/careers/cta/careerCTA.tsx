import Link from "next/link";

export default function CareersCTA() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      {/* Soft Gradient */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-96
          w-96
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-100/40
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
            px-6
            py-12
            text-center
            shadow-[0_15px_50px_rgba(0,0,0,0.05)]
            sm:px-10
            sm:py-14
          "
        >
          {/* Decorative Gradient */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-violet-200/30
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-20
              h-48
              w-48
              rounded-full
              bg-blue-200/30
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-2xl">
            {/* Label */}

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
              Join HIKOO
            </span>

            {/* Heading */}

            <h2
              className="
                mt-5
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-950
                sm:text-4xl
              "
            >
              Ready to build
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-blue-700
                  via-indigo-600
                  to-violet-600
                  bg-clip-text
                  text-transparent
                "
              >
                something meaningful?
              </span>
            </h2>

            {/* Description */}

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
              If you're passionate about technology, learning,
              and solving real-world problems, we'd love to hear
              from you.
            </p>

            {/* CTA */}

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="
                  group
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
                Apply Now

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>

              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/[0.08]
                  bg-white/70
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-gray-800
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  hover:shadow-md
                "
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}