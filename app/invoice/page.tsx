"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Link from 'next/link';

function InvoiceContent() {
  const searchParams = useSearchParams();

  // Query parameters or smart defaults
  const buyerName = searchParams.get('name') || 'International Partner';
  const company = searchParams.get('company') || 'Apparel Label';
  const email = searchParams.get('email') || 'buyer@brand.com';
  const phone = searchParams.get('phone') || '+1 555 0192';
  const country = searchParams.get('country') || 'United States';
  const garment = searchParams.get('garment') || 'Heavyweight Custom Hoodie (450 GSM French Terry)';
  const quantity = parseInt(searchParams.get('quantity') || '250', 10);
  const unitCost = parseFloat(searchParams.get('unitCost') || '16.50');
  const currencyCode = searchParams.get('currency') || 'USD';
  const currencySymbol = searchParams.get('symbol') || '$';
  const techpackUrl = searchParams.get('techpackUrl') || '';
  const notes = searchParams.get('notes') || 'Private label woven labels, 3D puff print, custom polybags.';

  const [invoiceNo] = useState(() => `BRE-PI-${Date.now().toString().slice(-6)}`);
  const [invoiceDate] = useState(() => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));

  const subtotal = quantity * unitCost;
  let discountPct = 0;
  if (quantity >= 1000) discountPct = 0.25;
  else if (quantity >= 500) discountPct = 0.18;
  else if (quantity >= 250) discountPct = 0.12;
  else if (quantity >= 100) discountPct = 0.05;

  const discountAmount = subtotal * discountPct;
  const grandTotal = subtotal - discountAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', padding: '30px 16px' }}>
      {/* Action Header - Hidden during print */}
      <div className="no-print" style={{ maxWidth: '900px', margin: '0 auto 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#475569',
            textDecoration: 'none'
          }}
        >
          ← Back to RFQ Estimator
        </Link>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <span>🖨️</span> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Printable Invoice Sheet */}
      <div
        className="invoice-sheet"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '48px 40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          color: '#1e293b',
          fontFamily: 'inherit'
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '24px', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <img src="/images/site/logo.webp" alt="Bin Rasool Enterprises" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 900, margin: 0, color: '#0f172a', letterSpacing: '0.02em' }}>
                  Bin Rasool Enterprises
                </h1>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#f3a626', fontWeight: 800, letterSpacing: '0.06em' }}>
                  Custom Sportswear, Streetwear &amp; Boxing Gear Exporter
                </div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
              Sambrial Road, Small Industrial Estate, Sialkot 51310, Punjab, Pakistan<br />
              Sales: sales@binrasoolenterprises.com &bull; General: info@binrasoolenterprises.com &bull; Web: www.binrasoolenterprises.com<br />
              NTN / Export Reg: PK-SKT-788219-01
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>Document Type</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>PROFORMA INVOICE</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#f3a626', marginTop: '4px' }}>{invoiceNo}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Date: {invoiceDate}</div>
              <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>Valid for 30 Days</div>
            </div>
          </div>
        </div>

        {/* 2-Column Buyer & Logistics Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px', fontSize: '13px' }}>
          {/* Buyer */}
          <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, marginBottom: '6px' }}>
              Buyer / Consignee
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{company}</div>
            <div style={{ color: '#334155', marginTop: '2px' }}>Attn: {buyerName}</div>
            <div style={{ color: '#64748b', marginTop: '2px' }}>Email: {email}</div>
            <div style={{ color: '#64748b' }}>Phone/WhatsApp: {phone}</div>
            <div style={{ color: '#64748b', fontWeight: 600 }}>Country: {country}</div>
          </div>

          {/* Shipping & Commercial Terms */}
          <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 800, marginBottom: '6px' }}>
              Commercial Shipping Terms
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px' }}>
              <span style={{ color: '#64748b' }}>Incoterm:</span>
              <strong style={{ color: '#0f172a' }}>FOB Sialkot Dry Port</strong>

              <span style={{ color: '#64748b' }}>Mode of Shipment:</span>
              <strong style={{ color: '#0f172a' }}>DHL Express Air / Sea Cargo</strong>

              <span style={{ color: '#64748b' }}>Payment Terms:</span>
              <strong style={{ color: '#0f172a' }}>50% Advance T/T, 50% Before Dispatch</strong>

              <span style={{ color: '#64748b' }}>Production Lead Time:</span>
              <strong style={{ color: '#0f172a' }}>15 - 20 Business Days</strong>
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div style={{ marginBottom: '28px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                <th style={{ padding: '12px 14px', borderRadius: '6px 0 0 0' }}>#</th>
                <th style={{ padding: '12px 14px' }}>Item Description &amp; Custom Specs</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Quantity</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Unit Price ({currencyCode})</th>
                <th style={{ padding: '12px 14px', textAlign: 'right', borderRadius: '0 6px 0 0' }}>Total ({currencyCode})</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '16px 14px', verticalAlign: 'top', fontWeight: 700 }}>01</td>
                <td style={{ padding: '16px 14px', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>{garment}</div>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                    Custom cut &amp; sew production, grading across S, M, L, XL, 2XL. Includes OEM private label woven neck tags, care labels and individual polybag packaging.
                  </div>
                  {notes && (
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontStyle: 'italic' }}>
                      Buyer Notes: {notes}
                    </div>
                  )}
                  {techpackUrl && (
                    <div style={{ fontSize: '11px', color: '#0284c7', marginTop: '4px' }}>
                      Tech Pack Reference: Attached &amp; Validated
                    </div>
                  )}
                </td>
                <td style={{ padding: '16px 14px', textAlign: 'center', verticalAlign: 'top', fontWeight: 700 }}>
                  {quantity} pcs
                </td>
                <td style={{ padding: '16px 14px', textAlign: 'right', verticalAlign: 'top', fontWeight: 600 }}>
                  {currencySymbol}{unitCost.toFixed(2)}
                </td>
                <td style={{ padding: '16px 14px', textAlign: 'right', verticalAlign: 'top', fontWeight: 800 }}>
                  {currencySymbol}{subtotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Breakdown */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
          <div style={{ width: '320px', background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Subtotal:</span>
              <strong>{currencySymbol}{subtotal.toFixed(2)} {currencyCode}</strong>
            </div>

            {discountPct > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#16a34a' }}>
                <span>Volume Discount ({(discountPct * 100)}%):</span>
                <span>-{currencySymbol}{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', paddingTop: '10px', marginTop: '8px', fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>
              <span>Total FOB Value:</span>
              <span style={{ color: 'var(--brand-orange-dark, #d98816)' }}>
                {currencySymbol}{grandTotal.toFixed(2)} {currencyCode}
              </span>
            </div>
          </div>
        </div>

        {/* Banking Remittance Coordinates & Terms */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '24px', fontSize: '12px', color: '#475569' }}>
          <div>
            <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '6px', textTransform: 'uppercase' }}>
              Official Bank Remittance Coordinates (International Wire T/T):
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', lineHeight: 1.6 }}>
              <div><strong>Beneficiary Name:</strong> Bin Rasool Enterprises</div>
              <div><strong>Bank Name:</strong> Habib Bank Limited (HBL) Small Industrial Estate Sialkot</div>
              <div><strong>Account / IBAN:</strong> PK36HABB0000001234567890</div>
              <div><strong>SWIFT / BIC Code:</strong> HABBpkka</div>
              <div><strong>Country:</strong> Pakistan</div>
            </div>
          </div>

          {/* Stamp & Authorized Signature */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div style={{ width: '130px', height: '60px', border: '2px dashed #94a3b8', borderRadius: '8px', display: 'grid', placeItems: 'center', color: '#94a3b8', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
              OFFICIAL FACTORY STAMP
            </div>
            <div style={{ borderTop: '1px solid #334155', width: '180px', paddingTop: '6px', fontWeight: 800, color: '#0f172a', fontSize: '12px' }}>
              Authorized Merchandiser
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Bin Rasool Enterprises Exports</div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '28px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', textAlign: 'center', fontSize: '11px', color: '#94a3b8' }}>
          This is an official Proforma Invoice generated by Bin Rasool Enterprises. All export shipments comply with ISO 9001 quality guidelines and Sialkot Chamber of Commerce &amp; Industry (SCCI) standards.
        </div>
      </div>

      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            padding: 0 !important;
          }
          .site-header, .site-footer, .no-print, .whatsapp-fab, .back-to-top-fab {
            display: none !important;
          }
          .invoice-sheet {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading Proforma Invoice...</div>}>
      <InvoiceContent />
    </Suspense>
  );
}

