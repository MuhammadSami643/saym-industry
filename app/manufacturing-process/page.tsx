import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import FaqSection from '../components/FaqSection';
import { ArrowRightIcon } from '../components/AdminIcons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Manufacturing Capabilities & Process | Bin Rasool Enterprises Pakistan",
    description: "Explore Bin Rasool Enterprises's activewear manufacturing capabilities in Sialkot, Pakistan. Technical fabric sourcing, pattern making, cutting, stitching, printing, embroidery, QC and worldwide export.",
    alternates: {
        canonical: '/manufacturing-process',
    },
    openGraph: {
        title: "Apparel Factory Capabilities Sialkot | Bin Rasool Enterprises",
        description: "60,000+ pcs monthly apparel production, AQL 2.5 quality control, 4-needle flatlock stitching and custom private label packaging.",
        url: "/manufacturing-process",
        images: [{ url: "/images/site/1776603661_home-hero-slider-image-1.webp", width: 1200, height: 630 }],
    },
};

const manufacturingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom Apparel & Activewear OEM/ODM Manufacturing",
    provider: {
        "@type": "ManufacturingBusiness",
        name: "Bin Rasool Enterprises",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Sialkot",
            addressRegion: "Punjab",
            addressCountry: "PK",
        },
        telephone: "+923133599241",
    },
    areaServed: ["United States", "United Kingdom", "Canada", "Australia", "European Union"],
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Factory Apparel Manufacturing Capabilities",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Pattern Drafting & Pre-Production Sampling",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Cut & Sew Activewear Assembly (Flatlock / Overlock)",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Screen Printing, 3D Puff Print & Sublimation",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Multi-Head Computerized Embroidery",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "AQL 2.5 Quality Inspection & Export Packing",
                },
            },
        ],
    },
};

const MANUFACTURING_FAQS = [
    {
        question: "What manufacturing capabilities does Bin Rasool Enterprises operate in-house?",
        answer: "We operate dedicated production lines for CAD grading, automated fabric cutting, 4-needle 6-thread flatlock stitching, multi-head Tajima embroidery, screen printing, heat transfers and AQL 2.5 quality control."
    },
    {
        question: "What is your sample lead time before authorizing bulk production?",
        answer: "Proto samples are completed within 7 to 10 business days upon receiving your tech pack or reference sample. We ship samples globally via DHL Express (4-5 days delivery)."
    },
    {
        question: "What are your minimum order quantities (MOQs) for custom manufacturing?",
        answer: "Our standard MOQ starts from 50 pieces per style/colorway across standard size ranges (XS–3XL). For custom-knitted or mill-dyed fabrics, MOQs align with fabric batch requirements."
    },
    {
        question: "How do you ensure export quality control (AQL 2.5)?",
        answer: "Every production batch undergoes raw fabric inspection (GSM & shrinkage testing), in-line seam tensile testing, 100% garment measurement audit against grading sheets and needle-detector safety scanning."
    },
    {
        question: "What Incoterms and global freight options do you support?",
        answer: "We support FOB Karachi, CIF and door-to-door DDP air freight via DHL/FedEx for urgent collections, as well as consolidated ocean container freight for bulk wholesale shipments."
    }
];

export default function ManufacturingPage() {
    return (
        <div className="manufacturing-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturingSchema) }}
            />
            <main style={{ 'minHeight': '60vh' }}>



                <section className="manufacturing-hero">
                    <div className="container">
                        <BreadcrumbJsonLd
                            items={[
                                { label: 'Home', href: '/' },
                                { label: 'Manufacturing Capabilities' },
                            ]}
                        />

                        <div className="manufacturing-hero-grid">
                            <div>
                                <span className="page-kicker">Direct Factory Production &bull; Sialkot, Pakistan</span>
                                <h1>Precision Apparel Manufacturing &amp; Private Label Export</h1>
                                <p>
                                    Bin Rasool Enterprises delivers end-to-end custom apparel manufacturing for sports brands, activewear startups, fitness labels and combat sports distributors across the USA, UK, Europe and Australia.
                                </p>
                            </div>
                            <div className="manufacturing-proof-box">
                                <h3>Industrial Sourcing Metrics</h3>
                                <div className="mfg-hero-metrics">
                                    <div className="mfg-metric-pill">
                                        <div className="mfg-metric-val">60K+ Pcs</div>
                                        <div className="mfg-metric-lbl">Monthly Apparel Capacity</div>
                                    </div>
                                    <div className="mfg-metric-pill">
                                        <div className="mfg-metric-val">AQL 2.5</div>
                                        <div className="mfg-metric-lbl">Strict Pre-Shipment Audit</div>
                                    </div>
                                    <div className="mfg-metric-pill">
                                        <div className="mfg-metric-val">7-10 Days</div>
                                        <div className="mfg-metric-lbl">Proto Sample Lead Time</div>
                                    </div>
                                    <div className="mfg-metric-pill">
                                        <div className="mfg-metric-val">DDP / FOB</div>
                                        <div className="mfg-metric-lbl">Express Air &amp; Sea Cargo</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container content">
                        <div className="manufacturing-intro">
                            <div>
                                <span className="section-label">Manufacturing Approach</span>
                                <h2>Built for international buyers searching for a dependable factory partner in Pakistan</h2>
                            </div>
                            <div className="manufacturing-note">
                                <p className="muted" style={{ margin: '0 0 14px' }}>
                                    A reliable manufacturing process gives brand owners total confidence before bulk cutting begins. At Bin Rasool Enterprises, we control every critical phase in-house: digital pattern grading, fabric relaxation, seam tension testing, Pantone-matched branding and strict pre-shipment measurement audits.
                                </p>
                                <p className="muted" style={{ margin: 0 }}>
                                    Whether you are sourcing seamless gym sets, custom team tracksuits, boxing shorts, sublimated rash guards or luxury heavyweight hoodies, our technical workflow ensures consistent sizing and export-grade repeatability.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" style={{ 'background': 'var(--bg-light)' }}>
                    <div className="container content">
                        <span className="section-label">Step-by-Step Production Pipeline</span>
                        <h2>Private label apparel manufacturing process</h2>
                        <p className="muted" style={{ 'maxWidth': '850px' }}>
                            The workflow below shows how Bin Rasool Enterprises manages orders from first tech pack review to final packaged export cartons. This structured pipeline guarantees transparency and quality verification at every milestone.
                        </p>

                        <div className="mfg-workflow-grid">
                            <article className="mfg-workflow-card">
                                <div className="mfg-workflow-media">
                                    <img src="/images/site/1776612585_manufacturing-designing-image.webp" alt="Requirement Review & Design Direction for sportswear manufacturing" />
                                </div>
                                <div className="mfg-workflow-body">
                                    <div className="mfg-flow-step-bar">
                                        <span className="mfg-flow-phase">Phase 01</span>
                                        <div className="mfg-flow-line-connector">
                                            <span className="mfg-flow-line"></span>
                                            <ArrowRightIcon size={14} className="mfg-flow-chevron" />
                                        </div>
                                    </div>
                                    <h3>Requirement Review &amp; Design Direction</h3>
                                    <p className="muted">We review your reference samples, tech packs, target price points, fabric blends, size grading and custom branding needs before recommending the optimal production path.</p>
                                </div>
                            </article>

                            <article className="mfg-workflow-card">
                                <div className="mfg-workflow-media">
                                    <img src="/images/site/1776612585_manufacturing-cutting-image.webp" alt="Pattern, Fabric & Cutting Preparation for sportswear manufacturing" />
                                </div>
                                <div className="mfg-workflow-body">
                                    <div className="mfg-flow-step-bar">
                                        <span className="mfg-flow-phase">Phase 02</span>
                                        <div className="mfg-flow-line-connector">
                                            <span className="mfg-flow-line"></span>
                                            <ArrowRightIcon size={14} className="mfg-flow-chevron" />
                                        </div>
                                    </div>
                                    <h3>Pattern, Fabric &amp; Cutting Preparation</h3>
                                    <p className="muted">Digital CAD pattern plotting, fabric tension relaxation, GSM verification and laser knife spreading are prepared to ensure exact sizing repeatability across all sizes.</p>
                                </div>
                            </article>

                            <article className="mfg-workflow-card">
                                <div className="mfg-workflow-media">
                                    <img src="/images/site/1776612585_manufacturing-stitching-image.webp" alt="Stitching & Garment Construction for sportswear manufacturing" />
                                </div>
                                <div className="mfg-workflow-body">
                                    <div className="mfg-flow-step-bar">
                                        <span className="mfg-flow-phase">Phase 03</span>
                                        <div className="mfg-flow-line-connector">
                                            <span className="mfg-flow-line"></span>
                                            <ArrowRightIcon size={14} className="mfg-flow-chevron" />
                                        </div>
                                    </div>
                                    <h3>Stitching &amp; Garment Construction</h3>
                                    <p className="muted">Garments move through dedicated stitching cells utilizing 4-needle 6-thread flatlock, high-torque overlock and twin-needle coverstitch calibrated for heavy fleece and stretch performance textiles.</p>
                                </div>
                            </article>

                            <article className="mfg-workflow-card">
                                <div className="mfg-workflow-media">
                                    <img src="/images/site/1776612585_manufacturing-checking-image.webp" alt="Inline Checking & Quality Review for sportswear manufacturing" />
                                </div>
                                <div className="mfg-workflow-body">
                                    <div className="mfg-flow-step-bar">
                                        <span className="mfg-flow-phase">Phase 04</span>
                                        <div className="mfg-flow-line-connector">
                                            <span className="mfg-flow-line"></span>
                                            <ArrowRightIcon size={14} className="mfg-flow-chevron" />
                                        </div>
                                    </div>
                                    <h3>Inline Checking &amp; Quality Review</h3>
                                    <p className="muted">Every batch is audited under AQL 2.5 standards for seam burst strength, grading tolerance adherence (±0.5 cm), thread trimming, print fastness and 100% metal detector safety scanning.</p>
                                </div>
                            </article>

                            <article className="mfg-workflow-card">
                                <div className="mfg-workflow-media">
                                    <img src="/images/site/1776612585_manufacturing-packing-image.webp" alt="Finishing, Packing & Export Readiness for sportswear manufacturing" />
                                </div>
                                <div className="mfg-workflow-body">
                                    <div className="mfg-flow-step-bar">
                                        <span className="mfg-flow-phase">Phase 05</span>
                                        <span className="mfg-flow-done-tag">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            Export Ready
                                        </span>
                                    </div>
                                    <h3>Finishing, Packing &amp; Export Readiness</h3>
                                    <p className="muted">Garments are steam ironed, tagged with woven labels and barcode hangtags, packed in branded frosted polybags and palletized in double-wall master cartons for worldwide dispatch.</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container content">
                        <span className="section-label">Production Capabilities</span>
                        <h2>What Bin Rasool Enterprises can support for your apparel brand</h2>
                        <p className="muted" style={{ 'maxWidth': '850px' }}>
                            International buyers need more than basic sewing lines. They require an authentic manufacturer with comprehensive supply chain knowledge, premium fabric access and direct export execution.
                        </p>

                        <div className="capability-grid">
                            <article className="capability-card">
                                <div className="capability-card-icon" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                    </svg>
                                </div>
                                <h3>Private Label Packaging</h3>
                                <p>Custom woven damask neck labels, soft satin care labels, debossed hangtags, branded frosted zipper polybags and retail-ready barcode stickers.</p>
                            </article>
                            <article className="capability-card">
                                <div className="capability-card-icon" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
                                </div>
                                <h3>Technical Fabrics &amp; Materials</h3>
                                <p>High-stretch nylon-spandex, squat-proof interlock, heavyweight French terry, loopback fleece, anti-microbial mesh and quick-dry dry-fit polyester.</p>
                            </article>
                            <article className="capability-card">
                                <div className="capability-card-icon" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 12h8"></path>
                                        <path d="M12 8v8"></path>
                                    </svg>
                                </div>
                                <h3>Advanced Custom Branding</h3>
                                <p>High-density 3D puff screen printing, matte silicone heat transfers, multi-head Tajima embroidery, discharge printing and full-coverage dye sublimation.</p>
                            </article>
                            <article className="capability-card">
                                <div className="capability-card-icon" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                    </svg>
                                </div>
                                <h3>Low &amp; Flexible MOQs</h3>
                                <p>Accessible minimum order quantities starting from 50 pieces per colorway, designed to help emerging fitness labels and gyms launch without inventory bloat.</p>
                            </article>
                            <article className="capability-card">
                                <div className="capability-card-icon" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </div>
                                <h3>Direct B2B Communication</h3>
                                <p>Dedicated merchandising manager providing real-time production video updates, tech pack feedback, digital size grading charts and sample approvals.</p>
                            </article>
                            <article className="capability-card">
                                <div className="capability-card-icon" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="14" width="7" height="7"></rect>
                                        <rect x="3" y="14" width="7" height="7"></rect>
                                    </svg>
                                </div>
                                <h3>Specialized Category Pods</h3>
                                <p>Independent production cells configured specifically for activewear &amp; leggings, teamwear uniforms, heavy streetwear hoodies and combat sports fightwear.</p>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="section" style={{ 'background': 'var(--bg-light)' }}>
                    <div className="container content">
                        <span className="section-label">Categories We Manufacture</span>
                        <h2>Specialized manufacturing for fitness, teamwear &amp; combat sports</h2>
                        <p className="muted" style={{ 'maxWidth': '850px' }}>
                            Explore our dedicated production lines tailored to international apparel specifications:
                        </p>

                        <div className="category-manufacturing-grid">
                            <Link href="/fitness-wear-manufacturer" className="category-mfg-card">
                                <img src="/images/categories/1776540259_fitness-wear.webp" alt="Fitness Wear Manufacturing Sialkot" className="category-mfg-img" />
                                <div className="category-mfg-body">
                                    <h3>Fitness &amp; Activewear</h3>
                                    <p>Squat-proof leggings, seamless sports bras, compression tights, athletic shorts and dry-fit performance workout tees.</p>
                                    <span className="category-mfg-link"><span>Explore Fitness Manufacturing</span><ArrowRightIcon size={13} /></span>
                                </div>
                            </Link>
                            <Link href="/sportswear-manufacturer-exporter" className="category-mfg-card">
                                <img src="/images/categories/1776540279_sports-wear.webp" alt="Sportswear Manufacturing Pakistan" className="category-mfg-img" />
                                <div className="category-mfg-body">
                                    <h3>Sportswear &amp; Teamwear</h3>
                                    <p>Sublimated soccer jerseys, basketball uniforms, warm-up tracksuits, athletic jackets and custom club training kits.</p>
                                    <span className="category-mfg-link"><span>Explore Sports Manufacturing</span><ArrowRightIcon size={13} /></span>
                                </div>
                            </Link>
                            <Link href="/boxing-gear-manufacturer-bulk" className="category-mfg-card">
                                <img src="/images/categories/1776540301_boxing-wear.webp" alt="Boxing Wear Manufacturing Sialkot" className="category-mfg-img" />
                                <div className="category-mfg-body">
                                    <h3>Boxing &amp; Combat Fightwear</h3>
                                    <p>Heavy satin boxing trunks, BJJ rash guards, MMA fight shorts, corner walkout robes and combat training accessories.</p>
                                    <span className="category-mfg-link"><span>Explore Boxing Manufacturing</span><ArrowRightIcon size={13} /></span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container content">
                        <span className="section-label">Quality &amp; Export Compliance</span>
                        <h2>Industrial standards that protect your brand reputation</h2>
                        <p className="muted" style={{ 'maxWidth': '850px' }}>
                            Every shipment dispatched from our Sialkot facility adheres to internationally recognized quality assurance benchmarks:
                        </p>

                        <div className="qa-bento-grid">
                            <div className="qa-bento-card highlight">
                                <span className="qa-bento-badge">Core Benchmark</span>
                                <h3>AQL 2.5 Strict Inspection Standard</h3>
                                <p>Every production run is audited by certified quality controllers during inline stitching and final packing. Measurements are checked against tech pack grading tables with zero tolerance for seam slippage or stitching run-offs.</p>
                            </div>
                            <div className="qa-bento-card">
                                <span className="qa-bento-badge">Textile Lab</span>
                                <h3>&lt; 3% Shrinkage Guarantee</h3>
                                <p>Raw fabrics are pre-tested for colorfastness to light and perspiration (Grade 4+), wash durability and dimensional stability before cutting.</p>
                            </div>
                            <div className="qa-bento-card">
                                <span className="qa-bento-badge">Safety Audit</span>
                                <h3>100% Needle Detector Scanned</h3>
                                <p>All finished apparel passes through calibrated 9-point electromagnetic needle detection tunnels to ensure total safety for export consignments.</p>
                            </div>
                            <div className="qa-bento-card">
                                <span className="qa-bento-badge">Master Cartons</span>
                                <h3>Export-Grade Corrugated Packing</h3>
                                <p>Reinforced 7-ply double-wall export master cartons with moisture-proof poly-lining, individual silica gel packets and clear SKU barcodes.</p>
                            </div>
                            <div className="qa-bento-card">
                                <span className="qa-bento-badge">Logistics</span>
                                <h3>DDP, FOB &amp; CIF Shipping</h3>
                                <p>Express courier air freight via DHL/FedEx (4-5 days door-to-door delivery) and ocean container shipping via Karachi port with full customs paperwork.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="home-cta">
                            <div>
                                <span className="home-kicker">Start Your Inquiry</span>
                                <h2>Ready to start your custom apparel order?</h2>
                                <p>Send your tech pack, sample reference or branding requirements. We will provide pricing, MOQ guidance and sample timelines.</p>
                            </div>
                            <div className="home-cta-actions">
                                <Link href="/contact-us" className="btn btn-primary">
                                    Start Inquiry
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive B2B FAQ with Rich Schema */}
                <FaqSection
                    title="Manufacturing Capabilities & Quality FAQs"
                    subtitle="Commercial specifications, lead times, production minimums and export logistics for apparel buyers."
                    items={MANUFACTURING_FAQS}
                    categoryBadge="Sialkot Factory Floor"
                />

            </main>
        </div>
    );
}
