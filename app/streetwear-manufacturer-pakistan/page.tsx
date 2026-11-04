import Link from 'next/link';

export const metadata = {
  title: "Streetwear Manufacturer Pakistan | Luxury Heavyweight Hoodies & Tees",
  description: "400+ GSM heavyweight French Terry hoodies, acid wash oversized tees, heavyweight sweatpants, and luxury streetwear collections with puff print and vintage wash."
};

export default function CategoryPage() {
  return (
    <div className="category-landing-page">
      {/* Hero Banner */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div className="breadcrumbs" style={{ color: '#cbd5e1' }}>
            <Link href="/" style={{ color: 'var(--brand-orange)' }}>Home</Link> / <span>Streetwear</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Heavyweight Streetwear Manufacturer in Sialkot Pakistan
          </h1>
          <p style={{ maxWidth: '780px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            400+ GSM heavyweight French Terry hoodies, acid wash oversized tees, heavyweight sweatpants, and luxury streetwear collections with puff print and vintage wash.
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
              <h2 style={{ margin: '8px 0 16px' }}>Custom Streetwear Production Built to Your Standard</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                We work directly with startup brands, sports clubs, gyms, and international apparel importers. From initial pattern drafting and fabric selection to sample verification, custom branding, and bulk packaging, your order is crafted in our Sialkot production unit under strict quality control.
              </p>
              
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Featured Product Styles</h3>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>450 GSM Heavyweight Hoodies</strong></li>
                <li><strong>280 GSM Drop Shoulder Tees</strong></li>
                <li><strong>Baggy Heavyweight Sweatpants</strong></li>
                <li><strong>Vintage Acid & Mineral Washes</strong></li>
                <li><strong>Custom High-Density & Puff Print</strong></li>
              </ul>

              <Link href="/contact" className="btn btn-primary">
                Inquire About Streetwear
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1789894942_streetwear.webp"
                alt="Heavyweight Streetwear Manufacturer in Sialkot Pakistan"
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
              <h2>Ready to sample or produce custom Streetwear?</h2>
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
    </div>
  );
}
