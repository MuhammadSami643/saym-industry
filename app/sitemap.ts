import type { MetadataRoute } from 'next';
import { getPublishedBlogs } from './lib/blogsStore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';
  const currentDate = new Date();

  // 1. Static Core Pages (Clean Canonical URLs)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/manufacturing-process`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/private-label-manufacturing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/product-catalog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/order-sample`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/track-order`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/linesheet`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
  ];

  // 2. Primary B2B Category Divisions (Clean Canonical Pages ONLY - Zero Duplicate Aliases)
  const categorySlugs = [
    'hoodies-manufacturer',
    'streetwear-manufacturer',
    'jeans-manufacturer',
    'fitness-wear-manufacturer',
    'sportswear-manufacturer',
    'boxing-wear-manufacturer',
    'boxing-gear-manufacturer',
    'mma-gear',
    'compression-wear',

    // Dedicated Geo-Targeted Standalone Export Hubs (Real Standalone Pages)
    'activewear-manufacturer-for-startups',
    'private-label-activewear-manufacturer-usa',
    'private-label-activewear-manufacturer-uk',
    'private-label-activewear-manufacturer-europe',
    'private-label-activewear-manufacturer-germany',
    'private-label-activewear-manufacturer-france',
    'private-label-activewear-manufacturer-netherlands',
    'private-label-activewear-manufacturer-italy',
    'private-label-activewear-manufacturer-spain',
    'private-label-activewear-manufacturer-australia',
    'private-label-activewear-manufacturer-south-africa',
  ];

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Dynamic Blog Articles (Informational & Top-of-Funnel SEO)
  const publishedBlogs = getPublishedBlogs();
  const blogPages: MetadataRoute.Sitemap = publishedBlogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticPages, ...categoryPages, ...blogPages];
}
