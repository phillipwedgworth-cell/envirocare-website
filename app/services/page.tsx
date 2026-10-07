import ServicesIndexPage from '@/components/pages/ServicesIndexPage';
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata = {
  alternates: { canonical: '/services' },
  title: 'Alabama Pest & Termite Control | EnviroCare Since 1958',
  description: 'EnviroCare services: bi-monthly pest control, Sentricon® termite, mosquito and tick, fire ant, WDO letters and commercial. Since 1958. (205) 940-6360.',
  openGraph: {
    title: 'Alabama Pest & Termite Control | EnviroCare Since 1958',
    description: 'EnviroCare services: bi-monthly pest control, Sentricon® termite, mosquito and tick, fire ant, WDO letters and commercial. Since 1958. (205) 940-6360.',
    url: 'https://www.envirocarellc.com/services',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alabama Pest & Termite Control | EnviroCare Since 1958',
    description: 'EnviroCare services: bi-monthly pest control, Sentricon® termite, mosquito and tick, fire ant, WDO letters and commercial. Since 1958. (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Services', path: '/services' }]) }) }} />
      <ServicesIndexPage />
    </>
  );
}
