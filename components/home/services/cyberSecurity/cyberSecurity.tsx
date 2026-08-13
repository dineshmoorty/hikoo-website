const features = [
  "Security assessment and vulnerability analysis",
  "Web and application security",
  "Data protection and access control",
  "Security monitoring and risk management",
];

export default function CyberSecurity() {
  return (
    <section className="relative overflow-hidden bg-gray-50/60 px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-full">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* Left Content */}
          <div
            className="
              rounded-3xl
              border
              border-black/[0.06]
              bg-gradient-to-br
              from-cyan-50
              via-white
              to-blue-50
              p-7
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              sm:p-8
            "
          >
            <h3 className="text-xl font-semibold text-gray-950">
              What we secure
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="
                    rounded-2xl
                    border
                    border-black/[0.05]
                    bg-white/70
                    p-4
                    backdrop-blur-md
                  "
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="
                        mt-1
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-950
                        text-xs
                        text-white
                      "
                    >
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
                Security Focus
              </p>

              <p className="mt-2 text-sm font-medium text-gray-800">
                Application Security · Data Protection · Risk Assessment · Access Control
              </p>
            </div>
          </div>

          {/* right content */}
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
              06 · Cyber Security
            </span>

            <h2
              className="
                mt-5
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-950
                sm:text-5xl
              "
            >
              Protect what matters,
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-cyan-700
                  to-blue-600
                  bg-clip-text
                  text-transparent
                "
              >
                secure what comes next.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
              We help businesses identify security risks, protect
              applications and data, and build stronger digital
              environments through practical cybersecurity solutions.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}