"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HeroSlide, CategoryCard, FeaturedProduct, SiteMediaData } from '@/app/lib/siteMediaStore';

export default function AdminMediaManager() {
  const [media, setMedia] = useState<SiteMediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'categories' | 'featured'>('hero');
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  // Hidden file input refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const currentUploadTargetRef = useRef<{ type: 'hero' | 'cat' | 'feat'; index?: number } | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      const json = await res.json();
      if (json.success && json.data) {
        setMedia(json.data);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
      showNotification('Failed to load website media configuration.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (text: string, type: 'success' | 'error') => {
    setStatusMsg({ text, type });
    setTimeout(() => {
      setStatusMsg(null);
    }, 4500);
  };

  const handleSave = async () => {
    if (!media) return;
    try {
      setSaving(true);
      const res = await fetch('/api/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(media),
      });
      const json = await res.json();
      if (json.success) {
        setMedia(json.data);
        showNotification('✅ Website images and content saved and published live!', 'success');
      } else {
        showNotification('❌ Failed to save changes: ' + (json.error || 'Server error'), 'error');
      }
    } catch (err: any) {
      showNotification('❌ Error saving media: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all hero slides and category cards to original factory defaults?')) {
      return;
    }
    try {
      setSaving(true);
      const res = await fetch('/api/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reset: true }),
      });
      const json = await res.json();
      if (json.success) {
        setMedia(json.data);
        showNotification('🔄 Reset to default images successfully!', 'success');
      }
    } catch (err: any) {
      showNotification('❌ Failed to reset: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const triggerUpload = (type: 'hero' | 'cat' | 'feat', index?: number) => {
    currentUploadTargetRef.current = { type, index };
    const targetKey = `${type}_${index !== undefined ? index : 'main'}`;
    setUploadingTarget(targetKey);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUploadTargetRef.current || !media) return;

    const { type, index } = currentUploadTargetRef.current;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'site');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();

      if (json.success && json.url) {
        const uploadedUrl = json.url;

        if (type === 'hero' && index !== undefined) {
          const updatedSlides = [...media.hero_slides];
          updatedSlides[index] = { ...updatedSlides[index], image_url: uploadedUrl };
          setMedia({ ...media, hero_slides: updatedSlides });
          showNotification(`Slide #${index + 1} image uploaded! Click "Save All Changes" to make it live.`, 'success');
        } else if (type === 'cat' && index !== undefined) {
          const updatedCards = [...media.category_cards];
          updatedCards[index] = { ...updatedCards[index], image_url: uploadedUrl };
          setMedia({ ...media, category_cards: updatedCards });
          showNotification(`${updatedCards[index].title} image uploaded! Click "Save All Changes" to make it live.`, 'success');
        } else if (type === 'feat') {
          setMedia({
            ...media,
            featured_product: { ...media.featured_product, image_url: uploadedUrl },
          });
          showNotification('Featured product image uploaded! Click "Save All Changes" to make it live.', 'success');
        }
      } else {
        showNotification(json.error || 'Upload failed', 'error');
      }
    } catch (err: any) {
      showNotification('Upload error: ' + err.message, 'error');
    } finally {
      setUploadingTarget(null);
    }
  };

  // Updaters for input fields
  const updateSlideField = (index: number, field: keyof HeroSlide, value: string) => {
    if (!media) return;
    const updated = [...media.hero_slides];
    updated[index] = { ...updated[index], [field]: value };
    setMedia({ ...media, hero_slides: updated });
  };

  const updateCategoryField = (index: number, field: keyof CategoryCard, value: any) => {
    if (!media) return;
    const updated = [...media.category_cards];
    updated[index] = { ...updated[index], [field]: value };
    setMedia({ ...media, category_cards: updated });
  };

  const updateFeaturedField = (field: keyof FeaturedProduct, value: string) => {
    if (!media) return;
    setMedia({
      ...media,
      featured_product: { ...media.featured_product, [field]: value },
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔄</div>
          <div>Loading Website Media Studio...</div>
        </div>
      </div>
    );
  }

  if (!media) return null;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
      {/* Hidden File Input for PC uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/jpg"
        style={{ display: 'none' }}
      />

      {/* Top Action Header */}
      <div
        style={{
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(11, 17, 21, 0.65)',
          backdropFilter: 'blur(16px)',
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Website Media &amp; Visual Assets Manager
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                background: 'rgba(0, 229, 153, 0.15)',
                color: '#00e599',
                padding: '3px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(0, 229, 153, 0.3)',
              }}
            >
              Direct PC Upload
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0' }}>
            Upload, replace, and fine-tune Homepage Hero background slides, Category cards, and Featured product images.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.04)',
              color: '#cbd5e1',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>👁️ View Live Homepage</span>
          </Link>

          <button
            onClick={handleReset}
            disabled={saving}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.08)',
              color: '#f87171',
              fontSize: '13px',
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            Reset Defaults
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '9px 22px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #00e599, #059669)',
              color: '#070b0d',
              fontSize: '13px',
              fontWeight: 800,
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(0, 229, 153, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {saving ? 'Saving...' : '💾 Save All Changes'}
          </button>
        </div>
      </div>

      {/* Toast Notification Bar */}
      {statusMsg && (
        <div
          style={{
            padding: '12px 28px',
            fontSize: '13px',
            fontWeight: 700,
            background: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(239, 68, 68, 0.18)',
            color: statusMsg.type === 'success' ? '#34d399' : '#f87171',
            borderBottom: statusMsg.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Section Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '14px 28px 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(7, 11, 13, 0.4)',
        }}
      >
        <button
          onClick={() => setActiveTab('hero')}
          style={{
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: activeTab === 'hero' ? 800 : 600,
            color: activeTab === 'hero' ? '#00e599' : '#94a3b8',
            background: activeTab === 'hero' ? 'rgba(0, 229, 153, 0.08)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'hero' ? '2px solid #00e599' : '2px solid transparent',
            cursor: 'pointer',
            borderRadius: '6px 6px 0 0',
          }}
        >
          🌄 Homepage Hero Slider ({media.hero_slides.length} Slides)
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          style={{
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: activeTab === 'categories' ? 800 : 600,
            color: activeTab === 'categories' ? '#00e599' : '#94a3b8',
            background: activeTab === 'categories' ? 'rgba(0, 229, 153, 0.08)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'categories' ? '2px solid #00e599' : '2px solid transparent',
            cursor: 'pointer',
            borderRadius: '6px 6px 0 0',
          }}
        >
          🏷️ Category Cards ({media.category_cards.length} Categories)
        </button>

        <button
          onClick={() => setActiveTab('featured')}
          style={{
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: activeTab === 'featured' ? 800 : 600,
            color: activeTab === 'featured' ? '#00e599' : '#94a3b8',
            background: activeTab === 'featured' ? 'rgba(0, 229, 153, 0.08)' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'featured' ? '2px solid #00e599' : '2px solid transparent',
            cursor: 'pointer',
            borderRadius: '6px 6px 0 0',
          }}
        >
          ⭐ Featured Product Showcase
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
        {/* TAB 1: HERO SLIDER */}
        {activeTab === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              💡 <strong>Pro Tip:</strong> Hero slider images display in 16:9 or 21:9 full-bleed panoramic aspect ratio. High-resolution images (WebP, JPG, or PNG under 5MB) work best. Click <strong>"📷 Upload From PC"</strong> on any slide to replace its background instantly.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
              {media.hero_slides.map((slide, idx) => (
                <div
                  key={slide.id || idx}
                  style={{
                    background: 'rgba(14, 21, 26, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Slide Image Preview with Upload overlay */}
                  <div style={{ position: 'relative', height: '220px', background: '#020617', overflow: 'hidden' }}>
                    <img
                      src={slide.image_url}
                      alt={slide.alt || slide.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%231e293b" width="100" height="100"/><text fill="%2364748b" x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-size="12">Image Not Found</text></svg>';
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#00e599',
                        border: '1px solid rgba(0, 229, 153, 0.3)',
                      }}
                    >
                      SLIDE #{idx + 1}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        display: 'flex',
                        gap: '8px',
                      }}
                    >
                      <button
                        onClick={() => triggerUpload('hero', idx)}
                        disabled={uploadingTarget === `hero_${idx}`}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'rgba(0, 229, 153, 0.95)',
                          color: '#070b0d',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {uploadingTarget === `hero_${idx}` ? 'Uploading...' : '📷 Upload From PC'}
                      </button>
                    </div>
                  </div>

                  {/* Slide Configuration Fields */}
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Image Path / URL
                      </label>
                      <input
                        type="text"
                        value={slide.image_url}
                        onChange={(e) => updateSlideField(idx, 'image_url', e.target.value)}
                        style={{
                          width: '100%',
                          marginTop: '4px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          color: '#34d399',
                          fontFamily: 'monospace',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Slide Title / Topic
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateSlideField(idx, 'title', e.target.value)}
                        placeholder="e.g. Factory Floor & Craftsmanship"
                        style={{
                          width: '100%',
                          marginTop: '4px',
                          padding: '8px 12px',
                          fontSize: '13px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontWeight: 600,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Subtitle / SEO Description
                      </label>
                      <input
                        type="text"
                        value={slide.subtitle || ''}
                        onChange={(e) => updateSlideField(idx, 'subtitle', e.target.value)}
                        placeholder="Description of the slide equipment or product"
                        style={{
                          width: '100%',
                          marginTop: '4px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          color: '#cbd5e1',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORY CARDS */}
        {activeTab === 'categories' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              🏷️ <strong>Category Cards:</strong> These 4 cards appear on the homepage grid under "Activewear and gym wear we manufacture". You can upload new photography from PC and edit feature pill badges anytime.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
              {media.category_cards.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  style={{
                    background: 'rgba(14, 21, 26, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Category Image Preview */}
                  <div style={{ position: 'relative', height: '220px', background: '#020617', overflow: 'hidden' }}>
                    <img
                      src={cat.image_url}
                      alt={cat.alt || cat.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%231e293b" width="100" height="100"/><text fill="%2364748b" x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-size="12">Image Not Found</text></svg>';
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                      }}
                    >
                      {cat.title}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                      }}
                    >
                      <button
                        onClick={() => triggerUpload('cat', idx)}
                        disabled={uploadingTarget === `cat_${idx}`}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'rgba(56, 189, 248, 0.95)',
                          color: '#070b0d',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {uploadingTarget === `cat_${idx}` ? 'Uploading...' : '📷 Upload From PC'}
                      </button>
                    </div>
                  </div>

                  {/* Category Details */}
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Image Path / URL
                      </label>
                      <input
                        type="text"
                        value={cat.image_url}
                        onChange={(e) => updateCategoryField(idx, 'image_url', e.target.value)}
                        style={{
                          width: '100%',
                          marginTop: '4px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          color: '#38bdf8',
                          fontFamily: 'monospace',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Title
                      </label>
                      <input
                        type="text"
                        value={cat.title}
                        onChange={(e) => updateCategoryField(idx, 'title', e.target.value)}
                        style={{
                          width: '100%',
                          marginTop: '4px',
                          padding: '8px 12px',
                          fontSize: '13px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontWeight: 600,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Description
                      </label>
                      <textarea
                        value={cat.description}
                        rows={2}
                        onChange={(e) => updateCategoryField(idx, 'description', e.target.value)}
                        style={{
                          width: '100%',
                          marginTop: '4px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          color: '#cbd5e1',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Specification Badges (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={cat.tags ? cat.tags.join(', ') : ''}
                        onChange={(e) => {
                          const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          updateCategoryField(idx, 'tags', arr);
                        }}
                        placeholder="e.g. 75/25 Nylon Spandex, 4-Needle Flatlock, 240 GSM"
                        style={{
                          width: '100%',
                          marginTop: '4px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          color: '#cbd5e1',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Target Page Link
                        </label>
                        <input
                          type="text"
                          value={cat.link}
                          onChange={(e) => updateCategoryField(idx, 'link', e.target.value)}
                          style={{
                            width: '100%',
                            marginTop: '4px',
                            padding: '8px 12px',
                            fontSize: '12px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            color: '#cbd5e1',
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Action Button Text
                        </label>
                        <input
                          type="text"
                          value={cat.action_text || 'Explore'}
                          onChange={(e) => updateCategoryField(idx, 'action_text', e.target.value)}
                          style={{
                            width: '100%',
                            marginTop: '4px',
                            padding: '8px 12px',
                            fontSize: '12px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            color: '#cbd5e1',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FEATURED PRODUCT SHOWCASE */}
        {activeTab === 'featured' && (
          <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              ⭐ <strong>Featured Product Showcase:</strong> Highlight your flagship product on the homepage (under "Manufacturing examples"). Upload high-res photography directly from your PC.
            </div>

            <div
              style={{
                background: 'rgba(14, 21, 26, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '280px', background: '#020617', overflow: 'hidden' }}>
                <img
                  src={media.featured_product.image_url}
                  alt={media.featured_product.alt || media.featured_product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%231e293b" width="100" height="100"/><text fill="%2364748b" x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-size="12">Image Not Found</text></svg>';
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#fbbf24',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                  }}
                >
                  FEATURED HERO SHOWCASE
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                  }}
                >
                  <button
                    onClick={() => triggerUpload('feat')}
                    disabled={uploadingTarget === 'feat_main'}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'rgba(251, 191, 36, 0.95)',
                      color: '#070b0d',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {uploadingTarget === 'feat_main' ? 'Uploading...' : '📷 Upload From PC'}
                  </button>
                </div>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Image Path / URL
                  </label>
                  <input
                    type="text"
                    value={media.featured_product.image_url}
                    onChange={(e) => updateFeaturedField('image_url', e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: '4px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#fbbf24',
                      fontFamily: 'monospace',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Product Title
                    </label>
                    <input
                      type="text"
                      value={media.featured_product.title}
                      onChange={(e) => updateFeaturedField('title', e.target.value)}
                      style={{
                        width: '100%',
                        marginTop: '4px',
                        padding: '8px 12px',
                        fontSize: '13px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontWeight: 600,
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Badge / Tag
                    </label>
                    <input
                      type="text"
                      value={media.featured_product.tag}
                      onChange={(e) => updateFeaturedField('tag', e.target.value)}
                      style={{
                        width: '100%',
                        marginTop: '4px',
                        padding: '8px 12px',
                        fontSize: '13px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontWeight: 600,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Description
                  </label>
                  <textarea
                    value={media.featured_product.description}
                    rows={3}
                    onChange={(e) => updateFeaturedField('description', e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: '4px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#cbd5e1',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Target Product Link
                  </label>
                  <input
                    type="text"
                    value={media.featured_product.link}
                    onChange={(e) => updateFeaturedField('link', e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: '4px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#cbd5e1',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
