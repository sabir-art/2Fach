#!/usr/bin/env node
/**
 * Build a deployable static site from the design export.
 *
 * - Pages get clean URLs (Home.dc.html -> index.html, "Our Work.dc.html" -> work.html …)
 * - Component files keep their .dc.html names: the dc runtime fetches them at
 *   runtime from COMPONENT_DIR "." (support.js), so renaming them would break imports.
 * - Only referenced asset trees are copied; superseded hero variants and the
 *   unreferenced uploads/ folder are left out.
 */
import { cp, mkdir, readFile, writeFile, rm, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '/workspace/2fach';
const OUT = join(SRC, 'deploy');

// page source -> deployed filename
const PAGES = {
  'Home.dc.html': 'index.html',
  'Our Work.dc.html': 'work.html',
  'Architecture.dc.html': 'architecture.html',
  'Commercialization.dc.html': 'commercialization.html',
  'Case Study.dc.html': 'case-study.html',
  'About.dc.html': 'about.html',
  'Contact.dc.html': 'contact.html',
  'Privacy.dc.html': 'privacy.html',
  'Terms.dc.html': 'terms.html',
};

// fetched at runtime by <dc-import name="…"> — must keep the .dc.html name
const COMPONENTS = ['SiteHeader.dc.html', 'SiteFooter.dc.html'];

const RUNTIME = ['support.js', 'motion.js', 'plan-zoom.js', 'sections.css'];

// asset trees that are actually referenced
const ASSET_DIRS = ['brand', 'cursor', 'plans', 'projects', 'hero-mp4', '_lite'];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

/**
 * Third-party runtime, vendored locally.
 *
 * The design export loads React, GSAP, ScrollTrigger, Lenis and Babel from public
 * CDNs. Every visible element lives inside <x-dc>, which React renders, so a
 * single CDN hiccup leaves a blank page. Serving these from our own origin
 * removes that failure mode and one round trip per library.
 *
 * React and Babel are fetched by support.js itself; it resolves them through
 * the window.__resources override map, which we emit before it runs. The other
 * three are plain script tags we can point straight at the local copies.
 */
const VENDOR = [
  ['node_modules/react/umd/react.production.min.js', 'react.production.min.js'],
  ['node_modules/react-dom/umd/react-dom.production.min.js', 'react-dom.production.min.js'],
  ['node_modules/gsap/dist/gsap.min.js', 'gsap.min.js'],
  ['node_modules/gsap/dist/ScrollTrigger.min.js', 'ScrollTrigger.min.js'],
  ['node_modules/lenis/dist/lenis.min.js', 'lenis.min.js'],
  ['node_modules/@babel/standalone/babel.min.js', 'babel.min.js'],
  ['node_modules/three/build/three.min.js', 'three.min.js'],
  ['node_modules/leaflet/dist/leaflet.js', 'leaflet.js'],
  ['node_modules/leaflet/dist/leaflet.css', 'leaflet.css'],
];

// Leaflet's stylesheet points at these relative to itself
const VENDOR_DIRS = [['node_modules/leaflet/dist/images', 'images']];

// CDN url -> local file, for both the __resources map and plain script tags
const CDN_MAP = {
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js': 'vendor/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js':
    'vendor/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js': 'vendor/babel.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js': 'vendor/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js':
    'vendor/ScrollTrigger.min.js',
  'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js': 'vendor/lenis.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js': 'vendor/three.min.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js': 'vendor/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css': 'vendor/leaflet.css',
};

const RESOURCES_TAG =
  `<script>window.__resources=${JSON.stringify(CDN_MAP)};</script>`;

// ---- pages: rewrite internal links + vendor the runtime ----
const rewrite = (html) => {
  let out = html;
  for (const [from, to] of Object.entries(PAGES)) {
    // href="Case Study.dc.html?p=x" and href="Case Study.dc.html"
    out = out.split(`"${from}`).join(`"${to}`);
    out = out.split(`'${from}`).join(`'${to}`);
    out = out.split(`./${to}`).join(to); // tidy any ./ prefix left behind
  }

  // point the plain CDN script tags at the local copies
  for (const [url, local] of Object.entries(CDN_MAP)) out = out.split(url).join(local);

  // declare the override map before support.js fetches React/Babel
  if (out.includes('__resources')) return out;
  return out.replace(
    /(<script\s+src="\.\/support\.js"><\/script>)/,
    `${RESOURCES_TAG}\n$1`,
  );
};

for (const [src, dest] of Object.entries(PAGES)) {
  const html = await readFile(join(SRC, src), 'utf8');
  await writeFile(join(OUT, dest), rewrite(html));
  console.log(`page  ${src}  ->  ${dest}`);
}

// components: same link rewriting, original filename
for (const c of COMPONENTS) {
  if (!existsSync(join(SRC, c))) continue;
  const html = await readFile(join(SRC, c), 'utf8');
  await writeFile(join(OUT, c), rewrite(html));
  console.log(`comp  ${c}`);
}

// ---- vendored third-party runtime ----
await mkdir(join(OUT, 'vendor'), { recursive: true });
for (const [from, name] of VENDOR) {
  if (!existsSync(join(SRC, from))) {
    console.warn(`MISSING vendor source: ${from} (run npm install)`);
    continue;
  }
  await cp(join(SRC, from), join(OUT, 'vendor', name));
}
for (const [from, name] of VENDOR_DIRS) {
  if (existsSync(join(SRC, from)))
    await cp(join(SRC, from), join(OUT, 'vendor', name), { recursive: true });
}
console.log(`vendor: ${VENDOR.length} libraries`);

// ---- runtime + data + design system ----
for (const f of RUNTIME) {
  if (existsSync(join(SRC, f))) await cp(join(SRC, f), join(OUT, f));
}
await cp(join(SRC, 'data'), join(OUT, 'data'), { recursive: true });
await cp(join(SRC, '_ds'), join(OUT, '_ds'), { recursive: true });

// ---- assets ----
await mkdir(join(OUT, 'assets'), { recursive: true });
for (const d of ASSET_DIRS) {
  const from = join(SRC, 'assets', d);
  if (existsSync(from)) {
    await cp(from, join(OUT, 'assets', d), { recursive: true });
    console.log(`assets/${d}`);
  }
}

// ---- root-level images referenced with ./ ----
const rootFiles = await readdir(SRC);
let rootImgs = 0;
for (const f of rootFiles) {
  if (!/\.(png|jpe?g|svg|webp)$/i.test(f)) continue;
  const s = await stat(join(SRC, f));
  if (!s.isFile()) continue;
  await cp(join(SRC, f), join(OUT, f));
  rootImgs++;
}
console.log(`root images: ${rootImgs}`);
console.log('\ndeploy/ built');
