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
  // 1. Heavyweight Hoodies & Fleece
  {
    id: 'prod-hoodie-1',
    name: '450 GSM Heavyweight Streetwear Hoodie',
    category: 'Heavyweight Hoodies & Fleece',
    description: 'Custom 450 GSM 100% combed cotton French Terry pullover with double-layer hood, kangaroo pocket and 2x2 ribbed hems.',
    image_url: '/images/original-generated/streetwear-hoodies.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-hoodie-2',
    name: 'Minimalist French Terry Studio Hoodie',
    category: 'Heavyweight Hoodies & Fleece',
    description: '380 GSM pre-shrunk French Terry hoodie with dyed-to-match flat drawstrings and custom woven neck label.',
    image_url: '/images/home-next-level/hero-slide-2-streetwear-hoodie.webp',
    created_at: new Date().toISOString()
  },

  // 2. Streetwear & Outerwear
  {
    id: 'prod-street-1',
    name: 'Oversized Boxy Streetwear Fleece Hoodie',
    category: 'Streetwear & Outerwear',
    description: 'Drop-shoulder boxy cut fleece streetwear hoodie with 3D high-density puff print and relaxed silhouette.',
    image_url: '/images/catalog/hoodies/minimalist-oversized-hoodie.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-street-2',
    name: 'Vintage Acid Washed Streetwear Hoodie',
    category: 'Streetwear & Outerwear',
    description: 'Mineral-washed vintage streetwear pullover with reinforced seam detailing and custom branded hangtags.',
    image_url: '/images/catalog/hoodies/vintage-washed-black-hoodie.webp',
    created_at: new Date().toISOString()
  },

  // 3. Fitness & Activewear
  {
    id: 'prod-fit-1',
    name: 'Slim Fit Tapered Gym Joggers',
    category: 'Fitness & Activewear',
    description: 'Custom slim fit gym joggers in 4-way stretch fleece with concealed zipper pockets, metal aglets and embroidered logo.',
    image_url: '/images/products/1780565647_slim-fit-gym-joggers.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-fit-2',
    name: 'Seamless High-Waist Gym Leggings Set',
    category: 'Fitness & Activewear',
    description: 'Squat-proof 75/25 Nylon Spandex high-waisted compression leggings and matching cross-back sports bra.',
    image_url: '/images/categories/1776540259_fitness-wear.webp',
    created_at: new Date().toISOString()
  },

  // 4. Boxing Gloves & Fight Gear
  {
    id: 'prod-box-1',
    name: 'Pro Leather Sparring Boxing Gloves',
    category: 'Boxing Gloves & Fight Gear',
    description: '100% full-grain cowhide leather 14oz/16oz sparring gloves with multi-layer latex foam and anatomical thumb lock.',
    image_url: '/images/catalog/boxing-gear/pro-leather-boxing-gloves.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-box-2',
    name: 'Custom Pro Competition Fight Gloves',
    category: 'Boxing Gloves & Fight Gear',
    description: 'Pro fight gloves with lace-up wrist closure, custom metallic piping and high-density impact padding.',
    image_url: '/images/catalog/boxing-gear/competition-boxing-gloves.webp',
    created_at: new Date().toISOString()
  },

  // 5. MMA, BJJ Gis & Rashguards
  {
    id: 'prod-mma-1',
    name: 'Competition BJJ Gi Kimono (450 GSM)',
    category: 'MMA, BJJ Gis & Rashguards',
    description: '450 GSM pearl weave cotton jacket with 10oz ripstop pants, reinforced knee panels and EVA foam lapel.',
    image_url: '/images/categories/1780941126_sublimation-sports-apparel.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-mma-2',
    name: 'Pro MMA Compression Rashguard',
    category: 'MMA, BJJ Gis & Rashguards',
    description: '85/15 Polyester Spandex 220 GSM rashguard with 6-panel anatomical flatlock stitching and full sublimation graphics.',
    image_url: '/images/home-next-level/home-category-boxing.webp',
    created_at: new Date().toISOString()
  },

  // 6. Tracksuits & Warmups
  {
    id: 'prod-track-1',
    name: 'Performance Athletic Tracksuit Set',
    category: 'Tracksuits & Warmups',
    description: 'Full-zip athletic polyester tricot tracksuit jacket and tapered warmup pants with custom piping and ribbed cuffs.',
    image_url: '/images/original-generated/category-tracksuits.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-track-2',
    name: 'Tapered Fleece Training Pants',
    category: 'Tracksuits & Warmups',
    description: '320 GSM cotton-poly fleece training pants with elasticated ankle cuffs, drawstring waist and side zip pockets.',
    image_url: '/images/catalog/fitness-wear/athletic-training-apparel.webp',
    created_at: new Date().toISOString()
  },

  // 7. Sublimated Teamwear & Kits
  {
    id: 'prod-team-1',
    name: 'Sublimated Soccer Team Uniform Kit',
    category: 'Sublimated Teamwear & Kits',
    description: '150 GSM moisture-wicking bird-eye poly mesh soccer jersey and athletic shorts with Italian sublimation inks.',
    image_url: '/images/categories/1780941233_soccer-jersey.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-team-2',
    name: 'Pro Mesh Basketball Uniform Kit',
    category: 'Sublimated Teamwear & Kits',
    description: 'Reversible moisture-wicking interlock mesh basketball jersey and shorts with custom team numbers and names.',
    image_url: '/images/original-generated/category-basketball-uniform.webp',
    created_at: new Date().toISOString()
  },

  // 8. Compression & Baselayers
  {
    id: 'prod-comp-1',
    name: '4-Way Stretch Compression Baselayer Set',
    category: 'Compression & Baselayers',
    description: '240 GSM warp-knit compression top and tights with graduated muscle support and flatlock anti-chafing seams.',
    image_url: '/images/home-next-level/hero-slide-3-fitness-activewear.webp',
    created_at: new Date().toISOString()
  },

  // 9. Custom Denim & Jeans
  {
    id: 'prod-denim-1',
    name: 'Raw Selvedge Denim Jeans & Jackets',
    category: 'Custom Denim & Jeans',
    description: '13.5oz ring-spun raw cotton selvedge denim with copper hardware, chainstitched hems and custom leather back patch.',
    image_url: '/images/categories/1789894942_streetwear.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-denim-2',
    name: 'Classic Vintage Washed Tapered Denim',
    category: 'Custom Denim & Jeans',
    description: '12oz comfort stretch denim with authentic stone wash, whiskering, custom embossed rivets and YKK zipper fly.',
    image_url: '/images/categories/1776540279_sports-wear.webp',
    created_at: new Date().toISOString()
  },

  // 10. Private Label Trims & Packaging
  {
    id: 'prod-trim-1',
    name: 'Custom Damask Neck Labels & Hangtags',
    category: 'Private Label Trims & Packaging',
    description: '50D high-density damask woven neck labels, satin care labels and 400 GSM foil-stamped coated retail hangtags.',
    image_url: '/images/original-generated/private-label-trims-packaging.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-trim-2',
    name: 'Custom Frosted EVA Zipper Polybags',
    category: 'Private Label Trims & Packaging',
    description: 'Eco-friendly frosted EVA zipper packaging bags with custom logo print, ventilation holes and Amazon FBA barcodes.',
    image_url: '/images/home-next-level/hero-slide-5-private-label-craft.webp',
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
