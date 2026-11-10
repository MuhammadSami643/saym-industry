"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@binrasoolenterprises.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        setError(data.error || 'Invalid director credentials. Please try again.');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Server connection error occurred.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 20%, #1e293b 0%, #0b0f19 75%, #05070c 100%)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'inherit',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(243, 166, 38, 0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Luxury Admin Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(17, 24, 39, 0.88)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 40px rgba(243, 166, 38, 0.08)',
          padding: '40px 36px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(243, 166, 38, 0.15) 0%, rgba(255, 255, 255, 0.04) 100%)',
              border: '1px solid rgba(243, 166, 38, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <img
              src="/images/site/1776250498_logo.webp"
              alt="Bin Rasool Enterprises"
              style={{ height: '42px', width: 'auto' }}
            />
          </div>

          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--brand-orange, #f3a626)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '6px',
            }}
          >
            Director &bull; Operations Command
          </div>

          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 8px',
              letterSpacing: '-0.02em',
            }}
          >
            Bin Rasool Enterprises
          </h1>

          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.5 }}>
            Sign in to access factory orders, RFQ pipeline &amp; production floor.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '22px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'shake 0.3s ease-in-out',
            }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Modern Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#cbd5e1',
                marginBottom: '8px',
                letterSpacing: '0.02em',
              }}
            >
              Director Email
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@binrasoolenterprises.com"
                style={{
                  width: '100%',
                  background: '#0b1120',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '10px',
                  padding: '13px 14px 13px 44px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--brand-orange, #f3a626)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(243, 166, 38, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#cbd5e1',
                marginBottom: '8px',
                letterSpacing: '0.02em',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  background: '#0b1120',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '10px',
                  padding: '13px 44px 13px 44px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--brand-orange, #f3a626)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(243, 166, 38, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                  e.target.style.boxShadow = 'none';
                }}
              />

              {/* Show / Hide Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Session remember checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12.5px',
                color: '#94a3b8',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  accentColor: 'var(--brand-orange, #f3a626)',
                  width: '15px',
                  height: '15px',
                  cursor: 'pointer',
                }}
              />
              <span>Keep session authenticated</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f3a626 0%, #d98816 100%)',
              color: '#0b0b0d',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '14.5px',
              fontWeight: 800,
              letterSpacing: '0.02em',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 10px 25px -5px rgba(243, 166, 38, 0.4)',
              transition: 'all 0.2s ease',
              marginTop: '4px',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(0,0,0,0.25)',
                    borderTopColor: '#000',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <span>Authenticating Portal...</span>
              </>
            ) : (
              <>
                <span>Sign In to Factory Dashboard</span>
                <span>&rarr;</span>
              </>
            )}
          </button>
        </form>

        {/* Security badge at bottom - NO return to website link */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '11.5px',
            color: '#64748b',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
          <span>256-Bit Encrypted Admin Session &bull; Sialkot HQ</span>
        </div>
      </div>
    </div>
  );
}
