import FaqSection from '../components/FaqSection';
import { BOXING_WEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';

export const metadata = {
  title: "Bulk Boxing Gear & Fightwear Manufacturer",
  description: "Wholesale boxing apparel, custom fight shorts, workout fightwear, and boxing club gear manufactured in bulk with custom labeling."
};

export default function CategoryPage() {
  return (
    <div className="category-landing-page">
      {/* Hero Banner */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div className="breadcrumbs" style={{ color: '#cbd5e1' }}>
            <Link href="/" style={{ color: 'var(--brand-orange)' }}>Home</Link> / <span>Boxing Wear</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Bulk Boxing Gear & Fightwear Manufacturer
          </h1>
          <p style={{ maxWidth: '780px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Wholesale boxing apparel, custom fight shorts, workout fightwear, and boxing club gear manufactured in bulk with custom labeling.
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
                We work directly with startup brands, sports clubs, gyms, and international apparel importers. From initial pattern drafting and fabric selection to sample verification, custom branding, and bulk packaging, your order is crafted in our Sialkot production unit under strict quality control.
              </p>
              
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Featured Product Styles</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>Pro Fight Trunks</strong></li>
                <li><strong>Kickboxing & Muay Thai Shorts</strong></li>
                <li><strong>Sublimated Compression Tops</strong></li>
                <li><strong>Training Sweatsuits</strong></li>
                <li><strong>Custom Branded Hand Wraps</strong></li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Inquire About Boxing Wear
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1776540301_boxing-wear.webp"
                alt="Bulk Boxing Gear & Fightwear Manufacturer"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <span className="card-tag">Low MOQ from 50 pcs</span>
                <h3 style={{ margin: '8px 0 6px' }}>Factory Direct Sialkot</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px' }}>
                  Complete private labeling: custom neck labels, hangtags, care tags, and polybag packaging.
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
        title="Bulk Fightwear & Boxing Trunks FAQs"
        categoryBadge="Combat Sports"
        items={BOXING_WEAR_FAQS}
      />
    </div>
  );
}
