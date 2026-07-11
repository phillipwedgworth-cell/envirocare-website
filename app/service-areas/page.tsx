import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { GREEN, GOLD, INK, CREAM, displayFont, bodyFont } from '@/lib/brand';

export const metadata = {
  alternates: { canonical: '/service-areas' },
  title: 'Pest Control & Termite Protection Across the Birmingham Metro | EnviroCare',
  description:
    'EnviroCare serves the entire Birmingham metro — Hoover, Vestavia Hills, Mountain Brook, Homewood, Trussville, Chelsea, Pelham, Helena, Alabaster and more — plus Lake Martin / Alex City and Huntsville. Family-owned since 1958.',
};

type Group = { office: string; phone: string; cities: [string, string][] };

const GROUPS: Group[] = [
  {
    office: 'Birmingham / Alabaster Office',
    phone: '(205) 940-6360',
    cities: [
      ['Over the Mountain (cluster)', '/over-the-mountain'], ['South Birmingham (cluster)', '/south-birmingham'],
      ['East Birmingham (cluster)', '/east-birmingham'], ['North Birmingham (cluster)', '/north-birmingham'],
      ['Birmingham', '/birmingham'], ['Hoover', '/hoover'], ['Alabaster', '/alabaster'],
      ['Pelham', '/pelham'], ['Helena', '/helena'], ['Calera', '/calera'],
      ['Chelsea', '/chelsea'], ['Vestavia Hills', '/vestavia-hills'],
      ['Mountain Brook', '/mountain-brook'], ['Homewood', '/homewood'],
      ['Indian Springs', '/indian-springs'], ['Trussville', '/trussville'],
      ['Mt Laurel', '/mt-laurel'], ['Greystone', '/greystone'],
      ['Brook Highland', '/brook-highland'], ['Eagle Point', '/eagle-point'],
      ['Liberty Park', '/liberty-park'], ['Meadow Brook', '/meadow-brook'],
      ['Highland Lakes', '/highland-lakes'], ['Fultondale', '/fultondale'],
      ['Bessemer', '/bessemer'], ['McCalla', '/mccalla'], ['Gardendale', '/gardendale'],
      ['Irondale', '/irondale'], ['Leeds', '/leeds'], ['Moody', '/moody'],
      ['Birmingham Exterminator', '/birmingham-exterminator'],
      ['Birmingham Mosquito Control', '/birmingham-mosquito-control'],
      ['Birmingham Termite Control', '/birmingham-termite-control'],
    ],
  },
  {
    office: 'Lake Martin / Alex City Office',
    phone: '(256) 234-6162',
    cities: [
      ['Lake Martin & East Alabama (cluster)', '/lake-martin-area'],
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
      ['North Alabama (cluster)', '/north-alabama'],
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
            Pest Control &amp; Termite Protection Across the Birmingham Metro
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 760, marginTop: 14 }}>
            EnviroCare is a Birmingham-metro pest control company, family-owned since 1958. Our
            technicians run daily routes from our Alabaster hub through Hoover, Vestavia Hills,
            Mountain Brook, Homewood, Trussville, Chelsea, Pelham, Helena, Calera, Gardendale and
            the surrounding suburbs — the same four-pillar protection (pest, termite, mosquito,
            tick) on every route. We also serve Lake Martin / Alex City from our original 1958
            office and North Alabama from Huntsville. Find your city below, or call the office
            nearest you.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, maxWidth: 760, marginTop: 10, color: '#5A6660' }}>
            One note on how we work: these are service areas, not storefronts. We have three
            staffed offices — Alabaster, Alexander City, and Huntsville — and our local crews
            serve every community listed here as part of their regular routes.
          </p>

          {/* THREE OFFICES SHOWCASE */}
          <style>{`
            .wws-offices { margin-top: 52px; }
            .wws-office-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 34px; }
            .wws-office-card { position: relative; display: flex; flex-direction: column; background: #fff; border: 1px solid rgba(14,26,15,.08); border-radius: 18px; overflow: hidden; box-shadow: 0 6px 24px rgba(14,26,15,.08); transition: transform .25s ease, box-shadow .25s ease; }
            .wws-office-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(14,26,15,.16); }
            .wws-office-imgwrap { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
            .wws-office-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .45s ease; }
            .wws-office-card:hover .wws-office-img { transform: scale(1.05); }
            .wws-office-badge { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,.94); color: ${GREEN}; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 6px 12px; border-radius: 999px; box-shadow: 0 2px 8px rgba(0,0,0,.14); }
            .wws-office-body { display: flex; flex-direction: column; flex: 1; padding: 20px 22px 22px; }
            .wws-office-name { font-family: ${displayFont}; font-size: 21px; color: ${INK}; margin: 0 0 6px; }
            .wws-office-addr { font-size: 14.5px; line-height: 1.6; color: #5A6660; margin: 0 0 18px; }
            .wws-office-phone { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: ${GREEN}; color: #fff; font-weight: 700; font-size: 15px; text-decoration: none; padding: 11px 16px; border-radius: 10px; }
          `}</style>
          <div className="wws-offices">
            <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
              <div style={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 13, fontWeight: 700, color: GOLD }}>Three Alabama Offices</div>
              <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(24px,4vw,34px)', color: INK, margin: '8px 0 12px' }}>Four Generations, Right Down the Road</h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: INK, margin: 0 }}>Three Alabama offices — each with its own local phone, a familiar local team, and the neighborhoods they know best. You reach people here, not a national call center.</p>
            </div>
            <div className="wws-office-grid">
              <div className="wws-office-card">
                <div className="wws-office-imgwrap">
                  <img className="wws-office-img" src="/birmingham-vulcan.webp" alt="EnviroCare Birmingham / Alabaster office service area" />
                  <span className="wws-office-badge">Main · Birmingham Metro</span>
                </div>
                <div className="wws-office-body">
                  <div className="wws-office-name">Birmingham / Alabaster</div>
                  <div className="wws-office-addr">2025 Butler Road<br />Alabaster, AL 35007</div>
                  <a className="wws-office-phone" href="tel:2059406360">📞 (205) 940-6360</a>
                </div>
              </div>
              <div className="wws-office-card">
                <div className="wws-office-imgwrap">
                  <img className="wws-office-img" src="/lake-martin-sunset.webp" alt="EnviroCare Lake Martin / Alexander City office service area" />
                  <span className="wws-office-badge">Original · 1958</span>
                </div>
                <div className="wws-office-body">
                  <div className="wws-office-name">Lake Martin / Alex City</div>
                  <div className="wws-office-addr">1785 Tallapoosa Street<br />Alexander City, AL 35010</div>
                  <a className="wws-office-phone" href="tel:2562346162">📞 (256) 234-6162</a>
                </div>
              </div>
              <div className="wws-office-card">
                <div className="wws-office-imgwrap">
                  <img className="wws-office-img" src="/huntsville-saturn-v.webp" alt="EnviroCare Huntsville / Madison office service area" />
                  <span className="wws-office-badge">North Alabama</span>
                </div>
                <div className="wws-office-body">
                  <div className="wws-office-name">Huntsville / Madison</div>
                  <div className="wws-office-addr">7027 Old Madison Pike Ste 108<br />Huntsville, AL 35806</div>
                  <a className="wws-office-phone" href="tel:2569377676">📞 (256) 937-7676</a>
                </div>
              </div>
            </div>
          </div>

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
