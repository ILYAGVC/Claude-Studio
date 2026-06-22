# Claude Studio — RTL, polices multilingues et thèmes pour Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · **Français** · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Une extension de navigateur Manifest V3 qui rend l'application web **Claude** (`claude.ai` /
`claude.com`) de droite à gauche et vous permet de personnaliser entièrement sa typographie et son thème.

![icon](icons/icon128.png)

> **Extension indépendante et non officielle — non affiliée à Anthropic, ni
> approuvée ou sponsorisée par celle-ci. « Claude » est une marque déposée d'Anthropic.**

---

## ✨ Fonctionnalités

- **De droite à gauche et direction** — `Auto` (détection par bloc, idéale pour les
  conversations bilingues), RTL forcé ou LTR forcé. À appliquer indépendamment aux réponses
  de Claude, à vos messages, à l'éditeur et à la liste des conversations de la barre latérale.
- **Alignement** — au début (suit la direction), à droite, au centre, à gauche ou justifié.
- **Plus de 50 polices, regroupées par écriture** — persan, arabe, hébreu, ourdou, latin,
  cyrillique, devanagari, japonais, chinois, coréen, thaï, bengali — avec un sélecteur
  consultable et avec aperçu ainsi que des filtres par langue. Des polices distinctes pour
  le corps de texte, les titres et le code — chacune étant une police web téléchargeable (Google Fonts / jsDelivr).
- **Typographie** — taille, graisse, hauteur de ligne, espacement des lettres/mots/paragraphes
  et une limite de largeur de lecture, le tout avec des curseurs en direct.
- **Chiffres locaux** — affichez les nombres dans les chiffres propres à votre langue (persan,
  arabe, ourdou, pachto, hindi, bengali, thaï). Verrouillé avec une explication pour les langues
  qui utilisent déjà les chiffres occidentaux standard.
- **Les maths et le code restent corrects** — les formules KaTeX et les blocs de code restent
  de gauche à droite et intacts.
- **Thème de Claude** — basculez Claude lui-même entre Auto / Clair / Sombre / un
  noir à fort contraste, plus une couleur d'accentuation personnalisée.
- **Interface en 25 langues** — le panneau de paramètres détecte automatiquement la langue de
  votre navigateur au premier lancement et est entièrement traduit en 25 langues.
- **Aperçu en direct** — voyez exactement à quoi ressemblera Claude (son propre thème + accentuation)
  avant d'appliquer.
- **Préréglages, export/import, CSS personnalisé**, et une interface soignée et accessible au
  clavier avec des thèmes de panneau clair / sombre / noir / système.

---

## 🚀 Installation (mode développeur)

1. Ouvrez `chrome://extensions` (Chrome, Edge ou Brave).
2. Activez le **mode développeur** (en haut à droite).
3. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez ce dossier de projet.
4. Ouvrez une conversation Claude et cliquez sur l'icône de l'extension pour ouvrir les paramètres.

Des raccourcis clavier peuvent être attribués à `chrome://extensions/shortcuts` (aucun n'est
défini par défaut).

---

## 🔒 Confidentialité

L'extension **ne collecte aucune donnée** — pas d'analyse, pas de télémétrie, pas de suivi.
Les paramètres sont stockés uniquement dans `chrome.storage.local` sur votre appareil. Les seules
requêtes réseau sont les **fichiers de polices** récupérés depuis Google Fonts / jsDelivr lorsque vous
sélectionnez une police téléchargeable. Voir [PRIVACY.md](PRIVACY.md) pour plus de détails.

---

## 📁 Structure du projet

```
.
├── manifest.json              # MV3 manifest
├── icons/                     # icon.svg + 16/32/48/128 PNGs
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

## 📝 Licence

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Réalisé avec ❤️ par **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
