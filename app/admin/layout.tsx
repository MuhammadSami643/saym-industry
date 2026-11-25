"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LogoutButton from '../components/LogoutButton';
import { ExternalLinkIcon, PlusIcon } from '@/app/components/AdminIcons';
import BrandLogo from '@/app/components/BrandLogo';

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
      padding: '9px 14px',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: active ? 700 : 500,
      color: active ? '#ffffff' : '#94a3b8',
      background: active ? 'rgba(52, 211, 153, 0.12)' : 'transparent',
      border: active ? '1px solid rgba(52, 211, 153, 0.28)' : '1px solid transparent',
      textDecoration: 'none',
      transition: 'all 0.18s ease',
      boxShadow: active ? '0 0 12px rgba(52, 211, 153, 0.1)' : 'none',
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
        background: 'radial-gradient(ellipse 90% 60% at 50% -20%, rgba(0, 229, 153, 0.12), transparent 70%), radial-gradient(circle at 10% 40%, rgba(56, 189, 248, 0.07), transparent 45%), radial-gradient(circle at 90% 80%, rgba(0, 229, 153, 0.08), transparent 50%), #070b0d',
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
          background: rgba(7, 11, 13, 0.6);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00e599;
        }

        /* ==========================================================================
           GLASSMORPHISM ADMIN SYSTEM ARCHITECTURE
           ========================================================================== */
        div[style*="background: #11171a"],
        div[style*="background:#11171a"],
        .kpi-card,
        .neon-card,
        .glass-card,
        .admin-card {
          background: rgba(14, 21, 26, 0.65) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.16) !important;
          border-radius: 16px !important;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
        }

        .kpi-card:hover,
        .neon-card:hover,
        .glass-card:hover,
        .admin-card:hover {
          background: rgba(18, 28, 34, 0.8) !important;
          border-color: rgba(52, 211, 153, 0.32) !important;
          border-top: 1px solid rgba(52, 211, 153, 0.6) !important;
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.48), 0 0 20px rgba(52, 211, 153, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
        }

        /* Glass table headers and rows */
        table thead tr {
          background: rgba(13, 20, 25, 0.85) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
        }
        table {
          border-radius: 14px;
          overflow: hidden;
        }

        /* Glass modals */
        div[style*="background: #11171a"][style*="maxWidth"],
        div[style*="background: #11171a"][style*="max-width"] {
          background: rgba(14, 21, 26, 0.88) !important;
          backdrop-filter: blur(24px) !important;
          -webkit-backdrop-filter: blur(24px) !important;
          border-radius: 20px !important;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(52, 211, 153, 0.15) !important;
        }

        /* Glass search and filter bars */
        div[style*="background: #090d0f"],
        div[style*="background:#090d0f"],
        input[style*="background: #090d0f"],
        select[style*="background: #090d0f"],
        textarea[style*="background: #090d0f"] {
          background: rgba(255, 255, 255, 0.04) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.09) !important;
          border-radius: 10px !important;
        }

        /* Glass pills and badges */
        .tag-pill {
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          border-radius: 9999px !important;
        }
      `}</style>

      {/* 2. 100% FIXED STICKY SIDEBAR (Glassmorphic Dark Obsidian) */}
      <aside
        style={{
          width: '264px',
          height: '100%',
          background: 'rgba(11, 17, 21, 0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Brand Header (Sticky & Scrollbar-free) */}
        <div
          style={{
            padding: '18px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            flexShrink: 0,
            background: 'rgba(11, 17, 21, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BrandLogo size={32} theme="dark" />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                Bin Rasool
              </div>
              <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Director Command &bull; HQ
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Scrollable body below header) */}
        <nav
          style={{
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 1,
            overflowY: 'auto',
            minHeight: 0,
          }}
        >
          <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, padding: '4px 8px', letterSpacing: '0.08em' }}>
            OPERATIONS COMMAND
          </div>

          <Link href="/admin" style={navItemClass('/admin')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin') ? '#00e599' : '#94a3b8' }}>⊞</span> Overview
            </span>
          </Link>

          <Link href="/admin/inquiries" style={navItemClass('/admin/inquiries')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/inquiries') ? '#00e599' : '#94a3b8' }}>✉</span> Inquiries &amp; RFQs
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
              <span style={{ color: isActive('/admin/production') ? '#00e599' : '#94a3b8' }}>⚙</span> Production Floor
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
              <span style={{ color: isActive('/admin/email') ? '#00e599' : '#94a3b8' }}>✈</span> Email Dispatch
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
              <span style={{ color: isActive('/admin/buyers') ? '#00e599' : '#94a3b8' }}>👤</span> Buyer CRM
            </span>
          </Link>

          <Link href="/admin/products" style={navItemClass('/admin/products')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/products') ? '#00e599' : '#94a3b8' }}>📦</span> Garment Catalog
            </span>
          </Link>

          <Link href="/admin/blogs" style={navItemClass('/admin/blogs')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/blogs') ? '#00e599' : '#94a3b8' }}>📰</span> Blog Articles
            </span>
          </Link>

          <Link href="/admin/analytics" style={navItemClass('/admin/analytics')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ color: isActive('/admin/analytics') ? '#00e599' : '#94a3b8' }}>📊</span> Export Analytics
            </span>
          </Link>

          {/* SAVED VIEWS SECTION */}
          <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, padding: '16px 8px 6px', letterSpacing: '0.08em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>FLOOR VIEWS</span>
            <span style={{ cursor: 'pointer', color: '#cbd5e1', display: 'inline-flex', alignItems: 'center' }} title="Add View">
              <PlusIcon size={12} />
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 8px', fontSize: '12.5px', color: '#cbd5e1', cursor: 'pointer', borderRadius: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f87171' }}></span>
              Sampling Rush
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>6</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 8px', fontSize: '12.5px', color: '#cbd5e1', cursor: 'pointer', borderRadius: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599' }}></span>
              Active Cutting
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>11</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 8px', fontSize: '12.5px', color: '#cbd5e1', cursor: 'pointer', borderRadius: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }}></span>
              Stitching Lines
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>38</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 8px', fontSize: '12.5px', color: '#cbd5e1', cursor: 'pointer', borderRadius: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24' }}></span>
              DHL Clearance
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>9</span>
          </div>

          {/* WORKSPACE SECTION */}
          <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, padding: '16px 8px 6px', letterSpacing: '0.08em' }}>
            WORKSPACE
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 8px', fontSize: '12.5px', color: '#cbd5e1', cursor: 'pointer' }}>
            <span>👥</span> Team management
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 8px', fontSize: '12.5px', color: '#cbd5e1', cursor: 'pointer' }}>
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
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '84%' }}
              transition={{ duration: 1.2, ease: "easeOut" as const }}
              style={{ height: '100%', background: '#00e599', borderRadius: '9999px', boxShadow: '0 0 8px #00e599' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '10.5px', color: '#64748b' }}>
            <span>Floor Sync: Normal</span>
            <span style={{ color: '#00e599', fontWeight: 700 }}>Optimal</span>
          </div>
        </div>

        {/* Live Site Link */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, fontSize: '11px' }}>
          <Link href="/" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#94a3b8', textDecoration: 'none' }}>
            <span>Live Website</span>
            <ExternalLinkIcon size={11} />
          </Link>
          <Link href="/track-order" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#00e599', fontWeight: 700, textDecoration: 'none' }}>
            <span>Tracker</span>
            <ExternalLinkIcon size={11} />
          </Link>
        </div>
      </aside>

      {/* 3. RIGHT COLUMN: FIXED DARK TOPBAR + SCROLLABLE DASHBOARD */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, overflow: 'hidden' }}>
        
        {/* Top Navigation Bar from Reel (Glassmorphic) */}
        <header
          style={{
            height: '60px',
            flexShrink: 0,
            background: 'rgba(11, 17, 21, 0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
            zIndex: 20,
          }}
        >
          {/* Search Bar Pill with Command-K */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: '9999px',
              padding: '6px 14px',
              width: '380px',
              maxWidth: '100%',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            <span style={{ color: '#64748b', fontSize: '13px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search orders, buyer RFQs, batch IDs or styles..."
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
                color: '#cbd5e1',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.08)',
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
              <span suppressHydrationWarning>{currentDateTime}</span>
            </div>

            {/* AI Sparkle Icon Pill */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 229, 153, 0.35)',
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
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
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
                  background: 'linear-gradient(135deg, #00e599, #0284c7)',
                  border: '2px solid #00e599',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#05140d',
                  fontWeight: 900,
                  fontSize: '12px',
                  boxShadow: '0 0 10px rgba(0, 229, 153, 0.4)',
                }}
              >
                DR
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>

        {/* 4. SCROLLABLE CONTENT CANVAS (Transparent so radial backdrop refracts through glass cards) */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: 'transparent' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{ maxWidth: '1440px', margin: '0 auto' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
