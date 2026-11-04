import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// POST /api/contact -> Public contact form submission endpoint
export async function POST(request: Request) {
  try {
    let name = '';
    let email = '';
    let phone = '';
    let subject = '';
    let details = '';

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      name = body.name || '';
      email = body.email || '';
      phone = body.phone || '';
      subject = body.subject || '';
      details = body.details || body.message || '';
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      name = (formData.get('name') as string) || '';
      email = (formData.get('email') as string) || '';
      phone = (formData.get('phone') as string) || '';
      subject = (formData.get('subject') as string) || '';
      details = (formData.get('details') as string) || (formData.get('message') as string) || '';
    }

    name = name.trim();
    email = email.trim().toLowerCase();
    details = details.trim();

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Name, email, and details are required.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          email,
          phone: phone.trim() || null,
          subject: subject.trim() || 'Website Inquiry',
          details,
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.error('Contact API error inserting to Supabase:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received.',
      id: data?.[0]?.id
    });
  } catch (err: any) {
    console.error('API /api/contact error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

