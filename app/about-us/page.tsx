export default function AboutUs() {
  return (
    <main className="section" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title">About ZYPFIT</h1>
        <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Build premium custom activewear with a low MOQ private label manufacturer in Sialkot, Pakistan. We help startups and growing fitness brands with sampling, custom branding, performance fabrics, and worldwide shipping.
          </p>
          <p>
            Good manufacturing is not only the garment that leaves the production line. It is the quality of the decisions made before sampling, the control maintained during bulk production, and the accuracy of the order that reaches your market.
          </p>
          <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: 'var(--secondary-color)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: 600 }}>Why manufacture activewear in Pakistan?</h3>
            <p style={{ fontSize: '1rem' }}>
              Pakistan has a mature textile and apparel supply base, while Sialkot has built an international reputation around export sports goods, performance clothing, teamwear, and specialist garment production. Working with an activewear manufacturer in Pakistan can give buyers access to skilled cutting, stitching, decoration, packing, and export knowledge within a commercially competitive production environment.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
