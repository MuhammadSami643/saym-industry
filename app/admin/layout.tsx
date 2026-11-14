"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '../components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentDateTime, setCurrentDateTime] = useState('• WED 14 NOV • 17:30 PKT');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Karachi',
        hour12: false,
      };
      const formatted = now.toLocaleDateString('en-GB', options).toUpperCase();
      setCurrentDateTime(`• ${formatted} PKT`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // 1. If on /admin/login, render ONLY the standalone login page (NO sidebar, NO topbar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const isActive = (route: string) => {
    if (route === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(route);
  };

  const navItemClass = (route: string) => {
    const active = isActive(route);
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '9px 12px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: active ? 700 : 500,
      color: active ? '#ffffff' : '#94a3b8',
      background: active ? 'rgba(0, 229, 153, 0.12)' : 'transparent',
      border: active ? '1px solid rgba(0, 229, 153, 0.25)' : '1px solid transparent',
      textDecoration: 'none',
      transition: 'all 0.18s ease',
      boxShadow: active ? '0 0 12px rgba(0, 229, 153, 0.12)' : 'none',
    };
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        overflow: 'hidden',
        background: '#090d0f',
        color: '#e2e8f0',
        fontFamily: 'inherit',
        zIndex: 99999,
      }}
    >
      <style jsx global>{`
        /* Global dark obsidian scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #090d0f;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00e599;
        }
      `}</style>

      {/* 2. 100% FIXED STICKY SIDEBAR (Dark Obsidian Aesthetic) */}
      <aside
        style={{
          width: '264px',
          height: '100%',
          background: '#0d1316',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255, 255, 255, 0.07)',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '18px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#00e599',
                color: '#05140d',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 900,
                fontSize: '16px',
                boxShadow: '0 0 14px rgba(0, 229, 153, 0.5)',
              }}
            >
              V
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                Veyra / BRE
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Alder Ridge &bull; Sialkot HQ
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, padding: '4px 8px', letterSpacing: '0.08em' }}>
            MAIN
          </div>

          <Link href="/admin" style={navItemClass('/admin')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin') ? '#00e599' : '#64748b' }}>⊞</span> Overview
            </span>
          </Link>

          <Link href="/admin/inquiries" style={navItemClass('/admin/inquiries')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/inquiries') ? '#00e599' : '#64748b' }}>≡</span> Authorization queue
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                background: 'rgba(255,255,255,0.08)',
                color: '#e2e8f0',
                padding: '1px 7px',
                borderRadius: '9999px',
              }}
            >
              23
            </span>
          </Link>

          <Link href="/admin/production" style={navItemClass('/admin/production')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/production') ? '#00e599' : '#64748b' }}>⚙</span> Documentation
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                background: 'rgba(255,255,255,0.08)',
                color: '#e2e8f0',
                padding: '1px 7px',
                borderRadius: '9999px',
              }}
            >
              31
            </span>
          </Link>

          <Link href="/admin/email" style={navItemClass('/admin/email')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/email') ? '#00e599' : '#64748b' }}>✉</span> Denials and appeals
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                background: 'rgba(255,255,255,0.08)',
                color: '#e2e8f0',
                padding: '1px 7px',
                borderRadius: '9999px',
              }}
            >
              19
            </span>
          </Link>

          <Link href="/admin/buyers" style={navItemClass('/admin/buyers')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/buyers') ? '#00e599' : '#64748b' }}>👤</span> Patients &amp; Buyers
            </span>
          </Link>

          <Link href="/admin/products" style={navItemClass('/admin/products')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/products') ? '#00e599' : '#64748b' }}>📦</span> Payers &amp; Catalog
            </span>
          </Link>

          <Link href="/admin/analytics" style={navItemClass('/admin/analytics')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/analytics') ? '#00e599' : '#64748b' }}>⚡</span> Operational intel
            </span>
          </Link>

          {/* SAVED VIEWS SECTION AS SEEN IN THE REEL */}
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, padding: '16px 8px 6px', letterSpacing: '0.08em', display: 'flex', justifyContent: 'space-between' }}>
            <span>SAVED VIEWS</span>
            <span style={{ cursor: 'pointer', color: '#94a3b8' }}>+</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 8px', fontSize: '12.5px', color: '#94a3b8', cursor: 'pointer', borderRadius: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f87171' }}></span>
              Clock risk
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>6</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 8px', fontSize: '12.5px', color: '#94a3b8', cursor: 'pointer', borderRadius: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599' }}></span>
              Expedited
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>11</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 8px', fontSize: '12.5px', color: '#94a3b8', cursor: 'pointer', borderRadius: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }}></span>
              Assigned to me
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>38</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 8px', fontSize: '12.5px', color: '#94a3b8', cursor: 'pointer', borderRadius: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24' }}></span>
              Appeals due
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>9</span>
          </div>

          {/* WORKSPACE SECTION */}
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, padding: '16px 8px 6px', letterSpacing: '0.08em' }}>
            WORKSPACE
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 8px', fontSize: '12.5px', color: '#94a3b8', cursor: 'pointer' }}>
            <span>👥</span> Team management
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 8px', fontSize: '12.5px', color: '#94a3b8', cursor: 'pointer' }}>
            <span>⚙️</span> Settings
          </div>
        </nav>

        {/* BOTTOM PORTAL SYNC STATUS WIDGET (Exact match from Reel) */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.35)', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#00e599' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00e599', boxShadow: '0 0 6px #00e599' }}></span>
              PORTALS SYNCED
            </div>
            <span style={{ fontSize: '10px', color: '#64748b' }}>2 m ago</span>
          </div>
          <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: '78%', height: '100%', background: '#00e599', borderRadius: '9999px', boxShadow: '0 0 8px #00e599' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '10.5px', color: '#64748b' }}>
            <span>Holden is slow today</span>
            <span style={{ color: '#00e599', cursor: 'pointer', fontWeight: 600 }}>View</span>
          </div>
        </div>

        {/* Live Site Link */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, fontSize: '11px' }}>
          <Link href="/" target="_blank" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            Live Website ↗
          </Link>
          <Link href="/track-order" target="_blank" style={{ color: '#00e599', fontWeight: 700, textDecoration: 'none' }}>
            Tracker ↗
          </Link>
        </div>
      </aside>

      {/* 3. RIGHT COLUMN: FIXED DARK TOPBAR + SCROLLABLE DASHBOARD */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, overflow: 'hidden' }}>
        
        {/* Top Navigation Bar from Reel */}
        <header
          style={{
            height: '60px',
            flexShrink: 0,
            background: '#0d1316',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Search Bar Pill with Command-K */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#090d0f',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '9999px',
              padding: '6px 14px',
              width: '380px',
              maxWidth: '100%',
            }}
          >
            <span style={{ color: '#64748b', fontSize: '13px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search patients, auth IDs or payers..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '12.5px',
                width: '100%',
              }}
            />
            <span
              style={{
                fontSize: '10px',
                color: '#64748b',
                background: '#151d21',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              ⌘K
            </span>
          </div>

          {/* Right Header Status Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Live Dual Time Indicator */}
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599', display: 'inline-block' }}></span>
              <span>{currentDateTime}</span>
            </div>

            {/* AI Sparkle Icon Pill */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#131d22',
                border: '1px solid rgba(0, 229, 153, 0.3)',
                display: 'grid',
                placeItems: 'center',
                color: '#00e599',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              ✨
            </div>

            {/* Notification Bell with Badge */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#131d22',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '13px',
                  color: '#94a3b8',
                }}
              >
                🔔
              </div>
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  background: '#00e599',
                  color: '#05140d',
                  fontSize: '9.5px',
                  fontWeight: 900,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                3
              </span>
            </div>

            {/* User Profile Avatar with Online Ring */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f97316, #e11d48)',
                  border: '2px solid #00e599',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '12px',
                  boxShadow: '0 0 10px rgba(0, 229, 153, 0.3)',
                }}
              >
                DR
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>

        {/* 4. SCROLLABLE CONTENT CANVAS (Deep Obsidian #090d0f) */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: '#090d0f' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
