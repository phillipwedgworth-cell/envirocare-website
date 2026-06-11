// agents/measure-380.mjs — one-off: find elements wider than the 380px
// viewport on the live homepage (mobile overflow debugging).
import { chromium } from 'playwright-core';

const URL = process.argv[2] ?? 'https://envirocare-web.vercel.app/';
const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 380, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = { vw, scrollWidth: document.documentElement.scrollWidth, bodyScroll: document.body.scrollWidth, wide: [] };
  const els = document.querySelectorAll('*');
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 2 || r.right > vw + 2 || r.left < -2) {
      const cls = (el.className && typeof el.className === 'string') ? el.className.split(' ').slice(0, 3).join('.') : '';
      out.wide.push(`${el.tagName.toLowerCase()}${cls ? '.' + cls : ''} w=${Math.round(r.width)} left=${Math.round(r.left)} right=${Math.round(r.right)}`);
    }
    if (out.wide.length > 40) break;
  }
  // logo check
  const logo = document.querySelector('.ec-brand-logo');
  if (logo) {
    const r = logo.getBoundingClientRect();
    out.logo = `logo w=${Math.round(r.width)} h=${Math.round(r.height)} left=${Math.round(r.left)} right=${Math.round(r.right)} natural=${logo.naturalWidth}x${logo.naturalHeight}`;
  }
  return out;
});
console.log(JSON.stringify(report, null, 1));

// proper mobile screenshot while we're here
await page.screenshot({ path: 'C:/Users/pwedg/Desktop/Envirocare Stuf/monitoring/screenshots-2026-06-10/home-380-playwright.png', fullPage: false });
await browser.close();
