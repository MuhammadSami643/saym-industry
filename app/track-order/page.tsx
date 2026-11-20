"use client";

import { useState } from 'react';
import Link from 'next/link';
import BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';
import { WhatsAppIcon } from '../components/AdminIcons';

interface OrderMilestone {
  stage: string;
  title: string;
  desc: string;
  completed: boolean;
  active: boolean;
  date: string;
  estimatedDuration: string;
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
  estimatedRemainingTime: string;
  carrier: string;
  trackingNumber: string;
  overallStatus: 'Tech Pack' | 'Cutting' | 'Stitching & Branding' | 'Quality Control' | 'Steam Pressing' | 'Packaging' | 'Dispatched';
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
    estimatedRemainingTime: '3-4 Working Days to Air Cargo Departure',
    carrier: 'DHL Express Worldwide Air Cargo',
    trackingNumber: 'DHL-PK-9821449012',
    overallStatus: 'Steam Pressing',
    milestones: [
      {
        stage: '01',
        title: 'Tech Pack & Pre-Production Swatch Approved',
        desc: 'Lab dips approved, sizing graded across XS to 3XL.',
        completed: true,
        active: false,
        date: 'Oct 28, 2026',
        estimatedDuration: '3 Business Days'
      },
      {
        stage: '02',
        title: 'Fabric Knitting, Dyeing & Precision Cutting',
        desc: 'Custom combed yarn knitted and laser cut to CAD specifications.',
        completed: true,
        active: false,
        date: 'Nov 03, 2026',
        estimatedDuration: '5 Business Days'
      },
      {
        stage: '03',
        title: 'Industrial Stitching & 3D Puff Screen Print',
        desc: 'Flatlock reinforced seam assembly & high-density chest print.',
        completed: true,
        active: false,
        date: 'Nov 10, 2026',
        estimatedDuration: '6 Business Days'
      },
      {
        stage: '04',
        title: 'AQL 2.5 Quality Inspection & Seam Strength Audit',
        desc: 'Dimensional checks, thread trimming and wash-fastness testing passed 100%.',
        completed: true,
        active: false,
        date: 'Nov 13, 2026',
        estimatedDuration: '2 Business Days'
      },
      {
        stage: '05',
        title: 'Industrial Steam Pressing',
        desc: 'Heavy vacuum steam ironing, crease removal, thread cleanup and fabric shape stabilization.',
        completed: false,
        active: true,
        date: 'In Progress (Nov 14-15)',
        estimatedDuration: '24-48 Hours'
      },
      {
        stage: '06',
        title: 'Custom Retail Packaging',
        desc: 'Woven neck label verification, hangtag barcode attachment, individual frosted biodegradable zipper polybagging and export master carton sealing.',
        completed: false,
        active: false,
        date: 'Scheduled (Nov 16-17)',
        estimatedDuration: '24 Hours'
      },
      {
        stage: '07',
        title: 'Export Customs Clearance & Air Dispatch',
        desc: 'Sialkot Dry Port customs clearance to DHL Hub & Air Bill of Lading departure.',
        completed: false,
        active: false,
        date: 'Est. Nov 18, 2026',
        estimatedDuration: '1-2 Days'
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
    estimatedRemainingTime: 'Completed & Dispatched via Air Express',
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
        date: 'Nov 02, 2026',
        estimatedDuration: '24-48 Hours'
      },
      {
        stage: '02',
        title: 'Seamless Circular Knitting',
        desc: 'Santoni seamless machine knitting completed.',
        completed: true,
        active: false,
        date: 'Nov 05, 2026',
        estimatedDuration: '48 Hours'
      },
      {
        stage: '03',
        title: 'Heat Seal Logo Transfer & Assembly',
        desc: 'Matte silicone reflective branding applied.',
        completed: true,
        active: false,
        date: 'Nov 08, 2026',
        estimatedDuration: '24 Hours'
      },
      {
        stage: '04',
        title: 'AQL Fit & Elasticity Verification',
        desc: 'Squat-test and recovery elasticity passed 100%.',
        completed: true,
        active: false,
        date: 'Nov 09, 2026',
        estimatedDuration: '24 Hours'
      },
      {
        stage: '05',
        title: 'Industrial Steam Pressing',
        desc: 'Crease removal and fabric stabilization.',
        completed: true,
        active: false,
        date: 'Nov 10, 2026',
        estimatedDuration: '12 Hours'
      },
      {
        stage: '06',
        title: 'Custom Retail Packaging',
        desc: 'Individual barcoded packaging & hangtag attached.',
        completed: true,
        active: false,
        date: 'Nov 10, 2026',
        estimatedDuration: '12 Hours'
      },
      {
        stage: '07',
        title: 'Sample Dispatched via FedEx Priority',
        desc: 'In transit to Heathrow International Airport.',
        completed: true,
        active: false,
        date: 'Nov 11, 2026',
        estimatedDuration: '3-4 Days Global'
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
      setCurrentOrder({
        orderId: query,
        clientName: 'Valued OEM Buyer',
        brand: 'International Client Partner',
        country: 'Worldwide Air/Sea Cargo',
        item: 'Custom Cut & Sew Production Batch',
        quantity: 'Active Batch',
        fabricSpec: 'Factory Sourced Certified Mill Fabric',
        targetDispatch: 'Est. 14 Working Days',
        estimatedRemainingTime: 'Approx. 8-10 Working Days Total',
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
            date: 'Completed',
            estimatedDuration: '3 Days'
          },
          {
            stage: '02',
            title: 'Pattern CAD Grading & Precision Fabric Cutting',
            desc: 'Automated fabric layout and cutting table processing.',
            completed: false,
            active: true,
            date: 'In Progress',
            estimatedDuration: '4 Days'
          },
          {
            stage: '03',
            title: 'Industrial Stitching & Private Label Printing',
            desc: 'Assembly line sewing, custom inner tags and decorative embroidery.',
            completed: false,
            active: false,
            date: 'Scheduled',
            estimatedDuration: '5-7 Days'
          },
          {
            stage: '04',
            title: 'AQL 2.5 Quality Audit & Seam Strength Check',
            desc: 'Full measurement tolerance inspection and lab testing.',
            completed: false,
            active: false,
            date: 'Scheduled',
            estimatedDuration: '2 Days'
          },
          {
            stage: '05',
            title: 'Industrial Steam Pressing',
            desc: 'Vacuum steam ironing, crease removal, thread trimming and garment shape stabilization.',
            completed: false,
            active: false,
            date: 'Scheduled',
            estimatedDuration: '24-48 Hours'
          },
          {
            stage: '06',
            title: 'Custom Retail Packaging',
            desc: 'Brand woven tags, hangtags, barcodes, individual frosted polybags and master cartons.',
            completed: false,
            active: false,
            date: 'Scheduled',
            estimatedDuration: '24 Hours'
          },
          {
            stage: '07',
            title: 'Customs Clearance & Air Cargo Dispatch',
            desc: 'Dry Port handover, DHL/FedEx AWB tracking issuance and air freight departure.',
            completed: false,
            active: false,
            date: 'Scheduled',
            estimatedDuration: '1-2 Days'
          }
        ]
      });
      setErrorMsg('');
    }
  };

  return (
    <div className="track-order-page">
      {/* Universal Hero Header */}
      <section className="hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Track Order' },
            ]}
          />
          <span className="hero-kicker">LIVE PRODUCTION TRACKER</span>
          <h1>Track Your Production Order</h1>
          <p>
            Monitor real-time manufacturing progress, cutting, stitching, and international courier dispatch directly from our Sialkot factory floor.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ background: '#f8fafc', padding: '48px 0 72px' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          
          {/* Search Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              marginBottom: '32px',
            }}
          >
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. BRE-2026-9014 or BRE-SAMPLE-104)"
                style={{
                  flex: '1 1 280px',
                  padding: '13px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '15px',
                  color: '#0f172a',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '13px 26px',
                  fontSize: '15px',
                  fontWeight: 800,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f3a626 0%, #d98816 100%)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Track Order
              </button>
            </form>

            {/* Quick Demo Batch Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap', fontSize: '12.5px', color: '#64748b' }}>
              <span style={{ fontWeight: 600 }}>Sample Batches:</span>
              <button
                type="button"
                onClick={() => { setSearchInput('BRE-2026-9014'); setCurrentOrder(DEMO_ORDERS['BRE-2026-9014']); }}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#334155',
                  fontSize: '12px',
                }}
              >
                BRE-2026-9014 (Bulk Hoodies)
              </button>
              <button
                type="button"
                onClick={() => { setSearchInput('BRE-SAMPLE-104'); setCurrentOrder(DEMO_ORDERS['BRE-SAMPLE-104']); }}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#334155',
                  fontSize: '12px',
                }}
              >
                BRE-SAMPLE-104 (Activewear Sets)
              </button>
            </div>

            {errorMsg && (
              <div style={{ marginTop: '10px', color: '#ef4444', fontSize: '13px', fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}
          </div>

          {/* Order Details Display Card */}
          {currentOrder && (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
                overflow: 'hidden',
              }}
            >
              {/* Order Status Header */}
              <div
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  padding: '24px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#f3a626' }}>
                      {currentOrder.orderId}
                    </span>
                    <span
                      style={{
                        background: currentOrder.overallStatus === 'Dispatched' ? '#10b981' : '#f3a626',
                        color: currentOrder.overallStatus === 'Dispatched' ? '#ffffff' : '#0f172a',
                        fontSize: '11px',
                        fontWeight: 900,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {currentOrder.overallStatus}
                    </span>
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#cbd5e1', marginTop: '6px' }}>
                    Buyer: <strong>{currentOrder.brand}</strong> &bull; {currentOrder.country}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Target Dispatch Date
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    {currentOrder.targetDispatch}
                  </div>
                </div>
              </div>

              {/* Order Specifications Strip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                  padding: '18px 28px',
                  background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: '13px',
                }}
              >
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '3px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Item
                  </span>
                  <strong style={{ color: '#0f172a' }}>{currentOrder.item}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '3px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Volume
                  </span>
                  <strong style={{ color: '#0f172a' }}>{currentOrder.quantity}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '3px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Fabric
                  </span>
                  <strong style={{ color: '#0f172a' }}>{currentOrder.fabricSpec}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '3px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Carrier &amp; AWB
                  </span>
                  <strong style={{ color: '#0284c7' }}>{currentOrder.carrier}</strong>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '1px' }}>{currentOrder.trackingNumber}</div>
                </div>
              </div>

              {/* Connected Milestone Progression with Arrows */}
              <div style={{ padding: '32px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Production Milestones &amp; Progression
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                    7 Production Stages
                  </span>
                </div>

                {/* Timeline with Arrows */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {currentOrder.milestones.map((step, idx) => {
                    const isLast = idx === currentOrder.milestones.length - 1;

                    return (
                      <div key={idx} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                        
                        {/* Circle Node + Connecting Line with Downward Arrow */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '38px', flexShrink: 0 }}>
                          {/* Circle */}
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: step.completed ? '#10b981' : (step.active ? '#f3a626' : '#f1f5f9'),
                              color: step.completed ? '#ffffff' : (step.active ? '#0f172a' : '#64748b'),
                              border: step.active ? '3px solid #fde68a' : (step.completed ? 'none' : '2px solid #e2e8f0'),
                              display: 'grid',
                              placeItems: 'center',
                              fontWeight: 800,
                              fontSize: '13.5px',
                              boxShadow: step.active ? '0 0 14px rgba(243, 166, 38, 0.45)' : 'none',
                              zIndex: 2,
                            }}
                          >
                            {step.completed ? '✓' : step.stage}
                          </div>

                          {/* Line + Downward Arrow */}
                          {!isLast && (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '4px 0',
                                color: step.completed ? '#10b981' : '#cbd5e1',
                              }}
                            >
                              <div
                                style={{
                                  width: '2px',
                                  height: '28px',
                                  background: step.completed ? '#10b981' : '#e2e8f0',
                                }}
                              />
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginTop: '-2px' }}
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Step Content Card */}
                        <div
                          style={{
                            flex: 1,
                            background: step.active ? '#fffdf7' : (step.completed ? '#ffffff' : '#ffffff'),
                            border: step.active ? '1.5px solid #f3a626' : '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '14px 18px',
                            boxShadow: step.active ? '0 4px 14px rgba(243, 166, 38, 0.08)' : '0 2px 6px rgba(15, 23, 42, 0.02)',
                            marginBottom: !isLast ? '8px' : '0',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: step.completed || step.active ? '#0f172a' : '#64748b' }}>
                              {step.title}
                            </h4>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  background: step.active ? '#fef3c7' : (step.completed ? '#ecfdf5' : '#f1f5f9'),
                                  color: step.active ? '#b45309' : (step.completed ? '#065f46' : '#64748b'),
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                }}
                              >
                                {step.completed ? 'COMPLETED' : (step.active ? 'IN PRODUCTION' : 'SCHEDULED')}
                              </span>
                              <span style={{ fontSize: '12px', fontWeight: 600, color: step.completed ? '#059669' : (step.active ? '#d97706' : '#94a3b8') }}>
                                {step.date}
                              </span>
                            </div>
                          </div>

                          <p style={{ margin: '6px 0 0', fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>
                            {step.desc}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Direct WhatsApp Action for Active Order */}
                <div
                  style={{
                    marginTop: '28px',
                    padding: '16px 20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontSize: '13.5px', color: '#475569' }}>
                    Need live production pictures or dispatch inquiry for batch <strong>{currentOrder.orderId}</strong>?
                  </div>
                  <a
                    href={`https://wa.me/923376793383?text=Hi%20Bin%20Rasool%20Enterprises,%20inquiry%20regarding%20batch%20${currentOrder.orderId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#22c55e',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <WhatsAppIcon size={16} />
                    <span>Chat with Factory Supervisor</span>
                  </a>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
