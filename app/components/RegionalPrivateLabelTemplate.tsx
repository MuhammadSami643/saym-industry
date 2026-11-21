import Link from 'next/link';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import FaqSection from './FaqSection';
import { ArrowRightIcon } from './AdminIcons';

export interface RegionalMarketConfig {
  slug: string;
  marketName: string;
  countryName: string;
  badge: string;
  title: string;
  description: string;
  keywords?: string[];
  metrics: { val: string; lbl: string }[];
  marketFocus: {
    heading: string;
    points: { title: string; desc: string }[];
  };
  commercials: {
    moq: string;
    sampleLeadTime: string;
    bulkLeadTime: string;
    shippingMode: string;
    paymentTerms: string;
    compliance: string;
  };
  faqs: { question: string; answer: string }[];
}

export default function RegionalPrivateLabelTemplate({ config }: { config: RegionalMarketConfig }) {
  return (
    <div className="regional-private-label-page">
      <main style={{ minHeight: '60vh' }}>

        {/* Hero Section */}
        <section className="pl-hero">
          <div className="container">
            <BreadcrumbJsonLd
              items={[
                { label: 'Home', href: '/' },
                { label: 'Private Label', href: '/private-label' },
                { label: config.marketName },
              ]}
              style={{ marginBottom: '20px' }}
            />

            <div className="pl-hero-grid">
              <div>
                <span className="pl-kicker">{config.badge}</span>
                <h1>{config.title}</h1>
                <p>{config.description}</p>
              </div>

              <div className="pl-summary">
                <strong>Factory Direct Sialkot to {config.countryName}</strong>
                <p>Full-package OEM activewear production with custom damask woven labels, frosted zip polybags and express international air &amp; sea cargo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Commercial Metrics Bar */}
        <section className="section" style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '36px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {config.metrics.map((m, i) => (
                <div key={i} style={{ background: '#f8fafc', padding: '18px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--brand-orange-dark, #c57608)', lineHeight: 1.1 }}>{m.val}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>{m.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Focus & Requirements */}
        <section className="section">
          <div className="container content">
            <div className="pl-split">
              <div>
                <span className="pl-label">Regional Compliance &amp; Sizing</span>
                <h2>{config.marketFocus.heading}</h2>
                <p className="muted" style={{ lineHeight: 1.7, fontSize: '15px' }}>
                  Sourcing apparel from Pakistan for {config.countryName} brands requires strict adherence to local sizing standards, textile compliance, fast DHL sampling and retail-ready packaging. Bin Rasool Enterprises provides complete end-to-end support from Sialkot.
                </p>
                <div style={{ marginTop: '24px' }}>
                  <Link href="/contact" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                    Request {config.countryName} Price Quote
                  </Link>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                {config.marketFocus.points.map((pt, idx) => (
                  <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>{pt.title}</h3>
                    <p className="muted" style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sourcing Specifications Matrix */}
        <section className="section" style={{ background: 'var(--bg-light)' }}>
          <div className="container content">
            <span className="pl-label">Commercial Specifications</span>
            <h2>Export terms &amp; production workflow for {config.countryName}</h2>
            
            <div className="pl-table-wrapper" style={{ marginTop: '24px' }}>
              <table className="pl-table">
                <thead>
                  <tr>
                    <th>Commercial Detail</th>
                    <th>Specification Standard</th>
                    <th>Buyer Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Minimum Order Quantity (MOQ)</strong></td>
                    <td>{config.commercials.moq}</td>
                    <td>Low risk inventory testing for new drops &amp; capsule collections.</td>
                  </tr>
                  <tr>
                    <td><strong>Proto Sample Lead Time</strong></td>
                    <td>{config.commercials.sampleLeadTime}</td>
                    <td>Fast fit and fabric sign-off before committing to bulk cutting.</td>
                  </tr>
                  <tr>
                    <td><strong>Bulk Production Turnaround</strong></td>
                    <td>{config.commercials.bulkLeadTime}</td>
                    <td>Reliable replenishment and on-time seasonal drops.</td>
                  </tr>
                  <tr>
                    <td><strong>Freight &amp; Delivery Terms</strong></td>
                    <td>{config.commercials.shippingMode}</td>
                    <td>Direct door delivery with customs clearance handled smoothly.</td>
                  </tr>
                  <tr>
                    <td><strong>Textile &amp; Safety Compliance</strong></td>
                    <td>{config.commercials.compliance}</td>
                    <td>Certified fabrics safe for retail, gym members and online sales.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Core Product Categories */}
        <section className="section">
          <div className="container content">
            <span className="pl-label">Manufactured in Sialkot</span>
            <h2>Specialized activewear categories for {config.countryName}</h2>

            <div className="pl-category-grid">
              <Link className="pl-category" href="/fitness-wear-manufacturer">
                <h3>Gym &amp; Activewear</h3>
                <p className="muted">Squat-proof compression leggings, seamless sports bras, tapered fleece joggers and dry-fit performance tops.</p>
                <span className="category-mfg-link"><span>Explore Fitness Wear</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/sportswear-manufacturer-exporter">
                <h3>Sportswear &amp; Teamwear</h3>
                <p className="muted">Sublimated club soccer jerseys, basketball kits, warm-up tracksuits and custom coach athletic jackets.</p>
                <span className="category-mfg-link"><span>Explore Sports Wear</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/boxing-gear-manufacturer-bulk">
                <h3>Boxing &amp; Combat Fightwear</h3>
                <p className="muted">Competition satin trunks, BJJ rash guards, MMA fight shorts, corner walkout robes and leather equipment.</p>
                <span className="category-mfg-link"><span>Explore Boxing Wear</span><ArrowRightIcon size={13} /></span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section">
          <div className="container">
            <div className="pl-cta">
              <div>
                <h2>Ready to manufacture for {config.countryName}?</h2>
                <p>Send your tech pack, reference photos, target quantities and branding requirements. We will provide a direct factory quotation within 24 hours.</p>
              </div>
              <Link href="/contact" className="btn btn-primary" style={{ whiteSpace: 'nowrap', padding: '14px 28px' }}>
                Contact Factory Team
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FaqSection
          title={`${config.countryName} Private Label Activewear FAQs`}
          subtitle={`Frequently asked questions by ${config.countryName} activewear brands, gym owners and distributors.`}
          items={config.faqs}
          categoryBadge={`${config.countryName} Sourcing`}
        />

        {/* Related Markets Navigation */}
        <section className="section" style={{ background: 'var(--bg-light)', padding: '40px 0' }}>
          <div className="container content">
            <span className="pl-label">Other Export Markets</span>
            <div className="pl-related-pills">
              <Link href="/private-label-activewear-manufacturer-usa" className="pl-related-pill">USA Brands</Link>
              <Link href="/private-label-activewear-manufacturer-uk" className="pl-related-pill">UK Fitness Brands</Link>
              <Link href="/private-label-activewear-manufacturer-europe" className="pl-related-pill">European Union</Link>
              <Link href="/private-label-activewear-manufacturer-germany" className="pl-related-pill">Germany Brands</Link>
              <Link href="/private-label-activewear-manufacturer-france" className="pl-related-pill">France Activewear</Link>
              <Link href="/private-label-activewear-manufacturer-netherlands" className="pl-related-pill">Netherlands Importers</Link>
              <Link href="/private-label-activewear-manufacturer-italy" className="pl-related-pill">Italy Boutiques</Link>
              <Link href="/private-label-activewear-manufacturer-spain" className="pl-related-pill">Spain Sports Labels</Link>
              <Link href="/activewear-manufacturer-for-startups" className="pl-related-pill">Startup Brand Entry</Link>
              <Link href="/private-label" className="pl-related-pill" style={{ borderColor: 'var(--brand-orange)' }}>All Private Label Programs</Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
