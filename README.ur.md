# Claude Studio — Claude کے لیے RTL، کثیر اللسانی فونٹس اور تھیمز

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · **اردو** · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

<div dir="rtl">

ایک Manifest V3 براؤزر ایکسٹینشن جو **Claude** ویب ایپ (`claude.ai` /
`claude.com`) کو دائیں سے بائیں بناتی ہے اور آپ کو اس کی طباعت اور تھیم مکمل طور پر اپنی مرضی کے مطابق ترتیب دینے دیتی ہے۔

![icon](icons/icon128.png)

> **ایک خود مختار، غیر سرکاری ایکسٹینشن — Anthropic سے وابستہ، اس کی توثیق شدہ یا
> اس کی سرپرستی میں نہیں ہے۔ "Claude" Anthropic کا ٹریڈ مارک ہے۔**

---

## ✨ خصوصیات

- **دائیں سے بائیں اور سمت** — `Auto` (فی بلاک شناخت، دو لسانی گفتگو کے لیے بہترین)،
  جبری RTL، یا جبری LTR۔ Claude کے جوابات، آپ کے پیغامات، کمپوزر، اور سائڈبار کی
  چیٹ فہرست پر آزادانہ طور پر لاگو کریں۔
- **سیدھ** — آغاز (سمت کی پیروی کرتی ہے)، دائیں، درمیان، بائیں، یا برابر۔
- **50+ فونٹس، رسم الخط کے لحاظ سے گروپ بند** — فارسی، عربی، عبرانی، اردو، لاطینی،
  سیریلک، دیوناگری، جاپانی، چینی، کورین، تھائی، بنگالی — ایک قابلِ تلاش، پیش منظر
  دکھانے والے انتخاب کنندہ اور فی زبان فلٹر چپس کے ساتھ۔ متن، عنوانات، اور کوڈ کے
  لیے الگ الگ فونٹس — ہر ایک قابلِ ڈاؤن لوڈ ویب فونٹ (Google Fonts / jsDelivr)۔
- **طباعت** — فونٹ سائز، وزن، سطری اونچائی، حرف/لفظ/پیراگراف کا وقفہ، اور پڑھنے کی
  چوڑائی کی حد، سب کچھ براہِ راست سلائیڈرز کے ساتھ۔
- **مقامی ہندسے** — اعداد کو آپ کی زبان کے اپنے ہندسوں میں دکھائیں (فارسی، عربی،
  اردو، پشتو، ہندی، بنگالی، تھائی)۔ ان زبانوں کے لیے ایک وضاحت کے ساتھ مقفل جو پہلے
  سے معیاری مغربی ہندسے استعمال کرتی ہیں۔
- **ریاضی اور کوڈ درست رہتے ہیں** — KaTeX فارمولے اور کوڈ بلاک بائیں سے دائیں اور
  برقرار رہتے ہیں۔
- **Claude کی تھیمنگ** — Claude کو خود Auto / Light / Dark / ایک اعلیٰ تضاد والے
  Black کے درمیان تبدیل کریں، اس کے علاوہ ایک حسبِ ضرورت لہجہ رنگ۔
- **25 زبانوں کا انٹرفیس** — سیٹنگز پینل پہلی بار چلنے پر آپ کے براؤزر کی زبان خود
  بخود پہچان لیتا ہے اور 25 زبانوں میں مکمل طور پر ترجمہ شدہ ہے۔
- **براہِ راست پیش منظر** — اطلاق سے پہلے بالکل دیکھیں کہ Claude کیسا نظر آئے گا
  (اس کی اپنی تھیم + لہجہ)۔
- **پری سیٹس، برآمد/درآمد، حسبِ ضرورت CSS**، اور ایک نکھرا ہوا، کی بورڈ سے قابلِ
  رسائی UI جس میں light / dark / black / system پینل تھیمز ہیں۔

---

## 🚀 انسٹال کریں (ڈویلپر موڈ)

1. `chrome://extensions` کھولیں (Chrome، Edge، یا Brave)۔
2. **Developer mode** فعال کریں (اوپر دائیں)۔
3. **Load unpacked** پر کلک کریں اور اس پروجیکٹ فولڈر کو منتخب کریں۔
4. ایک Claude چیٹ کھولیں اور سیٹنگز کھولنے کے لیے ایکسٹینشن آئیکن پر کلک کریں۔

کی بورڈ شارٹ کٹس `chrome://extensions/shortcuts` پر تفویض کیے جا سکتے ہیں (بطورِ
طے شدہ کوئی بھی سیٹ نہیں ہے)۔

---

## 🔒 رازداری

یہ ایکسٹینشن **کوئی ڈیٹا جمع نہیں کرتی** — کوئی اینالیٹکس نہیں، کوئی ٹیلی میٹری نہیں،
کوئی ٹریکنگ نہیں۔ سیٹنگز صرف آپ کے آلے پر `chrome.storage.local` میں محفوظ ہوتی ہیں۔
واحد نیٹ ورک درخواستیں **فونٹ فائلیں** ہیں جو Google Fonts / jsDelivr سے اس وقت
حاصل کی جاتی ہیں جب آپ کوئی قابلِ ڈاؤن لوڈ فونٹ منتخب کرتے ہیں۔ تفصیلات کے لیے
[PRIVACY.md](PRIVACY.md) دیکھیں۔

---

## 📁 پروجیکٹ کی ساخت

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

## 📝 لائسنس

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

❤️ کے ساتھ **[ILYAGVC](https://github.com/ILYAGVC)** نے بنایا — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)

</div>
