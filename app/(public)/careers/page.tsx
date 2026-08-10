import type { Metadata } from "next";

import CareersHero from "@/components/home/careers/hero/carrersHero";
import WhyWorkAtHikoo from "@/components/home/careers/why-hikoo/whyHikoo";
import WhatWeLookFor from "@/components/home/careers/qualities/whatWeLook";
import HiringProcess from "@/components/home/careers/process/HiringProcess";
import CareersCTA from "@/components/home/careers/cta/careerCTA";

export const metadata: Metadata = {
  title: "Careers at HIKOO Technology",

  description:
    "Explore career opportunities at HIKOO Technology in Madurai. Join our growing technology team and build modern digital solutions with us.",

  keywords: [
    "HIKOO Technology careers",
    "HIKOO jobs",
    "software developer jobs Madurai",
    "IT jobs Madurai",
    "Java developer jobs",
    "Python developer jobs",
    "React developer jobs",
    "iOS developer jobs",
    "full stack developer jobs",
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://hikoo.in/careers",
  },

  openGraph: {
    title: "Careers at HIKOO Technology",
    description:
      "Explore career opportunities and join the growing technology team at HIKOO Technology.",
    url: "https://hikoo.in/careers",
    siteName: "HIKOO Technology",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Careers at HIKOO Technology",
    description:
      "Explore career opportunities at HIKOO Technology.",
  },
};

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <WhyWorkAtHikoo />
      <WhatWeLookFor />
      <HiringProcess />
      <CareersCTA />
    </main>
  );
}