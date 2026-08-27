import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { PRICING } from "@/data/pricing";

const TITLE = "Mosquito Control Decatur AL | River & Refuge Yards | EnviroCare";
const DESC =
  `Mosquito control in Decatur AL — ~$${PRICING.addOns.mosquito.monthly}/month, about 8 treatments March–October. Built for river-bottom humidity and refuge-edge yards. (256) 937-7676.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/decatur-mosquito-control', title: TITLE, description: DESC, images: ["/og/og-decatur.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-decatur.png"] },
};

const c: ComboContent = {
  eyebrow: "Mosquito Control · Decatur, Alabama",
  h1: "Mosquito Control in Decatur,",
  h1Accent: "The Hardest Mosquito Assignment in North Alabama.",
  intro: [
    "Let's be straight about Decatur: a city bordered by the Tennessee River on one side and Wheeler National Wildlife Refuge wetlands on the other is about the most mosquito-productive geography Alabama offers. Point Mallard's creeks, Flint Creek's backwaters, sloughs that hold water into July — the breeding habitat is permanent, protected, and fifty yards from a lot of back fences.",
    "So here's what honest mosquito control looks like here: we treat your property's resting and breeding sites — shaded foliage, under-deck voids, fence lines, the wet margins you own — on roughly a monthly cycle from March through October. The result is a serious, noticeable reduction in the population living in your yard. Nobody can eliminate mosquitoes next to a wildlife refuge, and anyone who promises that is describing something the biology doesn't support. What you get is your porch back.",
  ],
  anglesHeading: "Where Decatur's mosquitoes actually come from",
  localAngles: [
    {
      title: "Refuge and river margins",
      body: "The big habitat is off-limits by law and that's a good thing — Wheeler is why Decatur has its wildlife. Your lever is the resting habitat on your own lot: mosquitoes that breed in the refuge but spend their days in your shaded shrubs are the ones biting at dusk, and those we can reach.",
    },
    {
      title: "Point Mallard & river-adjacent neighborhoods",
      body: "Homes near Point Mallard, the causeway, and the river bluffs live with the highest ambient pressure in the city. These yards benefit most from the full-season program and from starting in March rather than after Memorial Day.",
    },
    {
      title: "Container breeding in town",
      body: "Away from the water, Decatur's mosquitoes are mostly home-grown Asian tigers breeding in gutters, plant saucers, tarps, and toys. Every visit includes a walk-through flagging the standing water you can dump — the free half of mosquito control.",
    },
    {
      title: "Ticks and chiggers ride along",
      body: `Refuge-edge and creek-line yards can add tick & chigger coverage to the mosquito program — ~$${PRICING.addOns.mosquitoTick.monthly}/month combined. (Fleas are a separate service.)`,
    },
  ],
  price: {
    label: "Seasonal Mosquito Program — Decatur",
    amount: `~$${PRICING.addOns.mosquito.monthly}/month`,
    sub: "about 8 treatments, March–October",
    bullets: [
      "Barrier treatment of resting + breeding sites you own",
      "Roughly 30-day cycle through the season",
      "Free re-treatment between visits if activity spikes",
      "Standing-water walk-through every visit",
      "EPA-registered products applied per label directions",
    ],
  },
  faqs: [
    {
      q: "Can mosquito control really work this close to Wheeler Refuge?",
      a: "Yes — with the right expectation. Treatment can't touch the refuge and shouldn't, but most of the biting you experience comes from mosquitoes resting on your own property between flights. Treating that resting habitat monthly produces a reduction refuge-edge customers consistently notice. Elimination, no. A usable yard, yes.",
    },
    {
      q: "When does mosquito season start in Decatur?",
      a: "Earlier than most of the state acts on it — river humidity wakes overwintering mosquitoes with the first sustained warm spell, usually March. Starting then suppresses the season's first breeding cycle instead of fighting July at full strength.",
    },
    {
      q: "Is this a fogging service?",
      a: "No. Fogging kills what's flying that minute and quits. We apply a residual barrier to the surfaces mosquitoes rest on — leaf undersides, shaded foliage, structures — which keeps working between visits.",
    },
    {
      q: "Can I combine mosquito with regular pest control?",
      a: `Most Decatur customers do — one technician, one invoice (a convenience, not a discount). Paired with the bi-monthly pest plan, mosquito averages $${PRICING.addOns.mosquito.monthlyWithPestOnly}/mo across the year.`,
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Decatur Service Area", href: "/decatur" },
  servicePage: { name: "Mosquito Control Service", href: "/services/mosquito" },
  schemaName: "EnviroCare Mosquito Control — Decatur, AL",
  canonicalPath: "/decatur-mosquito-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
