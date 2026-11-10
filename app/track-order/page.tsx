"use client";

import { useState } from 'react';
import Link from 'next/link';

interface OrderMilestone {
  stage: string;
  title: string;
  desc: string;
  completed: boolean;
  active: boolean;
  date: string;
}

interface OrderRecord {
  orderId: string;
  clientName: string;
  brand: string;
  country: string;
  item: string;
  quantity: string;
  fabricSpec: string;
  targetDispatch: string;
  carrier: string;
  trackingNumber: string;
  overallStatus: 'Tech Pack' | 'Cutting' | 'Stitching & Branding' | 'Quality Control' | 'Dispatched';
  milestones: OrderMilestone[];
}

const DEMO_ORDERS: Record<string, OrderRecord> = {
  'BRE-2026-9014': {
    orderId: 'BRE-2026-9014',
    clientName: 'Liam Carter',
    brand: 'Vanguard Streetwear LLC',
    country: 'United States (Los Angeles, CA)',
    item: '450 GSM Heavy French Terry Boxy Hoodies',
    quantity: '600 pcs (Black, Vintage Grey, Forest Green)',
    fabricSpec: '100% Combed Ringspun Cotton French Terry, Pre-Shrunk',
    targetDispatch: 'November 18, 2026',
    carrier: 'DHL Express Worldwide Air Cargo',
    trackingNumber: 'DHL-PK-9821449012',
    overallStatus: 'Quality Control',
    milestones: [
      {
        stage: '01',
        title: 'Tech Pack & Pre-Production Swatch Approved',
        desc: 'Lab dips approved, sizing graded across XS to 3XL.',
        completed: true,
        active: false,
        date: 'Oct 28, 2026'
      },
      {
        stage: '02',
        title: 'Fabric Knitting, Dyeing & Precision Cutting',
        desc: 'Custom combed yarn knitted and laser cut to CAD specifications.',
        completed: true,
        active: false,
        date: 'Nov 03, 2026'
      },
      {
        stage: '03',
        title: 'Industrial Stitching & 3D Puff Screen Print',
        desc: 'Flatlock reinforced seam assembly & high-density chest print.',
        completed: true,
        active: false,
        date: 'Nov 10, 2026'
      },
      {
        stage: '04',
        title: 'AQL 2.5 Quality Inspection & Custom Packaging',
        desc: 'Thread trimming, seam strength testing, woven neck labels, and individual biodegradable frosted polybagging.',
        completed: false,
        active: true,
        date: 'In Progress (Nov 14-16)'
      },
      {
        stage: '05',
        title: 'Export Customs Clearance & Air Dispatch',
        desc: 'Sialkot Dry Port customs clearance to DHL Hub & Air Bill of Lading.',
        completed: false,
        active: false,
        date: 'Est. Nov 18, 2026'
      }
    ]
  },
  'BRE-SAMPLE-104': {
    orderId: 'BRE-SAMPLE-104',
    clientName: 'Sophie Bennett',
    brand: 'Aura Athletics',
    country: 'United Kingdom (London)',
    item: 'Seamless High-Waist Scrunch Leggings & Sports Bra Set',
    quantity: '4 Sets (Prototyping & Fit Verification)',
    fabricSpec: '75% Micro-Nylon / 25% Spandex, 4-Way Stretch Compression',
    targetDispatch: 'November 12, 2026',
    carrier: 'FedEx Priority Express',
    trackingNumber: 'FDX-8730991204-GB',
    overallStatus: 'Dispatched',
    milestones: [
      {
        stage: '01',
        title: 'Sample Pattern Drafting',
        desc: 'Digitized grading created from buyer specs.',
        completed: true,
        active: false,
        date: 'Nov 02, 2026'
      },
      {
        stage: '02',
        title: 'Seamless Circular Knitting',
        desc: 'Santoni seamless machine knitting completed.',
        completed: true,
        active: false,
        date: 'Nov 05, 2026'
      },
      {
        stage: '03',
        title: 'Heat Seal Logo Transfer & Assembly',
        desc: 'Matte silicone reflective branding applied.',
        completed: true,
        active: false,
        date: 'Nov 08, 2026'
      },
      {
        stage: '04',
        title: 'Fit Verification & Lab Check',
        desc: 'Elasticity & squat-test passed 100%.',
        completed: true,
        active: false,
        date: 'Nov 09, 2026'
      },
      {
        stage: '05',
        title: 'Sample Dispatched via FedEx Priority',
        desc: 'In transit to Heathrow International Airport.',
        completed: true,
        active: false,
        date: 'Nov 11, 2026'
      }
    ]
  }
};

export default function TrackOrderPage() {
  const [searchInput, setSearchInput] = useState('');
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(DEMO_ORDERS['BRE-2026-9014']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (!query) {
      setErrorMsg('Please enter an Order ID or Sample ID.');
      return;
    }

    if (DEMO_ORDERS[query]) {
      setCurrentOrder(DEMO_ORDERS[query]);
      setErrorMsg('');
    } else {
      // Mock generation for any arbitrary ID entered by user
      setCurrentOrder({
        orderId: query,
        clientName: 'Valued OEM Buyer',
        brand: 'International Client Partner',
        country: 'Worldwide Air/Sea Cargo',
        item: 'Custom Cut & Sew Production Batch',
        quantity: 'Active Batch',
        fabricSpec: 'Factory Sourced Certified Mill Fabric',
        targetDispatch: 'Est. 14 Working Days',
        carrier: 'DHL / FedEx International',
        trackingNumber: `AWB-${query}-PK`,
        overallStatus: 'Cutting',
        milestones: [
          {
            stage: '01',
            title: 'Tech Pack Verification & Fabric Procurement',
            desc: 'Yarn sourced and lab-dip swatches verified against Pantone standard.',
            completed: true,
            active: false,
            date: 'Completed'
          },
          {
            stage: '02',
            title: 'Pattern CAD Grading & Precision Fabric Cutting',
            desc: 'Automated fabric layout and cutting table processing.',
            completed: false,
            active: true,
            date: 'In Progress'
          },
          {
            stage: '03',
            title: 'Industrial Stitching & Private Label Printing',
            desc: 'Assembly line sewing, custom inner tags, and decorative embroidery.',
            completed: false,
            active: false,
            date: 'Scheduled'
          },
          {
            stage: '04',
            title: 'Final Quality Audit (AQL 2.5) & Ironing',
            desc: 'Full measurement checks and polybag packing.',
            completed: false,
            active: false,
            date: 'Scheduled'
          },
          {
            stage: '05',
            title: 'Customs Clearance & Bill of Lading Issuance',
            desc: 'Port handover and tracking dispatch.',
            completed: false,
            active: false,
            date: 'Scheduled'
          }
        ]
      });
      setErrorMsg('');
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 16px 80px' }}>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(243,166,38,0.12)', color: 'var(--brand-orange-dark, #c57608)', padding: '6px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
            Live Factory Production Milestone Tracker
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>
            Track Your Custom Apparel Production &amp; Samples
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '680px', margin: '0 auto' }}>
            Enter your Bin Rasool Enterprises Order ID or Sample Batch Number to monitor real-time manufacturing stages directly from our Sialkot cutting and stitching floors.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', marginBottom: '32px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Enter Order ID (e.g. BRE-2026-9014 or BRE-SAMPLE-104)"
              style={{ flex: 1, minWidth: '260px', padding: '14px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '15px' }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 800 }}
            >
              Track Order Status
            </button>
          </form>

          {/* Quick Demo Pill Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', flexWrap: 'wrap', fontSize: '12px', color: '#64748b' }}>
            <span>Quick Test Live Batches:</span>
            <button
              type="button"
              onClick={() => { setSearchInput('BRE-2026-9014'); setCurrentOrder(DEMO_ORDERS['BRE-2026-9014']); }}
              style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
            >
              BRE-2026-9014 (Bulk Hoodies - QC Stage)
            </button>
            <button
              type="button"
              onClick={() => { setSearchInput('BRE-SAMPLE-104'); setCurrentOrder(DEMO_ORDERS['BRE-SAMPLE-104']); }}
              style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
            >
              BRE-SAMPLE-104 (Seamless Activewear - Dispatched)
            </button>
          </div>

          {errorMsg && (
            <div style={{ marginTop: '12px', color: '#ef4444', fontSize: '13px', fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}
        </div>

        {/* Order Details Display Card */}
        {currentOrder && (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            {/* Top Status Header */}
            <div style={{ background: '#0f172a', color: '#fff', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#f3a626' }}>{currentOrder.orderId}</span>
                  <span style={{ background: '#22c55e', color: '#000', fontSize: '11px', fontWeight: 900, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                    {currentOrder.overallStatus}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '6px' }}>
                  Buyer: <strong>{currentOrder.brand}</strong> ({currentOrder.clientName}) &bull; {currentOrder.country}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Dispatch Date</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>{currentOrder.targetDispatch}</div>
              </div>
            </div>

            {/* Spec Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '20px 28px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Production Item</span>
                <strong style={{ color: '#1e293b' }}>{currentOrder.item}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Batch Volume</span>
                <strong style={{ color: '#1e293b' }}>{currentOrder.quantity}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Fabric Formulation</span>
                <strong style={{ color: '#1e293b' }}>{currentOrder.fabricSpec}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Carrier / Air Waybill</span>
                <strong style={{ color: '#0284c7' }}>{currentOrder.carrier}</strong>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{currentOrder.trackingNumber}</div>
              </div>
            </div>

            {/* 5-Step Visual Timeline */}
            <div style={{ padding: '36px 28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 28px' }}>
                Manufacturing Stage Progression
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {currentOrder.milestones.map((step, idx) => {
                  let badgeBg = '#e2e8f0';
                  let badgeColor = '#64748b';
                  let borderStyle = '1px solid #e2e8f0';

                  if (step.completed) {
                    badgeBg = '#10b981';
                    badgeColor = '#ffffff';
                    borderStyle = '1px solid #a7f3d0';
                  } else if (step.active) {
                    badgeBg = '#f3a626';
                    badgeColor = '#000000';
                    borderStyle = '2px solid #f3a626';
                  }

                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: '20px',
                        padding: '18px 20px',
                        borderRadius: '12px',
                        background: step.active ? 'rgba(243,166,38,0.05)' : '#ffffff',
                        border: borderStyle,
                        alignItems: 'flex-start'
                      }}
                    >
                      {/* Step Number Circle */}
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: badgeBg,
                          color: badgeColor,
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: 900,
                          fontSize: '14px',
                          flexShrink: 0
                        }}
                      >
                        {step.completed ? '✓' : step.stage}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: step.completed || step.active ? '#0f172a' : '#64748b' }}>
                            {step.title}
                          </h4>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: step.completed ? '#059669' : (step.active ? '#d97706' : '#94a3b8') }}>
                            {step.date}
                          </span>
                        </div>
                        <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Factory Support Banner */}
            <div style={{ background: '#f8fafc', padding: '20px 28px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                  Questions regarding this production run or packing list?
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Our factory production managers are available 24/7 on WhatsApp &amp; direct email.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`https://wa.me/923376793383?text=Hi%20Bin%20Rasool%20Enterprises,%20inquiry%20regarding%20batch%20${currentOrder.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: '13px', padding: '9px 18px', minHeight: '38px' }}
                >
                  Factory Manager WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
