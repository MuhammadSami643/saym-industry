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
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '13px',
          color: '#cbd5e1',
          ...style,
        }}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              {idx > 0 && <span style={{ opacity: 0.6 }} aria-hidden="true">/</span>}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  style={{
                    color: 'var(--brand-orange, #f3a626)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: isLast ? '#ffffff' : '#cbd5e1', fontWeight: isLast ? 700 : 500 }}>
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

