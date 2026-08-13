import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | HIKOO",
  description:
    "Secure admin login for the HIKOO administration panel.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}