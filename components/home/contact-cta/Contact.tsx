export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
      {/* Soft Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[350px]
          -translate-x-1/2
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
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-violet-100/40
          blur-3xl
        "
      />

      {/* CTA Card */}

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
            shadow-[0_20px_60px_rgba(0,0,0,0.05)]
            sm:px-10
            sm:py-14
            lg:py-16
          "
        >
          {/* Decorative Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -left-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-blue-200/30
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-16
              -right-16
              h-40
              w-40
              rounded-full
              bg-violet-200/30
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-full">
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
              Let's Build Together
            </span>

            {/* Heading */}

            <h2
              className="
                mt-6
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
              Have an idea?
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
                Let's make it happen.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-5
                max-w-full
                text-base
                leading-7
                text-gray-600
              "
            >
              Whether you are starting a new project or looking to
              transform an existing idea, our team is ready to help
              you build something meaningful.
            </p>

            {/* CTA */}

            <div className="mt-8">
              <a
                href="/contact"
                className="
                  inline-flex
                  items-center
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
                Let's Talk

                <span
                  className="
                    transition-transform
                    duration-300
                    hover:translate-x-1
                  "
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}