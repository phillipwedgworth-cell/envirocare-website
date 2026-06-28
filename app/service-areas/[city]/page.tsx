// app/service-areas/[city]/page.tsx
// EnviroCare — dynamic service area landing pages
// Statically generated for 7 Alabama cities at build time

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/shared/Header";
import { EmojiIcon } from "@/components/shared/PestIcon";

// ── CITY DATA ──────────────────────────────────────────────────────────────
type OfficeKey = "birmingham" | "huntsville" | "lake-martin";

interface CityData {
  name: string;
  state: string;
  county: string;
  slug: string;
  office: OfficeKey;
  phone: string;
  phoneDisplay: string;
  blurb: string;          // 1-2 sentence local context
  neighborhoods: string[];
  pestPressure: string;   // local pest note
  canonicalBase: string;
}

const OFFICES: Record<OfficeKey, { address: string; city: string; zip: string }> = {
  "birmingham": {
    address: "2025 Butler Rd",
    city: "Alabaster",
    zip: "35007",
  },
  "huntsville": {
    address: "4003 Memorial Pkwy SW, Suite B",
    city: "Huntsville",
    zip: "35802",
  },
  "lake-martin": {
    address: "1 Kowaliga Rd",
    city: "Alexander City",
    zip: "35010",
  },
};

const CITIES: Record<string, CityData> = {
  birmingham: {
    name: "Birmingham",
    state: "AL",
    county: "Jefferson County",
    slug: "birmingham",
    office: "birmingham",
    phone: "2059406360",
    phoneDisplay: "(205) 940-6360",
    blurb:
      "Birmingham's dense tree canopy, Red Mountain topography, and Cahaba River corridor create some of Alabama's highest pest pressure. From Vestavia Hills to Forest Park, EnviroCare has protected Birmingham homes since 1958.",
    neighborhoods: ["Vestavia Hills", "Mountain Brook", "Homewood", "Hoover", "Forest Park", "Crestwood", "Trussville"],
    pestPressure:
      "Heavy mosquito and termite pressure. Red clay soil along Red Mountain is prime subterranean termite habitat. Mosquito season runs March–November with peak activity in July–August.",
    canonicalBase: "https://www.envirocarellc.com",
  },
  hoover: {
    name: "Hoover",
    state: "AL",
    county: "Jefferson / Shelby County",
    slug: "hoover",
    office: "birmingham",
    phone: "2059406360",
    phoneDisplay: "(205) 940-6360",
    blurb:
      "Hoover's rapid growth has brought with it the pest pressure that comes with new construction — disturbed soil, fresh landscaping, and open slab foundations. Our Alabaster office is 12 minutes from most Hoover neighborhoods.",
    neighborhoods: ["Riverchase", "Bluff Park", "Ross Bridge", "Trace Crossings", "Greystone"],
    pestPressure:
      "High termite risk in newer construction (2000s–2020s build). Mosquitoes are active March–November around Moss Rock Preserve and Patton Creek areas. Ant pressure is elevated in landscaped HOA neighborhoods.",
    canonicalBase: "https://www.envirocarellc.com",
  },
  "vestavia-hills": {
    name: "Vestavia Hills",
    state: "AL",
    county: "Jefferson County",
    slug: "vestavia-hills",
    office: "birmingham",
    phone: "2059406360",
    phoneDisplay: "(205) 940-6360",
    blurb:
      "Vestavia Hills is built into the mountain, which means wooded lots, steep grades, and moisture-retaining soil — ideal habitat for termites and mosquitoes. A large share of our longest-tenured customers are here.",
    neighborhoods: ["Vestavia Country Club", "Liberty Park", "Cahaba Heights", "Dolly Ridge", "Wald Valley"],
    pestPressure:
      "Among the highest termite pressure in metro Birmingham. Older homes (1950s–1970s) with crawl spaces have elevated subterranean termite risk. Mosquito pressure is significant in wooded cul-de-sacs from May–September.",
    canonicalBase: "https://www.envirocarellc.com",
  },
  "mountain-brook": {
    name: "Mountain Brook",
    state: "AL",
    county: "Jefferson County",
    slug: "mountain-brook",
    office: "birmingham",
    phone: "2059406360",
    phoneDisplay: "(205) 940-6360",
    blurb:
      "Mountain Brook's mature tree canopy and proximity to Shades Creek create consistent mosquito and termite pressure, especially in older home-site neighborhoods. Protecting estate-level properties requires careful, high-standards treatment.",
    neighborhoods: ["English Village", "Crestline", "Mountain Brook Village", "Lane Park", "Forest Highlands"],
    pestPressure:
      "Very high mosquito pressure in wooded neighborhoods near Shades Creek. Termite pressure elevated in older construction. Many Mountain Brook homes have mature landscaping that supports mosquito harborage.",
    canonicalBase: "https://www.envirocarellc.com",
  },
  huntsville: {
    name: "Huntsville",
    state: "AL",
    county: "Madison County",
    slug: "huntsville",
    office: "huntsville",
    phone: "2569377676",
    phoneDisplay: "(256) 937-7676",
    blurb:
      "Huntsville is the fastest-growing city in Alabama and competes head-to-head with Cook's Pest Control, which has been here since 1928. EnviroCare's Huntsville office brings genuine local competition — family-owned service, no franchise overhead.",
    neighborhoods: ["Madison", "Hampton Cove", "Jones Valley", "Meridianville", "Harvest", "Redstone Arsenal area"],
    pestPressure:
      "Mosquito season is strong May–September around the Tennessee River and Monte Sano. Fire ants are a major issue in new construction areas near Limestone County line. Termites are active throughout — Cook's dominance here means many homes are unprotected.",
    canonicalBase: "https://www.envirocarellc.com",
  },
  auburn: {
    name: "Auburn",
    state: "AL",
    county: "Lee County",
    slug: "auburn",
    office: "lake-martin",
    phone: "2562346162",
    phoneDisplay: "(256) 234-6162",
    blurb:
      "Auburn's college-town density and rapid development around the Opelika corridor bring year-round pest pressure. Our Alexander City office serves Auburn and Lee County with the same family-owned standards.",
    neighborhoods: ["Auburn University area", "Opelika", "Tiger Town", "Donahue Ridge", "Wrights Mill Road area"],
    pestPressure:
      "High ant and roach pressure in rental housing and high-density areas near campus. Mosquito season March–November. Fire ant pressure in new development along US-280 corridor.",
    canonicalBase: "https://www.envirocarellc.com",
  },
  "lake-martin": {
    name: "Lake Martin",
    state: "AL",
    county: "Tallapoosa / Coosa County",
    slug: "lake-martin",
    office: "lake-martin",
    phone: "2562346162",
    phoneDisplay: "(256) 234-6162",
    blurb:
      "EnviroCare is the ONLY pest control company with a dedicated Lake Martin office. We understand waterfront properties — our EPA-registered products are applied per label directions near the lake, docks, and shoreline. We've protected Lake Martin homes and vacation properties for decades.",
    neighborhoods: ["Kowaliga", "Children's Harbor", "Willow Point", "Cove Marina area", "Dadeville", "Eclectic", "Wind Creek"],
    pestPressure:
      "Lake Martin's waterfront properties face intense mosquito pressure from late March through November. Shoreline vegetation and standing water near docks create breeding sites. We use EPA-registered barrier products applied per label directions. Termites are also active in lakefront construction.",
    canonicalBase: "https://www.envirocarellc.com",
  },
};

const SERVICES = [
  {
    slug: "pest-control",
    icon: "🛡️",
    title: "Pest Control",
    price: "$35/mo · ACH",
    alt: "or $70 bimonthly",
    desc: "Bi-monthly perimeter defense. Covers 30+ Alabama pests including ants, roaches, spiders, crickets, and silverfish.",
    href: "/services/pest-control",
  },
  {
    slug: "termite",
    icon: "🪵",
    title: "Sentricon® Termite Protection",
    price: "Free inspection",
    alt: "priced after a free WDO inspection",
    desc: "In-ground bait stations. No drilling. $1,000,000 manufacturer repair warranty. Colony elimination — not just barrier.",
    href: "/services/sentricon",
  },
  {
    slug: "mosquito",
    icon: "🦟",
    title: "Mosquito Control",
    price: "$45/visit",
    alt: "March–November season",
    desc: "30-day barrier spray. Eliminates adult mosquitoes, targets breeding sites. 50% off first application for new customers.",
    href: "/services/mosquito",
  },
  {
    slug: "tick",
    icon: "🐾",
    title: "Tick & Flea Control",
    price: "Mosquito + Tick $65/visit",
    alt: "with mosquito control",
    desc: "Full yard perimeter treatment for ticks, fleas, and mosquitoes. Ideal for dog owners and families with outdoor kids.",
    href: "/services/tick-control",
  },
];

// ── STATIC PARAMS ──────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

// ── METADATA ──────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = CITIES[city];
  if (!data) return { title: "Service Area | EnviroCare" };

  return {
    title: `Pest Control ${data.name} ${data.state} | EnviroCare — Family-Owned Since 1958`,
    description: `EnviroCare pest, termite, and mosquito control in ${data.name}, AL. ${data.blurb.split(".")[0]}. Call ${data.phoneDisplay}.`,
    alternates: {
      canonical: './',
    },
  };
}

// ── PAGE ──────────────────────────────────────────────────────────────────
export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = CITIES[city];
  if (!data) notFound();

  const office = OFFICES[data.office];

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

  const SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "EnviroCare Pest Control",
        telephone: `+1${data.phone}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: office.address,
          addressLocality: office.city,
          addressRegion: "AL",
          postalCode: office.zip,
        },
        areaServed: {
          "@type": "City",
          name: data.name,
          containedInPlace: { "@type": "State", name: "Alabama" },
        },
        foundingDate: "1958",
        url: `${data.canonicalBase}/service-areas/${data.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Do you offer pest control in ${data.name}, AL?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. EnviroCare services ${data.name} from our ${office.city} office. We provide pest control, Sentricon termite protection, mosquito control, and tick/flea treatments. Call ${data.phoneDisplay} or request a free inspection online.`,
            },
          },
          {
            "@type": "Question",
            name: `What pests are most common in ${data.name}, Alabama?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: data.pestPressure,
            },
          },
        ],
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: CREAM, ...sf }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* HERO */}
      <section
        style={{
          background: `linear-gradient(160deg, ${DARK} 0%, #0b1f0d 100%)`,
          padding: "72px clamp(20px,5vw,64px) 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: G,
            opacity: 0.06,
            filter: "blur(90px)",
          }}
        />
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${G}22`,
              border: `1px solid ${G}44`,
              borderRadius: 6,
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: G,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {data.county} · Alabama · EnviroCare
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
            Pest Control in {data.name}, {data.state} —{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>
              Family-Owned Since 1958.
            </em>
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: 32,
              maxWidth: 640,
            }}
          >
            {data.blurb}
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              padding: "10px 18px",
              marginBottom: 28,
            }}
          >
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
              Serving {data.name} from our
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
              {office.city} office
            </span>
            <span style={{ fontSize: 13, color: GOLD, fontWeight: 600 }}>
              · {data.phoneDisplay}
            </span>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="/quote"
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
              Get Free Inspection →
            </a>
            <a
              href={`tel:${data.phone}`}
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
              {data.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ background: "#fff", padding: "36px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: 16,
              textAlign: "center",
            }}
          >
            {[
              { n: "Since 1958", sub: "67 years in Alabama" },
              { n: "3rd Gen", sub: "Kevin Wedgworth, owner" },
              { n: "$0", sub: "No setup fee" },
              { n: "Month-to-month", sub: "No long-term commitment" },
              { n: "Free re-service", sub: "Bugs back = we're back" },
            ].map((item) => (
              <div key={item.n}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: G,
                    letterSpacing: "-0.02em",
                    ...ss,
                  }}
                >
                  {item.n}
                </div>
                <div style={{ fontSize: 12, color: GREY, marginTop: 3 }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL PEST PRESSURE */}
      <section style={{ background: PAPER, padding: "56px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
              fontWeight: 600,
              color: DARK,
              marginBottom: 16,
              letterSpacing: "-0.015em",
              ...ss,
            }}
          >
            Pest Pressure in {data.name}, Alabama
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#3d4f44",
              lineHeight: 1.85,
              marginBottom: 24,
            }}
          >
            {data.pestPressure}
          </p>
          {data.neighborhoods.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: DARK,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 12,
                }}
              >
                Neighborhoods we serve in {data.name}:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {data.neighborhoods.map((n) => (
                  <span
                    key={n}
                    style={{
                      background: `${G}0D`,
                      border: `1px solid ${G}33`,
                      borderRadius: 6,
                      padding: "5px 12px",
                      fontSize: 13,
                      color: GT,
                      fontWeight: 500,
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section
        style={{ background: CREAM, padding: "64px clamp(20px,5vw,64px)" }}
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
            Services Available in {data.name}
          </h2>
          <p style={{ color: GREY, fontSize: 14, marginBottom: 32 }}>
            All services provided from our {office.city} office. Same
            technician every visit.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
              gap: 18,
            }}
          >
            {SERVICES.map((svc) => (
              <a
                key={svc.slug}
                href={svc.href}
                style={{
                  background: "#fff",
                  border: `1px solid ${LINE}`,
                  borderRadius: 12,
                  padding: "24px 22px",
                  textDecoration: "none",
                  display: "block",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div style={{ marginBottom: 10 }}><EmojiIcon glyph={svc.icon} /></div>
                <div
                  style={{
                    fontWeight: 700,
                    color: DARK,
                    fontSize: 16,
                    marginBottom: 4,
                    ...ss,
                  }}
                >
                  {svc.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: G,
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  {svc.price}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: GREY,
                    marginBottom: 12,
                  }}
                >
                  {svc.alt}
                </div>
                <p style={{ fontSize: 14, color: "#3d4f44", lineHeight: 1.6 }}>
                  {svc.desc}
                </p>
                <div
                  style={{
                    marginTop: 14,
                    fontSize: 13,
                    fontWeight: 700,
                    color: G,
                  }}
                >
                  Learn more →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{ background: "#fff", padding: "64px clamp(20px,5vw,64px)" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
              fontWeight: 600,
              color: DARK,
              marginBottom: 32,
              letterSpacing: "-0.015em",
              ...ss,
            }}
          >
            {data.name} Pest Control FAQ
          </h2>
          {[
            {
              q: `Do you offer pest control in ${data.name}, AL?`,
              a: `Yes. EnviroCare services ${data.name} and ${data.county} from our ${office.city} office. We provide pest control, Sentricon termite protection, mosquito control, and tick/flea treatments. Call ${data.phoneDisplay} or request a free inspection online.`,
            },
            {
              q: `What pests are most common in ${data.name}?`,
              a: data.pestPressure,
            },
            {
              q: `Is there a contract for pest control in ${data.name}?`,
              a: `No. EnviroCare is month-to-month — cancel anytime. We earn your business every visit. There's no initial service fee and no minimum contract term. Our pricing is the same whether you're in ${data.name} or anywhere else in our service area.`,
            },
            {
              q: `What is the price for pest control in ${data.name}?`,
              a: `Pest control starts at $35/month (ACH auto-draft) or $70 billed every other month. Termite protection with Sentricon is priced after a free WDO inspection. Mosquito control is $45/visit March through November. Bundled plans are available — Pest + Mosquito from $69/month, and Complete (pest + termite + mosquito) from about $100/month plus the termite quote.`,
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: `1px solid ${LINE}`,
                padding: "22px 0",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  color: DARK,
                  fontSize: 16,
                  marginBottom: 8,
                  lineHeight: 1.4,
                  ...ss,
                }}
              >
                {item.q}
              </p>
              <p style={{ color: "#3d4f44", lineHeight: 1.8, fontSize: 15 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: `linear-gradient(160deg, ${G} 0%, #07642b 100%)`,
          padding: "72px clamp(20px,5vw,64px)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            {data.name}, {data.state} · Free Inspection
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.4rem)",
              fontWeight: 600,
              color: "#fff",
              marginBottom: 16,
              letterSpacing: "-0.02em",
              ...ss,
            }}
          >
            Protect Your {data.name} Home.{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>No Contract.</em>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              marginBottom: 32,
              fontSize: 16,
              lineHeight: 1.75,
            }}
          >
            Local family-owned since 1958. The Wedgworth guarantee — same
            technician, same standards, every visit.
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
              Get Free Inspection →
            </a>
            <a
              href={`tel:${data.phone}`}
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
              {data.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
