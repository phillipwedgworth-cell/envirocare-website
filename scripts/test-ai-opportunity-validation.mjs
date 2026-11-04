import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { validateAiOpportunityExport } from '../agents/lib/ai-opportunity-validation.mjs';
const now = new Date('2026-11-03T18:00:00Z');
const good = { exported: '2026-11-03', total_opportunities: 1, opportunities: [{ prompt: 'pest control birmingham al', type: 'optimize', status: 'todo', page: 'app/birmingham/page.tsx' }] };
assert.equal(validateAiOpportunityExport(good, now), good);
for (const [data, expected] of [
  [{ ...good, exported: '2026-07-16' }, /stale/],
  [{ ...good, exported: '2026-11-20' }, /future/],
  [{ ...good, exported: '2026-02-30' }, /invalid/],
  [{ ...good, total_opportunities: 74 }, /partial/],
  [{ ...good, opportunities: [{ ...good.opportunities[0], page: '../private' }] }, /mapping/],
]) assert.throws(() => validateAiOpportunityExport(data, now), expected);
// Exercise the actual CLI against isolated historical fixtures. A future valid
// account export must not make this test fail or mutate the real target queue.
const fixture = mkdtempSync(join(tmpdir(), 'ai-intake-test-'));
try {
  mkdirSync(join(fixture, 'lib')); mkdirSync(join(fixture, 'neuronwriter-content'));
  copyFileSync(new URL('../agents/ai-opportunities-intake.mjs', import.meta.url), join(fixture, 'intake.mjs'));
  copyFileSync(new URL('../agents/lib/ai-opportunity-validation.mjs', import.meta.url), join(fixture, 'lib/ai-opportunity-validation.mjs'));
  writeFileSync(join(fixture, 'neuronwriter-content/ai-opportunities.json'), JSON.stringify({ ...good, exported: '2001-01-01', total_opportunities: 74 }));
  const target = join(fixture, 'neuronwriter-targets.json');
  const before = JSON.stringify({ targets: [] }); writeFileSync(target, before);
  const run = spawnSync(process.execPath, [join(fixture, 'intake.mjs')], { encoding: 'utf8' });
  assert.equal(run.status, 1); assert.match(run.stderr, /intake blocked/);
  assert.equal(readFileSync(target, 'utf8'), before);
} finally { rmSync(fixture, { recursive: true, force: true }); }
console.log('✓ AI intake rejects stale, partial and invalid exports without changing the queue');
