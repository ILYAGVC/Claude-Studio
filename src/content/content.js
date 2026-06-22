/* ===================================================================
 *  Claude RTL — core engine (content script)
 *  - Set direction (RTL/auto/LTR) on conversation text blocks
 *  - Apply font/size/spacing through CSS variables
 *  - Load remote fonts
 *  - Keep code and math left-to-right
 *  - Optionally convert digits to Persian
 * =================================================================== */
(function () {
  "use strict";

  const KEY = window.CRX_KEY;
  const FONTS = window.CRX_FONTS;
  const ROOT = document.documentElement;

  let settings = window.CRX_merge(null);
  let observer = null;
  let modeObserver = null;

  /* ---------- orphan-instance shutdown ----------
   * After a reload/update the previous content script keeps running with stale
   * observers but a dead extension context. A fresh instance broadcasts
   * "crx:shutdown" to retire the old one, then reconciles the DOM. We dispatch
   * BEFORE registering our own listener, so we never shut ourselves down. */
  let aborted = false;
  function selfShutdown(fullCleanup) {
    aborted = true;
    if (observer) { observer.disconnect(); observer = null; }
    if (modeObserver) { modeObserver.disconnect(); modeObserver = null; }
    modePending = false;
    // Restore Claude's real theme/accent so a successor captures the correct
    // original mode, and so a disabled extension leaves nothing forced.
    try { revertMode(); removeClaudeBlack(); removeClaudeAccent(); } catch (e) {}
    // No successor (context truly gone) -> also strip our RTL marks.
    if (fullCleanup) { try { teardown(); } catch (e) {} }
  }
  // True while this content script can still reach the extension APIs. A reloaded
  // instance whose context is invalidated shuts itself down on the next observer
  // tick — even if "crx:shutdown" never reached it (e.g. separate isolated world).
  function contextValid() {
    try { return !!(chrome.runtime && chrome.runtime.id); } catch (e) { return false; }
  }
  try { window.dispatchEvent(new CustomEvent("crx:shutdown")); } catch (e) {}
  // A newer instance asks older ones to step aside (hand off, no full teardown).
  window.addEventListener("crx:shutdown", function () { selfShutdown(false); });

  /* Region selectors */
  const SEL_ASST = '.font-claude-response,.font-claude-response-body,.font-claude-message,[data-testid="assistant-message"],.prose';
  const SEL_USER = '[data-testid="user-message"],[class~="!font-user-message"],.font-user-message';
  const SEL_INPUT = '.ProseMirror,[contenteditable="true"]';
  const SEL_CHATLIST = 'a[href*="/chat/"],a[href*="/project/"]';
  const SEL_SKIP = "pre,code,kbd,samp,.katex,.katex-display,.katex-mathml,mjx-container,math";
  const TEXT_SEL =
    "p,li,ul,ol,blockquote,dd,dt,td,th,summary,figcaption,h1,h2,h3,h4,h5,h6";

  /* ---------- storage helper ---------- */
  function loadSettings() {
    return new Promise((resolve) => {
      try {
        chrome.storage.local.get(KEY, (o) => resolve(window.CRX_merge(o && o[KEY])));
      } catch (e) {
        resolve(window.CRX_merge(null));
      }
    });
  }

  /* ---------- per-site enabled check ---------- */
  function siteEnabled() {
    const h = location.hostname;
    if (h.indexOf("claude.ai") !== -1) return settings.sites["claude.ai"] !== false;
    if (h.indexOf("claude.com") !== -1) return settings.sites["claude.com"] !== false;
    return true;
  }
  function active() {
    return settings.enabled && siteEnabled();
  }

  /* ---------- font stack computation ---------- */
  function textStack() {
    return FONTS.get("text", settings.font).stack;
  }
  function headStack() {
    if (!settings.headingFont || settings.headingFont === "inherit") return textStack();
    return FONTS.get("text", settings.headingFont).stack;
  }
  function codeStack() {
    return FONTS.get("mono", settings.codeFont).stack;
  }

  /* ---------- remote font loading ---------- */
  function fontLinkId(url) {
    return "crx-font-" + btoa(unescape(encodeURIComponent(url))).replace(/[^a-z0-9]/gi, "");
  }
  function injectFontLink(url) {
    if (!url) return;
    const id = fontLinkId(url);
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = url;
    link.setAttribute("data-crx", "1");
    (document.head || ROOT).appendChild(link);
  }
  function loadFonts() {
    if (!settings.allowRemoteFonts) return;
    const want = [];
    want.push(FONTS.get("text", settings.font).load);
    if (settings.headingFont && settings.headingFont !== "inherit") {
      want.push(FONTS.get("text", settings.headingFont).load);
    }
    if (settings.codeFont && settings.codeFont !== "default") {
      want.push(FONTS.get("mono", settings.codeFont).load);
    }
    want.forEach((l) => injectFontLink(FONTS.href(l)));
  }

  /* ---------- CSS variables and classes ---------- */
  // Resolve the chosen variable-font weight, but only when the active font ships
  // more than one weight. A single-weight font locks the slider, so a weight left
  // over from a previous font must NOT apply (it would synthesize fake bold and
  // contradict the locked control). Returns "inherit" (no override) in that case.
  function effWeight(kind, fontId, weight) {
    if (weight === "default") return "inherit";
    const f = FONTS.get(kind, fontId);
    const stops = FONTS.weightStops(f);
    if (stops && stops.length <= 1) return "inherit"; // single-weight font: slider locked
    // Snap to a real stop so a carried-over weight never lands out of range
    // (synthesized bold / mismatch with the snapped slider display).
    return FONTS.nearestWeight(f, weight);
  }
  function setVars() {
    const s = ROOT.style;
    s.setProperty("--crx-font", textStack());
    s.setProperty("--crx-headfont", headStack());
    s.setProperty("--crx-codefont", codeStack());
    s.setProperty("--crx-size", settings.fontSizePx + "px");
    s.setProperty("--crx-lh", String(settings.lineHeight));
    s.setProperty("--crx-ls", settings.letterSpacing + "px");
    s.setProperty("--crx-ws", settings.wordSpacing + "px");
    s.setProperty("--crx-pspace", settings.paragraphSpacing + "em");
    s.setProperty("--crx-align", settings.align);
    s.setProperty("--crx-weight", effWeight("text", settings.font, settings.fontWeight));
    s.setProperty("--crx-codeweight", effWeight("mono", settings.codeFont, settings.codeFontWeight));
    s.setProperty("--crx-codebg", settings.codeBg && settings.codeBg !== "default" ? settings.codeBg : "");
    s.setProperty("--crx-width", settings.readingWidth + "px");
  }

  function setClasses() {
    const cl = ROOT.classList;
    cl.toggle("crx-active", true);
    cl.toggle("crx-asst", !!settings.scope.assistant);
    cl.toggle("crx-user", !!settings.scope.user);
    cl.toggle("crx-input", !!settings.scope.input);
    cl.toggle("crx-chatlist", !!settings.scope.chatList);
    // Gate font-family on the RESOLVED stack: "default" resolves to "inherit", and
    // emitting font-family: inherit !important would override Claude's element-specific
    // fonts (e.g. its serif response body) instead of leaving them untouched.
    cl.toggle("crx-font", textStack() !== "inherit");
    cl.toggle("crx-headfont", headStack() !== "inherit");
    cl.toggle("crx-weight", effWeight("text", settings.font, settings.fontWeight) !== "inherit");
    cl.toggle("crx-codefont", settings.codeFont !== "default");
    cl.toggle("crx-codeweight", effWeight("mono", settings.codeFont, settings.codeFontWeight) !== "inherit");
    cl.toggle("crx-codebg", !!(settings.codeBg && settings.codeBg !== "default"));
    cl.toggle("crx-codeltr", !!settings.keepCodeLtr);
    cl.toggle("crx-mathltr", !!settings.keepMathLtr);
    cl.toggle("crx-rw", !!settings.readingWidthEnabled);
  }

  /* ---------- user custom CSS ---------- */
  function setCustomCss() {
    let el = document.getElementById("crx-custom-css");
    if (!settings.customCss) {
      if (el) el.remove();
      return;
    }
    if (!el) {
      el = document.createElement("style");
      el.id = "crx-custom-css";
      (document.head || ROOT).appendChild(el);
    }
    el.textContent = settings.customCss;
  }

  /* ---------- Claude's own theme (light/dark + accent color) ---------- */
  function hexToHsl(hex) {
    const m = /^#([0-9a-f]{6})$/i.exec(String(hex || "").trim());
    if (!m) return null;
    const n = parseInt(m[1], 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  // Claude's accent lives in TWO token families: the coral BRAND tokens
  // (--brand-*, --cds-clay*) drive the prominent accent (logo, primary/send
  // buttons, highlights), while --accent-* is a secondary (purple) ramp. A custom
  // accent recolors both. --brand-900 is left alone: it is the dark text drawn ON
  // the accent. Claude redeclares these tokens on every .cds-root, so an inline
  // override on <html> can't reach those scopes — inject an !important rule across
  // all scopes so a custom accent is truly universal.
  function setAccentCss(decl) {
    let el = document.getElementById("crx-accent-css");
    if (!decl) { if (el) el.remove(); return; }
    if (!el) {
      el = document.createElement("style");
      el.id = "crx-accent-css";
      el.setAttribute("data-crx", "1");
      (document.head || ROOT).appendChild(el);
    }
    // Tint inline code to the accent too, but ONLY here (inside the custom-accent
    // style), so the default "no change" state leaves Claude's own code colour.
    // Use a brighter shade on dark/black backgrounds, a darker one on light.
    const css = ":root,[data-mode],.cds-root{" + decl + "}" +
      'html[data-mode="dark"] :not(pre)>code,html[data-crxblack="1"] :not(pre)>code{color:var(--crx-accent-bright)!important}' +
      'html[data-mode="light"] :not(pre)>code{color:var(--crx-accent-dark)!important}';
    if (el.textContent !== css) el.textContent = css;
  }
  function removeClaudeAccent() {
    setAccentCss("");
  }
  function applyClaudeAccent() {
    if (settings.claudeAccent) {
      const c = hexToHsl(settings.claudeAccent);
      if (c) {
        const dark = Math.max(0, c.l - 8); // emphasized/hover shade
        const trip = (l) => c.h + " " + c.s + "% " + l + "%";          // raw triplet -> consumed via hsl(var(--x))
        const col = (l) => "hsl(" + c.h + " " + c.s + "% " + l + "%)";  // full colour -> consumed directly via var(--x)
        const d =
          "--brand-000:" + trip(dark) + "!important;" +
          "--brand-100:" + trip(c.l) + "!important;" +
          "--brand-200:" + trip(c.l) + "!important;" +
          "--_brand-clay:" + trip(c.l) + "!important;" +
          "--_brand-clay-emphasized:" + trip(dark) + "!important;" +
          "--cds-clay:" + col(c.l) + "!important;" +
          "--cds-clay-emphasized:" + col(dark) + "!important;" +
          "--accent-brand:" + trip(c.l) + "!important;" +
          "--accent-000:" + trip(79) + "!important;" +
          "--accent-100:" + trip(62) + "!important;" +
          "--accent-200:" + trip(62) + "!important;" +
          "--accent-900:" + trip(22) + "!important;" +
          // Accent shades for accent-coloured TEXT (inline code). Symmetric clamp:
          // keep the bright shade legible on dark (>=58) and the dark shade legible
          // on light (<=50), so even a near-black/near-white accent stays readable.
          "--crx-accent-bright:" + col(Math.min(90, Math.max(58, c.l + 14))) + ";" +
          "--crx-accent-dark:" + col(Math.max(28, Math.min(50, c.l - 16))) + ";";
        setAccentCss(d);
        return;
      }
    }
    removeClaudeAccent();
  }
  // Black theme: pure-black page (#000), dark composer/card surface (--bg-000),
  // white-leaning text ramp so even muted tiers stay readable. --border-* MUST be
  // overridden too — Claude's default light warm value (53 12% 87%) would render
  // as bright lines on black.
  const BLACK_VARS = {
    "--bg-000": "0 0% 11%", "--bg-100": "0 0% 0%", "--bg-200": "0 0% 8%",
    "--bg-300": "0 0% 25%", "--bg-400": "0 0% 13%", "--bg-500": "0 0% 13%",
    "--border-100": "0 0% 16%", "--border-200": "0 0% 20%",
    "--border-300": "0 0% 24%", "--border-400": "0 0% 16%",
    "--text-000": "0 0% 100%", "--text-100": "0 0% 100%", "--text-200": "0 0% 92%",
    "--text-300": "0 0% 84%", "--text-400": "0 0% 74%", "--text-500": "0 0% 66%"
  };
  // .cds-root[data-mode] elements redeclare --bg/--text locally, overriding the
  // value on <html>, so they must be painted inline too (else the sidebar etc.
  // keep their default color).
  function paintBlack(el) { if (el.getAttribute("data-crxblack") === "1") return; for (const k in BLACK_VARS) el.style.setProperty(k, BLACK_VARS[k]); el.setAttribute("data-crxblack", "1"); }
  function unpaintBlack(el) { if (el.getAttribute("data-crxblack") !== "1") return; for (const k in BLACK_VARS) el.style.removeProperty(k); el.removeAttribute("data-crxblack"); }
  function blackScopes() { return [ROOT, ...document.querySelectorAll("[data-mode]")]; }
  // Modals, dropdowns, tooltips and panels paint from a SEPARATE --cds-surface-*
  // family (warm hex values like #2c2c2a / #383835) not covered by --bg-*. Re-map
  // them to neutral grays so every portal matches.
  const SURFACE_VARS = {
    "--cds-surface-0": "#080808", "--cds-surface-1": "#0d0d0d",
    "--cds-surface-2": "#141414", "--cds-surface-panel": "#141414",
    "--cds-surface-3": "#1c1c1c", "--cds-surface-popover": "#1c1c1c",
    "--cds-tooltip-bg": "#1c1c1c"
  };
  // The inline painting above can't reach dynamically mounted portals
  // (modals/dropdowns/tooltips live outside the painted tree and redeclare tokens
  // locally), so an !important rule on every scope themes them. It also lifts muted
  // sidebar/menu icons (--text-500) to the bright label color so each row reads as
  // one color.
  function buildBlackCss() {
    const scope = 'html[data-crxblack="1"],html[data-crxblack="1"] [data-mode],html[data-crxblack="1"] .cds-root';
    let d = "";
    for (const k in BLACK_VARS) d += k + ":" + BLACK_VARS[k] + " !important;";
    for (const k in SURFACE_VARS) d += k + ":" + SURFACE_VARS[k] + " !important;";
    return scope + "{" + d + "}" +
      // lift muted menu icons to the bright label color (covers <a>/<button>/role=button rows)
      'html[data-crxblack="1"] :is(a,button,[role="button"]) svg.text-text-500{color:hsl(var(--text-000))!important}' +
      // neutral selection highlight so selected text stays readable on pure black
      'html[data-crxblack="1"] ::selection{background:hsl(0 0% 100% / 0.22)!important}' +
      // inline code pills: subtle dark fill + border to match the dark theme. Text
      // colour stays Claude's own — it is tinted to the accent ONLY while a custom
      // accent is set (see setAccentCss), so the default state recolours nothing.
      'html[data-crxblack="1"] :not(pre)>code{background-color:hsl(0 0% 100% / 0.06)!important;border:1px solid hsl(0 0% 100% / 0.14)!important}';
  }
  const BLACK_CSS = buildBlackCss();
  function setBlackCss(on) {
    let el = document.getElementById("crx-black-css");
    if (!on) { if (el) el.remove(); return; }
    if (!el) {
      el = document.createElement("style");
      el.id = "crx-black-css";
      el.setAttribute("data-crx", "1");
      (document.head || ROOT).appendChild(el);
    }
    if (el.textContent !== BLACK_CSS) el.textContent = BLACK_CSS;
  }
  function applyClaudeBlack() { blackScopes().forEach(paintBlack); setBlackCss(true); }
  // Also sweep elements we painted that may since have lost their data-mode.
  function removeClaudeBlack() { setBlackCss(false); [ROOT].concat([...document.querySelectorAll("[data-mode],[data-crxblack]")]).forEach(unpaintBlack); }
  function modeFor() { return settings.claudeTheme === "black" ? "dark" : settings.claudeTheme; }
  // Claude sets the theme mode on <html> and on dozens of .cds-root elements
  // that each carry their own data-mode; full coverage needs all of them.
  const MODE_OBS_OPTS = { attributes: true, attributeFilter: ["data-mode"], subtree: true, childList: true };
  let originalMode; // undefined = nothing forced | null = original had no attribute | string = original value
  function forceMode(mode) {
    if (modeObserver) modeObserver.disconnect(); // don't let the observer fire on our own changes
    const black = active() && settings.claudeTheme === "black";
    const set = (el) => {
      if (mode) {
        if (el.getAttribute("data-mode") !== mode) {
          // Stash the original value (a real value, or "" if absent) on first touch
          // so revert restores it EXACTLY, even when overwriting a data-mode Claude
          // itself had set.
          if (!el.hasAttribute("data-crxmode")) {
            el.setAttribute("data-crxprevmode", el.getAttribute("data-mode") || "");
            el.setAttribute("data-crxmode", "1");
          }
          el.setAttribute("data-mode", mode);
        }
      } else if (el.hasAttribute("data-crxmode")) {
        // Restore exactly what was there before we forced a mode.
        const prev = el.getAttribute("data-crxprevmode");
        if (prev) el.setAttribute("data-mode", prev); else el.removeAttribute("data-mode");
        el.removeAttribute("data-crxmode");
        el.removeAttribute("data-crxprevmode");
      }
      if (black) paintBlack(el); else unpaintBlack(el); // paint/clear freshly created elements too
    };
    set(ROOT);
    document.querySelectorAll("[data-mode]").forEach((el) => { if (el !== ROOT) set(el); });
    if (modeObserver) modeObserver.observe(document.documentElement, MODE_OBS_OPTS);
  }
  function captureOriginalMode() {
    if (originalMode !== undefined) return;
    let m = ROOT.getAttribute("data-mode");
    if (!m) { const p = document.querySelector("[data-mode]"); m = p ? p.getAttribute("data-mode") : null; }
    originalMode = m; // the real global value (dark/light) or null if it was nowhere
  }
  function revertMode() {
    if (originalMode === undefined) return;
    // Route through the clearing branch: it restores each element's OWN saved
    // data-crxprevmode and strips our markers. Passing the global originalMode would
    // overwrite data-mode but leave the markers behind, corrupting later
    // capture/revert bookkeeping. (originalMode is only a "was forced" flag.)
    forceMode(null);
    originalMode = undefined;
  }
  let modePending = false;
  function scheduleForce() {
    if (modePending) return;
    modePending = true;
    (window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); })(function () {
      modePending = false;
      if (aborted) return;
      if (active() && settings.claudeTheme && settings.claudeTheme !== "auto") forceMode(modeFor());
    });
  }
  function addedHasDataMode(m) {
    for (const n of m.addedNodes) {
      if (n.nodeType === 1 && ((n.matches && n.matches("[data-mode]")) || (n.querySelector && n.querySelector("[data-mode]")))) return true;
    }
    return false;
  }
  function startModeObserver() {
    if (modeObserver) return;
    modeObserver = new MutationObserver((muts) => {
      if (aborted) return;
      if (!contextValid()) { selfShutdown(true); return; }
      if (!settings.claudeTheme || settings.claudeTheme === "auto") return;
      for (const m of muts) {
        // react only to data-mode changes or added nodes carrying data-mode (skip the text stream)
        if (m.type === "attributes" || addedHasDataMode(m)) { scheduleForce(); break; }
      }
    });
    modeObserver.observe(document.documentElement, MODE_OBS_OPTS);
  }
  function stopModeObserver() {
    if (modeObserver) { modeObserver.disconnect(); modeObserver = null; }
    modePending = false;
  }
  function applyClaudeTheme() {
    const on = active(); // only when the whole extension is on (enabled and the site is active)
    const ct = settings.claudeTheme;
    if (on && ct && ct !== "auto") {
      captureOriginalMode();
      forceMode(modeFor()); // "black" -> dark base + black overrides
      startModeObserver();
    } else {
      stopModeObserver();
      revertMode(); // if turned off or "auto", restore Claude's original mode
    }
    if (on && ct === "black") applyClaudeBlack();
    else removeClaudeBlack();
    if (on) applyClaudeAccent();
    else removeClaudeAccent();
  }

  /* ---------- apply direction to blocks ---------- */
  function dirValue() {
    return settings.rtlMode === "auto" ? "auto" : settings.rtlMode;
  }
  function inScope(el) {
    if (el.closest(SEL_SKIP)) return false;
    if (settings.scope.assistant && el.closest(SEL_ASST)) return true;
    if (settings.scope.user && el.closest(SEL_USER)) return true;
    if (settings.scope.input && el.closest(SEL_INPUT)) return true;
    return false;
  }
  function applyDir(el) {
    const d = dirValue();
    if (el.getAttribute("dir") !== d) {
      el.setAttribute("dir", d);
      el.setAttribute("data-crxdir", "1");
    }
  }
  function clearDir(el) {
    if (el.hasAttribute("data-crxdir")) {
      el.removeAttribute("dir");
      el.removeAttribute("data-crxdir");
    }
  }
  function setContainerDir(node) {
    const d = dirValue();
    const groups = [
      [SEL_ASST, settings.scope.assistant],
      [SEL_USER, settings.scope.user],
      [SEL_INPUT, settings.scope.input]
    ];
    groups.forEach(function (g) {
      const sel = g[0], on = g[1];
      const containers = [];
      if (node.matches && node.matches(sel)) containers.push(node);
      if (node.querySelectorAll) node.querySelectorAll(sel).forEach((c) => containers.push(c));
      containers.forEach((c) => {
        if (on) {
          if (c.getAttribute("dir") !== d) { c.setAttribute("dir", d); c.setAttribute("data-crxdir", "1"); }
        } else {
          clearDir(c); // scope turned off -> revert the direction
        }
      });
    });
  }

  // Align the user message bubble based on its content direction:
  // LTR content (English) -> bubble left; RTL content (Persian/Arabic) -> bubble right (Claude default).
  function alignUserBubble(userEl) {
    const col = userEl.closest(".flex.flex-col.items-end");
    if (!col) return;
    // Only mirror the bubble in "auto" mode. Under a forced rtl/ltr the computed
    // direction is the forced one, not the content's, so leave Claude's default.
    if (!settings.scope.user || settings.rtlMode !== "auto") {
      if (col.hasAttribute("data-crxalign")) { col.style.removeProperty("align-items"); col.removeAttribute("data-crxalign"); }
      return;
    }
    const textEl = userEl.querySelector("p") || userEl;
    const dir = getComputedStyle(textEl).direction;
    if (dir === "ltr") {
      col.style.alignItems = "flex-start"; // left
      col.setAttribute("data-crxalign", "1");
    } else if (col.hasAttribute("data-crxalign")) {
      col.style.removeProperty("align-items"); // back to Claude's default (right)
      col.removeAttribute("data-crxalign");
    }
  }

  /* ---------- Persian digits ---------- */
  // Per-language numeral sets (Persian, Arabic, Urdu, Hindi, Bengali, Thai, …).
  const DIGIT_SETS = window.CRX_DIGITS || {};
  // Reverse map: every supported Eastern digit -> Latin, so restore stays clean
  // no matter which language's digits were applied.
  const EAST_TO_LATIN = {};
  Object.keys(DIGIT_SETS).forEach((k) => DIGIT_SETS[k].split("").forEach((ch, i) => { EAST_TO_LATIN[ch] = String(i); }));
  const EAST_CHARS = Object.keys(EAST_TO_LATIN).join("");
  const EAST_RE = EAST_CHARS ? new RegExp("[" + EAST_CHARS + "]", "g") : null;
  const digitOriginals = new WeakMap();
  const touchedDigitNodes = new Set();
  function activeDigits() { const s = DIGIT_SETS[settings.uiLang]; return s ? s.split("") : null; }
  function toLocal(str) { const a = activeDigits(); return a ? str.replace(/[0-9]/g, (d) => a[+d]) : str; }
  function toLatin(str) { return EAST_RE ? str.replace(EAST_RE, (ch) => EAST_TO_LATIN[ch]) : str; }
  function hasEastern(str) { return EAST_CHARS ? new RegExp("[" + EAST_CHARS + "]").test(str) : false; }
  function convertDigits(blockEl, allowAnchor) {
    if (!activeDigits()) return; // current UI language uses standard Western digits
    // Never rewrite numerals inside the live editor: converting a typed Western
    // digit would send Eastern digits to Claude and desync ProseMirror's model
    // (caret jumps, dropped chars). Direction is applied separately.
    if (blockEl.closest && blockEl.closest('[contenteditable="true"], [contenteditable=""], .ProseMirror')) return;
    // By default skip links so digits inside inline URLs/refs are left alone.
    // The sidebar chat list is itself an <a>, so it passes allowAnchor=true.
    const skipSel = allowAnchor ? SEL_SKIP : SEL_SKIP + ",a";
    // Preserve the user's text selection across the in-place rewrite (e.g. a response
    // re-localized on a UI-language switch). Each Latin digit maps to one Eastern
    // digit, so offsets stay valid; the live composer already bailed out above.
    const sel = window.getSelection ? window.getSelection() : null;
    let savedSel = null;
    if (sel && sel.rangeCount && sel.anchorNode && blockEl.contains(sel.anchorNode)) {
      savedSel = { a: sel.anchorNode, ao: sel.anchorOffset, f: sel.focusNode, fo: sel.focusOffset };
    }
    const walker = document.createTreeWalker(blockEl, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue) return NodeFilter.FILTER_REJECT;
        // Adopt a node only if it is provably ours: it has Latin digits AND no
        // genuine Eastern digits (a mixed node, e.g. Arabic content Claude rendered,
        // would lose Claude's own glyphs on restore), or we already converted it (so
        // a UI-language switch can re-localize it).
        if (!touchedDigitNodes.has(n) && (!/[0-9]/.test(n.nodeValue) || hasEastern(n.nodeValue))) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        if (p && p.closest(skipSel)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while ((n = walker.nextNode())) {
      // Cache a pristine Latin baseline (even for a partly-converted node — mixed
      // Eastern/Western digits while typing) so restore never writes mixed text.
      const latin = toLatin(n.nodeValue);
      digitOriginals.set(n, latin);
      const loc = toLocal(latin);
      if (loc !== n.nodeValue) {
        n.nodeValue = loc;
        touchedDigitNodes.add(n);
      }
    }
    if (savedSel && savedSel.a.isConnected) {
      try { sel.setBaseAndExtent(savedSel.a, savedSel.ao, savedSel.f || savedSel.a, savedSel.fo); } catch (e) {}
    }
  }
  function restoreDigits() {
    touchedDigitNodes.forEach((n) => {
      if (!n.isConnected) return; // detached node — leave it alone
      const orig = digitOriginals.get(n);
      // Only restore while our conversion is still in place (text still has Eastern
      // digits); if React replaced the text, don't clobber it.
      if (orig != null && n.nodeValue !== orig && hasEastern(n.nodeValue)) n.nodeValue = orig;
    });
    touchedDigitNodes.clear();
  }
  // Revert only the digits we converted inside one element (used when a scope is
  // turned off so that subtree stops showing Persian digits).
  function restoreDigitsIn(el) {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = w.nextNode())) {
      if (!touchedDigitNodes.has(n)) continue;
      const orig = digitOriginals.get(n);
      if (orig != null && hasEastern(n.nodeValue)) n.nodeValue = orig;
      touchedDigitNodes.delete(n);
    }
  }

  /* ---------- process a subtree ---------- */
  function processSubtree(node) {
    if (!node || node.nodeType !== 1) return;
    setContainerDir(node);
    const list = [];
    if (node.matches && node.matches(TEXT_SEL)) list.push(node);
    if (node.querySelectorAll) node.querySelectorAll(TEXT_SEL).forEach((e) => list.push(e));
    for (const el of list) {
      if (inScope(el)) {
        applyDir(el);
        if (settings.persianDigits) convertDigits(el);
      } else {
        clearDir(el); // out of scope -> revert the direction
        if (touchedDigitNodes.size) restoreDigitsIn(el); // and revert any digits we converted here
      }
    }
    // user bubble alignment (the function checks scope.user itself and reverts when off)
    const ums = [];
    if (node.matches && node.matches('[data-testid="user-message"]')) ums.push(node);
    if (node.querySelectorAll) node.querySelectorAll('[data-testid="user-message"]').forEach((e) => ums.push(e));
    ums.forEach(alignUserBubble);
    // chat list in the sidebar
    const links = [];
    if (node.matches && node.matches(SEL_CHATLIST)) links.push(node);
    if (node.querySelectorAll) node.querySelectorAll(SEL_CHATLIST).forEach((e) => links.push(e));
    for (const a of links) {
      if (settings.scope.chatList) {
        applyDir(a);
        // The chat title lives inside the <a>, so allow anchors here.
        if (settings.persianDigits) convertDigits(a, true);
      } else {
        clearDir(a);
        if (touchedDigitNodes.size) restoreDigitsIn(a); // revert any digits we converted in this chat item
      }
    }
  }

  /* ---------- processing scheduler ---------- */
  const pending = new Set();
  let scheduled = false;
  const idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 16); };
  function schedule(node) {
    pending.add(node);
    if (!scheduled) {
      scheduled = true;
      idle(flush);
    }
  }
  function flush() {
    scheduled = false;
    const nodes = Array.from(pending);
    pending.clear();
    if (aborted) return;
    if (!contextValid()) { selfShutdown(true); return; }
    if (!active()) return;
    for (const n of nodes) {
      if (n === ROOT || (n.isConnected !== false)) processSubtree(n);
    }
    // Keep the digit-tracking Set from growing unbounded during long sessions.
    if (touchedDigitNodes.size > 400) touchedDigitNodes.forEach((n) => { if (!n.isConnected) touchedDigitNodes.delete(n); });
  }

  function startObserver() {
    if (observer) return;
    observer = new MutationObserver((muts) => {
      if (aborted) return;
      if (!contextValid()) { selfShutdown(true); return; }
      if (!active()) return;
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) schedule(n);
        });
        if (m.type === "characterData" && settings.persianDigits && /[0-9]/.test(m.target.nodeValue || "")) {
          const p = m.target.parentElement; // the /[0-9]/ test above ignores our own Eastern-only writes
          if (p) schedule(p);
        }
      }
    });
    observer.observe(ROOT, { childList: true, subtree: true, characterData: true });
  }

  /* ---------- teardown ---------- */
  function teardown() {
    const cl = ROOT.classList;
    ["crx-active", "crx-asst", "crx-user", "crx-input", "crx-chatlist", "crx-font", "crx-headfont", "crx-weight", "crx-codefont", "crx-codeweight", "crx-codebg", "crx-codeltr", "crx-mathltr", "crx-rw"].forEach((c) => cl.remove(c));
    document.querySelectorAll("[data-crxdir]").forEach((el) => {
      el.removeAttribute("dir");
      el.removeAttribute("data-crxdir");
    });
    document.querySelectorAll("[data-crxalign]").forEach((el) => {
      el.style.removeProperty("align-items");
      el.removeAttribute("data-crxalign");
    });
    restoreDigits();
    document.querySelectorAll("[data-crxblack]").forEach(unpaintBlack);
    setBlackCss(false); // remove the injected <style id="crx-black-css"> (not a <link>)
    removeClaudeAccent(); // strips inline accent vars AND the <style id="crx-accent-css">
    // restore any data-mode we forced, then drop our ownership markers
    document.querySelectorAll("[data-crxmode]").forEach((el) => {
      const prev = el.getAttribute("data-crxprevmode");
      if (prev) el.setAttribute("data-mode", prev); else el.removeAttribute("data-mode");
      el.removeAttribute("data-crxmode");
      el.removeAttribute("data-crxprevmode");
    });
    originalMode = undefined;
    document.querySelectorAll('link[data-crx="1"]').forEach((l) => l.remove());
    const css = document.getElementById("crx-custom-css");
    if (css) css.remove();
    // remove the injected CSS variables
    ["--crx-font", "--crx-headfont", "--crx-codefont", "--crx-size", "--crx-lh", "--crx-ls", "--crx-ws", "--crx-pspace", "--crx-align", "--crx-weight", "--crx-codeweight", "--crx-codebg", "--crx-width"].forEach((v) => ROOT.style.removeProperty(v));
  }

  /* ---------- full apply ---------- */
  function apply() {
    try { applyClaudeTheme(); } catch (e) {} // the Claude theme must never block RTL
    if (!active()) {
      teardown();
      return;
    }
    setVars();
    setClasses();
    setCustomCss();
    loadFonts();
    // Restore digits when conversion is off OR the current language has no numerals
    // of its own (so stale Eastern digits don't linger after a language switch).
    if (!settings.persianDigits || !DIGIT_SETS[settings.uiLang]) restoreDigits();
    schedule(ROOT);
  }

  /* ---------- startup ---------- */
  let lastJson = "";
  loadSettings().then((s) => {
    if (aborted) return;
    settings = s;
    lastJson = JSON.stringify(settings);
    apply();
    startObserver();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (aborted) return;
    if (area === "local" && changes[KEY]) {
      settings = window.CRX_merge(changes[KEY].newValue);
      lastJson = JSON.stringify(settings);
      apply();
    }
  });

  /* Re-sync on tab visibility/focus so settings still apply if a storage event was
     missed. Re-applies only when the settings actually changed; safe on an
     invalidated context. */
  function resync() {
    if (aborted) return;
    try {
      if (!chrome.runtime || !chrome.runtime.id) return; // content script context invalidated
      chrome.storage.local.get(KEY, (o) => {
        if (chrome.runtime.lastError) return;
        const merged = window.CRX_merge(o && o[KEY]);
        const j = JSON.stringify(merged);
        if (j === lastJson) return; // no change — do nothing
        lastJson = j;
        settings = merged;
        apply();
      });
    } catch (e) {}
  }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) resync();
  });
  window.addEventListener("focus", resync);
})();
