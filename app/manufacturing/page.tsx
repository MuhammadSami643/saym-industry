import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import FaqSection from '../components/FaqSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Manufacturing Capabilities & Process | Bin Rasool Enterprises Pakistan",
  description: "Explore Bin Rasool Enterprises's activewear manufacturing capabilities in Sialkot, Pakistan. Technical fabric sourcing, pattern making, cutting, stitching, printing, embroidery, QC and worldwide export.",
  alternates: {
    canonical: '/manufacturing',
  },
  openGraph: {
    title: "Apparel Factory Capabilities Sialkot | Bin Rasool Enterprises",
    description: "60,000+ pcs monthly apparel production, AQL 2.5 quality control, 4-needle flatlock stitching and custom private label packaging.",
    url: "/manufacturing",
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
    telephone: "+923376793383",
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
    answer: "We operate dedicated production lines for CAD grading, automated fabric cutting, 4-needle 6-thread flatlock stitching, multi-head Tajima embroidery, screen printing, heat transfers, and AQL 2.5 quality control."
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
    answer: "Every production batch undergoes raw fabric inspection (GSM & shrinkage testing), in-line seam tensile testing, 100% garment measurement audit against grading sheets, and needle-detector safety scanning."
  },
  {
    question: "What Incoterms and global freight options do you support?",
    answer: "We support FOB Karachi, CIF, and door-to-door DDP air freight via DHL/FedEx for urgent collections, as well as consolidated ocean container freight for bulk wholesale shipments."
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
                <div className="eyebrow"
                style={{ 'display': 'inline-flex', 'alignItems': 'center', 'padding': '4px 14px', 'borderRadius': '999px', 'background': 'rgba(243, 166, 38, 0.14)', 'color': 'var(--brand-orange-dark, #c57608)', 'border': '1px solid rgba(243, 166, 38, 0.3)', 'letterSpacing': '0.06em', 'fontSize': '11px', 'fontWeight': 800 }}>
                DIRECT FACTORY PRODUCTION &nbsp;&bull;&nbsp; SIALKOT, PAKISTAN</div>
                <h1>Manufacturing Capabilities for Private Label Sportswear, Fitness Wear & Boxing Wear</h1>
                <p>
                    Bin Rasool Enterprises supports buyers who need custom apparel manufacturing from Pakistan with clear product development, sampling, private label branding, quality control and export-ready packing. Our process is built for sportswear brands, fitness labels, boxing gyms, clubs, wholesalers and online sellers.
                </p>
            </div>
            <div className="manufacturing-proof">
                <strong>From sample to bulk production</strong>
                <span>Structured support for custom apparel collections, teamwear, activewear, gym wear and combat sports clothing.</span>
            </div>
        </div>
    </div>
</section>

<section className="section">
    <div className="container content">
        <div className="manufacturing-intro">
            <div>
                <span className="section-label">Manufacturing Approach</span>
                <h2>Built for buyers searching for a reliable apparel manufacturer in Pakistan</h2>
            </div>
            <div className="manufacturing-note">
                <p className="muted">
                    A strong manufacturing process gives buyers confidence before they place an order. At Bin Rasool Enterprises, we focus on the details that matter in private label sportswear production: fabric selection, pattern direction, sample approval, stitching quality, branding placement, sizing consistency, finishing, packing and export communication.
                </p>
                <p className="muted">
                    Whether you are sourcing gym wear, custom jerseys, tracksuits, boxing shorts, rash guards, team uniforms, activewear sets, or wholesale apparel, our process helps move your idea toward a production-ready collection.
                </p>
            </div>
        </div>
    </div>
</section>

<section className="section" style={{ 'background': 'var(--bg-light)' }}>
    <div className="container content">
        <span className="section-label">Step-by-Step Workflow</span>
        <h2>Private label apparel manufacturing process</h2>
        <p className="muted" style={{ 'maxWidth': '850px' }}>
            The workflow below shows how Bin Rasool Enterprises handles custom sportswear, fitness wear, boxing wear and teamwear manufacturing from first discussion to packed goods. This structure helps buyers understand what happens before bulk production starts and how quality is controlled during the order.
        </p>

        <div className="process-list">
                            <article className="process-card">
                                            <img src="/images/site/1776612585_manufacturing-designing-image.webp" alt="Requirement Review & Design Direction for sportswear manufacturing" />
                                        <div className="process-card-body">
                        <span className="process-number">01</span>
                        <h3>Requirement Review & Design Direction</h3>
                        <p className="muted">We review your reference samples, tech pack, target price, fabric direction, size range, branding needs and order quantity before recommending the right manufacturing path.</p>
                    </div>
                </article>
                            <article className="process-card">
                                            <img src="/images/site/1776612585_manufacturing-cutting-image.webp" alt="Pattern, Fabric & Cutting Preparation for sportswear manufacturing" />
                                        <div className="process-card-body">
                        <span className="process-number">02</span>
                        <h3>Pattern, Fabric & Cutting Preparation</h3>
                        <p className="muted">Patterns, measurements, fabric behavior, panels, trims and cutting plans are prepared to support consistent sizing and production repeatability.</p>
                    </div>
                </article>
                            <article className="process-card">
                                            <img src="/images/site/1776612585_manufacturing-stitching-image.webp" alt="Stitching & Garment Construction for sportswear manufacturing" />
                                        <div className="process-card-body">
                        <span className="process-number">03</span>
                        <h3>Stitching & Garment Construction</h3>
                        <p className="muted">Garments move through stitching with attention to seam strength, fit, stretch points, finishing details and category-specific construction requirements.</p>
                    </div>
                </article>
                            <article className="process-card">
                                            <img src="/images/site/1776612585_manufacturing-checking-image.webp" alt="Inline Checking & Quality Review for sportswear manufacturing" />
                                        <div className="process-card-body">
                        <span className="process-number">04</span>
                        <h3>Inline Checking & Quality Review</h3>
                        <p className="muted">Production pieces are checked for stitching, measurements, labels, print placement, embroidery, trims, sizing and overall export presentation.</p>
                    </div>
                </article>
                            <article className="process-card">
                                            <img src="/images/site/1776612585_manufacturing-packing-image.webp" alt="Finishing, Packing & Export Readiness for sportswear manufacturing" />
                                        <div className="process-card-body">
                        <span className="process-number">05</span>
                        <h3>Finishing, Packing & Export Readiness</h3>
                        <p className="muted">Products are cleaned, folded, tagged, packed, carton-marked and prepared for dispatch with a buyer-focused presentation.</p>
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
            Buyers searching for a sportswear manufacturer in Sialkot often need more than stitching. They need a supplier who can discuss fabrics, branding, samples, sizing, packaging and repeat orders with a B2B mindset.
        </p>

        <div className="capability-grid">
                            <article className="capability-card">
                    <h3>Private Label Manufacturing</h3>
                    <p className="muted">Custom neck labels, woven labels, hang tags, packaging, brand placement, logo application and product presentation for startup and established brands.</p>
                </article>
                            <article className="capability-card">
                    <h3>Fabric & Material Options</h3>
                    <p className="muted">Fleece, interlock, mesh, dry-fit, polyester blends, cotton blends, spandex blends, satin, compression fabrics and category-specific performance materials.</p>
                </article>
                            <article className="capability-card">
                    <h3>Customization Methods</h3>
                    <p className="muted">Embroidery, screen printing, heat transfer, sublimation, custom panels, contrast stitching, team names, player numbers and club branding.</p>
                </article>
                            <article className="capability-card">
                    <h3>Flexible MOQ Support</h3>
                    <p className="muted">MOQ options for startup brands, gyms, boxing clubs, online sellers, wholesalers and buyers testing a new private label collection.</p>
                </article>
                            <article className="capability-card">
                    <h3>B2B Communication</h3>
                    <p className="muted">Clear discussion around samples, production timing, branding needs, packing requirements and export order expectations.</p>
                </article>
                            <article className="capability-card">
                    <h3>Category-Focused Production</h3>
                    <p className="muted">Manufacturing support for fitness wear, sportswear, boxing wear, activewear, team uniforms, rash guards, fight wear and gym apparel.</p>
                </article>
                    </div>
    </div>
</section>

<section className="section" style={{ 'background': 'var(--bg-light)' }}>
    <div className="container content">
        <span className="section-label">Categories We Manufacture</span>
        <h2>Focused manufacturing for fitness, sports and boxing apparel</h2>
        <p className="muted" style={{ 'maxWidth': '850px' }}>
            Bin Rasool Enterprises keeps its manufacturing direction focused so international buyers can quickly understand what we make and where we can add value.
        </p>

        <div className="category-manufacturing">
            <a href="/fitness-wear-manufacturer">
                <h3>Fitness Wear Manufacturing</h3>
                <p className="muted">Joggers, hoodies, leggings, activewear sets, compression wear, dry-fit gym t-shirts and private label gym clothing.</p>
                <span className="card-action">View Fitness Wear</span>
            </a>
            <a href="/sportswear-manufacturer-exporter">
                <h3>Sportswear Manufacturing</h3>
                <p className="muted">Soccer jerseys, basketball uniforms, tracksuits, training wear, team uniforms and sublimation sports apparel.</p>
                <span className="card-action">View Sports Wear</span>
            </a>
            <a href="/boxing-gear-manufacturer-bulk">
                <h3>Boxing Wear Manufacturing</h3>
                <p className="muted">Boxing shorts, training shirts, rash guards, fight wear, gym tops and custom combat sports clothing.</p>
                <span className="card-action">View Boxing Wear</span>
            </a>
        </div>
    </div>
</section>

<section className="section">
    <div className="container content">
        <div className="manufacturing-intro">
            <div>
                <span className="section-label">Quality & Export Readiness</span>
                <h2>Made for brands that need consistency, communication and presentation</h2>
            </div>
            <div>
                <ul className="list muted">
                    <li><strong>AQL 2.5 Quality Standards:</strong> Independent inline and pre-shipment lot sampling inspecting seam elasticity, stitch balance, and measurement grading tolerances (±0.5 cm).</li>
                    <li><strong>Fabric & Wash Integrity:</strong> Raw fabric batch lab testing for dimensional stability (under 3% shrinkage guarantee), colorfastness to washing and perspiration (Grade 4+), and GSM verification.</li>
                    <li><strong>Full Private Label Trims:</strong> Custom woven damask neck labels, soft satin wash care tags with RN numbers, embossed hangtags, and custom printed frosted polybags.</li>
                    <li><strong>Export-Ready Cartoning:</strong> Double-wall corrugated export master cartons, individual silica gel packs, clear SKU/size barcode stickers, and moisture-sealed strapping.</li>
                    <li><strong>Incoterms & Global Logistics:</strong> Complete export handling for FOB Karachi sea freight, CIF Felixstowe/Hamburg/LA/Sydney, and door-to-door express air via DHL/FedEx (4-5 days delivery).</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section className="section">
    <div className="container">
        <div className="manufacturing-cta">
            <div>
                <h2>Need a private label sportswear manufacturer with a clear production process?</h2>
                <p>Send your product details, reference images, quantity, fabric direction and branding requirements. We will help you plan the right sampling and manufacturing path.</p>
            </div>
            <a href="/contact" className="btn btn-primary">Start Inquiry</a>
        </div>
    </div>
</section>

    {/* Interactive B2B FAQ with Rich Schema */}
    <FaqSection
      title="Manufacturing Capabilities & Quality FAQs"
      subtitle="Commercial specifications, lead times, production minimums, and export logistics for apparel buyers."
      items={MANUFACTURING_FAQS}
      categoryBadge="Sialkot Factory Floor"
    />

    </main>
    </div>
  );
}
