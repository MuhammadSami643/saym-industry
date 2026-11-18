import type { Metadata } from 'next';
import LineSheetView from './LineSheetView';

export const metadata: Metadata = {
  title: "Official 2026 B2B Apparel Line Sheet & Product Catalog (PDF) | Bin Rasool Enterprises",
  description: "Download and print the official 2026 wholesale garment line sheet, fabric GSM specs, MOQ tiers, private labeling techniques and export pricing from Bin Rasool Enterprises, Sialkot, Pakistan.",
  alternates: {
    canonical: '/linesheet',
  },
};

export default function LineSheetPage() {
  return <LineSheetView />;
}

