import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Vestavia Hills AL | Exterminator & Termite | From $35/mo",
  description:
    "Bi-monthly pest control from $35/mo across Vestavia Hills — Cahaba Heights, Rocky Ridge, Liberty Park. 30+ pests, re-service at no charge. Call (205) 991-2882.",
  alternates: { canonical: "/vestavia-hills" },
  openGraph: {
    images: ["/og/og-vestavia-hills.png"],
    title: "Pest Control Vestavia Hills AL | From $35/mo | EnviroCare",
    description:
      "Family-owned pest, termite, mosquito & tick service across Vestavia Hills. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/vestavia-hills",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Vestavia Hills",
  slug: "vestavia-hills",
  badge: "Vestavia Hills · Jefferson County · Since 1958",
  zip: "35216",
  neighborhoods: ["Cahaba Heights", "Rocky Ridge", "Liberty Park", "Vestavia East"],
  heroIntro:
    "Family-trusted pest control and termite care for Vestavia Hills' wooded, creek-fed lots — Cahaba Heights, Rocky Ridge, Liberty Park, and Vestavia East. No-drill Sentricon®, seasonal mosquito and tick service, and commercial pest control along the Highway 31 corridor.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in Vestavia Hills, Alabama, including Cahaba Heights, Rocky Ridge, Liberty Park, and Vestavia East. Bi-monthly pest control is $35/month and covers 30+ common household pests — including ants, spiders, roaches, and rodents — with free re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling and up to $1,000,000 in EnviroCare damage repair coverage, subject to the terms of the agreement. EnviroCare is a family-owned Alabama company, and the Wedgworth family has protected homes here since 1958. Call (205) 991-2882.",
  whyHeadline: "Creek corridors, the Cahaba watershed, and heavy clay soil keep pest pressure high across Vestavia Hills.",
  whySub: "The six patterns we treat most across Vestavia's ridgeline and creek-bed lots.",
  pressureCards: [
    { emoji: "🪵", title: "Termites near the Cahaba", body: "Vestavia Hills sits along the Cahaba River watershed — heavy clay soil stays damp, and that moisture is what Eastern subterranean termites move through to reach your foundation. Sentricon® interrupts them before they reach the structure, no drilling required." },
    { emoji: "🦟", title: "Mosquitoes in Cahaba Heights", body: "The creek corridors running through Cahaba Heights, Vestavia East, and Rocky Ridge feed mosquito populations from March through October. The 30-day yard barrier makes the backyard usable again through the season." },
    { emoji: "🐜", title: "Ant control across the ridge", body: "Odorous house, carpenter, and Argentine ants are among the most common calls in Vestavia. The bi-monthly program covers the whole nuisance-ant family; fire ants on disturbed Liberty Park clay are treated separately by yard size." },
    { emoji: "🕷️", title: "Spiders on wooded lots", body: "Vestavia's tree line and undeveloped green corridors bring brown recluse and black widows into garages and crawlspaces. We treat the harborage zones at the foundation and in wall voids." },
    { emoji: "🪲", title: "Fall invaders off Rocky Ridge", body: "The ridge above Rocky Ridge and Vestavia East funnels Asian lady beetles, stink bugs, and boxelder bugs onto south-facing walls every October. Bi-monthly exterior service seals the most common entry points." },
    { emoji: "🐾", title: "Ticks in the greenways", body: "The wooded lots and greenways in Cahaba Heights carry Lone Star and American dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
  ],
  services: [
    {
      title: "Termite Treatment in Vestavia Hills",
      body: (
        <>
          Vestavia&apos;s clay soil and Cahaba-watershed moisture make subterranean termites a year-round concern. EnviroCare protects with the{" "}
          <Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link> — installed around the home with no drilling into your foundation or slab. Sentricon® is priced after a free on-site WDO inspection. Coverage runs up to $1,000,000, subject to the terms of the agreement.{" "}
          <Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>Termite-letter (WDO) inspections</Link> for Vestavia home sales are available for closings.
        </>
      ),
    },
    {
      title: "Mosquito Control in Vestavia Hills",
      body: (
        <>
          The creek corridors through Cahaba Heights and Vestavia East hold mosquito pressure spring into fall.{" "}
          <Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through October — eight treatments at $45/month, spread evenly across the year by ACH. Treatments target resting and breeding areas; we never guarantee elimination, but most homeowners see a clear difference in how usable the yard becomes. See{" "}
          <Link href="/vestavia-hills-mosquito-control" style={{ color: G, fontWeight: 600 }}>mosquito control in Vestavia Hills</Link> for how the program works on creek-side and wooded lots.
        </>
      ),
    },
    {
      title: "Tick Control in Vestavia Hills",
      body: (
        <>
          Wooded edges and the Cahaba Heights greenways put Lone Star and dog ticks close to where families and pets play. EnviroCare&apos;s{" "}
          <Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage to the seasonal schedule — $65 per month across the eight-visit season. Most products knock back tick activity in treated zones; results vary with yard conditions and habitat.
        </>
      ),
    },
    {
      title: "Ant Control in Vestavia Hills",
      body: (
        <>
          Odorous house ants, carpenter ants, and Argentine ants are among Vestavia&apos;s most common calls. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with re-service if they return between visits, at no extra charge. All products are EPA-registered and applied per label directions.{" "}
          <Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> on disturbed Liberty Park clay are priced separately by treated area.
        </>
      ),
    },
    {
      title: "Commercial Pest Control in Vestavia Hills",
      body: (
        <>
          EnviroCare services{" "}
          <Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> across Vestavia — offices and retail along the Highway 31 corridor, restaurants, and HOA common areas — on schedules built around your hours and foot traffic. Programs are documented for health-inspection readiness. Call (205)&nbsp;991-2882 for a commercial walkthrough.
        </>
      ),
    },
  ],
  faqs: [
    { q: "How much is termite treatment in Vestavia Hills?", a: "EnviroCare termite protection in Vestavia Hills is priced after a free on-site WDO inspection. It uses the Sentricon baiting system with no drilling, with coverage up to $1,000,000 subject to the terms of the agreement." },
    { q: "Is there mosquito control in Vestavia Hills?", a: "Yes. EnviroCare treats Vestavia yards every 30 days from March through October — eight treatments at $45/month, spread evenly across the year by ACH. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "Do you do tick control in Vestavia Hills?", a: "Yes — the mosquito-plus-tick program adds tick and chigger coverage for $65 per month. It targets the wooded edges and Cahaba Heights greenways where ticks wait for hosts." },
    { q: "What does bi-monthly pest control cover in Vestavia Hills?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Is EnviroCare a local Vestavia Hills exterminator?", a: "Yes. EnviroCare is a family-owned, professional pest control company and local exterminator serving Vestavia Hills and the Birmingham area since 1958, with comprehensive pest control solutions for homes and businesses." },
    { q: "Do you serve Cahaba Heights, Liberty Park, and Rocky Ridge?", a: "Yes — all of Vestavia Hills, including Cahaba Heights, Rocky Ridge, Liberty Park, Vestavia East, and the Highway 31 corridor. Call (205) 991-2882 and we'll confirm your address is on our route." },
  ],
  body: [
    "The Wedgworth family has been doing pest control in Alabama since 1958, and in Vestavia Hills the pressure follows the land: the Cahaba River watershed, creek corridors, and wooded ridgeline lots keep moisture and cover high across Cahaba Heights, Rocky Ridge, Liberty Park, and Vestavia East. That means ants, spiders, roaches, and seasonal bugs press on Vestavia homes much of the year, while rodents like rats and mice work toward the warmth indoors as fall sets in. EnviroCare's bi-monthly pest control treats the exterior perimeter and the entry points where pests get in, so most problems are stopped before they become an indoor infestation.",
    "As a family-owned pest control company — not a national chain exterminator — EnviroCare keeps the plan simple. The bi-monthly pest control service covers 30+ common household pests for $35 a month, with free re-service if a bug problem shows up between visits. For a heavier infestation, a free, thorough inspection maps the harborage and entry points first. You can pay per visit, billed as serviced, or choose equal monthly ACH payments under a 12-month billing agreement, and you can layer on Sentricon® termite protection or seasonal mosquito and tick service whenever your Vestavia Hills home needs it.",
    "Vestavia's wooded lots bring their own guests. Brown recluse and black widow spiders settle into garages and crawlspaces, fall invader bugs like Asian lady beetles and stink bugs gather on south-facing walls off Rocky Ridge, and the Cahaba Heights greenways keep ticks close to where kids and pets play. A recurring pest control service treats these harborage zones on a seasonal rhythm, so the barrier is working when the bugs are most active — and your home stays pest-free without you thinking about it.",
    "Vestavia Hills businesses along the Highway 31 corridor get documented, inspection-ready commercial pest control on a schedule built around their hours. Whether it is a home on Liberty Park clay or a restaurant on 31, EnviroCare's aim is the same: dependable, professional pest control that protects the property and gives you year-round peace of mind. Call (205) 991-2882 to start service anywhere in Vestavia Hills — Cahaba Heights, Rocky Ridge, Liberty Park, or Vestavia East.",
  ],
  siblings: [
    ["Over the Mountain", "/over-the-mountain"],
    ["Mountain Brook", "/mountain-brook"],
    ["Liberty Park", "/liberty-park"],
    ["Homewood", "/homewood"],
    ["Hoover", "/hoover"],
    ["Birmingham", "/birmingham"],
    ["Termite Control", "/services/termite-control"],
    ["Mosquito Control", "/services/mosquito"],
    ["Vestavia Hills Mosquito Control", "/vestavia-hills-mosquito-control"],
  ],
  // Birmingham office — Jefferson County + the Hwy 280 / 35242 corridor.
  officePhone: "(205) 991-2882",
  officeTel: "2059912882",
  officeLabel: "Birmingham",
  officeStreet: "2120 16th Ave S, Ste 302",
  officeLocality: "Birmingham",
  officePostal: "35205",
};

export default function VestaviaHillsPage() {
  return <DeepCityPage config={config} />;
}
