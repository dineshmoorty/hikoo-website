"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const navItems = [
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="
          mx-auto
          max-w-full
          rounded-2xl
          border
          border-black/[0.06]
          bg-white/75
          px-4
          py-3
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          backdrop-blur-xl
          backdrop-saturate-150
          transition-all
          duration-300
          sm:px-6
        "
      >
        {/* =========================
            TOP BAR
        ========================== */}

        <div className="flex items-center justify-between">
          {/* Logo */}

          <Link
            href="/"
            onClick={closeMenu}
            className="
              flex
              items-center
              transition-opacity
              duration-200
              hover:opacity-80
            "
          >
            <Image
              src="/logo/hikoo-logo.png"
              alt="HIKOO Technology"
              width={140}
              height={45}
              priority
              className="
                h-auto
                w-[50px]
                object-contain
                sm:w-[50px]
              "
            />
              <span
                className="px-2
                  text-2xl
                  font-bold
                  tracking-tight
                  text-gray-600
                "
              >
                HIKOO
              </span>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  relative
                  text-sm
                  font-medium
                  text-gray-700
                  transition-colors
                  duration-200
                  hover:text-black

                  after:absolute
                  after:-bottom-1
                  after:left-0
                  after:h-px
                  after:w-0
                  after:bg-black
                  after:transition-all
                  after:duration-300

                  hover:after:w-full
                "
              >
                {item.name}
              </Link>
            ))}

            {/* Desktop CTA */}

            <Link
              href="/contact"
              className="
                rounded-full
                bg-gray-300
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-gray-400
                hover:shadow-lg
              "
            >
              Let's Talk
            </Link>
          </div>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((previous) => !previous)}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-black/[0.06]
              bg-white/70
              text-gray-900
              shadow-sm
              transition-all
              duration-300
              hover:bg-white
              lg:hidden
            "
          >
            {/* Top Line */}

            <span
              className={`
                absolute
                h-[2px]
                w-5
                rounded-full
                bg-gray-800
                transition-all
                duration-300
                ease-in-out
                ${
                  isOpen
                    ? "rotate-45"
                    : "-translate-y-1.5"
                }
              `}
            />

            {/* Bottom Line */}

            <span
              className={`
                absolute
                h-[2px]
                w-5
                rounded-full
                bg-gray-800
                transition-all
                duration-300
                ease-in-out
                ${
                  isOpen
                    ? "-rotate-45"
                    : "translate-y-1.5"
                }
              `}
            />
          </button>
        </div>

        {/* =========================
            MOBILE NAVIGATION
        ========================== */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            ease-in-out
            lg:hidden

            ${
              isOpen
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div
            className="
              mt-4
              border-t
              border-black/[0.06]
              pt-4
            "
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className={`
                    rounded-xl
                    px-4
                    py-3
                    text-base
                    font-medium
                    text-gray-700
                    transition-all
                    duration-300
                    ease-out

                    hover:bg-black/[0.04]
                    hover:text-gray-950

                    ${
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0"
                    }
                  `}
                  style={{
                    transitionDelay: isOpen
                      ? `${index * 50}ms`
                      : "0ms",
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTA */}

              <Link
                href="/contact"
                onClick={closeMenu}
                className={`
                  mt-2
                  rounded-full
                  bg-gray-300
                  px-5
                  py-3
                  text-center
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  ease-out

                  ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: isOpen
                    ? `${navItems.length * 50}ms`
                    : "0ms",
                }}
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}