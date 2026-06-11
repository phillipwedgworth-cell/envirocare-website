// agents/verify-380.mjs — 380px mobile verification of the hero-strip spec:
// full logo, hero contents, Lake Martin gone from nav, white footer logo,
// schedule widget below pricing.
import { chromium } from 'playwright-core';

const OUT = 'C:/Users/pwedg/Desktop/Envirocare Stuf/monitoring/screenshots-2026-06-10';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 380, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto('https://envirocare-web.vercel.app/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);

const checks = await page.evaluate(() => {
  const out = {};
  const logo = document.querySelector('.ec-brand-logo');
  out.logo = logo ? `visible ${Math.round(logo.getBoundingClientRect().width)}x${Math.round(logo.getBoundingClientRect().height)} src=${logo.currentSrc.includes('logo') ? 'logo.png' : '?'}` : 'MISSING';
  out.h1 = document.querySelector('.ec-hero-h1')?.textContent?.trim() ?? 'MISSING';
  out.sub = (document.querySelector('.ec-hero-sub')?.textContent ?? '').slice(0, 60);
  out.trustRow = document.querySelector('.ec-hero-trust-row')?.textContent?.replace(/\s+/g, ' ').trim() ?? 'MISSING';
  out.removed = {
    statBoxes: !!document.querySelector('.ec-hero-stats'),
    checks: !!document.querySelector('.ec-hero-checks'),
    floatingCards: document.querySelectorAll('.ec-floating-card').length,
    pestStrip: !!document.querySelector('.ec-pest-strip'),
    orbs: document.querySelectorAll('.ec-orb').length,
    sunflower: !!document.querySelector('.ec-hero-sunflower'),
  };
  out.trustStripItems = [...document.querySelectorAll('.ec-trust-item')].map(e => e.textContent?.trim());
  out.navLakeMartin = [...document.querySelectorAll('.ec-nav a, .ec-mobile-menu a')].some(a => /lake martin/i.test(a.textContent ?? ''));
  out.scrollWidth = document.documentElement.scrollWidth;
  return out;
});

// open mobile menu and check Lake Martin there too
await page.click('.ec-mobile-toggle').catch(() => {});
await page.waitForTimeout(600);
checks.mobileMenuLakeMartin = await page.evaluate(() =>
  [...document.querySelectorAll('.ec-mobile-menu a')].some(a => /lake martin/i.test(a.textContent ?? ''))
);
await page.screenshot({ path: `${OUT}/final-menu-380.png` });
await page.keyboard.press('Escape').catch(() => {});
await page.click('.ec-mobile-toggle').catch(() => {});
await page.waitForTimeout(400);

await page.screenshot({ path: `${OUT}/final-hero-380.png` });

// schedule widget below pricing
const sched = await page.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(e => /Schedule Your First Visit/i.test(e.textContent ?? ''));
  if (!h) return 'MISSING';
  h.scrollIntoView();
  return 'present';
});
checks.scheduleWidget = sched;
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/final-schedule-380.png` });

// footer logo
await page.evaluate(() => document.querySelector('.ec-footer-logo')?.scrollIntoView());
await page.waitForTimeout(1000);
checks.footerLogo = await page.evaluate(() => {
  const img = document.querySelector('.ec-footer-logo');
  return img ? `src=${img.currentSrc.split('/').pop().split('?')[0] || img.currentSrc.includes('logo-white') ? 'logo-white' : 'other'} ${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}` : 'MISSING';
});
checks.footerLogoSrcRaw = await page.evaluate(() => document.querySelector('.ec-footer-logo')?.currentSrc ?? 'none');
await page.screenshot({ path: `${OUT}/final-footer-380.png` });

console.log(JSON.stringify(checks, null, 1));
await browser.close();
