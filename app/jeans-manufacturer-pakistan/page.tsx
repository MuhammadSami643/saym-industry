import Link from 'next/link';
import FaqSection from '../components/FaqSection';
import { JEANS_DENIM_FAQS } from '../lib/faqs';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Custom Jeans & Denim Manufacturer Pakistan | Selvedge & Stretch Denim",
  description: "Custom denim jeans manufacturer in Pakistan: rigid cotton, stretch denim, stone washes, vintage distressing, leather back patches, and custom metal hardware.",
  alternates: {
    canonical: '/jeans-manufacturer-pakistan',
  },
  openGraph: {
    title: "Denim & Jeans Manufacturer Pakistan | Bin Rasool Enterprises",
    description: "Export denim manufacturer for custom raw selvedge, vintage washed jeans, and denim jackets in Pakistan.",
    url: "/jeans-manufacturer-pakistan",
    images: [{ url: "/images/categories/1776540327_jeans.webp", width: 1200, height: 630 }],
  },
};

export default function JeansPage() {
  return (
    <div className="category-landing-page">
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/products' },
              { label: 'Jeans & Denim Manufacturer' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Custom Jeans &amp; Denim Apparel Manufacturer in Pakistan
          </h1>
          <p style={{ maxWidth: '780px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Pakistan is a global denim powerhouse. We produce raw selvedge denim, stretch slim jeans, baggy 90s skater cuts, and vintage stone washes with full private labeling.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request Denim Quote
            </Link>
            <Link href="/products" className="btn btn-outline">
              View Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="home-kicker">Denim Laundry &amp; Tailoring</span>
              <h2 style={{ margin: '8px 0 16px' }}>Authentic Denim Washes &amp; Hardware</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                Full-package denim production from spinning yarns and selvedge weaving to laser whisker detailing, enzyme stone washing, and custom cast shank buttons.
              </p>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>11 oz to 14.5 oz Rigid &amp; Stretch Denim</strong></li>
                <li><strong>Authentic Red-Line Selvedge Denim</strong></li>
                <li><strong>Enzyme Stone Wash, Acid Wash, &amp; Vintage Whisker Laser</strong></li>
                <li><strong>Custom Embossed Genuine Leather Waist Patches</strong></li>
                <li><strong>Anti-Rust Copper Rivets &amp; Cast Metal Shank Buttons</strong></li>
              </ul>
              <Link href="/contact" className="btn btn-primary">
                Inquire About Custom Denim
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1789894942_streetwear.webp"
                alt="Custom Denim Jeans Manufacturing"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <span className="card-tag">Export Quality Denim</span>
                <h3 style={{ margin: '8px 0 6px' }}>Full Denim Laundry</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px' }}>
                  Custom hardware, pocket prints, and bespoke distressing techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Custom Jeans &amp; Denim Manufacturing FAQs"
        categoryBadge="Denim &amp; Jeans"
        items={JEANS_DENIM_FAQS}
      />
    </div>
  );
}
