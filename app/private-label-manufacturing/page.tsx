import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import FaqSection from '../components/FaqSection';
import { ArrowRightIcon } from '../components/AdminIcons';

const PRIVATE_LABEL_FAQS = [
  {
    question: "What custom branding and trim options do you provide for private label clients?",
    answer: "We supply 50D high-density damask woven neck labels, tagless silicone heat transfers, satin wash care labels with legal compliance info, 400 GSM coated hangtags with embossed foil or matte finish and custom frosted EVA zipper polybags with barcode stickers."
  },
  {
    question: "What is your sample turnaround time for new private label collections?",
    answer: "Initial prototypes are completed in 7 to 10 business days upon receiving your tech pack or reference garment. Samples are dispatched worldwide via DHL Express with tracking provided within 24 hours."
  },
  {
    question: "Can you manufacture apparel from our custom tech pack or reference sample?",
    answer: "Yes. Our CAD pattern masters work directly from PDF/AI tech packs or physical benchmark samples, developing digital grading charts tailored to US, UK or EU anthropometric sizing specs."
  },
  {
    question: "What are your Minimum Order Quantities (MOQs) for custom private label orders?",
    answer: "We support emerging labels and established brands with an accessible MOQ starting from 50 pieces per style/colorway across standard size ranges (XS–3XL). For custom mill-dyed fabrics, MOQs align with fabric batch dyeing limits."
  },
  {
    question: "How do you protect my tech packs, designs and brand intellectual property?",
    answer: "We sign formal Non-Disclosure Agreements (NDAs) with all clients. Your proprietary tech packs, grading blocks, artwork and branding assets remain your exclusive property and are never shared or resold."
  }
];

export const metadata: Metadata = {
  title: "Private Label Clothing Manufacturer Pakistan | Custom Woven Labels, Hangtags & Packaging",
  description: "Direct OEM private label clothing manufacturer in Sialkot, Pakistan. Custom woven neck labels, 400 gsm coated hang tags, frosted zipper polybags, silicone heat transfer logos, 3D puff embroidery, chenille patches and Amazon FBA barcode packaging for startups and retail brands.",
  keywords: [
    "private label clothing manufacturer Pakistan",
    "custom clothing manufacturer",
    "woven labels manufacturer",
    "hang tags manufacturer",
    "custom polybags",
    "screen printing embroidery manufacturer",
    "apparel packaging supplier",
    "low MOQ private label clothing"
  ],
  alternates: {
    canonical: '/private-label-manufacturing',
  },
  openGraph: {
    title: "Complete Private Label Clothing & Packaging Factory | Bin Rasool Enterprises",
    description: "Turnkey apparel manufacturing: high density damask woven labels, 400 gsm hangtags, frosted zip polybags, 3D puff embroidery and FBA retail packaging.",
    url: "/private-label-manufacturing",
    images: [{ url: "/images/hero-factory.webp", width: 1200, height: 630 }],
  },
};

export default function PrivateLabelPage() {
  return (
    <div className="private-label-page">
      {/* Section 1: Hero */}
      <section className="pl-hero">
          <div className="container">
            <BreadcrumbJsonLd
              items={[
                { label: 'Home', href: '/' },
                { label: 'Private Label Manufacturing' },
              ]}
              style={{ marginBottom: '20px' }}
            />

            <div className="pl-hero-grid">
              <div>
                <span className="pl-kicker">Full-Package OEM / ODM &bull; Sialkot, Pakistan</span>
                <h1>Private Label Sportswear &amp; Activewear Manufacturer</h1>
                <p>
                  Bin Rasool Enterprises helps brands, gyms, clubs, wholesalers, fight brands and online sellers create custom apparel under their own label. From Sialkot, Pakistan, we support private label sportswear manufacturing with product development, custom branding, sampling, flexible MOQ options and export-ready production.
                </p>
              </div>
              <div className="pl-summary">
                <strong>Your brand. Your labels. Your collection.</strong>
                <p>Build gym wear, teamwear, activewear, boxing wear and combat sports clothing with custom branding and manufacturer support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: What Private Label Means (Split Layout with Orange Border Note) */}
        <section className="section">
          <div className="container content">
            <div className="pl-split">
              <div>
                <span className="pl-label">What Private Label Means</span>
                <h2>Custom apparel manufacturing under your own brand name</h2>
              </div>
              <div className="pl-note">
                <p className="muted" style={{ margin: '0 0 14px' }}>
                  Private label manufacturing allows you to sell custom sportswear, fitness wear, boxing wear and activewear under your own brand identity while working with a manufacturer that handles sampling, construction, branding and production. Bin Rasool Enterprises supports buyers who want to launch new apparel collections or grow an existing product line with factory-direct manufacturing from Pakistan.
                </p>
                <p className="muted" style={{ margin: 0 }}>
                  We help with the details that make a product feel like your brand: labels, hang tags, packaging, logo placement, print or embroidery method, fabric selection, fit direction, color combinations and finishing standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Branding & Customization Options (6-Card Clean Grid) */}
        <section className="section" style={{ background: 'var(--bg-light)' }}>
          <div className="container content">
            <span className="pl-label">Branding &amp; Customization</span>
            <h2>Private label options for brand-ready apparel</h2>
            <p className="muted" style={{ maxWidth: '850px' }}>
              A strong private label product needs more than a logo. It needs the right fabric, fit, trims, labels, packaging and consistent product presentation across the full collection.
            </p>

            <div className="pl-options-grid">
              <article className="pl-option">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/catalog/factory-production/private-label-packaging-tags.webp" alt="Neck Labels & Woven Labels" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Neck Labels &amp; Woven Labels</h3>
                <p className="muted">Custom neck labels, size labels, care labels, woven labels and brand identity details for retail-ready apparel.</p>
              </article>
              <article className="pl-option">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/original-generated/private-label-trims-packaging.webp" alt="Hang Tags & Packaging" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Hang Tags &amp; Packaging</h3>
                <p className="muted">Hang tags, poly bags, carton marks, product packaging direction and presentation support for your private label line.</p>
              </article>
              <article className="pl-option">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/site/1776612585_manufacturing-designing-image.webp" alt="Logo Application" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Logo Application</h3>
                <p className="muted">Embroidery, screen printing, heat transfer, sublimation, puff printing and placement planning for each product category.</p>
              </article>
              <article className="pl-option">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/materials/activewear-compression-mesh-weave.webp" alt="Custom Fabric Direction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Custom Fabric Direction</h3>
                <p className="muted">Fabric selection support for fleece, dry-fit, interlock, mesh, spandex blends, satin, compression fabrics and sportswear materials.</p>
              </article>
              <article className="pl-option">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/site/1776612585_manufacturing-cutting-image.webp" alt="Sample Development" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Sample Development</h3>
                <p className="muted">Sample-first production to confirm fabric, fit, sizing, construction, branding, color, trims and finishing before bulk orders.</p>
              </article>
              <article className="pl-option">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/catalog/factory-production/industrial-garment-stitching.webp" alt="Bulk Production Support" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Bulk Production Support</h3>
                <p className="muted">Production planning for startup brands, wholesalers, gyms, clubs, fight brands and online sellers scaling their collections.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Section 4: Production Process (Numbered Step List with 01..04 Badges) */}
        <section className="section">
          <div className="container content">
            <div className="pl-split">
              <div>
                <span className="pl-label">How It Works</span>
                <h2>Private label production process from idea to bulk order</h2>
                <p className="muted">
                  Our process is built to help buyers reduce confusion before production starts. The goal is to confirm the product direction, branding details, sample expectations and manufacturing plan early.
                </p>
              </div>
              <div className="pl-step-list">
                <div className="pl-step">
                  <h3>Share Your Brand Direction</h3>
                  <p className="muted">Send your product category, target market, quantity, logo files, reference images, fabric direction and any existing tech pack.</p>
                </div>
                <div className="pl-step">
                  <h3>Confirm Product &amp; Branding Details</h3>
                  <p className="muted">We align on product type, fabric, stitching, labels, logo placement, packaging, colors, sizing and sample requirements.</p>
                </div>
                <div className="pl-step">
                  <h3>Develop Samples</h3>
                  <p className="muted">A sample helps confirm fit, construction, branding, materials, measurements and finishing before moving into bulk manufacturing.</p>
                </div>
                <div className="pl-step">
                  <h3>Start Bulk Manufacturing</h3>
                  <p className="muted">After approval, production moves through cutting, stitching, checking, finishing, packing and export-ready preparation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Choose Your Route (Comparison Table: White Label vs Private Label vs OEM vs Custom) */}
        <section className="section" style={{ background: 'var(--bg-light)' }}>
          <div className="container content">
            <span className="pl-label">Choose your route</span>
            <h2>White label, private label, OEM or custom activewear?</h2>
            <p className="muted" style={{ maxWidth: '850px' }}>
              All four routes produce apparel sold under your brand. The difference is how deep product development goes, how much control you need and how much time and commitment the first order carries.
            </p>

            <div className="pl-table-wrapper">
              <table className="pl-table">
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Best for</th>
                    <th>Product control</th>
                    <th>Development time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>White label</strong></td>
                    <td>Startups, gyms, creators and e-commerce sellers testing a category quickly.</td>
                    <td>Established product direction with your fabric color, logo, labels, tags and packaging.</td>
                    <td>Usually the fastest when available materials and construction suit the product.</td>
                  </tr>
                  <tr>
                    <td><strong>Private label</strong></td>
                    <td>Growing brands and retailers that want a stronger, coordinated own-brand collection.</td>
                    <td>More control over measurements, colors, fabrics, trims and presentation.</td>
                    <td>Moderate, depending on fit changes, materials, branding and sample revisions.</td>
                  </tr>
                  <tr>
                    <td><strong>OEM</strong></td>
                    <td>Brands that arrive with their own tech pack, measurement chart and construction details.</td>
                    <td>Production follows the buyer's specification; Bin Rasool Enterprises reviews it for sampling and bulk.</td>
                    <td>Depends on how complete the tech pack is and how many sample rounds it needs.</td>
                  </tr>
                  <tr>
                    <td><strong>Custom</strong></td>
                    <td>Established or technical brands needing proprietary fit, fabric or construction.</td>
                    <td>Deep control over patterns, panels, seams, materials and trims.</td>
                    <td>Usually longest, because pattern work, testing and revisions take more rounds.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="muted" style={{ maxWidth: '850px', marginTop: '20px' }}>
              Many brands launch with white label or private label, learn from customer response, then move proven styles into deeper customization. MOQ: 50 pieces per style; special fabrics, trims, labels or packaging can carry their own supplier minimums.
            </p>
          </div>
        </section>

        {/* Section 6: OEM Manufacturing From Tech Pack (Split with Checklist & Steps) */}
        <section className="section" id="oem-manufacturing">
          <div className="container content">
            <div className="pl-split">
              <div>
                <span className="pl-label">OEM Manufacturing</span>
                <h2>OEM manufacturing from your tech pack</h2>
                <p className="muted">
                  OEM manufacturing is built around your own technical specification. You define the product, fit, materials, construction, branding and size range; we turn that brief into an approved sample and then into repeatable bulk production in Sialkot, Pakistan.
                </p>
                <p className="muted" style={{ marginTop: '16px', marginBottom: '8px' }}><strong>What to send for an OEM quote:</strong></p>
                <ul className="muted" style={{ paddingLeft: '20px', lineHeight: '1.75' }}>
                  <li>Tech pack, measurement sheet or reference sample</li>
                  <li>Fabric composition, GSM, stretch and finish</li>
                  <li>Construction, trims, artwork and labels</li>
                  <li>Quantity by style, colour and size</li>
                  <li>Delivery market and required timing</li>
                </ul>
                <p className="muted" style={{ marginTop: '16px' }}>MOQ: 50 pieces per style. Samples take 7-10 days and bulk production takes 3-4 weeks after sample approval.</p>
              </div>

              <div className="pl-step-list">
                <div className="pl-step">
                  <h3>Buyer-owned specifications</h3>
                  <p className="muted">Your technical direction defines the garment, from fit and construction to branding, packaging and the customer experience.</p>
                </div>
                <div className="pl-step">
                  <h3>Tech pack to approved sample</h3>
                  <p className="muted">Patterns, materials, trims, construction and artwork are turned into a physical sample for precise review and revision.</p>
                </div>
                <div className="pl-step">
                  <h3>Documented production standards</h3>
                  <p className="muted">Approved measurements, tolerances, materials, colours, placements and packing requirements guide bulk manufacturing.</p>
                </div>
                <div className="pl-step">
                  <h3>Repeatable manufacturing</h3>
                  <p className="muted">A controlled specification supports replenishment, larger runs, additional colours and related styles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Product Categories (3 Hover Cards with Straight SVG Arrows) */}
        <section className="section" style={{ background: 'var(--bg-light)' }}>
          <div className="container content">
            <span className="pl-label">Product Categories</span>
            <h2>Build a private label collection in focused apparel categories</h2>
            <p className="muted" style={{ maxWidth: '850px' }}>
              Bin Rasool Enterprises focuses on performance apparel categories where custom branding, fit, fabric and durability matter for the buyer and the end customer.
            </p>

            <div className="pl-category-grid">
              <Link className="pl-category" href="/fitness-wear-manufacturer">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/categories/1776540259_fitness-wear.webp" alt="Private Label Fitness Wear" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Private Label Fitness Wear</h3>
                <p className="muted">Joggers, hoodies, leggings, activewear sets, compression wear, dry-fit gym t-shirts and gym apparel for fitness brands.</p>
                <span className="category-mfg-link"><span>Explore Fitness Wear</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/sportswear-manufacturer-exporter">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/categories/1780941233_soccer-jersey.webp" alt="Private Label Sportswear" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Private Label Sportswear</h3>
                <p className="muted">Soccer jerseys, basketball uniforms, tracksuits, team uniforms, training wear and sublimation sports apparel for clubs and wholesalers.</p>
                <span className="category-mfg-link"><span>Explore Sports Wear</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/boxing-gear-manufacturer-bulk">
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '16px', background: '#f1f5f9' }}>
                  <img src="/images/catalog/boxing-gear/pro-leather-boxing-gloves.webp" alt="Private Label Boxing Wear" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3>Private Label Boxing Wear</h3>
                <p className="muted">Boxing shorts, rash guards, fight wear, combat sports clothing, training shirts and gym tops for boxing and MMA brands.</p>
                <span className="category-mfg-link"><span>Explore Boxing Wear</span><ArrowRightIcon size={13} /></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 8: Who We Support (2-Column Rounded Buyer Cards) */}
        <section className="section">
          <div className="container content">
            <div className="pl-split">
              <div>
                <span className="pl-label">Who We Support</span>
                <h2>Private label manufacturing for brands at different stages</h2>
                <p className="muted">
                  Whether you are starting your first drop or expanding an existing collection, Bin Rasool Enterprises can help you build a clearer path from product idea to manufactured apparel.
                </p>
              </div>
              <div>
                <ul className="pl-buyer-list">
                  <li>Startup clothing brands</li>
                  <li>Fitness and activewear labels</li>
                  <li>Boxing gyms and fight brands</li>
                  <li>Sports clubs and teamwear buyers</li>
                  <li>Wholesalers and importers</li>
                  <li>Online sellers and retail brands</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: CTA Banner */}
        <section className="section">
          <div className="container">
            <div className="pl-cta">
              <div>
                <h2>Ready to build your private label apparel line?</h2>
                <p>Send your logo, product category, reference images, quantity and branding requirements. We will help you plan the right sample and production direction.</p>
              </div>
              <Link href="/contact-us" className="btn btn-primary" style={{ whiteSpace: 'nowrap', padding: '14px 28px' }}>
                Discuss Your Brand
              </Link>
            </div>
          </div>
        </section>

        {/* Section 10: Technical FAQs */}
        <FaqSection
          title="Private Label &amp; Custom Branding FAQs"
          subtitle="Detailed technical guidance on labels, custom trims, tech pack confidentiality and low MOQ production."
          items={PRIVATE_LABEL_FAQS}
          categoryBadge="Private Label Program"
        />

        {/* Section 11: Private Label Activewear by Market */}
        <section className="section" style={{ background: 'var(--bg-light)' }}>
          <div className="container content">
            <span className="pl-label">Private Label Activewear by Market</span>
            <h2>Private Label Activewear by Market</h2>
            <p className="muted" style={{ maxWidth: '850px' }}>
              Explore market-focused private label activewear pages for brands comparing launch paths, buyer requirements and product direction across different regions.
            </p>

            <div className="pl-category-grid">
              <Link className="pl-category" href="/private-label-activewear-manufacturer-europe">
                <h3>Europe Buyers</h3>
                <p className="muted">Private label activewear for EU brands, importers and multi-country distribution buyers.</p>
                <span className="category-mfg-link"><span>View Europe Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/private-label-activewear-manufacturer-uk">
                <h3>UK Brands</h3>
                <p className="muted">Private label activewear for UK fitness brands and online sellers.</p>
                <span className="category-mfg-link"><span>View UK Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/private-label-activewear-manufacturer-usa">
                <h3>USA Brands</h3>
                <p className="muted">Private label activewear for US fitness brands, DTC labels and Amazon sellers.</p>
                <span className="category-mfg-link"><span>View USA Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/private-label-activewear-manufacturer-germany">
                <h3>German Brands</h3>
                <p className="muted">Private label activewear for German fitness brands and EU importers.</p>
                <span className="category-mfg-link"><span>View Germany Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/private-label-activewear-manufacturer-france">
                <h3>French Brands</h3>
                <p className="muted">Private label activewear for French fitness brands and activewear labels.</p>
                <span className="category-mfg-link"><span>View France Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/private-label-activewear-manufacturer-netherlands">
                <h3>Netherlands Brands</h3>
                <p className="muted">Private label activewear for Dutch importers and EU distribution buyers.</p>
                <span className="category-mfg-link"><span>View Netherlands Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/private-label-activewear-manufacturer-italy">
                <h3>Italy Brands</h3>
                <p className="muted">Private label activewear for boutique fitness, athleisure and premium Italian buyers.</p>
                <span className="category-mfg-link"><span>View Italy Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/private-label-activewear-manufacturer-spain">
                <h3>Spain Brands</h3>
                <p className="muted">Private label activewear for Spanish online sellers, studios and growth-stage labels.</p>
                <span className="category-mfg-link"><span>View Spain Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/private-label-activewear-manufacturer-australia">
                <h3>Australia &amp; NZ Brands</h3>
                <p className="muted">UPF 50+ sun protection activewear, moisture-wicking gym apparel for Sydney, Melbourne &amp; Brisbane.</p>
                <span className="category-mfg-link"><span>View Australia Page</span><ArrowRightIcon size={13} /></span>
              </Link>
              <Link className="pl-category" href="/activewear-manufacturer-for-startups">
                <h3>Startup Brands</h3>
                <p className="muted">Low MOQ activewear manufacturing for startup fitness brands and influencers.</p>
                <span className="category-mfg-link"><span>View Startup Page</span><ArrowRightIcon size={13} /></span>
              </Link>
            </div>

            <div style={{ marginTop: '36px' }}>
              <span className="pl-label">Related Services</span>
              <div className="pl-related-pills">
                <Link href="/fitness-wear-manufacturer" className="pl-related-pill">Private Label Fitness Wear Manufacturer</Link>
                <Link href="/fitness-wear-manufacturer-sialkot" className="pl-related-pill">Gym Wear Manufacturer Sialkot</Link>
                <Link href="/sportswear-manufacturer" className="pl-related-pill">Custom Sportswear Manufacturer</Link>
                <Link href="/streetwear-manufacturer-pakistan" className="pl-related-pill">Custom Streetwear &amp; Hoodies</Link>
                <Link href="/boxing-gear-manufacturer" className="pl-related-pill">Boxing &amp; Fight Wear Manufacturer</Link>
                <Link href="/activewear-manufacturer-for-startups" className="pl-related-pill">Low MOQ Activewear for Startups</Link>
                <Link href="/manufacturing-process" className="pl-related-pill">Apparel Manufacturing Process</Link>
                <Link href="/product-catalog" className="pl-related-pill">Full Product Catalog</Link>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
