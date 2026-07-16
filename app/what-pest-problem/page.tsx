// /what-pest-problem — the "What Pest Problem Do You Have?" picker. Nine
// cards route each concern to the right service page, giving customers a
// fast path and search/AI engines a clean map of what we treat. Crawlspace
// concerns route to the free termite inspection (no crawlspace service page
// per the Jun 13 compliance scrub); rodents ride inside the pest plan
// (standalone trapping isn't offered); bed bugs/wildlife are explicitly
// out of scope. Pricing lines are the approved ones only.
import { GREEN, GOLD, INK, CREAM, DEEP, displayFont, bodyFont } from '@/lib/brand';

export const metadata = {
  alternates: { canonical: '/what-pest-problem' },
  title: 'What Pest Problem Do You Have? | EnviroCare Pest & Termite',
  description:
    'Pick your pest problem — ants, roaches, spiders, mosquitoes, termites, fire ants — and see exactly how EnviroCare treats it, with published pricing.',
};

const BASE = 'https://www.envirocarellc.com';

type PestCard = {
  emoji: string;
  name: string;
  hook: string;      // one-line: what we do about it
  href: string;
  linkLabel: string;
};

const CARDS: PestCard[] = [
  {
    emoji: '🐜', name: 'Ants',
    hook: 'Nuisance ants are covered in the bi-monthly pest program — $35/month on ACH, or $70 per bi-monthly visit, with unlimited free re-service between visits.',
    href: '/services/pest-control', linkLabel: 'Pest Control',
  },
  {
    emoji: '🪳', name: 'Roaches',
    hook: 'Interior + perimeter treatment targets the harborage, not just the ones you see. Covered in the bi-monthly pest program.',
    href: '/services/pest-control', linkLabel: 'Pest Control',
  },
  {
    emoji: '🕷️', name: 'Spiders',
    hook: 'Including brown recluse and black widow — we sweep and treat the garages, porches, and voids they nest in, on the bi-monthly program.',
    href: '/services/pest-control', linkLabel: 'Pest Control',
  },
  {
    emoji: '🦟', name: 'Mosquitoes',
    hook: 'A 30-day yard barrier, March through November — $45 per visit. Add tick coverage in the $65/visit Mosquito + Tick plan.',
    href: '/services/mosquito', linkLabel: 'Mosquito Control',
  },
  {
    emoji: '🪵', name: 'Termites',
    hook: 'Sentricon® Always Active™ bait stations — no drilling, up to $1,000,000 EnviroCare repair coverage on qualifying homes. Priced after a free WDO inspection.',
    href: '/services/termite-control', linkLabel: 'Termite Control',
  },
  {
    emoji: '🐭', name: 'Mice & Rats',
    hook: 'Mice and rats are covered within the bi-monthly pest plan — entry points, bait placement, and follow-up on every route.',
    href: '/services/pest-control', linkLabel: 'Pest Control',
  },
  {
    emoji: '🔥', name: 'Fire Ants',
    hook: 'Whole-colony fire ant treatment, starting at $150 and priced by yard size — available to anyone, no plan required.',
    href: '/services/fire-ant', linkLabel: 'Fire Ant Control',
  },
  {
    emoji: '🏚️', name: 'Crawlspace & Moisture Worries',
    hook: 'Damp crawlspaces are where termite trouble starts. Begin with a free termite (WDO) inspection — home, crawlspace, and foundation.',
    href: '/services/termite-control', linkLabel: 'Free Termite Inspection',
  },
  {
    emoji: '🤔', name: 'Not Sure What It Is',
    hook: 'Browse the Pest Library to identify it, or just request a free quote and describe what you\'re seeing — we\'ll take it from there.',
    href: '/quote', linkLabel: 'Get a Free Quote',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      name: 'EnviroCare pest problems and services',
      itemListElement: CARDS.map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.name, url: `${BASE}${c.href}`,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What pests does EnviroCare treat?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EnviroCare treats 30+ common Alabama pests: ants (including fire ants), roaches, spiders (including brown recluse), earwigs, silverfish, crickets, millipedes, centipedes, exterior wasps and hornets, mice and rats within a pest plan, seasonal mosquitoes, ticks with mosquito service, and termites with Sentricon®. Wasp nests, carpenter bees, and extra rodent or trapping jobs are available to active pest customers as add-ons for an additional charge. We serve the Birmingham metro, Huntsville / North Alabama, and Lake Martin / Alexander City from three staffed offices.',
          },
        },
        {
          '@type': 'Question',
          name: 'What pests does EnviroCare NOT treat?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We don\'t treat bed bugs, wildlife (raccoons, squirrels, bats), or lawn care. Earwigs and routine mice and rats are handled within a pest plan; wasp nests, carpenter bees, and extra rodent work are add-ons for active pest customers at an additional charge. If you need bed bug or wildlife help, call us anyway — we\'ll point you toward the right kind of specialist.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'What Pest Problem Do You Have?', item: `${BASE}/what-pest-problem` },
      ],
    },
  ],
};

export default function WhatPestProblemPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: CREAM, fontFamily: bodyFont, color: INK }}>
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '56px clamp(20px,5vw,64px) 72px' }}>
          <nav style={{ fontSize: 13.5, color: '#5A6660', marginBottom: 18 }}>
            <a href="/" style={{ color: '#5A6660', textDecoration: 'none' }}>Home</a>
            {' › '}
            <span>What Pest Problem Do You Have?</span>
          </nav>

          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(30px,5vw,44px)', color: INK, margin: 0, lineHeight: 1.15 }}>
            What Pest Problem Do You Have?
          </h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.75, maxWidth: 780, marginTop: 16 }}>
            Pick what&apos;s bugging you and we&apos;ll show you exactly how we treat it — with the
            price on the page, the way it should be. EnviroCare is family-owned since 1958,
            serving the Birmingham metro, Huntsville, and Lake Martin from three Alabama offices.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginTop: 34 }}>
            {CARDS.map(c => (
              <a key={c.name} href={c.href} style={{ display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid rgba(14,26,15,.08)', borderRadius: 14, padding: '20px 22px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(14,26,15,.06)' }}>
                <div style={{ fontSize: 30, lineHeight: 1, marginBottom: 10 }} aria-hidden="true">{c.emoji}</div>
                <div style={{ fontFamily: displayFont, fontSize: 20, color: INK, marginBottom: 8 }}>{c.name}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#4a5750', margin: '0 0 14px' }}>{c.hook}</p>
                <div style={{ marginTop: 'auto', fontWeight: 700, fontSize: 14.5, color: GREEN }}>{c.linkLabel} →</div>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
            <a href="/quote" style={{ background: GOLD, color: INK, fontWeight: 700, textDecoration: 'none', padding: '12px 22px', borderRadius: 50, fontSize: 15.5 }}>
              Get a Free Quote →
            </a>
            <a href="/pest-library" style={{ border: `2px solid ${GREEN}`, color: GREEN, fontWeight: 600, textDecoration: 'none', padding: '11px 20px', borderRadius: 50, fontSize: 15.5 }}>
              Identify It in the Pest Library
            </a>
          </div>

          <p style={{ marginTop: 30, fontSize: 14.5, color: '#7a887e', maxWidth: 780, lineHeight: 1.7 }}>
            Honest scope note: we don&apos;t treat bed bugs, wildlife (raccoons, squirrels, bats),
            or lawn care. Earwigs and routine rodents are handled within a pest plan; wasp nests and
            carpenter bees are add-on services for active pest customers. Need bed bug or wildlife help?
            Call <a href="tel:2059406360" style={{ color: DEEP, fontWeight: 600 }}>(205) 940-6360</a> anyway —
            we&apos;ll point you to the right specialist.
          </p>
        </section>
      </main>
    </>
  );
}
