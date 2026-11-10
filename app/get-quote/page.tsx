"use client";

import { useState } from 'react';
import Link from 'next/link';
import TechPackUploader from '../components/TechPackUploader';
import { useCurrency } from '../lib/currency';
import CurrencySelector from '../components/CurrencySelector';

interface GarmentType {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  fabrics: { name: string; add: number }[];
  leadDays: string;
}

const GARMENTS: GarmentType[] = [
  {
    id: 'hoodie',
    name: 'Heavyweight Custom Hoodie',
    category: 'Streetwear & Fleece',
    basePrice: 14.50,
    fabrics: [
      { name: '360 GSM Cotton Fleece', add: 0 },
      { name: '420 GSM 100% Cotton Heavy Fleece', add: 2.20 },
      { name: '480 GSM French Terry (Luxury Custom)', add: 3.80 },
    ],
    leadDays: '15-18 days'
  },
  {
    id: 'tshirt',
    name: 'Oversized Boxy Streetwear Tee',
    category: 'Streetwear',
    basePrice: 6.80,
    fabrics: [
      { name: '200 GSM Single Jersey Combed Cotton', add: 0 },
      { name: '240 GSM Heavyweight Compact Cotton', add: 1.10 },
      { name: '280 GSM Raw Vintage Wash Cotton', add: 1.90 },
    ],
    leadDays: '12-15 days'
  },
  {
    id: 'jeans',
    name: 'Custom Selvedge & Stretch Denim',
    category: 'Denim',
    basePrice: 16.00,
    fabrics: [
      { name: '12 oz Stretch Comfort Denim', add: 0 },
      { name: '14 oz 100% Cotton Rigid Raw Denim', add: 2.50 },
      { name: '15 oz Japanese-Style Selvedge Denim', add: 5.00 },
    ],
    leadDays: '20-25 days'
  },
  {
    id: 'leggings',
    name: 'Seamless High-Waist Gym Leggings',
    category: 'Fitness Wear',
    basePrice: 10.20,
    fabrics: [
      { name: '75% Nylon / 25% Spandex (Buttery Soft)', add: 0 },
      { name: 'Squat-Proof Ribbed Compression Fabric', add: 1.80 },
      { name: 'Recycled Sustainable Active Fabric', add: 2.40 },
    ],
    leadDays: '14-17 days'
  },
  {
    id: 'joggers',
    name: 'Tapered Cargo / Fleece Joggers',
    category: 'Streetwear & Athleisure',
    basePrice: 12.00,
    fabrics: [
      { name: '320 GSM Cotton/Poly Fleece', add: 0 },
      { name: '380 GSM Heavy Cotton Terry', add: 1.90 },
      { name: 'Water-Resistant Technical Track Fabric', add: 2.80 },
    ],
    leadDays: '15-18 days'
  },
  {
    id: 'boxing_gloves',
    name: 'Pro Sparring Boxing Gloves (Cowhide)',
    category: 'Boxing & MMA',
    basePrice: 19.50,
    fabrics: [
      { name: 'Premium Synthetic PU Leather (Eco)', add: 0 },
      { name: 'Genuine Full-Grain Cowhide Leather', add: 6.50 },
      { name: 'Multi-Layer Gel & Horsehair Padding', add: 9.00 },
    ],
    leadDays: '18-22 days'
  }
];

const BRANDING_OPTIONS = [
  { id: 'puff', name: '3D Puff Screen Printing', cost: 0.85 },
  { id: 'embroidery', name: 'High-Density 3D Embroidery', cost: 1.10 },
  { id: 'silicone', name: 'Raised Matte Silicone Heat Transfer', cost: 0.95 },
  { id: 'woven_tags', name: 'Custom Woven Neck & Hem Labels', cost: 0.35 },
  { id: 'custom_polybag', name: 'Frosted Biodegradable Zipper Polybags', cost: 0.45 },
  { id: 'hangtag', name: 'Embossed Cardstock Hangtags with String', cost: 0.25 },
];

export default function GetQuotePage() {
  const { currency, formatPrice } = useCurrency();
  const [selectedGarment, setSelectedGarment] = useState<GarmentType>(GARMENTS[0]);
  const [selectedFabricIndex, setSelectedFabricIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(100);
  const [selectedBranding, setSelectedBranding] = useState<string[]>(['woven_tags', 'custom_polybag']);

  // Buyer Form details
  const [brandName, setBrandName] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('United States');
  const [notes, setNotes] = useState('');
  const [techpackUrl, setTechpackUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string; waLink?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing calculations
  const fabricExtra = selectedGarment.fabrics[selectedFabricIndex]?.add || 0;
  const brandingCost = selectedBranding.reduce((sum, id) => {
    const opt = BRANDING_OPTIONS.find(b => b.id === id);
    return sum + (opt ? opt.cost : 0);
  }, 0);

  let volumeDiscount = 0;
  if (quantity >= 1000) volumeDiscount = 0.25;
  else if (quantity >= 500) volumeDiscount = 0.18;
  else if (quantity >= 250) volumeDiscount = 0.12;
  else if (quantity >= 100) volumeDiscount = 0.05;

  const rawUnitCost = selectedGarment.basePrice + fabricExtra + brandingCost;
  const unitCost = rawUnitCost * (1 - volumeDiscount);
  const totalCost = unitCost * quantity;

  const invoiceUrl = `/invoice?name=${encodeURIComponent(buyerName || 'Valued Partner')}&company=${encodeURIComponent(brandName || 'Clothing Label')}&email=${encodeURIComponent(email || '')}&phone=${encodeURIComponent(whatsapp || '')}&country=${encodeURIComponent(country)}&garment=${encodeURIComponent(selectedGarment.name)}&quantity=${quantity}&unitCost=${unitCost.toFixed(2)}&currency=${currency.code}&symbol=${encodeURIComponent(currency.symbol)}&notes=${encodeURIComponent(notes)}&techpackUrl=${encodeURIComponent(techpackUrl || '')}`;

  const toggleBranding = (id: string) => {
    setSelectedBranding(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !buyerName) {
      setStatusMsg({ type: 'error', text: 'Please fill in your name and email.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    const breakdown = `
[B2B INSTANT RFQ ESTIMATE]
Garment: ${selectedGarment.name} (${selectedGarment.category})
Fabric: ${selectedGarment.fabrics[selectedFabricIndex].name}
Order Quantity: ${quantity} pcs
Custom Branding: ${selectedBranding.join(', ') || 'None'}
Estimated Unit Cost: $${unitCost.toFixed(2)}/pc
Estimated Total: $${totalCost.toFixed(2)} USD
Lead Time: ${selectedGarment.leadDays}
Buyer Brand: ${brandName || 'Not specified'}
Country: ${country}
WhatsApp: ${whatsapp || 'Not provided'}
Client Notes: ${notes || 'No extra notes'}
    `.trim();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: buyerName,
          email: email,
          company: brandName,
          country: country,
          phone: whatsapp,
          subject: `RFQ for ${quantity}x ${selectedGarment.name} - ${brandName || buyerName}`,
          message: breakdown,
          techpackUrl: techpackUrl,
          videoUrl: videoUrl
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({
          type: 'success',
          text: `Success! Your RFQ has been logged with the factory desk. Automated email and WhatsApp alerts have been dispatched.`,
          waLink: data.whatsAppDirectUrl
        });
      } else {
        setStatusMsg({
          type: 'error',
          text: data.message || 'Something went wrong. Please connect with us directly on WhatsApp.'
        });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Network error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 16px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb & Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(243,166,38,0.12)', color: 'var(--brand-orange-dark, #c57608)', padding: '6px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
            Direct Factory Pricing Calculator
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>
            Instant B2B Garment Cost &amp; RFQ Estimator
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '720px', margin: '0 auto' }}>
            Configure your apparel specifications, select premium fabrics, quantities, and branding techniques. Get real-time transparent OEM/ODM wholesale estimates directly from our Sialkot manufacturing plant.
          </p>
        </div>

        {/* 2-Column Configurator */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px', alignItems: 'start' }}>
          {/* Left Column: Product & Specs Customizer */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#f3a626', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900 }}>1</span>
              Select Garment Type
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px', marginBottom: '24px' }}>
              {GARMENTS.map(item => {
                const isSelected = selectedGarment.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedGarment(item);
                      setSelectedFabricIndex(0);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '14px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #f3a626' : '1px solid #e2e8f0',
                      background: isSelected ? 'rgba(243,166,38,0.05)' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{item.category}</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? '#b45309' : '#0f172a', marginTop: '4px' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, marginTop: '6px' }}>From {formatPrice(item.basePrice)}</div>
                  </button>
                );
              })}
            </div>

            {/* Step 2: Fabric & GSM selection */}
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: '28px 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#f3a626', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900 }}>2</span>
              Fabric Construction &amp; Weight (GSM)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {selectedGarment.fabrics.map((fab, idx) => (
                <label
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: selectedFabricIndex === idx ? '2px solid #f3a626' : '1px solid #e2e8f0',
                    background: selectedFabricIndex === idx ? 'rgba(243,166,38,0.06)' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="radio"
                      name="fabric"
                      checked={selectedFabricIndex === idx}
                      onChange={() => setSelectedFabricIndex(idx)}
                      style={{ accentColor: '#f3a626', width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{fab.name}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: fab.add > 0 ? '#475569' : '#10b981' }}>
                    {fab.add > 0 ? `+${formatPrice(fab.add)}/pc` : 'Standard Base'}
                  </span>
                </label>
              ))}
            </div>

            {/* Step 3: Quantity Slider & Volume Discount */}
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: '28px 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#f3a626', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900 }}>3</span>
              Order Quantity (MOQ: 50 pcs)
            </h2>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Select batch size:</span>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>{quantity} pieces</span>
              </div>

              {/* Preset quick buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {[50, 100, 250, 500, 1000, 2500].map(qty => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setQuantity(qty)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: quantity === qty ? '2px solid #0f172a' : '1px solid #cbd5e1',
                      background: quantity === qty ? '#0f172a' : '#fff',
                      color: quantity === qty ? '#fff' : '#475569',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {qty} pcs
                  </button>
                ))}
              </div>

              {volumeDiscount > 0 && (
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', color: '#15803d', fontWeight: 700, display: 'inline-block' }}>
                  🎉 Volume Tier Discount: {(volumeDiscount * 100)}% OFF Applied!
                </div>
              )}
            </div>

            {/* Step 4: Custom Branding Options */}
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: '28px 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#f3a626', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900 }}>4</span>
              Private Label &amp; Branding Enhancements
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
              {BRANDING_OPTIONS.map(opt => {
                const checked = selectedBranding.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: checked ? '1.5px solid #f3a626' : '1px solid #e2e8f0',
                      background: checked ? 'rgba(243,166,38,0.06)' : '#fff',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleBranding(opt.id)}
                      style={{ accentColor: '#f3a626', width: '16px', height: '16px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{opt.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>+{formatPrice(opt.cost)}/pc</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Price Summary & Submit RFQ Form */}
          <div style={{ position: 'sticky', top: '100px' }}>
            {/* Price Preview Card */}
            <div style={{ background: '#0f172a', color: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#f3a626', fontWeight: 800, letterSpacing: '0.08em' }}>
                  Estimated Factory Direct Cost (FOB Sialkot)
                </div>
                <CurrencySelector compact />
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '14px 0 6px' }}>
                <span style={{ fontSize: '42px', fontWeight: 900, color: '#ffffff' }}>{formatPrice(unitCost)}</span>
                <span style={{ fontSize: '16px', color: '#94a3b8' }}>/ piece</span>
              </div>
              <div style={{ fontSize: '14px', color: '#cbd5e1' }}>
                Total Order Estimate: <strong style={{ color: '#f3a626', fontSize: '18px' }}>{formatPrice(totalCost)} {currency.code}</strong>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.12)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Garment Base:</span>
                  <span style={{ color: '#fff' }}>{formatPrice(selectedGarment.basePrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Fabric Extra:</span>
                  <span style={{ color: '#fff' }}>+{formatPrice(fabricExtra)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Custom Branding:</span>
                  <span style={{ color: '#fff' }}>+{formatPrice(brandingCost)}</span>
                </div>
                {volumeDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                    <span>Volume Discount:</span>
                    <span>-{(volumeDiscount * 100)}%</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Estimated Lead Time:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{selectedGarment.leadDays}</span>
                </div>
              </div>

              <Link
                href={invoiceUrl}
                target="_blank"
                style={{
                  marginTop: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '11px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <span>📄</span> Generate &amp; Print Proforma Invoice (PDF) ↗
              </Link>
            </div>

            {/* Buyer RFQ Submission Form */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
                Lock In This Quote &amp; Request Sample
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 18px', lineHeight: 1.5 }}>
                Our sample department will review your specifications and reply with a formal proforma quotation and fabric swatch options within 4-6 hours.
              </p>

              {statusMsg && (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    marginBottom: '18px',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    background: statusMsg.type === 'success' ? '#dcfce7' : '#fee2e2',
                    color: statusMsg.type === 'success' ? '#166534' : '#991b1b',
                    border: `1px solid ${statusMsg.type === 'success' ? '#86efac' : '#fca5a5'}`
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{statusMsg.text}</div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {statusMsg.waLink && (
                      <a
                        href={statusMsg.waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#22c55e',
                          color: '#ffffff',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontWeight: 800,
                          fontSize: '13px',
                          textDecoration: 'none'
                        }}
                      >
                        <span>💬</span> Chat on WhatsApp ➔
                      </a>
                    )}
                    <Link
                      href={invoiceUrl}
                      target="_blank"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#0f172a',
                        color: '#ffffff',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '13px',
                        textDecoration: 'none'
                      }}
                    >
                      <span>📄</span> Proforma Invoice (PDF) ↗
                    </Link>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={e => setBuyerName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Business Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="buyer@brand.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Brand / Company Name</label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={e => setBrandName(e.target.value)}
                      placeholder="e.g. Apex Athletics"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>WhatsApp (Recommended)</label>
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Destination Country</label>
                    <select
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                      <option value="France">France</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Specific Requirements / Notes</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Colorways, custom GSM, sizing cuts, trims, packaging requirements..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <TechPackUploader
                  label="Attach Tech Pack, CAD Pattern, or Sample Video"
                  onUploaded={(url) => setTechpackUrl(url)}
                  onVideoUploaded={(url) => setVideoUrl(url)}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '15px', fontWeight: 800, justifyContent: 'center' }}
                >
                  {isSubmitting ? 'Transmitting RFQ...' : 'Submit Official RFQ & Order Sample'}
                </button>
              </form>

              <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
                Need immediate response?{' '}
                <a
                  href="https://wa.me/923376793383?text=Hi%20Bin%20Rasool%20Enterprises,%20I%20just%20calculated%20an%20RFQ%20on%20your%20site%20and%20want%20to%20discuss%20sampling."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#16a34a', fontWeight: 700 }}
                >
                  Chat with Lead Production Manager on WhatsApp ➔
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
