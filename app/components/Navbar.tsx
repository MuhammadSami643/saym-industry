"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import CurrencySelector from './CurrencySelector';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Window resize resets mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hover handlers with debounce
  const handleMouseEnter = (name: string) => {
    if (window.innerWidth <= 960) return; // On mobile, strictly click-based
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 960) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  // Toggle on click
  const handleDropdownClick = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(prev => prev === name ? null : name);
  };

  // Close everything when any link inside a dropdown or menu is clicked
  const handleLinkClick = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <header className="site-header" ref={navRef}>
      <div className="container" style={{ maxWidth: '1360px', padding: '10px 16px' }}>
        <div className="navbar">
          {/* Logo & Brand: Fixed & Protected against overlap */}
          <div className="nav-left">
            <Link
              href="/"
              onClick={handleLinkClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                minWidth: 'max-content'
              }}
            >
              <img
                src="/images/site/1776250498_logo.webp"
                alt="Bin Rasool Enterprises Logo"
                style={{ height: '42px', width: 'auto', display: 'block' }}
              />
              <div style={{ lineHeight: 1.15 }}>
                <div className="nav-brand-title">Bin Rasool Enterprises</div>
                <div className="nav-brand-sub">Sialkot &bull; Custom Manufacturer</div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="nav-center">
            {/* Mobile Toggle Button */}
            <button
              className="mobile-toggle"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              <span></span>
            </button>

            <nav className={`site-nav ${mobileOpen ? 'is-active' : ''}`}>
              <Link className="nav-link" href="/" onClick={handleLinkClick}>
                Home
              </Link>

              {/* Company Dropdown */}
              <div
                className={`nav-dropdown ${openDropdown === 'company' ? 'is-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openDropdown === 'company'}
                  onClick={(e) => handleDropdownClick('company', e)}
                >
                  Company <span className="chevron" aria-hidden="true"></span>
                </button>
                <div className="dropdown-menu">
                  <Link href="/about-us" onClick={handleLinkClick}>About Us</Link>
                  <Link href="/manufacturing" onClick={handleLinkClick}>Manufacturing Process</Link>
                  <Link href="/private-label" onClick={handleLinkClick}>Private Label Services</Link>
                </div>
              </div>

              {/* Manufacturer Pages Dropdown */}
              <div
                className={`nav-dropdown ${openDropdown === 'manufacturer' ? 'is-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('manufacturer')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openDropdown === 'manufacturer'}
                  onClick={(e) => handleDropdownClick('manufacturer', e)}
                >
                  Manufacturer Pages <span className="chevron" aria-hidden="true"></span>
                </button>
                <div className="dropdown-menu">
                  <Link href="/sportswear-manufacturer-pakistan" onClick={handleLinkClick}>Sportswear Manufacturer Pakistan</Link>
                  <Link href="/fitness-wear-manufacturer-sialkot" onClick={handleLinkClick}>Fitness Wear Manufacturer Sialkot</Link>
                  <Link href="/boxing-wear-manufacturer-pakistan" onClick={handleLinkClick}>Boxing Wear Manufacturer Pakistan</Link>
                </div>
              </div>

              {/* Categories Dropdown */}
              <div
                className={`nav-dropdown ${openDropdown === 'categories' ? 'is-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('categories')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openDropdown === 'categories'}
                  onClick={(e) => handleDropdownClick('categories', e)}
                >
                  Categories <span className="chevron" aria-hidden="true"></span>
                </button>
                <div className="dropdown-menu">
                  <Link href="/fitness-wear" onClick={handleLinkClick}>Fitness &amp; Activewear</Link>
                  <Link href="/sportswear" onClick={handleLinkClick}>Sports Wear &amp; Teamwear</Link>
                  <Link href="/tracksuits" onClick={handleLinkClick}>Tracksuits &amp; Warmups</Link>
                  <Link href="/boxing-gear" onClick={handleLinkClick}>Boxing &amp; Martial Arts</Link>
                  <Link href="/compression-wear-manufacturer-pakistan" onClick={handleLinkClick}>Compression &amp; Baselayers</Link>
                  <Link href="/streetwear" onClick={handleLinkClick}>Streetwear &amp; Outerwear</Link>
                  <Link href="/custom-hoodies" onClick={handleLinkClick}>Hoodies &amp; Sweatshirts</Link>
                  <Link href="/custom-jeans" onClick={handleLinkClick}>Jeans &amp; Denim</Link>
                  <Link href="/products" onClick={handleLinkClick} style={{ fontWeight: 700, color: 'var(--brand-orange-dark, #c57608)' }}>All Products Catalog →</Link>
                </div>
              </div>

              <Link className="nav-link" href="/get-quote" onClick={handleLinkClick} style={{ color: 'var(--brand-orange-dark, #c57608)', fontWeight: 800 }}>
                Instant RFQ
              </Link>

              <Link className="nav-link" href="/track-order" onClick={handleLinkClick}>
                Track Order
              </Link>

              <Link className="nav-link" href="/blog" onClick={handleLinkClick}>
                Blog
              </Link>

              <Link className="nav-link" href="/contact" onClick={handleLinkClick}>
                Contact
              </Link>

              <div style={{ padding: '8px 12px' }} className="nav-mobile-currency">
                <CurrencySelector />
              </div>
              
              <Link className="btn btn-primary nav-mobile-cta" href="/get-quote" onClick={handleLinkClick}>
                Get Instant Quote
              </Link>
            </nav>
          </div>

          {/* Right Action */}
          <div className="nav-right">
            <CurrencySelector compact />
            <Link href="/get-quote" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px', minHeight: '38px', whiteSpace: 'nowrap' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
