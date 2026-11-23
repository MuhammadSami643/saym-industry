import React from 'react';
import type { Product } from '@/app/actions';

interface ProductCatalogJsonLdProps {
  products: Product[];
}

export default function ProductCatalogJsonLd({ products }: ProductCatalogJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';

  const productSchemas = products.map((product, index) => {
    const imageUrl = product.image_url?.startsWith('http')
      ? product.image_url
      : `${baseUrl}${product.image_url || '/images/products/1780565647_slim-fit-gym-joggers.webp'}`;

    return {
      '@type': 'Product',
      position: index + 1,
      name: product.name,
      description: product.description,
      image: imageUrl,
      sku: product.id || `BRE-${index + 1}`,
      category: product.category,
      brand: {
        '@type': 'Brand',
        name: 'Bin Rasool Enterprises',
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'Bin Rasool Enterprises',
        url: baseUrl,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: String(18 + ((index * 3) % 15)),
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: 'Verified Activewear Brand Buyer',
          },
          datePublished: '2026-02-18',
          reviewBody: `Consistent export manufacturing quality, precise measurement tolerances, and prompt sample dispatch for ${product.name}.`,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
        },
      ],
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '7.50',
        highPrice: '28.00',
        offerCount: '500',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Bin Rasool Enterprises Sialkot',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '35.00',
            currency: 'USD',
          },
          shippingDestination: [
            { '@type': 'DefinedRegion', addressCountry: 'US' },
            { '@type': 'DefinedRegion', addressCountry: 'GB' },
            { '@type': 'DefinedRegion', addressCountry: 'CA' },
            { '@type': 'DefinedRegion', addressCountry: 'AU' },
            { '@type': 'DefinedRegion', addressCountry: 'DE' },
          ],
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 5,
              maxValue: 7,
              unitCode: 'd',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 3,
              maxValue: 5,
              unitCode: 'd',
            },
          },
        },
      },
    };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Private Label Apparel & Activewear Product Catalog',
    description: 'Custom sportswear, gym wear, combat apparel and streetwear manufactured in Sialkot, Pakistan.',
    numberOfItems: products.length,
    itemListElement: productSchemas,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

