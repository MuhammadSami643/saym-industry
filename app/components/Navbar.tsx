import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-1px' }}>
          <Link href="/">ZYPFIT</Link>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/manufacturing">Manufacturing Process</Link>
          <Link href="/private-label">Private Label</Link>
          <Link href="/products">Product Catalog</Link>
        </nav>
        <div>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </div>
    </header>
  );
}
