import ServicesIndexPage from '@/components/pages/ServicesIndexPage';

export const metadata = {
  alternates: { canonical: '/services' },
  title: 'Alabama Pest & Termite Services | All Programs From EnviroCare Since 1958',
  description: 'All EnviroCare services: bi-monthly pest control, Sentricon® termite, mosquito & tick yard treatment, fire ant, flea, builder pre-treat, WDO letters, commercial. Family-owned. Call (205) 940-6360.',
};

export default function Page() {
  return <ServicesIndexPage />;
}
