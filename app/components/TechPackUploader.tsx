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
  label = "Attach Tech Pack or Design (Optional)",
  required = false
}: TechPackUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ url: string; name: string; size: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setUploading(false);

      if (res.ok && data.success) {
        const info = {
          url: data.url,
          name: data.fileName || file.name,
          size: formatSize(data.fileSize || file.size)
        };
        setFileInfo(info);
        onUploaded(data.url, info.name);
      } else {
        setError(data.error || 'Failed to upload file.');
        onUploaded(null);
      }
    } catch (err: any) {
      setUploading(false);
      setError(err.message || 'Network error during upload.');
      onUploaded(null);
    }
  };

  const handleRemove = () => {
    setFileInfo(null);
    setError(null);
    onUploaded(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleApplyLink = () => {
    if (!linkInput.trim()) return;
    const url = linkInput.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Please enter a valid URL (https://...)');
      return;
    }
    setError(null);
    const info = { url, name: 'Cloud Drive Link', size: 'External' };
    setFileInfo(info);
    onUploaded(url, info.name);
    if (onVideoUploaded) onVideoUploaded(url, info.name);
    setShowLinkInput(false);
  };

  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '4px' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        accept=".pdf,.ai,.psd,.eps,.zip,.rar,.png,.jpg,.jpeg,.svg,.docx"
        style={{ display: 'none' }}
      />

      {/* Upload State / Button */}
      {!fileInfo && !uploading && (
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 14px',
              border: '1.5px dashed #cbd5e1',
              borderRadius: '8px',
              background: '#f8fafc',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#334155',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#f3a626';
              e.currentTarget.style.background = '#fffdf7';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.background = '#f8fafc';
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748b' }}>
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            <span style={{ fontWeight: 600 }}>Attach Tech Pack or Artwork</span>
            <span style={{ color: '#94a3b8', fontSize: '11.5px' }}>(PDF, AI, ZIP, Images &bull; Max 50MB)</span>
          </div>

          {!showLinkInput && (
            <button
              type="button"
              onClick={() => setShowLinkInput(true)}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 0',
                marginTop: '4px',
                fontSize: '11.5px',
                color: '#64748b',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Or paste a Google Drive / WeTransfer link
            </button>
          )}
        </div>
      )}

      {/* Cloud Link Input */}
      {showLinkInput && !fileInfo && (
        <div style={{ marginTop: '6px', display: 'flex', gap: '6px' }}>
          <input
            type="url"
            value={linkInput}
            onChange={e => setLinkInput(e.target.value)}
            placeholder="Paste Google Drive, Dropbox or WeTransfer URL"
            style={{
              flex: 1,
              padding: '7px 10px',
              fontSize: '12.5px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={handleApplyLink}
            style={{
              padding: '7px 12px',
              fontSize: '12px',
              fontWeight: 700,
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Attach
          </button>
          <button
            type="button"
            onClick={() => { setShowLinkInput(false); setLinkInput(''); }}
            style={{
              padding: '7px 10px',
              fontSize: '12px',
              background: '#f1f5f9',
              color: '#64748b',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Uploading Spinner */}
      {uploading && (
        <div
          style={{
            padding: '10px 14px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '12.5px',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>⏳ Uploading file, please wait...</span>
        </div>
      )}

      {/* Uploaded File Chip */}
      {fileInfo && (
        <div
          style={{
            padding: '8px 12px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12.5px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
            <span style={{ color: '#16a34a', fontWeight: 800 }}>✓</span>
            <span style={{ fontWeight: 600, color: '#0f172a', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '300px' }}>
              {fileInfo.name}
            </span>
            <span style={{ color: '#64748b', fontSize: '11px' }}>({fileInfo.size})</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            style={{
              background: 'none',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '12px',
              padding: '2px 6px',
            }}
          >
            Remove ✕
          </button>
        </div>
      )}

      {error && (
        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </div>
  );
}
