"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
  { name: 'Streetwear & Hoodies', share: 38, count: 184, color: '#00e599' },
  { name: 'Denim & Jeans', share: 24, count: 116, color: '#38bdf8' },
  { name: 'Fitness & Activewear', share: 20, count: 97, color: '#fbbf24' },
  { name: 'Boxing & Combat Gear', share: 18, count: 87, color: '#f87171' },
];

const FUNNEL_STAGES = [
  { stage: '1. RFQ & Tech Pack Inquiries', count: 484, pct: 100, color: '#38bdf8' },
  { stage: '2. Cost Estimate & Spec Review', count: 372, pct: 76.8, color: '#2dd4bf' },
  { stage: '3. Pre-Production Sample Made', count: 248, pct: 51.2, color: '#fbbf24' },
  { stage: '4. Bulk Order & Advance Remittance', count: 186, pct: 38.4, color: '#00e599' },
  { stage: '5. Export Dispatch (Air / Sea Cargo)', count: 179, pct: 37.0, color: '#34d399' },
];

const SHOP_FLOOR_METRICS = [
  { name: 'Fabric Cutting & Laser CAD', pct: 88, target: '95,000 m/mo', color: '#38bdf8' },
  { name: '4-Needle Flatlock Stitching', pct: 94, target: '60,000 pcs/mo', color: '#00e599' },
  { name: 'Screen & 3D Puff Printing', pct: 78, target: '45,000 pcs/mo', color: '#fbbf24' },
  { name: 'AQL 2.5 QA Inspection & Packing', pct: 92, target: '100% Export Pass', color: '#2dd4bf' },
];

/* 1. Interactive Dark Obsidian Area & Wave Revenue Chart */
export function MonthlyExportChart() {
  const [metric, setMetric] = useState<'revenue' | 'volume'>('revenue');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(10);

  const maxVal = metric === 'revenue' ? 180 : 120;
  const height = 180;
  const width = 640;
  const paddingX = 40;
  const chartWidth = width - paddingX * 2;

  // Generate SVG path points with fixed precision for SSR-Client hydration consistency
  const points = MONTHLY_DATA.map((d, i) => {
    const val = metric === 'revenue' ? d.revenue : d.volume;
    const x = Number((paddingX + (i / (MONTHLY_DATA.length - 1)) * chartWidth).toFixed(2));
    const y = Number((height - (val / maxVal) * (height - 30) - 10).toFixed(2));
    return { x, y, val, month: d.month };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div
      style={{
        background: '#11171a',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
        position: 'relative',
      }}
    >
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#00e599', letterSpacing: '0.08em' }}>
              PRODUCTION THROUGHPUT &amp; EXPORT SALES
            </span>
            <span style={{ fontSize: '10px', background: 'rgba(0, 229, 153, 0.12)', color: '#00e599', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
              LIVE
            </span>
          </div>
          <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
            Monthly Export Shipments ({metric === 'revenue' ? 'Export Invoices in $1,000 USD' : 'Garment Units in 1,000 Pcs'})
          </h3>
        </div>

        <div style={{ display: 'flex', background: '#090d0f', borderRadius: '9999px', padding: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            type="button"
            onClick={() => setMetric('revenue')}
            style={{
              border: 'none',
              background: metric === 'revenue' ? '#1e293b' : 'transparent',
              color: metric === 'revenue' ? '#00e599' : '#94a3b8',
              fontWeight: 700,
              fontSize: '11.5px',
              padding: '6px 14px',
              borderRadius: '9999px',
              cursor: 'pointer',
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
              background: metric === 'volume' ? '#1e293b' : 'transparent',
              color: metric === 'volume' ? '#00e599' : '#94a3b8',
              fontWeight: 700,
              fontSize: '11.5px',
              padding: '6px 14px',
              borderRadius: '9999px',
              cursor: 'pointer',
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
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="chartGradientObsidian" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e599" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00e599" stopOpacity="0.0" />
            </linearGradient>
            <filter id="glowLine">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00e599" floodOpacity="0.5" />
            </filter>
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
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1"
              />
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill="url(#chartGradientObsidian)" />

          {/* Main Line with Neon Glow */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#00e599"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowLine)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

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
                  stroke="rgba(0, 229, 153, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}

              {/* Data Circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIdx === i ? 6 : 4}
                fill={hoveredIdx === i ? '#ffffff' : '#00e599'}
                stroke="#090d0f"
                strokeWidth={2}
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
                fill={hoveredIdx === i ? '#00e599' : '#64748b'}
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
              background: '#090d0f',
              border: '1px solid rgba(0, 229, 153, 0.35)',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
              pointerEvents: 'none',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontWeight: 800, color: '#00e599', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599', display: 'inline-block' }} />
              {MONTHLY_DATA[hoveredIdx].month} Export Status
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
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div
      style={{
        background: '#11171a',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#00e599', letterSpacing: '0.08em' }}>
          PRODUCTION BREAKDOWN
        </div>
        <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
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
            <span style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff' }}>
              {activeIdx !== null ? `${CATEGORIES[activeIdx].share}%` : '100%'}
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
              {activeIdx !== null ? CATEGORIES[activeIdx].name.split(' ')[0] : 'All Styles'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px' }}>
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.name}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 10px',
                borderRadius: '8px',
                background: activeIdx === idx ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                border: activeIdx === idx ? `1px solid ${cat.color}40` : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>{cat.name}</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>{cat.share}%</span>
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
    <div
      style={{
        background: '#11171a',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#00e599', letterSpacing: '0.08em' }}>
          BUYER PIPELINE CONVERSION
        </div>
        <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
          Inquiry-to-Production Conversion Funnel
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {FUNNEL_STAGES.map((s, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 600, color: '#cbd5e1' }}>{s.stage}</span>
              <span style={{ color: '#00e599', fontWeight: 800 }}>
                {s.count} orders <span style={{ color: '#64748b', fontWeight: 600 }}>({s.pct}%)</span>
              </span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.pct}%` }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: idx * 0.1, ease: "easeOut" as const }}
                style={{
                  height: '100%',
                  background: s.color,
                  borderRadius: '9999px',
                  boxShadow: `0 0 8px ${s.color}66`,
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
    <div
      style={{
        background: '#11171a',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#00e599', letterSpacing: '0.08em' }}>
          SIALKOT SHOP FLOOR
        </div>
        <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
          Live Departmental Machine Utilization
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        {SHOP_FLOOR_METRICS.map((m, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              background: '#0d1316',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
          >
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#94a3b8' }}>{m.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0 6px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff' }}>{m.pct}%</span>
              <span style={{ fontSize: '10.5px', color: '#00e599', fontWeight: 700 }}>Optimal</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${m.pct}%` }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: idx * 0.12, ease: "easeOut" as const }}
                style={{
                  height: '100%',
                  background: m.color,
                  borderRadius: '999px',
                  boxShadow: `0 0 6px ${m.color}88`,
                }}
              />
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
              Target: {m.target}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
