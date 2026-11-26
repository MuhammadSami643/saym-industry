"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Monthly export revenue and unit volume data (Zero / Real Baseline)
const MONTHLY_DATA = [
  { month: 'Jan', volume: 0, revenue: 0, samples: 0 },
  { month: 'Feb', volume: 0, revenue: 0, samples: 0 },
  { month: 'Mar', volume: 0, revenue: 0, samples: 0 },
  { month: 'Apr', volume: 0, revenue: 0, samples: 0 },
  { month: 'May', volume: 0, revenue: 0, samples: 0 },
  { month: 'Jun', volume: 0, revenue: 0, samples: 0 },
  { month: 'Jul', volume: 0, revenue: 0, samples: 0 },
  { month: 'Aug', volume: 0, revenue: 0, samples: 0 },
  { month: 'Sep', volume: 0, revenue: 0, samples: 0 },
  { month: 'Oct', volume: 0, revenue: 0, samples: 0 },
  { month: 'Nov', volume: 0, revenue: 0, samples: 0 },
  { month: 'Dec', volume: 0, revenue: 0, samples: 0 },
];

const CATEGORIES = [
  { name: 'Streetwear & Hoodies', share: 0, count: 0, color: '#00e599' },
  { name: 'Denim & Jeans', share: 0, count: 0, color: '#38bdf8' },
  { name: 'Fitness & Activewear', share: 0, count: 0, color: '#fbbf24' },
  { name: 'Boxing & Combat Gear', share: 0, count: 0, color: '#f87171' },
];

const FUNNEL_STAGES = [
  { stage: '1. RFQ & Tech Pack Inquiries', count: 0, pct: 0, color: '#38bdf8' },
  { stage: '2. Cost Estimate & Spec Review', count: 0, pct: 0, color: '#2dd4bf' },
  { stage: '3. Pre-Production Sample Made', count: 0, pct: 0, color: '#fbbf24' },
  { stage: '4. Bulk Order & Advance Remittance', count: 0, pct: 0, color: '#00e599' },
  { stage: '5. Export Dispatch (Air / Sea Cargo)', count: 0, pct: 0, color: '#34d399' },
];

const SHOP_FLOOR_METRICS = [
  { name: 'Fabric Cutting & Laser CAD', pct: 0, target: 'Standby', color: '#38bdf8' },
  { name: '4-Needle Flatlock Stitching', pct: 0, target: 'Standby', color: '#00e599' },
  { name: 'Screen & 3D Puff Printing', pct: 0, target: 'Standby', color: '#fbbf24' },
  { name: 'AQL 2.5 QA Inspection & Packing', pct: 0, target: 'Inspection Ready', color: '#2dd4bf' },
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
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
            />
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
              0%
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
              Standby
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
    totalVisits: '0',
    uniqueBuyers: '0',
    avgDuration: '0m 00s',
    bounceRate: '0.0%',
    growth: '0.0%',
    points: [
      { t: '00:00', val: 0 }, { t: '04:00', val: 0 }, { t: '08:00', val: 0 },
      { t: '12:00', val: 0 }, { t: '16:00', val: 0 }, { t: '20:00', val: 0 }
    ]
  },
  '7d': {
    label: 'Last 7 Days',
    totalVisits: '0',
    uniqueBuyers: '0',
    avgDuration: '0m 00s',
    bounceRate: '0.0%',
    growth: '0.0%',
    points: [
      { t: 'Mon', val: 0 }, { t: 'Tue', val: 0 }, { t: 'Wed', val: 0 },
      { t: 'Thu', val: 0 }, { t: 'Fri', val: 0 }, { t: 'Sat', val: 0 },
      { t: 'Sun', val: 0 }
    ]
  },
  '30d': {
    label: 'Last 30 Days',
    totalVisits: '0',
    uniqueBuyers: '0',
    avgDuration: '0m 00s',
    bounceRate: '0.0%',
    growth: '0.0%',
    points: [
      { t: 'Week 1', val: 0 }, { t: 'Week 2', val: 0 },
      { t: 'Week 3', val: 0 }, { t: 'Week 4', val: 0 }
    ]
  },
  '90d': {
    label: 'Quarterly (90D)',
    totalVisits: '0',
    uniqueBuyers: '0',
    avgDuration: '0m 00s',
    bounceRate: '0.0%',
    growth: '0.0%',
    points: [
      { t: 'Month 1', val: 0 }, { t: 'Month 2', val: 0 },
      { t: 'Month 3', val: 0 }
    ]
  }
};

const LIVE_ACTIVE_PAGES: Array<{ path: string; label: string; count: number; flag: string }> = [];

export function LiveWebTrafficMonitorChart() {
  const [timeframe, setTimeframe] = useState<'today' | '7d' | '30d' | '90d'>('7d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const current = TRAFFIC_TIMEFRAMES[timeframe];
  const data = current.points;
  const rawMax = Math.max(...data.map(d => d.val));
  const maxVal = rawMax > 0 ? rawMax * 1.15 : 100;
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
              0 BUYERS ACTIVE (STANDBY)
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
          <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 600 }}>Standby</span>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 700 }}>Avg. Session Time</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#fbbf24', marginTop: '2px' }}>{current.avgDuration}</div>
          <span style={{ fontSize: '10px', color: '#cbd5e1' }}>Standby</span>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 700 }}>B2B Bounce Rate</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#2dd4bf', marginTop: '2px' }}>{current.bounceRate}</div>
          <span style={{ fontSize: '10px', color: '#2dd4bf', fontWeight: 600 }}>Standby</span>
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
        {LIVE_ACTIVE_PAGES.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.04)', fontSize: '12px', color: '#94a3b8' }}>
            Live traffic tracker standby &bull; Real-time buyer sessions across US, UK, EU, Australia &amp; Canada will appear as visitors arrive.
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

/* 6. TRAFFIC ACQUISITION & REFERRAL SOURCES */
const ACQUISITION_CHANNELS = [
  { name: 'Google Organic Search (B2B SEO)', share: 0, visits: '0', color: '#00e599', icon: '🔍', desc: 'Awaiting indexed search sessions' },
  { name: 'Direct WhatsApp & RFQ Clicks', share: 0, visits: '0', color: '#38bdf8', icon: '💬', desc: 'Direct buyer click-throughs' },
  { name: 'Instagram & Sialkot Reels', share: 0, visits: '0', color: '#fbbf24', icon: '📸', desc: 'Social and video referral traffic' },
  { name: 'LinkedIn B2B Sourcing Network', share: 0, visits: '0', color: '#a855f7', icon: '💼', desc: 'B2B procurement referrals' },
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
