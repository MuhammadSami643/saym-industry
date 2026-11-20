import ContactForm from '../components/ContactForm';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import { WhatsAppIcon } from '../components/AdminIcons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact & Request a Quote | Bin Rasool Enterprises Sialkot Pakistan",
  description: "Connect directly with Bin Rasool Enterprises' export manufacturing team in Sialkot, Pakistan. Submit your tech pack for custom sportswear, fitness wear, boxing gear, hoodies, streetwear and denim jeans with 50 pcs low MOQ and fast DHL sampling.",
  keywords: [
    "contact sportswear manufacturer Pakistan",
    "request apparel manufacturing quote",
    "custom clothing factory Sialkot contact",
    "private label activewear quote",
    "tech pack review manufacturer",
    "low MOQ apparel manufacturer Sialkot",
    "Sialkot sportswear supplier WhatsApp",
    "apparel export inquiry Pakistan"
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Request a Manufacturing Quote | Bin Rasool Enterprises Sialkot",
    description: "Submit your apparel brief, tech pack, or reference sample for direct factory pricing, sampling lead times and production planning.",
    url: "/contact",
    images: [{ url: "/images/site/1776603661_home-hero-slider-image-1.webp", width: 1200, height: 630 }],
  },
};

const CATEGORY_PILLS = [
  { name: "Sportswear & Teamwear", href: "/sportswear-manufacturer" },
  { name: "Fitness Wear & Activewear", href: "/fitness-wear-manufacturer" },
  { name: "Boxing Wear & Fight Gear", href: "/boxing-wear-manufacturer" },
  { name: "Heavyweight Hoodies", href: "/hoodies-manufacturer" },
  { name: "Streetwear & Outerwear", href: "/streetwear-manufacturer" },
  { name: "Denim & Jeans Factory", href: "/jeans-manufacturer" },
  { name: "Private Label Trims & Bags", href: "/private-label" },
  { name: "Low MOQ for Startups", href: "/activewear-manufacturer-for-startups" },
];

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Header Banner - Matching Private Label Dark Theme */}
      <section className="pl-hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact & RFQ' },
            ]}
            style={{ marginBottom: '20px' }}
          />

          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">FACTORY DIRECT B2B INQUIRY &bull; SIALKOT, PAKISTAN</span>
              <h1>Request a Manufacturing Quote &amp; Tech Pack Review</h1>
              <p>
                Connect directly with Bin Rasool Enterprises' production merchandising desk. From initial CAD pattern review and fabric sourcing to 7-day pre-production DHL sampling, our engineers support international clothing brands with low 50 pcs MOQs and transparent factory pricing.
              </p>
            </div>

            <div className="pl-summary">
              <strong>Fast Response Guarantee</strong>
              <p>Every tech pack and inquiry is reviewed by our factory merchandising team. You will receive pricing direction, fabric suggestions and sampling timelines within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Factory Authority Details */}
      <section className="section" style={{ background: '#f8fafc', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 0.9fr)', gap: '44px', alignItems: 'start' }}>
            
            {/* Left Column: World-Class B2B Sourcing Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right Column: Direct Contact & Factory Verification Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* WhatsApp Direct Action Card */}
              <div
                className="card"
                style={{
                  background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
                  padding: '30px',
                  borderRadius: '18px',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }}></span>
                  <span style={{ color: '#22c55e', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Production Desk Online
                  </span>
                </div>
                <h3 style={{ margin: '0 0 10px', fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                  Direct WhatsApp Chat
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  Prefer real-time technical discussion? Message our export merchandising team directly on WhatsApp with your sketches or sample photos for instant feedback.
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
                    padding: '14px 22px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '15px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(34, 197, 94, 0.35)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <WhatsAppIcon size={20} />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>

              {/* Direct Factory Contact Details Card */}
              <div
                className="card"
                style={{
                  background: '#ffffff',
                  padding: '30px',
                  borderRadius: '18px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                }}
              >
                <h3 style={{ marginTop: 0, fontSize: '1.25rem', marginBottom: '18px', color: '#0f172a', fontWeight: 800 }}>
                  Factory Contact Channels
                </h3>
                
                <div style={{ display: 'grid', gap: '18px', fontSize: '14.5px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--brand-orange-light, #fff1d6)', color: 'var(--brand-orange-dark, #c57608)', display: 'grid', placeItems: 'center', fontSize: '18px', flexShrink: 0 }}>
                      📍
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a', display: 'block', marginBottom: '2px' }}>Factory Location</strong>
                      <span style={{ color: '#64748b', fontSize: '13.5px', lineHeight: 1.5 }}>
                        Sialkot, Punjab, Pakistan &bull; Worldwide export via Sialkot Airport (SKT) &amp; Karachi Port (PKKHI)
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--brand-orange-light, #fff1d6)', color: 'var(--brand-orange-dark, #c57608)', display: 'grid', placeItems: 'center', fontSize: '18px', flexShrink: 0 }}>
                      ✉️
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>Direct Email Desk</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <div>
                          <span style={{ color: '#64748b', fontSize: '13px' }}>RFQ &amp; Tech Packs: </span>
                          <a href="mailto:sales@binrasoolenterprises.com" style={{ color: 'var(--brand-orange-dark, #c57608)', fontWeight: 700, fontSize: '14px' }}>
                            sales@binrasoolenterprises.com
                          </a>
                        </div>
                        <div>
                          <span style={{ color: '#64748b', fontSize: '13px' }}>General Inquiries: </span>
                          <a href="mailto:info@binrasoolenterprises.com" style={{ color: '#0284c7', fontWeight: 600, fontSize: '13.5px' }}>
                            info@binrasoolenterprises.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--brand-orange-light, #fff1d6)', color: 'var(--brand-orange-dark, #c57608)', display: 'grid', placeItems: 'center', fontSize: '18px', flexShrink: 0 }}>
                      ⏱️
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a', display: 'block', marginBottom: '2px' }}>Factory Working Hours</strong>
                      <span style={{ color: '#64748b', fontSize: '13.5px' }}>
                        Monday – Saturday: 9:00 AM – 6:00 PM PKT (UTC+5)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factory Guarantees Card */}
              <div
                className="card"
                style={{
                  background: '#ffffff',
                  padding: '30px',
                  borderRadius: '18px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                }}
              >
                <h3 style={{ marginTop: 0, fontSize: '1.2rem', marginBottom: '16px', color: '#0f172a', fontWeight: 800 }}>
                  What You Can Expect From Us
                </h3>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '14px' }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: '#475569' }}>
                    <span style={{ color: '#22c55e', fontWeight: 900, fontSize: '16px' }}>✓</span>
                    <div>
                      <strong style={{ color: '#0f172a' }}>100% Non-Disclosure (NDA)</strong> – Your tech packs, CAD patterns, and artwork are never shared or resold.
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: '#475569' }}>
                    <span style={{ color: '#22c55e', fontWeight: 900, fontSize: '16px' }}>✓</span>
                    <div>
                      <strong style={{ color: '#0f172a' }}>Low 50 Pcs Minimums</strong> – Startup-friendly MOQs to test seasonal drops without heavy capital tie-up.
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: '#475569' }}>
                    <span style={{ color: '#22c55e', fontWeight: 900, fontSize: '16px' }}>✓</span>
                    <div>
                      <strong style={{ color: '#0f172a' }}>7-10 Days Physical DHL Sampling</strong> – Touch and test fabric hand-feel, fit grading, and stitching before bulk authorising.
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: '#475569' }}>
                    <span style={{ color: '#22c55e', fontWeight: 900, fontSize: '16px' }}>✓</span>
                    <div>
                      <strong style={{ color: '#0f172a' }}>DDP Air &amp; Ocean Logistics</strong> – Door-to-door courier delivery to USA, UK, Europe, Australia, and Canada with customs handling.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Core Sourced Categories */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '28px',
                  borderRadius: '18px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <span style={{ color: 'var(--brand-orange, #f3a626)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px', fontSize: '11.5px', display: 'block', marginBottom: '8px' }}>
                  SOURCING HUBS
                </span>
                <h4 style={{ margin: '0 0 14px', fontSize: '1.05rem', color: '#0f172a', fontWeight: 800 }}>
                  Explore Specific Category Divisions
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {CATEGORY_PILLS.map((p, idx) => (
                    <Link
                      key={idx}
                      href={p.href}
                      style={{
                        padding: '6px 12px',
                        background: '#f1f5f9',
                        borderRadius: '6px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: '#334155',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5-Step Transparent Sourcing Path */}
      <section className="section" style={{ background: '#ffffff', padding: '64px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
            <span className="pl-label">Transparent Sourcing Process</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 12px' }}>
              What Happens After You Submit an Inquiry?
            </h2>
            <p style={{ color: '#64748b', fontSize: '15.5px', margin: 0 }}>
              From initial tech pack assessment to sample sign-off and bulk export dispatch.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <span style={{ color: 'var(--brand-orange, #f3a626)', fontWeight: 900, fontSize: '14px', display: 'block', marginBottom: '8px' }}>STEP 01</span>
              <h3>Tech Pack Evaluation</h3>
              <p className="muted">Our pattern master and fabric specialists review your drawings, measurements, and target GSM to assess construction requirements.</p>
            </div>
            <div className="process-card">
              <span style={{ color: 'var(--brand-orange, #f3a626)', fontWeight: 900, fontSize: '14px', display: 'block', marginBottom: '8px' }}>STEP 02</span>
              <h3>Pricing &amp; Lead Time Quote</h3>
              <p className="muted">We send a transparent breakdown including sample cost, volume tiered unit pricing, fabric options, and estimated production schedules.</p>
            </div>
            <div className="process-card">
              <span style={{ color: 'var(--brand-orange, #f3a626)', fontWeight: 900, fontSize: '14px', display: 'block', marginBottom: '8px' }}>STEP 03</span>
              <h3>Physical Pre-Production Sample</h3>
              <p className="muted">Upon agreement, we develop a physical golden sample complete with your custom trims, labels, and embroidery, shipped via DHL Express.</p>
            </div>
            <div className="process-card">
              <span style={{ color: 'var(--brand-orange, #f3a626)', fontWeight: 900, fontSize: '14px', display: 'block', marginBottom: '8px' }}>STEP 04</span>
              <h3>Bulk Cut, Sew &amp; AQL 2.5 QC</h3>
              <p className="muted">Bulk production proceeds strictly following your approved golden sample, with raw fabric testing and in-line stitch inspection.</p>
            </div>
            <div className="process-card">
              <span style={{ color: 'var(--brand-orange, #f3a626)', fontWeight: 900, fontSize: '14px', display: 'block', marginBottom: '8px' }}>STEP 05</span>
              <h3>Custom Packing &amp; Global Export</h3>
              <p className="muted">Individual custom frosted polybagging, carton labeling, barcode stickers, and door-to-door express courier or consolidated sea freight.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
