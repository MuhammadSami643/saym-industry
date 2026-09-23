import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--secondary-color)', borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>ZYPFIT</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Private label activewear manufacturer in Sialkot, Pakistan. Low MOQ orders, premium fabrics and worldwide shipping.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Company</h4>
          <Link href="/about-us" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>About ZYPFIT</Link>
          <Link href="/manufacturing" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manufacturing</Link>
          <Link href="/quality-control" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Quality Control</Link>
          <Link href="/shipping-export" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Shipping & Export</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Services</h4>
          <Link href="/private-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Private Label</Link>
          <Link href="/custom-activewear" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Custom Activewear</Link>
          <Link href="/sampling" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sampling</Link>
          <Link href="/products" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Products</Link>
        </div>
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Contact</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>WhatsApp: +92 337 6793383</p>
          <Link href="/contact" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Get a Quote</Link>
        </div>
      </div>
      <div className="container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} ZYPFIT. All rights reserved.
      </div>
    </footer>
  );
}
