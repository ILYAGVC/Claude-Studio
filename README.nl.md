# Claude Studio — RTL, meertalige lettertypen en thema's voor Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · **Nederlands** · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Een Manifest V3 browserextensie die de **Claude**-webapp (`claude.ai` /
`claude.com`) van rechts naar links maakt en je in staat stelt de typografie en
het thema volledig aan te passen.

![icon](icons/icon128.png)

> **Onafhankelijke, niet-officiële extensie — niet verbonden met, onderschreven
> door of gesponsord door Anthropic. "Claude" is een handelsmerk van Anthropic.**

---

## ✨ Functies

- **Van rechts naar links en richting** — `Auto` (detectie per blok, het best
  voor tweetalige gesprekken), geforceerd RTL of geforceerd LTR. Pas dit
  onafhankelijk toe op de antwoorden van Claude, je eigen berichten, het
  invoervak en de chatlijst in de zijbalk.
- **Uitlijning** — begin (volgt de richting), rechts, midden, links of uitgevuld.
- **50+ lettertypen, gegroepeerd per schrift** — Perzisch, Arabisch, Hebreeuws,
  Urdu, Latijns, Cyrillisch, Devanagari, Japans, Chinees, Koreaans, Thais,
  Bengaals — met een doorzoekbare kiezer met voorbeeldweergave en filterchips per
  taal. Aparte lettertypen voor tekst, koppen en code — elk een downloadbaar
  weblettertype (Google Fonts / jsDelivr).
- **Typografie** — lettergrootte, dikte, regelhoogte, letter-/woord-/
  alinea-afstand en een leesbreedtelimiet, allemaal met live schuifregelaars.
- **Lokale cijfers** — toon getallen in de eigen cijfers van je taal (Perzisch,
  Arabisch, Urdu, Pashto, Hindi, Bengaals, Thais). Vergrendeld met een uitleg
  voor talen die al standaard westerse cijfers gebruiken.
- **Wiskunde en code blijven correct** — KaTeX-formules en codeblokken blijven
  van links naar rechts en onaangetast.
- **Claude-thema's** — schakel Claude zelf tussen Auto / Licht / Donker / een
  contrastrijk Zwart, plus een aangepaste accentkleur.
- **Interface in 25 talen** — het instellingenpaneel detecteert bij de eerste
  start automatisch de taal van je browser en is volledig vertaald in 25 talen.
- **Live voorbeeld** — zie precies hoe Claude eruit zal zien (het eigen thema +
  accent) voordat je het toepast.
- **Presets, export/import, aangepaste CSS** en een verzorgde, met het
  toetsenbord toegankelijke UI met lichte/donkere/zwarte/systeem-paneelthema's.

---

## 🚀 Installeren (ontwikkelaarsmodus)

1. Open `chrome://extensions` (Chrome, Edge of Brave).
2. Schakel **Ontwikkelaarsmodus** in (rechtsboven).
3. Klik op **Uitgepakte extensie laden** en selecteer deze projectmap.
4. Open een Claude-chat en klik op het extensiepictogram om de instellingen te
   openen.

Sneltoetsen kunnen worden toegewezen op `chrome://extensions/shortcuts` (er zijn
er standaard geen ingesteld).

---

## 🔒 Privacy

De extensie **verzamelt geen gegevens** — geen analyses, geen telemetrie, geen
tracking. Instellingen worden alleen opgeslagen in `chrome.storage.local` op je
apparaat. De enige netwerkverzoeken zijn **lettertypebestanden** die van Google
Fonts / jsDelivr worden opgehaald wanneer je een downloadbaar lettertype kiest.
Zie [PRIVACY.md](PRIVACY.md) voor meer informatie.

---

## 📁 Projectstructuur

```
.
├── manifest.json              # MV3 manifest
├── icons/                     # icon.svg + 16/32/48/128 PNGs
├── _locales/                  # chrome.i18n manifest strings (25 languages)
├── PRIVACY.md
└── src/
    ├── lib/
    │   ├── defaults.js        # default settings, merge/validation, language + digit maps
    │   ├── fonts.js           # font catalog (grouped by script)
    │   └── i18n.js            # 25-language UI translations
    ├── content/
    │   ├── content.js         # core engine (direction, scope, theme, digits)
    │   └── inject.css         # injected page styles
    ├── background/
    │   └── sw.js              # service worker (CSP rule, re-injection, shortcut)
    └── popup/
        ├── popup.html
        ├── theme-init.js
        ├── popup.css
        └── popup.js
```

---

## 📝 Licentie

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Gemaakt met ❤️ door **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
