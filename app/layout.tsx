import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SheharSuno AI — Civic Issue Reporting",
  description:
    "Report civic issues like blocked drains, garbage, potholes, and broken streetlights in Pakistan. SheharSuno AI classifies your complaint and drafts formal bilingual reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={`flex flex-col min-h-dvh ${plusJakartaSans.className}`}>
        {children}
      </body>
    </html>
  );
}
