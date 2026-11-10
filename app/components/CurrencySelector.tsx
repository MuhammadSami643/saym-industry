"use client";

import { useCurrency, CURRENCIES, CurrencyCode } from '../lib/currency';

export default function CurrencySelector({ compact = false }: { compact?: boolean }) {
  const { currency, setCurrencyCode } = useCurrency();

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <select
        value={currency.code}
        onChange={e => setCurrencyCode(e.target.value as CurrencyCode)}
        aria-label="Select Currency"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: compact ? '4px 8px' : '6px 12px',
          fontSize: compact ? '12px' : '13px',
          fontWeight: 700,
          cursor: 'pointer',
          outline: 'none',
          appearance: 'auto'
        }}
      >
        {Object.values(CURRENCIES).map(c => (
          <option key={c.code} value={c.code} style={{ background: '#0b0b0d', color: '#fff' }}>
            {c.flag} {c.code} ({c.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}

