export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 sm:py-14 lg:px-8 lg:py-16">
      {/* Soft Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-80
          w-80
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
            py-10
            text-center
            shadow-[0_15px_50px_rgba(0,0,0,0.05)]
            sm:px-10
            sm:py-12
          "
        >
          <div className="relative mx-auto max-w-full">
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
              Let's Connect
            </span>

            <h2
              className="
                mt-5
                text-3xl
                md-text-4xl
                lg-text-5xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-950
                sm:text-4xl
              "
            >
              Ready to build something
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
                meaningful?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
              Let&apos;s turn your ideas into practical digital
              solutions together.
            </p>

            <div className="mt-7">
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
                Let&apos;s Talk
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}