"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@/app/components/AdminIcons';

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
    buttonText: 'VIEW PROFORMA INVOICE',
    buttonUrl: '/get-quote',
  },
  {
    name: 'Update',
    subject: 'Factory Production Update - Batch Progress Report',
    content: `Hello Team,

This is a progress update from the Bin Rasool Enterprises production line regarding your active apparel run.

Your fabric lots have completed inspection and have moved into automated laser cutting and 4-needle flatlock stitching. All embroidery and custom screen print proofs have successfully passed our quality benchmark.

We anticipate final pressing, QC audit, and export packing clearance within the next 4 business days.`,
    buttonText: 'TRACK PRODUCTION STAGES',
    buttonUrl: '/track-order',
  },
  {
    name: 'Feedback',
    subject: 'Sample Inspection & Feedback Request',
    content: `Dear Client,

Your physical pre-production sample pack has been dispatched via DHL Express Air.

Once you have inspected the fabric drape, seam strength, sizing fit, and embroidery placement, please share your feedback or sign off so our factory floor can proceed with the bulk cutting run.

Feel free to reply directly to this email or connect with our production head on WhatsApp.`,
    buttonText: 'CONFIRM SAMPLE FEEDBACK',
    buttonUrl: '/contact',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function EmailComposerClient({ initialBuyers }: EmailComposerClientProps) {
  const searchParams = useSearchParams();

  // URL query pre-fills (if coming from Inquiries page)
  const queryEmail = searchParams.get('email') || '';
  const queryName = searchParams.get('name') || '';
  const querySubject = searchParams.get('subject') || '';

  const [buyers] = useState<BuyerContact[]>(() => {
    if (initialBuyers.length > 0) return initialBuyers;
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

  useEffect(() => {
    if (queryEmail) {
      setTargetAudience('individual');
      setSelectedBuyerEmail(queryEmail);
    }
    if (querySubject) {
      setSubject(querySubject);
    }
  }, [queryEmail, querySubject]);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: '40px' }}
    >
      {/* 1. Header & Live Status */}
      <motion.div
        variants={itemVariants}
        style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#00e599' }}>
              DIRECT BUYER BROADCAST &bull; SMTP GATEWAY
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599', boxShadow: '0 0 8px #00e599' }} />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Export Client Email Dispatch Studio
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
            Broadcast tech pack evaluations, proforma invoices, and production status updates directly to international buyers.
          </p>
        </div>
      </motion.div>

      {/* 2. Top 3 Status Configuration Cards */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '24px' }}
      >
        {/* Card 1: Buyers Count */}
        <div
          style={{
            background: '#11171a',
            borderRadius: '12px',
            padding: '18px 22px',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              background: '#090d0f',
              border: '1px solid rgba(0, 229, 153, 0.3)',
              color: '#00e599',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(0, 229, 153, 0.15)',
            }}
          >
            👥
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
              PURCHASING BUYERS
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, marginTop: '2px' }}>
              {buyers.length} Contacts
            </div>
          </div>
        </div>

        {/* Card 2: Sender Address */}
        <div
          style={{
            background: '#11171a',
            borderRadius: '12px',
            padding: '18px 22px',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              background: '#090d0f',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.15)',
            }}
          >
            ✉️
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
              SENDER ADDRESS
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#38bdf8', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              sales@binrasoolenterprises.com
            </div>
          </div>
        </div>

        {/* Card 3: Replies Routed To */}
        <div
          style={{
            background: '#11171a',
            borderRadius: '12px',
            padding: '18px 22px',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              background: '#090d0f',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(251, 191, 36, 0.15)',
            }}
          >
            🛡️
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em' }}>
              REPLIES ROUTED TO
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#fbbf24', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              info@binrasoolenterprises.com
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alert Status */}
      {statusMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: statusMessage.type === 'success' ? 'rgba(0, 229, 153, 0.12)' : 'rgba(248, 113, 113, 0.12)',
            border: `1px solid ${statusMessage.type === 'success' ? 'rgba(0, 229, 153, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`,
            color: statusMessage.type === 'success' ? '#00e599' : '#f87171',
            padding: '12px 18px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          {statusMessage.text}
        </motion.div>
      )}

      {/* 3. DUAL COLUMN: FORM ON LEFT, LIVE INBOX PREVIEW ON RIGHT */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '24px', alignItems: 'start' }}
      >
        {/* LEFT COLUMN: Compose Message Form */}
        <div
          style={{
            background: '#11171a',
            borderRadius: '14px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
          }}
        >
          {/* Header & Presets */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Compose Client Message
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#00e599', fontWeight: 700 }}>✨ Presets:</span>
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  style={{
                    background: '#090d0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00e599';
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 153, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#cbd5e1',
                  marginBottom: '6px',
                  letterSpacing: '0.05em',
                }}
              >
                EMAIL SUBJECT
              </label>
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Official Manufacturing Quotation - Bin Rasool Enterprises"
                style={{
                  width: '100%',
                  background: '#090d0f',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: '#ffffff',
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
                  color: '#cbd5e1',
                  marginBottom: '6px',
                  letterSpacing: '0.05em',
                }}
              >
                MESSAGE BODY
              </label>
              <textarea
                id="content"
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your email announcement or manufacturing update here..."
                style={{
                  width: '100%',
                  background: '#090d0f',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '13px',
                  color: '#ffffff',
                  fontFamily: 'inherit',
                  lineHeight: '1.6',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Target Audience Selector */}
            <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                  TARGET AUDIENCE: <span style={{ color: '#00e599' }}>{activeRecipients.length} Recipient(s)</span>
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="audience"
                      checked={targetAudience === 'all'}
                      onChange={() => setTargetAudience('all')}
                      style={{ accentColor: '#00e599' }}
                    />
                    <span>All Buyers ({buyers.length})</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="audience"
                      checked={targetAudience === 'individual'}
                      onChange={() => setTargetAudience('individual')}
                      style={{ accentColor: '#00e599' }}
                    />
                    <span>Individual Client</span>
                  </label>
                </div>
              </div>

              {/* Dropdown if individual selection */}
              {targetAudience === 'individual' && (
                <div style={{ marginTop: '8px' }}>
                  <select
                    value={selectedBuyerEmail}
                    onChange={(e) => setSelectedBuyerEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#090d0f',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  >
                    {buyers.map((b) => (
                      <option key={b.email} value={b.email} style={{ background: '#090d0f', color: '#ffffff' }}>
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
                background: '#00e599',
                color: '#05140d',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 16px rgba(0, 229, 153, 0.35)',
                transition: 'transform 0.15s ease',
              }}
            >
              {loading ? (
                <span>Dispatching SMTP Broadcast...</span>
              ) : (
                <>
                  <span>✈️</span>
                  <span>
                    Send Broadcast to {activeRecipients.length} Buyer{activeRecipients.length > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Recipient Inbox Live Preview */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#00e599', letterSpacing: '0.08em', marginBottom: '10px' }}>
            <span>👁</span>
            <span>Buyer Inbox Live Preview</span>
          </div>

          <div
            style={{
              background: '#0d1316',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
              overflow: 'hidden',
            }}
          >
            {/* Fake Email Client Metadata Header */}
            <div style={{ padding: '14px 18px', background: '#090d0f', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '12px', color: '#94a3b8', lineHeight: '1.7' }}>
              <div><strong style={{ color: '#cbd5e1' }}>From:</strong> Bin Rasool Enterprises &lt;sales@binrasoolenterprises.com&gt;</div>
              <div><strong style={{ color: '#cbd5e1' }}>Reply-To:</strong> info@binrasoolenterprises.com</div>
              <div><strong style={{ color: '#cbd5e1' }}>Subject:</strong> <span style={{ color: '#00e599' }}>{subject || '(Enter subject above)'}</span></div>
            </div>

            {/* Email Body Rendering */}
            <div style={{ padding: '0 0 20px' }}>
              {/* Brand Header Banner */}
              <div
                style={{
                  background: '#05080a',
                  padding: '22px 18px',
                  textAlign: 'center',
                  borderBottom: '2px solid #00e599',
                }}
              >
                <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Bin Rasool Enterprises
                </div>
                <div style={{ color: '#00e599', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                  Custom Apparel Manufacturer &bull; Sialkot, Pakistan
                </div>
              </div>

              {/* Main Content Preview Area */}
              <div style={{ padding: '24px 20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 14px' }}>
                  {subject || 'Your Subject Preview Here'}
                </h3>

                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.7', whiteSpace: 'pre-wrap', marginBottom: '22px' }}>
                  {content || 'Your message preview will appear here in real-time as you type...'}
                </div>

                {/* Primary Button */}
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#00e599',
                      color: '#05140d',
                      fontWeight: 800,
                      fontSize: '12px',
                      padding: '11px 22px',
                      borderRadius: '8px',
                      letterSpacing: '0.04em',
                      boxShadow: '0 0 14px rgba(0, 229, 153, 0.3)',
                    }}
                  >
                    <span>{buttonText ? buttonText.replace(/\s*→\s*$/, '') : 'VISIT FACTORY PORTAL'}</span>
                    <ArrowRightIcon size={13} />
                  </span>
                </div>

                <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '24px' }}>
                  You are receiving this update because you placed an export inquiry at Bin Rasool Enterprises.
                </div>
              </div>

              {/* Copyright strip */}
              <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                &copy; {new Date().getFullYear()} Bin Rasool Enterprises &bull; binrasoolenterprises.com
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
