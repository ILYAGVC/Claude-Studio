# Claude Studio — RTL, mehrsprachige Schriften und Themes für Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · **Deutsch** · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Eine Manifest-V3-Browser-Erweiterung, die die **Claude**-Web-App (`claude.ai` /
`claude.com`) von rechts nach links darstellt und es dir ermöglicht, ihre Typografie und ihr Theme vollständig anzupassen.

![icon](icons/icon128.png)

> **Unabhängige, inoffizielle Erweiterung — nicht mit Anthropic verbunden, von
> Anthropic unterstützt oder gesponsert. „Claude“ ist eine Marke von Anthropic.**

---

## ✨ Funktionen

- **Rechts-nach-links und Schreibrichtung** — `Auto` (Erkennung pro Block, ideal für
  zweisprachige Chats), erzwungenes RTL oder erzwungenes LTR. Lässt sich unabhängig auf
  Claudes Antworten, deine Nachrichten, das Eingabefeld und die Chat-Liste in der
  Seitenleiste anwenden.
- **Ausrichtung** — Anfang (folgt der Schreibrichtung), rechts, zentriert, links oder Blocksatz.
- **Mehr als 50 Schriften, nach Schriftsystem gruppiert** — Persisch, Arabisch, Hebräisch, Urdu, Lateinisch,
  Kyrillisch, Devanagari, Japanisch, Chinesisch, Koreanisch, Thai, Bengali — mit einer
  durchsuchbaren Auswahl mit Vorschau und Filter-Chips pro Sprache. Separate Schriften für
  Fließtext, Überschriften und Code — jeweils eine herunterladbare Web-Schrift (Google Fonts / jsDelivr).
- **Typografie** — Schriftgröße, Schriftstärke, Zeilenhöhe, Zeichen-/Wort-/Absatzabstand
  und eine Begrenzung der Lesebreite, alles mit Live-Schiebereglern.
- **Lokale Ziffern** — zeige Zahlen in den eigenen Ziffern deiner Sprache (Persisch,
  Arabisch, Urdu, Paschtu, Hindi, Bengali, Thai). Für Sprachen, die bereits standardmäßige
  westliche Ziffern verwenden, mit einer Erklärung gesperrt.
- **Mathematik und Code bleiben korrekt** — KaTeX-Formeln und Codeblöcke bleiben
  von links nach rechts und unverändert.
- **Claude-Theming** — schalte Claude selbst zwischen Auto / Hell / Dunkel / einem
  kontrastreichen Schwarz um, plus eine benutzerdefinierte Akzentfarbe.
- **Oberfläche in 25 Sprachen** — das Einstellungsfeld erkennt beim ersten Start automatisch
  deine Browsersprache und ist vollständig in 25 Sprachen übersetzt.
- **Live-Vorschau** — sieh genau, wie Claude aussehen wird (eigenes Theme + Akzent),
  bevor du die Einstellungen anwendest.
- **Voreinstellungen, Export/Import, benutzerdefiniertes CSS** sowie eine ausgefeilte, per Tastatur
  bedienbare Oberfläche mit hellen / dunklen / schwarzen / systemabhängigen Panel-Themes.

---

## 🚀 Installation (Entwicklermodus)

1. Öffne `chrome://extensions` (Chrome, Edge oder Brave).
2. Aktiviere den **Entwicklermodus** (oben rechts).
3. Klicke auf **Entpackte Erweiterung laden** und wähle den Ordner dieses Projekts aus.
4. Öffne einen Claude-Chat und klicke auf das Symbol der Erweiterung, um die Einstellungen zu öffnen.

Tastenkürzel können unter `chrome://extensions/shortcuts` zugewiesen werden (standardmäßig sind
keine festgelegt).

---

## 🔒 Datenschutz

Die Erweiterung **sammelt keine Daten** — keine Analyse, keine Telemetrie, kein Tracking.
Die Einstellungen werden ausschließlich in `chrome.storage.local` auf deinem Gerät gespeichert. Die einzigen
Netzwerkanfragen sind **Schriftdateien**, die von Google Fonts / jsDelivr abgerufen werden, wenn du
eine herunterladbare Schrift auswählst. Weitere Einzelheiten findest du in [PRIVACY.md](PRIVACY.md).

---

## 📁 Projektstruktur

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

## 📝 Lizenz

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Mit ❤️ erstellt von **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
