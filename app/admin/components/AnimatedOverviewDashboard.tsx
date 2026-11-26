"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../../components/AnimatedCounter';
import { ArrowRightIcon, PlusIcon } from '../../components/AdminIcons';
import { LiveWebTrafficMonitorChart, TrafficAcquisitionChannels, CategoryDonutChart } from '../../components/AdminCharts';

interface Props {
  inquiries: any[];
  products: any[];
}

export default function AnimatedOverviewDashboard({ inquiries, products }: Props) {
  // Chart timeframe state
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  // Interactive hover tooltip on wave chart
  const [activePoint, setActivePoint] = useState<number | null>(4);
  // Batch table filter tab
  const [activeBatchTab, setActiveBatchTab] = useState<'all' | 'stitching' | 'printing' | 'qa'>('all');
  // AI Copilot card dismiss state
  const [copilotDismissed, setCopilotDismissed] = useState(false);

  // Timeframe data series for the realistic export volume & revenue wave
  const waveDataMap = {
    '7d': [
      { date: 'MON', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'TUE', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'WED', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'THU', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'FRI', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'SAT', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'SUN', produced: 0, shipped: 0, label: 'Standby' },
    ],
    '30d': [
      { date: 'WEEK 1', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'WEEK 2', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'WEEK 3', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'WEEK 4', produced: 0, shipped: 0, label: 'Standby' },
    ],
    '90d': [
      { date: 'MONTH 1', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'MONTH 2', produced: 0, shipped: 0, label: 'Standby' },
      { date: 'MONTH 3', produced: 0, shipped: 0, label: 'Standby' },
    ],
  };

  const currentWaveData = waveDataMap[timeframe];

  // Real Sialkot Factory Floor Machine Utilization Stages
  const floorDepartments = [
    { name: 'FABRIC LASER CAD', count: 0, fillPct: 0, color: '#00e599', target: 'Standby' },
    { name: '4-NEEDLE FLATLOCK', count: 0, fillPct: 0, color: '#00e599', target: 'Standby' },
    { name: 'SCREEN & PUFF PRINT', count: 0, fillPct: 0, color: '#38bdf8', target: 'Standby' },
    { name: 'STEAM PRESS & FINISH', count: 0, fillPct: 0, color: '#00e599', target: 'Standby' },
    { name: 'AQL 2.5 QA AUDIT', count: 0, fillPct: 0, color: '#2dd4bf', target: 'Inspection Ready' },
    { name: 'EXPORT PACKAGING', count: 0, fillPct: 0, color: '#fbbf24', target: 'Standby' },
    { name: 'DHL DISPATCH HUB', count: 0, fillPct: 0, color: '#f87171', target: 'Daily Pickup' },
  ];

  // Garment Production Batches (Zero / Real Baseline)
  const productionBatches: Array<{
    id: string;
    buyer: string;
    brand: string;
    country: string;
    item: string;
    stage: string;
    progress: number;
    deliveryClock: string;
    priority: string;
    tagColor: string;
  }> = [];

  const filteredBatches = productionBatches.filter(b => {
    if (activeBatchTab === 'stitching') return b.stage.includes('Stitching');
    if (activeBatchTab === 'printing') return b.stage.includes('Wash') || b.stage.includes('Laser');
    if (activeBatchTab === 'qa') return b.stage.includes('QA') || b.stage.includes('Steam');
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: '40px', color: '#e2e8f0', fontFamily: 'inherit' }}
    >
      <style jsx global>{`
        .kpi-card {
          background: rgba(14, 21, 26, 0.62);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kpi-card:hover {
          background: rgba(18, 28, 34, 0.78);
          border-color: rgba(52, 211, 153, 0.32);
          border-top: 1px solid rgba(52, 211, 153, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 14px 38px rgba(0, 0, 0, 0.48), 0 0 18px rgba(52, 211, 153, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .neon-card {
          background: rgba(14, 21, 26, 0.62);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 16px;
          padding: 22px;
          position: relative;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .neon-card:hover {
          border-color: rgba(52, 211, 153, 0.3);
          border-top: 1px solid rgba(52, 211, 153, 0.55);
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.48), 0 0 20px rgba(52, 211, 153, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .tag-mint {
          background: rgba(52, 211, 153, 0.12);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.28);
        }
        .tag-cyan {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.25);
        }
        .tag-amber {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.28);
        }
        .tag-rose {
          background: rgba(248, 113, 113, 0.12);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.28);
        }
        .tab-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .tab-btn.is-active {
          background: rgba(52, 211, 153, 0.14);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.32);
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
      `}</style>

      {/* 1. Header Banner: Operations Command */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Operations Command Center
            </h1>
            <span className="tag-pill tag-mint" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }}></span>
              SIALKOT PLANT #1 &bull; LIVE
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13.5px' }}>
            Bin Rasool Enterprises &bull; <strong style={{ color: '#ffffff' }}>{productionBatches.length} active production batches</strong> in manufacturing queue.
          </p>
        </div>

        {/* Global Quick Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', background: 'rgba(17, 23, 26, 0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '3px' }}>
            <button
              onClick={() => setActiveBatchTab('all')}
              className={`tab-btn ${activeBatchTab === 'all' ? 'is-active' : ''}`}
            >
              All Batches
            </button>
            <button
              onClick={() => setActiveBatchTab('stitching')}
              className={`tab-btn ${activeBatchTab === 'stitching' ? 'is-active' : ''}`}
            >
              Stitching Lines
            </button>
            <button
              onClick={() => setActiveBatchTab('qa')}
              className={`tab-btn ${activeBatchTab === 'qa' ? 'is-active' : ''}`}
            >
              QA &amp; Pack
            </button>
          </div>

          <Link
            href="/admin/production"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.28) 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '12px',
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid rgba(52, 211, 153, 0.38)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
            }}
          >
            <PlusIcon size={13} style={{ color: '#34d399' }} />
            <span>New Production Batch</span>
          </Link>
        </div>
      </motion.div>

      {/* 2. Top 4-Column Realistic Export KPI Stats */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}
      >
        {/* KPI 1: Monthly Export Shipments */}
        <motion.div className="kpi-card" whileHover={{ scale: 1.015 }} transition={{ duration: 0.2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              MONTHLY EXPORT INVOICING
            </span>
            <span className="tag-pill tag-mint">0% MoM</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            <AnimatedCounter value={0} prefix="$" duration={1.2} delay={0.25} />
          </div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
            No export shipments invoiced this month
          </div>
        </motion.div>

        {/* KPI 2: Active Garment Production Runs */}
        <motion.div className="kpi-card" whileHover={{ scale: 1.015 }} transition={{ duration: 0.2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              ACTIVE FACTORY RUNS
            </span>
            <span className="tag-pill tag-cyan">{productionBatches.length} Batches</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            <AnimatedCounter value={0} suffix=" pcs" duration={1.2} delay={0.3} />
          </div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
            All production lines on standby
          </div>
        </motion.div>

        {/* KPI 3: Buyer RFQs & Inquiries */}
        <motion.div className="kpi-card" whileHover={{ scale: 1.015 }} transition={{ duration: 0.2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              PENDING BUYER RFQS
            </span>
            <span className="tag-pill tag-amber">{inquiries.length} Tech Packs</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: inquiries.length > 0 ? '#fbbf24' : '#ffffff', letterSpacing: '-0.02em' }}>
            <AnimatedCounter value={inquiries.length} duration={1.2} delay={0.35} />
          </div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
            Inbound inquiries from website forms
          </div>
        </motion.div>

        {/* KPI 4: AQL 2.5 Quality Inspection Clearance */}
        <motion.div className="kpi-card" whileHover={{ scale: 1.015 }} transition={{ duration: 0.2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              AQL 2.5 EXPORT PASS RATE
            </span>
            <span className="tag-pill tag-mint">Export Grade</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#00e599', letterSpacing: '-0.02em' }}>
            <AnimatedCounter value={100} suffix="%" duration={1.2} delay={0.4} />
          </div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
            Inspection lines calibrated to AQL 2.5 standard
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Middle Split Widgets: Export Wave Chart (Left 60%) + Machine Capacity (Right 40%) */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" as const }}
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: '16px', marginBottom: '24px' }}
      >
        
        {/* WIDGET 1: Export Invoices vs Units Shipped Wave Chart */}
        <motion.div variants={itemVariants} className="neon-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>📈</span>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Export Throughput &amp; Invoicing Curve
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                <div>
                  <span style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>REVENUE SHIPPED</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#00e599' }}>
                    <AnimatedCounter value={0} prefix="$" suffix=" USD" duration={1.2} delay={0.4} />
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '16px' }}>
                  <span style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>UNITS DISPATCHED</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8' }}>
                    <AnimatedCounter value={0} suffix=" Pcs" duration={1.2} delay={0.45} />
                  </div>
                </div>
              </div>
            </div>

            {/* Timeframe pill tabs */}
            <div style={{ display: 'flex', background: '#090d0f', borderRadius: '9999px', padding: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
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
                    transition: 'all 0.15s',
                  }}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Glow Wave Area Chart */}
          <div style={{ flex: 1, position: 'relative', minHeight: '190px', width: '100%', marginTop: '6px' }}>
            <svg
              viewBox="0 0 600 180"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="mintExportWaveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00e599" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#00e599" stopOpacity="0" />
                </linearGradient>

                <filter id="neonGlowLine" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background horizontal guide lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="145" x2="600" y2="145" stroke="rgba(255,255,255,0.1)" />

              {/* Baseline Area fill under zero */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                d="M 10 145 L 590 145 L 590 170 L 10 170 Z"
                fill="url(#mintExportWaveFill)"
              />

              {/* Main Zero Baseline Line */}
              <motion.path
                key={timeframe}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                d="M 10 145 L 590 145"
                fill="none"
                stroke="#00e599"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#neonGlowLine)"
              />

              {/* Interactive Data Nodes on Baseline */}
              {currentWaveData.map((d, i) => {
                const total = currentWaveData.length;
                const x = 30 + (i / (total - 1)) * 540;
                const y = 145;

                return (
                  <g key={i} style={{ cursor: 'pointer' }} onMouseEnter={() => setActivePoint(i)}>
                    <circle
                      cx={x}
                      cy={y}
                      r={activePoint === i ? 5.5 : 3.5}
                      fill={activePoint === i ? '#ffffff' : '#00e599'}
                      stroke="#090d0f"
                      strokeWidth={2}
                      style={{ transition: 'all 0.15s ease' }}
                    />
                    <text
                      x={x}
                      y={174}
                      textAnchor="middle"
                      fill={activePoint === i ? '#00e599' : '#64748b'}
                      fontSize="10"
                      fontWeight={activePoint === i ? 800 : 600}
                    >
                      {d.date}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip */}
            {activePoint !== null && currentWaveData[activePoint] && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: `${(activePoint / (currentWaveData.length - 1)) * 75 + 12}%`,
                  transform: 'translateX(-50%)',
                  background: '#090d0f',
                  border: '1px solid rgba(0, 229, 153, 0.4)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                  fontSize: '11.5px',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                <div style={{ color: '#00e599', fontWeight: 800, marginBottom: '2px' }}>
                  {currentWaveData[activePoint].label} ({currentWaveData[activePoint].date})
                </div>
                <div style={{ color: '#ffffff' }}>
                  Produced: <strong>0 pcs</strong> &bull; Shipped: <strong>0 pcs</strong>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* WIDGET 2: Sialkot Floor Department Machine Utilization */}
        <motion.div variants={itemVariants} className="neon-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00e599', fontWeight: 800 }}>
                  SIALKOT SHOP FLOOR
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '2px 0 0', color: '#ffffff' }}>
                  Machine &amp; Line Utilization
                </h3>
              </div>
              <span className="tag-pill tag-mint">0.0% Standby</span>
            </div>

            {/* Department Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginTop: '12px' }}>
              {floorDepartments.slice(0, 5).map((dept, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: '#cbd5e1' }}>{dept.name}</span>
                    <span style={{ color: '#94a3b8', fontWeight: 700 }}>
                      {dept.fillPct}% <span style={{ color: '#64748b', fontWeight: 600 }}>({dept.target})</span>
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${dept.fillPct}%` }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.9, delay: idx * 0.1, ease: "easeOut" as const }}
                      style={{
                        height: '100%',
                        background: dept.color,
                        borderRadius: '999px',
                        boxShadow: `0 0 6px ${dept.color}66`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Floor Dispatch Clearance Status */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px 14px',
              background: '#0d1316',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
                DAILY DHL AIRWAY CLEARANCE
              </div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                0 Air Freight Pallets Ready
              </div>
            </div>
            <Link
              href="/admin/production"
              style={{
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#00e599',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span>Floor Dispatch</span>
              <ArrowRightIcon size={12} />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Real-Time Live Web Traffic Monitor & Active Buyer Radar */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" as const }}
        style={{ marginBottom: '24px' }}
      >
        <LiveWebTrafficMonitorChart />
      </motion.div>

      {/* Traffic Acquisition Channels & Category Distribution Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" as const }}
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '16px', marginBottom: '24px' }}
      >
        <TrafficAcquisitionChannels />
        <CategoryDonutChart />
      </motion.div>

      {/* 4. Bottom Operational Queues & Live Inquiries (65% / 35% Split) */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" as const }}
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1fr)', gap: '16px' }}
      >
        
        {/* LEFT (65%): Active Production Batches Operational Table */}
        <motion.div variants={itemVariants} className="neon-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00e599', fontWeight: 800 }}>
                BATCH MANAGEMENT
              </span>
              <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '2px 0 0', color: '#ffffff' }}>
                Active Production Orders &amp; Shipment Tracking
              </h3>
            </div>
            <Link
              href="/admin/production"
              style={{ fontSize: '12px', fontWeight: 700, color: '#00e599', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <span>View All {productionBatches.length} Batches</span>
              <ArrowRightIcon size={12} />
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ background: '#0d1316', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ORDER / BUYER</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>GARMENT SPECIFICATION</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>STAGE</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>LEAD CLOCK</th>
                  <th style={{ padding: '10px 14px', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>PRIORITY</th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '36px 14px', textAlign: 'center', color: '#94a3b8' }}>
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏭</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>No Production Batches Running</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Initiate a new batch or convert an inquiry to start tracking shop floor progress.</div>
                    </td>
                  </tr>
                ) : (
                  filteredBatches.map((b) => (
                    <tr
                      key={b.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 153, 0.03)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 800, color: '#ffffff' }}>{b.buyer} {b.country}</div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>{b.brand} &bull; <span style={{ color: '#38bdf8' }}>{b.id}</span></div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#e2e8f0', maxWidth: '240px' }}>
                        {b.item}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#ffffff' }}>{b.stage}</div>
                        <div style={{ height: '4px', width: '80px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', marginTop: '4px', overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${b.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut" as const }}
                            style={{ height: '100%', background: '#00e599', borderRadius: '999px' }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#cbd5e1', fontWeight: 600 }}>
                        {b.deliveryClock}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <span className={`tag-pill ${b.tagColor}`}>
                          {b.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* RIGHT (35%): AI Floor Copilot & Live Buyer RFQs Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Card A: Sialkot Operations AI Copilot */}
          <AnimatePresence>
            {!copilotDismissed && (
              <motion.div
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.95 }}
                className="neon-card"
                style={{
                  background: 'linear-gradient(180deg, rgba(19, 29, 34, 0.75) 0%, rgba(13, 19, 22, 0.85) 100%)',
                  border: '1px solid rgba(52, 211, 153, 0.28)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>✨</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                        Sialkot Operations AI
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#34d399', fontWeight: 700 }}>
                        Production Standby
                      </div>
                    </div>
                  </div>
                  <span className="tag-pill tag-mint">READY</span>
                </div>

                <p style={{ fontSize: '12.5px', lineHeight: '1.5', color: '#cbd5e1', margin: '0 0 14px' }}>
                  All factory lines and fabric cutting tables currently on standby. Sialkot Operations AI will automatically flag batch QA &amp; shrinkage alerts here as orders run.
                </p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    href="/admin/production"
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.28) 100%)',
                      color: '#ffffff',
                      border: '1px solid rgba(52, 211, 153, 0.38)',
                      fontWeight: 700,
                      fontSize: '12px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>Open Production</span>
                    <ArrowRightIcon size={13} style={{ color: '#34d399' }} />
                  </Link>
                  <button
                    onClick={() => setCopilotDismissed(true)}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      color: '#94a3b8',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '9999px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      padding: '8px 16px',
                      cursor: 'pointer',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card B: Live Inquiries Stream */}
          <motion.div variants={itemVariants} className="neon-card" style={{ flex: 1, borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8', fontWeight: 800 }}>
                  LIVE INTAKE
                </span>
                <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '2px 0 0', color: '#ffffff' }}>
                  Recent Buyer Inquiries ({inquiries.length})
                </h4>
              </div>
              <Link href="/admin/inquiries" style={{ fontSize: '11.5px', color: '#34d399', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Open Queue</span>
                <ArrowRightIcon size={12} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {inquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 14px', color: '#94a3b8', background: 'rgba(13, 19, 22, 0.45)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>📬</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>No Buyer Inquiries in Queue</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Inbound RFQs &amp; tech packs from the website will appear here in real time.</div>
                </div>
              ) : (
                inquiries.slice(0, 3).map((inq: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(13, 19, 22, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '12px', color: '#ffffff' }}>{inq.name}</span>
                      <span style={{ fontSize: '10.5px', color: '#38bdf8', fontWeight: 700 }}>{inq.company || inq.country || 'Inquiry Client'}</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {inq.details || 'Technical pack attached for custom apparel quotation.'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
