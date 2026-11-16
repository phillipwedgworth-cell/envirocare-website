// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/birmingham-mosquito-control/page.tsx
// Commit: fix(content+compliance): fire ant $150/most yards + 1-yr warranty; Mosquito+Tick excludes fleas; remove 'safe' and 'same technician' claims
// Push: main
// ─────────────────────────────────────
import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { ACH_TERMS } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Mosquito Control Birmingham AL | 30-Day Yard Barrier | EnviroCare",
  description:
    "Mosquito control in Birmingham AL — 30-day yard barrier for Cahaba River humidity. March–October, $45/month. Call (205) 991-2882.",
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/birmingham-mosquito-control',
    title: "Mosquito Control Birmingham AL | 30-Day Yard Barrier | EnviroCare",
    description: "Mosquito control in Birmingham AL — 30-day yard barrier for Cahaba River humidity. March–October, $45/month. Call (205) 991-2882.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mosquito Control Birmingham AL | 30-Day Yard Barrier | EnviroCare",
    description: "Mosquito control in Birmingham AL — 30-day yard barrier for Cahaba River humidity. March–October, $45/month. Call (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

const c: ComboContent = {
  eyebrow: "Mosquito Control · Birmingham, Alabama",
  h1: "Mosquito Control in Birmingham —",
  h1Accent: "Take Your Yard Back.",
  intro: [
    "Birmingham sits in a humid valley laced with water: the Cahaba River to the south, Village Creek and Valley Creek threading through the city, and storm drainage in every older neighborhood. Local weather and breeding sites affect mosquito activity; our March–October service calendar does not establish the first or last mosquitoes at a property.",
    "The Wedgworth family has been treating Alabama yards since 1958, and our 16th Ave S office serves Birmingham. Our 30-day barrier program targets where mosquitoes actually rest — shrub lines, eaves, fence rows, shaded foliage — so your porch, deck, and play set stay usable through an Alabama summer.",
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
      title: "March through October service",
      body: "Our seasonal program includes eight scheduled treatments from March through October. Mosquito activity varies with weather and breeding sites, so an inspection should guide the recommendation rather than a fixed temperature cutoff or start date.",
    },
  ],
  price: {
    label: "Birmingham Mosquito Program",
    amount: "$45/month",
    sub: "Average-size yard · 8 treatments March–October · firm price after a free inspection",
    bullets: [
      "Barrier treatment of resting + harborage zones",
      "Standing-water inspection every visit",
      "Rain-related follow-up assessed against product directions and site conditions",
      "Tick + chigger coverage quoted after inspection",
      "Follow-up treatment and any applicable charges follow the service agreement",
      ACH_TERMS,
    ],
  },
  faqs: [
    {
      q: "When should Birmingham homes start mosquito service?",
      a: "Plan ahead as outdoor activity increases, or request an inspection during the season. Our full program includes eight treatments from March through October. The recommendation should reflect breeding sites, current activity and access; starting in a particular month does not establish the result for every yard.",
    },
    {
      q: "Does it work on yards backing up to a creek?",
      a: "A creek-adjacent property needs an assessment of breeding sites, resting areas and permitted treatment locations. If mosquitoes remain active or rain raises concerns, contact the office. Any follow-up depends on product directions, site conditions and the scope of your service agreement.",
    },
    {
      q: "When can kids and pets go back outside after treatment?",
      a: "Follow the re-entry instructions for the products and application used at your property. Ask the technician when people and pets may use treated areas again and which areas are excluded from treatment. A general drying-time estimate is not a substitute for those directions.",
    },
    {
      q: "Can I bundle mosquito with pest control?",
      a: "Ask about coordinating general pest and mosquito service for your property. Tick and chigger coverage is quoted after inspection; confirm the included pests, treatment areas, schedule and price in the written proposal.",
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
