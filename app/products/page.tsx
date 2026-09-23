export default function Products() {
  return (
    <main className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h1 className="section-title">Product Catalog</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '800px' }}>
          Browse our extensive catalog of high-quality activewear. 
          <em> (Note: These products will be dynamically loaded from the database once connected.)</em>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Placeholder Product 1 */}
          <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '4px' }}>
            <div style={{ backgroundColor: 'var(--secondary-color)', height: '200px', width: '100%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Image Placeholder
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Slim Fit Gym Joggers</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Premium quality slim fit gym joggers manufactured for fitness brands.</p>
            <a href="/contact" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Inquire Now</a>
          </div>

          {/* Placeholder Product 2 */}
          <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '4px' }}>
            <div style={{ backgroundColor: 'var(--secondary-color)', height: '200px', width: '100%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Image Placeholder
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Custom Sports Bra</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Develop sports bras and matching sets around support and fit.</p>
            <a href="/contact" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Inquire Now</a>
          </div>
          
          {/* Placeholder Product 3 */}
          <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '4px' }}>
            <div style={{ backgroundColor: 'var(--secondary-color)', height: '200px', width: '100%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Image Placeholder
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Oversized Streetwear Hoodie</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Heavyweight cotton fleece hoodies for your streetwear brand.</p>
            <a href="/contact" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Inquire Now</a>
          </div>
        </div>
      </div>
    </main>
  );
}
