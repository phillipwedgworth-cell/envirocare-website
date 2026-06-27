import { GREEN, GOLD, INK, CREAM, displayFont, bodyFont } from '@/lib/brand';

export const metadata = {
  alternates: { canonical: '/service-areas' },
  title: 'Service Areas | EnviroCare Pest & Termite — Family-Owned Alabama Since 1958',
  description:
    'EnviroCare serves Birmingham, Lake Martin / Alex City, Huntsville, Auburn and surrounding Alabama communities from three local offices. Find your city.',
};

type Group = { office: string; phone: string; cities: [string, string][] };

const GROUPS: Group[] = [
  {
    office: 'Birmingham / Alabaster Office',
    phone: '(205) 940-6360',
    cities: [
      ['Birmingham', '/birmingham'], ['Hoover', '/hoover'], ['Alabaster', '/alabaster'],
      ['Pelham', '/pelham'], ['Helena', '/helena'], ['Calera', '/calera'],
      ['Chelsea', '/chelsea'], ['Vestavia Hills', '/vestavia-hills'],
      ['Mountain Brook', '/mountain-brook'], ['Homewood', '/homewood'],
      ['Indian Springs', '/indian-springs'], ['Trussville', '/trussville'],
      ['Mt Laurel', '/mt-laurel'], ['Greystone', '/greystone'],
      ['Brook Highland', '/brook-highland'], ['Eagle Point', '/eagle-point'],
      ['Liberty Park', '/liberty-park'], ['Meadow Brook', '/meadow-brook'],
      ['Highland Lakes', '/highland-lakes'], ['Fultondale', '/service-areas/fultondale'],
      ['Bessemer', '/bessemer'], ['McCalla', '/mccalla'], ['Gardendale', '/gardendale'],
      ['Birmingham Exterminator', '/birmingham-exterminator'],
      ['Birmingham Mosquito Control', '/birmingham-mosquito-control'],
      ['Birmingham Termite Control', '/birmingham-termite-control'],
    ],
  },
  {
    office: 'Lake Martin / Alex City Office',
    phone: '(256) 234-6162',
    cities: [
      ['Alexander City', '/alexander-city'], ['Lake Martin', '/lake-martin'],
      ['Dadeville', '/dadeville'], ['Eclectic', '/eclectic'],
      ['Willow Point', '/willow-point'], ['The Ridge', '/the-ridge'],
      ['StillWaters', '/stillwaters'], ['The Heritage', '/the-heritage'],
      ['Sylacauga', '/sylacauga'],
    ],
  },
  {
    office: 'Huntsville Office',
    phone: '(256) 937-7676',
    cities: [
      ['Huntsville', '/huntsville'], ['Madison', '/service-areas/madison'],
      ['Athens', '/athens'], ['Harvest', '/harvest'], ['Hampton Cove', '/hampton-cove'],
      ['Decatur', '/decatur'], ['Hartselle', '/hartselle'],
      ['Meridianville', '/meridianville'], ['Redstone Arsenal', '/service-areas/redstone-arsenal'],
      ['Huntsville Exterminator', '/huntsville-exterminator'],
      ['Huntsville Mosquito Control', '/huntsville-mosquito-control'],
      ['Huntsville Termite Control', '/huntsville-termite-control'],
    ],
  },
  {
    office: 'Auburn / Opelika',
    phone: '(256) 234-6162',
    cities: [['Auburn', '/auburn'], ['Opelika', '/opelika']],
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      <main style={{ background: CREAM, fontFamily: bodyFont, color: INK }}>
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '56px clamp(20px,5vw,64px)' }}>
          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(30px,5vw,46px)', color: INK, margin: 0 }}>
            Where We Serve
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 720, marginTop: 14 }}>
            EnviroCare has protected Alabama homes and businesses since 1958, working from three
            local offices. Find your city below, or call the office nearest you.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 32,
              marginTop: 40,
            }}
          >
            {GROUPS.map(g => (
              <div key={g.office}>
                <h2 style={{ fontFamily: displayFont, fontSize: 20, color: GREEN, margin: '0 0 4px' }}>
                  {g.office}
                </h2>
                <a href={`tel:${g.phone.replace(/[^0-9]/g, '')}`} style={{ color: GOLD, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
                  {g.phone}
                </a>
                <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0' }}>
                  {g.cities.map(([label, href]) => (
                    <li key={href} style={{ lineHeight: 2 }}>
                      <a href={href} style={{ color: INK, textDecoration: 'none', fontSize: 15 }}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
