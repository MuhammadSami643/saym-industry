import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BLOG_POSTS, getBlogPost } from '../../lib/blogs';
import { ArrowRightIcon } from '../../components/AdminIcons';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Bin Rasool Enterprises',
    };
  }

  return {
    title: `${post.title} | Bin Rasool Enterprises`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="blog-post-page">
      {/* Article Header */}
      <section className="hero" style={{ padding: '80px 0 50px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="breadcrumbs" style={{ color: '#cbd5e1' }}>
            <Link href="/" style={{ color: 'var(--brand-orange)' }}>Home</Link> /{' '}
            <Link href="/blog" style={{ color: 'var(--brand-orange)' }}>Blog</Link> /{' '}
            <span>{post.category}</span>
          </div>

          <div style={{ marginTop: '16px', marginBottom: '14px' }}>
            <span
              style={{
                background: 'var(--brand-orange-light)',
                color: 'var(--brand-orange-dark)',
                fontWeight: 800,
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              {post.category}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3.1rem)', margin: '0 0 16px', lineHeight: 1.15 }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: '#cbd5e1', fontSize: '14px', flexWrap: 'wrap' }}>
            <span>By <strong>{post.author}</strong></span>
            <span>&bull;</span>
            <span>Published {post.date}</span>
            <span>&bull;</span>
            <span>⏱️ {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="section" style={{ background: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          
          {/* Featured Image */}
          <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '14px', marginBottom: '40px', boxShadow: 'var(--shadow)' }}>
            <img
              src={post.image}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Excerpt Lead */}
          <div
            style={{
              padding: '24px 28px',
              borderLeft: '4px solid var(--brand-orange)',
              background: 'var(--bg-light)',
              borderRadius: '0 10px 10px 0',
              fontSize: '18px',
              lineHeight: 1.7,
              fontWeight: 500,
              color: 'var(--text-main)',
              marginBottom: '40px'
            }}
          >
            {post.excerpt}
          </div>

          {/* Article Paragraphs */}
          <div style={{ fontSize: '16px', lineHeight: 1.85, color: '#334155' }}>
            {post.content.map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                const [heading, ...rest] = paragraph.replace('### ', '').split('\n');
                return (
                  <div key={idx} style={{ marginTop: '36px', marginBottom: '18px' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 12px' }}>
                      {heading}
                    </h2>
                    {rest.length > 0 && <p style={{ margin: 0 }}>{rest.join('\n')}</p>}
                  </div>
                );
              }

              if (paragraph.includes('* **')) {
                const lines = paragraph.split('\n').filter(Boolean);
                return (
                  <div key={idx} style={{ margin: '24px 0' }}>
                    <ul style={{ paddingLeft: '22px', display: 'grid', gap: '10px' }}>
                      {lines.map((line, lIdx) => {
                        const clean = line.replace(/^\*\s*/, '');
                        return (
                          <li key={lIdx} style={{ color: '#1e293b' }}>
                            <span dangerouslySetInnerHTML={{ __html: clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }

              return (
                <p key={idx} style={{ marginBottom: '22px' }}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-muted)', alignSelf: 'center' }}>
              Topics:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'var(--bg-soft)',
                  color: 'var(--text-main)',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Card */}
          <div
            style={{
              marginTop: '40px',
              padding: '24px',
              borderRadius: '12px',
              background: 'var(--bg-light)',
              border: '1px solid var(--border)',
              display: 'flex',
              gap: '20px',
              alignItems: 'center'
            }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--brand-orange)', color: '#000', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: '20px', flexShrink: 0 }}>
              BRE
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 800 }}>
                Bin Rasool Enterprises Technical Merchandising
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Direct manufacturing team located in Sialkot, Pakistan. We guide startup activewear brands and established international labels through low MOQ production, fabric sourcing, and export delivery.
              </p>
            </div>
          </div>

          {/* Bottom Callout Banner */}
          <div className="home-cta" style={{ marginTop: '54px' }}>
            <div>
              <span className="home-kicker">Start Production</span>
              <h2>Ready to build your activewear collection?</h2>
              <p>
                Get direct factory pricing, low MOQ advice, and a custom sample development plan matched to your target delivery date.
              </p>
            </div>
            <div className="home-cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Request a Factory Quote
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div style={{ marginTop: '64px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Related Manufacturing Guides</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="card clickable-card"
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-orange-dark)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {rel.category}
                  </span>
                  <h4 style={{ margin: '0 0 8px', fontSize: '15px', color: 'var(--text-main)', lineHeight: 1.4 }}>
                    {rel.title}
                  </h4>
                  <span style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--brand-orange-dark)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span>Read Guide</span>
                    <ArrowRightIcon size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </article>
  );
}

