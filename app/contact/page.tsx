import ContactForm from '../components/ContactForm';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';

export const metadata = {
  title: "Contact Bin Rasool Enterprises | Private Label Sportswear Manufacturer Pakistan",
  description: "Contact Bin Rasool Enterprises for private label sportswear, fitness wear, boxing wear, teamwear, activewear, sampling, wholesale manufacturing and export production inquiries from Sialkot, Pakistan."
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Header Banner */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Start Your Private Label Activewear, Fitness Wear or Sportswear Inquiry
          </h1>
          <p style={{ maxWidth: '750px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Connect with our Sialkot factory team for sample development, low MOQ manufacturing, custom private labeling and worldwide export delivery.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Direct Details */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
            
            {/* Left: Contact Form */}
            <ContactForm />

            {/* Right: Direct Contact & Factory Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ background: '#ffffff', padding: '30px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}>
                <h3 style={{ marginTop: 0, fontSize: '1.25rem', marginBottom: '16px', color: '#0f172a', fontWeight: 800 }}>Direct Factory Contact</h3>
                <div style={{ display: 'grid', gap: '14px', color: 'var(--text-main)', fontSize: '15px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--brand-orange-light)', color: 'var(--brand-orange-dark)', display: 'grid', placeItems: 'center', fontWeight: 900, flexShrink: 0 }}>📍</div>
                    <div>
                      <strong style={{ color: '#0f172a' }}>Location</strong>
                      <div className="muted" style={{ fontSize: '13.5px' }}>Sialkot, Punjab, Pakistan (Global Sports Goods Manufacturing Hub)</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'grid', placeItems: 'center', fontWeight: 900, flexShrink: 0 }}>💬</div>
                    <div>
                      <strong style={{ color: '#0f172a' }}>WhatsApp Support</strong>
                      <div>
                        <a href="https://wa.me/923376793383" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-orange-dark)', fontWeight: 700 }}>
                          +92 337 6793383
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--brand-orange-light)', color: 'var(--brand-orange-dark)', display: 'grid', placeItems: 'center', fontWeight: 900, flexShrink: 0 }}>✉️</div>
                    <div>
                      <strong style={{ color: '#0f172a' }}>Email Inquiries</strong>
                      <div>
                        <a href="mailto:info@binrasoolenterprises.com" style={{ color: 'var(--brand-orange-dark)', fontWeight: 700 }}>
                          info@binrasoolenterprises.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--brand-orange-light)', color: 'var(--brand-orange-dark)', display: 'grid', placeItems: 'center', fontWeight: 900, flexShrink: 0 }}>⏱️</div>
                    <div>
                      <strong style={{ color: '#0f172a' }}>Working Hours</strong>
                      <div className="muted" style={{ fontSize: '13.5px' }}>Monday – Saturday: 9:00 AM – 6:00 PM PKT (UTC+5)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Include Card */}
              <div className="card" style={{ background: '#ffffff', padding: '30px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}>
                <h3 style={{ marginTop: 0, fontSize: '1.2rem', marginBottom: '14px', color: '#0f172a', fontWeight: 800 }}>Best Details to Include</h3>
                <ul className="list" style={{ color: '#475569', fontSize: '14px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                  <li>Target apparel items (leggings, joggers, hoodies, fight shorts, etc.)</li>
                  <li>Approximate quantity per style / colorway (e.g. 50, 100, 300+ pcs)</li>
                  <li>Fabric preferences (Nylon/Spandex, French Terry, Fleece, Mesh)</li>
                  <li>Custom branding needs (silicone print, embroidery, custom tags, polybags)</li>
                  <li>Destination country for freight planning (USA, UK, Europe, Australia, etc.)</li>
                </ul>
              </div>

              {/* Buyer Markets */}
              <div className="card-dark" style={{ background: '#0b1220', padding: '30px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)' }}>
                <h3 style={{ marginTop: 0, fontSize: '1.2rem', color: '#ffffff', marginBottom: '12px', fontWeight: 800 }}>Worldwide Export Markets</h3>
                <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, lineHeight: '1.7' }}>
                  We export worldwide via DHL Express, FedEx, air cargo and sea freight to activewear startups, fitness brands, gym chains and wholesale distributors in North America, United Kingdom, European Union, Australia and the Middle East.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Step What Happens After Inquiry */}
      <section className="section">
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="home-kicker">Transparent Communication</span>
              <h2 style={{ marginTop: '8px' }}>What Happens After You Send an Inquiry?</h2>
            </div>
          </div>
          <div className="process-grid">
            <div className="process-card">
              <h3>Inquiry Review</h3>
              <p className="muted">Our technical merchandising team reviews your tech pack, sketch, or reference photos to evaluate feasibility.</p>
            </div>
            <div className="process-card">
              <h3>Production Direction</h3>
              <p className="muted">We confirm fabric availability, pattern requirements, branding methods and provide an initial price and MOQ quote.</p>
            </div>
            <div className="process-card">
              <h3>Sample Planning</h3>
              <p className="muted">Once approved, our sampling line cuts, sews and brands a physical prototype for your hands-on approval.</p>
            </div>
            <div className="process-card">
              <h3>Bulk Order Path</h3>
              <p className="muted">Bulk cutting, printing, stitching and multistage quality checks proceed strictly against your approved golden sample.</p>
            </div>
            <div className="process-card">
              <h3>Packaging &amp; Export</h3>
              <p className="muted">Individual custom polybagging, carton labeling and door-to-door or port-to-port export shipping.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
