// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/pages/DeepCityPage.tsx
// Commit: feat(city): render per-city CityHeroArt landmark band in hero
// Push: main
// ─────────────────────────

import Link from "next/link";
import type { ReactNode } from "react";
import { EmojiIcon } from "@/components/shared/PestIcon";
import CityHeroArt from "@/components/CityHeroArt";

/**
 * DeepCityPage — shared layout for wealthy-corridor "deep" city pages
 * (Vestavia Hills, Homewood, Hoover, Mt Laurel, Greystone, Chelsea, Trussville…).
 *
 * Same visual structure + schema as the hand-built Birmingham/Mountain Brook
 * deep pages, parameterized by a DeepCityConfig so each route is a compact
 * content file. Built from the wealthy-corridor playbook: own the service-level
 * queries via city-named H2 subsections + a quotable GEO summary + offer-catalog
 * / FAQ / speakable schema.
 *
 * Compliance is the caller's responsibility in the copy, but the standard
 * pricing/office details (Birmingham metro) live here: $35 pest / Sentricon priced at inspection
 * / $45 mosquito / $65 Mosquito + Tick, office 2025 Butler Road Alabaster,
 * (205) 940-6360. No discount language, mosquito/tick hedged, Sentricon $1M =
 * EnviroCare's own guarantee.
 */

const G = "#0A7935";
const D = "#07642B";
const F = "#0A7935";
const Au = "#F5A800";
const Cr = "#FEFDF8";
const Ik = "#0E1A0F";

const serif = { fontFamily: "var(--font-serif)" } as const;
const sans = { fontFamily: "var(--font-sans)" } as const;

export type DeepCityConfig = {
  name: string;            // "Vestavia Hills"
  slug: string;            // "vestavia-hills"
  badge: string;           // "Vestavia Hills · Jefferson County · Since 1958"
  zip: string;             // primary postal code for schema
  neighborhoods: string[]; // areaServed.containsPlace + prose
  heroIntro: string;
  summary: string;         // quotable plain-text summary (also schema description seed)
  whyHeadline: string;
  whySub: string;
  pressureCards: { emoji: string; title: string; body: string }[];
  services: { title: string; body: ReactNode }[];   // 5 city-named subsections
  faqs: { q: string; a: string }[];                 // plain text → also FAQPage schema
  siblings: [string, string][];                     // [name, href] internal links
  /**
   * Which office answers this city. OMIT for Alabaster-served cities — the
   * default below keeps every existing page on (205) 940-6360 unchanged.
   *
   * Added 2026-08-06: this component is shared by cities served from different
   * offices, so the phone could not stay hardcoded once Birmingham opened.
   * Source of truth for the values is data/offices.ts.
   */
  officePhone?: string;                             // display, e.g. "(205) 991-2882"
  officeTel?: string;                               // digits, e.g. "2059912882"
  /**
   * Office ADDRESS for the LocalBusiness schema. Omit for Alabaster-served
   * cities. This was hardcoded to Butler Road even after officePhone was made
   * configurable, so Birmingham-territory pages published the new phone beside
   * the Alabaster address — a contradiction inside the same JSON-LD block.
   */
  /** Display label for the office block, e.g. "Birmingham" or "Alabaster". */
  officeLabel?: string;
  officeStreet?: string;
  officeLocality?: string;
  officePostal?: string;
};

/** Alabaster office — the historical default for every DeepCityPage. */
const DEFAULT_PHONE = "(205) 940-6360";
const DEFAULT_TEL = "2059406360";
const DEFAULT_STREET = "2025 Butler Road";
const DEFAULT_LOCALITY = "Alabaster";
const DEFAULT_POSTAL = "35007";
// The office block previously hardcoded "Birmingham Office / 2025 Butler Road ·
// Alabaster" on EVERY page — the same naming trap as data/offices.ts, and after
// the schema was made configurable it left Birmingham pages showing the correct
// address in JSON-LD beside the Alabaster one on screen.
const DEFAULT_LABEL = "Alabaster";

function buildJsonLd(c: DeepCityConfig) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://www.envirocarellc.com/${c.slug}`,
        name: `EnviroCare Pest & Termite Services — ${c.name}`,
        image: "https://www.envirocarellc.com/logo.png",
        url: `https://www.envirocarellc.com/${c.slug}`,
        telephone: `+1${c.officeTel ?? DEFAULT_TEL}`,
        email: "service@envirocarellc.com",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: c.officeStreet ?? DEFAULT_STREET,
          addressLocality: c.officeLocality ?? DEFAULT_LOCALITY,
          addressRegion: "AL",
          postalCode: c.officePostal ?? DEFAULT_POSTAL,
          addressCountry: "US",
        },
        areaServed: {
          "@type": "City",
          name: c.name,
          containsPlace: c.neighborhoods.map((n) => ({ "@type": "Place", name: n })),
          address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: "AL", postalCode: c.zip, addressCountry: "US" },
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
        ],
        description: c.summary,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Pest & Termite Services in ${c.name}`,
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bi-Monthly Pest Control", areaServed: `${c.name}, AL` }, priceCurrency: "USD", price: "35", description: "Covers 30+ pests with unlimited re-service. $35/month." },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Termite Protection (Sentricon)", areaServed: `${c.name}, AL` }, description: "Sentricon baiting, no drilling, EnviroCare guarantee up to $1,000,000. Priced after a free WDO inspection." },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mosquito Control", areaServed: `${c.name}, AL` }, priceCurrency: "USD", price: "45", description: "Nine seasonal treatments, March–November, ~$33.75/month." },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mosquito + Tick Control", areaServed: `${c.name}, AL` }, priceCurrency: "USD", price: "65", description: "Adds tick and chigger coverage, ~$48.75/month." },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Pest Control", areaServed: `${c.name}, AL` } },
          ],
        },
      },
      {
        "@type": "FAQPage",
        speakable: { "@type": "SpeakableSpecification", cssSelector: [`.${c.slug}-summary`, `.${c.slug}-faq`] },
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default function DeepCityPage({ config: c }: { config: DeepCityConfig }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(c)) }} />

      <main style={{ background: "#fff", color: Ik, ...sans }}>
        {/* HERO */}
        <section style={{ background: `linear-gradient(135deg,${D} 0%,${F} 50%,${G} 100%)`, color: "#fff", padding: "5rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 50%,rgba(245,168,0,.12) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(134,239,172,.14) 0%,transparent 55%)", pointerEvents: "none" }} />
          <CityHeroArt slug={c.slug} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 40, padding: ".4rem 1rem", marginBottom: "1.4rem" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase" }}>{c.badge}</span>
            </div>
            <h1 style={{ ...serif, fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: "1.2rem", letterSpacing: "-.5px" }}>
              {c.name} Pest Control<br />
              <span style={{ color: Au, fontStyle: "italic", fontWeight: 700 }}>&amp; Termite Service</span>
            </h1>
            <p style={{ fontSize: "1.12rem", lineHeight: 1.7, color: "rgba(255,255,255,.88)", maxWidth: 640, marginBottom: "2rem" }}>{c.heroIntro}</p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: "2rem", color: "rgba(255,255,255,.85)", fontSize: ".95rem" }}>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>68+</strong> Years serving AL</span>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>4</strong> Generations of Wedgworths</span>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>$1M</strong> Sentricon® coverage</span>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>★★★★★</strong> Google rated</span>
            </div>
            <div style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
              <a href={`tel:${c.officeTel ?? DEFAULT_TEL}`} style={{ background: Au, color: Ik, padding: ".95rem 2rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)" }}>Call {c.officePhone ?? DEFAULT_PHONE} →</a>
              <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>See Pricing</Link>
            </div>
          </div>
        </section>

        {/* QUOTABLE SUMMARY */}
        <section style={{ padding: "3rem clamp(1.5rem,5vw,4rem) 0", background: "#fff" }}>
          <div className={`${c.slug}-summary`} style={{ maxWidth: 900, margin: "0 auto", background: Cr, border: `1px solid ${G}26`, borderLeft: `4px solid ${G}`, borderRadius: 14, padding: "1.6rem 1.8rem" }}>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#2b3a2f", margin: 0 }}>{c.summary}</p>
          </div>
        </section>

        {/* PRESSURE CARDS */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Why {c.name}</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", lineHeight: 1.12, color: Ik, margin: "0 0 .5rem", maxWidth: 880 }}>{c.whyHeadline}</h2>
            <p style={{ fontSize: "1.05rem", color: "#4b5563", maxWidth: 720, margin: "0 0 2.5rem" }}>{c.whySub}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
              {c.pressureCards.map((card, i) => (
                <div key={i} style={{ background: Cr, padding: "1.5rem", borderRadius: 14, border: `1px solid ${G}26` }}>
                  <div style={{ marginBottom: ".75rem" }}><EmojiIcon glyph={card.emoji} /></div>
                  <h3 style={{ ...serif, fontSize: "1.15rem", color: D, margin: "0 0 .4rem", fontWeight: 700 }}>{card.title}</h3>
                  <p style={{ fontSize: ".92rem", color: "#4b5563", lineHeight: 1.55, margin: 0 }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE SUBSECTIONS */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Services in {c.name}</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 2rem" }}>
              What we treat, <em style={{ color: F }}>and what it costs</em>
            </h2>
            {c.services.map((s, i) => (
              <div key={i} style={{ marginBottom: "1.8rem" }}>
                <h3 style={{ ...serif, fontSize: "1.3rem", color: D, margin: "0 0 .5rem", fontWeight: 700 }}>{s.title}</h3>
                <p style={{ fontSize: "1rem", color: "#4b5563", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>{c.name} Pricing</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 .85rem" }}>
              Four programs, <em style={{ color: F }}>two ways to pay</em>
            </h2>
            <p style={{ color: "#4b5563", maxWidth: 620, margin: "0 auto 3rem" }}>Pay per visit, or equal monthly payments on a 12-month ACH agreement.</p>
          </div>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.25rem" }}>
            <Plan name="Pest Control" price="$35" unit="/month" features={["Bi-monthly perimeter service", "30+ Alabama pests covered", "Unlimited free re-services", "Quarterly interior on request"]} />
            <Plan name="Sentricon® Termite" price="Quote" unit="after inspection" features={["In-ground bait stations", "No drilling required", "Up to $1M EnviroCare coverage", "Priced after a free WDO inspection"]} featured />
            <Plan name="Mosquito Yard" price="$45" unit="/treatment" features={["30-day yard barrier", "March – November (9 visits)", "Targets resting & breeding zones", "Tick add-on available"]} />
            <Plan name="Mosquito + Tick" price="$65" unit="/treatment" features={["Mosquito + tick + chigger", "30-day yard barrier", "Best for wooded lots", "March – November"]} />
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Nearby &amp; Related</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: Ik, margin: "0 0 1.8rem" }}>Serving the whole Birmingham metro</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: ".75rem" }}>
              {c.siblings.map(([n, h]) => (
                <Link key={h} href={h} style={{ background: "#fff", border: `1.5px solid ${G}26`, borderRadius: 12, padding: ".85rem 1rem", fontSize: 14, fontWeight: 600, color: D, textAlign: "center", textDecoration: "none" }}>{n}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div className={`${c.slug}-faq`} style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>{c.name} FAQs</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 2rem" }}>
              Answers for <em style={{ color: F }}>{c.name} homeowners</em>
            </h2>
            {c.faqs.map((f, i) => (
              <details key={i} style={{ border: `1px solid ${G}26`, borderRadius: 10, marginBottom: 12, background: Cr, overflow: "hidden" }}>
                <summary style={{ padding: "1.1rem 1.4rem", cursor: "pointer", fontWeight: 600, color: D, fontSize: "1rem" }}>{f.q}</summary>
                <p style={{ padding: "0 1.4rem 1.2rem", color: "#4b5563", fontSize: ".97rem", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* OFFICE + CTA */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: `linear-gradient(135deg,${D} 0%,#062514 100%)`, color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 10 }}>{c.officeLabel ?? DEFAULT_LABEL} Office</div>
            <h2 style={{ ...serif, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", margin: "0 0 .4rem" }}>{`${c.officeStreet ?? DEFAULT_STREET} · ${c.officeLocality ?? DEFAULT_LOCALITY}, AL ${c.officePostal ?? DEFAULT_POSTAL}`}</h2>
            <p style={{ color: "rgba(255,255,255,.85)", marginBottom: "1.8rem", fontSize: "1.05rem" }}>
              Free inspection, straight pricing, and a real Wedgworth on the other end of the phone. M–F 8am–5pm.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".9rem", flexWrap: "wrap" }}>
              <a href={`tel:${c.officeTel ?? DEFAULT_TEL}`} style={{ background: Au, color: Ik, padding: ".95rem 2.1rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)" }}>Call {c.officePhone ?? DEFAULT_PHONE}</a>
              <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>Get a Free Quote →</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Plan({ name, price, unit, features, featured }: { name: string; price: string; unit: string; features: string[]; featured?: boolean }) {
  return (
    <div style={{ background: "#fff", border: featured ? `2px solid ${G}` : `1.5px solid ${G}33`, borderRadius: 18, padding: "1.7rem 1.5rem", boxShadow: featured ? `0 0 0 3px ${G}1A` : "none", position: "relative" }}>
      {featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: G, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 14px", borderRadius: 20, letterSpacing: ".06em", textTransform: "uppercase" }}>Most popular</div>}
      <h3 style={{ ...serif, fontSize: "1.25rem", color: Ik, margin: "0 0 .6rem", fontWeight: 700 }}>{name}</h3>
      <div style={{ marginBottom: "1.1rem" }}>
        <span style={{ ...serif, fontSize: "2.4rem", fontWeight: 700, color: D }}>{price}</span>
        <span style={{ fontSize: ".85rem", color: "#4b5563", marginLeft: 4 }}>{unit}</span>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: 9, fontSize: ".88rem", color: "#4b5563", lineHeight: 1.5, marginBottom: ".5rem" }}>
            <span style={{ color: G, fontWeight: 700 }}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
