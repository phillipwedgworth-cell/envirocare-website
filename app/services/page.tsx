import ServicesIndexPage from '@/components/pages/ServicesIndexPage';

export const metadata = {
  alternates: { canonical: '/services' },
  title: 'Alabama Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'All EnviroCare services — bi-monthly pest control, Sentricon® termite, mosquito & tick, fire ant, WDO letters, commercial. Call (205) 940-6360.',
  openGraph: {
    title: 'Alabama Pest Control & Termite Service | EnviroCare Since 1958',
    description: 'All EnviroCare services — bi-monthly pest control, Sentricon® termite, mosquito & tick, fire ant, WDO letters, commercial. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/services',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alabama Pest Control & Termite Service | EnviroCare Since 1958',
    description: 'All EnviroCare services — bi-monthly pest control, Sentricon® termite, mosquito & tick, fire ant, WDO letters, commercial. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <ServicesIndexPage />;
}
