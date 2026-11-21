"use client";

import { useState, useEffect } from 'react';
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
  overallStatus: 'Tech Pack' | 'Cutting' | 'Stitching & Branding' | 'Quality Control' | 'Steam Pressing' | 'Packaging' | 'Dispatched' | 'Delivered' | 'Completed';
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
      },
      {
        stage: '08',
        title: 'Delivered',
        desc: 'Shipment delivered to client address. Order completed.',
        completed: false,
        active: false,
        date: 'Scheduled (Nov 21, 2026)',
        estimatedDuration: 'Final Step'
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
    estimatedRemainingTime: 'Completed & Delivered to Client',
    carrier: 'FedEx Priority Express',
    trackingNumber: 'FDX-8730991204-GB',
    overallStatus: 'Delivered',
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
      },
      {
        stage: '08',
        title: 'Delivered',
        desc: 'Package delivered and signed for. Order completed.',
        completed: true,
        active: false,
        date: 'Nov 14, 2026',
        estimatedDuration: 'Completed'
      }
    ]
  }
};

const STANDARD_FACTORY_STAGES = [
  {
    stage: '01',
    title: 'Tech Pack Verification & Fabric Procurement',
    desc: 'Pattern review, Pantone color lab dips and mill fabric batch procurement & testing.',
    date: 'Stage 01'
  },
  {
    stage: '02',
    title: 'CAD Pattern Grading & Precision Cutting',
    desc: 'Computerized size grading (XS–3XL), marker optimization and automated fabric cutting.',
    date: 'Stage 02'
  },
  {
    stage: '03',
    title: 'Cut & Sew Assembly Line (In-Line AQL Inspection)',
    desc: '4-needle flatlock assembly, screen printing, 3D embroidery and custom trim placement.',
    date: 'Stage 03'
  },
  {
    stage: '04',
    title: 'AQL 2.5 Quality Audit & Seam Tolerance Checks',
    desc: 'Measurement audit against approved golden sample, seam pull test and lab check.',
    date: 'Stage 04'
  },
  {
    stage: '05',
    title: 'Garment Finishing & Industrial Steam Pressing',
    desc: 'Vacuum steam tunnel finishing, crease removal, thread trimming and shape stabilization.',
    date: 'Stage 05'
  },
  {
    stage: '06',
    title: 'Custom Polybagging, Export Boxing & Courier Dispatch',
    desc: 'Individual frosted polybags, barcode labeling, export carton packing and DHL air handover.',
    date: 'Stage 06'
  },
  {
    stage: '07',
    title: 'Delivered',
    desc: 'Consignment delivered to client destination. Order completed.',
    date: 'Stage 07'
  }
];

export default function TrackOrderPage() {
  const [searchInput, setSearchInput] = useState('');
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-load if query param ?id=... or ?orderId=... is in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get('id') || params.get('orderId');
      if (urlId) {
        setSearchInput(urlId);
        fetchOrder(urlId);
      }
    }
  }, []);

  const fetchOrder = async (orderId: string) => {
    const query = orderId.trim().toUpperCase();
    if (!query) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/orders?id=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.order) {
          setCurrentOrder(data.order);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('API order fetch fallback:', e);
    }

    // Fallback to local demo
    if (DEMO_ORDERS[query]) {
      setCurrentOrder(DEMO_ORDERS[query]);
      setLoading(false);
      return;
    }

    setErrorMsg(`No active production batch found for "${query}". Please verify your Order ID or contact factory support.`);
    setCurrentOrder(null);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setErrorMsg('Please enter an Order ID or Sample ID.');
      return;
    }
    fetchOrder(searchInput);
  };

  return (
    <div className="track-order-page">
      {/* Universal Hero Header */}
      <section className="hero">
        <div className="container">
          <BreadcrumbJsonLd
            items={[
              { label: 'Home', href: '/' },
              { label: 'Track Production' },
            ]}
          />
          <span className="hero-kicker">LIVE PRODUCTION TRACKER</span>
          <h1>Track Live Factory Production</h1>
          <p>
            Monitor real-time manufacturing progress, cutting, stitching and international courier dispatch directly from our Sialkot factory floor.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ background: '#f8fafc', padding: '36px 0 64px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Search Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '20px 24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 12px rgba(15, 23, 42, 0.03)',
              marginBottom: '24px',
            }}
          >
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Production Order ID (e.g. BRE-2026-9014)"
                style={{
                  flex: '1 1 280px',
                  padding: '11px 16px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14.5px',
                  color: '#0f172a',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  padding: '11px 22px',
                  fontSize: '14px',
                  fontWeight: 800,
                  borderRadius: '999px',
                  background: 'var(--brand-orange)',
                  color: 'var(--brand-black)',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 3px 12px rgba(243, 166, 38, 0.3)',
                }}
              >
                {loading ? 'Searching...' : 'Track Production'}
              </button>
            </form>

            {errorMsg && (
              <div style={{ marginTop: '10px', color: '#ef4444', fontSize: '13px', fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}
          </div>

          {/* Neutral Unmarked Milestones Pipeline (When no specific order is loaded yet) */}
          {!currentOrder && (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                overflow: 'hidden',
                padding: '24px 28px 28px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Factory Production Milestones
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#64748b' }}>
                    Standard multi-stage apparel manufacturing &amp; AQL 2.5 export compliance pipeline.
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#64748b',
                    background: '#f1f5f9',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  Factory Standard Sequence
                </span>
              </div>

              {/* Neutral Unmarked Milestones List */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {STANDARD_FACTORY_STAGES.map((step, idx) => {
                  const isLast = idx === STANDARD_FACTORY_STAGES.length - 1;

                  return (
                    <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', minHeight: isLast ? 'auto' : '64px' }}>
                      {/* Milestone Neutral Node + Line */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px', flexShrink: 0 }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#f8fafc',
                            color: '#94a3b8',
                            border: '1.5px solid #cbd5e1',
                            display: 'grid',
                            placeItems: 'center',
                            fontWeight: 700,
                            fontSize: '11px',
                            zIndex: 1,
                          }}
                        >
                          {step.stage}
                        </div>

                        {!isLast && (
                          <div
                            style={{
                              width: '2px',
                              flex: 1,
                              minHeight: '36px',
                              background: '#e2e8f0',
                              margin: '3px 0',
                            }}
                          />
                        )}
                      </div>

                      {/* Milestone Text Row */}
                      <div style={{ flex: 1, paddingBottom: isLast ? '0' : '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                          <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 600, color: '#334155' }}>
                            {step.title}
                          </h4>
                          <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#94a3b8' }}>
                            {step.date}
                          </span>
                        </div>
                        <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#64748b', lineHeight: 1.45 }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Order Details Display Card */}
          {currentOrder && (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                overflow: 'hidden',
              }}
            >
              {/* Order Status Header */}
              <div
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '19px', fontWeight: 900, color: '#f3a626', letterSpacing: '0.02em' }}>
                      {currentOrder.orderId}
                    </span>
                    <span
                      style={{
                        background: (currentOrder.overallStatus === 'Dispatched' || currentOrder.overallStatus === 'Delivered' || currentOrder.overallStatus === 'Completed') ? '#10b981' : '#f3a626',
                        color: (currentOrder.overallStatus === 'Dispatched' || currentOrder.overallStatus === 'Delivered' || currentOrder.overallStatus === 'Completed') ? '#ffffff' : '#0f172a',
                        fontSize: '11px',
                        fontWeight: 900,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {currentOrder.overallStatus === 'Delivered' || currentOrder.overallStatus === 'Completed'
                        ? '✓ Delivered & Completed'
                        : currentOrder.overallStatus === 'Dispatched'
                        ? 'Completed & Dispatched'
                        : `Stage: ${currentOrder.overallStatus}`}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>
                    Buyer: <strong>{currentOrder.brand}</strong> &bull; {currentOrder.country}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Target Dispatch Date
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    {currentOrder.targetDispatch}
                  </div>
                </div>
              </div>

              {/* Order Specifications Strip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: '14px',
                  padding: '14px 24px',
                  background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: '13px',
                }}
              >
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '2px', fontSize: '10.5px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Garment Style
                  </span>
                  <strong style={{ color: '#0f172a' }}>{currentOrder.item}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '2px', fontSize: '10.5px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Order Volume
                  </span>
                  <strong style={{ color: '#0f172a' }}>{currentOrder.quantity}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '2px', fontSize: '10.5px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Fabric Spec
                  </span>
                  <strong style={{ color: '#0f172a' }}>{currentOrder.fabricSpec}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '2px', fontSize: '10.5px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Carrier &amp; AWB
                  </span>
                  <strong style={{ color: '#0284c7' }}>{currentOrder.carrier}</strong>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>{currentOrder.trackingNumber}</div>
                </div>
              </div>

              {/* Clean Streamlined Milestones List */}
              <div style={{ padding: '24px 24px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Factory Production Milestones
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    {currentOrder.milestones.filter(m => m.completed).length} of {currentOrder.milestones.length} Completed
                  </span>
                </div>

                {/* Timeline Container */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {currentOrder.milestones.map((step, idx) => {
                    const isLast = idx === currentOrder.milestones.length - 1;

                    return (
                      <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', minHeight: isLast ? 'auto' : '64px' }}>
                        
                        {/* Milestone Node + Line */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px', flexShrink: 0 }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: step.completed ? '#10b981' : (step.active ? '#f3a626' : '#ffffff'),
                              color: step.completed ? '#ffffff' : (step.active ? '#0f172a' : '#94a3b8'),
                              border: step.active ? '2.5px solid #fde68a' : (step.completed ? 'none' : '2px solid #cbd5e1'),
                              display: 'grid',
                              placeItems: 'center',
                              fontWeight: 800,
                              fontSize: step.completed ? '13px' : '11px',
                              boxShadow: step.active ? '0 0 10px rgba(243, 166, 38, 0.4)' : 'none',
                              zIndex: 1,
                            }}
                          >
                            {step.completed ? '✓' : step.stage}
                          </div>

                          {!isLast && (
                            <div
                              style={{
                                width: '2px',
                                flex: 1,
                                minHeight: '36px',
                                background: step.completed ? '#10b981' : '#e2e8f0',
                                margin: '3px 0',
                              }}
                            />
                          )}
                        </div>

                        {/* Milestone Text Row */}
                        <div style={{ flex: 1, paddingBottom: isLast ? '0' : '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: step.completed || step.active ? '#0f172a' : '#64748b' }}>
                                {step.title}
                              </h4>
                              {step.active && (
                                <span
                                  style={{
                                    fontSize: '10.5px',
                                    fontWeight: 800,
                                    background: '#fef3c7',
                                    color: '#b45309',
                                    padding: '1px 7px',
                                    borderRadius: '4px',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  In Production Now
                                </span>
                              )}
                            </div>

                            <span style={{ fontSize: '12px', fontWeight: 600, color: step.completed ? '#059669' : (step.active ? '#d97706' : '#94a3b8') }}>
                              {step.date}
                            </span>
                          </div>

                          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#64748b', lineHeight: 1.45 }}>
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
                    marginTop: '20px',
                    padding: '14px 18px',
                    background: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#475569' }}>
                    Need real-time cutting photos or packing inspection for batch <strong>{currentOrder.orderId}</strong>?
                  </div>
                  <a
                    href={`https://wa.me/923133599241?text=Hi%20Bin%20Rasool%20Enterprises,%20inquiry%20regarding%20batch%20${currentOrder.orderId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 18px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: 800,
                      background: 'var(--brand-orange)',
                      color: 'var(--brand-black)',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <WhatsAppIcon size={15} />
                    <span>Chat with Factory Manager</span>
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
