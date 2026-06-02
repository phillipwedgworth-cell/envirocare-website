import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Hartselle Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Hartselle pest control. Morgan County family service. Sentricon® $1M coverage. Call (256) 937-7676.',
  openGraph: { url: "https://envirocare-web.vercel.app/hartselle", type: "website", images: [{ url: "/api/og?slug=hartselle", width: 1200, height: 630, alt: "EnviroCare pest control in hartselle" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=hartselle"] },
};

export default function HartsellePage() {
  return <CityPage slug="hartselle" />;
}
