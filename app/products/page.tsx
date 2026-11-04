import { getProducts } from '../actions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Private Label Activewear Product Catalog | ZYPFIT",
  description: "Browse custom fitness wear, gym joggers, high-waist compression leggings, sportswear tracksuits, boxing apparel, and premium streetwear hoodies manufactured by ZYPFIT in Sialkot, Pakistan."
};

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="products-page">
      {/* Header Banner */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div className="breadcrumbs" style={{ color: '#cbd5e1' }}>
            <Link href="/" style={{ color: 'var(--brand-orange)' }}>Home</Link> / <span>Product Catalog</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Private Label Activewear &amp; Apparel Catalog
          </h1>
          <p style={{ maxWidth: '780px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Explore our custom manufacturing options across fitness wear, sports performance apparel, fight gear, and heavyweight streetwear. All styles are customizable with low MOQs, custom branding, and export shipping.
          </p>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="home-kicker">Custom Production Showcase</span>
              <h2 style={{ marginTop: '8px' }}>Available Activewear Styles</h2>
              <p className="muted">
                Each product is custom built to your technical specifications, fabric blend, GSM, colors, size chart, and private label branding.
              </p>
            </div>
            <div>
              <Link href="/contact" className="btn btn-primary">
                Request Custom Sample
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '26px' }}>
            {products.map((p) => (
              <div key={p.id} className="card clickable-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#e2e8f0' }}>
                  <img
                    src={p.image_url || '/images/products/1780565647_slim-fit-gym-joggers.webp'}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'var(--brand-orange)', color: 'var(--brand-black)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '5px 10px', borderRadius: '999px' }}>
                    {p.category}
                  </div>
                </div>

                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px', color: 'var(--text-main)' }}>
                    {p.name}
                  </h3>
                  <p className="muted" style={{ fontSize: '14px', margin: '0 0 20px', flexGrow: 1, lineHeight: '1.6' }}>
                    {p.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
                      MOQ: from 50 pcs
                    </span>
                    <Link
                      href={`/contact?product=${encodeURIComponent(p.name)}`}
                      className="btn btn-primary"
                      style={{ padding: '8px 18px', minHeight: '38px', fontSize: '13px' }}
                    >
                      Inquire Style →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA Box */}
          <div className="home-cta" style={{ marginTop: '64px' }}>
            <div>
              <span className="home-kicker">Start Your Line</span>
              <h2>Have custom tech packs or specific design requirements?</h2>
              <p>
                We produce custom apparel beyond this catalog. Send us your mockups, tech packs, or reference samples for a detailed manufacturing review.
              </p>
            </div>
            <div className="home-cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Get a Custom Quote
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
