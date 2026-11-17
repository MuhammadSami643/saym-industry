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
    <form onSubmit={handleSubmit} className="card contact-form-card" style={{ background: '#fff' }}>
      <h2 style={{ marginTop: 0 }}>Request a Manufacturing Quote</h2>
      <p className="muted" style={{ marginBottom: '20px' }}>
        Share enough detail for a useful reply. If you have tech packs or reference photos, mention them in your message and we can continue the discussion by email or WhatsApp.
      </p>

      {success && (
        <div className="alert-success" style={{ marginBottom: '20px' }}>
          <strong>Thank you!</strong> Your manufacturing inquiry has been submitted successfully. Our production team will review your brief and contact you shortly.
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
                  padding: '9px 16px',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '13px',
                  textDecoration: 'none'
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
        <div className="alert-error" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="name">Full Name *</label>
        <input className="form-control" id="name" type="text" name="name" required placeholder="Your name or company" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email Address *</label>
        <input className="form-control" id="email" type="email" name="email" required placeholder="name@company.com" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="phone">WhatsApp / Phone</label>
        <input className="form-control" id="phone" type="tel" name="phone" placeholder="+1 234 567 8900" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="subject">Product Category / Collection</label>
        <input className="form-control" id="subject" type="text" name="subject" placeholder="e.g. Gym Leggings, Hoodies, Boxing Gear" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="details">Product Details &amp; Quantity *</label>
        <textarea
          className="form-control"
          id="details"
          name="details"
          rows={5}
          required
          placeholder="Please describe products, target fabrics, estimated order quantity, sizing, colors, branding requirements, and destination country."
        />
      </div>

      <TechPackUploader
        label="Attach Tech Pack, Vector Art, or Sample Video"
        onUploaded={(url) => setTechpackUrl(url)}
        onVideoUploaded={(url) => setVideoUrl(url)}
      />

      <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
        {loading ? 'Submitting Inquiry...' : 'Submit Manufacturing Inquiry'}
      </button>

      <span className="cta-microcopy" style={{ textAlign: 'center', marginTop: '12px' }}>
        We typically respond within 1 business day with preliminary MOQ, pricing direction, and next steps.
      </span>
    </form>
  );
}
