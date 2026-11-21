"use server";

import { supabase, isSupabaseConfigured } from './lib/supabase';
import { sendInquiryNotificationEmails } from './lib/mailer';
import { getAllInquiries, addInquiry } from './lib/inquiriesStore';

export type Inquiry = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  details: string;
  status?: string;
  date?: string;
};

const FALLBACK_INQUIRIES: Inquiry[] = [
  {
    id: 'mock-1',
    name: 'Marcus Vance',
    email: 'marcus@peakfitness.com',
    phone: '+1 415 889 0122',
    subject: 'Custom Joggers & Gym Hoodies (500 pcs)',
    details: 'Looking for 300 GSM French Terry gym hoodies and matching slim-fit joggers with custom silicone heat transfer logo.',
    date: new Date().toISOString(),
    status: 'new'
  },
  {
    id: 'mock-2',
    name: 'Sarah Jenkins',
    email: 'sarah@athletixstudio.co.uk',
    phone: '+44 20 7946 0919',
    subject: 'Private Label Leggings & Sports Bras',
    details: 'Hi Bin Rasool Enterprises, we want to launch a 4-colorway activewear capsule: 75% Nylon 25% Spandex squat proof leggings with matching bra tops.',
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'contacted'
  }
];

export async function submitInquiry(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim() || '';
  const company = (formData.get('company') as string)?.trim() || '';
  const country = (formData.get('country') as string)?.trim() || '';
  const subject = (formData.get('subject') as string)?.trim() || 'General Inquiry';
  const details = ((formData.get('details') || formData.get('message') || '') as string).trim();

  if (!name || !email || !details) {
    return { error: "Please fill in all required fields (Name, Email, Details/Message)." };
  }

  // Trigger automated email dispatch
  try {
    await sendInquiryNotificationEmails({
      name,
      email,
      phone,
      company,
      country,
      subject,
      details
    });
  } catch (mErr) {
    console.error("Non-fatal mailer error:", mErr);
  }

  // Persist inquiry to local store & database
  try {
    await addInquiry({
      name,
      email,
      phone,
      company,
      country,
      subject,
      details
    });
  } catch (saveErr) {
    console.error("Error saving inquiry:", saveErr);
  }

  return { success: true };
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    return getAllInquiries() as Inquiry[];
  } catch {
    return FALLBACK_INQUIRIES;
  }
}

export type Product = {
  id?: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  created_at?: string;
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Slim Fit Gym Joggers',
    category: 'Fitness Wear',
    description: 'Custom Slim Fit Gym Joggers manufactured in Sialkot. 4-way stretch, tapered fit with zip pockets.',
    image_url: '/images/products/1780565647_slim-fit-gym-joggers.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-2',
    name: 'Seamless Compression Leggings',
    category: 'Fitness Wear',
    description: 'Squat-proof high-waisted performance leggings with moisture-wicking interlock fabric.',
    image_url: '/images/categories/1776540259_fitness-wear.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-3',
    name: 'Performance Tracksuit & Training Set',
    category: 'Sports Wear',
    description: 'Breathable moisture-wicking team and training tracksuit for sports clubs and athletes.',
    image_url: '/images/categories/1776540279_sports-wear.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-4',
    name: 'Pro Fight Boxing Shorts & Robe',
    category: 'Boxing Wear',
    description: 'Custom satin and microfiber boxing shorts with embroidered waistband and side panels.',
    image_url: '/images/categories/1776540301_boxing-wear.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-5',
    name: 'Luxury Oversized Streetwear Hoodie',
    category: 'Streetwear',
    description: '450 GSM luxury French Terry oversized drop-shoulder hoodie with custom branding.',
    image_url: '/images/categories/1789894942_streetwear.webp',
    created_at: new Date().toISOString()
  }
];

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return DEFAULT_PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return DEFAULT_PRODUCTS;
    }

    return data as Product[];
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export async function addProduct(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const category = (formData.get('category') as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || '';
  const image_url = (formData.get('image_url') as string)?.trim() || '/images/products/1780565647_slim-fit-gym-joggers.webp';

  if (!name || !category) {
    return { error: "Name and Category are required" };
  }

  try {
    const { error } = await supabase
      .from('products')
      .insert([
        { name, category, description, image_url }
      ]);

    if (error) {
      return { error: error.message };
    }
    
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
