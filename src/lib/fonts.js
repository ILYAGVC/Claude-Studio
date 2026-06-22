/* ===================================================================
 *  Claude RTL — font catalog (grouped by language)
 *  Each font: id, label, stack, group (language), load (loading source)
 *  load = null  → system/default font
 *  load.type = 'google' → Google Fonts   |   'css' → @font-face from jsDelivr
 * =================================================================== */
(function () {
  "use strict";

  const G = (family, axis) => ({ type: "google", family: family, axis: axis || "" });
  // weights = the static weights the jsDelivr @font-face.css actually ships (so the
  // weight slider can offer exactly those and nothing the font lacks).
  const J = (url, weights) => ({ type: "css", url: url, weights: weights || null });
  const JD = "https://cdn.jsdelivr.net/gh/rastikerdar/";

  function href(load) {
    if (!load) return null;
    if (load.type === "google") {
      return (
        "https://fonts.googleapis.com/css2?family=" +
        load.family.replace(/ /g, "+") +
        (load.axis ? ":wght@" + load.axis : "") +
        "&display=swap"
      );
    }
    return load.url;
  }

  /* Group names written in each language's own script */
  const FA = "فارسی";
  const AR = "العربية";
  const UR = "اردو";
  const HE = "עברית";
  const EN = "English";
  const CY = "Кириллица";
  const DV = "हिन्दी";
  const JA = "日本語";
  const ZH = "中文";
  const KO = "한국어";
  const TH = "ไทย";
  const BN = "বাংলা";

  /* ---------- Text fonts ---------- */
  const text = [
    { id: "default", group: null, label: "پیش‌فرض Claude", stack: "inherit", load: null },

    /* ===== Persian ===== */
    { id: "Vazirmatn", group: FA, label: "وزیرمتن — Vazirmatn", stack: "'Vazirmatn','Vazir',Tahoma,sans-serif", load: G("Vazirmatn", "100..900") },
    { id: "Vazir",     group: FA, label: "وزیر — Vazir",        stack: "'Vazir',Tahoma,sans-serif",            load: J(JD + "vazir-font@latest/dist/font-face.css", [100, 300, 400, 500, 700, 900]) },
    { id: "Sahel",     group: FA, label: "ساحل — Sahel",        stack: "'Sahel',Tahoma,sans-serif",            load: J(JD + "sahel-font@latest/dist/font-face.css", [300, 400, 600, 700, 900]) },
    { id: "Samim",     group: FA, label: "صمیم — Samim",        stack: "'Samim',Tahoma,sans-serif",            load: J(JD + "samim-font@latest/dist/font-face.css", [400, 500, 700]) },
    { id: "Shabnam",   group: FA, label: "شبنم — Shabnam",      stack: "'Shabnam',Tahoma,sans-serif",          load: J(JD + "shabnam-font@latest/dist/font-face.css", [100, 300, 400, 500, 700]) },
    { id: "Gandom",    group: FA, label: "گندم — Gandom",       stack: "'Gandom',Tahoma,sans-serif",           load: J(JD + "gandom-font@latest/dist/font-face.css", [400]) },
    { id: "Tanha",     group: FA, label: "تنها — Tanha",        stack: "'Tanha',Tahoma,serif",                 load: J(JD + "tanha-font@latest/dist/font-face.css", [400]) },
    { id: "Parastoo",  group: FA, label: "پرستو — Parastoo",    stack: "'Parastoo',Tahoma,sans-serif",         load: J(JD + "parastoo-font@latest/dist/font-face.css", [400, 700]) },
    { id: "Lalezar",   group: FA, label: "لاله‌زار — Lalezar", stack: "'Lalezar',cursive",            load: G("Lalezar") },

    /* ===== Arabic ===== */
    { id: "NotoNaskh",      group: AR, label: "نسخ — Noto Naskh Arabic",   stack: "'Noto Naskh Arabic',serif",            load: G("Noto Naskh Arabic", "400..700") },
    { id: "NotoSansArabic", group: AR, label: "نوتو سنس — Noto Sans Arabic", stack: "'Noto Sans Arabic',Tahoma,sans-serif", load: G("Noto Sans Arabic", "100..900") },
    { id: "NotoKufi",       group: AR, label: "كوفي — Noto Kufi Arabic",    stack: "'Noto Kufi Arabic',sans-serif",        load: G("Noto Kufi Arabic", "100..900") },
    { id: "Amiri",          group: AR, label: "أميري — Amiri",             stack: "'Amiri',serif",                        load: G("Amiri", "400;700") },
    { id: "Cairo",          group: AR, label: "القاهرة — Cairo",           stack: "'Cairo',Tahoma,sans-serif",            load: G("Cairo", "200..1000") },
    { id: "Tajawal",        group: AR, label: "تجوال — Tajawal",           stack: "'Tajawal',sans-serif",                 load: G("Tajawal", "300;400;500;700;900") },
    { id: "Almarai",        group: AR, label: "المراعي — Almarai",         stack: "'Almarai',sans-serif",                 load: G("Almarai", "300;400;700;800") },
    { id: "ElMessiri",      group: AR, label: "المسيري — El Messiri",      stack: "'El Messiri',sans-serif",              load: G("El Messiri", "400..700") },
    { id: "ReemKufi",       group: AR, label: "ريم كوفي — Reem Kufi",      stack: "'Reem Kufi',sans-serif",               load: G("Reem Kufi", "400..700") },
    { id: "Changa",         group: AR, label: "چنگا — Changa",            stack: "'Changa',sans-serif",                  load: G("Changa", "200..800") },
    { id: "MarkaziText",    group: AR, label: "مرکزی — Markazi Text",      stack: "'Markazi Text',serif",                 load: G("Markazi Text", "400..700") },
    { id: "Lateef",         group: AR, label: "لطیف — Lateef",            stack: "'Lateef',serif",                       load: G("Lateef", "400;700") },
    { id: "Scheherazade",   group: AR, label: "شهرزاد — Scheherazade New", stack: "'Scheherazade New',serif",            load: G("Scheherazade New", "400;700") },
    { id: "ArefRuqaa",      group: AR, label: "عارف رقعة — Aref Ruqaa", stack: "'Aref Ruqaa',serif",            load: G("Aref Ruqaa", "400;700") },

    /* ===== Urdu ===== */
    { id: "NotoNastaliqUrdu", group: UR, label: "نستعلیق — Noto Nastaliq Urdu", stack: "'Noto Nastaliq Urdu',serif", load: G("Noto Nastaliq Urdu", "400..700") },
    { id: "Gulzar",           group: UR, label: "گلزار — Gulzar",     stack: "'Gulzar',serif",             load: G("Gulzar") },

    /* ===== Hebrew ===== */
    { id: "NotoSansHebrew",  group: HE, label: "נוטו — Noto Sans Hebrew",       stack: "'Noto Sans Hebrew',sans-serif", load: G("Noto Sans Hebrew", "100..900") },
    { id: "NotoSerifHebrew", group: HE, label: "נוטו סריף — Noto Serif Hebrew", stack: "'Noto Serif Hebrew',serif",     load: G("Noto Serif Hebrew", "100..900") },
    { id: "Rubik",           group: HE, label: "רוביק — Rubik",                 stack: "'Rubik',sans-serif",            load: G("Rubik", "300..900") },
    { id: "Heebo",           group: HE, label: "חיבו — Heebo",                  stack: "'Heebo',sans-serif",            load: G("Heebo", "100..900") },
    { id: "Assistant",       group: HE, label: "אסיסטנט — Assistant",           stack: "'Assistant',sans-serif",        load: G("Assistant", "200..800") },
    { id: "FrankRuhlLibre",  group: HE, label: "פרנק רוהל — Frank Ruhl Libre",  stack: "'Frank Ruhl Libre',serif",      load: G("Frank Ruhl Libre", "300..900") },
    { id: "DavidLibre",      group: HE, label: "דוד — David Libre",             stack: "'David Libre',serif",           load: G("David Libre", "400;500;700") },
    { id: "SuezOne",         group: HE, label: "סואץ — Suez One",      stack: "'Suez One',serif",              load: G("Suez One") },
    { id: "SecularOne",      group: HE, label: "סקולר — Secular One",           stack: "'Secular One',sans-serif",      load: G("Secular One") },

    /* ===== English / Latin ===== */
    { id: "Inter",           group: EN, label: "Inter",                  stack: "'Inter',sans-serif",            load: G("Inter", "100..900") },
    { id: "Roboto",          group: EN, label: "Roboto",                 stack: "'Roboto',sans-serif",           load: G("Roboto", "100;300;400;500;700;900") },
    { id: "OpenSans",        group: EN, label: "Open Sans",              stack: "'Open Sans',sans-serif",        load: G("Open Sans", "300..800") },
    { id: "Lato",            group: EN, label: "Lato",                   stack: "'Lato',sans-serif",             load: G("Lato", "100;300;400;700;900") },
    { id: "Montserrat",      group: EN, label: "Montserrat",             stack: "'Montserrat',sans-serif",       load: G("Montserrat", "100..900") },
    { id: "Poppins",         group: EN, label: "Poppins",               stack: "'Poppins',sans-serif",          load: G("Poppins", "300;400;500;600;700") },
    { id: "Nunito",          group: EN, label: "Nunito",                 stack: "'Nunito',sans-serif",           load: G("Nunito", "200..900") },
    { id: "SourceSans3",     group: EN, label: "Source Sans 3",          stack: "'Source Sans 3',sans-serif",    load: G("Source Sans 3", "200..900") },
    { id: "Merriweather",    group: EN, label: "Merriweather (serif)",   stack: "'Merriweather',serif",          load: G("Merriweather", "300;400;700;900") },
    { id: "Lora",            group: EN, label: "Lora (serif)",           stack: "'Lora',serif",                  load: G("Lora", "400..700") },
    { id: "PlayfairDisplay", group: EN, label: "Playfair Display (serif)", stack: "'Playfair Display',serif",    load: G("Playfair Display", "400..900") },

    /* ===== Cyrillic (Russian, Ukrainian) ===== */
    { id: "PTSans",  group: CY, label: "PT Sans",          stack: "'PT Sans',sans-serif",  load: G("PT Sans", "400;700") },
    { id: "PTSerif", group: CY, label: "PT Serif (serif)", stack: "'PT Serif',serif",      load: G("PT Serif", "400;700") },
    { id: "Ubuntu",  group: CY, label: "Ubuntu",           stack: "'Ubuntu',sans-serif",   load: G("Ubuntu", "300;400;500;700") },

    /* ===== Devanagari (Hindi) ===== */
    { id: "NotoSansDevanagari", group: DV, label: "Noto Sans Devanagari", stack: "'Noto Sans Devanagari',sans-serif", load: G("Noto Sans Devanagari", "100..900") },
    { id: "Hind",  group: DV, label: "Hind",  stack: "'Hind',sans-serif",  load: G("Hind", "300;400;500;600;700") },
    { id: "Mukta", group: DV, label: "Mukta", stack: "'Mukta',sans-serif", load: G("Mukta", "200;300;400;500;600;700;800") },

    /* ===== Japanese ===== */
    { id: "NotoSansJP",     group: JA, label: "Noto Sans JP",         stack: "'Noto Sans JP',sans-serif",        load: G("Noto Sans JP", "100..900") },
    { id: "NotoSerifJP",    group: JA, label: "Noto Serif JP (serif)", stack: "'Noto Serif JP',serif",           load: G("Noto Serif JP", "200..900") },
    { id: "MPLUSRounded1c", group: JA, label: "M PLUS Rounded 1c",    stack: "'M PLUS Rounded 1c',sans-serif",   load: G("M PLUS Rounded 1c", "300;400;500;700;800") },

    /* ===== Chinese (Simplified) ===== */
    { id: "NotoSansSC",  group: ZH, label: "Noto Sans SC",          stack: "'Noto Sans SC',sans-serif", load: G("Noto Sans SC", "100..900") },
    { id: "NotoSerifSC", group: ZH, label: "Noto Serif SC (serif)", stack: "'Noto Serif SC',serif",     load: G("Noto Serif SC", "200..900") },

    /* ===== Korean ===== */
    { id: "NotoSansKR",  group: KO, label: "Noto Sans KR",          stack: "'Noto Sans KR',sans-serif", load: G("Noto Sans KR", "100..900") },
    { id: "NotoSerifKR", group: KO, label: "Noto Serif KR (serif)", stack: "'Noto Serif KR',serif",     load: G("Noto Serif KR", "200..900") },

    /* ===== Thai ===== */
    { id: "NotoSansThai", group: TH, label: "Noto Sans Thai", stack: "'Noto Sans Thai',sans-serif", load: G("Noto Sans Thai", "100..900") },
    { id: "Sarabun",      group: TH, label: "Sarabun",        stack: "'Sarabun',sans-serif",        load: G("Sarabun", "100;200;300;400;500;600;700;800") },
    { id: "Kanit",        group: TH, label: "Kanit",          stack: "'Kanit',sans-serif",          load: G("Kanit", "100;200;300;400;500;600;700;800;900") },

    /* ===== Bengali ===== */
    { id: "NotoSansBengali", group: BN, label: "Noto Sans Bengali", stack: "'Noto Sans Bengali',sans-serif", load: G("Noto Sans Bengali", "100..900") },
    { id: "HindSiliguri",    group: BN, label: "Hind Siliguri",     stack: "'Hind Siliguri',sans-serif",     load: G("Hind Siliguri", "300;400;500;600;700") }
  ];

  /* ---------- Code fonts ---------- */
  const mono = [
    { id: "default",       group: null, label: "پیش‌فرض Claude",        stack: "inherit",                    load: null },
    { id: "Vazirmatn",     group: null, label: "وزیرمتن — Vazirmatn", stack: "'Vazirmatn',monospace",      load: G("Vazirmatn", "100..900") },
    { id: "FiraCode",      group: null, label: "Fira Code",             stack: "'Fira Code',monospace",      load: G("Fira Code", "300..700") },
    { id: "JetBrainsMono", group: null, label: "JetBrains Mono",        stack: "'JetBrains Mono',monospace", load: G("JetBrains Mono", "100..800") },
    { id: "SourceCodePro", group: null, label: "Source Code Pro",       stack: "'Source Code Pro',monospace", load: G("Source Code Pro", "200..900") },
    { id: "IBMPlexMono",    group: null, label: "IBM Plex Mono",        stack: "'IBM Plex Mono',monospace",    load: G("IBM Plex Mono", "400;500;600;700") },
    { id: "RobotoMono",     group: null, label: "Roboto Mono",          stack: "'Roboto Mono',monospace",      load: G("Roboto Mono", "100..700") },
    { id: "SpaceMono",      group: null, label: "Space Mono",           stack: "'Space Mono',monospace",       load: G("Space Mono", "400;700") },
    { id: "Inconsolata",    group: null, label: "Inconsolata",          stack: "'Inconsolata',monospace",      load: G("Inconsolata", "200..900") },
    { id: "UbuntuMono",     group: null, label: "Ubuntu Mono",          stack: "'Ubuntu Mono',monospace",      load: G("Ubuntu Mono", "400;700") },
    { id: "DMMono",         group: null, label: "DM Mono",              stack: "'DM Mono',monospace",          load: G("DM Mono", "300;400;500") },
    { id: "AnonymousPro",   group: null, label: "Anonymous Pro",        stack: "'Anonymous Pro',monospace",    load: G("Anonymous Pro", "400;700") },
    { id: "OverpassMono",   group: null, label: "Overpass Mono",        stack: "'Overpass Mono',monospace",    load: G("Overpass Mono", "300..700") },
    { id: "RedHatMono",     group: null, label: "Red Hat Mono",         stack: "'Red Hat Mono',monospace",     load: G("Red Hat Mono", "300..700") },
    { id: "NotoSansMono",   group: null, label: "Noto Sans Mono",       stack: "'Noto Sans Mono',monospace",   load: G("Noto Sans Mono", "100..900") },
    { id: "FiraMono",       group: null, label: "Fira Mono",            stack: "'Fira Mono',monospace",        load: G("Fira Mono", "400;500;700") },
    { id: "PTMono",         group: null, label: "PT Mono",              stack: "'PT Mono',monospace",          load: G("PT Mono", "400") },
    { id: "B612Mono",       group: null, label: "B612 Mono",            stack: "'B612 Mono',monospace",        load: G("B612 Mono", "400;700") },
    { id: "SplineSansMono", group: null, label: "Spline Sans Mono",     stack: "'Spline Sans Mono',monospace", load: G("Spline Sans Mono", "300..700") },
    { id: "Cousine",        group: null, label: "Cousine",              stack: "'Cousine',monospace",          load: G("Cousine", "400;700") },
    { id: "VictorMono",     group: null, label: "Victor Mono",          stack: "'Victor Mono',monospace",      load: G("Victor Mono", "100..700") },
    { id: "AzeretMono",     group: null, label: "Azeret Mono",          stack: "'Azeret Mono',monospace",      load: G("Azeret Mono", "100..900") },
    { id: "ShareTechMono",  group: null, label: "Share Tech Mono",      stack: "'Share Tech Mono',monospace",  load: G("Share Tech Mono", "400") },
    { id: "Consolas",      group: null, label: "Consolas",      stack: "Consolas,monospace",         load: null },
    { id: "CourierNew",    group: null, label: "Courier New",   stack: "'Courier New',monospace",    load: null }
  ];

  window.CRX_FONTS = {
    text: text,
    mono: mono,
    href: href,
    get: function (kind, id) {
      const arr = this[kind] || this.text;
      return arr.find((f) => f.id === id) || arr[0];
    },
    // The discrete weights a font actually offers (multiples of 100 within 100..900),
    // sorted ascending. null  = unknown/continuous (system fonts) → caller may show the
    // full range. A single-element array means a single-weight font (slider should lock).
    weightStops: function (f) {
      if (!f || !f.load) return null; // system/inherit/default: unknown
      const L = f.load;
      if (L.type === "css") return L.weights && L.weights.length ? L.weights.slice() : [400];
      if (L.type === "google") {
        const ax = L.axis || "";
        if (!ax) return [400]; // single static weight
        let ws = [];
        if (ax.indexOf("..") !== -1) {
          const p = ax.split("..");
          const a = parseInt(p[0], 10), b = parseInt(p[1], 10);
          for (let w = 100; w <= 900; w += 100) if (w >= a && w <= b) ws.push(w);
        } else {
          ws = ax.split(";").map((x) => parseInt(x, 10)).filter((w) => w >= 100 && w <= 900 && w % 100 === 0);
        }
        return ws.length ? ws : [400];
      }
      return null;
    },
    // Snap a weight onto the nearest weight the font actually ships, so an out-of-range
    // value left over from another font is never applied verbatim (no synthesized bold).
    // Returns the input unchanged for "default", unknown/single-weight stops, or an exact hit.
    nearestWeight: function (f, weight) {
      if (weight === "default") return weight;
      const stops = this.weightStops(f);
      if (!stops || stops.length < 2) return weight;
      const w = parseInt(weight, 10);
      if (!isFinite(w) || stops.indexOf(w) !== -1) return weight;
      let best = stops[0], bd = Infinity;
      stops.forEach((s) => { const d = Math.abs(s - w); if (d < bd) { bd = d; best = s; } });
      return String(best);
    }
  };
})();
