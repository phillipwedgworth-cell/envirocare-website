// data/local-service-links.ts — the city × service combo pages, with the
// descriptive anchor text used wherever the site links to them.
//
// Why this exists (2026-11-26): BrightLocal's AI Insights for the Alabaster
// location (run Oct 24 2026) listed these routes as under-linked — reachable
// only from the footer and /service-areas, never from the homepage or the nav.
// The homepage section and the header's "Local Services" menu both read this
// list, so a new combo page only needs adding here (and to COMBO_SLUGS in
// app/sitemap.ts) to be linked everywhere it should be.
//
// Anchor format: "{Service} in {City}, AL" — the same wording as the page title.
// Every href must be an existing app/<slug>/page.tsx route.

export type LocalServiceLink = { label: string; href: string };
export type LocalServiceGroup = { city: string; links: LocalServiceLink[] };

export const LOCAL_SERVICE_GROUPS: LocalServiceGroup[] = [
  {
    city: 'Birmingham',
    links: [
      { label: 'Termite Control in Birmingham, AL', href: '/birmingham-termite-control' },
      { label: 'Mosquito Control in Birmingham, AL', href: '/birmingham-mosquito-control' },
      { label: 'Exterminator in Birmingham, AL', href: '/birmingham-exterminator' },
    ],
  },
  {
    city: 'Vestavia Hills',
    links: [
      { label: 'Termite Control in Vestavia Hills, AL', href: '/vestavia-hills-termite-control' },
      { label: 'Mosquito Control in Vestavia Hills, AL', href: '/vestavia-hills-mosquito-control' },
      { label: 'Exterminator in Vestavia Hills, AL', href: '/vestavia-hills-exterminator' },
    ],
  },
  {
    city: 'Huntsville',
    links: [
      { label: 'Termite Control in Huntsville, AL', href: '/huntsville-termite-control' },
      { label: 'Mosquito Control in Huntsville, AL', href: '/huntsville-mosquito-control' },
      { label: 'Exterminator in Huntsville, AL', href: '/huntsville-exterminator' },
      { label: 'Data Center Pest Control in Alabama', href: '/data-center-pest-control' },
    ],
  },
  {
    city: 'Madison',
    links: [
      { label: 'Pest Control in Madison, AL', href: '/madison-pest-control' },
      { label: 'Termite Control in Madison, AL', href: '/madison-termite-control' },
      { label: 'Mosquito Control in Madison, AL', href: '/madison-mosquito-control' },
      { label: 'Exterminator in Madison, AL', href: '/madison-exterminator' },
      { label: 'Commercial Pest Control in Madison, AL', href: '/madison-commercial-pest-control' },
    ],
  },
  {
    city: 'Decatur',
    links: [
      { label: 'Termite Control in Decatur, AL', href: '/decatur-termite-control' },
      { label: 'Mosquito Control in Decatur, AL', href: '/decatur-mosquito-control' },
      { label: 'Exterminator in Decatur, AL', href: '/decatur-exterminator' },
    ],
  },
];

export const LOCAL_SERVICE_LINKS: LocalServiceLink[] = LOCAL_SERVICE_GROUPS.flatMap((g) => g.links);
