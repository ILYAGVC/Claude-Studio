/* ===================================================================
 *  Claude RTL — settings panel logic
 *  The "language" selector translates the entire UI, automatically picks the font suited to that language, and updates the preview.
 * =================================================================== */
(function () {
  "use strict";

  const KEY = window.CRX_KEY;
  const FONTS = window.CRX_FONTS;
  const I18N = window.CRX_I18N;
  let S = window.CRX_merge(null);
  let tt = I18N.dict("fa"); // UI dictionary — updated when the language changes
  const t = (k) => (tt && tt[k] != null ? tt[k] : k);

  const $ = (id) => document.getElementById(id);
  const DIGITS = window.CRX_DIGITS || {};
  // Convert to the current UI language's numerals (or leave Western if none).
  const toLocalDigits = (s, lang) => {
    const set = DIGITS[lang];
    return set ? String(s).replace(/[0-9]/g, (d) => set[+d]) : String(s);
  };
  // UI language -> font group surfaced on top of the picker.
  const LANG_GROUP = {
    fa: "فارسی", ar: "العربية", he: "עברית", ur: "اردو", en: "English",
    es: "English", fr: "English", de: "English", pt: "English", it: "English",
    nl: "English", pl: "English", vi: "English", id: "English", tr: "English", el: "English",
    ru: "Кириллица", uk: "Кириллица", hi: "हिन्दी", ja: "日本語", zh: "中文",
    ko: "한국어", th: "ไทย", bn: "বাংলা", ps: "العربية"
  };
  // UI language -> default font auto-selected when that language is picked.
  // Single source of truth lives in defaults.js so the default and the picker stay in sync.
  const LANG_FONT = window.CRX_LANG_FONT;
  const LANG_CODE_FONT = window.CRX_LANG_CODE_FONT || {};
  // Searchable aliases for each font group (own script + Latin name).
  const GROUP_ALIAS = {
    "فارسی": "فارسی پارسی farsi persian",
    "العربية": "العربية عربی arabic pashto پښتو",
    "עברית": "עברית عبری hebrew",
    "اردو": "اردو urdu",
    "English": "english latin انگلیسی لاتین español français deutsch português italiano nederlands polski türkçe ελληνικά",
    "Кириллица": "cyrillic кириллица russian ukrainian русский українська روسی",
    "हिन्दी": "devanagari hindi हिंदी देवनागरी",
    "日本語": "japanese japan nihongo 日本語",
    "中文": "chinese china zhongwen 中文 汉语",
    "한국어": "korean korea hangul 한국어",
    "ไทย": "thai thailand ไทย",
    "বাংলা": "bengali bangla বাংলা"
  };
  const ACCENTS = ["#D97757", "#6C5CE7", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6"];
  // Code-box background presets (all dark, so Claude's light syntax colours stay readable).
  // Index 0 is the "default" swatch (no override → Claude's own / auto-dark behaviour).
  const CODE_BGS = ["#2c2b28", "#000000", "#0d1117", "#1e1e1e", "#282c34", "#1a1b26", "#0f1c2e"];
  // Localized labels kept here (not in i18n.js) so that file stays untouched.
  const CODE_WEIGHT_TXT = {
    fa: "ضخامت فونت کد", ar: "سماكة خط الشيفرة", he: "עובי גופן הקוד", ur: "کوڈ فونٹ کی موٹائی",
    en: "Code font weight", es: "Grosor de la fuente de código", fr: "Graisse de la police de code", de: "Schriftstärke des Codes",
    pt: "Peso da fonte de código", ru: "Насыщенность шрифта кода", hi: "कोड फ़ॉन्ट का वज़न", id: "Ketebalan font kode",
    tr: "Kod yazı tipi kalınlığı", ja: "コードフォントの太さ", zh: "代码字体粗细", ko: "코드 글꼴 두께",
    it: "Spessore del font del codice", nl: "Dikte van codelettertype", pl: "Grubość czcionki kodu", uk: "Насиченість шрифту коду",
    vi: "Độ đậm phông chữ mã", th: "ความหนาฟอนต์โค้ด", el: "Πάχος γραμματοσειράς κώδικα", bn: "কোড ফন্টের পুরুত্ব",
    ps: "د کوډ فونټ ضخامت"
  };
  const CODE_BG_TXT = {
    fa: "تم باکس کد", ar: "سمة صندوق الشيفرة", he: "ערכת נושא לקוד", ur: "کوڈ باکس تھیم",
    en: "Code box theme", es: "Tema del bloque de código", fr: "Thème du bloc de code", de: "Codeblock-Thema",
    pt: "Tema do bloco de código", ru: "Тема блока кода", hi: "कोड बॉक्स थीम", id: "Tema kotak kode",
    tr: "Kod kutusu teması", ja: "コードブロックのテーマ", zh: "代码框主题", ko: "코드 박스 테마",
    it: "Tema del blocco di codice", nl: "Codeblok-thema", pl: "Motyw bloku kodu", uk: "Тема блоку коду",
    vi: "Chủ đề khối mã", th: "ธีมกล่องโค้ด", el: "Θέμα μπλοκ κώδικα", bn: "কোড বক্স থিম",
    ps: "د کوډ بکس تم"
  };

  /* ---------- storage ---------- */
  function load() {
    return new Promise((res) => chrome.storage.local.get(KEY, (o) => res(window.CRX_merge(o && o[KEY]))));
  }
  let saveTimer = null;
  // Serialized payloads written to storage but whose own onChanged echo hasn't arrived
  // yet. Every set() echoes back through our own onChanged listener; matching against
  // this queue drops our echoes so a delayed one can't revert an in-flight edit (e.g. a
  // weight drag). Holds multiple entries since several debounced writes can be in flight.
  let pendingWrites = [];
  function persist() {
    const json = JSON.stringify(S);
    pendingWrites.push(json);
    if (pendingWrites.length > 24) pendingWrites.shift(); // safety cap if an echo is ever dropped
    chrome.storage.local.set({ [KEY]: S });
  }
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 120);
    updatePreview();
  }

  /* ---------- load font for preview ---------- */
  const loadedFonts = new Set();
  function ensureFont(kind, id) {
    const f = FONTS.get(kind, id);
    const url = FONTS.href(f.load);
    if (!url || loadedFonts.has(url)) return;
    loadedFonts.add(url);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }

  /* ---------- custom dropdown (font/language) with search and grouping ---------- */
  const CHEV =
    '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CHECK =
    '<svg class="opt-check" viewBox="0 0 24 24" width="15" height="15"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // Claude's official sunburst mark (extracted from claude.ai), shown at the
  // bottom of the sample response in the preview, tinted with Claude's accent.
  const CLAUDE_MARK = '<svg viewBox="0 0 100 100" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/></svg>';

  function closeAllCSelect(except) {
    document.querySelectorAll(".cselect.open").forEach((c) => {
      if (c !== except) c.classList.remove("open");
    });
  }

  function buildCSelect(container, list, kind, extraTop, current, onSelect) {
    container.innerHTML = "";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cselect-btn";
    const lab = document.createElement("span");
    lab.className = "cselect-label";
    const chev = document.createElement("span");
    chev.className = "cselect-chev";
    chev.innerHTML = CHEV;
    btn.appendChild(lab);
    btn.appendChild(chev);
    btn.setAttribute("role", "combobox");
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    // Accessible name from the control's visible label.
    const lblWrap = container.closest(".row, .field");
    const lblEl = lblWrap && lblWrap.querySelector(".lbl, label");
    if (lblEl) btn.setAttribute("aria-label", lblEl.textContent.trim());

    const panel = document.createElement("div");
    panel.className = "cselect-panel";
    panel.addEventListener("click", (e) => e.stopPropagation());

    const showSearch = list.length > 12; // search only for long lists (fonts)
    let sInput = null;
    if (showSearch) {
      const searchWrap = document.createElement("div");
      searchWrap.className = "cselect-search";
      sInput = document.createElement("input");
      sInput.type = "text";
      sInput.className = "cselect-search-input";
      sInput.placeholder = t(kind === "lang" ? "l_search" : "f_search");
      searchWrap.appendChild(sInput);
      panel.appendChild(searchWrap);
    }

    const opts = document.createElement("div");
    opts.className = "cselect-options";
    opts.setAttribute("role", "listbox");
    panel.appendChild(opts);

    const items = [];
    if (extraTop) items.push({ id: extraTop.value, label: extraTop.label, special: true });
    list.forEach((f) => items.push(f));

    const optEls = {};
    let lastGroup = "__none__";
    items.forEach((f) => {
      if (f.group && f.group !== lastGroup) {
        const gh = document.createElement("div");
        gh.className = "cselect-group";
        gh.textContent = f.group;
        opts.appendChild(gh);
        lastGroup = f.group;
      }
      const o = document.createElement("button");
      o.type = "button";
      o.className = "cselect-opt";
      o.setAttribute("role", "option");
      o.setAttribute("aria-selected", "false");
      o.dataset.val = f.id;
      o.dataset.group = f.group || "";
      o.dataset.search = ((f.label || "") + " " + (f.group || "") + " " + (GROUP_ALIAS[f.group] || "")).toLowerCase();
      const tx = document.createElement("span");
      tx.className = "opt-label";
      tx.textContent = f.id === "default" ? t("font_default") : f.label;
      if (!f.special && f.stack && f.stack !== "inherit") tx.style.fontFamily = f.stack;
      o.appendChild(tx);
      o.insertAdjacentHTML("beforeend", CHECK);
      o.addEventListener("click", () => choose(f.id));
      opts.appendChild(o);
      optEls[f.id] = o;
    });

    // language filter chips (only for grouped lists = text fonts)
    let activeGroup = "";
    const groupsInList = list.filter((f) => f.group).map((f) => f.group).filter((g, i, a) => a.indexOf(g) === i);
    let chipsWrap = null;
    if (groupsInList.length > 1) {
      chipsWrap = document.createElement("div");
      chipsWrap.className = "cselect-chips";
      const mkChip = (label, val) => {
        const c = document.createElement("button");
        c.type = "button";
        c.className = "cselect-chip";
        c.textContent = label;
        c.dataset.g = val;
        c.addEventListener("click", () => { activeGroup = val; markChips(); applyFilter(); });
        chipsWrap.appendChild(c);
      };
      mkChip(t("all"), "");
      groupsInList.forEach((g) => mkChip(g, g));
      panel.insertBefore(chipsWrap, opts);
    }
    function markChips() {
      if (chipsWrap) chipsWrap.querySelectorAll(".cselect-chip").forEach((c) => c.classList.toggle("is-active", c.dataset.g === activeGroup));
    }
    function applyFilter() {
      const term = (sInput ? sInput.value : "").trim().toLowerCase();
      Object.values(optEls).forEach((o) => {
        const okTerm = !term || o.dataset.search.indexOf(term) !== -1;
        const okGroup = !activeGroup || o.dataset.group === activeGroup;
        o.style.display = okTerm && okGroup ? "" : "none";
      });
      opts.querySelectorAll(".cselect-group").forEach((gh) => {
        let el = gh.nextElementSibling, any = false;
        while (el && !el.classList.contains("cselect-group")) {
          if (el.classList.contains("cselect-opt") && el.style.display !== "none") { any = true; break; }
          el = el.nextElementSibling;
        }
        gh.style.display = any ? "" : "none";
      });
    }
    if (sInput) sInput.addEventListener("input", applyFilter);

    let fontsLoaded = false;
    function loadOptionFonts() {
      if (fontsLoaded || kind === "lang") return;
      fontsLoaded = true;
      list.forEach((f) => {
        if (f.id !== "default") ensureFont(kind, f.id);
      });
    }
    function setValue(val) {
      const f = items.find((x) => x.id === val) || items[0];
      lab.textContent = f.id === "default" ? t("font_default") : f.label;
      lab.style.fontFamily = !f.special && f.stack && f.stack !== "inherit" ? f.stack : "";
      Object.values(optEls).forEach((e) => { e.classList.remove("is-selected"); e.setAttribute("aria-selected", "false"); });
      if (optEls[val]) { optEls[val].classList.add("is-selected"); optEls[val].setAttribute("aria-selected", "true"); }
    }
    function open() {
      closeAllCSelect(container);
      container.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      loadOptionFonts();
      if (sInput) sInput.value = "";
      activeGroup = "";
      markChips();
      applyFilter();
      if (sInput) setTimeout(() => sInput.focus(), 0);
      const sel = opts.querySelector(".is-selected");
      if (sel) {
        // scroll only the options list, not the whole panel
        const sr = sel.getBoundingClientRect(), or = opts.getBoundingClientRect();
        opts.scrollTop += (sr.top - or.top) - (opts.clientHeight - sel.offsetHeight) / 2;
      }
    }
    function close() {
      container.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
    function choose(val) {
      setValue(val);
      close();
      onSelect(val);
    }

    // ---- keyboard navigation (combobox/listbox a11y) ----
    function visibleOpts() { return Object.values(optEls).filter((o) => o.style.display !== "none"); }
    function moveFocus(dir) {
      const vis = visibleOpts();
      if (!vis.length) return;
      let i = vis.indexOf(document.activeElement);
      if (dir === "first") i = 0;
      else if (dir === "last") i = vis.length - 1;
      else if (i < 0) i = 0;
      else i = Math.min(vis.length - 1, Math.max(0, i + (dir === "down" ? 1 : -1)));
      const o = vis[i];
      if (o) { o.focus(); o.scrollIntoView({ block: "nearest" }); }
    }
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!container.classList.contains("open")) open();
        if (sInput) setTimeout(() => sInput.focus(), 0);
        else moveFocus("first");
      }
    });
    panel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); moveFocus("down"); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveFocus("up"); }
      else if (e.key === "Home") { e.preventDefault(); moveFocus("first"); }
      else if (e.key === "End") { e.preventDefault(); moveFocus("last"); }
      else if (e.key === "Escape") { e.preventDefault(); close(); btn.focus(); }
    });

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      container.classList.contains("open") ? close() : open();
    });
    container.appendChild(btn);
    container.appendChild(panel);
    setValue(current);
    return { setValue };
  }

  /* ---------- sort fonts: the selected language's group on top ---------- */
  function orderedTextFonts(lang) {
    const g = LANG_GROUP[lang];
    if (!g) return FONTS.text;
    const def = FONTS.text.filter((f) => !f.group);
    const sel = FONTS.text.filter((f) => f.group === g);
    const rest = FONTS.text.filter((f) => f.group && f.group !== g);
    return def.concat(sel, rest);
  }

  let csFont, csHeading, csCode, csLang;
  // ---- weight sliders adapt to each font's real, shipped weights ----
  // weightLists[id] is the ascending list of weights backing that slider. The range
  // input is index-based: 0 = "default" (Claude's own weight), 1..N = the font's real
  // weights — so it only stops on weights the font ships, and a single-weight font locks
  // the slider instead of faking a range.
  const weightLists = { fontWeight: [], codeFontWeight: [] };
  function fullWeightRange() { const a = []; for (let w = 100; w <= 900; w += 100) a.push(w); return a; }
  function buildWeightTicks(id, n) {
    const wrap = document.querySelector('.slider[data-field="' + id + '"] .slider-ticks');
    if (!wrap) return;
    wrap.innerHTML = "";
    for (let i = 0; i < n; i++) wrap.appendChild(document.createElement("span"));
  }
  // Reflect a stored weight on the slider WITHOUT mutating it: if the weight isn't one
  // of this font's stops, snap the thumb to the nearest stop for display while leaving
  // the stored value alone (so switching back to a font that has it restores it).
  function setWeightSlider(id, weight) {
    const list = weightLists[id];
    const inp = $(id);
    let idx = 0;
    if (weight !== "default" && list.length) {
      const w = parseInt(weight, 10);
      const exact = list.indexOf(w);
      if (exact !== -1) idx = exact + 1;
      else {
        let best = 0, bd = Infinity;
        list.forEach((lw, i) => { const d = Math.abs(lw - w); if (d < bd) { bd = d; best = i; } });
        idx = best + 1;
      }
    }
    if (inp) { inp.value = idx; fillRange(inp); }
    const lbl = $(id + "_v");
    if (lbl) lbl.textContent = idx === 0 ? t("w_default") : String(list[idx - 1]);
  }
  // Configure a weight slider's geometry, ticks, lock state and value for a font.
  function configWeightSlider(id, kind, fontId, weight) {
    const stops = FONTS.weightStops(FONTS.get(kind, fontId));
    const single = !!(stops && stops.length <= 1); // one weight -> nothing to adjust
    const list = single ? [] : (stops || fullWeightRange());
    weightLists[id] = list;
    const inp = $(id);
    const wrap = document.querySelector('.slider[data-field="' + id + '"]');
    if (wrap) wrap.classList.toggle("is-locked", single);
    if (inp) {
      inp.disabled = single;
      inp.min = 0;
      inp.max = single ? 1 : list.length;
      inp.step = 1;
    }
    buildWeightTicks(id, single ? 2 : list.length + 1);
    setWeightSlider(id, single ? "default" : weight);
  }
  function updateWeightLock() {
    configWeightSlider("fontWeight", "text", S.font, S.fontWeight);
    configWeightSlider("codeFontWeight", "mono", S.codeFont, S.codeFontWeight);
  }
  // Index-based input handler for a weight slider (0 = default, else the Nth stop).
  function bindWeightSlider(id, key) {
    $(id).addEventListener("input", (e) => {
      const list = weightLists[id];
      const idx = parseInt(e.target.value, 10) || 0;
      const weight = idx === 0 || !list.length ? "default" : String(list[idx - 1]);
      S[key] = weight;
      fillRange(e.target);
      const lbl = $(id + "_v");
      if (lbl) lbl.textContent = idx === 0 ? t("w_default") : weight;
      save();
    });
  }
  function buildFontPickers() {
    const txt = orderedTextFonts(S.uiLang);
    csFont = buildCSelect($("cs-font"), txt, "text", null, S.font, (v) => {
      S.font = v;
      updateWeightLock();
      save();
    });
    csHeading = buildCSelect($("cs-headingFont"), txt, "text", { value: "inherit", label: t("f_inherit") }, S.headingFont, (v) => {
      S.headingFont = v;
      save();
    });
    csCode = buildCSelect($("cs-codeFont"), FONTS.mono, "mono", null, S.codeFont, (v) => {
      S.codeFont = v;
      updateWeightLock();
      save();
    });
  }
  function buildLangPicker() {
    const items = I18N.LANGS.map((l) => ({ id: l.id, label: l.name }));
    csLang = buildCSelect($("cs-lang"), items, "lang", null, S.uiLang, (v) => {
      // Only auto-swap fonts the user hasn't customised: a value still matching the
      // OUTGOING language's auto-pick (or "default") counts as untouched.
      const prevLang = S.uiLang;
      if (LANG_FONT[v] && (!LANG_FONT[prevLang] || S.font === LANG_FONT[prevLang])) S.font = LANG_FONT[v];
      if (LANG_CODE_FONT[v] && (S.codeFont === "default" || S.codeFont === LANG_CODE_FONT[prevLang])) S.codeFont = LANG_CODE_FONT[v];
      setLang(v);
      save();
    });
  }


  /* ---------- live preview (according to the selected language) ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }
  function renderPreviewContent() {
    const prev = $("prev");
    if (!prev) return;
    const pt = I18N.dict(S.uiLang);
    const g = (k) => (pt[k] != null ? pt[k] : t(k));
    prev.innerHTML =
      '<h4 class="prev-h">' + esc(g("pv_h")) + "</h4>" +
      "<p>" + esc(g("pv_p1")) + ' <code>const x = 42;</code></p>' +
      "<p>" + esc(g("pv_p2")) + ' <span class="prev-digits">1402</span></p>' +
      '<p class="math">' + esc(g("pv_math")) + ' <span class="katex"><span class="kvar">E</span><span class="kop">=</span><span class="kvar">m</span><span class="kvar">c</span><span class="ksup">2</span></span></p>' +
      '<pre><code>' +
        '<span class="tk-kw">function</span> <span class="tk-fn">greet</span><span class="tk-pu">(</span>name<span class="tk-pu">)</span> <span class="tk-pu">{</span>\n' +
        '  <span class="tk-kw">return</span> <span class="tk-st">"Hi "</span> <span class="tk-pu">+</span> name<span class="tk-pu">;</span>\n' +
        '<span class="tk-pu">}</span>' +
      '</code></pre>' +
      '<div class="prev-claude-mark">' + CLAUDE_MARK + "</div>";
  }
  function stackFor(kind, id) {
    const stack = FONTS.get(kind, id).stack;
    // "inherit" = the "Claude Default" option: preview it in a neutral system
    // font (not Vazirmatn), since the real font is whatever Claude itself uses.
    return stack === "inherit" ? "system-ui, 'Segoe UI', Tahoma, Arial, sans-serif" : stack;
  }
  // Shift a hex accent's lightness by dl percentage points — the SAME algorithm
  // the content script uses for inline code (--crx-accent-bright = +14 capped 90 on
  // dark, --crx-accent-dark = -16 floored 28 on light) so the preview matches exactly.
  function accentShade(hex, dl) {
    const m = /^#([0-9a-f]{6})$/i.exec(hex || "");
    if (!m) return "";
    const n = parseInt(m[1], 16);
    let r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    let h = 0, s = 0, l = (mx + mn) / 2;
    if (mx !== mn) {
      const d = mx - mn;
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    let L = Math.round(l * 100) + dl;
    // same symmetric clamp as content.js so the preview stays legible + in parity
    L = dl >= 0 ? Math.min(90, Math.max(58, L)) : Math.max(28, Math.min(50, L));
    return "hsl(" + Math.round(h * 360) + " " + Math.round(s * 100) + "% " + L + "%)";
  }
  function updatePreview() {
    const prev = $("prev");
    if (!prev) return;
    ensureFont("text", S.font);
    if (S.headingFont && S.headingFont !== "inherit") ensureFont("text", S.headingFont);
    if (S.codeFont && S.codeFont !== "default") ensureFont("mono", S.codeFont);

    const st = prev.style;
    st.setProperty("font-family", stackFor("text", S.font));
    st.setProperty("font-size", S.fontSizePx + "px");
    st.setProperty("line-height", String(S.lineHeight));
    st.setProperty("letter-spacing", S.letterSpacing + "px");
    st.setProperty("word-spacing", S.wordSpacing + "px");
    st.setProperty("text-align", S.align);
    // Body weight is applied to paragraphs (and the heading) below, NOT here on the
    // container — mirroring the site (--crx-weight targets p/li + headings, leaving code
    // independent). On the container it would leak into the code block.
    // Direction follows the rtlMode SETTING (like the site), not the UI language;
    // "auto" falls back to the sample text's own (UI-language) direction.
    st.setProperty("direction", S.rtlMode === "auto" ? I18N.dirOf(S.uiLang) : S.rtlMode);

    // Preview mirrors CLAUDE's appearance (its theme + accent), not the settings panel's.
    // [page bg, body text, muted text, code surface] — measured from the live site
    // (light/dark = Claude native, black = the extension's black theme).
    const CT = {
      light: ["#f8f8f6", "#0b0b0b", "#7b7974", "#ecebe6"],
      dark: ["#1f1f1e", "#ffffff", "#97958c", "#2c2b28"],
      black: ["#000000", "#ffffff", "#cdcdcd", "#1c1c1c"]
    };
    let ck;
    if (S.claudeTheme === "black") ck = "black";
    else if (S.claudeTheme === "dark") ck = "dark";
    else if (S.claudeTheme === "light") ck = "light";
    // "auto" = Claude keeps its own theme; mirror the system color scheme.
    else ck = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const cc = CT[ck];
    st.setProperty("background", cc[0]);
    st.setProperty("color", cc[1]);
    const accentSet = /^#[0-9a-fA-F]{6}$/.test(S.claudeAccent);
    // Claude's brand coral (--cds-clay) is #d97757 in every theme — match it exactly for the
    // "no override" default so the preview mark equals the real site.
    st.setProperty("--prev-accent", accentSet ? S.claudeAccent : "#d97757");
    // Inline code: with a custom accent, follow it (theme-aware shade — brighter on
    // dark/black, darker on light). With NO override, use Claude's own inline-code colour
    // (--danger-000): deep red on light, soft red on dark/black — not body-coloured.
    st.setProperty("--prev-code-color", accentSet
      ? accentShade(S.claudeAccent, ck === "light" ? -16 : 14)
      : (ck === "light" ? "hsl(0 58% 35%)" : "hsl(0 77% 81%)"));
    st.setProperty("--prev-code-bg", cc[3]);
    // Code BLOCK: Claude renders blocks dark in EVERY theme (syntax colours are baked
    // light), and the extension pins them dark on-site in light mode too — so the preview
    // matches: a dark surface + Claude's light token palette in every theme.
    st.setProperty("--prev-codeblock-bg", /^#[0-9a-fA-F]{6}$/.test(S.codeBg) ? S.codeBg : (ck === "light" ? "#2c2b28" : cc[3]));
    st.setProperty("--prev-code-base", "#eaecf0");
    st.setProperty("--prev-tk-kw", "#cc7bf4"); // keyword
    st.setProperty("--prev-tk-fn", "#70b8ff"); // function name
    st.setProperty("--prev-tk-st", "#9be963"); // string
    st.setProperty("--prev-tk-pu", "#d3d7de"); // punctuation
    // Inline-code PILL: a translucent tint of the theme's text colour (matches the
    // site's text-200/5 pill) — the accent tints only the text, not the bg.
    st.setProperty("--prev-code-pill", "color-mix(in srgb, " + cc[1] + " 5%, transparent)");
    st.setProperty("--prev-code-line", "color-mix(in srgb, " + cc[1] + " 15%, transparent)");

    // Effective weights: apply a chosen weight only when the font ships more than one
    // (mirrors content.js — a single-weight font's slider is locked, so a leftover weight
    // must not synthesize fake bold).
    const _tf = FONTS.get("text", S.font);
    const _bs = FONTS.weightStops(_tf);
    const effBodyWeight = S.fontWeight !== "default" && !(_bs && _bs.length <= 1) ? FONTS.nearestWeight(_tf, S.fontWeight) : "";
    const _mf = FONTS.get("mono", S.codeFont);
    const _cs = FONTS.weightStops(_mf);
    const effCodeWeight = S.codeFontWeight !== "default" && !(_cs && _cs.length <= 1) ? FONTS.nearestWeight(_mf, S.codeFontWeight) : "";
    prev.querySelectorAll("pre, pre *, code").forEach((el) => {
      el.style.fontFamily = S.codeFont === "default" ? "" : stackFor("mono", S.codeFont);
      el.style.fontWeight = effCodeWeight;
      // the site scopes size/letter/word-spacing to p/li (never pre/code); mirror that so
      // dragging those sliders never stretches the preview's code the way it can't on-site.
      el.style.letterSpacing = "normal";
      el.style.wordSpacing = "normal";
    });
    // "Keep math/code LTR" toggles: gate the preview's forced-LTR like the site
    // (inject.css crx-codeltr / crx-mathltr). When off, code/math follow the preview's
    // own direction instead of being pinned left.
    prev.classList.toggle("prev-codeltr", !!S.keepCodeLtr);
    prev.classList.toggle("prev-mathltr", !!S.keepMathLtr);
    // In "auto" direction mode, code & math auto-detect their own (Latin) direction so they
    // render LTR — like the site (Latin code stays LTR even on an RTL page). In an explicit
    // rtl/ltr mode they inherit the message direction instead.
    const autoDir = S.rtlMode === "auto";
    prev.querySelectorAll("pre, code, .katex").forEach((el) => {
      if (autoDir) el.setAttribute("dir", "auto");
      else el.removeAttribute("dir");
    });

    st.setProperty("max-width", S.readingWidthEnabled ? S.readingWidth + "px" : "");
    st.setProperty("margin-inline", S.readingWidthEnabled ? "auto" : "");

    prev.querySelectorAll("p").forEach((p) => {
      p.style.marginBottom = "calc(0.55em + " + S.paragraphSpacing + "em)";
      // body weight on the body-text paragraphs only (mirrors the site's p/li rule)
      p.style.fontWeight = effBodyWeight;
    });

    const h = prev.querySelector(".prev-h");
    if (h) {
      h.style.fontFamily =
        S.headingFont && S.headingFont !== "inherit"
          ? stackFor("text", S.headingFont)
          : stackFor("text", S.font);
      // headings follow the chosen body weight too (mirrors the site's crx-weight rule);
      // a default weight leaves Claude's own heading boldness untouched.
      h.style.fontWeight = effBodyWeight;
    }

    const dg = prev.querySelector(".prev-digits");
    if (dg) dg.textContent = S.persianDigits && DIGITS[S.uiLang] ? toLocalDigits("1402", S.uiLang) : "1402";
  }

  /* ---------- panel theme + panel accent color ---------- */
  function applyTheme() {
    const r = document.documentElement;
    if (S.theme === "system") r.removeAttribute("data-theme");
    else r.setAttribute("data-theme", S.theme);
    // only apply a valid color so color-mix doesn't break
    const acc = /^#[0-9a-fA-F]{6}$/.test(S.accent) ? S.accent : "#d97757";
    r.style.setProperty("--accent", acc);
    // mirror to localStorage so theme-init.js can apply it synchronously on the
    // next open (before the async chrome.storage read) — kills the theme flash.
    try { localStorage.setItem("crx_theme", S.theme); localStorage.setItem("crx_accent", acc); } catch (e) {}
  }
  function buildAccentSwatches() {
    const wrap = $("accentSwatches");
    if (!wrap) return;
    wrap.innerHTML = "";
    ACCENTS.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "accent-swatch";
      b.style.background = c;
      b.style.color = c;
      b.dataset.color = c;
      b.setAttribute("aria-label", t("accent") + " " + c);
      b.addEventListener("click", () => setAccent(c));
      wrap.appendChild(b);
    });
  }
  function markAccent() {
    const wrap = $("accentSwatches");
    if (wrap) wrap.querySelectorAll(".accent-swatch").forEach((b) => b.classList.toggle("is-active", b.dataset.color.toLowerCase() === String(S.accent).toLowerCase()));
    const inp = $("accent");
    if (inp) {
      const valid = /^#[0-9a-fA-F]{6}$/.test(S.accent) ? S.accent : "#D97757";
      inp.value = valid;
      inp.style.color = valid; // drives the active ring color (currentColor)
      // Highlight the picker like a swatch when the accent is a custom (non-preset) color.
      const isPreset = ACCENTS.some((c) => c.toLowerCase() === String(S.accent).toLowerCase());
      inp.classList.toggle("is-active", !isPreset);
    }
  }
  function setAccent(c) {
    S.accent = c;
    applyTheme();
    markAccent();
    save();
  }

  /* ---------- Claude's own theme (light/dark + color) ---------- */
  function buildClaudeAccentSwatches() {
    const wrap = $("claudeAccentSwatches");
    if (!wrap) return;
    wrap.innerHTML = "";
    ACCENTS.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "accent-swatch";
      b.style.background = c;
      b.style.color = c;
      b.dataset.color = c;
      // coral = Claude's brand color = "no change" (clears the override)
      if (i === 0) b.title = t("no_change");
      b.setAttribute("aria-label", i === 0 ? t("no_change") : t("claude_accent_label") + " " + c);
      b.addEventListener("click", () => setClaudeAccent(i === 0 ? "" : c));
      wrap.appendChild(b);
    });
  }
  function markClaudeAccent() {
    // empty = Claude's brand default (coral); show it as selected
    const cur = (S.claudeAccent || "#D97757").toLowerCase();
    const wrap = $("claudeAccentSwatches");
    if (wrap) wrap.querySelectorAll(".accent-swatch").forEach((b) => b.classList.toggle("is-active", b.dataset.color.toLowerCase() === cur));
    const inp = $("claudeAccent");
    if (inp) {
      const valid = /^#[0-9a-fA-F]{6}$/.test(S.claudeAccent) ? S.claudeAccent : "#D97757";
      inp.value = valid;
      inp.style.color = valid;
      // Active ring when a custom (non-preset, non-"no change") Claude accent is set.
      const isPreset = !S.claudeAccent || ACCENTS.some((c) => c.toLowerCase() === String(S.claudeAccent).toLowerCase());
      inp.classList.toggle("is-active", !isPreset);
    }
  }
  function setClaudeAccent(c) {
    S.claudeAccent = c;
    markClaudeAccent();
    save();
  }
  /* ---------- code-box background (theme) ---------- */
  function buildCodeBgSwatches() {
    const wrap = $("codeBgSwatches");
    if (!wrap) return;
    wrap.innerHTML = "";
    CODE_BGS.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "accent-swatch";
      b.style.background = c;
      b.style.color = c;
      b.dataset.color = c;
      // first swatch = "default" (no override → Claude's own / auto-dark code background)
      if (i === 0) b.title = t("no_change");
      b.setAttribute("aria-label", i === 0 ? t("no_change") : (CODE_BG_TXT[S.uiLang] || CODE_BG_TXT.en) + " " + c);
      b.addEventListener("click", () => setCodeBg(i === 0 ? "default" : c));
      wrap.appendChild(b);
    });
  }
  function markCodeBg() {
    const cur = (S.codeBg === "default" ? CODE_BGS[0] : S.codeBg).toLowerCase();
    const wrap = $("codeBgSwatches");
    if (wrap) wrap.querySelectorAll(".accent-swatch").forEach((b) => b.classList.toggle("is-active", S.codeBg === "default" ? b.dataset.color === CODE_BGS[0] : b.dataset.color.toLowerCase() === cur));
    const inp = $("codeBg");
    if (inp) {
      const valid = /^#[0-9a-fA-F]{6}$/.test(S.codeBg) ? S.codeBg : CODE_BGS[0];
      inp.value = valid;
      inp.style.color = valid;
      const isPreset = S.codeBg === "default" || CODE_BGS.some((c) => c.toLowerCase() === String(S.codeBg).toLowerCase());
      inp.classList.toggle("is-active", !isPreset);
    }
  }
  function setCodeBg(c) {
    S.codeBg = c;
    markCodeBg();
    save();
  }

  /* ---------- preview/font language ---------- */
  function setLang(lang) {
    S.uiLang = lang;
    tt = I18N.dict(lang);
    I18N.apply(lang);     // full UI translation + panel direction
    buildLangPicker();    // re-localize the language picker's own search placeholder
    buildFontPickers();   // sort fonts by language
    buildAccentSwatches();       // re-localize the panel accent swatches' aria-label
    buildClaudeAccentSwatches(); // to translate the "no change" tooltip
    buildCodeBgSwatches();
    buildShortcuts();     // translate shortcut names
    renderPreviewContent();
    render();             // apply values and translated text to the controls
  }

  /* ---------- shortcuts ---------- */
  function buildShortcuts() {
    const list = $("shortcutList");
    if (!list) return;
    const labels = { "toggle-rtl": t("sc_toggle"), _execute_action: t("sc_open") };
    try {
      chrome.commands.getAll((cmds) => {
        list.innerHTML = "";
        if (!cmds || !cmds.length) {
          list.innerHTML = '<div class="shortcut-empty">' + t("sc_notset") + "</div>";
          return;
        }
        cmds.forEach((c) => {
          const row = document.createElement("div");
          row.className = "shortcut-row";
          const name = document.createElement("span");
          name.className = "shortcut-name";
          name.textContent = labels[c.name] || c.description || c.name;
          const keys = document.createElement("span");
          keys.className = "shortcut-keys";
          if (c.shortcut) {
            c.shortcut.split("+").forEach((k) => {
              const kb = document.createElement("kbd");
              kb.textContent = k.trim();
              keys.appendChild(kb);
            });
          } else {
            const n = document.createElement("span");
            n.className = "shortcut-none";
            n.textContent = t("sc_notset");
            keys.appendChild(n);
          }
          row.appendChild(name);
          row.appendChild(keys);
          list.appendChild(row);
        });
      });
    } catch (e) {
      list.innerHTML = '<div class="shortcut-empty">—</div>';
    }
  }

  /* ---------- preview: open/close with animation + resize with mouse ---------- */
  function applyPreviewState(animate) {
    const w = $("previewWrap"),
      body = $("previewBody");
    if (!w || !body) return;
    const target = Math.max(90, Math.min(420, S.previewHeight || 200));
    if (!animate) body.style.transition = "none";
    if (S.previewCollapsed) {
      w.classList.add("collapsed");
      body.style.height = "0px";
    } else {
      w.classList.remove("collapsed");
      body.style.height = target + "px";
    }
    if (!animate) {
      void body.offsetHeight;
      body.style.transition = "";
    }
  }
  function initResizer() {
    const rez = $("previewResizer"),
      body = $("previewBody");
    if (!rez || !body) return;
    applyPreviewState(false);
    let dragging = false,
      startY = 0,
      startH = 0;
    rez.addEventListener("mousedown", (e) => {
      if (S.previewCollapsed) return;
      dragging = true;
      startY = e.clientY;
      startH = body.offsetHeight;
      body.style.transition = "none";
      document.body.style.userSelect = "none";
      e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      let h = startH + (startY - e.clientY);
      h = Math.max(90, Math.min(420, h));
      body.style.height = h + "px";
    });
    window.addEventListener("mouseup", () => {
      if (!dragging) return;
      dragging = false;
      body.style.transition = "";
      document.body.style.userSelect = "";
      S.previewHeight = body.offsetHeight;
      save();
    });
  }

  /* ---------- render values ---------- */
  function setSeg(id, val) {
    document.querySelectorAll("#" + id + " button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.val === String(val));
    });
  }
  function fillRange(el) {
    const min = parseFloat(el.min) || 0,
      max = parseFloat(el.max) || 100,
      val = parseFloat(el.value) || 0;
    const pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
    el.style.setProperty("--range-pct", pct + "%");
  }
  function setSlider(id, val, fmt) {
    const el = $(id);
    el.value = val;
    fillRange(el);
    const v = $(id + "_v");
    if (v) v.textContent = fmt ? fmt(val) : val;
  }
  function render() {
    if (csLang) csLang.setValue(S.uiLang || "fa");
    $("enabled").checked = S.enabled;
    setSeg("rtlMode", S.rtlMode);
    $("scope_assistant").checked = !!S.scope.assistant;
    $("scope_user").checked = !!S.scope.user;
    $("scope_input").checked = !!S.scope.input;
    $("scope_chatList").checked = !!S.scope.chatList;

    setSeg("claudeTheme", S.claudeTheme);
    markClaudeAccent();
    markCodeBg();

    if (csFont) csFont.setValue(S.font);
    if (csHeading) csHeading.setValue(S.headingFont);
    if (csCode) csCode.setValue(S.codeFont);
    // body & code weight sliders (geometry + value) are set by updateWeightLock() below,
    // which adapts each to the selected font's real weights.
    const cwl = $("codeWeightLabel"); if (cwl) cwl.textContent = CODE_WEIGHT_TXT[S.uiLang] || CODE_WEIGHT_TXT.en;
    const cbl = $("codeBgLabel"); if (cbl) cbl.textContent = CODE_BG_TXT[S.uiLang] || CODE_BG_TXT.en;
    updateWeightLock(); // weight sliders only adjustable for fonts that ship multiple weights

    setSlider("fontSizePx", S.fontSizePx, (v) => v + "px");
    setSlider("lineHeight", S.lineHeight, (v) => (+v).toFixed(2));
    setSlider("letterSpacing", S.letterSpacing, (v) => (+v).toFixed(1) + "px");
    setSlider("wordSpacing", S.wordSpacing, (v) => (+v).toFixed(1) + "px");
    setSlider("paragraphSpacing", S.paragraphSpacing, (v) => (+v).toFixed(2) + "em");
    setSlider("readingWidth", S.readingWidth, (v) => v + "px");
    setSeg("align", S.align);
    // Digit conversion only applies to languages that have their own numerals;
    // for the rest the option is locked with an explanatory "i".
    const hasDigits = !!DIGITS[S.uiLang];
    $("persianDigits").checked = hasDigits && !!S.persianDigits;
    $("persianDigits").disabled = !hasDigits;
    $("digitsRow").classList.toggle("is-locked", !hasDigits);
    $("digitsInfo").hidden = hasDigits;
    $("readingWidthEnabled").checked = !!S.readingWidthEnabled;
    $("readingWidthWrap").style.opacity = S.readingWidthEnabled ? "1" : "0.4";
    $("readingWidthWrap").style.pointerEvents = S.readingWidthEnabled ? "" : "none";

    $("keepMathLtr").checked = !!S.keepMathLtr;
    $("keepCodeLtr").checked = !!S.keepCodeLtr;
    $("customCss").value = S.customCss || "";
    setSeg("theme", S.theme);

    renderPresets();
    applyTheme();
    markAccent();
    updatePreview();
  }

  /* ---------- presets ---------- */
  function snapshot() {
    const c = JSON.parse(JSON.stringify(S));
    delete c.presets;
    return c;
  }
  function reloadFromState() {
    setLang(S.uiLang);
    render();
    applyPreviewState(false);
  }
  /* ---------- in-popup confirm dialog (replaces the native confirm) ---------- */
  let _confirmResolve = null;
  function confirmDialog(title, text, okLabel, danger) {
    const m = $("confirmModal");
    $("confirmTitle").textContent = title || "";
    $("confirmText").textContent = text || "";
    const ok = $("confirmOk");
    ok.textContent = okLabel || t("m_confirm");
    ok.className = "btn" + (danger ? " btn-danger-solid" : "");
    m.classList.toggle("is-danger", !!danger);
    m.hidden = false;
    return new Promise((resolve) => { _confirmResolve = resolve; });
  }
  function closeConfirm(val) {
    if (!_confirmResolve) return;
    const r = _confirmResolve;
    _confirmResolve = null;
    $("confirmModal").hidden = true;
    r(val);
  }
  function renderPresets() {
    const wrap = $("presetList");
    wrap.innerHTML = "";
    const names = Object.keys(S.presets || {});
    if (!names.length) {
      wrap.innerHTML = '<div class="preset-empty">' + t("preset_empty") + "</div>";
      return;
    }
    names.forEach((name) => {
      const item = document.createElement("div");
      item.className = "preset-item";
      const label = document.createElement("span");
      label.className = "pname";
      label.textContent = name;
      const acts = document.createElement("div");
      acts.className = "pacts";
      const applyB = document.createElement("button");
      applyB.textContent = t("preset_apply");
      applyB.onclick = () => {
        confirmDialog(t("preset_apply"), "«" + name + "»", t("preset_apply"), false).then((ok) => {
          if (!ok) return;
          const snap = S.presets[name];
          const presets = S.presets;
          S = window.CRX_merge(Object.assign({}, snap, { presets: presets }));
          reloadFromState();
          persist();
        });
      };
      const delB = document.createElement("button");
      delB.textContent = t("preset_del");
      delB.className = "del";
      delB.onclick = () => {
        confirmDialog(t("preset_del"), "«" + name + "»", t("preset_del"), true).then((ok) => {
          if (!ok) return;
          delete S.presets[name];
          persist();
          renderPresets();
        });
      };
      acts.appendChild(applyB);
      acts.appendChild(delB);
      item.appendChild(label);
      item.appendChild(acts);
      wrap.appendChild(item);
    });
  }

  /* ---------- bind events ---------- */
  function bindCheckbox(id, setter) {
    $(id).addEventListener("change", (e) => {
      setter(e.target.checked);
      save();
    });
  }
  function bindSeg(id, setter) {
    document.querySelectorAll("#" + id + " button").forEach((b) => {
      b.addEventListener("click", () => {
        setter(b.dataset.val);
        setSeg(id, b.dataset.val);
        save();
      });
    });
  }
  function bindSlider(id, setter, fmt) {
    $(id).addEventListener("input", (e) => {
      const v = parseFloat(e.target.value);
      setter(v);
      fillRange(e.target);
      const o = $(id + "_v");
      if (o) o.textContent = fmt ? fmt(v) : v;
      save();
    });
  }

  function bindAll() {
    // general
    $("enabled").addEventListener("change", (e) => {
      S.enabled = e.target.checked;
      save();
    });
    bindSeg("rtlMode", (v) => (S.rtlMode = v));
    bindCheckbox("scope_assistant", (v) => (S.scope.assistant = v));
    bindCheckbox("scope_user", (v) => (S.scope.user = v));
    bindCheckbox("scope_input", (v) => (S.scope.input = v));
    bindCheckbox("scope_chatList", (v) => (S.scope.chatList = v));

    // Claude theme
    bindSeg("claudeTheme", (v) => (S.claudeTheme = v));
    $("claudeAccent").addEventListener("input", (e) => setClaudeAccent(e.target.value));
    $("codeBg").addEventListener("input", (e) => setCodeBg(e.target.value));

    $("editShortcuts").addEventListener("click", () => {
      try {
        // Edge needs edge://; Chrome/Brave/Opera use chrome://
        const base = navigator.userAgent.indexOf("Edg/") !== -1 ? "edge://" : "chrome://";
        chrome.tabs.create({ url: base + "extensions/shortcuts" });
      } catch (e) {}
    });

    // font (index-based: the slider snaps to the selected font's real weights)
    bindWeightSlider("fontWeight", "fontWeight");
    bindWeightSlider("codeFontWeight", "codeFontWeight");

    // typography
    bindSlider("fontSizePx", (v) => (S.fontSizePx = v), (v) => v + "px");
    bindSlider("lineHeight", (v) => (S.lineHeight = v), (v) => v.toFixed(2));
    bindSlider("letterSpacing", (v) => (S.letterSpacing = v), (v) => v.toFixed(1) + "px");
    bindSlider("wordSpacing", (v) => (S.wordSpacing = v), (v) => v.toFixed(1) + "px");
    bindSlider("paragraphSpacing", (v) => (S.paragraphSpacing = v), (v) => v.toFixed(2) + "em");
    bindSlider("readingWidth", (v) => (S.readingWidth = v), (v) => v + "px");
    bindSeg("align", (v) => (S.align = v));
    bindCheckbox("persianDigits", (v) => (S.persianDigits = v));
    $("readingWidthEnabled").addEventListener("change", (e) => {
      S.readingWidthEnabled = e.target.checked;
      $("readingWidthWrap").style.opacity = e.target.checked ? "1" : "0.4";
      $("readingWidthWrap").style.pointerEvents = e.target.checked ? "" : "none";
      save();
    });

    // advanced
    bindCheckbox("keepMathLtr", (v) => (S.keepMathLtr = v));
    bindCheckbox("keepCodeLtr", (v) => (S.keepCodeLtr = v));
    $("customCss").addEventListener("input", (e) => {
      S.customCss = e.target.value;
      save();
    });
    bindSeg("theme", (v) => {
      S.theme = v;
      applyTheme();
    });
    $("accent").addEventListener("input", (e) => setAccent(e.target.value));

    // preset
    $("presetSave").addEventListener("click", () => {
      const name = ($("presetName").value || "").trim();
      if (!name) {
        $("presetName").focus();
        return;
      }
      S.presets[name] = snapshot();
      $("presetName").value = "";
      persist();
      renderPresets();
    });

    // export / import
    $("exportBtn").addEventListener("click", exportSettings);
    $("importBtn").addEventListener("click", () => $("importFile").click());
    $("importFile").addEventListener("change", importSettings);

    // reset — modal
    $("resetBtn").addEventListener("click", () => {
      $("resetModal").hidden = false;
    });
    $("resetCancel").addEventListener("click", () => {
      $("resetModal").hidden = true;
    });
    $("resetConfirm").addEventListener("click", () => {
      const keepPresets = S.presets; // reset everything EXCEPT the saved presets
      S = window.CRX_merge(null);
      S.presets = keepPresets || {};
      reloadFromState();
      persist();
      $("resetModal").hidden = true;
    });
    $("resetModal").addEventListener("click", (e) => {
      if (e.target === $("resetModal")) $("resetModal").hidden = true;
    });
    $("confirmOk").addEventListener("click", () => closeConfirm(true));
    $("confirmCancel").addEventListener("click", () => closeConfirm(false));
    $("confirmModal").addEventListener("click", (e) => { if (e.target === $("confirmModal")) closeConfirm(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("confirmModal").hidden) closeConfirm(false);
      else if (!$("resetModal").hidden) $("resetModal").hidden = true;
      else closeAllCSelect();
    });

    // tabs
    document.querySelectorAll("#tabs .tab").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        document.querySelectorAll("#tabs .tab").forEach((x) => x.classList.remove("is-active"));
        document.querySelectorAll(".panel").forEach((p) => p.classList.remove("is-active"));
        tabBtn.classList.add("is-active");
        document.querySelector('.panel[data-panel="' + tabBtn.dataset.tab + '"]').classList.add("is-active");
      });
    });

    // preview collapse/expand (with animation)
    $("previewToggle").addEventListener("click", () => {
      S.previewCollapsed = !S.previewCollapsed;
      applyPreviewState(true);
      save();
    });

    // click outside = close open dropdowns
    document.addEventListener("click", () => closeAllCSelect());

    // flush save on close
    window.addEventListener("pagehide", () => {
      clearTimeout(saveTimer);
      persist();
    });
  }

  /* ---------- export/import ---------- */
  function exportSettings() {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "claude-studio-settings.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function importSettings(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => { alert(t("import_invalid")); e.target.value = ""; };
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        // Reject anything that isn't a plain settings object: arrays would pollute
        // settings with numeric index keys; primitives have no fields to merge.
        if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("invalid");
        S = window.CRX_merge(data);
        reloadFromState();
        persist();
      } catch (err) {
        alert(t("import_invalid"));
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  }

  /* ---------- start ---------- */
  load().then((s) => {
    S = s;
    S.previewCollapsed = true; // always start collapsed each time the popup opens
    tt = I18N.dict(S.uiLang || "fa");
    I18N.apply(S.uiLang || "fa"); // translate labels first — the pickers' aria-labels read label text at build time
    buildLangPicker();
    buildFontPickers();
    buildAccentSwatches();
    buildClaudeAccentSwatches();
    buildCodeBgSwatches();
    buildShortcuts();
    initResizer();
    renderPreviewContent();
    render();
    bindAll();
    try {
      const v = chrome.runtime.getManifest().version;
      const el = $("ver");
      if (el) el.textContent = v;
    } catch (e) {}
    // Re-enable transitions only after the initial saved state has painted, so
    // the on/off switch and other controls don't animate when the popup opens.
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove("preload")));
  });
  // Safety net: never leave transitions permanently disabled if the render chain throws.
  setTimeout(() => document.body.classList.remove("preload"), 600);

  // Stay in sync with external writes (e.g. the toggle-rtl shortcut handled by the
  // service worker) without clobbering the popup's own debounced writes.
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes[KEY]) return;
    const oldV = changes[KEY].oldValue || {};
    const newV = changes[KEY].newValue || {};
    // Drop the echo of one of our own writes so it can't clobber a newer in-flight edit.
    // External writes won't match the queue and fall through to per-key reconciliation below.
    const echoIdx = pendingWrites.indexOf(JSON.stringify(newV));
    if (echoIdx !== -1) { pendingWrites.splice(echoIdx, 1); return; }
    // Apply only the keys that actually changed externally, so a concurrent
    // external write (e.g. the toggle-rtl shortcut firing during the popup's 120ms
    // save debounce) flips just `enabled` and never discards the user's in-flight edits.
    let touched = false;
    const prevLang = S.uiLang;
    for (const k in newV) {
      if (JSON.stringify(newV[k]) === JSON.stringify(oldV[k])) continue; // unchanged externally
      if (JSON.stringify(newV[k]) === JSON.stringify(S[k])) continue;    // our own write echoing back
      S[k] = newV[k];
      touched = true;
    }
    if (!touched) return;
    S = window.CRX_merge(S); // re-validate the reconciled state
    if (S.uiLang !== prevLang) setLang(S.uiLang); // full re-translation, not just a value render
    else render();
  });
})();
