import ContactForm from "@/components/home/contact-cta/form/contactForm";
import ContactHero from "@/components/home/contact-cta/hero/contactHero";
import ContactLocation from "@/components/home/contact-cta/location/contactLocation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact HIKOO Technology | Madurai",

  description:
    "Contact HIKOO Technology in Madurai for software development, technology solutions, internships, careers, and business enquiries.",

  keywords: [
    "Contact HIKOO Technology",
    "HIKOO Technology Madurai",
    "HIKOO contact",
    "software company Madurai",
    "IT company Madurai",
    "technology company Madurai",
    "software development company Madurai",
    "web development company Madurai",
    "HIKOO internship enquiry",
    "HIKOO careers",
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
    canonical: "https://hikoo.in/contact",
  },

  openGraph: {
    title: "Contact HIKOO Technology | Madurai",

    description:
      "Get in touch with HIKOO Technology in Madurai for software development, technology solutions, internships, careers, and business enquiries.",

    url: "https://hikoo.in/contact",

    siteName: "HIKOO Technology",

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact HIKOO Technology | Madurai",

    description:
      "Get in touch with HIKOO Technology in Madurai.",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      {/* <ContactLocation /> */}
    </main>
  );
}