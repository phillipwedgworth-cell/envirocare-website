import { withOpenGraph } from '@/lib/seo/open-graph';
import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

// Added 2026-11-26 from BrightLocal's AI Insights (Alabaster, Oct 24 2026), which
// named Vestavia Hills among the cities that needed a page for each service.
// Local details are only the ones already published on /vestavia-hills and
// /vestavia-hills-mosquito-control (Cahaba River watershed, clay soil, Cahaba
// Heights, Rocky Ridge, Liberty Park, Vestavia East, Hwy 31). Jefferson County,
// so it is served by the 16th Ave S office per data/city-offices.ts.
// Termite rules: never a flat price; Sentricon for new customers only (liquid is
// existing customers only, Nov 23 2026); the $1M line is quoted exactly.

const TITLE = "Termite Control in Vestavia Hills, AL | EnviroCare";
const DESC =
  "Termite control in Vestavia Hills, AL: a free termite inspection, then Sentricon® bait stations for Cahaba Heights and Rocky Ridge homes. (205) 991-2882.";

export const metadata: Metadata = withOpenGraph({
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: "https://www.envirocarellc.com/vestavia-hills-termite-control", title: TITLE, description: DESC, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
});

const c: ComboContent = {
  eyebrow: "Termite Control · Vestavia Hills, Alabama",
  h1: "Termite Control in Vestavia Hills,",
  h1Accent: "Where the Clay Holds the Damp Against Your Foundation.",
  intro: [
    "Vestavia Hills sits along the Cahaba River watershed, and the heavy clay under most lots stays damp long after a storm. Eastern subterranean termites travel through moist soil to reach wood, so the same creek corridors and shaded ridges that make Cahaba Heights, Vestavia East and Rocky Ridge good places to live also keep the ground around a foundation termite-friendly for much of the year. Standard homeowner's insurance policies generally exclude termite damage.",
    "For new termite customers, EnviroCare installs the Sentricon® Always Active™ bait system: stations set in the soil around the house, where foraging termites find the bait and carry it back to the colony. Every plan starts with a free termite inspection, and the price is set from what the inspection finds, never as a flat number.",
  ],
  anglesHeading: "What drives termite pressure in Vestavia Hills",
  localAngles: [
    {
      title: "Clay soil along the Cahaba watershed",
      body: "Clay drains slowly and holds moisture against the slab or the crawlspace wall. Termites need that moisture to move, which is why the inspection looks closely at grading, downspouts and anywhere water collects next to the house.",
    },
    {
      title: "Shaded ridgeline lots on Rocky Ridge",
      body: "Mature canopy keeps soil and mulch beds damp for days. Wood mulch piled against siding, firewood stacked by the back door and old stumps all give a colony something to feed on close to the structure.",
    },
    {
      title: "Newer homes in Liberty Park",
      body: "Newer construction is not termite-proof. Graded red clay and fresh landscape beds still carry termite traffic, and the free inspection shows where stations should sit around a newer foundation.",
    },
    {
      title: "Selling or buying in Vestavia",
      body: "Most Alabama closings with a loan need an Official Alabama Wood Infestation Inspection Report, the WDO letter. It is a separately quoted, paid service, as low as $125. The termite inspection that starts a protection plan is the free one.",
    },
  ],
  sections: [
    {
      heading: "How a Sentricon® plan works for a Vestavia Hills home",
      paras: [
        "After the free inspection, your technician maps station spots around the house based on the soil, the moisture and the way the lot drains. Stations go in the ground around the perimeter, usually with no drilling into slabs, patios or driveways.",
        "Termites that find a station feed on the bait and share it through the colony. Stations are inspected and serviced on schedule, so the system stays active year after year.",
      ],
      list: [
        "Free termite inspection to start, with no obligation",
        "Sentricon® Always Active™ bait stations for new termite customers",
        "Station inspection and service on a set schedule",
        "WDO letters for real-estate closings, quoted separately, as low as $125",
      ],
    },
  ],
  price: {
    label: "Sentricon® Protection — Vestavia Hills",
    amount: "Free inspection",
    sub: "priced after a free termite inspection",
    bullets: [
      "Sentricon® Always Active™ bait stations",
      "Up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval and subject to the terms of the agreement.",
      "Usually no drilling around the foundation",
      "Scheduled station inspection and service",
      "WDO letters as low as $125",
    ],
  },
  faqs: [
    {
      q: "How much does termite control cost in Vestavia Hills?",
      a: "There is no honest flat price, because the size of the house, the soil and any past termite activity change the station plan. The termite inspection is free, and you get the exact number before anything is installed.",
    },
    {
      q: "What does the $1,000,000 coverage mean?",
      a: "EnviroCare's Sentricon® program comes with up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval and subject to the terms of the agreement. The written agreement sets what is covered, what is excluded and what has to be kept up, so ask us to walk you through it before you sign.",
    },
    {
      q: "How is that different from a retreatment-only plan?",
      a: "A retreatment-only plan pays to treat the house again if termites come back, but it does not pay for repairing damage. Many older termite bonds are written that way. If you hold an older bond, look for the words \"retreatment only\" and check the coverage limit and exclusions.",
    },
    {
      q: "Do you offer liquid termite treatment in Vestavia Hills?",
      a: "New termite customers get Sentricon®. Liquid service continues only for existing customers who are already on a liquid program.",
    },
    {
      q: "What are the signs of termites in a Vestavia Hills home?",
      a: "Mud tubes on the foundation, swarmers at windows in spring, blistered paint and wood that sounds hollow are the common signs. Many active colonies show nothing at all, which is why the free inspection covers the foundation, the crawlspace and the attic access.",
    },
    {
      q: "Do you serve Cahaba Heights, Liberty Park and Rocky Ridge?",
      a: "Yes. Our Birmingham office serves all of Vestavia Hills, including Cahaba Heights, Rocky Ridge, Liberty Park, Vestavia East and the Highway 31 corridor. Call (205) 991-2882 and we will confirm your address is on our route.",
    },
  ],
  office: { name: "Birmingham Office", phone: "(205) 991-2882", tel: "2059912882", address: "2120 16th Ave S, Ste 302, Birmingham, AL 35205" },
  cityHub: { name: "Vestavia Hills Pest Control", href: "/vestavia-hills" },
  servicePage: { name: "Termite Control Service", href: "/services/termite-control" },
  related: [
    { name: "Sentricon® Baiting", href: "/services/sentricon" },
    { name: "WDO Letters", href: "/services/wdo-letters" },
    { name: "Mosquito Control in Vestavia Hills", href: "/vestavia-hills-mosquito-control" },
  ],
  areaServed: [
    { name: "Cahaba Heights", href: "/cahaba-heights" },
    { name: "Liberty Park", href: "/liberty-park" },
    { name: "Mountain Brook", href: "/mountain-brook" },
    { name: "Homewood", href: "/homewood" },
    { name: "Hoover", href: "/hoover" },
  ],
  schemaName: "EnviroCare Termite Control — Vestavia Hills, AL",
  city: "Vestavia Hills",
  serviceType: "Termite control",
  offers: ["termite"],
  canonicalPath: "/vestavia-hills-termite-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
