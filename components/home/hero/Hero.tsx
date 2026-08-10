export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* =========================
          BACKGROUND GRADIENTS
      ========================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Top-right glow */}
        <div
          className="
            absolute
            -right-32
            top-20
            h-80
            w-80
            rounded-full
            bg-blue-100/50
            blur-3xl
          "
        />

        {/* Bottom-left glow */}
        <div
          className="
            absolute
            -bottom-32
            -left-32
            h-96
            w-96
            rounded-full
            bg-violet-100/40
            blur-3xl
          "
        />

        {/* Center soft gradient */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-sky-50/70
            blur-3xl
          "
        />
      </div>

      {/* =========================
          HERO CONTENT
      ========================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-screen
          max-w-full
          items-center
          px-6
          pb-20
          pt-32
          sm:px-8
          lg:px-12
        "
      >
        <div className="w-full">
          {/* Small Badge */}

          <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-black/[0.06]
              bg-white/70
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              shadow-sm
              backdrop-blur-md
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            Building Digital Experiences
          </div>

          {/* Main Heading */}

          <h1
            className="
              max-w-5xl
              text-5xl
              font-bold
              leading-[1.05]
              tracking-[-0.04em]
              text-gray-950

              sm:text-6xl
              md:text-7xl
              lg:text-8xl
            "
          >
            Technology that
            <br />

            <span
              className="
                bg-gradient-to-r
                from-gray-950
                via-blue-700
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              moves ideas forward.
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-2xl
              text-base
              leading-7
              text-gray-600

              sm:text-lg
              sm:leading-8
            "
          >
            HIKOO Technology builds modern digital solutions that
            help businesses transform ideas into powerful,
            scalable products.
          </p>

          {/* Buttons */}

          <div
            className="
              mt-9
              flex
              flex-col
              gap-3

              sm:flex-row
            "
          >
            <a
              href="/contact"
              className="
                inline-flex
                items-center
                justify-center
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
              Let's Work Together
            </a>

            <a
              href="/services"
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
                shadow-sm
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-white
                hover:shadow-md
              "
            >
              Explore Services
            </a>
          </div>

          {/* Bottom Highlights */}

          <div
            className="
              mt-14
              flex
              flex-wrap
              items-center
              gap-x-8
              gap-y-4
              text-sm
              text-gray-500
            "
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                2026
              </span>
              <span>Founded</span>
            </div>

            <div className="hidden h-4 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                Innovation
              </span>
              <span>Driven</span>
            </div>

            <div className="hidden h-4 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                Digital
              </span>
              <span>Solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          DECORATIVE GRID
      ========================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          hidden
          h-72
          w-72
          opacity-30
          lg:block
        "
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(to bottom left, black, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom left, black, transparent)",
        }}
      />
    </section>
  );
}