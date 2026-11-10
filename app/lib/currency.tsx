"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // against 1 USD
  name: string;
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar', flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro', flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound', flag: '🇬🇧' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Australian Dollar', flag: '🇦🇺' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.36, name: 'Canadian Dollar', flag: '🇨🇦' }
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
  convertPrice: (usdAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: CURRENCIES.USD,
  setCurrencyCode: () => {},
  formatPrice: (amt) => `$${amt.toFixed(2)}`,
  convertPrice: (amt) => amt
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bre_preferred_currency') as CurrencyCode | null;
      if (saved && CURRENCIES[saved]) {
        setCurrencyCodeState(saved);
      }
    } catch {
      // ignore in environments without localStorage
    }
  }, []);

  const setCurrencyCode = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyCodeState(code);
      try {
        localStorage.setItem('bre_preferred_currency', code);
      } catch {}
    }
  };

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const convertPrice = (usdAmount: number) => {
    return usdAmount * currency.rate;
  };

  const formatPrice = (usdAmount: number) => {
    const converted = convertPrice(usdAmount);
    return `${currency.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyCode, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

