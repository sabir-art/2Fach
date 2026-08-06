/* =============================================================================
   ZweiFach — plan-zoom.js  (in-place zoom)
   Turns any floor-plan panel into a zoom/pan surface *in place* — the plan
   stays exactly where it is (no lightbox, no new window), keeps its own
   background, and gets a small control bar (− slider + reset) plus drag-to-pan.
   This avoids the dark-on-dark problem of a shared overlay and keeps the plan
   in its designed context.

   USAGE
     Load once per page:  <script src="plan-zoom.js"></script>
     Mark the CLIPPING panel (the box the plan sits in), not the <img>:
       <div class="…" data-plan-zoom> … <img src="plan.png"> … </div>
     For a panel that cross-fades several plans (drawings / process), mark the
     stack container the same way — every <img> inside shares the zoom, so the
     visible one is always the one you see zoomed.

   INTERACTION
     • − / + buttons and the slider set the zoom.
     • double-click zooms toward the point (again to reset).
     • drag pans once zoomed in; wheel fine-tunes zoom *only while zoomed in*
       (so it never hijacks the page's scroll at rest).
     • Reset returns to fit.
   ========================================================================== */
(function (global) {
  "use strict";
  var doc = global.document;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var MIN = 1, MAX = 5;

  var CSS = [
    "[data-plan-zoom]{position:relative;overflow:hidden}",
    "[data-plan-zoom] img{will-change:transform;-webkit-user-drag:none;-khtml-user-drag:none;user-select:none;-webkit-user-select:none;pointer-events:none}",
    "[data-plan-zoom].pz-zoomed{cursor:grab}",
    "[data-plan-zoom].pz-grabbing{cursor:grabbing}",
    ".pz-bar{position:absolute;right:clamp(12px,1.4vw,20px);bottom:clamp(12px,1.4vw,20px);z-index:20;display:flex;align-items:center;gap:9px;padding:7px 9px;background:rgba(20,19,15,.74);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(244,240,231,.18);color:#f4f0e7;font-family:var(--font,system-ui);opacity:.72;transition:opacity .35s var(--ease-out-expo,ease);-webkit-user-select:none;user-select:none;touch-action:none}",
    "[data-plan-zoom]:hover .pz-bar,.pz-bar.pz-on{opacity:1}",
    ".pz-bar.pz-tr{top:clamp(12px,1.4vw,20px);bottom:auto}",
    ".pz-bar.pz-cr{top:50%;bottom:auto;transform:translateY(-50%)}",
    ".pz-btn{width:28px;height:28px;flex:none;display:flex;align-items:center;justify-content:center;background:none;border:1px solid rgba(244,240,231,.28);color:inherit;cursor:pointer;font-size:16px;line-height:1;padding:0;border-radius:0;transition:background .3s,border-color .3s}",
    ".pz-btn:hover{background:rgba(244,240,231,.16);border-color:var(--accent,#98855c)}",
    ".pz-range{-webkit-appearance:none;appearance:none;width:clamp(70px,9vw,120px);height:2px;background:rgba(244,240,231,.3);outline:none;cursor:pointer;margin:0}",
    ".pz-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:12px;height:12px;border-radius:50%;background:var(--accent,#98855c);cursor:grab}",
    ".pz-range::-moz-range-thumb{width:12px;height:12px;border:0;border-radius:50%;background:var(--accent,#98855c);cursor:grab}",
    ".pz-reset{background:none;border:0;color:rgba(244,240,231,.62);cursor:pointer;font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;font-family:inherit;padding:0 2px;transition:color .3s}",
    ".pz-reset:hover{color:#f4f0e7}",
    ".pz-lbl{font-size:.58rem;letter-spacing:.1em;font-variant-numeric:tabular-nums;min-width:34px;text-align:center;color:rgba(244,240,231,.85)}",
    "@media (max-width:820px){.pz-range{display:none}}"
  ].join("\n");

  function injectStyle() {
    if (doc.getElementById("pz-style")) return;
    var s = doc.createElement("style");
    s.id = "pz-style";
    s.textContent = CSS;
    doc.head.appendChild(s);
  }

  function setup(vp) {
    if (vp.__pz) return;
    vp.__pz = true;
    injectStyle();

    var st = { s: 1, x: 0, y: 0 };
    var getImgs = function () { return Array.prototype.slice.call(vp.querySelectorAll("img")); };
    getImgs().forEach(function (im) { im.setAttribute("draggable", "false"); });

    var bar = doc.createElement("div");
    bar.className = "pz-bar";
    bar.setAttribute("aria-label", "Zoom the plan");
    bar.innerHTML =
      '<button class="pz-btn" type="button" data-pz="out" aria-label="Zoom out" tabindex="-1">\u2212</button>' +
      '<input class="pz-range" type="range" min="1" max="5" step="0.01" value="1" aria-label="Zoom level">' +
      '<button class="pz-btn" type="button" data-pz="in" aria-label="Zoom in" tabindex="-1">+</button>' +
      '<span class="pz-lbl">100%</span>' +
      '<button class="pz-reset" type="button" data-pz="reset" tabindex="-1">Reset</button>';
    var pos = vp.getAttribute("data-plan-bar") || "";
    if (pos === "tr") bar.classList.add("pz-tr");
    else if (pos === "cr") bar.classList.add("pz-cr");
    vp.appendChild(bar);
    var slider = bar.querySelector(".pz-range");
    var lbl = bar.querySelector(".pz-lbl");

    function bounds() {
      var w = vp.clientWidth, h = vp.clientHeight;
      return { x: Math.max(0, (w * st.s - w) / 2 + 24), y: Math.max(0, (h * st.s - h) / 2 + 24) };
    }
    function apply() {
      var b = bounds();
      st.x = clamp(st.x, -b.x, b.x);
      st.y = clamp(st.y, -b.y, b.y);
      var t = "translate(" + st.x.toFixed(1) + "px," + st.y.toFixed(1) + "px) scale(" + st.s.toFixed(3) + ")";
      getImgs().forEach(function (im) { im.style.transform = t; im.style.transformOrigin = "center center"; });
      var zoomed = st.s > 1.01;
      vp.classList.toggle("pz-zoomed", zoomed);
      vp.style.touchAction = zoomed ? "none" : "";
      if (lbl) lbl.textContent = Math.round(st.s * 100) + "%";
      if (slider && doc.activeElement !== slider) slider.value = String(st.s);
    }
    // zoom toward a point measured from the viewport centre
    function zoomTo(ns, px, py) {
      ns = clamp(ns, MIN, MAX);
      if (px == null) { px = 0; py = 0; }
      var k = ns / st.s;
      st.x = px - (px - st.x) * k;
      st.y = py - (py - st.y) * k;
      st.s = ns;
      if (st.s <= MIN + 0.001) { st.s = MIN; st.x = 0; st.y = 0; }
      apply();
    }
    function offset(e) {
      var r = vp.getBoundingClientRect();
      return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 };
    }

    bar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pz]"); if (!b) return;
      var k = b.getAttribute("data-pz");
      if (k === "in") zoomTo(st.s * 1.5, 0, 0);
      else if (k === "out") zoomTo(st.s / 1.5, 0, 0);
      else if (k === "reset") zoomTo(MIN, 0, 0);
    });
    slider.addEventListener("input", function () { zoomTo(parseFloat(slider.value), 0, 0); });
    // keep the bar from starting a pan / passing wheel to the viewport
    bar.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    bar.addEventListener("wheel", function (e) { e.stopPropagation(); }, { passive: true });

    // double-click: zoom in toward the point, or reset if already zoomed
    vp.addEventListener("dblclick", function (e) {
      e.preventDefault();
      var o = offset(e);
      if (st.s > MIN + 0.2) zoomTo(MIN, 0, 0); else zoomTo(2.4, o.x, o.y);
    });

    // wheel: zoom toward the cursor. At a zoom bound the event passes through so
    // the page can still scroll (scroll up on the plan zooms in; once fully zoomed
    // out, further scroll-down releases back to the page).
    vp.addEventListener("wheel", function (e) {
      var target = clamp(st.s * Math.exp(-e.deltaY * 0.0016), MIN, MAX);
      if (Math.abs(target - st.s) < 0.0005) return;   // at a bound → let Lenis/page scroll
      e.preventDefault();
      e.stopPropagation();                              // keep Lenis (window listener) from scrolling the page
      var o = offset(e);
      zoomTo(target, o.x, o.y);
    }, { passive: false });

    // block the browser's native image drag-out (was grabbing the plan as an image)
    vp.addEventListener("dragstart", function (e) { e.preventDefault(); });

    // drag to pan
    var drag = null;
    vp.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".pz-bar")) return;
      if (st.s <= MIN + 0.001) return;         // nothing to pan at fit
      drag = { x: e.clientX, y: e.clientY, ox: st.x, oy: st.y };
      vp.classList.add("pz-grabbing");
      try { vp.setPointerCapture(e.pointerId); } catch (err) {}
    });
    vp.addEventListener("pointermove", function (e) {
      if (!drag) return;
      st.x = drag.ox + (e.clientX - drag.x);
      st.y = drag.oy + (e.clientY - drag.y);
      apply();
    });
    var end = function () { drag = null; vp.classList.remove("pz-grabbing"); };
    vp.addEventListener("pointerup", end);
    vp.addEventListener("pointercancel", end);

    // re-clamp when the panel resizes
    if (global.ResizeObserver) { try { new ResizeObserver(function () { apply(); }).observe(vp); } catch (e) {} }

    apply();
    vp.__pzApi = { zoomTo: zoomTo, reset: function () { zoomTo(MIN, 0, 0); } };
  }

  function init(root) {
    injectStyle();
    (root || doc).querySelectorAll("[data-plan-zoom]").forEach(setup);
  }

  // pick up plans that stream in later (DC render)
  function watch() {
    if (!global.MutationObserver) return;
    var mo = new MutationObserver(function () { init(); });
    mo.observe(doc.documentElement, { childList: true, subtree: true });
  }

  global.ZFPlanZoom = { init: init, setup: setup };
  if (doc.readyState !== "loading") { init(); watch(); }
  else doc.addEventListener("DOMContentLoaded", function () { init(); watch(); });
  [200, 600, 1400].forEach(function (t) { global.setTimeout(function () { init(); }, t); });
})(window);
