/**
 * Replace the Architecture "Selected work" editorial index with the same
 * project carousel the home page uses, so the section reads identically on
 * both pages. The scene's own entrance (opacity + scale) is untouched; the
 * carousel pans on the scene's through-progress exactly as it does on home.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = '/workspace/2fach/Architecture.dc.html';
let s = readFileSync(FILE, 'utf8');
const before = s.length;

/* ---------- 1. markup: workBody -> carousel ---------- */
const bodyStart = s.indexOf('          <div class="workBody">');
const bodyEndMark = '            </div>\n          </div>';
const bodyEnd = s.indexOf(bodyEndMark, bodyStart);
if (bodyStart < 0 || bodyEnd < 0) throw new Error('workBody block not found');

const SLIDES = [
  ['bellevue', './bellevue_3_2-mr82i2g0.jpg'],
  ['rothruthi', 'assets/projects/rothruthi/ext-1.jpg'],
  ['seeblick', './seeblick_04_01-mr82knwy.png'],
  ['niederrohrdorf', './hiltiberg_02_01-mr82zikx.png'],
  ['buero', './office-2_1-mr832em8.png'],
];

const carousel = `          <div class="workCar" id="workCar">
            <div class="car__bar">
              <span class="car__crumb"><span class="car__dot"></span>Our projects</span>
              <div class="car__nums" id="wkNums">
                <div class="car__nums-row">
${SLIDES.map((_, i) => `                  <button type="button"${i === 0 ? ' class="is-active"' : ''}>${i + 1}</button>`).join('\n')}
                </div>
                <div class="car__prog"><span class="car__prog-fill" id="wkProg"></span></div>
              </div>
            </div>
            <div class="car__view">
              <div class="car__track" id="wkTrack">
${SLIDES.map(([p, img], i) => `                <a class="slide${i === 2 ? ' is-center' : ''}" href="Case Study.dc.html?p=${p}"><img src="${img}" alt=""><div class="slide__scrim"></div></a>`).join('\n')}
              </div>
              <h2 class="car__title" id="wkTitle">Bellevue <em>Wynental</em></h2>
            </div>
            <div class="car__cap">
              <p id="wkDesc" style="max-width:34ch">Four apartments above the Wynental, drawn to be sold, sold on the drawings.</p>
            </div>
            <span class="car__index" id="wkIndex">01 / 05</span>
          </div>`;

s = s.slice(0, bodyStart) + carousel + s.slice(bodyEnd + bodyEndMark.length);

/* ---------- 2. styles ---------- */
const CSS = `    /* selected-work carousel, shared with the home page */
    .workCar{position:relative;display:flex;flex-direction:column;min-height:min(60vh,600px);margin-top:clamp(18px,3vh,32px)}
    .car__bar{display:flex;align-items:center;justify-content:space-between;gap:24px}
    .car__crumb{display:flex;align-items:center;gap:11px;font-weight:500;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
    .car__dot{width:8px;height:8px;border-radius:100px;background:var(--accent);display:inline-block;flex:none}
    .car__nums{display:flex;flex-direction:column;gap:9px;min-width:clamp(170px,20vw,240px)}
    .car__nums-row{display:flex;justify-content:space-between;gap:14px}
    .car__nums button{font-family:var(--font);background:none;border:0;cursor:pointer;font-size:.82rem;letter-spacing:.04em;color:rgba(244,240,231,.4);transition:color .35s;padding:0}
    .car__nums button.is-active{color:var(--on-media)}
    .car__prog{position:relative;height:1px;width:100%;background:rgba(244,240,231,.2)}
    .car__prog-fill{position:absolute;left:0;top:0;height:100%;background:var(--accent);width:0;transition:width .6s var(--ease-out-expo)}
    .car__view{position:relative;flex:1;min-height:0;margin-top:14px;overflow:hidden}
    .car__track{position:absolute;top:0;bottom:0;left:50%;display:flex;align-items:center;gap:clamp(18px,2.4vw,30px);will-change:transform}
    .slide{position:relative;flex:0 0 auto;height:100%;aspect-ratio:1080/1350;overflow:hidden;border-radius:2px;opacity:.42;transform-origin:center;will-change:transform,opacity}
    .slide.is-center{opacity:1}
    .slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .slide__scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(14,15,13,.66),rgba(14,15,13,0) 55%)}
    .car__title{position:absolute;left:0;right:0;top:4%;z-index:6;margin:0;text-align:center;pointer-events:none;font-weight:300;line-height:.92;letter-spacing:.01em;color:#f4f0e7;text-transform:uppercase;font-size:clamp(1.7rem,4.6vw,4rem);text-shadow:0 2px 40px rgba(0,0,0,.5);transition:opacity .5s ease}
    .car__title em{font-style:normal;display:block}
    .car__cap{display:flex;align-items:center;justify-content:center;padding:clamp(14px,2vw,20px) 0 0}
    .car__cap p{margin:0;font-size:.82rem;line-height:1.5;color:var(--on-media);transition:opacity .4s;text-align:center}
    .car__index{position:absolute;left:0;bottom:0;z-index:6;font-size:.72rem;letter-spacing:.12em;color:rgba(244,240,231,.7)}
    @media (max-width:760px){.workCar{min-height:min(52vh,460px)}.car__nums{min-width:140px}}
`;
s = s.replace('    .workTop{', CSS + '    .workTop{');

/* ---------- 3. setup: build the carousel renderer ---------- */
const setupStart = s.indexOf('    this.workRows = scenes.work');
const setupEndMark = '      activate(0);\n    }\n';
const setupEnd = s.indexOf(setupEndMark, setupStart);
if (setupStart < 0 || setupEnd < 0) throw new Error('work setup block not found');

const setup = `    // selected work, same carousel component as the home page
    this.WK = [
      { t: 'Bellevue <em>Wynental</em>', d: 'Four apartments above the Wynental, drawn to be sold, sold on the drawings.' },
      { t: 'Rothrüthi <em>Terraces</em>', d: 'Thirteen units, one repeating plan logic, efficiency a bank can read.' },
      { t: 'Seeblick <em>Birrwil</em>', d: 'Seven apartments and a commercial floor above Lake Hallwil.' },
      { t: 'Niederrohrdorf <em>Replacement</em>', d: 'A replacement build of five apartments, permit drawn and granted.' },
      { t: 'Umbau <em>Büro</em>', d: 'An office conversion, resolved floor by floor.' },
    ];
    this.wkSlides = scenes.work ? [].slice.call(scenes.work.querySelectorAll('.slide')) : [];
    this.wkTrack = document.getElementById('wkTrack');
    this.wkN = this.wkSlides.length;
    if (this.wkN && this.wkTrack) {
      const cl = (v, a, b) => Math.max(a, Math.min(b, v));
      const nums = [].slice.call(document.querySelectorAll('#wkNums button'));
      const titleEl = document.getElementById('wkTitle');
      const descEl = document.getElementById('wkDesc');
      const idxEl = document.getElementById('wkIndex');
      const progEl = document.getElementById('wkProg');
      let cur = -1, centers = [];
      const measure = () => { centers = this.wkSlides.map((sl) => -(sl.offsetLeft + sl.offsetWidth / 2)); };
      const updateUI = (i) => {
        nums.forEach((b, k) => b.classList.toggle('is-active', k === i));
        if (idxEl) idxEl.textContent = '0' + (i + 1) + ' / 0' + this.wkN;
        if (progEl) progEl.style.width = (this.wkN > 1 ? (i / (this.wkN - 1)) * 100 : 100).toFixed(2) + '%';
        if (titleEl && descEl) {
          titleEl.style.opacity = '0'; descEl.style.opacity = '0';
          setTimeout(() => {
            titleEl.innerHTML = this.WK[i].t; descEl.textContent = this.WK[i].d;
            titleEl.style.opacity = '1'; descEl.style.opacity = '1';
          }, 200);
        }
      };
      this.wkRender = (fpos) => {
        fpos = cl(fpos, 0, this.wkN - 1);
        if (!centers.length || !centers[0]) measure();
        const i0 = Math.floor(fpos), i1 = Math.min(i0 + 1, this.wkN - 1), f = fpos - i0;
        const tx = centers[i0] + (centers[i1] - centers[i0]) * f;
        this.wkTrack.style.transform = 'translateX(' + tx.toFixed(2) + 'px)';
        this.wkSlides.forEach((sl, k) => {
          const t = 1 - cl(Math.abs(k - fpos), 0, 1);
          sl.style.opacity = (0.36 + 0.64 * t).toFixed(3);
          sl.style.transform = 'scale(' + (0.74 + 0.26 * t).toFixed(3) + ')';
          sl.style.zIndex = t > 0.5 ? '3' : '1';
        });
        const ri = Math.round(fpos);
        if (ri !== cur) { cur = ri; updateUI(ri); }
      };
      const relayout = () => { measure(); this.wkRender(cur < 0 ? 0 : cur); };
      window.addEventListener('resize', relayout);
      nums.forEach((b, k) => b.addEventListener('click', () => this.wkRender(k)));
      requestAnimationFrame(() => requestAnimationFrame(() => { measure(); this.wkRender(0); }));
    }
`;
s = s.slice(0, setupStart) + setup + s.slice(setupEnd + setupEndMark.length);

/* ---------- 4. render: drive the pan from the scene progress ---------- */
const oldCase = `        const sp = C((tc - 0.42) / 0.5);
        this.workRows.forEach((row, k) => {
          const rr = C(sp * 3 - k * 0.7);
          row.style.opacity = rr;
          row.style.transform = 'translateY(' + ((1 - rr) * 26) + 'px)';
        });
        if (this.workPreview) this.workPreview.style.clipPath = this.up(C((sp - 0.1) / 0.7));`;
const newCase = `        const sp = C((tc - 0.42) / 0.5);
        if (this.wkRender && this.wkN > 1) this.wkRender(sp * (this.wkN - 1));`;
if (!s.includes(oldCase)) throw new Error('work render case not found');
s = s.replace(oldCase, newCase);

/* ---------- 5. drop the now-unused preview clip rule ---------- */
s = s.replace('    .stage--static .workPreview{clip-path:none!important}\n', '');

writeFileSync(FILE, s);
console.log(`Architecture.dc.html: ${before} -> ${s.length} chars`);
console.log('carousel ported into the Selected work scene');
