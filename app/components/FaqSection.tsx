"use client";

import { useState } from 'react';
import { FaqItem, GLOBAL_FAQS } from '../lib/faqs';

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  categoryBadge?: string;
  items?: FaqItem[];
  backgroundColor?: string;
}

export default function FaqSection({
  title = "Private Label Activewear Manufacturing FAQs",
  subtitle = "Common questions asked by international apparel buyers, startups and established brands.",
  categoryBadge,
  items = GLOBAL_FAQS,
  backgroundColor = "#ffffff"
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section
      className="faq-section-shared faq-section-premium"
      style={{
        background: backgroundColor,
        padding: '64px 0',
        borderTop: '1px solid var(--border)'
      }}
    >
      <div className="container" style={{ maxWidth: '920px' }}>
        {categoryBadge && (
          <span
            style={{
              background: 'var(--brand-orange-light)',
              color: 'var(--brand-orange-dark)',
              fontWeight: 800,
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'inline-block',
              marginBottom: '10px'
            }}
          >
            {categoryBadge}
          </span>
        )}

        <h2 style={{ textAlign: 'left', marginBottom: '8px', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}>
          {title}
        </h2>

        {subtitle && (
          <p className="muted" style={{ margin: '0 0 28px', fontSize: '15px' }}>
            {subtitle}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Automatic Google Rich Snippets FAQPage Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: items.map(item => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer
                  }
                }))
              })
            }}
          />

          {items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
                style={{
                  width: '100%',
                  background: isOpen ? '#ffffff' : '#f8fafc',
                  border: isOpen ? '1px solid var(--brand-orange, #f59e0b)' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  boxShadow: isOpen ? '0 6px 20px rgba(245, 158, 11, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '18px 20px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: isOpen ? 'var(--brand-orange-dark, #c57608)' : 'var(--text-main, #0f172a)',
                      lineHeight: 1.45,
                      flex: 1,
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="faq-icon"
                    aria-hidden="true"
                    style={{
                      width: '28px',
                      height: '28px',
                      minWidth: '28px',
                      borderRadius: '50%',
                      background: isOpen ? 'var(--brand-orange, #f59e0b)' : 'rgba(0, 0, 0, 0.06)',
                      color: isOpen ? '#ffffff' : '#64748b',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 800,
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    {isOpen ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div
                    className="faq-answer"
                    style={{
                      padding: '0 20px 20px 20px',
                      borderTop: '1px solid rgba(245, 158, 11, 0.15)',
                      paddingTop: '14px',
                    }}
                  >
                    <p
                      className="muted"
                      style={{
                        margin: 0,
                        fontSize: '14.5px',
                        lineHeight: 1.75,
                        color: '#475569',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
