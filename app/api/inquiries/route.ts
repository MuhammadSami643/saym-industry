import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/app/lib/supabase';

const MOCK_INQUIRIES = [
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

// GET /api/inquiries -> Fetch all inquiries (Admin / Backend)
export async function GET(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({
      success: true,
      count: MOCK_INQUIRIES.length,
      data: MOCK_INQUIRIES
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabase
      .from('inquiries')
      .select('*')
      .order('date', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase fetch error:', error);
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
    console.error('API /api/inquiries GET error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/inquiries -> Create a new customer inquiry / quote request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, details, message } = body;

    const messageContent = (details || message || '').trim();

    if (!name || !email || !messageContent) {
      return NextResponse.json(
        { error: 'Name, email and details/message are required fields.' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null,
          subject: subject ? subject.trim() : 'General Inquiry',
          details: messageContent,
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert inquiry error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully to database.',
        data: data?.[0] || null
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('API /api/inquiries POST error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

