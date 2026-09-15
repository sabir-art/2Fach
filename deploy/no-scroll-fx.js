/* Normal-scroll mode.
   The site's pages already ship a designed static layout for visitors who ask their
   system for reduced motion. This file makes every page take that path: no smooth-scroll
   hijack, no pinned scroll stages, no scroll-driven reveals. Plain browser scrolling.
   Remove the <script src="./no-scroll-fx.js"> tag from a page to bring its motion back. */
(function () {
  var real = window.matchMedia ? window.matchMedia.bind(window) : null;
  if (real) {
    window.matchMedia = function (q) {
      if (typeof q === 'string' && q.indexOf('prefers-reduced-motion') !== -1) {
        return {
          matches: true, media: q, onchange: null,
          addListener: function () {}, removeListener: function () {},
          addEventListener: function () {}, removeEventListener: function () {},
          dispatchEvent: function () { return false; }
        };
      }
      return real(q);
    };
  }
  // CSS side: the pages' own @media (prefers-reduced-motion) blocks can't be faked from JS,
  // so stop the decorative keyframe loops (footer wordmark marquee, scroll hints, bobbing arrows).
  try {
    var s = document.createElement('style');
    s.setAttribute('data-no-scroll-fx', '');
    s.textContent = '*,*::before,*::after{animation:none !important}';
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}

  // keep Lenis from installing itself, whatever load order the page uses
  try {
    Object.defineProperty(window, 'Lenis', {
      get: function () { return undefined; },
      set: function () {},
      configurable: true
    });
  } catch (e) {}
})();
