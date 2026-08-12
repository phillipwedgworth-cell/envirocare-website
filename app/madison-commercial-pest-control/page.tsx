import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

const TITLE = "Commercial Pest Control Madison AL | EnviroCare";
const DESC =
  "Commercial pest control in Madison AL — restaurants, retail, offices, and clinics along the I-565 corridor. Documented service, audit-ready logs. Call (256) 937-7676.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/madison-commercial-pest-control', title: TITLE, description: DESC, images: ["/og/og-madison.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-madison.png"] },
};

const c: ComboContent = {
  eyebrow: "Commercial Pest Control · Madison, Alabama",
  h1: "Commercial Pest Control in Madison,",
  h1Accent: "Because One Roach Costs More Than a Year of Prevention.",
  intro: [
    "Madison's commercial strip has exploded — Town Madison's restaurants and hotels around the ballpark, the retail filling in along Highway 72 and Madison Boulevard, medical and professional suites serving a city that doubled. Every one of those doors has the same exposure: a single pest sighting in front of a customer, a health inspector, or a Google reviewer costs more than years of prevention ever would.",
    "EnviroCare's commercial program is built for that math — scheduled exterior and interior service matched to your facility type, documentation you can hand an inspector or corporate auditor, and a local North Alabama office that answers when a manager calls at open. Fourth-generation family company; we've been keeping Alabama businesses clean since 1958.",
  ],
  anglesHeading: "Madison facilities we service",
  localAngles: [
    {
      title: "Restaurants & food service",
      body: "Town Madison and the Highway 72 corridor run on food traffic — and food service runs on German-roach prevention, drain-fly control, and documented service logs. Treatment is scheduled around your hours, focused on harborage and entry, with reports your health inspector recognizes.",
    },
    {
      title: "Retail, hotels & multi-tenant",
      body: "Shared walls mean shared pests: one tenant's problem travels the utility chases to the whole strip. Program service covers common areas and coordinates unit treatment so the building gets solved, not just the suite that complained.",
    },
    {
      title: "Offices, clinics & professional suites",
      body: "Discreet, scheduled, and documented — exterior-first so treatments stay out of your patients' and clients' experience entirely. Ant surges and occasional invaders handled before staff ever files a complaint.",
    },
    {
      title: "New construction, inherited pests",
      body: "Madison's commercial builds sit on the same disturbed farmland as its subdivisions — new suites routinely inherit displaced ant and cricket populations in year one. A commercial perimeter program from opening day is far cheaper than the first bad review.",
    },
  ],
  price: {
    label: "Commercial Program — Madison",
    amount: "Custom quote",
    sub: "priced by facility type, size, and service frequency — free walkthrough",
    bullets: [
      "Service frequency matched to your facility (monthly common)",
      "Documented service reports — audit and inspection ready",
      "Exterior-first treatment, interior as needed",
      "Free re-service between visits on covered pests",
      "EPA-registered products applied per label directions",
    ],
  },
  faqs: [
    {
      q: "What does commercial pest control cost in Madison?",
      a: "It's quoted per facility — a 1,200 sq ft café and a 40,000 sq ft retail floor aren't the same job, and pretending one price fits both isn't honest. The walkthrough is free: we survey the facility, identify pressure points, and quote a program with frequency and scope in writing.",
    },
    {
      q: "Can you service outside our business hours?",
      a: "That's standard for restaurants and retail — service is scheduled around your operation so customers never see a treatment in progress. Your manager gets the documented report either way.",
    },
    {
      q: "Do you provide documentation for health inspections and corporate audits?",
      a: "Yes — every visit produces a service report covering what was inspected, found, and applied. Food-service clients keep a log on site; multi-location operators can get reporting per location.",
    },
    {
      q: "We're opening a new location in Town Madison — when should service start?",
      a: "Before you open. New commercial construction inherits the displaced pest population of the land it sits on, and the build-out phase (open doors, cardboard everywhere, food service testing) is peak exposure. Starting the program at fixture install means opening day starts clean.",
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Madison Service Area", href: "/service-areas/madison" },
  servicePage: { name: "Commercial Pest Control", href: "/services/commercial" },
  schemaName: "EnviroCare Commercial Pest Control — Madison, AL",
  canonicalPath: "/madison-commercial-pest-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
