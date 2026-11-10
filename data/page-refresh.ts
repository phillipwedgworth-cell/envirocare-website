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
    "provider": "claude:claude-sonnet-4-6",
    "heading": "What to Expect From Pest Control Services in Huntsville, AL",
    "paragraphs": [
      "Huntsville residents deal with a pest calendar that rarely goes quiet. The Tennessee Valley's warm, humid climate means insects and rodents stay active longer than in cooler parts of the country, and the red clay soil across Madison County holds moisture against foundations in ways that keep subterranean termite pressure elevated through every season. Effective pest control in Huntsville starts with understanding those local conditions rather than applying a generic treatment plan built for somewhere else.",
      "EnviroCare's exterior-first approach treats the perimeter, harborage zones, and entry points around your home before pests reach the interior. Insects and rodents typically follow food sources, moisture, and shelter cues from outside the structure, so addressing those pressure points on a regular schedule is the most reliable way to keep your home and business protected. Interior treatments are added when pest activity calls for them, but the goal of every visit is to stop the problem at the source.",
      "A bi-monthly treatment plan covers cockroaches, ants, spiders, wasps, rodents, and more than 30 other common Alabama pests, with free re-service between scheduled visits if something shows up. Wasp and hornet eave treatment is included on routine visits to discourage nesting; treating an active nest is an add-on available to pest control customers. For homeowners dealing with a rodent infestation or signs of termites, the first step is a thorough inspection so the right control methods are matched to what is actually happening on that property. Standing water, wood-to-soil contact, gaps around utility penetrations, and cluttered crawl spaces are the conditions our technicians look for and address as part of every visit.",
      "Huntsville homes and businesses in Huntsville face different pest pressures depending on location, age of the structure, and surrounding terrain. Older neighborhoods near Monte Sano and Twickenham see more termite infestation risk in original foundations; newer construction off Research Park Boulevard and in Hampton Cove sits on graded clay that favors fire ant activity and rodent control challenges as neighborhoods are built out. A treatment plan that works in one part of the city may need to be adjusted for another. EnviroCare's local team has worked these routes long enough to recognize those differences and build pest solutions around them.",
      "Pest control near you matters when the person treating your home understands the specific pest issues Huntsville's terrain creates. Residential and commercial customers across Madison County - from a single-family home in Harvest to a food-service operation near Cummings Research Park - get the same exterior-first, EPA-registered-product approach, applied according to label directions and adjusted to what the property actually needs. For pest control needs that go beyond a standard plan, a free inspection is always the right starting point. Call (256) 937-7676 to schedule yours."
    ],
    "faqs": [
      {
        "q": "Why is year-round pest control important for Huntsville homeowners?",
        "a": "Huntsville's mild winters and humid summers allow many pest species to remain active well past the point that colder climates would knock them back. Ants, cockroaches, rodents, and subterranean termites do not follow a simple seasonal schedule in North Alabama. A bi-monthly perimeter program keeps a treated barrier around your home through every season, so pest activity does not build up during gaps in coverage."
      },
      {
        "q": "What are the most common pests treated in Huntsville, AL?",
        "a": "The pests EnviroCare treats most frequently in Huntsville include ants, cockroaches, spiders (including brown recluse), wasps, rats and mice, and subterranean termites. Fire ants are a separate add-on service given the specific treatment they require. Mosquitoes and ticks are covered under seasonal add-on plans running March through October."
      },
      {
        "q": "How long should you stay out of the house after a pest control treatment?",
        "a": "Re-entry timing depends on the specific EPA-registered products applied and the areas treated. Your technician will give you the re-entry guidance that applies to your visit before leaving the property. In most cases, allowing treated surfaces to dry fully before re-entry is the standard instruction."
      },
      {
        "q": "Do you offer free estimates for pest control in Huntsville?",
        "a": "Yes. EnviroCare offers free on-site inspections for pest control, termite, and mosquito service in Huntsville and across Madison County. Termite work always starts with a free WDO inspection before any treatment plan or pricing is confirmed. Call (256) 937-7676 to schedule."
      }
    ],
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
      "before": 76,
      "after": 85,
      "checkedAt": "2026-11-10"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.001,
      "competitorsChecked": 28,
      "checkedAt": "2026-11-10"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-10"
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
  "/alabaster": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "What to Expect From Pest Control in Alabaster, AL",
    "paragraphs": [
      "Pest activity in Alabaster follows a predictable seasonal rhythm shaped by Shelby County's red clay soil, dense tree cover, and the moisture that collects along Buck Creek and the low-lying lots off Kent Dairy Road. Subterranean termites stay active in that damp ground year-round. Ant colonies push into foundations when spring rains saturate the clay. Spiders move into garages and storage areas as temperatures drop in the fall. Understanding those local patterns is the first step in building a treatment plan that actually holds.",
      "Professional pest control services in Alabaster start with an inspection, not a spray bottle. A technician walks the exterior of the home, checking the foundation line, eaves, utility penetrations, door frames, and the landscaping edges where pest pressure tends to build first. That walkthrough identifies the entry points and harborage areas driving activity on your specific property, and it shapes every treatment decision that follows. Interior work is available when monitoring shows it is warranted, but the exterior-first approach means most common pest problems never reach the inside of the home.",
      "Homeowners often ask how often pest control treatments should be scheduled. The standard residential pest plan covers more than 30 Alabama pests on a bi-monthly schedule, meaning a technician visits every other month for six visits across the year. That cadence keeps pressure down through every season rather than reacting after an infestation has already established. If pest activity shows up between scheduled visits, re-service is included at no additional charge, so you are not left waiting until the next appointment.",
      "Conditions that attract pests to Alabaster homes tend to be the same from one neighborhood to the next: standing water in gutters or low spots in the yard, mulch beds held tight against the foundation, wood piles stored against the siding, and gaps around utility lines where the structure meets the soil. A thorough inspection notes each of those conditions so the treatment plan addresses the root causes alongside the pests themselves. Termite control, rodent control, mosquito reduction, spider control, and wasp management are all available as part of a residential and commercial pest control program tailored to what your property actually needs.",
      "Choosing a reliable pest control company in Alabaster means looking for a team that works out of a local office, knows the area's specific pest pressures, and stands behind the work between scheduled visits. EnviroCare's Alabaster office at 2025 Butler Rd serves 35007, 35114, and the surrounding Shelby County communities from a base that technicians work out of daily, not a regional dispatch center routing someone through the area on a one-time stop. Call (205) 940-6360 to schedule a free inspection and get a treatment plan built around your home or business."
    ],
    "faqs": [
      {
        "q": "Do I need to be home during pest control treatments in Alabaster?",
        "a": "For most exterior-first visits, you do not need to be present. Because the initial treatment focuses on the perimeter, foundation, and eaves, a technician can complete the exterior work while you are away. If interior service is part of your plan, the office will coordinate a time that works for you."
      },
      {
        "q": "What are the most common pest problems in Alabaster, AL?",
        "a": "Subterranean termites are a year-round concern, particularly on wooded lots and properties near Buck Creek where the soil stays moist. Odorous house ants, German and American cockroaches, black widow and brown recluse spiders, wasps, and rodents are among the most frequently treated pests in the area. Mosquito pressure builds from March through October, especially in yards with standing water or heavy shade."
      },
      {
        "q": "How often should pest control be scheduled for an Alabaster home?",
        "a": "The standard residential pest control plan is bi-monthly, with a technician visit every other month. That frequency covers the full seasonal cycle in Shelby County and includes free re-service calls between scheduled visits if activity shows up. Mosquito treatments follow a separate schedule with applications from March through October."
      },
      {
        "q": "What pest control services are available for businesses in Alabaster?",
        "a": "EnviroCare provides residential and commercial pest control services throughout Alabaster and the Highway 31 corridor. Commercial programs for restaurants, offices, warehouses, and other facilities include routine inspections, monitoring, rodent control, and documentation to meet operational and regulatory needs. Contact the Alabaster office at (205) 940-6360 to discuss a plan built around your business."
      }
    ],
    "neuron": {
      "queryId": "825f8ea38b391de1",
      "keyword": "pest control alabaster al",
      "before": 55,
      "after": 69,
      "checkedAt": "2026-11-10"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.004,
      "competitorsChecked": 27,
      "checkedAt": "2026-11-10"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-10"
  },
  "/brook-highland": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "Pest Control Services for Brook Highland and Hoover, AL",
    "paragraphs": [
      "Brook Highland sits in a stretch of the Birmingham metro where mature hardwood canopy, creek drainage from the Cahaba watershed, and years of landscaping buildup create conditions that keep pest pressure steady from February through December. Cockroach activity picks up in warm garages and kitchens as early as late winter. Spider populations build through spring in crawl spaces, storage areas, and along eaves. Wasp colonies appear under deck rails and soffits by midsummer. Ant control becomes urgent whenever a wet spring softens the perimeter and carpenter ants trace moisture trails into wood framing. Homeowners who address these cycles with consistent, exterior-first pest control treatments spend far less time reacting to an active infestation than those who wait for a visible problem indoors.",
      "Effective pest control in Brook Highland starts outside. EnviroCare applies EPA-registered products according to label directions along the foundation, around utility penetrations, at eave lines, and through the landscaping bed edges where pests stage before entering a structure. That exterior barrier is the core of a sound pest management plan, and it is why most customers never need recurring interior spray. When an interior application is genuinely warranted - a brown recluse situation in an unfinished basement, a heavy German cockroach pressure point in a kitchen - a technician targets the specific harborage zone rather than treating open living space broadly.",
      "Brook Highland pest control needs do not follow a single pattern because the neighborhood itself does not. Lots backing up to wooded common areas carry tick, chigger, and rodent pressure that a street-facing lot on the Highway 280 side does not. Newer custom homes on graded clay lots deal with more aggressive fire ant activity than the original sections with established turf. A treatment plan built around one home's specific pest problem will not look identical to the plan next door, which is why EnviroCare begins with a free on-site inspection rather than a phone quote. That inspection shapes the control solutions applied at each visit.",
      "Mosquito and tick control runs as a seasonal layer on top of the core pest plan for Brook Highland yards with significant tree cover or wooded lot lines. Mosquito control targets the shaded resting zones and low-drainage areas mosquitoes use during daylight - dense ornamental beds, the underside of deck boards, fence lines, and gutter overflow zones. Tick control addresses the wooded edges where Lone Star and American dog ticks are most active. Neither program eliminates populations entirely, but both reduce pressure meaningfully across the season for families spending time in the yard.",
      "Four generations of pest control experience across Central and North Alabama means EnviroCare has worked through every pest cycle this region produces. The team of pest control specialists serving Brook Highland and the broader Birmingham pest corridor operates out of the Alabaster office, close enough to run this zip code on a regular route. Whether the concern is a single emerging pest problem or a need for comprehensive pest control across termites, mosquitoes, and common household pests, the starting point is the same: a free inspection, a clear treatment plan, and straightforward pricing confirmed before any work begins. Residential and commercial pest control customers in Hoover and the 35242 area can reach the Alabaster office at (205) 940-6360."
    ],
    "faqs": [
      {
        "q": "What pests are most common in Brook Highland and Hoover, AL?",
        "a": "The pest pressure pattern in Brook Highland includes cockroaches, spiders (including brown recluse in basements and garages), carpenter ants, wasps under eaves and on decks, rodents along wooded perimeter lots, and seasonal mosquito and tick activity from the wooded common areas. Fire ant pressure is heavier on newer lots with graded clay soil. The specific mix on any given property depends on its location within the neighborhood, surrounding vegetation, and the structure itself - which is why a free inspection is the right first step before settling on a pest control plan."
      },
      {
        "q": "Does EnviroCare offer commercial pest control in Brook Highland and Hoover?",
        "a": "Yes. EnviroCare provides residential and commercial pest control throughout the Hoover and Highway 280 corridor. Commercial pest management programs are customized to the type of facility and the pest pressure involved, and pricing is confirmed after a free on-site inspection. Call (205) 940-6360 to schedule."
      },
      {
        "q": "How do I schedule a pest control service in Brook Highland?",
        "a": "Call the Alabaster office at (205) 940-6360 or request a quote online. A technician will schedule a free on-site inspection, assess the property, identify active pest problems and risk areas, and provide a written treatment plan and pricing before any service begins. Most initial assessments for new customers are scheduled within the same week."
      },
      {
        "q": "Is year-round pest control worth it in Hoover, AL?",
        "a": "Alabama's mild winters mean pest activity does not fully stop between November and February - it slows, but cockroaches, spiders, rodents, and carpenter ants remain active in protected areas of the structure. Maintaining a perimeter barrier through the cooler months prevents the population buildup that produces a noticeable infestation by spring. Homeowners who keep an active pest control plan through winter typically see less interior activity in March and April than those who pause service and restart."
      }
    ],
    "neuron": {
      "queryId": "3fe5b1d01f9fca7a",
      "keyword": "pest control brook highland hoover al",
      "before": 59,
      "after": 71,
      "checkedAt": "2026-11-10"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0,
      "competitorsChecked": 28,
      "checkedAt": "2026-11-10"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-10"
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
