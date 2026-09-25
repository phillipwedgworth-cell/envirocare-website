import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { PRICING } from "@/data/pricing";

// Added 2026-09-25. NeuronWriter query c97f28b04ed3004b ("mosquito control vestavia hills al")
// was the one Optimize query with no dedicated page (Optimize audit, Sep 22). Built on the
// same ComboPage pattern as the Birmingham / Huntsville / Madison / Decatur mosquito pages.
// Local details are the ones already verified on /vestavia-hills (Cahaba Heights, Rocky Ridge,
// Liberty Park, Vestavia East, Cahaba watershed, Hwy 31). Prices come only from data/pricing.ts.

const TITLE = "Mosquito Control Vestavia Hills AL | Seasonal Yard Treatment | EnviroCare";
const DESC =
  `Mosquito control in Vestavia Hills AL — ~$${PRICING.addOns.mosquito.monthly}/month, eight treatments March–October for Cahaba Heights, Rocky Ridge & Liberty Park yards. Call (205) 991-2882.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: "https://www.envirocarellc.com/vestavia-hills-mosquito-control", title: TITLE, description: DESC, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const c: ComboContent = {
  eyebrow: "Mosquito Control · Vestavia Hills, Alabama",
  h1: "Mosquito Control in Vestavia Hills,",
  h1Accent: "for Wooded Lots That Stay Damp Long After the Rain.",
  intro: [
    "Vestavia Hills is built on ridges, hollows, and tree line. That is what makes it a beautiful place to live, and it is also why mosquito pressure here runs high from March through October. Creek corridors through Cahaba Heights and Vestavia East, shaded lots along Rocky Ridge, and the Cahaba River watershed all hold the moisture and standing water mosquitoes need to lay their eggs. On a heavily shaded lot, a patio can go from pleasant to unusable within minutes of sundown.",
    "EnviroCare's seasonal mosquito treatment targets the areas where mosquitoes rest and breed on your property: the undersides of leaves, dense vegetation along the fence line, under decks, wood piles, and the damp edges where water collects. The goal is a real reduction in the mosquito populations living in your yard, so you can use your outdoor space again. Nobody can honestly promise a mosquito-free yard in Vestavia. Mosquitoes fly, and the creeks keep producing them. What we deliver is a yard you can enjoy through peak mosquito season.",
  ],
  anglesHeading: "Where Vestavia Hills mosquitoes come from",
  localAngles: [
    {
      title: "Creek corridors in Cahaba Heights and Vestavia East",
      body: "Homes that back up to the creek corridors sit next to permanent breeding habitat. We cannot treat the creek, but we treat your side of the tree line, where those mosquitoes spend the day before they come out to bite.",
    },
    {
      title: "Shade and tree canopy on Rocky Ridge lots",
      body: "Mature canopy keeps soil and ground cover damp for days after a storm. Adult mosquitoes rest in that shade during the heat of the afternoon, so shaded beds, ivy, and shrub lines are the core of every treatment.",
    },
    {
      title: "Standing water in newer Liberty Park yards",
      body: "Irrigation, downspout trays, birdbaths, clogged gutters, and low spots in new sod all hold water. Asian tiger mosquitoes can breed in a bottle cap's worth. Every visit includes a walk of the property to point out breeding spots you can empty between treatments.",
    },
    {
      title: "Add tick and chigger coverage",
      body: `Wooded edges in Vestavia carry lone star and American dog ticks. Yards along the tree line can add tick and chigger treatment to the mosquito program, ~$${PRICING.addOns.mosquitoTick.monthly}/month for the combined mosquito and tick service. Flea control is a separate service.`,
    },
  ],
  price: {
    label: "Seasonal Mosquito Program — Vestavia Hills",
    amount: `~$${PRICING.addOns.mosquito.monthly}/month`,
    sub: "eight treatments, March–October",
    bullets: [
      "Treatment of resting and breeding areas on your property",
      "Roughly 30-day cycle through mosquito season",
      "Free re-treatment between visits if activity spikes",
      "Standing-water walk-through on every visit",
      "EPA-registered products applied according to label directions",
    ],
  },
  faqs: [
    {
      q: "What does mosquito control cost in Vestavia Hills?",
      a: `The seasonal program is $${PRICING.addOns.mosquito.monthly}/month for an average-size yard: eight treatments from March through October, with equal monthly ACH payments across the year. The price is confirmed after a free look at your property. Paired with our bi-monthly pest plan, mosquito runs $${PRICING.addOns.mosquito.monthlyWithPestOnly}/month. Mosquito and tick together is $${PRICING.addOns.mosquitoTick.monthly}/month.`,
    },
    {
      q: "What are the worst months for mosquitoes in Vestavia Hills?",
      a: "Mosquito populations build in late spring and peak through the humid summer months, then taper off as nights cool in fall. Starting in March, before the first big hatch, suppresses the early breeding cycles and gives noticeably better results than starting in July.",
    },
    {
      q: "Does Alabama have a mosquito-borne disease problem?",
      a: "West Nile virus is the mosquito-borne illness most often reported in Alabama, and the Alabama Department of Public Health tracks mosquito activity each season. Reducing the mosquito population around your home, emptying standing water, and using an EPA-registered repellent at dawn and dusk all lower the number of bites your family takes.",
    },
    {
      q: "How often should a yard be treated for mosquitoes?",
      a: "About every 30 days through the season. That spacing keeps pressure on each new generation before it matures. If heavy rain cuts a cycle short or you see a spike in mosquito activity between visits, we come back at no extra charge.",
    },
    {
      q: "What can I do between visits to keep mosquitoes down?",
      a: "Walk the yard after every rain. Empty birdbaths and plant saucers, clear clogged gutters, flip toys and wheelbarrows, and fill low spots where water sits. Keeping the grass trimmed and thinning dense vegetation near the house also takes away resting shade.",
    },
    {
      q: "Do you serve Cahaba Heights, Liberty Park, and Rocky Ridge?",
      a: "Yes. Our Birmingham office provides mosquito control service and tick control across all of Vestavia Hills, including Cahaba Heights, Rocky Ridge, Liberty Park, Vestavia East, and the Highway 31 corridor, along with Mountain Brook, Homewood, and Hoover. Call (205) 991-2882 for a free quote and we will confirm your address is on our route.",
    },
    {
      q: "Can I add mosquito control to my pest control plan?",
      a: `Yes. Many Vestavia Hills homeowners pair seasonal mosquito with the bi-monthly pest plan so one local team handles both on one schedule. Bundling is a convenience, not a discount. Paired with pest control, mosquito runs $${PRICING.addOns.mosquito.monthlyWithPestOnly}/month.`,
    },
  ],
  office: { name: "Birmingham Office", phone: "(205) 991-2882", tel: "2059912882", address: "2120 16th Ave S, Ste 302, Birmingham, AL 35205" },
  cityHub: { name: "Vestavia Hills Pest Control", href: "/vestavia-hills" },
  servicePage: { name: "Mosquito Control Service", href: "/services/mosquito" },
  schemaName: "EnviroCare Mosquito Control — Vestavia Hills, AL",
  canonicalPath: "/vestavia-hills-mosquito-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
