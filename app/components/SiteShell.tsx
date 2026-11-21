"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsAppSelector from './FloatingWhatsAppSelector';
import { CurrencyProvider } from '../lib/currency';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CurrencyProvider>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
      <FloatingWhatsAppSelector />
    </CurrencyProvider>
  );
}
