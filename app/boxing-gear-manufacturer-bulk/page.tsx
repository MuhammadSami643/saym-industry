import FaqSection from '../components/FaqSection';
import { BOXING_GEAR_BULK_FAQS } from '../lib/faqs';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Boxing Gloves Manufacturer Pakistan | Custom Fight Gear & Boxing Equipment Wholesale Sialkot",
  description: "Direct OEM boxing gloves manufacturer & fight gear factory in Sialkot, Pakistan. Pro sparring gloves 16 oz, 10 oz fight gloves, genuine cowhide leather boxing gloves, satin boxing trunks, fight robes, corner jackets, shin guards & custom hand wraps for brands & gyms.",
  keywords: [
    "boxing gloves manufacturer",
    "boxing equipment manufacturer",
    "custom boxing gloves",
    "boxing trunks manufacturer",
    "fight gear manufacturer",
    "sparring gloves manufacturer",
    "hand wraps manufacturer",
    "shin guards manufacturer",
    "boxing gloves manufacturer Pakistan",
    "custom boxing gloves manufacturer low MOQ",
    "private label boxing gloves manufacturer",
    "genuine cowhide leather boxing gloves manufacturer",
    "pro sparring boxing gloves 16 oz manufacturer",
    "10 oz boxing gloves manufacturer wholesale",
    "boxing gloves manufacturer with custom logo",
    "OEM boxing gloves factory Pakistan",
    "boxing gloves manufacturer for gyms",
    "boxing gloves wholesale Pakistan Sialkot",
    "custom boxing gloves manufacturer USA brands",
    "boxing gloves manufacturer Europe",
    "satin boxing trunks manufacturer",
    "custom boxing shorts manufacturer",
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
    "boxing gloves multi layer foam manufacturer",
    "Sialkot boxing gloves manufacturer"
  ],
  alternates: {
    canonical: '/boxing-gear-manufacturer-bulk',
  },
  openGraph: {
    title: "OEM Boxing Gloves & Fight Gear Manufacturer Sialkot | Bin Rasool Enterprises",
    description: "Export quality genuine leather boxing gloves, pro sparring gloves, satin fight robes, custom corner jackets and shin guards wholesale.",
    url: "/boxing-gear-manufacturer-bulk",
    images: [{ url: "/images/categories/1776540301_boxing-wear.webp", width: 1200, height: 630 }],
  },
};

export default function CategoryPage() {
  return (
    <div className="category-landing-page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Boxing Gloves & Fight Gear Wholesale' },
            ]}
            style={{ marginBottom: '20px' }}
          />
          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">FACTORY DIRECT COMBAT GEAR &bull; SIALKOT, PAKISTAN</span>
              <h1>Boxing Gloves Manufacturer &amp; Custom Fight Gear Factory</h1>
              <p>
                Precision-engineered combat sports equipment for international fight promotions, combat brands and commercial gyms. Handcrafted genuine A-grade cowhide leather gloves, IMF shock-absorbing foam and wholesale training gear with custom private labeling.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '26px' }}>
                <Link href="/contact" className="btn btn-primary">
                  Request Fight Equipment Quote
                </Link>
                <Link href="/products" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Explore Product Catalog
                </Link>
              </div>
            </div>
            <div className="pl-summary">
              <strong>Pro Sparring &amp; Title Fight Gear</strong>
              <p>A-grade genuine cowhide leather gloves, multi-layer IMF padding, hook-and-loop &amp; lace-up closures with 50 pairs low MOQ and fast DHL export.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="home-kicker">OEM Combat Sports Production</span>
              <h2 style={{ margin: '8px 0 16px' }}>Private Label Boxing Gloves Manufacturer &amp; Fight Equipment</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                As a leading Sialkot boxing gloves manufacturer and custom fightwear manufacturer, Bin Rasool Enterprises supplies combat sports promotions, gyms and fight gear brands worldwide. We engineer boxing gloves with multi-layer foam padding (EVA, latex, horsehair blends), premium cowhide or microfibre leather, reinforced wrist enclosures and triple-stitched seams.
              </p>
              
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Fight Gear &amp; Boxing Equipment Wholesale</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>Pro Sparring Gloves 14 oz / 16 oz &amp; 10 oz Fight Gloves</strong> – Multi-layer foam padding, hook-and-loop or lace-up</li>
                <li><strong>Satin Boxing Trunks &amp; Custom Boxing Shorts</strong> – Deep waistband, side split seams, custom embroidery</li>
                <li><strong>Ring Walk Robes &amp; Corner Jackets</strong> – Heavyweight satin or velour with tackle twill embroidery</li>
                <li><strong>Custom Hand Wraps &amp; Shin Guards</strong> – Elastic cotton-spandex wraps with rubber logo patches</li>
                <li><strong>Combat Gym Equipment &amp; MMA Promotion Gear</strong> – Focus mitts, kick shields, heavy bags &amp; gym apparel</li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Inquire About Boxing Gear Production
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
                Send your tech pack, sketches or reference images and our merchandising team will reply with clear pricing and production timing.
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
        title="Boxing Gloves & Fight Equipment Wholesale FAQs"
        categoryBadge="Combat Equipment"
        items={BOXING_GEAR_BULK_FAQS}
      />
    </div>
  );
}
