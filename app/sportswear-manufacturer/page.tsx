import FaqSection from '../components/FaqSection';
import { SPORTSWEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sportswear Manufacturer | Custom Teamwear & Uniforms | Bin Rasool Enterprises",
  description: "Direct OEM custom sportswear manufacturer in Sialkot, Pakistan. Factory-direct custom soccer jerseys, basketball uniforms, team tracksuits, training wear and sublimation sports apparel for clubs, brands and wholesalers.",
  keywords: [
    "sportswear manufacturer",
    "custom sportswear manufacturer",
    "teamwear manufacturer",
    "soccer jersey manufacturer",
    "basketball uniform manufacturer",
    "sublimated team uniform manufacturer",
    "tracksuits manufacturer",
    "sports apparel exporter",
    "custom teamwear manufacturer",
    "sublimation sports apparel",
    "athletic training wear manufacturer",
    "custom football kits supplier",
    "low MOQ sportswear manufacturer",
    "OEM sportswear manufacturer",
    "private label sportswear manufacturer",
    "sports club uniform wholesale",
    "sportswear manufacturer Pakistan",
    "custom jersey supplier Sialkot",
    "sports clothing factory Pakistan"
  ],
  alternates: {
    canonical: '/sportswear-manufacturer',
  },
  openGraph: {
    title: "Sportswear Manufacturer | Custom Teamwear & Uniforms | Bin Rasool Enterprises",
    description: "Export manufacturer for custom teamwear, soccer jerseys, basketball uniforms, tracksuits, training wear and sublimation sports apparel from Sialkot.",
    url: "/sportswear-manufacturer",
    images: [{ url: "/images/categories/1776540279_sports-wear.webp", width: 1200, height: 630 }],
  },
};

const CATEGORIES = [
  {
    title: "Soccer / Football Match Kit",
    description: "Full dye-sublimated match jerseys and matching athletic shorts with underarm micro-mesh ventilation panels.",
    image: "/images/catalog/teamwear/royal-blue-soccer-match-kit-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Soccer%20%2F%20Football%20Match%20Kit",
  },
  {
    title: "Goalkeeper Padded Match Kit",
    description: "Long-sleeve goalkeeper jerseys with integrated EVA protective elbow padding and matching padded hip shorts.",
    image: "/images/catalog/teamwear/neon-goalkeeper-padded-match-kit-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Goalkeeper%20Padded%20Match%20Kit",
  },
  {
    title: "Pro Basketball Uniform Set",
    description: "V-neck moisture-wicking bird-eye mesh sleeveless tanks and matching 9-inch court shorts with striped rib trims.",
    image: "/images/catalog/teamwear/black-crimson-basketball-uniform-set-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Pro%20Basketball%20Uniform%20Set",
  },
  {
    title: "Baseball Button-Down Jersey",
    description: "Heavyweight poly-knit vintage pinstripe jerseys with full 6-button front plackets, braid piping and curved hems.",
    image: "/images/catalog/teamwear/pinstripe-baseball-button-down-jersey-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Baseball%20Button-Down%20Jersey",
  },
  {
    title: "Rugby & American Football Jersey",
    description: "280 GSM tear-resistant 4-way stretch game jerseys with double-ply shoulder yokes and reinforced rugby plackets.",
    image: "/images/catalog/teamwear/maroon-hoop-rugby-jersey-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Rugby%20%26%20American%20Football%20Jersey",
  },
  {
    title: "Cricket Sublimated Match Kit",
    description: "Breathable honeycomb dry-fit polo match jerseys with 3-button plackets and matching athletic cricket match trousers.",
    image: "/images/catalog/teamwear/green-gold-cricket-sublimated-kit-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Cricket%20Sublimated%20Match%20Kit",
  },
  {
    title: "Ice Hockey Sublimated Jersey",
    description: "280 GSM bird-eye double-knit heavyweight hockey jerseys with wide V-neck collar inserts and reinforced elbow panels.",
    image: "/images/catalog/teamwear/navy-red-ice-hockey-jersey-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Ice%20Hockey%20Sublimated%20Jersey",
  },
  {
    title: "Athletic Team Warm-Up Tracksuit",
    description: "Smooth poly-tricot presentation tracksuits featuring full-zip stand-collar jackets and tapered zippered-cuff pants.",
    image: "/images/catalog/teamwear/navy-athletic-team-warmup-tracksuit-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Athletic%20Team%20Warm-Up%20Tracksuit",
  },
  {
    title: "Coaches Sideline Windbreaker Anorak",
    description: "Water-resistant micro-ripstop nylon sideline jackets with technical hoods, waterproof half-zips and kangaroo flap pockets.",
    image: "/images/catalog/teamwear/black-coaches-sideline-windbreaker-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Coaches%20Sideline%20Windbreaker%20Anorak",
  },
  {
    title: "Classic Wool & Leather Varsity Jacket",
    description: "24 oz heavyweight melange wool body with genuine cowhide leather sleeves, enamel snaps and striped 2x2 rib trims.",
    image: "/images/catalog/teamwear/forest-green-leather-varsity-jacket-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Classic%20Wool%20%26%20Leather%20Varsity%20Jacket",
  },
  {
    title: "Track & Field Racing Singlet Set",
    description: "Ultra-lightweight aerated mesh racerback running singlets with micro-perforations and 3-inch athletic split shorts.",
    image: "/images/catalog/teamwear/coral-track-field-running-kit-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Track%20%26%20Field%20Racing%20Singlet%20Set",
  },
  {
    title: "Soccer Training Scrimmage Bibs",
    description: "Fluorescent neon micro-mesh practice pinnies with deep scoop necks and reinforced contrast binding for drills.",
    image: "/images/catalog/teamwear/neon-soccer-training-scrimmage-bibs-flatlay.jpg",
    link: "/contact-us?category=Sublimated%20Teamwear%20%26%20Kits&product=Soccer%20Training%20Scrimmage%20Bibs",
  },
];

const SPEC_CARDS = [
  {
    title: "Approve artwork and player data separately",
    content: "Prepare the style specification, artwork proof and final roster as separate controlled documents. Resolve fit feedback before approving the size allocation, then check spelling and numbers against the final artwork. Agree how changes and later reorders will be handled with Bin Rasool Enterprises before authorising the order.",
  },
  {
    title: "Inspect uniform consistency across the team",
    content: "Include shade comparison, logo placement, number legibility and seam comfort in the inspection brief. Match individual names and numbers to the approved roster and packing labels. For sets, verify that each top has the correct bottom size; for repeat orders, agree a colour reference rather than assuming an exact match between fabric batches.",
  },
  {
    title: "Control team colours, numbers and sponsor artwork",
    content: "Our sportswear manufacturing includes high-definition sublimation printing, embroidery badges, silicone transfers and screen printing. Supply vector artwork where available, Pantone colour codes, number sizes and a roster tying each name to a garment size. Confirm the chosen fabric and artwork combination before bulk approval.",
  },
  {
    title: "Review a decorated kit before ordering the roster",
    content: "Request a pre-production sample representing the actual colour layout and key construction details. Assess movement, breathability and legibility of names and numbers as well as flat measurements. Clarify how total quantity, garment type, colourways and individual player customisation affect your final quote.",
  },
  {
    title: "Evaluate performance fabric against use",
    content: "Specify the desired weight, stretch, opacity and surface feel. Where a jersey uses mesh side panels, mark their location and explain the ventilation requirement. Moisture management and durability claims are supported by agreed technical specifications; request confirmation of available fabric mills for your design.",
  },
  {
    title: "Use a roster and a sport-specific size chart",
    content: "Check sleeve reach, armhole shape and freedom of movement against the chosen sport. Separate youth and adult size runs where appropriate and identify whether the fit is athletic slim, standard regular or relaxed fit. For multi-piece uniforms, approve the top and bottom together and define measurement tolerances.",
  },
  {
    title: "Build the uniform around the sport",
    content: "Club buyers, teamwear suppliers and private label brands need garments that suit how they are worn. A match jersey, a sleeveless court uniform and a warm-up tracksuit should not share one fit assumption. Describe the playing conditions, layering and intended size range so the proposed style is engineered for actual match play.",
  },
  {
    title: "Separate match kits from training and travel pieces",
    content: "List the garments in each kit and whether they are ordered together or separately. For jerseys, show collar styling (V-neck, crew, round rib) and sleeve requirements; for tracksuits, include jacket zip opening, trouser cut, ankle zips and pocket details. Bin Rasool Enterprises will confirm sport-specific construction from your tech packs.",
  },
  {
    title: "Sportswear manufacturing in Sialkot for global buyers",
    content: "Pakistan has an established textile and apparel base serving international brands, importers, wholesalers and clubs. Sialkot adds a concentrated network of sportswear skills, fabric and trim suppliers, sublimation, embroidery and printing services, packaging support and export logistics. Bin Rasool Enterprises provides end-to-end manufacturing management directly from our factory floor.",
  },
  {
    title: "Who we manufacture sportswear for",
    content: "Sports clubs and academies needing coordinated uniforms, player details, training wear and repeat orders. Private label and e-commerce sportswear brands that need controlled fit, custom woven labels, branded packaging and dependable reorders. Gyms, schools, wholesalers, importers and retailers sourcing teamwear and sports apparel for their own athletic programs.",
  },
  {
    title: "Minimums, sampling and production expectations",
    content: "These are planning guidelines for straightforward sportswear products: Minimum Order Quantity (MOQ) starts at 50 pieces per style. A straightforward sample takes 2 to 3 weeks after specifications, materials, artwork and payment confirmation. Bulk production takes 4 to 5 weeks after final pre-production sample sign-off and deposit. Worldwide shipping via DHL, FedEx or air/sea cargo.",
  },
];

const RELATED_SERVICES = [
  { name: "Private Label Activewear", href: "/private-label-manufacturing" },
  { name: "Custom Tracksuits", href: "/products" },
  { name: "Fitness Wear Manufacturer", href: "/fitness-wear-manufacturer" },
  { name: "Boxing Wear Manufacturer", href: "/boxing-wear-manufacturer" },
  { name: "Custom Hoodies & Streetwear", href: "/hoodies-manufacturer" },
  { name: "USA Activewear Brands", href: "/private-label-activewear-manufacturer-usa" },
  { name: "UK Sports Brands", href: "/private-label-activewear-manufacturer-uk" },
  { name: "Europe Buyers & Importers", href: "/private-label-activewear-manufacturer-europe" },
  { name: "Startup Brands Low MOQ", href: "/activewear-manufacturer-for-startups" },
];

export default function SportswearManufacturerPage() {
  return (
    <div className="sportswear-page">
      {/* Section 1: Hero (Matching Private Label Theme) */}
      <section className="pl-hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Sportswear Manufacturer' },
            ]}
            style={{ marginBottom: '20px' }}
          />

          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">CUSTOM SPORTSWEAR MANUFACTURER &bull; SIALKOT, PAKISTAN</span>
              <h1>Sportswear Manufacturer &amp; Custom Teamwear Exporter</h1>
              <p>
                Looking for a verified custom sportswear manufacturer in Sialkot? Bin Rasool Enterprises is an OEM custom sportswear manufacturer and exporter in Sialkot, Pakistan, making custom teamwear, soccer jerseys, basketball uniforms, presentation tracksuits, athletic training wear and dye-sublimation apparel for clubs, brands and wholesalers worldwide.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '26px' }}>
                <Link href="/contact" className="btn btn-primary">
                  Request a Sportswear Quote
                </Link>
                <a href="#collection" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  View Product Categories
                </a>
              </div>
            </div>

            <div className="pl-summary">
              <strong>Factory Direct Sialkot</strong>
              <p>Custom team kits, sublimated jerseys, presentation tracksuits and athletic apparel with 50 pcs low MOQ and fast DHL sampling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Product Categories Section */}
      <section className="section" id="collection" style={{ background: '#f8fafc', padding: '64px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '36px' }}>
            <span className="pl-label">Product Showcase</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 10px' }}>
              Explore Product Categories
            </h2>
            <p style={{ color: '#475569', fontSize: '15.5px', margin: 0 }}>
              Factory-direct teamwear, club kits and high-performance sports apparel customizable with low MOQs.
            </p>
          </div>

          <div className="sw-category-grid">
            {CATEGORIES.map((cat, idx) => (
              <article key={idx} className="sw-category-card">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="sw-category-card-body">
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <Link href={cat.link} className="sw-category-link">
                    <span>Get Factory Quote</span>
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Technical B2B Production Specification Cards */}
          <div style={{ marginTop: '56px', marginBottom: '32px' }}>
            <span className="pl-label">Quality Standards</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 10px' }}>
              Sportswear Manufacturing &amp; Quality Control Standards
            </h2>
            <p style={{ color: '#475569', fontSize: '15.5px', margin: 0 }}>
              Key production disciplines we implement for professional sports teams, academies and private label activewear brands.
            </p>
          </div>

          <div className="sw-specs-stack">
            {SPEC_CARDS.map((card, idx) => (
              <section key={idx} className="sw-spec-card">
                <h2>{card.title}</h2>
                <p>{card.content}</p>
              </section>
            ))}
          </div>

          {/* Related Collections Section */}
          <div style={{ marginTop: '64px', background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: 'var(--brand-orange, #f3a626)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1.5px', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              EXPLORE RELATED MANUFACTURING SERVICES
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              Complementary Custom Apparel &amp; Export Programs
            </h3>
            <div className="pl-related-pills">
              {RELATED_SERVICES.map((s, idx) => (
                <Link key={idx} href={s.href} className="pl-related-pill">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          {/* High-Converting CTA Box */}
          <div className="sw-cta-box">
            <h2>Send your teamwear brief and quantity breakdown</h2>
            <p>
              Include the sport, garment list, size chart, team artwork, roster requirements and intended order quantities. Our merchandising team will confirm fabric suitability, sampling terms and deliver a transparent factory quote within 24 hours.
            </p>
            <div>
              <Link href="/contact" className="sw-btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Request Wholesale Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sportswear FAQs Section */}
      <FaqSection
        title="Sports Wear FAQs"
        categoryBadge="Sportswear"
        items={SPORTSWEAR_FAQS}
      />
    </div>
  );
}
