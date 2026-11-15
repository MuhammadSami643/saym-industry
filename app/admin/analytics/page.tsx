"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MonthlyExportChart,
  CategoryDonutChart,
  B2BConversionFunnel,
  FactoryCapacityGauges,
} from '../../components/AdminCharts';

export default function AnalyticsPage() {
  const topCountries = [
    { country: 'United States', share: 44, inquiries: 142, flag: '🇺🇸', color: '#00e599', amount: '$428,000' },
    { country: 'United Kingdom', share: 22, inquiries: 71, flag: '🇬🇧', color: '#38bdf8', amount: '$214,000' },
    { country: 'Germany & EU', share: 16, inquiries: 52, flag: '🇩🇪', color: '#2dd4bf', amount: '$156,000' },
    { country: 'Australia', share: 11, inquiries: 36, flag: '🇦🇺', color: '#fbbf24', amount: '$107,000' },
    { country: 'UAE & Middle East', share: 7, inquiries: 23, flag: '🇦🇪', color: '#f87171', amount: '$68,000' },
  ];

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* Title & Live Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00e599' }}>
              MARKET INTELLIGENCE &bull; GLOBAL METRICS
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599', boxShadow: '0 0 8px #00e599' }} />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
            B2B Sourcing Analytics &amp; Throughput
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Real-time interactive metrics on export destinations, fabric demand trends, and sample-to-bulk conversion rates.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/admin/inquiries"
            style={{
              fontSize: '12.5px',
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: '9999px',
              textDecoration: 'none',
              background: '#11171a',
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.15s ease',
            }}
          >
            ✉️ View Inquiries
          </Link>
          <Link
            href="/admin/production"
            style={{
              fontSize: '12.5px',
              fontWeight: 800,
              padding: '8px 18px',
              borderRadius: '9999px',
              textDecoration: 'none',
              background: '#00e599',
              color: '#05140d',
              boxShadow: '0 0 16px rgba(0, 229, 153, 0.35)',
            }}
          >
            🏭 Factory Floor
          </Link>
        </div>
      </motion.div>

      {/* KPI Cards Strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" as const }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}
      >
        <div style={{ background: '#11171a', padding: '18px 20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Inquiries Processed</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', margin: '6px 0 2px' }}>324</div>
          <span style={{ fontSize: '11.5px', color: '#00e599', fontWeight: 700 }}>+28% month-over-month</span>
        </div>

        <div style={{ background: '#11171a', padding: '18px 20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sample-to-Bulk Conversion</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#38bdf8', margin: '6px 0 2px' }}>64.2%</div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Industry benchmark: 40%</span>
        </div>

        <div style={{ background: '#11171a', padding: '18px 20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Average Production Order</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#fbbf24', margin: '6px 0 2px' }}>480 pcs</div>
          <span style={{ fontSize: '11.5px', color: '#fbbf24', fontWeight: 700 }}>$14,200 avg invoice</span>
        </div>

        <div style={{ background: '#11171a', padding: '18px 20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>On-Time Export Clearance</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#00e599', margin: '6px 0 2px' }}>99.2%</div>
          <span style={{ fontSize: '11.5px', color: '#00e599', fontWeight: 700 }}>Direct FOB Sialkot clearance</span>
        </div>
      </motion.div>

      {/* Row 1: Interactive Monthly Revenue Chart & Category Donut */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" as const }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}
      >
        <MonthlyExportChart />
        <CategoryDonutChart />
      </motion.div>

      {/* Row 2: Conversion Funnel & Factory Department Gauges */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" as const }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}
      >
        <B2BConversionFunnel />
        <FactoryCapacityGauges />
      </motion.div>

      {/* Row 3: Geographic Buyer Destinations & Export Invoicing Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" as const }}
        style={{
          background: '#11171a',
          padding: '24px',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#00e599', letterSpacing: '0.08em' }}>
              GEOGRAPHIC PENETRATION
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '4px 0 0' }}>
              Export Value &amp; Buyer Volume by Country
            </h2>
          </div>
          <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Updated live from active inquiries</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {topCountries.map((c, i) => (
            <div
              key={i}
              style={{
                background: '#0d1316',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '14px 18px',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>{c.flag}</span> {c.country}
                </span>
                <span style={{ color: '#00e599', fontWeight: 800 }}>
                  {c.amount} &bull; <span style={{ color: '#94a3b8', fontWeight: 600 }}>{c.share}% ({c.inquiries} inquiries)</span>
                </span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.share}%` }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" as const }}
                  style={{
                    height: '100%',
                    background: c.color,
                    borderRadius: '999px',
                    boxShadow: `0 0 6px ${c.color}66`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
