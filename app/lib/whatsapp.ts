export interface WhatsAppAlertPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  subject: string;
  details: string;
  inquiryId?: string;
}

export function generateWhatsAppDirectLink(payload: WhatsAppAlertPayload): string {
  const factoryNumber = process.env.NEXT_PUBLIC_FACTORY_WHATSAPP || '923133599241';
  const cleanNumber = factoryNumber.replace(/[^0-9]/g, '');

  const text = `*NEW INQUIRY / RFQ - BIN RASOOL ENTERPRISES*
━━━━━━━━━━━━━━━━━━━━
👤 *Buyer Name:* ${payload.name}
🏢 *Company/Brand:* ${payload.company || 'Direct Buyer'}
📧 *Email:* ${payload.email}
📱 *WhatsApp/Phone:* ${payload.phone || 'Not provided'}
🌍 *Destination:* ${payload.country || 'International'}
📌 *Subject:* ${payload.subject}

📝 *Requirements & Specs:*
${payload.details.slice(0, 450)}${payload.details.length > 450 ? '...' : ''}
━━━━━━━━━━━━━━━━━━━━
_Submitted via binrasoolenterprises.com_`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

export async function dispatchWhatsAppAlert(payload: WhatsAppAlertPayload): Promise<{
  dispatched: boolean;
  provider: 'meta' | 'callmebot' | 'twilio' | 'webhook' | 'simulated';
  error?: string;
}> {
  const factoryPhone = process.env.FACTORY_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_FACTORY_WHATSAPP || '923133599241';
  const cleanPhone = factoryPhone.replace(/[^0-9]/g, '');

  // 1. CallMeBot Free Direct WhatsApp Alert (Instant personal notification to phone)
  if (process.env.CALLMEBOT_API_KEY) {
    try {
      const alertMsg = `🔔 *NEW B2B RFQ ALERT*\n👤 *Buyer:* ${payload.name} (${payload.company || 'Direct'})\n🌍 *Country:* ${payload.country || 'Global'}\n📧 *Email:* ${payload.email}\n📱 *Phone:* ${payload.phone || 'N/A'}\n📌 *Subject:* ${payload.subject}\n\n📝 *Details:*\n${payload.details.slice(0, 300)}`;
      const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=+${cleanPhone}&text=${encodeURIComponent(alertMsg)}&apikey=${process.env.CALLMEBOT_API_KEY}`;
      const res = await fetch(callmebotUrl, { method: 'GET' });
      if (res.ok) {
        return { dispatched: true, provider: 'callmebot' };
      }
    } catch (cbErr: any) {
      console.error('[WhatsApp] CallMeBot error:', cbErr);
    }
  }

  // 2. Meta WhatsApp Cloud API (Graph API)
  if (process.env.META_WHATSAPP_TOKEN && process.env.META_WHATSAPP_PHONE_ID) {
    try {
      const url = `https://graph.facebook.com/v18.0/${process.env.META_WHATSAPP_PHONE_ID}/messages`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: factoryPhone.replace(/[^0-9]/g, ''),
          type: 'text',
          text: {
            preview_url: false,
            body: `[NEW B2B RFQ ALERT]\nBuyer: ${payload.name} (${payload.company || 'Direct'})\nSubject: ${payload.subject}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'N/A'}\nCountry: ${payload.country || 'Global'}\n\nDetails: ${payload.details.slice(0, 200)}...`
          }
        })
      });

      if (res.ok) {
        return { dispatched: true, provider: 'meta' };
      }
    } catch (err: any) {
      console.error('[WhatsApp] Meta Cloud API error:', err);
    }
  }

  // 2. Custom Automation Webhook (Make / Zapier / n8n / Discord / Slack)
  if (process.env.WHATSAPP_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_inquiry',
          source: 'Bin Rasool Enterprises Web Portal',
          timestamp: new Date().toISOString(),
          buyer: {
            name: payload.name,
            company: payload.company || '',
            email: payload.email,
            phone: payload.phone || '',
            country: payload.country || ''
          },
          subject: payload.subject,
          details: payload.details,
          inquiryId: payload.inquiryId,
          directWhatsAppChat: generateWhatsAppDirectLink(payload)
        })
      });

      if (res.ok) {
        return { dispatched: true, provider: 'webhook' };
      }
    } catch (err: any) {
      console.error('[WhatsApp] Webhook error:', err);
    }
  }

  // 3. Fallback / Simulation (Safe zero-crash execution)
  console.log('---------------------------------------------------------');
  console.log('[WHATSAPP DISPATCH SIMULATION] Alert generated:');
  console.log(`[WHATSAPP] Destination: +${factoryPhone}`);
  console.log(`[WHATSAPP] Lead: ${payload.name} | ${payload.subject}`);
  console.log(`[WHATSAPP] Direct Link: ${generateWhatsAppDirectLink(payload).slice(0, 80)}...`);
  console.log('---------------------------------------------------------');

  return { dispatched: true, provider: 'simulated' };
}

