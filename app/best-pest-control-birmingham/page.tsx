// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/best-pest-control-birmingham/page.tsx
// Commit: feat(pricing): flat $75 initial service on all plans; de-list tick/flea pricing
// Push: main
// ─────────────────────────────────────
// /best-pest-control-birmingham — buyer's-guide landing page for the
// "best pest control company in birmingham al" query family.
//
// Format rationale: the SERP for this term is 100% local intent, 76.5% business
// pages, 64.7% landing pages and only 11.8% listicle (NeuronWriter query
// baa5aa5fd9b48cbb, pulled Aug 6 2026). Google is not rewarding roundups here,
// so this is a selection-criteria page, not a "top 10" list.
//
// House conventions followed: no competitor is named anywhere; comparison rows
// describe common industry practice only. Pricing uses the canonical wording —
// $35/month on ACH or $70 per bi-monthly visit, $75 initial service, unlimited free
// re-service. Contract wording states the two billing options positively;
// or equal monthly ACH payments under a 12-month billing agreement"; the bare
// phrase "no contract" is banned and must not be reintroduced.
//
// Review figures are live Google Business Profile data pulled from Local Falcon
// on Aug 6 2026 (Alabaster 4.7/247, Alexander City 4.8/39, Huntsville 5.0/34).
// RE-VERIFY BEFORE EACH DEPLOY — a transparency page carrying a stale count
// undercuts its own argument. No AggregateRating is emitted in schema, because
// this page is not a location page and the ratings belong to the offices.
import { GREEN, GOLD, INK, CREAM, DEEP, displayFont, bodyFont } from '@/lib/brand';

export const metadata = {
  alternates: { canonical: '/best-pest-control-birmingham' },
  title: 'Best Pest Control Company in Birmingham, AL: How to Choose | EnviroCare',
  description:
    'How to choose the best pest control company in Birmingham — what to check on licensing, termite repair coverage, published pricing and agreements, plus where EnviroCare fits and where it does not.',
  openGraph: {
    title: 'Best Pest Control Company in Birmingham, AL: How to Choose | EnviroCare',
    description:
      'What to check before hiring a Birmingham pest control company — licensing, termite repair coverage, published pricing, agreement terms, and who actually shows up.',
    url: 'https://www.envirocarellc.com/best-pest-control-birmingham',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Pest Control Company in Birmingham, AL: How to Choose | EnviroCare',
    description:
      'What to check before hiring a Birmingham pest control company — licensing, termite repair coverage, published pricing, agreement terms, and who actually shows up.',
    images: ['/og-image.png'],
  },
};

const BASE = 'https://www.envirocarellc.com';

const CRITERIA: { n: string; h: string; body: string }[] = [
  {
    n: '01',
    h: 'Are they licensed in Alabama, and will they say so?',
    body:
      'Commercial pest control operators in Alabama are licensed through the Alabama Department of Agriculture and Industries. Any legitimate company will give you a license number without hesitating. If someone knocks on the door after a storm offering a discount for signing today, that is the moment to ask.',
  },
  {
    n: '02',
    h: 'What happens if the termite treatment fails — repairs, or just re-treatment?',
    body:
      'This is the question that separates real termite protection from a line item on an invoice. A re-treatment-only warranty means that if termites come back they will treat again, and you pay for the damage. Repair coverage means the company pays to fix what got eaten. Those are very different products, often sold at similar prices. Ask which one you are buying, and get it in writing.',
  },
  {
    n: '03',
    h: 'Is the price published, or do you have to sit through a visit to hear it?',
    body:
      'A company that will not put a starting price in writing before an in-home appointment is usually planning to price you based on how worried you seem. You should be able to get a real number for a standard home over the phone.',
  },
  {
    n: '04',
    h: 'What are the agreement terms, and what happens if you sell the house?',
    body:
      'Billing agreements are normal in this industry and often save money. Auto-renewing agreements with cancellation fees buried on page three are also normal, and less good. Ask what the term is, what renewal looks like, and what happens in month four if you move.',
  },
  {
    n: '05',
    h: 'Who is actually coming to your door?',
    body:
      'Local, regional and national companies all operate in Birmingham, and each trades off differently. A larger footprint can mean standardized process and after-hours phone support. A local company generally has lower technician turnover, so the person walking your crawlspace has seen your street before. Neither is automatically better — but they fail in different directions, and it is worth knowing which one you are buying.',
  },
];

const OFFICES: [string, string, string][] = [
  ['Alabaster — Birmingham metro', '4.7 ★', 'Google rating'],
  ['Alexander City — Lake Martin', '4.8 ★', 'Google rating'],
  ['Huntsville — North Alabama', '5.0 ★', 'Google rating'],
];

const NOT_FOR_YOU: string[] = [
  'You need same-day emergency service at 9 p.m. A large operation with a 24-hour call center will beat us on that, and we would rather say so than take the call and disappoint you.',
  'You have an active bed bug infestation. That is a specialist job with heat equipment, and you are better served by a company that does it every day.',
  'You are outside our routes. We run the Birmingham metro and Shelby County, the Huntsville and Madison area, and the Lake Martin region. Outside those, someone closer will serve you better.',
  'You want the cheapest possible one-time spray. That is a legitimate thing to want, and it is not the model we run.',
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is the highest-rated pest control company in Birmingham, AL?',
    a: 'Ratings move, so check Google yourself before you decide — and read the number of reviews alongside the star average, because a perfect score built on a handful of ratings tells you far less than a strong score built on years of them. EnviroCare’s Alabaster office, which runs the Birmingham metro routes, holds 4.7 stars on Google. Open the profile and judge the volume for yourself.',
  },
  {
    q: 'How much does pest control cost in Birmingham, AL?',
    a: 'EnviroCare publishes its pricing: pest control is $35/month on ACH or $70 per bi-monthly visit, with a $75 initial service and unlimited free re-service between scheduled visits. Across the Birmingham market generally, expect the total to move with home size, lot size, and whether you add mosquito or termite coverage. Be cautious with any company that will not give you a range before an in-home visit.',
  },
  {
    q: 'What should I look for in a Birmingham pest control agreement?',
    a: 'Four things, all in writing: the term length, what renewal looks like, what cancelling costs, and whether the termite warranty covers repairs or only re-treatment. With EnviroCare you can pay per visit, billed as serviced, or choose equal monthly ACH payments under a 12-month billing agreement. Whichever you pick, the terms are confirmed in writing before service starts. Either way, unlimited free re-service between scheduled visits is included.',
  },
  {
    q: 'How often do I need pest control service in Birmingham?',
    a: 'Bi-monthly — every other month — is the Alabama standard, and it is driven by climate rather than by sales strategy. Humidity and mild winters mean pest pressure never fully stops here, so quarterly service tends to leave a gap in late summer when pressure peaks.',
  },
  {
    q: 'Are pest control treatments safe for pets and kids?',
    a: 'Yes, when applied at label rate by a licensed technician. Products go in targeted placements around entry points and the perimeter rather than broadcast across living areas. Ask about re-entry intervals for any interior application; routine exterior service generally has none.',
  },
  {
    q: 'Should I just do it myself?',
    a: 'For a handful of ants, DIY is reasonable. For anything structural, it is not. Termites and rodents cause damage that costs multiples of what prevention does, and hardware-store fire ant bait usually relocates mounds rather than eliminating colonies.',
  },
  {
    q: 'Why are Birmingham homes so prone to termites?',
    a: 'Alabama sits in the heaviest termite-pressure zone in the continental United States, and the Birmingham valley compounds it — clay soil that holds water, plus the Cahaba River and Shades Creek drainages. Subterranean termite swarms start in March. Over a long enough horizon, treatment here is not a precaution so much as maintenance.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'Service',
      serviceType: 'Pest control and termite service',
      name: 'Pest Control & Termite Service in the Birmingham Metro',
      provider: { '@id': `${BASE}/#birmingham` },
      areaServed: [
        'Birmingham', 'Hoover', 'Vestavia Hills', 'Mountain Brook', 'Homewood',
        'Alabaster', 'Chelsea', 'Pelham', 'Helena', 'Calera', 'Trussville',
      ].map((c) => ({ '@type': 'City', name: c })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Best Pest Control Company in Birmingham',
          item: `${BASE}/best-pest-control-birmingham`,
        },
      ],
    },
  ],
};

export default function BestPestControlBirminghamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: CREAM, fontFamily: bodyFont, color: INK }}>
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '56px clamp(20px,5vw,64px) 72px' }}>
          <nav style={{ fontSize: 13.5, color: '#5A6660', marginBottom: 18 }}>
            <a href="/" style={{ color: '#5A6660', textDecoration: 'none' }}>Home</a>
            {' › '}
            <span>Best Pest Control Company in Birmingham</span>
          </nav>

          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(30px,5vw,44px)', color: INK, margin: 0, lineHeight: 1.15 }}>
            Best Pest Control Company in Birmingham, AL
          </h1>

          {/* AI-answer block: the paragraph an engine can quote directly */}
          <p style={{ fontSize: 18, lineHeight: 1.75, maxWidth: 780, marginTop: 16, fontWeight: 500 }}>
            There is no single best pest control company in Birmingham — there is the one that fits
            what is actually wrong at your house. Before you hire anyone, check five things:
            Alabama licensing, whether the termite warranty covers <em>repairs</em> or only
            re-treatment, whether pricing is published before an in-home visit, what the agreement
            term and cancellation actually say, and whether the same technician works your route.
            EnviroCare is a fourth-generation Alabama family company whose family has been doing pest control in Alabama since 1958, holding
            4.7 stars on Google at the Alabaster office that runs the Birmingham
            metro routes.
          </p>
          <p style={{ fontSize: 16.5, lineHeight: 1.75, maxWidth: 780, marginTop: 10, color: '#4a5750' }}>
            Nobody searches this at leisure. Something is happening — swarmers on a windowsill in
            March, ants on the counter every morning, a yard nobody can sit in after six, or a
            closing date in three weeks and no WDO letter yet. Those are four different problems,
            and the company that is best at one is not automatically best at another.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 22 }}>
            <a href="/pricing" style={{ background: GOLD, color: INK, fontWeight: 700, textDecoration: 'none', padding: '12px 22px', borderRadius: 50, fontSize: 15.5 }}>
              See Our Published Pricing →
            </a>
            <a href="tel:2059912882" style={{ border: `2px solid ${GREEN}`, color: GREEN, fontWeight: 600, textDecoration: 'none', padding: '11px 20px', borderRadius: 50, fontSize: 15.5 }}>
              Call (205) 991-2882
            </a>
          </div>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 16px' }}>
            Five Things Worth Checking Before You Call Anyone
          </h2>
          <div style={{ maxWidth: 860 }}>
            {CRITERIA.map((c) => (
              <div key={c.n} style={{ display: 'flex', gap: 18, marginBottom: 26, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: displayFont, fontSize: 26, color: GOLD, fontWeight: 700, lineHeight: 1.2, minWidth: 44 }}>{c.n}</div>
                <div>
                  <h3 style={{ fontSize: 17.5, color: DEEP, margin: '0 0 6px', fontWeight: 700, lineHeight: 1.35 }}>{c.h}</h3>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: '#4b5563' }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 14px' }}>
            Where EnviroCare Fits
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 800 }}>
            Family-owned in Alabama since 1958, fourth generation. We are not the largest company
            operating in Birmingham and we do not claim to be. What we do differently maps onto the
            five points above: pricing is published — <strong>$35/month on ACH or $70 per bi-monthly
            visit</strong>, with a $75 initial service and unlimited free re-service between scheduled
            visits. Termite protection is Sentricon<sup>®</sup> Always Active™, in-ground bait
            stations with no drilling, backed by up to $1,000,000 in EnviroCare repair coverage on
            qualifying homes, subject to the terms of the agreement — repair coverage, not a
            re-treat promise. And technicians work their
            own routes, so the person servicing Bluff Park has serviced Bluff Park before.
          </p>

          <div style={{ overflowX: 'auto', marginTop: 22 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, minWidth: 560, background: '#fff', borderRadius: 12, boxShadow: '0 4px 16px rgba(14,26,15,.06)' }}>
              <thead>
                <tr style={{ textAlign: 'left', background: DEEP, color: '#fff' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Office</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Rating</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Reviews</th>
                </tr>
              </thead>
              <tbody>
                {OFFICES.map(([office, rating, reviews]) => (
                  <tr key={office} style={{ borderTop: '1px solid rgba(14,26,15,.08)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: DEEP }}>{office}</td>
                    <td style={{ padding: '12px 16px' }}>{rating}</td>
                    <td style={{ padding: '12px 16px', color: '#5A6660' }}>{reviews}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13.5, color: '#7a887e', marginTop: 10, maxWidth: 780 }}>
            Google Business Profile ratings, accurate as of August 2026. Ratings and counts change —
            check Google for the current figures.
          </p>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 14px' }}>
            When We Are Honestly Not Your Best Call
          </h2>
          <ul style={{ maxWidth: 820, paddingLeft: 20, margin: 0 }}>
            {NOT_FOR_YOU.map((item) => (
              <li key={item.slice(0, 24)} style={{ fontSize: 15.5, lineHeight: 1.7, color: '#4b5563', marginBottom: 12 }}>{item}</li>
            ))}
          </ul>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 14px' }}>
            The Birmingham-Specific Part
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 800 }}>
            Birmingham sits in a valley with Shades Creek and the Cahaba River running through it, on
            clay soil that holds water. That combination produces three predictable problems.
            <strong> Subterranean termites</strong> are not a possibility here so much as a schedule;
            swarm season opens in March. <strong>Mosquitoes</strong> breed in the creek drainages and
            in standing water that clay refuses to drain, which is why yard treatment outperforms
            repellents locally. <strong>Fall invaders</strong> — roaches, spiders, rodents — start
            moving indoors in September, and older Over-the-Mountain housing stock has the
            settlement gaps to let them. Any company you hire should be able to talk about your
            street, not just &ldquo;Alabama pests.&rdquo;
          </p>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 14px' }}>
            Common Questions
          </h2>
          <div style={{ maxWidth: 820 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ background: '#fff', border: '1px solid rgba(14,26,15,.10)', borderRadius: 10, marginBottom: 12, padding: '4px 0' }}>
                <summary style={{ padding: '14px 18px', cursor: 'pointer', fontWeight: 600, color: DEEP, fontSize: 15.5 }}>{f.q}</summary>
                <p style={{ padding: '0 18px 16px', margin: 0, fontSize: 15, lineHeight: 1.65, color: '#4b5563' }}>{f.a}</p>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 40, fontSize: 15, color: '#5A6660' }}>
            Keep reading:{' '}
            <a href="/family-owned-vs-national-chains" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Family-Owned vs National Chains</a>
            {' · '}
            <a href="/pricing" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Published Pricing</a>
            {' · '}
            <a href="/services/termite-control" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Termite Control</a>
            {' · '}
            <a href="/birmingham" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Birmingham</a>
            {' · '}
            <a href="/hoover" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Hoover</a>
            {' · '}
            <a href="/vestavia-hills" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Vestavia Hills</a>
            {' · '}
            <a href="/mountain-brook" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Mountain Brook</a>
            {' · '}
            <a href="/service-areas" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>All Service Areas</a>
          </div>
        </section>
      </main>
    </>
  );
}
