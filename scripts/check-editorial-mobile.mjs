// Read-only smoke test of the exact local production build. No production URLs,
// form submissions, call clicks, external analytics or service credentials.
// Install pinned Playwright separately; keep it out of the production bundle.
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROUTES = [
  '/blog', '/blog/data-center-ipm-plan',
  '/blog/sentricon-vs-liquid-termite-treatment',
  '/blog/silverfish-control-alabama', '/data-center-pest-control',
];
const ORIGIN = 'http://127.0.0.1:3007';
const OUT = resolve('audit-results/editorial-mobile');
const modulePath = process.env.PLAYWRIGHT_MODULE;
if (!modulePath || !modulePath.startsWith('/')) throw new Error('Set PLAYWRIGHT_MODULE to the absolute pinned Playwright index.mjs path.');
const { chromium } = await import(pathToFileURL(modulePath).href);
await mkdir(OUT, { recursive: true });
const result = {
  checkedAt: new Date().toISOString(),
  commit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  buildId: (await readFile('.next/BUILD_ID', 'utf8')).trim(),
  browser: 'Chromium / Playwright 1.58.2',
  scope: 'Five local routes at 360x844 and 390x844 CSS pixels, touch/mobile context. Horizontal overflow, mobile menu, CTA destinations and runtime errors; screenshots retained.',
  limitations: 'Browser emulation is not a physical-device or accessibility audit. External requests and non-GET/HEAD requests are blocked. No form, phone, payment or chat actions are submitted.',
  rows: [],
};
const report = async () => {
  result.passed = result.rows.filter((r) => r.status === 'passed').length;
  result.failed = result.rows.filter((r) => r.status === 'failed').length;
  await writeFile(join(OUT, 'results.json'), JSON.stringify(result, null, 2) + '\n');
  const clean = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/[\r\n]/g, ' ');
  await writeFile(join(OUT, 'results.md'), `# Editorial mobile smoke test\n\nCommit: ${result.commit}\n\nBuild: ${result.buildId}\n\n${result.scope}\n\n${result.limitations}\n\nPassed ${result.passed}/10; failed ${result.failed}.\n\n| Route | CSS width | State | Issue |\n|---|---:|---|---|\n${result.rows.map((r) => `| ${r.route} | ${r.width} | ${r.status} | ${clean(r.issue)} |`).join('\n')}\n`);
};
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3007'], {
  stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
});
let serverLog = '';
server.stdout.on('data', (b) => { serverLog = (serverLog + b).slice(-12000); });
server.stderr.on('data', (b) => { serverLog = (serverLog + b).slice(-12000); });
let browser;
try {
  let ready = false;
  for (let n = 0; n < 60; n++) {
    if (server.exitCode !== null) throw new Error('local build server exited before becoming ready');
    try { ready = (await fetch(ORIGIN + '/blog', { signal: AbortSignal.timeout(1000) })).status === 200; } catch { /* retry local startup */ }
    if (ready) break;
    await new Promise((done) => setTimeout(done, 500));
  }
  assert.ok(ready, 'local build server did not become ready');
  browser = await chromium.launch({ headless: true });
  for (const width of [360, 390]) {
    for (const route of ROUTES) {
      const row = { route, width, height: 844, status: 'failed', checks: [], blockedExternalOrigins: [] };
      result.rows.push(row);
      const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, locale: 'en-US', reducedMotion: 'reduce' });
      const blocked = new Set();
      await context.route('**/*', (requestRoute) => {
        const request = requestRoute.request();
        const url = new URL(request.url());
        const remoteImage = url.pathname === '/_next/image' && /^https?:/i.test(url.searchParams.get('url') ?? '');
        if (url.origin !== ORIGIN || !['GET', 'HEAD'].includes(request.method()) || remoteImage) {
          if (url.origin !== ORIGIN) blocked.add(url.origin);
          return requestRoute.abort();
        }
        return requestRoute.continue();
      });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const stem = `${width}-${route.replace(/^\//, '').replaceAll('/', '-')}`;
      try {
        const response = await page.goto(ORIGIN + route, { waitUntil: 'networkidle', timeout: 20000 });
        assert.equal(response?.status(), 200, 'route must render HTTP 200');
        await page.locator('h1').first().waitFor({ state: 'visible' });
        await page.evaluate(() => document.fonts.ready);
        const viewport = await page.evaluate(() => ({ inner: window.innerWidth, client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
        assert.equal(viewport.inner, width, 'the actual CSS viewport must match the requested mobile width');
        assert.ok(viewport.scroll <= width + 1, `horizontal overflow: ${viewport.scroll}px at ${width}px`);
        row.checks.push('actual mobile viewport, HTTP 200, no horizontal overflow');

        const call = page.locator('.sh-call');
        assert.ok(await call.isVisible(), 'header call CTA must be visible');
        assert.match(await call.getAttribute('href'), /^tel:\+?\d{10,11}$/, 'header call CTA must retain a phone target');
        const quickQuote = page.locator('.mab-quote');
        assert.ok(await quickQuote.isVisible(), 'mobile quote CTA must be visible');
        assert.equal(await quickQuote.getAttribute('href'), '/quote');
        const box = await quickQuote.boundingBox();
        assert.ok(box && box.x >= -1 && box.x + box.width <= width + 1 && box.y >= 0 && box.y + box.height <= 845, 'mobile quote CTA must fit within the viewport');
        row.checks.push('header call and mobile quote CTA visible with expected targets');

        const opener = page.getByRole('button', { name: 'Open menu', exact: true });
        await opener.click();
        await page.waitForFunction(() => document.querySelector('[aria-label="Open menu"]')?.getAttribute('aria-expanded') === 'true');
        const menu = page.getByRole('dialog', { name: 'Site menu', exact: true });
        assert.ok(await menu.isVisible(), 'mobile menu must open');
        assert.equal(await menu.getByRole('link', { name: 'Get a Free Quote', exact: true }).getAttribute('href'), '/quote');
        if (route === '/blog') await page.screenshot({ path: join(OUT, `${stem}-menu.png`) });
        await page.getByRole('button', { name: 'Close menu', exact: true }).click();
        await page.waitForFunction(() => document.querySelector('[aria-label="Open menu"]')?.getAttribute('aria-expanded') === 'false');
        row.checks.push('mobile menu opens, exposes quote destination, and closes');

        if (route.startsWith('/blog/')) {
          const phones = page.locator('.bpp-cta-phone');
          assert.equal(await phones.count(), 4, 'article CTA must expose the four office numbers');
          for (let n = 0; n < 4; n++) assert.match(await phones.nth(n).getAttribute('href'), /^tel:\d{10}$/);
          const tables = await page.locator('.bpp-body table').evaluateAll((els) => els.map((el) => ({ width: el.getBoundingClientRect().width, left: el.getBoundingClientRect().left, overflow: getComputedStyle(el).overflowX, scroll: el.scrollWidth, client: el.clientWidth })));
          for (const table of tables) {
            assert.ok(table.left >= -1 && table.left + table.width <= width + 1, 'article table must fit or scroll within the mobile content column');
            if (table.scroll > table.client + 1) assert.match(table.overflow, /auto|scroll/, 'wide comparison table must scroll within its container');
          }
          row.checks.push('article office CTA targets and contained comparison tables');
        }
        if (route === '/data-center-pest-control') {
          const walkthrough = page.getByRole('link', { name: /Request a (Site )?Walkthrough/ }).first();
          assert.ok(await walkthrough.isVisible(), 'facility walkthrough CTA must be visible');
          assert.equal(await walkthrough.getAttribute('href'), '/quote');
          row.checks.push('facility walkthrough CTA visible and points to quote route');
        }
        assert.equal((await page.request.get(ORIGIN + '/quote')).status(), 200, 'quote destination must render locally');
        assert.deepEqual(errors, [], 'page must not raise uncaught runtime errors');
        await page.screenshot({ path: join(OUT, `${stem}.png`), fullPage: true });
        row.screenshot = `${stem}.png`;
        row.status = 'passed';
      } catch (error) {
        row.issue = error.message;
        await page.screenshot({ path: join(OUT, `${stem}-failure.png`), fullPage: true }).catch(() => {});
      } finally {
        row.blockedExternalOrigins = [...blocked];
        await context.close();
        await report();
      }
    }
  }
} catch (error) {
  result.infrastructureIssue = error.message;
  await report();
  process.exitCode = 1;
} finally {
  await browser?.close();
  server.kill('SIGTERM');
  setTimeout(() => server.kill('SIGKILL'), 3000).unref();
  await writeFile(join(OUT, 'local-server.log'), serverLog);
}
console.log(`Mobile smoke: ${result.passed ?? 0}/10 passed, ${result.failed ?? 0} failed on ${result.commit}.`);
if (result.rows.length !== 10 || result.failed) process.exitCode = 1;
