import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#00513a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SheharSuno AI — Speak. Report. Improve your city.",
  description: "A voice- and photo-first civic issue reporting assistant for Pakistan.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "SheharSuno AI — Speak. Report. Improve your city.",
    description: "A voice- and photo-first civic issue reporting assistant for Pakistan.",
    siteName: "SheharSuno AI",
    locale: "en_PK",
    type: "website",
  },
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
