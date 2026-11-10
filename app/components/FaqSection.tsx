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
  subtitle = "Common questions asked by international apparel buyers, startups, and established brands.",
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

        <div>
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
              <div key={idx} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                >
                  <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {faq.question}
                  </span>
                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className="faq-answer" style={{ display: isOpen ? 'block' : 'none', paddingBottom: '18px' }}>
                  <p className="muted" style={{ margin: 0, fontSize: '15px', lineHeight: 1.75 }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
