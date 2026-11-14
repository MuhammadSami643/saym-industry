import { getInquiries, getProducts } from '../actions';
import AnimatedOverviewDashboard from './components/AnimatedOverviewDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const inquiries = await getInquiries();
  const products = await getProducts();

  return (
    <AnimatedOverviewDashboard
      inquiries={inquiries}
      products={products}
    />
  );
}
