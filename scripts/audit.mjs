import { chromium } from 'playwright';

const base = 'http://localhost:8099';
const PAGES = [
  ['index.html', 'home'],
  ['work.html', 'work'],
  ['architecture.html', 'architecture'],
  ['commercialization.html', 'commercialization'],
  ['case-study.html?p=seeblick', 'case-study'],
  ['about.html', 'about'],
  ['contact.html', 'contact'],
  ['privacy.html', 'privacy'],
  ['terms.html', 'terms'],
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

let totalBad = 0;
for (const [path, label] of PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const bad = new Set();
  page.on('pageerror', (e) => bad.add(`JS ERROR: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text()))
      bad.add(`console: ${m.text().slice(0, 140)}`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400) bad.add(`${r.status()}: ${r.url().replace(base + '/', '')}`);
  });
  page.on('requestfailed', (r) => bad.add(`FAILED: ${r.url().replace(base + '/', '')}`));

  try {
    await page.goto(`${base}/${path}`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2500);
    const h = await page.evaluate(() => document.body.scrollHeight);
    const title = await page.title();
    const flag = h < 1200 ? '  <-- SUSPICIOUSLY SHORT' : '';
    console.log(`\n${label.padEnd(18)} ${String(h).padStart(6)}px  "${title.slice(0, 45)}"${flag}`);
    if (bad.size) {
      totalBad += bad.size;
      [...bad].slice(0, 6).forEach((b) => console.log('   ! ' + b));
    }
  } catch (e) {
    console.log(`\n${label.padEnd(18)} LOAD FAILED: ${e.message.slice(0, 90)}`);
    totalBad++;
  }
  await page.close();
}

console.log(`\n=== total issues: ${totalBad} ===`);
await browser.close();
