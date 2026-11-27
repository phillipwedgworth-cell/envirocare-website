// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/faq/termite-warranty/page.tsx
// Commit: fix(content+compliance): fire ant $150/most yards + 1-yr warranty; Mosquito+Tick excludes fleas; remove 'safe' and 'same technician' claims
// Push: main
// ─────────────────────────────────────
// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/faq/termite-warranty/page.tsx
// Commit: fix(compliance): $1M is EnviroCare damage repair coverage, not a Corteva warranty
// Push: main
// ─────────────────────────────────────
// app/faq/termite-warranty/page.tsx
// EnviroCare · $1M Termite Damage Repair Coverage FAQ
// NOTE: the /faq/termite-warranty slug is deliberately unchanged — "warranty"
// is what people search. Display copy says "damage repair coverage" and names
// EnviroCare as the provider. The coverage is EnviroCare's, never Corteva's.
// Server component — no client interactivity needed

import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata: Metadata = {
  title: "$1 Million Termite Damage Coverage FAQ | EnviroCare Alabama",
  description:
    "How EnviroCare's up to $1,000,000 termite damage repair coverage works in Alabama — what it covers and how to keep it active. Family-owned since 1958.",
  alternates: { canonical: './' },
  openGraph: { url: 'https://www.envirocarellc.com/faq/termite-warranty',
    title: "$1 Million Termite Damage Coverage FAQ | EnviroCare Alabama",
    description: "How EnviroCare's up to $1,000,000 termite damage repair coverage works in Alabama — what it covers and how to keep it active. Family-owned since 1958.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "$1 Million Termite Damage Coverage FAQ | EnviroCare Alabama",
    description: "How EnviroCare's up to $1,000,000 termite damage repair coverage works in Alabama — what it covers and how to keep it active. Family-owned since 1958.",
    images: ['/og-image.png'],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the $1 million termite damage repair coverage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualifying homes with an active EnviroCare Sentricon® agreement may receive up to $1,000,000 in termite damage repair coverage. Eligibility, covered damage, exclusions, limits, inspection duties and claims requirements are defined by the written agreement.",
      },
    },
    {
      "@type": "Question",
      name: "What does the damage repair coverage cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualifying structural damage from subterranean termites may be covered up to the contract limit while the required service and inspection conditions are met. Ask to review the actual written agreement for exclusions, claim deadlines and maintenance obligations.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Sentricon cost at EnviroCare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EnviroCare prices Sentricon® after a free on-site termite inspection — the exact figure depends on your home's linear footage and foundation type. Every plan uses the same Sentricon® Always Active™ system. Most agreements are retreatment-only; repair coverage of up to $1,000,000 is available on qualifying homes under an EnviroCare repair agreement, subject to the terms of the agreement, and the inspection is always free with no obligation.",
      },
    },
    {
      "@type": "Question",
      name: "Is drilling required to install Sentricon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Sentricon is an in-ground bait station system. Stations are installed around the perimeter of your home in the soil — no drilling into your slab, no chemical injection through your foundation. This is one of the key advantages over liquid termite barrier treatments.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Sentricon and liquid termite treatment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sentricon uses bait stations: termites must find and feed on the bait for colony effects. Liquid termiticides treat soil around or beneath a structure. Nonrepellent liquids such as Termidor can also affect termite populations through contact and transfer between termites. Treatment choice, access and follow-up depend on a site inspection.",
      },
    },
  ],
};

const G = "#0A7935";
const GT = "#0A7935";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const CREAM = "#FEFDF8";
const PAPER = "#F8F6EE";
const GREY = "#6B7569";
const LINE = "rgba(14,26,15,0.12)";
const sf = { fontFamily: "var(--font-sans)" } as const;
const ss = { fontFamily: "'Fraunces', var(--font-serif)" } as const;

const FAQS = [
  {
    q: "What is the $1,000,000 termite damage repair coverage?",
    a: "Qualifying homes under an active EnviroCare Sentricon® agreement may receive up to $1,000,000 in termite damage repair coverage. Coverage, exclusions, limits, inspections and claims are governed by the written agreement; request a copy before enrolling.",
  },
  {
    q: "What exactly does the coverage cover?",
    a: "Eligible structural damage caused by covered subterranean termite activity may qualify for repair coverage up to the limit in the EnviroCare agreement. The agreement controls what counts as covered damage, any exclusions, required inspections and the procedure for making a claim.",
  },
  {
    q: "What's NOT covered?",
    a: "The specific agreement determines exclusions and limitations. For example, a termite repair agreement may distinguish pre-existing damage, cosmetic work and damage from pests other than covered termites. Ask for the full exclusions, reporting deadlines and claim conditions in writing rather than treating this summary as a complete list.",
  },
  {
    q: "How do I keep the coverage active?",
    a: "Keep the account and required station service current, provide inspection access, report signs of termites promptly and follow the maintenance and renewal requirements in the written agreement. An annual inspection by itself does not replace other coverage conditions. Ask about any lapse, reinstatement or waiting-period rules.",
  },
  {
    q: "How much does Sentricon cost at EnviroCare?",
    a: "Sentricon® is priced after a free on-site termite inspection — the exact figure depends on your home's linear footage and foundation type. Every plan uses the same Sentricon® Always Active™ system. Most agreements are retreatment-only; repair coverage of up to $1,000,000 is available on qualifying homes under an EnviroCare repair agreement, subject to the terms of the agreement. The inspection is free with no obligation.",
  },
  {
    q: "Is drilling required to install Sentricon?",
    a: "Sentricon stations are generally installed in soil around the structure without drilling through the slab or injecting liquid termiticide. Site access, utilities, hardscaping and installation details should be confirmed at inspection. Your technician can explain any necessary yard disturbance and appointment requirements.",
  },
  {
    q: "How is Sentricon different from liquid termite treatment?",
    a: "Sentricon® uses in-ground bait stations, with colony effects after termites locate and feed on the bait. Liquid soil treatments create a treated zone around or beneath the structure; nonrepellent products such as Termidor® can also affect colonies as exposed termites transfer the ingredient to others. Baiting and liquid treatment both require an inspection-based plan and appropriate follow-up. EPA recognized the Sentricon system with a 2000 Presidential Green Chemistry Challenge award.",
  },
  {
    q: "Do I need to leave my house during installation?",
    a: "A routine Sentricon station installation takes place outdoors, and occupants generally do not need to leave the house for that work. Your technician will explain any additional inspection, treatment, access or product-label instructions specific to the property.",
  },
  {
    q: "Will I see termites die?",
    a: "Usually not. Sentricon is designed to affect termite colonies when foraging termites discover and feed on the bait. The timeline varies with termite activity, site conditions and feeding; no fixed 30–90-day result should be promised. Scheduled station service and follow-up inspections help assess activity.",
  },
  {
    q: "Can I add Sentricon to my existing pest control plan?",
    a: "Yes. Sentricon can be added to any existing EnviroCare pest control plan on one invoice — pest control is $35/month and the Sentricon® portion is quoted at your free termite inspection, with your familiar local team on one schedule. Call any of our four Alabama offices to add termite protection.",
  },
  {
    q: "EnviroCare vs. Terminix or Orkin for termites — what's the difference?",
    a: "EnviroCare is a local, family-owned Sentricon Certified Specialist. The Wedgworth family's Alabama pest-control history began in Alexander City in 1958. A familiar local team services your property, so your home's history stays with people who know it. Most termite agreements are retreatment-only; repair coverage of up to $1,000,000 is available on qualifying homes under an EnviroCare repair agreement, subject to inspection and approval and subject to the terms of the agreement.",
  },
];

const COMPARE = [
  { feature: "Method", sentricon: "In-ground bait stations", liquid: "Soil injection barrier" },
  { feature: "Colony effects", sentricon: "Bait targets colonies after termites feed", liquid: "Nonrepellent liquids may also affect colonies via transfer" },
  { feature: "Drilling", sentricon: "Typically not for bait station installation", liquid: "May be needed, depending on structure and access" },
  { feature: "Repair coverage", sentricon: "Up to $1M on qualifying EnviroCare agreements", liquid: "Depends on the provider's written agreement" },
  { feature: "EPA recognition", sentricon: "Sentricon system received a 2000 Green Chemistry award", liquid: "Use EPA-registered products as labeled" },
  { feature: "Ongoing care", sentricon: "Stations require continued service and inspection", liquid: "Inspection and any re-treatment depend on the plan" },
  { feature: "Application", sentricon: "Termite bait placed in stations", liquid: "Labeled liquid termiticide applied to soil" },
];

export default function TermiteWarrantyFAQ() {
  return (
    <div style={{ minHeight: "100vh", background: CREAM, ...sf }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'FAQ', path: '/faq' }, { name: 'Termite Damage Coverage', path: '/faq/termite-warranty' }]) }) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* HERO */}
      <section
        style={{
          background: `linear-gradient(160deg, ${DARK} 0%, #0a1f10 100%)`,
          padding: "72px clamp(20px,5vw,64px) 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: GOLD,
            opacity: 0.04,
            filter: "blur(90px)",
          }}
        />
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${GOLD}18`,
              border: `1px solid ${GOLD}44`,
              borderRadius: 6,
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: GOLD,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Sentricon® · Up to $1,000,000 EnviroCare Coverage · FAQ
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem,4.5vw,3rem)",
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: 20,
              letterSpacing: "-0.02em",
              ...ss,
            }}
          >
            Up to $1,000,000 in EnviroCare Damage Coverage —{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>
              What It Really Covers.
            </em>
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: 36,
              maxWidth: 640,
            }}
          >
            Learn about bait-based termite protection and the written terms for
            qualifying EnviroCare damage repair coverage before you choose a
            treatment plan.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="/services/sentricon"
              style={{
                background: GOLD,
                color: DARK,
                padding: "14px 30px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              See Sentricon Plans →
            </a>
            <a
              href="tel:2059406360"
              style={{
                background: "transparent",
                color: "#fff",
                padding: "14px 30px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              (205) 940-6360
            </a>
          </div>
        </div>
      </section>

      {/* WARRANTY CALLOUT */}
      <section style={{ background: "#fff", padding: "56px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            {[
              {
                n: "$1,000,000",
                label: "EnviroCare damage repair coverage",
                note: "Subject to the terms of the agreement",
                color: GOLD,
              },
              {
                n: "No drilling",
                label: "Installation method",
                note: "In-ground stations — no holes in your slab or foundation",
                color: G,
              },
              {
                n: "Quote",
                label: "Starting price",
                note: "Treatment and renewal charges quoted after inspection",
                color: G,
              },
              {
                n: "EPA award",
                label: "Green Chemistry recognition",
                note: "Sentricon received a Presidential Green Chemistry Challenge award in 2000",
                color: GT,
              },
            ].map((item) => (
              <div
                key={item.n}
                style={{
                  background: CREAM,
                  border: `1px solid ${LINE}`,
                  borderRadius: 12,
                  padding: "24px 20px",
                  borderTop: `3px solid ${item.color}`,
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: item.color,
                    marginBottom: 4,
                    ...ss,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.n}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: DARK,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 13, color: GREY, lineHeight: 1.5 }}>
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section
        style={{ background: PAPER, padding: "64px clamp(20px,5vw,64px)" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
              fontWeight: 600,
              color: DARK,
              marginBottom: 8,
              letterSpacing: "-0.015em",
              ...ss,
            }}
          >
            Sentricon vs. Liquid Termite Treatment
          </h2>
          <p style={{ color: GREY, fontSize: 14, marginBottom: 28 }}>
            Compare methods, installation, follow-up and coverage terms; details depend on the treatment plan.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
                minWidth: 520,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      background: DARK,
                      color: GOLD,
                      textAlign: "left",
                      padding: "12px 16px",
                      ...ss,
                      fontWeight: 500,
                    }}
                  >
                    Feature
                  </th>
                  <th
                    style={{
                      background: DARK,
                      color: GOLD,
                      textAlign: "left",
                      padding: "12px 16px",
                      ...ss,
                      fontWeight: 500,
                    }}
                  >
                    Sentricon®
                  </th>
                  <th
                    style={{
                      background: DARK,
                      color: "rgba(255,255,255,0.55)",
                      textAlign: "left",
                      padding: "12px 16px",
                      ...ss,
                      fontWeight: 500,
                    }}
                  >
                    Liquid Barrier
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature}>
                    <td
                      style={{
                        padding: "13px 16px",
                        borderBottom: `1px solid ${LINE}`,
                        fontWeight: 600,
                        background: i % 2 === 0 ? "#fff" : CREAM,
                      }}
                    >
                      {row.feature}
                    </td>
                    <td
                      style={{
                        padding: "13px 16px",
                        borderBottom: `1px solid ${LINE}`,
                        color: GT,
                        fontWeight: 600,
                        background: i % 2 === 0 ? `${G}06` : `${G}0A`,
                      }}
                    >
                      {row.sentricon}
                    </td>
                    <td
                      style={{
                        padding: "13px 16px",
                        borderBottom: `1px solid ${LINE}`,
                        color: GREY,
                        background: i % 2 === 0 ? "#fff" : CREAM,
                      }}
                    >
                      {row.liquid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: GREY, fontSize: 13, lineHeight: 1.7, marginTop: 18 }}>
            Sources and further reading:{" "}
            <a href="https://www.epa.gov/safepestcontrol/termites-how-identify-and-control-them" target="_blank" rel="noopener noreferrer" style={{ color: G, textDecoration: "underline" }}>EPA on termite treatment methods</a>
            {" · "}
            <a href="https://pestcontrol.basf.us/products/termidor--sc-termiticide-insecticide.html" target="_blank" rel="noopener noreferrer" style={{ color: G, textDecoration: "underline" }}>BASF on Termidor's nonrepellent transfer effect</a>
            {" · "}
            <a href="https://www.epa.gov/greenchemistry/presidential-green-chemistry-challenge-2000-designing-greener-chemicals-award" target="_blank" rel="noopener noreferrer" style={{ color: G, textDecoration: "underline" }}>EPA's 2000 Sentricon award</a>
            {" · "}
            <a href="/blog/sentricon-vs-liquid-termite-treatment" style={{ color: G, textDecoration: "underline" }}>EnviroCare's detailed comparison</a>.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        style={{ background: CREAM, padding: "64px clamp(20px,5vw,64px)" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem,2.8vw,2rem)",
              fontWeight: 600,
              color: DARK,
              marginBottom: 40,
              letterSpacing: "-0.015em",
              ...ss,
            }}
          >
            Termite Damage Coverage FAQ
          </h2>
          <div>
            {FAQS.map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: `1px solid ${LINE}`,
                  padding: "24px 0",
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    color: DARK,
                    fontSize: 17,
                    marginBottom: 10,
                    lineHeight: 1.4,
                    ...ss,
                  }}
                >
                  {item.q}
                </p>
                <p
                  style={{
                    color: "#3d4f44",
                    lineHeight: 1.8,
                    fontSize: 15,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: `linear-gradient(160deg, ${DARK} 0%, #0d2b12 100%)`,
          padding: "72px clamp(20px,5vw,64px)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              border: `1px solid ${GOLD}55`,
              borderRadius: 4,
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            Sentricon Certified Specialist · Alabama
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 600,
              color: "#fff",
              marginBottom: 16,
              letterSpacing: "-0.02em",
              ...ss,
            }}
          >
            Up to $1,000,000 in EnviroCare Damage Repair Coverage.{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>
              Priced after a free termite inspection.
            </em>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.68)",
              marginBottom: 32,
              fontSize: 16,
              lineHeight: 1.75,
            }}
          >
            Sentricon bait stations generally need no slab drilling.
            Termite installation and renewal are quoted after a free inspection.
            Our family's Alabama pest-control history dates to 1958.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/quote"
              style={{
                background: GOLD,
                color: DARK,
                padding: "16px 36px",
                borderRadius: 8,
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Get Free Termite Inspection →
            </a>
            <a
              href="tel:2059406360"
              style={{
                background: "transparent",
                color: "#fff",
                padding: "16px 36px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              (205) 940-6360
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
