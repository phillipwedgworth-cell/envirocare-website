// Code-level backstop for the SoLV rule in morning-brief.mjs SYSTEM (Sunday audit 2026-10-04, R5):
// the 10-02 and 10-03 briefs said "Alabaster surge (+25 pts since Aug 27)" by
// subtracting a 9x9/20-mile-grid baseline from goals.md from a new campaign's
// 7x7 figure. A prompt rule alone is a suggestion, so any line that pairs a
// point change with "since <date>" is removed and a note says why.
const MONTH = '(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\.?';
const SINCE_DATE = new RegExp(`\\bsince\\s+(?:${MONTH}\\s+\\d{1,2}|\\d{4}-\\d{2}-\\d{2}|\\d{1,2}/\\d{1,2})`, 'i');
const POINT_MOVE = /(?:(?:[+\u2212-]|\b(?:up|down|rose|fell|gained|lost|dropped|climbed)\s+)\s?\d+(?:\.\d+)?\s?(?:pts?|points?|pp|%)|\b(?:surge|jump|leap|soar)\w*)/i;
export function stripCrossSeriesClaims(text) {
  let removed = 0;
  const out = String(text).split('\n').filter((line) => {
    const bad = SINCE_DATE.test(line) && POINT_MOVE.test(line);
    if (bad) removed++;
    return !bad;
  });
  if (removed) out.push('', `(${removed} line(s) removed: a ranking change computed against an older, differently measured baseline is not a real movement.)`);
  return { text: out.join('\n'), removed };
}

