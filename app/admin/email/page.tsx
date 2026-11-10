import { Suspense } from 'react';
import { getInquiries } from '../../actions';
import EmailComposerClient, { BuyerContact } from './EmailComposerClient';

export const dynamic = 'force-dynamic';

export default async function AdminEmailPage() {
  const inquiries = await getInquiries();

  // Extract unique buyer contacts from inquiries
  const uniqueBuyersMap = new Map<string, BuyerContact>();

  inquiries.forEach((inq) => {
    if (inq.email && !uniqueBuyersMap.has(inq.email.toLowerCase())) {
      uniqueBuyersMap.set(inq.email.toLowerCase(), {
        id: inq.id,
        name: inq.name || 'Valued Client',
        email: inq.email.toLowerCase(),
        company: (inq as any).company || 'Private Label Buyer',
        country: (inq as any).country || 'International',
      });
    }
  });

  const buyers = Array.from(uniqueBuyersMap.values());

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#111827' }}>
          Email Communication &amp; Broadcast Suite
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
          Compose custom manufacturing quotations, production updates, or broadcast announcements with live inbox preview.
        </p>
      </div>

      <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading email workspace...</div>}>
        <EmailComposerClient initialBuyers={buyers} />
      </Suspense>
    </div>
  );
}
