import ContactUs from '../../components/pages/ContactUs';

export const metadata = {
  title: "Contact EnviroCare | 3 Alabama Offices | Free Inspection",
  description: "Contact EnviroCare — family-owned Alabama pest control since 1958. Three offices: Birmingham, Lake Martin & Huntsville. Schedule service. Free inspection.",
  alternates: { canonical: './' },
  openGraph: {
    title: "Contact EnviroCare | 3 Alabama Offices | Free Inspection",
    description: "Contact EnviroCare — family-owned Alabama pest control since 1958. Three offices: Birmingham, Lake Martin & Huntsville. Schedule service. Free inspection.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact EnviroCare | 3 Alabama Offices | Free Inspection",
    description: "Contact EnviroCare — family-owned Alabama pest control since 1958. Three offices: Birmingham, Lake Martin & Huntsville. Schedule service. Free inspection.",
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <ContactUs />;
}
