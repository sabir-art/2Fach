import { chromium } from 'playwright';

const OUT = '/tmp/shots';
const base = 'http://localhost:8099';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`);
});
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('requestfailed', (r) => errors.push(`404/fail: ${r.url()}`));

const target = process.argv[2] || 'index.html';
const label = process.argv[3] || 'home';

await page.goto(`${base}/${target}`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3500); // let the intro / motion settle

await page.screenshot({ path: `${OUT}/${label}-top.png` });

// scroll through and capture a few beats
const steps = Number(process.argv[4] || 3);
for (let i = 1; i <= steps; i++) {
  await page.evaluate((n) => window.scrollTo(0, window.innerHeight * n * 1.6), i);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${label}-scroll${i}.png` });
}

console.log(`title: ${await page.title()}`);
console.log(`height: ${await page.evaluate(() => document.body.scrollHeight)}px`);
console.log(errors.length ? `\nISSUES (${errors.length}):` : '\nno console/network errors');
[...new Set(errors)].slice(0, 15).forEach((e) => console.log(' - ' + e));

await browser.close();
