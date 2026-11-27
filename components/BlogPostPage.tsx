// Server-rendered: do not ship the complete blog archive in browser JavaScript.

import { getPostBySlug, isPublished } from '@/data/blog-posts';
import { getBlogVisual } from '@/data/blog-visuals';
import { getBlogCitations } from '@/data/blog-citations';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Termite, Sentricon and WDO posts link back to the termite hub (2026-11-27).
// The Nov 27 live crawl found most of these posts with one or two internal
// links in; the hub links out to each of them, and this links each one back.
const TERMITE_GUIDE_SLUGS = new Set([
  'termite-bond-alabama-explained', 'homeowners-insurance-termite-damage-alabama',
  'how-long-does-sentricon-take-to-work', 'is-sentricon-worth-it', 'carpenter-ants-vs-termites-alabama',
  'formosan-termites-alabama', 'termite-questions-alabama-homeowners', 'termite-damage-signs-alabama',
  'termite-treatment-cost-alabama', 'green-caps-in-yard-sentricon', 'termite-inspection-before-buying-home-alabama',
  'alabama-termite-swarm-season', 'sentricon-vs-liquid-termite-treatment', 'real-estate-wdo-letter-explained',
  'termite-season-2026-alabama', 'how-to-identify-termites-alabama',
]);

export default function BlogPostPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post || !isPublished(post)) {
    notFound();
  }

  const photo = getBlogVisual(post);
  const citations = getBlogCitations(post.slug);

  return (
    <main className="bpp-main">
      <style dangerouslySetInnerHTML={{ __html: POST_CSS }} />

      <article>
        <header className="bpp-hero">
          <div className="bpp-hero-inner">
            <Link href="/blog" className="bpp-back">← All Field Notes</Link>
            <div className="bpp-meta">
              <span className="bpp-cat">{post.category}</span>
              <span className="bpp-time">{post.readMinutes} min read</span>
            </div>
            <div className="bpp-hero-img">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                quality={86}
                sizes="(max-width: 860px) 100vw, 860px"
                style={{ objectFit: 'cover', objectPosition: photo.position ?? 'center' }}
              />
            </div>
            <h1 className="bpp-title">{post.title}</h1>
            <p className="bpp-excerpt">{post.excerpt}</p>
            <div className="bpp-byline">
              By <strong>{post.author}</strong> · <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
              })}</time>
            </div>
          </div>
        </header>

        <div className="bpp-body-wrap">
          <div className="bpp-body" dangerouslySetInnerHTML={{ __html: post.body }} />
          {TERMITE_GUIDE_SLUGS.has(post.slug) && (
            <p className="bpp-guide-link" style={{ margin: '28px 0 0', padding: '14px 18px', background: '#F3F8F4', borderLeft: '4px solid #0E8E40', borderRadius: 6, fontSize: 16, lineHeight: 1.6 }}>
              Part of our{' '}
              <Link href="/termite-protection-alabama" style={{ color: '#0E8E40', fontWeight: 700 }}>
                Alabama termite protection guide
              </Link>
              : termite bonds, Sentricon®, inspection costs, WDO letters, new construction and lake homes in one place.
            </p>
          )}
          {citations.length > 0 && (
            <aside className="bpp-sources" aria-labelledby="bpp-sources-heading">
              <h2 id="bpp-sources-heading">Sources &amp; further reading</h2>
              <p className="bpp-sources-note">
                Primary and public-health references used for factual context. These organizations do not endorse EnviroCare.
              </p>
              <ul>
                {citations.map(source => (
                  <li key={source.id}>
                    <a href={source.url} rel="noreferrer">{source.title}</a>
                    <span>{source.supports}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <section className="bpp-cta-section">
          <div className="bpp-cta-inner">
            <h2 className="bpp-cta-title">Ready to Schedule?</h2>
            <p className="bpp-cta-sub">Call the EnviroCare office nearest you.</p>
            <div className="bpp-cta-phones">
              <a href="tel:2059912882" className="bpp-cta-phone">
                <strong>Birmingham</strong>(205) 991-2882
              </a>
              <a href="tel:2059406360" className="bpp-cta-phone">
                <strong>Alabaster</strong>(205) 940-6360
              </a>
              <a href="tel:2562346162" className="bpp-cta-phone">
                <strong>Lake Martin / Alex City</strong>(256) 234-6162
              </a>
              <a href="tel:2569377676" className="bpp-cta-phone">
                <strong>Huntsville</strong>(256) 937-7676
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

const POST_CSS = `
.bpp-main {
  font-family: var(--font-sans);
  background: #FEFDF8;
  color: #0E1A0F;
}
.bpp-hero {
  padding: 62px 24px 64px;
  background: linear-gradient(180deg, #F0F7F1 0%, #FEFDF8 100%);
}
.bpp-hero-inner {
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}
.bpp-back {
  display: inline-block;
  font-size: 14px;
  color: #0A7935;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 32px;
}
.bpp-back:hover { text-decoration: underline; }
.bpp-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}
.bpp-cat {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #0A7935;
  background: #E8F5EE;
  padding: 6px 14px;
  border-radius: 999px;
}
.bpp-time {
  font-size: 13px;
  color: #5A6660;
}
.bpp-hero-img {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 24px auto 30px;
  border-radius: 12px;
  overflow: hidden;
  background: #E5EEE8;
  box-shadow: 0 12px 34px rgba(16,44,30,.12);
}
.bpp-hero-img img { display: block; width: 100%; height: 100%; }
@media (max-width: 640px) {
  .bpp-hero-img { margin: 18px 0 24px; border-radius: 8px; }
}
.bpp-title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 20px;
  color: #0E1A0F;
}
.bpp-excerpt {
  font-size: 19px;
  color: #5A6660;
  line-height: 1.55;
  margin: 0 0 28px;
  font-style: italic;
}
.bpp-byline {
  font-size: 14px;
  color: #5A6660;
}
.bpp-byline strong { color: #0E1A0F; }
.bpp-body-wrap {
  padding: 60px 24px;
}
.bpp-body {
  max-width: 720px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.7;
  color: #1A2620;
}
/* Keep wide comparison tables and long links inside a mobile article. */
.bpp-body table { display: block; max-width: 100%; overflow-x: auto; }
.bpp-body img { max-width: 100%; height: auto; }
.bpp-body a { overflow-wrap: anywhere; }
.bpp-body p { margin: 0 0 1.4em; }
.bpp-body p.lede {
  font-size: 22px;
  line-height: 1.5;
  color: #0E1A0F;
  border-left: 4px solid #F5A800;
  padding-left: 20px;
  font-family: var(--font-serif);
  font-style: italic;
}
.bpp-body h2 {
  font-family: var(--font-serif);
  font-size: 30px;
  font-weight: 700;
  margin: 2em 0 0.6em;
  color: #0E1A0F;
  line-height: 1.25;
}
.bpp-body h3 {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
  margin: 1.6em 0 0.5em;
  color: #0E1A0F;
}
.bpp-body ul, .bpp-body ol {
  margin: 0 0 1.4em;
  padding-left: 1.5em;
}
.bpp-body li {
  margin-bottom: 0.6em;
}
.bpp-body strong { color: #0E1A0F; }
.bpp-body em { font-style: italic; }
.bpp-body .post-fig { margin: 1.8em 0 2em; }
.bpp-body .post-fig img { display: block; width: 100%; height: auto; border-radius: 12px; border: 1px solid #E3E8E4; }
.bpp-body .post-fig figcaption { margin-top: 8px; font-size: 13px; line-height: 1.5; color: #5A6660; }
.bpp-body a {
  color: #0A7935;
  font-weight: 600;
}
.bpp-sources {
  max-width: 720px;
  margin: 44px auto 0;
  padding-top: 30px;
  border-top: 1px solid #DCE6DF;
}
.bpp-sources h2 {
  margin: 0 0 8px;
  font-family: var(--font-serif);
  font-size: 24px;
  color: #0E1A0F;
}
.bpp-sources-note {
  margin: 0 0 18px;
  color: #5A6660;
  font-size: 14px;
  line-height: 1.55;
}
.bpp-sources ul {
  margin: 0;
  padding-left: 1.2rem;
}
.bpp-sources li {
  margin: 0 0 14px;
  color: #1A2620;
}
.bpp-sources a {
  color: #0A7935;
  font-weight: 700;
}
.bpp-sources span {
  display: block;
  margin-top: 4px;
  color: #5A6660;
  font-size: 14px;
  line-height: 1.5;
}
.bpp-cta-section {
  padding: 80px 24px;
  background: linear-gradient(135deg, #0A7935 0%, #0A7935 100%);
  color: #fff;
}
.bpp-cta-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.bpp-cta-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  margin: 0 0 12px;
}
.bpp-cta-sub {
  font-size: 17px;
  opacity: 0.92;
  margin: 0 0 32px;
}
.bpp-cta-phones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}
.bpp-cta-phone {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
}
.bpp-cta-phone strong {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.85;
}
.bpp-cta-phone:hover { background: rgba(255, 255, 255, 0.25); }
`;
