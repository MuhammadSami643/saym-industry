import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// GET /api/inquiries -> Fetch all inquiries (Admin / Backend)
export async function GET(request: Request) {
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
        { error: 'Name, email, and details/message are required fields.' },
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

