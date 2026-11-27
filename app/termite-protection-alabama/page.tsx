// app/termite-protection-alabama/page.tsx — Alabama termite protection guide (hub).
//
// WHY THIS PAGE EXISTS (2026-11-27 audit, branch seo/local-ai-visibility-2026-11-26)
// The site already has about twenty termite, Sentricon and WDO pages, but nothing
// connects them: Search Console (Aug 28 - Nov 25 2026) shows termite queries spread
// over /services/termite-control (pos 29.7), /blog/termite-bond-alabama-explained
// (pos 10.5), /huntsville, /birmingham and the city termite pages, and the live
// link crawl found most termite articles with only one or two internal links in.
// This hub gives Google and AI assistants one page that states what EnviroCare
// does, links every detailed page, and answers the buying questions directly.
//
// CONTENT RULES FOR THIS PAGE (do not loosen without Phillip):
//  - Every service fact here already appears on a live, reviewed page or in
//    data/pricing.ts. Nothing is new except the arrangement.
//  - The $1M line uses the exact Nov 23 2026 wording.
//  - New termite customers: Sentricon only. Liquid: existing liquid customers only.
//  - The inspection is free; WDO letters are a separate paid service (as low as $125).
//  - No termite price, no "guarantee"/"warranty", no competitor names.
//  - The two Alabama rule citations link to the state's own Administrative Code.
import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import { GREEN, GOLD, INK, CREAM, DEEP, displayFont, bodyFont } from '@/lib/brand';
import { OFFICES } from '@/data/offices';

const BASE = 'https://www.envirocarellc.com';
const PATH = '/termite-protection-alabama';
const TITLE = 'Alabama Termite Protection Guide: Bonds, Sentricon & WDO';
const DESC =
  'Termite bonds, retreatment vs repair coverage, Sentricon®, inspection costs, WDO letters, new construction and lake homes in Alabama, from EnviroCare Pest Services.';

export const metadata: Metadata = withOpenGraph({
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { url: `${BASE}${PATH}`, title: TITLE, description: DESC, images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og-image.png'] },
});

const COVERAGE =
  'up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval and subject to the terms of the agreement';

const RULE_16 = 'https://admincode.legislature.state.al.us/api/rule/80-10-9-.16';
const RULE_18 = 'https://admincode.legislature.state.al.us/api/rule/80-10-9-.18';

type Link = { href: string; label: string };
type Section = { id: string; h: string; answer: string; more: string[]; links: Link[] };

const SECTIONS: Section[] = [
  {
    id: 'termite-bonds',
    h: 'Alabama termite bonds: retreatment-only or repair coverage?',
    answer:
      'A termite bond is a written agreement between a homeowner and a pest control company. A retreatment-only agreement obligates the company to treat again if termites return. A repair agreement can also cover qualifying damage repairs. The written agreement, not the name on it, decides which one you have.',
    more: [
      'Read the agreement for four things: whether it covers retreatment, repairs or both; the dollar limit and exclusions; the inspection schedule you must keep; and what happens to the agreement if you sell the house.',
      `Most EnviroCare termite agreements are retreatment-only. On qualifying homes, an EnviroCare repair agreement adds ${COVERAGE}. Ask which agreement you are signing, and for a copy, before you enroll.`,
    ],
    links: [
      { href: '/blog/termite-bond-alabama-explained', label: 'What a termite bond in Alabama covers' },
      { href: '/faq/termite-warranty', label: 'How EnviroCare damage repair coverage works' },
      { href: '/blog/homeowners-insurance-termite-damage-alabama', label: 'Does homeowners insurance cover termite damage?' },
    ],
  },
  {
    id: 'sentricon',
    h: 'Sentricon® termite protection',
    answer:
      'EnviroCare installs and services the Sentricon® Always Active™ bait system for new termite customers. Bait stations go in the soil around the house, so most homes need no drilling through slabs. Liquid termite service continues only for existing liquid-program customers.',
    more: [
      'Stations are serviced on a set schedule under the agreement. If you have seen green caps in a yard and wondered what they are, those are usually Sentricon stations.',
    ],
    links: [
      { href: '/services/sentricon', label: 'Sentricon® service' },
      { href: '/blog/is-sentricon-worth-it', label: 'Is Sentricon worth it?' },
      { href: '/blog/sentricon-vs-liquid-termite-treatment', label: 'Sentricon vs liquid termite treatment' },
      { href: '/blog/how-long-does-sentricon-take-to-work', label: 'How long Sentricon takes to work' },
      { href: '/blog/green-caps-in-yard-sentricon', label: 'Green caps in the yard' },
    ],
  },
  {
    id: 'inspection-cost',
    h: 'Termite inspection and treatment cost',
    answer:
      'The standard EnviroCare termite inspection is free. Termite protection has no flat price: it is quoted in writing after the inspection, because foundation length, slab or crawlspace construction, access and any active termites change the work.',
    more: [
      'A real-estate WDO letter is a different service with its own fee, as low as $125. The exact fee depends on the property and is confirmed when you schedule.',
    ],
    links: [
      { href: '/blog/termite-treatment-cost-alabama', label: 'What drives termite treatment cost in Alabama' },
      { href: '/pricing', label: 'Published pest control pricing' },
      { href: '/services/termite-control', label: 'Termite control service' },
    ],
  },
  {
    id: 'wdo-reports',
    h: 'Alabama WDO reports for home sales',
    answer:
      'Lenders usually ask for a WDO letter before closing. In Alabama the form is the Official Alabama Wood Infestation Inspection Report, set out in Ala. Admin. Code r. 80-10-9-.18. It records what a licensed inspector could see on the inspection date.',
    more: [
      'Book it early so it does not hold up closing, and ask the inspector what areas could not be reached. The termite inspection for protecting your own home is free; the WDO letter for a sale is a separate paid service.',
    ],
    links: [
      { href: '/services/wdo-letters', label: 'WDO letters for home sales' },
      { href: '/blog/real-estate-wdo-letter-explained', label: 'The Alabama WDO letter explained' },
      { href: '/wdo-letter-checklist-alabama', label: 'WDO letter checklist' },
      { href: '/wdo-inspection-letters-alabama', label: 'WDO letters for agents and closing attorneys' },
      { href: '/blog/termite-inspection-before-buying-home-alabama', label: 'Termite inspection before buying a home' },
    ],
  },
  {
    id: 'new-construction',
    h: 'New construction termite protection',
    answer:
      'Builders and owners of new homes should settle termite protection before the slab is poured or the structure is finished, because access is easiest then. EnviroCare offers builder termite programs; the builders page explains how they work.',
    more: [
      'Ask for the treatment method, the paperwork the closing will need, and whether protection can transfer to the first owner.',
    ],
    links: [{ href: '/builders', label: 'Builder termite programs' }],
  },
  {
    id: 'waterfront-homes',
    h: 'Termite protection for lake and waterfront homes',
    answer:
      'Subterranean termites need moisture, and lake properties tend to have more of it: damp crawlspaces, decks and stairs that touch the soil, and wood stored under the house. Have those areas checked during the inspection and keep wood off the ground.',
    more: [
      'Second homes that sit empty for weeks can go longer without anyone noticing mud tubes, so keep the inspection schedule in the agreement even when the house is not in use.',
    ],
    links: [
      { href: '/lake-martin', label: 'Pest and termite service at Lake Martin' },
      { href: '/blog/lake-martin-home-pest-checklist', label: 'Lake Martin home pest checklist' },
      { href: '/blog/termite-damage-signs-alabama', label: 'Signs of termite damage' },
    ],
  },
  {
    id: 'compare-companies',
    h: 'What to compare when choosing a termite company',
    answer:
      'Compare written proposals for the same home. Check the company license, the treatment method, whether the agreement is retreatment-only or includes repair coverage, the coverage limit and exclusions, the inspection schedule, the annual renewal, and transfer if you sell.',
    more: [
      'Alabama rules require a written contract before subterranean termite work begins, and for an existing home that contract must include a foundation diagram or sketch (Ala. Admin. Code r. 80-10-9-.16). Ask for both before work is scheduled.',
    ],
    links: [
      { href: '/blog/termite-questions-alabama-homeowners', label: 'Termite questions Alabama homeowners ask' },
      { href: '/blog/how-to-identify-termites-alabama', label: 'How to identify termites' },
      { href: '/blog/carpenter-ants-vs-termites-alabama', label: 'Carpenter ants vs termites' },
      { href: '/blog/formosan-termites-alabama', label: 'Formosan termites in Alabama' },
      { href: '/blog/alabama-termite-swarm-season', label: 'Termite swarm season' },
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  { q: 'What is a termite bond in Alabama?', a: SECTIONS[0].answer },
  {
    q: 'Is a retreatment-only termite bond the same as repair coverage?',
    a: 'No. A retreatment-only agreement pays for treating termites again. Repair coverage can also pay for qualifying damage repairs. Read the written agreement for the limit, exclusions and inspection duties.',
  },
  {
    q: 'Does EnviroCare offer liquid termite treatment?',
    a: 'New termite customers are offered Sentricon®. Liquid termite service continues only for existing liquid-program customers.',
  },
  {
    q: 'How much is a termite inspection?',
    a: 'The standard EnviroCare termite inspection is free. A WDO letter for a real-estate closing is a separate paid service, as low as $125.',
  },
  {
    q: 'How much does termite protection cost?',
    a: 'There is no flat price. EnviroCare quotes termite protection in writing after the free inspection, based on the home.',
  },
  {
    q: 'What does Alabama require before termite work starts?',
    a: 'Alabama rules require a written contract before subterranean termite work begins, and for existing structures the contract must include a foundation diagram or sketch (Ala. Admin. Code r. 80-10-9-.16).',
  },
];

const OFFICE_LIST = [OFFICES['birmingham-downtown'], OFFICES.birmingham, OFFICES['lake-martin'], OFFICES.huntsville];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${BASE}${PATH}#webpage`,
      url: `${BASE}${PATH}`,
      name: TITLE,
      description: DESC,
      isPartOf: { '@id': `${BASE}/#website` },
      about: { '@id': `${BASE}/#organization` },
      publisher: { '@id': `${BASE}/#organization` },
      dateModified: '2026-11-27',
      hasPart: SECTIONS.map((s) => ({ '@type': 'WebPageElement', name: s.h, url: `${BASE}${PATH}#${s.id}` })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Termite Control', item: `${BASE}/services/termite-control` },
        { '@type': 'ListItem', position: 3, name: 'Alabama Termite Protection Guide', item: `${BASE}${PATH}` },
      ],
    },
  ],
};

const h2 = { fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 12px', lineHeight: 1.25 } as const;
const p = { fontSize: 16, lineHeight: 1.75, maxWidth: 800, margin: '0 0 12px' } as const;
const a = { color: GREEN, fontWeight: 600 } as const;

export default function TermiteProtectionAlabamaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: CREAM, fontFamily: bodyFont, color: INK }}>
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '56px clamp(20px,5vw,64px) 72px' }}>
          <nav style={{ fontSize: 13.5, color: '#5A6660', marginBottom: 18 }} aria-label="Breadcrumb">
            <a href="/" style={{ color: '#5A6660', textDecoration: 'none' }}>Home</a>
            {' › '}
            <a href="/services/termite-control" style={{ color: '#5A6660', textDecoration: 'none' }}>Termite Control</a>
            {' › '}
            <span>Alabama Termite Protection Guide</span>
          </nav>

          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(30px,5vw,44px)', color: INK, margin: 0, lineHeight: 1.15 }}>
            Alabama Termite Protection Guide
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.75, maxWidth: 800, marginTop: 16, fontWeight: 500 }}>
            EnviroCare Pest Services protects Alabama homes from subterranean termites with the Sentricon® Always
            Active™ bait system. The termite inspection is free and protection is quoted after the inspection. Most
            agreements are retreatment-only; on qualifying homes, an EnviroCare repair agreement adds {COVERAGE}.
          </p>
          <p style={{ ...p, color: '#4a5750' }}>
            {"The Wedgworth family's Alabama pest-control history began in Alexander City in 1958."} Four offices serve
            Birmingham, Shelby County, Lake Martin and North Alabama. This guide answers the questions homeowners ask
            most and links to the detailed page for each one.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 20 }}>
            <a href="/quote" style={{ background: GOLD, color: INK, fontWeight: 700, textDecoration: 'none', padding: '12px 22px', borderRadius: 50, fontSize: 15.5 }}>
              Request a Free Termite Inspection →
            </a>
            <a href={OFFICES.birmingham.phoneHref} style={{ border: `2px solid ${GREEN}`, color: GREEN, fontWeight: 600, textDecoration: 'none', padding: '11px 20px', borderRadius: 50, fontSize: 15.5 }}>
              Call {OFFICES.birmingham.phone}
            </a>
          </div>

          <nav aria-label="On this page" style={{ background: '#fff', border: '1px solid rgba(14,26,15,.10)', borderRadius: 12, padding: '16px 22px', maxWidth: 800, marginTop: 30 }}>
            <strong style={{ color: DEEP, fontSize: 15 }}>On this page</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: 18, lineHeight: 1.9, fontSize: 15 }}>
              {SECTIONS.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} style={{ color: GREEN, textDecoration: 'none' }}>{s.h}</a></li>
              ))}
            </ul>
          </nav>

          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`} style={h2}>{s.h}</h2>
              <p style={{ ...p, fontWeight: 500 }}>{s.answer}</p>
              {s.more.map((m) => (
                <p key={m.slice(0, 32)} style={p}>{m}</p>
              ))}
              <ul style={{ margin: '6px 0 0', paddingLeft: 18, lineHeight: 1.85, fontSize: 15.5, maxWidth: 800 }}>
                {s.links.map((l) => (
                  <li key={l.href}><a href={l.href} style={a}>{l.label}</a></li>
                ))}
              </ul>
            </section>
          ))}

          <h2 style={h2}>Common questions</h2>
          <div style={{ maxWidth: 820 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ background: '#fff', border: '1px solid rgba(14,26,15,.10)', borderRadius: 10, marginBottom: 12, padding: '4px 0' }}>
                <summary style={{ padding: '14px 18px', cursor: 'pointer', fontWeight: 600, color: DEEP, fontSize: 15.5 }}>{f.q}</summary>
                <p style={{ padding: '0 18px 16px', margin: 0, fontSize: 15, lineHeight: 1.65, color: '#4b5563' }}>{f.a}</p>
              </details>
            ))}
          </div>

          <h2 style={h2}>Call the office that serves your home</h2>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9, fontSize: 15.5, maxWidth: 820 }}>
            {OFFICE_LIST.map((o) => (
              <li key={o.id}>
                <strong>{o.name}</strong>: {o.address.street}, {o.address.city}, {o.address.region} {o.address.postalCode} ·{' '}
                <a href={o.phoneHref} style={a}>{o.phone}</a>
              </li>
            ))}
          </ul>

          <p style={{ fontSize: 13.5, color: '#5A6660', marginTop: 34, maxWidth: 800, lineHeight: 1.6 }}>
            Alabama rule references: <a href={RULE_16} rel="noreferrer" style={{ color: '#5A6660' }}>Ala. Admin. Code r. 80-10-9-.16</a>
            {' '}(termite contracts) and <a href={RULE_18} rel="noreferrer" style={{ color: '#5A6660' }}>r. 80-10-9-.18</a>
            {' '}(Official Alabama Wood Infestation Inspection Report), published by the Alabama Legislative Services Agency.
            Coverage, exclusions and inspection duties are set by your written agreement. Updated November 2026.
          </p>
        </section>
      </main>
    </>
  );
}
