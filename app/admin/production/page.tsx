"use client";

import { useState } from 'react';
import Link from 'next/link';

interface BatchOrder {
  id: string;
  clientBrand: string;
  country: string;
  item: string;
  type: 'Bulk Production' | 'Sample Prototype';
  quantity: number;
  stage: 'Tech Pack' | 'Cutting' | 'Stitching & Branding' | 'Quality Control' | 'Steam Pressing' | 'Packaging' | 'Dispatched';
  progress: number;
  startDate: string;
  targetDispatch: string;
  courier: string;
  trackingNo: string;
}

const INITIAL_BATCHES: BatchOrder[] = [
  {
    id: 'BRE-2026-9014',
    clientBrand: 'Vanguard Streetwear LLC',
    country: 'United States',
    item: '450 GSM Heavy French Terry Boxy Hoodies',
    type: 'Bulk Production',
    quantity: 600,
    stage: 'Quality Control',
    progress: 80,
    startDate: 'Oct 28, 2026',
    targetDispatch: 'Nov 18, 2026',
    courier: 'DHL Express Air Cargo',
    trackingNo: 'DHL-PK-9821449012'
  },
  {
    id: 'BRE-SAMPLE-104',
    clientBrand: 'Aura Athletics Ltd',
    country: 'United Kingdom',
    item: 'Seamless High-Waist Scrunch Leggings & Bra',
    type: 'Sample Prototype',
    quantity: 4,
    stage: 'Dispatched',
    progress: 100,
    startDate: 'Nov 02, 2026',
    targetDispatch: 'Nov 11, 2026',
    courier: 'FedEx Priority',
    trackingNo: 'FDX-8730991204-GB'
  },
  {
    id: 'BRE-2026-9022',
    clientBrand: 'Nordic Combat Equipment',
    country: 'Germany',
    item: 'Pro Sparring Boxing Gloves (Full Grain Cowhide)',
    type: 'Bulk Production',
    quantity: 400,
    stage: 'Stitching & Branding',
    progress: 60,
    startDate: 'Nov 04, 2026',
    targetDispatch: 'Nov 24, 2026',
    courier: 'Maersk Air Cargo',
    trackingNo: 'Pending Dispatch'
  },
  {
    id: 'BRE-SAMPLE-108',
    clientBrand: 'Pacific Raw Denim Co',
    country: 'Australia',
    item: '14 oz Raw Japanese-Cut Selvedge Jeans',
    type: 'Sample Prototype',
    quantity: 6,
    stage: 'Cutting',
    progress: 40,
    startDate: 'Nov 07, 2026',
    targetDispatch: 'Nov 19, 2026',
    courier: 'DHL Express',
    trackingNo: 'Pending'
  },
  {
    id: 'BRE-2026-9035',
    clientBrand: 'Falcon Gym Apparel',
    country: 'United Arab Emirates',
    item: 'Dry-Fit Performance Drop-Cut Tees',
    type: 'Bulk Production',
    quantity: 1200,
    stage: 'Tech Pack',
    progress: 20,
    startDate: 'Nov 09, 2026',
    targetDispatch: 'Dec 02, 2026',
    courier: 'Emirates SkyCargo',
    trackingNo: 'Pending'
  }
];

const STAGES: ('Tech Pack' | 'Cutting' | 'Stitching & Branding' | 'Quality Control' | 'Steam Pressing' | 'Packaging' | 'Dispatched')[] = [
  'Tech Pack',
  'Cutting',
  'Stitching & Branding',
  'Quality Control',
  'Steam Pressing',
  'Packaging',
  'Dispatched'
];

export default function ProductionTrackerPage() {
  const [batches, setBatches] = useState<BatchOrder[]>(INITIAL_BATCHES);
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');

  const handleNextStage = (id: string) => {
    setBatches(prev => prev.map(b => {
      if (b.id !== id) return b;
      const curIndex = STAGES.indexOf(b.stage);
      if (curIndex < STAGES.length - 1) {
        const nextStage = STAGES[curIndex + 1];
        const nextProg = Math.min(100, Math.round(((curIndex + 2) / STAGES.length) * 100));
        return { ...b, stage: nextStage, progress: nextProg };
      }
      return b;
    }));
  };

  const filtered = batches.filter(b => {
    const matchSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.clientBrand.toLowerCase().includes(search.toLowerCase()) ||
      b.item.toLowerCase().includes(search.toLowerCase()) ||
      b.country.toLowerCase().includes(search.toLowerCase());

    const matchType =
      filterType === 'all' ||
      (filterType === 'bulk' && b.type === 'Bulk Production') ||
      (filterType === 'sample' && b.type === 'Sample Prototype') ||
      (filterType === 'dispatched' && b.stage === 'Dispatched') ||
      (filterType === 'active' && b.stage !== 'Dispatched');

    return matchSearch && matchType;
  });

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#111827' }}>
            Production Floor &amp; Sampling Pipeline
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Monitor cutting lines, sewing departments, quality assurance audits, and export freight dispatches.
          </p>
        </div>

        <Link
          href="/track-order"
          target="_blank"
          className="btn btn-primary"
          style={{ fontSize: '13px', padding: '10px 18px', minHeight: '38px', textDecoration: 'none' }}
        >
          View Public Client Tracker ↗
        </Link>
      </div>

      {/* Production KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Active Production Runs</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#111827', margin: '6px 0 2px' }}>
            {batches.filter(b => b.stage !== 'Dispatched').length}
          </div>
          <span style={{ fontSize: '12px', color: '#d97706', fontWeight: 700 }}>In manufacturing floor</span>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Active Sampling Prototypes</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#2563eb', margin: '6px 0 2px' }}>
            {batches.filter(b => b.type === 'Sample Prototype').length}
          </div>
          <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 700 }}>Pattern &amp; fit development</span>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Total Garment Units on Line</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#15803d', margin: '6px 0 2px' }}>
            {batches.filter(b => b.stage !== 'Dispatched').reduce((acc, b) => acc + b.quantity, 0).toLocaleString()}
          </div>
          <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 700 }}>Pieces in process</span>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Dispatched Batches</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '6px 0 2px' }}>
            {batches.filter(b => b.stage === 'Dispatched').length}
          </div>
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>Delivered / Air Cargo</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter by Order ID (BRE-...), brand, item, or country..."
          style={{ flex: 1, minWidth: '260px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
        />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Batches' },
            { id: 'active', label: 'In Progress' },
            { id: 'bulk', label: 'Bulk Orders' },
            { id: 'sample', label: 'Sample Prototypes' },
            { id: 'dispatched', label: 'Dispatched' }
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterType(f.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                border: filterType === f.id ? '1px solid #0f172a' : '1px solid #e2e8f0',
                background: filterType === f.id ? '#0f172a' : '#fff',
                color: filterType === f.id ? '#fff' : '#475569',
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Batches List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.map(b => (
          <div
            key={b.id}
            style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '22px 24px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{b.id}</span>
                  <span style={{ background: b.type === 'Bulk Production' ? '#dbeafe' : '#fef3c7', color: b.type === 'Bulk Production' ? '#1e40af' : '#92400e', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                    {b.type}
                  </span>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>
                    for <strong style={{ color: '#1e293b' }}>{b.clientBrand}</strong> ({b.country})
                  </span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#334155', marginTop: '6px' }}>
                  {b.item} &bull; <span style={{ color: '#0f172a' }}>{b.quantity} pcs</span>
                </div>
              </div>

              {/* Status Badge & Advance Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    background: b.stage === 'Dispatched' ? '#dcfce7' : 'rgba(243,166,38,0.15)',
                    color: b.stage === 'Dispatched' ? '#15803d' : '#b45309',
                    border: `1px solid ${b.stage === 'Dispatched' ? '#86efac' : '#fcd34d'}`,
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 800
                  }}
                >
                  Current: {b.stage}
                </span>

                {b.stage !== 'Dispatched' && (
                  <button
                    type="button"
                    onClick={() => handleNextStage(b.id)}
                    style={{
                      background: '#0f172a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '7px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Advance Stage ➔
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>
                <span>Production Completion: <strong>{b.progress}%</strong></span>
                <span>Target Dispatch: <strong style={{ color: '#0f172a' }}>{b.targetDispatch}</strong></span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${b.progress}%`,
                    background: b.progress === 100 ? '#10b981' : 'var(--brand-orange, #f3a626)',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Stage Steps row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginTop: '14px', fontSize: '11px', textAlign: 'center' }}>
              {STAGES.map((st, i) => {
                const isPast = STAGES.indexOf(b.stage) > i;
                const isCurrent = b.stage === st;
                return (
                  <div
                    key={st}
                    style={{
                      padding: '6px 4px',
                      borderRadius: '6px',
                      background: isPast ? '#dcfce7' : (isCurrent ? 'rgba(243,166,38,0.18)' : '#f8fafc'),
                      color: isPast ? '#15803d' : (isCurrent ? '#92400e' : '#94a3b8'),
                      fontWeight: isCurrent ? 800 : 600,
                      border: isCurrent ? '1.5px solid #f3a626' : '1px solid transparent'
                    }}
                  >
                    {isPast ? '✓ ' : ''}{st}
                  </div>
                );
              })}
            </div>

            {/* Logistics Footer */}
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                Logistics Carrier: <strong style={{ color: '#0284c7' }}>{b.courier}</strong> &bull; Tracking / AWB: <code>{b.trackingNo}</code>
              </div>
              <Link
                href={`/track-order?search=${b.id}`}
                target="_blank"
                style={{ color: '#f3a626', fontWeight: 700, textDecoration: 'none' }}
              >
                Open Client Tracking Page ↗
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
