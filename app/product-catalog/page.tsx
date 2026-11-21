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
      {/* Simple Clean Header */}
      <section style={{ padding: '36px 0 24px', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Product Catalog' },
            ]}
            style={{ marginBottom: '14px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#7c2d12', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                DIRECT SIALKOT FACTORY SHOWCASE
              </span>
              <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                Product Catalog
              </h1>
              <p style={{ fontSize: '15px', color: '#334155', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
                Custom activewear, streetwear, combat gear and team uniforms manufactured with private label branding and low 50 pcs MOQ.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/linesheet" className="btn btn-outline" style={{ padding: '9px 18px', fontSize: '13.5px', background: '#fff', color: '#0f172a', borderColor: '#cbd5e1', fontWeight: 700 }}>
                📄 PDF Line Sheet
              </Link>
              <Link href="/contact-us" className="btn btn-primary" style={{ padding: '9px 20px', fontSize: '13.5px', fontWeight: 700 }}>
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section style={{ background: '#f8fafc', padding: '32px 0 64px' }}>
        <div className="container">
          <ProductsCatalogClient initialProducts={products} />
        </div>
      </section>
    </div>
  );
}
