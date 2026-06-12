import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/crawlspace' },
  title: 'Alabama Crawlspace Pest & Moisture Service | EnviroCare',
  description: 'Crawlspace moisture control, vapor barriers, and targeted pest treatment. Family-owned. Call (205) 940-6360.',
};

export default function CrawlspacePage() {
  return <ServicePage slug="crawlspace" />;
}
