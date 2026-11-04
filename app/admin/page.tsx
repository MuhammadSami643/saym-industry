import Link from 'next/link';
import { getInquiries, getProducts } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const inquiries = await getInquiries();
  const products = await getProducts();

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#111827' }}>
            Dashboard Overview
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Monitor manufacturing inquiries, catalog items, and production leads.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/admin/products"
            className="btn btn-primary"
            style={{ fontSize: '13px', padding: '9px 18px', minHeight: '38px' }}
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: '#fff', padding: '22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Total Inquiries</span>
            <span style={{ fontSize: '20px' }}>✉️</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#111827', margin: '10px 0 4px' }}>
            {inquiries.length}
          </div>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Active buyer leads</span>
        </div>

        <div style={{ background: '#fff', padding: '22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Catalog Products</span>
            <span style={{ fontSize: '20px' }}>📦</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#111827', margin: '10px 0 4px' }}>
            {products.length}
          </div>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Across 4 core categories</span>
        </div>

        <div style={{ background: '#fff', padding: '22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Database Status</span>
            <span style={{ fontSize: '20px' }}>⚡</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a', margin: '16px 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
            Supabase Live
          </div>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>usgibssilkfhjbqycnfj</span>
        </div>
      </div>

      {/* Recent Inquiries Section */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#111827' }}>
              Recent Inquiries &amp; Quote Requests
            </h2>
          </div>
          <Link href="/admin/inquiries" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-orange-dark, #d98816)' }}>
            View All Inquiries →
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', color: '#64748b' }}>
                <th style={{ padding: '12px 24px', fontWeight: 600 }}>Buyer Name</th>
                <th style={{ padding: '12px 24px', fontWeight: 600 }}>Email</th>
                <th style={{ padding: '12px 24px', fontWeight: 600 }}>Subject / Product</th>
                <th style={{ padding: '12px 24px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '12px 24px', fontWeight: 600, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                    No inquiries received yet. New inquiries submitted through the contact form will appear here.
                  </td>
                </tr>
              ) : (
                inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600, color: '#0f172a' }}>
                      {inq.name}
                    </td>
                    <td style={{ padding: '16px 24px', color: '#475569' }}>
                      <a href={`mailto:${inq.email}`} style={{ color: 'inherit' }}>{inq.email}</a>
                    </td>
                    <td style={{ padding: '16px 24px', color: '#334155', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {inq.subject || inq.details}
                    </td>
                    <td style={{ padding: '16px 24px', color: '#64748b', fontSize: '13px' }}>
                      {inq.date ? new Date(inq.date).toLocaleDateString() : 'Recent'}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <Link
                        href="/admin/inquiries"
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: 'var(--brand-orange-light, #fff1d6)',
                          color: 'var(--brand-orange-dark, #9a5b00)'
                        }}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
