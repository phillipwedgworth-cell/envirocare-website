// components/CityHeroArt.tsx
// Unique gold landmark silhouette for each city hero.
// Rendered as a full-width decorative band, pointer-events:none, aria-hidden.
// Positioned at zIndex 0; hero text/buttons stay above at zIndex 2+.

const SLUG_TO_ART: Record<string, string> = {
  // Birmingham region
  'birmingham':     'vulcan',
  'tuscaloosa':     'bridge',
  'helena':         'bridge',
  'trussville':     'community',
  'hoover':         'community',
  'homewood':       'community',
  'alabaster':      'community',
  'calera':         'train',
  'opelika':        'train',
  'vestavia-hills': 'forest',
  'chelsea':        'forest',
  'pelham':         'forest',
  'mountain-brook': 'oak',
  'greystone':      'oak',
  'mt-laurel':      'oak',
  'auburn':         'oak',
  // Lake Martin region
  'lake-martin':    'lake',
  'alexander-city': 'lake',
  'dadeville':      'lake',
  'eclectic':       'lake',
  // Huntsville region
  'huntsville':     'rocket',
  'madison':        'rocket',
  'athens':         'community',
  'decatur':        'bridge',
  'harvest':        'forest',
  'hartselle':      'forest',
  'hampton-cove':   'forest',
};

const SCENES: Record<string, string> = {
  vulcan: `<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><linearGradient id="vFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F5A800" stop-opacity="0.22"/><stop offset="100%" stop-color="#F5A800" stop-opacity="0.05"/></linearGradient></defs>
<rect x="0" y="100" width="90" height="100" fill="url(#vFade)"/>
<rect x="100" y="80" width="110" height="120" fill="url(#vFade)"/>
<rect x="220" y="60" width="140" height="140" fill="url(#vFade)"/>
<rect x="380" y="70" width="100" height="130" fill="url(#vFade)"/>
<rect x="700" y="80" width="120" height="120" fill="url(#vFade)"/>
<rect x="840" y="60" width="140" height="140" fill="url(#vFade)"/>
<rect x="1010" y="90" width="100" height="110" fill="url(#vFade)"/>
<rect x="1120" y="75" width="80" height="125" fill="url(#vFade)"/>
<g transform="translate(580,10)" fill="#F5A800" opacity="0.55">
  <rect x="-50" y="150" width="100" height="40" fill="url(#vFade)"/>
  <rect x="-60" y="185" width="120" height="8" fill="url(#vFade)"/>
  <rect x="-18" y="100" width="14" height="55"/>
  <rect x="4" y="100" width="14" height="55"/>
  <path d="M-28 72 L28 72 L32 102 L-32 102 Z"/>
  <rect x="-22" y="38" width="44" height="36"/>
  <circle cx="0" cy="28" r="14"/>
  <rect x="16" y="8" width="9" height="44" transform="rotate(14,20,30)"/>
  <circle cx="32" cy="4" r="7" opacity="0.85"/>
</g>
<g fill="#F5A800" opacity="0.4">
  <circle cx="120" cy="18" r="2.5"/><circle cx="300" cy="12" r="3"/><circle cx="900" cy="16" r="2.5"/><circle cx="1080" cy="22" r="3"/>
</g>
</svg>`,

  rocket: `<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><linearGradient id="rFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F5A800" stop-opacity="0.2"/><stop offset="100%" stop-color="#F5A800" stop-opacity="0.04"/></linearGradient></defs>
<rect x="0" y="120" width="80" height="80" fill="url(#rFade)"/>
<rect x="90" y="100" width="60" height="100" fill="url(#rFade)"/>
<rect x="160" y="80" width="100" height="120" fill="url(#rFade)"/>
<rect x="650" y="90" width="80" height="110" fill="url(#rFade)"/>
<rect x="750" y="70" width="110" height="130" fill="url(#rFade)"/>
<rect x="1050" y="100" width="90" height="100" fill="url(#rFade)"/>
<g transform="translate(580,0)" fill="#F5A800" opacity="0.55">
  <polygon points="0,0 -20,55 20,55"/>
  <rect x="-20" y="55" width="40" height="110"/>
  <rect x="-20" y="68" width="40" height="5" fill="#0A7935" opacity="0.5"/>
  <rect x="-20" y="90" width="40" height="5" fill="#0A7935" opacity="0.5"/>
  <rect x="-20" y="112" width="40" height="5" fill="#0A7935" opacity="0.5"/>
  <polygon points="-22,165 -16,188 16,188 22,165" opacity="0.85"/>
  <polygon points="-22,148 -36,182 -22,182" opacity="0.8"/>
  <polygon points="22,148 36,182 22,182" opacity="0.8"/>
  <path d="M-16 188 Q-8 200 0 206 Q8 200 16 188 Z" opacity="0.7"/>
</g>
<g fill="#F5A800" opacity="0.35">
  <circle cx="200" cy="20" r="2.5"/><circle cx="440" cy="14" r="3"/><circle cx="820" cy="18" r="2.5"/><circle cx="1100" cy="24" r="2.5"/>
</g>
</svg>`,

  lake: `<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><linearGradient id="lFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F5A800" stop-opacity="0.18"/><stop offset="100%" stop-color="#F5A800" stop-opacity="0.04"/></linearGradient></defs>
<circle cx="1080" cy="40" r="32" fill="#F5A800" opacity="0.55"/>
<circle cx="1092" cy="37" r="29" fill="#0A7935" opacity="0.9"/>
<g fill="#F5A800" opacity="0.5">
  <path d="M100 160 Q130 100 118 50 Z"/><path d="M160 160 Q195 80 180 30 Z"/>
  <path d="M320 160 Q340 110 330 65 Z"/>
  <path d="M900 160 Q928 95 915 42 Z"/><path d="M960 160 Q985 105 972 58 Z"/>
</g>
<g transform="translate(580,100)" fill="#F5A800" opacity="0.6">
  <rect x="-55" y="0" width="110" height="60"/>
  <polygon points="-62,0 62,0 0,-38" opacity="0.8"/>
  <rect x="-22" y="22" width="26" height="32" fill="#0A7935" opacity="0.5"/>
  <rect x="16" y="16" width="20" height="20" opacity="0.75"/>
</g>
<rect x="0" y="155" width="1200" height="45" fill="#F5A800" opacity="0.08"/>
<path d="M0 165 Q300 155 600 165 T1200 165" stroke="#F5A800" stroke-width="1.5" stroke-opacity="0.3" fill="none"/>
<path d="M0 178 Q300 170 600 178 T1200 178" stroke="#F5A800" stroke-width="1" stroke-opacity="0.2" fill="none"/>
<g transform="translate(380,158)" stroke="#F5A800" stroke-width="2.5" opacity="0.6" fill="none">
  <line x1="-40" y1="0" x2="40" y2="0"/><line x1="-32" y1="0" x2="-32" y2="20"/>
  <line x1="0" y1="0" x2="0" y2="20"/><line x1="32" y1="0" x2="32" y2="20"/>
</g>
</svg>`,

  oak: `<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><radialGradient id="oFol" cx="50%" cy="40%"><stop offset="0%" stop-color="#F5A800" stop-opacity="0.22"/><stop offset="100%" stop-color="#F5A800" stop-opacity="0.06"/></radialGradient></defs>
<g transform="translate(580,200)">
  <rect x="-14" y="-100" width="28" height="100" fill="#F5A800" opacity="0.4"/>
  <path d="M-12 -65 Q-48 -40 -60 -10 M-12 -40 Q-38 -22 -46 0 M12 -65 Q48 -40 60 -10 M12 -40 Q38 -22 46 0" stroke="#F5A800" stroke-width="4" stroke-opacity="0.35" fill="none" stroke-linecap="round"/>
  <circle r="110" fill="url(#oFol)"/>
  <circle cx="-52" cy="-22" r="60" fill="url(#oFol)"/>
  <circle cx="52" cy="-22" r="60" fill="url(#oFol)"/>
  <circle cx="-72" cy="28" r="46" fill="url(#oFol)"/>
  <circle cx="72" cy="28" r="46" fill="url(#oFol)"/>
</g>
<g fill="#F5A800" opacity="0.25">
  <circle cx="80" cy="180" r="3"/><circle cx="180" cy="190" r="2.5"/>
  <circle cx="1020" cy="182" r="3"/><circle cx="1120" cy="192" r="2.5"/>
</g>
<rect x="0" y="185" width="1200" height="15" fill="#F5A800" opacity="0.1"/>
</svg>`,

  train: `<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><linearGradient id="tFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F5A800" stop-opacity="0.2"/><stop offset="100%" stop-color="#F5A800" stop-opacity="0.04"/></linearGradient></defs>
<rect x="0" y="145" width="1200" height="5" fill="#F5A800" opacity="0.45"/>
<rect x="0" y="168" width="1200" height="5" fill="#F5A800" opacity="0.45"/>
<g opacity="0.35" fill="#F5A800">
  <rect x="30" y="150" width="5" height="18"/><rect x="120" y="150" width="5" height="18"/>
  <rect x="210" y="150" width="5" height="18"/><rect x="300" y="150" width="5" height="18"/>
  <rect x="390" y="150" width="5" height="18"/><rect x="480" y="150" width="5" height="18"/>
  <rect x="570" y="150" width="5" height="18"/><rect x="660" y="150" width="5" height="18"/>
  <rect x="750" y="150" width="5" height="18"/><rect x="840" y="150" width="5" height="18"/>
  <rect x="930" y="150" width="5" height="18"/><rect x="1020" y="150" width="5" height="18"/>
  <rect x="1110" y="150" width="5" height="18"/>
</g>
<g transform="translate(480,95)" fill="#F5A800" opacity="0.58">
  <rect x="0" y="0" width="200" height="60" rx="5"/>
  <rect x="0" y="-25" width="60" height="25" rx="3"/>
  <rect x="90" y="14" width="30" height="24" fill="#0A7935" opacity="0.5"/>
  <rect x="135" y="14" width="30" height="24" fill="#0A7935" opacity="0.5"/>
  <circle cx="30" cy="72" r="18" fill="#F5A800" stroke="#0A7935" stroke-width="4"/>
  <circle cx="90" cy="72" r="18" fill="#F5A800" stroke="#0A7935" stroke-width="4"/>
  <circle cx="170" cy="72" r="18" fill="#F5A800" stroke="#0A7935" stroke-width="4"/>
  <rect x="44" y="-46" width="18" height="22"/>
  <circle cx="53" cy="-52" r="9" opacity="0.9"/>
</g>
<g fill="#F5A800" opacity="0.5">
  <rect x="700" y="80" width="80" height="70" fill="url(#tFade)"/>
  <polygon points="695,80 785,80 740,55" fill="url(#tFade)"/>
  <rect x="800" y="65" width="65" height="80" fill="url(#tFade)"/>
</g>
<g fill="#F5A800" opacity="0.35">
  <circle cx="90" cy="48" r="2.5"/><circle cx="260" cy="36" r="3"/><circle cx="940" cy="44" r="2.5"/>
</g>
</svg>`,

  bridge: `<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><linearGradient id="bFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F5A800" stop-opacity="0.18"/><stop offset="100%" stop-color="#F5A800" stop-opacity="0.04"/></linearGradient></defs>
<rect x="0" y="150" width="1200" height="50" fill="#F5A800" opacity="0.1"/>
<path d="M0 158 Q300 145 600 158 T1200 158" stroke="#F5A800" stroke-width="1.5" stroke-opacity="0.28" fill="none"/>
<g stroke="#F5A800" stroke-width="3.5" fill="none" opacity="0.55">
  <path d="M60 145 Q600 30 1140 145"/>
  <line x1="60" y1="145" x2="60" y2="175"/>
  <line x1="186" y1="105" x2="186" y2="165"/>
  <line x1="312" y1="75" x2="312" y2="158"/>
  <line x1="438" y1="52" x2="438" y2="154"/>
  <line x1="600" y1="38" x2="600" y2="152"/>
  <line x1="762" y1="52" x2="762" y2="154"/>
  <line x1="888" y1="75" x2="888" y2="158"/>
  <line x1="1014" y1="105" x2="1014" y2="165"/>
  <line x1="1140" y1="145" x2="1140" y2="175"/>
</g>
<rect x="0" y="145" width="1200" height="12" fill="#F5A800" opacity="0.45"/>
<g fill="#F5A800" opacity="0.4">
  <rect x="28" y="105" width="36" height="40"/><rect x="1136" y="105" width="36" height="40"/>
</g>
<g fill="#F5A800" opacity="0.35">
  <circle cx="160" cy="30" r="2.5"/><circle cx="440" cy="22" r="3"/><circle cx="900" cy="28" r="2.5"/>
</g>
</svg>`,

  community: `<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><linearGradient id="cFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F5A800" stop-opacity="0.2"/><stop offset="100%" stop-color="#F5A800" stop-opacity="0.05"/></linearGradient></defs>
<g fill="url(#cFade)" stroke="#F5A800" stroke-opacity="0.15" stroke-width="1">
  <rect x="30" y="120" width="100" height="80"/><polygon points="30,120 130,120 80,80"/><rect x="65" y="155" width="30" height="45" fill="#0A7935" opacity="0.3"/>
  <rect x="185" y="100" width="130" height="100"/><polygon points="185,100 315,100 250,55"/><rect x="225" y="145" width="30" height="55" fill="#0A7935" opacity="0.3"/>
  <rect x="380" y="115" width="90" height="85"/><polygon points="380,115 470,115 425,78"/><rect x="412" y="152" width="26" height="48" fill="#0A7935" opacity="0.3"/>
  <rect x="740" y="108" width="120" height="92"/><polygon points="740,108 860,108 800,62"/><rect x="780" y="150" width="30" height="50" fill="#0A7935" opacity="0.3"/>
  <rect x="900" y="120" width="90" height="80"/><polygon points="900,120 990,120 945,82"/><rect x="930" y="155" width="26" height="45" fill="#0A7935" opacity="0.3"/>
  <rect x="1050" y="100" width="130" height="100"/><polygon points="1050,100 1180,100 1115,56"/><rect x="1090" y="145" width="30" height="55" fill="#0A7935" opacity="0.3"/>
</g>
<rect x="0" y="185" width="1200" height="15" fill="#F5A800" opacity="0.12"/>
<path d="M0 190 L1200 190" stroke="#F5A800" stroke-width="1" stroke-opacity="0.3"/>
<g fill="#F5A800" opacity="0.35">
  <circle cx="160" cy="35" r="2.5"/><circle cx="500" cy="28" r="3"/><circle cx="850" cy="32" r="2.5"/><circle cx="1020" cy="40" r="2.5"/>
</g>
</svg>`,

  forest: `<svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><radialGradient id="fFol" cx="50%" cy="40%"><stop offset="0%" stop-color="#F5A800" stop-opacity="0.22"/><stop offset="100%" stop-color="#F5A800" stop-opacity="0.06"/></radialGradient></defs>
<g fill="url(#fFol)" stroke="#F5A800" stroke-opacity="0.1" stroke-width="1">
  <rect x="58" y="170" width="12" height="30" fill="#F5A800" opacity="0.3"/>
  <polygon points="64,50 36,140 92,140"/><polygon points="64,95 38,175 90,175"/>
  <rect x="178" y="175" width="12" height="25" fill="#F5A800" opacity="0.3"/>
  <polygon points="184,80 158,165 210,165"/><polygon points="184,125 160,182 208,182"/>
  <rect x="298" y="170" width="12" height="30" fill="#F5A800" opacity="0.3"/>
  <polygon points="304,40 270,140 338,140"/><polygon points="304,90 274,175 334,175"/>
  <rect x="598" y="165" width="12" height="35" fill="#F5A800" opacity="0.3"/>
  <polygon points="604,30 565,135 643,135"/><polygon points="604,85 570,170 638,170"/>
  <rect x="758" y="175" width="12" height="25" fill="#F5A800" opacity="0.3"/>
  <polygon points="764,85 738,168 790,168"/><polygon points="764,128 740,182 788,182"/>
  <rect x="898" y="170" width="12" height="30" fill="#F5A800" opacity="0.3"/>
  <polygon points="904,52 872,145 936,145"/><polygon points="904,98 875,178 933,178"/>
  <rect x="1078" y="175" width="12" height="25" fill="#F5A800" opacity="0.3"/>
  <polygon points="1084,88 1058,168 1110,168"/><polygon points="1084,130 1060,182 1108,182"/>
  <rect x="1138" y="170" width="12" height="30" fill="#F5A800" opacity="0.3"/>
  <polygon points="1144,58 1114,148 1174,148"/><polygon points="1144,105 1118,178 1170,178"/>
</g>
<rect x="0" y="190" width="1200" height="10" fill="#F5A800" opacity="0.1"/>
<g fill="#F5A800" opacity="0.35">
  <circle cx="140" cy="35" r="2.5"/><circle cx="440" cy="26" r="3"/><circle cx="840" cy="32" r="2.5"/>
</g>
</svg>`,
};

const DEFAULT_ART = SCENES.community;

export default function CityHeroArt({ slug }: { slug: string }) {
  const theme = SLUG_TO_ART[slug] ?? '_default';
  const svg = SCENES[theme] ?? DEFAULT_ART;
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.85,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
