"use client";

import { useState } from 'react';
import { Inquiry } from '../../actions';

export default function InquiriesManagerClient({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [filter, setFilter] = useState<string>('all');

  const filtered = inquiries.filter(inq => {
    if (filter === 'all') return true;
    return inq.status?.toLowerCase() === filter.toLowerCase();
  });

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update status');
      }
    } catch (e: any) {
      alert(e.message || 'Error updating status');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete inquiry');
      }
    } catch (e: any) {
      alert(e.message || 'Error deleting inquiry');
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#111827' }}>
            Customer Inquiries &amp; Quote Requests
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Powered by backend REST API (<code>/api/inquiries</code>) with Supabase persistence.
          </p>
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'new', 'contacted', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              style={{
                background: filter === st ? 'var(--brand-orange, #f3a626)' : '#fff',
                color: filter === st ? '#000' : '#475569',
                border: '1px solid #cbd5e1',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'capitalize',
                cursor: 'pointer'
              }}
            >
              {st} ({st === 'all' ? inquiries.length : inquiries.filter(i => (i.status || 'new').toLowerCase() === st).length})
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '18px' }}>
        {filtered.length === 0 ? (
          <div style={{ background: '#fff', padding: '48px', textAlign: 'center', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
            <h3 style={{ margin: '0 0 8px' }}>No inquiries in this category</h3>
            <p style={{ color: '#64748b', margin: 0 }}>
              All new submissions from the contact form appear here via <code>POST /api/contact</code>.
            </p>
          </div>
        ) : (
          filtered.map((inq, idx) => (
            <div
              key={inq.id || idx}
              style={{
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                      {inq.name}
                    </h2>

                    {/* Status Dropdown */}
                    <select
                      value={inq.status || 'new'}
                      onChange={(e) => inq.id && handleStatusChange(inq.id, e.target.value)}
                      style={{
                        background: 'var(--brand-orange-light, #fff1d6)',
                        color: 'var(--brand-orange-dark, #9a5b00)',
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="completed">Status: Completed</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '13px', color: '#64748b' }}>
                    <span>✉️ <a href={`mailto:${inq.email}`} style={{ color: '#2563eb' }}>{inq.email}</a></span>
                    {inq.phone && (
                      <span>📱 <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a' }}>{inq.phone}</a></span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {inq.date ? new Date(inq.date).toLocaleString() : 'Recent'}
                  </span>
                  {inq.id && (
                    <button
                      onClick={() => handleDelete(inq.id!)}
                      style={{
                        background: '#fee2e2',
                        color: '#991b1b',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {inq.subject && (
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  Subject / Category: <span style={{ fontWeight: 500 }}>{inq.subject}</span>
                </div>
              )}

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155', fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {inq.details}
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                <a
                  href={`mailto:${inq.email}?subject=Reply to your ZYPFIT inquiry: ${encodeURIComponent(inq.subject || 'Manufacturing Quote')}`}
                  className="btn btn-primary"
                  style={{ fontSize: '13px', padding: '8px 16px', minHeight: '36px' }}
                >
                  Reply via Email
                </a>
                {inq.phone && (
                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '13px', padding: '8px 16px', minHeight: '36px', color: '#16a34a', borderColor: '#16a34a' }}
                  >
                    Open in WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

