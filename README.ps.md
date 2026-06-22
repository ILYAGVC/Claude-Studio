# Claude Studio — د Claude لپاره RTL، څو ژبني فونټونه او ښکلاوې

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · **پښتو**

<div dir="rtl">

د Manifest V3 یوه براوزر توسیع چې د **Claude** ویب اپ (`claude.ai` /
`claude.com`) له ښي نه کیڼ ته اړوي او پرېږدي چې د هغه ټایپوګرافي او ښکلا په بشپړه توګه دلخواه کړئ.

![icon](icons/icon128.png)

> **خپلواکه، غیر رسمي توسیع — له Anthropic سره تړاو نه لري، نه يې تاييد شوې او نه يې سپانسر شوې ده. «Claude» د Anthropic سوداګریزه نښه ده.**

---

## ✨ ځانګړتیاوې

- **له ښي نه کیڼ ته او لوری** — `Auto` (د هرې برخې پر بنسټ پېژندنه، د دوه ژبو خبرو اترو لپاره غوره)، اجباري RTL، یا اجباري LTR. په خپلواکه توګه د Claude پر ځوابونو، ستاسو پیغامونو، لیکونکي او د څنګ پټې د خبرو اترو پر لیست تطبیق کړئ.
- **سمون** — پیل (له لوري سره مل وي)، ښي، منځ، کیڼ، یا برابر (justify).
- **۵۰+ فونټونه، د لیکدود له مخې ډلبندي** — فارسي، عربي، عبري، اردو، لاتین،
  سیریلیک، دیواناګري، جاپاني، چینایي، کوریایي، تایلنډي، بنګالي — د لټون وړ، د مخکتنې لرونکي ټاکونکي او د هرې ژبې د فلټر چپس سره. د متن، سرلیکونو او کوډ لپاره جلا فونټونه — هر یو د ښکته کېدو وړ ویب فونټ (Google Fonts / jsDelivr).
- **ټایپوګرافي** — د فونټ کچه، وزن، د کرښې لوړوالی، د توري/کلمې/پاراګراف فاصله،
  او د لوستلو د سور برید، ټول له ژوندیو سلایډرونو سره.
- **محلي ارقام** — شمېرې ستاسو د ژبې په خپلو ارقامو کې وښیئ (فارسي،
  عربي، اردو، پښتو، هندي، بنګالي، تایلنډي). د هغو ژبو لپاره چې لا دمخه معیاري لویدیځ ارقام کاروي له تشرېح سره بند شوي.
- **ریاضي او کوډ سم پاتې کیږي** — د KaTeX فورمولونه او د کوډ بلاکونه
  له کیڼ نه ښي ته او سالم پاتې کیږي.
- **د Claude ښکلا** — Claude پخپله د Auto / روښانه / تور / لوړ تضاد لرونکي تور تر منځ بدل کړئ، سربېره پر دې یو دلخواه تاکیدي رنګ.
- **۲۵ ژبني انٹرفیس** — د تنظیماتو پینل په لومړي ځل پرانیستلو سره ستاسو د براوزر ژبه پخپله پېژني او په بشپړه توګه په ۲۵ ژبو ژباړل شوی دی.
- **ژوندۍ مخکتنه** — د تطبیق کولو دمخه دقیقاً وګورئ چې Claude به څنګه ښکاري (د هغه خپله ښکلا + تاکیدي رنګ).
- **وړاندې جوړ شوي ترتیبونه، صادرول/واردول، دلخواه CSS**، او یو ښکلی، د کیبورډ له لارې د لاسرسي وړ UI چې د روښانه / تور / تور / سیسټم پینل ښکلاوې لري.

---

## 🚀 لګول (د پراختیا کوونکي حالت)

1. `chrome://extensions` پرانیزئ (Chrome، Edge، یا Brave).
2. **د پراختیا کوونکي حالت** (پورتنۍ ښي خوا) فعال کړئ.
3. پر **Load unpacked** کلیک وکړئ او د دې پروژې فولډر وټاکئ.
4. د Claude یوه خبره اترې پرانیزئ او د تنظیماتو پرانیستلو لپاره د توسیع پر آیکن کلیک وکړئ.

د کیبورډ شارټ کټونه په `chrome://extensions/shortcuts` کې ټاکل کیدای شي (په پیل کې هیڅ یو نه دی ټاکل شوی).

---

## 🔒 محرمیت

دا توسیع **هیڅ ډاټا نه راټولوي** — نه تحلیل، نه ټیلیمیټري، نه څارنه.
تنظیمات یوازې ستاسو پر وسیله کې په `chrome.storage.local` کې خوندي کیږي. یوازینۍ
شبکه يي غوښتنې **د فونټ فایلونه** دي چې له Google Fonts / jsDelivr نه راوړل کیږي کله چې تاسو یو د ښکته کېدو وړ فونټ وټاکئ. د نورو معلوماتو لپاره [PRIVACY.md](PRIVACY.md) وګورئ.

---

## 📁 د پروژې جوړښت

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

## 📝 جواز

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

په ❤️ سره جوړ شوی د **[ILYAGVC](https://github.com/ILYAGVC)** لخوا — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)

</div>
