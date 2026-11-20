import type { Metadata } from 'next';
import RegionalPrivateLabelTemplate from '../components/RegionalPrivateLabelTemplate';
import { REGIONAL_MARKETS } from '../lib/regionalMarketData';

const config = REGIONAL_MARKETS.uk;

export const metadata: Metadata = {
  title: `${config.title} | Bin Rasool Enterprises`,
  description: config.description,
  keywords: config.keywords,
  alternates: {
    canonical: `/${config.slug}`,
  },
  openGraph: {
    title: `${config.title} | Bin Rasool Enterprises`,
    description: config.description,
    url: `/${config.slug}`,
    images: [{ url: '/images/hero-factory.webp', width: 1200, height: 630 }],
  },
};

export default function UkMarketPage() {
  return <RegionalPrivateLabelTemplate config={config} />;
}
