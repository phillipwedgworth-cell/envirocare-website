import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/flea' },
  title: 'Flea Control in Birmingham, AL | Interior Treatment | EnviroCare',
  description: 'Flea control that breaks the life cycle in carpet & bedding, not just on pets. Interior service, $128/qtr. Birmingham & across Alabama. (205) 940-6360.',
  openGraph: {
    title: 'Flea Control in Birmingham, AL | Interior Treatment | EnviroCare',
    description: 'Flea control that breaks the life cycle in carpet & bedding, not just on pets. Interior service, $128/qtr. Birmingham & across Alabama. (205) 940-6360.',
    url: 'https://www.envirocarellc.com/services/flea',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flea Control in Birmingham, AL | Interior Treatment | EnviroCare',
    description: 'Flea control that breaks the life cycle in carpet & bedding, not just on pets. Interior service, $128/qtr. Birmingham & across Alabama. (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function FleaPage() {
  return <ServicePage slug="flea" />;
}
