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
        "a": "Yes. EnviroCare offers free on-site inspections for pest control, termite, and mosquito service in Huntsville and across Madison County. Termite work always starts with a free termite inspection before any treatment plan or pricing is confirmed. Call (256) 937-7676 to schedule."
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
      "caption": "Bait stations go into the soil around the house, usually with no drilling through slabs, patios or driveways.",
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
        "a": "EnviroCare provides residential and commercial pest control services throughout Alabaster and the Highway 31 corridor. Commercial programs for restaurants, offices, warehouses, and other facilities include routine inspections, monitoring, rodent control, and written service records for every visit. Contact the Alabaster office at (205) 940-6360 to discuss a plan built around your business."
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
        "a": "Call the Alabaster office at (205) 940-6360 or request a quote online. A technician will schedule a free on-site inspection, assess the property, identify active pest problems and risk areas, and provide a written treatment plan and pricing before any service begins."
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
  },
  "/helena": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "Pest Control Services in Helena, AL: What Helena Homes and Businesses Actually Face",
    "paragraphs": [
      "Helena's geography does most of the work for household pests. Buck Creek and its tributaries leave standing water in low spots after every storm, shaded lots under mature hardwood canopy hold humidity longer than open yards, and the clay-heavy soil throughout Shelby County stays damp well into dry stretches. That combination creates favorable conditions for ants, roaches, spiders, and subterranean termites year-round. Newer subdivisions built on former farmland push fire ant colonies toward garage slabs and landscaped beds. Older neighborhoods in and around Old Town carry the crawl spaces and brick foundations that moisture pests gravitate toward. Pest pressure in Helena is not random — it follows the land.",
      "Professional pest control for a Helena home or business starts at the perimeter. EnviroCare's exterior-first approach treats the foundation band, eaves, and harborage zones around your home before any pest reaches an entry point. The goal is to intercept ant trails, spider webs, cockroach harborage, and wasp nest activity along rooflines before those problems move indoors. Interior treatments are added when conditions call for it, but keeping the outside of your home as the primary barrier means less disruption to your household between visits. The same exterior-first logic applies to commercial accounts — restaurants, offices, and warehouses serving Helena all benefit from a treatment plan built around the perimeter first.",
      "Choosing a pest control company in Helena comes down to a few practical questions: Does the company know the specific pest pressure in river-bottom lots versus hilltop subdivisions? Does it offer termite inspections alongside routine pest control, or are those handled by separate vendors? Can it cover rodent control for a commercial kitchen as well as a standard residential perimeter? EnviroCare serves both homes and businesses throughout Helena from the Alabaster office on Butler Road, so the same team that handles a bi-monthly residential pest control service can also set up a rodent control program for a food-service account down the road.",
      "Rodent activity in Helena tends to follow construction disturbance and creek corridors. Rats and mice follow the same moisture paths that other pests use, and they find entry points at the foundation and roofline the same way roaches and spiders do. Rodent control is part of the commercial pest solutions EnviroCare offers for restaurants, multi-tenant buildings, and government facilities in Helena and the surrounding corridor. For residential accounts, evidence of rodent activity during a routine inspection is flagged and addressed as part of the overall treatment plan.",
      "Helena's pest season runs long. The warm months bring mosquitoes, fire ants, and wasps. The cooler months push roaches, spiders, and rodents toward heated structures. A bi-monthly service schedule — six visits per year — keeps coverage current through every shift in pest behavior, and free re-services between scheduled visits mean that a heavy rain event or a sudden ant surge does not go unaddressed until the next scheduled stop. For homeowners near the Cahaba and Buck Creek corridors especially, that consistent rhythm is what makes the difference between managing pest problems and staying ahead of them."
    ],
    "faqs": [
      {
        "q": "What pests are most common in Helena, AL?",
        "a": "Ants, cockroaches, spiders, wasps, and subterranean termites are the pests Helena homeowners report most often. Fire ants are especially active in open lawns and new construction areas. Properties near Buck Creek and its tributaries see elevated mosquito activity from spring through fall, and wooded lots along greenway corridors carry Lone Star and dog ticks. EnviroCare's bi-monthly residential pest control service covers more than 30 common Alabama species, with fire ants, mosquitoes, and ticks available as separate add-on services."
      },
      {
        "q": "How often should pest control treatments be scheduled for a Helena home?",
        "a": "A bi-monthly schedule — once every other month, six visits per year — is standard for residential pest control in Helena. That frequency keeps the perimeter barrier active through every seasonal shift and ensures coverage overlaps through Alabama's long warm season. If you see activity between scheduled visits, re-service is included at no additional charge."
      },
      {
        "q": "Do older homes or river-adjacent properties in Helena need a different pest control approach?",
        "a": "They often do. Older homes near Old Town Helena tend to have crawl spaces and mature foundations that create more entry points and hold more moisture — conditions that favor roaches, camel crickets, millipedes, and termites. River-adjacent lots along Buck Creek face higher mosquito and moisture-pest pressure than hilltop properties. EnviroCare inspects for those site-specific conditions during the initial visit and builds the treatment plan around what your property actually faces, rather than a one-size approach."
      },
      {
        "q": "Does EnviroCare offer termite inspections in Helena, AL?",
        "a": "Yes. Free termite inspections are available to Helena homeowners, and WDO inspection letters for real estate transactions are a separate service. Termite protection uses Sentricon Always Active bait stations installed in the soil around your home's perimeter — no drilling into your foundation or original masonry. All termite pricing is confirmed after the free on-site inspection. Call the Alabaster office at (205) 940-6360 to schedule."
      }
    ],
    "neuron": {
      "queryId": "0f43ec5a7c3a85cf",
      "keyword": "pest control helena al",
      "before": 59,
      "after": 79,
      "checkedAt": "2026-11-24"
    },
    "originality": {
      "maxCompetitorOverlap": 0.001,
      "maxSiteOverlap": 0.006,
      "competitorsChecked": 24,
      "checkedAt": "2026-11-24"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-24"
  },
  "/alabaster#commercial": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "Commercial Pest Control in Alabaster, AL",
    "paragraphs": [
      "Running a business in Alabaster means managing a wide range of daily demands, and pest issues should not be among them. Whether you operate a retail storefront along Highway 31, a restaurant near the Shops at Colonial Promenade, a medical office, a warehouse off I-65, or a property management portfolio across Shelby County, a single pest sighting in front of a client can disrupt operations and damage the reputation you have worked hard to build. EnviroCare's Alabaster office provides commercial pest control solutions designed to protect your facility, your staff, and the customers you serve.",
      "Commercial properties present a different set of conditions than residential homes. Loading docks, floor drains, dumpster pads, break rooms, and high-traffic entry points each create opportunities for pest pressure to build in ways a standard home plan was never designed to address. Our expert technicians inspect the full scope of your facility before any treatment begins - exterior perimeter, harborage zones, drainage areas, and the interior spaces your staff flagged as concerns. That inspection is the foundation of a pest control service plan tailored to your operation, your hours, and the specific pest challenges your location faces.",
      "Shelby County's red clay soil, creek-fed moisture near Buck Creek and Highway 119, and warm summers create year-round pest pressure that commercial clients trust us to manage consistently. Ants push through foundation gaps after heavy spring rains. Flies and roaches gravitate toward food-service and storage areas through summer. Rodents seek warmth indoors as fall temperatures drop. A pest control plan built for Alabaster accounts for those seasonal shifts and adjusts with what technicians observe on each visit, delivering the kind of ongoing oversight that one-time treatments simply cannot provide.",
      "Every commercial service visit is documented. Technicians record the products applied, the conditions observed, and any structural or sanitation factors that could allow pest activity to return. That written record is available to health inspectors, corporate auditors, and property managers - the kind of professional pest control paper trail that gives clients real confidence between visits. All treatments use EPA-registered products applied according to label directions, with particular attention to sensitive areas like food prep zones and spaces where pets or the public are present.",
      "The family behind EnviroCare has been doing pest control in Alabama since 1958, now four generations deep, and that history is rooted in communities like Alabaster. When you need a bug control partner that knows this part of Shelby County, works out of a local office on Butler Road, and can deliver consistent, documented service built around your business, call us at (205) 940-6360 to schedule a free inspection. We will walk your property, identify what is driving activity, and put together a pest control option that fits your facility and your schedule."
    ],
    "faqs": [
      {
        "q": "What types of businesses can receive commercial pest control service in Alabaster?",
        "a": "EnviroCare serves a wide range of commercial facilities in Alabaster and across Shelby County, including restaurants, retail locations, office buildings, warehouses, medical offices, churches, government buildings, and property management accounts. If you manage a facility with ongoing pest pressure, call (205) 940-6360 and we will assess whether a commercial plan fits your operation."
      },
      {
        "q": "Does commercial pest control in Alabaster include termite inspections?",
        "a": "Yes. EnviroCare is a Sentricon Certified Specialist and provides WDO inspections for commercial properties, including real estate transactions and lender-required reviews. Active Sentricon accounts include up to $1,000,000 in damage repair coverage, subject to the terms of the agreement. Termite inspection and monitoring pricing is confirmed after a free on-site visit because every commercial building is different."
      },
      {
        "q": "How do I find out how much commercial pest control will cost for my Alabaster business?",
        "a": "Pricing for commercial pest control solutions depends on the size of your facility, the type of operation, the pests involved, and how frequently service is needed. The best way to get an accurate estimate is to schedule a free on-site inspection with our Alabaster office at (205) 940-6360. A technician will walk the property with you and build a plan matched to what your facility actually needs."
      },
      {
        "q": "Can a commercial pest control plan keep pests out year-round?",
        "a": "A well-designed commercial program accounts for seasonal pest cycles rather than reacting to them after the fact. EnviroCare's Alabaster technicians schedule visits around the pest pressures specific to Shelby County and document every service so conditions are tracked over time. If pest activity shows up between scheduled visits, re-service is part of the program so your business is not left waiting for the next appointment."
      }
    ],
    "neuron": {
      "queryId": "f881259f0fda1fbb",
      "keyword": "commercial pest control alabaster al",
      "before": 57,
      "after": 66,
      "checkedAt": "2026-11-24"
    },
    "originality": {
      "maxCompetitorOverlap": 0.001,
      "maxSiteOverlap": 0.016,
      "competitorsChecked": 28,
      "checkedAt": "2026-11-24"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-24"
  },
  "/alexander-city#termite-inspection": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "Termite Inspection in Alexander City, AL",
    "paragraphs": [
      "Subterranean termites are quiet workers. By the time a homeowner in Alexander City notices soft wood around a door frame, buckled flooring near a crawlspace access, or mud tubes running up a pier foundation, a colony has usually been feeding on the structure for a year or more. A professional termite inspection catches that activity at the earliest visible stage -- before the damage spreads into load-bearing framing. EnviroCare inspectors examine the full perimeter foundation, every crawlspace, garage walls, door and window frames, and any point where wood contacts or comes close to soil. They are looking for mud tubes, damaged or hollow-sounding wood, discarded swarm wings near windowsills, and moisture conditions that make a structure attractive to a colony in the first place.",
      "Alexander City homeowners face a specific combination of risk factors. The red clay and sandy loam soils throughout Tallapoosa County hold moisture after rain, keeping ground conditions favorable for subterranean termite colonies well into fall. Older homes near downtown and in the mill neighborhoods were built on pier-and-beam foundations with crawlspaces that bring wood framing close to the soil -- exactly the entry path subterranean termites prefer. Lake Martin properties add another layer: a cabin or seasonal home that sits unoccupied through winter can sustain real structural damage before the owner arrives in spring and notices anything wrong. Annual inspections and a continuous monitoring system are the practical answer for any property that is not checked regularly.",
      "When an inspection reveals active termites or conditions that invite them, EnviroCare installs Sentricon Always Active bait stations around the structure. The stations remain in the ground year-round, targeting the colony directly. No drilling into the slab, no tank trucks, no disruption to landscaping. Qualifying homes enrolled in the Sentricon program through EnviroCare carry up to $1,000,000 in damage repair coverage, subject to the terms of the agreement. All termite pricing is confirmed after the free on-site inspection -- structure size, construction type, soil conditions, and the extent of any existing activity all shape the right approach, so there is no flat rate to quote before that visit.",
      "A Wood-Destroying Organism report -- sometimes called a WDO inspection or Wood Infestation Report -- is a written finding from a licensed pest control company documenting the presence or absence of termites and other wood-destroying organisms at the time of inspection. Most mortgage lenders and real estate contracts in Alabama require one before a transaction closes. EnviroCare issues WDO letters for closings throughout Tallapoosa County, and the same local team that handles a standard residential inspection also covers lake-side properties, outbuildings, and dock structures that a general home inspector may not examine closely. If you are buying or selling in the Alexander City area, the Alexander City office at (256) 234-6162 can schedule the inspection and turn around the report on a timeline that works with your closing date.",
      "Termite protection works best as part of a broader approach to the structure. Many Alexander City homeowners combine Sentricon monitoring with EnviroCare's bi-monthly pest plan, which keeps exterior pressure from ants, roaches, spiders, rodents, and other common invaders down on a rotating schedule. Addressing moisture issues -- improving crawlspace ventilation, redirecting downspout drainage away from the foundation, keeping mulch pulled back from the sill plate -- removes the conditions that make a home attractive to a colony in the first place. The inspection is the starting point; preventing a return visit from termites is an ongoing standard of care, not a one-time event."
    ],
    "faqs": [
      {
        "q": "What are the warning signs of termites in an Alexander City home?",
        "a": "The most common signs are mud tubes running along foundation walls or piers, wood that sounds hollow when tapped, bubbling or uneven paint near baseboards, discarded swarm wings near windowsills in spring, and soft or spongy flooring near a crawlspace. Many colonies are found during a routine inspection before any visible interior damage appears, which is why annual inspections matter -- especially for older homes on pier-and-beam foundations and for seasonal lake properties."
      },
      {
        "q": "What is a Wood Infestation Report and when do you need one in Alexander City?",
        "a": "A Wood Infestation Report, also called a WDO inspection or WDO letter, is a written finding from a licensed pest control company documenting whether wood-destroying organisms were found at the property on the date of inspection. Most mortgage lenders require one before a home sale closes in Alabama. EnviroCare issues WDO letters for closings throughout Tallapoosa County, covering the main structure as well as outbuildings and lake-side structures. Call (256) 234-6162 to schedule."
      },
      {
        "q": "How often should a home in Alexander City be inspected for termites?",
        "a": "Annual inspections are the standard of care for most homes in this area. Homes on crawlspace or pier-and-beam foundations, properties near the Lake Martin shoreline or creek bottoms, and seasonal cabins that sit unoccupied for stretches of time benefit most from consistent yearly checks. Homes already enrolled in the Sentricon Always Active program are monitored on a regular schedule as part of that service."
      },
      {
        "q": "How can you help prevent termites from returning after treatment?",
        "a": "Continuous bait station monitoring through Sentricon Always Active is the most reliable ongoing protection -- the stations stay active in the soil year-round and target any new colony activity before it reaches the structure. Beyond the monitoring system, reducing moisture at the foundation is important: improving crawlspace ventilation, keeping gutters clear, pulling mulch back from the sill plate, and routing downspout drainage away from the perimeter all remove the conditions that attract subterranean termites. The free inspection includes a look at those risk factors so the technician can point out anything specific to your property."
      }
    ],
    "neuron": {
      "queryId": "b29eee05dc8bf4e2",
      "keyword": "termite inspection alexander city al",
      "before": 63,
      "after": 69,
      "checkedAt": "2026-11-24"
    },
    "originality": {
      "maxCompetitorOverlap": 0.006,
      "maxSiteOverlap": 0.011,
      "competitorsChecked": 28,
      "checkedAt": "2026-11-24"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-24"
  },
  "/eagle-point": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "What to Expect From Pest Control in Eagle Point, Hoover, AL",
    "paragraphs": [
      "Eagle Point sits in one of the more pest-active corridors in the Birmingham area. The 35242 zip combines wooded lot lines, creek drainage, graded clay soils, and the kind of mature landscaping that gives household pests — ants, cockroaches, wasps, rodents, spiders, and stinging insects — consistent harborage close to the structure. Effective pest control in Hoover starts with understanding what is actually driving the pressure on a specific property, not just treating what is visible at the front door.",
      "Professional pest control works in three stages: inspect, treat, and monitor. When a technician arrives at an Eagle Point home, the visit begins outside. The perimeter, foundation, eaves, soffits, utility entry points, and the landscaping edge where mulch meets brick are all checked before a single product goes down. That inspection shapes the treatment — where activity is concentrated, what conducive conditions exist, and whether the pest problem is a first occurrence or a recurring pattern. All products used are EPA-registered and applied according to label directions. After the exterior is addressed, the technician documents what was found and what was applied, so you have a service record for each visit.",
      "Homeowners can handle some pest prevention on their own — sealing gaps, reducing moisture around the foundation, keeping firewood away from the structure, and clearing harborage in crawlspaces all help. What DIY cannot replicate is the trained read of an infestation that has moved into wall voids, the correct product placement for a cockroach or roach issue rooted in a drain line, or the scheduled monitoring that catches a new termite colony before damage accumulates. For general pest management and especially for termite control, rodent activity, and anything that involves structural access, professional pest control service consistently outperforms store-shelf alternatives.",
      "Eagle Point properties benefit from residential and commercial pest control solutions that account for the specific pressure each lot faces. A home backing to wooded common areas has a different pest profile than a golf-adjacent lot or a lakeside property. Bi-monthly residential pest control covers more than 30 Alabama pests including ants, cockroaches, spiders, wasps, and rats and mice, with free re-service between scheduled visits if activity shows up between appointments. Fire ant, flea, tick, and mosquito control are separate services built for the yards where that pressure is highest. For homeowners and businesses across the Eagle Point and broader Hoover area, the same locally owned team handles both residential pest control and commercial accounts — from single-family homes to multi-tenant properties along the Highway 280 corridor.",
      "Pest activity in this part of Alabama does not follow a clean seasonal calendar. Warm winters extend cockroach and ant pressure, and subterranean termites forage year-round. That is why pest prevention built around consistent exterior treatment, accurate inspections, and a technician who knows the local pest landscape outperforms reactive, one-time exterminator visits. Four generations of the same Alabama family have been running this service since 1958 — not a national franchise, not a call center, but a locally owned company that covers Eagle Point as part of its core service area."
    ],
    "faqs": [
      {
        "q": "What pests does the bi-monthly pest plan cover in Eagle Point?",
        "a": "The general pest plan covers more than 30 household pests common to the Birmingham area, including ants, cockroaches, spiders, wasps and stinging insects, and rats and mice. Fire ants, fleas, ticks, and mosquitoes are separate add-on services, since those pests require a different treatment approach and schedule."
      },
      {
        "q": "What should I expect when a technician visits my Eagle Point home?",
        "a": "The technician starts with an exterior inspection of the foundation, eaves, entry points, and landscaping edge before any treatment is applied. Treatment follows the inspection findings, focusing on the areas where pest pressure is concentrated. At the end of the visit you receive a service record showing what was found and what was applied. If a pest problem returns between scheduled visits, re-service is included at no additional charge."
      },
      {
        "q": "How is pest control in Hoover different from a one-time exterminator visit?",
        "a": "A one-time exterminator visit addresses what is visible on the day of service. Ongoing residential pest control covers the full seasonal cycle, with bi-monthly exterior treatment, re-service between visits, and inspection records that show patterns over time. That approach is what keeps infestation pressure from rebuilding in the weeks after a single treatment."
      },
      {
        "q": "Do you provide commercial pest control service for businesses along the Highway 280 corridor?",
        "a": "Yes. EnviroCare serves both homeowners and businesses throughout the Eagle Point and Hoover area, including commercial properties along the 280 corridor. Commercial pest control service is built around your facility's hours, documentation requirements, and inspection schedule. Call (205) 940-6360 to schedule a commercial walkthrough and get a quote based on your facility's size and service needs."
      }
    ],
    "neuron": {
      "queryId": "94fc3ba735b024ee",
      "keyword": "pest control eagle point hoover al",
      "before": 45,
      "after": 70,
      "checkedAt": "2026-11-17"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.005,
      "competitorsChecked": 16,
      "checkedAt": "2026-11-17"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-17"
  },
  "/liberty-park": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "Pest Control Services for Liberty Park and Vestavia Hills, AL",
    "paragraphs": [
      "Liberty Park sits inside one of the more demanding pest environments in the Birmingham metro. The wooded lot lines, the clay soils that hold moisture after every rain, and the creek drainages feeding toward the Cahaba corridor create steady pressure from rodents, spiders, roaches, ants, and termites across every season. Residential pest control in this corner of Vestavia Hills is not a one-time fix — it is ongoing pest management built around the actual conditions of these properties.",
      "EnviroCare provides pest control service to homes and businesses throughout Vestavia Hills, Cahaba Heights, and the wider 35242 zip code using an exterior-first approach. Every visit targets the foundation perimeter, eaves, entry points, and the landscaping edge where pest pressure actually originates — stopping an infestation before it reaches the inside of the home. EPA-registered products applied according to label directions are used on every service, and re-service between scheduled visits is included in the residential plan at no additional charge.",
      "Beyond the standard bi-monthly pest plan, Liberty Park homeowners frequently add targeted services for the pests their properties attract most. Rodent control addresses house mice and roof rats working in from the wooded perimeter. Spider control — particularly for the cellar and brown recluse species that colonize undisturbed storage spaces — is covered under the core pest plan. Cockroach and ant control, wasp and flea treatment, and standalone fire ant service are all available. For homes and businesses dealing with an active infestation, the inspection at the start of service identifies exactly what is present and where it is entering before any treatment begins.",
      "Commercial pest control services are also available for Vestavia Hills businesses, including offices, medical facilities, restaurants, and multi-family properties throughout the Birmingham metro. Commercial programs are built around your inspection documentation requirements and operating schedule and are priced after a free on-site assessment. Whether protecting a single-family home in Liberty Park Estates or a commercial property along the Overton Road corridor, the pest control process works the same way: inspect first, treat what is there, and schedule follow-up service to keep the pressure from returning.",
      "Choosing among pest control companies in Vestavia Hills comes down to consistency and local knowledge. A family-owned Alabama pest control operation that has worked these same Birmingham metro routes across four generations understands which pest problems are seasonal, which are structural, and which call for a different approach entirely. That local context — not a national call center — is what backs every pest and termite service EnviroCare provides in this community."
    ],
    "faqs": [
      {
        "q": "What pests are most common in Liberty Park and Vestavia Hills, AL?",
        "a": "The pests we treat most often in this part of the Birmingham metro include carpenter ants, odorous house ants, cockroaches in garages and crawlspaces, rodents entering from wooded lot lines, spiders in storage areas and eaves, and subterranean termites in homes adjacent to tree lines and mulched beds. Mosquitoes and ticks are significant seasonal concerns given the community's proximity to creek drainages and wooded common areas."
      },
      {
        "q": "What is the pest control process for a Liberty Park home?",
        "a": "Every new service starts with a property walk to identify active pest pressure, entry points, and conditions that make the home attractive to pests. From there, bi-monthly exterior treatment addresses the foundation, eaves, and landscaping edge. If a pest problem appears between scheduled visits, we return and re-treat at no extra charge. For termite protection, the process begins with a free WDO inspection before any Sentricon station installation."
      },
      {
        "q": "Do you provide commercial pest control services near Vestavia Hills?",
        "a": "Yes. EnviroCare provides commercial pest control for offices, restaurants, medical and professional facilities, and multi-family properties throughout Vestavia Hills and the broader Birmingham metro. Commercial programs are customized to your documentation requirements and hours of operation, and pricing is confirmed after a free on-site inspection. Call (205) 991-2882 to schedule an assessment."
      },
      {
        "q": "How do I get rid of a termite infestation in Vestavia Hills or Liberty Park?",
        "a": "Colony elimination through a monitored bait system is the approach EnviroCare uses. Sentricon Always Active in-ground stations are placed around the perimeter of the structure — no drilling into your foundation or hardscape — and termites carry the active ingredient back to the colony on their own. It begins with a free termite inspection so you get an accurate assessment of what is present before any commitment is made."
      }
    ],
    "neuron": {
      "queryId": "0feceb0c6ccf219f",
      "keyword": "pest control liberty park vestavia al",
      "before": 50,
      "after": 71,
      "checkedAt": "2026-11-17"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.007,
      "competitorsChecked": 15,
      "checkedAt": "2026-11-17"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-17"
  },
  "/alabaster#mosquito": {
    "provider": "gpt:gpt-5.6-luna",
    "heading": "Mosquito Control Services in Alabaster, AL",
    "paragraphs": [
      "Mosquitoes are a normal part of Alabama summers, but homeowners can take practical steps to reduce mosquito activity around the property. After rain, inspect gutters, flowerpot saucers, children's toys, tarps, and other containers that can hold water. Trim back dense vegetation where practical, keep grass maintained, and discuss weed control or landscaping changes that may improve airflow around patios and doorways. These prevention steps do not replace professional treatment, but they can help reduce the places where mosquito breeding begins.",
      "A professional mosquito inspection helps identify the areas where mosquitoes rest during the day and the spots that may support breeding after rainfall. EnviroCare can tailor service to the home's layout, shaded plantings, fence lines, drainage patterns, and the outdoor areas your family uses most. Treatment focuses on those activity zones rather than applying a generic approach across the entire property. EPA-registered products are applied according to label directions, with the goal of reducing mosquito populations and helping homeowners spend more time enjoying their outdoor space.",
      "Some Alabaster residents search for mosquito authority locations when they want information about public mosquito activity or local health notices. You can find your local mosquito authority through city or county resources for that type of information. For residential mosquito control, a local exterminator can inspect the property and customize a recurring plan around its specific conditions. EnviroCare is locally owned and operated, serving Alabaster and nearby Alabama communities from the Butler Road office.",
      "Mosquito control is one part of a broader outdoor pest plan. EnviroCare also provides tick control services to protect the areas around wooded edges, shaded yards, and regularly used outdoor spaces. Combining services is a matter of convenience, not a claim that one treatment handles every pest. A free inspection can help identify whether mosquito service, tick control, or another exterior treatment fits your property. The objective is to help you take back your yard throughout mosquito season without promising that every mosquito can be eliminated."
    ],
    "faqs": [
      {
        "q": "Are mosquitoes common in Alabama?",
        "a": "Yes. Alabama's warm, humid conditions and frequent rainfall create seasonal conditions that support mosquitoes. Activity can be higher around standing water, shaded vegetation, drainage areas, and containers that collect rain."
      },
      {
        "q": "What is a mosquito's worst enemy around an Alabaster home?",
        "a": "Removing standing water is one of the most useful prevention steps. Empty containers, clear clogged gutters, refresh water in outdoor items, and address low spots when practical. Professional treatment can then focus on the areas where adult mosquitoes rest and where activity is most noticeable."
      },
      {
        "q": "How can I reduce mosquitoes around my home in Alabaster?",
        "a": "Begin with a property inspection, remove avoidable standing water, maintain vegetation, and limit dense harborage near patios and entrances. EnviroCare can identify problem areas, tailor mosquito control services to the property, and provide a free estimate after an on-site inspection."
      }
    ],
    "neuron": {
      "queryId": "e2a5391c4be92dd3",
      "keyword": "mosquito control alabaster al",
      "before": 49,
      "after": 65,
      "checkedAt": "2026-11-17"
    },
    "originality": {
      "maxCompetitorOverlap": 0.002,
      "maxSiteOverlap": 0,
      "competitorsChecked": 31,
      "checkedAt": "2026-11-17"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-17"
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
