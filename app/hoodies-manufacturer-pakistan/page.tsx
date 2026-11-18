import Link from 'next/link';
import FaqSection from '../components/FaqSection';
import { HOODIES_FAQS } from '../lib/faqs';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hoodies Manufacturer | Custom Heavyweight Fleece & Luxury French Terry OEM",
  description: "Leading hoodies manufacturer specializing in 380 to 500+ GSM heavyweight custom hoodies, oversized drop-shoulder fits, zip-ups and loopback fleece. Direct factory OEM/ODM in Sialkot, Pakistan with low MOQ and worldwide export.",
  keywords: [
    "heavyweight hoodie manufacturer",
    "custom hoodie manufacturer",
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
    "cropped hoodie manufacturer wholesale",
    "double layer hood hoodie manufacturer",
    "3D puff print hoodie manufacturer",
    "acid wash hoodie manufacturer Pakistan",
    "vintage wash hoodie manufacturer",
    "stone wash heavyweight hoodie wholesale",
    "custom metal aglets hoodie manufacturer",
    "heavy rib hoodie manufacturer",
    "custom hoodie manufacturer for clothing brands",
    "streetwear hoodie manufacturer USA",
    "custom hoodie manufacturer UK low MOQ",
    "heavyweight sweatshirt manufacturer Pakistan",
    "custom crewneck sweatshirt manufacturer",
    "oversized sweatshirt manufacturer wholesale",
    "embroidered hoodie manufacturer Pakistan",
    "hoodie manufacturer tech pack to production",
    "Pakistan hoodie manufacturer vs China",
    "cut and sew hoodie manufacturer for startups",
    "blank heavyweight hoodies wholesale",
    "premium hoodie manufacturer for Shopify brands",
    "puff print hoodie supplier Europe",
    "custom zip up hoodie manufacturer 100 pieces"
  ],
  alternates: {
    canonical: '/custom-hoodies',
  },
  openGraph: {
    title: "Hoodies Manufacturer | Bin Rasool Enterprises",
    description: "Custom oversized luxury French Terry 450 GSM & brushed fleece hoodies manufacturer. Custom puff printing, embroidery & acid wash.",
    url: "/custom-hoodies",
    images: [{ url: "/images/categories/1776540316_hoodies.webp", width: 1200, height: 630 }],
  },
};

export default function HoodiesPage() {
  return (
    <div className="category-landing-page">
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/products' },
              { label: 'Hoodies Manufacturer Pakistan' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Custom Hoodies &amp; Sweatshirts Manufacturer in Sialkot, Pakistan
          </h1>
          <p style={{ maxWidth: '780px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Specializing in 380 GSM to 500+ GSM luxury 100% cotton French Terry, double-layered structure hoods, custom metal aglets and pre-shrunk fleece.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request Hoodies Quote
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
              <span className="home-kicker">Heavyweight Craftsmanship</span>
              <h2 style={{ margin: '8px 0 16px' }}>Engineered for Luxury Streetwear &amp; Gym Lifestyle</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                From oversized drop-shoulder pullovers to YKK metal two-way zip hoodies, we knit, cut, dye and sew premium hoodies with custom-dyed ribbed cuffs, kangaroo pockets and high-density branding.
              </p>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>450 GSM 100% Combed Cotton French Terry</strong></li>
                <li><strong>Heavyweight Brushed-Back Fleece (Warmth &amp; Soft Hand Feel)</strong></li>
                <li><strong>Custom Laser-Engraved Metal Eyelets &amp; Aglets</strong></li>
                <li><strong>Double-Layer 3-Panel Hood That Stands Up</strong></li>
                <li><strong>3D Puff Print, Screen Print &amp; Chainstitch Embroidery</strong></li>
              </ul>
              <Link href="/contact" className="btn btn-primary">
                Inquire About Custom Hoodies
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1789894942_streetwear.webp"
                alt="Custom Hoodies Manufacturing"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <span className="card-tag">Low MOQ from 50 pcs</span>
                <h3 style={{ margin: '8px 0 6px' }}>Pre-Shrunk Luxury Fleece</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px' }}>
                  Tested within +/- 3% dimensional shrinkage tolerance after machine wash.
                </p>
              </div>
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
