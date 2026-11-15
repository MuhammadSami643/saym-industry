"use client";

import { useState } from 'react';
import { Product } from '../../actions';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function ProductManagerClient({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          category: formData.get('category'),
          description: formData.get('description'),
          image_url: formData.get('image_url')
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Failed to add product');
      } else {
        if (data.data) {
          setProducts(prev => [data.data, ...prev]);
        }
        setIsAdding(false);
        form.reset();
        router.refresh();
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Error adding product');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product from the catalog?")) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting product');
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'Streetwear':
        return { bg: 'rgba(0, 229, 153, 0.12)', color: '#00e599', border: 'rgba(0, 229, 153, 0.25)' };
      case 'Fitness Wear':
        return { bg: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: 'rgba(56, 189, 248, 0.25)' };
      case 'Boxing Wear':
        return { bg: 'rgba(248, 113, 113, 0.12)', color: '#f87171', border: 'rgba(248, 113, 113, 0.25)' };
      default:
        return { bg: 'rgba(251, 191, 36, 0.12)', color: '#fbbf24', border: 'rgba(251, 191, 36, 0.25)' };
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: '40px' }}
    >
      {/* 1. Header & Quick Actions */}
      <motion.div
        variants={itemVariants}
        style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00e599' }}>
              GLOBAL EXPORT CATALOG &bull; SUPABASE REST
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599', boxShadow: '0 0 8px #00e599' }} />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Garment Styles &amp; Product Specification
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Manage active export silhouettes, tech specs, fabric blends, and buyer presentation cards.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          style={{
            background: isAdding ? '#1e293b' : '#00e599',
            color: isAdding ? '#ffffff' : '#05140d',
            fontWeight: 800,
            fontSize: '13px',
            padding: '9px 18px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: isAdding ? 'none' : '0 0 16px rgba(0, 229, 153, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
          }}
        >
          {isAdding ? '✕ Cancel' : '+ Add New Style'}
        </button>
      </motion.div>

      {/* 2. 4-Column KPI Stats Strip */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}
      >
        <div style={{ background: '#11171a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
            TOTAL CATALOG STYLES
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            {products.length}
          </div>
          <div style={{ fontSize: '11.5px', color: '#00e599', fontWeight: 700 }}>
            Active on live B2B showroom
          </div>
        </div>

        <div style={{ background: '#11171a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
            ACTIVE CATEGORIES
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#38bdf8', margin: '4px 0 2px' }}>
            4 Lines
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b' }}>
            Streetwear, Active, Combat, Sport
          </div>
        </div>

        <div style={{ background: '#11171a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
            SAMPLE LEAD TIME
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#fbbf24', margin: '4px 0 2px' }}>
            7 Days
          </div>
          <div style={{ fontSize: '11.5px', color: '#fbbf24', fontWeight: 700 }}>
            Rapid prototype turnaround
          </div>
        </div>

        <div style={{ background: '#11171a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
            STANDARD BULK MOQ
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#00e599', margin: '4px 0 2px' }}>
            50 Pcs
          </div>
          <div style={{ fontSize: '11.5px', color: '#00e599', fontWeight: 700 }}>
            Custom dye &amp; private label
          </div>
        </div>
      </motion.div>

      {/* 3. Add Product Modal Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleAdd}
            style={{
              background: '#11171a',
              border: '1px solid rgba(0, 229, 153, 0.4)',
              borderRadius: '14px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), 0 0 20px rgba(0, 229, 153, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px', color: '#ffffff' }}>
                  Register New Style Specification
                </h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '12.5px' }}>
                  Directly saved to PostgreSQL / Supabase storage backend.
                </p>
              </div>
              <span style={{ fontSize: '11px', background: 'rgba(0, 229, 153, 0.12)', color: '#00e599', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                SPEC READY
              </span>
            </div>

            {errorMsg && (
              <div style={{ background: 'rgba(248, 113, 113, 0.12)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#f87171', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Heavyweight Boxy T-Shirt"
                  style={{
                    width: '100%',
                    background: '#090d0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>Category *</label>
                <select
                  name="category"
                  required
                  style={{
                    width: '100%',
                    background: '#090d0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                >
                  <option value="Fitness Wear">Fitness Wear</option>
                  <option value="Sports Wear">Sports Wear</option>
                  <option value="Boxing Wear">Boxing Wear</option>
                  <option value="Streetwear">Streetwear</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>Image URL or Path</label>
              <input
                type="text"
                name="image_url"
                placeholder="/images/products/1780565647_slim-fit-gym-joggers.webp or https://..."
                defaultValue="/images/products/1780565647_slim-fit-gym-joggers.webp"
                style={{
                  width: '100%',
                  background: '#090d0f',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>Description &amp; Fabric Specs</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Product details, fabric blend (e.g. 100% Organic Ring-Spun Cotton 280 GSM), stitching, and fit."
                style={{
                  width: '100%',
                  background: '#090d0f',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#00e599',
                color: '#05140d',
                fontWeight: 800,
                fontSize: '13px',
                padding: '10px 22px',
                borderRadius: '8px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Saving to Database...' : 'Save Product via API'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* 4. Filter Strip & Search */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['All', 'Streetwear', 'Fitness Wear', 'Sports Wear', 'Boxing Wear'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#1e293b' : '#11171a',
                color: selectedCategory === cat ? '#00e599' : '#94a3b8',
                border: selectedCategory === cat ? '1px solid rgba(0, 229, 153, 0.3)' : '1px solid rgba(255, 255, 255, 0.07)',
                fontSize: '12px',
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Search style name or spec..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: '#11171a',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '9999px',
              padding: '7px 14px 7px 32px',
              fontSize: '12.5px',
              color: '#ffffff',
              outline: 'none',
            }}
          />
          <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '13px' }}>
            🔍
          </span>
        </div>
      </motion.div>

      {/* 5. Dark Obsidian Products Table */}
      <motion.div
        variants={itemVariants}
        style={{
          background: '#11171a',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#0d1316', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#64748b' }}>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PREVIEW</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PRODUCT TITLE</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CATEGORY</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SPECIFICATION &amp; FABRIC</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    No matching products found. Click &ldquo;+ Add New Style&rdquo; to add one.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const badge = categoryBadgeStyle(p.category);
                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 153, 0.03)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '12px 18px' }}>
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            background: '#090d0f',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          <img
                            src={p.image_url || '/images/products/1780565647_slim-fit-gym-joggers.webp'}
                            alt={p.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: '12px 18px', fontWeight: 700, color: '#ffffff' }}>
                        {p.name}
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <span
                          style={{
                            background: badge.bg,
                            color: badge.color,
                            border: `1px solid ${badge.border}`,
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 9px',
                            borderRadius: '9999px',
                          }}
                        >
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', color: '#94a3b8', maxWidth: '340px', fontSize: '12.5px', lineHeight: '1.4' }}>
                        {p.description || 'Custom fabric spec available upon tech pack review.'}
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(p.id!)}
                          style={{
                            background: 'rgba(248, 113, 113, 0.1)',
                            color: '#f87171',
                            border: '1px solid rgba(248, 113, 113, 0.25)',
                            padding: '5px 12px',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '11.5px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
