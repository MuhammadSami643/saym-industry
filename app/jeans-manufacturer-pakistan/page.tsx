import Link from 'next/link';
import FaqSection from '../components/FaqSection';
import { JEANS_DENIM_FAQS } from '../lib/faqs';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Jeans Manufacturer Pakistan | Custom Denim Jeans & Selvedge Denim Factory",
  description: "Leading custom jeans manufacturer in Pakistan. 14 oz raw selvedge denim, stretch jeans, baggy streetwear cuts, carpenter denim, enzyme stone wash, acid wash, custom leather back patches, and cast metal shank buttons for USA & European brands.",
  keywords: [
    "jeans manufacturer",
    "custom jeans manufacturer",
    "denim manufacturer",
    "selvedge denim manufacturer",
    "private label jeans",
    "denim jacket manufacturer",
    "distressed jeans manufacturer",
    "jeans manufacturer Pakistan",
    "custom jeans manufacturer low MOQ",
    "private label jeans manufacturer USA",
    "denim manufacturer Pakistan",
    "custom denim jeans manufacturer",
    "selvedge denim manufacturer Pakistan",
    "14 oz raw selvedge denim manufacturer",
    "custom denim jacket manufacturer",
    "cut and sew denim manufacturer",
    "acid wash jeans manufacturer",
    "stone wash jeans manufacturer",
    "vintage wash denim manufacturer",
    "distressed denim jeans manufacturer",
    "laser fading jeans manufacturer",
    "sustainable jeans manufacturer Pakistan",
    "organic cotton denim manufacturer",
    "recycled cotton jeans manufacturer",
    "stretch denim jeans manufacturer",
    "men’s custom jeans manufacturer",
    "women’s custom jeans manufacturer",
    "high waist jeans manufacturer wholesale",
    "baggy jeans manufacturer streetwear",
    "carpenter jeans manufacturer",
    "cargo jeans manufacturer",
    "custom leather patch jeans manufacturer",
    "embossed leather patch denim manufacturer",
    "custom metal buttons jeans manufacturer",
    "custom rivets jeans manufacturer",
    "denim manufacturer for startups",
    "jeans manufacturer Europe",
    "raw denim jeans wholesale",
    "denim sampling manufacturer",
    "jeans manufacturer tech pack to bulk",
    "Sialkot jeans manufacturer"
  ],
  alternates: {
    canonical: '/jeans-manufacturer-pakistan',
  },
  openGraph: {
    title: "Custom Jeans & Selvedge Denim Manufacturer Pakistan | Bin Rasool Enterprises",
    description: "Export denim manufacturer for raw selvedge, stone-washed baggy jeans, cargo denim, and custom jackets in Pakistan.",
    url: "/jeans-manufacturer-pakistan",
    images: [{ url: "/images/categories/1776540327_jeans.webp", width: 1200, height: 630 }],
  },
};

export default function JeansPage() {
  return (
    <div className="category-landing-page">
      <section className="hero" style={{ padding: '80px 0 60px' }}>
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/products' },
              { label: 'Jeans & Denim Manufacturer' },
            ]}
          />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '16px 0 12px' }}>
            Jeans Manufacturer Pakistan &amp; Custom Denim Apparel Factory
          </h1>
          <p style={{ maxWidth: '820px', color: '#cbd5e1', fontSize: '18px', margin: 0 }}>
            OEM private label jeans manufacturer in Pakistan. We specialize in 14 oz raw selvedge denim, stretch slim jeans, baggy 90s streetwear cuts, cargo and carpenter jeans, denim jackets, enzyme stone washes, laser whiskering, and custom embossed leather patches with low MOQs.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request Denim Tech Pack Quote
            </Link>
            <Link href="/products" className="btn btn-outline">
              View Denim Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="home-kicker">Industrial Laundry &amp; Cut &amp; Sew</span>
              <h2 style={{ margin: '8px 0 16px' }}>Authentic Denim Washes, Selvedge Looms &amp; Custom Hardware</h2>
              <p className="muted" style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '20px' }}>
                Full-package custom denim manufacturing from sustainable BCI and organic cotton yarns to shuttle-loom selvedge denim, eco-friendly laser fading, ozone washing, and custom-cast shank buttons and rivets.
              </p>
              <ul className="list" style={{ color: 'var(--text-main)', lineHeight: '1.9', marginBottom: '26px' }}>
                <li><strong>14 oz Raw Selvedge Denim Jeans</strong> – Authentic red-line and rainbow selvedge woven on shuttle looms.</li>
                <li><strong>Streetwear Baggy, Carpenter &amp; Cargo Jeans</strong> – Relaxed skate cuts with hammer loops, utility tool pockets, and triple-stitched outer seams.</li>
                <li><strong>Enzyme Stone Wash, Acid Wash &amp; Vintage Distressed Finishes</strong> – Sustainable laser fading and artisanal hand-scraped abrasions.</li>
                <li><strong>Custom Embossed Genuine Leather Back Patches</strong> – Full-grain cowhide or faux leather patches with branded foil or debossed stamping.</li>
                <li><strong>Anti-Rust Copper Rivets &amp; Branded Cast Metal Buttons</strong> – Custom logo alloy shank buttons, zip flies with YKK brass zippers.</li>
                <li><strong>Custom Denim Jackets &amp; Vests</strong> – Classic trucker jackets, sherpa-lined denim jackets, and oversized drop-shoulder denim outerwear.</li>
              </ul>
              <Link href="/contact" className="btn btn-primary">
                Inquire About Custom Denim Production
              </Link>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/categories/1789894942_streetwear.webp"
                alt="Custom Denim Jeans Manufacturing"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px' }}>
                <span className="card-tag">Export Quality Denim</span>
                <h3 style={{ margin: '8px 0 6px' }}>Full Denim Laundry</h3>
                <p className="muted" style={{ margin: 0, fontSize: '14px' }}>
                  Custom hardware, pocket prints, and bespoke distressing techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Custom Jeans &amp; Denim Manufacturing FAQs"
        categoryBadge="Denim &amp; Jeans"
        items={JEANS_DENIM_FAQS}
      />
    </div>
  );
}
