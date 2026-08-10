const features = [
  "Responsive web applications",
  "Modern React interfaces",
  "Scalable Next.js applications",
  "Performance-focused development",
];

export default function WebDevelopment() {
  return (
    <section className="relative overflow-hidden bg-gray-50/60 px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-full">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left */}

          <div>
            <span className="inline-flex rounded-full border border-black/[0.06] bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
              01 · Web Development
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl">
              Modern websites built
              <span className="block bg-gradient-to-r from-blue-700 to-violet-600 bg-clip-text text-transparent">
                for real businesses.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
              We create responsive and high-performance web experiences
              that combine thoughtful interfaces with reliable technical
              foundations.
            </p>
          </div>

          {/* Right */}

          <div className="rounded-3xl border border-black/[0.06] bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:p-8">
            <h3 className="text-xl font-semibold text-gray-950">
              What we build
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-black/[0.05] bg-white/70 p-4 backdrop-blur-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-gray-600">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-black/[0.06] pt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Technologies
              </p>

              <p className="mt-2 text-sm font-medium text-gray-800">
                React · Next.js · TypeScript
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}