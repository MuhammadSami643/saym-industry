import Link from 'next/link';
import { BLOG_POSTS } from '../lib/blogs';

export const metadata = {
  title: "Private Label Activewear & Sportswear Manufacturing Blog | Bin Rasool Enterprises",
  description: "Insights, guides, and technical advice for starting, scaling, and manufacturing private label activewear, sportswear, and boxing apparel from Sialkot, Pakistan."
};

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
              <p className="muted">
                Learn from our engineering and production specialists to build world-class fitness, fightwear, and sportswear lines.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '26px' }}>
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="card clickable-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Link href={`/blog/${post.slug}`} style={{ display: 'block', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#e2e8f0' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  />
                </Link>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ background: 'var(--brand-orange-light)', color: 'var(--brand-orange-dark)', fontWeight: 800, fontSize: '11px', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                      {post.category}
                    </span>
                    <span className="muted" style={{ fontSize: '12px' }}>
                      {post.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', margin: '0 0 12px', lineHeight: 1.35 }}>
                    <Link href={`/blog/${post.slug}`} style={{ color: 'var(--text-main)' }}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="muted" style={{ fontSize: '14px', lineHeight: 1.7, flexGrow: 1, margin: '0 0 20px' }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{post.date}</span>
                    <Link href={`/blog/${post.slug}`} style={{ fontWeight: 800, color: 'var(--brand-orange-dark)', fontSize: '13px' }}>
                      Read Article →
                    </Link>
                  </div>
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
                Contact Our Production Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
