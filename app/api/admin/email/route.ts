import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipients, subject, content, buttonText, buttonUrl } = body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'At least one recipient email is required.' },
        { status: 400 }
      );
    }

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and message content are required.' },
        { status: 400 }
      );
    }

    const brandName = 'Bin Rasool Enterprises';
    const senderAddress = process.env.SENDER_EMAIL || 'sales@binrasoolenterprises.com';
    const replyTo = process.env.REPLY_TO_EMAIL || 'info@binrasoolenterprises.com';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';

    // Format paragraphs into HTML
    const formattedParagraphs = content
      .split('\n\n')
      .map((p: string) => `<p style="margin: 0 0 16px; line-height: 1.7; color: #334155; font-size: 15px;">${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #f1f5f9; padding: 30px 10px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
            .header-banner { background-color: #0b0b0d; padding: 28px 24px; text-align: center; border-bottom: 3px solid #f3a626; }
            .brand-title { color: #ffffff; font-size: 20px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; margin: 0; }
            .brand-sub { color: #f3a626; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; margin: 6px 0 0; }
            .body-content { padding: 36px 32px; }
            .subject-headline { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 20px; line-height: 1.3; }
            .btn-action { display: inline-block; background-color: #0b0b0d; color: #ffffff !important; font-weight: 800; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px; border: 1px solid #f3a626; margin: 16px 0; text-align: center; }
            .footer-strip { background-color: #f8fafc; padding: 22px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header-banner">
                <h1 class="brand-title">${brandName}</h1>
                <div class="brand-sub">Handcrafted Activewear &bull; Sialkot, Pakistan</div>
              </div>
              <div class="body-content">
                <h2 class="subject-headline">${subject}</h2>
                ${formattedParagraphs}
                <div style="text-align: center; margin: 28px 0 16px;">
                  <a href="${buttonUrl || siteUrl}" class="btn-action">
                    ${buttonText || 'VISIT FACTORY PORTAL &rarr;'}
                  </a>
                </div>
              </div>
              <div class="footer-strip">
                <div>You are receiving this official manufacturing communication from <strong>${brandName}</strong>.</div>
                <div style="margin-top: 6px;">&copy; ${new Date().getFullYear()} ${brandName} &bull; Sialkot, Pakistan &bull; <a href="${siteUrl}" style="color: #64748b;">binrasoolenterprises.com</a></div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Try real SMTP dispatch if credentials exist
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const toList = recipients.map((r: any) => (r.email ? (r.name ? `"${r.name}" <${r.email}>` : r.email) : r)).join(', ');

        await transporter.sendMail({
          from: `"${brandName}" <${senderAddress}>`,
          replyTo,
          to: toList,
          subject,
          html: emailHtml,
        });

        return NextResponse.json({
          success: true,
          provider: 'smtp',
          recipientCount: recipients.length,
          message: `Dispatched email successfully to ${recipients.length} buyer(s).`,
        });
      } catch (smtpErr: any) {
        console.error('SMTP dispatch failed:', smtpErr);
        return NextResponse.json(
          { error: `SMTP Dispatch Error: ${smtpErr.message || 'Failed to send through Hostinger mail server'}` },
          { status: 500 }
        );
      }
    }

    // Simulated dispatch (Zero fail, perfect for development and demonstration)
    return NextResponse.json({
      success: true,
      provider: 'simulated',
      recipientCount: recipients.length,
      message: `Dispatched email simulation to ${recipients.length} buyer(s). (SMTP not configured on local env).`,
    });
  } catch (err: any) {
    console.error('Email dispatch API error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to dispatch email.' },
      { status: 500 }
    );
  }
}

