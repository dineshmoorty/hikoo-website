const features = [
  "Business-specific software",
  "Custom workflows and integrations",
  "Scalable application architecture",
  "Solutions tailored to your requirements",
];

export default function CustomSoftware() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-full">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Card */}

          <div
            className="
              order-2
              rounded-3xl
              border
              border-black/[0.06]
              bg-gradient-to-br
              from-violet-50
              via-white
              to-fuchsia-50
              p-7
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              sm:p-8
              lg:order-1
            "
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-950">
              What we deliver
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
                Approach
              </p>

              <p className="mt-2 text-sm font-medium text-gray-800">
                Understand · Build · Improve
              </p>
            </div>
          </div>

          {/* Right Content */}

          <div className="order-1 lg:order-2">
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
              06 · Custom Software Solutions
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
              Software designed
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-violet-700
                  to-fuchsia-600
                  bg-clip-text
                  text-transparent
                "
              >
                around your needs.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
              When an off-the-shelf solution isn't enough, we create
              custom software around your workflows, requirements,
              and long-term business goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}