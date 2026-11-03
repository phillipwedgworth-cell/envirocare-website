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
  "/calera": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "Choosing Professional Pest Control in Calera, AL",
    "paragraphs": [
      "Calera homeowners searching for a pest control service often ask the same practical questions: how often should treatment happen, what does a full treatment plan actually cover, and how do you tell one pest control company from another? Those are fair questions, and the answers matter more than most marketing copy admits.",
      "The most effective pest management programs in Calera run on a bi-monthly schedule rather than a one-time or quarterly visit, because Central Alabama's warm, humid climate keeps pest pressure active for most of the year. A single treatment handles what is visible today; a consistent exterior program reduces the conditions that draw ants, roaches, spiders, and rodents toward your foundation in the first place. Preventative treatment is almost always less disruptive than responding to an active infestation after it has taken hold inside the home.",
      "When you evaluate any pest control company, look past the marketing and ask three practical things. First, does the technician treat the exterior perimeter as a first line of defense, or does every visit start inside? An exterior-first approach intercepts pests like cockroaches, rodents, and spiders before they reach living spaces. Second, what happens between scheduled visits if a pest problem comes back? A reputable service includes free re-treatment between visits rather than billing for every callback. Third, is the company applying EPA-registered products according to label directions, with someone accountable for the specifics of your property? Local knowledge of Calera's terrain -- the clay-heavy soil near Buxahatchee Creek, the disturbed ground in new construction corridors along I-65, the older pier-and-beam homes near downtown -- is not something a national call center can replicate.",
      "Pests like subterranean termites, fire ants, German cockroaches, wolf spiders, and field mice all require different approaches, and a professional pest control treatment plan should reflect that. Termite control through Sentricon Always Active is a separate, continuous system; fire ant treatment covers the full yard rather than just the perimeter; mosquito and tick work runs on a seasonal schedule tied to Calera's creek corridors and wooded lots. Combining these into a plan built around your property is more effective than addressing each infestation reactively.",
      "For both residential and commercial properties in Calera, the starting point is a free on-site inspection. That visit lets a technician assess the actual conditions -- existing ant trails, rodent entry points, conducive conditions for roaches, termite pressure near wood-soil contact -- and confirm a treatment plan before any service starts. EnviroCare has been serving homes and businesses in Shelby County from the Alabaster office for years, and that consistency means the same team returns visit after visit, familiar with your property and what it needs."
    ],
    "faqs": [
      {
        "q": "How often should I schedule pest control services in Calera, AL?",
        "a": "A bi-monthly schedule -- six visits per year, every other month -- is the standard for residential pest control in Calera. That frequency keeps the exterior barrier active through Alabama's long warm season and allows the technician to catch changes in pest pressure before an infestation develops inside the home."
      },
      {
        "q": "What pests are most common in Calera homes?",
        "a": "The pest issues that come up most consistently in Calera include subterranean termites in both new slabs and older crawlspaces, fire ants in open yards, German and American cockroaches, wolf spiders and brown recluses moving indoors in fall, field mice following the harvest cycle from surrounding pastures, and mosquitoes along the creek bottoms and retention ponds from March through October."
      },
      {
        "q": "What should I look for when choosing a pest control company in Calera?",
        "a": "Look for a company with an exterior-first treatment approach, free re-service between scheduled visits, and technicians who know Shelby County's specific terrain and pest pressures. Ask whether the service applies EPA-registered products according to label directions, what the billing terms are, and whether a licensed professional performs a property inspection before quoting any price."
      },
      {
        "q": "Can I prevent pests from coming back after treatment?",
        "a": "Consistent preventative service is the most reliable way to keep pest pressure from rebuilding. After an initial treatment addresses current activity, a bi-monthly exterior program keeps the perimeter treated and allows the technician to identify new conducive conditions -- open entry points, moisture near the foundation, new construction disturbance nearby -- before they lead to another infestation. Free re-service between visits means you are covered if something appears between scheduled treatments."
      }
    ],
    "neuron": {
      "queryId": "caf757c967a2f2a4",
      "keyword": "pest control calera al",
      "before": 54,
      "after": 69,
      "checkedAt": "2026-11-03"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.001,
      "competitorsChecked": 25,
      "checkedAt": "2026-11-03"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-03"
  },
  "/mt-laurel": {
    "provider": "gpt:gpt-5.6-luna",
    "heading": "What to Expect From Pest Control in Mt Laurel, Alabama",
    "paragraphs": [
      "Effective pest control in Mt Laurel starts with understanding the property, not simply spraying every room. A technician looks at the exterior of your home or business, landscaping, moisture-prone areas, wood-to-soil contact, and likely entry points around doors, windows, garages, utility lines, and roof edges. This inspection helps identify the specific pest, the conditions supporting it, and whether activity is limited to one area or connected to a larger infestation.",
      "The next step is a treatment plan based on what the inspection finds. EnviroCare uses an exterior-first approach for routine pest management, addressing foundation edges, eaves, thresholds, and other places where a bug may move indoors. Interior service can be provided when activity requires it. Products are EPA-registered and applied according to label directions. Treatment is adjusted for the property, the season, and the type of pest rather than following the same process at every home.",
      "Regular service helps manage recurring pest pressure around wooded lots, greenways, shaded drainage, and mature landscaping in Mt Laurel Village and Dunnavant Valley. Most homeowners benefit from scheduled visits instead of waiting until a pest problem becomes extensive. During each visit, the technician can look for new activity, conditions that invite pests, and changes around the exterior of your home. Covered pest concerns that return between scheduled visits can receive re-service at no extra charge under the applicable plan terms.",
      "Homeowners can also reduce pest activity by correcting moisture issues, keeping vegetation trimmed away from walls, storing firewood away from the structure, and sealing practical entry points. Do-it-yourself pest control may address a visible roach, spider, wasp, or rodent temporarily, but recurring activity often points to conditions that need a broader inspection. For homes and businesses in Mt Laurel, a local pest control service can combine inspection, treatment, documentation, and follow-up into one ongoing process. EnviroCare offers a free inspection and quote to help determine the appropriate service for the property."
    ],
    "faqs": [
      {
        "q": "How often should pest control be performed in Mt Laurel?",
        "a": "Routine pest service is scheduled throughout the year because pest pressure changes with weather, moisture, landscaping, and activity around the property. EnviroCare's residential pest plan uses bi-monthly visits, with re-service available between scheduled visits for covered pest concerns."
      },
      {
        "q": "What types of pests can a pest control service treat?",
        "a": "Common service concerns include ants, cockroaches, spiders, wasps, hornets, rodents, and other household pests. Some concerns, including mosquitoes, ticks, fleas, and fire ants, use separate services because their treatment timing and application areas differ."
      },
      {
        "q": "Does EnviroCare offer a free pest inspection in Mt Laurel?",
        "a": "Yes. EnviroCare provides a free inspection and quote for Mt Laurel homes and businesses. The inspection helps identify active pest activity, contributing conditions, and the treatment plan that fits the property."
      },
      {
        "q": "What are the basic rules for effective pest control?",
        "a": "The practical steps are to identify the pest correctly, address the conditions attracting it, and maintain follow-up service when activity is recurring. Sealing entry points, reducing excess moisture, keeping vegetation managed, and monitoring the exterior can all support professional pest control."
      }
    ],
    "neuron": {
      "queryId": "8c10eeab1c3fa8f7",
      "keyword": "pest control mt laurel al",
      "before": 58,
      "after": 75,
      "checkedAt": "2026-11-03"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.006,
      "competitorsChecked": 28,
      "checkedAt": "2026-11-03"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-03"
  },
  "/indian-springs": {
    "provider": "claude:claude-sonnet-4-6",
    "heading": "What to Expect From Professional Pest Control in Indian Springs Village, AL",
    "paragraphs": [
      "Indian Springs Village homeowners deal with a pest environment that is shaped almost entirely by the property itself. Mature hardwood canopy, deep mulch beds, and lots that back up to undeveloped ridge land create the kind of conditions where ant colonies establish along foundation lines, cockroaches move in from leaf litter and mulch during Alabama's warm, humid summers, and spiders set up harborage in every undisturbed corner of a garage or basement. Effective pest management here starts on the outside of the structure, addressing the entry points, soil contact, and landscape edge before anything reaches the interior.",
      "Every pest control service we run on an Indian Springs Village home begins with a perimeter barrier treatment covering the foundation, eave lines, window and door frames, and the mulch and vegetation border where pest activity originates. That exterior-first approach handles the pressure from outside in rather than reacting to what has already gotten through. Bi-monthly visits keep that barrier current across the year, and re-service between scheduled visits is included at no extra charge when covered pests return. Interior treatment is added when an infestation calls for it, targeting harborage zones rather than open floor space.",
      "Cockroaches are a recurring challenge on wooded Shelby County lots, and Indian Springs Village is no exception. American cockroaches move in through foundation gaps, utility penetrations, and crawl space vents, particularly as summer heat builds. Spider control follows a similar logic: brown recluse and other species concentrate in undisturbed storage areas, behind wall voids, and along the base of foundations where other insects provide a food source. The bi-monthly pest plan covers both, along with 30-plus other Alabama pests, under a single recurring service.",
      "Rodent control is a separate but related concern for properties that adjoin undeveloped acreage or heavily wooded lots. Mice and rats follow the same entry points as insects, exploiting gaps around utility lines, foundation voids, and roofline junctions when temperatures drop in the fall. Exterior bait station monitoring addresses that pressure at the perimeter, and an inspection gives a clear picture of where exclusion work is most needed on a given property.",
      "Serving Indian Springs Village out of our Alabaster office at 2025 Butler Road, we run this route regularly and know the pest challenges specific to ridge-top lots, wooded setbacks, and the drainage patterns that influence where pressure builds. If you are weighing a plan or trying to understand what professional pest management actually covers for your property, a free on-site inspection is the right starting point. Call (205) 940-6360 to schedule one."
    ],
    "faqs": [
      {
        "q": "What pests are most common in Indian Springs Village, AL homes?",
        "a": "The combination of wooded lots, clay soil, and mature hardwood canopy drives pressure from carpenter ants, odorous house ants, cockroaches, brown recluse spiders, wolf spiders, and subterranean termites. Rodent activity increases in the fall along lot lines that back up to undeveloped ridge land. Tick and chigger pressure is high throughout the spring and summer months given the wildlife corridors that run through the watershed."
      },
      {
        "q": "Do I need to be home during a pest control treatment?",
        "a": "For exterior-only barrier treatments, you do not need to be home. We treat the perimeter, foundation, eave lines, and landscaping edge without needing interior access. If the visit includes interior service, someone should be present to allow access and to flag any specific problem areas inside the home. Your technician will confirm what the visit includes before arriving."
      },
      {
        "q": "Are palmetto bugs a problem in Indian Springs Village, AL?",
        "a": "Palmetto bug is a common name for the American cockroach, and yes, they are active across Shelby County. They move through mulch, leaf litter, and crawl spaces and enter homes through foundation gaps and utility penetrations. The bi-monthly perimeter service targets cockroach entry points and harborage as part of the standard plan."
      },
      {
        "q": "What does a general pest control service actually include?",
        "a": "Bi-monthly service covers a perimeter barrier treatment across the foundation, eave lines, and landscaping edge, plus interior treatment when an infestation calls for it. It covers 30-plus Alabama pests including ants, cockroaches, spiders, and silverfish. Fire ants, fleas, ticks, and mosquitoes are separate add-on services. Re-service between scheduled visits is included at no extra charge when covered pests return."
      }
    ],
    "neuron": {
      "queryId": "c91a56714adbfadb",
      "keyword": "pest control indian springs village al",
      "before": 69,
      "after": 74,
      "checkedAt": "2026-11-03"
    },
    "originality": {
      "maxCompetitorOverlap": 0,
      "maxSiteOverlap": 0.006,
      "competitorsChecked": 25,
      "checkedAt": "2026-11-03"
    },
    "source": "content-refresh-agent",
    "updatedAt": "2026-11-03"
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
