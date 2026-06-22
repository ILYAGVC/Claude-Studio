# Claude Studio — RTL, font multilingue e temi per Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · **Italiano** · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Un'estensione per browser Manifest V3 che rende l'app web di **Claude** (`claude.ai` /
`claude.com`) da destra a sinistra e ti consente di personalizzarne completamente la tipografia e il tema.

![icon](icons/icon128.png)

> **Estensione indipendente e non ufficiale — non affiliata, approvata o
> sponsorizzata da Anthropic. "Claude" è un marchio di Anthropic.**

---

## ✨ Funzionalità

- **Da destra a sinistra e direzione** — `Auto` (rilevamento per blocco, ideale per le chat
  bilingue), RTL forzato o LTR forzato. Applicabile in modo indipendente alle risposte di Claude,
  ai tuoi messaggi, al campo di composizione e all'elenco delle chat nella barra laterale.
- **Allineamento** — iniziale (segue la direzione), a destra, al centro, a sinistra o giustificato.
- **Oltre 50 font, raggruppati per scrittura** — persiano, arabo, ebraico, urdu, latino,
  cirillico, devanagari, giapponese, cinese, coreano, thailandese, bengalese — con un
  selettore ricercabile e con anteprima e chip di filtro per lingua. Font separati per
  corpo del testo, intestazioni e codice — ciascuno un font web scaricabile (Google Fonts).
- **Tipografia** — dimensione del font, spessore, altezza della riga, spaziatura tra lettere/parole/paragrafi
  e un limite di larghezza di lettura, tutti con cursori in tempo reale.
- **Numeri locali** — mostra i numeri con le cifre proprie della tua lingua (persiano,
  arabo, urdu, pashto, hindi, bengalese, thailandese). Bloccato con una spiegazione per le lingue
  che usano già le cifre occidentali standard.
- **Matematica e codice restano corretti** — le formule KaTeX e i blocchi di codice rimangono
  da sinistra a destra e intatti.
- **Temi di Claude** — passa Claude stesso tra Auto / Chiaro / Scuro / un
  Nero ad alto contrasto, oltre a un colore di accento personalizzato.
- **Interfaccia in 25 lingue** — il pannello delle impostazioni rileva automaticamente la lingua del browser
  al primo avvio ed è completamente tradotto in 25 lingue.
- **Anteprima in tempo reale** — vedi esattamente come apparirà Claude (con il suo tema e il suo accento)
  prima di applicare le modifiche.
- **Preset, esportazione/importazione, CSS personalizzato** e un'interfaccia curata e accessibile da tastiera
  con temi del pannello chiaro / scuro / nero / di sistema.

---

## 🚀 Installazione (modalità sviluppatore)

1. Apri `chrome://extensions` (Chrome, Edge o Brave).
2. Abilita la **Modalità sviluppatore** (in alto a destra).
3. Fai clic su **Carica estensione non pacchettizzata** e seleziona la cartella di questo progetto.
4. Apri una chat di Claude e fai clic sull'icona dell'estensione per aprire le impostazioni.

Le scorciatoie da tastiera possono essere assegnate in `chrome://extensions/shortcuts` (per impostazione predefinita non
ne è impostata nessuna).

---

## 🔒 Privacy

L'estensione **non raccoglie alcun dato** — niente analitiche, niente telemetria, niente tracciamento.
Le impostazioni vengono memorizzate solo in `chrome.storage.local` sul tuo dispositivo. Le uniche
richieste di rete sono i **file dei font** scaricati da Google Fonts quando
selezioni un font scaricabile. Per i dettagli vedi [PRIVACY.md](PRIVACY.md).

---

## 📁 Struttura del progetto

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
        ├── theme-init.js
        ├── popup.css
        └── popup.js
```

---

## 📝 Licenza

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Fatto con ❤️ da **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
