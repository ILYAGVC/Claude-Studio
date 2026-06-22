# Claude Studio — Claude-এর জন্য RTL, বহুভাষিক ফন্ট ও থিম

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · **বাংলা** · [پښتو](README.ps.md)

একটি Manifest V3 ব্রাউজার এক্সটেনশন যা **Claude** ওয়েব অ্যাপকে (`claude.ai` /
`claude.com`) ডান-থেকে-বাম করে তোলে এবং আপনাকে এর টাইপোগ্রাফি ও থিম সম্পূর্ণরূপে কাস্টমাইজ করতে দেয়।

![icon](icons/icon128.png)

> **স্বাধীন, অনানুষ্ঠানিক এক্সটেনশন — Anthropic-এর সাথে যুক্ত নয়, Anthropic দ্বারা
> অনুমোদিত বা পৃষ্ঠপোষকতাপ্রাপ্ত নয়। “Claude” হলো Anthropic-এর একটি ট্রেডমার্ক।**

---

## ✨ বৈশিষ্ট্য

- **ডান-থেকে-বাম ও দিকনির্দেশ** — `Auto` (প্রতি-ব্লক শনাক্তকরণ, দ্বিভাষিক
  চ্যাটের জন্য সেরা), বাধ্যতামূলক RTL, অথবা বাধ্যতামূলক LTR। Claude-এর উত্তর,
  আপনার বার্তা, কম্পোজার, এবং সাইডবার চ্যাট তালিকায় স্বাধীনভাবে প্রয়োগ করুন।
- **প্রান্তিককরণ** — শুরু (দিকনির্দেশ অনুসরণ করে), ডান, কেন্দ্র, বাম, অথবা জাস্টিফাই।
- **স্ক্রিপ্ট অনুযায়ী সাজানো ৫০+ ফন্ট** — ফারসি, আরবি, হিব্রু, উর্দু, ল্যাটিন,
  সিরিলিক, দেবনাগরী, জাপানি, চীনা, কোরীয়, থাই, বাংলা — একটি অনুসন্ধানযোগ্য,
  প্রিভিউসহ পিকার এবং প্রতি-ভাষা ফিল্টার চিপসহ। বডি, শিরোনাম, এবং কোডের জন্য আলাদা
  ফন্ট — প্রতিটি একটি ডাউনলোডযোগ্য ওয়েব ফন্ট (Google Fonts / jsDelivr)।
- **টাইপোগ্রাফি** — ফন্ট আকার, ওজন, লাইন উচ্চতা, অক্ষর/শব্দ/অনুচ্ছেদ ব্যবধান, এবং
  একটি পড়ার-প্রস্থ সীমা, সবগুলোই লাইভ স্লাইডারসহ।
- **স্থানীয় সংখ্যা** — আপনার ভাষার নিজস্ব অঙ্কে সংখ্যা দেখান (ফারসি, আরবি, উর্দু,
  পশতু, হিন্দি, বাংলা, থাই)। যেসব ভাষা ইতিমধ্যে আদর্শ পশ্চিমা অঙ্ক ব্যবহার করে,
  সেগুলোর জন্য একটি ব্যাখ্যাসহ লক করা।
- **গণিত ও কোড সঠিক থাকে** — KaTeX সূত্র এবং কোড ব্লক ডান-থেকে-বাম না হয়ে
  বাম-থেকে-ডান এবং অক্ষত থাকে।
- **Claude থিমিং** — Claude-কে নিজেই Auto / Light / Dark / উচ্চ-কনট্রাস্ট
  Black-এর মধ্যে পরিবর্তন করুন, সাথে একটি কাস্টম অ্যাকসেন্ট রঙ।
- **২৫-ভাষার ইন্টারফেস** — সেটিংস প্যানেল প্রথমবার চালানোর সময় আপনার ব্রাউজার ভাষা
  স্বয়ংক্রিয়ভাবে শনাক্ত করে এবং ২৫টি ভাষায় সম্পূর্ণ অনূদিত।
- **লাইভ প্রিভিউ** — প্রয়োগ করার আগে Claude দেখতে ঠিক কেমন হবে (এর নিজস্ব থিম +
  অ্যাকসেন্ট) তা দেখুন।
- **প্রিসেট, এক্সপোর্ট/ইমপোর্ট, কাস্টম CSS**, এবং একটি পরিমার্জিত, কীবোর্ড-অ্যাক্সেসযোগ্য
  UI যাতে রয়েছে light / dark / black / system প্যানেল থিম।

---

## 🚀 ইনস্টল (ডেভেলপার মোড)

1. `chrome://extensions` খুলুন (Chrome, Edge, অথবা Brave)।
2. **Developer mode** সক্রিয় করুন (উপরে-ডানে)।
3. **Load unpacked** ক্লিক করুন এবং এই প্রজেক্ট ফোল্ডারটি নির্বাচন করুন।
4. একটি Claude চ্যাট খুলুন এবং সেটিংস খুলতে এক্সটেনশন আইকনে ক্লিক করুন।

কীবোর্ড শর্টকাট `chrome://extensions/shortcuts`-এ বরাদ্দ করা যায় (ডিফল্টরূপে কোনোটি
সেট করা নেই)।

---

## 🔒 গোপনীয়তা

এক্সটেনশনটি **কোনো ডেটা সংগ্রহ করে না** — কোনো অ্যানালিটিক্স নেই, কোনো টেলিমেট্রি নেই,
কোনো ট্র্যাকিং নেই। সেটিংস শুধুমাত্র আপনার ডিভাইসে `chrome.storage.local`-এ সংরক্ষিত
হয়। একমাত্র নেটওয়ার্ক অনুরোধ হলো **ফন্ট ফাইল** যা আপনি একটি ডাউনলোডযোগ্য ফন্ট
নির্বাচন করলে Google Fonts / jsDelivr থেকে আনা হয়। বিস্তারিত জানতে
[PRIVACY.md](PRIVACY.md) দেখুন।

---

## 📁 প্রজেক্ট কাঠামো

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

## 📝 লাইসেন্স

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

❤️ দিয়ে তৈরি করেছেন **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
