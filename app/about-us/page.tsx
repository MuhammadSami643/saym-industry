import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import FaqSection from '../components/FaqSection';
import { ArrowRightIcon } from '../components/AdminIcons';

export const metadata = {
  title: "About Bin Rasool Enterprises | Private Label Fitness, Sportswear & Boxing Manufacturer",
  description: "Learn about Bin Rasool Enterprises, a private label activewear, fitness wear, sportswear and boxing apparel manufacturer in Sialkot, Pakistan serving international buyers with low MOQs and export quality."
};

const ABOUT_FAQS = [
  {
    question: "What kind of manufacturer is Bin Rasool Enterprises?",
    answer: "Bin Rasool Enterprises is a Sialkot-based apparel manufacturer focused on sportswear, fitness wear, boxing wear, activewear and private label production for international buyers."
  },
  {
    question: "Who does Bin Rasool Enterprises work with?",
    answer: "We work with startup brands, growing labels, wholesalers, online sellers, gyms, clubs and import buyers looking for category-focused apparel manufacturing."
  },
  {
    question: "What makes Bin Rasool Enterprises different for buyers?",
    answer: "Our positioning emphasizes focused apparel categories, clearer communication, practical sampling, private label support and export-ready production handling."
  },
  {
    question: "Can Bin Rasool Enterprises help with branding and packaging?",
    answer: "Yes. We support private label details such as custom labels, hang tags, packaging, logo application and product presentation for buyer-ready collections."
  },
  {
    question: "Is Bin Rasool Enterprises suitable for repeat production orders?",
    answer: "Yes. The manufacturing approach is designed for buyers who want a dependable partner for sampling, bulk production, quality checks and long-term order continuity."
  }
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <main style={{ minHeight: '60vh' }}>
        {/* 1. Hero Section */}
        <section className="about-hero">
          <div className="about-hero-slides" aria-hidden="true">
            <div
              className="about-hero-slide is-active"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1542293787938-4d22175f3e69?auto=format&fit=crop&w=1600&q=80')"
              }}
            ></div>
          </div>

          <div className="container">
              <BreadcrumbJsonLd
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'About Us' },
                ]}
              />

              <div className="page-kicker">
                DIRECT FACTORY PRODUCTION &nbsp;&bull;&nbsp; SIALKOT, PAKISTAN
              </div>

                <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.15, margin: '14px 0 16px', fontWeight: 900 }}>
                  OEM &amp; Private Label Apparel Manufacturing for Global Brands
                </h1>
                <p style={{ maxWidth: '820px', fontSize: '16.5px', lineHeight: 1.65, color: '#94a3b8', margin: '0 0 32px' }}>
                  Headquartered in Sialkot, Pakistan, Bin Rasool Enterprises operates specialized in-house production floors for custom athletic apparel, luxury heavyweight fleece and combat gear. We partner with emerging labels and established global brands with low-MOQ sampling, tech pack execution and strict AQL 2.5 quality compliance.
                </p>

                <div className="about-metrics" aria-label="Bin Rasool Enterprises manufacturing highlights">
                  <div className="about-metric">
                    <strong>In-House Plant</strong>
                    <span>Sialkot Factory Floor</span>
                  </div>
                  <div className="about-metric">
                    <strong>7–10 Day Proto</strong>
                    <span>Rapid Sampling Turnaround</span>
                  </div>
                  <div className="about-metric">
                    <strong>50 Pcs Low MOQ</strong>
                    <span>Scalable Commercial Batches</span>
                  </div>
                  <div className="about-metric">
                    <strong>AQL 2.5 Standard</strong>
                    <span>Pre-Shipment Inspection</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Who We Are */}
              <section className="section about-band" style={{ padding: '52px 0' }}>
                <div className="container content">
                    <div className="about-split" style={{ gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: '48px', alignItems: 'center' }}>
                      <div>
                        <span className="about-section-label">Who We Are</span>
                        <h2 style={{ margin: '8px 0 12px', fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)' }}>
                          A focused sportswear, fitness wear and boxing wear manufacturer
                        </h2>
                        <p className="muted" style={{ fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                          Crafting authentic custom apparel direct from our Sialkot production lines for international brand partners.
                        </p>
                      </div>
                          <div className="about-panel" style={{ borderLeft: '3px solid var(--brand-orange, #f3a626)', padding: '10px 0 10px 28px' }}>
                            <p className="muted" style={{ fontSize: '14.5px', lineHeight: 1.7, marginBottom: '14px' }}>
                              Bin Rasool Enterprises is not trying to manufacture every type of garment. We are focused on performance apparel
                              categories where buyers need strong materials, practical construction, clear sizing and consistent
                              finishing. Our main categories include gym joggers, hoodies, leggings, activewear sets, dry-fit gym
                              t-shirts, soccer jerseys, basketball uniforms, tracksuits, team uniforms, boxing shorts, rash guards, fight wear and combat sports clothing.
                            </p>
                              <p className="muted" style={{ fontSize: '14.5px', lineHeight: 1.7, margin: 0 }}>
                                This focused approach helps us speak directly to private label brands, sports clubs, fitness businesses, boxing gyms, importers and wholesale buyers searching for a reliable sportswear manufacturer in Sialkot, Pakistan.
                              </p>
                          </div>
                      </div>
                    </div>
                  </section>

                  {/* 3. Our Mission & Values */}
                    <section className="section" style={{ background: '#ffffff' }}>
                      <div className="container content">
                          <div style={{ maxWidth: '820px', marginBottom: '32px' }}>
                            <span className="about-section-label">Our Mission &amp; Standards</span>
                            <h2 style={{ margin: '8px 0 12px' }}>Empowering Global Apparel Brands with Sialkot Manufacturing Excellence</h2>
                            <p className="muted" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                              Our mission is to make custom sportswear, activewear and combat gear sourcing effortless for international labels through transparent pricing, strict sample discipline and reliable export turnaround.
                            </p>
                          </div>

                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                              gap: '18px',
                            }}
                          >
                            {[
                              { num: "01", title: "Our Vision", desc: "To be the most dependable OEM & private label athletic manufacturer in Pakistan, trusted by high-growth USA, UK and European labels." },
                              { num: "02", title: "Our Promise", desc: "No middleman guesswork. Direct access to floor managers, verified tech packs, accurate fabric weights and scheduled production milestones." },
                              { num: "03", title: "Our Standard", desc: "Strict ISO and AQL 2.5 quality audits at every stage: tensile seam pull testing, needle-detector scanning and wash colorfastness." },
                              { num: "04", title: "Our Focus", desc: "Dedicated production cells for activewear, French Terry luxury hoodies and professional boxing combat gear tailored to brand specs." }
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                style={{
                                  background: '#f8fafc',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '12px',
                                  padding: '24px 20px',
                                  position: 'relative'
                                }}
                              >
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '8px',
                                    background: 'rgba(243, 166, 38, 0.16)',
                                    color: 'var(--brand-orange-dark, #c57608)',
                                    fontWeight: 900,
                                    fontSize: '15px',
                                    marginBottom: '12px',
                                  }}
                                >
                                  {item.num}
                                </span>
                                <h3 style={{ fontSize: '16.5px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>{item.title}</h3>
                                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                    </section>

                    {/* 4. What We Manufacture */}
                    <section className="section" style={{ background: 'var(--bg-light)' }}>
                      <div className="container content">
                        <span className="about-section-label">What We Manufacture</span>
                        <h2>Category expertise for brand-ready apparel collections</h2>
                        <p className="muted" style={{ maxWidth: '820px' }}>
                          Every buyer comes with a different target market, price point, fabric requirement and branding plan. Bin Rasool Enterprises
                          helps turn those requirements into clear product direction before bulk production starts.
                        </p>

                            <div className="about-focus-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px', marginTop: '32px' }}>
                              <article
                                className="about-focus"
                                style={{
                                  background: '#ffffff',
                                  borderRadius: '12px',
                                  overflow: 'hidden',
                                  border: '1px solid #e2e8f0',
                                  padding: 0,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                                }}
                              >
                                <div style={{ width: '100%', height: '210px', overflow: 'hidden', background: '#0f172a' }}>
                                  <img
                                    src="/images/categories/1776540259_fitness-wear.webp"
                                    alt="Fitness Wear Manufacturing Sialkot"
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                </div>
                                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>Fitness Wear Manufacturing</h3>
                                  <p className="muted" style={{ fontSize: '13.5px', lineHeight: 1.6, marginBottom: '18px' }}>
                                    Private label gym wear, activewear sets, leggings, joggers, hoodies, compression wear and dry-fit training t-shirts for fitness brands and online stores.
                                  </p>
                                  <Link
                                    href="/fitness-wear-manufacturer"
                                    style={{
                                      marginTop: 'auto',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      color: 'var(--brand-orange-dark, #c57608)',
                                      fontWeight: 700,
                                      fontSize: '14px',
                                      textDecoration: 'none'
                                    }}
                                  >
                                    <span>Explore Fitness Wear</span>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', transform: 'translateY(1px)' }}>
                                      <ArrowRightIcon size={14} />
                                    </span>
                                  </Link>
                                </div>
                              </article>

                                <article
                                  className="about-focus"
                                  style={{
                                    background: '#ffffff',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid #e2e8f0',
                                    padding: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                                  }}
                                >
                                  <div style={{ width: '100%', height: '210px', overflow: 'hidden', background: '#0f172a' }}>
                                    <img
                                      src="/images/categories/1776540279_sports-wear.webp"
                                      alt="Sportswear Manufacturing Exporter"
                                      loading="lazy"
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  </div>
                                  <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>Sportswear Manufacturing</h3>
                                    <p className="muted" style={{ fontSize: '13.5px', lineHeight: 1.6, marginBottom: '18px' }}>
                                      Custom teamwear, soccer jerseys, basketball uniforms, tracksuits, training wear, sublimation sportswear and club uniforms for wholesale buyers.
                                    </p>
                                    <Link
                                      href="/sportswear-manufacturer-exporter"
                                      style={{
                                        marginTop: 'auto',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: 'var(--brand-orange-dark, #c57608)',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        textDecoration: 'none'
                                      }}
                                    >
                                      <span>Explore Sports Wear</span>
                                      <span style={{ display: 'inline-flex', alignItems: 'center', transform: 'translateY(1px)' }}>
                                        <ArrowRightIcon size={14} />
                                      </span>
                                    </Link>
                                  </div>
                                </article>

                                  <article
                                    className="about-focus"
                                    style={{
                                      background: '#ffffff',
                                      borderRadius: '12px',
                                      overflow: 'hidden',
                                      border: '1px solid #e2e8f0',
                                      padding: 0,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                                    }}
                                  >
                                    <div style={{ width: '100%', height: '210px', overflow: 'hidden', background: '#0f172a' }}>
                                      <img
                                        src="/images/categories/1776540301_boxing-wear.webp"
                                        alt="Boxing Wear Fight Gear Workshop"
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                      />
                                    </div>
                                    <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                      <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>Boxing Wear Manufacturing</h3>
                                      <p className="muted" style={{ fontSize: '13.5px', lineHeight: 1.6, marginBottom: '18px' }}>
                                        Boxing shorts, fight wear apparel, rash guards, combat sports clothing and training tops for fight brands, boxing gyms, MMA and BJJ markets.
                                      </p>
                                      <Link
                                        href="/boxing-gear-manufacturer-bulk"
                                        style={{
                                          marginTop: 'auto',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '6px',
                                          color: 'var(--brand-orange-dark, #c57608)',
                                          fontWeight: 700,
                                          fontSize: '14px',
                                          textDecoration: 'none'
                                        }}
                                      >
                                        <span>Explore Boxing Wear</span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', transform: 'translateY(1px)' }}>
                                          <ArrowRightIcon size={14} />
                                        </span>
                                      </Link>
                                    </div>
                                  </article>
                                </div>
                            </div>
                          </section>

                          {/* 5. How We Work */}
                            <section className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--border)' }}>
                              <div className="container content">
                                      <div style={{ maxWidth: '780px', marginBottom: '36px' }}>
                                        <span className="about-section-label">How We Work</span>
                                        <h2 style={{ margin: '8px 0 12px' }}>From tech pack &amp; prototype to export-ready delivery</h2>
                                        <p className="muted" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                                          International buyers want more than a product list. We provide an end-to-end manufacturing workflow built around transparent communication, rapid sample turnaround and strict pre-shipment quality standards.
                                        </p>
                                      </div>

                                      <div
                                        style={{
                                          display: 'grid',
                                          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                          gap: '20px',
                                        }}
                                      >
                                        {[
                                          {
                                            step: "01",
                                            title: "Requirement & Tech Pack Review",
                                            desc: "We analyze CAD drawings, target GSM, fabric compositions (French Terry, Spandex blends) and trim specs before quoting realistic FOB timelines."
                                          },
                                          {
                                            step: "02",
                                            title: "Rapid Sampling & Fit Approval",
                                            desc: "Physical prototypes produced within 7–10 business days. We confirm grading tolerance (±0.5 cm), fabric drape, stitch density and custom labeling."
                                          },
                                          {
                                            step: "03",
                                            title: "In-House Precision Manufacturing",
                                            desc: "Automated Eastman CNC cutting, 4-needle 6-thread flatlock assembly and high-density printing or computerized embroidery executed under one roof."
                                          },
                                          {
                                            step: "04",
                                            title: "AQL 2.5 Inspection & Dispatch",
                                            desc: "Independent quality audits, 100% needle-detector scanning, industrial steam tunnel finishing, custom polybagging and worldwide express air or sea freight."
                                          }
                                        ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '24px 20px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(243, 166, 38, 0.16)',
                      color: 'var(--brand-orange-dark, #c57608)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '16px',
                      marginBottom: '16px',
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
                                    </div>
                                  </div>
                                </section>

                                {/* 6. Why Buyers Choose BRE */}
                                <section className="section" style={{ background: 'var(--bg-light)' }}>
                                  <div className="container content">
                                    <div className="about-split" style={{ alignItems: 'center' }}>
                                      <div>
                                        <span className="about-section-label">Why Buyers Choose Us</span>
                                        <h2>Manufacturing support for startups, wholesalers and growing brands</h2>
                                        <p className="muted" style={{ marginTop: '14px', fontSize: '15px', lineHeight: 1.7 }}>
                                          Direct access to our Sialkot manufacturing floor eliminates middleman markups, accelerates sampling and guarantees consistent stitch precision across repeat export consignments.
                                        </p>
                                        <div style={{ marginTop: '22px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                          <div style={{ borderLeft: '3px solid var(--brand-orange, #f3a626)', paddingLeft: '12px' }}>
                                            <div style={{ fontSize: '19px', fontWeight: 900, color: 'var(--brand-black, #111827)' }}>AQL 2.5</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>Pre-Shipment Inspection</div>
                                          </div>
                                          <div style={{ borderLeft: '3px solid var(--brand-orange, #f3a626)', paddingLeft: '12px' }}>
                                            <div style={{ fontSize: '19px', fontWeight: 900, color: 'var(--brand-black, #111827)' }}>50 Pcs</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>Low MOQ Sampling</div>
                                          </div>
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {[
                                          {
                                            title: "Dedicated In-House Plant",
                                            desc: "Specialized production cells for activewear, French Terry fleece and boxing gear without third-party outsourcing."
                                          },
                                          {
                                            title: "Complete Private Label Trims",
                                            desc: "Custom woven damask labels, high-density silicone logos, embossed hangtags and branded zip bags."
                                          },
                                          {
                                            title: "Low MOQ Sampling (50 Pcs)",
                                            desc: "Flexible order thresholds designed specifically for emerging labels, gym merchandise and growing wholesale buyers."
                                          },
                                          {
                                            title: "Direct English Communication",
                                            desc: "Daily photo/video production updates, clear tech pack reviews and responsive sourcing directors."
                                          },
                                          {
                                            title: "FOB Karachi & Express Freight",
                                            desc: "4–7 business day express delivery via DHL/FedEx plus consolidated air and ocean cargo support."
                                          }
                                        ].map((item, idx) => (
                                          <div
                                            key={idx}
                                            style={{
                                              display: 'flex',
                                              gap: '14px',
                                              alignItems: 'flex-start',
                                              padding: '13px 16px',
                                              background: '#ffffff',
                                              borderRadius: '10px',
                                              border: '1px solid #e2e8f0',
                                              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: '22px',
                                                height: '22px',
                                                borderRadius: '50%',
                                                background: 'rgba(243, 166, 38, 0.16)',
                                                color: 'var(--brand-orange-dark, #c57608)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px',
                                                fontWeight: 900,
                                                flexShrink: 0,
                                                marginTop: '2px'
                                              }}
                                            >
                                              ✓
                                            </div>
                                            <div>
                                              <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#0f172a', marginBottom: '2px' }}>{item.title}</div>
                                              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.55 }}>{item.desc}</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </section>

                                {/* 7. CTA Banner */}
                                <section className="section">
                                  <div className="container">
                                    <div className="about-cta">
                                      <div>
                                        <h2>Need a private label sportswear manufacturer in Pakistan?</h2>
                                        <p>Share your product category, quantity, reference images and branding needs. We will guide you toward
                                          the right starting point for sampling or bulk production.</p>
                                      </div>
                                      <Link href="/contact" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                                        Contact Bin Rasool Enterprises
                                      </Link>
                                    </div>
                                  </div>
                                </section>

                                {/* 8. Interactive FAQ Accordion */}
                                <FaqSection
                                  title="About Bin Rasool Enterprises FAQs"
                                  items={ABOUT_FAQS}
                                />
                              </main>
                            </div>
                            );
}
