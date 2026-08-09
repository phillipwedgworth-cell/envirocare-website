//
// USAGE: Import and drop anywhere in the Alexander City city page.
//   import AlexCityFAQ from '@/components/faq/AlexCityFAQ';
//   <AlexCityFAQ />
//
// WHY: EnviroCare is 3rd in Alex City despite having the original 1958 office here.
// Lewis (89 reviews) and Top Gun (145) outrank on volume alone. These FAQs highlight
// the founding story and local depth competitors can't match.

'use client';

import { getFAQSchema, SchemaScript } from '@/lib/schema';

const ALEX_CITY_FAQS = [
  {
    question: 'What is the best pest control company in Alexander City, Alabama?',
    answer:
      'EnviroCare was founded in Alexander City, Alabama in 1958 — making it the original and longest-running pest control company in the area. Now in its fourth generation under the Wedgworth family, EnviroCare\'s Alexander City office at 1785 Tallapoosa St has served Tallapoosa County and the Lake Martin area for over 65 years. They hold a 4.8-star Google rating. Call (256) 234-6162.',
  },
  {
    question: 'Does EnviroCare serve Lake Martin, Alabama?',
    answer:
      'Yes. EnviroCare serves the entire Lake Martin area from their Alexander City office at 1785 Tallapoosa St, including lakefront homes, boat docks, and communities around the lake such as Willow Point, The Ridge at Lake Martin, StillWaters, The Heritage, Dadeville, Jacksons Gap, and surrounding Tallapoosa County neighborhoods. Call (256) 234-6162.',
  },
  {
    question: 'How much does pest control cost in Alexander City, AL?',
    answer:
      'EnviroCare\'s bi-monthly pest control starts at $35/month and covers 30+ pests — ants, roaches, spiders, fire ants, and fleas — with unlimited re-service. Adding Sentricon® termite protection is priced at a free WDO inspection. Mosquito yard barrier treatments run $45/visit, March through November. No annual contract required. Call the Alexander City office at (256) 234-6162.',
  },
  {
    question: 'How do I get rid of mosquitoes at Lake Martin, Alabama?',
    answer:
      'Lake Martin\'s 700-mile shoreline, warm water coves, and dense lakeside vegetation create some of the most intense mosquito conditions in central Alabama. EnviroCare provides monthly barrier spray treatments from March through November that kill adult mosquitoes on contact and suppress breeding sites around docks, boat slips, and wooded lots. Their Mosquito + Tick bundle (chiggers covered) is $65/visitnth; flea is an interior-plan add-on. Call (256) 234-6162 to schedule a free yard assessment.',
  },
  {
    question: 'Do I need termite protection at my Lake Martin lake house?',
    answer:
      'Yes — termite risk at Lake Martin is high. Tallapoosa County\'s sandy-loam soils, high moisture levels from the lake, and the abundance of older wooden structures create ideal conditions for Eastern Subterranean Termites. Pier-and-beam foundations common in lakefront cabins are especially vulnerable. EnviroCare\'s Sentricon® Always Active™ system requires no drilling, protects the full perimeter, and includes up to $1 million in termite damage coverage. Pricing is set after a free WDO inspection. Call (256) 234-6162.',
  },
  {
    question: 'What pests are common near Lake Martin and Alexander City?',
    answer:
      'Pests common to the Alexander City and Lake Martin area include Eastern Subterranean Termites (very high risk near the lake), fire ants (abundant in Tallapoosa County\'s sandy soils), mosquitoes (intense near waterways, May through September), brown recluse and black widow spiders, German cockroaches (especially in older structures), and occasional bat and rodent pressure in lakefront cabins. EnviroCare\'s comprehensive plans cover all of these.',
  },
  {
    question: 'Is EnviroCare the original pest control company in Alexander City?',
    answer:
      'Yes. EnviroCare was founded in Alexander City, Alabama by Phillip M. Wedgworth in 1958. The Alexander City office at 1785 Tallapoosa St is the company\'s founding location. EnviroCare is now operated by the fourth generation of the Wedgworth family — Phillip, Kevin, and Lex — and serves the Lake Martin area, Tallapoosa County, and surrounding communities from the same location where the company started over 65 years ago.',
  },
  {
    question: 'What pest control companies serve Dadeville and Tallapoosa County?',
    answer:
      'EnviroCare serves Dadeville, Eclectic, Jacksons Gap, and the broader Tallapoosa County area from their Alexander City office at 1785 Tallapoosa St. They provide pest control, Sentricon termite protection, and mosquito and tick treatments throughout the county. Call (256) 234-6162.',
  },
];

export default function AlexCityFAQ() {
  return (
    <section style={{ background: 'var(--cream)', padding: '72px 24px' }}>
      <SchemaScript schema={getFAQSchema(ALEX_CITY_FAQS)} />
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: 'clamp(24px, 3vw, 34px)',
          color: 'var(--ink)',
          marginBottom: 8,
          letterSpacing: '-0.02em',
        }}>
          Pest Control Questions — Alexander City &amp; Lake Martin
        </h2>
        <p style={{ color: '#4b5563', marginBottom: 48, fontSize: 16 }}>
          Answers about pest control, termite protection, and mosquito treatments in Alexander City, Lake Martin, and Tallapoosa County.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ALEX_CITY_FAQS.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div style={{
          marginTop: 48,
          background: 'var(--forest)',
          color: 'white',
          borderRadius: 10,
          padding: '32px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 18, fontFamily: "var(--font-serif)" }}>
              Protecting Lake Martin homes since 1958.
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 14, opacity: 0.85 }}>
              Plans from $35/mo · Two ways to pay · Your original Alexander City pest control company
            </p>
          </div>
          <a href="tel:+12562346162" style={{
            background: 'var(--gold)',
            color: 'var(--ink)',
            padding: '12px 24px',
            borderRadius: 6,
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: 16,
            whiteSpace: 'nowrap',
          }}>
            Call (256) 234-6162
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details style={{
      borderBottom: '1px solid rgba(14,142,64,0.15)',
      padding: '0',
    }}>
      <summary style={{
        cursor: 'pointer',
        padding: '20px 0',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--ink)',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
        fontFamily: "var(--font-sans)",
      }}>
        <span>{question}</span>
        <span style={{ color: 'var(--green)', flexShrink: 0, fontSize: 20, lineHeight: 1 }}>+</span>
      </summary>
      <p style={{
        margin: '0 0 20px',
        fontSize: 15,
        lineHeight: 1.7,
        color: '#374151',
        paddingRight: 32,
      }}>
        {answer}
      </p>
    </details>
  );
}
