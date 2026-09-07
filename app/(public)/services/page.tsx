// import type { Metadata } from "next";

// import ServicesHero from "@/components/home/services/hero/ServicesHero";
// import WebDevelopment from "@/components/home/services/web-development/WebDevelopment";
// import JavaDevelopment from "@/components/home/services/java-development/javaDevelopment";
// import IOSDevelopment from "@/components/home/services/ios-development/iosDevelopment";
// import PythonDevelopment from "@/components/home/services/python-development/pythonDevelopment";
// import FullStackDevelopment from "@/components/home/services/full-stack/fullStack";
// import CustomSoftware from "@/components/home/services/custom-software/customSoftware";
// import ServicesCTA from "@/components/home/services/cta/serviceCTA";
// import CyberSecurity from "@/components/home/services/cyberSecurity/cyberSecurity";

// export const metadata: Metadata = {
//   title: "Service - Software Development Services",

//   description:
//     "HIKOO Technology provides web, Java, iOS, Python, full stack, and custom software development services for modern businesses.",

//   keywords: [
//     "HIKOO Technology services",
//     "software development services",
//     "web development company",
//     "web development Madurai",
//     "Java development company",
//     "Java development Madurai",
//     "iOS development company",
//     "iOS development Madurai",
//     "Python development company",
//     "Python development Madurai",
//     "React development company",
//     "Next.js development company",
//     "full stack development",
//     "custom software development",
//     "IT company Madurai",
//   ],

//   authors: [
//     {
//       name: "HIKOO Technology",
//     },
//   ],

//   creator: "HIKOO Technology",

//   robots: {
//     index: true,
//     follow: true,
//   },

//   alternates: {
//     canonical: "https://hikoo.in/services",
//   },

//   openGraph: {
//     title: "Software Development Services | HIKOO Technology",

//     description:
//       "Explore HIKOO Technology's web, Java, iOS, Python, full stack, and custom software development services.",

//     url: "https://hikoo.in/services",

//     siteName: "HIKOO Technology",

//     locale: "en_IN",

//     type: "website",
//   },

//   twitter: {
//     card: "summary_large_image",

//     title: "Software Development Services | HIKOO Technology",

//     description:
//       "Modern software development services from HIKOO Technology.",
//   },
// };

// export default function ServicesPage() {
//   return (
//     <main>
//       <ServicesHero />
//       <WebDevelopment />
//       <JavaDevelopment />
//       <IOSDevelopment />
//       <PythonDevelopment />
//       <FullStackDevelopment />
//       <CyberSecurity />
//       <CustomSoftware />
//       <ServicesCTA />
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  CreditCard,
  Database,
  GraduationCap,
  LayoutDashboard,
  Smartphone,
  Utensils,
  Globe2,
  ShieldCheck,
  Settings2,
  Sparkles,
  Workflow,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "FinTech Solutions",
    subtitle: "Digital solutions for financial businesses",
    description:
      "We build secure and scalable digital solutions for financial businesses, helping them manage customers, transactions, operations and business data through modern technology.",
    icon: CreditCard,
    features: [
      "Financial Web Applications",
      "Transaction Management",
      "Payment Integrations",
      "Customer Management",
      "Financial Dashboards",
      "Reports & Analytics",
      "Secure Admin Panels",
      "API Integrations",
    ],
  },
  {
    number: "02",
    title: "Food Ordering Solutions",
    subtitle: "Complete digital ordering experiences",
    description:
      "We create digital food ordering ecosystems for restaurants, food businesses and cloud kitchens across web and mobile platforms.",
    icon: Utensils,
    features: [
      "Food Ordering Websites",
      "iOS & Android Applications",
      "Menu Management",
      "Order Management",
      "Customer Management",
      "Restaurant Dashboard",
      "Payment Integration",
      "Order Tracking",
    ],
  },
  {
    number: "03",
    title: "Employee Management Solutions",
    subtitle: "Organize your workforce digitally",
    description:
      "We develop employee management platforms that help organizations manage employee accounts, profiles, roles, assignments and operational workflows.",
    icon: BriefcaseBusiness,
    features: [
      "Employee Accounts",
      "Employee Profiles",
      "Role-Based Access",
      "Department Management",
      "Designation Management",
      "Attendance Management",
      "Assignment Management",
      "Employee Dashboards",
    ],
  },
  {
    number: "04",
    title: "Student Management Solutions",
    subtitle: "Modern platforms for education",
    description:
      "We build student management platforms and portals for colleges, training institutes, academies and education-focused organizations.",
    icon: GraduationCap,
    features: [
      "Student Registration",
      "Student Profiles",
      "Course Management",
      "Internship Management",
      "Enrollment Management",
      "Attendance Tracking",
      "Mentor / Employee Assignment",
      "Certificates & Progress",
    ],
  },
  {
    number: "05",
    title: "Website Development",
    subtitle: "Static & dynamic websites",
    description:
      "From simple business websites to database-driven platforms, we design and develop modern websites that work across desktop, tablet and mobile devices.",
    icon: Globe2,
    features: [
      "Business Websites",
      "Company Websites",
      "Landing Pages",
      "Portfolio Websites",
      "Dynamic Web Applications",
      "Customer Portals",
      "Admin Dashboards",
      "Database-Driven Websites",
    ],
  },
  {
    number: "06",
    title: "Custom Software Development",
    subtitle: "Software designed around your requirements",
    description:
      "When your business needs something unique, we design and develop custom software around your workflows, users, data and operational requirements.",
    icon: Code2,
    features: [
      "Custom Web Applications",
      "Business Management Systems",
      "Internal Tools",
      "Customer Portals",
      "API Development",
      "Database Systems",
      "Third-Party Integrations",
      "Business Automation",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We understand your business, users, requirements and existing workflow.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We convert requirements into a clear product structure and development plan.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We create clean, modern and user-focused interfaces for your platform.",
  },
  {
    number: "04",
    title: "Develop",
    description:
      "We build the frontend, backend, database and integrations required for the solution.",
  },
  {
    number: "05",
    title: "Test",
    description:
      "We test the system across workflows, devices and important user scenarios.",
  },
  {
    number: "06",
    title: "Deploy",
    description:
      "We prepare the application for production and help bring the solution live.",
  },
];

const technologies = [
  "Next.js",
  "React",
  "Java",
  "Python",
  "Artificial Intelligence",
  "PHP",
  "Node.js",
  "MySQL",
  "MongoDB",
  "Express.js",
  "Spring Boot",
  "PostgreSQL",
  "REST APIs",
  "iOS",
  "Android",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.07),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.05),_transparent_35%)]" />

        <div className="mx-auto max-w-full px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              HIKOO Services
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
              Technology built
              <span className="block text-slate-500">
                around your business.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              From FinTech and food ordering platforms to management systems
              and modern websites, HIKOO builds digital solutions designed
              around real business requirements.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-300 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-300"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              What We Do
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Digital solutions for
              <br />
              different industries.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600 lg:ml-auto">
            HIKOO combines product thinking, software development and modern
            technology to create platforms that solve practical business
            problems.
          </p>
        </div>

        {/* SERVICE GRID */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-slate-100 blur-3xl transition group-hover:bg-slate-200" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <span className="text-sm font-semibold tracking-widest text-slate-400">
                      {service.number}
                    </span>
                  </div>

                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {service.subtitle}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    {service.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                    {service.description}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* WEBSITE DEVELOPMENT DETAIL */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Globe2 className="h-7 w-7" />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Website Development
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                From simple websites
                <br />
                to complete platforms.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                Whether you need a simple company website or a complex
                database-driven platform, HIKOO can design and develop the
                solution around your requirements.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Globe2 className="h-6 w-6 text-slate-800" />

                <h3 className="mt-5 font-semibold text-slate-950">
                  Static Websites
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fast and professional websites for businesses, startups,
                  brands, portfolios and landing pages.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Database className="h-6 w-6 text-slate-800" />

                <h3 className="mt-5 font-semibold text-slate-950">
                  Dynamic Websites
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Data-driven platforms with authentication, databases,
                  dashboards, APIs and business workflows.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Smartphone className="h-6 w-6 text-slate-800" />

                <h3 className="mt-5 font-semibold text-slate-950">
                  Responsive Design
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Interfaces designed to work smoothly across desktop, tablet
                  and mobile devices.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <LayoutDashboard className="h-6 w-6 text-slate-800" />

                <h3 className="mt-5 font-semibold text-slate-950">
                  Admin Systems
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Management dashboards that give businesses control over
                  their data and operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section>
        <div className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Our Process
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              From idea to working software.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              We follow a structured development process so that every project
              has a clear direction from the first conversation to deployment.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-semibold tracking-widest text-slate-400">
                  {step.number}
                </span>

                <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <Workflow className="h-5 w-5 text-slate-800" />
                </div>

                <h3 className="mt-5 font-semibold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Technology
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Modern technology.
                <br />
                Practical engineering.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600">
                We choose technologies based on the requirements of the
                product, scalability, maintainability and user experience.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {technologies.map((technology) => (
                <div
                  key={technology}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
                >
                  <Code2 className="h-5 w-5 text-slate-500" />

                  <span className="text-sm font-semibold text-slate-800">
                    {technology}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY HIKOO */}
      <section>
        <div className="mx-auto max-w-full px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Why HIKOO
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              More than just development.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              We focus on understanding the problem first and then building
              technology that makes the solution practical.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Security",
                text: "Security-conscious architecture and role-based access.",
              },
              {
                icon: Settings2,
                title: "Scalability",
                text: "Systems designed with future growth in mind.",
              },
              {
                icon: BarChart3,
                title: "Business Focus",
                text: "Technology aligned with real business workflows.",
              },
              {
                icon: Smartphone,
                title: "User Experience",
                text: "Responsive interfaces designed for real users.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-5 w-5 text-slate-800" />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-full px-6 pb-20 lg:px-8 lg:pb-28">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Have a Project?
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s build something useful.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Tell us about your business, your requirements and the problem
                you want to solve. We&apos;ll explore the right digital
                solution together.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-700 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-gray-700"
                >
                  Contact HIKOO
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/clients"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  View Our Clients
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}