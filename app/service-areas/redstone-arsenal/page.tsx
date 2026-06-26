import type { Metadata } from "next";
import Link from "next/link";
import { EmojiIcon } from "@/components/shared/PestIcon";

/**
 * Redstone Arsenal area service page.
 *
 * Why this page exists: a cluster of 6 commercial-pest queries ranks at
 * positions 6–14 for ~1,930 cumulative impressions over 16 months — wasp,
 * insect, pest, rodent, scorpion control. No matching page today. Building
 * one consolidates the cluster.
 *
 * Critical positioning: we serve BUSINESSES ON AND NEAR Redstone Arsenal —
 * Cummings Research Park tenants, contractor offices, retail/restaurant
 * traffic along Hwy 20 and Martin Road. We DO NOT claim a DoD contract or
 * imply on-installation work without one. Framing is "the businesses that
 * support the Arsenal."
 *
 * Office: Huntsville, (256) 937-7676
 */

export const metadata: Metadata = {
  title: "Pest Control Near Redstone Arsenal | Commercial Service in Cummings Research Park | EnviroCare",
  description:
    "Commercial pest, rodent, wasp & insect control for businesses near Redstone Arsenal, Cummings Research Park and Huntsville's defense corridor. Family-owned since 1958. Call (256) 937-7676.",
  alternates: { canonical: "/service-areas/redstone-arsenal" },
  openGraph: {
    title: "Commercial Pest Control Near Redstone Arsenal | EnviroCare — Since 1958",
    description:
      "Commercial pest, rodent, and wasp control for offices, contractors, and retail near Redstone Arsenal and Cummings Research Park. Family-owned, Huntsville office.",
    url: "https://www.envirocarellc.com/service-areas/redstone-arsenal",
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
      "@id": "https://www.envirocarellc.com/service-areas/redstone-arsenal",
      name: "EnviroCare Pest & Termite Services — Huntsville / Redstone Arsenal Area",
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
        { "@type": "Place", name: "Cummings Research Park" },
        { "@type": "Place", name: "Redstone Arsenal area" },
        { "@type": "City", name: "Huntsville" },
        { "@type": "City", name: "Madison" },
      ],
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
      ],
      priceRange: "$$",
      description:
        "Commercial pest, rodent, wasp, and insect control for businesses near Redstone Arsenal, including Cummings Research Park, the Hwy 20 corridor, and the Martin Road business district. Family-owned by the Wedgworth family since 1958.",
    },
    {
      "@type": "Service",
      serviceType: "Commercial Pest Control",
      provider: { "@type": "LocalBusiness", name: "EnviroCare Pest & Termite Services" },
      areaServed: { "@type": "Place", name: "Redstone Arsenal area, Huntsville, AL" },
      name: "Commercial Pest Control near Redstone Arsenal",
      description:
        "Scheduled commercial pest control, rodent monitoring, wasp removal, and crawlspace work for offices, contractor facilities, retail, and restaurants supporting the Redstone Arsenal and Cummings Research Park ecosystem.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you provide pest control for businesses near Redstone Arsenal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We serve commercial properties in Cummings Research Park, along the Highway 20 / Martin Road corridor, and throughout the business districts surrounding Redstone Arsenal. Office buildings, contractor facilities, retail, and restaurants are all standard for our Huntsville crew.",
          },
        },
        {
          "@type": "Question",
          name: "Can you handle wasps and stinging insects at a Research Park office building?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — wasps, hornets, yellow jackets, and mud daubers are routine for us, especially around exterior signage, loading dock canopies, parking deck rafters, and roof-edge soffits. Single-visit nest removal or recurring commercial pest contracts both work; depends on building size and pressure level.",
          },
        },
        {
          "@type": "Question",
          name: "Do you do rodent control for commercial buildings in this area?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Commercial rodent programs are baited exterior stations on a regular service interval plus interior monitoring where needed. Common for restaurants, food-adjacent retail, and warehouses near the Arsenal where loading dock activity creates entry opportunities.",
          },
        },
        {
          "@type": "Question",
          name: "Are you authorized to work on the installation itself?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We are not currently a contracted pest control provider for the U.S. Army Garrison at Redstone Arsenal. Our service is to commercial and residential customers off-installation — Cummings Research Park, the contractor offices, hotels and retail along Hwy 20, and the residential areas surrounding the base.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly can you respond for a commercial issue?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Commercial response time depends on your service agreement. New-customer assessments are typically scheduled within the same week. For existing commercial accounts on a regular service interval, urgent issues are usually handled within 24–48 hours. Call (256) 937-7676 for a current scheduling window.",
          },
        },
      ],
    },
  ],
};

export default function RedstoneArsenalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main style={{ background: "#fff", color: Ik, ...sans }}>
        {/* HERO */}
        <section style={{ background: `linear-gradient(135deg,${D} 0%,${F} 50%,${G} 100%)`, color: "#fff", padding: "5rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 50%,rgba(245,168,0,.12) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(134,239,172,.14) 0%,transparent 55%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 40, padding: ".4rem 1rem", marginBottom: "1.4rem" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase" }}>Commercial · Huntsville Office · Since 1958</span>
            </div>
            <h1 style={{ ...serif, fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, lineHeight: 1.04, marginBottom: "1.2rem", letterSpacing: "-.5px" }}>
              Pest, Rodent &amp; Wasp Control<br />
              <span style={{ color: Au, fontStyle: "italic", fontWeight: 700 }}>near Redstone Arsenal</span>
            </h1>
            <p style={{ fontSize: "1.12rem", lineHeight: 1.7, color: "rgba(255,255,255,.88)", maxWidth: 620, marginBottom: "2.2rem" }}>
              Commercial pest service for the businesses that support Redstone Arsenal — Cummings Research
              Park offices, contractor facilities, hotels, restaurants, and retail along Highway 20 and
              Martin Road. Four generations of Wedgworth-family service out of our Huntsville office.
            </p>
            <div style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
              <a href="tel:2569377676" style={{ background: Au, color: Ik, padding: ".95rem 2rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)" }}>
                Call (256) 937-7676 →
              </a>
              <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>
                Request Commercial Quote
              </Link>
            </div>
          </div>
        </section>

        {/* WHO WE SERVE */}
        <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: Cr }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>The Redstone Ecosystem</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", lineHeight: 1.12, color: Ik, margin: "0 0 .5rem", maxWidth: 820 }}>
              Commercial pest control for the businesses around the Arsenal — not on the installation itself.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#4b5563", maxWidth: 720, margin: "0 0 2.5rem" }}>
              EnviroCare is not currently a contracted pest provider for the U.S. Army Garrison at Redstone.
              We serve the companies, contractors, hotels, and retail that make up the surrounding economy.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
              <Card emoji="🏢" title="Cummings Research Park offices" body="The second-largest research park in the U.S. — Lockheed, Northrop, Boeing, SAIC, Dynetics, and hundreds of smaller defense and tech contractors. Wasp and hornet nests around exterior signage, ant trails into break rooms, and seasonal stink-bug pressure are the recurring jobs we run here." />
              <Card emoji="🐀" title="Restaurants &amp; food-adjacent retail" body="Hwy 20 and Madison Boulevard restaurants serving the Arsenal workforce face the rodent and German cockroach pressure typical of food service. Scheduled commercial accounts with documented service logs for health inspections — exterior bait stations, interior monitoring, and IPM-style protocols." />
              <Card emoji="🐝" title="Wasps, hornets &amp; mud daubers" body="Office buildings, parking decks, loading dock canopies, and roof-edge soffits — wasps are the #1 commercial call in spring. Single-visit removal or quarterly preventive service depending on building size and recurring pressure." />
              <Card emoji="🦂" title="Spiders, scorpions &amp; the unusual stuff" body="Brown recluse in older storage buildings, wolf spiders in landscape mulch, the occasional scorpion call (uncommon but does happen on heavily wooded properties). Targeted treatment of cracks, voids, and harborage zones — not just spraying the perimeter." />
              <Card emoji="🪵" title="Sentricon® for commercial buildings" body="In-ground termite bait stations around the perimeter of a commercial structure — no drilling required, no foundation disruption, and EnviroCare-backed damage coverage up to $1M on qualifying properties. Critical for buildings with valuable contents and continuous operations." />
              <Card emoji="📋" title="Documentation &amp; WDO letters" body="Real-estate transactions, lender requirements, and corporate facility audits routinely require Wood-Destroying Organism (WDO) inspection letters. Fast turnaround out of the Huntsville office — usually 48 hours from inspection to signed report." />
            </div>
          </div>
        </section>

        {/* LOCATIONS WE COVER */}
        <section style={{ padding: "4.5rem clamp(1.5rem,5vw,4rem)", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Areas We Cover</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.2vw,2.4rem)", color: Ik, margin: "0 0 1rem" }}>The Arsenal-adjacent business corridor</h2>
            <p style={{ color: "#4b5563", maxWidth: 600, margin: "0 auto 2rem" }}>From Huntsville office, all within 15–20 minutes.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 900, margin: "0 auto" }}>
              {["Cummings Research Park","Hwy 20 Corridor","Martin Road","Bridge Street","Madison Square","Town Madison","Old Madison Pike","Wynn Drive","Discovery Drive","Explorer Boulevard","Rideout Road","Pratt Avenue"].map((n) => (
                <span key={n} style={{ background: "#fff", border: `1.5px solid ${G}33`, borderRadius: 50, padding: ".55rem 1.1rem", fontSize: 13, fontWeight: 600, color: D }}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "5rem clamp(1.5rem,5vw,4rem)", background: Cr, borderTop: `1px solid ${G}22` }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14 }}>Commercial FAQs</div>
            <h2 style={{ ...serif, fontWeight: 900, fontSize: "clamp(1.8rem,3.6vw,2.6rem)", color: Ik, margin: "0 0 2rem" }}>
              Common questions from <em style={{ color: F }}>Arsenal-area facility managers</em>
            </h2>
            <Faq q="Do you provide pest control for businesses near Redstone Arsenal?" a="Yes. We serve commercial properties in Cummings Research Park, along the Highway 20 / Martin Road corridor, and throughout the business districts surrounding Redstone Arsenal. Office buildings, contractor facilities, retail, and restaurants are all standard for our Huntsville crew." />
            <Faq q="Can you handle wasps and stinging insects at a Research Park office building?" a="Yes — wasps, hornets, yellow jackets, and mud daubers are routine for us, especially around exterior signage, loading dock canopies, parking deck rafters, and roof-edge soffits. Single-visit nest removal or recurring commercial pest contracts both work; depends on building size and pressure level." />
            <Faq q="Do you do rodent control for commercial buildings in this area?" a="Yes. Commercial rodent programs are baited exterior stations on a regular service interval plus interior monitoring where needed. Common for restaurants, food-adjacent retail, and warehouses near the Arsenal where loading dock activity creates entry opportunities." />
            <Faq q="Are you authorized to work on the installation itself?" a="We are not currently a contracted pest control provider for the U.S. Army Garrison at Redstone Arsenal. Our service is to commercial and residential customers off-installation — Cummings Research Park, the contractor offices, hotels and retail along Hwy 20, and the residential areas surrounding the base." />
            <Faq q="How quickly can you respond for a commercial issue?" a="Commercial response time depends on your service agreement. New-customer assessments are typically scheduled within the same week. For existing commercial accounts on a regular service interval, urgent issues are usually handled within 24–48 hours. Call (256) 937-7676 for a current scheduling window." />
            <Faq q="What does a commercial pest control agreement cost?" a="Pricing is based on building size, service frequency, and the pest pressure observed during the initial walkthrough. Free assessments are standard for any commercial property — we'll quote a fixed monthly figure after seeing the site." />
            <Faq q="Can you handle Sentricon® termite protection on commercial buildings?" a="Yes. The same in-ground bait station system used on residential properties scales to commercial. Up to $1M in EnviroCare-backed damage coverage on qualifying buildings, no drilling required, and annual inspection reporting suitable for facility audits or insurance documentation." />
          </div>
        </section>

        {/* NEARBY */}
        <section style={{ padding: "2.5rem clamp(1.5rem,5vw,4rem) 3rem", background: "#fff", borderTop: `1px solid ${G}22` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 12 }}>Related service areas</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                ["Huntsville","/huntsville"],
                ["Madison","/service-areas/madison"],
                ["Athens","/athens"],
                ["Decatur","/decatur"],
                ["Hampton Cove","/hampton-cove"],
                ["Harvest","/harvest"],
              ].map(([n, h]) => (
                <Link key={h} href={h} style={{ padding: "8px 16px", border: `1px solid ${G}4D`, borderRadius: 999, color: D, fontWeight: 600, fontSize: ".92rem", textDecoration: "none", background: Cr }}>{n}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "4rem clamp(1.5rem,5vw,4rem)", background: `linear-gradient(135deg,${D} 0%,#062514 100%)`, color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", margin: "0 0 .6rem" }}>Commercial assessment for your facility</h2>
            <p style={{ color: "rgba(255,255,255,.85)", marginBottom: "1.6rem", fontSize: "1.05rem" }}>Free walkthrough, fixed monthly quote, no long-term contract required.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".9rem", flexWrap: "wrap" }}>
              <a href="tel:2569377676" style={{ background: Au, color: Ik, padding: ".95rem 2.1rem", borderRadius: 50, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,168,0,.4)" }}>Call (256) 937-7676</a>
              <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: ".85rem 1.8rem", borderRadius: 50, fontWeight: 600, textDecoration: "none" }}>Request Commercial Quote →</Link>
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
      <div style={{ marginBottom: ".75rem" }}><EmojiIcon glyph={emoji} /></div>
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
