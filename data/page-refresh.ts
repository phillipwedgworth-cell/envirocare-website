// data/page-refresh.ts — NeuronWriter-scored content and images added to existing pages.
//
// WHY THIS FILE EXISTS (2026-10-12)
// ---------------------------------------------------------------------------
// The content-refresh agent (agents/content-refresh.mjs) improves EXISTING pages
// instead of minting new URLs. It never edits a page component: it writes one
// entry here, keyed by route, and components/RefreshedContent.tsx renders that
// entry inside CityPage, ServicePage, ComboPage and the custom /birmingham page.
// One file, one diff, one place to review or roll back.
//
// This is a .ts file on purpose: scripts/scan-source-compliance.mjs scans .ts but
// not .json, so every sentence written here passes through the same compliance
// guard as hand-written page copy. scripts/test-page-refresh.mjs adds the
// refresh-specific checks (image exists, score recorded, originality recorded).
//
// The agent rewrites ONLY the JSON between the BEGIN/END markers below, so keep
// that block valid JSON (double quotes, no trailing commas, no comments inside).
//
// An entry is published only when it passed every gate: NeuronWriter score up
// (and inside the 65-85 band — never chase 100), compliance scan clean, and
// originality check clean against the competitor pages NeuronWriter analysed and
// against every other EnviroCare page. The numbers that justified it travel with
// it in `neuron` and `originality`, so a reviewer can see why it shipped.

export type RefreshFigure = {
  src: string;        // a file under /public — test:page-refresh fails if it is missing
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type PageRefresh = {
  heading?: string;
  paragraphs?: string[];
  faqs?: { q: string; a: string }[];
  figure?: RefreshFigure;
  neuron: {
    queryId: string;
    keyword: string;
    before: number | null;  // evaluate-content on the page as it was
    after: number | null;   // evaluate-content on the page with this entry
    checkedAt: string;      // YYYY-MM-DD
  };
  originality?: {
    maxCompetitorOverlap: number; // 0-1, 8-word shingle containment vs NeuronWriter's SERP pages
    maxSiteOverlap: number;       // 0-1, vs every other EnviroCare page
    competitorsChecked: number;
    checkedAt: string;
  };
  source: 'claude-session' | 'content-refresh-agent';
  provider?: string;   // which model drafted it (claude:… / gpt:… / gemini:…) — every provider passes the same gates
  updatedAt: string;
};

/* BEGIN PAGE_REFRESH_JSON */
const PAGE_REFRESH_JSON = {
  "/huntsville-termite-control": {
    "heading": "Termite treatment and pest control services in Huntsville, AL: what homeowners ask",
    "figure": {
      "src": "/residential-singlefamily.webp",
      "alt": "Round green termite bait station caps set flush in the lawn beside a landscaped flower bed in front of a house",
      "caption": "In-ground bait stations sit flush with the lawn along the foundation, so the yard and beds stay intact.",
      "width": 859,
      "height": 572
    },
    "paragraphs": [
      "Most Huntsville homeowners first notice signs of termite activity in one of three ways. In late winter and spring, small dark swarmers with long, equal-length wings come out near windows, doors or light fixtures and leave little piles of shed wings behind. The rest of the year the clue is usually mud tubes: pencil-wide tunnels of soil running up a foundation wall, a crawl space pier or the edge of a slab. The third is the damage itself, such as baseboard that sounds hollow when tapped, paint that bubbles, or a floor that feels soft beside a bathroom or exterior door. Flying ants get mistaken for termites every spring. An ant has a pinched waist and elbowed antennae; a termite has a straight waist and straight antennae. If you are not sure which one you found, keep a few in a sealed bag and show them to the inspector.",
      "The termite most common in Huntsville is the Eastern subterranean termite. Colonies live in the soil, need steady moisture, and reach wood through expansion joints, cracks and plumbing penetrations. North Alabama clay and Tennessee Valley humidity keep them foraging for most of the year, so termite protection in the Huntsville area works best as regular termite inspections and continuous monitoring rather than a one-time event. Spraying the termites you can see only kills those workers; the colony underground keeps feeding. That is why every termite infestation we look at starts with a free inspection and a treatment plan aimed at the colony, not the symptom.",
      "How long does termite treatment last, and what does it cost in Huntsville? With a Sentricon® program, protection continues for as long as the agreement stays active: the stations stay in the ground, they are serviced on schedule, and renewal keeps monitoring and EnviroCare repair coverage in place, subject to the terms of the agreement. Price depends on the house itself, including the length of the foundation, the construction type and whether termites are already active, so termite control in Huntsville is quoted in writing after the inspection and never over the phone.",
      "Choosing a termite company in Huntsville? In Alabama a termite agreement is often called a termite bond, and before you sign one with any pest control company or exterminator it is worth asking what it includes: how often the stations or treated areas are inspected, what happens if termite activity shows up, whether repair coverage is part of it and on what terms, and what the yearly renewal requires. Our Huntsville pest control team puts those answers in writing, and the termite inspection that starts the process is free.",
      "Termites are only one of the pests in Huntsville that a homeowner deals with. Many customers pair termite protection with our bi-monthly pest control service, which treats around your home for household pests such as ants, spiders, cockroaches and silverfish, with free re-service if pest activity shows up between visits; treating active wasp and hornet nests can be added for an additional charge. Mice and rats are part of the plan: entry points are sealed during regular visits, and if rodents show up in between, we come back out; mosquito control and tick control run as seasonal programs from March through October. For a home or business, including commercial pest control for offices and facilities near Research Park, it is one local, professional pest control company working from one Huntsville office on Old Madison Pike."
    ],
    "faqs": [
      {
        "q": "Do I need year-round termite protection in Huntsville?",
        "a": "Subterranean termites stay active in the soil through most of the year in North Alabama, and a spring swarm is only the visible part of the cycle. For Huntsville homes, especially slab homes where activity is hard to see, we recommend continuous monitoring with an annual inspection rather than waiting for a sign."
      },
      {
        "q": "Does termite treatment mean tenting the house or moving out?",
        "a": "No. Tenting and fumigation are used for drywood termites. Subterranean termite baiting happens in the soil around the outside of the home, so you stay in the house while the stations are installed."
      },
      {
        "q": "How can I make my home less attractive to termites?",
        "a": "Keep mulch and soil a few inches below siding and pulled back from the foundation, fix dripping spigots and gutters that keep the soil wet, store firewood off the ground and away from the house, and keep crawl space vents clear so the space can dry out. These steps reduce the conditions termites look for. They do not replace an inspection."
      },
      {
        "q": "Do you offer pest control services in Huntsville beyond termites?",
        "a": "Yes. Beyond termite treatment, our Huntsville pest control plans cover ants, roaches, spiders and other household pests, and seasonal programs reduce mosquito and tick activity around the yard. Most customers keep termite protection and pest control on the same account with the same local office."
      }
    ],
    "neuron": {
      "queryId": "9ada25dd3b56aaff",
      "keyword": "termite control huntsville al",
      "before": 39,
      "after": 70,
      "checkedAt": "2026-10-12"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.003,
      "competitorsChecked": 28,
      "checkedAt": "2026-10-12"
    },
    "source": "claude-session",
    "updatedAt": "2026-10-12"
  },
  "/lake-martin": {
    "heading": "Pest control for Lake Martin vacation homes and year-round residents",
    "figure": {
      "src": "/lake-martin-sunset.webp",
      "alt": "Wooden dock reaching into a calm lake at sunset, framed by tall pine trees along the shoreline",
      "caption": "Docks, shaded coves and shoreline vegetation hold the moisture and shelter that mosquitoes, spiders and termites look for.",
      "width": 576,
      "height": 448
    },
    "paragraphs": [
      "Whether the house on the water is a full-time residence or a weekend place, the questions we hear around Lake Martin are the same: which pests are common here, does a lake home really need termite protection, and how does service work when nobody is home. A lake property sits where moisture, shade and shoreline vegetation meet, and that combination lets a small pest problem grow longer than it would in town.",
      "For vacation homes, the treatment plan follows the calendar rather than the owner's schedule. Exterior pest control service, mosquito control and termite station checks are done on route whether the house is occupied or not, and interior visits can be set around a weekend you plan to be at the lake. Owners in Dadeville, Alexander City, Eclectic and the communities around Lake Martin all use the same residential pest control program from our Alex City office.",
      "Do Lake Martin homes need termite protection? Most do. Subterranean termites follow moisture, and lake properties have plenty of it: soil that stays damp near the water, wooden docks and boathouses, and crawl spaces under homes built into the slope. A free termite inspection covers the house and the outbuildings, and termite control is quoted after that inspection so the plan fits the property. Long-term protection comes from keeping monitoring in place year after year.",
      "Fire ants are common on cleared lots and on lawns that run down to the shoreline, and whole-yard fire ant treatment is a separate service priced by property size. Marinas, restaurants and rental properties around the lake can use our commercial pest control program, which keeps a service record for every visit. For a free estimate on pest and termite service at your Lake Martin property, call (256) 234-6162."
    ],
    "faqs": [
      {
        "q": "What are the most common pests around Lake Martin homes?",
        "a": "Mosquitoes, ticks and spiders near the water; wasps under docks and boathouse eaves; ants, roaches and mice inside, especially while the house sits empty; and subterranean termites in damp soil and wood. A bi-monthly exterior program handles most of the list; treating active wasp and hornet nests can be added for an additional charge, and mosquito, tick and termite protection are added to fit the property."
      }
    ],
    "neuron": {
      "queryId": "694f16db9cb26dcb",
      "keyword": "pest control lake martin al",
      "before": 69,
      "after": 75,
      "checkedAt": "2026-10-12"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.006,
      "competitorsChecked": 27,
      "checkedAt": "2026-10-12"
    },
    "source": "claude-session",
    "updatedAt": "2026-10-12"
  },
  "/huntsville": {
    "figure": {
      "src": "/huntsville-saturn-v.webp",
      "alt": "Tall white rocket on display under a bright blue sky with scattered clouds",
      "caption": "The Rocket City. Huntsville and Madison County homes are served from our office at 7027 Old Madison Pike, Ste 108.",
      "width": 1400,
      "height": 1089
    },
    "neuron": {
      "queryId": "c42659f7ac3e2ac5",
      "keyword": "pest control huntsville al",
      "before": 75,
      "after": null,
      "checkedAt": "2026-10-12"
    },
    "source": "claude-session",
    "updatedAt": "2026-10-12"
  },
  "/birmingham": {
    "figure": {
      "src": "/birmingham-vulcan.webp",
      "alt": "The Vulcan statue raising a spear point against a deep blue evening sky",
      "caption": "Vulcan over the Magic City. Our Birmingham office is at 2120 16th Ave S, Ste 302.",
      "width": 1200,
      "height": 800
    },
    "neuron": {
      "queryId": "96c200a1ac6b9d72",
      "keyword": "pest control birmingham al",
      "before": 74,
      "after": null,
      "checkedAt": "2026-10-12"
    },
    "source": "claude-session",
    "updatedAt": "2026-10-12"
  },
  "/services/termite-control": {
    "figure": {
      "src": "/sentricon-install.webp",
      "alt": "Gloved hand pressing a termite bait station into the soil of a green lawn",
      "caption": "Bait stations go into the soil around the house. No drilling through slabs, patios or driveways.",
      "width": 606,
      "height": 403
    },
    "neuron": {
      "queryId": "97fb2605149953ae",
      "keyword": "termite control birmingham al",
      "before": 73,
      "after": null,
      "checkedAt": "2026-10-12"
    },
    "source": "claude-session",
    "updatedAt": "2026-10-12"
  },
  "/pelham": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "Choosing Professional Pest Control in Pelham, AL",
    "paragraphs": [
      "Pelham's mix of wooded ridgelines, creek-bottom moisture, and established neighborhoods creates year-round pest pressure that a one-time extermination visit rarely resolves. Effective pest management treats the problem as ongoing, not episodic — which is why EnviroCare's bi-monthly perimeter program is structured around consistent, preventative visits rather than reactive calls after an infestation has already taken hold. Staying ahead of pest issues costs less, causes less disruption, and keeps your home or business protected through every season.",
      "When Pelham homeowners evaluate pest control companies, a few things consistently separate reliable professional pest control from a generic spray-and-go visit. First, look for a company that focuses on entry points and exterior harborage zones — the places along your foundation, eave lines, and crawlspace vents where ants, roaches, spiders, and rodents actually enter — rather than only treating what is already visible inside. Second, ask whether re-service between scheduled visits costs extra. With EnviroCare, if a pest problem returns between your scheduled visits, the follow-back visit is included at no additional charge.",
      "Pelham's commercial corridor along U.S. 31 and Veterans Parkway includes restaurants, retail spaces, and service businesses that face distinct pest control needs and, in some cases, regulatory documentation requirements. Commercial pest control services for Pelham businesses are structured around your operating hours and inspection schedules — rodent control, cockroach management, and wasp pressure around loading docks and dumpster areas are among the most common issues our technicians address in commercial accounts. EnviroCare's Alabaster office serves both residential and commercial customers throughout Shelby County.",
      "Rodent pressure in Pelham tends to increase in late fall as cooler temperatures push mice and rats toward heated structures. Attic spaces, crawlspaces, and gaps around utility penetrations are common entry points. Addressing a rodent problem effectively means locating and sealing those entry points alongside any trapping or treatment — otherwise new activity replaces whatever was removed. Spiders, particularly brown recluse, follow rodents and other insects into the same voids, so a property with rodent activity often shows elevated spider pressure as well.",
      "EnviroCare is Alabama pest control that has operated in Central Alabama across four generations of the same family. That continuity means the technician on your route understands Shelby County soil conditions, seasonal pest cycles along the Oak Mountain corridor, and the specific pest issues that show up on wooded Pelham lots — not a customized treatment plan in name only, but local knowledge applied to actual local conditions. Whether your concern is a current infestation or preventative protection before one develops, the first step is a free inspection and an honest conversation about what your property needs."
    ],
    "faqs": [
      {
        "q": "What should I look for when choosing a pest control service in Pelham, AL?",
        "a": "Look for a licensed company that treats the exterior perimeter on every visit, includes re-service between scheduled visits at no extra charge, and has direct knowledge of the pest pressures specific to Shelby County — wooded edges, creek-bottom moisture, and the tick and mosquito pressure that comes off Oak Mountain. Ask whether pricing is clear upfront and whether billing terms are explained in writing before service starts."
      },
      {
        "q": "Does EnviroCare handle roach and rodent problems in Pelham?",
        "a": "Yes. Cockroach and rodent control are part of the residential pest program. American roaches typically enter from the exterior, while German roaches are more often tied to interior conditions like kitchens. Rodents are addressed through targeted treatments focused on entry points and active harborage areas. Both are covered under the bi-monthly perimeter program, and a technician can assess the specific situation during your free inspection."
      },
      {
        "q": "Do you offer commercial pest control services in Pelham?",
        "a": "Yes. EnviroCare provides commercial pest control in Pelham for restaurants, offices, retail locations, and other businesses. Service schedules are built around your operation, and documentation is available for inspections and compliance purposes. Call the Alabaster office at (205) 940-6360 to talk through what your facility needs."
      },
      {
        "q": "Are wasps covered in the regular pest plan?",
        "a": "Routine bi-monthly visits include treatment along eave lines that discourages wasps and hornets from building. Treating an active nest is an add-on service for existing pest customers at an additional charge. If you are seeing wasp activity around your home, mention it when you call and a technician can assess the situation."
      }
    ],
    "neuron": {
      "queryId": "a8b06ae41c72fafe",
      "keyword": "pest control pelham al",
      "before": 68,
      "after": 85,
      "checkedAt": "2026-10-27"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.001,
      "competitorsChecked": 27,
      "checkedAt": "2026-10-27"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-10-27"
  },
  "/chelsea": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "What to Expect From Professional Pest Control in Chelsea, AL",
    "paragraphs": [
      "Chelsea homeowners dealing with a pest problem often wonder whether to call a professional exterminator or handle it themselves. Store-bought sprays and traps can knock back visible insects temporarily, but they rarely address the conditions that let an infestation take hold in the first place. A thorough pest management approach starts with an inspection of the full property — foundation perimeter, eave lines, entry points around plumbing, and the wooded edges that back up to so many Chelsea lots. That initial walkthrough shapes every service that follows.",
      "EnviroCare's exterior-first method targets the places insects and rodents actually use to enter a home — before they reach living spaces. Treating the outside perimeter with EPA-registered products applied according to label directions, clearing conducive conditions around the foundation, and addressing common pest pressure points like eaves and utility penetrations makes each follow-up visit more effective than the last. Indoor treatments are used when conditions call for them, not as a default. That approach is one of the things that separates a genuine pest control solution from a one-time spray visit.",
      "Common pests in Chelsea include Eastern subterranean termites, carpenter ants, odorous house ants, cockroaches, wolf spiders, black widows, brown recluses, and rodents that push toward homes as surrounding woodland is cleared for new development. Many of these insects are disease-carrying or capable of serious structural damage, which is why a consistent bi-monthly schedule — rather than a single seasonal visit — keeps population pressure low year-round. Re-service between scheduled visits is included at no extra charge when pest activity returns, so homeowners are never left waiting until the next routine appointment.",
      "Choosing among pest control companies in Chelsea comes down to local expertise, transparency about what a plan covers, and a track record built in this specific region. A company that has worked Shelby County's red clay, creek drainages, and fast-growing neighborhoods understands the seasonal shifts that drive cockroach pressure indoors in fall, spider activity in late summer, and rodent movement in cooler months. That kind of local knowledge, developed across four generations of doing pest control in Alabama, is what makes pest prevention effective over the long term rather than just in the weeks after a first visit.",
      "For Chelsea homeowners weighing pest control options, the most practical step is a free on-site inspection. Conditions vary enough between a wooded Westover lot and a newer Chelsea Park build that a property-specific look is worth more than any general estimate. From that starting point, EnviroCare outlines exactly which pests are active, which entry points need attention, and which plan fits the property's needs — with straightforward pricing and a schedule built around how Chelsea's pest season actually runs. Call (205) 940-6360 to schedule."
    ],
    "faqs": [
      {
        "q": "What are the most common pests in Chelsea, Alabama?",
        "a": "Eastern subterranean termites are the most consequential pest in the area, given Chelsea's clay soil and wooded surroundings. Beyond termites, the pests EnviroCare treats most often in Chelsea include carpenter ants, fire ants, cockroaches, wolf spiders, brown recluses, rodents moving in from cleared woodland, and mosquitoes breeding in low-lying areas and creek drainages. The bi-monthly pest plan covers 30-plus common household insects and rodents; fire ants, mosquitoes, fleas, and ticks are handled as separate services."
      },
      {
        "q": "How often should pest control treatments be scheduled in Chelsea?",
        "a": "EnviroCare's standard residential pest plan runs on a bi-monthly schedule — six visits per year, every other month. That frequency keeps populations from rebounding between visits and allows a licensed technician to catch changing conditions, new entry points, or signs of activity before a minor pest problem becomes a full infestation. If activity returns between scheduled visits, re-service is included at no additional charge."
      },
      {
        "q": "Is professional pest control more effective than DIY methods?",
        "a": "DIY insecticides can reduce visible bug activity in the short term, but they typically do not address the conditions that draw pests to a property or the entry points they use. Professional pest control combines an inspection-based approach, EPA-registered products applied according to label directions, and a consistent follow-up schedule — all of which produce more durable results than off-the-shelf solutions applied without a full property assessment."
      },
      {
        "q": "How do I choose a pest control company in Chelsea, AL?",
        "a": "Look for a company that inspects before it treats, is transparent about what each plan covers and excludes, and has genuine local experience in Shelby County. Ask whether re-service between scheduled visits is included, how termite coverage is structured, and whether the company handles the specific pests active on your property type. EnviroCare serves Chelsea from its Alabaster office and has worked this part of Alabama across four generations — call (205) 940-6360 to start with a free inspection."
      }
    ],
    "neuron": {
      "queryId": "6790463f44b7e994",
      "keyword": "pest control chelsea al",
      "before": 67,
      "after": 80,
      "checkedAt": "2026-10-27"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.005,
      "competitorsChecked": 25,
      "checkedAt": "2026-10-27"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-10-27"
  },
  "/greystone": {
    "provider": "gpt:gpt-5.6-luna",
    "heading": "What to Expect From Pest Control in Greystone, AL",
    "paragraphs": [
      "Professional pest control in Greystone starts with understanding the property, not applying the same treatment everywhere. A wooded lot near a pond, a home beside a golf-course corridor, and a newer house near active construction can have different entry points and pest pressure. An inspection helps identify gaps around doors and windows, foundation edges, utility penetrations, roofline areas, vegetation touching the structure, and places where moisture collects. The treatment plan can then focus on the routes pests use to reach the home.",
      "EnviroCare uses an exterior-first approach for residential pest control in the Greystone community. Service focuses on the foundation perimeter, eaves, entry points, and outdoor harborage areas before interior treatment is considered. EPA-registered products are applied according to label directions. Homeowners can also reduce pest issues by keeping firewood and stored materials away from the structure, correcting leaks, trimming vegetation back from siding, and keeping screens and door sweeps in good repair. These steps support the control service but do not replace professional treatment when activity is established.",
      "Greystone homeowners may notice different pest issues as the seasons change. Ants and spiders often follow landscaping and shaded edges, while cockroaches and occasional rodents may enter through small openings around attached structures or utility lines. Wasps and hornets commonly investigate eaves, soffits, deck rails, and other sheltered locations. Routine pest visits include eave treatment intended to discourage nest building. An active wasp or hornet nest is handled as an additional service for pest customers. Rodent control is also available for homes and businesses after an assessment of activity and likely entry points.",
      "The right service schedule depends on the pest, the property, and the surrounding habitat. Consistent visits help address new activity before it becomes a larger infestation, while targeted services may be appropriate for fire ants, mosquitoes, ticks, termites, or rodents. When comparing pest control companies serving the Birmingham area, ask what the regular plan covers, how re-service is handled, which issues require separate treatment, and how products are applied. EnviroCare serves Greystone, including Founders, Legacy, and Farms, as part of its Central Alabama pest management service. Call (205) 940-6360 to discuss the property and arrange a free inspection."
    ],
    "faqs": [
      {
        "q": "How often should pest control treatments be done in Greystone?",
        "a": "A regular schedule helps manage changing pest pressure around wooded lots, landscaped yards, golf-course areas, and homes near water features. The appropriate frequency depends on the property and the pests present. An inspection can help determine whether general service or a targeted treatment plan is appropriate."
      },
      {
        "q": "What pests are common around Greystone homes?",
        "a": "Greystone properties may experience ants, spiders, cockroaches, rodents, wasps, hornets, fire ants, mosquitoes, ticks, and termites. Pest pressure varies with landscaping, construction, moisture, wooded edges, and nearby water."
      },
      {
        "q": "What should I look for when choosing a pest control service?",
        "a": "Ask whether the company explains the inspection findings, identifies entry points, states what the regular plan includes, and separates covered pests from specialized services. It is also reasonable to ask whether products are EPA-registered and applied according to label directions."
      }
    ],
    "neuron": {
      "queryId": "34cb05aa899eaa26",
      "keyword": "pest control greystone al",
      "before": 52,
      "after": 68,
      "checkedAt": "2026-10-27"
    },
    "originality": {
      "maxCompetitorOverlap": 0.002,
      "maxSiteOverlap": 0.006,
      "competitorsChecked": 28,
      "checkedAt": "2026-10-27"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-10-27"
  }
} as const;
/* END PAGE_REFRESH_JSON */

export const PAGE_REFRESH: Record<string, PageRefresh> = PAGE_REFRESH_JSON as unknown as Record<string, PageRefresh>;

// Keys are a route ("/lake-martin") or a route plus a section slug
// ("/lake-martin#tick") for an extra keyword section on the same page — the agent
// never creates new URLs. Returns every section for the route: main entry first,
// then the "#" sections in key order.
export function getPageRefreshSections(route: string): { key: string; entry: PageRefresh }[] {
  const base = route === '/' ? '/' : route.replace(/\/+$/, '');
  return Object.keys(PAGE_REFRESH)
    .filter((k) => k === base || k.startsWith(`${base}#`))
    .sort((a, b) => (a === base ? -1 : b === base ? 1 : a.localeCompare(b)))
    .map((key) => ({ key, entry: PAGE_REFRESH[key] }));
}

export function getPageRefresh(route: string): PageRefresh | undefined {
  const key = route === '/' ? '/' : route.replace(/\/+$/, '');
  return PAGE_REFRESH[key];
}
