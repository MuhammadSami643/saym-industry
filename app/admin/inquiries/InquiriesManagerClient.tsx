"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Inquiry } from '../../actions';

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
          background: #11171a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 24px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .inq-card:hover {
          border-color: rgba(0, 229, 153, 0.25);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(0, 229, 153, 0.15);
        }
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
      `}</style>

      {/* Title & Actions */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Authorization Queue &amp; RFQs
            </h1>
            <span className="tag-pill tag-mint">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599' }}></span>
              LIVE PIPELINE
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13.5px' }}>
            International wholesale buyers, custom sample requests, and instant quote submissions.
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
              background: '#11171a',
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
              background: '#00e599',
              color: '#05140d',
              border: 'none',
              borderRadius: '9999px',
              padding: '8px 16px',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 14px rgba(0, 229, 153, 0.3)',
              transition: 'transform 0.15s ease',
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
            {inquiries.length}
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
            {newCount}
          </div>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>Awaiting factory reply</span>
        </div>

        <div className="kpi-mini">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              CONTACTED / QUOTED
            </span>
            <span className="tag-pill tag-amber">In Negotiation</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#fbbf24', margin: '4px 0 2px' }}>
            {contactedCount}
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
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#00e599', margin: '4px 0 2px' }}>
            {completedCount}
          </div>
          <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Moved to factory floor</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
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
              background: filter === tab.key ? 'rgba(0, 229, 153, 0.15)' : '#11171a',
              color: filter === tab.key ? '#00e599' : '#94a3b8',
              border: filter === tab.key ? '1px solid rgba(0, 229, 153, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
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

                      {/* Status Dropdown */}
                      <select
                        value={inq.status || 'new'}
                        onChange={(e) => inq.id && handleStatusChange(inq.id, e.target.value)}
                        style={{
                          background: '#090d0f',
                          color: status === 'completed' ? '#00e599' : status === 'contacted' ? '#fbbf24' : '#f87171',
                          fontSize: '11px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid rgba(255,255,255,0.12)',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        <option value="new" style={{ background: '#090d0f', color: '#f87171' }}>Status: New</option>
                        <option value="contacted" style={{ background: '#090d0f', color: '#fbbf24' }}>Status: Contacted</option>
                        <option value="completed" style={{ background: '#090d0f', color: '#00e599' }}>Status: Completed</option>
                      </select>

                      {videoUrl && (
                        <span className="tag-pill tag-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          🎥 Video Spec
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '12.5px', color: '#94a3b8' }}>
                      <span>✉️ <a href={`mailto:${inq.email}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>{inq.email}</a></span>
                      {inq.phone && (
                        <span>📱 <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#00e599', textDecoration: 'none' }}>{inq.phone}</a></span>
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
                          background: 'rgba(248, 113, 113, 0.1)',
                          color: '#f87171',
                          border: '1px solid rgba(248, 113, 113, 0.25)',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {inq.subject && (
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>
                    Subject / Category: <span style={{ color: '#00e599', fontWeight: 600 }}>{inq.subject}</span>
                  </div>
                )}

                {/* Inquiry text content in dark frosted box */}
                <div style={{ background: '#090d0f', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)', color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {cleanDetails}
                </div>

                {/* Video Inspection Player */}
                {videoUrl && (
                  <div style={{ marginTop: '14px', background: '#0c1114', borderRadius: '10px', padding: '14px', border: '1px solid rgba(0, 229, 153, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🎬</span>
                        <span style={{ color: '#00e599', fontSize: '12.5px', fontWeight: 800 }}>
                          Garment Sample &amp; Stitching Video Spec
                        </span>
                      </div>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={isDirectVideo ? true : undefined}
                        style={{ color: '#38bdf8', fontSize: '11.5px', fontWeight: 700, textDecoration: 'none' }}
                      >
                        {isDirectVideo ? 'Download Video File ↗' : 'Open Video Link ↗'}
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
                      <div style={{ background: '#11171a', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          🔗 {videoUrl}
                        </span>
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ background: '#00e599', color: '#05140d', fontSize: '11.5px', fontWeight: 800, padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}
                        >
                          ▶️ Open Cloud Video
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Tech Pack Card */}
                {techpackUrl && (
                  <div style={{ marginTop: '12px', background: '#0c1114', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(0, 229, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>📁</span>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#00e599' }}>
                          Tech Pack / CAD Spec Attached
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          Production measurement chart, vector artwork, or fabric spec sheet
                        </div>
                      </div>
                    </div>
                    <a
                      href={techpackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{
                        background: 'rgba(0, 229, 153, 0.15)',
                        color: '#00e599',
                        border: '1px solid rgba(0, 229, 153, 0.3)',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>📥</span> View &amp; Download Tech Pack ↗
                    </a>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Link
                    href={`/admin/email?email=${encodeURIComponent(inq.email)}&name=${encodeURIComponent(inq.name)}&subject=${encodeURIComponent('Quotation for ' + (inq.subject || 'Manufacturing Inquiry'))}`}
                    style={{
                      background: '#00e599',
                      color: '#05140d',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      boxShadow: '0 0 12px rgba(0, 229, 153, 0.3)',
                    }}
                  >
                    📨 Compose Email Reply
                  </Link>
                  <Link
                    href={`/invoice?name=${encodeURIComponent(inq.name)}&email=${encodeURIComponent(inq.email)}&phone=${encodeURIComponent(inq.phone || '')}&garment=${encodeURIComponent(inq.subject || 'Custom Apparel Batch')}&notes=${encodeURIComponent(cleanDetails)}`}
                    target="_blank"
                    style={{
                      background: '#151d21',
                      color: '#e2e8f0',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    📄 Proforma Invoice ↗
                  </Link>
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(0, 229, 153, 0.1)',
                        color: '#00e599',
                        border: '1px solid rgba(0, 229, 153, 0.25)',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        padding: '8px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                      }}
                    >
                      Open in WhatsApp ↗
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
