export default function Contact() {
  return (
    <main className="section" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title">Request a Quote</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Send your product references or tech packs, estimated quantity, fabric direction, colors, size range, branding requirements, packaging needs, target price if available, and delivery country.
        </p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--secondary-color)', padding: '3rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
            <input type="text" id="name" style={{ padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '2px' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" id="email" style={{ padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="details" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Project Details (Quantity, Fabric, etc.)</label>
            <textarea id="details" rows={6} style={{ padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '2px', resize: 'vertical' }}></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>
            Submit Inquiry
          </button>
        </form>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Or contact us directly via WhatsApp:</p>
          <a href="https://wa.me/923376793383" target="_blank" style={{ display: 'inline-block', marginTop: '1rem', fontWeight: 600, color: '#25D366' }}>
            +92 337 6793383
          </a>
        </div>
      </div>
    </main>
  );
}
