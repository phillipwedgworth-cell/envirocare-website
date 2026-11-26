import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/flea' },
  title: "Flea Control Birmingham AL | Interior Service | EnviroCare",
  description: "Flea control that breaks the life cycle in carpet and bedding, not just on pets. Interior service, quoted for your home. Call (205) 940-6360.",
  openGraph: {
    title: "Flea Control Birmingham AL | Interior Service | EnviroCare",
    description: "Flea control that breaks the life cycle in carpet and bedding, not just on pets. Interior service, quoted for your home. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/services/flea',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flea Control Birmingham AL | Interior Service | EnviroCare",
    description: "Flea control that breaks the life cycle in carpet and bedding, not just on pets. Interior service, quoted for your home. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function FleaPage() {
  return <ServicePage slug="flea" />;
}
