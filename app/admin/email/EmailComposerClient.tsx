"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export interface BuyerContact {
  id?: string;
  name: string;
  email: string;
  company?: string;
  country?: string;
}

interface EmailComposerClientProps {
  initialBuyers: BuyerContact[];
}

const PRESETS = [
  {
    name: 'Quotation',
    subject: 'Official Manufacturing Quotation & Production Timeline',
    content: `Dear Partner,

Thank you for your inquiry with Bin Rasool Enterprises. We have reviewed your tech pack specifications and volume requirements.

We are pleased to confirm that our Sialkot manufacturing floor can accommodate your order with our standard AQL 2.5 quality control standards, custom private label woven labels, and custom polybag packaging.

Please review your attached proforma quotation details and let us know your preferred courier delivery schedule so our sampling team can initiate the pre-production prototype.`,
    buttonText: 'VIEW PROFORMA INVOICE →',
    buttonUrl: '/get-quote',
  },
  {
    name: 'Update',
    subject: 'Factory Production Update - Batch Progress Report',
    content: `Hello Team,

This is a progress update from the Bin Rasool Enterprises production line regarding your active apparel run.

Your fabric lots have completed inspection and have moved into automated laser cutting and 4-needle flatlock stitching. All embroidery and custom screen print proofs have successfully passed our quality benchmark.

We anticipate final pressing, QC audit, and export packing clearance within the next 4 business days.`,
    buttonText: 'TRACK PRODUCTION STAGES →',
    buttonUrl: '/track-order',
  },
  {
    name: 'Feedback',
    subject: 'Sample Inspection & Feedback Request',
    content: `Dear Client,

Your physical pre-production sample pack has been dispatched via DHL Express Air.

Once you have inspected the fabric drape, seam strength, sizing fit, and embroidery placement, please share your feedback or sign off so our factory floor can proceed with the bulk cutting run.

Feel free to reply directly to this email or connect with our production head on WhatsApp.`,
    buttonText: 'CONFIRM SAMPLE FEEDBACK →',
    buttonUrl: '/contact',
  },
];

export default function EmailComposerClient({ initialBuyers }: EmailComposerClientProps) {
  const searchParams = useSearchParams();

  // URL query pre-fills (if coming from Inquiries page)
  const queryEmail = searchParams.get('email') || '';
  const queryName = searchParams.get('name') || '';
  const querySubject = searchParams.get('subject') || '';

  const [buyers] = useState<BuyerContact[]>(() => {
    if (initialBuyers.length > 0) return initialBuyers;
    // Default fallback contacts for clean initial state
    return [
      { name: 'John Doe', email: 'john@apexapparel.com', company: 'Apex NYC', country: 'United States' },
      { name: 'Marcus Sterling', email: 'marcus@ironathletics.co.uk', company: 'Iron Athletics UK', country: 'United Kingdom' },
    ];
  });

  const [targetAudience, setTargetAudience] = useState<'all' | 'individual'>(queryEmail ? 'individual' : 'all');
  const [selectedBuyerEmail, setSelectedBuyerEmail] = useState<string>(queryEmail || (buyers[0]?.email || ''));

  const [subject, setSubject] = useState(querySubject || 'Official Manufacturing Quotation - Bin Rasool Enterprises');
  const [content, setContent] = useState(PRESETS[0].content);
  const [buttonText, setButtonText] = useState(PRESETS[0].buttonText);
  const [buttonUrl, setButtonUrl] = useState(PRESETS[0].buttonUrl);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync if query params change
  useEffect(() => {
    if (queryEmail) {
      setTargetAudience('individual');
      setSelectedBuyerEmail(queryEmail);
    }
    if (querySubject) {
      setSubject(querySubject);
    }
  }, [queryEmail, querySubject]);

  // Recipient list based on mode
  const activeRecipients = targetAudience === 'all'
    ? buyers
    : buyers.filter(b => b.email === selectedBuyerEmail);

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setSubject(preset.subject);
    setContent(preset.content);
    setButtonText(preset.buttonText);
    setButtonUrl(preset.buttonUrl);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: activeRecipients,
          subject,
          content,
          buttonText,
          buttonUrl,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to dispatch email.' });
      } else {
        setStatusMessage({
          type: 'success',
          text: `✓ Successfully dispatched email to ${activeRecipients.length} recipient(s) (${data.provider === 'smtp' ? 'via Live SMTP' : 'Simulated Delivery'}).`,
        });
      }
    } catch (err: any) {
      setLoading(false);
      setStatusMessage({ type: 'error', text: err.message || 'Connection error occurred.' });
    }
  };

  return (
    <div>
      {/* 1. TOP STATUS CONFIGURATION CARDS (Exact match to screenshot) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {/* Card 1: Buyers Count */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '22px 24px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: '#0b0f19',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}
          >
            👥
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
              Purchasing Customers
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginTop: '2px' }}>
              {buyers.length}
            </div>
          </div>
        </div>

        {/* Card 2: Sender Address */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '22px 24px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}
          >
            ✉️
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
              Sender Address
            </div>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              sales@binrasoolenterprises.com
            </div>
          </div>
        </div>

        {/* Card 3: Replies Routed To */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '22px 24px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}
          >
            🛡️
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
              Replies Routed To
            </div>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              info@binrasoolenterprises.com
            </div>
          </div>
        </div>
      </div>

      {/* Alert Status */}
      {statusMessage && (
        <div
          style={{
            background: statusMessage.type === 'success' ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${statusMessage.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
            color: statusMessage.type === 'success' ? '#15803d' : '#991b1b',
            padding: '12px 18px',
            borderRadius: '10px',
            marginBottom: '24px',
            fontSize: '13.5px',
            fontWeight: 600,
          }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* 2. DUAL COLUMN: FORM ON LEFT, LIVE INBOX PREVIEW ON RIGHT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '28px', alignItems: 'start' }}>
        {/* LEFT COLUMN: Compose Message Form */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          {/* Header & Presets */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Compose Message
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: '#f3a626', fontWeight: 700 }}>✨ Presets:</span>
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#475569',
                  marginBottom: '8px',
                  letterSpacing: '0.05em',
                }}
              >
                Email Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. VIP Offer / New Star Wars Replica Collection Launch"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Message Content Textarea */}
            <div>
              <label
                htmlFor="content"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#475569',
                  marginBottom: '8px',
                  letterSpacing: '0.05em',
                }}
              >
                Message Content
              </label>
              <textarea
                id="content"
                required
                rows={9}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your email announcement or offer here..."
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  lineHeight: '1.6',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
              <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '6px' }}>
                Paragraph breaks are formatted into standard HTML paragraphs automatically.
              </div>
            </div>

            {/* Target Audience Selector (Exact match to screenshot) */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em' }}>
                  Target Audience: {activeRecipients.length} Recipient(s)
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="audience"
                      checked={targetAudience === 'all'}
                      onChange={() => setTargetAudience('all')}
                      style={{ accentColor: '#2563eb' }}
                    />
                    <span>All Customers ({buyers.length})</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="audience"
                      checked={targetAudience === 'individual'}
                      onChange={() => setTargetAudience('individual')}
                      style={{ accentColor: '#2563eb' }}
                    />
                    <span>Custom Selection</span>
                  </label>
                </div>
              </div>

              {/* Dropdown if individual selection */}
              {targetAudience === 'individual' && (
                <div style={{ marginTop: '10px' }}>
                  <select
                    value={selectedBuyerEmail}
                    onChange={(e) => setSelectedBuyerEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '13px',
                      background: '#ffffff',
                    }}
                  >
                    {buyers.map((b) => (
                      <option key={b.email} value={b.email}>
                        {b.name} ({b.email}) - {b.company || b.country || 'Inquiry Client'}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: '#475569',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = '#334155';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = '#475569';
              }}
            >
              {loading ? (
                <span>Dispatching Email...</span>
              ) : (
                <>
                  <span>✈️</span>
                  <span>
                    Send Broadcast to {activeRecipients.length} Customer{activeRecipients.length > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Recipient Inbox Live Preview (Exact match to screenshot) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#ea580c', letterSpacing: '0.08em', marginBottom: '10px' }}>
            <span>👁</span>
            <span>Recipient Inbox Live Preview</span>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Fake Email Client Metadata Header */}
            <div style={{ padding: '16px 20px', background: '#ffffff', borderBottom: '1px solid #f1f5f9', fontSize: '12px', color: '#475569', lineHeight: '1.7' }}>
              <div><strong>From:</strong> Bin Rasool Enterprises &lt;sales@binrasoolenterprises.com&gt;</div>
              <div><strong>Reply-To:</strong> info@binrasoolenterprises.com</div>
              <div><strong>Subject:</strong> {subject || '(Enter subject above)'}</div>
            </div>

            {/* Email Body Rendering */}
            <div style={{ padding: '0 0 24px' }}>
              {/* Dark Brand Header Banner (Velmoras style from user's image) */}
              <div
                style={{
                  background: '#0b0b0d',
                  padding: '24px 20px',
                  textAlign: 'center',
                  borderBottom: '3px solid #f3a626',
                }}
              >
                <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Bin Rasool Enterprises
                </div>
                <div style={{ color: '#f3a626', fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                  Custom Apparel Manufacturer &bull; Sialkot, Pakistan
                </div>
              </div>

              {/* Main Content Preview Area */}
              <div style={{ padding: '28px 24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
                  {subject || 'Your Subject Preview Here'}
                </h3>

                <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-wrap', marginBottom: '24px' }}>
                  {content || 'Your message preview will appear here in real-time as you type...'}
                </div>

                {/* Primary Button */}
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      background: '#1e3a8a',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '13px',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {buttonText || 'VISIT FACTORY PORTAL →'}
                  </span>
                </div>

                <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '28px' }}>
                  You are receiving this update because you placed an inquiry at Bin Rasool Enterprises.
                </div>
              </div>

              {/* Copyright strip */}
              <div style={{ textAlign: 'center', fontSize: '11px', color: '#cbd5e1', borderTop: '1px solid #f8fafc', paddingTop: '12px' }}>
                &copy; {new Date().getFullYear()} Bin Rasool Enterprises &bull; binrasoolenterprises.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

