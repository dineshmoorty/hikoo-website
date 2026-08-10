import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hikoo.in"),

  title: {
    default: "HIKOO Technology | Software Development & IT Solutions",
    template: "%s | HIKOO Technology",
  },

  description:
    "HIKOO Technology provides modern software development and digital solutions using React, Java, iOS, Python, and other modern technologies.",

  keywords: [
    "HIKOO Technology",
    "software development",
    "IT solutions",
    "web development",
    "React development",
    "Java development",
    "iOS development",
    "Python development",
    "software company Madurai",
    "IT company Madurai",
  ],

  authors: [
    {
      name: "HIKOO Technology",
    },
  ],

  creator: "HIKOO Technology",

  publisher: "HIKOO Technology",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hikoo.in",
    siteName: "HIKOO Technology",
    title: "HIKOO Technology | Software Development & IT Solutions",
    description:
      "Modern software development and digital solutions by HIKOO Technology.",
  },

  twitter: {
    card: "summary_large_image",
    title: "HIKOO Technology | Software Development & IT Solutions",
    description:
      "Modern software development and digital solutions by HIKOO Technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}