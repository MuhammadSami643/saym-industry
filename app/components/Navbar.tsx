import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-1px' }}>
          <Link href="/">ZYPFIT</Link>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500, alignItems: 'center' }}>
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          
          <div className="dropdown">
            <Link href="/manufacturing" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Manufacturing ▾
            </Link>
            <div className="dropdown-content">
              <Link href="/manufacturing">Manufacturing Process</Link>
              <Link href="/private-label">Private Label</Link>
              <Link href="/quality-control">Quality Control</Link>
              <Link href="/sampling-process">Sampling Process</Link>
            </div>
          </div>

          <div className="dropdown">
            <Link href="/products" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Products ▾
            </Link>
            <div className="dropdown-content">
              <Link href="/products#fitness">Fitness Wear</Link>
              <Link href="/products#sports">Sports Wear</Link>
              <Link href="/products#boxing">Boxing Wear</Link>
              <Link href="/products#streetwear">Streetwear</Link>
              <Link href="/product-catalog">Product Catalog</Link>
            </div>
          </div>

          <div className="dropdown">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              Locations ▾
            </span>
            <div className="dropdown-content">
              <Link href="/sportswear-manufacturer-pakistan">Sportswear Manufacturer Pakistan</Link>
              <Link href="/fitness-wear-manufacturer-sialkot">Fitness Wear Manufacturer Sialkot</Link>
              <Link href="/boxing-wear-manufacturer-pakistan">Boxing Wear Manufacturer Pakistan</Link>
            </div>
          </div>

          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </div>
    </header>
  );
}
