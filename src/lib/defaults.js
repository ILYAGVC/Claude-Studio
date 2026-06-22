/* ===================================================================
 *  Claude RTL — default values, settings schema, and merge/validation.
 *  Loaded globally in both the content script and the popup.
 * =================================================================== */
(function () {
  "use strict";

  // UI languages we ship (keep in sync with i18n.js LANGS).
  const UI_LANGS = ["fa", "ar", "he", "ur", "en", "es", "fr", "de", "pt", "ru", "hi", "id", "tr", "ja", "zh", "ko", "it", "nl", "pl", "uk", "vi", "th", "el", "bn", "ps"];
  // Pick the UI language closest to the browser/Chrome locale; fall back to English.
  function detectUiLang() {
    try {
      const cands = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
      for (const raw of cands) {
        const l = String(raw || "").toLowerCase();
        if (l.indexOf("zh") === 0) return UI_LANGS.indexOf("zh") !== -1 ? "zh" : "en";
        const primary = l.split("-")[0];
        if (UI_LANGS.indexOf(primary) !== -1) return primary;
      }
    } catch (e) {}
    return "en";
  }
  // UI language -> best-fit body font. Single source of truth shared with the
  // popup so the first-run default and the language picker stay in sync.
  const LANG_FONT = {
    fa: "Vazirmatn", ar: "Cairo", he: "Rubik", ur: "NotoNastaliqUrdu", en: "Inter",
    es: "Inter", fr: "Inter", de: "Inter", pt: "Inter", it: "Inter", nl: "Inter",
    pl: "Inter", vi: "Inter", id: "Inter", tr: "Inter", el: "Inter",
    ru: "PTSans", uk: "PTSans", hi: "NotoSansDevanagari", ja: "NotoSansJP",
    zh: "NotoSansSC", ko: "NotoSansKR", th: "NotoSansThai", bn: "NotoSansBengali", ps: "NotoNaskh"
  };
  // UI language -> code/monospace font. Arabic-script languages get Vazirmatn so
  // Persian/Arabic inside code renders; everyone else gets JetBrains Mono (covers
  // Latin/Cyrillic/Greek; other scripts fall back fine since code is mostly Latin).
  const LANG_CODE_FONT = {
    fa: "Vazirmatn", ar: "Vazirmatn", ur: "Vazirmatn", ps: "Vazirmatn",
    he: "JetBrainsMono", en: "JetBrainsMono", es: "JetBrainsMono", fr: "JetBrainsMono",
    de: "JetBrainsMono", pt: "JetBrainsMono", it: "JetBrainsMono", nl: "JetBrainsMono",
    pl: "JetBrainsMono", vi: "JetBrainsMono", id: "JetBrainsMono", tr: "JetBrainsMono",
    el: "JetBrainsMono", ru: "JetBrainsMono", uk: "JetBrainsMono", hi: "JetBrainsMono",
    ja: "JetBrainsMono", zh: "JetBrainsMono", ko: "JetBrainsMono", th: "JetBrainsMono",
    bn: "JetBrainsMono"
  };
  function fontForLang(l) { return LANG_FONT[l] || "Vazirmatn"; }
  // Languages with their own numeral glyphs (0-9 -> these). Unlisted languages use
  // Western digits, so the digit-conversion option is locked for them.
  const DIGIT_LANGS = {
    fa: "۰۱۲۳۴۵۶۷۸۹", ar: "٠١٢٣٤٥٦٧٨٩", ur: "۰۱۲۳۴۵۶۷۸۹", ps: "۰۱۲۳۴۵۶۷۸۹",
    hi: "०१२३४५६७८९", bn: "০১২৩৪৫৬৭৮৯", th: "๐๑๒๓๔๕๖๗๘๙"
  };

  const DEFAULTS = {
    version: 3,

    /* --- General --- */
    enabled: true,
    sites: { "claude.ai": true, "claude.com": true },
    rtlMode: "auto", // auto | rtl | ltr
    scope: {
      assistant: true, // Claude's responses
      user: true,      // your messages
      input: true,     // the composer box
      chatList: true   // the chat list in the sidebar
    },

    /* --- Font --- */
    font: fontForLang(detectUiLang()), // default body font follows the detected UI language
    headingFont: "inherit", // inherit = same as body text, or a font id
    codeFont: "default",    // id from CRX_FONTS.mono
    fontWeight: "default",  // default | 100..900 (applied via font-variation-settings)
    codeFontWeight: "default", // code/monospace weight: default | 100..900
    codeBg: "default",      // code-block background: "default" (Claude's own) or a hex colour

    /* --- Typography --- */
    fontSizePx: 16,        // 12..30
    lineHeight: 1.9,       // 1.2..2.8
    letterSpacing: 0,      // -1..3 (px)
    wordSpacing: 0,        // 0..10 (px)
    paragraphSpacing: 0.2, // 0..1.5 (em)
    align: "start",        // start (follows direction) | right | justify | left
    readingWidthEnabled: false,
    readingWidth: 820,     // 560..1200 (px)
    persianDigits: false,  // convert Latin digits to Persian in text

    /* --- Claude's own theme --- */
    claudeTheme: "auto", // auto (leave untouched) | light | dark | black
    claudeAccent: "",     // empty = no change, or a hex color to override Claude's accent color

    /* --- Advanced --- */
    keepMathLtr: true,
    keepCodeLtr: true,
    customCss: "",
    presets: {}, // name -> snapshot

    /* --- Settings panel appearance --- */
    uiLang: detectUiLang(), // interface language; first run follows the Chrome/browser locale
    theme: "system", // system | light | dark | black
    accent: "#D97757",
    previewHeight: 200,    // live preview height (px) — adjustable with the mouse
    previewCollapsed: true // preview is collapsed by default
  };

  // Strip prototype-pollution keys from untrusted input (imported settings/presets)
  // before merging.
  function sanitize(o) {
    if (!o || typeof o !== "object") return o;
    if (Array.isArray(o)) return o.map(sanitize);
    const clean = {};
    for (const k of Object.keys(o)) {
      if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
      clean[k] = sanitize(o[k]);
    }
    return clean;
  }

  /** Merge saved settings over the defaults (one level deep), then validate. */
  function merge(saved) {
    const out = JSON.parse(JSON.stringify(DEFAULTS));
    saved = sanitize(saved);
    if (saved && typeof saved === "object") {
      for (const k in saved) {
        if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
        // Whitelist against DEFAULTS: drop unknown keys (removed features, typos,
        // foreign keys) so legacy values never linger in storage or an export.
        if (!Object.prototype.hasOwnProperty.call(DEFAULTS, k)) continue;
        const v = saved[k];
        const outIsObj = out[k] && typeof out[k] === "object" && !Array.isArray(out[k]);
        const vIsObj = v && typeof v === "object" && !Array.isArray(v);
        if (outIsObj && vIsObj) {
          Object.assign(out[k], v);
        } else if (outIsObj && !vIsObj) {
          // Never overwrite an object default with a non-object (null/string/broken
          // array) — keeps scope/sites/presets intact and the code crash-free.
        } else if (v !== undefined) {
          out[k] = v;
        }
      }
    }
    // --- Migrations ---
    const sv = (saved && saved.version) || 1;
    if (sv < 2) {
      // v1 defaulted align to "right", which broke LTR/auto; migrate to "start"
      // (follows direction) so it works in all of LTR/RTL/auto.
      if (!saved || saved.align === "right" || saved.align == null) out.align = "start";
    }
    if (sv < 3) {
      // v3: the jsDelivr-hosted Persian fonts (Vazir, Sahel, Samim, Shabnam, Gandom,
      // Tanha) were dropped in favor of Google Fonts (no more CSP workaround). Remap a
      // stored selection of any removed font to Vazirmatn, the modern Google
      // equivalent. Parastoo survived (now served from Google), so it is left as-is.
      const GONE = { Vazir: 1, Sahel: 1, Samim: 1, Shabnam: 1, Gandom: 1, Tanha: 1 };
      if (GONE[out.font]) out.font = "Vazirmatn";
      if (GONE[out.headingFont]) out.headingFont = "Vazirmatn";
    }
    // --- Clamp/validate so imported or corrupted values never reach the page out of range ---
    const num = (v, min, max, def) => {
      if (v === null || v === "" || typeof v === "boolean" || Array.isArray(v)) return def;
      v = Number(v); return isFinite(v) ? Math.min(max, Math.max(min, v)) : def;
    };
    out.fontSizePx = num(out.fontSizePx, 12, 30, DEFAULTS.fontSizePx);
    out.lineHeight = num(out.lineHeight, 1.2, 2.8, DEFAULTS.lineHeight);
    out.letterSpacing = num(out.letterSpacing, -1, 3, DEFAULTS.letterSpacing);
    out.wordSpacing = num(out.wordSpacing, 0, 10, DEFAULTS.wordSpacing);
    out.paragraphSpacing = num(out.paragraphSpacing, 0, 1.5, DEFAULTS.paragraphSpacing);
    out.readingWidth = num(out.readingWidth, 560, 1200, DEFAULTS.readingWidth);
    out.previewHeight = num(out.previewHeight, 90, 420, DEFAULTS.previewHeight);
    const oneOf = (v, arr, def) => (arr.indexOf(v) !== -1 ? v : def);
    out.rtlMode = oneOf(out.rtlMode, ["auto", "rtl", "ltr"], DEFAULTS.rtlMode);
    out.align = oneOf(out.align, ["start", "right", "center", "left", "justify"], DEFAULTS.align);
    out.claudeTheme = oneOf(out.claudeTheme, ["auto", "light", "dark", "black"], DEFAULTS.claudeTheme);
    out.theme = oneOf(out.theme, ["system", "light", "dark", "black"], DEFAULTS.theme);
    // Accent colors are free-text hex (from import/preset) — validate here.
    out.claudeAccent = /^#[0-9a-fA-F]{6}$/.test(out.claudeAccent) ? out.claudeAccent : "";
    out.accent = /^#[0-9a-fA-F]{6}$/.test(out.accent) ? out.accent : DEFAULTS.accent;
    out.codeBg = (out.codeBg === "default" || /^#[0-9a-fA-F]{6}$/.test(out.codeBg)) ? out.codeBg : "default";
    ["fontWeight", "codeFontWeight"].forEach(function (k) {
      if (out[k] !== "default") {
        const w = parseInt(out[k], 10);
        out[k] = w >= 100 && w <= 900 && w % 100 === 0 ? String(w) : "default";
      }
    });
    // Free-text fields may arrive from an imported file: cap length and neutralize
    // remote-resource vectors in custom CSS (@import and url() to non-font origins)
    // so an imported "theme" cannot pull arbitrary resources into the Claude page.
    if (typeof out.customCss !== "string") out.customCss = "";
    else out.customCss = out.customCss.slice(0, 20000)
      .replace(/@import\b[^;{}\n]*;?/gi, "")
      .replace(/url\((['"]?)([^)'"]*)\1\)/gi, function (m, q, u) {
        return /^(data:|https:\/\/(fonts\.gstatic\.com|fonts\.googleapis\.com)\/)/i.test(String(u).trim()) ? m : "none";
      })
      // Catch-all: a url()-only filter misses image-set(), bare src, etc., so
      // host-whitelist every remaining absolute URL and blank out off-CDN ones.
      .replace(/(?:https?:)?\/\/[^\s'")]+/gi, function (u) {
        return /^https:\/\/(fonts\.gstatic\.com|fonts\.googleapis\.com)\//i.test(u) ? u : "about:blank";
      });
    // Coerce nested scope/sites flags to real booleans: a stray "no"/"0" reads as
    // truthy under "!== false" and would silently flip a disabled toggle back on.
    ["scope", "sites"].forEach(function (key) {
      const o = out[key], d = DEFAULTS[key];
      if (o && typeof o === "object") for (const kk in o) {
        if (!Object.prototype.hasOwnProperty.call(d, kk)) { delete o[kk]; continue; } // drop legacy nested flags
        o[kk] = o[kk] === true || o[kk] === "true";
      }
    });
    // Drop preset entries whose value isn't a plain object (corrupt/hostile import),
    // and prune each surviving snapshot to known keys so stale/legacy values don't
    // linger inside saved presets (a preset snapshot also never nests its own presets).
    if (out.presets && typeof out.presets === "object") {
      for (const pk in out.presets) {
        const p = out.presets[pk];
        if (!p || typeof p !== "object" || Array.isArray(p)) { delete out.presets[pk]; continue; }
        for (const sk in p) {
          if (sk === "presets" || !Object.prototype.hasOwnProperty.call(DEFAULTS, sk)) delete p[sk];
        }
      }
    }
    if (UI_LANGS.indexOf(out.uiLang) === -1) out.uiLang = detectUiLang();

    out.version = DEFAULTS.version;
    return out;
  }

  window.CRX_DEFAULTS = DEFAULTS;
  window.CRX_KEY = "crx_settings";
  window.CRX_merge = merge;
  window.CRX_LANG_FONT = LANG_FONT;
  window.CRX_LANG_CODE_FONT = LANG_CODE_FONT;
  window.CRX_DIGITS = DIGIT_LANGS;
})();
