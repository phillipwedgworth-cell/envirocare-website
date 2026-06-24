import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/crawlspace' },
  title: 'Crawlspace Moisture Control & Vapor Barriers in Alabama | EnviroCare',
  description: 'Alabama crawlspace moisture control, vapor barriers & encapsulation that stop humidity, termites, mold & musty odors. Free inspection. Family-owned since 1958. Call (205) 940-6360.',
};

export default function CrawlspacePage() {
  return <ServicePage slug="crawlspace" />;
}
