import type { Metadata } from "next";
import Link from "next/link";
import { EmojiIcon } from "@/components/shared/PestIcon";

/**
 * Mountain Brook — DEEP PAGE (first wealthy-corridor build).
 *
 * Was: thin CityPage wrapper (data/cities.ts). Now: self-contained deep page
 * in the Birmingham/Madison pattern. Built from the wealthy-corridor playbook:
 * Mountain Brook = 32,672 impressions / 16mo, page buried at pos ~40 while its
 * own service queries sit at 3–15. Goal: own the service-level queries with
 * city-named H2 subsections + GEO summary block + offer-catalog schema.
 *
 * Compliance: no "safe/pet-safe/non-toxic"; mosquito/tick hedged; Sentricon
 * $1M = EnviroCare's own guarantee, no drilling; no discount language; no
 * review counts. Office: Birmingham/Alabaster, (205) 940-6360.
 */

export const metadata: Metadata = {
  title: "Mountain Brook Pest Control & Termite | EnviroCare",
  description:
    "Pest control, Sentricon® termite & commercial service in Mountain Brook AL — Crestline, English Village, Cahaba Village. From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/mountain-brook" },
  openGraph: {
    images: ["/og/og-mountain-brook.png"],
    title: "Mountain Brook Pest Control & Termite | EnviroCare",
    description:
      "Family-owned pest, termite, mosquito, tick & commercial service for Mountain Brook homes and businesses. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/mountain-brook",
    type: "website",
  },
};

const G = "#0A7935";
const D = "#07642B";
const F = "#0A7935";
const Au = "#F5A800";
const Cr = "#FEFDF8";
const Ik = "#0E1A0F";

const serif = { fontFamily: "var(--font-serif)" } as const;
const sans = { fontFamily: "var(--font-sans)" } as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.envirocarellc.com/mountain-brook",
      name: "EnviroCare Pest & Termite Services — Mountain Brook",
      image: "https://www.envirocarellc.com/logo.png",
      url: "https://www.envirocarellc.com/mountain-brook",
      telephone: "+12059406360",
      email: "service@envirocarellc.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2025 Butler Road",
        addressLocality: "Alabaster",
        addressRegion: "AL",
        postalCode: "35007",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "City",
        name: "Mountain Brook",
        containsPlace: [
          { "@type": "Place", name: "Mountain Brook Village" },
          { "@type": "Place", name: "English Village" },
          { "@type": "Place", name: "Crestline Village" },
          { "@type": "Place", name: "Cahaba Village" },
        ],
        address: { "@type": "PostalAddress", addressLocality: "Mountain Brook", addressRegion: "AL", postalCode: "35223", addressCountry: "US" },
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
      ],
      description:
        "Family-owned pest control, termite, mosquito, tick, and commercial service in Mountain Brook, Alabama since 1958. Sentricon® baiting with no drilling, backed by EnviroCare's guarantee up to $1,000,000. EPA-registered products applied to label directions.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pest & Termite Services in Mountain Brook",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bi-Monthly Pest Control", areaServed: "Mountain Brook, AL" }, priceCurrency: "USD", price: "35", description: "Covers 30+ pests with unlimited re-service. $35/month." },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Termite Protection (Sentricon)", areaServed: "Mountain Brook, AL" }, description: "Sentricon baiting, no drilling, EnviroCare guarantee up to $1,000,000. Priced after a free WDO inspection." },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mosquito Control", areaServed: "Mountain Brook, AL" }, priceCurrency: "USD", price: "45", description: "Nine seasonal treatments, March–November, ~$33.75/month." },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mosquito + Tick Control", areaServed: "Mountain Brook, AL" }, priceCurrency: "USD", price: "65", description: "Adds tick and chigger coverage, ~$48.75/month." },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Pest Control", areaServed: "Mountain Brook, AL" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      speakable: { "@type": "SpeakableSpecification", cssSelector: [".mb-summary", ".mb-faq"] },
      mainEntity: [
        { "@type": "Question", name: "How much is termite treatment in Mountain Brook?", acceptedAnswer: { "@type": "Answer", text: "EnviroCare termite protection in Mountain Brook is priced after a free on-site WDO inspection. It uses the Sentricon baiting system with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." } },
        { "@type": "Question", name: "Is there mosquito control in Mountain Brook?", acceptedAnswer: { "@type": "Answer", text: "Yes. EnviroCare treats Mountain Brook yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month spread over the year. Most homeowners see a clear seasonal reduction in mosquito activity." } },
        { "@type": "Question", name: "Who does commercial pest control in Mountain Brook?", acceptedAnswer: { "@type": "Answer", text: "EnviroCare provides commercial pest control in Mountain Brook for offices, restaurants, retail, HOA common areas, and country-club facilities, with documented, inspection-ready service. Call (205) 940-6360." } },
        { "@type": "Question", name: "What does bi-monthly pest control cover in Mountain Brook?", acceptedAnswer: { "@type": "Answer", text: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, and roaches, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." } },
        { "@type": "Question", name: "Do you serve Crestline, English Village, and Cahaba Village?", acceptedAnswer: { "@type": "Answer", text: "Yes — all of Mountain Brook, including Crestline, English Village, Mountain Brook Village, Cahaba Village, and Cherokee Bend. Call (205) 940-6360 and we'll confirm your address is on our route." } },
      ],
    },
  ],
};

export default function MountainBrookPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main style={{ background: "#fff", color: Ik, ...sans }}>
        {/* HERO */}
        <section style={{ background: `linear-gradient(135deg,${D} 0%,${F} 50%,${G} 100%)`, color: "#fff", padding: "5rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 50%,rgba(245,168,0,.12) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(134,239,172,.14) 0%,transparent 55%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 40, padding: ".4rem 1rem", marginBottom: "1.4rem" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase" }}>Mountain Brook &amp; Jefferson County · Since 1958</span>
            </div>
            <h1 style={{ ...serif, fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: "1.2rem", letterSpacing: "-.5px" }}>
              Mountain Brook Pest Control<br />
              <span style={{ color: Au, fontStyle: "italic", fontWeight: 700 }}>&amp; Termite Service</span>
            </h1>
            <p style={{ fontSize: "1.12rem", lineHeight: 1.7, color: "rgba(255,255,255,.88)", maxWidth: 640, marginBottom: "2rem" }}>
              Refined, discreet pest and termite care for Mountain Brook&apos;s established homes — Crestline,
              English Village, Mountain Brook Village, Cahaba Village, and Cherokee Bend. No-drill Sentricon®,
              seasonal mosquito and tick service, and commercial programs for the Village storefronts.
            </p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: "2rem", color: "rgba(255,255,255,.85)", fontSize: ".95rem" }}>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>68+</strong> Years serving AL</span>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>4</strong> Generations of Wedgworths</span>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>$1M</strong> Sentricon® coverage</span>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>★★★★★</strong> Google rated</span>
            </div>
            <div style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
              <a href="tel:2059406360" style={{ background: Au, color: Ik, padding: ".95rem 2rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)" }}>
                Call (205) 940-6360 →
              </a>
              <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* QUOTABLE SUMMARY — AI/GEO extraction block */}
        <section style={{ padding: "3rem clamp(1.5rem,5vw,4rem) 0", background: "#fff" }}>
          <div className="mb-summary" style={{ maxWidth: 900, margin: "0 auto", background: Cr, border: `1px solid ${G}26`, borderLeft: `4px solid ${G}`, borderRadius: 14, padding: "1.6rem 1.8rem" }}>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#2b3a2f", margin: 0 }}>
              EnviroCare provides pest control, termite protection, mosquito, and tick service in Mountain Brook,
              Alabama, including Mountain Brook Village, English Village, Crestline Village, and Cahaba Village.
              Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service
              between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by
              EnviroCare&apos;s guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company,
              EnviroCare has protected homes since 1958. Call (205)&nbsp;940-6360.
            </p>
          </div>
        </section>

        {/* PRESSURE — Mountain Brook-specific pest narrative */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Why Mountain Brook</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", lineHeight: 1.12, color: Ik, margin: "0 0 .5rem", maxWidth: 880 }}>
              Historic homes, a mature hardwood canopy, and the Shades Creek corridor keep pest pressure year-round.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#4b5563", maxWidth: 720, margin: "0 0 2.5rem" }}>
              The six patterns we treat most across Mountain Brook&apos;s estates and Villages.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
              <Card emoji="🪵" title="Termites in old foundations" body="Mountain Brook's 1940s–70s homes on Crestline, English Village, and Cherokee Bend sit on crawlspaces and slabs that give Eastern subterranean termites easy access. Sentricon® bait stations protect without drilling into original masonry." />
              <Card emoji="🐜" title="Carpenter & odorous ants" body="The oak and elm canopy Mountain Brook is known for harbors carpenter ants that move into fascia, soffit, and trim. Bi-monthly exterior treatment keeps the whole ant family outside." />
              <Card emoji="🕷️" title="Spiders & black widows" body="Stone foundations, detached garages, and screened porches across English Village and Mountain Brook Village are prime harborage for black widows and brown recluses. We treat the zones they actually nest in." />
              <Card emoji="🦟" title="Mosquitoes off Shades Creek" body="Shades Creek runs through Mountain Brook and creates the shaded, moist conditions mosquitoes breed in from March through November. The 30-day yard barrier keeps outdoor entertaining usable through the season." />
              <Card emoji="🪲" title="Fall invaders off the ridgeline" body="Asian lady beetles, stink bugs, and boxelder bugs migrate off the Shades Valley ridgelines every October. Bi-monthly exterior treatments seal entry points before they move in." />
              <Card emoji="🐾" title="Ticks on wooded estate lots" body="Mature tree cover and proximity to Shades Mountain bring Lone Star and dog ticks into yards. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." />
            </div>
          </div>
        </section>

        {/* SERVICE SUBSECTIONS — city-named H2s targeting service queries */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Services in Mountain Brook</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 2rem" }}>
              What we treat, <em style={{ color: F }}>and what it costs</em>
            </h2>

            <Sub title="Termite Treatment in Mountain Brook">
              Mountain Brook&apos;s mature hardwoods and older brick estates make subterranean termites a year-round
              concern. EnviroCare protects Mountain Brook homes with the{" "}
              <Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link>{" "}
              — installed around the home with no drilling into your foundation or slab, and priced after a free
              on-site WDO inspection. Coverage runs up to $1,000,000, backed by EnviroCare&apos;s own guarantee.{" "}
              <Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>Termite-letter (WDO) inspections</Link>{" "}
              for Mountain Brook home sales are also available for closings.
            </Sub>

            <Sub title="Mosquito Control in Mountain Brook">
              Shaded, wooded lots along the Shades Creek corridor hold mosquito pressure from spring into fall.{" "}
              <Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link>{" "}
              treats every 30 days, March through November — nine treatments at $45 each, spread evenly at about
              $33.75/month over the year. Treatments target resting and breeding areas around the property and
              typically reduce activity noticeably within the season. We never guarantee elimination, but most
              homeowners see a clear difference in how usable the yard becomes.
            </Sub>

            <Sub title="Tick Control in Mountain Brook">
              With deer and wooded edges throughout Mountain Brook, ticks are a real concern for families and pets
              using the yard. EnviroCare&apos;s{" "}
              <Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link>{" "}
              adds tick and chigger coverage to the seasonal schedule — $65 per treatment across the nine-visit
              season, about $48.75/month. Most products knock back tick activity in treated zones; results vary
              with yard conditions and surrounding habitat.
            </Sub>

            <Sub title="Ant Control in Mountain Brook">
              Odorous house ants, carpenter ants, and Argentine ants are among the most common calls in the 35213
              and 35223 ZIPs. EnviroCare&apos;s bi-monthly pest plan covers 30+ pests including most household ants,
              with unlimited re-service if they return between regular visits — at no extra charge. All products are
              EPA-registered and applied according to label directions.{" "}
              <Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link>{" "}
              are priced separately by treated area.
            </Sub>

            <Sub title="Commercial Pest Control in Mountain Brook">
              EnviroCare services{" "}
              <Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link>{" "}
              across Mountain Brook — offices, restaurants, retail, HOA common areas, and country-club facilities —
              on schedules built around your hours and foot traffic. Programs are documented for health-inspection
              readiness and adjusted seasonally. Call (205)&nbsp;940-6360 for a commercial walkthrough.
            </Sub>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Mountain Brook Pricing</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 .85rem" }}>
              Four programs, <em style={{ color: F }}>no long-term contracts</em>
            </h2>
            <p style={{ color: "#4b5563", maxWidth: 620, margin: "0 auto 3rem" }}>Pay per visit, or equal monthly payments on a 12-month ACH agreement.</p>
          </div>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.25rem" }}>
            <Plan name="Pest Control" price="$35" unit="/month" features={["Bi-monthly perimeter service", "30+ Alabama pests covered", "Unlimited free re-services", "Quarterly interior on request"]} />
            <Plan name="Sentricon® Termite" price="Quote" unit="after inspection" features={["In-ground bait stations", "No drilling required", "Up to $1M EnviroCare coverage", "Priced after a free WDO inspection"]} featured />
            <Plan name="Mosquito Yard" price="$45" unit="/treatment" features={["30-day yard barrier", "March – November (9 visits)", "Targets resting & breeding zones", "Tick add-on available"]} />
            <Plan name="Mosquito + Tick" price="$65" unit="/treatment" features={["Mosquito + tick + chigger", "30-day yard barrier", "Best for wooded estate lots", "March – November"]} />
          </div>
        </section>

        {/* INTERNAL LINKS — sibling wealthy cities + Birmingham hub */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Nearby &amp; Related</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: Ik, margin: "0 0 1.8rem" }}>
              Serving the whole Over-the-Mountain corridor
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: ".75rem" }}>
              {[
                ["Over the Mountain", "/over-the-mountain"],
                ["Vestavia Hills", "/vestavia-hills"],
                ["Homewood", "/homewood"],
                ["Hoover", "/hoover"],
                ["Greystone", "/greystone"],
                ["Chelsea", "/chelsea"],
                ["Birmingham", "/birmingham"],
                ["Termite Control", "/services/termite-control"],
                ["Mosquito Control", "/services/mosquito"],
              ].map(([n, h]) => (
                <Link key={h} href={h} style={{ background: "#fff", border: `1.5px solid ${G}26`, borderRadius: 12, padding: ".85rem 1rem", fontSize: 14, fontWeight: 600, color: D, textAlign: "center", textDecoration: "none" }}>{n}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div className="mb-faq" style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Mountain Brook FAQs</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 2rem" }}>
              Answers for <em style={{ color: F }}>Mountain Brook homeowners</em>
            </h2>
            <Faq q="How much is termite treatment in Mountain Brook?" a="EnviroCare termite protection in Mountain Brook is priced after a free on-site WDO inspection. It uses the Sentricon baiting system with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." />
            <Faq q="Is there mosquito control in Mountain Brook?" a="Yes. EnviroCare treats Mountain Brook yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month spread over the year. Most homeowners see a clear seasonal reduction in mosquito activity." />
            <Faq q="Who does commercial pest control in Mountain Brook?" a="EnviroCare provides commercial pest control in Mountain Brook for offices, restaurants, retail, HOA common areas, and country-club facilities, with documented, inspection-ready service. Call (205) 940-6360." />
            <Faq q="What does bi-monthly pest control cover in Mountain Brook?" a="EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, and roaches, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." />
            <Faq q="Do you serve Crestline, English Village, and Cahaba Village?" a="Yes — all of Mountain Brook, including Crestline, English Village, Mountain Brook Village, Cahaba Village, and Cherokee Bend. Call (205) 940-6360 and we'll confirm your address is on our route." />
          </div>
        </section>

        {/* OFFICE + CTA */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: `linear-gradient(135deg,${D} 0%,#062514 100%)`, color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 10 }}>Birmingham Office</div>
            <h2 style={{ ...serif, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", margin: "0 0 .4rem" }}>2025 Butler Road · Alabaster, AL 35007</h2>
            <p style={{ color: "rgba(255,255,255,.85)", marginBottom: "1.8rem", fontSize: "1.05rem" }}>
              Free inspection, straight pricing, and a real Wedgworth on the other end of the phone. M–F 8am–5pm.
            </p>
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

function Card({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div style={{ background: Cr, padding: "1.5rem", borderRadius: 14, border: `1px solid ${G}26` }}>
      <div style={{ marginBottom: ".75rem" }}><EmojiIcon glyph={emoji} /></div>
      <h3 style={{ ...serif, fontSize: "1.15rem", color: D, margin: "0 0 .4rem", fontWeight: 700 }}>{title}</h3>
      <p style={{ fontSize: ".92rem", color: "#4b5563", lineHeight: 1.55, margin: 0 }}>{body}</p>
    </div>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.8rem" }}>
      <h3 style={{ ...serif, fontSize: "1.3rem", color: D, margin: "0 0 .5rem", fontWeight: 700 }}>{title}</h3>
      <p style={{ fontSize: "1rem", color: "#4b5563", lineHeight: 1.65, margin: 0 }}>{children}</p>
    </div>
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

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details style={{ border: `1px solid ${G}26`, borderRadius: 10, marginBottom: 12, background: Cr, overflow: "hidden" }}>
      <summary style={{ padding: "1.1rem 1.4rem", cursor: "pointer", fontWeight: 600, color: D, fontSize: "1rem" }}>{q}</summary>
      <p style={{ padding: "0 1.4rem 1.2rem", color: "#4b5563", fontSize: ".97rem", lineHeight: 1.6, margin: 0 }}>{a}</p>
    </details>
  );
}
