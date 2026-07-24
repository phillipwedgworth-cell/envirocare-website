// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/blog/[slug]/page.tsx
// Commit: feat(aeo): emit BlogPosting + BreadcrumbList JSON-LD on all 30 blog posts
// Push: main
// ─────────────────────────────────
import { getPostBySlug, getAllPosts } from '@/data/blog-posts';
import BlogPostPage from '@/components/BlogPostPage';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found | EnviroCare' };
  }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`, // resolved against metadataBase; matches canonical
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.envirocarellc.com';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // BlogPosting + Breadcrumb JSON-LD.
  // Why: 30 published posts previously shipped with zero structured data, so
  // Google and the AI answer engines (ChatGPT, Perplexity, AI Overviews) had no
  // machine-readable author, date, or publisher signal to cite. This is the
  // single cheapest AEO fix available on the blog.
  const schema = post
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': `${SITE}/blog/${post.slug}#article`,
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${post.slug}` },
            headline: post.title.slice(0, 110),
            description: post.metaDescription,
            articleSection: post.category,
            wordCount: post.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
            timeRequired: `PT${post.readMinutes}M`,
            inLanguage: 'en-US',
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            author: {
              '@type': 'Person',
              name: post.author,
              worksFor: { '@type': 'Organization', name: 'EnviroCare Pest & Termite Services' },
            },
            publisher: {
              '@type': 'Organization',
              name: 'EnviroCare Pest & Termite Services',
              url: SITE,
              logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
            },
            isPartOf: { '@type': 'Blog', '@id': `${SITE}/blog#blog`, name: 'EnviroCare Pest Control Blog' },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${SITE}/blog/${post.slug}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <BlogPostPage slug={slug} />
    </>
  );
}
