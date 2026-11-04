"use client";

import { useState } from 'react';
import { Product } from '../../actions';
import { useRouter } from 'next/navigation';

export default function ProductManagerClient({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    if (!confirm("Are you sure you want to delete this product?")) {
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

  return (
    <div>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#111827' }}>
            Catalog Products Management
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Powered by backend REST API (<code>/api/products</code>) connected to Supabase.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn btn-primary"
          style={{ fontSize: '14px', padding: '10px 20px', minHeight: '40px' }}
        >
          {isAdding ? '✕ Cancel' : '+ Add New Product'}
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleAdd}
          style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '12px',
            marginBottom: '32px',
            border: '2px solid var(--brand-orange, #f3a626)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.06)'
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 16px', color: '#111827' }}>
            Add New Product to Catalog
          </h2>

          {errorMsg && (
            <div style={{ background: '#fef2f2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
              {errorMsg}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>Product Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Heavyweight Boxy T-Shirt"
                className="form-control"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>Category *</label>
              <select name="category" required className="form-control">
                <option value="Fitness Wear">Fitness Wear</option>
                <option value="Sports Wear">Sports Wear</option>
                <option value="Boxing Wear">Boxing Wear</option>
                <option value="Streetwear">Streetwear</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>Image URL or Path</label>
            <input
              type="text"
              name="image_url"
              placeholder="/images/products/1780565647_slim-fit-gym-joggers.webp or https://..."
              defaultValue="/images/products/1780565647_slim-fit-gym-joggers.webp"
              className="form-control"
            />
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Tip: You can use existing local images: <code>/images/products/1780565647_slim-fit-gym-joggers.webp</code> or category images.
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Product details, fabric blend (e.g. 80% Nylon 20% Spandex), features, and fit."
              className="form-control"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ padding: '10px 24px', minHeight: '42px', fontSize: '14px' }}
          >
            {loading ? 'Saving via API...' : 'Save Product via Backend API'}
          </button>
        </form>
      )}

      {/* Products Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', color: '#64748b' }}>
              <th style={{ padding: '14px 20px', fontWeight: 600 }}>Image</th>
              <th style={{ padding: '14px 20px', fontWeight: 600 }}>Product Title</th>
              <th style={{ padding: '14px 20px', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '14px 20px', fontWeight: 600 }}>Description</th>
              <th style={{ padding: '14px 20px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                  No products found in database. Click &ldquo;+ Add New Product&rdquo; above.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ width: '54px', height: '54px', borderRadius: '8px', overflow: 'hidden', background: '#e2e8f0' }}>
                      <img
                        src={p.image_url || '/images/products/1780565647_slim-fit-gym-joggers.webp'}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0f172a' }}>
                    {p.name}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        background: 'var(--brand-orange-light, #fff1d6)',
                        color: 'var(--brand-orange-dark, #9a5b00)',
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '999px'
                      }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', color: '#64748b', maxWidth: '300px', fontSize: '13px', lineHeight: '1.5' }}>
                    {p.description}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(p.id!)}
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
