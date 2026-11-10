import type { Metadata } from "next";
import "./index.css";
import "./globals.css";
import SiteShell from "./components/SiteShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Private Label Activewear Manufacturer in Pakistan | Bin Rasool Enterprises",
    template: "%s | Bin Rasool Enterprises Sialkot",
  },
  description: "Premier private label sportswear, fitness wear, fight gear, and streetwear apparel manufacturer in Sialkot, Pakistan. Low MOQ, fast custom sampling, DHL air courier, and worldwide B2B export.",
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicon.png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  keywords: [
    "private label activewear manufacturer",
    "fitness wear manufacturer pakistan",
    "sportswear sialkot",
    "gym wear wholesale",
    "custom sportswear manufacturer",
    "hoodies manufacturer sialkot",
    "custom jeans pakistan",
    "bjj gi manufacturer pakistan",
    "custom tracksuits manufacturer",
    "clothing manufacturer for startups low moq",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'bre-google-search-console-verification',
    other: {
      'msvalidate.01': [process.env.NEXT_PUBLIC_BING_VERIFICATION || 'bre-bing-webmaster-verification'],
    },
  },
  openGraph: {
    title: "Bin Rasool Enterprises | Custom Apparel Manufacturer Sialkot",
    description: "OEM & Private Label manufacturer for fitness apparel, heavyweight streetwear, fight gear, and sportswear. Worldwide B2B export.",
    url: siteUrl,
    siteName: "Bin Rasool Enterprises",
    images: [
      {
        url: "/images/site/1776603661_home-hero-slider-image-1.webp",
        width: 1200,
        height: 630,
        alt: "Bin Rasool Enterprises - Apparel Manufacturing Sialkot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bin Rasool Enterprises | Sialkot Apparel Manufacturer",
    description: "Private label activewear, combat gear, tracksuits, and heavyweight streetwear. Low MOQ export factory.",
    images: ["/images/site/1776603661_home-hero-slider-image-1.webp"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ManufacturingBusiness",
  name: "Bin Rasool Enterprises",
  legalName: "Bin Rasool Enterprises (Pvt) Ltd",
  url: siteUrl,
  logo: `${siteUrl}/images/site/1776250498_logo.webp`,
  image: `${siteUrl}/images/site/1776603661_home-hero-slider-image-1.webp`,
  description: "Private label activewear, sportswear, boxing gear, hoodies, jeans, and fitness apparel manufacturer from Sialkot, Pakistan.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Export Processing Zone / Industrial Area",
    addressLocality: "Sialkot",
    addressRegion: "Punjab",
    postalCode: "51310",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.4945,
    longitude: 74.5229,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+923376793383",
      contactType: "sales & export inquiry",
      email: "info@binrasoolenterprises.com",
      areaServed: ["US", "GB", "CA", "AU", "DE", "FR", "NL", "AE"],
      availableLanguage: ["English", "Urdu"],
    },
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        {/* Core Web Vitals LCP Preload for Hero Banner */}
        <link
          rel="preload"
          as="image"
          href="/images/site/1776603661_home-hero-slider-image-1.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
