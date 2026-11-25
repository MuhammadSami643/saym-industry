import type { Metadata } from "next";
import "./index.css";
import SiteShell from "./components/SiteShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Private Label Activewear Manufacturer in Pakistan | Bin Rasool Enterprises",
    template: "%s | Bin Rasool Enterprises Sialkot",
  },
  description: "Premier private label sportswear, fitness wear, fight gear and streetwear apparel manufacturer in Sialkot, Pakistan. Low MOQ, fast custom sampling, DHL air courier and worldwide B2B export.",
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    "clothing manufacturer Pakistan",
    "apparel manufacturer Pakistan export",
    "garment manufacturer Sialkot",
    "OEM clothing manufacturer Pakistan",
    "ODM clothing manufacturer Pakistan",
    "custom clothing manufacturer low MOQ",
    "clothing manufacturer for startups",
    "cut and sew manufacturer Pakistan",
    "tech pack to production clothing",
    "sample to bulk clothing manufacturer",
    "small batch clothing manufacturer",
    "clothing manufacturer for Shopify brands",
    "clothing manufacturer for Amazon FBA sellers",
    "China alternative clothing manufacturer",
    "Pakistan vs China clothing manufacturer",
    "Pakistan vs Bangladesh garment manufacturer",
    "clothing manufacturer Pakistan for USA brands",
    "clothing manufacturer Pakistan for UK brands",
    "clothing manufacturer Pakistan for Europe",
    "clothing manufacturer Pakistan for Canada",
    "clothing manufacturer Pakistan for Australia",
    "clothing manufacturer Pakistan for Germany",
    "clothing manufacturer Pakistan for UAE",
    "BSCI audited clothing manufacturer Pakistan",
    "WRAP certified garment factory",
    "OEKO-TEX certified clothing manufacturer",
    "ISO 9001 garment manufacturer Pakistan",
    "ethical clothing manufacturer Pakistan",
    "verified garment exporter Pakistan",
    "private label activewear manufacturer",
    "hoodies manufacturer",
    "custom hoodies manufacturer",
    "fitness wear manufacturer pakistan",
    "sportswear sialkot",
    "gym wear wholesale",
    "custom sportswear manufacturer",
    "hoodies manufacturer sialkot",
    "custom jeans pakistan",
    "bjj gi manufacturer pakistan",
    "custom tracksuits manufacturer",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google4c5916710aa3c49c',
    other: {
      'msvalidate.01': [process.env.NEXT_PUBLIC_BING_VERIFICATION || 'bre-bing-webmaster-verification'],
    },
  },
  openGraph: {
    title: "Bin Rasool Enterprises | Custom Apparel Manufacturer Sialkot",
    description: "OEM & Private Label manufacturer for fitness apparel, heavyweight streetwear, fight gear and sportswear. Worldwide B2B export.",
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
    description: "Private label activewear, combat gear, tracksuits and heavyweight streetwear. Low MOQ export factory.",
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
  description: "Direct OEM and private label manufacturer for activewear, fitness wear, heavyweight streetwear hoodies, pro boxing gear and sublimated sportswear based in Sialkot, Pakistan. Low 50-piece MOQ and worldwide express export.",
  slogan: "Direct OEM & Private Label Sportswear, Activewear & Combat Gear Manufacturer in Sialkot, Pakistan",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pakki Kotli, Daska Road",
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
      telephone: "+923133599241",
      contactType: "sales & export inquiry",
      email: "sales@binrasoolenterprises.com",
      areaServed: ["US", "GB", "CA", "AU", "DE", "FR", "NL", "ES", "IT", "ZA", "AE"],
      availableLanguage: ["English", "Urdu"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/bin-rasool-enterprises",
    "https://www.instagram.com/binrasoolenterprises",
  ],
  priceRange: "$$",
  currenciesAccepted: "USD, GBP, EUR, AUD, ZAR, AED, CAD",
  paymentAccepted: "Bank Wire (T/T), Letter of Credit (L/C)",
  knowsAbout: [
    "Private Label Sportswear Manufacturing",
    "Custom Activewear & Gym Apparel",
    "Heavyweight Streetwear & 450 GSM Hoodies",
    "Custom Boxing Gloves & Combat Equipment",
    "Sublimated Team Uniforms & Club Kits",
    "BJJ Gis & MMA Rashguards",
    "OEM & ODM Apparel Manufacturing Sialkot",
    "Screen Printing, Sublimation & 3D Silicone Heat Transfers",
    "Low MOQ Apparel Manufacturing 50 Pieces",
    "Fast 7-10 Days DHL Express Prototype Sampling",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "B2B Apparel Manufacturing & OEM Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "OEM & Private Label Activewear Manufacturing",
          description: "Custom fitness wear, leggings, tracksuits and gym wear starting from 50 pieces MOQ per style across standard sizes.",
        },
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 50,
          unitText: "pieces",
        },
        deliveryLeadTime: {
          "@type": "QuantitativeValue",
          minValue: 21,
          maxValue: 28,
          unitCode: "DAY",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Heavyweight Streetwear & Hoodie Manufacturing",
          description: "450–500 GSM French Terry hoodies, puff screen printing, vintage acid wash, custom aglets and woven labels.",
        },
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 50,
          unitText: "pieces",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Boxing Gloves & Combat Sports Gear",
          description: "Genuine cowhide leather boxing gloves, sparring gear, MMA shorts and BJJ Gis handcrafted in Sialkot, Pakistan.",
        },
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 50,
          unitText: "pairs",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rapid Prototype Sampling Program",
          description: "Physical pre-production prototype samples dispatched worldwide via DHL Express in 7 to 10 business days.",
        },
        deliveryLeadTime: {
          "@type": "QuantitativeValue",
          minValue: 7,
          maxValue: 10,
          unitCode: "DAY",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Core Web Vitals LCP Preload for Hero Banner */}
        <link
          rel="preload"
          as="image"
          href="/images/site/hero-slide-factory-craft.webp"
          type="image/webp"
          fetchPriority="high"
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
