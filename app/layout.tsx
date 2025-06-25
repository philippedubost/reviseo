'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { Lexend } from "next/font/google";
import Header from "../src/components/Header";
import "./globals.css";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide header for maths lesson and practice pages, and subject pages
  const shouldHideHeader = pathname?.includes('/lesson/') || 
                        pathname === '/maths/practice' ||
                        pathname?.match(/^\/[^\/]+$/); // Hide for subject pages like /maths, /francais, etc.
  
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.className} antialiased`}
      >
        {!shouldHideHeader && <Header />}
        <main className={`min-h-screen bg-[#181c24]`}>
          {children}
        </main>
      </body>
    </html>
  );
} 