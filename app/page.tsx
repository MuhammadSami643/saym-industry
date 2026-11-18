import Link from 'next/link';
import HeroSlider from './components/HeroSlider';
import FaqSection from './components/FaqSection';
import FactoryVirtualTour from './components/FactoryVirtualTour';

export default function Home() {
  return (
    <div className="home-page">
      {/* 1. Hero Section with Interactive Background Slides */}
      <HeroSlider />

      {/* 2-15. Middle Sections (Proof Strip, Categories, Capabilities, Process, etc.) */}
      <div className="proof-strip">
        <div className="container">
            <div className="proof-grid">
                <div className="proof-item"><strong>From 50 Pieces</strong><span>Typical MOQ per style, confirmed after the product brief is reviewed.</span></div>
                <div className="proof-item"><strong>1-2 Week Samples</strong><span>Typical planning range after specifications are confirmed.</span></div>
                <div className="proof-item"><strong>4-5 Week Production</strong><span>Typical bulk range after sample and order approval.</span></div>
                <div className="proof-item"><strong>Private Label Ready</strong><span>Labels, hang tags, logos, packaging and carton markings.</span></div>
                <div className="proof-item"><strong>Multiple Branding Methods</strong><span>Print, heat transfer, sublimation and embroidery options.</span></div>
                <div className="proof-item"><strong>International Markets</strong><span>Export support for the USA, UK, Europe and buyers worldwide.</span></div>
            </div>
        </div>
    </div>

    <section className="section">
        <div className="container">
            <div className="home-section-head">
                <div>
                    <span className="home-kicker">Why choose Bin Rasool Enterprises</span>
                    <h2>A manufacturing partner built around commercial clarity</h2>
                </div>
                <p className="muted">Good manufacturing is not only the garment that leaves the production line. It is the quality of the decisions made before sampling, the control maintained during bulk production and the accuracy of the order that reaches your market.</p>
            </div>
            <div className="trust-grid">
                <Link href="/low-moq-activewear-manufacturer" className="trust-card" style={{ textDecoration: 'none', display: 'block' }}>
                    <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Low MOQ Production</span>
                        <span style={{ fontSize: '14px', color: 'var(--brand-orange)' }}>&rarr;</span>
                    </h3>
                    <p className="muted">Typical orders can begin around 50 pieces per style, depending on fabric, construction, colors and branding.</p>
                </Link>
                <Link href="/activewear-manufacturer-for-startups" className="trust-card" style={{ textDecoration: 'none', display: 'block' }}>
                    <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Startup-Friendly Planning</span>
                        <span style={{ fontSize: '14px', color: 'var(--brand-orange)' }}>&rarr;</span>
                    </h3>
                    <p className="muted">We help new brands control SKU count, sample carefully and protect working capital instead of pushing an oversized opening order.</p>
                </Link>
                <Link href="/private-label-activewear-manufacturer" className="trust-card" style={{ textDecoration: 'none', display: 'block' }}>
                    <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Private Label Customization</span>
                        <span style={{ fontSize: '14px', color: 'var(--brand-orange)' }}>&rarr;</span>
                    </h3>
                    <p className="muted">Develop custom fits, colors, panels, labels, hang tags, logo applications, packaging and presentation under your own brand.</p>
                </Link>
                <article className="trust-card">
                    <h3>Premium Performance Fabrics</h3>
                    <p className="muted">Choose materials around stretch, recovery, opacity, moisture handling, durability, hand feel, activity and target price.</p>
                </article>
                <article className="trust-card">
                    <h3>Structured Sampling</h3>
                    <p className="muted">Samples typically take 1-2 weeks after specifications are confirmed, subject to product complexity, materials and branding.</p>
                </article>
                <article className="trust-card">
                    <h3>Worldwide Export Support</h3>
                    <p className="muted">Remote approvals, export packing, documentation coordination and courier, air, or sea shipment planning for international markets.</p>
                </article>
                <article className="trust-card">
                    <h3>Strict Quality Control</h3>
                    <p className="muted">Measurements, stitching, decoration, labels, finishing, quantities and packing are checked against approved specifications.</p>
                </article>
            </div>
        </div>
    </section>

    <section className="section" style={{ 'background': 'var(--bg-light)' }}>
        <div className="container">
            <div className="real-trust">
                <div>
                    <span className="home-kicker">Production accountability</span>
                    <h2>Built for Real Manufacturing</h2>
                    <p className="home-lead">A credible production partner should make the process visible. Bin Rasool Enterprises keeps product requirements, approvals, quality checks and export preparation connected so buyers know what is being made and what will be checked before dispatch.</p>
                </div>
                <div className="real-trust-list">
                    <article className="real-trust-item">
                        <span className="real-trust-icon">01</span>
                        <div>
                            <strong>CAD Pattern Precision &amp; Automated Spreading</strong>
                            <p className="muted">Eastman automated CNC cloth spreaders and knife cutters maintain exact &plusmn;0.5mm pattern tolerance across digital sizing XS to 5XL.</p>
                        </div>
                    </article>
                    <article className="real-trust-item">
                        <span className="real-trust-icon">02</span>
                        <div>
                            <strong>Pre-Production Sample Approval</strong>
                            <p className="muted">Physical prototypes delivered in 7–10 days with complete measurement spec sheets, fabric swatches and trim approval cards.</p>
                        </div>
                    </article>
                    <article className="real-trust-item">
                        <span className="real-trust-icon">03</span>
                        <div>
                            <strong>AQL 2.5 Industrial Quality Audit</strong>
                            <p className="muted">Full dimensional inspection, stitching pull-strength testing, seam elasticity verification and Grade 4+ wash fastness.</p>
                        </div>
                    </article>
                    <article className="real-trust-item">
                        <span className="real-trust-icon">04</span>
                        <div>
                            <strong>Metal &amp; Needle Detection Clearance</strong>
                            <p className="muted">100% individual garment and carton scanning through calibrated magnetic needle detectors for international customs compliance.</p>
                        </div>
                    </article>
                    <article className="real-trust-item">
                        <span className="real-trust-icon">05</span>
                        <div>
                            <strong>Global Logistics &amp; Export Incoterms</strong>
                            <p className="muted">FOB Karachi handling, formal dry port customs clearing, and scheduled DHL / FedEx Priority air cargo door-to-door delivery.</p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <section className="section dark-section">
        <div className="container">
            <div className="home-section-head">
                <div>
                    <span className="home-kicker">Who we work with</span>
                    <h2>Manufacturing support matched to your buying model</h2>
                </div>
                <p className="muted">A startup founder, gym operator, wholesale importer and established fitness label do not need the same order strategy. We shape the conversation around how you sell, the risk you can carry and what your customer expects.</p>
            </div>
            <div className="audience-grid">
                                    <article className="audience-card">
                        <h3>Startup Activewear Brands</h3>
                        <p className="muted">Launch a focused first collection with lower-volume planning, sample guidance and branding support before scaling inventory.</p>
                    </article>
                                    <article className="audience-card">
                        <h3>Established Fitness Brands</h3>
                        <p className="muted">Develop new categories, refresh existing products and plan repeat production with clearer specifications and order continuity.</p>
                    </article>
                                    <article className="audience-card">
                        <h3>Gym Chains and Studios</h3>
                        <p className="muted">Create staff apparel, member merchandise, retail capsules and coordinated gym wear with consistent brand presentation.</p>
                    </article>
                                    <article className="audience-card">
                        <h3>Fitness Influencers</h3>
                        <p className="muted">Turn an audience-led concept into a credible product drop with samples suitable for fit review, content creation and launch preparation.</p>
                    </article>
                                    <article className="audience-card">
                        <h3>Wholesalers and Importers</h3>
                        <p className="muted">Source export-ready activewear, fitness wear and sportswear with commercial packing and market-specific order planning.</p>
                    </article>
                                    <article className="audience-card">
                        <h3>Online Fitness Retailers</h3>
                        <p className="muted">Build private label products for e-commerce with size identification, barcode labels, branded packaging and replenishment potential.</p>
                    </article>
                            </div>
        </div>
    </section>

    <section className="section" id="categories" style={{ 'background': 'var(--bg-light)' }}>
        <div className="container">
            <div className="home-section-head">
                <div>
                    <span className="home-kicker">Product range</span>
                    <h2>Activewear and gym wear we manufacture</h2>
                </div>
                <p className="muted">Build a focused first collection or expand an established range with coordinated fabrics, colors, branding and packaging.</p>
            </div>
            <div className="home-card-grid">
                <a href="/fitness-wear" className="home-card category-card" aria-label="Explore Fitness Wear manufacturing">
                    <img src="/images/categories/1776540259_fitness-wear.webp" alt="Private label fitness wear manufacturer in Sialkot Pakistan" loading="lazy" decoding="async" />
                    <div className="category-card-body">
                        <h3>Fitness &amp; Activewear</h3>
                        <p className="muted">Cut-and-sew fitness apparel development, private labeling and bulk manufacturing for fitness brands.</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '0 0 16px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>75/25 Nylon Spandex</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>4-Needle Flatlock</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>240 GSM Squat-Proof</span>
                        </div>
                        <span className="card-action">Explore Fitness Wear &rarr;</span>
                    </div>
                </a>
                <a href="/sportswear" className="home-card category-card" aria-label="Explore Sports Wear manufacturing">
                    <img src="/images/categories/1776540279_sports-wear.webp" alt="Custom sportswear manufacturer and wholesale supplier in Sialkot Pakistan" loading="lazy" decoding="async" />
                    <div className="category-card-body">
                        <h3>Sports Wear &amp; Teamwear</h3>
                        <p className="muted">Sublimated team jerseys, club tracksuits and athletic uniforms engineered for professional durability.</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '0 0 16px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>Italian Sublimation Inks</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>Moisture-Wicking Poly</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>Reinforced Seams</span>
                        </div>
                        <span className="card-action">Explore Sports Wear &rarr;</span>
                    </div>
                </a>
                <a href="/boxing-gear" className="home-card category-card" aria-label="Explore Boxing Wear manufacturing">
                    <img src="/images/categories/1776540301_boxing-wear.webp" alt="Custom boxing wear and fight gear manufacturer in Sialkot Pakistan" loading="lazy" decoding="async" />
                    <div className="category-card-body">
                        <h3>Boxing &amp; Combat Gear</h3>
                        <p className="muted">Competition sparring gloves, trunks, rashguards and custom fight kits tested for impact resistance.</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '0 0 16px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>1.2mm Full-Grain Leather</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>Multi-Layer Latex Foam</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>Anatomical Thumb Lock</span>
                        </div>
                        <span className="card-action">Explore Boxing Gear &rarr;</span>
                    </div>
                </a>
                <a href="/streetwear" className="home-card category-card" aria-label="Explore Streetwear manufacturing">
                    <img src="/images/categories/1789894942_streetwear.webp" alt="Bin Rasool Enterprises branded oversized hoodie, baggy sweatpants and varsity jacket in a colorful studio" loading="lazy" decoding="async" />
                    <div className="category-card-body">
                        <h3>Streetwear &amp; Hoodies</h3>
                        <p className="muted">Cut-and-sew heavyweight luxury streetwear, acid wash tees and drop-shoulder hoodies for fashion labels.</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '0 0 16px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>380–500 GSM French Terry</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>100% Combed Cotton</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px' }}>High-Density 3D Puff</span>
                        </div>
                        <span className="card-action">Explore Streetwear &rarr;</span>
                    </div>
                </a>
            </div>
            <div style={{ 'marginTop': '26px' }}>
                <a href="/categories" className="btn btn-dark">Browse All Product Categories</a>
            </div>
        </div>
    </section>

    <section className="section">
        <div className="container">
            <div className="home-section-head">
                <div>
                    <span className="home-kicker">Factory capabilities</span>
                    <h2>Custom activewear manufacturing built around your specifications</h2>
                </div>
                <p className="muted">The production route is defined by your product, target market, quantity, fabric, performance needs and brand presentation.</p>
            </div>
            <div className="home-card-grid">
                                    <article className="home-card">
                        <span className="home-card-number">01</span>
                        <h3>Product Development</h3>
                        <p className="muted">Reference samples, tech packs, measurements, fit direction, size ranges, trims and construction details reviewed before sampling.</p>
                    </article>
                                    <article className="home-card">
                        <span className="home-card-number">02</span>
                        <h3>Cut-and-Sew Production</h3>
                        <p className="muted">Pattern preparation, cutting, stitching, finishing and repeat-order planning for activewear, gym wear and fitness apparel.</p>
                    </article>
                                    <article className="home-card">
                        <span className="home-card-number">03</span>
                        <h3>Custom Branding</h3>
                        <p className="muted">Woven labels, care labels, size labels, hang tags, logo applications, branded packaging and carton markings.</p>
                    </article>
                                    <article className="home-card">
                        <span className="home-card-number">04</span>
                        <h3>Performance Decoration</h3>
                        <p className="muted">Screen printing, heat transfer, sublimation and embroidery selected around the garment, fabric and end use.</p>
                    </article>
                                    <article className="home-card">
                        <span className="home-card-number">05</span>
                        <h3>Quality Control</h3>
                        <p className="muted">Checks for measurements, stitching, logo placement, labels, finishing, packing and approved order specifications.</p>
                    </article>
                                    <article className="home-card">
                        <span className="home-card-number">06</span>
                        <h3>Export Order Support</h3>
                        <p className="muted">Production updates, export-ready packing, shipping coordination and documentation support for international buyers.</p>
                    </article>
                            </div>
            <div style={{ 'marginTop': '28px' }}>
                <a href="/manufacturing" className="btn btn-primary">Explore Manufacturing Capabilities</a>
            </div>
        </div>
    </section>

    <section className="section">
        <div className="container">
            <div className="fabric-layout">
                <div>
                    <span className="home-kicker">Fabrics and performance</span>
                    <h2>Fabric options selected for fit, function and target price</h2>
                    <p className="home-lead">
                        Fabric choice affects stretch, recovery, opacity, moisture handling, hand feel, print compatibility and cost. We discuss suitable constructions and blends against your product brief instead of forcing one material across every style.
                    </p>
                    <p className="muted">
                        Brands that need original silhouettes, product-specific fit, custom panels, or more technical construction can review our <a className="context-link" href="/custom-activewear-manufacturer">custom activewear manufacturer</a> capabilities. For complete garment labels, tags, packaging and brand presentation, see our <a className="context-link" href="/private-label">private label manufacturing</a> process.
                    </p>
                    <ul className="fabric-list">
                                                    <li>Polyester and spandex performance blends</li>
                                                    <li>Nylon and spandex activewear blends</li>
                                                    <li>Interlock, jersey, mesh and dry-fit fabrics</li>
                                                    <li>Cotton and cotton-blend jersey</li>
                                                    <li>Fleece and French terry for layers</li>
                                                    <li>Compression and stretch fabrics</li>
                                            </ul>
                </div>
                <aside className="branding-panel">
                    <span className="home-kicker">Your brand, finished properly</span>
                    <h3>Private label and custom branding options</h3>
                    <ul>
                        <li>Woven, printed, care and size labels</li>
                        <li>Screen print, heat transfer, sublimation and embroidery</li>
                        <li>Custom hang tags and barcode labels</li>
                        <li>Branded poly bags and retail packaging</li>
                        <li>Custom colors, panels, trims and size ranges</li>
                        <li>Export carton markings and packing instructions</li>
                    </ul>
                    <a href="/private-label" className="btn btn-dark" style={{ 'marginTop': '24px' }}>View Private Label Services</a>
                </aside>
            </div>
        </div>
    </section>

    <section className="section" style={{ 'background': 'var(--bg-light)' }}>
        <div className="container">
            <div className="pakistan-layout">
                <div className="pakistan-copy">
                    <span className="home-kicker">Manufacturing location</span>
                    <h2>Why manufacture activewear in Pakistan?</h2>
                    <p>
                        Pakistan has a mature textile and apparel supply base, while Sialkot has built an international reputation around export sports goods, performance clothing, teamwear and specialist garment production. Working with an <strong>activewear manufacturer in Pakistan</strong> can give buyers access to skilled cutting, stitching, decoration, packing and export knowledge within a commercially competitive production environment.
                    </p>
                    <p>
                        As a <strong>fitness wear manufacturer in Sialkot</strong>, Bin Rasool Enterprises combines that regional production experience with direct B2B communication. Cost efficiency matters, but it should not come from removing the steps that protect fit and quality. The stronger advantage is the ability to align product development, labor skill, branding, quality checks and export preparation around one approved specification.
                    </p>
                    <p>
                        Buyers sourcing broader teamwear and performance categories can also explore our work as a <a className="context-link" href="/sportswear-manufacturer-pakistan">sportswear manufacturer in Pakistan</a>. The right sourcing decision should balance product capability, sample quality, responsiveness, lead time and landed cost rather than comparing unit price alone.
                    </p>
                </div>
                <div className="pakistan-points">
                    <div className="pakistan-point"><strong>Manufacturing Expertise</strong><span className="muted">Experience across activewear, fitness wear, sportswear, gym apparel, teamwear and related performance categories.</span></div>
                    <div className="pakistan-point"><strong>Skilled Production</strong><span className="muted">Pattern, cutting, stitching, decoration, finishing and packing capabilities suited to custom apparel programs.</span></div>
                    <div className="pakistan-point"><strong>Export Infrastructure</strong><span className="muted">Commercial packing and shipment coordination for brands, importers, wholesalers and online retailers abroad.</span></div>
                    <div className="pakistan-point"><strong>Cost Efficiency</strong><span className="muted">Competitive production economics that can support margin planning without positioning quality as optional.</span></div>
                    <div className="pakistan-point"><strong>Material Access</strong><span className="muted">Discussion across performance knits, stretch blends, jersey, mesh, fleece, French terry and compression fabrics.</span></div>
                    <div className="pakistan-point"><strong>Premium Quality Focus</strong><span className="muted">Sample approval and specification-led checks designed to support consistent fit, branding and presentation.</span></div>
                </div>
            </div>
        </div>
    </section>

    {/* Interactive Live Factory Virtual Tour */}
    <FactoryVirtualTour />

    <section className="section" style={{ 'background': 'var(--bg-light)' }}>
        <div className="container">
            <div className="home-section-head">
                <div>
                    <span className="home-kicker">Commercial Workflow</span>
                    <h2>From tech pack &amp; prototype to bulk export</h2>
                </div>
                <p className="muted">A transparent approval path with defined milestones: prototype sign-off, grading verification, and AQL 2.5 pre-shipment inspection.</p>
            </div>
            <div className="process-grid">
                <article className="process-card">
                    <h3>01. Product Brief &amp; Sourcing</h3>
                    <p className="muted">Share your tech packs or physical samples with target GSM, fabric compositions, colors, and order volumes for accurate FOB cost breakdown.</p>
                </article>
                <article className="process-card">
                    <h3>02. Scope &amp; Commercial Terms</h3>
                    <p className="muted">Confirm production feasibility, 50-piece low MOQs, custom trim schedules, sample fees, and scheduled delivery timelines.</p>
                </article>
                <article className="process-card">
                    <h3>03. 7–10 Day Proto Sampling</h3>
                    <p className="muted">Review physical fit samples, custom neck tags, stitch tension, and embroidery/print positioning before bulk cut authorization.</p>
                </article>
                <article className="process-card">
                    <h3>04. Bulk Production &amp; QC</h3>
                    <p className="muted">Eastman CNC cutting, 4-needle flatlock assembly, in-line tension checks, and 100% needle-detector scanning under one roof.</p>
                </article>
                <article className="process-card">
                    <h3>05. Export Packaging &amp; Dispatch</h3>
                    <p className="muted">Industrial steam tunnel pressing, custom polybagging, carton markings, and express air (DHL/FedEx) or ocean cargo dispatch.</p>
                </article>
            </div>
            <div style={{ 'marginTop': '28px' }}>
                <a href="/get-quote" className="btn btn-primary" style={{ marginRight: '12px' }}>Request Sample Quote</a>
                <a href="/sampling-process" className="btn btn-dark">Review Sampling Process</a>
            </div>
        </div>
    </section>

    <section className="section">
        <div className="container">
            <div className="quality-layout">
                <div>
                    <span className="home-kicker">Quality control</span>
                    <h2>Production checks tied to approved specifications</h2>
                    <p className="home-lead">
                        Quality is managed through clear product requirements, sample approval, production checks and final presentation review. The objective is consistency across sizing, construction, branding and packing, not a vague inspection at the end.
                    </p>
                    <a href="/quality-control" className="btn btn-dark" style={{ 'marginTop': '18px' }}>See Our Quality Control Process</a>
                </div>
                <div className="quality-checks">
                    <div className="quality-check"><strong>Measurements and sizing</strong><span className="muted">Key garment measurements reviewed against approved specifications.</span></div>
                    <div className="quality-check"><strong>Stitching and construction</strong><span className="muted">Seams, stretch points, panels, trims and finishing checked for consistency.</span></div>
                    <div className="quality-check"><strong>Branding and appearance</strong><span className="muted">Logo placement, labels, colors, decoration and overall presentation reviewed.</span></div>
                    <div className="quality-check"><strong>Packing and order accuracy</strong><span className="muted">Sizes, quantities, tags, poly bags and carton markings checked before dispatch.</span></div>
                </div>
            </div>
        </div>
    </section>

    <section className="section dark-section">
        <div className="container">
            <div className="buyer-split">
                <div>
                    <span className="home-kicker">Worldwide shipping</span>
                    <h2>Export-ready activewear production for international brands</h2>
                </div>
                <div className="buyer-card">
                    <p className="home-lead">
                        Bin Rasool Enterprises supports buyers outside Pakistan with remote sample approvals, production communication, export packing and shipment planning. Courier, air, or sea freight options can be discussed according to order size, destination, timing and buyer preference.
                    </p>
                    <div style={{ 'display': 'flex', 'gap': '10px', 'flexWrap': 'wrap', 'marginTop': '24px' }}>
                        <a href="/shipping-export" className="btn btn-primary">View Shipping and Export Support</a>
                        <a href="/contact" className="btn btn-outline" style={{ 'borderColor': 'rgba(255,255,255,.35)', 'color': '#fff' }}>Discuss Your Destination</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

            <section className="section">
            <div className="container">
                <div className="home-section-head">
                    <div>
                        <span className="home-kicker">Manufacturing examples</span>
                        <h2>Explore private label product options</h2>
                    </div>
                    <a href="/products" className="btn btn-dark">Browse All Products</a>
                </div>
                <div className="home-card-grid">
                                            <a href="/fitness-wear-manufacturer/joggers/slim-fit-gym-joggers" className="home-card product-card" aria-label="View Slim Fit Gym Joggers">
                                                            <img src="/images/products/1780565647_slim-fit-gym-joggers.webp" alt="Custom Slim Fit Gym Joggers Manufacturer in Sialkot Bulk Order" loading="lazy" decoding="async" />
                                                        <div className="product-card-body">
                                                                    <span className="card-tag">Joggers</span>
                                                                <h3>Slim Fit Gym Joggers</h3>
                                <p className="muted">Premium quality slim fit gym joggers manufactured for fitness brands, wholesalers and private label buyers. Available in custom fabrics, colors, branding and bulk production options.</p>
                                <span className="card-action">View Product Details</span>
                            </div>
                        </a>
                                    </div>
            </div>
        </section>
    
    <section className="section" style={{ 'background': 'var(--bg-light)' }}>
        <div className="container">
            <div className="home-section-head">
                <div>
                    <span className="home-kicker">Choose the right production route</span>
                    <h2>Activewear manufacturing support by buyer need</h2>
                </div>
                <p className="muted">Use these focused guides to compare launch quantities, custom development and product-specific manufacturing requirements.</p>
            </div>
            <div className="link-grid">
                <a className="intent-link" href="/low-moq-activewear-manufacturer"><strong>Low MOQ Activewear Manufacturer</strong><span>Plan smaller first orders and test focused product ranges.</span></a>
                <a className="intent-link" href="/activewear-manufacturer-for-startups"><strong>Activewear Manufacturer for Startups</strong><span>Understand sampling, branding and launch-stage production.</span></a>
                <a className="intent-link" href="/custom-activewear-manufacturer"><strong>Custom Activewear Manufacturer</strong><span>Develop products around your specifications and brand direction.</span></a>
                <a className="intent-link" href="/private-label-gym-wear-manufacturer"><strong>Private Label Gym Wear Manufacturer</strong><span>Source branded workout apparel and coordinated gym wear ranges.</span></a>
                <a className="intent-link" href="/custom-leggings-manufacturer"><strong>Custom Leggings Manufacturer</strong><span>Review fit, fabric, waistband, sizing and branding considerations.</span></a>
                <a className="intent-link" href="/custom-sports-bra-manufacturer"><strong>Custom Sports Bra Manufacturer</strong><span>Develop sports bras and matching sets around support and fit.</span></a>
            </div>
        </div>
    </section>

    <section className="section">
        <div className="container">
            <div className="home-cta">
                <div>
                    <span className="home-kicker">Start your manufacturing inquiry</span>
                    <h2>Get a quote for your private label activewear collection</h2>
                    <p>Send your product references or tech packs, quantity, fabric direction, size range, branding needs and delivery country. We will help you assess MOQ, sampling and the most practical production route.</p>
                </div>
                <div className="home-cta-actions">
                    <a href="/contact" className="btn btn-primary">Request a Quote</a>
                    <a href="https://wa.me/923376793383" className="btn btn-outline" target="_blank" rel="noopener" data-track-location="home_cta">Chat on WhatsApp</a>
                    <span className="cta-microcopy">Startup-friendly consultation. No oversized opening-order pressure.</span>
                </div>
            </div>
        </div>
    </section>

      {/* 16. Interactive Accordion FAQ Section */}
      <FaqSection />
    </div>
  );
}
