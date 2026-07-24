import type { Metadata } from "next";
import PestLibraryIndex from "@/components/pages/PestLibraryIndex";

export const metadata: Metadata = {
  title: "Alabama Pest Library | Identification & Control Guide | EnviroCare",
  description:
    "Identify Alabama pests — ants, termites, roaches, spiders, mosquitoes, ticks — and see how EnviroCare controls them. Since 1958.",
  alternates: { canonical: "/pest-library" },
  openGraph: {
    title: "Alabama Pest Library | Identification & Control Guide | EnviroCare",
    description: "Identify Alabama pests — ants, termites, roaches, spiders, mosquitoes, ticks — and see how EnviroCare controls them. Since 1958.",
    url: 'https://www.envirocarellc.com/pest-library',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alabama Pest Library | Identification & Control Guide | EnviroCare",
    description: "Identify Alabama pests — ants, termites, roaches, spiders, mosquitoes, ticks — and see how EnviroCare controls them. Since 1958.",
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <PestLibraryIndex />;
}
