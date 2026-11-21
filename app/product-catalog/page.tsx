import { getProducts } from '../actions';
import Link from 'next/link';
import ProductsCatalogClient from './ProductsCatalogClient';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import ProductCatalogJsonLd from '../components/ProductCatalogJsonLd';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Private Label Activewear & Apparel Product Catalog | Bin Rasool Enterprises",
  description: "Browse custom fitness wear, gym joggers, high-waist compression leggings, sportswear tracksuits, boxing apparel and premium streetwear hoodies manufactured by Bin Rasool Enterprises in Sialkot, Pakistan. Fast physical DHL pre-production sampling available.",
  alternates: {
    canonical: '/product-catalog',
  },
  openGraph: {
    title: "Apparel Product Catalog | Bin Rasool Enterprises Sialkot",
    description: "Browse factory-direct custom activewear, streetwear, combat gear and denim manufactured with private label branding.",
    url: "/product-catalog",
    images: [{ url: "/images/products/1780565647_slim-fit-gym-joggers.webp", width: 1200, height: 630 }],
  },
};

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="products-page">
      <ProductCatalogJsonLd products={products} />
      {/* Header Banner */}
      <section className="hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product Catalog' },
            ]}
            style={{ marginBottom: '20px' }}
          />
          <div className="pl-hero-grid">
            <div>
              <span className="pl-kicker">FACTORY DIRECT PRODUCT SHOWCASE &bull; SIALKOT, PAKISTAN</span>
              <h1>Private Label Activewear &amp; Apparel Catalog</h1>
              <p>
                Explore our custom manufacturing options across fitness wear, sports performance apparel, fight gear and heavyweight streetwear. All styles are customizable with low MOQs, custom branding and fast DHL pre-production sampling.
              </p>
            </div>
            <div className="pl-summary">
              <strong>Turnkey Private Label</strong>
              <p>Full-package apparel manufacturing: custom neck labels, 400 GSM hangtags, frosted EVA polybags and DHL Express sampling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="home-kicker">Custom Production Showcase</span>
              <h2 style={{ marginTop: '8px' }}>Available Activewear &amp; Garment Styles</h2>
              <p className="muted">
                Each product is custom built to your technical specifications, fabric blend, GSM, colors, size chart and private label branding.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/linesheet" className="btn btn-outline" style={{ background: '#fff', borderColor: '#cbd5e1' }}>
                📄 View 2026 Line Sheet (PDF)
              </Link>
              <Link href="/contact-us" className="btn btn-primary">
                Request a Custom Quote
              </Link>
            </div>
          </div>

          {/* Interactive Products Grid with Fast Sample Ordering Modal */}
          <ProductsCatalogClient initialProducts={products} />

          {/* Quick CTA Box */}
          <div className="home-cta" style={{ marginTop: '64px' }}>
            <div>
              <span className="home-kicker">Start Your Line</span>
              <h2>Have custom tech packs or specific design requirements?</h2>
              <p>
                We produce custom apparel beyond this catalog. Send us your mockups, tech packs or reference samples for a detailed manufacturing review.
              </p>
            </div>
            <div className="home-cta-actions">
              <Link href="/contact-us" className="btn btn-primary">
                Get a Custom Quote
              </Link>
              <Link href="/track-order" className="btn btn-secondary">
                Track Sample Order
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
