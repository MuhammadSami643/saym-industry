"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import SampleOrderModal, { SampleProductInfo } from '@/app/components/SampleOrderModal';
import DownloadCatalogModal from '@/app/components/DownloadCatalogModal';
import { useCurrency } from '@/app/lib/currency';
import type { Product } from '@/app/actions';
import { ArrowRightIcon } from '@/app/components/AdminIcons';

interface ProductsCatalogClientProps {
  initialProducts: Product[];
}

export default function ProductsCatalogClient({ initialProducts }: ProductsCatalogClientProps) {
  const { formatPrice } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample modal state
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [activeSampleProduct, setActiveSampleProduct] = useState<SampleProductInfo | null>(null);

  // Line sheet catalog modal state
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [initialProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchCat =
        selectedCategory === 'all' ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  const handleOpenSampleModal = (prod?: Product) => {
    if (prod) {
      setActiveSampleProduct({
        id: String(prod.id),
        name: prod.name,
        category: prod.category,
        image: prod.image_url,
      });
    } else {
      setActiveSampleProduct(null);
    }
    setSampleModalOpen(true);
  };

  return (
    <div>
      {/* Fast Sample Guarantee Alert Strip */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0b1220 0%, #172235 100%)',
          color: '#ffffff',
          padding: '16px 20px',
          borderRadius: '12px',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid rgba(243, 166, 38, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(243, 166, 38, 0.2)',
              color: 'var(--brand-orange, #f3a626)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: '#ffffff' }}>
              Want to touch the fabric and inspect the stitching before committing to bulk?
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
              Order a physical pre-production prototype delivered via DHL Express Air. <strong>100% refundable</strong> against your bulk order!
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleOpenSampleModal()}
          className="btn btn-primary"
          style={{
            padding: '10px 22px',
            fontSize: '13px',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>Order Physical Sample</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                border: 'none',
                background:
                  selectedCategory === cat
                    ? 'var(--brand-orange, #f3a626)'
                    : '#ffffff',
                color: selectedCategory === cat ? 'var(--brand-black, #0b0b0d)' : '#475569',
                fontWeight: 700,
                fontSize: '13px',
                padding: '8px 16px',
                borderRadius: '999px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: selectedCategory === cat ? 'transparent' : '#e2e8f0',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }}
            >
              {cat === 'all' ? 'All Styles' : cat}
            </button>
          ))}
        </div>

        {/* Search Bar & Download Line Sheet CTA */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setCatalogModalOpen(true)}
            style={{
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '999px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <span>📥</span> Download 2026 Line Sheet (PDF)
          </button>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search styles, fabrics, GSM..."
              style={{
                width: '100%',
                padding: '8px 14px 8px 36px',
                border: '1px solid #cbd5e1',
                borderRadius: '999px',
                fontSize: '13px',
                background: '#ffffff',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
                fontSize: '14px',
              }}
            >
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '48px 24px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
          <h3 style={{ margin: '0 0 6px', color: '#0f172a' }}>No products match your filter</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 16px' }}>
            Looking for a custom apparel item not listed here? We manufacture anything from tech packs!
          </p>
          <button
            type="button"
            onClick={() => handleOpenSampleModal()}
            className="btn btn-primary"
            style={{ fontSize: '13px' }}
          >
            Request Custom Prototype Sample
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '26px',
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id || p.name}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  background: '#e2e8f0',
                }}
              >
                <img
                  src={p.image_url || '/images/products/1780565647_slim-fit-gym-joggers.webp'}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'var(--brand-orange, #f3a626)',
                    color: 'var(--brand-black, #0b0b0d)',
                    fontWeight: 800,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {p.category}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '12px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  ⚡ Fast DHL Sampling Available
                </div>
              </div>

              {/* Product Details */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px', color: 'var(--text-main)' }}>
                  {p.name}
                </h3>
                <p
                  className="muted"
                  style={{
                    fontSize: '13px',
                    margin: '0 0 18px',
                    flexGrow: 1,
                    lineHeight: '1.6',
                  }}
                >
                  {p.description}
                </p>

                {/* Specs / Highlights */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '14px',
                    marginBottom: '14px',
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '12px',
                    color: '#64748b',
                  }}
                >
                  <span>MOQ: <strong>50 pcs / colorway</strong></span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>✓ Custom Woven Labels</span>
                </div>

                {/* Dual Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleOpenSampleModal(p)}
                    style={{
                      background: 'rgba(243, 166, 38, 0.15)',
                      color: 'var(--brand-orange-dark, #c57608)',
                      border: '1px solid var(--brand-orange, #f3a626)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>⚡ Order Sample</span>
                  </button>

                  <Link
                    href={`/contact?product=${encodeURIComponent(p.name)}`}
                    className="btn btn-primary"
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      minHeight: 'auto',
                      fontWeight: 700,
                      textAlign: 'center',
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>Inquire Style</span>
                    <ArrowRightIcon size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Global Sample Order Modal */}
      <SampleOrderModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
        product={activeSampleProduct}
      />

      {/* Global B2B Line Sheet Download Modal */}
      <DownloadCatalogModal
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
      />
    </div>
  );
}
