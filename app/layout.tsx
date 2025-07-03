'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { Lexend } from "next/font/google";
import Header from "../src/components/Header";
import PageTransition from "../src/components/PageTransition";
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
  
  // Hide header for pages that use BreadcrumbHeader instead
  const shouldHideHeader = pathname?.includes('/lesson/') || 
                        pathname?.includes('/practice') ||
                        pathname?.match(/^\/[^\/]+$/) || // Hide for level pages like /sixieme, /cinquieme, etc.
                        pathname?.match(/^\/[^\/]+\/[^\/]+$/); // Hide for subject pages like /sixieme/maths, etc.
  
  return (
    <html lang="fr" data-theme="dark" className="dark">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="supported-color-schemes" content="dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.className} antialiased dark`}
        data-theme="dark"
      >
        {!shouldHideHeader && <Header />}
        <main className={`min-h-screen bg-[#181c24]`}>
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </body>
    </html>
  );
} 