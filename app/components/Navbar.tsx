"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import CurrencySelector from './CurrencySelector';
import { ArrowRightIcon } from './AdminIcons';
import BrandLogo from './BrandLogo';

function ChevronDownIcon({ className = "nav-chevron" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="9"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        display: 'inline-block',
        marginLeft: '5px',
        transition: 'transform 0.2s ease',
        flexShrink: 0,
      }}
    >
      <path d="M1 1L5 5L9 1" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active route indicators
  const isHome = pathname === '/';
  const isCompany = ['/about-us', '/manufacturing-process', '/manufacturing', '/private-label-manufacturing', '/private-label'].some(
    p => pathname === p || pathname?.startsWith(p + '/')
  );
  const isManufacturer = [
    '/sportswear-manufacturer',
    '/sportswear-manufacturer-pakistan',
    '/fitness-wear-manufacturer',
    '/fitness-wear-manufacturer-sialkot',
    '/boxing-wear-manufacturer',
    '/boxing-wear-manufacturer-pakistan',
    '/sportswear-manufacturer-exporter',
    '/boxing-gear-manufacturer',
    '/custom-hoodies',
    '/streetwear',
    '/fitness-wear',
    '/boxing-gear',
    '/mma-gear',
    '/tracksuits',
    '/sportswear',
    '/compression-wear',
    '/custom-jeans',
    '/product-catalog',
  ].some(p => pathname === p || pathname?.startsWith(p + '/'));
  const isTrackOrder = pathname === '/track-order';
  const isBlog = pathname === '/blog' || pathname?.startsWith('/blog/');
  const isContact = pathname === '/contact-us' || pathname === '/contact';

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
      <div className="container" style={{ maxWidth: '1360px', padding: '10px 24px' }}>
        <div className="navbar">
          {/* Logo & Brand: Fixed & Protected against overlap */}
          <div className="nav-left">
            <Link
              href="/"
              onClick={handleLinkClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <BrandLogo size={44} />
              <div style={{ lineHeight: 1.15, flexShrink: 0 }}>
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
              {/* Company Dropdown */}
              <div
                className={`nav-dropdown ${openDropdown === 'company' ? 'is-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`nav-trigger ${isCompany ? 'is-active' : ''}`}
                  type="button"
                  aria-expanded={openDropdown === 'company'}
                  onClick={(e) => handleDropdownClick('company', e)}
                >
                  Company <ChevronDownIcon />
                </button>
                <div className="dropdown-menu">
                  <Link href="/about-us" className={pathname === '/about-us' ? 'is-active' : ''} onClick={handleLinkClick}>About Us</Link>
                  <Link href="/manufacturing-process" className={pathname === '/manufacturing-process' || pathname === '/manufacturing' ? 'is-active' : ''} onClick={handleLinkClick}>Manufacturing Process</Link>
                  <Link href="/private-label-manufacturing" className={pathname === '/private-label-manufacturing' || pathname === '/private-label' ? 'is-active' : ''} onClick={handleLinkClick}>Private Label Services</Link>
                  <Link href="/order-sample" className={pathname === '/order-sample' ? 'is-active' : ''} onClick={handleLinkClick}>Order Sample Prototype (7-10 Days)</Link>
                </div>
              </div>

              {/* Factory Units Dropdown (With All Industrial Divisions & Production Lines) */}
              <div
                className={`nav-dropdown ${openDropdown === 'manufacturer' ? 'is-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('manufacturer')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`nav-trigger ${isManufacturer ? 'is-active' : ''}`}
                  type="button"
                  aria-expanded={openDropdown === 'manufacturer'}
                  onClick={(e) => handleDropdownClick('manufacturer', e)}
                >
                  Factory Units <ChevronDownIcon />
                </button>
                <div className="dropdown-menu dropdown-menu-wide" style={{ minWidth: '300px' }}>
                  <div style={{ padding: '6px 16px 4px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-orange-dark, #c2410c)' }}>
                    Specialized Manufacturing Plants
                  </div>
                  <Link href="/fitness-wear-manufacturer" className={pathname === '/fitness-wear-manufacturer' || pathname === '/fitness-wear-manufacturer-sialkot' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Activewear &amp; Fitness Plant
                  </Link>
                  <Link href="/sportswear-manufacturer" className={pathname === '/sportswear-manufacturer' || pathname === '/sportswear-manufacturer-pakistan' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Sportswear &amp; Teamwear Division
                  </Link>
                  <Link href="/boxing-wear-manufacturer" className={pathname === '/boxing-wear-manufacturer' || pathname === '/boxing-wear-manufacturer-pakistan' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Boxing &amp; Fight Gear Workshop
                  </Link>

                  <div style={{ margin: '8px 12px', borderTop: '1px solid #e2e8f0' }}></div>

                  <div style={{ padding: '6px 16px 4px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
                    Production Lines &amp; Capabilities
                  </div>
                  <Link href="/custom-hoodies" className={pathname === '/custom-hoodies' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Heavyweight Hoodies &amp; Fleece
                  </Link>
                  <Link href="/streetwear" className={pathname === '/streetwear' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Streetwear &amp; Outerwear
                  </Link>
                  <Link href="/fitness-wear" className={pathname === '/fitness-wear' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Gym &amp; Activewear
                  </Link>
                  <Link href="/boxing-gear-manufacturer" className={pathname === '/boxing-gear-manufacturer' || pathname === '/boxing-gear' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Boxing Gloves &amp; Fight Gear
                  </Link>
                  <Link href="/mma-gear" className={pathname === '/mma-gear' ? 'is-active' : ''} onClick={handleLinkClick}>
                    MMA, BJJ Gis &amp; Rashguards
                  </Link>
                  <Link href="/tracksuits" className={pathname === '/tracksuits' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Tracksuits &amp; Warmups
                  </Link>
                  <Link href="/sportswear" className={pathname === '/sportswear' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Sublimated Teamwear &amp; Kits
                  </Link>
                  <Link href="/compression-wear" className={pathname === '/compression-wear' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Compression &amp; Baselayers
                  </Link>
                  <Link href="/custom-jeans" className={pathname === '/custom-jeans' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Custom Denim &amp; Jeans
                  </Link>
                  <Link href="/private-label-manufacturing" className={pathname === '/private-label-manufacturing' || pathname === '/private-label' ? 'is-active' : ''} onClick={handleLinkClick}>
                    Private Label Trims &amp; Packaging
                  </Link>

                  <div style={{ margin: '8px 12px', borderTop: '1px solid #e2e8f0' }}></div>

                  <Link href="/product-catalog" className={pathname?.startsWith('/product-catalog') || pathname?.startsWith('/products') ? 'is-active' : ''} onClick={handleLinkClick} style={{ fontWeight: 800, color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span>Explore All Products Catalog</span>
                    <ArrowRightIcon size={13} />
                  </Link>
                </div>
              </div>

              <Link className={`nav-link ${pathname === '/order-sample' ? 'is-active' : ''}`} href="/order-sample" onClick={handleLinkClick}>
                Order Sample
              </Link>

              <Link className={`nav-link ${isTrackOrder ? 'is-active' : ''}`} href="/track-order" onClick={handleLinkClick}>
                Track Production
              </Link>

              <Link className={`nav-link ${isContact ? 'is-active' : ''}`} href="/contact-us" onClick={handleLinkClick}>
                Contact Us
              </Link>

              <div style={{ padding: '8px 12px' }} className="nav-mobile-currency">
                <CurrencySelector />
              </div>

              <Link className="btn btn-primary nav-mobile-cta" href="/contact-us" onClick={handleLinkClick}>
                Request a Quote
              </Link>
            </nav>
          </div>

          {/* Right Action */}
          <div className="nav-right">
            <CurrencySelector compact />
            <Link href="/contact-us" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px', minHeight: '38px', whiteSpace: 'nowrap' }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
