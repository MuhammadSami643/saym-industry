import { getProducts } from '../../actions';
import ProductManagerClient from './ProductManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
  const products = await getProducts();
  return <ProductManagerClient initialProducts={products} />;
}
