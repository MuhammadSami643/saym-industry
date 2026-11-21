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

    // Default active batch simulation for new queries
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
                placeholder="Enter Production or Sample ID (e.g. BRE-2026-9014 or BRE-SAMPLE-104)"
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
                className="btn btn-primary"
                style={{
                  padding: '11px 22px',
                  fontSize: '14px',
                  fontWeight: 800,
                  borderRadius: '999px',
                  background: 'var(--brand-orange)',
                  color: 'var(--brand-black)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 3px 12px rgba(243, 166, 38, 0.3)',
                }}
              >
                Track Production
              </button>
            </form>

            {/* Quick Demo Batch Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', flexWrap: 'wrap', fontSize: '12px', color: '#64748b' }}>
              <span style={{ fontWeight: 600 }}>Demo Batches:</span>
              <button
                type="button"
                onClick={() => { setSearchInput('BRE-2026-9014'); setCurrentOrder(DEMO_ORDERS['BRE-2026-9014']); }}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#334155',
                  fontSize: '12px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f3a626'; e.currentTarget.style.color = '#0f172a'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
              >
                BRE-2026-9014 (Bulk Hoodies)
              </button>
              <button
                type="button"
                onClick={() => { setSearchInput('BRE-SAMPLE-104'); setCurrentOrder(DEMO_ORDERS['BRE-SAMPLE-104']); }}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#334155',
                  fontSize: '12px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f3a626'; e.currentTarget.style.color = '#0f172a'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
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
                      {currentOrder.overallStatus === 'Dispatched' ? 'Completed & Dispatched' : `Stage: ${currentOrder.overallStatus}`}
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
