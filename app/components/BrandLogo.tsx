"use client";

import React, { useState } from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'gold' | 'titanium';
}

/**
 * Bin Rasool Enterprises (BRE) - Official Luxury Brand Emblem
 * Features high-resolution 3D athletic crest with zero layout shift and inline vector fallback.
 */
export default function BrandLogo({ size = 42, className = '', style, variant = 'gold' }: BrandLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = variant === 'titanium'
    ? '/images/site/bre-logo-concept-titanium.webp'
    : '/images/site/bre-logo-icon.webp';

  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        maxWidth: `${size}px`,
        flexShrink: 0,
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        background: '#070a0f',
        position: 'relative',
        ...style,
      }}
    >
      {!imgFailed ? (
        <img
          src={src}
          alt="Bin Rasool Enterprises Official Logo"
          width={size}
          height={size}
          onError={() => setImgFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
          aria-label="Bin Rasool Enterprises"
        >
          <defs>
            <linearGradient id="breGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" rx="100" fill="#070a0f" />
          <path
            d="M136 100 L214 100 L214 412 L136 412 Z"
            fill="url(#breGold)"
          />
          <path
            d="M214 100 L320 100 C370 100 404 130 404 180 C404 230 370 256 320 256 L214 256 Z"
            fill="url(#breGold)"
          />
          <path
            d="M214 256 L330 256 C384 256 420 286 420 336 C420 386 384 412 330 412 L214 412 Z"
            fill="url(#breGold)"
          />
        </svg>
      )}
    </div>
  );
}
