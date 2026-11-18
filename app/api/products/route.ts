import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/app/lib/supabase';

const DEFAULT_PRODUCTS = [
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

// GET /api/products -> Fetch all products or filter by category
export async function GET(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({
      success: true,
      count: DEFAULT_PRODUCTS.length,
      data: DEFAULT_PRODUCTS
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase fetch products error:', error);
      return NextResponse.json(
        { error: error.message, data: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      data: data || []
    });
  } catch (err: any) {
    console.error('API /api/products GET error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/products -> Add a new product to the catalog
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, description, image_url } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required fields.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: name.trim(),
          category: category.trim(),
          description: description ? description.trim() : null,
          image_url: image_url ? image_url.trim() : '/images/products/1780565647_slim-fit-gym-joggers.webp'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert product error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product added successfully',
        data: data?.[0]
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('API /api/products POST error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

