/**
 * Editorial image direction for the EnviroCare blog.
 *
 * The old index showed enormous emoji tiles for nearly every article. These
 * images already exist in /public and are not fabricated photos of EnviroCare
 * technicians, vehicles, offices or customer jobs. No remote stock dependency,
 * new license or image-generation credit is required.
 *
 * Each published story has an explicitly selected illustration. A generic
 * residential/environmental image is preferable to a falsely identified pest.
 * BlogPosting schema / OG cards use the same image as the article page.
 *
 * To revise a cover in future, edit COVER_BY_SLUG only. Reuse is acceptable
 * across the archive but featured/latest posts intentionally vary their art.
 */
export type BlogVisual = {
  src: string;
  alt: string;
  /** Normalized CSS object-position, not a new image crop. */
  position?: string;
  /** Describes provenance; do not imply a generic image documents a job. */
  kind: 'editorial';
};

const VISUALS = {
  southernHome: { src: '/home-southern.jpg', alt: 'Landscaped residential house with a green lawn', position: 'center 50%', kind: 'editorial' },
  familyYard: { src: '/family-yard.jpg', alt: 'Green residential yard and outdoor living space', position: 'center 48%', kind: 'editorial' },
  familyHome: { src: '/hero-family.webp', alt: 'Family enjoying the outdoor area of a house', position: 'center 42%', kind: 'editorial' },
  lakeHome: { src: '/lake-home-hero.jpg', alt: 'Lakefront home and landscape near the water', position: 'center 55%', kind: 'editorial' },
  lakeDock: { src: '/lake-martin-sunset.webp', alt: 'Wooden dock extending into a tree-lined lake at sunset', position: 'center 60%', kind: 'editorial' },
  multiFamily: { src: '/commercial-multifamily.webp', alt: 'Multifamily residential property exterior', position: 'center 54%', kind: 'editorial' },
  baitStations: { src: '/residential-singlefamily.webp', alt: 'In-ground termite bait stations in a landscaped yard', position: 'center 54%', kind: 'editorial' },
  sentricon: { src: '/sentricon-install.webp', alt: 'Close view of a termite bait station being installed in soil', position: 'center', kind: 'editorial' },
  termiteDamage: { src: '/termite-damage.jpg', alt: 'Close-up of damaged wood used to illustrate a termite inspection topic', position: 'center', kind: 'editorial' },
  tickGrass: { src: '/tick-grass.jpg', alt: 'Tick on grass in a yard environment', position: 'center', kind: 'editorial' },
  ants: { src: '/pests/ants.webp', alt: 'Ant image illustrating household ant identification', position: 'center', kind: 'editorial' },
  termites: { src: '/pests/termites.webp', alt: 'Termite image illustrating termite identification', position: 'center', kind: 'editorial' },
  roaches: { src: '/pests/cockroaches.webp', alt: 'Cockroach image illustrating household pest identification', position: 'center', kind: 'editorial' },
  spiders: { src: '/pests/spiders.webp', alt: 'Spider image illustrating pest identification', position: 'center', kind: 'editorial' },
  mosquitoes: { src: '/pests/mosquitoes.webp', alt: 'Mosquito image illustrating biting insects', position: 'center', kind: 'editorial' },
  ticks: { src: '/pests/ticks.webp', alt: 'Tick image illustrating common yard pests', position: 'center', kind: 'editorial' },
  crickets: { src: '/pests/crickets.webp', alt: 'Cricket image illustrating seasonal home pests', position: 'center', kind: 'editorial' },
  silverfish: { src: '/pests/silverfish.webp', alt: 'Silverfish image illustrating moisture-associated pests', position: 'center', kind: 'editorial' },
  centipedes: { src: '/pests/centipedes.webp', alt: 'Centipede image illustrating household pests', position: 'center', kind: 'editorial' },
  millipedes: { src: '/pests/millipedes.webp', alt: 'Millipede image illustrating household pests', position: 'center', kind: 'editorial' },
} as const satisfies Record<string, BlogVisual>;

type VisualKey = keyof typeof VISUALS;

/** Intentional assignment for every article in the 2026-10-17 archive. */
const COVER_BY_SLUG: Record<string, VisualKey> = {
  'spiders-on-boat-docks-lake-martin': 'lakeDock',
  'homeowners-insurance-termite-damage-alabama': 'termiteDamage',
  'how-long-does-sentricon-take-to-work': 'sentricon',
  'kudzu-bugs-alabama': 'southernHome',
  'carpenter-bees-alabama': 'familyYard',
  'pest-control-rental-property-landlords-alabama': 'multiFamily',
  'mosquito-control-lake-house-dock-boathouse': 'lakeHome',
  'mice-vs-rats-alabama-which-do-i-have': 'southernHome',
  'lake-martin-home-pest-checklist': 'lakeDock',
  'selling-house-alabama-pest-checklist': 'familyHome',
  'black-widow-spiders-alabama': 'spiders',
  'first-pest-control-visit-what-to-expect': 'familyYard',
  'pests-after-rain-alabama': 'lakeHome',
  'emergency-pest-control-alabama': 'roaches',
  'formosan-termites-alabama': 'termites',
  'is-sentricon-worth-it': 'baitStations',
  'how-often-pest-control-alabama': 'familyHome',
  'bug-bombs-foggers-do-they-work': 'roaches',
  'chiggers-alabama-yard': 'tickGrass',
  'argentine-ants-alabama-supercolony': 'ants',
  'carpenter-ants-vs-termites-alabama': 'termiteDamage',
  'wasps-yellow-jackets-hornets-alabama': 'familyYard',
  'rodents-alabama-homes-fall': 'southernHome',
  'how-to-get-rid-of-ants-in-house-alabama': 'ants',
  'german-cockroaches-alabama': 'roaches',
  'mosquito-borne-diseases-alabama': 'mosquitoes',
  'how-to-get-rid-of-roaches-alabama': 'roaches',
  'termite-questions-alabama-homeowners': 'baitStations',
  'prevent-tick-bites-alabama': 'tickGrass',
  'termite-damage-signs-alabama': 'termiteDamage',
  'fall-pest-proofing-alabama': 'southernHome',
  'termite-treatment-cost-alabama': 'sentricon',
  'green-caps-in-yard-sentricon': 'baitStations',
  'more-bugs-after-pest-control-treatment': 'ants',
  'pest-control-cost-huntsville': 'familyHome',
  'fleas-in-house-no-pets': 'familyYard',
  'termite-bond-alabama-explained': 'baitStations',
  'termite-inspection-before-buying-home-alabama': 'southernHome',
  'mosquito-repellent-yard-spray-vs-professional': 'mosquitoes',
  'wolf-spiders-birmingham': 'spiders',
  'pest-control-birmingham-guide': 'southernHome',
  'diy-pest-control-mistakes': 'familyYard',
  'winter-pests-alabama': 'crickets',
  'sugar-ants-in-house-alabama': 'ants',
  'pest-control-cost-alabama': 'familyHome',
  'tick-control-alabama': 'ticks',
  'brown-recluse-spiders-alabama': 'spiders',
  'cockroach-control-alabama': 'roaches',
  'spider-control-alabama': 'spiders',
  'ant-control-alabama': 'ants',
  'silverfish-control-alabama': 'silverfish',
  'cricket-control-alabama': 'crickets',
  'centipede-millipede-control-alabama': 'centipedes',
  'best-time-pest-control-alabama': 'familyYard',
  'prepare-home-for-pest-control': 'southernHome',
  'huntsville-pest-control-guide': 'multiFamily',
  'how-to-identify-termites-alabama': 'termites',
  'fire-ants-alabama-summer': 'ants',
  'lake-martin-mosquito-guide': 'lakeHome',
  'alabama-termite-swarm-season': 'termites',
  'mosquito-season-birmingham-al': 'mosquitoes',
  'sentricon-vs-liquid-termite-treatment': 'sentricon',
  'real-estate-wdo-letter-explained': 'southernHome',
};

/** New posts still get a relevant cover without an emoji or a broken <Image>. */
const FALLBACK_BY_CATEGORY: Record<string, VisualKey> = {
  Ants: 'ants',
  Roaches: 'roaches',
  Spiders: 'spiders',
  Termites: 'termites',
  Mosquitoes: 'mosquitoes',
  'Mosquito Control': 'mosquitoes',
  Ticks: 'ticks',
  Seasonal: 'southernHome',
  Pricing: 'familyHome',
  'Real Estate': 'southernHome',
  Local: 'southernHome',
  Tips: 'familyYard',
  Pests: 'familyYard',
  Rodents: 'southernHome',
  Fleas: 'familyYard',
  'Fire Ants': 'ants',
};

export function getBlogVisual(post: { slug: string; category: string }): BlogVisual {
  const key = COVER_BY_SLUG[post.slug] ?? FALLBACK_BY_CATEGORY[post.category] ?? 'southernHome';
  return VISUALS[key];
}
