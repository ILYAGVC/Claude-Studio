# Claude Studio — Claude için RTL, Çok Dilli Yazı Tipleri ve Temalar

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · **Türkçe** · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

**Claude** web uygulamasını (`claude.ai` / `claude.com`) sağdan sola yapan ve
tipografisini ile temasını tamamen özelleştirmenize olanak tanıyan bir Manifest V3
tarayıcı uzantısı.

![icon](icons/icon128.png)

> **Bağımsız, resmi olmayan bir uzantı — Anthropic ile bağlantılı değildir,
> Anthropic tarafından onaylanmamış veya desteklenmemektedir. "Claude", Anthropic'in
> ticari markasıdır.**

---

## ✨ Özellikler

- **Sağdan sola ve yön** — `Otomatik` (blok bazında algılama, iki dilli sohbetler
  için en iyisi), zorunlu RTL veya zorunlu LTR. Claude'un yanıtlarına, sizin
  mesajlarınıza, yazma alanına ve kenar çubuğundaki sohbet listesine bağımsız
  olarak uygulayın.
- **Hizalama** — başlangıç (yönü izler), sağ, orta, sol veya iki yana yasla.
- **Komut dosyasına göre gruplandırılmış 50'den fazla yazı tipi** — Farsça, Arapça,
  İbranice, Urduca, Latin, Kiril, Devanagari, Japonca, Çince, Korece, Tayca,
  Bengalce — aranabilir, önizlemeli bir seçici ve dile özel filtre etiketleriyle
  birlikte. Metin gövdesi, başlıklar ve kod için ayrı yazı tipleri — her biri
  indirilebilir bir web yazı tipi (Google Fonts / jsDelivr).
- **Tipografi** — yazı tipi boyutu, kalınlığı, satır yüksekliği, harf/kelime/paragraf
  aralığı ve okuma genişliği sınırı; hepsi canlı kaydırıcılarla.
- **Yerel rakamlar** — sayıları kendi dilinizin rakamlarıyla gösterin (Farsça,
  Arapça, Urduca, Peştuca, Hintçe, Bengalce, Tayca). Zaten standart Batı rakamlarını
  kullanan diller için bir açıklamayla birlikte kilitlenmiştir.
- **Matematik ve kod doğru kalır** — KaTeX formülleri ve kod blokları soldan sağa
  ve bozulmadan kalır.
- **Claude teması** — Claude'un kendisini Otomatik / Açık / Koyu / yüksek kontrastlı
  bir Siyah arasında değiştirin, ayrıca özel bir vurgu rengi ekleyin.
- **25 dilli arayüz** — ayarlar paneli ilk çalıştırmada tarayıcı dilinizi otomatik
  olarak algılar ve 25 dile tamamen çevrilmiştir.
- **Canlı önizleme** — uygulamadan önce Claude'un tam olarak nasıl görüneceğini
  (kendi teması + vurgu rengi) görün.
- **Hazır ayarlar, dışa/içe aktarma, özel CSS** ve açık / koyu / siyah / sistem panel
  temalarıyla cilalı, klavyeyle erişilebilir bir arayüz.

---

## 🚀 Kurulum (geliştirici modu)

1. `chrome://extensions` adresini açın (Chrome, Edge veya Brave).
2. **Geliştirici modunu** etkinleştirin (sağ üst).
3. **Paketlenmemiş öğe yükle**'ye tıklayın ve bu proje klasörünü seçin.
4. Bir Claude sohbeti açın ve ayarları açmak için uzantı simgesine tıklayın.

Klavye kısayolları `chrome://extensions/shortcuts` adresinden atanabilir (varsayılan
olarak hiçbiri ayarlanmamıştır).

---

## 🔒 Gizlilik

Uzantı **hiçbir veri toplamaz** — analiz yok, telemetri yok, izleme yok. Ayarlar
yalnızca cihazınızdaki `chrome.storage.local` içinde saklanır. Tek ağ istekleri,
indirilebilir bir yazı tipi seçtiğinizde Google Fonts / jsDelivr üzerinden alınan
**yazı tipi dosyalarıdır**. Ayrıntılar için [PRIVACY.md](PRIVACY.md) dosyasına bakın.

---

## 📁 Proje yapısı

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

## 📝 Lisans

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

**[ILYAGVC](https://github.com/ILYAGVC)** tarafından ❤️ ile yapıldı — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
