import FaqSection from '../components/FaqSection';
import { FITNESS_WEAR_FAQS } from '../lib/faqs';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fitness Wear & Activewear Manufacturer | Custom Leggings & Sports Bras | Bin Rasool Enterprises",
  description: "Premier OEM fitness wear and activewear manufacturer in Sialkot, Pakistan. 75/25 Nylon Spandex squat-proof leggings, sports bras, seamless gym wear, crop tops and tapered joggers with 50 pcs MOQ and worldwide DHL export.",
  keywords: [
    "fitness wear manufacturer",
    "activewear manufacturer",
    "gym wear manufacturer",
    "private label activewear",
    "leggings manufacturer",
    "sports bra manufacturer",
    "fitness apparel manufacturer",
    "seamless activewear",
    "gym joggers manufacturer",
    "activewear manufacturer Pakistan",
    "custom activewear manufacturer low MOQ",
    "squat proof leggings manufacturer",
    "high waist scrunch leggings manufacturer",
    "custom scrunch leggings private label",
    "non see through leggings manufacturer",
    "4 way stretch leggings manufacturer",
    "nylon spandex leggings manufacturer",
    "compression sports bra manufacturer",
    "biker shorts manufacturer wholesale",
    "custom gym t-shirt manufacturer",
    "tapered gym joggers manufacturer",
    "Amazon FBA activewear manufacturer",
    "fitness clothing manufacturer UK",
    "fitness clothing manufacturer USA"
  ],
  alternates: {
    canonical: '/fitness-wear-manufacturer',
  },
  openGraph: {
    title: "Fitness Wear & Activewear Manufacturer | Bin Rasool Enterprises",
    description: "Factory-direct custom seamless gym leggings, sports bras, pump covers, compression wear and gym joggers.",
    url: "/fitness-wear-manufacturer",
    images: [{ url: "/images/categories/1776540259_fitness-wear.webp", width: 1200, height: 630 }],
  },
};

const FITNESS_CATEGORIES = [
  {
    title: "High-Waist Squat-Proof Leggings",
    description: "75/25 Nylon Spandex 4-way stretch interlock with gusseted crotch, flatlock seams and zero-transparency opacity.",
    image: "/images/catalog/fitness-wear/charcoal-high-waist-squat-proof-leggings-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Seamless Ribbed Push-Up Leggings",
    description: "Engineered body-mapped circular micro-ribbed knits providing targeted compression, push-up glute contouring and second-skin comfort.",
    image: "/images/catalog/fitness-wear/blue-seamless-ribbed-push-up-leggings-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Booty-Scrunch Glute Contour Leggings",
    description: "Custom ruched rear scrunch detailing with crescent under-glute shading for maximum aesthetic enhancement and athletic shape.",
    image: "/images/catalog/fitness-wear/dusty-mauve-booty-scrunch-leggings-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Crossover V-Waist Flared Yoga Pants",
    description: "Ultra-soft buttery brushed fabric with signature criss-cross crossover waistband and tailored bell-bottom flare hem.",
    image: "/images/catalog/fitness-wear/black-crossover-flared-yoga-pants-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "High-Impact Supportive Sports Bra",
    description: "High, medium and light impact sports bras with removable molded pads, racerback styling and brushed elastic underbands.",
    image: "/images/catalog/fitness-wear/high-impact-supportive-sports-bra.webp",
    link: "/contact",
  },
  {
    title: "Longline Square-Neck Yoga Crop Bra",
    description: "Extended longline silhouette with supportive dual cross-back strappy detailing and integrated removable padding.",
    image: "/images/catalog/fitness-wear/sage-longline-yoga-crop-bra-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "High-Rise Compression Biker Shorts",
    description: "7-inch inseam compression biker shorts with no-dig seamless waistband and dual ergonomic drop-in utility phone pockets.",
    image: "/images/catalog/fitness-wear/olive-high-rise-biker-shorts-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "2-Piece Matching Seamless Workout Set",
    description: "Coordinated racerback sports bra and full-length high-waist ribbed leggings set knitted as a matching private label bundle.",
    image: "/images/catalog/fitness-wear/mocha-matching-seamless-workout-set-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Long-Sleeve Seamless Gym Crop Top",
    description: "Raglan-sleeve circular knit crop top featuring integrated thumbholes at cuffs and engineered underarm breathable mesh eyelets.",
    image: "/images/catalog/fitness-wear/sand-seamless-long-sleeve-crop-top-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Tapered Athletic Gym Joggers",
    description: "320 GSM heavyweight cotton-poly fleece joggers with bonded waterproof zipper pockets, custom drawstrings and ribbed cuffs.",
    image: "/images/catalog/fitness-wear/charcoal-tapered-gym-joggers-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Oversized Pump Cover Gym Tees",
    description: "Heavyweight 260 GSM combed cotton drop-shoulder boxy tees engineered for bodybuilding pump covers and streetwear athleisure.",
    image: "/images/catalog/fitness-wear/washed-black-oversized-pump-cover-tee-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Men's 2-in-1 Workout Running Shorts",
    description: "Lightweight 4-way stretch outer shell with built-in compression spandex inner liner, phone pocket and curved side split hems.",
    image: "/images/catalog/fitness-wear/black-mens-two-in-one-workout-shorts-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Bodybuilding Y-Back Stringer Tank",
    description: "Classic bodybuilding deep-cut scoop neck stringer with thin shoulder straps, athletic racerback taper and curved scallop hem.",
    image: "/images/catalog/fitness-wear/burgundy-bodybuilding-y-back-stringer-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Men's Compression Baselayer Suit",
    description: "Graduated compression long-sleeve rashguard top and matching compression tights with 4-needle 6-thread ergonomic flatlock seams.",
    image: "/images/catalog/fitness-wear/black-mens-compression-baselayer-set-flatlay.jpg",
    link: "/contact",
  },
  {
    title: "Athletic Quarter-Zip Performance Pullover",
    description: "Technical 4-way stretch interlock pullover featuring a stand collar, reverse-coil 1/4 zipper, chin guard and raglan sleeves.",
    image: "/images/catalog/fitness-wear/navy-quarter-zip-training-pullover-flatlay.jpg",
    link: "/contact",
  },
];

const FITNESS_SPECS = [
  {
    title: "Squat-Proof Fabric Density & Opacity Testing",
    content: "We test every roll of 220–280 GSM nylon-spandex interlock on high-stretch mannequins under bright studio lighting to guarantee 100% opacity and zero shear across squat and lunging motions.",
  },
  {
    title: "Flatlock 4-Needle 6-Thread Anti-Chafe Seaming",
    content: "All high-friction activewear seams are built using Japanese flatlock machines. Flat seams sit entirely flush against the skin, preventing chafing during high-intensity training sessions.",
  },
  {
    title: "High-Recovery Waistband Construction",
    content: "Our custom leggings feature reinforced multi-layer bonded waistbands that stay up during sprints, deadlifts and cardio without slipping or folding over.",
  },
  {
    title: "Tagless Silicone Heat-Seal Branding",
    content: "For premium gym wear labels, we apply scratch-resistant, matte silicone heat-transfer logos and care instructions directly to the interior fabric for complete skin comfort.",
  },
  {
    title: "Custom Pantone Fabric Dyeing & Lab Dips",
    content: "We match any custom Pantone color code for your seasonal collections, providing physical lab dip swatches for your sign-off before commencing bulk fabric knitting.",
  },
  {
    title: "Low MOQ Starting at 50 Pieces per Style",
    content: "We support emerging fitness brands, boutique gym studios and fitness creators with an accessible 50 pcs MOQ per style/colorway across standard size runs (XS to 3XL).",
  },
];

const RELATED_SERVICES = [
  { name: "Private Label Activewear", href: "/private-label-manufacturing" },
  { name: "Sportswear Manufacturer", href: "/sportswear-manufacturer" },
  { name: "Boxing Wear Manufacturer", href: "/boxing-wear-manufacturer" },
  { name: "Custom Hoodies & Streetwear", href: "/hoodies-manufacturer" },
  { name: "USA Activewear Brands", href: "/private-label-activewear-manufacturer-usa" },
  { name: "UK Sports Brands", href: "/private-label-activewear-manufacturer-uk" },
  { name: "Europe Activewear Buyers", href: "/private-label-activewear-manufacturer-europe" },
  { name: "Startups Low MOQ Activewear", href: "/activewear-manufacturer-for-startups" },
  { name: "Full Product Catalog", href: "/products" },
];

export default function FitnessWearManufacturerPage() {
  return (
    <div className="fitness-wear-page">
      {/* Section 1: Hero (Matching Private Label Theme) */}
      <section className="pl-hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Fitness Wear Manufacturer' },
            ]}
            style={{ marginBottom: '20px' }}
          />

          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">PRIVATE LABEL ACTIVEWEAR &bull; SIALKOT, PAKISTAN</span>
              <h1>Custom Fitness Wear &amp; Activewear Manufacturer</h1>
              <p>
                Bin Rasool Enterprises is a premier OEM activewear and fitness clothing manufacturer in Sialkot, Pakistan. We engineer squat-proof leggings, supportive sports bras, seamless sets, tapered joggers and oversized gym tees for emerging fitness brands, creators and international gym chains.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '26px' }}>
                <Link href="/contact" className="btn btn-primary">
                  Request Activewear Quote
                </Link>
                <Link href="/products" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Explore Product Catalog
                </Link>
              </div>
            </div>

            <div className="pl-summary">
              <strong>Squat-Proof. Seamless. Retail-Ready.</strong>
              <p>75/25 Nylon Spandex, brushed interlock, seamless circular knitting and custom silicone branding with 50 pcs low MOQ and fast DHL sampling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Manufacturing Overview (Split Layout) */}
      <section className="section" style={{ background: '#ffffff', padding: '64px 0' }}>
        <div className="container content">
          <div className="pl-split">
            <div>
              <span className="pl-label">Activewear Engineering</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#0f172a', margin: '6px 0 14px' }}>
                Technical fitness apparel crafted for modern gym culture
              </h2>
            </div>
            <div className="pl-note">
              <p className="muted" style={{ margin: '0 0 14px', color: '#475569', fontSize: '15.5px', lineHeight: '1.75' }}>
                Activewear buyers demand garments that perform under heavy strain and look flattering on camera. We formulate our technical fabrics using micro-denier nylon and premium elastane, delivering high compressive recovery, four-way stretch and zero transparency.
              </p>
              <p className="muted" style={{ margin: 0, color: '#475569', fontSize: '15.5px', lineHeight: '1.75' }}>
                From custom woven neck labels and soft-touch satin wash care tags to branded frosted EVA zipper polybags, we handle every detail so your collection arrives retail-ready for e-commerce and Amazon FBA.
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
              Core Fitness &amp; Activewear Styles
            </h2>
            <p style={{ color: '#475569', fontSize: '15.5px', margin: 0 }}>
              Customizable with your custom tech pack, GSM specifications, colorways and private label branding.
            </p>
          </div>

          <div className="sw-category-grid">
            {FITNESS_CATEGORIES.map((cat, idx) => (
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
                    <span>View Products</span>
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
              Activewear Quality Control &amp; Construction Standards
            </h2>
            <p style={{ color: '#475569', fontSize: '15.5px', margin: 0 }}>
              Rigorous manufacturing controls implemented for luxury gym labels and high-performance fitness brands.
            </p>
          </div>

          <div className="sw-specs-stack">
            {FITNESS_SPECS.map((card, idx) => (
              <section key={idx} className="sw-spec-card">
                <h2>{card.title}</h2>
                <p>{card.content}</p>
              </section>
            ))}
          </div>

          {/* Related Collections Section */}
          <div style={{ marginTop: '64px', background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: 'var(--brand-orange, #f3a626)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1.5px', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              EXPLORE RELATED ACTIVEWEAR SERVICES
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
            <h2>Ready to develop your custom fitness wear line?</h2>
            <p>
              Send your tech packs, reference garments or moodboard. Our product development team will evaluate fabric weights, trims and provide clear sample pricing within 24 hours.
            </p>
            <div>
              <Link href="/contact" className="sw-btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Request Activewear Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Wear FAQs Section */}
      <FaqSection
        title="Fitness Wear & Leggings FAQs"
        categoryBadge="Fitness Wear"
        items={FITNESS_WEAR_FAQS}
      />
    </div>
  );
}
