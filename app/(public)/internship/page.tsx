import type { Metadata } from "next";

import InternshipHero from "@/components/home/internship/hero/internshipHero";
import WhyHikooInternship from "@/components/home/internship/why-internship/whyInternship";
import InternshipOpportunities from "@/components/home/internship/oppurtunities/InternshipOpportunities";
import WhatYouLearn from "@/components/home/internship/learning/WhatYouLearn";
import InternshipProcess from "@/components/home/internship/process/internshipProcess";
import InternshipCTA from "@/components/home/internship/cta/internshipCTA";

export const metadata: Metadata = {
  title: "Software Development Internship",

  description:
    "Explore software development internship opportunities at HIKOO Technology in Madurai. Gain practical experience, develop technical skills, and build your career through structured internship pathways.",

  keywords: [
    "HIKOO Technology internship",
    "software internship Madurai",
    "IT internship Madurai",
    "software development internship",
    "web development internship",
    "React internship",
    "Next.js internship",
    "Java internship",
    "Python internship",
    "iOS internship",
    "full stack internship",
    "college internship Madurai",
    "job internship Madurai",
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
    canonical: "https://hikoo.in/internship",
  },

  openGraph: {
    title: "Software Development Internship | HIKOO Technology",

    description:
      "Build practical skills and gain real-world experience through HIKOO Technology's structured internship programs.",

    url: "https://hikoo.in/internship",

    siteName: "HIKOO Technology",

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Software Development Internship | HIKOO Technology",

    description:
      "Explore internship opportunities and start your technology career with HIKOO Technology.",
  },
};

export default function InternshipPage() {
  return(
    <main>
      <InternshipHero />
      <WhyHikooInternship />
      <InternshipOpportunities />
      <WhatYouLearn />
      <InternshipProcess />
      <InternshipCTA />
    </main>
  );
}