"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TechPackUploader from '@/app/components/TechPackUploader';
import { WhatsAppIcon, ArrowRightIcon, ClockIcon } from '@/app/components/AdminIcons';

const CATEGORIES = [
  "Heavyweight French Terry Hoodies & Sweats",
  "Squat-Proof Gym Leggings & Sports Bras",
  "Athletic Tracksuits & Warmup Sets",
  "Tapered Fleece Training Pants & Joggers",
  "Boxing Gloves & Fight Gear",
  "MMA BJJ Gis & Flatlock Rashguards",
  "Sublimated Sports Uniforms & Kits",
  "Compression Tops & Baselayers",
  "Raw & Vintage Washed Denim Jeans",
  "Streetwear Heavyweight Tees & Pump Covers",
  "Custom Activewear Style (From Tech Pack)"
];

const BRANDING_OPTIONS = [
  { id: "damask_label", label: "Custom Damask Woven Neck Label" },
  { id: "hangtag", label: "Custom 400 GSM Retail Hangtag" },
  { id: "eva_bag", label: "Frosted EVA Zipper Packaging Bag" },
  { id: "embroidery", label: "Custom 3D Puff / Flat Embroidery" },
  { id: "screen_print", label: "High-Density Screen / Puff Print" },
  { id: "sublimation", label: "Full Dye-Sublimation Print" }
];

export default function OrderSampleClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [techpackUrl, setTechpackUrl] = useState<string | null>(null);
  const [techpackName, setTechpackName] = useState<string | null>(null);
  const [selectedBranding, setSelectedBranding] = useState<string[]>([
    "damask_label",
    "hangtag",
    "eva_bag"
  ]);
  const [whatsAppLink, setWhatsAppLink] = useState<string | null>(null);

  const toggleBranding = (id: string) => {
    setSelectedBranding(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const brand = (formData.get('brand') as string) || '';
    const category = (formData.get('category') as string) || 'Custom Activewear';
    const fabric = (formData.get('fabric') as string) || '';
    const color = (formData.get('color') as string) || '';
    const sampleQty = (formData.get('sampleQty') as string) || '1 piece';
    const address = (formData.get('address') as string) || '';
    const country = (formData.get('country') as string) || '';
    const notes = (formData.get('notes') as string) || '';

    const brandingLabels = selectedBranding
      .map(id => BRANDING_OPTIONS.find(b => b.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const fullDetails = `
=== [SAMPLE PROTOTYPE ORDER] ===
Product Category: ${category}
Sample Quantity: ${sampleQty}
Target Fabric / GSM: ${fabric || 'Standard Factory Spec'}
Target Colorway: ${color || 'As per Tech Pack'}
Custom Branding Requested: ${brandingLabels || 'None'}

=== [BUYER & SHIPPING INFO] ===
Full Name: ${name}
Brand / Company: ${brand || 'Private Label'}
Email: ${email}
WhatsApp / Mobile: ${phone}
Delivery Country: ${country}
Complete Shipping Address:
${address}

=== [TECH PACK & SPECIFICATIONS] ===
Attached File: ${techpackName || (techpackUrl ? 'Attached via link' : 'No file attached - Will send via WhatsApp')}

Additional Fit / Construction Notes:
${notes || 'Standard brand sizing and fit.'}
    `.trim();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          company: brand,
          country: country,
          subject: `Sample Prototype Request: ${sampleQty} ${category} - ${brand || name}`,
          details: fullDetails,
          techpackUrl: techpackUrl
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        setError(data.error || 'Failed to submit sample request. Please try again or message us on WhatsApp.');
      } else {
        setSuccess(true);
        let targetWaUrl = '';
        if (data.whatsAppDirectUrl) {
          targetWaUrl = data.whatsAppDirectUrl;
          setWhatsAppLink(data.whatsAppDirectUrl);
        } else {
          const waMessage = encodeURIComponent(
            `Hi Bin Rasool Enterprises! I just submitted a Sample Prototype Order on your website for ${sampleQty} ${category}. My brand is ${brand || name}. Please confirm receipt and sample timeline.`
          );
          targetWaUrl = `https://wa.me/923133599241?text=${waMessage}`;
          setWhatsAppLink(targetWaUrl);
        }
        try {
          if (targetWaUrl) {
            window.open(targetWaUrl, '_blank');
          }
        } catch (e) {}
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Network error submitting sample order.');
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>
      {/* Success State */}
      {success ? (
        <div
          style={{
            maxWidth: '680px',
            margin: '40px auto',
            background: '#ffffff',
            border: '2px solid #22c55e',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 20px'
            }}
          >
            ✓
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
            Sample Prototype Request Received!
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: '0 0 24px' }}>
            Our production pattern master and sampling team in Sialkot have received your tech pack and specs. We will review measurement feasibility and confirm your sample dispatch schedule within 12 hours.
          </p>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '28px',
              textAlign: 'left'
            }}
          >
            <h4 style={{ margin: '0 0 10px', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
              What Happens Next:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '13.5px', lineHeight: 1.8 }}>
              <li><strong>Step 1:</strong> Spec review &amp; measurement tolerance check (12 hrs)</li>
              <li><strong>Step 2:</strong> Fabric swatch selection &amp; digital pattern CAD grading</li>
              <li><strong>Step 3:</strong> Cut-and-sew prototype with your custom labels &amp; tags (5–7 days)</li>
              <li><strong>Step 4:</strong> High-res photo approval + DHL Priority air express dispatch</li>
            </ul>
          </div>

          {whatsAppLink && (
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#25D366',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                padding: '14px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                transition: 'all 0.2s ease',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <WhatsAppIcon size={20} />
              <span>Connect on WhatsApp with Master Tailor (+92 313 3599241)</span>
            </a>
          )}

          <div style={{ marginTop: '20px' }}>
            <Link href="/" style={{ color: '#64748b', fontSize: '13.5px', textDecoration: 'underline' }}>
              Return to Homepage
            </Link>
          </div>
        </div>
      ) : (
        /* The Two-Column Form Layout */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: '40px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: The Form */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '36px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
              Sample Prototype Specifications
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 28px' }}>
              Fill in your garment requirements below. If you have a Tech Pack or design sketch, attach it for precise pattern drafting.
            </p>

            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #f87171',
                  color: '#b91c1c',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  marginBottom: '20px'
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Section 1: Garment Type */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  1. Garment / Apparel Category *
                </label>
                <select
                  name="category"
                  required
                  defaultValue={CATEGORIES[0]}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#0f172a',
                    background: '#ffffff',
                    outline: 'none'
                  }}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section 2: Fabric & Sample Specs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    2. Fabric &amp; GSM Target
                  </label>
                  <input
                    type="text"
                    name="fabric"
                    placeholder="e.g. 450 GSM French Terry, 75/25 Nylon"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    3. Target Colorway / Pantones
                  </label>
                  <input
                    type="text"
                    name="color"
                    placeholder="e.g. Washed Charcoal, Navy, Custom"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Sample Quantity Selection */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  4. Sample Quantity Needed
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { val: "1 piece", label: "1 Piece Prototype", desc: "Fit & Fabric Check" },
                    { val: "2 pieces", label: "2 Pieces Fit Set", desc: "e.g. Medium & Large" },
                    { val: "3 pieces", label: "3 Pieces Multi-Size", desc: "Complete Sample Run" }
                  ].map(opt => (
                    <label
                      key={opt.val}
                      style={{
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#1e293b'
                      }}
                    >
                      <input type="radio" name="sampleQty" value={opt.val} defaultChecked={opt.val === "1 piece"} />
                      <span>{opt.label}</span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 400 }}>{opt.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 3: Tech Pack Uploader */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  5. Upload Tech Pack, CAD or Design Sketch (Optional)
                </label>
                <TechPackUploader
                  label="Drop PDF, AI, PSD, ZIP, or Photos here (Max 60MB)"
                  onUploaded={(url, name) => {
                    setTechpackUrl(url);
                    setTechpackName(name || null);
                  }}
                />
              </div>

              {/* Section 4: Branding Options */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  6. Custom Branding to Include on Sample
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {BRANDING_OPTIONS.map(opt => {
                    const isChecked = selectedBranding.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleBranding(opt.id)}
                        style={{
                          border: isChecked ? '1.5px solid #0f172a' : '1px solid #cbd5e1',
                          background: isChecked ? '#f8fafc' : '#ffffff',
                          borderRadius: '8px',
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: isChecked ? 700 : 500,
                          color: isChecked ? '#0f172a' : '#475569',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          style={{ accentColor: '#0f172a' }}
                        />
                        <span>{opt.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 5: Delivery & Buyer Details */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>
                  7. Buyer &amp; Delivery Shipping Address
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Full Contact Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Miller"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Brand / Business Name
                    </label>
                    <input
                      type="text"
                      name="brand"
                      placeholder="e.g. Apex Activewear"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Email Address (For Invoicing &amp; Tracking) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@yourbrand.com"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      WhatsApp Number (For Factory Video Updates) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      placeholder="United States, UK, etc."
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      DHL Delivery Address (Street, City, Postal Code) *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Full physical street address for courier dispatch"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Specific Fit, Measurement or Stitching Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Mention custom sizing (e.g. oversize boxy fit, length +2 inches, raw cut hem, etc.)"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13.5px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 800,
                  borderRadius: '8px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 14px rgba(15,23,42,0.25)',
                  transition: 'background 0.2s ease'
                }}
              >
                {loading ? (
                  <span>Transmitting Specifications to Factory...</span>
                ) : (
                  <>
                    <span>Submit Sample Prototype Order</span>
                    <ArrowRightIcon size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Trust, Guarantees & Sampling Timeline */}
          <div>
            {/* Why Order A Sample First Box */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '24px'
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#9a3412',
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                Zero-Risk Quality Verification
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
                Why Order a Physical Prototype?
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>✓</div>
                  <div>
                    <h4 style={{ margin: '0 0 3px', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>Touch &amp; Feel True Fabric Weight</h4>
                    <p style={{ margin: 0, fontSize: '12.5px', color: '#64748b', lineHeight: 1.5 }}>Test authentic 380–500 GSM French Terry loopback, squat-proof opacity, and wash durability before placing a 50+ pcs bulk order.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>✓</div>
                  <div>
                    <h4 style={{ margin: '0 0 3px', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>Validate Sizing on Real Models</h4>
                    <p style={{ margin: 0, fontSize: '12.5px', color: '#64748b', lineHeight: 1.5 }}>Confirm sleeve length, chest drape, and rise measurements on physical models. Adjust patterns with our master tailor before mass cutting.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ffedd5', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>$</div>
                  <div>
                    <h4 style={{ margin: '0 0 3px', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>Sample Cost 100% Credited to Bulk</h4>
                    <p style={{ margin: 0, fontSize: '12.5px', color: '#64748b', lineHeight: 1.5 }}>When you proceed with your opening bulk order (50 pcs minimum), the prototype development fee is deducted from your final bulk invoice.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 7-10 Days Timeline Box */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <ClockIcon size={18} style={{ color: '#0f172a' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  7–10 Day Prototyping Timeline
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '16px', borderLeft: '2px solid #e2e8f0' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>Day 1</span>
                  <h4 style={{ margin: '2px 0 2px', fontSize: '13.5px', color: '#0f172a' }}>Spec Confirmation &amp; CAD Grading</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Tech pack review, measurement tolerances locked.</p>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>Day 2–3</span>
                  <h4 style={{ margin: '2px 0 2px', fontSize: '13.5px', color: '#0f172a' }}>Fabric Sourcing &amp; Pattern Cutting</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Custom dye swatches matched and panels CNC cut.</p>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>Day 4–6</span>
                  <h4 style={{ margin: '2px 0 2px', fontSize: '13.5px', color: '#0f172a' }}>Stitching &amp; Custom Labeling</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Garment assembled, labels stitched, steam pressed.</p>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>Day 7–10</span>
                  <h4 style={{ margin: '2px 0 2px', fontSize: '13.5px', color: '#0f172a' }}>DHL Priority Express Courier</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Tracking number provided with door-to-door delivery worldwide.</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div
              style={{
                background: '#0f172a',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center'
              }}
            >
              <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 800 }}>
                Need Immediate Sample Guidance?
              </h4>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
                Chat directly with our master tailor in Sialkot. Share your tech pack on WhatsApp for instant fabric availability.
              </p>
              <a
                href="https://wa.me/923133599241?text=Hi%20Bin%20Rasool%20Enterprises!%20I%20have%20questions%20about%20ordering%20a%20sample%20prototype."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <WhatsAppIcon size={16} />
                <span>Chat with Production (+92 313 3599241)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
