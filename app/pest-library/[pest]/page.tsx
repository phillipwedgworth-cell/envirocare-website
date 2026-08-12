import type { Metadata } from "next";
import PestLibraryPage from "@/components/pages/PestLibraryPage";
import { getAllPests, getPest } from "@/data/pest-library";

export function generateStaticParams() {
  return getAllPests().map((p) => ({ pest: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ pest: string }> }
): Promise<Metadata> {
  const { pest: slug } = await params;
  const pest = getPest(slug);
  if (!pest) {
    return { title: "Pest Library | EnviroCare", alternates: { canonical: "/pest-library" } };
  }
  // og:url was absent across the whole /pest-library tree. Next does not derive it
  // from `alternates.canonical`, so it has to be stated — one fix here covers every
  // species page rather than one edit per pest.
  return {
    title: pest.metaTitle,
    description: pest.metaDescription,
    alternates: { canonical: `/pest-library/${pest.slug}` },
    openGraph: {
      title: pest.metaTitle,
      description: pest.metaDescription,
      url: `https://www.envirocarellc.com/pest-library/${pest.slug}`,
      type: 'article',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ pest: string }> }) {
  const { pest } = await params;
  return <PestLibraryPage slug={pest} />;
}
