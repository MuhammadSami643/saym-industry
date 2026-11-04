"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        setError(data.error || 'Invalid admin credentials');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Login error occurred');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--brand-black, #0b0b0d)',
        padding: '20px'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src="/images/site/1776250498_logo.webp"
            alt="ZYPFIT"
            style={{ height: '54px', margin: '0 auto 12px' }}
          />
          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 6px', color: '#111827' }}>
            ZYPFIT Admin Login
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '13px' }}>
            Enter your credentials to access the backend control panel.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '12px 14px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '13px',
              textAlign: 'center'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="form-control"
              defaultValue="admin@zypfit.com"
              placeholder="admin@zypfit.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="form-control"
              defaultValue="admin123"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px', minHeight: '46px', fontSize: '15px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
          <Link href="/" style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>
            ← Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
