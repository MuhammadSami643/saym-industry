import type { Metadata } from 'next';
import RegionalPrivateLabelTemplate from '../components/RegionalPrivateLabelTemplate';
import { REGIONAL_MARKETS } from '../lib/regionalMarketData';

const config = REGIONAL_MARKETS.uk;

export const metadata: Metadata = {
  title: `${config.title} | Bin Rasool Enterprises`,
  description: config.description,
  alternates: {
    canonical: `/${config.slug}`,
  },
};

export default function UkMarketPage() {
  return <RegionalPrivateLabelTemplate config={config} />;
}
