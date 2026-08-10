import type { Metadata } from "next";

import ServicesHero from "@/components/home/services/hero/ServicesHero";
import WebDevelopment from "@/components/home/services/web-development/WebDevelopment";
import JavaDevelopment from "@/components/home/services/java-development/javaDevelopment";
import IOSDevelopment from "@/components/home/services/ios-development/iosDevelopment";
import PythonDevelopment from "@/components/home/services/python-development/pythonDevelopment";
import FullStackDevelopment from "@/components/home/services/full-stack/fullStack";
import CustomSoftware from "@/components/home/services/custom-software/customSoftware";
import ServicesCTA from "@/components/home/services/cta/serviceCTA";

export const metadata: Metadata = {
  title: "Service - Software Development Services",

  description:
    "HIKOO Technology provides web, Java, iOS, Python, full stack, and custom software development services for modern businesses.",

  keywords: [
    "HIKOO Technology services",
    "software development services",
    "web development company",
    "web development Madurai",
    "Java development company",
    "Java development Madurai",
    "iOS development company",
    "iOS development Madurai",
    "Python development company",
    "Python development Madurai",
    "React development company",
    "Next.js development company",
    "full stack development",
    "custom software development",
    "IT company Madurai",
  ],

  authors: [
    {
      name: "HIKOO Technology",
    },
  ],

  creator: "HIKOO Technology",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://hikoo.in/services",
  },

  openGraph: {
    title: "Software Development Services | HIKOO Technology",

    description:
      "Explore HIKOO Technology's web, Java, iOS, Python, full stack, and custom software development services.",

    url: "https://hikoo.in/services",

    siteName: "HIKOO Technology",

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Software Development Services | HIKOO Technology",

    description:
      "Modern software development services from HIKOO Technology.",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <WebDevelopment />
      <JavaDevelopment />
      <IOSDevelopment />
      <PythonDevelopment />
      <FullStackDevelopment />
      <CustomSoftware />
      <ServicesCTA />
    </main>
  );
}