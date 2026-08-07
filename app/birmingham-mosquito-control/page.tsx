import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Mosquito Control Birmingham AL | 30-Day Yard Barrier | EnviroCare",
  description:
    "Mosquito control in Birmingham AL — 30-day yard barrier for Cahaba River humidity. March–November, $45/visit. Call (205) 991-2882.",
  alternates: { canonical: "./" },
  openGraph: {
    title: "Mosquito Control Birmingham AL | 30-Day Yard Barrier | EnviroCare",
    description: "Mosquito control in Birmingham AL — 30-day yard barrier for Cahaba River humidity. March–November, $45/visit. Call (205) 991-2882.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mosquito Control Birmingham AL | 30-Day Yard Barrier | EnviroCare",
    description: "Mosquito control in Birmingham AL — 30-day yard barrier for Cahaba River humidity. March–November, $45/visit. Call (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

const c: ComboContent = {
  eyebrow: "Mosquito Control · Birmingham, Alabama",
  h1: "Mosquito Control in Birmingham —",
  h1Accent: "Take Your Yard Back.",
  intro: [
    "Birmingham sits in a humid valley laced with water: the Cahaba River to the south, Village Creek and Valley Creek threading through the city, and storm drainage in every older neighborhood. That geography is why metro mosquito season runs hard from March through November — and why a citronella candle was never going to cut it.",
    "EnviroCare has treated Birmingham yards since 1958. Our 30-day barrier program targets where mosquitoes actually rest — shrub lines, eaves, fence rows, shaded foliage — so your porch, deck, and play set stay usable through an Alabama summer.",
  ],
  anglesHeading: "Why Birmingham mosquitoes are a different fight",
  localAngles: [
    {
      title: "Cahaba River & creek corridors",
      body: "Homes near the Cahaba, Shades Creek, and Village Creek face constant re-infiltration from the water corridors. The barrier is re-applied every 30 days precisely because creek-adjacent pressure never lets up mid-season.",
    },
    {
      title: "Old-neighborhood shade canopy",
      body: "The mature tree cover of Highland Park, Forest Park, Crestwood, and Avondale holds the cool, damp shade mosquitoes wait in all day. We treat the resting zones under that canopy, not just open lawn.",
    },
    {
      title: "Storm drains and low spots",
      body: "Birmingham's older drainage and clay soil leave standing water after every summer storm. Your technician flags breeding spots — gutters, planters, low corners — and applies larvicide where water can't be drained.",
    },
    {
      title: "March through November — not 'summer'",
      body: "Metro mosquito activity starts when overnight temps hold above 50°F, usually late March, and runs into November. Programs that start Memorial Day give mosquitoes a two-month head start.",
    },
  ],
  price: {
    label: "Birmingham Mosquito Program",
    amount: "$45/visit",
    sub: "March through November · every 30 days",
    bullets: [
      "Barrier treatment of resting + harborage zones",
      "Standing-water inspection every visit",
      "Free re-treatment if heavy rain cuts a cycle short",
      "Tick + chigger coverage available in Mosquito + Tick ($65/visit)",
      "Unlimited free re-treatment between visits",
    ],
  },
  faqs: [
    {
      q: "When should Birmingham homes start mosquito service?",
      a: "Late March or April — before populations explode. Starting before the first big hatch produces visibly better results all season than starting in June. We run the program through November.",
    },
    {
      q: "Does it work on yards backing up to a creek?",
      a: "Yes — creek-adjacent yards are most of our Birmingham mosquito routes. The 30-day re-application cycle exists because corridor pressure re-infiltrates; between visits, re-treatment is free if you're seeing activity.",
    },
    {
      q: "When can kids and pets go back outside after treatment?",
      a: "Once the application dries, typically 30–45 minutes. We use EPA-registered products applied per label directions and never spray vegetable gardens or blooming pollinator plants.",
    },
    {
      q: "Can I bundle mosquito with pest control?",
      a: "Most Birmingham customers do — bi-monthly perimeter pest control plus the mosquito barrier with the same technician on one schedule. The Mosquito + Tick plan adds tick + chigger coverage at $65/visit.",
    },
  ],
  office: { name: "Birmingham Office", phone: "(205) 991-2882", tel: "2059912882", address: "2120 16th Ave S, Ste 302, Birmingham, AL 35205" },
  cityHub: { name: "Birmingham Pest Control", href: "/birmingham" },
  servicePage: { name: "Mosquito Control Service", href: "/services/mosquito" },
  schemaName: "EnviroCare Mosquito Control — Birmingham, AL",
  canonicalPath: "/birmingham-mosquito-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
