// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/pricing/page.tsx
// Commit: feat(pricing): flat $75 initial service on all plans; de-list tick/flea pricing
// Push: main
// ─────────────────────────────────────
// app/pricing/page.tsx — server wrapper: metadata + JSON-LD (AEO)
// Interactive content lives in PricingContent.tsx ("use client").
// RULE: termite is never a flat number — schema lists it as a quote-after-inspection service.

import type { Metadata } from "next";
import PricingContent from "./PricingContent";
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata: Metadata = {
  title: "Pest Control Prices Alabama | $35/mo, $75 First Visit",
  description:
    "Real prices, published — no in-home visit needed. Pest from $35/mo, $75 initial service, mosquito $45/visit Mar–Oct. Termite quoted after a free WDO inspection.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pest Control Prices Alabama | $35/mo, $75 First Visit",
    description: "Real prices, published — no in-home visit needed. Pest from $35/mo, $75 initial service, mosquito $45/visit Mar–Oct. Termite quoted after a free WDO inspection.",
    url: 'https://www.envirocarellc.com/pricing',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pest Control Prices Alabama | $35/mo, $75 First Visit",
    description: "Real prices, published — no in-home visit needed. Pest from $35/mo, $75 initial service, mosquito $45/visit Mar–Oct. Termite quoted after a free WDO inspection.",
    images: ['/og-image.png'],
  },
};

// OfferCatalog — priced plans only. Termite is a Service with NO price (quote after free WDO inspection).
const OFFER_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "EnviroCare — Plans & Pricing",
  url: "https://www.envirocarellc.com/pricing",
  itemListElement: [
    {
      "@type": "Offer", name: "Pest Control", priceCurrency: "USD", price: "35",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "35", priceCurrency: "USD", unitText: "per month, ACH" },
      itemOffered: { "@type": "Service", name: "Bimonthly Pest Control", description: "Bimonthly perimeter pest control covering 30+ common Alabama pests including mice and rats, with unlimited free re-service. $75 initial service fee; monthly pricing uses a 12-month ACH billing agreement." },
    },
    {
      "@type": "Offer", name: "Pest + Mosquito", priceCurrency: "USD", price: "69",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "69", priceCurrency: "USD", unitText: "per month, ACH" },
      itemOffered: { "@type": "Service", name: "Pest + Seasonal Mosquito", description: "Bimonthly pest control plus seasonal mosquito (March–October). $75 initial service fee. Tick and flea add-ons available, quoted for your property." },
    },
    {
      "@type": "Offer", name: "Mosquito", priceCurrency: "USD", price: "45",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "45", priceCurrency: "USD", unitText: "per visit, 8 visits March–October" },
      itemOffered: { "@type": "Service", name: "Seasonal Mosquito Yard Treatment", description: "30-day yard barrier, billed per service (no monthly). Nine rounds March through October." },
    },
    {
      "@type": "Offer", name: "Mosquito + Tick", priceCurrency: "USD", price: "65",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "65", priceCurrency: "USD", unitText: "per visit, 8 visits March–October" },
      itemOffered: { "@type": "Service", name: "Seasonal Mosquito + Tick Yard Treatment", description: "Mosquito + tick yard barrier (covers chiggers), billed per service. Tick is offered only with mosquito." },
    },
    {
      // Termite — intentionally NO price (Alabama requires an on-site WDO inspection first).
      "@type": "Offer", name: "Sentricon® Termite Protection",
      itemOffered: { "@type": "Service", name: "Sentricon® Always Active™ Termite Protection", description: "Quoted after a free on-site WDO inspection (based on linear footage and foundation type). Up to $1,000,000 EnviroCare repair coverage, subject to the terms of the agreement. Available bundled with a pest plan ($75 initial service fee)." },
    },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is there a contract?", acceptedAnswer: { "@type": "Answer", text: "No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments." } },
    { "@type": "Question", name: "Why isn't there a flat termite price?", acceptedAnswer: { "@type": "Answer", text: "Alabama regulates termite treatment, so we do an on-site WDO inspection before quoting. Your Sentricon® price depends on your home's linear footage and foundation type. The inspection is always free." } },
    { "@type": "Question", name: "What is the initial service fee?", acceptedAnswer: { "@type": "Answer", text: "$75 on Pest and on Pest + Mosquito. Complete is $229, because it sets up termite protection as well. The first visit is a heavier treatment and there is no separate inspection fee. Mosquito booked alone has no initial fee; it is billed per service." } },
    { "@type": "Question", name: "Can I get mosquito or tick without a pest plan?", acceptedAnswer: { "@type": "Answer", text: "Yes — mosquito alone is $45 per visit and mosquito + tick is $65 per visit, eight rounds March through October, charged at each service. Tick is only offered alongside mosquito." } },
    { "@type": "Question", name: "What's the $1M EnviroCare coverage?", acceptedAnswer: { "@type": "Answer", text: "If termites cause structural damage while you're on active Sentricon® protection, EnviroCare covers repairs up to $1,000,000 — that coverage, subject to the terms of the agreement." } },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Pricing', path: '/pricing' }]) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(OFFER_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <PricingContent />
    </>
  );
}
