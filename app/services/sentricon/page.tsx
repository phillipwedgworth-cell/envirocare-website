import SentriconService from '../../../components/pages/SentriconService';

export const metadata = {
  title: "Sentricon® Termite System Alabama | $1M Coverage | EnviroCare",
  description: "Sentricon Always Active termite baiting in Alabama — no drilling, coverage with up to $1M in damage repair coverage, subject to the terms of the agreement, priced after a free WDO inspection. Since 1958.",
  alternates: { canonical: './' },
  openGraph: {
    title: "Sentricon® Termite System Alabama | $1M Coverage | EnviroCare",
    description: "Sentricon Always Active termite baiting in Alabama — no drilling, coverage with up to $1M in damage repair coverage, subject to the terms of the agreement, priced after a free WDO inspection. Since 1958.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sentricon® Termite System Alabama | $1M Coverage | EnviroCare",
    description: "Sentricon Always Active termite baiting in Alabama — no drilling, coverage with up to $1M in damage repair coverage, subject to the terms of the agreement, priced after a free WDO inspection. Since 1958.",
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <SentriconService />;
}
