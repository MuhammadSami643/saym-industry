import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', color: '#111827', fontFamily: 'inherit' }}>
      {/* Admin Sidebar */}
      <aside
        style={{
          width: '260px',
          background: 'var(--brand-black, #0b0b0d)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/images/site/1776250498_logo.webp" alt="ZYPFIT" style={{ height: '38px', width: 'auto' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '0.04em' }}>ZYPFIT</div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--brand-orange, #f3a626)', fontWeight: 800 }}>Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
          <Link
            href="/admin"
            style={{
              padding: '11px 14px',
              borderRadius: '8px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: 600,
              background: 'rgba(255,255,255,0.06)'
            }}
          >
            <span>📊</span> Dashboard
          </Link>
          <Link
            href="/admin/inquiries"
            style={{
              padding: '11px 14px',
              borderRadius: '8px',
              color: '#d1d5db',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            <span>✉️</span> Inquiries &amp; Quotes
          </Link>
          <Link
            href="/admin/products"
            style={{
              padding: '11px 14px',
              borderRadius: '8px',
              color: '#d1d5db',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            <span>📦</span> Manage Products
          </Link>
        </nav>

        {/* Database Status indicator */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
            <span>Supabase Connected</span>
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            usgibssilkfhjbqycnfj
          </div>
        </div>

        {/* Bottom Exit */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#9ca3af',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <span>←</span> Back to Live Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header
          style={{
            height: '68px',
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>
            Management Console &bull; <strong style={{ color: '#111827' }}>ZYPFIT Factory</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Logged in as Admin</span>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--brand-orange, #f3a626)', color: '#000', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '14px' }}>
              A
            </div>
            <LogoutButton />
          </div>
        </header>

        {/* Content body */}
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
