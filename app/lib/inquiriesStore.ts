import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';

export interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  subject?: string;
  details: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  date: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

const SEED_INQUIRIES: StoredInquiry[] = [
  {
    id: 'mock-1',
    name: 'Marcus Vance',
    email: 'marcus@peakfitness.com',
    phone: '+1 415 889 0122',
    company: 'Peak Fitness USA',
    country: 'United States',
    subject: 'Custom Joggers & Gym Hoodies (500 pcs)',
    details: 'Looking for 300 GSM French Terry gym hoodies and matching slim-fit joggers with custom silicone heat transfer logo.',
    status: 'new',
    date: new Date().toISOString()
  },
  {
    id: 'mock-2',
    name: 'Sarah Jenkins',
    email: 'sarah@athletixstudio.co.uk',
    phone: '+44 20 7946 0919',
    company: 'Athletix Studio UK',
    country: 'United Kingdom',
    subject: 'Private Label Leggings & Sports Bras',
    details: 'Hi Bin Rasool Enterprises, we want to launch a 4-colorway activewear capsule: 75% Nylon 25% Spandex squat proof leggings with matching bra tops.',
    status: 'contacted',
    date: new Date(Date.now() - 86400000).toISOString()
  }
];

function ensureFileExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(INQUIRIES_FILE)) {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(SEED_INQUIRIES, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[InquiriesStore] Error ensuring file exists:', err);
  }
}

export function getAllInquiries(): StoredInquiry[] {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const items: StoredInquiry[] = JSON.parse(raw || '[]');
    if (items.length === 0) {
      return SEED_INQUIRIES;
    }
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error('[InquiriesStore] Error reading inquiries.json:', err);
    return SEED_INQUIRIES;
  }
}

export async function addInquiry(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  subject?: string;
  details: string;
}): Promise<StoredInquiry> {
  ensureFileExists();

  const newId = `INQ-${Date.now().toString().slice(-6)}`;
  const record: StoredInquiry = {
    id: newId,
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone?.trim() || undefined,
    company: payload.company?.trim() || undefined,
    country: payload.country?.trim() || undefined,
    subject: payload.subject?.trim() || 'Custom Manufacturing Inquiry',
    details: payload.details.trim(),
    status: 'new',
    date: new Date().toISOString()
  };

  try {
    let existing: StoredInquiry[] = [];
    try {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      existing = JSON.parse(raw || '[]');
    } catch {
      existing = [];
    }

    const updated = [record, ...existing];
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (fsErr) {
    console.error('[InquiriesStore] Error writing new inquiry to file:', fsErr);
  }

  // Also push to Supabase if active
  if (isSupabaseConfigured) {
    try {
      await supabase.from('inquiries').insert([
        {
          id: record.id,
          name: record.name,
          email: record.email,
          phone: record.phone || null,
          subject: record.subject,
          details: record.details,
          status: record.status
        }
      ]);
    } catch (dbErr) {
      console.warn('[InquiriesStore] Supabase sync skipped:', dbErr);
    }
  }

  return record;
}

export async function updateInquiryStatus(id: string, status: StoredInquiry['status']): Promise<StoredInquiry | null> {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const items: StoredInquiry[] = JSON.parse(raw || '[]');
    const idx = items.findIndex(item => item.id === id);

    if (idx === -1) {
      // If mock item not yet in file, find in SEED
      const seedItem = SEED_INQUIRIES.find(item => item.id === id);
      if (seedItem) {
        seedItem.status = status;
        const updated = [seedItem, ...items];
        fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(updated, null, 2), 'utf-8');
        return seedItem;
      }
      return null;
    }

    items[idx].status = status;
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(items, null, 2), 'utf-8');

    if (isSupabaseConfigured) {
      await supabase.from('inquiries').update({ status }).eq('id', id);
    }

    return items[idx];
  } catch (err) {
    console.error('[InquiriesStore] Error updating inquiry status:', err);
    return null;
  }
}

export async function deleteInquiry(id: string): Promise<boolean> {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    let items: StoredInquiry[] = JSON.parse(raw || '[]');
    const initialLen = items.length;
    items = items.filter(item => item.id !== id);

    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(items, null, 2), 'utf-8');

    if (isSupabaseConfigured) {
      await supabase.from('inquiries').delete().eq('id', id);
    }

    return items.length < initialLen || id.startsWith('mock-');
  } catch (err) {
    console.error('[InquiriesStore] Error deleting inquiry:', err);
    return false;
  }
}
