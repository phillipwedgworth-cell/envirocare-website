import SentriconService from '../../../components/pages/SentriconService';

export const metadata = {
  title: "Sentricon® Termite Baiting in Alabama | Free Inspection",
  description: "Sentricon® Always Active™ termite baiting in Alabama: usually no drilling, EnviroCare damage repair coverage, priced after a free termite inspection.",
  alternates: { canonical: './' },
  openGraph: { url: 'https://www.envirocarellc.com/services/sentricon',
    title: "Sentricon® Termite Baiting in Alabama | Free Inspection",
    description: "Sentricon® Always Active™ termite baiting in Alabama: usually no drilling, EnviroCare damage repair coverage, priced after a free termite inspection.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sentricon® Termite Baiting in Alabama | Free Inspection",
    description: "Sentricon® Always Active™ termite baiting in Alabama: usually no drilling, EnviroCare damage repair coverage, priced after a free termite inspection.",
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <SentriconService />;
}
