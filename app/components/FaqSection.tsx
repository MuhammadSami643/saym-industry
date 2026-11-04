"use client";

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    question: "What is the MOQ for private label activewear?",
    answer: "A typical starting MOQ is 50 pieces per style, depending on the fabric, colors, sizing, branding, and construction. The final MOQ is confirmed after the product brief is reviewed."
  },
  {
    question: "Can ZYPFIT manufacture custom activewear for startup brands?",
    answer: "Yes. ZYPFIT works with startup activewear brands and established businesses. Startup projects can begin with a focused range, sample approval, practical quantity planning, and private label branding before larger repeat orders."
  },
  {
    question: "Which activewear and gym wear products can you manufacture?",
    answer: "The product range includes leggings, sports bras, shorts, tops, T-shirts, tanks, hoodies, joggers, tracksuits, compression wear, teamwear, and related fitness apparel, subject to specification review."
  },
  {
    question: "What private label branding options are available?",
    answer: "Branding options include woven and printed labels, care and size labels, hang tags, screen printing, heat transfer, sublimation, embroidery, branded poly bags, retail packaging, and export carton markings."
  },
  {
    question: "Do you provide samples before bulk production?",
    answer: "Yes. Samples are used to review fit, measurements, fabric, construction, colors, labels, logo placement, and finishing before bulk production is approved."
  },
  {
    question: "How do you control activewear quality?",
    answer: "Quality checks cover measurements, stitching, stretch points, panels, trims, logo placement, labels, finishing, quantities, packing, and alignment with the approved sample or specifications."
  },
  {
    question: "Can you ship private label activewear worldwide?",
    answer: "Yes. ZYPFIT supports international buyers with export-ready packing and shipment coordination. Courier, air, and sea freight options can be discussed according to destination, order size, timing, and buyer preference."
  },
  {
    question: "What should I send to request an activewear manufacturing quote?",
    answer: "Send your product references or tech packs, estimated quantity, fabric direction, colors, size range, branding requirements, packaging needs, target price if available, and delivery country. Complete details help produce a more useful quote."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className="faq-section-shared faq-section-premium" style={{ background: '#fff', padding: '62px 0', borderTop: '1px solid #eee' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h2 style={{ textAlign: 'left', marginBottom: '26px' }}>Private Label Activewear Manufacturing FAQs</h2>
        <div>
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div className="faq-answer" style={{ display: isOpen ? 'block' : 'none' }}>
                  <p className="muted">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

