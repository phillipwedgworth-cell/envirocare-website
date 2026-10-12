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
      "Termites are only one of the pests in Huntsville that a homeowner deals with. Many customers pair termite protection with our bi-monthly pest control service, which treats around your home for household pests such as ants, spiders, cockroaches and silverfish, with free re-service if pest activity shows up between visits; wasps and hornets can be added for an additional charge. Mice and rats are addressed by sealing entry points during regular visits, and mosquito control and tick control run as seasonal programs from March through October. For a home or business, including commercial pest control for offices and facilities near Research Park, it is one local, professional pest control company working from one Huntsville office on Old Madison Pike."
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
        "a": "Mosquitoes, ticks and spiders near the water; wasps under docks and boathouse eaves; ants, roaches and mice inside, especially while the house sits empty; and subterranean termites in damp soil and wood. A bi-monthly exterior program handles most of the list, with mosquito, tick and termite protection added to fit the property."
      }
    ],
    "neuron": {
      "queryId": "694f16db9cb26dcb",
      "keyword": "pest control lake martin al",
      "before": 69,
      "after": 73,
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
