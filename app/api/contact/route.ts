import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import { sendInquiryNotificationEmails } from '@/app/lib/mailer';
import { dispatchWhatsAppAlert, generateWhatsAppDirectLink } from '@/app/lib/whatsapp';

// POST /api/contact -> Public contact form & RFQ submission endpoint with email notifications
export async function POST(request: Request) {
  try {
    let name = '';
    let email = '';
    let phone = '';
    let company = '';
    let country = '';
    let subject = '';
    let details = '';
    let techpackUrl = '';
    let videoUrl = '';

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      name = body.name || '';
      email = body.email || '';
      phone = body.phone || '';
      company = body.company || '';
      country = body.country || '';
      subject = body.subject || '';
      details = body.details || body.message || '';
      techpackUrl = body.techpackUrl || body.fileUrl || '';
      videoUrl = body.videoUrl || '';
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      name = (formData.get('name') as string) || '';
      email = (formData.get('email') as string) || '';
      phone = (formData.get('phone') as string) || '';
      company = (formData.get('company') as string) || '';
      country = (formData.get('country') as string) || '';
      subject = (formData.get('subject') as string) || '';
      details = (formData.get('details') as string) || (formData.get('message') as string) || '';
      techpackUrl = (formData.get('techpackUrl') as string) || (formData.get('fileUrl') as string) || '';
      videoUrl = (formData.get('videoUrl') as string) || '';
    }

    name = name.trim();
    email = email.trim().toLowerCase();
    details = details.trim();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';

    if (techpackUrl) {
      const fullTechUrl = techpackUrl.startsWith('http') ? techpackUrl : `${siteUrl}${techpackUrl}`;
      details = `${details}\n\n📁 [ATTACHED TECH PACK / CAD SPECIFICATION]:\n${fullTechUrl}`;
    }

    if (videoUrl) {
      const fullVideoUrl = videoUrl.startsWith('http') ? videoUrl : `${siteUrl}${videoUrl}`;
      details = `${details}\n\n🎥 [GARMENT SAMPLE & STITCHING VIDEO SPEC]:\n${fullVideoUrl}`;
    }

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Name, email and details are required.' },
        { status: 400 }
      );
    }

    let insertedId: string | undefined;

    // 1. Insert into Supabase Inquiries table
    try {
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
        console.warn('Contact API notice: Supabase insert fallback', error.message);
      } else if (data?.[0]?.id) {
        insertedId = data[0].id;
      }
    } catch (dbErr) {
      console.warn('Supabase insert skipped or unavailable:', dbErr);
    }

    // 2. Dispatch automated Email notifications (Factory Admin & Buyer confirmation)
    let emailResult: { adminSent: boolean; buyerSent: boolean; provider: 'resend' | 'smtp' | 'simulated'; error?: string } = {
      adminSent: true,
      buyerSent: true,
      provider: 'simulated'
    };
    try {
      emailResult = await sendInquiryNotificationEmails({
        name,
        email,
        phone,
        company,
        country,
        subject: subject.trim() || 'Custom Manufacturing Inquiry',
        details,
        inquiryId: insertedId
      });
    } catch (mailErr) {
      console.error('Email dispatch error (non-fatal):', mailErr);
    }

    // 3. Dispatch automated WhatsApp alert & generate direct quick-chat link
    const waPayload = {
      name,
      email,
      phone,
      company,
      country,
      subject: subject.trim() || 'Custom Manufacturing Inquiry',
      details,
      inquiryId: insertedId
    };

    let waResult = { dispatched: true, provider: 'simulated' };
    try {
      waResult = await dispatchWhatsAppAlert(waPayload);
    } catch (waErr) {
      console.error('WhatsApp webhook error (non-fatal):', waErr);
    }

    const whatsAppDirectUrl = generateWhatsAppDirectLink(waPayload);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our production team will contact you shortly.',
      id: insertedId,
      emailDispatched: emailResult.adminSent && emailResult.buyerSent,
      emailProvider: emailResult.provider,
      whatsAppDispatched: waResult.dispatched,
      whatsAppProvider: waResult.provider,
      whatsAppDirectUrl
    });
  } catch (err: any) {
    console.error('API /api/contact error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
