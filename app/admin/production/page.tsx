"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../../components/AnimatedCounter';
import { ArrowRightIcon, ExternalLinkIcon } from '../../components/AdminIcons';

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
    courier: 'Emirates SkyCargo',
    trackingNo: 'EK-AWB-44910283'
  },
  {
    id: 'BRE-SAMPLE-105',
    clientBrand: 'HypeDistrict Skatewear',
    country: 'Australia',
    item: 'Baggy Acid Wash Carpenter Denim & Leather Patches',
    type: 'Sample Prototype',
    quantity: 2,
    stage: 'Cutting',
    progress: 35,
    startDate: 'Nov 08, 2026',
    targetDispatch: 'Nov 19, 2026',
    courier: 'DHL Air Express',
    trackingNo: 'DHL-AU-1084920'
  },
  {
    id: 'BRE-2026-9031',
    clientBrand: 'Olympus Fight Club',
    country: 'France',
    item: 'Pearl Weave 450 GSM BJJ Gis & Sublimated Spats',
    type: 'Bulk Production',
    quantity: 350,
    stage: 'Steam Pressing',
    progress: 85,
    startDate: 'Nov 01, 2026',
    targetDispatch: 'Nov 21, 2026',
    courier: 'Qatar Cargo Express',
    trackingNo: 'QR-FR-39201948'
  },
  {
    id: 'BRE-2026-9035',
    clientBrand: 'IronPulse Active',
    country: 'Canada',
    item: 'Compression Baselayer Thermal Tops & Tights',
    type: 'Bulk Production',
    quantity: 500,
    stage: 'Packaging',
    progress: 92,
    startDate: 'Nov 03, 2026',
    targetDispatch: 'Nov 17, 2026',
    courier: 'DHL Express Air',
    trackingNo: 'DHL-CA-7782190'
  }
];

const STAGES: BatchOrder['stage'][] = [
  'Tech Pack',
  'Cutting',
  'Stitching & Branding',
  'Quality Control',
  'Steam Pressing',
  'Packaging',
  'Dispatched'
];

export default function ProductionPipelinePage() {
  const [batches, setBatches] = useState<BatchOrder[]>(INITIAL_BATCHES);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const handleNextStage = (id: string) => {
    setBatches(prev => prev.map(b => {
      if (b.id !== id) return b;
      const currentIndex = STAGES.indexOf(b.stage);
      if (currentIndex < STAGES.length - 1) {
        const nextStage = STAGES[currentIndex + 1];
        const nextProgress = Math.round(((currentIndex + 2) / STAGES.length) * 100);
        return { ...b, stage: nextStage, progress: nextProgress };
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
    <div style={{ color: '#e2e8f0', fontFamily: 'inherit' }}>
      <style jsx>{`
        .batch-card {
          background: #11171a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 24px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .batch-card:hover {
          border-color: rgba(0, 229, 153, 0.25);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(0, 229, 153, 0.15);
        }
        .kpi-mini {
          background: #11171a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: all 0.2s ease;
        }
        .kpi-mini:hover {
          background: #131b1f;
          border-color: rgba(0, 229, 153, 0.3);
          transform: translateY(-2px);
        }
        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 9999px;
          white-space: nowrap;
        }
        .tag-mint {
          background: rgba(0, 229, 153, 0.12);
          color: #00e599;
          border: 1px solid rgba(0, 229, 153, 0.25);
        }
        .tag-amber {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.25);
        }
        .tag-rose {
          background: rgba(248, 113, 113, 0.12);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.25);
        }
        .tag-cyan {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.25);
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Production Floor &amp; Sampling Pipeline
            </h1>
            <span className="tag-pill tag-mint">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599' }}></span>
              SIALKOT UNIT 1
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13.5px' }}>
            Real-time tracking of garment cutting, stitching, steam pressing and retail packaging lines.
          </p>
        </div>

        <Link
          href="/track-order"
          target="_blank"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.28) 100%)',
            color: '#ffffff',
            border: '1px solid rgba(52, 211, 153, 0.38)',
            fontWeight: 700,
            fontSize: '12px',
            padding: '8px 18px',
            borderRadius: '9999px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transition: 'all 0.15s ease',
          }}
        >
          <span>View Public Client Tracker</span>
          <ExternalLinkIcon size={12} style={{ color: '#34d399' }} />
        </Link>
      </div>

      {/* Production KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              ACTIVE RUNS
            </span>
            <span className="tag-pill tag-amber">On Floor</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            <AnimatedCounter value={batches.filter(b => b.stage !== 'Dispatched').length} duration={1.2} delay={0.2} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Cutting to packing stages</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              SAMPLING PROTOS
            </span>
            <span className="tag-pill tag-cyan">Proto Lab</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#38bdf8', margin: '4px 0 2px' }}>
            <AnimatedCounter value={batches.filter(b => b.type === 'Sample Prototype').length} duration={1.2} delay={0.25} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Fit &amp; embroidery review</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              UNITS ON LINE
            </span>
            <span className="tag-pill tag-mint">Capacity</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#00e599', margin: '4px 0 2px' }}>
            <AnimatedCounter value={batches.filter(b => b.stage !== 'Dispatched').reduce((acc, b) => acc + b.quantity, 0)} duration={1.8} delay={0.3} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Pieces in active stitching</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              DISPATCHED
            </span>
            <span className="tag-pill tag-mint">Delivered</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            <AnimatedCounter value={batches.filter(b => b.stage === 'Dispatched').length} duration={1.2} delay={0.35} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Air cargo waybills cleared</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ background: '#11171a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '14px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
          <span style={{ color: '#64748b', fontSize: '13px' }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search order ID (BRE-...), brand, item, country..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '13px',
              width: '100%',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
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
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '11.5px',
                fontWeight: 700,
                border: filterType === f.id ? '1px solid rgba(0, 229, 153, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: filterType === f.id ? 'rgba(0, 229, 153, 0.15)' : '#090d0f',
                color: filterType === f.id ? '#00e599' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Batches List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.38, ease: "easeOut" as const }}
            className="batch-card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff' }}>{b.id}</span>
                  <span className={`tag-pill ${b.type === 'Bulk Production' ? 'tag-cyan' : 'tag-amber'}`}>
                    {b.type}
                  </span>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                    for <strong style={{ color: '#ffffff' }}>{b.clientBrand}</strong> ({b.country})
                  </span>
                </div>
                <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#cbd5e1', marginTop: '6px' }}>
                  {b.item} &bull; <span style={{ color: '#00e599' }}>{b.quantity} pcs</span>
                </div>
              </div>

              {/* Status Badge & Advance Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className={`tag-pill ${b.stage === 'Dispatched' ? 'tag-mint' : 'tag-amber'}`} style={{ padding: '5px 12px', fontSize: '12px' }}>
                  Current: {b.stage}
                </span>

                {b.stage !== 'Dispatched' && (
                  <button
                    type="button"
                    onClick={() => handleNextStage(b.id)}
                    style={{
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.28) 100%)',
                      color: '#ffffff',
                      border: '1px solid rgba(52, 211, 153, 0.38)',
                      borderRadius: '9999px',
                      padding: '7px 16px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>Advance Stage</span>
                    <ArrowRightIcon size={13} style={{ color: '#34d399' }} />
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                <span>Production Completion: <strong style={{ color: '#00e599' }}>{b.progress}%</strong></span>
                <span>Target Dispatch: <strong style={{ color: '#ffffff' }}>{b.targetDispatch}</strong></span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.progress}%` }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" as const }}
                  style={{
                    height: '100%',
                    background: b.progress === 100 ? '#00e599' : 'linear-gradient(90deg, #38bdf8, #00e599)',
                    borderRadius: '9999px',
                    boxShadow: '0 0 10px rgba(0, 229, 153, 0.5)',
                  }}
                />
              </div>
            </div>

            {/* Stage Steps row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '6px', marginTop: '14px', fontSize: '11px', textAlign: 'center' }}>
              {STAGES.map((st, i) => {
                const isPast = STAGES.indexOf(b.stage) > i;
                const isCurrent = b.stage === st;
                return (
                  <div
                    key={st}
                    style={{
                      padding: '6px 8px',
                      borderRadius: '9999px',
                      background: isPast
                        ? 'rgba(52, 211, 153, 0.12)'
                        : isCurrent
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(255, 255, 255, 0.03)',
                      color: isPast ? '#34d399' : isCurrent ? '#fbbf24' : '#94a3b8',
                      fontWeight: isCurrent ? 800 : 600,
                      border: isCurrent
                        ? '1px solid #fbbf24'
                        : isPast
                          ? '1px solid rgba(52, 211, 153, 0.28)'
                          : '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {isPast ? '✓ ' : ''}{st}
                  </div>
                );
              })}
            </div>

            {/* Logistics Footer */}
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                Carrier: <strong style={{ color: '#38bdf8' }}>{b.courier}</strong> &bull; AWB: <code style={{ color: '#ffffff' }}>{b.trackingNo}</code>
              </div>
              <Link
                href={`/track-order?search=${b.id}`}
                target="_blank"
                style={{ color: '#00e599', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Open Client Tracking Page</span>
                <ExternalLinkIcon size={12} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
