import SpecialOffers from '../../components/pages/SpecialOffers';

export const metadata = {
  title: "Special Offers & Deals | 50% Off First Mosquito | EnviroCare Alabama",
  description: "Current EnviroCare special offers: 50% off your first mosquito treatment, FREE termite inspection. Alabama pest control since 1958.",
  alternates: { canonical: '/special-offers' },
  openGraph: {
    title: "Special Offers & Deals | 50% Off First Mosquito | EnviroCare Alabama",
    description: "Current EnviroCare special offers: 50% off your first mosquito treatment, FREE termite inspection. Alabama pest control since 1958.",
    url: 'https://www.envirocarellc.com/special-offers',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Special Offers & Deals | 50% Off First Mosquito | EnviroCare Alabama",
    description: "Current EnviroCare special offers: 50% off your first mosquito treatment, FREE termite inspection. Alabama pest control since 1958.",
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <SpecialOffers />;
}
