import Link from "next/link";

const contactDetails = [
  {
    label: "Call Us",
    value: "+91 75986 39009",
    href: "tel:+917598639009",
  },
  {
    label: "Email",
    value: "hikootechnology@gmail.com",
    href: "mailto:hikootechnology@gmail.com",
  },
  {
    label: "Visit Us",
    value:
      "No.333, 1st Floor, Opp. Postal Training Institute, Perungudi Bus Stop, Madurai 625022",
    href: "https://www.google.com/maps/search/?api=1&query=HIKOO+Technology+Madurai",
  },
];

export default function ContactHero() {
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
        {/* Heading */}

        <div className="max-w-full">
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
            Get in Touch
          </span>

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
            Let&apos;s build
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
              something together.
            </span>
          </h1>

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
            Whether you have a project idea, a business enquiry,
            or questions about internships and careers, we&apos;d
            love to hear from you.
          </p>
        </div>

        {/* Contact Details */}

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {contactDetails.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={
                item.label === "Visit Us"
                  ? "_blank"
                  : undefined
              }
              rel={
                item.label === "Visit Us"
                  ? "noopener noreferrer"
                  : undefined
              }
              className="
                group
                rounded-3xl
                border
                border-black/[0.06]
                bg-gradient-to-br
                from-gray-50
                via-white
                to-blue-50/40
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]
              "
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {item.label}
              </span>

              <p className="mt-3 text-sm font-medium leading-6 text-gray-800 transition-colors duration-300 group-hover:text-blue-700">
                {item.value}
              </p>

              <div
                className="
                  mt-5
                  h-px
                  w-8
                  bg-gray-300
                  transition-all
                  duration-500
                  group-hover:w-full
                  group-hover:bg-blue-500
                "
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}