// agents/lib/originality.mjs — plagiarism / duplicate-phrasing check for new copy.
//
// NeuronWriter's plagiarism checker is a UI button only: its public API (0.5) has
// no plagiarism endpoint (verified against neuronwriter.com/faqs/neuronwriter-api-
// how-to-use, 2026-10-12). So the fleet runs its own check, which is also the
// stricter one for our purposes — it compares a draft against the exact pages it
// is trying to outrank (the SERP competitors NeuronWriter analysed) AND against
// every other EnviroCare page, which an external plagiarism tool does not do.
//
// METHOD. Containment on 8-word shingles: the share of the DRAFT's 8-word runs that
// also appear in the other document. Containment, not Jaccard, because a short
// draft copied out of a long competitor page has a tiny Jaccard score but 100%
// containment. Same tokenisation as scripts/test-page-similarity.mjs.
//
// THRESHOLDS (defaults, override per call):
//   competitor  > 0.03  -> fail  (three in a hundred 8-word runs copied is already
//                                 a sentence or two lifted from someone else)
//   own site    > 0.15  -> fail  (some house phrasing — office address, the $1M
//                                 disclosure — legitimately repeats across pages)
// Pure functions, no I/O: unit-tested by scripts/test-originality.mjs.

export const K = 8;

export function normalise(text) {
  return String(text || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function shingles(text, k = K) {
  const words = normalise(text).split(' ').filter(Boolean);
  const out = new Set();
  for (let i = 0; i + k <= words.length; i++) out.add(words.slice(i, i + k).join(' '));
  return out;
}

// Share of `draft`'s shingles that also occur in `other` (0..1).
export function containment(draft, other, k = K) {
  const a = draft instanceof Set ? draft : shingles(draft, k);
  if (!a.size) return 0;
  const b = other instanceof Set ? other : shingles(other, k);
  let hit = 0;
  for (const s of a) if (b.has(s)) hit++;
  return hit / a.size;
}

// The longest run of shared words, for a human-readable reason when a draft fails.
export function sharedPhrases(draft, other, k = K, limit = 3) {
  const a = shingles(draft, k);
  const b = shingles(other, k);
  const hits = [...a].filter((s) => b.has(s));
  return hits.slice(0, limit);
}

/**
 * checkOriginality(draftText, { competitors: [{url,text}], sitePages: [{route,text}] })
 * -> { pass, maxCompetitorOverlap, maxSiteOverlap, worstCompetitor, worstSitePage, examples, competitorsChecked }
 */
export function checkOriginality(draftText, { competitors = [], sitePages = [], competitorMax = 0.03, siteMax = 0.15 } = {}) {
  const d = shingles(draftText);
  let maxC = 0, worstC = null, maxS = 0, worstS = null;
  let checked = 0;
  for (const c of competitors) {
    if (!c?.text || normalise(c.text).split(' ').length < 50) continue; // blocked/empty pages prove nothing
    checked++;
    const v = containment(d, c.text);
    if (v > maxC) { maxC = v; worstC = c.url; }
  }
  for (const p of sitePages) {
    if (!p?.text) continue;
    const v = containment(d, p.text);
    if (v > maxS) { maxS = v; worstS = p.route; }
  }
  const examples = [];
  if (maxC > competitorMax && worstC) examples.push(...sharedPhrases(draftText, competitors.find((c) => c.url === worstC).text));
  if (maxS > siteMax && worstS) examples.push(...sharedPhrases(draftText, sitePages.find((p) => p.route === worstS).text));
  return {
    pass: maxC <= competitorMax && maxS <= siteMax,
    maxCompetitorOverlap: round(maxC),
    maxSiteOverlap: round(maxS),
    worstCompetitor: worstC,
    worstSitePage: worstS,
    competitorsChecked: checked,
    examples,
  };
}

const round = (n) => Math.round(n * 1000) / 1000;
