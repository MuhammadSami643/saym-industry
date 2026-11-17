"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, ArrowUpIcon } from './AdminIcons';

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
                  <Link href="/contact" style={{ color: 'var(--brand-orange)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span>Request a manufacturing quote</span>
                    <ArrowRightIcon size={14} />
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

      {/* Floating Back to Top Button (Bottom-Left) */}
      <button
        type="button"
        className={`back-to-top-fab ${showTopBtn ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUpIcon size={20} />
      </button>
    </>
  );
}
