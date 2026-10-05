// components/shared/LocalExamples.tsx
// Renders data/local-examples.ts for one city. Server component, no client JS.
// The disclaimer line is deliberate: these are typical situations, not customer
// stories, and the page must say so (see the rules at the top of the data file).
import Link from 'next/link';
import { LOCAL_EXAMPLES } from '@/data/local-examples';

export default function LocalExamples({ slug, cityName, officeName }: { slug: string; cityName: string; officeName: string }) {
  const items = LOCAL_EXAMPLES[slug];
  if (!items || items.length === 0) return null;
  return (
    <section style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem)', background: '#fff' }} aria-labelledby={`local-examples-${slug}`}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: '#0A7935', fontWeight: 700, marginBottom: 12 }}>
          What a job looks like here
        </div>
        <h2 id={`local-examples-${slug}`} style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 'clamp(1.6rem,3.2vw,2.3rem)', lineHeight: 1.15, color: '#14231a', margin: '0 0 .6rem' }}>
          Common {cityName} calls, and how we handle them
        </h2>
        <p style={{ color: '#4b5563', fontSize: '.98rem', lineHeight: 1.65, margin: '0 0 2rem', maxWidth: 760 }}>
          These are typical situations our {officeName} team handles, described as we would explain them on the phone. They are not individual customer stories.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '1.25rem' }}>
          {items.map((ex) => (
            <article key={ex.situation} style={{ border: '1px solid #e5e7eb', borderRadius: 14, padding: '1.4rem 1.4rem 1.2rem', background: '#FEFDF8', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#14231a', margin: '0 0 .45rem', lineHeight: 1.35 }}>{ex.situation}</h3>
              <p style={{ fontSize: '.86rem', color: '#0A7935', fontWeight: 600, margin: '0 0 .7rem', lineHeight: 1.5 }}>{ex.where}</p>
              <p style={{ fontSize: '.95rem', color: '#374151', lineHeight: 1.65, margin: '0 0 1rem', flex: 1 }}>{ex.approach}</p>
              <Link href={ex.href} style={{ color: '#0A7935', fontWeight: 700, fontSize: '.92rem', textDecoration: 'none' }}>
                {ex.linkText} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
