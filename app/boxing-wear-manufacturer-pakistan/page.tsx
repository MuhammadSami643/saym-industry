import FaqSection from '../components/FaqSection';
import { BOXING_WEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Boxing Wear & Combat Apparel Manufacturer Pakistan | Sialkot Fightwear Factory",
  description: "Direct Sialkot manufacturer of custom satin boxing trunks, pro fight shorts, ring walk fight robes, corner jackets, shin guards and fightwear gear with OEM embroidery and low MOQ.",
  keywords: [
    "boxing trunks manufacturer",
    "custom boxing shorts manufacturer",
    "fight gear manufacturer",
    "ring walk robe manufacturer",
    "custom boxing robe manufacturer",
    "corner jacket manufacturer boxing",
    "custom hand wraps manufacturer",
    "shin guards manufacturer Pakistan",
    "custom fightwear manufacturer",
    "fightwear brand manufacturer",
    "MMA promotion custom gear supplier",
    "boxing gym equipment wholesale supplier",
    "custom boxing apparel manufacturer",
    "boxing gear manufacturer for brands",
    "boxing gloves manufacturer Pakistan",
    "satin boxing trunks manufacturer"
  ],
  alternates: {
    canonical: '/boxing-wear-manufacturer-pakistan',
  },
  openGraph: {
    title: "Boxing Wear & Fight Gear Manufacturer Sialkot | Bin Rasool Enterprises",
    description: "Export combat gear, satin boxing shorts, fight robes, MMA rash guards and BJJ gear manufactured in Sialkot.",
    url: "/boxing-wear-manufacturer-pakistan",
    images: [{ url: "/images/categories/1776540291_boxing-wear.webp", width: 1200, height: 630 }],
  },
};

export default function CategoryPage() {
  return (
    <div className="category-landing-page">
      {/* Hero Banner */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/products' },
              { label: 'Boxing & Combat Apparel' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Boxing Wear & Fight Gear Manufacturer in Sialkot, Pakistan
          </h1>
          <p style={{ maxWidth: '780px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Traditional satin boxing trunks, satin fight robes, custom corner jackets, MMA fight shorts and compression rash guards with custom embroidery and sublimation.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request a Manufacturing Quote
            </Link>
            <Link href="/products" className="btn btn-outline">
              Explore Product Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="home-kicker">Manufacturing Excellence</span>
              <h2 style={{ margin: '8px 0 16px' }}>Custom Boxing Wear Production Built to Your Standard</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                We work directly with startup brands, sports clubs, gyms and international apparel importers. From initial pattern drafting and fabric selection to sample verification, custom branding and bulk packaging, your order is crafted in our Sialkot production unit under strict quality control.
              </p>
              
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Featured Product Styles</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>Custom Satin Boxing Trunks</strong></li>
                <li><strong>Fighter Walkout Robes</strong></li>
                <li><strong>BJJ & MMA Rash Guards</strong></li>
                <li><strong>Compression Fight Shorts</strong></li>
                <li><strong>Corner Team Jackets & Tracksuits</strong></li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Inquire About Boxing Wear
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1776540301_boxing-wear.webp"
                alt="Boxing Wear & Fight Gear Manufacturer in Sialkot, Pakistan"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <span className="card-tag">Low MOQ from 50 pcs</span>
                <h3 style={{ margin: '8px 0 6px' }}>Factory Direct Sialkot</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px' }}>
                  Complete private labeling: custom neck labels, hangtags, care tags and polybag packaging.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="home-cta" style={{ marginTop: '64px' }}>
            <div>
              <span className="home-kicker">Start Your Bulk Order</span>
              <h2>Ready to sample or produce custom Boxing Wear?</h2>
              <p>
                Send your tech pack, sketches, or reference images and our merchandising team will reply with clear pricing and production timing.
              </p>
            </div>
            <div className="home-cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Contact Production Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    
      {/* Category Specific FAQs */}
      <FaqSection
        title="Boxing & Combat Fightwear FAQs"
        categoryBadge="Boxing Wear"
        items={BOXING_WEAR_FAQS}
      />
    </div>
  );
}
