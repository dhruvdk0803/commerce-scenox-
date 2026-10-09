import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { MARKET_IDS } from "@/lib/markets";
import { getMarketId } from "@/lib/market-server";
import { MarketProvider } from "@/components/market/MarketProvider";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { AnalyticsScripts } from "@/components/consent/AnalyticsScripts";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Scenox Commerce — 1000 Products. 48 Hours. Live on Your Store.",
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Shopify bulk product upload service",
    "Shopify catalog management",
    "WooCommerce bulk product upload",
    "ecommerce catalog management",
    "ecommerce product catalog cleanup",
    "wholesale ecommerce catalog",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F5F4EF",
  width: "device-width",
  initialScale: 1,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return MARKET_IDS.map((market) => ({ market }));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const market = await getMarketId();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[6px] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <MarketProvider market={market}>{children}</MarketProvider>
        <ConsentBanner />
        <AnalyticsScripts />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
