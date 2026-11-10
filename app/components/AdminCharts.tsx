"use client";

import React, { useState } from 'react';

// Monthly export revenue and unit volume data
const MONTHLY_DATA = [
  { month: 'Jan', volume: 28, revenue: 42, samples: 12 },
  { month: 'Feb', volume: 34, revenue: 54, samples: 16 },
  { month: 'Mar', volume: 45, revenue: 68, samples: 21 },
  { month: 'Apr', volume: 52, revenue: 79, samples: 25 },
  { month: 'May', volume: 48, revenue: 73, samples: 22 },
  { month: 'Jun', volume: 64, revenue: 98, samples: 31 },
  { month: 'Jul', volume: 71, revenue: 112, samples: 36 },
  { month: 'Aug', volume: 68, revenue: 104, samples: 34 },
  { month: 'Sep', volume: 82, revenue: 126, samples: 41 },
  { month: 'Oct', volume: 94, revenue: 148, samples: 48 },
  { month: 'Nov', volume: 88, revenue: 139, samples: 44 },
  { month: 'Dec', volume: 102, revenue: 165, samples: 52 },
];

const CATEGORIES = [
  { name: 'Streetwear & Hoodies', share: 38, count: 184, color: '#f3a626' },
  { name: 'Denim & Jeans', share: 24, count: 116, color: '#3b82f6' },
  { name: 'Fitness & Activewear', share: 20, count: 97, color: '#10b981' },
  { name: 'Boxing & Combat Gear', share: 18, count: 87, color: '#ec4899' },
];

const FUNNEL_STAGES = [
  { stage: '1. RFQ & Tech Pack Inquiries', count: 484, pct: 100, color: '#3b82f6' },
  { stage: '2. Cost Estimate & Spec Review', count: 372, pct: 76.8, color: '#6366f1' },
  { stage: '3. Pre-Production Sample Made', count: 248, pct: 51.2, color: '#f59e0b' },
  { stage: '4. Bulk Order & Advance Remittance', count: 186, pct: 38.4, color: '#10b981' },
  { stage: '5. Export Dispatch (DHL / Sea Cargo)', count: 179, pct: 37.0, color: '#059669' },
];

const SHOP_FLOOR_METRICS = [
  { name: 'Fabric Cutting & Laser CAD', pct: 88, target: '95,000 m/mo', color: '#3b82f6' },
  { name: '4-Needle Flatlock Stitching', pct: 94, target: '60,000 pcs/mo', color: '#f59e0b' },
  { name: 'Screen & 3D Puff Printing', pct: 78, target: '45,000 pcs/mo', color: '#10b981' },
  { name: 'AQL 2.5 QA Inspection & Packing', pct: 92, target: '100% Export Pass', color: '#8b5cf6' },
];

/* 1. Interactive Area & Bar Revenue Chart */
export function MonthlyExportChart() {
  const [metric, setMetric] = useState<'revenue' | 'volume'>('revenue');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = metric === 'revenue' ? 180 : 120;
  const height = 180;
  const width = 640;
  const paddingX = 40;
  const chartWidth = width - paddingX * 2;

  // Generate SVG path points
  const points = MONTHLY_DATA.map((d, i) => {
    const val = metric === 'revenue' ? d.revenue : d.volume;
    const x = paddingX + (i / (MONTHLY_DATA.length - 1)) * chartWidth;
    const y = height - (val / maxVal) * (height - 30) - 10;
    return { x, y, val, month: d.month };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-orange, #f3a626)', letterSpacing: '0.08em' }}>
            Production Throughput &amp; Sales
          </div>
          <h3 style={{ margin: '4px 0 0', fontSize: '17px', fontWeight: 800, color: '#111827' }}>
            Monthly Export Shipments ({metric === 'revenue' ? 'Export Invoices in $1,000 USD' : 'Garment Units in 1,000 Pcs'})
          </h3>
        </div>

        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '3px' }}>
          <button
            type="button"
            onClick={() => setMetric('revenue')}
            style={{
              border: 'none',
              background: metric === 'revenue' ? '#ffffff' : 'transparent',
              color: metric === 'revenue' ? '#111827' : '#64748b',
              fontWeight: 700,
              fontSize: '12px',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: metric === 'revenue' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            💰 Revenue ($k)
          </button>
          <button
            type="button"
            onClick={() => setMetric('volume')}
            style={{
              border: 'none',
              background: metric === 'volume' ? '#ffffff' : 'transparent',
              color: metric === 'volume' ? '#111827' : '#64748b',
              fontWeight: 700,
              fontSize: '12px',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: metric === 'volume' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            📦 Units (k pcs)
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${width} ${height + 30}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3a626" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f3a626" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = height - pct * (height - 30) - 10;
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Main Line */}
          <path d={pathD} fill="none" stroke="#f3a626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Points & Interactive Nodes */}
          {points.map((p, i) => (
            <g key={i}>
              {/* Vertical Guide on hover */}
              {hoveredIdx === i && (
                <line
                  x1={p.x}
                  y1={10}
                  x2={p.x}
                  y2={height}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              )}

              {/* Data Circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIdx === i ? 6 : 4}
                fill={hoveredIdx === i ? '#ffffff' : '#f3a626'}
                stroke="#f3a626"
                strokeWidth={hoveredIdx === i ? 3 : 2}
                style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />

              {/* X Axis Month Label */}
              <text
                x={p.x}
                y={height + 20}
                textAnchor="middle"
                fontSize="11"
                fill={hoveredIdx === i ? '#0f172a' : '#94a3b8'}
                fontWeight={hoveredIdx === i ? '800' : '600'}
              >
                {p.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Tooltip Box */}
        {hoveredIdx !== null && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: `${(hoveredIdx / (MONTHLY_DATA.length - 1)) * 80 + 10}%`,
              transform: 'translateX(-50%)',
              background: '#0f172a',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontWeight: 800, color: '#f3a626', marginBottom: '2px' }}>
              {MONTHLY_DATA[hoveredIdx].month} Performance
            </div>
            <div>
              {metric === 'revenue'
                ? `Export Total: $${MONTHLY_DATA[hoveredIdx].revenue},000 USD`
                : `Units Shipped: ${MONTHLY_DATA[hoveredIdx].volume},000 Pieces`}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>
              Samples Dispatched: {MONTHLY_DATA[hoveredIdx].samples} packs
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 2. Interactive Category Donut / Ring Chart */
export function CategoryDonutChart() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Calculate SVG circle arcs
  const size = 180;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-orange, #f3a626)', letterSpacing: '0.08em' }}>
          Production Breakdown
        </div>
        <h3 style={{ margin: '4px 0 0', fontSize: '17px', fontWeight: 800, color: '#111827' }}>
          Category Manufacturing Share
        </h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        {/* Donut Graphic */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
          <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            {CATEGORIES.map((cat, idx) => {
              const dashLength = (cat.share / 100) * circumference;
              const dashOffset = -cumulativeOffset;
              cumulativeOffset += dashLength;

              return (
                <circle
                  key={cat.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth={activeIdx === idx ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={dashOffset}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseLeave={() => setActiveIdx(null)}
                />
              );
            })}
          </svg>

          {/* Center Text inside Donut */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>
              {activeIdx !== null ? `${CATEGORIES[activeIdx].share}%` : '100%'}
            </span>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
              {activeIdx !== null ? CATEGORIES[activeIdx].name.split(' ')[0] : 'All Styles'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '180px' }}>
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.name}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 8px',
                borderRadius: '6px',
                background: activeIdx === idx ? '#f8fafc' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color }} />
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>{cat.name}</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{cat.share}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 3. Conversion Funnel Chart */
export function B2BConversionFunnel() {
  return (
    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-orange, #f3a626)', letterSpacing: '0.08em' }}>
          Buyer Journey
        </div>
        <h3 style={{ margin: '4px 0 0', fontSize: '17px', fontWeight: 800, color: '#111827' }}>
          Inquiry-to-Production Conversion Funnel
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {FUNNEL_STAGES.map((s, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>{s.stage}</span>
              <span style={{ color: '#64748b', fontWeight: 800 }}>
                {s.count} orders ({s.pct}%)
              </span>
            </div>
            <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${s.pct}%`,
                  background: s.color,
                  borderRadius: '6px',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 4. Factory Floor Live Production Capacity */
export function FactoryCapacityGauges() {
  return (
    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-orange, #f3a626)', letterSpacing: '0.08em' }}>
          Sialkot Shop Floor
        </div>
        <h3 style={{ margin: '4px 0 0', fontSize: '17px', fontWeight: 800, color: '#111827' }}>
          Live Departmental Machine Utilization
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {SHOP_FLOOR_METRICS.map((m, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #f1f5f9',
              background: '#f8fafc',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>{m.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 6px' }}>
              <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>{m.pct}%</span>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>Optimal</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${m.pct}%`,
                  background: m.color,
                  borderRadius: '999px',
                }}
              />
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
              Target: {m.target}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

