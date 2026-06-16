import type { Metadata } from "next";
import Link from "next/link";

/**
 * Birmingham hub page — DEEP REWRITE.
 *
 * Was: 11-line wrapper around CityPage component. Now: self-contained deep
 * page in the Madison/Fultondale pattern.
 *
 * Target keywords (16-mo GSC data, current production):
 *   - "pest control birmingham al"    5,647 imp · pos 17.x
 *   - "pest control birmingham"       5,094 imp · pos 19.x
 *   - "exterminator birmingham"       3,552 imp · pos 28.x
 *   - "birmingham pest control"       1,680 imp · pos varies
 *   Combined ~15,973 impressions over 16 months — biggest unbuilt city
 *   opportunity in the GSC dataset.
 *
 * Strategy: cover all four intent angles (pest control, exterminator, termite,
 * mosquito) in the H1/H2 lattice without keyword-stuffing. Hub-link out to
 * the existing deep suburb pages (Hoover, Vestavia, Mountain Brook, Homewood,
 * Pelham, Alabaster, Helena, Chelsea) — internal linking that benefits both
 * directions.
 *
 * Office: Birmingham/Alabaster, (205) 940-6360
 */

export const metadata: Metadata = {
  title: "Pest Control Birmingham AL | Exterminator, Termite & Mosquito | EnviroCare — Since 1958",
  description:
    "Family-owned Birmingham pest control and exterminator since 1958. Bi-monthly from $35/mo. Sentricon® $1M termite coverage. Mosquito & tick yard treatment. Mountain Brook · Vestavia · Hoover · Homewood. Call (205) 940-6360.",
  alternates: { canonical: "/birmingham" },
  openGraph: {
    images: ["/og/og-birmingham.png"],
    title: "Pest Control Birmingham AL | EnviroCare — Family-Owned Since 1958",
    description:
      "Birmingham's family-owned pest control and termite service. Four generations of Wedgworths, three Alabama offices, no long-term contracts.",
    url: "https://www.envirocarellc.com/birmingham",
    type: "website",
  },
};

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
      "@id": "https://www.envirocarellc.com/birmingham",
      name: "EnviroCare Pest & Termite Services — Birmingham",
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
        { "@type": "City", name: "Birmingham", sameAs: "https://www.wikidata.org/wiki/Q79867" },
        { "@type": "City", name: "Hoover" },
        { "@type": "City", name: "Vestavia Hills" },
        { "@type": "City", name: "Mountain Brook" },
        { "@type": "City", name: "Homewood" },
        { "@type": "City", name: "Alabaster" },
        { "@type": "City", name: "Pelham" },
        { "@type": "City", name: "Helena" },
        { "@type": "City", name: "Chelsea" },
        { "@type": "City", name: "Trussville" },
      ],
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
      ],
      priceRange: "$$",
      description:
        "Family-owned Birmingham pest control, exterminator, termite, and mosquito service. EnviroCare has served the Birmingham metro since 1958. Four generations of the Wedgworth family, Sentricon® Certified Specialist, EPA-registered products applied to label directions.",
    },
    {
      "@type": "Service",
      serviceType: "Pest Control",
      provider: { "@type": "LocalBusiness", name: "EnviroCare Pest & Termite Services" },
      areaServed: { "@type": "City", name: "Birmingham", addressRegion: "AL" },
      name: "Pest Control & Exterminator Service Birmingham AL",
      description:
        "Bi-monthly exterior perimeter pest control for Birmingham homes — $35/month on ACH or $70 per visit. Covers 30+ Alabama pests with unlimited free re-services between visits.",
      offers: {
        "@type": "Offer",
        price: "35",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "35", priceCurrency: "USD", unitText: "per month, ACH" },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does pest control cost in Birmingham?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EnviroCare's bi-monthly perimeter program in Birmingham is $35/month on ACH, or $70 per bi-monthly visit. That covers 30+ common pests — ants, roaches, spiders, silverfish, crickets — and includes unlimited free re-services between scheduled visits. No long-term contract, cancel anytime.",
          },
        },
        {
          "@type": "Question",
          name: "What's the best exterminator in Birmingham AL?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EnviroCare has been the Wedgworth family's Birmingham-area exterminator since 1958, now in our fourth generation. We're a Sentricon® Certified Specialist, locally owned (not a franchise or national chain), and our main office is in Alabaster. We're not the cheapest in town and we're not trying to be — we're the family that's been doing it longest.",
          },
        },
        {
          "@type": "Question",
          name: "Do you treat termites in older Birmingham homes without drilling?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — that's exactly what Sentricon® Always Active™ is for. In-ground bait stations around the perimeter protect the structure without drilling into original brick, stone, masonry, or finished foundations. Critical for the historic homes in Mountain Brook, Crestline, English Village, and the Highland Avenue corridor. priced after a free WDO inspection, with up to $1M EnviroCare-backed damage coverage on qualifying homes.",
          },
        },
        {
          "@type": "Question",
          name: "Which Birmingham suburbs do you serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All of them. Mountain Brook, Vestavia Hills, Homewood, Hoover, Alabaster, Pelham, Helena, Chelsea, Trussville, Greystone, Mt Laurel, Calera, and the city of Birmingham itself. Our office is at 2025 Butler Road in Alabaster — central to the metro.",
          },
        },
        {
          "@type": "Question",
          name: "When should I treat for mosquitoes in Birmingham?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mosquito season runs March through November in Birmingham. We apply the 30-day yard barrier monthly across those 9 months. $45 per treatment for mosquito only, or $65 per treatment for the Mosquito + Tick plan that adds tick coverage (worth it on any wooded Mountain Brook, Vestavia, or Chelsea property).",
          },
        },
        {
          "@type": "Question",
          name: "Are EnviroCare's pest treatments safe for my family and pets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We use only EPA-registered products and apply them strictly according to label directions. Your technician will advise the appropriate re-entry timing for treated areas once applications are dry.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a long-term contract?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Pest control is month-to-month on ACH and you can cancel anytime. We'd rather earn the next visit than lock you in.",
          },
        },
      ],
    },
  ],
};

export default function BirminghamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main style={{ background: "#fff", color: Ik, ...sans }}>
        {/* HERO */}
        <section style={{ background: `linear-gradient(135deg,${D} 0%,${F} 50%,${G} 100%)`, color: "#fff", padding: "5rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 50%,rgba(245,168,0,.12) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(134,239,172,.14) 0%,transparent 55%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 40, padding: ".4rem 1rem", marginBottom: "1.4rem" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase" }}>Birmingham &amp; Jefferson County · Since 1958</span>
            </div>
            <h1 style={{ ...serif, fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: "1.2rem", letterSpacing: "-.5px" }}>
              Birmingham Pest Control<br />
              <span style={{ color: Au, fontStyle: "italic", fontWeight: 700 }}>&amp; Exterminator Service</span>
            </h1>
            <p style={{ fontSize: "1.12rem", lineHeight: 1.7, color: "rgba(255,255,255,.88)", maxWidth: 620, marginBottom: "2rem" }}>
              The Wedgworth family has been Birmingham's family-owned pest control company since 1958.
              Bi-monthly perimeter service, Sentricon® termite protection, and seasonal mosquito and tick
              treatment — from Mountain Brook to Hoover, Vestavia to Pelham, the city to the foothills.
            </p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: "2rem", color: "rgba(255,255,255,.85)", fontSize: ".95rem" }}>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>68+</strong> Years serving AL</span>
              <span style={{ borderLeft: `3px solid ${Au}`, paddingLeft: 12 }}><strong style={{ color: "#fff", fontSize: "1.1rem", display: "block" }}>3</strong> Generations of Wedgworths</span>
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

        {/* PRESSURE — Birmingham-specific pest narrative */}
        <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Why Birmingham</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", lineHeight: 1.12, color: Ik, margin: "0 0 .5rem", maxWidth: 880 }}>
              The Cahaba River corridor, Red Mountain ridge, and clay-heavy soil make Birmingham a year-round pest pressure zone.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#4b5563", maxWidth: 720, margin: "0 0 2.5rem" }}>
              The six pest patterns we see most across the Birmingham metro — and how each program handles them.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
              <Card emoji="🪵" title="Termites in historic Birmingham homes" body="Mountain Brook, Forest Park, Highland Park, Five Points South — the older the home, the more vulnerable the foundation. Sentricon® Always Active™ uses in-ground bait stations around the perimeter, no drilling into original brick or masonry. Up to $1M in EnviroCare-backed damage coverage." />
              <Card emoji="🐜" title="Carpenter ants &amp; sugar ants" body="Older homes in Crestline, English Village, and Hollywood see seasonal carpenter ant invasions tracing moisture pathways. Bi-monthly perimeter service ($35/mo) covers the entire ant family — carpenter, sugar, odorous house ants, pavement ants — plus 30+ other Alabama pests." />
              <Card emoji="🦟" title="Mosquitoes along the Cahaba" body="Properties anywhere near the Cahaba River, Patton Creek, or Shades Creek see consistent mosquito pressure March–November. 30-day yard barrier at $45/treatment, or the Mosquito + Tick plan at $65/treatment which adds tick coverage and chiggers." />
              <Card emoji="🕷️" title="Brown recluse in garages &amp; basements" body="Older Birmingham housing stock — particularly Forest Park, Highland Avenue, and the southside — harbors brown recluse in garages, storage areas, and undisturbed crawlspaces. Our interior/perimeter program targets cracks, voids, and the dark zones recluses actually nest in." />
              <Card emoji="🐾" title="Ticks on Red Mountain &amp; Shades Mountain" body="Mountain Brook, Vestavia, and Chelsea homes backing up to the wooded ridges carry Lone Star and American dog ticks. The Mosquito + Tick plan bundles mosquito + tick + chigger coverage — the actual biting trio you deal with from May through October." />
              <Card emoji="🔥" title="Fire ants in new construction &amp; lawns" body="Subdivisions across the metro — particularly Greystone, Mt Laurel, Lake Wilborn, and the newer Hoover sections — sit on graded clay that fire ants colonize aggressively. Whole-yard fire ant treatment is a separate service at $150 minimum, priced by yard size." />
            </div>
          </div>
        </section>

        {/* SERVICES + PRICING */}
        <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Birmingham Service &amp; Pricing</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 .85rem" }}>
              Four programs, <em style={{ color: F }}>no long-term contracts</em>
            </h2>
            <p style={{ color: "#4b5563", maxWidth: 620, margin: "0 auto 3rem" }}>Locked Birmingham pricing. Month-to-month on ACH, cancel anytime.</p>
          </div>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.25rem" }}>
            <Plan name="Pest Control" price="$35" unit="/month" features={["Bi-monthly perimeter service","30+ Alabama pests covered","Unlimited free re-services","Quarterly interior on request"]} />
            <Plan name="Sentricon® Termite" price="Quote" unit="after inspection" features={["In-ground bait stations","No drilling required","Up to $1M coverage","Annual WDO letter on request"]} featured />
            <Plan name="Mosquito Yard" price="$45" unit="/treatment" features={["30-day yard barrier","March – November (9 visits)","Cuts mosquito pressure dramatically","Tick add-on available"]} />
            <Plan name="Mosquito + Tick" price="$65" unit="/treatment" features={["Mosquito + tick + chigger","30-day yard barrier","Best for wooded Birmingham lots","March – November"]} />
          </div>
          <div style={{ maxWidth: 700, margin: "2.5rem auto 0", padding: "1.2rem 1.5rem", background: Cr, border: `1px solid ${G}26`, borderRadius: 12, textAlign: "center", fontSize: ".95rem", color: "#4b5563" }}>
            <strong style={{ color: D }}>Complete coverage</strong> bundles pest, termite and mosquito into roughly $100/month plus your termite quote — one tech, one invoice. Convenience, not a discount: same fair pricing as the standalone services.
          </div>
        </section>

        {/* BIRMINGHAM SUBURBS — internal links to deep pages */}
        <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Birmingham Suburbs We Serve</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 .85rem" }}>
              Every metro suburb, every ZIP
            </h2>
            <p style={{ color: "#4b5563", maxWidth: 620, marginBottom: "2.5rem" }}>Most of these have their own dedicated EnviroCare page — tap any to read about service in your specific neighborhood.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: ".75rem" }}>
              {[
                ["Mountain Brook","/mountain-brook"],
                ["Vestavia Hills","/vestavia-hills"],
                ["Homewood","/homewood"],
                ["Hoover","/hoover"],
                ["Alabaster","/alabaster"],
                ["Pelham","/pelham"],
                ["Helena","/helena"],
                ["Chelsea","/chelsea"],
                ["Trussville","/trussville"],
                ["Greystone","/greystone"],
                ["Mt Laurel","/mt-laurel"],
                ["Calera","/calera"],
                ["Fultondale","/service-areas/fultondale"],
                ["Gardendale","/gardendale"],
                ["Bessemer","/bessemer"],
              ].map(([n,h]) => (
                <Link key={h} href={h} style={{ background: "#fff", border: `1.5px solid ${G}26`, borderRadius: 12, padding: ".85rem 1rem", fontSize: 14, fontWeight: 600, color: D, textAlign: "center", textDecoration: "none", transition: "all .2s" }}>{n}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Birmingham FAQs</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 2rem" }}>
              Answers for <em style={{ color: F }}>Birmingham homeowners</em>
            </h2>
            <Faq q="How much does pest control cost in Birmingham?" a="EnviroCare's bi-monthly perimeter program in Birmingham is $35/month on ACH, or $70 per bi-monthly visit. That covers 30+ common pests — ants, roaches, spiders, silverfish, crickets — and includes unlimited free re-services between scheduled visits. No long-term contract, cancel anytime." />
            <Faq q="What's the best exterminator in Birmingham AL?" a="EnviroCare has been the Wedgworth family's Birmingham-area exterminator since 1958, now in our fourth generation. We're a Sentricon® Certified Specialist, locally owned (not a franchise or national chain), and our main office is in Alabaster. We're not the cheapest in town and we're not trying to be — we're the family that's been doing it longest." />
            <Faq q="Do you treat termites in older Birmingham homes without drilling?" a="Yes — that's exactly what Sentricon® Always Active™ is for. In-ground bait stations around the perimeter protect the structure without drilling into original brick, stone, masonry, or finished foundations. Critical for the historic homes in Mountain Brook, Crestline, English Village, and the Highland Avenue corridor. priced after a free WDO inspection, with up to $1M EnviroCare-backed damage coverage on qualifying homes." />
            <Faq q="Which Birmingham suburbs do you serve?" a="All of them. Mountain Brook, Vestavia Hills, Homewood, Hoover, Alabaster, Pelham, Helena, Chelsea, Trussville, Greystone, Mt Laurel, Calera, and the city of Birmingham itself. Our office is at 2025 Butler Road in Alabaster — central to the metro." />
            <Faq q="When should I treat for mosquitoes in Birmingham?" a="Mosquito season runs March through November in Birmingham. We apply the 30-day yard barrier monthly across those 9 months. $45 per treatment for mosquito only, or $65 per treatment for the Mosquito + Tick plan that adds tick coverage (worth it on any wooded Mountain Brook, Vestavia, or Chelsea property)." />
            <Faq q="Are EnviroCare's pest treatments safe for my family and pets?" a="We use only EPA-registered products and apply them strictly according to label directions. Your technician will advise the appropriate re-entry timing for treated areas once applications are dry." />
            <Faq q="Is there a long-term contract?" a="No. Pest control is month-to-month on ACH and you can cancel anytime. We'd rather earn the next visit than lock you in." />
          </div>
        </section>

        {/* OFFICE + CTA */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: `linear-gradient(135deg,${D} 0%,#062514 100%)`, color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 10 }}>Birmingham Office</div>
            <h2 style={{ ...serif, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", margin: "0 0 .4rem" }}>2025 Butler Road · Alabaster, AL 35007</h2>
            <p style={{ color: "rgba(255,255,255,.85)", marginBottom: "1.8rem", fontSize: "1.05rem" }}>
              Free inspection, no long-term contract, and a real Wedgworth on the other end of the phone.
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
    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: 14, border: `1px solid ${G}26` }}>
      <div style={{ fontSize: 30, marginBottom: ".5rem" }} aria-hidden>{emoji}</div>
      <h3 style={{ ...serif, fontSize: "1.15rem", color: D, margin: "0 0 .4rem", fontWeight: 700 }}>{title}</h3>
      <p style={{ fontSize: ".92rem", color: "#4b5563", lineHeight: 1.55, margin: 0 }}>{body}</p>
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
