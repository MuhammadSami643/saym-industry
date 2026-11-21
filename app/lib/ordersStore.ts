import fs from 'fs';
import path from 'path';

export interface OrderMilestone {
  stage: string;
  title: string;
  desc: string;
  completed: boolean;
  active: boolean;
  date: string;
  estimatedDuration: string;
}

export interface OrderRecord {
  orderId: string;
  clientName: string;
  brand: string;
  country: string;
  item: string;
  quantity: string;
  fabricSpec: string;
  targetDispatch: string;
  estimatedRemainingTime: string;
  carrier: string;
  trackingNumber: string;
  overallStatus: 'Tech Pack' | 'Cutting' | 'Stitching & Branding' | 'Quality Control' | 'Steam Pressing' | 'Packaging' | 'Dispatched';
  milestones: OrderMilestone[];
  createdAt?: string;
  inquiryId?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'production_orders.json');

export const DEFAULT_PRODUCTION_ORDERS: Record<string, OrderRecord> = {
  'BRE-2026-9014': {
    orderId: 'BRE-2026-9014',
    clientName: 'Liam Carter',
    brand: 'Vanguard Streetwear LLC',
    country: 'United States (Los Angeles, CA)',
    item: '450 GSM Heavy French Terry Boxy Hoodies',
    quantity: '600 pcs (Black, Vintage Grey, Forest Green)',
    fabricSpec: '100% Combed Ringspun Cotton French Terry, Pre-Shrunk',
    targetDispatch: 'November 18, 2026',
    estimatedRemainingTime: '3-4 Working Days to Air Cargo Departure',
    carrier: 'DHL Express Worldwide Air Cargo',
    trackingNumber: 'DHL-PK-9821449012',
    overallStatus: 'Steam Pressing',
    milestones: [
      {
        stage: '01',
        title: 'Tech Pack & Pre-Production Swatch Approved',
        desc: 'Lab dips approved, sizing graded across XS to 3XL.',
        completed: true,
        active: false,
        date: 'Oct 28, 2026',
        estimatedDuration: '3 Business Days'
      },
      {
        stage: '02',
        title: 'Fabric Knitting, Dyeing & Precision Cutting',
        desc: 'Custom combed yarn knitted and laser cut to CAD specifications.',
        completed: true,
        active: false,
        date: 'Nov 03, 2026',
        estimatedDuration: '5 Business Days'
      },
      {
        stage: '03',
        title: 'Industrial Stitching & 3D Puff Screen Print',
        desc: 'Flatlock reinforced seam assembly & high-density chest print.',
        completed: true,
        active: false,
        date: 'Nov 10, 2026',
        estimatedDuration: '6 Business Days'
      },
      {
        stage: '04',
        title: 'AQL 2.5 Quality Inspection & Seam Strength Audit',
        desc: 'Dimensional checks, thread trimming and wash-fastness testing passed 100%.',
        completed: true,
        active: false,
        date: 'Nov 13, 2026',
        estimatedDuration: '2 Business Days'
      },
      {
        stage: '05',
        title: 'Industrial Steam Pressing',
        desc: 'Heavy vacuum steam ironing, crease removal, thread cleanup and fabric shape stabilization.',
        completed: false,
        active: true,
        date: 'In Progress (Nov 14-15)',
        estimatedDuration: '24-48 Hours'
      },
      {
        stage: '06',
        title: 'Custom Retail Packaging',
        desc: 'Woven neck label verification, hangtag barcode attachment, individual frosted biodegradable zipper polybagging and export master carton sealing.',
        completed: false,
        active: false,
        date: 'Scheduled (Nov 16-17)',
        estimatedDuration: '24 Hours'
      },
      {
        stage: '07',
        title: 'Export Customs Clearance & Air Dispatch',
        desc: 'Sialkot Dry Port customs clearance to DHL Hub & Air Bill of Lading departure.',
        completed: false,
        active: false,
        date: 'Est. Nov 18, 2026',
        estimatedDuration: '1-2 Days'
      }
    ]
  },
  'BRE-SAMPLE-104': {
    orderId: 'BRE-SAMPLE-104',
    clientName: 'Sophie Bennett',
    brand: 'Aura Athletics',
    country: 'United Kingdom (London)',
    item: 'Seamless High-Waist Scrunch Leggings & Sports Bra Set',
    quantity: '4 Sets (Prototyping & Fit Verification)',
    fabricSpec: '75% Micro-Nylon / 25% Spandex, 4-Way Stretch Compression',
    targetDispatch: 'November 12, 2026',
    estimatedRemainingTime: 'Completed & Dispatched via Air Express',
    carrier: 'FedEx Priority Express',
    trackingNumber: 'FDX-8730991204-GB',
    overallStatus: 'Dispatched',
    milestones: [
      {
        stage: '01',
        title: 'Sample Pattern Drafting',
        desc: 'Digitized grading created from buyer specs.',
        completed: true,
        active: false,
        date: 'Nov 02, 2026',
        estimatedDuration: '24-48 Hours'
      },
      {
        stage: '02',
        title: 'Seamless Circular Knitting',
        desc: 'Santoni seamless machine knitting completed.',
        completed: true,
        active: false,
        date: 'Nov 05, 2026',
        estimatedDuration: '48 Hours'
      },
      {
        stage: '03',
        title: 'Heat Seal Logo Transfer & Assembly',
        desc: 'Matte silicone reflective branding applied.',
        completed: true,
        active: false,
        date: 'Nov 08, 2026',
        estimatedDuration: '24 Hours'
      },
      {
        stage: '04',
        title: 'AQL Fit & Elasticity Verification',
        desc: 'Squat-test and recovery elasticity passed 100%.',
        completed: true,
        active: false,
        date: 'Nov 09, 2026',
        estimatedDuration: '24 Hours'
      },
      {
        stage: '05',
        title: 'Industrial Steam Pressing',
        desc: 'Crease removal and fabric stabilization.',
        completed: true,
        active: false,
        date: 'Nov 10, 2026',
        estimatedDuration: '12 Hours'
      },
      {
        stage: '06',
        title: 'Custom Retail Packaging',
        desc: 'Individual barcoded packaging & hangtag attached.',
        completed: true,
        active: false,
        date: 'Nov 10, 2026',
        estimatedDuration: '12 Hours'
      },
      {
        stage: '07',
        title: 'Sample Dispatched via FedEx Priority',
        desc: 'In transit to Heathrow International Airport.',
        completed: true,
        active: false,
        date: 'Nov 11, 2026',
        estimatedDuration: '3-4 Days Global'
      }
    ]
  }
};

function ensureOrdersFileExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(DEFAULT_PRODUCTION_ORDERS, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[OrdersStore] Error ensuring file exists:', err);
  }
}

export function getAllProductionOrders(): Record<string, OrderRecord> {
  ensureOrdersFileExists();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const stored = JSON.parse(raw || '{}');
    return { ...DEFAULT_PRODUCTION_ORDERS, ...stored };
  } catch (err) {
    console.error('[OrdersStore] Error reading production_orders.json:', err);
    return DEFAULT_PRODUCTION_ORDERS;
  }
}

export function getProductionOrderById(orderId: string): OrderRecord | null {
  const all = getAllProductionOrders();
  const normalizedId = orderId.trim().toUpperCase();
  return all[normalizedId] || null;
}

export function createProductionOrderFromInquiry(payload: {
  inquiryId?: string;
  clientName: string;
  brand: string;
  country?: string;
  item: string;
  quantity?: string;
  fabricSpec?: string;
  targetDays?: number;
  carrier?: string;
}): OrderRecord {
  ensureOrdersFileExists();

  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `BRE-${year}-${randomSuffix}`;
  const days = payload.targetDays || 18;
  const dispatchDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const record: OrderRecord = {
    orderId,
    clientName: payload.clientName.trim(),
    brand: payload.brand.trim() || payload.clientName.trim(),
    country: payload.country?.trim() || 'International Export (Worldwide)',
    item: payload.item.trim(),
    quantity: payload.quantity?.trim() || 'Initial Production Batch (50-100 pcs)',
    fabricSpec: payload.fabricSpec?.trim() || 'Factory Sourced Certified Mill Fabric',
    targetDispatch: dispatchDate,
    estimatedRemainingTime: `Approx. ${days} Business Days to Dispatch`,
    carrier: payload.carrier?.trim() || 'DHL Express Worldwide / Air Freight',
    trackingNumber: `AWB-${orderId}-PK`,
    overallStatus: 'Tech Pack',
    createdAt: new Date().toISOString(),
    inquiryId: payload.inquiryId,
    milestones: [
      {
        stage: '01',
        title: 'Tech Pack Verification & Fabric Procurement',
        desc: 'Buyer tech pack confirmed, grading tolerance set and mill yarn allocation initiated.',
        completed: false,
        active: true,
        date: `In Progress (${today})`,
        estimatedDuration: '2-3 Business Days'
      },
      {
        stage: '02',
        title: 'Pattern CAD Grading & Precision Fabric Cutting',
        desc: 'Automated fabric layout and Eastman CNC cutting table processing.',
        completed: false,
        active: false,
        date: 'Scheduled',
        estimatedDuration: '3-4 Business Days'
      },
      {
        stage: '03',
        title: 'Industrial Stitching & Private Label Printing',
        desc: 'Assembly line sewing, custom inner tags, embroidery and screen printing.',
        completed: false,
        active: false,
        date: 'Scheduled',
        estimatedDuration: '5-7 Business Days'
      },
      {
        stage: '04',
        title: 'AQL 2.5 Quality Audit & Seam Strength Check',
        desc: 'Dimensional tolerance checks, needle detection and wash colorfastness testing.',
        completed: false,
        active: false,
        date: 'Scheduled',
        estimatedDuration: '2 Business Days'
      },
      {
        stage: '05',
        title: 'Industrial Steam Pressing',
        desc: 'Vacuum steam ironing, crease removal, thread trimming and garment shape stabilization.',
        completed: false,
        active: false,
        date: 'Scheduled',
        estimatedDuration: '24-48 Hours'
      },
      {
        stage: '06',
        title: 'Custom Retail Packaging',
        desc: 'Brand woven neck tags, hangtag barcodes, individual frosted polybags and master export cartons.',
        completed: false,
        active: false,
        date: 'Scheduled',
        estimatedDuration: '24 Hours'
      },
      {
        stage: '07',
        title: 'Customs Clearance & Air Cargo Dispatch',
        desc: 'Sialkot Dry Port customs clearance, DHL/FedEx AWB issuance and air freight departure.',
        completed: false,
        active: false,
        date: `Est. ${dispatchDate}`,
        estimatedDuration: '1-2 Days'
      }
    ]
  };

  try {
    let existing: Record<string, OrderRecord> = {};
    try {
      const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
      existing = JSON.parse(raw || '{}');
    } catch {
      existing = {};
    }

    existing[orderId] = record;
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (fsErr) {
    console.error('[OrdersStore] Error saving production order:', fsErr);
  }

  return record;
}
