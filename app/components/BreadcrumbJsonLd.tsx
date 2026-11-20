import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
  className?: string;
  style?: React.CSSProperties;
}

export default function BreadcrumbJsonLd({ items, className, style }: BreadcrumbJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';

  const schemaItems = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.href
      ? item.href.startsWith('http')
        ? item.href
        : `${baseUrl}${item.href}`
      : undefined,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumbs"
        className={className || 'breadcrumbs'}
        style={style}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="breadcrumb-sep" aria-hidden="true">/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}

