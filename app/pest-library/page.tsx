import type { Metadata } from "next";
import PestLibraryIndex from "@/components/pages/PestLibraryIndex";
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata: Metadata = {
  title: "Alabama Pest Library | Identify & Control Pests | EnviroCare",
  description:
    "Identify Alabama pests, from ants, termites and roaches to spiders, mosquitoes and ticks, and see how EnviroCare treats each one. (205) 940-6360.",
  alternates: { canonical: "/pest-library" },
  openGraph: {
    title: "Alabama Pest Library | Identify & Control Pests | EnviroCare",
    description: "Identify Alabama pests, from ants, termites and roaches to spiders, mosquitoes and ticks, and see how EnviroCare treats each one. (205) 940-6360.",
    url: 'https://www.envirocarellc.com/pest-library',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alabama Pest Library | Identify & Control Pests | EnviroCare",
    description: "Identify Alabama pests, from ants, termites and roaches to spiders, mosquitoes and ticks, and see how EnviroCare treats each one. (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Pest Library', path: '/pest-library' }]) }) }} />
      <PestLibraryIndex />
    </>
  );
}
