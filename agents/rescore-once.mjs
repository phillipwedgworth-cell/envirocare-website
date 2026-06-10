// agents/rescore-once.mjs — one-off: re-evaluate the 2026-06-10 baseline
// queries against the freshly deployed pages. evaluate-content consumes no
// monthly query quota. Safe to delete after the 48-hour test window.
import { scoreContent, getQuery } from './lib/neuronwriter.mjs';

const BASE = 'https://envirocare-web.vercel.app';
const MAP = [
  ['/services/pest-control', '91101ac660291e21', 28],
  ['/services/termite-control', '007b68fa1fca87be', 42],
  ['/services/mosquito-control', '1f236ba7db2f9923', 36],
  ['/services/sentricon', '7faa1bbe5b281eae', 53],
  ['/services/fire-ant', '817c630cefeb15f9', 45],
  ['/services/flea', '0c541c87e2f69831', 25],
  ['/services/tick-control', '9fc4d716b0fa8edf', 28],
  ['/services/crawlspace', '9f6094703baa7d36', 9],
  ['/services/commercial', '17971ccfcc79c37f', 19],
  ['/services/wdo-letters', 'a5ab58a34341fed8', 46],
  ['/services/builder-pre-treat', '7caf174fef24a20c', 21],
  ['/birmingham', 'ecb1735fad64793f', 44],
  ['/huntsville', 'eaee9ea85c850fdf', 54],
  ['/alexander-city', '45b6770980f955c7', 52],
  ['/auburn', '3c27cd4f15912ffa', 48],
  ['/madison', 'd69905f43412684d', 57],
];

// The two ERR'd ids could be swapped (crawlspace vs commercial). Verify by
// keyword before scoring; swap if needed.
try {
  const q = await getQuery('9f6094703baa7d36');
  if (/commercial/i.test(q.keyword ?? '')) {
    MAP[7][1] = '17971ccfcc79c37f';
    MAP[8][1] = '9f6094703baa7d36';
    console.log('(swapped crawlspace/commercial query ids)');
  }
} catch { /* keep default order */ }

for (const [route, queryId, before] of MAP) {
  try {
    const html = await (await fetch(`${BASE}${route}`)).text();
    const s = await scoreContent(queryId, html);
    const now = s.content_score ?? '?';
    const delta = typeof now === 'number' ? (now - before >= 0 ? `+${now - before}` : `${now - before}`) : '';
    console.log(`${route} :: ${before} -> ${now} (${delta})`);
  } catch (e) {
    console.log(`${route} :: ERR ${e.message}`);
  }
}
