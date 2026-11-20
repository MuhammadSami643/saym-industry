"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const PRODUCT_MATRIX = [
  {
    category: 'Heavyweight Streetwear',
    style: 'Boxy Oversized Drop-Shoulder Hoodie',
    fabric: '100% Combed Cotton French Terry / Fleece',
    gsm: '420 - 480 GSM',
    moq: '50 pcs / color',
    basePriceFOB: '$14.50 - $18.20',
    leadTime: '18-22 days',
    popularCustomization: '3D Puff Screen Print, Distressed Seams, Double-layer Hood'
  },
  {
    category: 'Women Activewear',
    style: 'High-Waist Scrunch Leggings & Bra Set',
    fabric: '75% Micro-Nylon / 25% Spandex (4-Way Stretch)',
    gsm: '240 - 280 GSM',
    moq: '50 sets / color',
    basePriceFOB: '$12.80 - $16.50',
    leadTime: '15-20 days',
    popularCustomization: 'Raised Silicone Logo, Flatlock Anti-Chafe Seams, Gusseted Crotch'
  },
  {
    category: 'Athletic Teamwear',
    style: 'Full-Zip Technical Warmup Tracksuit',
    fabric: '100% Micro-Poly Tricot / Brushed Fleece Interlock',
    gsm: '280 - 320 GSM',
    moq: '35 sets / style',
    basePriceFOB: '$18.50 - $24.00',
    leadTime: '20-25 days',
    popularCustomization: 'Sublimated Side Panels, YKK Waterproof Zippers, Custom Piping'
  },
  {
    category: 'Combat & MMA',
    style: 'Pro Fight Board Shorts & Compression Rashguard',
    fabric: 'Sublimated Polyester Microfiber + 220 GSM Spandex',
    gsm: '160 GSM / 220 GSM',
    moq: '30 pcs / design',
    basePriceFOB: '$11.50 - $15.00',
    leadTime: '14-18 days',
    popularCustomization: 'Full Wrap Sublimation, Lycra Flex Crotch, Triple Seam Lock'
  },
  {
    category: 'Combat Equipment',
    style: 'Lace-Up & Velcro Pro Boxing Gloves',
    fabric: '100% Cowhide Leather / High-Grade Matte Microfiber',
    gsm: '10 oz, 12 oz, 14 oz, 16 oz',
    moq: '25 pairs / color',
    basePriceFOB: '$19.00 - $27.50',
    leadTime: '20-25 days',
    popularCustomization: 'Multi-layer Latex & Eva Foam, Embossed Leather Wrist Patch'
  },
  {
    category: 'Gym Performance',
    style: 'Tapered Ankle Slim Gym Joggers',
    fabric: '95% Ringspun Cotton / 5% Elastane Terry',
    gsm: '300 - 340 GSM',
    moq: '50 pcs / color',
    basePriceFOB: '$11.80 - $14.50',
    leadTime: '16-20 days',
    popularCustomization: 'Deep Zipper Pockets, Metal Aglet Drawcords, Embroidered Thigh Badge'
  }
];

const BRANDING_CAPABILITIES = [
  { name: '3D Puff Screen Printing', tech: 'High-density foam additive cured at 165°C for sharp dimensional relief.', bestFor: 'Streetwear Hoodies & T-Shirts' },
  { name: 'Raised Matte Silicone Heat Seal', tech: '0.8mm - 1.2mm precision molded silicone with industrial adhesive.', bestFor: 'Leggings, Sports Bras, Techwear' },
  { name: 'High-Density 3D Embroidery', tech: 'Tajima multi-head computerized embroidery with foam underlay.', bestFor: 'Caps, Chest Logos, Tracksuit Jackets' },
  { name: 'Sublimation All-Over Print', tech: 'Italian dye-sublimation ink on poly-blends; 100% fade & crack resistant.', bestFor: 'MMA Rashguards, Jerseys, Teamwear' },
  { name: 'Custom Woven Labels & Hangtags', tech: 'Damask woven neck & care tags with embossed 450 GSM cardstock hangtags.', bestFor: 'Complete Private Label Retail Pack' },
  { name: 'Frosted Biodegradable Polybags', tech: 'Zipper sealed frosted polybags with custom printed logo and SKU barcode.', bestFor: 'Amazon FBA / E-Commerce Fulfillment' }
];

export default function LineSheetView() {
  const [buyerBrand, setBuyerBrand] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const b = params.get('brand');
      if (b) setBuyerBrand(b);
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 60px' }}>
      {/* Non-Printable Top Action Toolbar */}
      <div className="no-print" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#0f172a',
        color: '#fff',
        padding: '12px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/products" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>
            ← Back to Products
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#f3a626' }}>
            📄 2026 Export Line Sheet (Print &amp; PDF Export Ready)
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a
            href="https://wa.me/923376793383?text=Hi%20Bin%20Rasool%20Enterprises,%20I%20am%20reviewing%20your%202026%20Line%20Sheet%20and%20want%20to%20discuss%20a%20sample%20order."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#22c55e',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>💬</span> Discuss via WhatsApp
          </a>

          <Link
            href="/contact"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            📋 Request a Quote
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            style={{
              background: '#f3a626',
              color: '#000000',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(243,166,38,0.3)'
            }}
          >
            <span>🖨️</span> Save as PDF / Print Line Sheet
          </button>
        </div>
      </div>

      {/* Main Printable Document Canvas */}
      <div className="linesheet-canvas" style={{
        maxWidth: '960px',
        margin: '30px auto',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '48px 56px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        color: '#0f172a',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}>
        {/* Document Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #0f172a', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.02em', color: '#0f172a', textTransform: 'uppercase' }}>
              Bin Rasool Enterprises
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#c57608', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px' }}>
              OEM &amp; ODM Private Label Garment Manufacturer &bull; Sialkot, Pakistan
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              Global Export Hub &bull; Sialkot Export Processing Zone, Punjab, Pakistan &bull; ISO 9001:2015 Compliant
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-block', background: '#0f172a', color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em' }}>
              OFFICIAL 2026 LINE SHEET
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
              Document Version: <strong style={{ color: '#0f172a' }}>V4.2 (Export Direct)</strong>
            </div>
            {buyerBrand && (
              <div style={{ fontSize: '12px', color: '#166534', fontWeight: 700, marginTop: '4px', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>
                Prepared for: {buyerBrand}
              </div>
            )}
          </div>
        </div>

        {/* Executive Factory Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', background: '#f8fafc', padding: '18px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Production MOQ</div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>30 - 50 Pcs</div>
            <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 600 }}>Low Startup Barrier</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Sample Turnaround</div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>5 - 7 Days</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>DHL / FedEx Air Courier</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Bulk Lead Time</div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>18 - 25 Days</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>AQL 2.5 QA Guaranteed</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Export Terms</div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>FOB Sialkot</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>Air Cargo &amp; Sea Freight</div>
          </div>
        </div>

        {/* SECTION 1: PRODUCT MATRIX */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ background: '#f3a626', color: '#000', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>1</span>
            <h2 style={{ fontSize: '16px', fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0f172a' }}>
              Flagship Garment Production Matrix &bull; Wholesale FOB Reference
            </h2>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #cbd5e1' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', fontWeight: 800 }}>Category &amp; Style</th>
                <th style={{ padding: '10px 12px', fontWeight: 800 }}>Fabric Blend &amp; Weight</th>
                <th style={{ padding: '10px 12px', fontWeight: 800 }}>MOQ</th>
                <th style={{ padding: '10px 12px', fontWeight: 800 }}>FOB Sialkot (USD)</th>
                <th style={{ padding: '10px 12px', fontWeight: 800 }}>Lead Time</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCT_MATRIX.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <strong style={{ color: '#0f172a', display: 'block' }}>{item.style}</strong>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>{item.category}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div>{item.fabric}</div>
                    <strong style={{ color: '#b45309', fontSize: '11px' }}>{item.gsm}</strong>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#334155' }}>{item.moq}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 900, color: '#166534', fontSize: '13px' }}>{item.basePriceFOB}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.leadTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>
            * Note: FOB unit costs vary based on exact custom branding techniques, GSM, order volume and packaging configurations.
          </div>
        </div>

        {/* SECTION 2: BRANDING CAPABILITIES */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ background: '#f3a626', color: '#000', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>2</span>
            <h2 style={{ fontSize: '16px', fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0f172a' }}>
              Private Label Branding &amp; Customization Capabilities
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {BRANDING_CAPABILITIES.map((b, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 14px', background: '#fafafa' }}>
                <div style={{ fontWeight: 800, fontSize: '12px', color: '#0f172a', marginBottom: '2px' }}>
                  {b.name}
                </div>
                <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.4 }}>
                  {b.tech}
                </div>
                <div style={{ fontSize: '10px', color: '#0369a1', fontWeight: 700, marginTop: '4px' }}>
                  Optimal For: {b.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: VOLUME DISCOUNT TIERS & TERMS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '36px' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 900, margin: '0 0 10px', textTransform: 'uppercase', color: '#0f172a' }}>
              Volume Scale Discounts
            </h3>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11px', color: '#475569', lineHeight: 1.8 }}>
              <li><strong>100 – 249 pcs:</strong> Base FOB Factory Direct Rate</li>
              <li><strong>250 – 499 pcs:</strong> <strong>5% – 8%</strong> Volume Deduction</li>
              <li><strong>500 – 999 pcs:</strong> <strong>12% – 15%</strong> Scale Deduction</li>
              <li><strong>1,000+ pcs:</strong> <strong>18% – 25%</strong> Container Bulk Rate</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 900, margin: '0 0 10px', textTransform: 'uppercase', color: '#0f172a' }}>
              Standard Export Payment &amp; Logistics
            </h3>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11px', color: '#475569', lineHeight: 1.8 }}>
              <li><strong>Sampling Protocol:</strong> 100% upfront sample development fee (credited against bulk).</li>
              <li><strong>Bulk Payment Terms:</strong> 50% advance deposit to commence production; 50% upon QA video signoff prior to courier dispatch.</li>
              <li><strong>Carriers:</strong> Official DHL Express Worldwide, FedEx Priority and Sialkot Airport Air Cargo.</li>
            </ul>
          </div>
        </div>

        {/* DOCUMENT FOOTER & FACTORY VERIFICATION */}
        <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748b' }}>
          <div>
            <strong>Bin Rasool Enterprises &bull; Export Sales Division</strong><br />
            Sialkot, Punjab, 51310, Pakistan &bull; Phone/WhatsApp: <strong>+92 337 6793383</strong><br />
            Email: <strong style={{ color: '#0f172a' }}>sales@binrasoolenterprises.com</strong> &bull; Web: binrasoolenterprises.com
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>
              ✓ Verified Sialkot Export Facility
            </div>
            <div>AQL 2.5 Military-Standard Quality Control</div>
          </div>
        </div>
      </div>

      {/* Global CSS for Print Layout */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .linesheet-canvas {
            border: none !important;
            box-shadow: none !important;
            padding: 20px !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

