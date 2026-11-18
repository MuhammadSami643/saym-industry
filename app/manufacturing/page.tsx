import Link from 'next/link';
import FactoryVirtualTour from '../components/FactoryVirtualTour';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
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
                style={{ 'display': 'inline-flex', 'alignItems': 'center', 'padding': '3px 12px', 'borderRadius': '10px', 'background': '#e7efff', 'color': '#12326b', 'border': '1px solid #c8d8ff', 'letterSpacing': '0.04em', 'fontSize': '12px' }}>
                PRIVATE LABEL MANUFACTURER &nbsp;&nbsp;• &nbsp;SIALKOT</div>
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

{/* Interactive Live Factory Floor Virtual Tour */}
<FactoryVirtualTour />

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
                    <li>Measurement and fit checks against approved sample direction.</li>
                    <li>Stitching, trims, labels, printing, embroidery and finishing review during production.</li>
                    <li>Support for buyer branding including labels, hang tags, poly bags, carton marks and packaging details.</li>
                    <li>Clear communication for wholesalers, startup brands, gyms, clubs and international apparel buyers.</li>
                    <li>Export-ready presentation for sportswear, fitness wear, boxing wear, activewear and teamwear orders.</li>
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

    <section className="faq-section-shared " style={{ 'background': '#fff', 'padding': '56px 0', 'borderTop': '1px solid #eee' }}>
        <div className="container" style={{ 'maxWidth': '900px' }}>
            <h2 style={{ 'textAlign': 'left', 'marginBottom': '26px' }}>Manufacturing FAQs</h2>
            <div>
                                                        <div className="faq-item ">
                        <button type="button" className="faq-question" aria-expanded="false">
                            <span>What manufacturing services does Bin Rasool Enterprises provide?</span>
                            <span className="faq-icon" aria-hidden="true">+</span>
                        </button>
                        <div className="faq-answer">
                            <p className="muted">Bin Rasool Enterprises supports product development, sampling, cutting, stitching, logo application, finishing, packing and export-ready production for private label apparel.</p>
                        </div>
                    </div>
                                                        <div className="faq-item ">
                        <button type="button" className="faq-question" aria-expanded="false">
                            <span>Can Bin Rasool Enterprises handle sportswear, fitness wear and boxing wear production?</span>
                            <span className="faq-icon" aria-hidden="true">+</span>
                        </button>
                        <div className="faq-answer">
                            <p className="muted">Yes. Our manufacturing direction is focused on sportswear, fitness wear, boxing wear, teamwear, activewear and related private label product categories.</p>
                        </div>
                    </div>
                                                        <div className="faq-item ">
                        <button type="button" className="faq-question" aria-expanded="false">
                            <span>Do you help buyers before bulk production starts?</span>
                            <span className="faq-icon" aria-hidden="true">+</span>
                        </button>
                        <div className="faq-answer">
                            <p className="muted">Yes. We help review product requirements, fabric direction, branding needs, sample expectations and the right production path before bulk manufacturing begins.</p>
                        </div>
                    </div>
                                                        <div className="faq-item ">
                        <button type="button" className="faq-question" aria-expanded="false">
                            <span>How does Bin Rasool Enterprises support quality during production?</span>
                            <span className="faq-icon" aria-hidden="true">+</span>
                        </button>
                        <div className="faq-answer">
                            <p className="muted">The process includes attention to measurements, stitching, trims, branding application, finishing, packing and buyer communication throughout production.</p>
                        </div>
                    </div>
                                                        <div className="faq-item ">
                        <button type="button" className="faq-question" aria-expanded="false">
                            <span>Can manufacturing orders be prepared for export?</span>
                            <span className="faq-icon" aria-hidden="true">+</span>
                        </button>
                        <div className="faq-answer">
                            <p className="muted">Yes. Bin Rasool Enterprises is structured for export-focused production with practical buyer communication and order presentation for international markets.</p>
                        </div>
                    </div>
                            </div>
        </div>
    </section>

    </main>
    </div>
  );
}
