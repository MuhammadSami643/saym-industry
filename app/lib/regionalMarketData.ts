import { RegionalMarketConfig } from '../components/RegionalPrivateLabelTemplate';

export const REGIONAL_MARKETS: Record<string, RegionalMarketConfig> = {
  usa: {
    slug: 'private-label-activewear-manufacturer-usa',
    marketName: 'USA Brands',
    countryName: 'USA',
    badge: 'USA Export & Sourcing Program • Sialkot Factory',
    title: 'Private Label Activewear Manufacturer for USA Brands',
    description: 'Factory-direct OEM activewear manufacturing for American gym wear labels, DTC fitness brands, and Amazon FBA sellers. Custom damask woven neck labels, ASTM seam burst testing, and express DDP air cargo to the USA.',
    keywords: [
      'private label activewear manufacturer usa',
      'custom gym wear manufacturer usa',
      'activewear manufacturer for us brands',
      'clothing manufacturer low moq usa',
      'amazon fba activewear manufacturer',
      'sports clothing manufacturer pakistan for usa',
      'sialkot activewear manufacturer usa',
      'custom leggings manufacturer usa',
      'private label fitness clothing usa',
      'oem sportswear manufacturer usa'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'Startup MOQ / Style' },
      { val: '7-10 Days', lbl: 'DHL Proto Sampling' },
      { val: '4-5 Days', lbl: 'Express Air to USA' },
      { val: 'AQL 2.5', lbl: 'Strict Pre-Shipment Audit' }
    ],
    marketFocus: {
      heading: 'Engineered for American Sizing, ASTM Standards & Amazon FBA',
      points: [
        {
          title: 'US Anthropometric Sizing Blocks',
          desc: 'CAD pattern grading calibrated specifically for North American body dimensions across XS to 5XL with generous torso lengths and squat-proof hip grading.'
        },
        {
          title: 'Amazon FBA & Retail Barcoding',
          desc: 'Individually packed in frosted EVA zipper polybags with custom suffocation warning labels, product size labels, and high-density scannable FNSKU barcodes.'
        },
        {
          title: 'ASTM Seam Burst & Color Fastness',
          desc: '4-needle 6-thread flatlock stitching tested for 4-way stretch rebound, squat-proof opacity, and ISO grade 4+ wash fastness.'
        },
        {
          title: 'DDP Door-to-Door US Delivery',
          desc: 'We manage full customs clearance, ISF filings, and duties directly to your warehouse, 3PL fulfillment center, or Amazon distribution hub.'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway across standard US sizes.',
      sampleLeadTime: '7 to 10 business days with DHL Express tracking to USA.',
      bulkLeadTime: '3 to 4 weeks after prototype approval.',
      shippingMode: 'DDP Air Cargo (4-5 days) or Sea Freight (22-26 days).',
      paymentTerms: 'Bank Wire (T/T), Letter of Credit (L/C).',
      compliance: 'CPSIA, ASTM International, OEKO-TEX certified fabrics.'
    },
    faqs: [
      {
        question: "How do you handle shipping and customs clearance to the United States?",
        answer: "We offer complete DDP (Delivered Duty Paid) shipping to the USA. All customs duties, entry documentation, and freight forwarding are managed end-to-end, delivering directly to your door or Amazon FBA fulfillment center via DHL, FedEx, or air cargo."
      },
      {
        question: "Can you manufacture apparel according to standard US sizing charts?",
        answer: "Yes. Our pattern masters utilize standardized US apparel size specifications with digital CAD grading, ensuring accurate fit across XS, S, M, L, XL, 2XL, and plus sizes."
      },
      {
        question: "Are your gym wear fabrics squat-proof and opaque?",
        answer: "Yes. For US fitness labels we utilize 240–320 GSM Nylon-Spandex interlock blends and custom circular knits that undergo stringent light-transmission stretch testing to guarantee 100% opacity when squatting."
      }
    ]
  },

  uk: {
    slug: 'private-label-activewear-manufacturer-uk',
    marketName: 'UK Brands',
    countryName: 'United Kingdom',
    badge: 'UK Export & Sourcing Program • Sialkot Factory',
    title: 'Private Label Activewear Manufacturer for UK Brands',
    description: 'Direct factory manufacturing for British fitness labels, gym wear startups, sports clubs, and independent retailers across London, Manchester, and Birmingham. Custom trims, UK sizing, and fast DHL delivery.',
    keywords: [
      'private label activewear manufacturer uk',
      'gym wear manufacturer uk brands',
      'custom activewear manufacturer london',
      'clothing manufacturer low moq uk',
      'heavyweight streetwear manufacturer uk',
      'tracksuits manufacturer uk',
      'sialkot sportswear manufacturer uk',
      'private label clothing manufacturer manchester',
      'birmingham gym wear supplier'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'Accessible UK MOQ' },
      { val: '7-10 Days', lbl: 'Rapid Sample Delivery' },
      { val: '3-4 Days', lbl: 'DHL Air to UK' },
      { val: 'UKCA', lbl: 'Safety & Quality Compliant' }
    ],
    marketFocus: {
      heading: 'Custom Activewear Tailored for the UK Fitness & Streetwear Market',
      points: [
        {
          title: 'UK Metric Sizing & Tailored Cuts',
          desc: 'Pattern templates designed specifically for UK body measurements, athletic tapered fits, and contemporary streetwear silhouettes.'
        },
        {
          title: 'Fast DHL Air Cargo to Heathrow & Manchester',
          desc: 'Direct air links from Sialkot to major UK airports with tracking provided within 24 hours of dispatch.'
        },
        {
          title: 'Premium Heavyweight Streetwear Blends',
          desc: '380–500 GSM loopback French terry, heavy brushed fleece, and acid wash tees tailored for UK streetwear fashion drops.'
        },
        {
          title: 'Custom Brand Trims & Packaging',
          desc: 'Woven damask neck tags, branded care labels with UK care symbols, cardstock hangtags with GBP pricing, and frosted zip bags.'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway across standard UK sizes.',
      sampleLeadTime: '7 to 10 business days via DHL Express to UK.',
      bulkLeadTime: '3 to 4 weeks after sample sign-off.',
      shippingMode: 'DHL Express Air (3-4 days) or Sea Cargo to Felixstowe/Southampton.',
      paymentTerms: 'Bank Wire (T/T), GBP/USD invoice options.',
      compliance: 'UKCA standards, REACH compliant eco dyes, OEKO-TEX.'
    },
    faqs: [
      {
        question: "How long does shipping take from Sialkot to the UK?",
        answer: "Samples and express air shipments reach UK addresses within 3 to 4 business days via DHL Express. Sea freight to Southampton or Felixstowe takes approximately 20 to 24 days."
      },
      {
        question: "Do you supply UK care labels with correct legal wash symbols?",
        answer: "Yes, our satin care labels follow UK wash care coding and fabric composition percentage regulations, printed with your brand logo and company details."
      }
    ]
  },

  europe: {
    slug: 'private-label-activewear-manufacturer-europe',
    marketName: 'European Union',
    countryName: 'Europe',
    badge: 'EU Export Sourcing • Sialkot Factory',
    title: 'Private Label Activewear Manufacturer for European Brands',
    description: 'Direct OEM apparel production for European sportswear labels, boutique fitness brands, and multi-country distributors. REACH compliant textiles, European sizing charts, and streamlined EU logistics.',
    keywords: [
      'private label activewear manufacturer europe',
      'sportswear manufacturer eu',
      'reach compliant clothing manufacturer',
      'custom activewear manufacturer europe',
      'oem gym wear supplier europe',
      'sustainable activewear manufacturer europe',
      'sialkot apparel manufacturer for europe',
      'low moq fitness wear manufacturer europe'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'EU Low MOQ / Style' },
      { val: '7-10 Days', lbl: 'Proto Sample Turnaround' },
      { val: 'REACH', lbl: '100% Chemical Compliant' },
      { val: 'DDP', lbl: 'All EU Countries' }
    ],
    marketFocus: {
      heading: 'REACH-Compliant Activewear Production for the European Market',
      points: [
        {
          title: 'European Metric Sizing Standards',
          desc: 'Precision digital CAD patterns aligned with CEN European sizing standards for activewear, teamwear, and athleisure.'
        },
        {
          title: 'REACH & OEKO-TEX Certified Inks & Dyes',
          desc: 'Strictly zero banned azo dyes, phthalates, or heavy metals. All sublimation and screen printing utilize eco-friendly European inks.'
        },
        {
          title: 'Multi-Country EU Distribution Support',
          desc: 'Scheduled master carton palletization with multilingual wash care labeling for distribution across Germany, France, Italy, Spain, and Scandinavia.'
        },
        {
          title: 'Direct Freight to Frankfurt, Amsterdam & Rotterdam',
          desc: 'Express air freight arriving in 4–5 business days, plus reliable sea container shipments to Rotterdam and Hamburg ports.'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway across EU sizes (XS–3XL).',
      sampleLeadTime: '7 to 10 business days with express tracking to EU.',
      bulkLeadTime: '3 to 4 weeks after counter-sample approval.',
      shippingMode: 'Air Cargo DDP (4-5 days) or Sea Freight (20-24 days).',
      paymentTerms: 'Bank Wire (T/T), EUR / USD options.',
      compliance: 'EU REACH Regulation (EC 1907/2006), OEKO-TEX Standard 100.'
    },
    faqs: [
      {
        question: "Are your fabrics compliant with EU REACH chemical regulations?",
        answer: "Yes. All yarns, fabric dyes, sublimation inks, and silicone prints conform strictly to EU REACH standards and OEKO-TEX Standard 100 requirements."
      },
      {
        question: "Can you ship DDP to European Union countries?",
        answer: "Yes. We arrange Delivered Duty Paid (DDP) air and sea shipments to Germany, France, Netherlands, Italy, Spain, and other EU member states with customs clearance included."
      }
    ]
  },

  germany: {
    slug: 'private-label-activewear-manufacturer-germany',
    marketName: 'German Brands',
    countryName: 'Germany',
    badge: 'German Market Precision Sourcing • Sialkot Factory',
    title: 'Private Label Activewear Manufacturer for German Brands',
    description: 'Precision apparel manufacturing for German fitness brands, gym chains, and sportswear distributors. German sizing specs, high-tensile flatlock construction, and strict AQL 2.5 pre-shipment inspection.',
    keywords: [
      'private label activewear manufacturer germany',
      'sportbekleidung hersteller pakistan',
      'activewear hersteller deutschland',
      'fitnessbekleidung hersteller low moq',
      'oem sportswear manufacturer germany',
      'aql 2.5 clothing manufacturer germany',
      'sportkleidung hersteller frankfurt'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'Accessible MOQ' },
      { val: 'AQL 2.5', lbl: 'German QC Standard' },
      { val: '4-5 Days', lbl: 'Air to Frankfurt / Munich' },
      { val: 'OEKO-TEX', lbl: 'Certified Textiles' }
    ],
    marketFocus: {
      heading: 'Precision Engineering & Technical Quality for German Buyers',
      points: [
        {
          title: 'Strict Quality Control & Tolerances',
          desc: 'Every garment is audited under AQL 2.5 standards for seam burst strength, grading tolerance adherence (±0.5 cm), and 100% metal detector safety scanning.'
        },
        {
          title: 'German DIN Sizing Compliance',
          desc: 'Pattern templates developed to German anthropometric sizing tables ensuring accurate fit and low return rates for e-commerce brands.'
        },
        {
          title: 'Sustainable & Recycled Fabric Options',
          desc: 'Access to GRS-certified recycled polyester, organic cotton, and eco-friendly dye houses meeting German buyer expectations.'
        },
        {
          title: 'Direct Logistics to Frankfurt & Hamburg',
          desc: 'Air cargo dispatched directly to Frankfurt Airport (FRA) or sea containers through Hamburg Port.'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway.',
      sampleLeadTime: '7 to 10 business days via DHL Express.',
      bulkLeadTime: '3 to 4 weeks after sample sign-off.',
      shippingMode: 'Express Air (4-5 days) or Sea Container (Hamburg).',
      paymentTerms: 'Bank Wire (T/T), EUR invoicing.',
      compliance: 'EU REACH, OEKO-TEX Standard 100, DIN sizing standards.'
    },
    faqs: [
      {
        question: "What quality control standards do you maintain for German orders?",
        answer: "We perform 100% inline checking and final random audits according to AQL 2.5 standards, verifying stitch density, seam tension, fabric GSM, and measurement tolerances before boxing."
      }
    ]
  },

  france: {
    slug: 'private-label-activewear-manufacturer-france',
    marketName: 'French Brands',
    countryName: 'France',
    badge: 'French Fashion & Activewear Sourcing • Sialkot Factory',
    title: 'Private Label Activewear Manufacturer for French Brands',
    description: 'Turnkey activewear and luxury athleisure manufacturing for French fashion labels, boutique fitness studios, and e-commerce creators across Paris, Lyon, and Marseille.',
    keywords: [
      'private label activewear manufacturer france',
      'fabricant vetement de sport pakistan',
      'fabricant activewear france',
      'marque blanche vetement de sport',
      'grossiste vetement fitness france',
      'oem sportswear manufacturer paris'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'Boutique MOQ' },
      { val: '7-10 Days', lbl: 'Proto Sampling' },
      { val: '4-5 Days', lbl: 'Air to Paris (CDG)' },
      { val: '100% NDA', lbl: 'Exclusive Designs' }
    ],
    marketFocus: {
      heading: 'High-End Athleisure & Activewear Manufacturing for France',
      points: [
        {
          title: 'Refined Finishing & Hand-Feel',
          desc: 'Silicone wash treatments, carbon brushed peach-skin finishes, and ultra-soft interlock fabrics designed for upscale French athleisure brands.'
        },
        {
          title: 'French Sizing Grids',
          desc: 'Pattern grading calibrated to French national sizing specifications across men’s and women’s performance lines.'
        },
        {
          title: 'Boutique Branding & Trims',
          desc: 'Embossed matte hangtags with French translation, satin care labels with EU legal mentions, and discreet tone-on-tone branding.'
        },
        {
          title: 'Air Shipments to Paris CDG',
          desc: 'Express customs-cleared shipments landing at Paris Charles de Gaulle with door delivery throughout France.'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway.',
      sampleLeadTime: '7 to 10 business days.',
      bulkLeadTime: '3 to 4 weeks.',
      shippingMode: 'DHL Express Air (4-5 days) or Sea Cargo via Le Havre.',
      paymentTerms: 'Bank Wire (T/T), EUR billing.',
      compliance: 'REACH compliance, French textile labeling laws.'
    },
    faqs: [
      {
        question: "Do your care labels include mandatory French textile labeling?",
        answer: "Yes, our custom care labels can be printed in French with fiber composition, mandatory care symbols, and brand identifiers required for the French market."
      }
    ]
  },

  netherlands: {
    slug: 'private-label-activewear-manufacturer-netherlands',
    marketName: 'Netherlands Brands',
    countryName: 'Netherlands',
    badge: 'Benelux Sourcing & Logistics Hub • Sialkot Factory',
    title: 'Private Label Activewear Manufacturer for Netherlands Brands',
    description: 'Factory-direct activewear manufacturing for Dutch sports labels, gym wear distributors, and European fulfillment hubs centered around Amsterdam and Rotterdam.',
    keywords: [
      'private label activewear manufacturer netherlands',
      'sportkleding fabrikant pakistan',
      'activewear manufacturer amsterdam',
      'gym wear supplier rotterdam',
      'custom sportswear manufacturer netherlands',
      'tall activewear manufacturer'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'Flexible Dutch MOQ' },
      { val: '7-10 Days', lbl: 'DHL Prototyping' },
      { val: 'Rotterdam', lbl: 'Direct Sea Freight' },
      { val: 'REACH', lbl: 'Eco-Textile Standard' }
    ],
    marketFocus: {
      heading: 'Optimized Manufacturing for Dutch Activewear & EU Hubs',
      points: [
        {
          title: 'Tall Inseam & Athletic Dutch Sizing',
          desc: 'Custom size grading accommodating taller Dutch body proportions with extended inseam lengths for leggings and joggers.'
        },
        {
          title: 'Strategic Sea Freight into Port of Rotterdam',
          desc: 'Full container load (FCL) and less than container load (LCL) sea shipments landing directly at Rotterdam for rapid European distribution.'
        },
        {
          title: 'Functional Performance Textiles',
          desc: 'High-breathability moisture-wicking fabrics, compression interlock, and recycled polyester blends.'
        },
        {
          title: 'Custom Frosted Polybags & E-Com Packaging',
          desc: 'Retail-ready branded packaging with EAN barcodes optimized for Dutch 3PL fulfillment centers.'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway.',
      sampleLeadTime: '7 to 10 business days.',
      bulkLeadTime: '3 to 4 weeks.',
      shippingMode: 'Air DDP to Schiphol or Sea Cargo to Port of Rotterdam.',
      paymentTerms: 'Bank Wire (T/T), EUR currency.',
      compliance: 'REACH, OEKO-TEX Standard 100.'
    },
    faqs: [
      {
        question: "Can you customize leg lengths for Dutch brands?",
        answer: "Yes. Our CAD pattern masters adjust inseam lengths and vertical grading specifically for Dutch customers who often require extended tall sizing."
      }
    ]
  },

  italy: {
    slug: 'private-label-activewear-manufacturer-italy',
    marketName: 'Italy Brands',
    countryName: 'Italy',
    badge: 'Italian Boutique Fitness & Combat Sourcing • Sialkot Factory',
    title: 'Private Label Activewear Manufacturer for Italian Brands',
    description: 'Custom activewear and combat fightwear production for Italian sportswear brands, padel clubs, and boutique gym studios in Milan, Rome, and Turin.',
    keywords: [
      'private label activewear manufacturer italy',
      'produttore abbigliamento sportivo pakistan',
      'activewear manufacturer milano',
      'abbigliamento fitness personalizzato italia',
      'fightwear manufacturer italy',
      'padel wear manufacturer'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'Capsule MOQ' },
      { val: '7-10 Days', lbl: 'DHL Sample Lead' },
      { val: '4-5 Days', lbl: 'Air to Milan (MXP)' },
      { val: 'Premium', lbl: 'Artisan Construction' }
    ],
    marketFocus: {
      heading: 'Sophisticated Activewear & Combat Fightwear for Italian Brands',
      points: [
        {
          title: 'Italian Athletic Fit & Styling',
          desc: 'Sleek, body-contouring cuts designed for the stylish Italian fitness, padel, and athleisure markets.'
        },
        {
          title: 'Combat Sports & Martial Arts Gear',
          desc: 'Custom sublimated BJJ rash guards, boxing trunks, and kickboxing fight shorts manufactured for Italian combat gyms.'
        },
        {
          title: 'Subtle High-Density Branding',
          desc: 'Matte silicone heat transfers, tonally matched 3D puff embroidery, and damask woven labels for an understated luxury feel.'
        },
        {
          title: 'Air Freight to Milan Malpensa',
          desc: 'Express customs-cleared air shipments landing directly in Northern Italy’s commercial hub.'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway.',
      sampleLeadTime: '7 to 10 business days.',
      bulkLeadTime: '3 to 4 weeks.',
      shippingMode: 'DHL Express Air (4-5 days) or Sea Cargo via Genoa.',
      paymentTerms: 'Bank Wire (T/T), EUR.',
      compliance: 'REACH, Italian labeling standards.'
    },
    faqs: [
      {
        question: "Do you manufacture custom padel and tennis activewear?",
        answer: "Yes, we produce sublimated padel teamwear polos, performance shorts, skirts, and warm-up tracksuits for Italian clubs and brands."
      }
    ]
  },

  spain: {
    slug: 'private-label-activewear-manufacturer-spain',
    marketName: 'Spain Brands',
    countryName: 'Spain',
    badge: 'Spanish Market Activewear Sourcing • Sialkot Factory',
    title: 'Private Label Activewear Manufacturer for Spanish Brands',
    description: 'Custom manufacturing for Spanish activewear brands, padel sportswear clubs, and fitness creators across Madrid, Barcelona, and Valencia.',
    keywords: [
      'private label activewear manufacturer spain',
      'fabricante ropa deportiva pakistan',
      'activewear manufacturer espana',
      'ropa fitness personalizada barcelona',
      'padel clothing manufacturer spain',
      'fabricante ropa deportiva madrid'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'Accessible MOQ' },
      { val: '7-10 Days', lbl: 'DHL Prototyping' },
      { val: '4-5 Days', lbl: 'Air to Madrid / BCN' },
      { val: 'AQL 2.5', lbl: 'Strict Quality Audit' }
    ],
    marketFocus: {
      heading: 'Custom Sportswear & Padel Wear for Spanish Brands',
      points: [
        {
          title: 'Padel & Teamwear Manufacturing',
          desc: 'Sublimated athletic jerseys, quick-dry shorts, and technical training gear designed for Spain’s booming sports culture.'
        },
        {
          title: 'Warm Climate Lightweight Fabrics',
          desc: '135–160 GSM moisture-wicking micro-mesh and ultra-breathable polyester-spandex blends engineered for warmer Mediterranean climates.'
        },
        {
          title: 'Full Private Label Trims & Packaging',
          desc: 'Woven neck labels, Spanish care tags, and branded frosted polybags with EAN barcodes.'
        },
        {
          title: 'Direct Express Logistics to Spain',
          desc: 'Fast air cargo landing in Madrid Barajas (MAD) and Barcelona El Prat (BCN).'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway.',
      sampleLeadTime: '7 to 10 business days.',
      bulkLeadTime: '3 to 4 weeks.',
      shippingMode: 'DHL Air Express (4-5 days) or Sea Freight via Valencia / Barcelona.',
      paymentTerms: 'Bank Wire (T/T), EUR billing.',
      compliance: 'EU REACH, OEKO-TEX Standard 100.'
    },
    faqs: [
      {
        question: "Can you supply lightweight activewear suitable for warm climates?",
        answer: "Yes, we specialize in high-ventilation micro-mesh, antibacterial dry-fit polyester, and lightweight nylon-spandex blends ideal for Mediterranean markets."
      }
    ]
  },

  startups: {
    slug: 'activewear-manufacturer-for-startups',
    marketName: 'Startup Brands',
    countryName: 'Startups & Emerging Labels',
    badge: 'Low MOQ Startup Launchpad • Sialkot Factory',
    title: 'Activewear Manufacturer for Startups & Emerging Brands',
    description: 'Turnkey activewear manufacturing designed specifically for first-time clothing brand founders, gym owners, and fitness influencers. Accessible 50 pcs MOQ per style, full tech pack guidance, and rapid proto sampling.',
    keywords: [
      'activewear manufacturer for startups',
      'clothing manufacturer for new brands',
      'low moq clothing manufacturer 50 pcs',
      'start a gym wear brand manufacturer',
      'clothing manufacturer with tech pack help',
      'turnkey apparel manufacturer for beginners',
      'fitness apparel manufacturer low minimums',
      'small batch clothing manufacturer pakistan'
    ],
    metrics: [
      { val: '50 Pcs', lbl: 'True Startup MOQ' },
      { val: '7-10 Days', lbl: 'Proto Counter-Sample' },
      { val: '100% NDA', lbl: 'IP Protected' },
      { val: 'Full OEM', lbl: 'Labels, Tags & Bags' }
    ],
    marketFocus: {
      heading: 'Launch Your Fitness Brand Without Inventory Bloat or Risk',
      points: [
        {
          title: 'Accessible 50 Pcs Minimum Order Quantity',
          desc: 'Test your initial market demand and build customer validation without tying up heavy capital in hundreds of unsold garments.'
        },
        {
          title: 'Tech Pack & Design Assistance',
          desc: 'Don’t have a full technical tech pack? Our pattern masters help translate your sketches, reference photos, or benchmark garments into production-ready CAD patterns.'
        },
        {
          title: 'Complete Private Label Packaging from Day One',
          desc: 'Even small orders receive custom damask woven neck tags, 400 GSM hangtags, and custom frosted EVA zipper polybags with barcodes.'
        },
        {
          title: 'Sample-First Risk-Free Verification',
          desc: 'Review physical fit, fabric stretch, and custom branding in your hands before approving full production runs.'
        }
      ]
    },
    commercials: {
      moq: '50 pieces per style/colorway across standard size ranges.',
      sampleLeadTime: '7 to 10 business days dispatched via DHL Express worldwide.',
      bulkLeadTime: '3 to 4 weeks after sample sign-off.',
      shippingMode: 'Door-to-door express air delivery with full tracking.',
      paymentTerms: 'Bank Wire (T/T), sample payment via bank transfer.',
      compliance: '100% Non-Disclosure Agreement (NDA) signed upfront.'
    },
    faqs: [
      {
        question: "I am launching my first clothing brand. Can you help me without a complete tech pack?",
        answer: "Yes! Many of our startup clients begin with reference photos, sample garments they love, and vector artwork. Our technical merchandising team works with you to establish sizing, fabric weights, and construction details."
      },
      {
        question: "Can I split the 50 pcs MOQ across different sizes?",
        answer: "Yes, you can divide your 50 pieces per style across standard sizes (such as S, M, L, XL) according to your target customer demographic."
      },
      {
        question: "Do I get full custom branding with a 50 piece order?",
        answer: "Yes. Every startup order receives custom woven neck labels, custom hangtags, and branded frosted zipper polybags so your product arrives 100% retail-ready."
      }
    ]
  }
};
