// agents/rescore-all.mjs — zero-quota rescore: maps every existing NeuronWriter
// query (by keyword) to its live route and re-runs evaluate-content.
import { scoreContent } from './lib/neuronwriter.mjs';

const BASE = 'https://envirocare-web.vercel.app';
const KEYWORD_TO_ROUTE = {
  'pest control birmingham al': '/services/pest-control',
  'termite control birmingham al': '/services/termite-control',
  'mosquito control birmingham al': '/services/mosquito-control',
  'sentricon termite system alabama': '/services/sentricon',
  'fire ant control alabama': '/services/fire-ant',
  'flea control birmingham al': '/services/flea',
  'tick control birmingham al': '/services/tick-control',
  'crawl space encapsulation alabama': '/services/crawlspace',
  'commercial pest control birmingham al': '/services/commercial',
  'wdo letter inspection alabama': '/services/wdo-letters',
  'pre-construction pest treatment alabama': '/services/builder-pre-treat',
  'pest control huntsville al': '/huntsville',
  'pest control alexander city al': '/alexander-city',
  'pest control auburn al': '/auburn',
  'pest control madison al': '/madison',
  'pest control athens al': '/athens',
  'mosquito control birmingham': '/birmingham-mosquito-control',
  'mosquito control huntsville': '/huntsville-mosquito-control',
  'termite control birmingham': '/birmingham-termite-control',
  'termite control huntsville': '/huntsville-termite-control',
  'exterminator birmingham al': '/birmingham-exterminator',
  'exterminator huntsville al': '/huntsville-exterminator',
};

const resp = await fetch('https://app.neuronwriter.com/neuron-api/0.5/list-queries', {
  method: 'POST',
  headers: { 'X-API-KEY': process.env.NEURONWRITER_API_KEY, 'Content-Type': 'application/json' },
  body: JSON.stringify({ project: '9d0bec3a70f4743c' }),
});
const queries = await resp.json();
console.log(`queries in project: ${queries.length}`);

// newest query per keyword
const byKeyword = {};
for (const q of queries) {
  const k = (q.keyword ?? '').toLowerCase();
  if (!byKeyword[k] || (q.created ?? '') > (byKeyword[k].created ?? '')) byKeyword[k] = q;
}

const results = [];
for (const [keyword, route] of Object.entries(KEYWORD_TO_ROUTE)) {
  const q = byKeyword[keyword];
  if (!q) { console.log(`${route} :: no query for "${keyword}"`); continue; }
  try {
    const html = await (await fetch(`${BASE}${route}`)).text();
    const s = await scoreContent(q.query ?? q.id, html);
    console.log(`${route} :: ${s.content_score}`);
    results.push({ route, score: s.content_score });
  } catch (e) {
    console.log(`${route} :: ERR ${e.message}`);
  }
}
const inBand = results.filter(r => r.score >= 70).length;
console.log(`\n${results.length} pages scored · ${inBand} in/above the 70 band`);
