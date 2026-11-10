"use client";

import { useState } from 'react';

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
    name: 'Maximilian Krause',
    company: 'Nordic Combat Equipment',
    email: 'm.krause@nordiccombat.de',
    phone: '+49 30 1234567',
    country: 'Germany',
    tier: 'VIP Partner',
    rfqCount: 4,
    estVolume: '$56,000 USD',
    category: 'Full-Grain Cowhide Boxing Gloves & Shin Guards',
    lastContact: 'Nov 02, 2026',
    notes: 'High specification AQL 1.5 required. Shipped via air cargo to Frankfurt.'
  },
  {
    id: 'BRE-B04',
    name: 'Liam Henderson',
    company: 'Pacific Raw Denim Co',
    email: 'liam@pacificdenim.com.au',
    phone: '+61 2 9876 5432',
    country: 'Australia',
    tier: 'Sampling',
    rfqCount: 2,
    estVolume: '$14,200 USD',
    category: '14 oz Japanese Selvedge Jeans & Denim Jackets',
    lastContact: 'Nov 04, 2026',
    notes: 'Sampling fit block B-32. Wash samples sent via FedEx.'
  },
  {
    id: 'BRE-B05',
    name: 'Tariq Al-Mansoor',
    company: 'Falcon Gym Apparel',
    email: 'tariq@falconathletic.ae',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    tier: 'Prospect',
    rfqCount: 1,
    estVolume: '$9,800 USD',
    category: 'Dry-Fit Performance T-shirts & Gym Shorts',
    lastContact: 'Oct 30, 2026',
    notes: 'Requested fabric shade cards and digital mockups.'
  }
];

export default function BuyerCRMPage() {
  const [buyers, setBuyers] = useState<BuyerRecord[]>(INITIAL_BUYERS);
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New buyer state
  const [newBuyer, setNewBuyer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'United States',
    tier: 'Wholesale Buyer' as const,
    category: 'Streetwear & Hoodies',
    notes: ''
  });

  const filtered = buyers.filter(b => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.company.toLowerCase().includes(search.toLowerCase()) ||
      b.country.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());

    const matchTier = filterTier === 'all' || b.tier.toLowerCase() === filterTier.toLowerCase();
    return matchSearch && matchTier;
  });

  const handleAddBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBuyer.name || !newBuyer.company) return;

    const created: BuyerRecord = {
      id: `BRE-B${(buyers.length + 1).toString().padStart(2, '0')}`,
      name: newBuyer.name,
      company: newBuyer.company,
      email: newBuyer.email,
      phone: newBuyer.phone,
      country: newBuyer.country,
      tier: newBuyer.tier,
      rfqCount: 1,
      estVolume: '$10,000 USD',
      category: newBuyer.category,
      lastContact: 'Just now',
      notes: newBuyer.notes || 'Newly added direct buyer account.'
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

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'VIP Partner':
        return { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' };
      case 'Wholesale Buyer':
        return { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' };
      case 'Sampling':
        return { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#111827' }}>
            International Buyer CRM &amp; Accounts Directory
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Manage relationships with global streetwear labels, activewear brands, gym chains, and wholesale distributors.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ fontSize: '13px', padding: '10px 20px', minHeight: '40px' }}
        >
          + Add New Buyer Profile
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Total Registered Accounts</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#111827', margin: '8px 0 4px' }}>{buyers.length}</div>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Worldwide B2B Portfolio</span>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Active VIP Partners</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#b45309', margin: '8px 0 4px' }}>
            {buyers.filter(b => b.tier === 'VIP Partner').length}
          </div>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Recurring monthly export batches</span>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Active Sampling Accounts</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#2563eb', margin: '8px 0 4px' }}>
            {buyers.filter(b => b.tier === 'Sampling').length}
          </div>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Sample prototypes in transit</span>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>Estimated Pipeline Value</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#15803d', margin: '8px 0 4px' }}>$150,500</div>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>FOB Sialkot Value</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by buyer name, company, country, or email..."
          style={{ flex: 1, minWidth: '260px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
        />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'VIP Partner', 'Wholesale Buyer', 'Sampling', 'Prospect'].map(tier => (
            <button
              key={tier}
              type="button"
              onClick={() => setFilterTier(tier)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                border: filterTier === tier ? '1px solid #0f172a' : '1px solid #e2e8f0',
                background: filterTier === tier ? '#0f172a' : '#fff',
                color: filterTier === tier ? '#fff' : '#475569',
                cursor: 'pointer'
              }}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Buyers Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', color: '#64748b' }}>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Company &amp; Contact</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Country</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Account Tier</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Product Specialty</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Est. Volume</th>
                <th style={{ padding: '14px 20px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => {
                const badge = getTierColor(b.tier);
                const phoneClean = b.phone.replace(/[^0-9]/g, '');
                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{b.company}</div>
                      <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>{b.name} &bull; <a href={`mailto:${b.email}`} style={{ color: '#0284c7' }}>{b.email}</a></div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontStyle: 'italic' }}>
                        Note: {b.notes}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#334155', fontWeight: 600 }}>
                      {b.country}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          background: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 800,
                          textTransform: 'uppercase'
                        }}
                      >
                        {b.tier}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#475569', fontSize: '13px' }}>
                      {b.category}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <strong style={{ color: '#0f172a' }}>{b.estVolume}</strong>
                      <div style={{ fontSize: '11px', color: '#16a34a' }}>{b.rfqCount} Inquiries/Orders</div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <a
                        href={`https://wa.me/${phoneClean}?text=Hello%20${encodeURIComponent(b.name)},%20this%20is%20Bin%20Rasool%20Enterprises%20following%20up%20on%20your%20production%20account.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#22c55e',
                          color: '#fff',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textDecoration: 'none'
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

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 999, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', maxWidth: '520px', width: '100%', padding: '28px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              Add International Buyer Account
            </h2>

            <form onSubmit={handleAddBuyer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Brand / Company Name *</label>
                <input
                  type="text"
                  required
                  value={newBuyer.company}
                  onChange={e => setNewBuyer({ ...newBuyer, company: e.target.value })}
                  placeholder="e.g. Iron & Oak Streetwear"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={newBuyer.name}
                    onChange={e => setNewBuyer({ ...newBuyer, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Email</label>
                  <input
                    type="email"
                    value={newBuyer.email}
                    onChange={e => setNewBuyer({ ...newBuyer, email: e.target.value })}
                    placeholder="alex@ironandoak.com"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={newBuyer.phone}
                    onChange={e => setNewBuyer({ ...newBuyer, phone: e.target.value })}
                    placeholder="+1 555 123 4567"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Country</label>
                  <input
                    type="text"
                    value={newBuyer.country}
                    onChange={e => setNewBuyer({ ...newBuyer, country: e.target.value })}
                    placeholder="e.g. Germany"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Account Tier</label>
                  <select
                    value={newBuyer.tier}
                    onChange={e => setNewBuyer({ ...newBuyer, tier: e.target.value as any })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}
                  >
                    <option value="VIP Partner">VIP Partner</option>
                    <option value="Wholesale Buyer">Wholesale Buyer</option>
                    <option value="Sampling">Sampling</option>
                    <option value="Prospect">Prospect</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Product Specialty</label>
                  <input
                    type="text"
                    value={newBuyer.category}
                    onChange={e => setNewBuyer({ ...newBuyer, category: e.target.value })}
                    placeholder="e.g. Streetwear / Hoodies"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Factory Production Notes</label>
                <textarea
                  rows={2}
                  value={newBuyer.notes}
                  onChange={e => setNewBuyer({ ...newBuyer, notes: e.target.value })}
                  placeholder="Custom sizing charts, preferred GSM, packaging preferences..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '10px 22px' }}
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
