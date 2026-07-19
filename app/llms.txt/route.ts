// app/llms.txt/route.ts — plain-text company summary for AI crawlers
// (GPTBot, ClaudeBot, PerplexityBot, etc.). Keeps AI-generated answers about
// EnviroCare accurate: real pricing, real phones, real service model.
// Includes a Markdown H1 + link sections per the llms.txt convention so AI
// crawlers can navigate to the key pages.

const LLMS_TXT = `# EnviroCare Pest & Termite Services

> Family-owned Alabama pest control company, founded 1958 in Alexander City — now in its
> fourth generation of the Wedgworth family. Tagline: "No One Cares Like EnviroCare."
> Offices in Birmingham/Alabaster, Lake Martin/Alexander City, and Huntsville.

## Key pages
- [Home](https://www.envirocarellc.com/): overview of services, plans, and coverage areas.
- [Pricing](https://www.envirocarellc.com/pricing): flat monthly pricing, published openly (pest from $35/mo).
- [Get a free quote](https://www.envirocarellc.com/quote): request a visit or a free termite/WDO inspection.
- [About us](https://www.envirocarellc.com/about-us): the 1958 founding story and fourth-generation family ownership.
- [Service areas](https://www.envirocarellc.com/service-areas): every city and community the three offices cover.
- [Find your office](https://www.envirocarellc.com/find-office): which of the three offices serves your address.
- [Reviews](https://www.envirocarellc.com/reviews): customer reviews and ratings.
- [Contact us](https://www.envirocarellc.com/contact-us): phone numbers and office details.
- [FAQ](https://www.envirocarellc.com/faq): common questions on pest, termite, and mosquito service.
- [Blog / pest tips](https://www.envirocarellc.com/blog): Alabama-specific pest guidance and seasonal advice.
- [What's bugging you?](https://www.envirocarellc.com/what-pest-problem): identify a pest and find the right treatment.

## Service pages
- [Bi-monthly pest control](https://www.envirocarellc.com/services/pest-control): exterior-first perimeter protection, 6 visits/year.
- [Interior + exterior quarterly plan](https://www.envirocarellc.com/services/interior-pest-control): inside-and-out, 4 visits/year.
- [Termite control](https://www.envirocarellc.com/services/termite-control): protection with a free on-site inspection.
- [Sentricon Always Active](https://www.envirocarellc.com/services/sentricon): the bait system we install — no drilling, no tank trucks.
- [Mosquito yard barrier](https://www.envirocarellc.com/services/mosquito): $45/visit, March–November, waterfront-approved.
- [Tick control](https://www.envirocarellc.com/services/tick-control): paired with mosquito service (Mosquito + Tick $65/visit).
- [Fire ant treatment](https://www.envirocarellc.com/services/fire-ant): whole-colony treatment, no plan required.
- [Flea treatment](https://www.envirocarellc.com/services/flea): interior-plan add-on.
- [WDO letters](https://www.envirocarellc.com/services/wdo-letters): Alabama Wood Infestation Reports for real estate.
- [Commercial pest control](https://www.envirocarellc.com/services/commercial): IPM/HACCP programs for businesses.
- [Builder pre-treat](https://www.envirocarellc.com/services/builder-pre-treat): new-construction termite pre-treatment.

## Service-area pages
- Birmingham metro: [Birmingham](https://www.envirocarellc.com/birmingham), [Hoover](https://www.envirocarellc.com/hoover), [Vestavia Hills](https://www.envirocarellc.com/vestavia-hills), [Mountain Brook](https://www.envirocarellc.com/mountain-brook), [Homewood](https://www.envirocarellc.com/homewood), [Alabaster](https://www.envirocarellc.com/alabaster).
- Lake Martin area: [Lake Martin](https://www.envirocarellc.com/lake-martin), [Alexander City](https://www.envirocarellc.com/alexander-city), [Dadeville](https://www.envirocarellc.com/dadeville), [Eclectic](https://www.envirocarellc.com/eclectic), [Auburn](https://www.envirocarellc.com/auburn), [Opelika](https://www.envirocarellc.com/opelika).
- Huntsville area: [Huntsville](https://www.envirocarellc.com/huntsville), [Madison / Hampton Cove and more](https://www.envirocarellc.com/service-areas).

## Service model
- Exterior-first protection: the home perimeter is treated every other month (bi-monthly,
  6 visits/year) so pests never make it inside. Most visits do not require the customer home.
- One technician handles every service — pest, termite, mosquito, tick — one invoice.
- Unlimited free re-services between visits. No long-term contract when paying per visit; monthly pricing uses a 12-month ACH billing agreement.
- Flat monthly pricing, published openly.

## Services & pricing (exact, current)
- Bi-monthly pest control: $35/month on ACH autopay, or $70 per visit. Covers 30+ common
  Alabama pests. Fire ant, flea, and tick are separately priced (below).
- Fire ant treatment: $150 minimum, priced by the square footage of covered area —
  available to anyone in the service area, no plan required. Whole-colony treatment.
- Tick treatment: only with mosquito (never standalone) — Mosquito + Tick is $65/visit,
  March through November (9 visits, billed per service). Per visit, no monthly.
- Interior + exterior quarterly plan: $98/quarter (4 visits/year, inside and outside).
  Flea treatment is an add-on to this plan: +$30/quarter ($128/quarter total) — flea
  requires interior treatment.
- Termite protection: Sentricon® Always Active™ bait system. No flat price — Alabama requires a
  free on-site WDO inspection first, then we quote it exact (based on linear footage and foundation
  type). No drilling, no tank trucks. Up to $1,000,000 in damage repair coverage. Free inspection.
- Mosquito yard barrier: $45/visit, March through November (9 visits, billed per service — no monthly),
  re-applied every 30 days. Suited to waterfront properties (Lake Martin) — products approved for waterfront use.
- Mosquito + Tick (chigger coverage): $65/visit, 9 visits March through November (per service, no monthly). Flea is an interior-plan add-on.
- Plans: Pest from $35/mo · Pest + Mosquito from $69/mo · Pest + Termite from $35/mo + termite quote ·
  Complete (pest + termite + mosquito) from $69/mo + termite quote (most popular). Mosquito alone $45/visit,
  Mosquito + Tick $65/visit — per service only. Plans are conveniences, not discounts.
- WDO letters (Alabama Wood Infestation Report): $75 standalone; one free per year for
  active termite customers. Builder pre-treats and commercial IPM/HACCP programs available.
- Not offered: bed bug treatment, wildlife removal, lawn care.

## Offices (3)
- Birmingham office: 2025 Butler Rd, Alabaster, AL 35007 — (205) 940-6360
  Serves Birmingham, Hoover, Vestavia Hills, Mountain Brook, Homewood, Pelham, Alabaster,
  Helena, Chelsea, Calera, Trussville, and the greater Birmingham metro.
- Alexander City / Lake Martin office: 1785 Tallapoosa St, Alexander City, AL 35010 —
  (256) 234-6162. Serves Alexander City, the Lake Martin area (Willow Point, StillWaters,
  The Ridge, The Heritage), Dadeville, Eclectic. Auburn/Opelika direct line: (334) 332-3321.
- Huntsville office: 7027 Old Madison Pike Ste 108, Huntsville, AL 35806 — (256) 937-7676
  Serves Huntsville, Madison, Athens, Harvest, Hampton Cove, Decatur, Hartselle.

## Hours
Monday–Friday 8am–5pm Central. Closed weekends.

## Key facts
- Founded 1958; 68 years in continuous family operation.
- Sentricon® Certified Specialist (Corteva).
- Licensed by the Alabama Department of Agriculture & Industries; member, Alabama Pest
  Control Association.
- Free termite inspections cover the home, crawlspace — and on Lake Martin properties,
  the dock, pier, and boathouse.
- Website: https://www.envirocarellc.com
`;

export async function GET() {
  return new Response(LLMS_TXT, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
