"use client";

import React, { useState } from 'react';
import { ArrowRightIcon } from './AdminIcons';

const GARMENT_CATEGORIES = [
  'Heavyweight French Terry Hoodies (400–500 GSM)',
  'Seamless Leggings & Activewear Sets',
  'Custom Sports Tracksuits & Warmups',
  'Boxing Gloves & Combat Gear',
  'Acid Wash Streetwear Oversized Tees',
  'Custom Denim Jeans & Jackets',
  'Sublimated Team Uniforms / Teamwear',
  'Other / Custom Tech Pack',
];

const QUANTITY_TIERS = [
  'Physical Sample (1–3 pcs)',
  'Low MOQ Opening Order (50–100 pcs)',
  'Mid Volume Collection (250–500 pcs)',
  'Large Volume Bulk (1,000+ pcs)',
];

const BUYER_COUNTRIES = [
  'United States 🇺🇸',
  'United Kingdom 🇬🇧',
  'Canada 🇨🇦',
  'Australia 🇦🇺',
  'Germany 🇩🇪',
  'France 🇫🇷',
  'Netherlands 🇳🇱',
  'United Arab Emirates 🇦🇪',
  'Other Country 🌍',
];

export default function FloatingWhatsAppSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(GARMENT_CATEGORIES[0]);
  const [quantity, setQuantity] = useState(QUANTITY_TIERS[1]);
  const [country, setCountry] = useState(BUYER_COUNTRIES[0]);
  const [customNote, setCustomNote] = useState('');

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCountry = country.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').trim();
    const text = encodeURIComponent(
      `Hi Bin Rasool Enterprises! 👋\n\nI am contacting you from *${cleanCountry}* regarding custom apparel manufacturing.\n\n• *Category:* ${category}\n• *Quantity Tier:* ${quantity}${customNote ? `\n• *Notes:* ${customNote}` : ''}\n\nCould you please connect me with a production manager for sampling details & quotation? Thank you!`
    );
    window.open(`https://wa.me/923133599241?text=${text}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        fontFamily: 'inherit',
      }}
    >
      {/* Floating Action Badge Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open WhatsApp Factory Chat"
          className="wa-floating-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, #0b1220 0%, #172235 100%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '9999px',
            padding: '8px 18px 8px 10px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(34, 197, 94, 0.2)',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            outline: 'none',
          }}
        >
          {/* Circular WhatsApp Icon Badge with pulsing live online indicator */}
          <span
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              minWidth: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(37, 211, 102, 0.45)',
              flexShrink: 0,
            }}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="#ffffff"
              style={{ display: 'block' }}
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>

            {/* Radar Pulse Live Dot on badge corner */}
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '11px',
                height: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#22c55e',
                  animation: 'waPulseRing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              />
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '2px solid #0b1220',
                  position: 'relative',
                  display: 'block',
                }}
              />
            </span>
          </span>

          {/* Text Labels Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              gap: '1px',
            }}
          >
            <span
              className="wa-text-sub"
              style={{
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                color: '#4ade80',
                lineHeight: 1.1,
              }}
            >
              Factory Direct
            </span>
            <span
              style={{
                fontSize: '13.5px',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              Chat with Factory Line
            </span>
          </div>

          {/* Micro arrow icon */}
          <span
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              marginLeft: '4px',
              flexShrink: 0,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </button>
      )}

      {/* Interactive Quick-Select WhatsApp Drawer */}
      {isOpen && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '340px',
            maxWidth: 'calc(100vw - 32px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            animation: 'fadeInUp 0.25s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
              color: '#ffffff',
              padding: '16px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', opacity: 0.9, fontWeight: 600 }}>
                Bin Rasool Enterprises
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>
                Factory Production Line
              </div>
              <div
                style={{
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '3px',
                  color: '#dcfce7',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'inline-block',
                  }}
                />
                Online &bull; Sialkot, PK (GMT+5)
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
            >
              &times;
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLaunchWhatsApp} style={{ padding: '16px' }}>
            {/* Country Selector */}
            <div style={{ marginBottom: '12px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#475569',
                  marginBottom: '4px',
                }}
              >
                Your Destination Country:
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                }}
              >
                {BUYER_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Garment Category */}
            <div style={{ marginBottom: '12px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#475569',
                  marginBottom: '4px',
                }}
              >
                Interested Garment / Style:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                }}
              >
                {GARMENT_CATEGORIES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Tier */}
            <div style={{ marginBottom: '12px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#475569',
                  marginBottom: '4px',
                }}
              >
                Estimated Quantity:
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                }}
              >
                {QUANTITY_TIERS.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Note */}
            <div style={{ marginBottom: '14px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#475569',
                  marginBottom: '4px',
                }}
              >
                Quick Note / Fabric Specs (Optional):
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Need 450 GSM boxy cut with puff print"
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                }}
              />
            </div>

            {/* Launch Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                background: '#25D366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
              }}
            >
              <span>Open WhatsApp &amp; Chat Live</span>
              <ArrowRightIcon size={14} />
            </button>

            <div
              style={{
                textAlign: 'center',
                fontSize: '11px',
                color: '#94a3b8',
                marginTop: '10px',
              }}
            >
              Direct factory line &bull; Sialkot, Pakistan
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

