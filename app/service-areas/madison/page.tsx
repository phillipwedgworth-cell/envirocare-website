import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "Pest Control Madison AL | EnviroCare — Family-Owned Since 1958",
  description:
    "Family-owned pest, termite, mosquito & tick control for Madison AL — Heritage Plantation, Bridge Street corridor, Madison Crossings. Call EnviroCare's Huntsville office: (256) 937-7676.",
  keywords: [
    "pest control madison al",
    "exterminator madison alabama",
    "termite inspection madison al",
    "mosquito control madison al",
    "tick control madison alabama",
    "madison al pest company",
  ],
  alternates: { canonical: "https://envirocarellc.com/service-areas/madison" },
  openGraph: {
    title: "Pest Control Madison AL | EnviroCare — Family-Owned Since 1958",
    description:
      "Bi-monthly pest control, Sentricon® termite protection, mosquito & tick yard service for Madison, AL. Huntsville office: (256) 937-7676.",
    url: "https://envirocarellc.com/service-areas/madison",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PestControlService",
  "@id": "https://envirocarellc.com/service-areas/madison#service",
  name: "EnviroCare Pest & Termite Services — Madison AL",
  description:
    "Family-owned pest control, Sentricon® termite protection, mosquito and tick yard service for Madison, Alabama. Serving Heritage Plantation, Madison Crossings, Bridge Street corridor and all Madison City zip codes.",
  url: "https://envirocarellc.com/service-areas/madison",
  telephone: "+1-256-937-7676",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7027 Old Madison Pike, Ste 108",
    addressLocality: "Huntsville",
    addressRegion: "AL",
    postalCode: "35806",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 34.6993, longitude: -86.7483 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Madison",
    containedInPlace: { "@type": "State", name: "Alabama" },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does pest control cost in Madison AL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EnviroCare's bi-monthly pest control starts at $35/month on ACH autopay, or $70 per visit. That covers 30+ common pests including ants, roaches, spiders, and wasps, with unlimited free re-service between visits. An initial visit is typically $150, often $99 for new customers.",
      },
    },
    {
      "@type": "Question",
      name: "Does Madison AL have termite problems in new construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Madison's rapid growth means thousands of new homes are built on previously undisturbed soil with high native termite pressure. New construction in North Alabama — especially near the Research Park and Bridge Street corridors — should have Sentricon® Always Active™ stations installed before or shortly after completion. EnviroCare offers free termite inspections with no obligation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best termite protection for Madison AL homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sentricon® Always Active™ is the most effective termite protection available for Madison homes. Unlike liquid barrier treatments, Sentricon uses in-ground bait stations that eliminate the entire colony — not just foragers. EnviroCare is a Sentricon Certified Specialist serving Madison. Installation starts at $325 including the first year's protection, with up to $1,000,000 in damage repair coverage.",
      },
    },
    {
      "@type": "Question",
      name: "How bad are mosquitoes near Madison AL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mosquito pressure is high in Madison due to Limestone Creek and the area's Tennessee River tributary drainage. Subdivisions near low-lying areas and retention ponds experience the worst activity from March through November. EnviroCare's 30-day yard barrier program significantly reduces mosquito activity with treatments every 30 days through the season.",
      },
    },
    {
      "@type": "Question",
      name: "Is EnviroCare licensed for pest control in Madison AL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EnviroCare Pest & Termite Services is fully licensed and insured in Alabama and has served the North Alabama market from our Huntsville office at 7027 Old Madison Pike, Ste 108. We are a Sentricon Certified Specialist and have operated continuously since 1958.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be home for pest control service in Madison?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most visits, no. EnviroCare's bi-monthly service is exterior-first — your technician treats the perimeter without needing inside access. Interior treatment is available on request. You'll receive notification when your technician is en route.",
      },
    },
  ],
};

export default function MadisonPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`
        :root {
          --green: #0E8E40;
          --forest: #0A7935;
          --deep: #07642B;
          --gold: #F5A800;
          --cream: #FEFDF8;
          --ink: #0E1A0F;
          --paper: #FAFAF7;
          --muted: #4b5563;
          --line: rgba(14,142,64,0.15);
        }
        .mad-hero {
          background: linear-gradient(135deg, var(--forest) 0%, var(--deep) 100%);
          color: white;
          padding: 80px 24px 96px;
          position: relative;
          overflow: hidden;
        }
        .mad-hero::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,168,0,0.15), transparent 70%);
        }
        .mad-wrap { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
        .mad-badge {
          display: inline-block;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--gold);
          padding: 6px 14px; border-radius: 100px;
          font-size: 12px; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 600;
          margin-bottom: 24px;
        }
        .mad-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px,5vw,56px);
          line-height: 1.1; margin-bottom: 20px; max-width: 800px;
        }
        .mad-h1 em { font-style: italic; color: var(--gold); }
        .mad-lede { font-size: 18px; max-width: 640px; margin-bottom: 32px; opacity: 0.92; }
        .mad-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .mad-btn-primary {
          background: var(--gold); color: var(--ink);
          padding: 16px 28px; border-radius: 8px;
          font-weight: 700; font-size: 16px;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
        }
        .mad-btn-secondary {
          background: rgba(255,255,255,0.1); color: white;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 16px 28px; border-radius: 8px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
        }
        .mad-stats {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 24px; margin-top: 56px; padding-top: 36px;
          border-top: 1px solid rgba(255,255,255,0.15);
          max-width: 800px;
        }
        .mad-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 32px; color: var(--gold); font-weight: 700;
        }
        .mad-stat-lbl {
          font-size: 11px; letter-spacing: 0.1em;
          text-transform: uppercase; opacity: 0.75; margin-top: 4px;
        }
        @media (max-width: 640px) {
          .mad-stats { grid-template-columns: repeat(2,1fr); }
        }
        .mad-section { padding: 80px 24px; }
        .mad-eyebrow {
          display: inline-block; font-size: 12px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--green); font-weight: 700; margin-bottom: 14px;
        }
        .mad-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px,4vw,42px);
          line-height: 1.15; margin-bottom: 16px; max-width: 800px;
        }
        .mad-h2 em { font-style: italic; color: var(--green); }
        .mad-section-lede {
          font-size: 17px; color: var(--muted);
          max-width: 700px; margin-bottom: 48px;
        }
        /* SERVICES */
        .mad-services { background: white; }
        .mad-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px,1fr));
          gap: 20px;
        }
        .mad-service-card {
          background: var(--paper); border: 1px solid var(--line);
          border-radius: 14px; padding: 28px 24px;
          transition: all 0.2s ease; position: relative;
        }
        .mad-service-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(14,142,64,0.12);
          border-color: var(--green);
        }
        .mad-ribbon {
          position: absolute; top: -10px; right: 16px;
          background: var(--gold); color: var(--ink);
          padding: 4px 10px; border-radius: 4px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .mad-icon { font-size: 36px; margin-bottom: 16px; }
        .mad-card-h3 {
          font-family: 'Playfair Display', serif;
          font-size: 22px; color: var(--deep); margin-bottom: 8px;
        }
        .mad-price {
          font-family: 'Playfair Display', serif;
          font-size: 24px; color: var(--green); font-weight: 700; margin-bottom: 12px;
        }
        .mad-price small { font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--muted); font-weight: 400; }
        .mad-card-p { font-size: 14px; color: var(--muted); margin-bottom: 14px; line-height: 1.55; }
        .mad-ul { list-style: none; }
        .mad-ul li { font-size: 13px; color: var(--ink); padding-left: 22px; margin-bottom: 6px; position: relative; }
        .mad-ul li::before { content: '✓'; position: absolute; left: 0; color: var(--green); font-weight: 700; }
        /* PEST CONTEXT */
        .mad-context { background: linear-gradient(135deg, var(--cream) 0%, white 100%); }
        .mad-pest-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
          gap: 20px; margin-top: 32px;
        }
        .mad-pest-item {
          background: white; padding: 24px; border-radius: 12px;
          border: 1px solid var(--line);
        }
        .mad-pest-emoji { font-size: 32px; margin-bottom: 10px; }
        .mad-pest-h4 {
          font-family: 'Playfair Display', serif;
          font-size: 18px; color: var(--deep); margin-bottom: 6px;
        }
        .mad-pest-p { font-size: 13px; color: var(--muted); }
        /* NEIGHBORHOODS */
        .mad-hoods { background: var(--paper); }
        .mad-hoods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px,1fr));
          gap: 24px;
        }
        .mad-hood {
          background: white; border-radius: 14px; padding: 32px 28px;
          border-top: 4px solid var(--gold);
          box-shadow: 0 4px 16px rgba(14,26,15,0.04);
        }
        .mad-hood-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--green); font-weight: 700; margin-bottom: 10px; }
        .mad-hood-h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--deep); margin-bottom: 12px; }
        .mad-hood-p { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 12px; }
        .mad-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .mad-tag { font-size: 11px; padding: 4px 10px; background: rgba(14,142,64,0.08); color: var(--deep); border-radius: 100px; font-weight: 600; }
        .mad-zip { font-size: 12px; color: var(--muted); font-weight: 500; padding-top: 12px; border-top: 1px solid var(--line); }
        /* FAQ */
        .mad-faq { background: white; }
        .mad-faq-list { max-width: 800px; margin-top: 32px; }
        .mad-faq-item { border: 1px solid var(--line); border-radius: 10px; margin-bottom: 12px; background: var(--paper); overflow: hidden; }
        .mad-faq-q { padding: 20px 24px; cursor: pointer; font-weight: 600; color: var(--deep); font-size: 16px; display: flex; justify-content: space-between; align-items: center; list-style: none; }
        .mad-faq-q::-webkit-details-marker { display: none; }
        .mad-faq-q::after { content: '+'; font-size: 24px; color: var(--green); }
        details[open] .mad-faq-q::after { content: '−'; }
        .mad-faq-a { padding: 0 24px 20px; font-size: 15px; color: var(--muted); line-height: 1.7; }
        /* CTA STRIP */
        .mad-cta-strip {
          background: linear-gradient(135deg, var(--forest) 0%, var(--deep) 100%);
          color: white; padding: 72px 24px; text-align: center;
        }
        .mad-cta-strip .mad-h2 { color: white; margin: 0 auto 16px; text-align: center; }
        .mad-cta-strip .mad-h2 em { color: var(--gold); }
        .mad-cta-strip p { font-size: 17px; opacity: 0.92; max-width: 600px; margin: 0 auto 32px; }
        /* NEARBY */
        .mad-nearby { background: var(--paper); }
        .mad-nearby-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
        .mad-nearby-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 12px 20px; background: white;
          border: 1px solid var(--line); border-radius: 8px;
          font-size: 14px; font-weight: 600; color: var(--deep);
          text-decoration: none; transition: all 0.15s;
        }
        .mad-nearby-link:hover { border-color: var(--green); color: var(--green); text-decoration: none; }
        /* NAP BOX */
        .mad-nap {
          background: white; border: 1px solid var(--line); border-radius: 14px;
          padding: 32px 28px; max-width: 480px; margin-top: 48px;
        }
        .mad-nap h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--deep); margin-bottom: 16px; }
        .mad-nap-row { display: flex; gap: 10px; margin-bottom: 10px; font-size: 14px; color: var(--muted); align-items: flex-start; }
        .mad-nap-icon { color: var(--green); font-size: 16px; flex-shrink: 0; margin-top: 1px; }
        .mad-nap-phone { font-size: 20px; font-weight: 700; color: var(--green); text-decoration: none; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="mad-hero">
        <div className="mad-wrap">
          <div className="mad-badge">Madison, AL · Limestone County · Huntsville Office</div>
          <h1 className="mad-h1">
            Pest Control in <em>Madison, Alabama</em> —<br />
            Family-Owned Since 1958
          </h1>
          <p className="mad-lede">
            EnviroCare's Huntsville team protects Madison homes from ants, roaches, termites,
            mosquitoes, and more. Bi-monthly exterior service — most visits don't require you home.
          </p>
          <div className="mad-cta-row">
            <a href="/quote" className="mad-btn-primary">
              Get a Free Quote →
            </a>
            <a href="tel:2569377676" className="mad-btn-secondary">
              📞 (256) 937-7676
            </a>
          </div>
          <div className="mad-stats">
            <div>
              <div className="mad-stat-num">1958</div>
              <div className="mad-stat-lbl">Founded</div>
            </div>
            <div>
              <div className="mad-stat-num">$35</div>
              <div className="mad-stat-lbl">Pest / mo</div>
            </div>
            <div>
              <div className="mad-stat-num">$1M</div>
              <div className="mad-stat-lbl">Termite Coverage</div>
            </div>
            <div>
              <div className="mad-stat-num">3rd</div>
              <div className="mad-stat-lbl">Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="mad-section mad-services">
        <div className="mad-wrap">
          <div className="mad-eyebrow">Services for Madison, AL</div>
          <h2 className="mad-h2">
            Four Programs — <em>One Trusted Team</em>
          </h2>
          <p className="mad-section-lede">
            Every service your Madison home needs, handled by one local technician who learns your
            property. One invoice, one relationship, no juggling vendors.
          </p>
          <div className="mad-services-grid">
            {/* Pest */}
            <div className="mad-service-card">
              <div className="mad-ribbon">Most Popular</div>
              <div className="mad-icon">🛡️</div>
              <h3 className="mad-card-h3">Pest Control</h3>
              <div className="mad-price">$35<small>/mo · ACH autopay</small></div>
              <p className="mad-card-p">
                Bi-monthly exterior perimeter service covering 30+ common pests — ants, roaches,
                spiders, wasps, silverfish, earwigs and more. Interior on request.
              </p>
              <ul className="mad-ul">
                <li>Exterior-first — no need to be home</li>
                <li>Unlimited free re-service between visits</li>
                <li>EPA-registered products applied per label</li>
                <li>No long-term contracts</li>
              </ul>
            </div>
            {/* Termite */}
            <div className="mad-service-card">
              <div className="mad-ribbon">$1M Coverage</div>
              <div className="mad-icon">🪵</div>
              <h3 className="mad-card-h3">Termite — Sentricon®</h3>
              <div className="mad-price">$32<small>/mo or $325 install</small></div>
              <p className="mad-card-p">
                Sentricon® Always Active™ bait stations eliminate the entire colony — not just the
                workers reaching your home. Critical for Madison's rapid new-construction corridor.
              </p>
              <ul className="mad-ul">
                <li>Free full-home inspection, no obligation</li>
                <li>No drilling, no liquid barrier chemicals</li>
                <li>Up to $1,000,000 damage repair coverage</li>
                <li>Annual inspection included</li>
              </ul>
            </div>
            {/* Mosquito */}
            <div className="mad-service-card">
              <div className="mad-icon">🦟</div>
              <h3 className="mad-card-h3">Mosquito Barrier</h3>
              <div className="mad-price">$45<small>/treatment · Mar–Nov</small></div>
              <p className="mad-card-p">
                30-day yard barrier program applied March through November. Dramatically reduces
                mosquito activity along Limestone Creek drainage areas and subdivision ponds.
              </p>
              <ul className="mad-ul">
                <li>9 treatments per season</li>
                <li>Effective on decks, yards, and fence lines</li>
                <li>Applied according to label directions</li>
              </ul>
            </div>
            {/* Tick */}
            <div className="mad-service-card">
              <div className="mad-icon">🐾</div>
              <h3 className="mad-card-h3">Tick Control</h3>
              <div className="mad-price">$65<small>/treatment w/ mosquito</small></div>
              <p className="mad-card-p">
                Targeted yard treatment that breaks the tick lifecycle. Important for wooded
                perimeter lots near Redstone Arsenal and the natural corridors around Madison.
              </p>
              <ul className="mad-ul">
                <li>Lone Star, Dog & Deer ticks</li>
                <li>Covers chiggers too</li>
                <li>Bundles with mosquito service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY MADISON NEEDS THIS ────────────────────────── */}
      <section className="mad-section mad-context">
        <div className="mad-wrap">
          <div className="mad-eyebrow">Why Madison, AL Has Unique Pest Pressure</div>
          <h2 className="mad-h2">
            Six Reasons Madison Homeowners <em>Call Us First</em>
          </h2>
          <p className="mad-section-lede">
            Madison's explosive growth, proximity to Redstone Arsenal, and Limestone Creek drainage
            create specific pest challenges that generic national chains don't understand.
          </p>
          <div className="mad-pest-grid">
            <div className="mad-pest-item">
              <div className="mad-pest-emoji">🏗️</div>
              <h4 className="mad-pest-h4">Bridge St / Research Park New Construction</h4>
              <p className="mad-pest-p">
                The rapid development along the Bridge Street corridor disturbs native termite
                colonies. New builds on previously undisturbed soil face elevated subterranean
                termite pressure — and most builders don't include long-term bait station coverage.
              </p>
            </div>
            <div className="mad-pest-item">
              <div className="mad-pest-emoji">🏫</div>
              <h4 className="mad-pest-h4">Madison City Schools Neighborhoods</h4>
              <p className="mad-pest-p">
                The family-dense subdivisions around Madison City Schools see heavy ant, wasp,
                and fall-invader traffic as homes back up against wooded green space. Kids tracking
                in fire ant mounds from new sod is a recurring seasonal problem.
              </p>
            </div>
            <div className="mad-pest-item">
              <div className="mad-pest-emoji">🐜</div>
              <h4 className="mad-pest-h4">County Line Rd Suburban Expansion</h4>
              <p className="mad-pest-p">
                New subdivisions along the County Line Road corridor are laying fresh sod over
                fire ant territory. Native fire ant queens relocate when sod is rolled — infestations
                appear suddenly in yards that were pest-free for months.
              </p>
            </div>
            <div className="mad-pest-item">
              <div className="mad-pest-emoji">🌲</div>
              <h4 className="mad-pest-h4">Redstone Arsenal Wooded Perimeter</h4>
              <p className="mad-pest-p">
                Lots adjacent to the Arsenal's extensive natural buffer zone face elevated tick
                and mosquito pressure. Deer travel across perimeter fences regularly, carrying
                ticks directly into residential yards.
              </p>
            </div>
            <div className="mad-pest-item">
              <div className="mad-pest-emoji">💧</div>
              <h4 className="mad-pest-h4">Limestone Creek Drainage Mosquitoes</h4>
              <p className="mad-pest-p">
                Limestone Creek and its feeder ditches run through multiple Madison neighborhoods
                and create persistent mosquito breeding habitat. Standing water after rain events
                produces new hatches within days throughout summer and fall.
              </p>
            </div>
            <div className="mad-pest-item">
              <div className="mad-pest-emoji">📈</div>
              <h4 className="mad-pest-h4">Rapid Growth = No Pest History</h4>
              <p className="mad-pest-p">
                Madison adds thousands of new homes every year, many in buyers' first Alabama
                home. Without established pest history on a lot, problems like termite colonies
                or recurring ant trails go undetected until damage is already visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEIGHBORHOODS ─────────────────────────────────── */}
      <section className="mad-section mad-hoods">
        <div className="mad-wrap">
          <div className="mad-eyebrow">Neighborhoods We Serve</div>
          <h2 className="mad-h2">
            Protecting Homes Across <em>All of Madison</em>
          </h2>
          <p className="mad-section-lede">
            From Heritage Plantation to Madison Crossings and the Bridge Street corridor — your
            technician knows the pest patterns specific to your neighborhood.
          </p>
          <div className="mad-hoods-grid">
            <div className="mad-hood">
              <div className="mad-hood-label">Established Neighborhood</div>
              <h3 className="mad-hood-h3">Heritage Plantation</h3>
              <p className="mad-hood-p">
                One of Madison's most established affluent neighborhoods. Mature landscaping and
                established tree canopy creates elevated mosquito and carpenter ant pressure. Homes
                here benefit most from year-round perimeter pest service plus seasonal mosquito
                barrier treatments.
              </p>
              <div className="mad-tags">
                <span className="mad-tag">Mosquito Priority</span>
                <span className="mad-tag">Termite Inspection</span>
              </div>
              <div className="mad-zip">ZIP: 35758</div>
            </div>
            <div className="mad-hood">
              <div className="mad-hood-label">Fast-Growing Subdivision</div>
              <h3 className="mad-hood-h3">Madison Crossings</h3>
              <p className="mad-hood-p">
                Family subdivisions with newer construction and fresh landscaping. Fire ants
                establish quickly in new sod, and subterranean termites are a consistent concern
                during the post-construction window before colonies are detected.
              </p>
              <div className="mad-tags">
                <span className="mad-tag">Fire Ant Risk</span>
                <span className="mad-tag">New Build Termite</span>
              </div>
              <div className="mad-zip">ZIP: 35756</div>
            </div>
            <div className="mad-hood">
              <div className="mad-hood-label">Lake-Adjacent</div>
              <h3 className="mad-hood-h3">Clift's Cove &amp; Waterfront Lots</h3>
              <p className="mad-hood-p">
                Properties near retention ponds and low-lying drainage areas face the heaviest
                mosquito activity in Madison. The 30-day barrier program is essential for waterfront
                and pond-adjacent lots from March through November.
              </p>
              <div className="mad-tags">
                <span className="mad-tag">High Mosquito</span>
                <span className="mad-tag">Tick Risk</span>
              </div>
              <div className="mad-zip">ZIP: 35758</div>
            </div>
            <div className="mad-hood">
              <div className="mad-hood-label">Research Corridor</div>
              <h3 className="mad-hood-h3">Bridge Street &amp; Research Park Area</h3>
              <p className="mad-hood-p">
                The mixed-use and residential areas around Bridge Street Town Centre see heavy
                construction activity that displaces termite colonies. Nearby natural corridors
                push stinging insects, spiders, and rodents into adjacent neighborhoods seasonally.
              </p>
              <div className="mad-tags">
                <span className="mad-tag">Termite Active</span>
                <span className="mad-tag">Stinging Insects</span>
              </div>
              <div className="mad-zip">ZIP: 35806</div>
            </div>
          </div>

          {/* NAP Box */}
          <div className="mad-nap">
            <h3>Huntsville Office — Serving Madison</h3>
            <div className="mad-nap-row">
              <span className="mad-nap-icon">📍</span>
              <span>7027 Old Madison Pike, Ste 108, Huntsville, AL 35806</span>
            </div>
            <div className="mad-nap-row">
              <span className="mad-nap-icon">🕐</span>
              <span>Mon–Fri 8am–5pm · Closed weekends</span>
            </div>
            <div className="mad-nap-row">
              <span className="mad-nap-icon">📞</span>
              <a href="tel:2569377676" className="mad-nap-phone">(256) 937-7676</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="mad-section mad-faq">
        <div className="mad-wrap">
          <div className="mad-eyebrow">Frequently Asked Questions</div>
          <h2 className="mad-h2">
            Pest Control in Madison, AL — <em>Your Questions Answered</em>
          </h2>
          <div className="mad-faq-list">
            {[
              {
                q: "How much does pest control cost in Madison AL?",
                a: "EnviroCare's bi-monthly pest control starts at $35/month on ACH autopay, or $70 per visit. That covers 30+ common pests including ants, roaches, spiders, and wasps, with unlimited free re-service between visits. An initial visit is typically $150, often $99 for new customers.",
              },
              {
                q: "Does Madison AL have termite problems in new construction?",
                a: "Yes. Madison's rapid growth means thousands of new homes are built on previously undisturbed soil with high native termite pressure. New construction in North Alabama — especially near the Research Park and Bridge Street corridors — should have Sentricon® Always Active™ stations installed before or shortly after completion. EnviroCare offers free termite inspections with no obligation.",
              },
              {
                q: "What is the best termite protection for Madison AL homes?",
                a: "Sentricon® Always Active™ is the most effective termite protection available for Madison homes. Unlike liquid barrier treatments, Sentricon uses in-ground bait stations that eliminate the entire colony — not just foragers. EnviroCare is a Sentricon Certified Specialist serving Madison. Installation starts at $325 including the first year's protection, with up to $1,000,000 in damage repair coverage.",
              },
              {
                q: "How bad are mosquitoes near Madison AL?",
                a: "Mosquito pressure is high in Madison due to Limestone Creek and the area's Tennessee River tributary drainage. Subdivisions near low-lying areas and retention ponds experience the worst activity from March through November. EnviroCare's 30-day yard barrier program significantly reduces mosquito activity with treatments every 30 days through the season.",
              },
              {
                q: "Is EnviroCare licensed for pest control in Madison AL?",
                a: "Yes. EnviroCare Pest & Termite Services is fully licensed and insured in Alabama and has served the North Alabama market from our Huntsville office at 7027 Old Madison Pike, Ste 108. We are a Sentricon Certified Specialist and have operated continuously since 1958.",
              },
              {
                q: "Do I need to be home for pest control service in Madison?",
                a: "For most visits, no. EnviroCare's bi-monthly service is exterior-first — your technician treats the perimeter without needing inside access. Interior treatment is available on request. You'll receive notification when your technician is en route.",
              },
            ].map(({ q, a }) => (
              <details className="mad-faq-item" key={q}>
                <summary className="mad-faq-q">{q}</summary>
                <div className="mad-faq-a">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section className="mad-cta-strip">
        <div className="mad-wrap" style={{ textAlign: "center" }}>
          <h2 className="mad-h2" style={{ color: "white", margin: "0 auto 16px" }}>
            Ready to Protect Your <em>Madison Home?</em>
          </h2>
          <p style={{ fontSize: 17, opacity: 0.92, maxWidth: 600, margin: "0 auto 32px" }}>
            Free termite inspection. No contracts. One local technician who knows your neighborhood.
            Our Huntsville office serves all of Madison — call or request a quote online.
          </p>
          <div className="mad-cta-row" style={{ justifyContent: "center" }}>
            <a href="/quote" className="mad-btn-primary">Get a Free Quote →</a>
            <a href="tel:2569377676" className="mad-btn-secondary">📞 (256) 937-7676</a>
          </div>
        </div>
      </section>

      {/* ── NEARBY CITIES ─────────────────────────────────── */}
      <section className="mad-section mad-nearby">
        <div className="mad-wrap">
          <div className="mad-eyebrow">Also Serving Nearby</div>
          <h2 className="mad-h2">
            North Alabama Locations <em>Near Madison</em>
          </h2>
          <p className="mad-section-lede">
            EnviroCare's Huntsville office serves all of North Alabama.
            Find your city for local pricing and technician availability.
          </p>
          <div className="mad-nearby-grid">
            <Link href="/huntsville" className="mad-nearby-link">🚀 Huntsville →</Link>
            <Link href="/athens" className="mad-nearby-link">🏛️ Athens →</Link>
            <Link href="/hampton-cove" className="mad-nearby-link">⛳ Hampton Cove →</Link>
            <Link href="/harvest" className="mad-nearby-link">🌾 Harvest →</Link>
            <Link href="/decatur" className="mad-nearby-link">🏭 Decatur →</Link>
            <Link href="/hartselle" className="mad-nearby-link">🌳 Hartselle →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
