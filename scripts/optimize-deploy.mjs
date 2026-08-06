#!/usr/bin/env node
/**
 * Shrink deploy/ images IN PLACE, keeping every filename and format intact so
 * no HTML/CSS reference has to change.
 *
 * Plans stay larger (plan-zoom.js lets visitors zoom into them); hero frames
 * are already small and only get a light pass so the scroll sequence stays
 * smooth. Files that would not get meaningfully smaller are left untouched.
 */
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const OUT = '/workspace/2fach/deploy';

const widthFor = (p) => {
  if (p.includes('/assets/plans/')) return 2400;   // zoomable
  if (p.includes('/assets/hero-mp4/')) return 1600; // scroll sequence
  if (p.includes('/assets/brand/')) return 2000;
  return 1920;
};

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = (await walk(OUT)).filter((f) =>
  ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()),
);

let before = 0;
let after = 0;
let changed = 0;

for (const file of files) {
  const orig = await stat(file);
  before += orig.size;

  try {
    const input = await readFile(file);
    const meta = await sharp(input).metadata();
    const maxW = widthFor(file);
    const isPng = extname(file).toLowerCase() === '.png';

    let pipe = sharp(input).resize({ width: maxW, withoutEnlargement: true });
    pipe = isPng
      ? pipe.png({ compressionLevel: 9, palette: true, quality: 82 })
      : pipe.jpeg({ quality: 74, mozjpeg: true });

    const buf = await pipe.toBuffer();

    // only keep the new version when it actually helps
    if (buf.length < orig.size * 0.95) {
      await writeFile(file, buf);
      after += buf.length;
      changed++;
    } else {
      after += orig.size;
    }
  } catch (err) {
    after += orig.size;
    console.warn(`skip ${file}: ${err.message}`);
  }
}

const mb = (n) => (n / 1048576).toFixed(1) + ' MB';
console.log(`\n${changed}/${files.length} images optimized`);
console.log(`${mb(before)} -> ${mb(after)}`);
