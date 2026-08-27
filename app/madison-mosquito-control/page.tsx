import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { PRICING } from "@/data/pricing";

const TITLE = "Mosquito Control Madison AL | Seasonal Yard Treatment | EnviroCare";
const DESC =
  `Mosquito control in Madison AL — ~$${PRICING.addOns.mosquito.perVisit}/treatment, about 8 treatments March–October. Creek-line and greenway yards are the worst hit. Call (256) 937-7676.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/madison-mosquito-control', title: TITLE, description: DESC, images: ["/og/og-madison.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-madison.png"] },
};

const c: ComboContent = {
  eyebrow: "Mosquito Control · Madison, Alabama",
  h1: "Mosquito Control in Madison,",
  h1Accent: "Because the Creek Doesn't Care How New Your Deck Is.",
  intro: [
    "Madison's best-loved features are also its mosquito engines. Bradford Creek and Mill Creek thread the city, the greenway follows the water, and every retention pond behind every new phase holds exactly the still margin water mosquitoes breed in. Add Tennessee Valley humidity from March to October and a brand-new patio doesn't stay usable past dusk without help.",
    "EnviroCare's seasonal program treats the places mosquitoes actually rest and breed on your property — shaded foliage, under-deck areas, fence lines, standing-water edges — on roughly a monthly cycle through the season. The goal is a serious reduction in the population living in your yard. Anyone promising a mosquito-free yard is promising something the biology doesn't support; what we deliver is a yard you can use again.",
  ],
  anglesHeading: "Where Madison mosquitoes come from",
  localAngles: [
    {
      title: "Creek and greenway corridors",
      body: "Homes near Bradford Creek, Mill Creek, and the greenway system sit next to permanent breeding habitat. Barrier treatment on your property's resting sites cuts the population that crosses the fence line to bite.",
    },
    {
      title: "Retention ponds behind new phases",
      body: "Nearly every new Madison subdivision drains to a retention pond. The open water isn't the main problem — the grassy, shaded margins are. We treat your side of the equation: the foliage and shade where those mosquitoes spend the day.",
    },
    {
      title: "Irrigated landscaping = daily micro-puddles",
      body: "New sod irrigation leaves saucer-sized water in plant beds, downspout trays, and toys every morning. Asian tiger mosquitoes breed in a bottle cap. Part of every visit is walking the property and flagging the breeding spots you can empty.",
    },
    {
      title: "Add tick & chigger coverage",
      body: `Yards backing woods or the greenway can add tick and chigger treatment to the mosquito program — ~$${PRICING.addOns.mosquitoTick.perVisit}/treatment for the combined service. (Flea control is its own separate service.)`,
    },
  ],
  price: {
    label: "Seasonal Mosquito Program — Madison",
    amount: `~$${PRICING.addOns.mosquito.perVisit}/treatment`,
    sub: "about 8 treatments, March–October",
    bullets: [
      "Barrier treatment of resting + breeding sites",
      "Roughly 30-day cycle through the season",
      "Free re-treatment between visits if activity spikes",
      "Breeding-site walk-through on every visit",
      "EPA-registered products applied per label directions",
    ],
  },
  faqs: [
    {
      q: "How much does mosquito control reduce, honestly?",
      a: "A properly maintained barrier program dramatically knocks down the population living and resting on your property — most customers notice the difference within a day or two of the first treatment. What no company can honestly promise is elimination: mosquitoes fly, and the creek keeps producing them. Reduction and control is the truthful claim.",
    },
    {
      q: "When should Madison homes start treatment?",
      a: "March, as overwintering mosquitoes wake with the first warm stretch. Starting early suppresses the first breeding cycle rather than fighting a July population at full strength. The season runs through roughly October here.",
    },
    {
      q: "Is the treatment a fog that drifts away?",
      a: "No — it's a targeted application to the surfaces mosquitoes rest on: underside of leaves, shaded foliage, under decks, along fences. That's why it keeps working between visits instead of ending when the mist settles.",
    },
    {
      q: "Can I bundle mosquito with my pest control plan?",
      a: `Yes — pairing seasonal mosquito with the bi-monthly pest plan is our most popular combination in Madison, one technician and one invoice (bundling is a convenience, not a discount). Paired with pest control, mosquito runs $${PRICING.addOns.mosquito.monthlyWithPestOnly}/mo averaged across the year.`,
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Madison Service Area", href: "/madison" },
  servicePage: { name: "Mosquito Control Service", href: "/services/mosquito" },
  schemaName: "EnviroCare Mosquito Control — Madison, AL",
  canonicalPath: "/madison-mosquito-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
