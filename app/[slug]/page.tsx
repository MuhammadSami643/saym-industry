import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RegionalPrivateLabelTemplate from '../components/RegionalPrivateLabelTemplate';
import { getMarketBySlug, getAllMarketSlugs } from '../lib/regionalMarketData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllMarketSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getMarketBySlug(slug);

  if (!config) {
    return {};
  }

  return {
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
}

export default async function DynamicRegionalMarketPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getMarketBySlug(slug);

  if (!config) {
    notFound();
  }

  return <RegionalPrivateLabelTemplate config={config} />;
}
