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
      url: `${baseUrl}/get-quote`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
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
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
  ];

  // 2. High-Intent Category & Product Hub Pages (Highest B2B Buyer Traffic)
  const categorySlugs = [
    // Primary Category Pages
    'streetwear-manufacturer-pakistan',
    'hoodies-manufacturer-pakistan',
    'jeans-manufacturer-pakistan',
    'fitness-wear-manufacturer',
    'fitness-wear-manufacturer-sialkot',
    'sportswear-manufacturer-pakistan',
    'sportswear-manufacturer-exporter',
    'boxing-wear-manufacturer-pakistan',
    'boxing-gear-manufacturer-bulk',
    
    // High-Volume Commercial Intent Rewrites
    'custom-hoodies',
    'hoodies',
    'custom-jeans',
    'jeans',
    'denim',
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
    'gym-wear-manufacturer-pakistan',
    'activewear-manufacturer-sialkot',
    'leggings-manufacturer-pakistan',
    'sports-bra-manufacturer-pakistan',
    'yoga-wear-manufacturer-pakistan',
    
    // Geo-Targeted High-Converting Export Hubs
    'wholesale-activewear-suppliers-usa',
    'wholesale-activewear-suppliers-uk',
    'wholesale-fitness-apparel-suppliers-europe',
    'private-label-activewear-manufacturer-usa',
    'private-label-activewear-manufacturer-uk',
    'private-label-activewear-manufacturer-germany',
    'private-label-activewear-manufacturer-france',
    'private-label-activewear-manufacturer-netherlands',
    'private-label-activewear-manufacturer-australia',

    // High-Volume Sialkot Niche Categories
    // 1. Martial Arts & MMA Combat Gear
    'martial-arts-gear-manufacturer-pakistan',
    'bjj-gi-manufacturer-pakistan',
    'custom-rashguard-manufacturer',
    'mma-shorts-manufacturer',

    // 2. Custom Tracksuits & Warmups
    'tracksuits-manufacturer-pakistan',
    'custom-tracksuits',
    'fleece-tracksuits-manufacturer',
    'poly-tricot-warmup-manufacturer',

    // 3. Compression & Baselayers
    'compression-wear-manufacturer-pakistan',
    'custom-compression-tights',
    'athletic-baselayers-manufacturer',

    // 4. Sublimated Team Uniforms & Teamwear
    'custom-teamwear-manufacturer-pakistan',
    'sublimated-jerseys-manufacturer',
    'soccer-uniforms-manufacturer-sialkot',
    'basketball-uniforms-manufacturer',

    // 5. Custom Jackets & Outerwear
    'custom-jackets-manufacturer-pakistan',
    'varsity-jackets-manufacturer-sialkot',
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
