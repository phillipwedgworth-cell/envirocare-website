import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Chelsea AL | Termite, Mosquito & New-Construction Pre-Treat — Since 1958",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service in Chelsea AL — Chelsea Park, Foothills, Westover. Bi-monthly from $35/mo, no-drill termite with $1M coverage. Call (205) 940-6360.",
  alternates: { canonical: "/chelsea" },
  openGraph: {
    images: ["/og/og-chelsea.png"],
    title: "Pest Control Chelsea AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service across Chelsea. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/chelsea",
    type: "website",
  },
};

const G = "#0E8E40";

const config: DeepCityConfig = {
  name: "Chelsea",
  slug: "chelsea",
  badge: "Chelsea · Shelby County · Since 1958",
  zip: "35043",
  neighborhoods: ["Chelsea Park", "Foothills", "Westover", "Dunnavant Valley"],
  heroIntro:
    "Pest and termite care for Chelsea's rolling hills and fast-growing neighborhoods — Chelsea Park, Foothills, and Westover. No-drill Sentricon® (including new-construction pre-treat), seasonal mosquito and tick service, all from one local team.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in Chelsea, Alabama, including Chelsea Park, Foothills, and Westover. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Chelsea's rolling foothills, new construction, and wooded edges drive year-round termite, mosquito, and ant pressure.",
  whySub: "The patterns we treat most across Chelsea's growing neighborhoods.",
  pressureCards: [
    { emoji: "🏗️", title: "Termites in new construction", body: "Fresh foundations on graded Shelby clay sit on disturbed soil that subterranean termites move through fast. Starting Sentricon® at or near build locks in protection before damage starts — no drilling, up to $1M coverage." },
    { emoji: "🪵", title: "Termites in established homes", body: "Chelsea Park and older Foothills homes on damp clay give Eastern subterranean termites the moisture and access they look for. Sentricon® bait stations protect without drilling." },
    { emoji: "🦟", title: "Mosquitoes off the creeks", body: "Wooded lots and creek drainage across Chelsea hold the standing water mosquitoes breed in March through November. The 30-day yard barrier keeps yards usable through the season." },
    { emoji: "🐾", title: "Ticks on wooded foothill lots", body: "Chelsea's foothill tree line and Westover's wooded lots carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🔥", title: "Fire ants in fresh sod", body: "New lawns laid over graded red clay arrive with fire-ant colonies aboard. Whole-yard fire ant treatment is available, priced separately by yard size." },
    { emoji: "🐜", title: "The everyday 30+", body: "Carpenter ants, spiders, roaches, and seasonal invaders come in from the surrounding woods — all covered under the bi-monthly perimeter program with unlimited re-service." },
  ],
  services: [
    { title: "Termite Treatment & Pre-Treat in Chelsea", body: (<>Chelsea&apos;s mix of new builds and established homes makes subterranean termites a year-round concern. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link> — including new-construction pre-treat — with no drilling. Sentricon® is priced after a free on-site WDO inspection — up to $1,000,000 in coverage.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Mosquito Control in Chelsea", body: (<>Wooded lots and creek drainage hold mosquito pressure spring into fall.{" "}<Link href="/services/mosquito-control" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Tick Control in Chelsea", body: (<>Foothill tree lines and Westover's wooded lots put ticks close to families and pets. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Ant & Fire Ant Control in Chelsea", body: (<>Carpenter and odorous house ants come in from the woods; the bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> in fresh sod are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Chelsea", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> across Chelsea — shops, offices, and restaurants along the Highway 280 corridor — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "Do you do new-construction termite pre-treat in Chelsea?", a: "Yes. EnviroCare installs Sentricon® for new Chelsea homes — locking in protection before damage starts, no drilling, up to $1,000,000 in coverage under EnviroCare's guarantee. We coordinate around the build." },
    { q: "How much is termite treatment in Chelsea?", a: "Termite protection is priced after a free on-site WDO inspection, using Sentricon baiting with no drilling and coverage up to $1,000,000 backed by EnviroCare's guarantee." },
    { q: "Is there mosquito control in Chelsea?", a: "Yes. EnviroCare treats Chelsea yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Chelsea?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Do you serve Chelsea Park, Foothills, and Westover?", a: "Yes — all of Chelsea. Call (205) 940-6360 and we'll confirm your address is on our route." },
  ],
  siblings: [
    ["Mt Laurel", "/mt-laurel"],
    ["Greystone", "/greystone"],
    ["Hoover", "/hoover"],
    ["Birmingham", "/birmingham"],
    ["Termite Control", "/services/termite-control"],
    ["Mosquito Control", "/services/mosquito-control"],
  ],
};

export default function ChelseaPage() {
  return <DeepCityPage config={config} />;
}
