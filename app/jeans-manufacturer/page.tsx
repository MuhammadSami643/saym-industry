import Link from 'next/link';
import FaqSection from '../components/FaqSection';
import { JEANS_DENIM_FAQS } from '../lib/faqs';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Jeans Manufacturer | Custom Denim Jeans & Selvedge Denim Factory",
  description: "Leading custom jeans manufacturer in Sialkot, Pakistan. 14 oz raw selvedge denim, stretch jeans, baggy streetwear cuts, carpenter denim, enzyme stone wash, acid wash, custom leather back patches and cast metal shank buttons with low MOQs.",
  keywords: [
    "jeans manufacturer",
    "custom jeans manufacturer",
    "denim manufacturer",
    "selvedge denim manufacturer",
    "private label jeans",
    "denim jacket manufacturer",
    "jeans manufacturer Pakistan",
    "custom jeans manufacturer low MOQ",
    "selvedge denim manufacturer Pakistan",
    "14 oz raw selvedge denim manufacturer",
    "custom denim jacket manufacturer",
    "acid wash jeans manufacturer",
    "stone wash jeans manufacturer",
    "carpenter jeans manufacturer",
    "custom leather patch jeans manufacturer",
    "custom metal buttons jeans manufacturer",
    "Sialkot jeans manufacturer"
  ],
  alternates: {
    canonical: '/jeans-manufacturer',
  },
  openGraph: {
    title: "Custom Jeans & Selvedge Denim Manufacturer | Bin Rasool Enterprises",
    description: "Export denim manufacturer for raw selvedge, stone-washed baggy jeans, cargo denim and custom jackets.",
    url: "/jeans-manufacturer",
    images: [{ url: "/images/categories/1776540327_jeans.webp", width: 1200, height: 630 }],
  },
};

const RELATED_SERVICES = [
  { name: "Streetwear Manufacturer", href: "/streetwear-manufacturer" },
  { name: "Hoodies Manufacturer", href: "/hoodies-manufacturer" },
  { name: "Private Label Activewear", href: "/private-label-manufacturing" },
  { name: "Sportswear Manufacturer", href: "/sportswear-manufacturer" },
  { name: "Fitness Wear Manufacturer", href: "/fitness-wear-manufacturer" },
  { name: "Boxing Wear Manufacturer", href: "/boxing-wear-manufacturer" },
  { name: "USA Denim Brands", href: "/private-label-activewear-manufacturer-usa" },
  { name: "UK Clothing Labels", href: "/private-label-activewear-manufacturer-uk" },
  { name: "Product Catalog", href: "/products" },
];

export default function JeansPage() {
  return (
    <div className="jeans-page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Jeans & Denim Manufacturer' },
            ]}
            style={{ marginBottom: '20px' }}
          />

          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">OEM DENIM APPAREL FACTORY &bull; SIALKOT, PAKISTAN</span>
              <h1>Custom Jeans &amp; Selvedge Denim Manufacturer</h1>
              <p>
                OEM private label jeans manufacturer in Sialkot, Pakistan. We specialize in 14 oz raw selvedge denim, stretch slim jeans, baggy 90s streetwear cuts, cargo and carpenter jeans, denim jackets, enzyme stone washes, laser whiskering and custom embossed leather patches with low MOQs.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '26px' }}>
                <Link href="/contact" className="btn btn-primary">
                  Request Denim Tech Pack Quote
                </Link>
                <Link href="/products" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  View Denim Catalog
                </Link>
              </div>
            </div>

            <div className="pl-summary">
              <strong>Raw Selvedge &amp; Enzyme Washes</strong>
              <p>14 oz rigid and stretch selvedge, baggy 90s skater cuts, cargo denim, custom leather back patches and cast metal shanks with 50 pcs MOQ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section" style={{ background: 'var(--bg-light)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="pl-label">Denim Craftsmanship</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 16px' }}>
                Artisan Denim Washing, Rigidity &amp; Hardware Customization
              </h2>
              <p className="muted" style={{ fontSize: '15.5px', lineHeight: '1.75', marginBottom: '20px', color: '#475569' }}>
                From Japanese-style shuttle-loom selvedge outseams to heavy garment enzyme washes, our denim master craftsmen engineer authentic jeans that stand the test of time.
              </p>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>12 oz to 16 oz Rigid &amp; Stretch Denim</strong> – 100% cotton ring-spun yarn or 98/2 elastane stretch.</li>
                <li><strong>Classic Redline &amp; Custom Colored Selvedge ID</strong> – Authentic shuttle-loom woven outseams.</li>
                <li><strong>Industrial Laundry Washes</strong> – Acid wash, stone wash, silicone softener wash and bleach dip.</li>
                <li><strong>Custom Cast Metal Hardware</strong> – Embossed donut shank buttons, pocket rivets and YKK denim zips.</li>
                <li><strong>Genuine Leather &amp; Jacron Back Patches</strong> – Hot stamped, debossed or foiled brand logos.</li>
              </ul>
              <Link href="/contact" className="btn btn-primary">
                Inquire About Custom Jeans
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <img
                src="/images/categories/1776540327_jeans.webp"
                alt="Custom Jeans Manufacturing"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px', background: '#fff' }}>
                <span className="card-tag">Low MOQ from 50 pcs</span>
                <h3 style={{ margin: '8px 0 6px', color: '#0f172a' }}>Pre-Shrunk &amp; Colorfast</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                  Every production lot undergoes wash durability, tensile seam stress and crocking colorfastness testing.
                </p>
              </div>
            </div>
          </div>

          {/* Related Collections Section */}
          <div style={{ marginTop: '64px', background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: 'var(--brand-orange, #f3a626)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1.5px', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              EXPLORE RELATED MANUFACTURING SERVICES
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              Complementary Custom Apparel &amp; Export Programs
            </h3>
            <div className="pl-related-pills">
              {RELATED_SERVICES.map((s, idx) => (
                <Link key={idx} href={s.href} className="pl-related-pill">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="sw-cta-box">
            <h2>Ready to manufacture custom jeans or denim jackets?</h2>
            <p>
              Send your tech packs, fit specifications or reference samples. Our denim merchandising team will review fabric ounce weights, wash effects and provide transparent factory pricing within 24 hours.
            </p>
            <div>
              <Link href="/contact" className="sw-btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Request Denim Quote
              </Link>
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
