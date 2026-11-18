"use client";

import { useState } from 'react';

interface FactoryStation {
  id: string;
  name: string;
  tagline: string;
  image: string;
  icon: string;
  machines: string;
  dailyCapacity: string;
  personnel: string;
  keyHighlights: string[];
  description: string;
  qaFocus: string;
}

const FACTORY_STATIONS: FactoryStation[] = [
  {
    id: 'cutting',
    name: 'CAD Grading & Fabric Cutting Table',
    tagline: 'Station 01 &bull; Automated Pattern Plotting & Laser-Precision Fabric Spreading',
    image: '/images/site/1776612585_manufacturing-cutting-image.webp',
    icon: '✂️',
    machines: 'Eastman CNC Automated Cloth Spreaders & High-Ply Knife Cutters',
    dailyCapacity: '4,500 Garment Units / Day',
    personnel: '8 Master Pattern Cutters & CAD Technicians',
    keyHighlights: [
      'Digitized CAD grading across XS through 5XL with 0.5mm precision',
      'Automated fabric tension-free relaxation prior to cutting (prevents garment shrinkage)',
      'Grainline laser alignment for heavy French terry, fleece, and raw denim'
    ],
    description: 'Every production batch starts with digital CAD pattern grading. Fabrics are unrolled on 40-foot vacuum tables and allowed to rest to eliminate roll tension, ensuring that cut panels match tech pack sizing measurements 100%.',
    qaFocus: 'Zero-tolerance cross-ply measurement audit before sewing allocation.'
  },
  {
    id: 'stitching',
    name: 'Industrial Sewing & Flatlock Assembly Lines',
    tagline: 'Station 02 &bull; 4-Needle 6-Thread Flatlock & Reinforced Seam Construction',
    image: '/images/site/1776612585_manufacturing-stitching-image.webp',
    icon: '🧵',
    machines: 'Juki & Siruba High-Speed Overlocks, Yamato Flatseamers, Brother Single-Needle',
    dailyCapacity: '3,800 Finished Units / Day',
    personnel: '42 Skilled Apparel Artisans & Line Supervisors',
    keyHighlights: [
      'Chafe-free 4-needle 6-thread flatlock seams for seamless gym leggings & activewear',
      'Twin-needle coverstitch hems and reinforced bar-tacks at stress points',
      'Heavyweight 3-thread overlock with cotton core-spun threads for luxury hoodies'
    ],
    description: 'Our stitching floor is configured in specialized cell pods dedicated to specific fabric types. Experienced operators run high-torque industrial machinery calibrated specifically for high-stretch nylon-spandex, heavy fleece, or rigid selvedge denim.',
    qaFocus: 'In-line stitch density audit (10-12 stitches per inch) and tensile pull testing.'
  },
  {
    id: 'branding',
    name: 'Private Label Custom Branding & Print Floor',
    tagline: 'Station 03 &bull; 3D High-Density Puff, Screen Printing & Computerized Embroidery',
    image: '/images/site/1776612585_manufacturing-designing-image.webp',
    icon: '🎨',
    machines: 'Tajima & Barudan 12-Color Embroidery Carousels, Automatic MHM Screen Presses',
    dailyCapacity: '5,000 Logo Impressions / Day',
    personnel: '12 Graphic Pre-Press Technicians & Color Masters',
    keyHighlights: [
      'Eco-friendly OEKO-TEX certified water-based, plastisol, and 3D puff screen print inks',
      'Raised high-density matte silicone heat transfers with extreme wash durability',
      'Metallic and lurex embroidery threads with soft backing for skin comfort'
    ],
    description: 'We bring custom brand identities to life. From subtle tonal woven neck tags to eye-catching 3D puff graphics on streetwear hoodies and fight trunks, our branding studio executes Pantone-accurate color matching on all fabric substrates.',
    qaFocus: 'Spectrophotometer Pantone shade verification and 50-cycle accelerated wash testing.'
  },
  {
    id: 'qc',
    name: 'AQL 2.5 Quality Inspection & Stress Lab',
    tagline: 'Station 04 &bull; Independent Quality Audits, Thread Trimming & GSM Verification',
    image: '/images/site/1776612585_manufacturing-checking-image.webp',
    icon: '🔍',
    machines: 'Fabric Digital GSM Scales, Seam Burst Testers, Color Fastness Light Booths',
    dailyCapacity: '100% Comprehensive Batch Inspection',
    personnel: '9 Certified Quality Inspectors & Auditors',
    keyHighlights: [
      'Comprehensive 4-point fabric inspection system and pre-shrinkage verification',
      'Full measurement audit against buyer tech pack grading tolerance (±0.5 cm)',
      '100% needle-detector scanning to ensure absolute safety for export consignments'
    ],
    description: 'Quality is not inspected at the very end—it is audited at every phase. Our independent QA department operates isolated from production managers, ensuring that only garments meeting ISO 9001 and international buyer standards move to packaging.',
    qaFocus: 'Zero defect tolerance for stitch skips, color bleed, or sizing discrepancies.'
  },
  {
    id: 'packing',
    name: 'Steam Pressing, Packaging & Export Dispatch',
    tagline: 'Station 05 &bull; Industrial Steam Tunnel, Custom Hangtags & Air Freight Dispatch',
    image: '/images/site/1776612585_manufacturing-packing-image.webp',
    icon: '📦',
    machines: 'Veit Industrial Vacuum Pressing Tables, Automated Heat-Sealing Polybaggers',
    dailyCapacity: '6,000 Packed Units / Day',
    personnel: '10 Packaging & Export Logistics Handlers',
    keyHighlights: [
      'Biodegradable frosted zipper polybags with custom brand logos and barcode labels',
      'Custom embossed hangtags with branded cotton strings and safety seals',
      'Heavy-duty 7-ply double-wall export master cartons with waterproof inner liners'
    ],
    description: 'Finished garments pass through high-pressure steam finishing to give the fabric a pristine retail-ready handfeel. Items are folded, tagged, bagged, and boxed according to carton assortment breakdowns ready for air cargo dispatch via DHL, FedEx, or sea container freight.',
    qaFocus: 'Gross/Net weight verification, barcode scan accuracy, and moisture control packs.'
  }
];

export default function FactoryVirtualTour() {
  const [activeStation, setActiveStation] = useState<FactoryStation>(FACTORY_STATIONS[0]);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const whatsappTourLink = `https://wa.me/923376793383?text=${encodeURIComponent(
    `Hello Bin Rasool Enterprises, I would like to schedule a 1-on-1 live WhatsApp video tour of your Sialkot factory floor (specifically regarding ${activeStation.name}).`
  )}`;

  return (
    <section style={{ background: '#0b101a', color: '#ffffff', padding: '80px 16px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background glow */}
      <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '350px', background: 'radial-gradient(ellipse at center, rgba(243,166,38,0.12), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(243,166,38,0.15)', border: '1px solid rgba(243,166,38,0.4)', color: 'var(--brand-orange, #f3a626)', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
            Direct Sialkot Factory Floor &bull; In-House Production Only
          </div>

          <h2 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 16px', color: '#ffffff', lineHeight: 1.2 }}>
            Interactive Factory Floor &amp; Production Tour
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '780px', margin: '0 auto', lineHeight: 1.6 }}>
            International brands partner with Bin Rasool Enterprises because we are an authentic, in-house manufacturer in Sialkot, Pakistan. Explore our specialized production stations from raw fabric spreading to final export carton dispatch.
          </p>
        </div>

        {/* Station Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '32px', scrollbarWidth: 'none' }}>
          {FACTORY_STATIONS.map((station, idx) => {
            const isSelected = activeStation.id === station.id;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => setActiveStation(station)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid var(--brand-orange, #f3a626)' : '1px solid rgba(255,255,255,0.1)',
                  background: isSelected ? 'rgba(243,166,38,0.15)' : 'rgba(255,255,255,0.04)',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <span style={{ fontSize: '18px' }}>{station.icon}</span>
                <span>Station 0{idx + 1}: {station.name.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Main Station Showcase Card */}
        <div
          style={{
            background: 'rgba(23, 34, 53, 0.75)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.12)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
          }}
        >
          {/* Left: Visual Stage with live overlay */}
          <div style={{ position: 'relative', minHeight: '380px', background: '#000000', overflow: 'hidden' }}>
            <img
              src={activeStation.image}
              alt={activeStation.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.88,
                transition: 'transform 0.6s ease'
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,16,26,0.3) 0%, rgba(11,16,26,0.9) 100%)' }} />

            {/* Live Camera Badge */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#fff' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
              Facility Cam &bull; Sialkot Unit 01
            </div>

            {/* Play Tour Button */}
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                style={{
                  background: 'rgba(243,166,38,0.95)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '50%',
                  width: '68px',
                  height: '68px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(243,166,38,0.6)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                aria-label="Play Facility Video Tour"
              >
                <span style={{ fontSize: '26px', marginLeft: '4px' }}>▶</span>
              </button>
            </div>

            {/* Caption on image */}
            <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
              <div style={{ fontSize: '12px', color: 'var(--brand-orange, #f3a626)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {activeStation.tagline}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
                {activeStation.name}
              </div>
            </div>
          </div>

          {/* Right: Technical Specifications & Department Data */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#cbd5e1', margin: '0 0 20px' }}>
                {activeStation.description}
              </p>

              {/* Station Metrics Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>Machinery Calibrated</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{activeStation.machines}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>Throughput Capacity</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#22c55e', marginTop: '2px' }}>{activeStation.dailyCapacity}</div>
                </div>
              </div>

              {/* Key Highlights */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--brand-orange, #f3a626)', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '10px' }}>
                  Engineering Highlights:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeStation.keyHighlights.map((hl, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#e2e8f0' }}>
                      <span style={{ color: 'var(--brand-orange, #f3a626)', fontWeight: 900 }}>✓</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QA Protocol */}
              <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#86efac', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>🛡️</span>
                <span><strong>QA Mandate:</strong> {activeStation.qaFocus}</span>
              </div>
            </div>

            {/* Direct Factory WhatsApp Video Call CTA */}
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>Verify Our Factory Before You Order</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Book a 1-on-1 live WhatsApp video tour with our Lead Production Engineer.</div>
              </div>

              <a
                href={whatsappTourLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#22c55e',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '13px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(34,197,94,0.35)'
                }}
              >
                <span>📹</span> Schedule Live WhatsApp Video Tour ➔
              </a>
            </div>
          </div>
        </div>

        {/* Global Factory Capabilities Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '36px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--brand-orange, #f3a626)' }}>100,000+</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>Monthly Garment Output</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Fleece, Jersey, Denim &amp; Performance</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff' }}>65+</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>Industrial Sewing Machines</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Juki, Siruba &amp; Flatlock Systems</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#22c55e' }}>AQL 2.5</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>Strict Inspection Standard</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Pre-shipment measurement audits</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#38bdf8' }}>100%</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>In-House Sialkot Plant</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Zero middleman markups</div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', maxWidth: '800px', width: '100%', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>
                Bin Rasool Enterprises &bull; Live Manufacturing Showcase
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '4px 8px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
                title="Bin Rasool Enterprises Factory Tour"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div style={{ padding: '20px', background: '#0b101a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                Want to see specific active orders or cutting lines? Our production managers do live video calls daily.
              </div>
              <a
                href={whatsappTourLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#22c55e', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}
              >
                Book WhatsApp Video Tour ➔
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

