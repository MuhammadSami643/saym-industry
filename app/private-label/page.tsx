export default function PrivateLabel() {
  return (
    <main className="section" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="section-title">Private Label Customization</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Develop custom fits, colors, panels, labels, hang tags, logo applications, packaging, and presentation under your own brand.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '2px' }}>Woven, printed, care, and size labels</li>
            <li style={{ padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '2px' }}>Screen print, heat transfer, sublimation, and embroidery</li>
            <li style={{ padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '2px' }}>Custom hang tags and barcode labels</li>
          </ul>
          
          <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '2px' }}>Branded poly bags and retail packaging</li>
            <li style={{ padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '2px' }}>Custom colors, panels, trims, and size ranges</li>
            <li style={{ padding: '1rem', backgroundColor: 'var(--secondary-color)', borderRadius: '2px' }}>Export carton markings and packing instructions</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
