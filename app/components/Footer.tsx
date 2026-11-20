"use client";

import Link from 'next/link';
import { ArrowRightIcon } from './AdminIcons';
import BrandLogo from './BrandLogo';

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36M5.07 18.5h2.79v-8.37H5.07v8.37Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.511 2 2.016 6.496 2.016 12.016c0 1.953.564 3.784 1.543 5.334L2 22l4.816-1.523a9.98 9.98 0 0 0 5.215 1.539c5.52 0 10.016-4.496 10.016-10.016 0-5.52-4.496-10.016-10.016-10.016zm5.838 14.157c-.244.686-1.22 1.258-1.705 1.334-.457.072-1.047.104-3.375-.859-2.756-1.139-4.524-3.93-4.663-4.116-.134-.186-1.109-1.478-1.109-2.818 0-1.34.698-2.001.947-2.274.249-.272.545-.341.727-.341.182 0 .364.002.523.01.168.008.394-.064.616.471.228.55.776 1.895.845 2.034.068.139.114.301.023.483-.092.182-.138.295-.273.454-.136.159-.286.356-.408.477-.136.136-.279.284-.12.557.159.273.708 1.169 1.521 1.894 1.045.932 1.927 1.22 2.2 1.356.273.136.432.114.591-.068.16-.182.682-.796.864-1.069.182-.272.364-.227.614-.136.25.091 1.59.75 1.863.886.273.136.455.205.523.318.068.114.068.659-.176 1.345z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell" style={{ maxWidth: '1360px', padding: '58px 20px 24px' }}>
        <div className="footer-main">
          <div className="footer-brand-column">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <BrandLogo size={38} theme="dark" />
              <div className="footer-brand" style={{ margin: 0 }}>Bin Rasool Enterprises</div>
            </div>
            <p className="footer-copy">
              Private label activewear, fitness wear, sportswear and gym apparel manufacturing from Sialkot, Pakistan for startup brands and established international buyers.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/zypfit/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <LinkedInIcon size={18} />
              </a>
              <a href="https://www.instagram.com/zypfit_official" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                <FacebookIcon size={18} />
              </a>
              <a href="https://wa.me/923376793383" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <WhatsAppIcon size={18} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
                <YouTubeIcon size={18} />
              </a>
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
              <li><Link href="/linesheet">📄 2026 Line Sheet (PDF)</Link></li>
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
                <a href="mailto:sales@binrasoolenterprises.com">Sales: sales@binrasoolenterprises.com</a>
              </div>
              <div>
                <a href="mailto:info@binrasoolenterprises.com">General: info@binrasoolenterprises.com</a>
              </div>
              <div style={{ marginTop: '6px' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Request a manufacturing quote</span>
                  <ArrowRightIcon size={13} />
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
  );
}
