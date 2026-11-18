"use client";

import React, { useState } from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'icon' | 'full';
  theme?: 'light' | 'dark';
}

/**
 * Bin Rasool Enterprises (BRE) - Official Brand Identity & Emblem
 * Represents premier Sialkot manufacturing in boxing, gym wear and activewear.
 */
export default function BrandLogo({ size = 42, className = '', style, variant = 'icon', theme = 'light' }: BrandLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = theme === 'dark'
    ? (variant === 'full' ? '/images/site/logo-dark.webp' : '/images/site/bre-brand-mark-dark.webp')
    : (variant === 'full' ? '/images/site/logo.webp' : '/images/site/bre-brand-mark.webp');

  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        maxWidth: `${size}px`,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        background: 'transparent',
        position: 'relative',
        ...style,
      }}
    >
      {!imgFailed ? (
        <img
          src={src}
          alt="Bin Rasool Enterprises Official Brand Emblem"
          width={size}
          height={size}
          onError={() => setImgFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))',
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
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="breCarbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <path
            d="M256 60 L370 120 L370 280 C370 380 256 450 256 450 C256 450 142 380 142 280 L142 120 Z"
            fill="url(#breCarbon)"
            stroke="url(#breGold)"
            strokeWidth="16"
          />
          <path
            d="M200 170 L265 170 C290 170 305 182 305 205 C305 224 290 236 265 240 C295 244 312 258 312 282 C312 308 290 322 265 322 L200 322 Z"
            fill="url(#breGold)"
          />
        </svg>
      )}
    </div>
  );
}
