"use client";

import { useState } from 'react';
import Link from 'next/link';
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

  const filtered = inquiries.filter(inq => {
    if (filter === 'all') return true;
    return inq.status?.toLowerCase() === filter.toLowerCase();
  });

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
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE'
      });

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
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#111827' }}>
            Customer Inquiries &amp; Quote Requests
          </h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Powered by backend REST API (<code>/api/inquiries</code>) with Supabase persistence &amp; sample video inspection.
          </p>
        </div>

        {/* Controls: Status Filters & CSV Export */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'new', 'contacted', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                style={{
                  background: filter === st ? 'var(--brand-orange, #f3a626)' : '#fff',
                  color: filter === st ? '#000' : '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '999px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {st} ({st === 'all' ? inquiries.length : inquiries.filter(i => (i.status || 'new').toLowerCase() === st).length})
              </button>
            ))}
          </div>

          <button
            onClick={exportToCSV}
            style={{
              background: '#047857',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            title="Download inquiries as Excel-ready CSV spreadsheet"
          >
            <span>📊</span> Export to Excel (CSV)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '18px' }}>
        {filtered.length === 0 ? (
          <div style={{ background: '#fff', padding: '48px', textAlign: 'center', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
            <h3 style={{ margin: '0 0 8px' }}>No inquiries in this category</h3>
            <p style={{ color: '#64748b', margin: 0 }}>
              All new submissions from the contact form appear here via <code>POST /api/contact</code>.
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

            return (
              <div
                key={inq.id || idx}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                        {inq.name}
                      </h2>

                      {/* Status Dropdown */}
                      <select
                        value={inq.status || 'new'}
                        onChange={(e) => inq.id && handleStatusChange(inq.id, e.target.value)}
                        style={{
                          background: 'var(--brand-orange-light, #fff1d6)',
                          color: 'var(--brand-orange-dark, #9a5b00)',
                          fontSize: '11px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid rgba(0,0,0,0.08)',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="new">Status: New</option>
                        <option value="contacted">Status: Contacted</option>
                        <option value="completed">Status: Completed</option>
                      </select>

                      {videoUrl && (
                        <span style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          🎥 Video Spec Attached
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '13px', color: '#64748b' }}>
                      <span>✉️ <a href={`mailto:${inq.email}`} style={{ color: '#2563eb' }}>{inq.email}</a></span>
                      {inq.phone && (
                        <span>📱 <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a' }}>{inq.phone}</a></span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {inq.date ? new Date(inq.date).toLocaleString() : 'Recent'}
                    </span>
                    {inq.id && (
                      <button
                        onClick={() => handleDelete(inq.id!)}
                        style={{
                          background: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {inq.subject && (
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                    Subject / Category: <span style={{ fontWeight: 500 }}>{inq.subject}</span>
                  </div>
                )}

                {/* Inquiry text content */}
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155', fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  {cleanDetails}
                </div>

                {/* ----------------- IN-BROWSER VIDEO INSPECTION PLAYER ----------------- */}
                {videoUrl && (
                  <div style={{ marginTop: '16px', background: '#090d16', borderRadius: '10px', padding: '14px 16px', border: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px' }}>🎬</span>
                        <div>
                          <span style={{ color: '#f3a626', fontSize: '13px', fontWeight: 800 }}>
                            Garment Sample &amp; Stitching Video Spec
                          </span>
                          <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: '8px' }}>
                            (360° product review, fabric stretch or seam inspection)
                          </span>
                        </div>
                      </div>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={isDirectVideo ? true : undefined}
                        style={{ color: '#38bdf8', fontSize: '12px', fontWeight: 700, textDecoration: 'underline' }}
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
                      <div style={{ background: '#1e293b', padding: '14px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <span style={{ color: '#cbd5e1', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          🔗 {videoUrl}
                        </span>
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{ fontSize: '12px', padding: '6px 14px', whiteSpace: 'nowrap' }}
                        >
                          ▶️ Open in Google Drive / Cloud
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* ----------------- ATTACHED TECH PACK CARD ----------------- */}
                {techpackUrl && (
                  <div style={{ marginTop: '12px', background: '#f0fdf4', borderRadius: '8px', padding: '12px 16px', border: '1px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '22px' }}>📁</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#166534' }}>
                          Tech Pack / CAD Spec Attached
                        </div>
                        <div style={{ fontSize: '11px', color: '#4b5563' }}>
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
                        background: '#16a34a',
                        color: '#ffffff',
                        padding: '7px 14px',
                        borderRadius: '6px',
                        fontSize: '12px',
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
                <div style={{ marginTop: '18px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Link
                    href={`/admin/email?email=${encodeURIComponent(inq.email)}&name=${encodeURIComponent(inq.name)}&subject=${encodeURIComponent('Quotation for ' + (inq.subject || 'Manufacturing Inquiry'))}`}
                    className="btn btn-primary"
                    style={{ fontSize: '13px', padding: '8px 16px', minHeight: '36px' }}
                  >
                    📨 Compose Email Reply
                  </Link>
                  <Link
                    href={`/invoice?name=${encodeURIComponent(inq.name)}&email=${encodeURIComponent(inq.email)}&phone=${encodeURIComponent(inq.phone || '')}&garment=${encodeURIComponent(inq.subject || 'Custom Apparel Batch')}&notes=${encodeURIComponent(cleanDetails)}`}
                    target="_blank"
                    className="btn btn-outline"
                    style={{ fontSize: '13px', padding: '8px 16px', minHeight: '36px', background: '#0f172a', color: '#fff', border: 'none' }}
                  >
                    📄 Proforma Invoice ↗
                  </Link>
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ fontSize: '13px', padding: '8px 16px', minHeight: '36px', color: '#16a34a', borderColor: '#16a34a' }}
                    >
                      Open in WhatsApp
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
