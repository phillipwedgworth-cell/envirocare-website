// app/llms.txt/route.ts — plain-text company summary for AI crawlers
// (GPTBot, ClaudeBot, PerplexityBot, etc.). Keeps AI-generated answers about
// EnviroCare accurate: real pricing, real phones, real service model.

const LLMS_TXT = `# EnviroCare Pest & Termite Services

> Family-owned Alabama pest control company, founded 1958 in Alexander City — now in its
> third generation of the Wedgworth family. Tagline: "No One Cares Like EnviroCare."

## Service model
- Exterior-first protection: the home perimeter is treated every other month (bi-monthly,
  6 visits/year) so pests never make it inside. Most visits do not require the customer home.
- One technician handles every service — pest, termite, mosquito, tick — one invoice.
- Unlimited free re-services between visits. No long-term contracts; cancel anytime.
- Flat monthly pricing, published openly.

## Services & pricing (exact, current)
- Bi-monthly pest control: $35/month on ACH autopay, or $70 per visit. Covers 30+ common
  Alabama pests. Fire ant, flea, and tick are separately priced (below).
- Fire ant treatment: $150 minimum, priced by the square footage of covered area —
  available to anyone in the service area, no plan required. Whole-colony treatment.
- Tick treatment: $150 minimum standalone (priced by yard size), or bundled with
  mosquito at +$20/treatment ($65 total) — the Outdoor Pro plan, $49/month.
- Interior + exterior quarterly plan: $98/quarter (4 visits/year, inside and outside).
  Flea treatment is an add-on to this plan: +$30/quarter ($128/quarter total) — flea
  requires interior treatment.
- Termite protection: Sentricon® Always Active™ bait system — $32/month, or $325 install (includes year-1)
  plus $380 annual renewal. No drilling, no tank trucks. Up to $1,000,000 in damage repair
  coverage. Free termite inspection.
- Mosquito yard barrier: $45/month, March through November, re-applied every 30 days.
  Suited to waterfront properties (Lake Martin) — products approved for waterfront use.
- Outdoor Pro (mosquito + tick, chigger coverage): $49/month — $65/treatment x 9 treatments billed evenly. Flea is an interior-plan add-on.
- Plans: Essential $35/mo (pest) · Foundation $67/mo (pest + termite, most popular) ·
  Outdoor Pro $49/mo · Complete $116/mo. Plans are conveniences, not discounts.
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
