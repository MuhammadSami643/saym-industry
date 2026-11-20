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

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const country = formData.get('country') as string;
    const category = formData.get('category') as string;
    const quantity = formData.get('quantity') as string;
    const notes = formData.get('details') as string;

    const fullDetails = `
[B2B SOURCING INQUIRY]
Brand / Company: ${company || 'Not specified'}
Target Category: ${category || 'General Apparel'}
Estimated Quantity: ${quantity || 'Not specified'}
Delivery Country: ${country || 'Not specified'}
WhatsApp / Phone: ${phone || 'Not provided'}

Project Specifications & Notes:
${notes}
    `.trim();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          company: company,
          country: country,
          subject: `Quote Request for ${quantity}x ${category} - ${company || name}`,
          details: fullDetails,
          techpackUrl: techpackUrl,
          videoUrl: videoUrl
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        setError(data.error || 'Failed to submit inquiry. Please try again or reach out on WhatsApp.');
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
      <div style={{ marginBottom: '24px' }}>
        <span style={{ color: 'var(--brand-orange, #f3a626)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1.5px', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
          FACTORY DIRECT RFQ &bull; CONFIDENTIAL REVIEW
        </span>
        <h2 style={{ marginTop: 0, fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Request a Manufacturing Quote
        </h2>
        <p style={{ color: '#64748b', fontSize: '14.5px', margin: 0, lineHeight: 1.6 }}>
          Share your target garments, fabric preferences, and order quantities. Our merchandising team will review your brief and reply with transparent factory pricing and sampling lead times within 24 hours.
        </p>
      </div>

      {success && (
        <div
          className="alert-success"
          style={{
            marginBottom: '24px',
            padding: '20px 22px',
            borderRadius: '14px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            fontSize: '14.5px',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ fontWeight: 800, fontSize: '16px', display: 'block', marginBottom: '6px' }}>
            Inquiry Successfully Submitted!
          </strong>
          Thank you! Your manufacturing inquiry has been logged with our Sialkot factory merchandising desk. A dedicated merchandising manager will review your brief and contact you shortly.
          {whatsAppLink && (
            <div style={{ marginTop: '16px' }}>
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
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)',
                }}
              >
                <WhatsAppIcon size={18} />
                <span>Chat Instantly with Production Team on WhatsApp</span>
                <ArrowRightIcon size={15} />
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

      {/* Row 1: Name & Brand Name */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '18px' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="form-label" htmlFor="name" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
            Your Full Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            className="form-control"
            id="name"
            type="text"
            name="name"
            required
            placeholder="e.g. Alex Morgan"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14.5px',
              color: '#0f172a',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="form-label" htmlFor="company" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
            Brand or Company Name
          </label>
          <input
            className="form-control"
            id="company"
            type="text"
            name="company"
            placeholder="e.g. Apex Athletics or Startup Label"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14.5px',
              color: '#0f172a',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Row 2: Email & Phone/WhatsApp */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '18px' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="form-label" htmlFor="email" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
            Business Email Address <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            className="form-control"
            id="email"
            type="email"
            name="email"
            required
            placeholder="alex@brandname.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14.5px',
              color: '#0f172a',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="form-label" htmlFor="phone" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
            WhatsApp / Mobile (Recommended for Fast Contact)
          </label>
          <input
            className="form-control"
            id="phone"
            type="tel"
            name="phone"
            placeholder="+1 555 123 4567"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14.5px',
              color: '#0f172a',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Row 3: Product Category & Quantity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '18px' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="form-label" htmlFor="category" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
            Primary Product Category <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            className="form-control"
            id="category"
            name="category"
            required
            defaultValue="Sportswear & Teamwear"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14.5px',
              color: '#0f172a',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              outline: 'none',
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
          >
            <option value="Sportswear & Teamwear">Sportswear &amp; Team Uniforms (Jerseys, Tracksuits)</option>
            <option value="Fitness & Activewear">Fitness Wear &amp; Gym (Leggings, Bras, Joggers)</option>
            <option value="Heavyweight Hoodies & Fleece">Heavyweight Hoodies &amp; Sweatshirts (380–500 GSM)</option>
            <option value="Streetwear & Outerwear">Streetwear Tees, Cargoes &amp; Varsity Jackets</option>
            <option value="Boxing & Fight Gear">Boxing Wear &amp; Fight Gear (Trunks, Robes, Gloves)</option>
            <option value="MMA, BJJ & Compression">MMA Shorts, BJJ Gis &amp; Rashguards</option>
            <option value="Custom Denim & Jeans">Denim Jeans, Selvedge &amp; Denim Jackets</option>
            <option value="Full Brand Collection">Multi-Category Custom Brand Collection</option>
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="form-label" htmlFor="quantity" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
            Target Order Volume
          </label>
          <select
            className="form-control"
            id="quantity"
            name="quantity"
            defaultValue="50 - 100 pcs (Startup Run)"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14.5px',
              color: '#0f172a',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              outline: 'none',
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
          >
            <option value="Sample Prototype Only">Pre-Production Sample / Prototype Only</option>
            <option value="50 - 100 pcs (Startup Run)">50 – 100 pcs per style (Low MOQ Run)</option>
            <option value="100 - 300 pcs (Growth Stage)">100 – 300 pcs per style (Commercial Run)</option>
            <option value="300 - 500 pcs (Mid Volume)">300 – 500 pcs per style</option>
            <option value="500 - 1,000+ pcs (Wholesale)">500 – 1,000+ pcs per style (Full Bulk)</option>
            <option value="Ongoing Monthly Program">Ongoing Monthly Supply Contract</option>
          </select>
        </div>
      </div>

      {/* Row 4: Country */}
      <div className="form-group" style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column' }}>
        <label className="form-label" htmlFor="country" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
          Destination Country (For DHL / Air / Ocean Freight Planning) <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          className="form-control"
          id="country"
          type="text"
          name="country"
          required
          placeholder="e.g. United States, United Kingdom, Germany, Australia, Canada, etc."
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '14.5px',
            color: '#0f172a',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '10px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Row 5: Detailed Specifications */}
      <div className="form-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
        <label className="form-label" htmlFor="details" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b', marginBottom: '7px' }}>
          Project Specifications, Fabrics &amp; Branding Details <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <textarea
          className="form-control"
          id="details"
          name="details"
          rows={5}
          required
          placeholder="Please describe your garments, desired fabric blend/GSM (e.g. 75/25 Nylon Spandex, 450 GSM French Terry), colorways, custom branding (silicone, puff print, embroidery, woven tags, polybags) and any specific deadline."
          style={{
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

      {/* Tech Pack Uploader */}
      <TechPackUploader
        label="Attach Tech Pack (PDF, AI, PSD, ZIP), Sketches, or Reference Photos"
        onUploaded={(url) => setTechpackUrl(url)}
        onVideoUploaded={(url) => setVideoUrl(url)}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{
          width: '100%',
          marginTop: '20px',
          padding: '16px 28px',
          fontSize: '16px',
          fontWeight: 800,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f3a626 0%, #d98816 100%)',
          color: '#ffffff',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 18px rgba(243, 166, 38, 0.35)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
        }}
      >
        {loading ? 'Submitting Sourcing Inquiry...' : 'Submit Sourcing Inquiry & Tech Pack'}
      </button>

      {/* Microcopy & Guarantees */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '12.5px', color: '#64748b' }}>
        <span>⏱️ Guaranteed reply within 12–24 business hours</span>
        <span>🔒 100% NDA &amp; Design Privacy Protected</span>
      </div>
    </form>
  );
}
