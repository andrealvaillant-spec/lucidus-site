import type { Metadata } from "next";
import { Outfit, DM_Sans, Fraunces, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-fraunces",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucidus Studio — Montage vidéo & Personal Branding",
  description:
    "Lucidus Studio crée des contenus vidéo percutants et forge des identités de marque inoubliables pour les entrepreneurs et infopreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${dmSans.variable} ${fraunces.variable} ${playfair.variable} font-sans antialiased bg-[#0A0A0A] text-warm-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
