import type { Metadata } from "next";

import AboutCTA from "@/components/home/about/cta/AboutCta";
import Expertise from "@/components/home/about/expertise/Expertise";
import AboutHero from "@/components/home/about/hero/AboutHero";
import Values from "@/components/home/about/values/Values";
import VisionMission from "@/components/home/about/vision-mission/VisionMisson";
import WhoWeAre from "@/components/home/about/who-we-are/WhoWeAre";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about HIKOO Technology, a growing software company in Madurai focused on modern digital solutions, software development, and technology innovation.",

  keywords: [
    "HIKOO Technology",
    "about HIKOO",
    "software company Madurai",
    "IT company Madurai",
    "software development company",
    "technology company Madurai",
    "HIKOO Technology Madurai",
  ],

  openGraph: {
    title: "About HIKOO Technology | Software & IT Solutions",
    description:
      "Learn about HIKOO Technology and our approach to building modern, scalable digital solutions.",
    url: "https://hikoo.in/about",
    siteName: "HIKOO Technology",
    type: "website",
  },

  alternates: {
    canonical: "https://hikoo.in/about",
  },
};


export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <VisionMission />
      <Expertise />
      <Values />
      <AboutCTA />
    </>
  );
}