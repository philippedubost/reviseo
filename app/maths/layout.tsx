import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Lexend } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Mathématiques - Reviseo",
  description: "Apprentissage des mathématiques",
};

export default function MathsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.className} antialiased`}
      >
        <main className="min-h-screen bg-[#181c24]">{children}</main>
      </body>
    </html>
  );
} 