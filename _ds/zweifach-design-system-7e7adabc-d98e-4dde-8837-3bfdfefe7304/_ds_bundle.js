/* @ds-bundle: {"format":4,"namespace":"ZweiFachDesignSystem_7e7ada","components":[{"name":"Belief","sourcePath":"components/cards/Belief.jsx"},{"name":"CapabilityTab","sourcePath":"components/cards/CapabilityTab.jsx"},{"name":"ProjectCard","sourcePath":"components/cards/ProjectCard.jsx"},{"name":"ServiceCard","sourcePath":"components/cards/ServiceCard.jsx"},{"name":"StatBlock","sourcePath":"components/cards/StatBlock.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CornerLabel","sourcePath":"components/core/CornerLabel.jsx"},{"name":"Dot","sourcePath":"components/core/Dot.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"FilterPill","sourcePath":"components/core/FilterPill.jsx"},{"name":"Hairline","sourcePath":"components/core/Hairline.jsx"},{"name":"Kicker","sourcePath":"components/core/Kicker.jsx"}],"sourceHashes":{"components/cards/Belief.jsx":"fd01a3c4535c","components/cards/CapabilityTab.jsx":"86bb73cdd901","components/cards/ProjectCard.jsx":"acff274b4517","components/cards/ServiceCard.jsx":"1bd2dd080a1b","components/cards/StatBlock.jsx":"a6573fd1262a","components/core/Button.jsx":"af6b519bb683","components/core/CornerLabel.jsx":"31d1d684daf1","components/core/Dot.jsx":"06f1230fc5b7","components/core/Eyebrow.jsx":"0f822569b2bd","components/core/FilterPill.jsx":"1901680326e3","components/core/Hairline.jsx":"efb18ca82383","components/core/Kicker.jsx":"1e9869ba30bb","motion.js":"5ba56f76f6a5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ZweiFachDesignSystem_7e7ada = window.ZweiFachDesignSystem_7e7ada || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/Belief.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Belief — a Vision "what we believe" item: a Semibold key line and a muted
 * supporting paragraph. Used in the 3-up beliefs grid.
 */
function Belief({
  title,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: "var(--fw-semibold)",
      fontSize: "1.1rem",
      lineHeight: 1.3,
      color: "var(--fg)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.75rem 0 0",
      color: "var(--muted)",
      lineHeight: "var(--lh-body)"
    }
  }, children));
}
Object.assign(__ds_scope, { Belief });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Belief.jsx", error: String((e && e.message) || e) }); }

// components/cards/CapabilityTab.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CapabilityTab — one row of the Capabilities switcher: a number, a strand dot,
 * a label and an arrow that appears when active or hovered. Inactive rows dim
 * to 0.45 opacity. Controlled via `active` + `onActivate`.
 */
function CapabilityTab({
  num,
  label,
  strand = "blueprint",
  active = false,
  onActivate,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dotColor = strand === "clay" ? "var(--clay)" : "var(--blueprint)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "tab",
    "aria-selected": active,
    onClick: onActivate,
    onFocus: onActivate,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      width: "100%",
      padding: "1.25rem 0",
      textAlign: "left",
      fontFamily: "var(--font)",
      color: "var(--fg)",
      background: "none",
      border: 0,
      borderTop: "1px solid var(--line)",
      cursor: "pointer",
      opacity: active ? 1 : 0.45,
      transition: "opacity var(--dur-base) var(--ease-out-expo)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.78rem",
      letterSpacing: "0.1em",
      color: "var(--taupe)"
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: dotColor,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-title-sm)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--ls-tight)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      marginLeft: "auto",
      fontSize: "1.15rem",
      opacity: active || hover ? 0.6 : 0,
      transform: active || hover ? "none" : "translateX(-6px)",
      transition: "opacity var(--dur-base), transform var(--dur-base)"
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { CapabilityTab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CapabilityTab.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProjectCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProjectCard — the "Selected work" card (selcard): a tall image under a dark
 * scrim, with a status chip, an index, a meta line and a title at the foot.
 * Image scales up on hover.
 */
function ProjectCard({
  image,
  status,
  index,
  meta,
  title,
  href = "#",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "block",
      width: "min(80vw, 30rem)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      color: "var(--on-media)",
      textDecoration: "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "3 / 4",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: typeof title === "string" ? title : "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform var(--dur-slower) var(--ease-out-expo)",
      transform: hover ? "scale(1.06)" : "scale(1)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(20,21,24,.85), rgba(20,21,24,.05) 55%)"
    }
  })), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "1.25rem",
      top: "1.25rem",
      background: "rgba(244,240,231,.92)",
      color: "var(--graphite)",
      fontSize: "var(--fs-label-xs)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      fontWeight: "var(--fw-semibold)",
      padding: "0.35rem 0.8rem",
      borderRadius: "var(--radius-pill)"
    }
  }, status), index && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "1.25rem",
      top: "1.25rem",
      fontSize: "var(--fs-label)",
      letterSpacing: "0.12em",
      color: "rgba(244,240,231,.8)"
    }
  }, index), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "1.25rem",
      right: "1.25rem",
      bottom: "1.25rem"
    }
  }, meta && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--fs-label)",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "rgba(244,240,231,.72)"
    }
  }, meta), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0.4rem 0 0",
      fontWeight: "var(--fw-medium)",
      fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)",
      color: "#fff"
    }
  }, title)));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ServiceCard — a service column with a giant Extralight ghost number behind
 * the title, over a top hairline. Matches the home "What we do" grid.
 */
function ServiceCard({
  num,
  title,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      position: "relative",
      borderTop: "1px solid var(--line)",
      paddingTop: "28px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: "14px",
      right: 0,
      pointerEvents: "none",
      fontSize: "var(--fs-ghost)",
      fontWeight: "var(--fw-extralight)",
      lineHeight: 1,
      color: "rgba(22,20,15,.09)"
    }
  }, num), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--fs-h4)",
      margin: "0 0 0.5em",
      letterSpacing: "var(--ls-tight)",
      color: "var(--fg)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted)",
      margin: 0,
      maxWidth: "34ch",
      lineHeight: "var(--lh-body)"
    }
  }, children));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatBlock — a single statistic: a large Light-weight value over a top
 * hairline, with a small label beneath. Designed for dark grounds (the
 * "visual universe" stats), with a `light` tone for cream.
 */
function StatBlock({
  value,
  label,
  tone = "dark",
  style = {},
  ...rest
}) {
  const onDark = tone === "dark";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: onDark ? "1px solid rgba(244,240,231,.16)" : "1px solid var(--line)",
      paddingTop: "clamp(14px,1.6vw,22px)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontWeight: "var(--fw-light)",
      fontSize: "var(--fs-stat)",
      lineHeight: 1,
      letterSpacing: "var(--ls-display)",
      color: onDark ? "#f4f0e7" : "var(--fg)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "0.8em",
      fontSize: "0.78rem",
      letterSpacing: "0.04em",
      lineHeight: 1.35,
      color: onDark ? "rgba(244,240,231,.6)" : "var(--muted)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ZweiFach — Button
 * The site's button in all four real variants. Uppercase, wide-tracked,
 * SQUARE (no rounding — architectural). Renders as <a> when `href` is set, else <button>.
 *
 * @example
 * <Button variant="solid" href="#cta">Start a project</Button>
 * <Button variant="ghost">Request a quote</Button>
 * <Button variant="line">View work</Button>
 * <Button variant="line-light">Discover CloudOnPoint</Button>  // on dark grounds
 */
function Button({
  children,
  variant = "solid",
  href,
  onClick,
  type = "button",
  disabled = false,
  style = {},
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6em",
    fontFamily: "var(--font)",
    fontSize: "0.74rem",
    fontWeight: "var(--fw-medium)",
    letterSpacing: "var(--ls-nav)",
    textTransform: "uppercase",
    padding: "0.85em 1.5em",
    borderRadius: "var(--radius-button)",
    whiteSpace: "nowrap",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all var(--dur-fast) var(--ease-standard)",
    border: "1px solid transparent",
    background: "transparent",
    textDecoration: "none",
    lineHeight: 1,
    opacity: disabled ? 0.45 : 1,
    WebkitTapHighlightColor: "transparent"
  };
  const variants = {
    solid: {
      background: "var(--accent)",
      color: "#fff",
      fontWeight: "var(--fw-semibold)"
    },
    ghost: {
      border: "1px solid var(--line)",
      color: "var(--fg)"
    },
    line: {
      border: "1px solid var(--line)",
      color: "var(--fg)"
    },
    "line-light": {
      border: "1px solid rgba(244,240,231,.34)",
      color: "var(--on-media)"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyles = {
    solid: {
      filter: "brightness(1.06)",
      transform: "translateY(-2px)"
    },
    ghost: {
      borderColor: "var(--accent)",
      color: "var(--accent)"
    },
    line: {
      borderColor: "var(--accent)",
      color: "var(--accent)"
    },
    "line-light": {
      borderColor: "var(--on-media)",
      background: "rgba(244,240,231,.07)"
    }
  };
  const composed = {
    ...base,
    ...variants[variant],
    ...(hover && !disabled ? hoverStyles[variant] : {}),
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: disabled ? undefined : onClick
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: composed
    }, handlers, rest), children);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: composed
  }, handlers, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/CornerLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CornerLabel — the small section index ("(01)") or micro-label that sits in a
 * section corner opposite the kicker. Tones: default (taupe), light, dim.
 */
function CornerLabel({
  children,
  tone = "default",
  style = {},
  ...rest
}) {
  const color = tone === "light" ? "rgba(244,240,231,.6)" : tone === "dim" ? "rgba(244,240,231,.38)" : "var(--taupe)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontSize: "var(--fs-label)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label-wide)",
      textTransform: "uppercase",
      color,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { CornerLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CornerLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Dot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dot — the 7px strand identity dot. `blueprint` = architecture (Esad),
 * `clay` = commercialisation (Dionis). Size is adjustable.
 */
function Dot({
  strand = "blueprint",
  size = 7,
  style = {},
  ...rest
}) {
  const color = strand === "clay" ? "var(--clay)" : "var(--blueprint)";
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: color,
      flex: "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Dot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Dot.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the small accent-coloured UPPERCASE label that opens a section
 * (e.g. "What we do"). Wide tracking. Sits above the section heading.
 */
function Eyebrow({
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      margin: 0,
      fontSize: "var(--fs-label)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--accent)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/FilterPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FilterPill — the Works-page filter chip. Resting state is a faint ground;
 * the active pill INVERTS to ink ground with cream text.
 */
function FilterPill({
  children,
  active = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-pressed": active,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: "var(--font)",
      fontSize: "0.82rem",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "0.01em",
      padding: "0.75em 1.45em",
      borderRadius: "var(--radius-button)",
      border: "1px solid transparent",
      cursor: "pointer",
      transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
      background: active ? "var(--fg)" : hover ? "var(--fill-hover)" : "var(--fill-rest)",
      color: active ? "var(--bg)" : "var(--fg)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { FilterPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FilterPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Hairline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hairline — the 1px brand rule. Default sits on cream; `tone="dark"` for
 * dark grounds. Use to divide content instead of boxing it.
 */
function Hairline({
  tone = "default",
  style = {},
  ...rest
}) {
  const color = tone === "dark" ? "rgba(244,240,231,.16)" : "var(--line)";
  return /*#__PURE__*/React.createElement("hr", _extends({
    style: {
      border: 0,
      height: "1px",
      background: color,
      margin: 0,
      width: "100%",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Hairline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Hairline.jsx", error: String((e && e.message) || e) }); }

// components/core/Kicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Kicker — taupe UPPERCASE label with a short leading rule. Used to label
 * the "two strands" sections (Vision, Capabilities, Through-line…). Use the
 * `light` tone over dark/over-media grounds.
 */
function Kicker({
  children,
  tone = "default",
  style = {},
  ...rest
}) {
  const color = tone === "light" ? "rgba(244,240,231,.62)" : "var(--taupe)";
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.65rem",
      margin: 0,
      fontSize: "var(--fs-label)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "1.7rem",
      height: "1px",
      background: "currentColor",
      opacity: 0.55
    }
  }), children);
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kicker.jsx", error: String((e && e.message) || e) }); }

// motion.js
try { (() => {
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

  var EASE = {
    outExpo: "cubic-bezier(.16,1,.3,1)"
  };
  var hasGSAP = typeof global.gsap !== "undefined";
  var hasST = hasGSAP && typeof global.ScrollTrigger !== "undefined";
  var mq = function (q) {
    return global.matchMedia(q).matches;
  };
  var reduced = function () {
    return mq("(prefers-reduced-motion: reduce)");
  };
  var isMobile = function () {
    return mq("(max-width: 768px)");
  };

  /* ---- Lenis smooth-scroll, driven by the GSAP ticker (skipped on reduced-motion) ---- */
  function initLenis() {
    if (typeof global.Lenis === "undefined" || !hasGSAP || reduced()) return null;
    if (global.__lenis) return global.__lenis;
    var lenis = new global.Lenis({
      duration: 1.05,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      // easeOutExpo
      smoothWheel: true,
      touchMultiplier: 1.4
    });
    global.__lenis = lenis;
    if (hasST) lenis.on("scroll", global.ScrollTrigger.update);
    global.gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    global.gsap.ticker.lagSmoothing(0);
    return lenis;
  }

  /* ---- REVEAL : fade + rise, batched with a stagger ---- */
  function initReveal() {
    var items = global.gsap.utils.toArray("[data-reveal]");
    if (!items.length) return;
    global.gsap.set(items, {
      opacity: 0,
      y: 42
    });
    global.ScrollTrigger.batch(items, {
      start: "top 86%",
      onEnter: function (els) {
        global.gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          overwrite: true
        });
      }
    });
  }

  /* ---- PARALLAX : element drifts against the scroll ---- */
  function initParallax() {
    global.gsap.utils.toArray("[data-parallax]").forEach(function (el) {
      var speed = parseFloat(el.dataset.parallax) || 0.25;
      global.gsap.fromTo(el, {
        yPercent: speed * 50
      }, {
        yPercent: -speed * 50,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("[data-parallax-scope], section") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
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
        if (idx === current) return;
        current = idx;
        tabs.forEach(function (t, i) {
          t.classList.toggle("is-active", i === idx);
          t.setAttribute("aria-selected", String(i === idx));
        });
        panels.forEach(function (p, i) {
          p.classList.toggle("is-active", i === idx);
        });
        medias.forEach(function (m, i) {
          m.classList.toggle("is-active", i === idx);
        });
        if (bar) bar.style.transform = "scaleX(" + (idx + 1) / tabs.length + ")";
      }
      tabs.forEach(function (t, i) {
        t.addEventListener("click", function () {
          activate(i);
        });
        t.addEventListener("focus", function () {
          activate(i);
        });
      });
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
        imgs.forEach(function (im, i) {
          im.classList.toggle("is-active", i === idx);
        });
        steps.forEach(function (st, i) {
          st.classList.toggle("is-current", i === idx);
        });
        if (indexLabel) indexLabel.textContent = "0" + (idx + 1);
        if (bar) bar.style.transform = "scaleX(" + (idx + 1) / steps.length + ")";
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
      }, {
        threshold: 0,
        rootMargin: "-45% 0px -45% 0px"
      });
      steps.forEach(function (s) {
        io.observe(s);
      });
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
      var distance = function () {
        return Math.max(0, track.scrollWidth - global.innerWidth);
      };
      global.gsap.to(track, {
        x: function () {
          return -distance();
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: function () {
            return "+=" + distance();
          },
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            if (bar) bar.style.transform = "scaleX(" + self.progress + ")";
          }
        }
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
      var obj = {
        v: 0
      };
      global.gsap.to(obj, {
        v: end,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: function () {
          el.textContent = pre + obj.v.toFixed(dec) + suf;
        }
      });
    });
  }

  /* ---- PAGE PROGRESS : top-of-page reading bar ---- */
  function initPageProgress() {
    var bar = document.querySelector("[data-page-progress] i");
    if (!bar) return;
    global.gsap.fromTo(bar, {
      scaleX: 0
    }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.2
      }
    });
  }

  /* ---- CUSTOM SCROLLBAR : draggable thumb mirroring Lenis position ---- */
  function initScrollbar() {
    var lenis = global.__lenis;
    var bar = document.querySelector("[data-scrollbar]");
    var thumb = bar && bar.querySelector("[data-scrollbar-thumb]");
    if (!lenis || !bar || !thumb) return;
    var trackH = 0,
      thumbH = 44,
      maxScroll = 1;
    function sizing() {
      trackH = bar.clientHeight || global.innerHeight;
      maxScroll = lenis.limit || document.documentElement.scrollHeight - global.innerHeight || 1;
      var pageH = maxScroll + global.innerHeight;
      thumbH = Math.max(44, Math.round(global.innerHeight / pageH * trackH));
      thumb.style.height = thumbH + "px";
    }
    function place() {
      thumb.style.transform = "translateY(" + (lenis.progress || 0) * (trackH - thumbH) + "px)";
    }
    sizing();
    place();
    lenis.on("scroll", place);
    global.addEventListener("resize", function () {
      sizing();
      place();
    });
    if (hasST) global.ScrollTrigger.addEventListener("refresh", function () {
      sizing();
      place();
    });
    var dragging = false;
    function jump(clientY) {
      var rect = bar.getBoundingClientRect();
      var p = (clientY - rect.top - thumbH / 2) / (trackH - thumbH);
      p = Math.max(0, Math.min(1, p));
      lenis.scrollTo(p * maxScroll, {
        immediate: true
      });
    }
    function move(e) {
      if (dragging) jump(e.clientY);
    }
    function up() {
      dragging = false;
      bar.classList.remove("is-dragging");
      global.removeEventListener("pointermove", move);
      global.removeEventListener("pointerup", up);
    }
    thumb.addEventListener("pointerdown", function (e) {
      dragging = true;
      bar.classList.add("is-dragging");
      jump(e.clientY);
      global.addEventListener("pointermove", move);
      global.addEventListener("pointerup", up);
      e.preventDefault();
    });
    bar.addEventListener("pointerdown", function (e) {
      if (e.target === bar) jump(e.clientY);
    });
  }

  /* ---- LOGO DRAW INTRO : stroke draw → fill → zoom-out reveal ----
     Markup: an overlay .zf-intro containing an <svg> with .draw-shape paths
     and optional .guide lines. Pass options to tune.                       */
  function initLogoIntro(opts) {
    opts = opts || {};
    var intro = document.querySelector(opts.selector || ".zf-intro");
    var html = document.documentElement;
    if (!intro) {
      html.classList.add("zf-ready");
      return;
    }
    if (!hasGSAP) {
      intro.remove();
      html.classList.add("zf-ready");
      return;
    }
    var gsap = global.gsap;
    var shapes = gsap.utils.toArray(".draw-shape", intro);
    var guides = gsap.utils.toArray(".guide", intro);
    var lenis = global.__lenis;
    if (lenis) lenis.stop();else html.style.overflow = "hidden";
    var done = false;
    function reveal() {
      if (done) return;
      done = true;
      if (lenis) lenis.start();else html.style.overflow = "";
      html.classList.add("zf-ready");
      gsap.to(intro, {
        autoAlpha: 0,
        scale: 1.12,
        duration: 0.85,
        ease: "power2.inOut",
        onComplete: function () {
          if (intro.parentNode) intro.remove();
          if (hasST) global.ScrollTrigger.refresh();
        }
      });
      setTimeout(function () {
        if (intro.parentNode) intro.remove();
      }, 1500);
    }
    if (reduced()) {
      gsap.set(shapes, {
        fillOpacity: 1
      });
      gsap.set(guides, {
        opacity: 0
      });
      gsap.delayedCall(0.3, reveal);
      return;
    }
    var C = {
      drawDur: 0.9,
      fillDur: 0.6,
      guideDur: 0.5,
      shapeStagger: 0.18,
      guideStagger: 0.07,
      fillOverlap: 0.65,
      strokeW: 1,
      guideW: 0.75,
      guideRest: 0.1,
      hold: 0.35
    };
    shapes.forEach(function (el) {
      var len = el.getTotalLength();
      gsap.set(el, {
        fillOpacity: 0,
        strokeWidth: C.strokeW,
        strokeDasharray: len,
        strokeDashoffset: len,
        attr: {
          "vector-effect": "non-scaling-stroke"
        }
      });
    });
    guides.forEach(function (el) {
      var len = el.getTotalLength();
      gsap.set(el, {
        strokeWidth: C.guideW,
        strokeDasharray: len,
        strokeDashoffset: len,
        attr: {
          "vector-effect": "non-scaling-stroke"
        }
      });
    });
    var tl = gsap.timeline({
      defaults: {
        ease: "power1.inOut"
      },
      onComplete: function () {
        gsap.delayedCall(C.hold, reveal);
      }
    });
    tl.to(guides, {
      strokeDashoffset: 0,
      duration: C.guideDur,
      stagger: C.guideStagger
    }, 0);
    var shapesStart = C.guideDur * 0.6;
    tl.to(shapes, {
      strokeDashoffset: 0,
      duration: C.drawDur,
      stagger: C.shapeStagger
    }, shapesStart);
    shapes.forEach(function (el, i) {
      var at = shapesStart + i * C.shapeStagger + C.drawDur * C.fillOverlap;
      tl.to(el, {
        fillOpacity: 1,
        duration: C.fillDur
      }, at);
      tl.to(el, {
        strokeWidth: 0,
        duration: C.fillDur
      }, at);
    });
    tl.to(guides, {
      opacity: C.guideRest,
      duration: 0.7
    }, ">-0.3");
    setTimeout(reveal, 6500); // non-rAF backstop (fires even in a background tab)
  }

  /* ---- INIT : top-to-bottom so pins are created in document order ---- */
  function init(options) {
    options = options || {};
    var root = document.documentElement;
    if (hasGSAP) {
      root.classList.remove("no-gsap");
      if (hasST) global.gsap.registerPlugin(global.ScrollTrigger);
    }
    initLenis();

    // No GSAP or reduced-motion → leave content in its visible base state.
    if (!hasST || reduced()) {
      root.classList.add("zf-ready");
      return;
    }
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
    global.addEventListener("load", function () {
      global.ScrollTrigger.refresh();
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () {
      global.ScrollTrigger.refresh();
    });
    var rt;
    global.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        global.ScrollTrigger.refresh();
      }, 200);
    });
  }
  global.ZF = global.ZF || {};
  global.ZF.motion = {
    init: init,
    initLogoIntro: initLogoIntro,
    EASE: EASE,
    _parts: {
      initReveal: initReveal,
      initParallax: initParallax,
      initSwitchers: initSwitchers,
      initThroughlines: initThroughlines,
      initHScroll: initHScroll,
      initCounters: initCounters,
      initPageProgress: initPageProgress,
      initScrollbar: initScrollbar,
      initLenis: initLenis
    }
  };

  // Auto-init on DOM ready unless data-zf-manual is set on <html>.
  if (!document.documentElement.hasAttribute("data-zf-manual")) {
    if (document.readyState !== "loading") init();else document.addEventListener("DOMContentLoaded", function () {
      init();
    });
  }
})(window);
})(); } catch (e) { __ds_ns.__errors.push({ path: "motion.js", error: String((e && e.message) || e) }); }

__ds_ns.Belief = __ds_scope.Belief;

__ds_ns.CapabilityTab = __ds_scope.CapabilityTab;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CornerLabel = __ds_scope.CornerLabel;

__ds_ns.Dot = __ds_scope.Dot;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.FilterPill = __ds_scope.FilterPill;

__ds_ns.Hairline = __ds_scope.Hairline;

__ds_ns.Kicker = __ds_scope.Kicker;

})();
