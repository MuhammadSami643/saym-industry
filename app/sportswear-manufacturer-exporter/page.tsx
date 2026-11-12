import FaqSection from '../components/FaqSection';
import { SPORTSWEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sublimated Teamwear & Sports Uniform Manufacturer Pakistan | Custom Jerseys Sialkot",
  description: "OEM teamwear manufacturer in Pakistan. Custom sublimated soccer kits, football uniforms, basketball jerseys, cricket whites, rugby jerseys, esports jerseys, training vests, and dry-fit polyester mesh uniforms for clubs, schools, and brands.",
  keywords: [
    "teamwear manufacturer",
    "sports uniform manufacturer",
    "sublimated jersey manufacturer",
    "football kit manufacturer",
    "basketball uniform manufacturer",
    "cricket kit manufacturer",
    "custom jerseys manufacturer",
    "team uniforms supplier",
    "custom sublimated jersey manufacturer Pakistan",
    "custom football kit manufacturer low MOQ",
    "soccer uniform manufacturer Pakistan",
    "soccer kit manufacturer for clubs",
    "custom basketball uniform manufacturer",
    "basketball jersey sublimation manufacturer",
    "cricket whites manufacturer Pakistan",
    "custom cricket uniform manufacturer",
    "cricket jersey sublimation manufacturer",
    "training vest manufacturer",
    "custom training bibs manufacturer",
    "sublimation sportswear manufacturer",
    "moisture wicking jersey manufacturer",
    "dry fit polyester mesh jersey manufacturer",
    "anti bacterial sports jersey manufacturer",
    "breathable team uniform manufacturer",
    "custom team uniform manufacturer for clubs",
    "sports club kit supplier UK",
    "team uniform manufacturer for schools",
    "custom rugby jersey manufacturer",
    "custom volleyball uniform manufacturer",
    "custom hockey jersey manufacturer",
    "esports jersey manufacturer",
    "team uniform manufacturer with names and numbers",
    "bulk sports jerseys supplier Pakistan",
    "sports teamwear manufacturer Europe",
    "sublimated sportswear wholesale USA"
  ],
  alternates: {
    canonical: '/sportswear-manufacturer-exporter',
  },
  openGraph: {
    title: "Sublimated Sports Uniform & Jersey Manufacturer | Bin Rasool Enterprises",
    description: "Export sports uniform supplier in Sialkot, Pakistan. Sublimated football kits, basketball uniforms, cricket whites, and athletic teamwear with custom names and numbers.",
    url: "/sportswear-manufacturer-exporter",
    images: [{ url: "/images/categories/1776540279_sports-wear.webp", width: 1200, height: 630 }],
  },
};

export default function CategoryPage() {
  return (
    <div className="category-landing-page">
      {/* Hero Banner */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div className="breadcrumbs" style={{ color: '#cbd5e1' }}>
            <Link href="/" style={{ color: 'var(--brand-orange)' }}>Home</Link> / <span>Teamwear &amp; Uniforms</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Sublimated Teamwear &amp; Sports Uniform Manufacturer Pakistan
          </h1>
          <p style={{ maxWidth: '820px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Leading sports uniform manufacturer &amp; sublimated jersey factory in Sialkot, Pakistan. We produce custom soccer kits, basketball uniforms, cricket whites, rugby jerseys, esports team apparel, and breathable training vests with custom player names and numbers.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request a Teamwear Quote
            </Link>
            <Link href="/products" className="btn btn-outline">
              Explore Uniform Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="home-kicker">Professional Team Outfitting</span>
              <h2 style={{ margin: '8px 0 16px' }}>Direct Factory Custom Sports Uniforms &amp; Club Kits</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                Bin Rasool Enterprises is a full-service teamwear manufacturer supplying amateur leagues, professional sports clubs, school athletic departments, and retail brands across the UK, USA, Europe, and Australia. We specialize in all-over dye sublimation using premium Italian fade-resistant inks on moisture-wicking, anti-bacterial polyester fabrics.
              </p>
              
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Sports Teamwear Production Disciplines</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>Soccer &amp; Football Kits</strong> – Interlock &amp; jacquard mesh jerseys, matching shorts, and custom knitted team socks.</li>
                <li><strong>Basketball Uniforms</strong> – Reversible poly-mesh tanks and dazzle trim shorts with tackle twill or sublimated numbering.</li>
                <li><strong>Cricket Whites &amp; T20 Sublimated Kits</strong> – Premium breathable pique and dry-fit performance fabrics with embroidered club crests.</li>
                <li><strong>Rugby, Volleyball &amp; Hockey Jerseys</strong> – Heavyweight 280 GSM reinforced spandex rugby jerseys and lightweight quick-dry volleyball tops.</li>
                <li><strong>Custom Training Bibs &amp; Vests</strong> – High-visibility mesh practice pinneys with elasticated side tabs.</li>
                <li><strong>Esports Performance Jerseys</strong> – Raglan cut lightweight jerseys with custom sponsor badges and neck rib collar.</li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Inquire About Team Uniforms
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1776540279_sports-wear.webp"
                alt="Sportswear Manufacturer and Worldwide Exporter"
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
        title="Sportswear Export & Team Uniform FAQs"
        categoryBadge="Teamwear & Exporter"
        items={SPORTSWEAR_FAQS}
      />
    </div>
  );
}
