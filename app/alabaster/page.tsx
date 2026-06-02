import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Alabaster Pest Control & Termite Service | EnviroCare Home Office',
  description: 'Alabaster pest control — home of EnviroCare since 1958. Bi-monthly service, Sentricon® $1M termite protection, mosquito and tick treatment. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/alabaster", type: "website", images: [{ url: "/api/og?slug=alabaster", width: 1200, height: 630, alt: "EnviroCare pest control in alabaster" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=alabaster"] },
};

export default function AlabasterPage() {
  return <CityPage slug="alabaster" />;
}
