"use client";

import { useState, useRef } from 'react';

interface TechPackUploaderProps {
  onUploaded: (fileUrl: string | null, originalName?: string) => void;
  onVideoUploaded?: (videoUrl: string | null, originalName?: string) => void;
  label?: string;
  required?: boolean;
}

export default function TechPackUploader({
  onUploaded,
  onVideoUploaded,
  label = "Attach Tech Pack, CAD Pattern, or Video Sample",
  required = false
}: TechPackUploaderProps) {
  const [activeTab, setActiveTab] = useState<'doc' | 'video'>('doc');
  const [videoMode, setVideoMode] = useState<'upload' | 'link'>('upload');

  // Document states
  const [docUploading, setDocUploading] = useState(false);
  const [docFileInfo, setDocFileInfo] = useState<{ url: string; name: string; size: string } | null>(null);
  const [docError, setDocError] = useState<string | null>(null);

  // Video states
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<{ url: string; name: string; size?: string; isLink?: boolean } | null>(null);
  const [videoLinkInput, setVideoLinkInput] = useState('');
  const [videoError, setVideoError] = useState<string | null>(null);

  const docInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Upload Doc Handler
  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDocError(null);
    setDocUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setDocUploading(false);

      if (res.ok && data.success) {
        const info = {
          url: data.url,
          name: data.fileName || file.name,
          size: formatSize(data.fileSize || file.size)
        };
        setDocFileInfo(info);
        onUploaded(data.url, info.name);
      } else {
        setDocError(data.error || 'Failed to upload document.');
        onUploaded(null);
      }
    } catch (err: any) {
      setDocUploading(false);
      setDocError(err.message || 'Network error during upload.');
      onUploaded(null);
    }
  };

  // Upload Video Handler
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoError(null);
    setVideoUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setVideoUploading(false);

      if (res.ok && data.success) {
        const info = {
          url: data.url,
          name: data.fileName || file.name,
          size: formatSize(data.fileSize || file.size),
          isLink: false
        };
        setVideoInfo(info);
        if (onVideoUploaded) {
          onVideoUploaded(data.url, info.name);
        } else {
          // Fallback if parent only passed single handler
          onUploaded(data.url, info.name);
        }
      } else {
        setVideoError(data.error || 'Failed to upload video.');
        if (onVideoUploaded) onVideoUploaded(null);
      }
    } catch (err: any) {
      setVideoUploading(false);
      setVideoError(err.message || 'Network error during video upload.');
      if (onVideoUploaded) onVideoUploaded(null);
    }
  };

  // Attach Video Link Handler
  const handleAttachVideoLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLinkInput.trim()) return;

    const url = videoLinkInput.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setVideoError('Please enter a valid URL starting with https://');
      return;
    }

    setVideoError(null);
    const info = {
      url: url,
      name: 'Cloud Video Link (' + (url.includes('drive.google') ? 'Google Drive' : url.includes('loom') ? 'Loom' : url.includes('youtube') || url.includes('youtu.be') ? 'YouTube' : 'External') + ')',
      isLink: true
    };
    setVideoInfo(info);
    if (onVideoUploaded) {
      onVideoUploaded(url, info.name);
    } else {
      onUploaded(url, info.name);
    }
    setVideoLinkInput('');
  };

  const handleRemoveDoc = () => {
    setDocFileInfo(null);
    setDocError(null);
    onUploaded(null);
    if (docInputRef.current) docInputRef.current.value = '';
  };

  const handleRemoveVideo = () => {
    setVideoInfo(null);
    setVideoError(null);
    if (onVideoUploaded) onVideoUploaded(null);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  return (
    <div style={{ marginTop: '16px', marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#fafaf9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
        
        {/* Tab switchers */}
        <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('doc')}
            style={{
              background: activeTab === 'doc' ? '#ffffff' : 'transparent',
              color: activeTab === 'doc' ? '#0f172a' : '#64748b',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'doc' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            📁 Tech Pack / CAD {docFileInfo && '✓'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            style={{
              background: activeTab === 'video' ? '#f3a626' : 'transparent',
              color: activeTab === 'video' ? '#000000' : '#64748b',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: activeTab === 'video' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            🎥 Sample Video Spec {videoInfo && '✓'}
          </button>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={docInputRef}
        type="file"
        onChange={handleDocUpload}
        accept=".pdf,.ai,.psd,.eps,.zip,.rar,.png,.jpg,.jpeg,.svg,.docx"
        style={{ display: 'none' }}
      />
      <input
        ref={videoInputRef}
        type="file"
        onChange={handleVideoUpload}
        accept="video/mp4,video/webm,video/quicktime,video/x-m4v"
        style={{ display: 'none' }}
      />

      {/* ----------------- TAB 1: TECH PACK / CAD ----------------- */}
      {activeTab === 'doc' && (
        <div>
          {!docFileInfo && !docUploading && (
            <div
              onClick={() => docInputRef.current?.click()}
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '10px',
                padding: '20px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                background: '#ffffff',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#f3a626';
                e.currentTarget.style.background = '#fffdf7';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.background = '#ffffff';
              }}
            >
              <div style={{ fontSize: '26px', marginBottom: '6px' }}>📎</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>
                Click to upload Tech Pack, CAD Pattern or Vector Artwork
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                Supports PDF, AI, PSD, EPS, ZIP, RAR, or High-Res Images (Up to 60MB)
              </div>
            </div>
          )}

          {docUploading && (
            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px',
                background: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '13px',
                color: '#475569'
              }}
            >
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
              <span>Uploading &amp; validating document on factory server...</span>
            </div>
          )}

          {docFileInfo && (
            <div
              style={{
                border: '1px solid #86efac',
                borderRadius: '10px',
                padding: '12px 16px',
                background: '#f0fdf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                <span style={{ fontSize: '22px' }}>📄</span>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#166534', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {docFileInfo.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    {docFileInfo.size} &bull; <a href={docFileInfo.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>Preview Tech Pack ↗</a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemoveDoc}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '14px',
                  padding: '4px 8px'
                }}
                title="Remove file"
              >
                ✕
              </button>
            </div>
          )}

          {docError && (
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>
              ⚠️ {docError}
            </div>
          )}
        </div>
      )}

      {/* ----------------- TAB 2: SAMPLE VIDEO REEL ----------------- */}
      {activeTab === 'video' && (
        <div>
          {/* Sub-toggle: Direct Upload vs Cloud Link */}
          {!videoInfo && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <button
                type="button"
                onClick={() => setVideoMode('upload')}
                style={{
                  background: videoMode === 'upload' ? '#0f172a' : '#f1f5f9',
                  color: videoMode === 'upload' ? '#ffffff' : '#475569',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                📹 Direct MP4 / MOV File
              </button>
              <button
                type="button"
                onClick={() => setVideoMode('link')}
                style={{
                  background: videoMode === 'link' ? '#0f172a' : '#f1f5f9',
                  color: videoMode === 'link' ? '#ffffff' : '#475569',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                🔗 Google Drive / Loom / Cloud Link
              </button>
            </div>
          )}

          {/* Sub-mode 1: Direct Video Upload */}
          {videoMode === 'upload' && !videoInfo && !videoUploading && (
            <div
              onClick={() => videoInputRef.current?.click()}
              style={{
                border: '2px dashed #f59e0b',
                borderRadius: '10px',
                padding: '20px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                background: '#fffdf5',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#d97706';
                e.currentTarget.style.background = '#fef3c7';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#f59e0b';
                e.currentTarget.style.background = '#fffdf5';
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>🎬</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#78350f' }}>
                Click to Upload Garment Sample or Stitching Video
              </div>
              <div style={{ fontSize: '11px', color: '#92400e', marginTop: '4px' }}>
                Supports MP4, MOV, WebM (Up to 60MB) &bull; 360° sample turn, fabric stretch or seam closeup
              </div>
            </div>
          )}

          {/* Sub-mode 2: Cloud Video Link */}
          {videoMode === 'link' && !videoInfo && (
            <form onSubmit={handleAttachVideoLink} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="url"
                value={videoLinkInput}
                onChange={e => setVideoLinkInput(e.target.value)}
                placeholder="https://drive.google.com/file/d/... or Loom / YouTube URL"
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  background: '#ffffff'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 16px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Attach Link
              </button>
            </form>
          )}

          {videoUploading && (
            <div
              style={{
                border: '1px solid #fef3c7',
                borderRadius: '10px',
                padding: '16px',
                background: '#fffbeb',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '13px',
                color: '#92400e'
              }}
            >
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
              <span>Uploading sample video reel (transmitting to factory server)...</span>
            </div>
          )}

          {/* Video Attached & Live Player Preview */}
          {videoInfo && (
            <div
              style={{
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '14px',
                background: '#ffffff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>🎬</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                      {videoInfo.name}
                    </div>
                    {videoInfo.size && (
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{videoInfo.size}</div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '14px',
                    padding: '4px 8px'
                  }}
                  title="Remove video"
                >
                  ✕
                </button>
              </div>

              {/* In-Browser Video Player for uploaded direct videos */}
              {!videoInfo.isLink ? (
                <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
                  <video
                    src={videoInfo.url}
                    controls
                    playsInline
                    style={{ width: '100%', maxHeight: '180px', display: 'block' }}
                  />
                </div>
              ) : (
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                    🔗 {videoInfo.url}
                  </span>
                  <a
                    href={videoInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'underline', marginLeft: '10px', whiteSpace: 'nowrap' }}
                  >
                    Open Link ↗
                  </a>
                </div>
              )}
            </div>
          )}

          {videoError && (
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>
              ⚠️ {videoError}
            </div>
          )}
        </div>
      )}

      {/* Status Footer Badge if both attached */}
      {(docFileInfo || videoInfo) && (
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '11px', color: '#475569' }}>
          <span style={{ fontWeight: 700 }}>Ready for Factory Review:</span>
          {docFileInfo && <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>📄 Tech Pack Attached</span>}
          {videoInfo && <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>🎥 Video Spec Attached</span>}
        </div>
      )}
    </div>
  );
}
