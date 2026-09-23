import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Private Label Activewear Manufacturer</h1>
            <p className={styles.heroSubtitle}>
              Premium custom fitness and gym wear in Sialkot, Pakistan. Low MOQ, premium fabrics, and worldwide shipping for startups and established brands.
            </p>
            <div className={styles.heroActions}>
              <a href="/contact" className="btn-primary">Request a Quote</a>
              <a href="/manufacturing" className={styles.btnSecondary}>View Capabilities</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Categories Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Capabilities</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Fitness Wear</h3>
              <p>Cut-and-sew fitness apparel development, private labeling and bulk manufacturing for fitness brands.</p>
            </div>
            <div className={styles.card}>
              <h3>Sports Wear</h3>
              <p>Custom teamwear, jerseys, tracksuits, uniforms, and sublimation printing.</p>
            </div>
            <div className={styles.card}>
              <h3>Boxing Wear</h3>
              <p>Custom boxing trunks, fight shorts, rash guards, and private label combat sports apparel.</p>
            </div>
            <div className={styles.card}>
              <h3>Streetwear</h3>
              <p>Hoodies, sweatshirts, relaxed bottoms, matching sets and jacket enquiries.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
