import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Maja Labs — Thoughtfully crafted software",
  description:
    "Maja Labs LLC builds beautifully simple apps that solve real everyday problems. Home of PayTogether and myFPL.",
  icons: {
    icon: "/images/MAJA.png",
    apple: "/images/MAJA.png",
  },
  openGraph: {
    title: "Maja Labs",
    description: "Thoughtfully crafted software",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
