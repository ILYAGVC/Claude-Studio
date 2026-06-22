# Claude Studio — RTL, wielojęzyczne czcionki i motywy dla Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · **Polski** · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Rozszerzenie przeglądarki w standardzie Manifest V3, które sprawia, że aplikacja webowa **Claude** (`claude.ai` /
`claude.com`) działa od prawej do lewej, oraz pozwala w pełni dostosować jej typografię i motyw.

![icon](icons/icon128.png)

> **Niezależne, nieoficjalne rozszerzenie — niepowiązane z Anthropic, nieobjęte
> jego rekomendacją ani sponsoringiem. „Claude” jest znakiem towarowym Anthropic.**

---

## ✨ Funkcje

- **Od prawej do lewej i kierunek tekstu** — `Auto` (wykrywanie dla każdego bloku, najlepsze do dwujęzycznych
  rozmów), wymuszone RTL lub wymuszone LTR. Stosuj niezależnie do odpowiedzi Claude,
  Twoich wiadomości, pola edycji oraz listy czatów na pasku bocznym.
- **Wyrównanie** — do początku (zgodnie z kierunkiem), do prawej, do środka, do lewej lub wyjustowane.
- **Ponad 50 czcionek pogrupowanych według pisma** — perska, arabska, hebrajska, urdu, łacińska,
  cyrylica, dewanagari, japońska, chińska, koreańska, tajska, bengalska — z możliwością
  przeszukiwania, podglądem i filtrowaniem za pomocą etykiet dla poszczególnych języków. Osobne czcionki dla
  tekstu, nagłówków i kodu — każda to czcionka internetowa do pobrania (Google Fonts).
- **Typografia** — rozmiar czcionki, grubość, wysokość wiersza, odstępy między literami/słowami/akapitami
  oraz limit szerokości tekstu do czytania, wszystko z suwakami działającymi na żywo.
- **Lokalne cyfry** — wyświetlaj liczby w cyfrach właściwych dla Twojego języka (perskie,
  arabskie, urdu, paszto, hindi, bengalskie, tajskie). Funkcja jest zablokowana wraz z wyjaśnieniem dla języków,
  które i tak używają standardowych cyfr zachodnich.
- **Matematyka i kod pozostają poprawne** — wzory KaTeX oraz bloki kodu pozostają
  od lewej do prawej i nienaruszone.
- **Motywy Claude** — przełączaj samego Claude między Auto / Jasny / Ciemny / wysokokontrastową
  Czernią, a także ustaw własny kolor akcentu.
- **Interfejs w 25 językach** — panel ustawień automatycznie wykrywa język przeglądarki
  przy pierwszym uruchomieniu i jest w pełni przetłumaczony na 25 języków.
- **Podgląd na żywo** — zobacz dokładnie, jak będzie wyglądać Claude (jego własny motyw + akcent)
  przed zastosowaniem zmian.
- **Ustawienia wstępne, eksport/import, własny CSS** oraz dopracowany, dostępny z klawiatury interfejs
  z jasnym / ciemnym / czarnym / systemowym motywem panelu.

---

## 🚀 Instalacja (tryb dewelopera)

1. Otwórz `chrome://extensions` (Chrome, Edge lub Brave).
2. Włącz **Tryb dewelopera** (w prawym górnym rogu).
3. Kliknij **Załaduj rozpakowane** i wybierz folder tego projektu.
4. Otwórz czat Claude i kliknij ikonę rozszerzenia, aby otworzyć ustawienia.

Skróty klawiszowe można przypisać w `chrome://extensions/shortcuts` (domyślnie żadne nie są
ustawione).

---

## 🔒 Prywatność

Rozszerzenie **nie gromadzi żadnych danych** — żadnej analityki, telemetrii ani śledzenia.
Ustawienia są przechowywane wyłącznie w `chrome.storage.local` na Twoim urządzeniu. Jedyne
żądania sieciowe to **pliki czcionek** pobierane z Google Fonts, gdy
wybierzesz czcionkę do pobrania. Szczegóły znajdziesz w [PRIVACY.md](PRIVACY.md).

---

## 📁 Struktura projektu

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

## 📝 Licencja

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Stworzone z ❤️ przez **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
