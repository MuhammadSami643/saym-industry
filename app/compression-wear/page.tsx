import Link from 'next/link';
import FaqSection from '../components/FaqSection';
import { FITNESS_WEAR_FAQS } from '../lib/faqs';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compression Wear Manufacturer & Athletic Baselayer Factory Pakistan | Sialkot",
  description: "Direct OEM compression wear manufacturer in Sialkot, Pakistan. Graduated compression tights, thermal long sleeve baselayers, anti-chafing compression shorts, padded football shirts, compression arm sleeves, and 4-needle flatlock activewear.",
  keywords: [
    "compression wear manufacturer",
    "baselayer manufacturer",
    "compression tights manufacturer",
    "thermal baselayer manufacturer",
    "compression shirt manufacturer",
    "arm sleeves manufacturer",
    "compression wear manufacturer Pakistan",
    "custom compression wear manufacturer",
    "private label compression wear",
    "muscle recovery compression tights manufacturer",
    "graduated compression leggings manufacturer",
    "thermal long sleeve baselayer manufacturer",
    "anti chafing compression shorts manufacturer",
    "athletic baselayer manufacturer Europe",
    "men’s compression tights manufacturer",
    "women’s compression wear manufacturer",
    "running compression wear manufacturer",
    "compression arm sleeves manufacturer wholesale",
    "padded compression shirt manufacturer",
    "football padded compression wear manufacturer",
    "4 needle flatlock compression wear",
    "custom printed compression tights",
    "compression gear manufacturer for brands",
    "post surgery compression garment manufacturer",
    "high performance baselayer factory",
    "compression shorts with cup pocket manufacturer"
  ],
  alternates: {
    canonical: '/compression-wear',
  },
  openGraph: {
    title: "Compression Wear Manufacturer & Baselayers Factory | Bin Rasool Enterprises",
    description: "Export manufacturer of graduated compression tights, thermal baselayers, padded football shirts, and custom arm sleeves from Sialkot.",
    url: "/compression-wear",
    images: [{ url: "/images/categories/1776540268_fitness-wear.webp", width: 1200, height: 630 }],
  },
};

export default function CompressionWearPage() {
  return (
    <div className="category-landing-page">
      {/* Hero Banner */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/products' },
              { label: 'Compression Wear & Baselayers' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Compression Wear Manufacturer &amp; Baselayer Factory Pakistan
          </h1>
          <p style={{ maxWidth: '820px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            OEM compression wear manufacturer in Sialkot, Pakistan. We specialize in high-performance muscle recovery compression tights, thermal long sleeve baselayers, 4-needle flatlock compression shorts, football padded compression gear, and wholesale custom arm sleeves.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request Baselayer Quote
            </Link>
            <Link href="/products" className="btn btn-outline">
              Explore Compression Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Overview Section */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="home-kicker">High-Performance Compression</span>
              <h2 style={{ margin: '8px 0 16px' }}>Engineered Graduated Compression &amp; Thermal Baselayers</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                As an export compression wear manufacturer, Bin Rasool Enterprises uses true multi-directional circular knit poly-spandex and nylon-elastane blends. Our calibrated pressure zones enhance venous return, stabilize muscle oscillation, and accelerate recovery. Every garment is constructed with anti-chafing 4-needle 6-thread flatlock seams for zero friction against the skin.
              </p>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Compression Wear Product Capabilities</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>Muscle Recovery Compression Tights</strong> – 250–280 GSM nylon-spandex graduated pressure leggings with targeted calf and quad support.</li>
                <li><strong>Thermal Long Sleeve Baselayers</strong> – Brushed micro-fleece interior with breathable exterior for winter running, skiing, and outdoor sports.</li>
                <li><strong>Anti-Chafing Compression Shorts</strong> – Ergonomic multi-panel construction with optional protective cup pocket or phone pocket.</li>
                <li><strong>Padded Football &amp; Rugby Compression Shirts</strong> – High-density EVA protective pads laminated over ribs, shoulders, and chest zones.</li>
                <li><strong>Compression Arm Sleeves &amp; Calf Sleeves</strong> – Seamless circular knit or flatlock-stitched sleeves with silicone non-slip upper bands.</li>
                <li><strong>Custom Printed Compression Tights</strong> – Vibrant digital sublimation or matte silicone logo transfers that stretch without cracking.</li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Inquire About Compression Production
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1776540268_fitness-wear.webp"
                alt="Compression wear manufacturer Pakistan baselayer tights"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <span className="card-tag">Low MOQ from 50 pcs</span>
                <h3 style={{ margin: '8px 0 6px' }}>Custom Private Label Compression</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px' }}>
                  Custom jacquard elastic waistbands, reflective safety prints, internal care tags, and branded zip polybags.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div style={{ marginTop: '64px', background: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Compression Technical Specifications</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px' }}>Garment Type</th>
                    <th style={{ padding: '12px' }}>Fabric Blend &amp; GSM</th>
                    <th style={{ padding: '12px' }}>Compression Level</th>
                    <th style={{ padding: '12px' }}>Seam &amp; Construction</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-main)' }}>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 12px', fontWeight: '600' }}>Graduated Recovery Tights</td>
                    <td style={{ padding: '14px 12px' }}>75% Nylon / 25% Spandex (260 GSM)</td>
                    <td style={{ padding: '14px 12px' }}>20–25 mmHg (Medium-High)</td>
                    <td style={{ padding: '14px 12px' }}>4-needle 6-thread flatlock, gusseted crotch</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 12px', fontWeight: '600' }}>Thermal Winter Baselayer</td>
                    <td style={{ padding: '14px 12px' }}>88% Polyester / 12% Spandex Brushed Fleece (220 GSM)</td>
                    <td style={{ padding: '14px 12px' }}>15–20 mmHg (Light-Medium)</td>
                    <td style={{ padding: '14px 12px' }}>Flatlock anti-chafe seams, crewneck or mock neck</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 12px', fontWeight: '600' }}>Padded Football Shirt</td>
                    <td style={{ padding: '14px 12px' }}>84% Poly / 16% Spandex Mesh Panels (200 GSM)</td>
                    <td style={{ padding: '14px 12px' }}>Snug athletic compression</td>
                    <td style={{ padding: '14px 12px' }}>10mm molded EVA foam pads heat-sealed into key impact zones</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 12px', fontWeight: '600' }}>Athletic Arm Sleeves</td>
                    <td style={{ padding: '14px 12px' }}>80% Nylon / 20% Elastane (240 GSM)</td>
                    <td style={{ padding: '14px 12px' }}>18–22 mmHg</td>
                    <td style={{ padding: '14px 12px' }}>Anatomical curve, silicone upper gripper tape</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="home-cta" style={{ marginTop: '64px' }}>
            <div>
              <span className="home-kicker">Start Your Baselayer Order</span>
              <h2>Ready to manufacture high-performance compression wear?</h2>
              <p>
                Send us your sizing specs, compression requirements, or brand tech pack. We provide lab dip color matching and counter samples promptly.
              </p>
            </div>
            <div className="home-cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Contact Compression Specialists
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        title="Compression Wear & Baselayer FAQs"
        categoryBadge="Compression Wear"
        items={FITNESS_WEAR_FAQS}
      />
    </div>
  );
}
