"use client";

import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "CookOnStay Website",
    category: "Restaurant Website",
    description:
      "A modern digital presence for CookOnStay, designed to showcase its food, restaurant experience, menu and customer-facing services across desktop and mobile devices.",
    platform: ["Web", "Responsive"],
    frontend: "Next.js",
    backend: "Java + Spring Boot",
    database: "PostgreSQL",
    status: "In Development",
    href: "#cookonstay-website",
  },
  {
    number: "02",
    title: "CookOnStay Food Ordering App",
    category: "Food Ordering Platform",
    description:
      "A dedicated food ordering platform for CookOnStay, designed to provide customers with a convenient mobile ordering experience across iOS and Android.",
    platform: ["iOS", "Android"],
    frontend: "Mobile Application",
    backend: "Java + Spring Boot",
    database: "PostgreSQL",
    status: "In Development",
    href: "#cookonstay-app",
  },
];

const capabilities = [
  {
    icon: "🌐",
    title: "Modern Web Platform",
    description:
      "Responsive and modern web experiences built for today's customers.",
  },
  {
    icon: "⚙️",
    title: "Java Backend",
    description:
      "Scalable backend systems and REST APIs powered by Java and Spring Boot.",
  },
  {
    icon: "🗄️",
    title: "PostgreSQL",
    description:
      "Reliable relational data management for applications and business systems.",
  },
  {
    icon: "📱",
    title: "Mobile Platforms",
    description:
      "Application experiences designed for iOS and Android platforms.",
  },
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-950">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-white" />

        <div className="mx-auto max-w-full px-6 pb-20 pt-20 sm:px-8 lg:px-12 lg:pb-28 lg:pt-28">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Our Clients
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-7xl">
              Building technology
              <br />
              <span className="text-gray-400">
                for real businesses.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg">
              We work with businesses to design and build modern digital
              products, platforms and technology solutions that solve
              real-world problems.
            </p>

          </div>

          {/* Client introduction */}
          <div className="mt-16 grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl border border-gray-200 bg-gray-950 p-7 text-white shadow-xl lg:col-span-2 sm:p-9">

              <div className="flex flex-col justify-between gap-8 sm:flex-row">

                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                    Client 01
                  </p>

                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                    CookOnStay
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
                    Restaurant and food technology platform built with
                    modern web, backend and mobile technologies.
                  </p>
                </div>

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl text-gray-950">
                  C
                </div>

              </div>

              <div className="mt-9 flex flex-wrap gap-2">

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-200">
                  Restaurant Technology
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-200">
                  Food Ordering
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-200">
                  Web Platform
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-200">
                  Mobile Platform
                </span>

              </div>

            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-7 sm:p-9">

              <p className="text-sm font-semibold text-gray-400">
                PROJECT FOCUS
              </p>

              <p className="mt-5 text-2xl font-bold tracking-tight text-gray-950">
                Digital restaurant ecosystem
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                From customer-facing web experiences to mobile food ordering,
                the CookOnStay project brings multiple digital touchpoints
                together.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CLIENT PROJECTS
      ===================================================== */}
      <section className="border-b border-gray-100 py-20 sm:py-24">

        <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">

          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              CookOnStay
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Projects we are building
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-500">
              Two connected digital products designed to give CookOnStay a
              complete technology presence.
            </p>

          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">

            {projects.map((project) => (
              <article
                key={project.number}
                id={
                  project.number === "01"
                    ? "cookonstay-website"
                    : "cookonstay-app"
                }
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Project visual */}
                <div className="relative h-64 overflow-hidden bg-gray-950 p-7 sm:h-72 sm:p-9">

                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
                  <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full border border-white/10" />

                  <div className="relative flex h-full flex-col justify-between">

                    <div className="flex items-center justify-between">

                      <span className="text-sm font-semibold text-gray-400">
                        PROJECT {project.number}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-300">
                        {project.status}
                      </span>

                    </div>

                    <div>

                      <p className="text-sm font-medium text-gray-400">
                        {project.category}
                      </p>

                      <h3 className="mt-2 max-w-lg text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {project.title}
                      </h3>

                    </div>

                  </div>

                </div>

                {/* Project content */}
                <div className="p-7 sm:p-9">

                  <p className="text-sm leading-7 text-gray-500 sm:text-base">
                    {project.description}
                  </p>

                  {/* Platform */}
                  <div className="mt-7">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Platform
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      {project.platform.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700"
                        >
                          {item}
                        </span>
                      ))}

                    </div>

                  </div>

                  {/* Stack */}
                  <div className="mt-8 border-t border-gray-100 pt-7">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Technology Stack
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">

                      <div>
                        <p className="text-xs text-gray-400">
                          Frontend
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {project.frontend}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Backend
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {project.backend}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Database
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {project.database}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Project action */}
                  <div className="mt-8">

                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-950 transition group-hover:gap-3"
                    >
                      View project details
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>

                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          WEBSITE CASE STUDY
      ===================================================== */}
      <section
        id="cookonstay-website-details"
        className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24"
      >

        <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Project 01
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                CookOnStay
                <br />
                Website
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-500">
                A modern restaurant website designed to create a strong
                digital presence for CookOnStay and give customers a clear,
                responsive experience.
              </p>

            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">

              <h3 className="text-lg font-bold text-gray-950">
                What HIKOO is building
              </h3>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">

                {[
                  "Modern restaurant website",
                  "Responsive customer experience",
                  "Menu and food presentation",
                  "Restaurant information",
                  "Mobile-friendly interface",
                  "SEO-ready web structure",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-950 text-[10px] text-white">
                      ✓
                    </span>

                    <span className="text-sm leading-6 text-gray-600">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              <div className="mt-8 border-t border-gray-100 pt-7">

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Core Stack
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                    Next.js
                  </span>

                  <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                    Java
                  </span>

                  <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                    Spring Boot
                  </span>

                  <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                    PostgreSQL
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          APP CASE STUDY
      ===================================================== */}
      <section
        id="cookonstay-app"
        className="border-b border-gray-100 py-20 sm:py-24"
      >

        <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

            <div className="order-2 lg:order-1">

              <div className="rounded-3xl border border-gray-200 bg-gray-950 p-7 shadow-xl sm:p-10">

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-2xl">📱</p>

                    <p className="mt-4 text-sm font-semibold text-white">
                      iOS
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Food ordering experience for Apple devices.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-2xl">🤖</p>

                    <p className="mt-4 text-sm font-semibold text-white">
                      Android
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Food ordering experience for Android devices.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:col-span-2">
                    <p className="text-2xl">⚙️</p>

                    <p className="mt-4 text-sm font-semibold text-white">
                      Java + Spring Boot Backend
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Backend APIs and business logic supporting the
                      application ecosystem.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <div className="order-1 lg:order-2">

              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-950" />
                Project 02
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                CookOnStay
                <br />
                Food Ordering App
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-500">
                A mobile food ordering platform planned for iOS and Android,
                connecting customers with the CookOnStay ordering experience.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Food discovery and browsing",
                  "Cart and ordering experience",
                  "Customer account experience",
                  "Order management integration",
                  "iOS and Android platforms",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
                      ✓
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}
      <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">

        <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Our Technology
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Technology behind the project
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-500">
              CookOnStay is being developed using a modern technology
              architecture across web, backend, database and mobile platforms.
            </p>

          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {capabilities.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="py-20 sm:py-24">

        <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">

          <div className="rounded-3xl bg-gray-950 px-7 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Have a project in mind?
            </p>

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Let's build your next digital product.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              HIKOO builds modern websites, applications, backend systems and
              digital platforms for growing businesses.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/contact"
                className="rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Start a Project
              </Link>

              <Link
                href="/services"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}