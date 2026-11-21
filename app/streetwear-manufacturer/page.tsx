import FaqSection from '../components/FaqSection';
import { STREETWEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Streetwear Manufacturer | Cut & Sew Heavyweight Hoodies, Tees & Outerwear",
  description: "Premier custom streetwear manufacturer in Sialkot, Pakistan. 450+ GSM heavyweight French Terry hoodies, 280 GSM boxy tees, wool varsity jackets, cargo sweatpants and luxury puff printing with 50 pcs low MOQ and worldwide DHL export.",
  keywords: [
    "streetwear manufacturer",
    "custom streetwear",
    "cut and sew manufacturer",
    "varsity jacket manufacturer",
    "puffer jacket manufacturer",
    "cargo pants manufacturer",
    "windbreaker manufacturer",
    "streetwear manufacturer Pakistan",
    "custom streetwear manufacturer low MOQ",
    "oversized heavyweight t-shirt manufacturer",
    "280 gsm boxy t-shirt manufacturer",
    "custom heavyweight tee manufacturer",
    "baggy cargo sweatpants manufacturer",
    "wool blend varsity jacket manufacturer",
    "leather sleeve varsity jacket manufacturer",
    "custom puffer jacket manufacturer",
    "streetwear tech pack manufacturer",
    "small batch streetwear manufacturer"
  ],
  alternates: {
    canonical: '/streetwear-manufacturer',
  },
  openGraph: {
    title: "Streetwear Manufacturer | Bin Rasool Enterprises",
    description: "Factory direct cut-and-sew heavyweight streetwear, acid wash tees, cargo pants and oversized hoodies.",
    url: "/streetwear-manufacturer",
    images: [{ url: "/images/categories/1789894942_streetwear.webp", width: 1200, height: 630 }],
  },
};

const RELATED_SERVICES = [
  { name: "Hoodies Manufacturer", href: "/hoodies-manufacturer" },
  { name: "Jeans & Denim Factory", href: "/jeans-manufacturer" },
  { name: "Private Label Activewear", href: "/private-label" },
  { name: "Sportswear Manufacturer", href: "/sportswear-manufacturer" },
  { name: "Fitness Wear Manufacturer", href: "/fitness-wear-manufacturer" },
  { name: "Boxing Wear Manufacturer", href: "/boxing-wear-manufacturer" },
  { name: "USA Streetwear Brands", href: "/private-label-activewear-manufacturer-usa" },
  { name: "UK Clothing Labels", href: "/private-label-activewear-manufacturer-uk" },
  { name: "Product Catalog", href: "/products" },
];

export default function StreetwearPage() {
  return (
    <div className="streetwear-page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Streetwear Manufacturer' },
            ]}
            style={{ marginBottom: '20px' }}
          />

          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">LUXURY CUT &amp; SEW STREETWEAR &bull; SIALKOT, PAKISTAN</span>
              <h1>Heavyweight Streetwear &amp; Apparel Manufacturer</h1>
              <p>
                450+ GSM heavyweight French Terry hoodies, vintage acid wash oversized tees, baggy cargo sweatpants, wool-leather varsity jackets and luxury streetwear collections crafted with puff print, distressed hems and high-density embroidery.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '26px' }}>
                <Link href="/contact" className="btn btn-primary">
                  Request Streetwear Quote
                </Link>
                <Link href="/products" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Explore Product Catalog
                </Link>
              </div>
            </div>

            <div className="pl-summary">
              <strong>Oversized Fits. Vintage Washes.</strong>
              <p>280 GSM boxy tees, 450 GSM hoodies, cargo sweatpants, wool varsity jackets and acid wash finishing with 50 pcs MOQ and fast DHL sampling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section" style={{ background: 'var(--bg-light)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="pl-label">Streetwear Manufacturing</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 16px' }}>
                Cut &amp; Sew Precision for Modern Street Fashion
              </h2>
              <p className="muted" style={{ fontSize: '15.5px', lineHeight: '1.75', marginBottom: '20px', color: '#475569' }}>
                We translate streetwear tech packs into retail-grade garments with proprietary boxy fits, drop-shoulder silhouettes, thick 1-inch neck collars and high-end wash treatments.
              </p>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>240–280 GSM Heavyweight Combed Cotton Tees</strong> – Pre-shrunk, compact weave with thick neck ribbing.</li>
                <li><strong>Heavyweight Cargo &amp; Utility Sweatpants</strong> – 3D gusset pockets, adjustable bungee cords and metal eyelets.</li>
                <li><strong>Melton Wool &amp; Genuine Leather Varsity Jackets</strong> – Quilted diamond lining and chenille chest crests.</li>
                <li><strong>Water-Resistant Technical Windbreakers &amp; Puffers</strong> – Bonded ripstop shells with concealed storm zippers.</li>
                <li><strong>Acid Wash, Mineral Wash &amp; Enzyme Distress</strong> – Authentic vintage fade and unique artisan wash effects.</li>
              </ul>
              <Link href="/contact" className="btn btn-primary">
                Inquire About Streetwear Production
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <img
                src="/images/categories/1789894942_streetwear.webp"
                alt="Heavyweight Streetwear Production"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px', background: '#fff' }}>
                <span className="card-tag">Low MOQ from 50 pcs</span>
                <h3 style={{ margin: '8px 0 6px', color: '#0f172a' }}>Direct Factory Production</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                  Full private label package: branded neck tags, barcoded hangtags, frosted EVA bags and physical DHL samples.
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
            <h2>Ready to launch your custom streetwear collection?</h2>
            <p>
              Send your tech packs, sketches or reference garment photos. Our merchandising team will confirm custom fabric weights, wash treatments and deliver transparent factory pricing within 24 hours.
            </p>
            <div>
              <Link href="/contact" className="sw-btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Request Streetwear Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Custom Streetwear Manufacturing FAQs"
        categoryBadge="Streetwear"
        items={STREETWEAR_FAQS}
      />
    </div>
  );
}
