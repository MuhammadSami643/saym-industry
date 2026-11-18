"use client";

import { useState } from 'react';
import TechPackUploader from './TechPackUploader';
import { ArrowRightIcon, WhatsAppIcon } from './AdminIcons';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState<string | null>(null);
  const [techpackUrl, setTechpackUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          details: formData.get('details'),
          techpackUrl: techpackUrl,
          videoUrl: videoUrl
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        setError(data.error || 'Failed to submit inquiry. Please try again.');
      } else {
        setSuccess(true);
        if (data.whatsAppDirectUrl) {
          setWhatsAppLink(data.whatsAppDirectUrl);
        }
        form.reset();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Network error submitting inquiry.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card contact-form-card"
      style={{
        background: '#ffffff',
        padding: '36px 32px',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 25px rgba(15, 23, 42, 0.06)',
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Request a Manufacturing Quote
      </h2>
      <p style={{ color: '#64748b', fontSize: '14.5px', marginBottom: '24px', lineHeight: 1.6 }}>
        Share enough detail for a useful reply. If you have tech packs or reference photos, mention them in your message and we can continue the discussion by email or WhatsApp.
      </p>

      {success && (
        <div
          className="alert-success"
          style={{
            marginBottom: '22px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            fontSize: '14px',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ fontWeight: 800 }}>Thank you!</strong> Your manufacturing inquiry has been submitted successfully. Our production team will review your brief and contact you shortly.
          {whatsAppLink && (
            <div style={{ marginTop: '14px' }}>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#22c55e',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '13px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(34, 197, 94, 0.28)',
                }}
              >
                <WhatsAppIcon size={16} />
                <span>Chat Directly on WhatsApp with Production Team</span>
                <ArrowRightIcon size={14} />
              </a>
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          className="alert-error"
          style={{
            marginBottom: '22px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      <div className="form-group" style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label" htmlFor="name" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
          Full Name <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          className="form-control"
          id="name"
          type="text"
          name="name"
          required
          placeholder="Your name or company"
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 16px',
            fontSize: '14.5px',
            lineHeight: 1.5,
            color: '#0f172a',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '10px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label" htmlFor="email" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
          Email Address <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          className="form-control"
          id="email"
          type="email"
          name="email"
          required
          placeholder="name@company.com"
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 16px',
            fontSize: '14.5px',
            lineHeight: 1.5,
            color: '#0f172a',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '10px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label" htmlFor="phone" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
          WhatsApp / Phone
        </label>
        <input
          className="form-control"
          id="phone"
          type="tel"
          name="phone"
          placeholder="+1 234 567 8900"
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 16px',
            fontSize: '14.5px',
            lineHeight: 1.5,
            color: '#0f172a',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '10px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label" htmlFor="subject" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
          Product Category / Collection
        </label>
        <input
          className="form-control"
          id="subject"
          type="text"
          name="subject"
          placeholder="e.g. Gym Leggings, Hoodies, Boxing Gear"
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 16px',
            fontSize: '14.5px',
            lineHeight: 1.5,
            color: '#0f172a',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '10px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label" htmlFor="details" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
          Product Details &amp; Quantity <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <textarea
          className="form-control"
          id="details"
          name="details"
          rows={5}
          required
          placeholder="Please describe products, target fabrics, estimated order quantity, sizing, colors, branding requirements and destination country."
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 16px',
            fontSize: '14.5px',
            lineHeight: 1.6,
            color: '#0f172a',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '10px',
            minHeight: '120px',
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <TechPackUploader
        label="Attach Tech Pack, Vector Art, or Sample Video"
        onUploaded={(url) => setTechpackUrl(url)}
        onVideoUploaded={(url) => setVideoUrl(url)}
      />

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{
          width: '100%',
          marginTop: '16px',
          padding: '14px 24px',
          fontSize: '15px',
          fontWeight: 700,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f3a626 0%, #d98816 100%)',
          color: '#ffffff',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 16px rgba(243, 166, 38, 0.35)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
        }}
      >
        {loading ? 'Submitting Inquiry...' : 'Submit Manufacturing Inquiry'}
      </button>

      <span className="cta-microcopy" style={{ display: 'block', textAlign: 'center', marginTop: '14px', fontSize: '12.5px', color: '#64748b' }}>
        We typically respond within 1 business day with preliminary MOQ, pricing direction and next steps.
      </span>
    </form>
  );
}
