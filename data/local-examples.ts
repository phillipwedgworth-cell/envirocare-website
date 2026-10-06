// data/local-examples.ts
// ─────────────────────────────────────────────────────────────────────────────
// "What a job looks like here" — typical local situations per city page.
//
// WHY (2026-10-05): Local Falcon's Sep 10 AI run had Huntsville at 12% Share of
// AI Voice ("termite treatment in huntsville" 5.56%, Madison 11.11%) and
// Birmingham's general queries at 0%. AI answers lean on pages that explain a
// real local service in concrete terms. This adds that, without inventing proof.
//
// RULES FOR THIS FILE — read before adding an entry:
//   1. These are TYPICAL SITUATIONS, not customer stories. No names, no addresses,
//      no "Mrs. Smith in Hampton Cove", no results ("termites gone in 3 days").
//      The component labels them that way on the page. If real, verified jobs
//      become available (with permission), add them as a separate field.
//   2. Every claim must already be true of the service as sold: data/pricing.ts,
//      the compliance canon in AGENTS.md and data/compliance.ts. No "unlimited",
//      no same-day/availability promises, no safety claims, no "eliminate" for
//      mosquitoes, $1M only as EnviroCare's coverage "subject to the terms of the
//      agreement".
//   3. `href` must be an existing route; test:source scans this file.
// ─────────────────────────────────────────────────────────────────────────────

export type LocalExample = {
  /** The situation, in the homeowner's / manager's words. */
  situation: string;
  /** Where in this market it typically shows up. */
  where: string;
  /** What EnviroCare actually does, step by step, in plain terms. */
  approach: string;
  /** Existing page that sells this service. */
  href: string;
  linkText: string;
};

export const LOCAL_EXAMPLES: Record<string, LocalExample[]> = {
  huntsville: [
    {
      situation: 'Winged insects on a windowsill in spring, and the house is older',
      where: 'Twickenham, Five Points, Blossomwood and Monte Sano homes on crawlspaces or original brick',
      approach:
        'A free termite inspection first: crawlspace, sill plates, porches and anywhere wood meets soil, looking for mud tubes and damaged wood, and identifying whether the swarmers are termites or ants. If termites are active, Sentricon® Always Active™ bait stations go in around the perimeter — no drilling into original masonry — and are serviced on schedule, with up to $1,000,000 in EnviroCare damage repair coverage, subject to the terms of the agreement.',
      href: '/huntsville-termite-control',
      linkText: 'Termite control in Huntsville',
    },
    {
      situation: 'A new house, and the builder’s termite pretreatment is aging out',
      where: 'Newer subdivisions in Madison, Harvest, Meridianville and the Research Park corridor',
      approach:
        'New slabs sit on disturbed soil, and a slab gives no warning before termites reach the framing. We inspect, explain how long the original pretreatment was meant to protect the house, and quote Sentricon® monitoring so protection does not lapse. The quote is in writing after the inspection — termite work is never priced over the phone.',
      href: '/madison-termite-control',
      linkText: 'Termite protection in Madison',
    },
    {
      situation: 'An office, lab or data facility that cannot have routine spraying indoors',
      where: 'Cummings Research Park, Madison and the Highway 72 / I-565 corridors',
      approach:
        'An Integrated Pest Management program instead of a spray schedule: exclusion at doors and utility penetrations, monitoring stations logged on every visit, and targeted gel baits only where activity is found. Service records are kept for facility managers and auditors.',
      href: '/services/commercial',
      linkText: 'Commercial pest control',
    },
    {
      situation: 'Ants and spiders keep coming back between DIY treatments',
      where: 'Jones Valley, South Huntsville, Hampton Cove and Providence',
      approach:
        'The first visit is a full initial service, with interior treatment where it is needed. After that, the exterior perimeter — foundation, entry points, eaves and the shaded side of the house — is treated every other month, so pests are stopped before they come inside. If pests show up between visits, call and we come back out at no extra charge.',
      href: '/services/pest-control',
      linkText: 'Recurring home pest control',
    },
  ],
  madison: [
    {
      situation: 'A new house, and the builder’s termite pretreatment is aging out',
      where: 'Town Madison, Clift Farm and the US-72 corridor',
      approach:
        'We inspect, explain how long the original pretreatment was meant to protect the house, and quote Sentricon® monitoring so protection does not lapse — with up to $1,000,000 in EnviroCare damage repair coverage, subject to the terms of the agreement.',
      href: '/madison-termite-control',
      linkText: 'Termite protection in Madison',
    },
    {
      situation: 'A business near Research Park that needs documented pest control',
      where: 'Offices, restaurants and warehouses along Madison Boulevard and Zierdt Road',
      approach:
        'Integrated Pest Management: exclusion, monitoring stations checked and logged every visit, and targeted treatment only where activity is found, with records kept for managers and inspectors.',
      href: '/madison-commercial-pest-control',
      linkText: 'Commercial pest control in Madison',
    },
  ],
  birmingham: [
    {
      situation: 'Termite swarmers or mud tubes in an older Birmingham house',
      where: 'Forest Park, Crestwood, Highland Park and Southside homes on crawlspaces',
      approach:
        'A free inspection of the crawlspace, piers and sill plates, then Sentricon® Always Active™ bait stations around the house — no drilling into original brick or tile — serviced on schedule, with up to $1,000,000 in EnviroCare damage repair coverage, subject to the terms of the agreement.',
      href: '/birmingham-termite-control',
      linkText: 'Termite control in Birmingham',
    },
    {
      situation: 'Roaches and ants in a house that is otherwise kept clean',
      where: 'Homewood, Vestavia Hills, Mountain Brook and Hoover',
      approach:
        'Large outdoor roaches and ants come in from mulch beds, gutters and shaded foundations. The first visit is a full initial service, with interior treatment where it is needed; after that the exterior perimeter is treated every other month, and if pests show up between visits we come back out at no extra charge.',
      href: '/services/pest-control',
      linkText: 'Recurring home pest control',
    },
    {
      situation: 'A restaurant or office that needs inspection-ready pest records',
      where: 'Downtown, Lakeview, Southside and the UAB area',
      approach:
        'Integrated Pest Management: exclusion, monitoring stations logged every visit, and targeted treatment where activity is found, with service records kept for health inspections and audits.',
      href: '/services/commercial',
      linkText: 'Commercial pest control',
    },
    {
      situation: 'The backyard is unusable from mosquitoes by June',
      where: 'Yards near Shades Creek, Village Creek and the Cahaba River',
      approach:
        'A yard barrier treatment every 30 days from March through October, aimed at shaded shrubs, the undersides of leaves and standing-water spots, to significantly reduce mosquito activity around the house.',
      href: '/birmingham-mosquito-control',
      linkText: 'Mosquito control in Birmingham',
    },
  ],
};
