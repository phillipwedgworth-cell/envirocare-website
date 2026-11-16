// scripts/test-lead-screen.mjs — `npm run test:lead-screen` (patch 0023).
// The ZIPs below are the real non-Alabama "leads" stored Oct 11 – Nov 9 2026
// (Supabase leads table, read 2026-11-10), plus real customer ZIPs from the
// same window that must keep flowing.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { screenSubmission, ALABAMA_ZIP, MIN_FILL_MS } from '../lib/leads/screen.ts';

let fail = 0;
const check = (name, fn) => { try { fn(); console.log(`PASS ${name}`); } catch (e) { fail++; console.error(`FAIL ${name}\n  ${e.message}`); } };

const junk = ['43925', '33101', '80743', '22911', '41287', '32672', '47700', '52874', '34411', '45700'];
const real = ['35216', '35173', '35212', '35758', '35049', '35043', '35824', '35802', '35611', '35603', '35022', '36054', '35040', '35242', '35816', '36049', '36853', '36830', '35010'];

check('every out-of-state ZIP seen in the last month is screened as out_of_area', () => {
  for (const zip of junk) {
    const r = screenSubmission({ zip, honeypot: '', elapsedMs: 30_000 });
    assert.equal(r.ok, false, zip); assert.equal(r.code, 'out_of_area', zip);
  }
});
check('every real Alabama customer ZIP from the same month passes', () => {
  for (const zip of real) assert.deepEqual(screenSubmission({ zip, honeypot: '', elapsedMs: 30_000 }), { ok: true }, zip);
});
check('ZIP+4, spaces and blanks are handled', () => {
  assert.equal(screenSubmission({ zip: ' 35007-1234 ', elapsedMs: 9000 }).ok, true);
  assert.equal(screenSubmission({ zip: '', elapsedMs: 9000 }).code, 'out_of_area');
  assert.equal(screenSubmission({ zip: undefined }).code, 'out_of_area');
});
check('hidden bot-trap field screens even an Alabama ZIP', () => {
  assert.equal(screenSubmission({ zip: '35007', honeypot: 'http://spam.example', elapsedMs: 9000 }).code, 'bot_field');
});
check('a submit faster than a person can type is screened; normal and missing timings pass', () => {
  assert.equal(screenSubmission({ zip: '35007', elapsedMs: 400 }).code, 'too_fast');
  assert.equal(screenSubmission({ zip: '35007', elapsedMs: MIN_FILL_MS }).ok, true);
  assert.equal(screenSubmission({ zip: '35007' }).ok, true, 'older callers that send no timing are not penalised');
  assert.equal(screenSubmission({ zip: '35007', elapsedMs: 'abc' }).ok, true);
});
check('Alabama ZIP rule covers 350xx–369xx only', () => {
  assert.ok(ALABAMA_ZIP.test('35004') && ALABAMA_ZIP.test('36925'));
  assert.ok(!ALABAMA_ZIP.test('34999') && !ALABAMA_ZIP.test('37000') && !ALABAMA_ZIP.test('3500'));
});
for (const f of ['components/ScheduleRequest.tsx', 'components/pages/ContactUs.tsx']) {
  check(`${f} carries the 3[56]\\d{3} Alabama ZIP rule and posts to /api/quote`, () => {
    const src = fs.readFileSync(f, 'utf8');
    assert.ok(src.includes('3[56]\\d{3}'), 'Alabama ZIP regex present');
    assert.ok(src.includes('"/api/quote"'), 'posts to /api/quote');
    assert.ok(!/formspree\.io/.test(src), 'no Formspree endpoint');
    assert.ok(src.includes('company_website') && src.includes('elapsed_ms'), 'sends bot-trap field and fill time');
  });
}
const route = fs.readFileSync('app/api/quote/route.ts', 'utf8');
check('/api/quote screens before it stores, routes or emails', () => {
  const iScreen = route.indexOf('screenSubmission(');
  assert.ok(iScreen > 0, 'screenSubmission is called');
  assert.ok(iScreen < route.indexOf('const office = routeByZip('), 'screen runs before routing');
  assert.ok(iScreen < route.indexOf('await storeLead('), 'screen runs before the real store');
  assert.ok(iScreen < route.indexOf('await emailLead('), 'screen runs before staff email');
  assert.ok(/status:\s*"not_a_lead"/.test(route), 'screened rows are kept as not_a_lead');
});

if (fail) { console.error(`\ntest:lead-screen FAILED (${fail})`); process.exit(1); }
console.log('\ntest:lead-screen OK — 10/10 out-of-state junk screened, 19/19 real Alabama ZIPs pass');
