// agents/shots-380.mjs — 380px screenshots: homepage hero, chat widget open,
// lake-martin page.
import { chromium } from 'playwright-core';

const OUT = 'C:/Users/pwedg/Desktop/Envirocare Stuf/monitoring/screenshots-2026-06-10';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 380, height: 820 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

await page.goto('https://envirocare-web.vercel.app/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/v4-hero-380.png` });

// open the chat widget
await page.click('button[title="Chat with EnviroCare"]').catch(async () => {
  await page.click('button[aria-label="Chat with EnviroCare"]').catch(() => {});
});
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/v4-chat-380.png` });

await page.goto('https://envirocare-web.vercel.app/lake-martin', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/v4-lakemartin-380.png` });

console.log('done');
await browser.close();
