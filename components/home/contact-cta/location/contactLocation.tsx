export default function ContactLocation() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-full">
        {/* Heading */}

        <div className="max-w-3xl">
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
            Find Us
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
            Visit us in
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
              Madurai.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            Come meet the HIKOO Technology team at our office in
            Madurai.
          </p>
        </div>

        {/* Map + Address */}

        <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-black/[0.06] bg-gray-50 shadow-[0_12px_40px_rgba(0,0,0,0.05)] lg:grid-cols-[1.5fr_0.5fr]">
          {/* Map */}

          <div className="relative min-h-[360px] bg-gray-100 sm:min-h-[420px]">
            <iframe
              title="HIKOO Technology Location"
              src="https://www.google.com/maps?q=No.333,+1st+Floor,+Opp.+Postal+Training+Institute,+Perungudi+Bus+Stop,+Madurai+625022&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address */}

          <div className="flex flex-col justify-between bg-gradient-to-br from-blue-50 via-white to-violet-50 p-7 sm:p-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                HIKOO Technology
              </span>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-950">
                Our Office
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                No.333, 1st Floor,
                <br />
                Opp. Postal Training Institute,
                <br />
                Perungudi Bus Stop,
                <br />
                Madurai 625022
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=HIKOO+Technology+Madurai"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-8
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                bg-gray-950
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-gray-950/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-black
              "
            >
              Open in Maps

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}