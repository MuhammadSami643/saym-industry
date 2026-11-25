"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRightIcon } from './AdminIcons';
import BrandLogo from './BrandLogo';

interface SpecData {
  badge: string;
  title: string;
  moqBadge: string;
  moqText: string;
  leadBadge: string;
  leadText: string;
  techBadge: string;
  techText: string;
  logisticsBadge: string;
  logisticsText: string;
}

function getCategorySpecs(pathname: string): SpecData {
  const p = (pathname || '').toLowerCase();

  // 1. Country: USA
  if (p.includes('-usa')) {
    return {
      badge: "USA Export Division • Sialkot to United States",
      title: "Bin Rasool Enterprises — USA B2B Apparel Sourcing & Export Specifications",
      moqBadge: "50 Pieces / Style",
      moqText: "Tailored for US DTC brands, fitness gyms, Amazon FBA sellers and sports clubs.",
      leadBadge: "7–10d DHL Express to USA",
      leadText: "Door-to-door delivery with live tracking to New York, California, Texas, Florida and all 50 states.",
      techBadge: "US Sizing & Care Compliance",
      techText: "FTC-compliant satin labels, English care icons, RN/CA labeling support and frosted polybags.",
      logisticsBadge: "DDP Air & Ocean Freight",
      logisticsText: "Customs clearance handled. Priority air cargo (4-6 days) or cost-effective ocean freight.",
    };
  }

  // 2. Country: UK
  if (p.includes('-uk')) {
    return {
      badge: "UK Export Division • Sialkot to United Kingdom",
      title: "Bin Rasool Enterprises — UK Clothing Brands Sourcing & Export Specifications",
      moqBadge: "50 Pieces / Style",
      moqText: "Accessible opening runs for UK streetwear labels, gymwear boutiques and independent brands.",
      leadBadge: "7–10d DHL/FedEx to UK",
      leadText: "Direct air freight into London Heathrow and Manchester with 3-5 business days transit.",
      techBadge: "UK Sizing & Standards",
      techText: "UK/EU metric grading, OEKO-TEX certified reactive dyes and 50D damask woven neck labels.",
      logisticsBadge: "Zero Port Delay Customs",
      logisticsText: "Formal export paperwork, EUR1 / REX origin documentation and scheduled courier dispatch.",
    };
  }

  // 3. Country: Australia
  if (p.includes('-australia') || p.includes('australia')) {
    return {
      badge: "Australia Export Division • Sialkot to Sydney & Melbourne",
      title: "Bin Rasool Enterprises — Australia Activewear Brands Sourcing & Export Specifications",
      moqBadge: "50 Pieces / Style",
      moqText: "Startup-friendly opening runs for Australian gymwear, surf lifestyle and streetwear labels.",
      leadBadge: "8–10d DHL/FedEx to Australia",
      leadText: "Direct air cargo into Sydney, Melbourne, Brisbane and Perth with fast customs entry.",
      techBadge: "UPF 50+ & Breathable Knits",
      techText: "Lightweight moisture-wicking fabrics, flatlock seams and Southern Hemisphere seasonal drop planning.",
      logisticsBadge: "Australia Customs & GST Entry",
      logisticsText: "Formal export paperwork, direct air cargo or FCL ocean freight to all Australian ports.",
    };
  }

  // 4. Country: South Africa
  if (p.includes('-south-africa') || p.includes('south-africa') || p.includes('southafrica')) {
    return {
      badge: "South Africa Export Division • Sialkot to Johannesburg & Cape Town",
      title: "Bin Rasool Enterprises — South Africa Activewear & Sportswear Manufacturing Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Accessible opening runs for South African fitness brands, gym chains and rugby clubs.",
      leadBadge: "7–10d DHL to South Africa",
      leadText: "Express air transit into OR Tambo (JNB) & Cape Town (CPT) with live international tracking.",
      techBadge: "UPF 50+ & High-Tensile Seams",
      techText: "Breathable moisture-wicking knits, squat-proof interlock, 4-needle flatlock & rugby-strength plackets.",
      logisticsBadge: "SARS Customs & Express Cargo",
      logisticsText: "Formal export paperwork, direct air cargo to Johannesburg/Cape Town & sea freight to Durban port.",
    };
  }

  // 4. Country: Germany
  if (p.includes('-germany') || p.includes('germany')) {
    return {
      badge: "Germany Export Division • Sialkot to Frankfurt & Hamburg",
      title: "Bin Rasool Enterprises — Germany B2B Sportbekleidung Manufacturing Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Präzisionsfertigung for German fitness brands, CrossFit boxes and European sports clubs.",
      leadBadge: "7–10d DHL Express to Germany",
      leadText: "Fast customs clearance via Frankfurt Hub with 3-4 days DHL Express door delivery across Germany.",
      techBadge: "DIN Standards & OEKO-TEX",
      techText: "Azo-free certified reactive dyes, German metric grading and strict dimensional wash stability.",
      logisticsBadge: "EU REACH & Direct Customs",
      logisticsText: "Direct delivery to Berlin, Munich, Hamburg, Frankfurt with complete EUR1/REX documentation.",
    };
  }

  // 5. Country: France
  if (p.includes('-france') || p.includes('france')) {
    return {
      badge: "France Export Division • Sialkot to Paris & Lyon",
      title: "Bin Rasool Enterprises — France Vêtements de Sport Manufacturing Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Tailored for French premium streetwear, fitness couture and combat martial arts gyms.",
      leadBadge: "7–10d DHL Express to France",
      leadText: "Priority air freight into Paris Charles de Gaulle with door delivery across all French regions.",
      techBadge: "French Sizing & Luxury Trims",
      techText: "French anthropometric grading, 50D high-density woven damask labels and custom frosted packaging.",
      logisticsBadge: "EU Customs & Express Transit",
      logisticsText: "Direct delivery to Paris, Lyon, Marseille with full EU compliance certifications.",
    };
  }

  // 6. Country: Netherlands
  if (p.includes('-netherlands') || p.includes('netherlands')) {
    return {
      badge: "Netherlands Export Division • Sialkot to Amsterdam & Rotterdam",
      title: "Bin Rasool Enterprises — Netherlands Activewear Sourcing & Export Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Built for Dutch sportswear distributors, e-commerce sellers and combat fight gyms.",
      leadBadge: "7–10d Express to Netherlands",
      leadText: "Direct courier via Amsterdam Schiphol or maritime container freight via Port of Rotterdam.",
      techBadge: "Tall-Fit Grading & Interlock",
      techText: "Calibrated for Northern European tall body dimensions, squat-proof 280 GSM interlock knits.",
      logisticsBadge: "European Logistics Gateway",
      logisticsText: "Fast customs clearance through Schiphol with door-to-door distribution across the Benelux.",
    };
  }

  // 7. Country: Italy
  if (p.includes('-italy') || p.includes('italy')) {
    return {
      badge: "Italy Export Division • Sialkot to Milan & Rome",
      title: "Bin Rasool Enterprises — Italy Sportswear & Fight Gear Manufacturing Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Crafted for Italian fitness labels, fight gyms and motorsports teamwear collections.",
      leadBadge: "7–10d DHL Express to Italy",
      leadText: "Direct priority shipping into Milan Malpensa & Rome Fiumicino airports with full tracking.",
      techBadge: "Italian Sublimation Inks",
      techText: "Vibrant fade-proof Italian sublimation inks, ergonomic tailoring and soft-hand feel performance fabrics.",
      logisticsBadge: "EU Compliant Direct Freight",
      logisticsText: "Scheduled door-to-door delivery across Milan, Rome, Turin and Northern Italy industrial hubs.",
    };
  }

  // 8. Country: Spain
  if (p.includes('-spain') || p.includes('spain')) {
    return {
      badge: "Spain Export Division • Sialkot to Madrid & Barcelona",
      title: "Bin Rasool Enterprises — Spain Ropa Deportiva Manufacturing Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Designed for Spanish gym chains, padel/tennis clubs and coastal activewear brands.",
      leadBadge: "7–10d DHL Express to Spain",
      leadText: "Express air transit into Madrid Barajas & Barcelona El Prat airports with fast customs handling.",
      techBadge: "Airflow Mesh & UPF Protection",
      techText: "High-airflow dry-fit polyesters, vibrant sublimated kits and durable 3D silicone heat transfer logos.",
      logisticsBadge: "Mediterranean Trade Logistics",
      logisticsText: "Direct customs clearance and rapid door-to-door delivery across Madrid, Barcelona and Valencia.",
    };
  }

  // 9. Country: General Europe
  if (p.includes('-europe') || p.includes('europe')) {
    return {
      badge: "European Union Export Division • Sialkot to Europe",
      title: "Bin Rasool Enterprises — EU Apparel Brands Sourcing & Export Specifications",
      moqBadge: "50 Pieces / Style",
      moqText: "Built for EU fitness brands, multi-country distributors and private label retailers.",
      leadBadge: "7–10d DHL Express to Europe",
      leadText: "Express courier to Germany, France, Netherlands, Italy, Spain, Sweden and all EU nations.",
      techBadge: "EU REACH Compliant Dyes",
      techText: "Azo-free certified dyeing, eco-friendly water-based inks and multi-language care labels.",
      logisticsBadge: "Direct EU Freight Hubs",
      logisticsText: "Direct handling via Frankfurt & Amsterdam hubs with full customs clearing assistance.",
    };
  }

  // 10. Startups & Low MOQ Program
  if (p.includes('startup') || p.includes('low-moq')) {
    return {
      badge: "Startup Launch Program • Sialkot Factory",
      title: "Bin Rasool Enterprises — Startup Apparel Brand Manufacturing Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Low opening capital commitment. Split across standard sizes (XS–3XL) with zero startup penalty.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Step-by-step sample fitting and pre-production tech pack review before bulk cutting begins.",
      techBadge: "Complete Turnkey Branding",
      techText: "Woven neck labels, hang tags, frosted zipper polybags, barcoding and commercial photography support.",
      logisticsBadge: "Door-to-Door Global Export",
      logisticsText: "Delivered via DHL Express with complete customs guidance for first-time international importers.",
    };
  }

  // 11. MMA, BJJ Gis & Rashguards
  if (p.includes('mma') || p.includes('bjj') || p.includes('rashguard')) {
    return {
      badge: "Martial Arts & MMA Division • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Custom BJJ Gis, Rashguards & MMA Fight Shorts Specs",
      moqBadge: "50 Units / Design",
      moqText: "Custom IBJJF-compliant BJJ Gis and sublimation rashguards for dojos, academies and fight labels.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Pre-production prototypes with reinforced triple-stitched stress points and custom collar EVA foam.",
      techBadge: "350–550 GSM Pearl Weave & Sublimation",
      techText: "Heavyweight preshrunk Pearl Weave cotton, ripstop pants, 4-way stretch poly-spandex rashguards.",
      logisticsBadge: "Fight Academy Export",
      logisticsText: "Direct export logistics serving BJJ academies and fight gear distributors in USA, UK, Brazil & Europe.",
    };
  }

  // 12. Tracksuits & Warmups
  if (p.includes('tracksuit') || p.includes('warmup')) {
    return {
      badge: "Custom Tracksuits & Warmups Plant • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Custom Tracksuits & Athletic Warmup Suits Specs",
      moqBadge: "50 Sets / Style",
      moqText: "Matching 2-piece jacket and pants sets across standard sizes (XS–3XL). Startup & sports club friendly.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Physical sample prototype with custom drawcords, branded zipper pulls and ribbed trim cards.",
      techBadge: "Poly-Tricot & Micro-Taslan",
      techText: "Shiny poly-tricot, breathable micro-taslan nylon, cotton fleece lining, YKK zippers and custom piping.",
      logisticsBadge: "Teamwear & Club Export",
      logisticsText: "Direct export packing by set and size, shipped worldwide via DHL Express and priority air cargo.",
    };
  }

  // 13. Compression Wear & Baselayers
  if (p.includes('compression') || p.includes('baselayer')) {
    return {
      badge: "Performance Compression Plant • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Athletic Compression Wear & Baselayer Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Graduated compression tights, long-sleeve baselayer tops and muscular recovery garments.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Prototypes tested for elastic modulus, dimensional stretch recovery and pressure grading.",
      techBadge: "High-Spandex Power Stretch",
      techText: "80/20 & 75/25 Nylon-Spandex power knit, flatlock anti-chafing seams, thermal brushed backs.",
      logisticsBadge: "Direct Global Logistics",
      logisticsText: "Dispatched from Pakki Kotli, Sialkot via DHL Express directly to warehouses in USA, UK & EU.",
    };
  }

  // 14. Boxing Wear & Fight Shorts
  if (p.includes('boxing-wear') || p.includes('fight-wear')) {
    return {
      badge: "Boxing Apparel Workshop • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Custom Boxing Shorts, Robes & Fighter Apparel Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Custom satin fight shorts, ring entrance robes, corner vests and walkout tracksuits.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Custom ring-ready samples with embroidered waistband patches and custom metallic trims.",
      techBadge: "Heavyweight Satin & Sublimation",
      techText: "Luxury heavyweight satin, micro-stretch side slits, 4-inch elastic waistband, sublimation panels.",
      logisticsBadge: "Championship Fight Export",
      logisticsText: "Exporting to professional boxing promoters, amateur boxing clubs and fight brands worldwide.",
    };
  }

  // 15. Streetwear & Outerwear / Jackets
  if (p.includes('streetwear') || p.includes('jacket') || p.includes('outerwear') || p.includes('varsity') || p.includes('puffer')) {
    return {
      badge: "Streetwear & Outerwear Division • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Custom Streetwear, Varsity & Outerwear Jackets Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Custom silhouette patterns, boxy drop-shoulder outerwear and luxury streetwear jackets.",
      leadBadge: "10–12d Sample • 4–5w Bulk",
      leadText: "Complete proto sampling including custom hardware, branded snaps, lining and rib knits.",
      techBadge: "Melton Wool, Leather & Canvas",
      techText: "Genuine leather sleeves, heavy wool bodies, chenille varsity patches, 3D embroidery & YKK metal hardware.",
      logisticsBadge: "Global Fashion Export",
      logisticsText: "Individually bagged in luxury frosted EVA zipper packaging with retail barcoding.",
    };
  }

  // 16. Private Label Trims & Packaging
  if (p.includes('private-label') || p.includes('trims')) {
    return {
      badge: "Private Label & Brand Packaging Unit • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Private Label Custom Trims, Tags & Packaging Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Turnkey brand development: custom woven neck labels, hang tags, polybags and carton marks.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Complete trim approval cards dispatched with physical fabric swatches before bulk production.",
      techBadge: "50D Damask & Frosted EVA Bags",
      techText: "50D high-density damask woven labels, 400 GSM foil-stamped hang tags, frosted zipper polybags, FNSKU barcoding.",
      logisticsBadge: "Amazon FBA & Retail Direct",
      logisticsText: "Amazon FBA ready carton packing, palletization and direct export to USA, UK & Europe distribution centers.",
    };
  }

  // 4. Heavyweight Hoodies & Streetwear
  if (p.includes('hoodie') || p.includes('streetwear') || p.includes('fleece')) {
    return {
      badge: "Heavyweight Streetwear Division • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — 450+ GSM Heavyweight Hoodie & Streetwear Specs",
      moqBadge: "50 Pieces / Colorway",
      moqText: "Drop-ready opening orders for streetwear startups. Custom size charts and boxy oversized cuts.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Pre-shrunk fit prototypes with custom drawcords and branded metal aglets.",
      techBadge: "450–500 GSM French Terry",
      techText: "Heavyweight fleece, puff screen printing, vintage acid wash and 50D damask neck labels.",
      logisticsBadge: "Global Streetwear Export",
      logisticsText: "Custom frosted zipper polybags, retail barcode stickers and worldwide express shipping.",
    };
  }

  // 5. Boxing & Combat Gear / MMA / BJJ
  if (p.includes('boxing') || p.includes('mma') || p.includes('fight') || p.includes('combat') || p.includes('bjj')) {
    return {
      badge: "Boxing & Combat Gear Workshop • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Pro Boxing Gloves & Combat Equipment Specs",
      moqBadge: "50 Pairs / Units",
      moqText: "Custom gym & fight brand branding. Sparring, pro fight and amateur competition specs.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Anatomical hand-molded prototypes tested for impact resistance and wrist support.",
      techBadge: "Genuine Cowhide & EVA",
      techText: "Top-grain cowhide leather, multi-layer EVA/IMF foam padding and embossed wrist closures.",
      logisticsBadge: "Sialkot Fight Heritage",
      logisticsText: "Handcrafted in Sialkot, Pakistan. Exporting to leading fight gyms in USA, UK and Europe.",
    };
  }

  // 6. Sportswear & Teamwear / Sublimation
  if (p.includes('sportswear') || p.includes('teamwear') || p.includes('jersey')) {
    return {
      badge: "Sportswear & Teamwear Division • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Custom Sportswear & Sublimated Teamwear Specs",
      moqBadge: "50 Kits / Uniforms",
      moqText: "Full team roster individual names, numbers and custom sponsor logo sublimation.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Pre-production strike-off samples via DHL Express to confirm exact PMS colors.",
      techBadge: "Italian Sublimation & Mesh",
      techText: "Fade-proof digital sublimation, birdseye breathable polyester mesh and reinforced seams.",
      logisticsBadge: "Club & League Export",
      logisticsText: "Export carton packing by team/size. Direct shipping to sports clubs and distributors worldwide.",
    };
  }

  // 7. Activewear & Fitness Wear / Compression / Gym
  if (p.includes('fitness') || p.includes('activewear') || p.includes('gym') || p.includes('compression')) {
    return {
      badge: "Activewear & Fitness Plant • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Custom Activewear & Fitness Apparel Manufacturing Specs",
      moqBadge: "50 Pieces / Style",
      moqText: "Startup-friendly flexible runs across sizes XS–3XL. Tagless silicone transfers and flatlock seams.",
      leadBadge: "7–10d Sample • 3–4w Bulk",
      leadText: "Prototypes dispatched via DHL Express in 7–10 days. Repeatable bulk manufacturing.",
      techBadge: "4-Way Stretch & Flatlock",
      techText: "Interlock, nylon/spandex, 4-needle 6-thread flatlock stitching and dry-fit moisture wicking.",
      logisticsBadge: "Sialkot Export Plant",
      logisticsText: "Direct plant sourcing in Pakki Kotli, Sialkot. Door-to-door air freight to USA, UK, EU and UAE.",
    };
  }

  // 8. Custom Denim & Jeans
  if (p.includes('jeans') || p.includes('denim')) {
    return {
      badge: "Custom Denim Plant • Sialkot, Pakistan",
      title: "Bin Rasool Enterprises — Custom Denim & Jeans Manufacturing Specs",
      moqBadge: "100 Pcs / Style",
      moqText: "Fabric wash and indigo tint minimums. Tailored fit patterns from skinny to relaxed wide-leg.",
      leadBadge: "10–12d Sample • 4–5w Bulk",
      leadText: "Wash master prototypes to approve distressing, tinting and shrinkage tolerance.",
      techBadge: "11–14oz Selvedge & Stretch",
      techText: "Ring-spun selvedge, raw indigo, enzyme stone wash, laser whiskers and leather back patches.",
      logisticsBadge: "Retail-Ready Export",
      logisticsText: "Custom brass rivets, shank buttons, pocket bags, barcoded hangtags and global freight.",
    };
  }

  // 9. Default Universal Factory Overview (Home, About, Process, Blog, Contact, Catalog)
  return {
    badge: "Factory at a Glance • Sialkot, Pakistan",
    title: "Bin Rasool Enterprises — OEM & Private Label Manufacturing Specifications",
    moqBadge: "50 Pieces / Style",
    moqText: "Startup-friendly opening tiers across standard size ranges (XS–3XL). Scale-ready for established brands.",
    leadBadge: "7–10d Sample • 3–4w Bulk",
    leadText: "Prototypes dispatched via DHL Express in 7–10 business days. Standard bulk production in 3–4 weeks.",
    techBadge: "Sublimation, Screen & Trims",
    techText: "Sublimation, silk screen, 3D silicone heat transfer, puff embroidery, 50D damask neck labels & custom frosted polybags.",
    logisticsBadge: "Sialkot • Worldwide Air/Sea",
    logisticsText: "Pakki Kotli, Daska Road, Sialkot, Pakistan. Direct factory-floor export to USA, UK, Europe, Australia & UAE.",
  };
}

function LinkedInIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36M5.07 18.5h2.79v-8.37H5.07v8.37Z" />
    </svg>
  );
}

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.511 2 2.016 6.496 2.016 12.016c0 1.953.564 3.784 1.543 5.334L2 22l4.816-1.523a9.98 9.98 0 0 0 5.215 1.539c5.52 0 10.016-4.496 10.016-10.016 0-5.52-4.496-10.016-10.016-10.016zm5.838 14.157c-.244.686-1.22 1.258-1.705 1.334-.457.072-1.047.104-3.375-.859-2.756-1.139-4.524-3.93-4.663-4.116-.134-.186-1.109-1.478-1.109-2.818 0-1.34.698-2.001.947-2.274.249-.272.545-.341.727-.341.182 0 .364.002.523.01.168.008.394-.064.616.471.228.55.776 1.895.845 2.034.068.139.114.301.023.483-.092.182-.138.295-.273.454-.136.159-.286.356-.408.477-.136.136-.279.284-.12.557.159.273.708 1.169 1.521 1.894 1.045.932 1.927 1.22 2.2 1.356.273.136.432.114.591-.068.16-.182.682-.796.864-1.069.182-.272.364-.227.614-.136.25.091 1.59.75 1.863.886.273.136.455.205.523.318.068.114.068.659-.176 1.345z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const specs = getCategorySpecs(pathname);
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <footer className="site-footer">
      {/* Global B2B Factory Specifications & AI Overview Spec Bar (Dynamic per category & country) */}
      {!isAdmin && (
        <section
          aria-label="Factory Specifications and Export Credentials"
          className="footer-spec-bar"
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'linear-gradient(180deg, rgba(23, 34, 53, 0.85) 0%, rgba(11, 16, 26, 0.98) 100%)',
            padding: '38px 20px 34px',
            borderTop: '2px solid var(--brand-orange, #f3a626)',
          }}
        >
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 10px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '22px' }}>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--brand-orange, #f3a626)',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    background: 'rgba(243, 166, 38, 0.12)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(243, 166, 38, 0.28)',
                    marginBottom: '8px',
                  }}
                >
                  {specs.badge}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>
                  {specs.title}
                </h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/923133599241"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>WhatsApp Factory</span>
                </a>
                <Link
                  href="/contact-us"
                  className="btn btn-primary"
                  style={{
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Request Production Quote
                </Link>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {/* Card 1: MOQ */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '16px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: 'rgba(243, 166, 38, 0.15)',
                      color: 'var(--brand-orange, #f3a626)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                    }}
                  >
                    📦
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', fontWeight: 600 }}>Minimum Order Quantity</span>
                    <strong style={{ fontSize: '15px', color: '#ffffff' }}>{specs.moqBadge}</strong>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                  {specs.moqText}
                </p>
              </div>

              {/* Card 2: Turnaround Lead Times */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '16px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: 'rgba(243, 166, 38, 0.15)',
                      color: 'var(--brand-orange, #f3a626)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                    }}
                  >
                    ⚡
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', fontWeight: 600 }}>Production Lead Times</span>
                    <strong style={{ fontSize: '15px', color: '#ffffff' }}>{specs.leadBadge}</strong>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                  {specs.leadText}
                </p>
              </div>

              {/* Card 3: In-House Customization */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '16px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: 'rgba(243, 166, 38, 0.15)',
                      color: 'var(--brand-orange, #f3a626)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                    }}
                  >
                    🎨
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', fontWeight: 600 }}>In-House Branding &amp; Tech</span>
                    <strong style={{ fontSize: '15px', color: '#ffffff' }}>{specs.techBadge}</strong>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                  {specs.techText}
                </p>
              </div>

              {/* Card 4: Factory Location & Export */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '16px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: 'rgba(243, 166, 38, 0.15)',
                      color: 'var(--brand-orange, #f3a626)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                    }}
                  >
                    🌍
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', fontWeight: 600 }}>Export Logistics</span>
                    <strong style={{ fontSize: '15px', color: '#ffffff' }}>{specs.logisticsBadge}</strong>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                  {specs.logisticsText}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container footer-shell" style={{ maxWidth: '1360px', padding: '58px 20px 24px' }}>
        <div className="footer-main">
          <div className="footer-brand-column">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <BrandLogo size={38} theme="dark" />
              <div className="footer-brand" style={{ margin: 0 }}>Bin Rasool Enterprises</div>
            </div>
            <p className="footer-copy">
              Private label activewear, fitness wear, sportswear and gym apparel manufacturing from Sialkot, Pakistan for startup brands and established international buyers.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <LinkedInIcon size={24} />
              </a>
              <a href="https://www.instagram.com/binrasoolenterprises" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                <InstagramIcon size={24} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                <FacebookIcon size={24} />
              </a>
              <a href="https://wa.me/923133599241" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <WhatsAppIcon size={24} />
              </a>
            </div>
          </div>

          <div>
            <p className="footer-title">Company</p>
            <ul className="footer-list">
              <li><Link href="/about-us">About Bin Rasool Enterprises</Link></li>
              <li><Link href="/manufacturing-process">Manufacturing Process</Link></li>
              <li><Link href="/about-us#quality">Quality Control</Link></li>
              <li><Link href="/about-us#shipping">Shipping &amp; Export</Link></li>
              <li><Link href="/blog">Manufacturing Blog &amp; Insights</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-title">Services</p>
            <ul className="footer-list">
              <li><Link href="/private-label-manufacturing">Private Label</Link></li>
              <li><Link href="/fitness-wear">Custom Activewear</Link></li>
              <li><Link href="/linesheet">📄 2026 Line Sheet (PDF)</Link></li>
              <li><Link href="/private-label-manufacturing#low-moq">Low MOQ Production</Link></li>
              <li><Link href="/manufacturing-process#sampling">Sampling</Link></li>
              <li><Link href="/product-catalog">Product Catalog</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-title">Contact</p>
            <div className="footer-contact" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>Pakki Kotli, Daska Road, Sialkot 51310, Pakistan</div>
              <div>
                <a href="https://wa.me/923133599241" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '4px 0' }}>
                  WhatsApp: +92 313 3599241
                </a>
              </div>
              <div>
                <a href="tel:+923133599241" style={{ display: 'inline-block', padding: '4px 0' }}>Call: +92 313 3599241</a>
              </div>
              <div>
                <a href="mailto:sales@binrasoolenterprises.com" style={{ display: 'inline-block', padding: '4px 0' }}>Sales: sales@binrasoolenterprises.com</a>
              </div>
              <div>
                <a href="mailto:info@binrasoolenterprises.com" style={{ display: 'inline-block', padding: '4px 0' }}>General: info@binrasoolenterprises.com</a>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Link href="/contact-us" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 0', color: '#fbbf24', fontWeight: 700 }}>
                  <span>Submit Production Inquiry</span>
                  <ArrowRightIcon size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Bin Rasool Enterprises. All rights reserved.</span>
          <span>Private label manufacturing for international activewear brands.</span>
        </div>
      </div>
    </footer>
  );
}
