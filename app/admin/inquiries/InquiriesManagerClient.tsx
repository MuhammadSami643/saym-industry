"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Inquiry } from '../../actions';
import AnimatedCounter from '../../components/AnimatedCounter';
import { ExternalLinkIcon, MailIcon, PhoneIcon, FileTextIcon, WhatsAppIcon, VideoIcon, FolderIcon, DownloadIcon } from '../../components/AdminIcons';

function parseInquiryAttachments(details: string) {
  let cleanDetails = details || '';
  let techpackUrl: string | null = null;
  let videoUrl: string | null = null;

  // 1. Check for video tag
  const videoMatch = cleanDetails.match(/🎥 \[GARMENT SAMPLE & STITCHING VIDEO SPEC\]:\s*([^\s\n\r]+)/i);
  if (videoMatch) {
    videoUrl = videoMatch[1].trim();
    cleanDetails = cleanDetails.replace(/🎥 \[GARMENT SAMPLE & STITCHING VIDEO SPEC\]:\s*[^\s\n\r]+/i, '').trim();
  }

  // 2. Check for techpack tag
  const techMatch = cleanDetails.match(/📁 \[ATTACHED TECH PACK \/ CAD SPECIFICATION\]:\s*([^\s\n\r]+)/i);
  if (techMatch) {
    techpackUrl = techMatch[1].trim();
    cleanDetails = cleanDetails.replace(/📁 \[ATTACHED TECH PACK \/ CAD SPECIFICATION\]:\s*[^\s\n\r]+/i, '').trim();
  }

  // 3. Fallback regex detection for video URLs if not explicitly tagged
  if (!videoUrl) {
    const rawVideoMatch = cleanDetails.match(/(https?:\/\/[^\s\n\r]+?\.(mp4|webm|mov)(\?[^\s\n\r]*)?)/i);
    if (rawVideoMatch) {
      videoUrl = rawVideoMatch[1];
    } else if (cleanDetails.includes('/uploads/videos/')) {
      const uploadMatch = cleanDetails.match(/(\/uploads\/videos\/[^\s\n\r]+)/i);
      if (uploadMatch) videoUrl = uploadMatch[1];
    }
  }

  return { cleanDetails, techpackUrl, videoUrl };
}

export default function InquiriesManagerClient({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  // Quick Email Reply State
  const [replyInquiry, setReplyInquiry] = useState<Inquiry | null>(null);
  const [replyRecipientName, setReplyRecipientName] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyResult, setReplyResult] = useState<{ success: boolean; msg: string } | null>(null);

  // Push to Production Floor State
  const [prodInquiry, setProdInquiry] = useState<Inquiry | null>(null);
  const [prodItem, setProdItem] = useState('');
  const [prodVolume, setProdVolume] = useState('100 pcs per style');
  const [prodFabric, setProdFabric] = useState('Factory Sourced Certified Mill Fabric');
  const [prodDays, setProdDays] = useState('18');
  const [prodCarrier, setProdCarrier] = useState('DHL Express Worldwide Air Cargo');
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [orderCreatedResult, setOrderCreatedResult] = useState<{ orderId: string; trackingUrl: string } | null>(null);

  const filtered = inquiries.filter(inq => {
    const matchesFilter = filter === 'all' || (inq.status || 'new').toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      search === '' ||
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.subject || '').toLowerCase().includes(search.toLowerCase()) ||
      (inq.details || '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const newCount = inquiries.filter(i => (i.status || 'new').toLowerCase() === 'new').length;
  const contactedCount = inquiries.filter(i => (i.status || 'new').toLowerCase() === 'contacted').length;
  const completedCount = inquiries.filter(i => (i.status || 'new').toLowerCase() === 'completed').length;

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update status');
      }
    } catch (e: any) {
      alert(e.message || 'Error updating status');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete inquiry');
      }
    } catch (e: any) {
      alert(e.message || 'Error deleting inquiry');
    }
  }

  const getEmailTemplates = (name: string, subject: string) => [
    {
      id: 'quote',
      name: 'Price Quote & Low MOQ',
      icon: '🏷️',
      subject: `Price Quotation & Production Terms for ${subject || 'Custom Apparel'}`,
      body: `Dear ${name},

Thank you for reaching out to Bin Rasool Enterprises regarding "${subject}".

Our factory merchandising team in Sialkot, Pakistan has reviewed your specifications. We can produce your garments under strict ISO and AQL 2.5 export compliance.

Our Standard Production Terms:
- Minimum Order Quantity (MOQ): 50 pieces per style / colorway
- Proto Sampling Turnaround: 7–10 business days with DHL express tracking
- Bulk Production: 3–4 weeks after pre-production sample sign-off
- Custom Branding: Custom woven neck tags, care labels, high-density print or 3D embroidery included

Please let us know your required size breakdown and target FOB price so our merchandising team can prepare your formal Proforma Invoice.

Best regards,
Export Sales & Merchandising Team
Bin Rasool Enterprises
Pakki Kotli, Daska Road, Sialkot 51310, Pakistan
WhatsApp: +92 313 3599241 | sales@binrasoolenterprises.com`
    },
    {
      id: 'tracking',
      name: 'Sample Dispatched & Tracking #',
      icon: '📦',
      subject: `Sample Prototype Dispatched & Tracking Number - Bin Rasool Enterprises`,
      body: `Dear ${name},

Great news! Your custom sample prototype for "${subject}" has been successfully completed, steam pressed and dispatched from our Sialkot factory floor.

📦 Courier Partner: DHL Express Worldwide Air Cargo
🔢 AWB Tracking Number: DHL-PK-9821449012
🔗 Live Factory Production & Tracking: https://binrasoolenterprises.com/track-order?id=BRE-2026-9014
⏱️ Estimated Transit Time: 3–4 business days directly to your doorstep.

Please inspect the seam strength, fabric drape, stitch density and custom branding when the package arrives. We look forward to your review and feedback for initiating bulk production!

Best regards,
Export Dispatch Team
Bin Rasool Enterprises
Pakki Kotli, Daska Road, Sialkot 51310, Pakistan
WhatsApp: +92 313 3599241 | sales@binrasoolenterprises.com`
    },
    {
      id: 'techpack',
      name: 'Tech Pack & Sizing Specs',
      icon: '📐',
      subject: `Tech Pack & Size Grading Verification - Bin Rasool Enterprises`,
      body: `Dear ${name},

Thank you for reaching out to Bin Rasool Enterprises regarding "${subject}".

To ensure 100% precision before cutting fabric on our CNC Eastman tables, our pattern master needs a few technical clarifications:
1. Size Grading Chart: Do you have a spec sheet with chest, length and sleeve measurements (US / UK / EU sizing)?
2. Vector Artwork: Please provide vector logos in AI, EPS or high-res PDF format for print/embroidery placement.
3. Fabric Target GSM & Color: Pantone color code (TCX/TPX) or target GSM weight.

If you have a Google Drive or WeTransfer link with your CAD files, you can share it directly in reply to this email or via WhatsApp (+92 313 3599241).

Best regards,
Technical Merchandising Team
Bin Rasool Enterprises
Pakki Kotli, Daska Road, Sialkot 51310, Pakistan`
    },
    {
      id: 'invoice',
      name: 'Proforma Invoice & Deposit',
      icon: '📑',
      subject: `Proforma Invoice & Production Deposit Terms - Bin Rasool Enterprises`,
      body: `Dear ${name},

Following up on our discussions for "${subject}", we have prepared your production slot and allocated yarn/fabric on our factory floor.

Production Schedule & Next Milestones:
- Order Stage: Tech Pack & Pre-Production Cut Authorization
- Payment Terms: 50% deposit to commence fabric knitting & cutting, 50% upon final AQL 2.5 inspection video sign-off before dispatch.
- Bank Wire (HBL Pakistan) / Commercial Invoice ready.

Please review the attached/linked Proforma Invoice and confirm your deposit slip so we can initiate Eastman CNC cutting immediately.

Best regards,
Accounts & Export Operations
Bin Rasool Enterprises
WhatsApp: +92 313 3599241 | sales@binrasoolenterprises.com`
    },
    {
      id: 'qa',
      name: 'AQL 2.5 Inspection Passed',
      icon: '✅',
      subject: `Factory Production Milestone & AQL 2.5 Inspection Passed - Bin Rasool Enterprises`,
      body: `Dear ${name},

We are pleased to inform you that your production batch for "${subject}" has successfully passed our in-line AQL 2.5 Quality Inspection.

Production Floor Updates:
- Stitching & Seam Pull Test: 100% Passed
- Needle-Detector Scan: Cleared
- Finishing & Steam Tunnel Ironing: Completed
- Master Export Carton Packaging: In Progress

Your shipment is scheduled for Dry Port handover and air cargo departure within 24–48 hours. We will email your formal Air Waybill (AWB) as soon as courier scanning is complete.

Best regards,
Quality Assurance & Factory Floor Operations
Bin Rasool Enterprises
WhatsApp: +92 313 3599241`
    }
  ];

  const handleOpenReply = (inq: Inquiry) => {
    setReplyInquiry(inq);
    setReplyRecipientName(inq.name || '');
    setReplyEmail(inq.email || '');
    const templates = getEmailTemplates(inq.name, inq.subject || 'Custom Apparel Batch');
    setReplySubject(templates[0].subject);
    setReplyContent(templates[0].body);
    setReplyResult(null);
  };

  const handleSendReply = async () => {
    if (!replyEmail.trim() || !replyContent.trim()) {
      alert('Recipient email and message content are required.');
      return;
    }
    setSendingReply(true);
    setReplyResult(null);

    try {
      const res = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: [{ name: replyRecipientName.trim() || replyEmail.trim(), email: replyEmail.trim() }],
          subject: replySubject.trim() || 'Manufacturing Update - Bin Rasool Enterprises',
          content: replyContent,
          buttonText: 'DISCUSS ON WHATSAPP',
          buttonUrl: 'https://wa.me/923133599241'
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setReplyResult({ success: true, msg: `✓ Email successfully delivered to ${replyEmail} via Hostinger SMTP!` });
        if (replyInquiry && replyInquiry.id) {
          handleStatusChange(replyInquiry.id, 'contacted');
        }
      } else {
        setReplyResult({ success: false, msg: data.error || 'Failed to dispatch email' });
      }
    } catch (e: any) {
      setReplyResult({ success: false, msg: e.message || 'Network error sending email' });
    } finally {
      setSendingReply(false);
    }
  };

  const handleOpenProduction = (inq: Inquiry) => {
    setProdInquiry(inq);
    setProdItem(inq.subject || 'Custom Athletic / Sportswear Apparel');
    setProdVolume('100 pcs per style');
    setProdFabric('Factory Sourced Certified Mill Fabric');
    setProdDays('18');
    setProdCarrier('DHL Express Worldwide Air Cargo');
    setOrderCreatedResult(null);
  };

  const handleCreateProductionOrder = async () => {
    if (!prodInquiry) return;
    setCreatingOrder(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: prodInquiry.id,
          clientName: prodInquiry.name,
          brand: (prodInquiry as any).company || prodInquiry.name,
          country: (prodInquiry as any).country || 'International Export',
          item: prodItem,
          quantity: prodVolume,
          fabricSpec: prodFabric,
          targetDays: parseInt(prodDays, 10) || 18,
          carrier: prodCarrier
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrderCreatedResult({
          orderId: data.order.orderId,
          trackingUrl: data.trackingUrl || `/track-order?id=${data.order.orderId}`
        });
        if (prodInquiry.id) {
          setInquiries(prev => prev.map(item => item.id === prodInquiry.id ? { ...item, status: 'completed' } : item));
        }
      } else {
        alert(data.error || 'Failed to push order to production floor');
      }
    } catch (e: any) {
      alert(e.message || 'Error creating production order');
    } finally {
      setCreatingOrder(false);
    }
  };

  const exportToCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries available to export.');
      return;
    }

    const headers = [
      'Inquiry ID',
      'Date Submitted',
      'Buyer Name',
      'Email Address',
      'Phone / WhatsApp',
      'Category / Subject',
      'Status',
      'Specifications & Requirements',
      'Tech Pack URL',
      'Sample Video Spec URL'
    ];

    const rows = inquiries.map((inq) => {
      const { cleanDetails, techpackUrl, videoUrl } = parseInquiryAttachments(inq.details || '');
      const escape = (val: string | undefined | null) => {
        if (!val) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      return [
        escape(inq.id || ''),
        escape(inq.date ? new Date(inq.date).toLocaleString('en-GB') : 'N/A'),
        escape(inq.name),
        escape(inq.email),
        escape(inq.phone || 'N/A'),
        escape(inq.subject || 'Manufacturing Inquiry'),
        escape(inq.status || 'new'),
        escape(cleanDetails.replace(/[\r\n]+/g, ' | ')),
        escape(techpackUrl || 'None'),
        escape(videoUrl || 'None')
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `Bin_Rasool_Enterprises_Inquiries_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ color: '#e2e8f0', fontFamily: 'inherit' }}>
      <style jsx>{`
        .inq-card {
          background: rgba(17, 23, 26, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .inq-card:hover {
          border-color: rgba(52, 211, 153, 0.28);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(52, 211, 153, 0.15);
        }
        .kpi-mini {
          background: rgba(17, 23, 26, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: all 0.2s ease;
        }
        .kpi-mini:hover {
          background: rgba(22, 30, 34, 0.85);
          border-color: rgba(52, 211, 153, 0.3);
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
          white-space: nowrap;
        }
        .tag-mint {
          background: rgba(52, 211, 153, 0.12);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.28);
        }
        .tag-amber {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.28);
        }
        .tag-rose {
          background: rgba(248, 113, 113, 0.12);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.28);
        }
      `}</style>

      {/* Title & Actions */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Authorization Queue &amp; RFQs
            </h1>
            <span className="tag-pill tag-mint">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }}></span>
              LIVE PIPELINE
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13.5px' }}>
            International wholesale buyers, custom sample requests and instant quote submissions.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(17, 23, 26, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '9999px',
              padding: '6px 14px',
              width: '240px',
            }}
          >
            <span style={{ color: '#64748b', fontSize: '12px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search RFQs, buyer, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '12px',
                width: '100%',
              }}
            />
          </div>

          <button
            onClick={exportToCSV}
            style={{
              background: 'rgba(52, 211, 153, 0.12)',
              color: '#34d399',
              border: '1px solid rgba(52, 211, 153, 0.28)',
              borderRadius: '9999px',
              padding: '7px 16px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>📊</span> Export to CSV
          </button>
        </div>
      </div>

      {/* 4-KPI Stat Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div className="kpi-mini">
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
            TOTAL INQUIRIES
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            <AnimatedCounter value={inquiries.length} duration={1.2} delay={0.2} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>All time submissions</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              NEW UNTOUCHED
            </span>
            <span className="tag-pill tag-rose">Action Needed</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#f87171', margin: '4px 0 2px' }}>
            <AnimatedCounter value={newCount} duration={1.2} delay={0.25} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Awaiting factory reply</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              CONTACTED / QUOTED
            </span>
            <span className="tag-pill tag-amber">In Negotiation</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#fbbf24', margin: '4px 0 2px' }}>
            <AnimatedCounter value={contactedCount} duration={1.2} delay={0.3} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Price &amp; tech pack shared</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              CONFIRMED ORDERS
            </span>
            <span className="tag-pill tag-mint">Converted</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#34d399', margin: '4px 0 2px' }}>
            <AnimatedCounter value={completedCount} duration={1.2} delay={0.35} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Moved to factory floor</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'All Inquiries', count: inquiries.length },
          { key: 'new', label: 'New & Untouched', count: newCount },
          { key: 'contacted', label: 'In Contact', count: contactedCount },
          { key: 'completed', label: 'Completed', count: completedCount },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              background: filter === tab.key ? 'rgba(52, 211, 153, 0.14)' : 'rgba(17, 23, 26, 0.65)',
              color: filter === tab.key ? '#34d399' : '#94a3b8',
              border: filter === tab.key ? '1px solid rgba(52, 211, 153, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label} <span style={{ opacity: 0.75 }}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Inquiries Cards Grid */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.length === 0 ? (
          <div style={{ background: '#11171a', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '56px 20px', textAlign: 'center', borderRadius: '14px' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>📭</div>
            <h3 style={{ margin: '0 0 6px', color: '#ffffff', fontSize: '16px' }}>No inquiries matching this filter</h3>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: '13px' }}>
              All new submissions from contact forms and RFQs appear here automatically.
            </p>
          </div>
        ) : (
          filtered.map((inq, idx) => {
            const { cleanDetails, techpackUrl, videoUrl } = parseInquiryAttachments(inq.details || '');
            const isDirectVideo = videoUrl && (
              videoUrl.match(/\.(mp4|webm|mov)($|\?)/i) || 
              videoUrl.includes('/uploads/videos/') ||
              videoUrl.startsWith('/uploads/')
            );
            const isYouTube = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));
            const isLoom = videoUrl && videoUrl.includes('loom.com');

            const status = (inq.status || 'new').toLowerCase();
            const statusBadgeClass = status === 'completed' ? 'tag-mint' : status === 'contacted' ? 'tag-amber' : 'tag-rose';

            return (
              <motion.div
                key={inq.id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.38, ease: "easeOut" as const }}
                className="inq-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                        {inq.name}
                      </h2>

                      {/* Status Dropdown with custom centered chevron */}
                      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                        <select
                          value={inq.status || 'new'}
                          onChange={(e) => inq.id && handleStatusChange(inq.id, e.target.value)}
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            background: status === 'completed' ? 'rgba(52, 211, 153, 0.12)' : status === 'contacted' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(248, 113, 113, 0.12)',
                            color: status === 'completed' ? '#34d399' : status === 'contacted' ? '#fbbf24' : '#f87171',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            padding: '5px 28px 5px 14px',
                            borderRadius: '9999px',
                            border: status === 'completed' ? '1px solid rgba(52, 211, 153, 0.28)' : status === 'contacted' ? '1px solid rgba(245, 158, 11, 0.28)' : '1px solid rgba(248, 113, 113, 0.28)',
                            cursor: 'pointer',
                            outline: 'none',
                          }}
                        >
                          <option value="new" style={{ background: '#0f171a', color: '#f87171' }}>Status: New</option>
                          <option value="contacted" style={{ background: '#0f171a', color: '#fbbf24' }}>Status: Contacted</option>
                          <option value="completed" style={{ background: '#0f171a', color: '#34d399' }}>Status: Completed</option>
                        </select>
                        <span
                          style={{
                            position: 'absolute',
                            right: '11px',
                            pointerEvents: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            color: status === 'completed' ? '#34d399' : status === 'contacted' ? '#fbbf24' : '#f87171',
                          }}
                        >
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 1L5 5L9 1" />
                          </svg>
                        </span>
                      </div>

                      {videoUrl && (
                        <span className="tag-pill tag-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <VideoIcon size={12} />
                          <span>Video Spec</span>
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '12.5px', color: '#94a3b8', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <MailIcon size={13} style={{ color: '#64748b' }} />
                        <a href={`mailto:${inq.email}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>{inq.email}</a>
                      </span>
                      {inq.phone && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <PhoneIcon size={13} style={{ color: '#64748b' }} />
                          <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#34d399', textDecoration: 'none' }}>{inq.phone}</a>
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                      {inq.date ? new Date(inq.date).toLocaleString('en-GB') : 'Recent'}
                    </span>
                    {inq.id && (
                      <button
                        onClick={() => handleDelete(inq.id!)}
                        style={{
                          background: 'rgba(248, 113, 113, 0.08)',
                          color: '#f87171',
                          border: '1px solid rgba(248, 113, 113, 0.22)',
                          borderRadius: '9999px',
                          padding: '4px 12px',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {inq.subject && (
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span>Subject / Category:</span>
                    <span style={{ color: '#34d399', fontWeight: 600, background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '3px 12px', borderRadius: '9999px' }}>
                      {inq.subject}
                    </span>
                  </div>
                )}

                {/* Inquiry text content in dark frosted box */}
                <div style={{ background: 'rgba(9, 13, 15, 0.7)', padding: '16px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)', color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap', backdropFilter: 'blur(8px)' }}>
                  {cleanDetails}
                </div>

                {/* Video Inspection Player */}
                {videoUrl && (
                  <div style={{ marginTop: '14px', background: '#0c1114', borderRadius: '10px', padding: '14px', border: '1px solid rgba(0, 229, 153, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <VideoIcon size={16} />
                        <span style={{ color: '#00e599', fontSize: '12.5px', fontWeight: 800 }}>
                          Garment Sample &amp; Stitching Video Spec
                        </span>
                      </div>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={isDirectVideo ? true : undefined}
                        style={{ color: '#38bdf8', fontSize: '11.5px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <span>{isDirectVideo ? 'Download Video File' : 'Open Video Link'}</span>
                        <ExternalLinkIcon size={12} />
                      </a>
                    </div>

                    {isDirectVideo ? (
                      <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
                        <video
                          src={videoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          style={{ width: '100%', maxHeight: '340px', display: 'block', margin: '0 auto' }}
                        />
                      </div>
                    ) : isYouTube ? (
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                        <iframe
                          src={videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                          title="Buyer Sample Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        />
                      </div>
                    ) : isLoom ? (
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                        <iframe
                          src={videoUrl.replace('/share/', '/embed/')}
                          title="Loom Video Inspection"
                          allowFullScreen
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        />
                      </div>
                    ) : (
                      <div style={{ background: 'rgba(17, 23, 26, 0.7)', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          🔗 {videoUrl}
                        </span>
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ background: 'rgba(52, 211, 153, 0.12)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.28)', fontSize: '11.5px', fontWeight: 700, padding: '6px 14px', borderRadius: '9999px', textDecoration: 'none', whiteSpace: 'nowrap' }}
                        >
                          ▶️ Open Cloud Video
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Tech Pack Card */}
                {techpackUrl && (
                  <div style={{ marginTop: '12px', background: 'rgba(12, 17, 20, 0.75)', borderRadius: '14px', padding: '12px 16px', border: '1px solid rgba(52, 211, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FolderIcon size={22} style={{ color: '#34d399' }} />
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#34d399' }}>
                          Tech Pack / CAD Spec Attached
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          Production measurement chart, vector artwork or fabric spec sheet
                        </div>
                      </div>
                    </div>
                    <a
                      href={techpackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{
                        background: 'rgba(52, 211, 153, 0.1)',
                        color: '#34d399',
                        border: '1px solid rgba(52, 211, 153, 0.28)',
                        padding: '6px 16px',
                        borderRadius: '9999px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span>View &amp; Download Tech Pack</span>
                      <DownloadIcon size={13} />
                    </a>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {/* Quick Inline Reply via Email */}
                  <button
                    type="button"
                    onClick={() => handleOpenReply(inq)}
                    style={{
                      background: 'rgba(52, 211, 153, 0.14)',
                      color: '#34d399',
                      border: '1px solid rgba(52, 211, 153, 0.35)',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <MailIcon size={14} style={{ color: '#34d399' }} />
                    <span>Quick Reply Email</span>
                  </button>

                  {/* Push to Production Floor Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenProduction(inq)}
                    style={{
                      background: 'var(--brand-orange, #f3a626)',
                      color: '#0b0b0d',
                      border: 'none',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      boxShadow: '0 2px 10px rgba(243, 166, 38, 0.3)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>🏭</span>
                    <span>Push to Production Floor</span>
                  </button>

                  <Link
                    href={`/invoice?name=${encodeURIComponent(inq.name)}&email=${encodeURIComponent(inq.email)}&phone=${encodeURIComponent(inq.phone || '')}&garment=${encodeURIComponent(inq.subject || 'Custom Apparel Batch')}&notes=${encodeURIComponent(cleanDetails)}`}
                    target="_blank"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: '#e2e8f0',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <FileTextIcon size={14} style={{ color: '#94a3b8' }} />
                    <span>Proforma Invoice</span>
                    <ExternalLinkIcon size={12} style={{ color: '#64748b' }} />
                  </Link>
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: '#34d399',
                        border: '1px solid rgba(34, 197, 94, 0.25)',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <WhatsAppIcon size={14} />
                      <span>Open in WhatsApp</span>
                      <ExternalLinkIcon size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* MODAL 1: Quick Email Reply Modal */}
      {replyInquiry && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setReplyInquiry(null);
          }}
        >
          <div
            style={{
              background: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '24px 28px',
              width: '100%',
              maxWidth: '620px',
              color: '#ffffff',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>✉️</span>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#f3a626' }}>
                  Quick Reply via Factory SMTP
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReplyInquiry(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Buyer / Recipient Name
                </label>
                <input
                  type="text"
                  value={replyRecipientName}
                  onChange={(e) => setReplyRecipientName(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#f3a626', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Recipient Email (Editable)
                </label>
                <input
                  type="email"
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#1e293b',
                    border: '1px solid #f3a626',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Template Selector Bar */}
            <div style={{ marginBottom: '14px', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#f3a626', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ⚡ Quick Response Templates (Click to load):
                </span>
                <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                  Auto-fills message
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {getEmailTemplates(replyRecipientName || replyInquiry.name, replyInquiry.subject || 'Custom Apparel').map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => {
                      setReplySubject(tmpl.subject);
                      setReplyContent(tmpl.body);
                      setReplyResult(null);
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: '#e2e8f0',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '999px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#f3a626';
                      e.currentTarget.style.color = '#f3a626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.color = '#e2e8f0';
                    }}
                  >
                    <span>{tmpl.icon}</span>
                    <span>{tmpl.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Subject
              </label>
              <input
                type="text"
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                style={{
                  width: '100%',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Message Content
              </label>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={9}
                style={{
                  width: '100%',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#ffffff',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {replyResult && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginBottom: '14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: replyResult.success ? 'rgba(52, 211, 153, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: replyResult.success ? '#34d399' : '#f87171',
                  border: `1px solid ${replyResult.success ? 'rgba(52, 211, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                }}
              >
                {replyResult.msg}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setReplyInquiry(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#cbd5e1',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              <button
                type="button"
                disabled={sendingReply}
                onClick={handleSendReply}
                style={{
                  background: 'var(--brand-orange, #f3a626)',
                  color: '#0b0b0d',
                  border: 'none',
                  padding: '9px 24px',
                  borderRadius: '999px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: sendingReply ? 'not-allowed' : 'pointer',
                  opacity: sendingReply ? 0.7 : 1,
                }}
              >
                {sendingReply ? 'Sending via SMTP...' : 'Send Reply Now ➔'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Push to Production Floor Modal */}
      {prodInquiry && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setProdInquiry(null);
          }}
        >
          <div
            style={{
              background: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '24px 28px',
              width: '100%',
              maxWidth: '580px',
              color: '#ffffff',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🏭</span>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#f3a626' }}>
                  Push Inquiry to Production Floor
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setProdInquiry(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {!orderCreatedResult ? (
              <div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px', lineHeight: 1.5 }}>
                  This converts buyer inquiry into a live <strong>Production Batch</strong> with automated 7-step tracking milestones (Tech Pack → Cutting → Stitching → AQL Audit → Pressing → Packaging → Dispatch).
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Buyer / Client
                    </label>
                    <input
                      type="text"
                      disabled
                      value={prodInquiry.name}
                      style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#94a3b8', fontSize: '13px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Brand / Label
                    </label>
                    <input
                      type="text"
                      disabled
                      value={(prodInquiry as any).company || prodInquiry.name}
                      style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#94a3b8', fontSize: '13px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Garment Style / Item
                  </label>
                  <input
                    type="text"
                    value={prodItem}
                    onChange={(e) => setProdItem(e.target.value)}
                    style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Order Volume
                    </label>
                    <input
                      type="text"
                      value={prodVolume}
                      onChange={(e) => setProdVolume(e.target.value)}
                      style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Target Turnaround Days
                    </label>
                    <input
                      type="number"
                      value={prodDays}
                      onChange={(e) => setProdDays(e.target.value)}
                      style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Fabric Specifications
                  </label>
                  <input
                    type="text"
                    value={prodFabric}
                    onChange={(e) => setProdFabric(e.target.value)}
                    style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setProdInquiry(null)}
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#cbd5e1', padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={creatingOrder}
                    onClick={handleCreateProductionOrder}
                    style={{ background: 'var(--brand-orange, #f3a626)', color: '#0b0b0d', border: 'none', padding: '8px 22px', borderRadius: '999px', fontSize: '13.5px', fontWeight: 800, cursor: creatingOrder ? 'not-allowed' : 'pointer' }}
                  >
                    {creatingOrder ? 'Launching on Floor...' : 'Start Production on Floor ➔'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ padding: '16px', background: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '12px', textAlign: 'center', margin: '14px 0 20px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '6px' }}>🎉</div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '17px', color: '#34d399', fontWeight: 800 }}>
                    Production Order Created Successfully!
                  </h4>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#f3a626', letterSpacing: '0.04em', margin: '4px 0' }}>
                    {orderCreatedResult.orderId}
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: '#cbd5e1' }}>
                    Inquiry has been converted and moved to factory production floor.
                  </p>
                </div>

                <div style={{ background: '#1e293b', padding: '12px 14px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                    Live Client Tracking Link
                  </div>
                  <div style={{ fontSize: '13px', color: '#38bdf8', wordBreak: 'break-all' }}>
                    {typeof window !== 'undefined' ? `${window.location.origin}${orderCreatedResult.trackingUrl}` : orderCreatedResult.trackingUrl}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <a
                    href={orderCreatedResult.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: 'var(--brand-orange, #f3a626)', color: '#0b0b0d', padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>Open in Track Production</span>
                    <ExternalLinkIcon size={13} />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const link = typeof window !== 'undefined' ? `${window.location.origin}${orderCreatedResult.trackingUrl}` : orderCreatedResult.trackingUrl;
                      navigator.clipboard.writeText(link);
                      alert('Tracking link copied to clipboard! You can paste it into WhatsApp or Email.');
                    }}
                    style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Copy Tracking Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setProdInquiry(null)}
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#cbd5e1', padding: '8px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
