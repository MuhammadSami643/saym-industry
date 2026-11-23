import { Metadata } from 'next';
import OrderSampleClient from './OrderSampleClient';
import BreadcrumbJsonLd from '@/app/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Order a Custom Activewear Sample Prototype | Bin Rasool Enterprises",
  description: "Request a custom pre-production activewear sample before committing to bulk manufacturing. 7–10 days DHL delivery, tech pack review, custom labels and packaging.",
  keywords: [
    "order activewear sample",
    "custom clothing prototype manufacturer",
    "tech pack sample production Sialkot",
    "gym wear sample low MOQ",
    "french terry hoodie prototype",
    "custom sample private label"
  ],
  alternates: {
    canonical: '/order-sample',
  },
  openGraph: {
    title: "Order a Custom Activewear Sample Prototype | Bin Rasool Enterprises",
    description: "Develop your physical garment sample with custom labels, tags and packaging in 7–10 days via DHL Priority.",
    url: "/order-sample",
    images: [{ url: "/images/site/hero-slide-factory-craft.webp", width: 1200, height: 630 }],
  },
};

export default function OrderSamplePage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 24px' }}>
        <BreadcrumbJsonLd
          items={[
            { label: 'Home', href: '/' },
            { label: 'Order a Sample Prototype', href: '/order-sample' }
          ]}
        />

        {/* Page Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 36px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#9a3412',
              display: 'inline-block',
              background: '#ffedd5',
              padding: '4px 12px',
              borderRadius: '9999px',
              marginBottom: '12px'
            }}
          >
            Physical Pre-Production Prototyping
          </span>
          <h1
            style={{
              fontSize: '34px',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
              lineHeight: 1.25
            }}
          >
            Order a Custom Activewear Sample Prototype
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#475569',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Verify our fabric weight, flatlock stitch durability, pattern grading, and private label trims before committing to bulk. Physical samples delivered to your door in 7–10 days via DHL Priority.
          </p>
        </div>
      </div>

      {/* The Client Form */}
      <OrderSampleClient />
    </div>
  );
}
