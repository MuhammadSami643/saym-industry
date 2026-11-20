import ContactForm from '../components/ContactForm';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import { WhatsAppIcon, MailIcon, MapPinIcon, ClockIcon } from '../components/AdminIcons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | Bin Rasool Enterprises Sialkot Pakistan",
  description: "Connect directly with Bin Rasool Enterprises in Sialkot, Pakistan. Submit your tech pack for custom sportswear, fitness wear, boxing gear, hoodies, streetwear and denim jeans with low 50 pcs MOQ and fast DHL sampling.",
  keywords: [
    "contact sportswear manufacturer Pakistan",
    "request apparel manufacturing quote",
    "clothing factory Sialkot contact",
    "private label activewear quote",
    "Sialkot sportswear supplier WhatsApp",
    "apparel export inquiry Pakistan"
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Us | Bin Rasool Enterprises Sialkot",
    description: "Get in touch for custom sportswear, fitness wear, boxing gear, and denim manufacturing inquiries.",
    url: "/contact",
    images: [{ url: "/images/site/1776603661_home-hero-slider-image-1.webp", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Clean Hero Header */}
      <section className="hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us' },
            ]}
          />
          <span className="hero-kicker">DIRECT FACTORY CONTACT</span>
          <h1>Contact Us</h1>
          <p>
            Have a project in mind, need pricing, or want to submit your tech pack? 
            Reach out to our merchandising desk in Sialkot, Pakistan. We reply within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section" style={{ background: '#f8fafc', padding: '56px 0 72px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Clean Contact Form */}
            <div style={{ flex: '1 1 560px' }}>
              <ContactForm />
            </div>

            {/* Right Column: Unified Contact & Factory Information Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* WhatsApp Quick Chat */}
              <div
                style={{
                  background: '#0f172a',
                  padding: '28px',
                  borderRadius: '16px',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                  <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Fastest Response
                  </span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  Chat on WhatsApp
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5, margin: '0 0 18px' }}>
                  Send your sketches, reference pictures, or quick questions directly to our merchandising team.
                </p>
                <a
                  href="https://wa.me/923376793383"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: '#22c55e',
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '14.5px',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <WhatsAppIcon size={18} />
                  <span>+92 337 6793383</span>
                </a>
              </div>

              {/* Direct Details Card */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '28px',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                }}
              >
                <h3 style={{ margin: '0 0 22px', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  Direct Factory Details
                </h3>

                <div style={{ display: 'grid', gap: '20px', fontSize: '14px' }}>
                  {/* Email */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: '#0f172a',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MailIcon size={18} />
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '3px' }}>
                        Email Inboxes
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <div>
                          <span style={{ color: '#475569' }}>RFQ &amp; Tech Packs: </span>
                          <a href="mailto:sales@binrasoolenterprises.com" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none' }}>
                            sales@binrasoolenterprises.com
                          </a>
                        </div>
                        <div>
                          <span style={{ color: '#475569' }}>General Inquiries: </span>
                          <a href="mailto:info@binrasoolenterprises.com" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>
                            info@binrasoolenterprises.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr style={{ border: 0, borderTop: '1px solid #f1f5f9', margin: '0' }} />

                  {/* Location */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: '#0f172a',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MapPinIcon size={18} />
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '3px' }}>
                        Factory Location
                      </span>
                      <span style={{ color: '#334155', lineHeight: 1.5 }}>
                        Small Industrial Estate, Sialkot 51310, Punjab, Pakistan
                      </span>
                    </div>
                  </div>

                  <hr style={{ border: 0, borderTop: '1px solid #f1f5f9', margin: '0' }} />

                  {/* Working Hours */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: '#0f172a',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ClockIcon size={18} />
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '3px' }}>
                        Operating Hours
                      </span>
                      <span style={{ color: '#334155' }}>
                        Monday – Saturday: 9:00 AM – 6:00 PM PKT (UTC+5)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple Guarantees Pill Card */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '22px 24px',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'grid', gap: '10px', fontSize: '13.5px', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#22c55e', fontWeight: 900 }}>✓</span>
                    <span><strong>Low MOQ:</strong> Starting from 50 pcs per style</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#22c55e', fontWeight: 900 }}>✓</span>
                    <span><strong>Fast Samples:</strong> 7–10 days DHL Express delivery</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#22c55e', fontWeight: 900 }}>✓</span>
                    <span><strong>100% Confidential:</strong> NDA &amp; design privacy guaranteed</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
