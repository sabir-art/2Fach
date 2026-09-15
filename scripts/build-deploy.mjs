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
import { fileURLToPath } from 'node:url';

// Repository root, derived from this file's own location, so the build runs
// wherever the project is checked out.
const SRC = fileURLToPath(new URL('..', import.meta.url)).replace(/\/+$/, '');
const OUT = join(SRC, 'deploy');

// page source -> deployed filename
const PAGES = {
  'Home.dc.html': 'index.html',
  'Our Work.dc.html': 'work.html',
  'Architecture.dc.html': 'architecture.html',
  'Commercialization.dc.html': 'commercialization.html',
  'Team.dc.html': 'team.html',
  'Contact.dc.html': 'contact.html',
  'Privacy.dc.html': 'privacy.html',
  'Terms.dc.html': 'terms.html',
};

// fetched at runtime by <dc-import name="…"> — must keep the .dc.html name
const COMPONENTS = ['SiteHeader.dc.html', 'SiteFooter.dc.html'];

const RUNTIME = ['support.js', 'motion.js', 'plan-zoom.js', 'sections.css'];

// asset trees that are actually referenced
const ASSET_DIRS = ['brand', 'cursor', 'plans', 'projects', 'hero-mp4', 'hero', 'team', '_lite'];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

// Root .dc.html files that are neither a deployed page nor a component: design
// work this build does not publish. Links to them are defused in rewrite() and
// the list is printed at the end of the run, so nothing is dropped in silence.
const rootEntries = await readdir(SRC, { withFileTypes: true });
const deployable = new Set([...Object.keys(PAGES), ...COMPONENTS]);
const unpublished = rootEntries
  .filter((e) => e.isFile() && e.name.endsWith('.dc.html') && !deployable.has(e.name))
  .map((e) => e.name);

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
  ['node_modules/lucide/dist/umd/lucide.min.js', 'lucide.min.js'],
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
  'https://unpkg.com/lucide@0.363.0/dist/umd/lucide.min.js': 'vendor/lucide.min.js',
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

  // Links to a page we do not deploy would 404. Defuse them by name — in the
  // markup, and in the scripts that assemble hrefs at runtime, which the Work
  // page does ('Case Study.dc.html?p=' + slug). The card still renders, it
  // just leads nowhere. Put the page back in PAGES and its links work again.
  for (const name of unpublished) {
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(`href="${esc}[^"]*"`, 'g'), (m) => `data-unpublished=${m.slice(5)}`);
    out = out.replace(new RegExp(`'${esc}[^']*'`, 'g'), "'#'");
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

/**
 * Attach the large-screen layout to a page.
 *
 * wide.css is applied here rather than edited into the design files, so a
 * fresh export from the canvas keeps it without anyone remembering to.
 * data-page lets that stylesheet reach one page without touching the rest:
 * Our Work and Privacy both style .wrap, and only one of them should widen.
 */
const withWideCss = (html, dest) => {
  const slug = dest.replace(/\.html$/, '');
  return html
    .replace('</head>', '  <link rel="stylesheet" href="wide.css">\n</head>')
    .replace('<body>', `<body data-page="${slug}">`);
};

for (const [src, dest] of Object.entries(PAGES)) {
  const html = await readFile(join(SRC, src), 'utf8');
  await writeFile(join(OUT, dest), withWideCss(rewrite(html), dest));
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
// Every root-level script and stylesheet ships, not just the four we knew
// about: the pages reference these by name, so a new one arriving from the
// design (image-slot.js, no-scroll-fx.js …) must not be silently dropped
// because this list went stale. Shipping a spare file costs a few KB; missing
// one breaks the page that needs it.
const runtimeFiles = new Set([
  ...RUNTIME,
  ...rootEntries.filter((e) => e.isFile() && /\.(js|css)$/i.test(e.name)).map((e) => e.name),
]);
for (const f of runtimeFiles) {
  if (existsSync(join(SRC, f))) await cp(join(SRC, f), join(OUT, f));
}
console.log(`runtime: ${runtimeFiles.size} scripts and stylesheets`);

if (unpublished.length) {
  console.log(`\n!! ${unpublished.length} page(s) not deployed, links to them defused:`);
  for (const f of unpublished) console.log(`     ${f}`);
  console.log('   Add them to PAGES above to ship them.\n');
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
