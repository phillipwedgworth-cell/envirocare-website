// components/RefreshedContent.tsx
//
// Renders the data/page-refresh.ts entry for a route — an added section of copy,
// an optional figure, and optional Q&A — inside an existing page. Renders nothing
// when the route has no entry, so dropping <RefreshedContent route="/x" /> into a
// template is a no-op until the content-refresh agent (or a reviewed session)
// publishes something for that page.
//
// No FAQPage JSON-LD here on purpose: the host pages already emit their own
// FAQPage schema, and two FAQPage blocks on one URL is a structured-data error.
import Image from 'next/image';
import { getPageRefreshSections, type PageRefresh } from '@/data/page-refresh';

const INK = '#0E1A0F';
const DEEP = '#07642B';
const CREAM = '#FEFDF8';

export default function RefreshedContent({ route, background = CREAM }: { route: string; background?: string }) {
  const sections = getPageRefreshSections(route);
  if (!sections.length) return null;
  return <>{sections.map(({ key, entry }) => <RefreshSection key={key} refreshKey={key} entry={entry} background={background} />)}</>;
}

function RefreshSection({ refreshKey, entry, background }: { refreshKey: string; entry: PageRefresh; background: string }) {
  const { heading, paragraphs = [], faqs = [], figure } = entry;
  if (!heading && !paragraphs.length && !faqs.length && !figure) return null;

  return (
    <section
      data-page-refresh={refreshKey}
      style={{ background, padding: '56px clamp(20px,5vw,64px)', borderTop: '1px solid rgba(14,142,64,.10)' }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
        {heading && (
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.55rem,3vw,2.15rem)', fontWeight: 700, color: INK, lineHeight: 1.2, margin: '0 0 18px' }}>
            {heading}
          </h2>
        )}

        {figure && (
          <figure style={{ margin: '0 0 24px' }}>
            <Image
              src={figure.src}
              alt={figure.alt}
              width={figure.width}
              height={figure.height}
              sizes="(max-width: 860px) 100vw, 820px"
              style={{ width: '100%', height: 'auto', borderRadius: 14, display: 'block' }}
            />
            {figure.caption && (
              <figcaption style={{ fontSize: 13.5, color: '#5b6f60', marginTop: 8, lineHeight: 1.5 }}>{figure.caption}</figcaption>
            )}
          </figure>
        )}

        {paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: '1.02rem', lineHeight: 1.75, color: '#374151', margin: i ? '14px 0 0' : 0 }}>{p}</p>
        ))}

        {faqs.length > 0 && (
          <div style={{ marginTop: paragraphs.length ? 30 : 0 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ padding: '16px 0', borderTop: '1px solid rgba(14,142,64,.14)' }}>
                <h3 style={{ fontSize: '1.06rem', fontWeight: 700, color: DEEP, margin: '0 0 6px' }}>{f.q}</h3>
                <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
