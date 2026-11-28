import FaqSection from '../components/FaqSection';
import { BOXING_WEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Boxing Wear & Fight Gear Manufacturer | Custom Trunks, Robes & Rash Guards",
  description: "Direct OEM boxing wear and fight gear manufacturer in Sialkot, Pakistan. Custom heavy satin boxing trunks, fighter walkout robes, corner jackets, BJJ rash guards and MMA shorts with 50 pcs low MOQ and fast DHL export.",
  keywords: [
    "boxing wear manufacturer",
    "fight gear manufacturer",
    "boxing trunks manufacturer",
    "custom boxing shorts",
    "fighter robes manufacturer",
    "BJJ rash guard manufacturer",
    "MMA shorts manufacturer",
    "corner jackets manufacturer",
    "custom fight gear Pakistan",
    "boxing apparel exporter",
    "low MOQ boxing wear",
    "custom satin boxing trunks",
    "combat sports apparel manufacturer",
    "boxing gear supplier Sialkot"
  ],
  alternates: {
    canonical: '/boxing-wear-manufacturer',
  },
  openGraph: {
    title: "Boxing Wear & Fight Gear Manufacturer | Bin Rasool Enterprises",
    description: "Export manufacturer for custom satin boxing trunks, walkout robes, corner jackets and sublimated rash guards from Sialkot.",
    url: "/boxing-wear-manufacturer",
    images: [{ url: "/images/categories/1776540301_boxing-wear.webp", width: 1200, height: 630 }],
  },
};

const BOXING_CATEGORIES = [
  {
    title: "Pro Sparring Boxing Gloves (16 oz)",
    description: "Handcrafted A-grade cowhide leather with multi-layer IMF shock-absorbing foam, breathable palm vents, and wide Velcro support.",
    image: "/images/catalog/boxing-gear/pro-cowhide-sparring-boxing-gloves-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Pro%20Sparring%20Boxing%20Gloves%20(16%20oz)",
  },
  {
    title: "Pro Competition Lace-Up Fight Gloves (10 oz)",
    description: "Championship 10 oz fight gloves in rich crimson leather with authentic white lace-up closure and streamlined latex-horsehair padding.",
    image: "/images/catalog/boxing-gear/pro-competition-lace-up-fight-gloves-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Pro%20Competition%20Lace-Up%20Fight%20Gloves%20(10%20oz)",
  },
  {
    title: "Custom Satin Boxing Trunks",
    description: "Heavyweight 220 GSM poly-satin trunks with wide 4-inch multi-channel elastic waistbands, gold side panels, and curved mobility slits.",
    image: "/images/catalog/boxing-gear/custom-satin-boxing-trunks-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Custom%20Satin%20Boxing%20Trunks",
  },
  {
    title: "Pro Fighter Walkout Hooded Robe",
    description: "Full-length championship hooded walkout robes in heavyweight black silk-satin with contrast white shawl lapels and matching tie sash.",
    image: "/images/catalog/boxing-gear/pro-fighter-walkout-hooded-robe-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Pro%20Fighter%20Walkout%20Hooded%20Robe",
  },
  {
    title: "Sublimated BJJ & MMA Rash Guard",
    description: "Heavyweight 250 GSM 4-way stretch compression rash guards with 4-needle flatlock seams and inner silicone anti-ride hem.",
    image: "/images/catalog/boxing-gear/sublimated-bjj-mma-rash-guard-flatlay.jpg",
    link: "/contact-us?category=MMA%2C%20BJJ%20Gis%20%26%20Rashguards&product=Sublimated%20BJJ%20%26%20MMA%20Rash%20Guard",
  },
  {
    title: "Pro MMA Cage Fight Shorts",
    description: "Tear-resistant microfiber combat shorts with integrated 4-way lycra crotch flex gussets, reinforced side slits, and dual Velcro fly.",
    image: "/images/catalog/boxing-gear/pro-mma-fight-shorts-flatlay.jpg",
    link: "/contact-us?category=MMA%2C%20BJJ%20Gis%20%26%20Rashguards&product=Pro%20MMA%20Cage%20Fight%20Shorts",
  },
  {
    title: "Traditional Muay Thai Shorts",
    description: "Authentic emerald green poly-satin kickboxing shorts with 8-strip ruched elastic waistbands, gold accents, and high curved side cuts.",
    image: "/images/catalog/boxing-gear/traditional-muay-thai-shorts-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Traditional%20Muay%20Thai%20Shorts",
  },
  {
    title: "Cornerman Coach Button-Up Jacket",
    description: "Tailored ringside corner jackets in silky white poly-satin with contrast black collar, snap buttons, dual chest pockets, and piping.",
    image: "/images/catalog/boxing-gear/cornerman-coach-button-jacket-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Cornerman%20Coach%20Button-Up%20Jacket",
  },
  {
    title: "Full-Protection Leather Headguard",
    description: "A-grade genuine cowhide leather sparring headgear with sculpted cheek protectors, padded ear crossbars, and top crown lace adjustment.",
    image: "/images/catalog/boxing-gear/leather-sparring-headguard-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Full-Protection%20Leather%20Headguard",
  },
  {
    title: "Curved Leather Focus Punch Mitts",
    description: "Ergonomic curved punch pads with multi-layer high-density shock foam, target center circle, coach palm ball, and wrist wedge.",
    image: "/images/catalog/boxing-gear/curved-leather-focus-punch-mitts-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Curved%20Leather%20Focus%20Punch%20Mitts",
  },
  {
    title: "Heavy-Duty Leather Instep Shin Guards",
    description: "Double-padded shin and instep guards in genuine cowhide leather with dual wide hook-and-loop calf straps and elastic foot stirrups.",
    image: "/images/catalog/boxing-gear/leather-instep-shin-guards-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Heavy-Duty%20Leather%20Instep%20Shin%20Guards",
  },
  {
    title: "Heavy Cotton Corner Towels & Handwrap Set",
    description: "100% ring-spun plush terry cotton corner towels paired with 180-inch semi-elastic Mexican handwraps and breathable gear pouches.",
    image: "/images/catalog/boxing-gear/corner-towels-handwrap-set-flatlay.jpg",
    link: "/contact-us?category=Boxing%20Gloves%20%26%20Fight%20Gear&product=Heavy%20Cotton%20Corner%20Towels%20%26%20Handwrap%20Set",
  },
];

const BOXING_SPECS = [
  {
    title: "Heavyweight Poly-Satin & Velvet Fabrics",
    content: "We source tear-resistant, non-snag heavy poly-satin (180–220 GSM) and plush stretch velvets that drape perfectly under arena lighting and withstand repeated championship bouts.",
  },
  {
    title: "Reinforced 4-Needle Elastic Waistbands",
    content: "Our boxing trunks feature multi-channel elasticated waistbands with integrated inner heavy-duty drawstrings, ensuring a secure no-slip fit over protective cups during intense rounds.",
  },
  {
    title: "High-Density 3D Embroidery & Metallic Appliques",
    content: "We utilize multi-head Tajima embroidery machines for thick raised 3D lettering, metallic gold/silver thread work, sequin trims and custom fighter name patches.",
  },
  {
    title: "Flex Crotch & High Mobility Side Slits",
    content: "For MMA and kickboxing apparel, we insert 4-way stretch poly-spandex gussets in the groin area and reinforced bar-tacked side splits for complete kicking freedom.",
  },
  {
    title: "Fade-Resistant Sublimation Printing",
    content: "For rash guards and modern fight shorts, all-over graphics, camouflage, sponsor logos and rank colors are sublimated deep into the fabric fibers, ensuring zero cracking or peeling.",
  },
  {
    title: "Low MOQ Starting at 50 Pieces per Style",
    content: "We support combat academies, boxing promotions, gyms and fight brands with accessible 50 pcs MOQ per design, allowing custom size breakdowns from Youth to 4XL.",
  },
];

const RELATED_SERVICES = [
  { name: "Private Label Activewear", href: "/private-label-manufacturing" },
  { name: "Sportswear Manufacturer", href: "/sportswear-manufacturer" },
  { name: "Fitness Wear Manufacturer", href: "/fitness-wear-manufacturer" },
  { name: "Custom Hoodies & Streetwear", href: "/hoodies-manufacturer" },
  { name: "MMA & Combat Gear Bulk", href: "/boxing-gear-manufacturer-bulk" },
  { name: "USA Combat Brands", href: "/private-label-activewear-manufacturer-usa" },
  { name: "UK Sports Brands", href: "/private-label-activewear-manufacturer-uk" },
  { name: "Europe Gym Importers", href: "/private-label-activewear-manufacturer-europe" },
  { name: "Full Product Catalog", href: "/products" },
];

export default function BoxingWearManufacturerPage() {
  return (
    <div className="boxing-wear-page">
      {/* Section 1: Hero (Matching Private Label Theme) */}
      <section className="pl-hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Boxing Wear Manufacturer' },
            ]}
            style={{ marginBottom: '20px' }}
          />

          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">OEM COMBAT SPORTSWEAR &bull; SIALKOT, PAKISTAN</span>
              <h1>Custom Boxing Wear &amp; Fight Gear Manufacturer</h1>
              <p>
                Bin Rasool Enterprises is an export manufacturer in Sialkot, Pakistan, engineering custom satin boxing trunks, fighter walkout robes, corner team jackets, BJJ rash guards and MMA fight shorts for combat sports promotions, gyms and private label fightwear brands worldwide.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '26px' }}>
                <Link href="/contact-us" className="btn btn-primary">
                  Request a Fight Gear Quote
                </Link>
                <Link href="/products" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Explore Product Catalog
                </Link>
              </div>
            </div>

            <div className="pl-summary">
              <strong>Built For Championship Combat.</strong>
              <p>High-grade heavy satin, 4-way stretch poly-spandex, sublimated rash guards and customized team fight kits with 50 pcs low MOQ and fast DHL sampling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Combat Manufacturing Overview (Split Layout) */}
      <section className="section" style={{ background: '#ffffff', padding: '64px 0' }}>
        <div className="container content">
          <div className="pl-split">
            <div>
              <span className="pl-label">Combat Engineering</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 14px' }}>
                Fight apparel engineered for durability, agility &amp; arena impact
              </h2>
            </div>
            <div className="pl-note">
              <p className="muted" style={{ margin: '0 0 14px', color: '#475569', fontSize: '15.5px', lineHeight: '1.75' }}>
                Combat apparel must withstand high torque, grappling friction and intense perspiration without tearing or slipping. From triple-needle reinforced seams on fight shorts to high-density 3D metallic embroidery on championship robes, our craftsmen in Sialkot engineer every piece for professional performance.
              </p>
              <p className="muted" style={{ margin: 0, color: '#475569', fontSize: '15.5px', lineHeight: '1.75' }}>
                Whether you need a full roster kit for a title fight or 500 rash guards for a grappling tournament, we deliver factory-direct pricing with guaranteed international shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Core Categories Grid */}
      <section className="section" id="categories" style={{ background: '#f8fafc', padding: '64px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '36px' }}>
            <span className="pl-label">Product Showcase</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 10px' }}>
              Core Boxing &amp; Fight Wear Styles
            </h2>
            <p style={{ color: '#475569', fontSize: '15.5px', margin: 0 }}>
              Customizable with your team colors, fighter embroidery, sponsor logos and custom woven label packages.
            </p>
          </div>

          <div className="sw-category-grid">
            {BOXING_CATEGORIES.map((cat, idx) => (
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
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Section 4: Technical Specifications */}
          <div style={{ marginTop: '56px', marginBottom: '32px' }}>
            <span className="pl-label">Quality Standards</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 10px' }}>
              Combat Sports Quality Control &amp; Stitching Standards
            </h2>
            <p style={{ color: '#475569', fontSize: '15.5px', margin: 0 }}>
              High-impact construction methods designed for professional fighters, boxing clubs and martial arts academies.
            </p>
          </div>

          <div className="sw-specs-stack">
            {BOXING_SPECS.map((card, idx) => (
              <section key={idx} className="sw-spec-card">
                <h2>{card.title}</h2>
                <p>{card.content}</p>
              </section>
            ))}
          </div>

          {/* Related Collections Section */}
          <div style={{ marginTop: '64px', background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: 'var(--brand-orange, #f3a626)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1.5px', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              EXPLORE RELATED COMBAT SERVICES
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              Complementary Custom Gear &amp; Export Programs
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
            <h2>Ready to produce custom fight gear for your fighters or brand?</h2>
            <p>
              Send your design mockups, fight kit requirements or sponsor artwork. Our production team will confirm fabric options, embroidery sizing and provide clear factory quotes within 24 hours.
            </p>
            <div>
              <Link href="/contact-us" className="sw-btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Request Fight Gear Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Boxing Wear FAQs Section */}
      <FaqSection
        title="Boxing Wear & Fight Gear FAQs"
        categoryBadge="Combat Gear"
        items={BOXING_WEAR_FAQS}
      />
    </div>
  );
}
