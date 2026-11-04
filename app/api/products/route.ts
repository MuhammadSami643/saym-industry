import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// GET /api/products -> Fetch all products or filter by category
export async function GET(request: Request) {
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

