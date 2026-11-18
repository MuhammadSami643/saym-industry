import FaqSection from '../components/FaqSection';
import { SPORTSWEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tracksuit Manufacturer Pakistan | Custom Warmup Suits & Track Jackets Wholesale",
  description: "Direct OEM tracksuit manufacturer in Pakistan. Custom presentation tracksuits, club warmup suits, brushed interlock fleece tracksuits, micro poly tricot sets, retro track pants and custom track jackets with YKK zippers and piping for brands, clubs and schools.",
  keywords: [
    "tracksuit manufacturer",
    "custom tracksuit manufacturer",
    "warmup suit manufacturer",
    "track pants manufacturer",
    "track jacket manufacturer",
    "retro tracksuit",
    "club tracksuit supplier",
    "tracksuit manufacturer Pakistan",
    "custom tracksuit manufacturer low MOQ",
    "private label tracksuit manufacturer",
    "full zip presentation tracksuit manufacturer",
    "club warmup suit manufacturer",
    "team tracksuit manufacturer wholesale",
    "custom football club tracksuit manufacturer",
    "retro track pants manufacturer",
    "vintage tracksuit manufacturer",
    "micro poly tricot tracksuit manufacturer",
    "polyester tricot tracksuit wholesale",
    "brushed interlock fleece tracksuit manufacturer",
    "fleece tracksuit manufacturer Pakistan",
    "custom side stripe tracksuit manufacturer",
    "piping tracksuit manufacturer",
    "YKK zipper tracksuit manufacturer",
    "waterproof zipper track jacket manufacturer",
    "custom school tracksuit manufacturer",
    "tracksuit manufacturer UK",
    "tracksuit manufacturer USA brands",
    "tracksuit manufacturer Europe",
    "custom jogging suit manufacturer",
    "sublimated tracksuit manufacturer",
    "tracksuit bulk order Pakistan",
    "custom track jacket with logo manufacturer"
  ],
  alternates: {
    canonical: '/sportswear-manufacturer-pakistan',
  },
  openGraph: {
    title: "Custom Tracksuits & Warmup Suits Manufacturer | Bin Rasool Enterprises",
    description: "Export manufacturer for custom tracksuits, presentation suits, fleece jogging suits and poly tricot track jackets from Sialkot.",
    url: "/sportswear-manufacturer-pakistan",
    images: [{ url: "/images/categories/1776540279_sports-wear.webp", width: 1200, height: 630 }],
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
              { label: 'Sportswear Manufacturer Pakistan' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Tracksuit Manufacturer Pakistan &amp; Custom Athletic Warmups
          </h1>
          <p style={{ maxWidth: '820px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            OEM custom tracksuit manufacturer and exporter in Sialkot, Pakistan. We manufacture full-zip presentation tracksuits, club warmup suits, brushed interlock fleece sets, micro poly tricot track pants and retro jackets with contrast piping and YKK zippers for USA, UK and European brands.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request a Tracksuit Quote
            </Link>
            <Link href="/products" className="btn btn-outline">
              Explore Tracksuit Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="home-kicker">Custom Athletic Outerwear</span>
              <h2 style={{ margin: '8px 0 16px' }}>Private Label Tracksuits, Warmups &amp; Jogging Suits</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                Bin Rasool Enterprises engineers high-spec athletic tracksuits for football clubs, school sports teams, collegiate programs and premium streetwear labels. Choose from brushed interlock fleece, shiny tricot polyester, or lightweight water-resistant ripstop nylon with customized side stripes, rubber badge logos and heavy-duty YKK hardware.
              </p>
              
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Tracksuit &amp; Warmup Production Styles</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>Full-Zip Club Presentation Tracksuits</strong> – Micro poly tricot or woven taslan with mesh lining and contrast sleeve piping.</li>
                <li><strong>Heavyweight Brushed Fleece Jogging Suits</strong> – 320–380 GSM cotton-poly fleece track jackets and tapered cuffed track pants.</li>
                <li><strong>Retro &amp; Vintage Tracksuits</strong> – 90s color-blocked panels, stand collar, ribbed cuffs and side tape detailing.</li>
                <li><strong>Sublimated Club Warmup Suits</strong> – All-over vibrant digital prints with player numbers and team crests.</li>
                <li><strong>Waterproof Zipper Track Jackets</strong> – Bonded technical softshell or lightweight woven shells with zippered hand pockets.</li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Inquire About Tracksuit Production
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1776540279_sports-wear.webp"
                alt="Sportswear Manufacturer in Pakistan for International Brands"
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
              <h2>Ready to sample or produce custom Sports Wear?</h2>
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
        title="Sportswear & Sublimation Manufacturing FAQs"
        categoryBadge="Sportswear"
        items={SPORTSWEAR_FAQS}
      />
    </div>
  );
}
