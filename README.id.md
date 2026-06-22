# Claude Studio — RTL, Font & Tema Multibahasa untuk Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · **Bahasa Indonesia** · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Ekstensi peramban Manifest V3 yang membuat aplikasi web **Claude** (`claude.ai` /
`claude.com`) menjadi kanan‑ke‑kiri dan memungkinkan Anda menyesuaikan tipografi serta temanya sepenuhnya.

![icon](icons/icon128.png)

> **Ekstensi independen dan tidak resmi — tidak berafiliasi dengan, didukung oleh, atau
> disponsori oleh Anthropic. “Claude” adalah merek dagang dari Anthropic.**

---

## ✨ Fitur

- **Kanan‑ke‑kiri & arah** — `Auto` (deteksi per‑blok, terbaik untuk obrolan
  dwibahasa), RTL paksa, atau LTR paksa. Terapkan secara independen pada balasan Claude,
  pesan Anda, penyusun pesan, dan daftar obrolan di bilah samping.
- **Perataan** — awal (mengikuti arah), kanan, tengah, kiri, atau rata kiri‑kanan.
- **50+ font, dikelompokkan berdasarkan aksara** — Persia, Arab, Ibrani, Urdu, Latin,
  Sirilik, Devanagari, Jepang, Tionghoa, Korea, Thai, Bengali — dengan pemilih yang
  dapat dicari dan menampilkan pratinjau serta cip filter per‑bahasa. Font terpisah untuk
  isi teks, judul, dan kode — masing‑masing font web yang dapat diunduh (Google Fonts / jsDelivr).
- **Tipografi** — ukuran font, ketebalan, tinggi baris, jarak huruf/kata/paragraf,
  serta batas lebar baca, semuanya dengan penggeser langsung.
- **Angka lokal** — tampilkan angka dalam digit bahasa Anda sendiri (Persia,
  Arab, Urdu, Pashto, Hindi, Bengali, Thai). Dikunci dengan penjelasan untuk bahasa
  yang sudah menggunakan digit Barat standar.
- **Matematika & kode tetap benar** — rumus KaTeX dan blok kode tetap
  kiri‑ke‑kanan dan utuh.
- **Penataan tema Claude** — alihkan Claude sendiri antara Auto / Terang / Gelap / Hitam
  kontras‑tinggi, ditambah warna aksen kustom.
- **Antarmuka 25‑bahasa** — panel pengaturan otomatis mendeteksi bahasa peramban
  Anda saat pertama dijalankan dan diterjemahkan sepenuhnya ke dalam 25 bahasa.
- **Pratinjau langsung** — lihat persis bagaimana tampilan Claude (tema dan aksennya sendiri)
  sebelum diterapkan.
- **Prasetel, ekspor/impor, CSS kustom**, dan antarmuka yang rapi serta dapat diakses
  dengan papan ketik dengan tema panel terang / gelap / hitam / sistem.

---

## 🚀 Pemasangan (mode pengembang)

1. Buka `chrome://extensions` (Chrome, Edge, atau Brave).
2. Aktifkan **Developer mode** (kanan‑atas).
3. Klik **Load unpacked** dan pilih folder proyek ini.
4. Buka obrolan Claude dan klik ikon ekstensi untuk membuka pengaturan.

Pintasan papan ketik dapat ditetapkan di `chrome://extensions/shortcuts` (tidak ada
yang diatur secara bawaan).

---

## 🔒 Privasi

Ekstensi ini **tidak mengumpulkan data apa pun** — tanpa analitik, tanpa telemetri, tanpa pelacakan.
Pengaturan hanya disimpan di `chrome.storage.local` pada perangkat Anda. Satu‑satunya
permintaan jaringan adalah **berkas font** yang diambil dari Google Fonts / jsDelivr saat Anda
memilih font yang dapat diunduh. Lihat [PRIVACY.md](PRIVACY.md) untuk detailnya.

---

## 📁 Struktur proyek

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

## 📝 Lisensi

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Dibuat dengan ❤️ oleh **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
