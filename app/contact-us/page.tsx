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
    canonical: '/contact-us',
  },
  openGraph: {
    title: "Contact Us | Bin Rasool Enterprises Sialkot",
    description: "Get in touch for custom sportswear, fitness wear, boxing gear and denim manufacturing inquiries.",
    url: "/contact-us",
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
            Have a project in mind, need pricing or want to submit your tech pack?
            Reach out to our merchandising desk in Sialkot, Pakistan. We reply within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section" style={{ background: '#f8fafc', padding: '36px 0 54px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Clean Contact Form */}
            <div style={{ flex: '1 1 540px' }}>
              <ContactForm />
            </div>

            {/* Right Column: Unified Single Contact Card */}
            <div style={{ flex: '1 1 340px' }}>
              <div
                style={{
                  background: '#ffffff',
                  padding: '24px',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 14px rgba(15, 23, 42, 0.03)',
                }}
              >
                <h3 style={{ margin: '0 0 18px', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  Direct Factory Details
                </h3>

                <div style={{ display: 'grid', gap: '16px', fontSize: '13.5px' }}>
                  {/* WhatsApp */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          background: '#0f172a',
                          color: '#ffffff',
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <WhatsAppIcon size={19} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <span style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', lineHeight: 1.2, marginBottom: '3px' }}>
                          WhatsApp (Instant Response)
                        </span>
                        <a
                          href="https://wa.me/923133599241"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#0f172a', fontWeight: 800, fontSize: '14.5px', textDecoration: 'none', lineHeight: 1.2, display: 'block' }}
                        >
                          +92 313 3599241
                        </a>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/923133599241"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        padding: '8px 18px',
                        fontSize: '13px',
                        fontWeight: 800,
                        minHeight: '38px',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderRadius: '999px',
                        flexShrink: 0,
                      }}
                    >
                      <WhatsAppIcon size={14} />
                      <span>Chat Now</span>
                    </a>
                  </div>

                  <hr style={{ border: 0, borderTop: '1px solid #f1f5f9', margin: '0' }} />

                  {/* Email */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: '#0f172a',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MailIcon size={16} />
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '2px' }}>
                        Email Inboxes
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontSize: '13.5px', lineHeight: 1.5 }}>
                          <span style={{ color: '#475569', fontWeight: 500 }}>Orders &amp; Price Quotes: </span>
                          <a href="mailto:sales@binrasoolenterprises.com" style={{ color: '#0284c7', fontWeight: 600, fontSize: '13.5px', textDecoration: 'none' }}>
                            sales@binrasoolenterprises.com
                          </a>
                        </div>
                        <div style={{ fontSize: '13.5px', lineHeight: 1.5 }}>
                          <span style={{ color: '#475569', fontWeight: 500 }}>General Inquiries: </span>
                          <a href="mailto:info@binrasoolenterprises.com" style={{ color: '#0284c7', fontWeight: 600, fontSize: '13.5px', textDecoration: 'none' }}>
                            info@binrasoolenterprises.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr style={{ border: 0, borderTop: '1px solid #f1f5f9', margin: '0' }} />

                  {/* Location */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: '#0f172a',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MapPinIcon size={16} />
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '2px' }}>
                        Factory Location
                      </span>
                      <span style={{ color: '#334155', lineHeight: 1.4 }}>
                        Pakki Kotli, Daska Road, Sialkot 51310, Pakistan
                      </span>
                    </div>
                  </div>

                  <hr style={{ border: 0, borderTop: '1px solid #f1f5f9', margin: '0' }} />

                  {/* Working Hours */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: '#0f172a',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ClockIcon size={16} />
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '2px' }}>
                        Operating Hours
                      </span>
                      <span style={{ color: '#334155' }}>
                        Monday – Saturday: 9:00 AM – 6:00 PM PKT (UTC+5)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Guarantees Strip inside same card */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'grid', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
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
