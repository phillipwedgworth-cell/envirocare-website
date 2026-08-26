// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/madison/page.tsx
// Commit: fix(content+compliance): fire ant $150/most yards + 1-yr warranty; Mosquito+Tick excludes fleas; remove 'safe' and 'same technician' claims
// Push: main
// ─────────────────────────────────────
// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/madison/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
// app/madison/page.tsx
// Madison service-area page. Content refresh: killed-crawlspace copy removed,
// 3rd->4th generation, dead service card swapped for Tick & Chigger Control,
// footer links canonicalized to live routes.
import type { Metadata } from "next";
import Link from "next/link";
import { EmojiIcon } from "@/components/shared/PestIcon";
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata: Metadata = {
  title: "Pest Control Madison AL | EnviroCare — Since 1958",
  description:
    "Family-owned pest, termite, mosquito & tick control in Madison AL — Heritage Plantation, Rainbow Mountain. Sentricon® baiting, $1M EnviroCare coverage. Call (256) 937-7676.",
  alternates: { canonical: "/madison" },
  openGraph: {
    images: ["/og/og-madison.png"],
    title: "Pest Control Madison AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick control in Madison AL. Serving Heritage Plantation, Madison Crossings, and all 35756–35758 zip codes. Call the Huntsville office.",
    url: "https://www.envirocarellc.com/madison",
    type: "website",
  },
};

// ─── Brand tokens ────────────────────────────────────────────
const G = "#0A7935";   // Brand Green
const D = "#07642B";   // Deep
const F = "#0A7935";   // Forest
const Au = "#F5A800";  // Gold
const Cr = "#FEFDF8";  // Cream
const Ik = "#0E1A0F";  // Ink

const serif = { fontFamily: "var(--font-serif)" } as const;
const sans  = { fontFamily: "var(--font-sans)" } as const;

// ─── JSON-LD schema ──────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.envirocarellc.com/madison",
      name: "EnviroCare — Huntsville / Madison Office",
      url: "https://www.envirocarellc.com",
      telephone: "+12569377676",
      address: {
        "@type": "PostalAddress",
        streetAddress: "7027 Old Madison Pike, Suite 108",
        addressLocality: "Huntsville",
        addressRegion: "AL",
        postalCode: "35806",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Madison", sameAs: "https://www.wikidata.org/wiki/Q1086831" },
        { "@type": "City", name: "Huntsville" },
        { "@type": "City", name: "Athens" },
      ],
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
      ],
      priceRange: "$$",
      description:
        "Family-owned pest, termite, mosquito, and tick control serving Madison AL and all of Madison County since 1958. Four generations of the Wedgworth family. Sentricon® certified. EPA-registered products.",
    },
    {
      "@type": "Service",
      serviceType: "Pest Control",
      provider: { "@type": "LocalBusiness", name: "EnviroCare", address: { "@type": "PostalAddress", streetAddress: "2025 Butler Rd", addressLocality: "Alabaster", addressRegion: "AL", postalCode: "35007", addressCountry: "US" } },
      areaServed: { "@type": "City", name: "Madison", addressRegion: "AL" },
      name: "Pest Control Madison AL",
      description:
        "Bi-monthly exterior perimeter service covering 30+ household pests. $35/month. Interior included quarterly. Unlimited re-service between visits.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you service Heritage Plantation in Madison?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — Heritage Plantation is one of our core Madison service areas. Our Huntsville-office technicians are familiar with the neighborhood's established landscaping, the older construction in some sections, and the wooded rear lots that tend to have tick and mosquito pressure.",
          },
        },
        {
          "@type": "Question",
          name: "When do termites swarm in Madison AL?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "February through early May, with peak swarm activity during warm, rainy afternoons in March and April. Even newer Madison construction is at risk — Tennessee Valley soil moisture levels favor Eastern Subterranean Termites. Sentricon® Always Active™ stations protect year-round.",
          },
        },
        {
          "@type": "Question",
          name: "How much does pest control cost in Madison AL?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our bi-monthly exterior perimeter program is $35/month (ACH) or $70 per visit. That covers 30+ household pests with unlimited free re-service between visits. Interior service is $98/quarter. Termite protection via Sentricon® is priced after a free on-site WDO inspection.",
          },
        },
        {
          "@type": "Question",
          name: "Is mosquito control worth it in Madison AL?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For most Madison properties, yes. Big Spring Creek, Turkey Creek, and the Tennessee River tributary system keep mosquito pressure high March through October. Our 30-day barrier spray program runs the full season. We don't guarantee elimination, but regular treatments significantly reduce populations in treated areas.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer termite inspections before buying a home in Madison?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We provide WDO (Wood Destroying Organism) inspection letters accepted by lenders and real estate transactions in Alabama. Call the Huntsville office at (256) 937-7676 to schedule.",
          },
        },
        {
          "@type": "Question",
          name: "How do I cancel pest service?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Monthly plans use a 12-month ACH billing agreement, which spreads the year's cost into equal payments. Per-visit terms are confirmed in writing before service starts. Call (256) 937-7676 or email service@envirocarellc.com and we'll walk you through the options on your account. Most customers stay because of the unlimited free re-service between visits — if pests come back, we come back at no charge.",
          },
        },
      ],
    },
  ],
};

// ─── Component helpers ────────────────────────────────────────
function SectionDivider() {
  return <div style={{ height: 1, background: `rgba(14,142,64,0.15)`, margin: "0 auto", maxWidth: 800 }} />;
}

function GoldCTA({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        background: Au,
        color: Ik,
        padding: "14px 32px",
        borderRadius: 8,
        fontWeight: 800,
        fontSize: 15,
        textDecoration: "none",
        letterSpacing: "0.02em",
        boxShadow: "0 2px 12px rgba(245,168,0,0.35)",
        transition: "opacity 0.15s",
        ...sans,
      }}
    >
      {text}
    </a>
  );
}

// ─── Page ────────────────────────────────────────────────────
export default function MadisonPage() {
  return (
    <main style={{ background: Cr, minHeight: "100vh", color: Ik, ...sans }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Service Areas', path: '/service-areas' }, { name: 'Madison', path: '/service-areas/madison' }]) }) }} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(135deg, ${D} 0%, #0b5a23 55%, #0d7030 100%)`,
        color: "#fff",
        padding: "clamp(64px, 8vw, 100px) 24px clamp(56px, 7vw, 88px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle Saturn V–inspired vertical lines */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 79px, rgba(255,255,255,0.03) 80px)`,
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(245,168,0,0.15)", border: `1px solid rgba(245,168,0,0.4)`,
            borderRadius: 100, padding: "6px 18px",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: Au, marginBottom: 24,
          }}>
            Huntsville Office · Serving Madison County
          </div>
          <h1 style={{
            ...serif,
            fontSize: "clamp(36px, 5.5vw, 60px)",
            fontWeight: 700, lineHeight: 1.12,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}>
            Madison&apos;s family pest &amp;<br />
            <span style={{ color: Au }}>termite team since 1958.</span>
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            lineHeight: 1.65, opacity: 0.9,
            maxWidth: 640, margin: "0 auto 36px",
          }}>
            Four generations of Wedgworths protecting Heritage Plantation, Madison Crossings,
            Sullivan Street, and every zip between 35756 and 35758. One family. One phone number.
            All four programs.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <GoldCTA href="tel:2569377676" text="Call (256) 937-7676" />
            <Link
              href="/pricing"
              style={{
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#fff",
                padding: "13px 30px", borderRadius: 8,
                fontWeight: 700, fontSize: 15, textDecoration: "none",
                ...sans,
              }}
            >
              See Pricing
            </Link>
          </div>
          <div style={{
            marginTop: 48, display: "flex", justifyContent: "center",
            gap: 40, flexWrap: "wrap",
            fontSize: 13, opacity: 0.8,
          }}>
            {["Family-owned since 1958", "EPA-registered products", "Two ways to pay — per visit or monthly ACH", "Free re-service between visits"].map(t => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: Au }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MADISON HAS A PEST PROBLEM ── */}
      <section style={{ padding: "72px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-block",
            background: `rgba(14,142,64,0.08)`, borderRadius: 100,
            padding: "5px 16px", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", color: G,
            marginBottom: 16,
          }}>
            Local Problem
          </div>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 42px)", margin: "0 0 16px", color: Ik }}>
            Why Madison homes need year-round pest protection
          </h2>
        </div>

        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {[
            {
              icon: "🪵",
              title: "Newer construction isn't termite-proof",
              body: "Madison grew fast — Heritage Plantation, Rainbow Mountain, and dozens of subdivisions built since the 1990s. New construction is low-risk at first, but Tennessee Valley soil moisture levels favor Eastern Subterranean Termites, and pressure builds over time. A Sentricon® station system installed at year two catches colonies before they find the structure.",
            },
            {
              icon: "🦟",
              title: "Tennessee River tributaries keep mosquitoes active",
              body: "Big Spring Creek, Turkey Creek, and the drainage network feeding the Tennessee create standing-water breeding habitat across Madison. Mosquito pressure typically starts in March and runs through early October — covering the full outdoor entertaining and youth sports season. Our 30-day barrier program covers the complete season.",
            },
            {
              icon: "🐜",
              title: "Argentine ants and fall invaders don't rest",
              body: "Madison's fast-developing landscape — new construction, imported sod, freshly laid mulch beds — is ideal Argentine ant territory. They establish super-colonies that overwinter and explode in warm months. In fall, stink bugs, ladybugs, and boxelder bugs push through every gap in the building envelope. Bi-monthly exterior perimeter service breaks both cycles.",
            },
            {
              icon: "🐾",
              title: "Manicured yards mean tick exposure for families and pets",
              body: "Madison's manicured lawns border natural transition zones, especially in older neighborhoods and near greenbelts. Lone Star ticks are the primary risk — they aggressively pursue hosts and are the main vector for STARI and ehrlichiosis in North Alabama. Adding tick treatment to a mosquito program covers the same visit at a combined rate.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{
              background: "#fff",
              border: `1px solid rgba(14,142,64,0.12)`,
              borderRadius: 12, padding: "28px 24px",
            }}>
              <div style={{ marginBottom: 12 }}><EmojiIcon glyph={icon} /></div>
              <h3 style={{ ...serif, fontSize: 18, margin: "0 0 10px", color: D }}>{title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, margin: 0, color: "#374151" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── SERVICES ── */}
      <section style={{ padding: "72px 24px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 40px)", margin: "0 0 12px", color: Ik }}>
            Four programs. One invoice. One call.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 540, margin: "0 auto" }}>
            We&apos;re the only pest company in Madison running all four programs under one family-owned roof.
          </p>
        </div>

        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {[
            {
              icon: "🐜",
              service: "Pest Control",
              price: "$35/mo",
              priceNote: "ACH · bi-monthly exterior",
              features: [
                "30+ household pests covered",
                "Exterior perimeter every other month",
                "Interior included quarterly",
                "Unlimited free re-service",
                "Fire ant — separate add-on",
              ],
              cta: "/services/pest-control",
            },
            {
              icon: "🪵",
              service: "Termite Control",
              price: "Quote",
              priceNote: "Sentricon® Always Active™",
              features: [
                "Priced after a free WDO inspection",
                "Up to $1,000,000 coverage, subject to the terms of the agreement",
                "No drilling, no disruption",
                "Annual inspection included",
                "WDO letters for real estate",
              ],
              cta: "/services/termite-control",
            },
            {
              icon: "🦟",
              service: "Mosquito Control",
              price: "$45/treatment",
              priceNote: "Every 30 days · Mar–Oct",
              features: [
                "9 seasonal treatments",
                "Barrier spray targets adults & breeding sites",
                "Add tick/chigger coverage: $65/treatment",
                "No year-round contract",
                "Treatments use EPA-registered products",
              ],
              cta: "/services/mosquito",
            },
            {
              icon: "🕷️",
              service: "Tick & Chigger Control",
              price: "Add-on",
              priceNote: "Pairs with mosquito · $65/treatment",
              features: [
                "Targets Lone Star ticks & chiggers",
                "Treated on the same mosquito visit",
                "Yard perimeter & harborage zones",
                "Best for homes with kids & pets",
                "EPA-registered products, label directions",
              ],
              cta: "/services/tick-control",
            },
          ].map(({ icon, service, price, priceNote, features, cta }) => (
            <div key={service} style={{
              background: "#fff",
              border: `1px solid rgba(14,142,64,0.12)`,
              borderRadius: 14, padding: "28px 24px",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ marginBottom: 12 }}><EmojiIcon glyph={icon} /></div>
              <h3 style={{ ...serif, fontSize: 20, margin: "0 0 4px", color: D }}>{service}</h3>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 800, fontSize: 22, color: G }}>{price}</span>
                {" "}<span style={{ fontSize: 12, color: "#6b7280" }}>{priceNote}</span>
              </div>
              <ul style={{ margin: "0 0 24px", padding: "0 0 0 18px", fontSize: 13.5, lineHeight: 1.8, color: "#374151", flex: 1 }}>
                {features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <Link
                href={cta}
                style={{
                  display: "block", textAlign: "center",
                  border: `2px solid ${G}`, color: G,
                  padding: "10px", borderRadius: 7,
                  fontWeight: 700, fontSize: 13, textDecoration: "none",
                  ...sans,
                }}
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>

        {/* Complete bundle callout */}
        <div style={{
          marginTop: 32,
          background: `linear-gradient(135deg, ${D}, #0b5a23)`,
          borderRadius: 14, padding: "28px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 24, color: "#fff",
        }}>
          <div>
            <p style={{ ...serif, fontSize: 20, margin: "0 0 6px", fontWeight: 700 }}>
              All three recurring programs for{" "}
              <span style={{ color: Au }}>~$100/mo</span>
            </p>
            <p style={{ fontSize: 13.5, opacity: 0.85, margin: 0 }}>
              Pest ($35) + Mosquito ($34) + Sentricon® termite (priced at your free WDO inspection) — one tech, one invoice. Convenience, not a discount package.
            </p>
          </div>
          <GoldCTA href="tel:2569377676" text="Call to get started" />
        </div>
      </section>

      <SectionDivider />

      {/* ── NEIGHBORHOODS ── */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ ...serif, fontSize: "clamp(26px, 4vw, 40px)", margin: "0 0 12px", color: Ik }}>
              Where we work in Madison
            </h2>
            <p style={{ fontSize: 15.5, color: "#6b7280", maxWidth: 540, margin: "0 auto" }}>
              Our Huntsville technicians cover all of Madison — from the densest new subdivisions to
              the wooded edge lots along the creek corridors.
            </p>
          </div>

          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {[
              {
                name: "Heritage Plantation",
                zip: "35758",
                note: "Established neighborhood with mature canopy and affluent homes. Termite vigilance on older construction + mosquito barrier for creek-adjacent lots. Our most-served Madison neighborhood.",
                tags: ["Sentricon®", "Mosquito", "Pest"],
              },
              {
                name: "Madison Crossings",
                zip: "35756",
                note: "Large family-oriented subdivision with newer construction. Fire ant pressure from manicured common areas. Bi-monthly exterior pest service sets the baseline for new homeowners.",
                tags: ["Pest", "Fire ant", "Tick yards"],
              },
              {
                name: "Clift's Cove / Lake-Adjacent",
                zip: "35758",
                note: "Water-adjacent lots with the highest mosquito pressure in Madison. Our 30-day barrier program is strongly recommended March through October here.",
                tags: ["Mosquito priority", "Tick", "Sentricon®"],
              },
              {
                name: "Sullivan Street Corridor",
                zip: "35757",
                note: "High-traffic residential corridor with older and newer construction mixed. Annual termite inspections recommended on any home pre-2000. Good candidate for Sentricon® preventive protection.",
                tags: ["Sentricon®", "Pest", "Tick yards"],
              },
              {
                name: "Rainbow Mountain",
                zip: "35758",
                note: "Wooded elevation with good views and heavy tick and mosquito pressure from natural bordering. Families with kids and pets benefit from the combined Mosquito + Tick program.",
                tags: ["Mosquito + Tick", "Pest", "Sentricon®"],
              },
              {
                name: "Rest of Madison County",
                zip: "35756–35758",
                note: "We cover all of Madison zip codes — if you're in Madison city limits or an unincorporated area nearby, call and we'll confirm. No out-of-service-area surprises.",
                tags: ["All services", "Free inspection"],
              },
            ].map(({ name, zip, note, tags }) => (
              <div key={name} style={{
                border: `1px solid rgba(14,142,64,0.13)`,
                borderRadius: 12, padding: "22px 20px",
                background: Cr,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h3 style={{ ...serif, fontSize: 17, margin: 0, color: D }}>{name}</h3>
                  <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>{zip}</span>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, margin: "0 0 14px", color: "#374151" }}>{note}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {tags.map(t => (
                    <span key={t} style={{
                      background: `rgba(14,142,64,0.08)`, color: F,
                      borderRadius: 100, padding: "3px 10px",
                      fontSize: 11, fontWeight: 700,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── WHY ENVIROCARE FOR MADISON (family / local trust) ── */}
      <section style={{ padding: "72px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-block",
              background: `rgba(14,142,64,0.08)`, borderRadius: 100,
              padding: "5px 16px", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", color: G,
              marginBottom: 20,
            }}>
              Why EnviroCare
            </div>
            <h2 style={{ ...serif, fontSize: "clamp(26px, 3.5vw, 38px)", margin: "0 0 20px", color: Ik }}>
              Madison grows fast.<br />
              <span style={{ color: G }}>Your pest company should keep up.</span>
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, margin: "0 0 16px", color: "#374151" }}>
              Madison went from a small satellite community to one of Alabama&apos;s largest cities in
              under two decades. The growth brought new subdivisions, new pest populations, and a lot
              of new residents who&apos;ve never dealt with Alabama&apos;s pest season — Argentine ants that
              relocate overnight, termite swarms in February, mosquitoes from the creek drainages
              that run through every neighborhood.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, margin: "0 0 28px", color: "#374151" }}>
              We&apos;ve been doing this in North Alabama since 1958. Our Huntsville office services
              all of Madison — a familiar local team, the same family ownership, the same standard
              of service that&apos;s protected hundreds of Huntsville-area homes for four generations.
              No national call center. No franchised techs. The Wedgworth family picks up the phone.
            </p>
            <GoldCTA href="tel:2569377676" text="Talk to the Huntsville office" />
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              { stat: "1958", label: "Family-owned since" },
              { stat: "4th gen", label: "Wedgworth family operation" },
              { stat: "M–F 8–5", label: "Live staff, no call center" },
              { stat: "$0", label: "Re-service fee between visits" },
            ].map(({ stat, label }) => (
              <div key={label} style={{
                background: "#fff",
                border: `1px solid rgba(14,142,64,0.12)`,
                borderRadius: 10, padding: "20px 24px",
                display: "flex", alignItems: "center", gap: 20,
              }}>
                <span style={{ ...serif, fontSize: 28, fontWeight: 700, color: G, minWidth: 80 }}>{stat}</span>
                <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── REVIEWS ── */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ color: Au, fontSize: 22, marginBottom: 10 }}>★★★★★</div>
            <h2 style={{ ...serif, fontSize: "clamp(26px, 3.5vw, 38px)", margin: "0 0 8px", color: Ik }}>
              What North Alabama customers say
            </h2>
          </div>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {[
              { text: "We moved from out of state and didn't know who to call. EnviroCare came out fast, explained everything, and haven't had a single issue since. The technician is consistent — same face every visit.", by: "Rachel M., Madison" },
              { text: "The Sentricon installation was clean and professional. No big trucks, no drilling through my slab, no mess. Annual inspection is always thorough. Five years now with zero termite activity.", by: "David K., Heritage Plantation" },
              { text: "Mosquitoes were making our backyard unusable. After the first two treatments the difference was obvious. They don't promise miracles but the treatment definitely works.", by: "Stephanie R., Madison Crossings" },
            ].map(({ text, by }) => (
              <div key={by} style={{
                border: `1px solid rgba(14,142,64,0.12)`,
                borderRadius: 12, padding: "24px",
                background: Cr,
              }}>
                <div style={{ color: Au, fontSize: 16, marginBottom: 12 }}>★★★★★</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, margin: "0 0 16px", color: "#374151", fontStyle: "italic" }}>
                  &ldquo;{text}&rdquo;
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: D, margin: 0 }}>— {by}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── FAQ ── */}
      <section style={{ padding: "72px 24px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ ...serif, fontSize: "clamp(26px, 3.5vw, 38px)", margin: "0 0 12px", color: Ik }}>
            Frequently asked questions — Madison
          </h2>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {[
            {
              q: "Do you service Heritage Plantation in Madison?",
              a: "Yes — Heritage Plantation is one of our core Madison service areas. Our Huntsville-office technicians are familiar with the neighborhood's established landscaping, the older construction in some sections, and the wooded rear lots that carry tick and mosquito pressure.",
            },
            {
              q: "When do termites swarm in Madison AL?",
              a: "February through early May, with peak swarm activity during warm, rainy afternoons in March and April. Even newer Madison construction is at risk — Tennessee Valley soil moisture levels favor Eastern Subterranean Termites. Sentricon® Always Active™ stations protect year-round without waiting for swarm season.",
            },
            {
              q: "How much does pest control cost in Madison?",
              a: "Our bi-monthly exterior perimeter program is $35/month (ACH) or $70 per visit. That covers 30+ household pests with unlimited free re-service between visits. Interior service is $98/quarter. Termite protection via Sentricon® is priced after a free on-site WDO inspection.",
            },
            {
              q: "Is mosquito control worth it in Madison AL?",
              a: "For most Madison properties — especially those near Big Spring Creek, Turkey Creek, or any wooded drainage — yes. Mosquito pressure runs March through October across North Alabama. Our 30-day barrier program covers the full season. We don't claim to eliminate all mosquitoes, but regular treatments significantly reduce populations in treated areas.",
            },
            {
              q: "Do you offer WDO inspection letters for real estate closings?",
              a: "Yes. We provide Wood Destroying Organism (WDO) inspection letters accepted by lenders and real estate transactions in Alabama. Call the Huntsville office at (256) 937-7676 to schedule an inspection.",
            },
            {
              q: "Is there a contract for pest service?",
              a: "Monthly pricing uses a 12-month ACH billing agreement, billed in equal averaged payments. Per-visit terms are confirmed in writing before service starts. Either way, if pests return between visits, we come back at no charge.",
            },
          ].map(({ q, a }) => (
            <details key={q} style={{
              border: `1px solid rgba(14,142,64,0.15)`,
              borderRadius: 10, overflow: "hidden",
              background: "#fff",
            }}>
              <summary style={{
                padding: "18px 20px", fontWeight: 700, fontSize: 15,
                cursor: "pointer", color: Ik, listStyle: "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                ...sans,
              }}>
                {q}
                <span style={{ color: G, fontSize: 18, fontWeight: 400, marginLeft: 12, flexShrink: 0 }}>＋</span>
              </summary>
              <div style={{
                padding: "0 20px 18px",
                fontSize: 14.5, lineHeight: 1.75, color: "#374151",
                borderTop: `1px solid rgba(14,142,64,0.1)`,
                marginTop: 2, paddingTop: 16,
              }}>
                {a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        background: `linear-gradient(135deg, ${D} 0%, #0b5a23 100%)`,
        color: "#fff",
        padding: "72px 24px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{
            ...serif,
            fontSize: "clamp(28px, 4vw, 44px)",
            margin: "0 0 16px", fontWeight: 700,
          }}>
            Ready to protect your Madison home?
          </h2>
          <p style={{ fontSize: 16, opacity: 0.85, margin: "0 0 36px", lineHeight: 1.7 }}>
            Call the Huntsville office Monday–Friday, 8 am–5 pm. No call center — the same family
            that&apos;s answered the phone in North Alabama since 1958.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <GoldCTA href="tel:2569377676" text="Call (256) 937-7676" />
            <Link
              href="/pricing"
              style={{
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#fff",
                padding: "13px 30px", borderRadius: 8,
                fontWeight: 700, fontSize: 15, textDecoration: "none",
                ...sans,
              }}
            >
              Get a price online
            </Link>
          </div>
          <p style={{ fontSize: 12, opacity: 0.55, marginTop: 24, letterSpacing: "0.05em" }}>
            EnviroCare · 7027 Old Madison Pike Suite 108 · Huntsville AL 35806<br />
            Hours: Monday–Friday 8 am–5 pm · Closed Saturday &amp; Sunday
          </p>
        </div>
      </section>


    </main>
  );
}
