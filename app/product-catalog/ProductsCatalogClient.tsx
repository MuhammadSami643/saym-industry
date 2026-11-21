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

  // Category counts map
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProducts.length };
    initialProducts.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
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
      {/* Simple Category Tabs & Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {/* B2B Category Filter Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  border: isSelected ? '1.5px solid #0f172a' : '1px solid #cbd5e1',
                  background: isSelected ? '#0f172a' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#334155',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '13px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            );
          })}
        </div>

        {/* Clean Minimal Search */}
        <div style={{ position: 'relative', width: '260px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search styles, fabrics..."
            style={{
              width: '100%',
              padding: '9px 12px 9px 34px',
              border: '1.5px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '13.5px',
              background: '#ffffff',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Clean Minimal Product Grid */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '48px 20px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ margin: '0 0 6px', color: '#0f172a', fontSize: '18px' }}>No styles found</h3>
          <p style={{ color: '#64748b', fontSize: '13.5px', margin: '0 0 16px' }}>
            Looking for something custom? We produce any style from your tech pack.
          </p>
          <button
            type="button"
            onClick={() => handleOpenSampleModal()}
            className="btn btn-primary"
            style={{ fontSize: '13px', padding: '8px 18px' }}
          >
            Request Custom Prototype
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id || p.name}
              style={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image Container: Clean 1:1 Square */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  background: '#f8fafc',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={p.image_url || '/images/products/1780565647_slim-fit-gym-joggers.webp'}
                  alt={p.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Product Info */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#9a3412',
                    marginBottom: '6px',
                  }}
                >
                  {p.category}
                </span>

                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 800,
                    margin: '0 0 8px',
                    color: '#0f172a',
                    lineHeight: 1.35,
                  }}
                >
                  {p.name}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    color: '#475569',
                    margin: '0 0 16px',
                    lineHeight: 1.55,
                    flexGrow: 1,
                  }}
                >
                  {p.description}
                </p>

                {/* B2B Direct Inquiry Action */}
                <button
                  type="button"
                  onClick={() => handleOpenSampleModal(p)}
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <span>Inquire This Style</span>
                  <ArrowRightIcon size={13} />
                </button>
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
