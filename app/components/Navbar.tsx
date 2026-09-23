"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-1px' }}>
          <Link href="/">ZYPFIT</Link>
        </div>
        
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about-us" onClick={() => setIsOpen(false)}>About Us</Link>
          
          <div className="dropdown">
            <Link href="/manufacturing" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setIsOpen(false)}>
              Manufacturing ▾
            </Link>
            <div className="dropdown-content">
              <Link href="/manufacturing" onClick={() => setIsOpen(false)}>Manufacturing Process</Link>
              <Link href="/private-label" onClick={() => setIsOpen(false)}>Private Label</Link>
              <Link href="/quality-control" onClick={() => setIsOpen(false)}>Quality Control</Link>
              <Link href="/sampling-process" onClick={() => setIsOpen(false)}>Sampling Process</Link>
            </div>
          </div>

          <div className="dropdown">
            <Link href="/products" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setIsOpen(false)}>
              Products ▾
            </Link>
            <div className="dropdown-content">
              <Link href="/products#fitness" onClick={() => setIsOpen(false)}>Fitness Wear</Link>
              <Link href="/products#sports" onClick={() => setIsOpen(false)}>Sports Wear</Link>
              <Link href="/products#boxing" onClick={() => setIsOpen(false)}>Boxing Wear</Link>
              <Link href="/products#streetwear" onClick={() => setIsOpen(false)}>Streetwear</Link>
              <Link href="/product-catalog" onClick={() => setIsOpen(false)}>Product Catalog</Link>
            </div>
          </div>

          <div className="dropdown">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              Locations ▾
            </span>
            <div className="dropdown-content">
              <Link href="/sportswear-manufacturer-pakistan" onClick={() => setIsOpen(false)}>Sportswear Manufacturer Pakistan</Link>
              <Link href="/fitness-wear-manufacturer-sialkot" onClick={() => setIsOpen(false)}>Fitness Wear Manufacturer Sialkot</Link>
              <Link href="/boxing-wear-manufacturer-pakistan" onClick={() => setIsOpen(false)}>Boxing Wear Manufacturer Pakistan</Link>
            </div>
          </div>

          <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-primary" style={{ display: 'inline-block' }}>Request a Quote</Link>
        </nav>
      </div>
    </header>
  );
}
