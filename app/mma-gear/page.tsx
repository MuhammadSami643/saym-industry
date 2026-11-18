import Link from 'next/link';
import FaqSection from '../components/FaqSection';
import { BOXING_WEAR_FAQS } from '../lib/faqs';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MMA Gear Manufacturer & BJJ Gi Factory Pakistan | Custom Rashguards & Fight Shorts",
  description: "Direct OEM MMA gear manufacturer in Sialkot, Pakistan. Pearl weave & gold weave BJJ Gis, custom sublimated compression rashguards (Italian ink), grappling spats and MMA board shorts with flex crotch and triple lock stitching for fight teams and brands.",
  keywords: [
    "MMA gear manufacturer",
    "BJJ gi manufacturer",
    "rashguard manufacturer",
    "MMA shorts manufacturer",
    "combat sports apparel",
    "grappling gear manufacturer",
    "fight shorts manufacturer",
    "MMA gear manufacturer Pakistan",
    "custom MMA shorts manufacturer",
    "MMA board shorts manufacturer with flex crotch",
    "triple lock stitching MMA shorts",
    "custom BJJ gi manufacturer",
    "BJJ gi manufacturer Pakistan low MOQ",
    "private label BJJ gi manufacturer",
    "pearl weave BJJ gi manufacturer",
    "gold weave gi manufacturer",
    "custom sublimated rashguard manufacturer",
    "long sleeve rashguard manufacturer wholesale",
    "short sleeve compression rashguard manufacturer",
    "all over sublimation rashguard manufacturer",
    "custom fight shorts sublimation",
    "crack resistant sublimation printing manufacturer",
    "Italian ink sublimation manufacturer",
    "MMA apparel manufacturer for brands",
    "custom grappling spats manufacturer",
    "BJJ rashguard private label",
    "jiu jitsu gear manufacturer",
    "custom martial arts uniform manufacturer",
    "karate gi manufacturer Pakistan",
    "judo gi manufacturer wholesale",
    "Muay Thai shorts manufacturer",
    "custom Muay Thai shorts manufacturer Pakistan",
    "MMA gym uniform supplier",
    "fight team apparel manufacturer"
  ],
  alternates: {
    canonical: '/mma-gear',
  },
  openGraph: {
    title: "Custom MMA Gear & BJJ Gi Manufacturer Pakistan | Bin Rasool Enterprises",
    description: "Export combat apparel: Pearl weave BJJ gis, custom rashguards with Italian sublimation ink, MMA flex crotch shorts, grappling spats and Muay Thai shorts.",
    url: "/mma-gear",
    images: [{ url: "/images/categories/1776540301_boxing-wear.webp", width: 1200, height: 630 }],
  },
};

export default function MmaGearPage() {
  return (
    <div className="category-landing-page">
      {/* Hero Banner */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/products' },
              { label: 'MMA & Combat Sports Gear' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            MMA Gear Manufacturer &amp; BJJ Gi Factory Pakistan
          </h1>
          <p style={{ maxWidth: '820px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Custom MMA gear manufacturer and grappling apparel exporter in Sialkot, Pakistan. We specialize in pearl weave and gold weave BJJ Gis, crack-resistant Italian ink sublimated rashguards, flex-crotch MMA shorts with triple lock stitching, grappling spats and custom Muay Thai fight shorts with low MOQs.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request Combat Gear Quote
            </Link>
            <Link href="/products" className="btn btn-outline">
              Explore Combat Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="home-kicker">Professional Combat Specs</span>
              <h2 style={{ margin: '8px 0 16px' }}>Engineered for Mat Durability, Flex &amp; Tear Resistance</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                Combat athletes put gear through extreme friction and stress. As an OEM MMA gear manufacturer, we utilize heavy-duty 4-way stretch crotch gussets, reinforced waistband closures and indestructible triple-needle lock stitching. For rashguards, our high-density Italian sublimation ink guarantees zero cracking or fading even after hundreds of wash and roll sessions.
              </p>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>MMA &amp; Combat Sports Production Range</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>Custom BJJ Gis (Pearl Weave &amp; Gold Weave)</strong> – 350 GSM to 550 GSM preshrunk cotton jackets with ripstop or twill pants, EVA foam collar and custom brand embroidery patches.</li>
                <li><strong>Sublimated Compression Rashguards</strong> – Long sleeve and short sleeve 220–250 GSM 85/15 poly-spandex with anti-microbial finish, flatlock stitching and all-over sublimated graphics.</li>
                <li><strong>MMA Board Shorts &amp; Fight Shorts</strong> – 4-way stretch microfibre with high side slits, Lycra flex crotch panel, internal drawstring and secure double Velcro closure.</li>
                <li><strong>Grappling Spats &amp; Compression Tights</strong> – Ergonomic multi-panel construction with reinforced knee zones and non-slip silicone inner waistband.</li>
                <li><strong>Muay Thai &amp; Kickboxing Shorts</strong> – Traditional satin or lightweight microfibre with wide elastic waistband, retro leg cut and direct custom embroidery.</li>
                <li><strong>Custom Martial Arts Uniforms</strong> – Karate gis, judo gis wholesale and fight team training gear with custom gym crests.</li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Start Private Label Combat Order
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1776540301_boxing-wear.webp"
                alt="MMA gear manufacturer Pakistan BJJ gi and sublimated rashguards"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <span className="card-tag">Low MOQ from 30–50 pcs</span>
                <h3 style={{ margin: '8px 0 6px' }}>Private Label BJJ &amp; MMA Uniforms</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px' }}>
                  Custom woven patches, silicone interior waistbands, custom embroidery and individual branded frosted zipper polybag packaging.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div style={{ marginTop: '64px', background: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Combat Sports &amp; BJJ Technical Matrix</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px' }}>Garment Category</th>
                    <th style={{ padding: '12px' }}>Available Fabrics</th>
                    <th style={{ padding: '12px' }}>Stitching &amp; Reinforcement</th>
                    <th style={{ padding: '12px' }}>Custom Branding Options</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-main)' }}>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 12px', fontWeight: '600' }}>BJJ Brazilian Jiu Jitsu Gi</td>
                    <td style={{ padding: '14px 12px' }}>350–550 GSM Pearl Weave, Gold Weave, Ripstop Pants</td>
                    <td style={{ padding: '14px 12px' }}>Triple reinforced armpits, vulcanized rubber lapel, tape cuffs</td>
                    <td style={{ padding: '14px 12px' }}>Direct high-density embroidery, woven lapel patches, inner jacket sublimation</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 12px', fontWeight: '600' }}>Compression Rashguard</td>
                    <td style={{ padding: '14px 12px' }}>220–260 GSM Polyester/Spandex or Nylon/Spandex</td>
                    <td style={{ padding: '14px 12px' }}>4-needle 6-thread flatlock anti-chafing seams</td>
                    <td style={{ padding: '14px 12px' }}>All-over digital sublimation (Italian ink, zero cracking), silicone hem grip</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 12px', fontWeight: '600' }}>MMA Fight Shorts</td>
                    <td style={{ padding: '14px 12px' }}>150–180 GSM 4-Way Stretch Micro Poly + Spandex Flex Crotch</td>
                    <td style={{ padding: '14px 12px' }}>Triple lock reinforced side splits and crotch seams</td>
                    <td style={{ padding: '14px 12px' }}>Full sublimation, rubberized Velcro tab, internal branded drawstring</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 12px', fontWeight: '600' }}>Grappling Spats</td>
                    <td style={{ padding: '14px 12px' }}>240 GSM Non-sheer 4-way stretch poly-elastane</td>
                    <td style={{ padding: '14px 12px' }}>Flatlock compression stitch, reinforced gusset</td>
                    <td style={{ padding: '14px 12px' }}>Fade-resistant sublimation, jacquard elastic waistband with custom logo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="home-cta" style={{ marginTop: '64px' }}>
            <div>
              <span className="home-kicker">OEM &amp; Gym Team Orders</span>
              <h2>Ready to produce custom MMA gear or BJJ Gis for your brand?</h2>
              <p>
                Send your tech pack, gym vector logo, or sample request. Our combat apparel production line provides physical proto samples in 7–10 days.
              </p>
            </div>
            <div className="home-cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Contact Combat Production Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Specific FAQs */}
      <FaqSection
        title="MMA Gear & BJJ Gi Manufacturing FAQs"
        categoryBadge="Combat Sports"
        items={BOXING_WEAR_FAQS}
      />
    </div>
  );
}

