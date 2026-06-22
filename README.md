# Claude Studio — RTL, Multilingual Fonts & Themes for Claude

**English** · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

A Manifest V3 browser extension that makes the **Claude** web app (`claude.ai` /
`claude.com`) right‑to‑left and lets you fully customize its typography and theme.

![icon](icons/icon128.png)

> **Independent, unofficial extension — not affiliated with, endorsed by, or
> sponsored by Anthropic. “Claude” is a trademark of Anthropic.**

---

## ✨ Features

- **Right‑to‑left & direction** — `Auto` (per‑block detection, best for bilingual
  chats), forced RTL, or forced LTR. Apply independently to Claude’s replies,
  your messages, the composer, and the sidebar chat list.
- **Alignment** — start (follows direction), right, center, left, or justify.
- **50+ fonts, grouped by script** — Persian, Arabic, Hebrew, Urdu, Latin,
  Cyrillic, Devanagari, Japanese, Chinese, Korean, Thai, Bengali — with a
  searchable, previewing picker and per‑language filter chips. Separate fonts for
  body, headings, and code — each a downloadable web font (Google Fonts).
- **Typography** — font size, weight, line height, letter/word/paragraph spacing,
  and a reading‑width limit, all with live sliders.
- **Local numerals** — show numbers in your language’s own digits (Persian,
  Arabic, Urdu, Pashto, Hindi, Bengali, Thai). Locked with an explanation for languages
  that already use standard Western digits.
- **Math & code stay correct** — KaTeX formulas and code blocks remain
  left‑to‑right and intact.
- **Claude theming** — switch Claude itself between Auto / Light / Dark / a
  high‑contrast Black, plus a custom accent color.
- **25‑language interface** — the settings panel auto‑detects your browser
  language on first run and is fully translated into 25 languages.
- **Live preview** — see exactly how Claude will look (its own theme + accent)
  before applying.
- **Presets, export/import, custom CSS**, and a polished, keyboard‑accessible UI
  with light / dark / black / system panel themes.

---

## 🚀 Install (developer mode)

1. Open `chrome://extensions` (Chrome, Edge, or Brave).
2. Enable **Developer mode** (top‑right).
3. Click **Load unpacked** and select this project folder.
4. Open a Claude chat and click the extension icon to open the settings.

Keyboard shortcuts can be assigned at `chrome://extensions/shortcuts` (none are
set by default).

---

## 🔒 Privacy

The extension **collects no data** — no analytics, no telemetry, no tracking.
Settings are stored only in `chrome.storage.local` on your device. The only
network requests are **font files** fetched from Google Fonts when you
select a downloadable font. See [PRIVACY.md](PRIVACY.md) for details.

---

## 📁 Project structure

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
    │   └── sw.js              # service worker (re-injection, shortcut)
    └── popup/
        ├── popup.html
        ├── theme-init.js      # early theme paint (avoids flash on open)
        ├── popup.css
        └── popup.js
```

---

## 📝 License

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Made with ❤️ by **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
