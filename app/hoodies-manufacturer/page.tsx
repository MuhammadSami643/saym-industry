import Link from 'next/link';
import FaqSection from '../components/FaqSection';
import { HOODIES_FAQS } from '../lib/faqs';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hoodies Manufacturer | Custom Heavyweight Fleece & Luxury French Terry OEM",
  description: "Leading custom hoodies manufacturer specializing in 380 to 500+ GSM heavyweight fleece, oversized drop-shoulder fits, zip-ups and loopback French Terry in Sialkot, Pakistan with 50 pcs low MOQ and worldwide export.",
  keywords: [
    "hoodies manufacturer",
    "custom hoodie manufacturer",
    "heavyweight hoodie manufacturer",
    "oversized hoodie manufacturer",
    "blank hoodie supplier",
    "french terry hoodie",
    "500 gsm hoodie",
    "puff print hoodie",
    "acid wash hoodie",
    "400 gsm heavyweight hoodie manufacturer Pakistan",
    "500 gsm hoodie manufacturer low MOQ",
    "450 gsm boxy fit hoodie manufacturer",
    "custom drop shoulder hoodie manufacturer",
    "heavyweight french terry hoodie manufacturer Pakistan",
    "100% combed ringspun cotton hoodie manufacturer",
    "brushed fleece hoodie manufacturer private label",
    "custom full zip hoodie manufacturer",
    "double layer hood hoodie manufacturer",
    "3D puff print hoodie manufacturer",
    "hoodie manufacturer tech pack to production",
    "small batch hoodie manufacturer"
  ],
  alternates: {
    canonical: '/hoodies-manufacturer',
  },
  openGraph: {
    title: "Hoodies Manufacturer | Bin Rasool Enterprises",
    description: "Custom oversized luxury French Terry 450 GSM & brushed fleece hoodies manufacturer. Custom puff printing, embroidery & acid wash.",
    url: "/hoodies-manufacturer",
    images: [{ url: "/images/categories/1789894942_streetwear.webp", width: 1200, height: 630 }],
  },
};

const RELATED_SERVICES = [
  { name: "Streetwear Manufacturer", href: "/streetwear-manufacturer" },
  { name: "Jeans & Denim Factory", href: "/jeans-manufacturer" },
  { name: "Private Label Activewear", href: "/private-label-manufacturing" },
  { name: "Sportswear Manufacturer", href: "/sportswear-manufacturer" },
  { name: "Fitness Wear Manufacturer", href: "/fitness-wear-manufacturer" },
  { name: "Boxing Wear Manufacturer", href: "/boxing-wear-manufacturer" },
  { name: "USA Apparel Brands", href: "/private-label-activewear-manufacturer-usa" },
  { name: "UK Clothing Labels", href: "/private-label-activewear-manufacturer-uk" },
  { name: "Product Catalog", href: "/products" },
];

export default function HoodiesPage() {
  return (
    <div className="hoodies-page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Hoodies Manufacturer' },
            ]}
            style={{ marginBottom: '20px' }}
          />

          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">CUSTOM HEAVYWEIGHT FLEECE &bull; SIALKOT, PAKISTAN</span>
              <h1>Custom Hoodies &amp; Luxury Sweatshirts Manufacturer</h1>
              <p>
                Specializing in 380 GSM to 500+ GSM luxury 100% cotton French Terry, double-layered structured hoods, custom laser-engraved metal aglets, vintage acid wash and pre-shrunk fleece engineered for high-end streetwear and premium fitness labels.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '26px' }}>
                <Link href="/contact" className="btn btn-primary">
                  Request Hoodies Quote
                </Link>
                <Link href="/products" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  View Product Catalog
                </Link>
              </div>
            </div>

            <div className="pl-summary">
              <strong>380–500+ GSM Luxury Fleece</strong>
              <p>100% combed ringspun cotton, drop-shoulder boxy cuts, 3D puff print, custom woven neck labels and 50 pcs low MOQ with fast DHL sampling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section" style={{ background: 'var(--bg-light)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="pl-label">Heavyweight Craftsmanship</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 16px' }}>
                Engineered for Luxury Streetwear &amp; Gym Lifestyle
              </h2>
              <p className="muted" style={{ fontSize: '15.5px', lineHeight: '1.75', marginBottom: '20px', color: '#475569' }}>
                From oversized drop-shoulder pullovers to YKK metal two-way zip hoodies, we knit, cut, dye and sew premium hoodies with custom-dyed 2x2 ribbed cuffs, deep kangaroo pockets and high-density branding.
              </p>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>450 GSM 100% Combed Cotton French Terry</strong> – Heavy drape, zero synthetic pilling.</li>
                <li><strong>Heavyweight Brushed-Back Fleece</strong> – Maximum interior warmth and cloud-soft hand feel.</li>
                <li><strong>Custom Laser-Engraved Metal Eyelets &amp; Aglets</strong> – Matte black, chrome and antique brass.</li>
                <li><strong>Double-Layer 3-Panel Hood</strong> – Sits erect and structured without flopping flat.</li>
                <li><strong>3D Puff Print &amp; Chenille Patches</strong> – High-density raised tactile branding.</li>
              </ul>
              <Link href="/contact" className="btn btn-primary">
                Inquire About Custom Hoodies
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <img
                src="/images/categories/1789894942_streetwear.webp"
                alt="Custom Hoodies Manufacturing"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px', background: '#fff' }}>
                <span className="card-tag">Low MOQ from 50 pcs</span>
                <h3 style={{ margin: '8px 0 6px', color: '#0f172a' }}>Pre-Shrunk Luxury Fleece</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                  Tested within +/- 3% dimensional shrinkage tolerance after machine wash and commercial drying.
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
            <h2>Ready to develop custom hoodies for your clothing label?</h2>
            <p>
              Send your tech pack, reference garment or vector artwork. Our merchandising team will confirm fabric weights, color lab dips and provide transparent manufacturing pricing within 24 hours.
            </p>
            <div>
              <Link href="/contact" className="sw-btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Request Hoodies Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Custom Hoodies &amp; Sweatshirts Manufacturing FAQs"
        categoryBadge="Hoodies &amp; Fleece"
        items={HOODIES_FAQS}
      />
    </div>
  );
}
