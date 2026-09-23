export default function Manufacturing() {
  return (
    <main className="section" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="section-title">Manufacturing Capabilities</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Get practical MOQ guidance, sampling support, and a production plan matched to your first or next collection.
        </p>

        <div style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Low MOQ Production</h3>
            <p style={{ color: 'var(--text-muted)' }}>Typical orders begin around 30 pieces per style. Selected straightforward products considered at 10-20 pieces depending on fabric, construction, colors, and branding.</p>
          </div>
          
          <div style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Structured Sampling</h3>
            <p style={{ color: 'var(--text-muted)' }}>Samples typically take 1-2 weeks after specifications are confirmed, subject to product complexity, materials, and branding.</p>
          </div>

          <div style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Strict Quality Control</h3>
            <p style={{ color: 'var(--text-muted)' }}>Measurements, stitching, decoration, labels, finishing, quantities, and packing are checked against approved specifications.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
