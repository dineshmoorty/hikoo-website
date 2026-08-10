import type { Metadata } from "next";

import CareersHero from "@/components/home/careers/hero/carrersHero";
import WhyWorkAtHikoo from "@/components/home/careers/why-hikoo/whyHikoo";
import WhatWeLookFor from "@/components/home/careers/qualities/whatWeLook";
import HiringProcess from "@/components/home/careers/process/HiringProcess";
import CareersCTA from "@/components/home/careers/cta/careerCTA";

export const metadata: Metadata = {
  title: "Careers at HIKOO Technology",

  description:
    "Explore career opportunities at HIKOO Technology in Madurai. Join our growing technology team, work on real projects, and build your career with us.",

  keywords: [
    "HIKOO Technology careers",
    "HIKOO jobs",
    "software developer jobs Madurai",
    "IT jobs Madurai",
    "software jobs Madurai",
    "React developer jobs Madurai",
    "Java developer jobs Madurai",
    "Python developer jobs Madurai",
    "iOS developer jobs Madurai",
    "full stack developer jobs Madurai",
    "UI UX designer jobs Madurai",
    "data analyst jobs Madurai",
    "BDE jobs Madurai",
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
    canonical: "https://hikoo.in/careers",
  },

  openGraph: {
    title: "Careers at HIKOO Technology",

    description:
      "Join HIKOO Technology and build your career through real projects, continuous learning, and meaningful technology work.",

    url: "https://hikoo.in/careers",

    siteName: "HIKOO Technology",

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Careers at HIKOO Technology",

    description:
      "Explore career opportunities and join the growing technology team at HIKOO Technology.",
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