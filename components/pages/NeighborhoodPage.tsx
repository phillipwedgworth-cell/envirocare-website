// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/pages/NeighborhoodPage.tsx
// Commit: feat(city): render per-city CityHeroArt landmark band in hero
// Push: main
// ─────────────────────────

/**
 * NeighborhoodPage — shared layout for the premium-tier neighborhood pages
 * (Mountain Brook sub-areas, Vestavia/Liberty Park, Highland Lakes, Indian
 * Springs, Eagle Point, Brook Highland, Meadow Brook, etc.).
 *
 * Each route file in app/{slug}/page.tsx provides a NeighborhoodConfig and
 * its own metadata + JSON-LD schema. This component handles the visual
 * structure and the brand-locked styling.
 *
 * Why a shared component instead of standalone pages: these neighborhoods
 * are similar enough that the structure should be consistent, but the
 * CONTENT (pest pressure narrative, landmark streets, FAQs) must be
 * genuinely unique to each — Google won't reward near-duplicates.
 */

import Link from "next/link";
import { EmojiIcon } from "@/components/shared/PestIcon";
import CityHeroArt from "@/components/CityHeroArt";

export type NeighborhoodConfig = {
  // Page identity
  name: string;                          // e.g. "Liberty Park"
  parentCity?: string;                   // e.g. "Vestavia Hills" (optional)
  zipCodes: string;                      // e.g. "35242"
  // Hero
  heroTagline: string;                   // e.g. "The gated community Birmingham's professionals choose"
  heroIntro: string;                     // 2-3 sentence opener
  // Pest narrative — 5-6 cards, each unique to this neighborhood
  pressureHeadline: string;
  pressureSubhead: string;
  pressureCards: { emoji: string; title: string; body: string }[];
  // Landmark streets / sections within the neighborhood
  landmarksLabel: string;                // e.g. "Areas We Serve in Liberty Park"
  landmarks: string[];
  // FAQ — neighborhood-specific
  faqs: { q: string; a: string }[];
  // Nearby (link out)
  nearby: [string, string][];            // [name, href][]
  // Office contact
  office: {
    name: string;                        // e.g. "Birmingham"
    phone: string;                       // "(205) 940-6360"
    phoneE164: string;                   // "+12059406360"
    address: string;                     // "2025 Butler Road, Alabaster, AL 35007"
  };
};

// ─── Brand tokens (matched to Madison/Fultondale/Birmingham) ──────
const G = "#0A7935";
const D = "#07642B";
const F = "#0A7935";
const Au = "#F5A800";
const Cr = "#FEFDF8";
const Ik = "#0E1A0F";

const serif = { fontFamily: "var(--font-serif)" } as const;
const sans = { fontFamily: "var(--font-sans)" } as const;

export default function NeighborhoodPage({ cfg }: { cfg: NeighborhoodConfig }) {
  const parentLine = cfg.parentCity ? `${cfg.parentCity} · ${cfg.zipCodes}` : cfg.zipCodes;
  const phoneDigits = cfg.office.phone.replace(/\D/g, "");
  const heroArtSlug = (cfg.parentCity ?? cfg.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <main style={{ background: "#fff", color: Ik, ...sans }}>
      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg,${D} 0%,${F} 50%,${G} 100%)`, color: "#fff", padding: "5rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 50%,rgba(245,168,0,.12) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(134,239,172,.14) 0%,transparent 55%)", pointerEvents: "none" }} />
        <CityHeroArt slug={heroArtSlug} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 40, padding: ".4rem 1rem", marginBottom: "1.4rem" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase" }}>{parentLine} · Since 1958</span>
          </div>
          <h1 style={{ ...serif, fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: "1.2rem", letterSpacing: "-.5px" }}>
            Pest &amp; Termite Service<br />
            <span style={{ color: Au, fontStyle: "italic", fontWeight: 700 }}>in {cfg.name}</span>
          </h1>
          <p style={{ fontSize: "1.12rem", lineHeight: 1.7, color: "rgba(255,255,255,.88)", maxWidth: 640, marginBottom: "1.6rem" }}>
            <strong style={{ color: Au }}>{cfg.heroTagline}.</strong> {cfg.heroIntro}
          </p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: "2rem", color: "rgba(255,255,255,.85)", fontSize: ".95rem" }}>
            <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>$1M</strong> Sentricon® coverage</span>
            <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>No</strong> Drilling required</span>
            <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>4</strong> Generations · since 1958</span>
            <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>2</strong> Ways to pay</span>
          </div>
          {/* Disclosure for the $1M tile above — a stat tile cannot carry the clause
              inside itself. Required wherever the figure appears; see the file-scoped
              $1M rule in data/compliance.ts. */}
          <div style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginBottom: "1.5rem" }}>
            Sentricon® damage repair coverage is up to $1,000,000 on qualifying homes, subject to the terms of the agreement.
          </div>
          <div style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
            <a href={`tel:${phoneDigits}`} style={{ background: Au, color: Ik, padding: ".95rem 2rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)" }}>
              Call {cfg.office.phone} →
            </a>
            <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* PRESSURE — neighborhood-specific narrative */}
      <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Why {cfg.name}</div>
          <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", lineHeight: 1.12, color: Ik, margin: "0 0 .5rem", maxWidth: 880 }}>
            {cfg.pressureHeadline}
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#4b5563", maxWidth: 720, margin: "0 0 2.5rem" }}>
            {cfg.pressureSubhead}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
            {cfg.pressureCards.map((c, i) => (
              <div key={i} style={{ background: "#fff", padding: "1.5rem", borderRadius: 14, border: `1px solid ${G}26` }}>
                <div style={{ marginBottom: ".75rem" }}><EmojiIcon glyph={c.emoji} /></div>
                <h3 style={{ ...serif, fontSize: "1.15rem", color: D, margin: "0 0 .4rem", fontWeight: 700 }}>{c.title}</h3>
                <p style={{ fontSize: ".92rem", color: "#4b5563", lineHeight: 1.55, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING (compact — these pages convert on Sentricon + Mosquito + Tick) */}
      <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>{cfg.name} Pricing</div>
          <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 .85rem" }}>
            Four programs, <em style={{ color: F }}>two ways to pay</em>
          </h2>
          <p style={{ color: "#4b5563", maxWidth: 620, margin: "0 auto 3rem" }}>Locked pricing. Pay per visit, or equal monthly payments on a 12-month ACH agreement.</p>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.25rem" }}>
          <Plan name="Sentricon® Termite" price="Quote" unit="after inspection" features={["In-ground bait stations","No drilling required","Up to $1M coverage","Annual WDO letter"]} featured />
          <Plan name="Pest Control" price="$35" unit="/month" features={["Bi-monthly perimeter","30+ Alabama pests","Unlimited re-services","Interior on request"]} />
          <Plan name="Mosquito + Tick" price="$65" unit="/treatment" features={["Mosquito + tick + chigger","30-day yard barrier","Mar–Nov (9 visits)","Best for wooded lots"]} />
          <Plan name="Mosquito Only" price="$45" unit="/treatment" features={["30-day yard barrier","Mar–Nov","Add tick anytime","Big-yard friendly"]} />
        </div>
      </section>

      {/* LANDMARKS */}
      <section style={{ padding: "4.5rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>{cfg.landmarksLabel}</div>
          <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.2vw,2.4rem)", color: Ik, margin: "0 0 2rem" }}>Every street, every drive</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 900, margin: "0 auto" }}>
            {cfg.landmarks.map((n) => (
              <span key={n} style={{ background: "#fff", border: `1.5px solid ${G}33`, borderRadius: 50, padding: ".55rem 1.1rem", fontSize: 13, fontWeight: 600, color: D }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>{cfg.name} FAQs</div>
          <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 2rem" }}>
            Answers for <em style={{ color: F }}>{cfg.name} homeowners</em>
          </h2>
          {cfg.faqs.map((f, i) => (
            <details key={i} style={{ border: `1px solid ${G}26`, borderRadius: 10, marginBottom: 12, background: Cr, overflow: "hidden" }}>
              <summary style={{ padding: "1.1rem 1.4rem", cursor: "pointer", fontWeight: 600, color: D, fontSize: "1rem" }}>{f.q}</summary>
              <p style={{ padding: "0 1.4rem 1.2rem", color: "#4b5563", fontSize: ".97rem", lineHeight: 1.6, margin: 0 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* NEARBY */}
      {cfg.nearby.length > 0 && (
        <section style={{ padding: "2.5rem clamp(1.5rem,5vw,4rem) 3rem", background: Cr, borderTop: `1px solid ${G}22` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 12 }}>Also serving nearby</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {cfg.nearby.map(([n, h]) => (
                <Link key={h} href={h} style={{ padding: "8px 16px", border: `1px solid ${G}4D`, borderRadius: 999, color: D, fontWeight: 600, fontSize: ".92rem", textDecoration: "none", background: "#fff" }}>{n}</Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: `linear-gradient(135deg,${D} 0%,#062514 100%)`, color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 10 }}>{cfg.office.name} Office</div>
          <h2 style={{ ...serif, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", margin: "0 0 .4rem" }}>{cfg.office.address}</h2>
          <p style={{ color: "rgba(255,255,255,.85)", marginBottom: "1.8rem", fontSize: "1.05rem" }}>
            Free inspection, straight pricing, and a real Wedgworth on the other end of the phone.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: ".9rem", flexWrap: "wrap" }}>
            <a href={`tel:${phoneDigits}`} style={{ background: Au, color: Ik, padding: ".95rem 2.1rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)" }}>Call {cfg.office.phone}</a>
            <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>Get a Free Quote →</Link>
          </div>
        </div>
      </section>
    </main>
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
