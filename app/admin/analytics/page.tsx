import Link from 'next/link';
import {
  MonthlyExportChart,
  CategoryDonutChart,
  B2BConversionFunnel,
  FactoryCapacityGauges,
} from '../../components/AdminCharts';

export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  const topCountries = [
    { country: 'United States', share: 44, inquiries: 142, flag: '🇺🇸', color: '#3b82f6', amount: '$428,000' },
    { country: 'United Kingdom', share: 22, inquiries: 71, flag: '🇬🇧', color: '#6366f1', amount: '$214,000' },
    { country: 'Germany & EU', share: 16, inquiries: 52, flag: '🇩🇪', color: '#10b981', amount: '$156,000' },
    { country: 'Australia', share: 11, inquiries: 36, flag: '🇦🇺', color: '#f59e0b', amount: '$107,000' },
    { country: 'UAE & Middle East', share: 7, inquiries: 23, flag: '🇦🇪', color: '#ec4899', amount: '$68,000' },
  ];

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* Title */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#111827' }}>
            Global B2B Sourcing Analytics &amp; Market Intelligence
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Real-time interactive metrics on export destinations, fabric demand trends, and sample-to-bulk conversion rates.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/admin/inquiries"
            className="btn btn-outline"
            style={{ fontSize: '13px', padding: '9px 16px', textDecoration: 'none' }}
          >
            ✉️ View Inquiries
          </Link>
          <Link
            href="/admin/production"
            className="btn btn-primary"
            style={{ fontSize: '13px', padding: '9px 18px', textDecoration: 'none' }}
          >
            🏭 Factory Floor
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: '#fff', padding: '22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Total Inquiries Processed</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#111827', margin: '8px 0 2px' }}>324</div>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>+28% month-over-month</span>
        </div>

        <div style={{ background: '#fff', padding: '22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Sample-to-Bulk Conversion</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#2563eb', margin: '8px 0 2px' }}>64.2%</div>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Industry benchmark: 40%</span>
        </div>

        <div style={{ background: '#fff', padding: '22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Average Production Order</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#b45309', margin: '8px 0 2px' }}>480 pcs</div>
          <span style={{ fontSize: '12px', color: '#b45309', fontWeight: 700 }}>$14,200 avg invoice</span>
        </div>

        <div style={{ background: '#fff', padding: '22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>On-Time Export Rate</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#15803d', margin: '8px 0 2px' }}>99.2%</div>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>Direct FOB Sialkot clearance</span>
        </div>
      </div>

      {/* Row 1: Interactive Monthly Revenue Chart & Category Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        <MonthlyExportChart />
        <CategoryDonutChart />
      </div>

      {/* Row 2: Conversion Funnel & Factory Department Gauges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        <B2BConversionFunnel />
        <FactoryCapacityGauges />
      </div>

      {/* Row 3: Geographic Buyer Destinations & Export Invoicing Table */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-orange, #f3a626)', letterSpacing: '0.08em' }}>
              Geographic Penetration
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0' }}>
              Export Value &amp; Buyer Volume by Country
            </h2>
          </div>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Updated real-time from inquiries</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {topCountries.map((c, i) => (
            <div key={i} style={{ borderBottom: i < topCountries.length - 1 ? '1px solid #f8fafc' : 'none', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>{c.flag} {c.country}</span>
                <span style={{ color: '#0f172a', fontWeight: 800 }}>
                  {c.amount} &bull; <span style={{ color: '#64748b', fontWeight: 600 }}>{c.share}% ({c.inquiries} inquiries)</span>
                </span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${c.share}%`,
                    background: c.color,
                    borderRadius: '999px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
