"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="site-header">
      <div className="container" style={{ maxWidth: '1320px', padding: '14px 14px' }}>
        <div className="navbar">
          {/* Logo & Brand */}
          <div className="nav-left">
            <Link href="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <img
                src="/images/site/1776250498_logo.webp"
                alt="ZYPFIT Logo"
                style={{ height: '62px', width: 'auto' }}
              />
              <div>
                <div className="nav-brand-title">ZYPFIT</div>
                <div className="nav-brand-sub">Fitness | Sports | Boxing</div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="nav-center">
            <button
              className="mobile-toggle"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              <span></span>
            </button>

            <nav className={`site-nav ${mobileOpen ? 'is-active' : ''}`} style={mobileOpen ? { display: 'flex' } : {}}>
              <Link className="nav-link" href="/" onClick={closeMenu}>
                Home
              </Link>

              {/* Company Dropdown */}
              <div className={`nav-dropdown ${openDropdown === 'company' ? 'is-open' : ''}`}>
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openDropdown === 'company'}
                  onClick={() => toggleDropdown('company')}
                >
                  Company <span className="chevron" aria-hidden="true"></span>
                </button>
                <div className="dropdown-menu">
                  <Link href="/about-us" onClick={closeMenu}>About Us</Link>
                  <Link href="/manufacturing" onClick={closeMenu}>Manufacturing Process</Link>
                  <Link href="/private-label" onClick={closeMenu}>Private Label</Link>
                </div>
              </div>

              {/* Manufacturer Pages Dropdown */}
              <div className={`nav-dropdown ${openDropdown === 'manufacturer' ? 'is-open' : ''}`}>
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openDropdown === 'manufacturer'}
                  onClick={() => toggleDropdown('manufacturer')}
                >
                  Manufacturer Pages <span className="chevron" aria-hidden="true"></span>
                </button>
                <div className="dropdown-menu">
                  <Link href="/sportswear-manufacturer-pakistan" onClick={closeMenu}>Sportswear Manufacturer Pakistan</Link>
                  <Link href="/fitness-wear-manufacturer-sialkot" onClick={closeMenu}>Fitness Wear Manufacturer Sialkot</Link>
                  <Link href="/boxing-wear-manufacturer-pakistan" onClick={closeMenu}>Boxing Wear Manufacturer Pakistan</Link>
                </div>
              </div>

              {/* Categories Dropdown */}
              <div className={`nav-dropdown ${openDropdown === 'categories' ? 'is-open' : ''}`}>
                <button
                  className="nav-trigger"
                  type="button"
                  aria-expanded={openDropdown === 'categories'}
                  onClick={() => toggleDropdown('categories')}
                >
                  Categories <span className="chevron" aria-hidden="true"></span>
                </button>
                <div className="dropdown-menu">
                  <Link href="/fitness-wear-manufacturer" onClick={closeMenu}>Fitness Wear</Link>
                  <Link href="/sportswear-manufacturer-exporter" onClick={closeMenu}>Sports Wear</Link>
                  <Link href="/boxing-gear-manufacturer-bulk" onClick={closeMenu}>Boxing Wear</Link>
                  <Link href="/streetwear-manufacturer-pakistan" onClick={closeMenu}>Streetwear</Link>
                  <Link href="/products" onClick={closeMenu}>Product Catalog</Link>
                </div>
              </div>

              <Link className="nav-link" href="/blog" onClick={closeMenu}>
                Blog
              </Link>
              <Link className="nav-link" href="/contact" onClick={closeMenu}>
                Contact
              </Link>
              <Link className="nav-link" href="/admin" onClick={closeMenu} style={{ opacity: 0.75, fontSize: '13px' }}>
                Admin
              </Link>
              
              <Link className="btn btn-primary nav-mobile-cta" href="/contact" onClick={closeMenu}>
                Request a Quote
              </Link>
            </nav>
          </div>

          {/* Right Action */}
          <div className="nav-right">
            <Link href="/contact" className="btn btn-primary">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
