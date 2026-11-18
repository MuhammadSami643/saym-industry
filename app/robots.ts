import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image',
        ],
        disallow: [
          '/admin',
          '/admin/',
          '/api/',
          '/invoice',
          '/invoice?*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/invoice',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/invoice',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
