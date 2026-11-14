"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import type { Inquiry, Product } from '../../actions';

interface Props {
  inquiries: Inquiry[];
  products: Product[];
}

export default function AnimatedOverviewDashboard({ inquiries, products }: Props) {
  // Chart timeframe state
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  // Interactive hover tooltip on wave chart
  const [activePoint, setActivePoint] = useState<number | null>(4);
  // Queue table filter tab
  const [activeQueueTab, setActiveQueueTab] = useState<'attention' | 'today' | 'sampling'>('attention');
  // AI Copilot card dismiss state
  const [copilotDismissed, setCopilotDismissed] = useState(false);

  // Timeframe data series for the glowing wave
  const waveDataMap = {
    '7d': [
      { date: 'MON', produced: 840, shipped: 720 },
      { date: 'TUE', produced: 920, shipped: 850 },
      { date: 'WED', produced: 1100, shipped: 990 },
      { date: 'THU', produced: 1050, shipped: 1010 },
      { date: 'FRI', produced: 1280, shipped: 1140 },
      { date: 'SAT', produced: 950, shipped: 880 },
      { date: 'SUN', produced: 620, shipped: 580 },
    ],
    '30d': [
      { date: 'OCT 6', produced: 4200, shipped: 3800 },
      { date: 'OCT 12', produced: 4900, shipped: 4300 },
      { date: 'OCT 18', produced: 5800, shipped: 5200 },
      { date: 'OCT 24', produced: 5400, shipped: 5100 },
      { date: 'OCT 30', produced: 6800, shipped: 6100 },
      { date: 'NOV 5', produced: 7200, shipped: 6700 },
      { date: 'NOV 12', produced: 7900, shipped: 7300 },
    ],
    '90d': [
      { date: 'AUG', produced: 18500, shipped: 16800 },
      { date: 'SEP', produced: 22400, shipped: 20900 },
      { date: 'OCT', produced: 28100, shipped: 25400 },
      { date: 'NOV', produced: 31200, shipped: 28900 },
    ],
  };

  const currentWaveData = waveDataMap[timeframe];

  // Pipeline equalizer stages
  const pipelineStages = [
    { name: 'KNIT / YARN', count: 48, fillPct: 45, color: '#00e599' },
    { name: 'CUTTING', count: 62, fillPct: 60, color: '#00e599' },
    { name: 'PRINT / EMB', count: 84, fillPct: 80, color: '#00e599' },
    { name: 'STITCHING', count: 142, fillPct: 100, color: '#00e599' },
    { name: 'STEAM PRESS', count: 56, fillPct: 55, color: '#2dd4bf' },
    { name: 'PACK & QA', count: 38, fillPct: 40, color: '#38bdf8' },
    { name: 'DHL DISPATCH', count: 19, fillPct: 25, color: '#f87171' },
  ];

  // Priority Attention Queue items
  const queueItems = {
    attention: [
      { id: 'BRE-2026-9041', buyer: 'Liam Vance', brand: 'Apex Athletic USA', country: '🇺🇸', item: '500 GSM Heavyweight Hoodies (600 pcs)', stage: 'Industrial Steam Pressing', clock: '6h', urgent: true },
      { id: 'BRE-2026-9038', buyer: 'Sophie Davies', brand: 'IronClad Streetwear UK', country: '🇬🇧', item: 'Acid Wash Boxy Tees (1,200 pcs)', stage: 'Screen Printing & Puff', clock: '9h', urgent: true },
      { id: 'BRE-2026-9029', buyer: 'Marc Dupont', brand: 'Vanguard Combat Paris', country: '🇫🇷', item: 'Pearl Weave BJJ Gis (250 pcs)', stage: 'Triple Needle Stitching', clock: '14h', urgent: false },
      { id: 'BRE-2026-9018', buyer: 'Erik Lind', brand: 'Nordic Compression', country: '🇸🇪', item: 'Recovery Baselayer Tights (400 pcs)', stage: 'Custom Retail Packaging', clock: '1d', urgent: false },
    ],
    today: [
      { id: 'BRE-2026-9041', buyer: 'Liam Vance', brand: 'Apex Athletic USA', country: '🇺🇸', item: '500 GSM Heavyweight Hoodies (600 pcs)', stage: 'Industrial Steam Pressing', clock: '4h', urgent: true },
      { id: 'BRE-2026-8992', buyer: 'David Miller', brand: 'Titan Fightwear AUS', country: '🇦🇺', item: '16 oz Pro Sparring Boxing Gloves (300 pairs)', stage: 'DHL Air Waybill Created', clock: '5h', urgent: true },
      { id: 'BRE-2026-8977', buyer: 'Carlos Rossi', brand: 'Squadra FC Milan', country: '🇮🇹', item: 'Sublimated Football Uniforms (150 kits)', stage: 'Custom Hangtag & Barcode', clock: '8h', urgent: false },
    ],
    sampling: [
      { id: 'SMP-2026-088', buyer: 'Oliver Smith', brand: 'HypeDistrict London', country: '🇬🇧', item: '280 GSM Vintage Wash Sweatpants', stage: 'Proto Sample Lab', clock: '2d', urgent: false },
      { id: 'SMP-2026-084', buyer: 'Elena Gomez', brand: 'Aura Activewear Madrid', country: '🇪🇸', item: 'Scrunch Butt Seamless Leggings', stage: 'Lab Dip Color Approval', clock: '3d', urgent: false },
      { id: 'SMP-2026-079', buyer: 'Jack Thompson', brand: 'Forge Gym Wear CA', country: '🇨🇦', item: 'Drop Shoulder French Terry Zip Hoodie', stage: 'Embroidery Strike-off', clock: '3d', urgent: false },
    ],
  };

  const activeQueue = queueItems[activeQueueTab];

  return (
    <div className="dark-obsidian-dashboard" style={{ color: '#e2e8f0', fontFamily: 'inherit' }}>
      <style jsx>{`
        .dark-obsidian-dashboard {
          --bg-card: #11171a;
          --bg-card-subtle: #151d21;
          --border-subtle: rgba(255, 255, 255, 0.07);
          --border-hover: rgba(0, 229, 153, 0.3);
          --mint: #00e599;
          --mint-dim: rgba(0, 229, 153, 0.12);
          --cyan: #38bdf8;
          --amber: #fbbf24;
          --rose: #f87171;
        }

        .neon-card {
          background: #11171a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 22px;
          position: relative;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }

        .neon-card:hover {
          border-color: rgba(0, 229, 153, 0.25);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(0, 229, 153, 0.15);
        }

        .kpi-card {
          background: #11171a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: all 0.2s ease;
        }

        .kpi-card:hover {
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
          padding: 2px 8px;
          border-radius: 9999px;
          letter-spacing: 0.02em;
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

        .tab-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 12.5px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn.is-active {
          background: #1e293b;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .tab-btn.is-active-mint {
          background: #00e599;
          color: #05140d;
          font-weight: 800;
        }

        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.025);
        }

        .copilot-orb {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #00e599, #0284c7 70%, #0f172a);
          box-shadow: 0 0 24px rgba(0, 229, 153, 0.55), inset 0 0 12px rgba(255, 255, 255, 0.5);
          animation: floatOrb 3.5s ease-in-out infinite;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 0 14px rgba(0,229,153,0.4)); }
          50% { transform: translateY(-4px) scale(1.04); filter: drop-shadow(0 0 22px rgba(56,189,248,0.7)); }
        }

        .bar-segment {
          width: 100%;
          height: 6px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.08);
          margin-bottom: 3px;
          transition: background 0.3s ease;
        }
        .bar-segment.filled-mint {
          background: #00e599;
          box-shadow: 0 0 6px rgba(0, 229, 153, 0.4);
        }
        .bar-segment.filled-cyan {
          background: #38bdf8;
          box-shadow: 0 0 6px rgba(56, 189, 248, 0.4);
        }
        .bar-segment.filled-rose {
          background: #f87171;
          box-shadow: 0 0 6px rgba(248, 113, 113, 0.4);
        }
      `}</style>

      {/* 1. Header Banner & Welcome */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Overview
            </h1>
            <span className="tag-pill tag-mint" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599', display: 'inline-block' }}></span>
              SIALKOT LIVE
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13.5px' }}>
            Good morning, Director. <strong style={{ color: '#ffffff' }}>23 production batches</strong> need factory floor attention today.
          </p>
        </div>

        {/* Global Quick Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', background: '#11171a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '3px' }}>
            <button
              onClick={() => setActiveQueueTab('attention')}
              className={`tab-btn ${activeQueueTab === 'attention' ? 'is-active' : ''}`}
            >
              All Payers
            </button>
            <button
              onClick={() => setActiveQueueTab('today')}
              className={`tab-btn ${activeQueueTab === 'today' ? 'is-active' : ''}`}
            >
              Last 30 days ▾
            </button>
          </div>

          <Link
            href="/admin/production"
            style={{
              background: '#00e599',
              color: '#05140d',
              fontWeight: 800,
              fontSize: '13px',
              padding: '9px 18px',
              borderRadius: '9999px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 16px rgba(0, 229, 153, 0.35)',
              transition: 'transform 0.15s ease',
            }}
          >
            <span>+</span> New Authorization
          </Link>
        </div>
      </div>

      {/* 2. Top 5-Column Sleek KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {/* KPI 1: Active Cases */}
        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b' }}>
              ACTIVE CASES
            </span>
            <span className="tag-pill tag-mint">+4.2%</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            386
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            In active factory lines
          </div>
        </div>

        {/* KPI 2: Pending Payer */}
        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b' }}>
              PENDING PAYER
            </span>
            <span className="tag-pill tag-amber">18 overdue</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            142
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            {inquiries.length} live inquiries queued
          </div>
        </div>

        {/* KPI 3: Approved */}
        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b' }}>
              APPROVED
            </span>
            <span className="tag-pill tag-mint">+12.2%</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            1,127
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            Production sign-offs
          </div>
        </div>

        {/* KPI 4: Denied / Rework */}
        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b' }}>
              DENIED
            </span>
            <span className="tag-pill tag-rose">-7.8%</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            96
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            Pre-flight QC rejected
          </div>
        </div>

        {/* KPI 5: Median Turnaround */}
        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b' }}>
              MEDIAN TURNAROUND
            </span>
            <span className="tag-pill tag-mint">0.6 d faster</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            3.4<span style={{ fontSize: '18px', fontWeight: 600, color: '#94a3b8' }}> d</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            Sampling to bulk sample
          </div>
        </div>
      </div>

      {/* 3. Main Split Widgets: Wave Chart (Left) + Speedometer (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: '16px', marginBottom: '24px' }}>
        
        {/* WIDGET 1: Requests vs Decisions (Glowing Curved Spline Wave) */}
        <div className="neon-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px' }}>📈</span>
                <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                  Requests vs decisions
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '8px' }}>
                <div>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>SUBMITTED</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>1,318</div>
                </div>
                <div>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>DECIDED</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#00e599' }}>1,223</div>
                </div>
                <div>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>BACKLOG CHANGE</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8' }}>+95</div>
                </div>
              </div>
            </div>

            {/* Timeframe pill selector */}
            <div style={{ display: 'flex', background: '#0a0d0e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '3px' }}>
              {(['7d', '30d', '90d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  style={{
                    background: timeframe === t ? '#1e293b' : 'transparent',
                    color: timeframe === t ? '#00e599' : '#64748b',
                    fontWeight: 700,
                    fontSize: '11px',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Glow Wave Area Chart with Interactive Hover */}
          <div style={{ flex: 1, position: 'relative', minHeight: '190px', width: '100%', marginTop: '10px' }}>
            <svg
              viewBox="0 0 600 180"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              <defs>
                {/* Gradient for fill area under the line */}
                <linearGradient id="mintWaveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00e599" stopOpacity="0.28" />
                  <stop offset="70%" stopColor="#00e599" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#00e599" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="cyanWaveLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#00e599" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>

                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background horizontal guide lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Secondary baseline curve (Submissions) */}
              <path
                d="M 10 135 C 100 110, 160 70, 240 78 C 320 86, 380 145, 470 125 C 530 110, 560 65, 590 55"
                fill="none"
                stroke="rgba(56, 189, 248, 0.45)"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Area fill under main curve */}
              <path
                d="M 10 120 C 90 90, 150 50, 230 60 C 310 70, 370 130, 460 110 C 520 95, 550 55, 590 40 L 590 170 L 10 170 Z"
                fill="url(#mintWaveFill)"
              />

              {/* Main Glowing Sine Wave (Decisions) */}
              <path
                d="M 10 120 C 90 90, 150 50, 230 60 C 310 70, 370 130, 460 110 C 520 95, 550 55, 590 40"
                fill="none"
                stroke="url(#cyanWaveLine)"
                strokeWidth="3.2"
                filter="url(#neonGlow)"
              />

              {/* Interactive Data Hover Dots */}
              {[
                { cx: 10, cy: 120, index: 0 },
                { cx: 110, cy: 82, index: 1 },
                { cx: 210, cy: 58, index: 2 },
                { cx: 310, cy: 75, index: 3 },
                { cx: 410, cy: 122, index: 4 },
                { cx: 500, cy: 98, index: 5 },
                { cx: 590, cy: 40, index: 6 },
              ].map((dot) => (
                <g key={dot.index} onClick={() => setActivePoint(dot.index)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={dot.cx}
                    cy={dot.cy}
                    r={activePoint === dot.index ? 6 : 4}
                    fill={activePoint === dot.index ? '#00e599' : '#0f172a'}
                    stroke="#00e599"
                    strokeWidth="2.5"
                    filter="url(#neonGlow)"
                  />
                  {activePoint === dot.index && (
                    <circle cx={dot.cx} cy={dot.cy} r="10" fill="none" stroke="#00e599" strokeWidth="1" opacity="0.4" />
                  )}
                </g>
              ))}
            </svg>

            {/* Floating Glass Tooltip Box as shown in the Reel */}
            {activePoint !== null && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '28%',
                  background: 'rgba(11, 16, 20, 0.94)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 229, 153, 0.3)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 12px rgba(0, 229, 153, 0.2)',
                  pointerEvents: 'none',
                  minWidth: '130px',
                }}
              >
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.04em', marginBottom: '4px' }}>
                  OCT 20 &bull; 2 DAYS
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', fontSize: '12px' }}>
                  <span style={{ color: '#94a3b8' }}>Submitted</span>
                  <strong style={{ color: '#ffffff' }}>81</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', fontSize: '12px', marginTop: '2px' }}>
                  <span style={{ color: '#00e599' }}>Decided</span>
                  <strong style={{ color: '#00e599' }}>71</strong>
                </div>
              </div>
            )}
          </div>

          {/* Bottom X-Axis Date Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '8px', padding: '0 6px' }}>
            {currentWaveData.map((d, i) => (
              <span key={i} style={{ color: activePoint === i ? '#00e599' : '#64748b', transition: 'color 0.2s' }}>
                {d.date}
              </span>
            ))}
          </div>
        </div>

        {/* WIDGET 2: On-time decisions (Radial Gauge Speedometer) */}
        <div className="neon-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px' }}>⏱️</span>
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                On time decisions
              </h3>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>AQL 2.5 PASS</span>
          </div>

          {/* Speedometer Radial Arc + Right Side "If nothing moves" card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', gap: '14px', margin: '14px 0' }}>
            
            {/* Speedometer Dial SVG */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <svg viewBox="0 0 200 120" style={{ width: '100%', maxWidth: '170px', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="35%" stopColor="#fbbf24" />
                    <stop offset="70%" stopColor="#00e599" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>

                {/* Base track arc */}
                <path
                  d="M 20 105 A 75 75 0 0 1 180 105"
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="11"
                  strokeLinecap="round"
                />

                {/* Colored ticks across the 180 degree curve */}
                {Array.from({ length: 26 }).map((_, i) => {
                  const angle = Math.PI + (i / 25) * Math.PI;
                  const x1 = 100 + 78 * Math.cos(angle);
                  const y1 = 105 + 78 * Math.sin(angle);
                  const x2 = 100 + 64 * Math.cos(angle);
                  const y2 = 105 + 64 * Math.sin(angle);
                  const isPassed = i < 23;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isPassed ? (i < 8 ? '#f87171' : i < 15 ? '#fbbf24' : '#00e599') : 'rgba(255,255,255,0.1)'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Animated Neon Arc */}
                <path
                  d="M 20 105 A 75 75 0 0 1 168 55"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 6px rgba(0,229,153,0.5))"
                />
              </svg>

              {/* Big Centered Percentage Value */}
              <div style={{ marginTop: '-42px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                  92<span style={{ fontSize: '20px', color: '#00e599', fontWeight: 700 }}>%</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                  1,125 of 1,223 within clock
                </div>
              </div>
            </div>

            {/* Right Sub-Card: "If nothing moves" countdown box */}
            <div
              style={{
                background: '#0c1114',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '12px 14px',
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em' }}>
                IF NOTHING MOVES
              </div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#fbbf24', margin: '4px 0 2px' }}>
                6<span style={{ fontSize: '15px', color: '#94a3b8' }}> h</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.3 }}>
                until the first clock lapses
              </div>

              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>4</div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>cases lapse within 24 h</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11.5px', color: '#64748b', textAlign: 'center', marginTop: '6px' }}>
            Sorted by SLA clock &bull; 99.4% DHL air transit reliability
          </div>
        </div>
      </div>

      {/* 4. Bottom 3-Card Grid: Open Pipeline (Left) + Queue Table (Center) + Copilot Assistant (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr)', gap: '16px' }}>

        {/* WIDGET 3: Open pipeline (Equalizer Bar Chart) */}
        <div className="neon-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px' }}>📊</span>
                <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                  Open pipeline
                </h3>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                386 ACTIVE &bull; BY STAGE
              </div>
            </div>
            <span style={{ fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>&bull;&bull;&bull;</span>
          </div>

          {/* Equalizer Vertical Segment Bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', alignItems: 'flex-end', height: '140px', padding: '0 4px' }}>
            {pipelineStages.map((stage, sIdx) => {
              const totalSegments = 10;
              const filledSegments = Math.round((stage.fillPct / 100) * totalSegments);

              return (
                <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  {/* Segment stack */}
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column-reverse', marginBottom: '6px' }}>
                    {Array.from({ length: totalSegments }).map((_, segIdx) => {
                      const isFilled = segIdx < filledSegments;
                      let fillClass = '';
                      if (isFilled) {
                        if (stage.color === '#00e599') fillClass = 'filled-mint';
                        else if (stage.color === '#38bdf8' || stage.color === '#2dd4bf') fillClass = 'filled-cyan';
                        else fillClass = 'filled-rose';
                      }

                      return (
                        <div
                          key={segIdx}
                          className={`bar-segment ${fillClass}`}
                        />
                      );
                    })}
                  </div>

                  {/* Stage Label & Count */}
                  <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748b', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                    {stage.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    {stage.count}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#94a3b8' }}>
            <span>6-Stage Production Control</span>
            <Link href="/admin/production" style={{ color: '#00e599', fontWeight: 700, textDecoration: 'none' }}>
              Full Kanban →
            </Link>
          </div>
        </div>

        {/* WIDGET 4: Needs attention queue table */}
        <div className="neon-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Table Tabs Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
              <button
                onClick={() => setActiveQueueTab('attention')}
                style={{
                  background: activeQueueTab === 'attention' ? 'rgba(0, 229, 153, 0.15)' : 'transparent',
                  color: activeQueueTab === 'attention' ? '#00e599' : '#94a3b8',
                  border: activeQueueTab === 'attention' ? '1px solid rgba(0,229,153,0.3)' : '1px solid transparent',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Needs attention <span style={{ opacity: 0.8 }}>(23)</span>
              </button>

              <button
                onClick={() => setActiveQueueTab('today')}
                style={{
                  background: activeQueueTab === 'today' ? 'rgba(0, 229, 153, 0.15)' : 'transparent',
                  color: activeQueueTab === 'today' ? '#00e599' : '#94a3b8',
                  border: activeQueueTab === 'today' ? '1px solid rgba(0,229,153,0.3)' : '1px solid transparent',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Due today <span style={{ opacity: 0.8 }}>(12)</span>
              </button>

              <button
                onClick={() => setActiveQueueTab('sampling')}
                style={{
                  background: activeQueueTab === 'sampling' ? 'rgba(0, 229, 153, 0.15)' : 'transparent',
                  color: activeQueueTab === 'sampling' ? '#00e599' : '#94a3b8',
                  border: activeQueueTab === 'sampling' ? '1px solid rgba(0,229,153,0.3)' : '1px solid transparent',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Sampling <span style={{ opacity: 0.8 }}>(7)</span>
              </button>
            </div>

            {/* List / Table Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeQueue.map((item, idx) => (
                <div
                  key={idx}
                  className="table-row-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.03)',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px' }}>{item.country}</span>
                      <strong style={{ fontSize: '12.5px', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.buyer}
                      </strong>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>&bull; {item.brand}</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.item}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: '12px' }}>
                    <span className={`tag-pill ${item.urgent ? 'tag-amber' : 'tag-mint'}`}>
                      {item.stage}
                    </span>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: item.urgent ? '#fbbf24' : '#94a3b8' }}>
                      {item.clock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#64748b' }}>
            <span>Showing {activeQueue.length} sorted by clock</span>
            <Link href="/admin/inquiries" style={{ color: '#00e599', fontWeight: 700, textDecoration: 'none' }}>
              Open Queue →
            </Link>
          </div>
        </div>

        {/* WIDGET 5: AI Assistant Floating Hologram Copilot Card */}
        <div
          className="neon-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #131d22 0%, #0c1214 100%)',
            border: '1px solid rgba(0, 229, 153, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 229, 153, 0.05)',
          }}
        >
          <div>
            {/* Top Glowing Orb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="copilot-orb"></div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                    BRE Assistant
                  </div>
                  <div style={{ fontSize: '11px', color: '#00e599', fontWeight: 700 }}>
                    AI Insight &bull; Review first
                  </div>
                </div>
              </div>
              <span className="tag-pill tag-mint">GEN-AI</span>
            </div>

            {/* Smart Dispatch Insight Text */}
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#cbd5e1', margin: '0 0 14px' }}>
              <strong style={{ color: '#ffffff' }}>4 Sunvale orders lapse within 12 hours.</strong> Follow up by 2:00 PM PKT before DHL collection window closes.
            </p>

            {/* Buyer Avatar Pill Stack */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', marginLeft: '6px' }}>
                {['🇺🇸', '🇬🇧', '🇫🇷'].map((flag, fIdx) => (
                  <div
                    key={fIdx}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#1e293b',
                      border: '2px solid #0c1214',
                      marginLeft: fIdx > 0 ? '-8px' : '0',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '11px',
                    }}
                  >
                    {flag}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                <strong style={{ color: '#ffffff' }}>AUT-24817 +3</strong> &bull; 1st clock in 9h
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <Link
              href="/admin/production"
              style={{
                flex: 1,
                background: '#00e599',
                color: '#05140d',
                fontWeight: 800,
                fontSize: '12.5px',
                padding: '9px 12px',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 0 12px rgba(0, 229, 153, 0.4)',
              }}
            >
              Review 4 cases
            </Link>
            <button
              onClick={() => setCopilotDismissed(true)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#94a3b8',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                padding: '9px 14px',
                cursor: 'pointer',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
