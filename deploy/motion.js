/* =============================================================================
   ZweiFach — motion.js
   The reusable, content-independent motion layer. Extracted and cleaned from
   the site's script.js / about.js so any new page gets the brand's motion by
   setting data-* attributes — no bespoke JS required.

   DEPENDENCIES (load before this file):
     GSAP 3.12+, ScrollTrigger, Lenis (optional but recommended).
       <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
       <script src="motion.js"></script>

   PHILOSOPHY
     - State is set in JS so content stays visible if JS/GSAP is absent.
     - Everything is gated on prefers-reduced-motion (static fallbacks shown).
     - The house ease is out-expo cubic-bezier(.16,1,.3,1). Reveals use power3.out.

   DATA-ATTRIBUTE API (add to elements, then call ZF.motion.init())
     data-reveal                     fade + 42px rise on enter (batched, staggered)
     data-parallax="0.35"            element drifts at a different speed (big numbers, images)
     data-switcher                   tab switcher root; children:
        [data-switch-tab]            a tab button
        [data-switch-panel]          a text panel (index-matched to tabs)
        [data-switch-media]          a media layer revealed via clip-path
        [data-switch-bar]            progress bar (scaleX)
     data-throughline                sticky cross-fading image story; children:
        [data-tl-img]                a stacked image (index-matched)
        [data-tl-step]="0"           a scroll step that activates image N
        [data-tl-bar] / [data-tl-index]  progress rail + index label
     data-hscroll                    horizontal pinned gallery (its direct track is [data-hscroll-track])
        [data-hscroll-bar]           optional progress bar for the gallery
     data-count="38" data-prefix="+" data-suffix="%" data-dec="0"   count-up number
     [data-page-progress] > i        top-of-page reading progress bar
     [data-scrollbar] > [data-scrollbar-thumb]   custom draggable scrollbar (needs Lenis)

   NOTE: data-magnetic / data-cursor were named in the brief but are NOT present
   in the provided source, so they are intentionally not implemented here.
   ========================================================================== */
(function (global) {
  "use strict";

  var EASE = { outExpo: "cubic-bezier(.16,1,.3,1)" };
  var hasGSAP = typeof global.gsap !== "undefined";
  var hasST = hasGSAP && typeof global.ScrollTrigger !== "undefined";
  var mq = function (q) { return global.matchMedia(q).matches; };
  var reduced = function () { return mq("(prefers-reduced-motion: reduce)"); };
  var isMobile = function () { return mq("(max-width: 768px)"); };

  /* ---- Lenis smooth-scroll, driven by the GSAP ticker (skipped on reduced-motion) ---- */
  function initLenis() {
    if (typeof global.Lenis === "undefined" || !hasGSAP || reduced()) return null;
    if (global.__lenis) return global.__lenis;
    var lenis = new global.Lenis({
      duration: 1.05,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, // easeOutExpo
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    global.__lenis = lenis;
    if (hasST) lenis.on("scroll", global.ScrollTrigger.update);
    global.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    global.gsap.ticker.lagSmoothing(0);
    return lenis;
  }

  /* ---- REVEAL : fade + rise, batched with a stagger ---- */
  function initReveal() {
    var items = global.gsap.utils.toArray("[data-reveal]");
    if (!items.length) return;
    global.gsap.set(items, { opacity: 0, y: 42 });
    global.ScrollTrigger.batch(items, {
      start: "top 86%",
      onEnter: function (els) {
        global.gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, overwrite: true });
      },
    });
  }

  /* ---- PARALLAX : element drifts against the scroll ---- */
  function initParallax() {
    global.gsap.utils.toArray("[data-parallax]").forEach(function (el) {
      var speed = parseFloat(el.dataset.parallax) || 0.25;
      global.gsap.fromTo(el, { yPercent: speed * 50 }, {
        yPercent: -speed * 50, ease: "none",
        scrollTrigger: { trigger: el.closest("[data-parallax-scope], section") || el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  }

  /* ---- SWITCHER : tabs reveal a clip-path image + cross-fade a text panel ---- */
  function initSwitchers() {
    document.querySelectorAll("[data-switcher]").forEach(function (root) {
      if (root.dataset.switcherDone) return;
      root.dataset.switcherDone = "1";
      var tabs = Array.prototype.slice.call(root.querySelectorAll("[data-switch-tab]"));
      var panels = Array.prototype.slice.call(root.querySelectorAll("[data-switch-panel]"));
      var medias = Array.prototype.slice.call(root.querySelectorAll("[data-switch-media]"));
      var bar = root.querySelector("[data-switch-bar]");
      if (tabs.length < 2) return;
      var current = -1;
      function activate(idx) {
        if (idx === current) return; current = idx;
        tabs.forEach(function (t, i) { t.classList.toggle("is-active", i === idx); t.setAttribute("aria-selected", String(i === idx)); });
        panels.forEach(function (p, i) { p.classList.toggle("is-active", i === idx); });
        medias.forEach(function (m, i) { m.classList.toggle("is-active", i === idx); });
        if (bar) bar.style.transform = "scaleX(" + ((idx + 1) / tabs.length) + ")";
      }
      tabs.forEach(function (t, i) { t.addEventListener("click", function () { activate(i); }); t.addEventListener("focus", function () { activate(i); }); });
      activate(0);
    });
  }

  /* ---- THROUGH-LINE : sticky image cross-fades as steps scroll past ---- */
  function initThroughlines() {
    document.querySelectorAll("[data-throughline]").forEach(function (root) {
      if (root.dataset.tlDone) return;
      root.dataset.tlDone = "1";
      var imgs = Array.prototype.slice.call(root.querySelectorAll("[data-tl-img]"));
      var steps = Array.prototype.slice.call(root.querySelectorAll("[data-tl-step]"));
      var bar = root.querySelector("[data-tl-bar]");
      var indexLabel = root.querySelector("[data-tl-index]");
      if (!imgs.length || !steps.length) return;
      function setActive(idx) {
        imgs.forEach(function (im, i) { im.classList.toggle("is-active", i === idx); });
        steps.forEach(function (st, i) { st.classList.toggle("is-current", i === idx); });
        if (indexLabel) indexLabel.textContent = "0" + (idx + 1);
        if (bar) bar.style.transform = "scaleX(" + ((idx + 1) / steps.length) + ")";
      }
      setActive(0);
      if (!("IntersectionObserver" in global)) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var idx = Number(e.target.dataset.tlStep);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });
      steps.forEach(function (s) { io.observe(s); });
    });
  }

  /* ---- HORIZONTAL GALLERY : pin the section, translate the track ---- */
  function initHScroll() {
    document.querySelectorAll("[data-hscroll]").forEach(function (section) {
      var track = section.querySelector("[data-hscroll-track]");
      if (!track) return;
      if (isMobile()) return; // mobile: native horizontal scroll (CSS)
      section.classList.add("is-horizontal");
      var bar = section.querySelector("[data-hscroll-bar]");
      var distance = function () { return Math.max(0, track.scrollWidth - global.innerWidth); };
      global.gsap.to(track, {
        x: function () { return -distance(); },
        ease: "none",
        scrollTrigger: {
          trigger: section, start: "top top", end: function () { return "+=" + distance(); },
          pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: function (self) { if (bar) bar.style.transform = "scaleX(" + self.progress + ")"; },
        },
      });
    });
  }

  /* ---- COUNT-UP : numbers tick to their value on enter ---- */
  function initCounters() {
    global.gsap.utils.toArray("[data-count]").forEach(function (el) {
      var end = parseFloat(el.dataset.count);
      var dec = parseInt(el.dataset.dec || "0", 10);
      var pre = el.dataset.prefix || "";
      var suf = el.dataset.suffix || "";
      var obj = { v: 0 };
      global.gsap.to(obj, {
        v: end, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        onUpdate: function () { el.textContent = pre + obj.v.toFixed(dec) + suf; },
      });
    });
  }

  /* ---- PAGE PROGRESS : top-of-page reading bar ---- */
  function initPageProgress() {
    var bar = document.querySelector("[data-page-progress] i");
    if (!bar) return;
    global.gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });
  }

  /* ---- CUSTOM SCROLLBAR : draggable thumb mirroring Lenis position ---- */
  function initScrollbar() {
    var lenis = global.__lenis;
    var bar = document.querySelector("[data-scrollbar]");
    var thumb = bar && bar.querySelector("[data-scrollbar-thumb]");
    if (!lenis || !bar || !thumb) return;
    var trackH = 0, thumbH = 44, maxScroll = 1;
    function sizing() {
      trackH = bar.clientHeight || global.innerHeight;
      maxScroll = lenis.limit || (document.documentElement.scrollHeight - global.innerHeight) || 1;
      var pageH = maxScroll + global.innerHeight;
      thumbH = Math.max(44, Math.round((global.innerHeight / pageH) * trackH));
      thumb.style.height = thumbH + "px";
    }
    function place() { thumb.style.transform = "translateY(" + ((lenis.progress || 0) * (trackH - thumbH)) + "px)"; }
    sizing(); place();
    lenis.on("scroll", place);
    global.addEventListener("resize", function () { sizing(); place(); });
    if (hasST) global.ScrollTrigger.addEventListener("refresh", function () { sizing(); place(); });
    var dragging = false;
    function jump(clientY) {
      var rect = bar.getBoundingClientRect();
      var p = (clientY - rect.top - thumbH / 2) / (trackH - thumbH);
      p = Math.max(0, Math.min(1, p));
      lenis.scrollTo(p * maxScroll, { immediate: true });
    }
    function move(e) { if (dragging) jump(e.clientY); }
    function up() { dragging = false; bar.classList.remove("is-dragging"); global.removeEventListener("pointermove", move); global.removeEventListener("pointerup", up); }
    thumb.addEventListener("pointerdown", function (e) {
      dragging = true; bar.classList.add("is-dragging"); jump(e.clientY);
      global.addEventListener("pointermove", move); global.addEventListener("pointerup", up); e.preventDefault();
    });
    bar.addEventListener("pointerdown", function (e) { if (e.target === bar) jump(e.clientY); });
  }

  /* ---- LOGO DRAW INTRO : stroke draw → fill → zoom-out reveal ----
     Markup: an overlay .zf-intro containing an <svg> with .draw-shape paths
     and optional .guide lines. Pass options to tune.                       */
  function initLogoIntro(opts) {
    opts = opts || {};
    var intro = document.querySelector(opts.selector || ".zf-intro");
    var html = document.documentElement;
    if (!intro) { html.classList.add("zf-ready"); return; }
    if (!hasGSAP) { intro.remove(); html.classList.add("zf-ready"); return; }
    var gsap = global.gsap;
    var shapes = gsap.utils.toArray(".draw-shape", intro);
    var guides = gsap.utils.toArray(".guide", intro);
    var lenis = global.__lenis;
    if (lenis) lenis.stop(); else html.style.overflow = "hidden";
    var done = false;
    function reveal() {
      if (done) return; done = true;
      if (lenis) lenis.start(); else html.style.overflow = "";
      html.classList.add("zf-ready");
      gsap.to(intro, { autoAlpha: 0, scale: 1.12, duration: 0.85, ease: "power2.inOut",
        onComplete: function () { if (intro.parentNode) intro.remove(); if (hasST) global.ScrollTrigger.refresh(); } });
      setTimeout(function () { if (intro.parentNode) intro.remove(); }, 1500);
    }
    if (reduced()) { gsap.set(shapes, { fillOpacity: 1 }); gsap.set(guides, { opacity: 0 }); gsap.delayedCall(0.3, reveal); return; }
    var C = { drawDur: 0.9, fillDur: 0.6, guideDur: 0.5, shapeStagger: 0.18, guideStagger: 0.07, fillOverlap: 0.65, strokeW: 1, guideW: 0.75, guideRest: 0.1, hold: 0.35 };
    shapes.forEach(function (el) { var len = el.getTotalLength(); gsap.set(el, { fillOpacity: 0, strokeWidth: C.strokeW, strokeDasharray: len, strokeDashoffset: len, attr: { "vector-effect": "non-scaling-stroke" } }); });
    guides.forEach(function (el) { var len = el.getTotalLength(); gsap.set(el, { strokeWidth: C.guideW, strokeDasharray: len, strokeDashoffset: len, attr: { "vector-effect": "non-scaling-stroke" } }); });
    var tl = gsap.timeline({ defaults: { ease: "power1.inOut" }, onComplete: function () { gsap.delayedCall(C.hold, reveal); } });
    tl.to(guides, { strokeDashoffset: 0, duration: C.guideDur, stagger: C.guideStagger }, 0);
    var shapesStart = C.guideDur * 0.6;
    tl.to(shapes, { strokeDashoffset: 0, duration: C.drawDur, stagger: C.shapeStagger }, shapesStart);
    shapes.forEach(function (el, i) {
      var at = shapesStart + i * C.shapeStagger + C.drawDur * C.fillOverlap;
      tl.to(el, { fillOpacity: 1, duration: C.fillDur }, at);
      tl.to(el, { strokeWidth: 0, duration: C.fillDur }, at);
    });
    tl.to(guides, { opacity: C.guideRest, duration: 0.7 }, ">-0.3");
    setTimeout(reveal, 6500); // non-rAF backstop (fires even in a background tab)
  }

  /* ---- INIT : top-to-bottom so pins are created in document order ---- */
  function init(options) {
    options = options || {};
    var root = document.documentElement;

    if (hasGSAP) { root.classList.remove("no-gsap"); if (hasST) global.gsap.registerPlugin(global.ScrollTrigger); }

    initLenis();

    // No GSAP or reduced-motion → leave content in its visible base state.
    if (!hasST || reduced()) { root.classList.add("zf-ready"); return; }

    if (options.logoIntro !== false) initLogoIntro(options.logoIntro);

    initReveal();
    initParallax();
    initSwitchers();
    initThroughlines();
    initHScroll();
    initCounters();
    initPageProgress();
    if (global.__lenis) initScrollbar();

    global.ScrollTrigger.refresh();

    // Recompute after load + fonts settle.
    global.addEventListener("load", function () { global.ScrollTrigger.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { global.ScrollTrigger.refresh(); });
    var rt;
    global.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { global.ScrollTrigger.refresh(); }, 200); });
  }

  global.ZF = global.ZF || {};
  global.ZF.motion = {
    init: init,
    initLogoIntro: initLogoIntro,
    EASE: EASE,
    _parts: { initReveal: initReveal, initParallax: initParallax, initSwitchers: initSwitchers, initThroughlines: initThroughlines, initHScroll: initHScroll, initCounters: initCounters, initPageProgress: initPageProgress, initScrollbar: initScrollbar, initLenis: initLenis },
  };

  // Auto-init on DOM ready unless data-zf-manual is set on <html>.
  if (!document.documentElement.hasAttribute("data-zf-manual")) {
    if (document.readyState !== "loading") init();
    else document.addEventListener("DOMContentLoaded", function () { init(); });
  }
})(window);
