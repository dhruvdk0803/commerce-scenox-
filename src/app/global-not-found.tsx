import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFoundContent } from "@/components/pages/NotFoundContent";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Page not found | Scenox Commerce",
  description: "This page doesn't exist. Find Scenox Commerce services, pricing and contact details.",
  robots: { index: false, follow: true },
};

/** 404 for URLs that match no route (the root layout sits under [market], so this renders its own shell). */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="main" className="flex-1">
          <NotFoundContent />
        </main>
        <Footer />
      </body>
    </html>
  );
}
