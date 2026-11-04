import Link from 'next/link';

export const metadata = {
  title: "Private Label Activewear & Sportswear Manufacturing Blog | ZYPFIT",
  description: "Insights, guides, and technical advice for starting, scaling, and manufacturing private label activewear, sportswear, and boxing apparel from Sialkot, Pakistan."
};

const POSTS = [
  {
    title: "How to Find a Private Label Sportswear Manufacturer in Pakistan",
    category: "Sourcing Guide",
    date: "October 2026",
    excerpt: "Key factors to evaluate when selecting a factory in Sialkot: minimum order quantities, fabric capabilities, sampling turnaround, and export certifications."
  },
  {
    title: "Activewear Branding Options: Logos, Labels, Tags and Packaging",
    category: "Branding",
    date: "October 2026",
    excerpt: "A complete walkthrough of silicone heat transfers, high-density prints, woven neck labels, custom hangtags, and branded poly mailers for fitness apparel."
  },
  {
    title: "How to Prepare a Tech Pack for Activewear Manufacturing",
    category: "Product Development",
    date: "September 2026",
    excerpt: "What information your factory needs to cut patterns accurately: grade rules, flat sketches, stitch specifications, and bill of materials (BOM)."
  },
  {
    title: "Boxing Wear Manufacturer Pakistan: Shorts, Rash Guards and Fightwear",
    category: "Boxing Wear",
    date: "September 2026",
    excerpt: "Behind the scenes of manufacturing custom fight shorts, satin robes, sublimated BJJ rash guards, and training gloves in Sialkot."
  },
  {
    title: "Sublimation Sportswear Manufacturing: Artwork, Fabric and Teamwear Tips",
    category: "Sportswear",
    date: "August 2026",
    excerpt: "How dye sublimation locks vibrant colors and complex patterns directly into performance polyester without peeling or cracking."
  },
  {
    title: "Compression Wear Manufacturer Guide for Fitness and Training Brands",
    category: "Fitness Wear",
    date: "August 2026",
    excerpt: "Selecting the ideal Nylon/Spandex ratios, 4-way stretch fabrics, and flatlock anti-chafing stitching for high-performance workout gear."
  }
];

export default function BlogPage() {
  return (
    <div className="blog-page">
      {/* Hero Header */}
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <div className="breadcrumbs" style={{ color: '#cbd5e1' }}>
            <Link href="/" style={{ color: 'var(--brand-orange)' }}>Home</Link> / <span>Blog</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Private Label Activewear &amp; Sportswear Blog
          </h1>
          <p style={{ maxWidth: '780px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            Practical manufacturing guides, tech pack preparation tips, fabric selection advice, and industry insights directly from our apparel workshop in Sialkot, Pakistan.
          </p>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="home-kicker">Industry Insights</span>
              <h2 style={{ marginTop: '8px' }}>Manufacturing Guides for Growing Brands</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '26px' }}>
            {POSTS.map((post, idx) => (
              <article key={idx} className="card clickable-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ background: 'var(--brand-orange-light)', color: 'var(--brand-orange-dark)', fontWeight: 800, fontSize: '12px', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                    {post.category}
                  </span>
                  <span className="muted" style={{ fontSize: '13px' }}>
                    {post.date}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 12px', lineHeight: 1.35 }}>
                  {post.title}
                </h3>
                <p className="muted" style={{ fontSize: '14px', lineHeight: 1.7, flexGrow: 1, margin: '0 0 20px' }}>
                  {post.excerpt}
                </p>
                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <Link href="/contact" style={{ fontWeight: 700, color: 'var(--brand-orange-dark)', fontSize: '14px' }}>
                    Discuss this production topic →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Box */}
          <div className="home-cta" style={{ marginTop: '64px' }}>
            <div>
              <span className="home-kicker">Need Custom Guidance?</span>
              <h2>Ready to talk with an experienced activewear manufacturing specialist?</h2>
              <p>
                Whether you need low MOQs, fabric recommendations, or a custom sampling quote, we are here to assist.
              </p>
            </div>
            <div className="home-cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

