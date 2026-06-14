/**
 * Alabama ZIP → EnviroCare Office routing
 * Generated May 18, 2026
 *
 * Three offices serve different regions of Alabama:
 * - Birmingham (BIR): Jefferson, Shelby, St. Clair, Walker, Blount, Tuscaloosa
 * - Lake Martin / Alex City (LKM): Tallapoosa, Elmore, Coosa, Lee (Auburn), Chambers, Russell
 * - Huntsville (HSV): Madison, Limestone, Morgan, Marshall, Jackson
 */

export type OfficeId = 'birmingham' | 'lake-martin' | 'huntsville';

export interface Office {
  id: OfficeId;
  name: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cityPageSlug: string;
}

export const OFFICES: Record<OfficeId, Office> = {
  'birmingham': {
    id: 'birmingham',
    name: 'Birmingham Office',
    phone: '2059406360',
    phoneDisplay: '(205) 940-6360',
    address: '2025 Butler Rd',
    city: 'Alabaster',
    state: 'AL',
    zip: '35007',
    cityPageSlug: 'birmingham',
  },
  'lake-martin': {
    id: 'lake-martin',
    name: 'Lake Martin / Alex City Office',
    phone: '2562346162',
    phoneDisplay: '(256) 234-6162',
    address: '1785 Tallapoosa St',
    city: 'Alexander City',
    state: 'AL',
    zip: '35010',
    cityPageSlug: 'lake-martin',
  },
  'huntsville': {
    id: 'huntsville',
    name: 'Huntsville Office',
    phone: '2569377676',
    phoneDisplay: '(256) 937-7676',
    address: '7027 Old Madison Pike, Ste 108',
    city: 'Huntsville',
    state: 'AL',
    zip: '35806',
    cityPageSlug: 'huntsville',
  },
};

/**
 * Master ZIP → Office lookup table.
 * Covers all Alabama zips in EnviroCare's three service regions.
 *
 * BIRMINGHAM METRO (35xxx): Jefferson, Shelby, St. Clair, Walker, Blount counties
 *   + Tuscaloosa (35401-35487)
 *
 * LAKE MARTIN / ALEX CITY (35010-36870 region):
 *   Tallapoosa, Elmore, Coosa, Lee (Auburn/Opelika), Chambers, Russell, Macon
 *
 * HUNTSVILLE METRO (35613-35816, 35749-35763, 35613-35759):
 *   Madison, Limestone, Morgan, Marshall, Jackson, parts of Cullman
 */
export const ZIP_TO_OFFICE: Record<string, OfficeId> = {
  // ===== BIRMINGHAM METRO =====
  // Birmingham proper
  '35201': 'birmingham', '35202': 'birmingham', '35203': 'birmingham', '35204': 'birmingham',
  '35205': 'birmingham', '35206': 'birmingham', '35207': 'birmingham', '35208': 'birmingham',
  '35209': 'birmingham', '35210': 'birmingham', '35211': 'birmingham', '35212': 'birmingham',
  '35213': 'birmingham', '35214': 'birmingham', '35215': 'birmingham', '35216': 'birmingham',
  '35217': 'birmingham', '35218': 'birmingham', '35219': 'birmingham', '35220': 'birmingham',
  '35221': 'birmingham', '35222': 'birmingham', '35223': 'birmingham', '35224': 'birmingham',
  '35226': 'birmingham', '35228': 'birmingham', '35229': 'birmingham', '35230': 'birmingham',
  '35231': 'birmingham', '35232': 'birmingham', '35233': 'birmingham', '35234': 'birmingham',
  '35235': 'birmingham', '35236': 'birmingham', '35237': 'birmingham', '35238': 'birmingham',
  '35242': 'birmingham', '35243': 'birmingham', '35244': 'birmingham', '35246': 'birmingham',
  '35249': 'birmingham', '35253': 'birmingham', '35254': 'birmingham', '35255': 'birmingham',
  '35259': 'birmingham', '35260': 'birmingham', '35261': 'birmingham', '35266': 'birmingham',
  '35282': 'birmingham', '35283': 'birmingham', '35285': 'birmingham', '35287': 'birmingham',
  '35288': 'birmingham', '35290': 'birmingham', '35291': 'birmingham', '35292': 'birmingham',
  '35293': 'birmingham', '35294': 'birmingham', '35295': 'birmingham', '35296': 'birmingham',
  '35297': 'birmingham', '35298': 'birmingham', '35299': 'birmingham',
  // Hoover
  '35226': 'birmingham', '35244': 'birmingham',
  // Vestavia Hills, Mountain Brook, Homewood
  '35213': 'birmingham', '35216': 'birmingham', '35223': 'birmingham', '35243': 'birmingham',
  '35209': 'birmingham',
  // Alabaster (HQ), Pelham, Helena, Calera
  '35007': 'birmingham', '35114': 'birmingham', '35124': 'birmingham', '35080': 'birmingham',
  '35040': 'birmingham',
  // Chelsea
  '35043': 'birmingham',
  // Trussville, Clay, Pinson
  '35173': 'birmingham', '35126': 'birmingham', '35094': 'birmingham',
  // Leeds, Moody, Springville (St. Clair)
  '35094': 'birmingham', '35004': 'birmingham', '35146': 'birmingham',
  // Gardendale, Fultondale, Center Point
  '35071': 'birmingham', '35068': 'birmingham', '35215': 'birmingham',
  // Bessemer, Hueytown, Pleasant Grove
  '35020': 'birmingham', '35021': 'birmingham', '35022': 'birmingham', '35023': 'birmingham',
  '35127': 'birmingham',
  // McCalla
  '35111': 'birmingham',
  // Greystone (within Hoover area)
  '35242': 'birmingham',
  // Mt Laurel
  '35114': 'birmingham',
  // (Tuscaloosa metro removed Jun 14 — not serviced)

  // ===== LAKE MARTIN / ALEX CITY =====
  // Alexander City
  '35010': 'lake-martin', '35011': 'lake-martin',
  // Dadeville
  '36853': 'lake-martin',
  // Eclectic
  '36024': 'lake-martin',
  // Tallassee
  '36078': 'lake-martin',
  // Wetumpka
  '36092': 'lake-martin', '36093': 'lake-martin',
  // Auburn
  '36830': 'lake-martin', '36831': 'lake-martin', '36832': 'lake-martin', '36849': 'lake-martin',
  // Opelika
  '36801': 'lake-martin', '36802': 'lake-martin', '36803': 'lake-martin', '36804': 'lake-martin',
  // Smiths Station
  '36877': 'lake-martin',
  // Phenix City / Russell County
  '36867': 'lake-martin', '36868': 'lake-martin', '36869': 'lake-martin', '36870': 'lake-martin',
  // Tuskegee (Macon)
  '36083': 'lake-martin',
  // Notasulga
  '36866': 'lake-martin',
  // Camp Hill, Hackneyville
  '36850': 'lake-martin', '35089': 'lake-martin',
  // Goodwater, Sylacauga (Coosa/Talladega edge)
  '35072': 'lake-martin',
  // Equality
  '36026': 'lake-martin',
  // Jacksons Gap
  '36861': 'lake-martin',
  // New Site
  '35033': 'lake-martin', '35020': 'birmingham', // (collision intentional — 35020 stays BIR)
  // Roanoke (Randolph)
  '36274': 'lake-martin',
  // LaFayette (Chambers)
  '36862': 'lake-martin',
  // Valley
  '36854': 'lake-martin',
  // Lanett
  '36863': 'lake-martin',

  // ===== HUNTSVILLE METRO =====
  // Huntsville proper
  '35801': 'huntsville', '35802': 'huntsville', '35803': 'huntsville', '35804': 'huntsville',
  '35805': 'huntsville', '35806': 'huntsville', '35807': 'huntsville', '35808': 'huntsville',
  '35809': 'huntsville', '35810': 'huntsville', '35811': 'huntsville', '35812': 'huntsville',
  '35813': 'huntsville', '35814': 'huntsville', '35815': 'huntsville', '35816': 'huntsville',
  '35824': 'huntsville', '35893': 'huntsville', '35894': 'huntsville', '35895': 'huntsville',
  '35896': 'huntsville', '35897': 'huntsville', '35898': 'huntsville', '35899': 'huntsville',
  // Madison
  '35756': 'huntsville', '35757': 'huntsville', '35758': 'huntsville',
  // Harvest
  '35749': 'huntsville',
  // Hampton Cove (Owens Cross Roads)
  '35763': 'huntsville',
  // Athens (Limestone)
  '35611': 'huntsville', '35612': 'huntsville', '35613': 'huntsville', '35614': 'huntsville',
  // Decatur (Morgan)
  '35601': 'huntsville', '35602': 'huntsville', '35603': 'huntsville', '35609': 'huntsville',
  // Hartselle
  '35640': 'huntsville',
  // Priceville
  '35603': 'huntsville',
  // Somerville
  '35670': 'huntsville',
  // Falkville
  '35622': 'huntsville',
  // Trinity, Town Creek
  '35673': 'huntsville', '35672': 'huntsville',
  // Moulton (Lawrence)
  '35650': 'huntsville',
  // Toney
  '35773': 'huntsville',
  // New Hope
  '35760': 'huntsville',
  // Gurley
  '35748': 'huntsville',
  // Meridianville
  '35759': 'huntsville',
  // Hazel Green
  '35750': 'huntsville',
  // Brownsboro
  '35741': 'huntsville',
  // Scottsboro (Jackson)
  '35768': 'huntsville', '35769': 'huntsville',
  // Stevenson, Bridgeport
  '35772': 'huntsville', '35740': 'huntsville',
  // Section, Pisgah
  '35771': 'huntsville', '35765': 'huntsville',
  // Albertville, Boaz, Guntersville (Marshall)
  '35950': 'huntsville', '35951': 'huntsville', '35957': 'huntsville', '35976': 'huntsville',
  '35980': 'huntsville',
  // Arab
  '35016': 'huntsville',
  // Cullman (north Cullman closer to HSV)
  '35055': 'huntsville', '35057': 'huntsville', '35058': 'huntsville',
  '35077': 'huntsville',
};

/**
 * Look up the right office for a given zip code.
 * Falls back to Birmingham (primary office) if zip is unknown.
 */
export function officeForZip(zip: string): Office {
  const cleaned = (zip || '').trim().slice(0, 5);
  const officeId = ZIP_TO_OFFICE[cleaned] || 'birmingham';
  return OFFICES[officeId];
}

/**
 * Returns true if the zip is in EnviroCare's service area.
 */
export function isInServiceArea(zip: string): boolean {
  const cleaned = (zip || '').trim().slice(0, 5);
  return cleaned in ZIP_TO_OFFICE;
}
