"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 220);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="site-footer">
        <div className="container footer-shell">
          <div className="footer-main">
            <div className="footer-brand-column">
              <div className="footer-brand">Bin Rasool Enterprises</div>
              <p className="footer-copy">
                Private label activewear, fitness wear, sportswear, and gym apparel manufacturing from Sialkot, Pakistan for startup brands and established international buyers.
              </p>
              <div className="footer-social">
                <a href="https://www.linkedin.com/company/zypfit/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.instagram.com/zypfit_official" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>

            <div>
              <p className="footer-title">Company</p>
              <ul className="footer-list">
                <li><Link href="/about-us">About Bin Rasool Enterprises</Link></li>
                <li><Link href="/manufacturing">Manufacturing</Link></li>
                <li><Link href="/about-us#quality">Quality Control</Link></li>
                <li><Link href="/about-us#shipping">Shipping &amp; Export</Link></li>
                <li><Link href="/blog">Insights</Link></li>
              </ul>
            </div>

            <div>
              <p className="footer-title">Services</p>
              <ul className="footer-list">
                <li><Link href="/private-label">Private Label</Link></li>
                <li><Link href="/fitness-wear">Custom Activewear</Link></li>
                <li><Link href="/linesheet" style={{ color: 'var(--brand-orange)', fontWeight: 700 }}>📄 2026 Line Sheet (PDF)</Link></li>
                <li><Link href="/private-label#low-moq">Low MOQ Production</Link></li>
                <li><Link href="/manufacturing#sampling">Sampling</Link></li>
                <li><Link href="/products">Product Catalog</Link></li>
              </ul>
            </div>

            <div>
              <p className="footer-title">Contact</p>
              <div className="footer-contact">
                <div>Sialkot, Pakistan</div>
                <div>
                  <a href="https://wa.me/923376793383" target="_blank" rel="noopener noreferrer">
                    WhatsApp: +92 337 6793383
                  </a>
                </div>
                <div>
                  <a href="tel:+923376793383">Call: +92 337 6793383</a>
                </div>
                <div>
                  <a href="mailto:info@binrasoolenterprises.com">Email: info@binrasoolenterprises.com</a>
                </div>
                <div>
                  <Link href="/contact" style={{ color: 'var(--brand-orange)', fontWeight: 700 }}>
                    Request a manufacturing quote →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Bin Rasool Enterprises. All rights reserved.</span>
            <span>Private label manufacturing for international activewear brands.</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="floating-actions" aria-label="Quick Actions">
        <button
          type="button"
          className={`back-to-top-fab ${showTopBtn ? 'is-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>

        <a
          href="https://wa.me/923376793383"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-fab"
          aria-label="Contact Bin Rasool Enterprises on WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>
    </>
  );
}
