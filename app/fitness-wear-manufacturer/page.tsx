import FaqSection from '../components/FaqSection';
import { FITNESS_WEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Activewear & Gym Wear Manufacturer | Custom Leggings & Sports Bras OEM",
  description: "Premier activewear manufacturer in Sialkot, Pakistan. 75/25 Nylon Spandex squat-proof leggings, sports bras, seamless gym wear and tapered joggers. Low MOQ, Amazon FBA ready.",
  keywords: [
    "activewear manufacturer",
    "gym wear manufacturer",
    "private label activewear",
    "leggings manufacturer",
    "sports bra manufacturer",
    "fitness apparel manufacturer",
    "seamless activewear",
    "gym joggers manufacturer",
    "activewear manufacturer Pakistan",
    "custom activewear manufacturer low MOQ",
    "private label activewear manufacturer USA",
    "gym wear manufacturer for startups",
    "women’s activewear manufacturer Pakistan",
    "men’s gym wear manufacturer Pakistan",
    "squat proof leggings manufacturer",
    "high waist scrunch leggings manufacturer",
    "custom scrunch leggings private label",
    "non see through leggings manufacturer",
    "4 way stretch leggings manufacturer",
    "nylon spandex leggings manufacturer",
    "75 nylon 25 spandex leggings wholesale",
    "compression sports bra manufacturer",
    "custom sports bra private label",
    "biker shorts manufacturer wholesale",
    "custom gym t-shirt manufacturer",
    "tapered gym joggers manufacturer",
    "silicone heat transfer activewear manufacturer",
    "matte silicone logo gym wear",
    "flatlock stitching activewear manufacturer",
    "anti chafe activewear manufacturer",
    "gusseted crotch leggings manufacturer",
    "Amazon FBA activewear manufacturer",
    "fitness clothing manufacturer UK",
    "gymshark style activewear manufacturer",
    "activewear tech pack manufacturer",
    "yoga wear manufacturer Pakistan",
    "custom gym wear manufacturer Europe",
    "activewear manufacturer small batch"
  ],
  alternates: {
    canonical: '/fitness-wear',
  },
  openGraph: {
    title: "Activewear & Gym Wear Manufacturer | Bin Rasool Enterprises",
    description: "Custom seamless gym leggings, sports bras, pump covers, compression wear and gym joggers.",
    url: "/fitness-wear",
    images: [{ url: "/images/categories/1776540259_fitness-wear.webp", width: 1200, height: 630 }],
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
              { label: 'Fitness Wear Manufacturer' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Private Label Fitness Wear Manufacturer
          </h1>
          <p style={{ maxWidth: '780px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Complete cut-and-sew fitness wear production for emerging activewear labels, gym studio apparel and fitness influencers.
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
              <h2 style={{ margin: '8px 0 16px' }}>Custom Fitness Wear Production Built to Your Standard</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                We work directly with startup brands, sports clubs, gyms and international apparel importers. From initial pattern drafting and fabric selection to sample verification, custom branding and bulk packaging, your order is crafted in our Sialkot production unit under strict quality control.
              </p>
              
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Featured Product Styles</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>Seamless Knitted Leggings</strong></li>
                <li><strong>Ribbed Activewear Sets</strong></li>
                <li><strong>Crop Tops & Tanks</strong></li>
                <li><strong>French Terry Gym Joggers</strong></li>
                <li><strong>Oversized Pump Covers</strong></li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Inquire About Fitness Wear
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1776540259_fitness-wear.webp"
                alt="Private Label Fitness Wear Manufacturer"
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
              <h2>Ready to sample or produce custom Fitness Wear?</h2>
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
        title="Fitness Wear & Leggings Manufacturing FAQs"
        categoryBadge="Fitness Wear"
        items={FITNESS_WEAR_FAQS}
      />
    </div>
  );
}
