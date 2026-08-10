export default function WhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-gray-50/60 px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      {/* Soft Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-1/2
          h-72
          w-72
          -translate-y-1/2
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left */}

          <div>
            <span
              className="
                inline-flex
                rounded-full
                border
                border-black/[0.06]
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-600
                shadow-sm
              "
            >
              Who We Are
            </span>

            <h2
              className="
                mt-5
                text-4xl
                md-text-5xl
                lg:text-6xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-950
                sm:text-5xl
              "
            >
              A technology team
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
                built for what&apos;s next.
              </span>
            </h2>
          </div>

          {/* Right */}

          <div className="space-y-4 text-base leading-7 text-gray-600">
            <p>
              HIKOO Technology is a growing software and technology
              company focused on creating modern digital solutions
              for businesses and organizations.
            </p>

            <p>
              We bring together software development, thoughtful
              design, and modern technologies to transform ideas
              into reliable digital products and experiences.
            </p>

            <p>
              Our approach is simple: understand the problem,
              build the right solution, and create technology that
              can grow alongside our clients.
            </p>
          </div>
        </div>

        {/* Highlights */}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-400">
              Founded
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-950">
              2026
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-400">
              Focus
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-950">
              Digital Solutions
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-400">
              Approach
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-950">
              Innovation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}