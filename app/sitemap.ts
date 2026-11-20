import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from './lib/blogs';
import { getProducts } from './actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';
  const currentDate = new Date();

  // 1. Static Core Pages
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
      url: `${baseUrl}/manufacturing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/private-label`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/track-order`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
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

  // 2. High-Intent Category & Product Hub Pages (Highest B2B Buyer Traffic)
  const categorySlugs = [
    // Primary Category Pages (Clean International URLs)
    'streetwear-manufacturer',
    'hoodies-manufacturer',
    'jeans-manufacturer',
    'fitness-wear-manufacturer',
    'sportswear-manufacturer',
    'boxing-wear-manufacturer',
    'boxing-gear-manufacturer-bulk',
    'mma-gear',
    'compression-wear',
    
    // High-Volume Commercial Intent Rewrites
    'custom-hoodies',
    'hoodies',
    'streetwear',
    'custom-jeans',
    'jeans',
    'denim',
    'boxing-gear',
    'boxing-wear',
    'combat-gear',
    'fitness-wear',
    'activewear',
    'sportswear',
    'tracksuits',
    'low-moq-activewear-manufacturer',
    'activewear-manufacturer-for-startups',
    'private-label-activewear-manufacturer',
    'custom-activewear-manufacturer',
    'custom-leggings-manufacturer',
    'custom-sports-bra-manufacturer',
    'private-label-gym-wear-manufacturer',
    'private-label-fitness-wear-manufacturer',
    'oem-activewear-manufacturer',
    'white-label-activewear-manufacturer',
    
    // Geo-Targeted High-Converting Export Hubs
    'wholesale-activewear-suppliers-usa',
    'wholesale-activewear-suppliers-uk',
    'wholesale-fitness-apparel-suppliers-europe',
    'private-label-activewear-manufacturer-usa',
    'private-label-activewear-manufacturer-uk',
    'private-label-activewear-manufacturer-europe',
    'private-label-activewear-manufacturer-germany',
    'private-label-activewear-manufacturer-france',
    'private-label-activewear-manufacturer-netherlands',
    'private-label-activewear-manufacturer-italy',
    'private-label-activewear-manufacturer-spain',
    'private-label-activewear-manufacturer-australia',

    // High-Volume Niche Categories
    // 1. Martial Arts & MMA Combat Gear
    'custom-rashguard-manufacturer',
    'mma-shorts-manufacturer',

    // 2. Custom Tracksuits & Warmups
    'custom-tracksuits',
    'fleece-tracksuits-manufacturer',
    'poly-tricot-warmup-manufacturer',

    // 3. Compression & Baselayers
    'custom-compression-tights',
    'athletic-baselayers-manufacturer',

    // 4. Sublimated Team Uniforms & Teamwear
    'sublimated-jerseys-manufacturer',
    'basketball-uniforms-manufacturer',

    // 5. Custom Jackets & Outerwear
    'puffer-jackets-manufacturer-bulk',
    'windbreaker-jackets-manufacturer',
  ];

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Dynamic Blog Articles (Informational & Top-of-Funnel SEO)
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // 4. Dynamic Products (from Supabase Database)
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productPages = products.map((product) => ({
      url: `${baseUrl}/products?id=${product.id || encodeURIComponent(product.name)}`,
      lastModified: product.created_at ? new Date(product.created_at) : currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (e) {
    console.warn('Sitemap warning: using static product list', e);
  }

  return [...staticPages, ...categoryPages, ...blogPages, ...productPages];
}
