import type { Metadata } from "next";
import Link from "next/link";

/**
 * Fultondale, AL service area page.
 *
 * Why this page exists: "fultondale mosquito control" ranks at position 4.9
 * with ~1,412 impressions over 16 months WITHOUT any matching page. Building
 * a dedicated page is the closest free win on the keyword board. We center
 * on mosquito (the ranked term) but cover all four pillars.
 *
 * Office: Birmingham/Alabaster, (205) 940-6360
 * Drive time from Alabaster office: ~25 min via I-65 N
 */

export const metadata: Metadata = {
  title: "Pest Control Fultondale AL | Mosquito, Termite & Pest Service | EnviroCare — Since 1958",
  description:
    "Family-owned mosquito, pest, termite and tick control in Fultondale AL — Black Creek, Fulton Springs, Walker Chapel. 30-day mosquito barrier, Sentricon® $1M coverage. Call (205) 940-6360.",
  alternates: { canonical: "/service-areas/fultondale" },
  openGraph: {
    title: "Pest Control Fultondale AL | EnviroCare Pest & Termite — Since 1958",
    description:
      "Family-owned mosquito, pest, termite & tick control in Fultondale. Serving Black Creek, Fulton Springs, and all 35068 ZIP. Birmingham office.",
    url: "https://www.envirocarellc.com/service-areas/fultondale",
    type: "website",
  },
};

// ─── Brand tokens (matched to Madison page) ──────────────────
const G = "#0E8E40";
const D = "#07642B";
const F = "#0A7935";
const Au = "#F5A800";
const Cr = "#FEFDF8";
const Ik = "#0E1A0F";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.envirocarellc.com/service-areas/fultondale",
      name: "EnviroCare Pest & Termite Services — Birmingham / Fultondale",
      url: "https://www.envirocarellc.com",
      telephone: "+12059406360",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2025 Butler Road",
        addressLocality: "Alabaster",
        addressRegion: "AL",
        postalCode: "35007",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Fultondale", sameAs: "https://www.wikidata.org/wiki/Q1027275" },
        { "@type": "City", name: "Gardendale" },
        { "@type": "City", name: "Birmingham" },
      ],
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
      ],
      priceRange: "$$",
      description:
        "Family-owned mosquito, pest, termite, and tick control serving Fultondale AL and Jefferson County since 1958. Four generations of the Wedgworth family. Sentricon® certified. EPA-registered products applied to label directions.",
    },
    {
      "@type": "Service",
      serviceType: "Mosquito Control",
      provider: { "@type": "LocalBusiness", name: "EnviroCare Pest & Termite Services" },
      areaServed: { "@type": "City", name: "Fultondale", addressRegion: "AL" },
      name: "Mosquito Control Fultondale AL",
      description:
        "30-day yard barrier mosquito treatment for Fultondale homes. $45/treatment, applied monthly March through November (9 treatments per year). Mosquito + tick bundle available at $65/treatment.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you treat mosquitoes in Fultondale near Black Creek?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Black Creek and the wooded corridors running through Fultondale are exactly why this area has the mosquito pressure it does. Our 30-day yard barrier targets the harborage zones — tree lines, shrub bases, gutters, and shaded areas — where mosquitoes rest between blood meals. Service runs March through November.",
          },
        },
        {
          "@type": "Question",
          name: "How much does mosquito control cost in Fultondale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mosquito service is $45 per treatment, applied monthly March through November (9 treatments per year, ~$33.75/month equivalent). If you also want tick coverage — which is worth it on any wooded Fultondale lot — the combined Outdoor Pro plan is $65 per treatment.",
          },
        },
        {
          "@type": "Question",
          name: "Which Fultondale neighborhoods do you serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All of them. Black Creek, Fulton Springs, Walker Chapel, Carson Road, the Highway 31 corridor, and every 35068 ZIP address. Our Birmingham office at 2025 Butler Road in Alabaster runs north up I-65 to Fultondale routinely.",
          },
        },
        {
          "@type": "Question",
          name: "Do you also handle termites and general pest control in Fultondale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — same office, same technicians. Sentricon® termite protection ($325 install, $32/mo renewal, up to $1M EnviroCare-backed damage coverage). Bi-monthly exterior pest control ($35/mo) covering ants, spiders, roaches, and 30+ common Alabama pests with unlimited free re-services.",
          },
        },
        {
          "@type": "Question",
          name: "Are your treatments safe around kids and pets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We use only EPA-registered products and apply them strictly according to label directions. Your technician will advise the appropriate re-entry timing for treated areas once applications are dry.",
          },
        },
      ],
    },
  ],
};

export default function FultondalePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main style={{ background: "#fff", color: Ik, ...sans }}>
        {/* ─── HERO ─────────────────────────────────────────── */}
        <section style={{ background: `linear-gradient(135deg,${D} 0%,${F} 50%,${G} 100%)`, color: "#fff", padding: "5rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 50%,rgba(245,168,0,.12) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(134,239,172,.14) 0%,transparent 55%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 40, padding: ".4rem 1rem", marginBottom: "1.4rem" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase" }}>Serving North Jefferson County · Since 1958</span>
            </div>
            <h1 style={{ ...serif, fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: "1.2rem", letterSpacing: "-.5px" }}>
              Mosquito &amp; Pest Control<br />
              <span style={{ color: Au, fontStyle: "italic", fontWeight: 700 }}>in Fultondale, AL</span>
            </h1>
            <p style={{ fontSize: "1.12rem", lineHeight: 1.7, color: "rgba(255,255,255,.88)", maxWidth: 600, marginBottom: "2.2rem" }}>
              Fultondale's wooded creek corridors mean year-round mosquito and tick pressure. EnviroCare's
              30-day yard barrier, Sentricon® termite protection, and bi-monthly perimeter pest control are
              all run out of our Alabaster office — same technicians, same family standard since 1958.
            </p>
            <div style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
              <a href="tel:2059406360" style={{ background: Au, color: Ik, padding: ".95rem 2rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                Call (205) 940-6360 →
              </a>
              <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ─── WHY FULTONDALE PEST PRESSURE ───────────────────── */}
        <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Why Fultondale</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", lineHeight: 1.12, color: Ik, margin: "0 0 .5rem", maxWidth: 820 }}>
              Black Creek and the I-65 corridor make Fultondale a high-pressure area for mosquitoes, termites, and seasonal invaders.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#4b5563", maxWidth: 720, margin: "0 0 2.5rem" }}>
              The four programs we run most in Fultondale — and how each handles the pests that show up here.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
              <Card emoji="🦟" title="Black Creek mosquito pressure" body="Black Creek and the unnamed tributaries running through Fulton Springs and Walker Chapel are the reason mosquitoes are this bad in Fultondale. Our 30-day yard barrier targets harborage zones — tree lines, shaded shrub bases, gutters, and dense ground cover. $45/treatment, March–November." />
              <Card emoji="🪵" title="Termites along the Highway 31 corridor" body="Older homes along Hwy 31 and Carson Road sit on the kind of moisture-heavy clay that Eastern subterranean termites love. Sentricon® Always Active™ bait stations intercept colonies without drilling. $325 install, $32/mo renewal, up to $1M in EnviroCare damage coverage." />
              <Card emoji="🐾" title="Ticks on wooded Fultondale lots" body="Lots backing up to Black Creek and the wooded sections off Walker Chapel carry Lone Star and American dog ticks. Our Outdoor Pro plan ($65/treatment) bundles mosquito + tick coverage and includes chiggers — the same biting trio you actually deal with in summer." />
              <Card emoji="🐜" title="Bi-monthly pest control" body="$35/month on ACH or $70/visit. Covers 30+ Alabama pests including carpenter ants, sugar ants, German roaches, brown recluse, wolf spiders, silverfish, and crickets. Unlimited free re-services between scheduled visits — if pests come back, we come back at no charge." />
              <Card emoji="🍂" title="Fall invaders off the I-65 ridge" body="Asian lady beetles, stink bugs, and boxelder bugs migrate every October, targeting south- and west-facing walls. Our exterior bi-monthly schedule treats those entry points before the seasonal push." />
              <Card emoji="🔥" title="Fire ant treatment" body="Whole-yard fire ant control is a separate service — $150 minimum, priced by yard size. Available to anyone in Fultondale, not just existing pest customers." />
            </div>
          </div>
        </section>

        {/* ─── NEIGHBORHOODS ──────────────────────────────────── */}
        <section style={{ padding: "4.5rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Neighborhoods We Serve</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.2vw,2.4rem)", color: Ik, margin: "0 0 1rem" }}>Every street in Fultondale, 35068</h2>
            <p style={{ color: "#4b5563", maxWidth: 600, margin: "0 auto 2rem" }}>Birmingham office, 25 minutes up I-65. Your technician knows the area.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 900, margin: "0 auto" }}>
              {["Black Creek","Fulton Springs","Walker Chapel","Carson Road","Highway 31 Corridor","Town Center","Black Creek Park","New Castle Road","Crestwood","Lewisburg"].map((n) => (
                <span key={n} style={{ background: "#fff", border: `1.5px solid ${G}33`, borderRadius: 50, padding: ".55rem 1.1rem", fontSize: 13, fontWeight: 600, color: D }}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────────── */}
        <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: Cr, borderTop: `1px solid ${G}22` }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Fultondale FAQs</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 2rem" }}>
              Answers for <em style={{ color: F }}>Fultondale homeowners</em>
            </h2>
            <Faq q="Do you treat mosquitoes in Fultondale near Black Creek?" a="Yes. Black Creek and the wooded corridors running through Fultondale are exactly why this area has the mosquito pressure it does. Our 30-day yard barrier targets the harborage zones — tree lines, shrub bases, gutters, and shaded areas — where mosquitoes rest between blood meals. Service runs March through November." />
            <Faq q="How much does mosquito control cost in Fultondale?" a="Mosquito service is $45 per treatment, applied monthly March through November (9 treatments per year, ~$33.75/month equivalent). If you also want tick coverage — which is worth it on any wooded Fultondale lot — the combined Outdoor Pro plan is $65 per treatment." />
            <Faq q="Which Fultondale neighborhoods do you serve?" a="All of them. Black Creek, Fulton Springs, Walker Chapel, Carson Road, the Highway 31 corridor, and every 35068 ZIP address. Our Birmingham office at 2025 Butler Road in Alabaster runs north up I-65 to Fultondale routinely." />
            <Faq q="Do you also handle termites and general pest control in Fultondale?" a="Yes — same office, same technicians. Sentricon® termite protection ($325 install, $32/mo renewal, up to $1M EnviroCare-backed damage coverage). Bi-monthly exterior pest control ($35/mo) covering ants, spiders, roaches, and 30+ common Alabama pests with unlimited free re-services." />
            <Faq q="Are your treatments safe around kids and pets?" a="We use only EPA-registered products and apply them strictly according to label directions. Your technician will advise the appropriate re-entry timing for treated areas once applications are dry." />
            <Faq q="Is there a long-term contract?" a="No. Pest control is month-to-month on ACH and you can cancel anytime. We'd rather earn the next visit than lock you in." />
          </div>
        </section>

        {/* ─── NEARBY ─────────────────────────────────────────── */}
        <section style={{ padding: "2.5rem clamp(1.5rem,5vw,4rem) 3rem", background: "#fff", borderTop: `1px solid ${G}22` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 12 }}>Also serving nearby</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                ["Gardendale","/gardendale"],
                ["Birmingham","/birmingham"],
                ["Hoover","/hoover"],
                ["Alabaster","/alabaster"],
                ["Trussville","/trussville"],
                ["Bessemer","/bessemer"],
              ].map(([n, h]) => (
                <Link key={h} href={h} style={{ padding: "8px 16px", border: `1px solid ${G}4D`, borderRadius: 999, color: D, fontWeight: 600, fontSize: ".92rem", textDecoration: "none", background: Cr }}>{n}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────── */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: `linear-gradient(135deg,${D} 0%,#062514 100%)`, color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", margin: "0 0 .6rem" }}>Ready for the mosquitoes to stop ruining your yard?</h2>
            <p style={{ color: "rgba(255,255,255,.85)", marginBottom: "1.6rem", fontSize: "1.05rem" }}>Free quote, no long-term contract, and a real person on the Birmingham office line.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".9rem", flexWrap: "wrap" }}>
              <a href="tel:2059406360" style={{ background: Au, color: Ik, padding: ".95rem 2.1rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)" }}>Call (205) 940-6360</a>
              <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>Get a Free Quote →</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// ─── Small components ────────────────────────────────────────
function Card({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: 14, border: `1px solid ${G}26` }}>
      <div style={{ fontSize: 30, marginBottom: ".5rem" }} aria-hidden>{emoji}</div>
      <h3 style={{ ...serif, fontSize: "1.15rem", color: D, margin: "0 0 .4rem", fontWeight: 700 }}>{title}</h3>
      <p style={{ fontSize: ".92rem", color: "#4b5563", lineHeight: 1.55, margin: 0 }}>{body}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details style={{ border: `1px solid ${G}26`, borderRadius: 10, marginBottom: 12, background: "#FAFAF7", overflow: "hidden" }}>
      <summary style={{ padding: "1.1rem 1.4rem", cursor: "pointer", fontWeight: 600, color: D, fontSize: "1rem" }}>{q}</summary>
      <p style={{ padding: "0 1.4rem 1.2rem", color: "#4b5563", fontSize: ".97rem", lineHeight: 1.6, margin: 0 }}>{a}</p>
    </details>
  );
}
