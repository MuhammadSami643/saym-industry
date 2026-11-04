import type { Metadata } from "next";
import "./index.css";
import "./globals.css";
import SiteShell from "./components/SiteShell";

export const metadata: Metadata = {
  title: "Private Label Activewear Manufacturer in Pakistan | ZYPFIT",
  description: "Private label activewear, fitness wear, sportswear, and gym apparel manufacturer from Sialkot, Pakistan for startup brands and established international buyers. Low MOQ, custom sampling, and worldwide export.",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  keywords: [
    "private label activewear manufacturer",
    "fitness wear manufacturer pakistan",
    "sportswear sialkot",
    "gym wear wholesale",
    "custom sportswear manufacturer"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
