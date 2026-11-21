"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/app/lib/currency';

export interface SampleProductInfo {
  id?: string;
  name: string;
  category?: string;
  image?: string;
}

interface SampleOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: SampleProductInfo | null;
}

const FABRICS = [
  '100% Combed Cotton French Terry (400 GSM)',
  'Heavyweight Brushed Fleece (450–500 GSM)',
  'Activewear Nylon / Spandex Butter-Soft (240 GSM)',
  'Interlock Dri-Fit Performance Polyester (180 GSM)',
  '100% Ring-Spun Combed Cotton Single Jersey (240 GSM)',
  'Heavyweight Raw Selvedge Denim (13.5 oz)',
  'Custom Fabric / Client Specified',
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

const BRANDING_OPTIONS = [
  'Woven Neck Label & Wash Care Tag',
  'Screen Printing (Water-based / Plastisol)',
  '3D High-Density Puff Print',
  'Custom Flat or 3D Embroidery',
  'Custom Silicone Patch / Metal Aglets',
  'Custom Branded Frosted Polybag',
];

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Sweden',
  'Norway',
  'Spain',
  'Italy',
  'United Arab Emirates',
  'Saudi Arabia',
  'Other International',
];

export default function SampleOrderModal({ isOpen, onClose, product }: SampleOrderModalProps) {
  const { currency, formatPrice } = useCurrency();

  // Step 1: Specs
  const [sampleType, setSampleType] = useState<'fit' | 'branded'>('branded');
  const [garmentName, setGarmentName] = useState('');
  const [fabric, setFabric] = useState(FABRICS[0]);
  const [size, setSize] = useState('L');
  const [color, setColor] = useState('Jet Black / Pantone 19-0303 TPX');
  const [selectedBranding, setSelectedBranding] = useState<string[]>([
    'Woven Neck Label & Wash Care Tag',
    '3D High-Density Puff Print',
  ]);
  const [customNotes, setCustomNotes] = useState('');

  // Step 2: Shipping
  const [buyerName, setBuyerName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [postalCode, setPostalCode] = useState('');

  // UI state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync initial product
  useEffect(() => {
    if (product?.name) {
      setGarmentName(product.name);
    } else if (!garmentName) {
      setGarmentName('Heavyweight Streetwear Hoodie (Custom Sample)');
    }
  }, [product]);

  // Pricing calculations
  // Blank fit sample: $45 USD base. Branded custom sample: $85 USD base.
  // DHL Express air courier: $35 USD worldwide from Sialkot factory.
  const sampleBaseUsd = sampleType === 'fit' ? 45 : 85;
  const courierFeeUsd = 35;
  const totalUsd = sampleBaseUsd + courierFeeUsd;

  if (!isOpen) return null;

  const toggleBranding = (opt: string) => {
    if (selectedBranding.includes(opt)) {
      setSelectedBranding(selectedBranding.filter((b) => b !== opt));
    } else {
      setSelectedBranding([...selectedBranding, opt]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const formattedDetails = `
=== [FAST SAMPLE CHECKOUT REQUEST] ===
Product: ${garmentName}
Sample Tier: ${sampleType === 'fit' ? 'Plain Fit/Pattern Sample ($45)' : 'Full Custom Branded Prototype ($85)'}
Fabric: ${fabric}
Size: ${size}
Color / Pantone: ${color}
Branding Elements: ${sampleType === 'branded' ? selectedBranding.join(', ') : 'None (Plain blank)'}
Additional Instructions: ${customNotes || 'None'}

--- BUYER & SHIPPING DETAILS ---
Name: ${buyerName}
Brand/Company: ${brandName || 'Private Label'}
Email: ${email}
WhatsApp/Phone: ${whatsapp}
Delivery Address: ${address}, ${city}, ${postalCode}, ${country}
Courier: DHL Express Air (3-5 Days)
Total Sample & Courier Estimate: $${totalUsd} USD (${currency.code})
*Guaranteed 100% Refundable on Bulk Production (50+ pcs)*
`;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: buyerName,
          email,
          phone: whatsapp,
          company: brandName,
          country,
          subject: `⚡ Physical Sample Order: ${garmentName} (${sampleType.toUpperCase()})`,
          details: formattedDetails,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to submit sample order.');
      }

      // Generate invoice URL
      const invoiceParams = new URLSearchParams({
        name: buyerName,
        company: brandName || 'Apparel Brand',
        email,
        phone: whatsapp,
        country,
        garment: `Physical Pre-Production Sample: ${garmentName} (${sampleType === 'fit' ? 'Fit & Fabric Sample' : 'Fully Branded Prototype'})`,
        quantity: '1',
        unitCost: totalUsd.toString(),
        currency: currency.code,
        symbol: currency.symbol,
        notes: `Sample Order Fee (including DHL Express Air Delivery to ${country}). 100% Refundable upon first bulk order of 50+ units.`,
      });

      setInvoiceUrl(`/invoice?${invoiceParams.toString()}`);

      // WhatsApp direct communication link
      const waText = encodeURIComponent(
        `Hi Bin Rasool Enterprises! 👋\nI just requested a physical sample for: *${garmentName}*\nType: *${sampleType === 'fit' ? 'Blank Fit Sample' : 'Custom Branded Prototype'}*\nSize: ${size} | Color: ${color}\nBuyer: ${buyerName} (${brandName || 'My Brand'})\nDestination: ${country}\nPlease confirm receipt and let me know when production starts!`
      );
      setWhatsappUrl(`https://wa.me/923133599241?text=${waText}`);

      setSubmitted(true);
    } catch (err: any) {
      console.error('Sample submission error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          animation: 'modalSlideIn 0.25s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            background: 'var(--brand-black, #0b0b0d)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '3px solid var(--brand-orange, #f3a626)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--brand-orange, #f3a626)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Factory Direct &bull; Sialkot, Pakistan
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '1.35rem', fontWeight: 800 }}>
              Order Physical Pre-Production Sample
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              fontSize: '20px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            &times;
          </button>
        </div>

        {/* Guarantee Pill */}
        <div
          style={{
            background: '#fffbeb',
            borderBottom: '1px solid #fef3c7',
            padding: '10px 24px',
            fontSize: '13px',
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px' }}>⭐</span>
          <span>
            <strong>100% Refundable Guarantee:</strong> Full sample &amp; shipping fee is deducted from your first bulk order (50+ pcs).
          </span>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flexGrow: 1 }}>
          {submitted ? (
            /* Success View */
            <div style={{ textAlign: 'center', padding: '20px 8px' }}>
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
                  margin: '0 auto 16px',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: '1.4rem', margin: '0 0 8px', color: '#0f172a' }}>
                Sample Request Received!
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '480px', margin: '0 auto 24px' }}>
                Our sampling master craftsman in Sialkot has received your specifications for{' '}
                <strong>{garmentName}</strong>. A proforma invoice has been generated for your records.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px', margin: '0 auto' }}>
                <Link
                  href={invoiceUrl}
                  target="_blank"
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  📄 View &amp; Print Sample Proforma Invoice
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  💬 Confirm via Direct WhatsApp with Factory
                </a>

                <Link
                  href="/track-order"
                  style={{
                    background: '#f1f5f9',
                    color: '#334155',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '13px',
                    textDecoration: 'none',
                  }}
                >
                  🔍 Track Production &amp; Courier Stages
                </Link>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textDecoration: 'underline',
                  }}
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Stepper Tabs */}
              <div
                style={{
                  display: 'flex',
                  borderBottom: '2px solid #f1f5f9',
                  marginBottom: '20px',
                  gap: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: 'none',
                    borderBottom: step === 1 ? '2px solid var(--brand-orange, #f3a626)' : 'none',
                    fontWeight: step === 1 ? 800 : 600,
                    color: step === 1 ? '#0f172a' : '#94a3b8',
                    cursor: 'pointer',
                    marginBottom: '-2px',
                    fontSize: '14px',
                  }}
                >
                  1. Sample Specs &amp; Branding
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: 'none',
                    borderBottom: step === 2 ? '2px solid var(--brand-orange, #f3a626)' : 'none',
                    fontWeight: step === 2 ? 800 : 600,
                    color: step === 2 ? '#0f172a' : '#94a3b8',
                    cursor: 'pointer',
                    marginBottom: '-2px',
                    fontSize: '14px',
                  }}
                >
                  2. Courier &amp; Destination
                </button>
              </div>

              {errorMsg && (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fee2e2',
                    color: '#dc2626',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '13px',
                  }}
                >
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* STEP 1: Specs */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Sample Tier Selection */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: '#334155' }}>
                      Choose Sample Tier:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div
                        onClick={() => setSampleType('branded')}
                        style={{
                          border: sampleType === 'branded' ? '2px solid var(--brand-orange, #f3a626)' : '1px solid #cbd5e1',
                          background: sampleType === 'branded' ? 'rgba(243, 166, 38, 0.06)' : '#ffffff',
                          padding: '14px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '14px', color: '#0f172a' }}>Full Prototype</strong>
                          <span style={{ fontWeight: 800, color: 'var(--brand-orange-dark, #c57608)', fontSize: '14px' }}>
                            {formatPrice(85)}
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0', lineHeight: 1.4 }}>
                          Includes custom logo print/embroidery, custom woven neck label, hangtags &amp; exact color match.
                        </p>
                      </div>

                      <div
                        onClick={() => setSampleType('fit')}
                        style={{
                          border: sampleType === 'fit' ? '2px solid var(--brand-orange, #f3a626)' : '1px solid #cbd5e1',
                          background: sampleType === 'fit' ? 'rgba(243, 166, 38, 0.06)' : '#ffffff',
                          padding: '14px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '14px', color: '#0f172a' }}>Fit &amp; Sizing Sample</strong>
                          <span style={{ fontWeight: 800, color: '#334155', fontSize: '14px' }}>
                            {formatPrice(45)}
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0', lineHeight: 1.4 }}>
                          Plain unbranded sample to inspect sizing pattern, drape, stitching precision and fabric GSM.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Garment Style */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                      Garment Style:
                    </label>
                    <input
                      type="text"
                      value={garmentName}
                      onChange={(e) => setGarmentName(e.target.value)}
                      required
                      placeholder="e.g. Heavyweight French Terry Boxy Hoodie"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  {/* Fabric & Size Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        Fabric Specification:
                      </label>
                      <select
                        value={fabric}
                        onChange={(e) => setFabric(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '13px',
                          background: '#fff',
                        }}
                      >
                        {FABRICS.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        Sample Size:
                      </label>
                      <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '13px',
                          background: '#fff',
                        }}
                      >
                        {SIZES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Color / Pantone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                      Color / Pantone Code:
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="e.g. Vintage Washed Charcoal, Olive Green or Pantone 19-4007"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  {/* Branding elements if custom prototype */}
                  {sampleType === 'branded' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: '#334155' }}>
                        Included Custom Branding Elements:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {BRANDING_OPTIONS.map((opt) => (
                          <label
                            key={opt}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '12px',
                              color: '#334155',
                              cursor: 'pointer',
                              background: '#f8fafc',
                              padding: '8px 10px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedBranding.includes(opt)}
                              onChange={() => toggleBranding(opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Step Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn btn-primary"
                      style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 700 }}
                    >
                      Next: Shipping Address →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Delivery & Contact */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        required
                        placeholder="John Doe"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        Brand / Company Name
                      </label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. Apex Apparel NYC"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        Email Address (For Invoice) *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="buyer@brand.com"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        WhatsApp Number * (Live Factory Updates)
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        required
                        placeholder="+1 555 234 5678"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Suite, Building, Street Address"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        Destination Country *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '13px',
                          background: '#fff',
                        }}
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="Los Angeles"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        placeholder="90001"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      marginTop: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ color: '#64748b' }}>
                        Sample Fee ({sampleType === 'fit' ? 'Plain Fit Sample' : 'Custom Branded Prototype'}):
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatPrice(sampleBaseUsd)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                      <span style={{ color: '#64748b' }}>DHL Express Air (Sialkot &rarr; {country}):</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatPrice(courierFeeUsd)}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #cbd5e1',
                        paddingTop: '8px',
                        fontSize: '15px',
                        fontWeight: 800,
                      }}
                    >
                      <span style={{ color: '#0f172a' }}>Total Sample Development:</span>
                      <span style={{ color: 'var(--brand-orange-dark, #c57608)' }}>{formatPrice(totalUsd)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                    >
                      &larr; Back to Specs
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                      style={{
                        padding: '12px 28px',
                        fontSize: '14px',
                        fontWeight: 800,
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {loading ? 'Processing Sample Order...' : `Confirm Sample Order & Generate Invoice (${formatPrice(totalUsd)})`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

