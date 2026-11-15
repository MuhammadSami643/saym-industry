"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../../components/AnimatedCounter';

interface BuyerRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  tier: 'VIP Partner' | 'Wholesale Buyer' | 'Sampling' | 'Prospect';
  rfqCount: number;
  estVolume: string;
  category: string;
  lastContact: string;
  notes: string;
}

const INITIAL_BUYERS: BuyerRecord[] = [
  {
    id: 'BRE-B01',
    name: 'Marcus Vance',
    company: 'Vanguard Streetwear LLC',
    email: 'marcus@vanguardapparel.com',
    phone: '+1 310 555 0192',
    country: 'United States',
    tier: 'VIP Partner',
    rfqCount: 5,
    estVolume: '$42,500 USD',
    category: 'Heavyweight Hoodies & Cargo Track Pants',
    lastContact: 'Today',
    notes: 'Orders 450 GSM French Terry exclusively. Strict on Pantone 19-4007 TPX.'
  },
  {
    id: 'BRE-B02',
    name: 'Sophie Bennett',
    company: 'Aura Athletics Ltd',
    email: 'sophie@auraathletics.co.uk',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    tier: 'Wholesale Buyer',
    rfqCount: 3,
    estVolume: '$28,000 USD',
    category: 'Seamless Gym Leggings & Sports Bras',
    lastContact: '2 days ago',
    notes: 'Requires OEKO-TEX certified nylon/spandex yarns. Reordering every 6 weeks.'
  },
  {
    id: 'BRE-B03',
    name: 'Lars Lindqvist',
    company: 'Nordic Combat Equipment',
    email: 'lars@nordiccombat.de',
    phone: '+49 30 1234567',
    country: 'Germany',
    tier: 'VIP Partner',
    rfqCount: 4,
    estVolume: '$36,000 USD',
    category: 'Full Grain Leather Boxing Gloves',
    lastContact: 'Yesterday',
    notes: 'Requires multilayer EVA/Latex padding with lace-up pro finish.'
  },
  {
    id: 'BRE-B04',
    name: 'Jack O’Connor',
    company: 'HypeDistrict Skatewear',
    email: 'jack@hypedistrict.com.au',
    phone: '+61 2 9876 5432',
    country: 'Australia',
    tier: 'Sampling',
    rfqCount: 1,
    estVolume: '$6,000 USD',
    category: 'Baggy Carpenter Denim & Leather Patches',
    lastContact: '4 days ago',
    notes: 'Evaluating counter-samples for 14 oz selvedge denim collection.'
  },
  {
    id: 'BRE-B05',
    name: 'Chloe Laurent',
    company: 'Olympus Fight Club',
    email: 'chloe@olympusfight.fr',
    phone: '+33 1 42 68 55 00',
    country: 'France',
    tier: 'Wholesale Buyer',
    rfqCount: 2,
    estVolume: '$19,500 USD',
    category: 'Pearl Weave BJJ Gis & Rashguards',
    lastContact: '5 days ago',
    notes: 'Italian ink sublimation required for all fight rashguards.'
  },
  {
    id: 'BRE-B06',
    name: 'David Rossi',
    company: 'IronPulse Activewear',
    email: 'david@ironpulse.ca',
    phone: '+1 416 555 0188',
    country: 'Canada',
    tier: 'Prospect',
    rfqCount: 1,
    estVolume: '$18,500 USD',
    category: 'Athletic Baselayers & Thermal Sets',
    lastContact: '1 week ago',
    notes: 'Submitted initial tech pack for winter baselayer order.'
  }
];

export default function BuyerCrmPage() {
  const [buyers, setBuyers] = useState<BuyerRecord[]>(INITIAL_BUYERS);
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newBuyer, setNewBuyer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'United States',
    tier: 'Wholesale Buyer' as BuyerRecord['tier'],
    category: 'Streetwear & Hoodies',
    notes: ''
  });

  const filtered = buyers.filter(b => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.company.toLowerCase().includes(search.toLowerCase()) ||
      b.country.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());

    const matchTier = filterTier === 'all' || b.tier === filterTier;
    return matchSearch && matchTier;
  });

  const handleAddBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBuyer.name || !newBuyer.company) return;

    const created: BuyerRecord = {
      id: `BRE-B0${buyers.length + 1}`,
      name: newBuyer.name,
      company: newBuyer.company,
      email: newBuyer.email || 'N/A',
      phone: newBuyer.phone || 'N/A',
      country: newBuyer.country,
      tier: newBuyer.tier,
      rfqCount: 1,
      estVolume: '$12,000 USD',
      category: newBuyer.category,
      lastContact: 'Just now',
      notes: newBuyer.notes || 'Newly added buyer profile.'
    };

    setBuyers([created, ...buyers]);
    setShowAddModal(false);
    setNewBuyer({
      name: '',
      company: '',
      email: '',
      phone: '',
      country: 'United States',
      tier: 'Wholesale Buyer',
      category: 'Streetwear & Hoodies',
      notes: ''
    });
  };

  const getTierClass = (tier: string) => {
    switch (tier) {
      case 'VIP Partner':
        return 'tag-amber';
      case 'Wholesale Buyer':
        return 'tag-mint';
      case 'Sampling':
        return 'tag-cyan';
      default:
        return 'tag-rose';
    }
  };

  return (
    <div style={{ color: '#e2e8f0', fontFamily: 'inherit' }}>
      <style jsx>{`
        .kpi-mini {
          background: #11171a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: all 0.2s ease;
        }
        .kpi-mini:hover {
          background: #131b1f;
          border-color: rgba(0, 229, 153, 0.3);
          transform: translateY(-2px);
        }
        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 9999px;
        }
        .tag-mint {
          background: rgba(0, 229, 153, 0.12);
          color: #00e599;
          border: 1px solid rgba(0, 229, 153, 0.25);
        }
        .tag-amber {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.25);
        }
        .tag-rose {
          background: rgba(248, 113, 113, 0.12);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.25);
        }
        .tag-cyan {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.25);
        }
        .table-row-hover {
          transition: all 0.2s ease;
        }
        .table-row-hover:hover {
          background: rgba(0, 229, 153, 0.035);
        }
      `}</style>

      {/* Top Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              International Buyer CRM &amp; Accounts
            </h1>
            <span className="tag-pill tag-mint">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599' }}></span>
              GLOBAL ACCOUNTS
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13.5px' }}>
            Manage relationships with global streetwear labels, activewear brands, gym chains, and wholesale distributors.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: '#00e599',
            color: '#05140d',
            fontWeight: 800,
            fontSize: '12.5px',
            padding: '9px 18px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 14px rgba(0, 229, 153, 0.3)',
          }}
        >
          + Add New Buyer Profile
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div className="kpi-mini">
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
            TOTAL ACCOUNTS
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            <AnimatedCounter value={buyers.length} duration={1.2} delay={0.2} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Worldwide B2B Portfolio</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              VIP PARTNERS
            </span>
            <span className="tag-pill tag-amber">High Volume</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#fbbf24', margin: '4px 0 2px' }}>
            <AnimatedCounter value={buyers.filter(b => b.tier === 'VIP Partner').length} duration={1.2} delay={0.25} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Monthly recurring batches</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              SAMPLING ACCOUNTS
            </span>
            <span className="tag-pill tag-cyan">Proto Phase</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#38bdf8', margin: '4px 0 2px' }}>
            <AnimatedCounter value={buyers.filter(b => b.tier === 'Sampling').length} duration={1.2} delay={0.3} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Samples in development</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              PIPELINE VALUE
            </span>
            <span className="tag-pill tag-mint">FOB Value</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#00e599', margin: '4px 0 2px' }}>
            <AnimatedCounter value={150500} prefix="$" duration={1.6} delay={0.35} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Confirmed export orders</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ background: '#11171a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '14px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
          <span style={{ color: '#64748b', fontSize: '13px' }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by buyer name, company, country, email..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '13px',
              width: '100%',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', 'VIP Partner', 'Wholesale Buyer', 'Sampling', 'Prospect'].map(tier => (
            <button
              key={tier}
              type="button"
              onClick={() => setFilterTier(tier)}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '11.5px',
                fontWeight: 700,
                border: filterTier === tier ? '1px solid rgba(0, 229, 153, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: filterTier === tier ? 'rgba(0, 229, 153, 0.15)' : '#090d0f',
                color: filterTier === tier ? '#00e599' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Dark Glass Buyers Table */}
      <div style={{ background: '#11171a', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#0d1316', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
                <th style={{ padding: '14px 18px', fontWeight: 800, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Company &amp; Contact</th>
                <th style={{ padding: '14px 18px', fontWeight: 800, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Country</th>
                <th style={{ padding: '14px 18px', fontWeight: 800, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tier</th>
                <th style={{ padding: '14px 18px', fontWeight: 800, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Specialty</th>
                <th style={{ padding: '14px 18px', fontWeight: 800, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Est. Volume</th>
                <th style={{ padding: '14px 18px', fontWeight: 800, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => {
                const phoneClean = b.phone.replace(/[^0-9]/g, '');
                return (
                  <tr key={b.id} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '14px' }}>{b.company}</div>
                      <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                        {b.name} &bull; <a href={`mailto:${b.email}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>{b.email}</a>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
                        Note: {b.notes}
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#e2e8f0', fontWeight: 600 }}>
                      {b.country}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span className={`tag-pill ${getTierClass(b.tier)}`}>
                        {b.tier}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#cbd5e1' }}>
                      {b.category}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <strong style={{ color: '#00e599' }}>{b.estVolume}</strong>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{b.rfqCount} Batches</div>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <a
                        href={`https://wa.me/${phoneClean}?text=Hello%20${encodeURIComponent(b.name)},%20this%20is%20Bin%20Rasool%20Enterprises%20following%20up%20on%20your%20production%20account.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(0, 229, 153, 0.15)',
                          color: '#00e599',
                          border: '1px solid rgba(0, 229, 153, 0.3)',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        💬 WhatsApp
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dark Glass Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'grid', placeItems: 'center', zIndex: 99999, padding: '20px' }}>
          <div style={{ background: '#11171a', borderRadius: '16px', border: '1px solid rgba(0, 229, 153, 0.3)', maxWidth: '520px', width: '100%', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 16px' }}>
              Add International Buyer Account
            </h2>

            <form onSubmit={handleAddBuyer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Brand / Company Name *</label>
                <input
                  type="text"
                  required
                  value={newBuyer.company}
                  onChange={e => setNewBuyer({ ...newBuyer, company: e.target.value })}
                  placeholder="e.g. Iron & Oak Streetwear"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={newBuyer.name}
                    onChange={e => setNewBuyer({ ...newBuyer, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Email</label>
                  <input
                    type="email"
                    value={newBuyer.email}
                    onChange={e => setNewBuyer({ ...newBuyer, email: e.target.value })}
                    placeholder="alex@ironandoak.com"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={newBuyer.phone}
                    onChange={e => setNewBuyer({ ...newBuyer, phone: e.target.value })}
                    placeholder="+1 555 123 4567"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Country</label>
                  <input
                    type="text"
                    value={newBuyer.country}
                    onChange={e => setNewBuyer({ ...newBuyer, country: e.target.value })}
                    placeholder="e.g. Germany"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Account Tier</label>
                  <select
                    value={newBuyer.tier}
                    onChange={e => setNewBuyer({ ...newBuyer, tier: e.target.value as any })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff' }}
                  >
                    <option value="VIP Partner">VIP Partner</option>
                    <option value="Wholesale Buyer">Wholesale Buyer</option>
                    <option value="Sampling">Sampling</option>
                    <option value="Prospect">Prospect</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Product Specialty</label>
                  <input
                    type="text"
                    value={newBuyer.category}
                    onChange={e => setNewBuyer({ ...newBuyer, category: e.target.value })}
                    placeholder="e.g. Streetwear / Hoodies"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Factory Production Notes</label>
                <textarea
                  rows={2}
                  value={newBuyer.notes}
                  onChange={e => setNewBuyer({ ...newBuyer, notes: e.target.value })}
                  placeholder="Custom sizing charts, preferred GSM, packaging preferences..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', background: '#00e599', color: '#05140d', fontWeight: 800, cursor: 'pointer' }}
                >
                  Save Buyer Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
