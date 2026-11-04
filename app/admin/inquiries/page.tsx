import { getInquiries } from '../../actions';
import InquiriesManagerClient from './InquiriesManagerClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Admin - Customer Inquiries | ZYPFIT",
};

export default async function AdminInquiries() {
  const inquiries = await getInquiries();

  return <InquiriesManagerClient initialInquiries={inquiries} />;
}
