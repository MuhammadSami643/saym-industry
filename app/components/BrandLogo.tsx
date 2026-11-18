import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Bin Rasool Enterprises (BRE) - Official Vector Brand Emblem
 * Athletic luxury monogram 'B' with aerodynamic precision wings & speed cuts.
 * Renders 100% inline SVG with zero network requests and zero load delay.
 */
export default function BrandLogo({ size = 42, className = '', style }: BrandLogoProps) {
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
        display: 'inline-block',
        verticalAlign: 'middle',
        boxShadow: '0 0 14px rgba(0, 229, 153, 0.25)',
        border: '1px solid rgba(0, 229, 153, 0.3)',
        background: '#0a0f12',
        ...style,
      }}
    >
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
          <linearGradient id="breBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f171b" />
            <stop offset="50%" stopColor="#0a0f12" />
            <stop offset="100%" stopColor="#05080a" />
          </linearGradient>

          <linearGradient id="breMint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffa3" />
            <stop offset="50%" stopColor="#00e599" />
            <stop offset="100%" stopColor="#00b875" />
          </linearGradient>

          <linearGradient id="breGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Base Obsidian Carbon Badge */}
        <rect width="512" height="512" rx="112" fill="url(#breBg)" />

        {/* Outer Mint Border */}
        <rect
          x="12"
          y="12"
          width="488"
          height="488"
          rx="100"
          stroke="url(#breMint)"
          strokeWidth="10"
          strokeOpacity="0.4"
        />

        {/* Dynamic Athletic Winged 'B' Emblem */}
        <g transform="translate(18, 10)">
          {/* Main Spine Column */}
          <path
            d="M136 100 C136 88 146 78 158 78 L192 78 C204 78 214 88 214 100 L214 412 C214 424 204 434 192 434 L158 434 C146 434 136 424 136 412 Z"
            fill="url(#breMint)"
          />

          {/* Upper Athletic Wing / Counter */}
          <path
            d="M214 88 L316 88 C368 88 404 116 404 168 C404 218 368 248 316 248 L214 248 Z"
            fill="url(#breMint)"
            stroke="url(#breGold)"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          {/* Inner Cutout Upper */}
          <path
            d="M260 136 L308 136 C328 136 344 148 344 168 C344 188 328 200 308 200 L260 200 Z"
            fill="#0a0f12"
          />

          {/* Lower Speed Wing / Sweep */}
          <path
            d="M214 242 L332 242 C386 242 424 274 424 330 C424 390 384 424 326 424 L214 424 Z"
            fill="url(#breMint)"
            stroke="url(#breGold)"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          {/* Inner Cutout Lower */}
          <path
            d="M260 290 L318 290 C340 290 358 306 358 332 C358 358 340 374 318 374 L260 374 Z"
            fill="#0a0f12"
          />

          {/* Precision Laser Diagonal Slit Lines (Athletic Cut) */}
          <polygon points="120,240 435,240 415,260 120,260" fill="#0a0f12" />
          <polygon points="120,236 440,236 438,242 120,242" fill="url(#breGold)" opacity="0.8" />

          {/* Aerodynamic Forward Chevrons / Feather Wings */}
          <path
            d="M400 130 L452 144 C458 146 458 154 452 156 L400 170 Z"
            fill="url(#breGold)"
          />
          <path
            d="M410 180 L468 196 C474 198 474 206 468 208 L410 224 Z"
            fill="url(#breMint)"
          />
          <path
            d="M416 235 L480 254 C486 256 486 264 480 266 L416 285 Z"
            fill="url(#breMint)"
          />
        </g>
      </svg>
    </div>
  );
}
