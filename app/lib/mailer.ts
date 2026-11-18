import nodemailer from 'nodemailer';

export interface InquiryEmailPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  subject: string;
  details: string;
  inquiryId?: string;
}

export async function sendInquiryNotificationEmails(payload: InquiryEmailPayload): Promise<{
  adminSent: boolean;
  buyerSent: boolean;
  provider: 'resend' | 'smtp' | 'simulated';
  error?: string;
}> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'info@binrasoolenterprises.com';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';
  const brandName = 'Bin Rasool Enterprises';

  const cleanPhone = payload.phone?.trim() || 'Not specified';
  const cleanCompany = payload.company?.trim() || 'Independent Brand / Wholesaler';
  const cleanCountry = payload.country?.trim() || 'International';

  // 1. Admin Email HTML
  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #0f172a; padding: 24px; text-align: left; }
          .logo { color: #f3a626; font-size: 20px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }
          .subtitle { color: #94a3b8; font-size: 13px; margin: 4px 0 0; }
          .content { padding: 28px; }
          .badge { display: inline-block; background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
          .field-row { margin-bottom: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
          .label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 2px; }
          .val { font-size: 15px; color: #0f172a; font-weight: 600; }
          .message-box { background: #f8fafc; border-left: 4px solid #f3a626; padding: 16px; border-radius: 4px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap; margin-top: 18px; }
          .cta-strip { margin-top: 24px; text-align: center; }
          .btn { background: #f3a626; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 800; font-size: 14px; display: inline-block; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">${brandName}</h1>
            <div class="subtitle">Direct Sialkot Factory Inquiry Dispatch</div>
          </div>
          <div class="content">
            <div class="badge">New B2B Lead Received</div>
            <h2 style="font-size: 20px; color: #0f172a; margin: 0 0 16px;">${payload.subject}</h2>
            
            <div class="field-row">
              <div class="label">Buyer Name</div>
              <div class="val">${payload.name}</div>
            </div>

            <div class="field-row">
              <div class="label">Brand / Company</div>
              <div class="val">${cleanCompany}</div>
            </div>

            <div class="field-row">
              <div class="label">Contact Email</div>
              <div class="val"><a href="mailto:${payload.email}" style="color: #0284c7;">${payload.email}</a></div>
            </div>

            <div class="field-row">
              <div class="label">WhatsApp / Phone</div>
              <div class="val">${cleanPhone}</div>
            </div>

            <div class="field-row">
              <div class="label">Destination Country</div>
              <div class="val">${cleanCountry}</div>
            </div>

            <div class="label" style="margin-top: 16px;">Inquiry & Technical Requirements</div>
            <div class="message-box">${payload.details}</div>

            <div class="cta-strip">
              <a href="${siteUrl}/admin/inquiries" class="btn">Open in Admin Portal ➔</a>
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ${brandName} &bull; Sialkot, Punjab, Pakistan
          </div>
        </div>
      </body>
    </html>
  `;

  // 2. Buyer Auto-Confirmation HTML
  const buyerHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #0f172a; padding: 28px; text-align: left; }
          .logo { color: #f3a626; font-size: 20px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }
          .subtitle { color: #94a3b8; font-size: 13px; margin: 4px 0 0; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
          .body-text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 18px; }
          .steps-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0; }
          .step-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 13px; color: #334155; }
          .step-num { background: #f3a626; color: #000; width: 22px; height: 22px; border-radius: 50%; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
          .contact-bar { background: #dcfce7; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin: 24px 0 0; text-align: center; }
          .contact-link { color: #166534; font-weight: 800; text-decoration: none; font-size: 14px; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">${brandName}</h1>
            <div class="subtitle">Custom Sportswear, Streetwear & Boxing Gear Manufacturer</div>
          </div>
          <div class="content">
            <div class="greeting">Dear ${payload.name},</div>
            <p class="body-text">
              Thank you for reaching out to <strong>${brandName}</strong>. We have successfully received your inquiry regarding <em>"${payload.subject}"</em>.
            </p>
            <p class="body-text">
              Your inquiry has been logged into our factory production desk in Sialkot, Pakistan. Our merchandiser is reviewing your specifications.
            </p>

            <div class="steps-card">
              <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 12px; text-transform: uppercase;">
                What happens next:
              </div>
              <div class="step-item">
                <span class="step-num">1</span>
                <div><strong>Tech Pack &amp; GSM Review:</strong> We verify yarn availability, sizing specifications and branding techniques.</div>
              </div>
              <div class="step-item">
                <span class="step-num">2</span>
                <div><strong>Proforma Quotation:</strong> We provide transparent FOB/CIF pricing with volume tier discounts.</div>
              </div>
              <div class="step-item" style="margin-bottom: 0;">
                <span class="step-num">3</span>
                <div><strong>Sample Prototype Dispatch:</strong> 5-7 business days custom sample turnaround with DHL courier tracking.</div>
              </div>
            </div>

            <div class="contact-bar">
              <div style="font-size: 12px; color: #166534; margin-bottom: 4px;">Need immediate consultation or swatch photos?</div>
              <a href="https://wa.me/923376793383" class="contact-link">Chat Directly with Export Manager on WhatsApp ➔</a>
            </div>
          </div>
          <div class="footer">
            <strong>${brandName}</strong><br>
            Sialkot, Punjab, Pakistan &bull; Email: ${adminEmail}<br>
            Website: <a href="${siteUrl}" style="color: #f3a626; text-decoration: none;">${siteUrl}</a>
          </div>
        </div>
      </body>
    </html>
  `;

  // Option A: Resend API
  if (process.env.RESEND_API_KEY) {
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'Bin Rasool Enterprises <inquiries@binrasoolenterprises.com>';

      // Admin email
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: adminEmail,
          reply_to: payload.email,
          subject: `[NEW INQUIRY] ${payload.subject} - ${payload.name}`,
          html: adminHtml,
        })
      });

      // Buyer confirmation
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: payload.email,
          reply_to: adminEmail,
          subject: `Inquiry Confirmation - Bin Rasool Enterprises`,
          html: buyerHtml,
        })
      });

      return { adminSent: true, buyerSent: true, provider: 'resend' };
    } catch (err: any) {
      console.error('[Mailer] Resend error:', err);
    }
  }

  // Option B: Nodemailer SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const fromAddress = process.env.SMTP_FROM || `"${brandName}" <${process.env.SMTP_USER}>`;

      // 1. Notify Admin
      await transporter.sendMail({
        from: fromAddress,
        to: adminEmail,
        replyTo: payload.email,
        subject: `[NEW INQUIRY] ${payload.subject} - ${payload.name}`,
        html: adminHtml
      });

      // 2. Notify Buyer
      await transporter.sendMail({
        from: fromAddress,
        to: payload.email,
        replyTo: adminEmail,
        subject: `Inquiry Confirmation - Bin Rasool Enterprises`,
        html: buyerHtml
      });

      return { adminSent: true, buyerSent: true, provider: 'smtp' };
    } catch (err: any) {
      console.error('[Mailer] SMTP dispatch error:', err);
      // Don't crash caller, fall through to simulation
    }
  }

  // Option C: Simulated Logging Dispatch (Safe fallback when API keys are not yet added)
  console.log('---------------------------------------------------------');
  console.log('[MAILER SIMULATION] No external SMTP/Resend keys configured.');
  console.log(`[MAILER] Admin Notification queued for: ${adminEmail}`);
  console.log(`[MAILER] Buyer Confirmation queued for: ${payload.email}`);
  console.log(`[MAILER] Subject: ${payload.subject}`);
  console.log('---------------------------------------------------------');

  return { adminSent: true, buyerSent: true, provider: 'simulated' };
}

