import Link from 'next/link';
import FaqSection from '../components/FaqSection';

export const metadata = {
  title: "About Bin Rasool Enterprises | Private Label Fitness, Sportswear & Boxing Manufacturer",
  description: "Learn about Bin Rasool Enterprises, a private label activewear, fitness wear, sportswear, and boxing apparel manufacturer in Sialkot, Pakistan serving international buyers with low MOQs and export quality."
};

const ABOUT_FAQS = [
  {
    question: "What kind of manufacturer is Bin Rasool Enterprises?",
    answer: "Bin Rasool Enterprises is a Sialkot-based apparel manufacturer focused on sportswear, fitness wear, boxing wear, activewear, and private label production for international buyers."
  },
  {
    question: "Who does Bin Rasool Enterprises work with?",
    answer: "We work with startup brands, growing labels, wholesalers, online sellers, gyms, clubs, and import buyers looking for category-focused apparel manufacturing."
  },
  {
    question: "What makes Bin Rasool Enterprises different for buyers?",
    answer: "Our positioning emphasizes focused apparel categories, clearer communication, practical sampling, private label support, and export-ready production handling."
  },
  {
    question: "Can Bin Rasool Enterprises help with branding and packaging?",
    answer: "Yes. We support private label details such as custom labels, hang tags, packaging, logo application, and product presentation for buyer-ready collections."
  },
  {
    question: "Is Bin Rasool Enterprises suitable for repeat production orders?",
    answer: "Yes. The manufacturing approach is designed for buyers who want a dependable partner for sampling, bulk production, quality checks, and long-term order continuity."
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
            <nav aria-label="Breadcrumb" className="breadcrumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>About Us</span>
            </nav>

            <div className="about-kicker">
              PRIVATE LABEL MANUFACTURER &nbsp;&bull;&nbsp; SIALKOT
            </div>

            <h1>About Bin Rasool Enterprises: Private Label Fitness, Sportswear &amp; Boxing Manufacturer</h1>
            <p>
              Bin Rasool Enterprises manufactures fitness wear, sportswear, boxing wear, and custom activewear for brands, wholesalers,
              gyms, clubs, and online sellers. From Sialkot, Pakistan, we support private label production, flexible
              MOQ planning, clear sampling, and export support for buyers who need a dependable apparel partner.
            </p>

            <div className="about-metrics" aria-label="Bin Rasool Enterprises manufacturing highlights">
              <div className="about-metric">
                <strong>3 Core Lines</strong>
                <span>Fitness, sports, and boxing wear</span>
              </div>
              <div className="about-metric">
                <strong>Private Label</strong>
                <span>Tags, labels, packaging, branding</span>
              </div>
              <div className="about-metric">
                <strong>Flexible MOQ</strong>
                <span>Support for startups and wholesalers</span>
              </div>
              <div className="about-metric">
                <strong>Export Focus</strong>
                <span>Built for international buyers</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Who We Are */}
        <section className="section about-band">
          <div className="container content">
            <div className="about-split">
              <div>
                <span className="about-section-label">Who We Are</span>
                <h2>A focused sportswear, fitness wear, and boxing wear manufacturer</h2>
              </div>
              <div className="about-panel">
                <p className="muted">
                  Bin Rasool Enterprises is not trying to manufacture every type of garment. We are focused on performance apparel
                  categories where buyers need strong materials, practical construction, clear sizing, and consistent
                  finishing. Our main categories include gym joggers, hoodies, leggings, activewear sets, dry-fit gym
                  t-shirts, soccer jerseys, basketball uniforms, tracksuits, team uniforms, boxing shorts, rash
                  guards, fight wear, and combat sports clothing.
                </p>
                <p className="muted">
                  This focused approach helps us speak directly to private label brands, sports clubs, fitness
                  businesses, boxing gyms, importers, and wholesale buyers searching for a reliable sportswear
                  manufacturer in Sialkot, Pakistan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Mission & Values */}
        <section className="section">
          <div className="container content">
            <div className="about-mission-wrap">
              <div className="about-mission-statement">
                <span className="about-section-label" style={{ color: 'var(--brand-orange, #f3a626)' }}>Our Mission</span>
                <h2>To help apparel buyers build reliable private label collections from Sialkot</h2>
                <p>
                  Our mission is to make sportswear, fitness wear, and boxing wear sourcing easier for brands that
                  need clear communication, practical product guidance, sample discipline, and export-ready
                  production. We want buyers to feel confident before they start bulk manufacturing.
                </p>
              </div>

              <div className="about-mission-grid">
                <article className="about-mission-card">
                  <span>01</span>
                  <h3>Our Vision</h3>
                  <p className="muted">
                    To become a trusted Pakistan apparel manufacturing partner for startup brands, wholesalers,
                    gyms, clubs, and online sellers looking for focused sportswear categories.
                  </p>
                </article>
                <article className="about-mission-card">
                  <span>02</span>
                  <h3>Our Promise</h3>
                  <p className="muted">
                    We keep the process practical: understand the product, confirm materials, prepare samples,
                    manage branding details, and keep buyers updated through production.
                  </p>
                </article>
                <article className="about-mission-card">
                  <span>03</span>
                  <h3>Our Standard</h3>
                  <p className="muted">
                    Every order should be reviewed for fit direction, stitching, trims, labels, finishing,
                    packing, and presentation before dispatch.
                  </p>
                </article>
                <article className="about-mission-card">
                  <span>04</span>
                  <h3>Our Focus</h3>
                  <p className="muted">
                    We stay focused on fitness wear, sportswear, boxing wear, activewear, teamwear, and private
                    label apparel so buyers get category-specific support.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* 4. What We Manufacture */}
        <section className="section" style={{ background: 'var(--bg-light)' }}>
          <div className="container content">
            <span className="about-section-label">What We Manufacture</span>
            <h2>Category expertise for brand-ready apparel collections</h2>
            <p className="muted" style={{ maxWidth: '820px' }}>
              Every buyer comes with a different target market, price point, fabric requirement, and branding plan. Bin Rasool Enterprises
              helps turn those requirements into clear product direction before bulk production starts.
            </p>

            <div className="about-focus-grid">
              <article className="about-focus">
                <h3>Fitness Wear Manufacturing</h3>
                <p className="muted">Private label gym wear, activewear sets, leggings, joggers, hoodies, compression wear,
                  and dry-fit training t-shirts for fitness brands and online stores.</p>
                <Link href="/fitness-wear-manufacturer">Explore Fitness Wear &rarr;</Link>
              </article>
              <article className="about-focus">
                <h3>Sportswear Manufacturing</h3>
                <p className="muted">Custom teamwear, soccer jerseys, basketball uniforms, tracksuits, training wear,
                  sublimation sportswear, and club uniforms for wholesale buyers.</p>
                <Link href="/sportswear-manufacturer-exporter">Explore Sports Wear &rarr;</Link>
              </article>
              <article className="about-focus">
                <h3>Boxing Wear Manufacturing</h3>
                <p className="muted">Boxing shorts, fight wear apparel, rash guards, combat sports clothing, and training
                  tops for fight brands, boxing gyms, MMA, and BJJ markets.</p>
                <Link href="/boxing-gear-manufacturer-bulk">Explore Boxing Wear &rarr;</Link>
              </article>
            </div>
          </div>
        </section>

        {/* 5. How We Work */}
        <section className="section">
          <div className="container content">
            <div className="about-split">
              <div>
                <span className="about-section-label">How We Work</span>
                <h2>From product idea to export-ready manufacturing</h2>
                <p className="muted">
                  International buyers want more than a product list. They need a manufacturer that understands
                  communication, samples, branding details, quality checks, packing, and production timing. Bin Rasool Enterprises is
                  being built around that buyer experience.
                </p>
              </div>
              <div className="about-process">
                <div className="about-process-item">
                  <h3>Requirement Review</h3>
                  <p className="muted">We review product references, fabric direction, sizes, branding requirements,
                    quantity, and target market before suggesting the right production route.</p>
                </div>
                <div className="about-process-item">
                  <h3>Sampling &amp; Fit Direction</h3>
                  <p className="muted">Samples help confirm fabric, construction, measurements, print or embroidery
                    placement, labels, and finishing before bulk production.</p>
                </div>
                <div className="about-process-item">
                  <h3>Private Label Setup</h3>
                  <p className="muted">We support custom neck labels, woven labels, hang tags, packaging, logo placement,
                    embroidery, screen printing, heat transfer, and sublimation.</p>
                </div>
                <div className="about-process-item">
                  <h3>Production &amp; Quality Checks</h3>
                  <p className="muted">Bulk orders move through cutting, stitching, checking, finishing, and packing with
                    attention to sizing, construction, and export presentation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Why Buyers Choose BRE */}
        <section className="section" style={{ background: 'var(--bg-light)' }}>
          <div className="container content">
            <div className="about-split">
              <div>
                <span className="about-section-label">Why Buyers Choose Bin Rasool Enterprises</span>
                <h2>Manufacturing support for startups, wholesalers, and growing brands</h2>
              </div>
              <div>
                <ul className="list muted">
                  <li>Focused manufacturer for sportswear, fitness wear, activewear, boxing wear, and combat sports apparel.</li>
                  <li>Private label support for custom branding, labels, trims, packaging, and product presentation.</li>
                  <li>Flexible MOQ options for startup brands, online sellers, gyms, clubs, and wholesale buyers.</li>
                  <li>Export-minded communication for buyers sourcing apparel from Sialkot, Pakistan.</li>
                  <li>Product development support from sample planning to final packing and dispatch preparation.</li>
                </ul>
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
                <p>Share your product category, quantity, reference images, and branding needs. We will guide you toward
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
