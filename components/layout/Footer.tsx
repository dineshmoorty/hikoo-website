import Link from "next/link";

const quickLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Internship",
    href: "/internship",
  },
  {
    name: "Careers",
    href: "/careers",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const services = [
  "Java Development",
  "iOS Development",
  "React Development",
  "Python Development",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/[0.06] bg-white">
      {/* Soft Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-0
          h-80
          w-80
          rounded-full
          bg-blue-50/70
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-32
          h-80
          w-80
          rounded-full
          bg-violet-50/60
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-full px-6 py-14 lg:px-8 lg:py-16">
        {/* Main Footer */}

        <div
          className="
            grid
            gap-10
            sm:grid-cols-2
            lg:grid-cols-[1.3fr_0.7fr_0.8fr_1.4fr]
          "
        >
          {/* =========================
              BRAND
          ========================== */}

          <div>
            <Link
              href="/"
              className="
                text-2xl
                font-bold
                tracking-tight
                text-gray-950
              "
            >
              HIKOO Technologies
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-600">
              Building modern digital solutions that transform ideas
              into meaningful technology experiences.
            </p>

            <Link
              href="/contact"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-black/[0.08]
                bg-white/70
                px-5
                py-2.5
                text-sm
                font-medium
                text-gray-800
                shadow-sm
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-gray-400
                hover:text-white
              "
            >
              Let's Talk
              <span>→</span>
            </Link>
          </div>

          {/* =========================
              QUICK LINKS
          ========================== */}

          <div>
            <h3 className="text-sm font-semibold text-gray-950">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="
                      text-sm
                      text-gray-500
                      transition-colors
                      duration-200
                      hover:text-gray-950
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              SERVICES
          ========================== */}

          <div>
            <h3 className="text-sm font-semibold text-gray-950">
              Services
            </h3>

            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-500">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              CONTACT
          ========================== */}

          <div>
            <h3 className="text-sm font-semibold text-gray-950">
              Contact
            </h3>

            <div className="mt-5 space-y-5">
              {/* Phone */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Phone
                </p>

                <a
                  href="tel:+917598639009"
                  className="
                    mt-1
                    block
                    text-sm
                    leading-6
                    text-gray-600
                    transition-colors
                    duration-200
                    hover:text-gray-950
                  "
                >
                  +91 75986 39009
                </a>
              </div>

              {/* Email */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Email
                </p>

                <a
                  href="mailto:hikootechnology@gmail.com"
                  className="
                    mt-1
                    block
                    break-all
                    text-sm
                    leading-6
                    text-gray-600
                    transition-colors
                    duration-200
                    hover:text-gray-950
                  "
                >
                  hikootechnology@gmail.com
                </a>
              </div>

              {/* Address */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Office
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  No.333, 1st Floor,
                  <br />
                  Opp. Postal Training Institute,
                  <br />
                  Perungudi Bus Stop,
                  <br />
                  Madurai 625022
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="my-10 h-px bg-black/[0.06]" />

        {/* Bottom Bar */}

        <div
          className="
            flex
            flex-col
            gap-4
            text-sm
            text-gray-500
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © 2026 HIKOO Technology. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <span>Built with innovation</span>

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-500
              "
            />

            <span>Made for the future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}