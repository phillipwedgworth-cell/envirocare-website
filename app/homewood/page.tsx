import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Homewood AL | Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service in Homewood AL — Edgewood, Hollywood, West Homewood. From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/homewood" },
  openGraph: {
    images: ["/og/og-homewood.png"],
    title: "Pest Control Homewood AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service across Homewood. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/homewood",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Homewood",
  slug: "homewood",
  badge: "Homewood · Jefferson County · Since 1958",
  zip: "35209",
  neighborhoods: ["Edgewood", "Hollywood", "West Homewood", "SoHo"],
  heroIntro:
    "Careful pest and termite care for Homewood's walkable, historic neighborhoods — Edgewood, Hollywood, West Homewood, and SoHo. No-drill Sentricon®, seasonal mosquito and tick service, and commercial programs for the 18th Street and SoHo districts.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in Homewood, Alabama, including Edgewood, Hollywood, West Homewood, and the SoHo district. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Historic bungalows, tight city lots, and the Shades Creek corridor keep Homewood's pest pressure steady year-round.",
  whySub: "The patterns we treat most across Homewood's established neighborhoods.",
  pressureCards: [
    { emoji: "🪵", title: "Termites in Edgewood & Hollywood bungalows", body: "Homewood's 1920s–1940s bungalows sit on older foundations and crawlspaces that give Eastern subterranean termites easy access. Sentricon® bait stations protect without drilling into original brick or masonry." },
    { emoji: "🐜", title: "Carpenter & sugar ants", body: "Mature trees and older plumbing runs in Edgewood and Hollywood draw carpenter and odorous house ants along moisture pathways. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🦟", title: "Mosquitoes off Shades Creek", body: "Shades Creek and the Lakeshore corridor keep mosquito pressure up from March through November. The 30-day yard barrier keeps porches and small city yards usable through the season." },
    { emoji: "🕷️", title: "Spiders in basements & garages", body: "Homewood's older housing stock has the basements, detached garages, and storage spaces brown recluse and black widows favor. We treat the cracks and voids they actually nest in." },
    { emoji: "🪳", title: "Roaches in older sewer-line homes", body: "Established neighborhoods with aging sewer connections see occasional roach pressure. The bi-monthly program targets entry points and harborage, with unlimited re-service between visits." },
    { emoji: "🐾", title: "Ticks on the Shades Creek greenway", body: "Yards backing up to the Shades Creek greenway and Lakeshore trail carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
  ],
  services: [
    { title: "Termite Treatment in Homewood", body: (<>Homewood&apos;s historic bungalows make subterranean termites a year-round concern. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link> — no drilling into your foundation or slab. Sentricon® is priced after a free on-site WDO inspection — with coverage up to $1,000,000 backed by EnviroCare&apos;s own guarantee.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>Termite-letter (WDO) inspections</Link> for Homewood home sales are available for closings.</>) },
    { title: "Mosquito Control in Homewood", body: (<>The Shades Creek corridor holds mosquito pressure spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month over the year. We never guarantee elimination, but most homeowners see a clear difference in how usable the yard becomes.</>) },
    { title: "Tick Control in Homewood", body: (<>Yards along the Shades Creek greenway put ticks close to families and pets. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with yard conditions.</>) },
    { title: "Ant Control in Homewood", body: (<>Carpenter, odorous house, and pavement ants are among Homewood&apos;s most common calls. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge. All products are EPA-registered and applied per label directions.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Homewood", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> across Homewood — the 18th Street and SoHo restaurants, retail, and offices — on schedules built around your hours and foot traffic, documented for health-inspection readiness. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Homewood?", a: "EnviroCare termite protection in Homewood is priced after a free on-site WDO inspection. It uses the Sentricon baiting system with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." },
    { q: "Is there mosquito control in Homewood?", a: "Yes. EnviroCare treats Homewood yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month over the year. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Homewood?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Do you treat older bungalows in Edgewood and Hollywood?", a: "Yes — historic homes get crawlspace inspection and Sentricon® termite protection with no drilling into original brick or masonry. The full-home termite inspection is free." },
    { q: "Do you serve Edgewood, Hollywood, West Homewood, and SoHo?", a: "Yes — all of Homewood. Call (205) 940-6360 and we'll confirm your address is on our route." },
  ],
  siblings: [
    ["Mountain Brook", "/mountain-brook"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Hoover", "/hoover"],
    ["Birmingham", "/birmingham"],
    ["Termite Control", "/services/termite-control"],
    ["Mosquito Control", "/services/mosquito"],
  ],
};

export default function HomewoodPage() {
  return <DeepCityPage config={config} />;
}
