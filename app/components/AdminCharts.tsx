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
                fill={hoveredIdx === i ? '#00e599' : '#94a3b8'}
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
                {s.count} orders <span style={{ color: '#94a3b8', fontWeight: 600 }}>({s.pct}%)</span>
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
            <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '6px' }}>
              Target: {m.target}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   5. REAL-TIME WEB TRAFFIC & B2B VISITOR MONITOR (Instagram SaaS Style)
   ========================================================================== */

const TRAFFIC_TIMEFRAMES = {
  'today': {
    label: 'Today (Hourly)',
    totalVisits: '1,248',
    uniqueBuyers: '842',
    avgDuration: '3m 18s',
    bounceRate: '26.4%',
    growth: '+18.2%',
    points: [
      { t: '00:00', val: 18 }, { t: '02:00', val: 12 }, { t: '04:00', val: 14 },
      { t: '06:00', val: 28 }, { t: '08:00', val: 64 }, { t: '10:00', val: 98 },
      { t: '12:00', val: 122 }, { t: '14:00', val: 146 }, { t: '16:00', val: 168 },
      { t: '18:00', val: 182 }, { t: '20:00', val: 194 }, { t: '22:00', val: 202 }
    ]
  },
  '7d': {
    label: 'Last 7 Days',
    totalVisits: '8,940',
    uniqueBuyers: '5,620',
    avgDuration: '3m 44s',
    bounceRate: '24.1%',
    growth: '+24.6%',
    points: [
      { t: 'Mon', val: 1120 }, { t: 'Tue', val: 1340 }, { t: 'Wed', val: 1480 },
      { t: 'Thu', val: 1620 }, { t: 'Fri', val: 1540 }, { t: 'Sat', val: 920 },
      { t: 'Sun', val: 920 }
    ]
  },
  '30d': {
    label: 'Last 30 Days',
    totalVisits: '38,420',
    uniqueBuyers: '24,180',
    avgDuration: '4m 02s',
    bounceRate: '22.8%',
    growth: '+36.8%',
    points: [
      { t: 'Week 1', val: 7800 }, { t: 'Week 2', val: 9400 },
      { t: 'Week 3', val: 10200 }, { t: 'Week 4', val: 11020 }
    ]
  },
  '90d': {
    label: 'Quarterly (90D)',
    totalVisits: '114,800',
    uniqueBuyers: '72,400',
    avgDuration: '4m 15s',
    bounceRate: '21.5%',
    growth: '+52.4%',
    points: [
      { t: 'Month 1', val: 28000 }, { t: 'Month 2', val: 39400 },
      { t: 'Month 3', val: 47400 }
    ]
  }
};

const LIVE_ACTIVE_PAGES = [
  { path: '/private-label-activewear-manufacturer-australia', label: 'Australia Private Label Program', count: 7, flag: '🇦🇺' },
  { path: '/product-catalog', label: 'B2B Garment Catalog (19 Items)', count: 5, flag: '🇺🇸' },
  { path: '/boxing-gear-manufacturer', label: 'Custom Boxing Gloves & Headguards', count: 4, flag: '🇬🇧' },
  { path: '/order-sample', label: 'Order Sample Prototype Form', count: 3, flag: '🇩🇪' },
];

export function LiveWebTrafficMonitorChart() {
  const [timeframe, setTimeframe] = useState<'today' | '7d' | '30d' | '90d'>('7d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const current = TRAFFIC_TIMEFRAMES[timeframe];
  const data = current.points;
  const maxVal = Math.max(...data.map(d => d.val)) * 1.15;
  const height = 180;
  const width = 640;
  const paddingX = 40;
  const chartWidth = width - paddingX * 2;

  const points = data.map((d, i) => {
    const x = Number((paddingX + (i / (data.length - 1)) * chartWidth).toFixed(2));
    const y = Number((height - (d.val / maxVal) * (height - 35) - 15).toFixed(2));
    return { x, y, val: d.val, t: d.t };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div
      style={{
        background: '#0d1317',
        borderRadius: '14px',
        border: '1px solid rgba(0, 229, 153, 0.18)',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow Aura Top Corner */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 153, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header with Live Pulse Ticker */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#00e599', letterSpacing: '0.09em' }}>
              REAL-TIME WEB TRAFFIC &amp; BUYER FLOW
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10px',
                background: 'rgba(0, 229, 153, 0.15)',
                color: '#00e599',
                padding: '2px 8px',
                borderRadius: '999px',
                fontWeight: 800,
                border: '1px solid rgba(0, 229, 153, 0.35)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599', boxShadow: '0 0 8px #00e599' }} />
              19 BUYERS ACTIVE NOW
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>
            International Traffic &amp; Page Engagements
          </h3>
        </div>

        {/* Timeframe Selector Pills */}
        <div style={{ display: 'flex', background: '#070a0c', borderRadius: '9999px', padding: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['today', '7d', '30d', '90d'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeframe(t)}
              style={{
                background: timeframe === t ? '#00e599' : 'transparent',
                color: timeframe === t ? '#0b0f19' : '#94a3b8',
                border: 'none',
                padding: '5px 13px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Stat Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 700 }}>Total Sessions</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>{current.totalVisits}</div>
          <span style={{ fontSize: '10px', color: '#00e599', fontWeight: 700 }}>{current.growth}</span>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 700 }}>Unique Brand Leads</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>{current.uniqueBuyers}</div>
          <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 600 }}>Qualified buyers</span>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 700 }}>Avg. Session Time</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#fbbf24', marginTop: '2px' }}>{current.avgDuration}</div>
          <span style={{ fontSize: '10px', color: '#cbd5e1' }}>High engagement</span>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 700 }}>B2B Bounce Rate</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#2dd4bf', marginTop: '2px' }}>{current.bounceRate}</div>
          <span style={{ fontSize: '10px', color: '#2dd4bf', fontWeight: 600 }}>Top 5% quartile</span>
        </div>
      </div>

      {/* Interactive SVG Smooth Area Chart */}
      <div style={{ position: 'relative', width: '100%', height: `${height}px` }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e599" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#00e599" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#00e599" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="trafficStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#00e599" />
              <stop offset="100%" stopColor="#a3e635" />
            </linearGradient>
          </defs>

          {/* Horizontal guide grids */}
          {[0.25, 0.5, 0.75].map((pct, i) => (
            <line
              key={i}
              x1={paddingX}
              y1={height * pct}
              x2={width - paddingX}
              y2={height * pct}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area Fill */}
          <path d={areaD} fill="url(#trafficGradient)" />

          {/* Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#trafficStroke)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points */}
          {points.map((p, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 7 : 4}
                  fill={isHovered ? '#ffffff' : '#00e599'}
                  stroke="#0b0f19"
                  strokeWidth="2.5"
                  style={{ transition: 'all 0.15s ease' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div
            style={{
              position: 'absolute',
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${Math.max(10, points[hoveredIndex].y - 42)}px`,
              transform: 'translateX(-50%)',
              background: '#040709',
              border: '1px solid #00e599',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: 800,
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0, 229, 153, 0.4)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              zIndex: 10,
            }}
          >
            {points[hoveredIndex].t}: {points[hoveredIndex].val.toLocaleString()} visitors
          </div>
        )}
      </div>

      {/* Active Browsing Locations Box */}
      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em', marginBottom: '10px' }}>
          Live High-Intent Page Traffic:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
          {LIVE_ACTIVE_PAGES.map((page, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                fontSize: '12px',
              }}
            >
              <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <span>{page.flag}</span> {page.label}
              </span>
              <span style={{ color: '#00e599', fontWeight: 800, fontSize: '11px', background: 'rgba(0, 229, 153, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                {page.count} active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 6. TRAFFIC ACQUISITION & REFERRAL SOURCES */
const ACQUISITION_CHANNELS = [
  { name: 'Google Organic Search (B2B SEO)', share: 44, visits: '16,900', color: '#00e599', icon: '🔍', desc: 'High-intent private label activewear & boxing keywords' },
  { name: 'Direct WhatsApp & RFQ Clicks', share: 28, visits: '10,750', color: '#38bdf8', icon: '💬', desc: 'Repeat brands & instant quote inquiries' },
  { name: 'Instagram & Sialkot Reels', share: 16, visits: '6,150', color: '#fbbf24', icon: '📸', desc: 'Apparel manufacturing reels & factory walkthroughs' },
  { name: 'LinkedIn B2B Sourcing Network', share: 12, visits: '4,620', color: '#a855f7', icon: '💼', desc: 'Sportswear procurement managers & distributors' },
];

export function TrafficAcquisitionChannels() {
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
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.08em' }}>
          ACQUISITION CHANNELS
        </div>
        <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
          Where International Buyers Discover Us
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {ACQUISITION_CHANNELS.map((ch, idx) => (
          <div
            key={idx}
            style={{
              background: '#0d1316',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              padding: '14px 16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{ch.icon}</span> {ch.name}
              </span>
              <span style={{ color: ch.color, fontWeight: 900, fontSize: '13px' }}>
                {ch.share}% <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600 }}>({ch.visits} sessions)</span>
              </span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden', margin: '8px 0 6px' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${ch.share}%` }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: idx * 0.1, ease: "easeOut" as const }}
                style={{
                  height: '100%',
                  background: ch.color,
                  borderRadius: '999px',
                  boxShadow: `0 0 8px ${ch.color}66`,
                }}
              />
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              {ch.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
