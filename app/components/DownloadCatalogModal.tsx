"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from './AdminIcons';

interface DownloadCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadCatalogModal({ isOpen, onClose }: DownloadCatalogModalProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('Full 2026 Collection');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and work email.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Log B2B Buyer Lead into DB & Admin Inquiries
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || 'Private Label Buyer',
          subject: `Line Sheet Download Request - ${company || name}`,
          details: `Buyer unlocked the 2026 Official B2B Export Line Sheet & Wholesale Catalog.\nTarget Product Interest: ${category}\nBrand / Label: ${company || 'N/A'}`
        })
      });

      // 2. Route directly to printable & downloadable Line Sheet
      setIsSubmitting(false);
      onClose();
      router.push(`/linesheet?brand=${encodeURIComponent(company || name)}&name=${encodeURIComponent(name)}`);
    } catch (err: any) {
      setIsSubmitting(false);
      // Still allow viewing even if network glitches
      onClose();
      router.push(`/linesheet?brand=${encodeURIComponent(company || name)}&name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        maxWidth: '520px',
        width: '100%',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        border: '1px solid #e2e8f0'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#64748b'
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(243,166,38,0.12)',
            color: '#c57608',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '10px'
          }}>
            <span>📄</span> Instant PDF Access
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
            Download 2026 B2B Line Sheet &amp; Catalog
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            Access our factory-direct wholesale pricing matrix, fabric GSM specs, MOQ tiers, and private label branding techniques.
          </p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Lead Capture Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Your Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Jordan Miller"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Business Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="buyer@brand.com"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Brand / Company
              </label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Apex Wear"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Target Apparel Style
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
              >
                <option value="Full 2026 Collection">Full 2026 Collection</option>
                <option value="Activewear & Leggings">Activewear &amp; Leggings</option>
                <option value="Streetwear & Hoodies">Streetwear &amp; Hoodies</option>
                <option value="MMA & Combat Apparel">MMA &amp; Combat Apparel</option>
                <option value="Teamwear & Tracksuits">Teamwear &amp; Tracksuits</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '14px',
              fontWeight: 800,
              justifyContent: 'center',
              marginTop: '8px',
              boxShadow: '0 4px 12px rgba(243,166,38,0.25)'
            }}
          >
            {isSubmitting ? (
              <span>Unlocking Document...</span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>Unlock &amp; View 2026 Line Sheet (PDF)</span>
                <ArrowRightIcon size={14} />
              </span>
            )}
          </button>
        </form>

        <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>
          🔒 Instant digital access &bull; No spam guaranteed &bull; Sialkot OEM Direct
        </div>
      </div>
    </div>
  );
}

