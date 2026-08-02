import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/commercial' },
  title: 'Commercial Pest Control in Alabama | EnviroCare',
  description: 'Commercial pest control for Alabama restaurants, retail, offices & warehouses. After-hours scheduling, audit-ready logs. Call (205) 940-6360.',
  openGraph: {
    title: 'Commercial Pest Control in Alabama | EnviroCare',
    description: 'Commercial pest control for Alabama restaurants, retail, offices & warehouses. After-hours scheduling, audit-ready logs. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/services/commercial',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Pest Control in Alabama | EnviroCare',
    description: 'Commercial pest control for Alabama restaurants, retail, offices & warehouses. After-hours scheduling, audit-ready logs. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function CommercialPage() {
  return <ServicePage slug="commercial" />;
}
