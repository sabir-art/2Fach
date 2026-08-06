# ZweiFach, website

Static marketing site for **ZweiFach**, a Swiss residential development
practice in Aargau. Deployed as a static site on Vercel.

## Deploy to Vercel, 3 steps

1. Go to [vercel.com/new](https://vercel.com/new) and choose **Import Git Repository**.
2. Select this repository. Vercel reads `vercel.json`, so leave every setting as it is.
3. Click **Deploy**.

There is no build step. Vercel serves the `deploy/` folder directly.

## Repository layout

| Path | What it is |
| --- | --- |
| `deploy/` | The site that ships. This is what Vercel serves. |
| `*.dc.html` (root) | Editable source pages. |
| `_ds/` | ZweiFach design system: tokens, styles, fonts, component bundle. |
| `assets/`, `uploads/` | Full resolution source media. |
| `scripts/` | Build, image optimisation and QA tooling. |
| `docs/` | Content guidelines: tone of voice and how each principal is described. |

### Pages

`index.html` (home), `work.html`, `architecture.html`, `commercialization.html`,
`case-study.html`, `about.html`, `contact.html`, `privacy.html`, `terms.html`.

Case studies are selected by query string, for example
`case-study.html?p=seeblick`.

`SiteHeader.dc.html` and `SiteFooter.dc.html` stay in `.dc.html` form on
purpose: the page runtime (`support.js`) fetches them by name at load time, so
renaming them would break the header and footer.

## Rebuilding `deploy/`

After changing the source pages at the repository root:

```bash
npm install                        # once
node scripts/build-deploy.mjs      # rebuild deploy/, rewrite links, vendor libraries
node scripts/optimize-deploy.mjs   # shrink images in place
```

`build-deploy.mjs` copies the pages under clean names, rewrites internal links,
pulls in only the media the site actually references, and points every
third-party library at a local copy in `deploy/vendor/`.

`optimize-deploy.mjs` recompresses images in place, keeping every filename and
format so no reference has to change. Plans stay at a higher resolution because
`plan-zoom.js` lets visitors zoom into them. Current result: 157 MB down to
38 MB.

## Checking the site locally

```bash
cd deploy && python3 -m http.server 8099
# then, from the repository root:
node scripts/audit.mjs     # loads every page, reports JS errors and missing files
```

## Notes

The hero is a scroll driven image sequence: 132 frames in `assets/hero-mp4/`,
advanced frame by frame as the visitor scrolls. Motion runs on GSAP with
ScrollTrigger plus Lenis for smooth scrolling. React, GSAP, ScrollTrigger,
Lenis, Babel, Three.js and Leaflet are all served from `deploy/vendor/` rather
than public CDNs, so the site has no external runtime dependency and cannot be
left blank by a CDN outage.

## Still to finalise

Contact form backend, legal copy review, and a dedicated Open Graph image.
