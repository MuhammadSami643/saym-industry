"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '../components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1. If on /admin/login, render ONLY the standalone login page (NO sidebar, NO topbar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Helper to highlight active nav tab
  const isActive = (route: string) => {
    if (route === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(route);
  };

  const navItemStyle = (route: string) => ({
    padding: '11px 14px',
    borderRadius: '8px',
    color: isActive(route) ? '#ffffff' : '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13.5px',
    fontWeight: isActive(route) ? 700 : 600,
    background: isActive(route) ? 'rgba(243, 166, 38, 0.16)' : 'transparent',
    borderLeft: isActive(route) ? '3px solid var(--brand-orange, #f3a626)' : '3px solid transparent',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        overflow: 'hidden',
        background: '#f8fafc',
        color: '#111827',
        fontFamily: 'inherit',
        zIndex: 99999,
      }}
    >
      {/* 2. 100% FIXED STICKY SIDEBAR: Stays locked on the left, full height */}
      <aside
        style={{
          width: '270px',
          height: '100%',
          background: 'var(--brand-black, #0b0b0d)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '22px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/images/site/1776250498_logo.webp" alt="Bin Rasool Enterprises" style={{ height: '36px', width: 'auto' }} />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                Bin Rasool Enterprises
              </div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--brand-orange, #f3a626)', fontWeight: 800 }}>
                B2B OEM Portal
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ padding: '18px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6b7280', fontWeight: 800, padding: '4px 10px', letterSpacing: '0.05em' }}>
            Operations &amp; Sales
          </div>

          <Link href="/admin" style={navItemStyle('/admin')}>
            <span>📊</span> Dashboard Overview
          </Link>

          <Link href="/admin/inquiries" style={navItemStyle('/admin/inquiries')}>
            <span>✉️</span> Inquiries &amp; RFQs
          </Link>

          <Link href="/admin/email" style={navItemStyle('/admin/email')}>
            <span>📨</span> Email Dispatch &amp; Preview
          </Link>

          <Link href="/admin/buyers" style={navItemStyle('/admin/buyers')}>
            <span>👥</span> Buyer CRM Directory
          </Link>

          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6b7280', fontWeight: 800, padding: '16px 10px 4px', letterSpacing: '0.05em' }}>
            Production &amp; Catalog
          </div>

          <Link href="/admin/production" style={navItemStyle('/admin/production')}>
            <span>🏭</span> Production &amp; Samples
          </Link>

          <Link href="/admin/products" style={navItemStyle('/admin/products')}>
            <span>📦</span> Product Catalog
          </Link>

          <Link href="/admin/analytics" style={navItemStyle('/admin/analytics')}>
            <span>📈</span> B2B Analytics &amp; Trends
          </Link>
        </nav>

        {/* Database Status indicator */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
            <span>Supabase Cloud DB</span>
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Live Sync Connected
          </div>
        </div>

        {/* Bottom Exit Links */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
          <Link
            href="/track-order"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--brand-orange, #f3a626)',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <span>🔍</span> Public Order Tracker ↗
          </Link>
          <Link
            href="/get-quote"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#9ca3af',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <span>⚡</span> Public RFQ Estimator ↗
          </Link>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#9ca3af',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              marginTop: '2px',
            }}
          >
            <span>←</span> Back to Live Site
          </Link>
        </div>
      </aside>

      {/* 3. RIGHT COLUMN: FIXED TOPBAR + SCROLLABLE CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, overflow: 'hidden' }}>
        {/* Fixed Topbar: Never moves while scrolling */}
        <header
          style={{
            height: '66px',
            flexShrink: 0,
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontSize: '13.5px', color: '#6b7280', fontWeight: 500 }}>
            Bin Rasool Enterprises &bull; <strong style={{ color: '#111827' }}>Sialkot Manufacturing Operations</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Logged in as Director/Admin</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-orange, #f3a626)', color: '#000', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '13px' }}>
              B
            </div>
            <LogoutButton />
          </div>
        </header>

        {/* 4. SCROLLABLE CONTENT: Only this inner container scrolls! */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
