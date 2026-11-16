import batch from '@/agents/knowledge/editorial-batch-36.json';
import sourceRegistry from '@/agents/knowledge/editorial-sources.json';

export type BlogCitation = {
  id: string;
  title: string;
  url: string;
  supports: string;
};

const sources = new Map(
  sourceRegistry.sources.map(source => [source.id, source] as const),
);

const sourceIdsBySlug = new Map(
  batch.posts.map(post => [post.slug, post.sourceIds] as const),
);

/**
 * Returns the primary-source citations assigned during the PR #287 editorial review.
 * These are factual references, not endorsements of EnviroCare.
 */
export function getBlogCitations(slug: string): BlogCitation[] {
  const ids = sourceIdsBySlug.get(slug) ?? [];
  return ids
    .map(id => sources.get(id))
    .filter((source): source is BlogCitation => Boolean(source))
    .map(source => ({
      id: source.id,
      title: source.title,
      url: source.url,
      supports: source.supports,
    }));
}
