<div dir="rtl">

# Claude Studio — راست‌چین، فونت‌های چندزبانه و تم‌ها برای Claude

[English](README.md) · **فارسی** · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

افزونه‌ای مرورگری (Manifest V3) که وب‌اپِ **Claude** (`claude.ai` / `claude.com`) را راست‌چین می‌کند و امکانِ سفارشی‌سازیِ کاملِ تایپوگرافی و تمِ آن را می‌دهد.

![icon](icons/icon128.png)

> **افزونه‌ای مستقل و غیررسمی — وابسته به Anthropic نیست و موردِ تأیید آن قرار ندارد. «Claude» علامتِ تجاریِ Anthropic است.**

---

## ✨ امکانات

- **راست‌چین و جهتِ متن** — «خودکار» (تشخیصِ جهت برای هر بلوک، بهترین گزینه برای گفتگوهای دوزبانه)، راست‌چینِ اجباری یا چپ‌چینِ اجباری. به‌صورتِ مستقل روی پاسخ‌های Claude، پیام‌های شما، کادرِ نوشتن و فهرستِ چت‌های نوارِ کناری اعمال می‌شود.
- **ترازبندی** — شروع (تابعِ جهت)، راست، وسط، چپ یا هم‌تراز.
- **بیش از ۵۰ فونت، گروه‌بندی‌شده بر اساسِ خط** — فارسی، عربی، عبری، اردو، لاتین، سیریلیک، دواناگری، ژاپنی، چینی، کره‌ای، تایلندی، بنگالی — با انتخابگرِ جستجوپذیر و پیش‌نمایش و چیپ‌های فیلترِ هر زبان. فونت‌های جدا برای متن، تیترها و کد — هرکدام یک فونتِ وبِ قابلِ دانلود (Google Fonts / jsDelivr).
- **تایپوگرافی** — اندازه، ضخامت، فاصلهٔ خطوط، فاصلهٔ حروف/کلمات/پاراگراف‌ها و محدودکردنِ عرضِ متن، همه با اسلایدرهای زنده.
- **ارقامِ محلی** — نمایشِ اعداد با ارقامِ زبانِ شما (فارسی، عربی، اردو، پشتو، هندی، بنگالی، تایلندی). برای زبان‌هایی که از ارقامِ استانداردِ غربی استفاده می‌کنند، همراه با توضیح قفل می‌شود.
- **ریاضی و کد سالم می‌مانند** — فرمول‌های KaTeX و بلوک‌های کد چپ‌چین و دست‌نخورده می‌مانند.
- **تم‌دهیِ Claude** — تغییرِ خودِ Claude بین خودکار / روشن / تیره / سیاهِ پُرکنتراست، به‌علاوهٔ رنگِ تأکیدِ دلخواه.
- **رابطِ ۲۵زبانه** — پنلِ تنظیمات در اولین اجرا زبانِ مرورگر را تشخیص می‌دهد و کاملاً به ۲۵ زبان ترجمه شده است.
- **پیش‌نمایشِ زنده** — پیش از اعمال، دقیقاً ببینید Claude چگونه می‌شود (تم و رنگِ تأکیدِ خودش).
- **پیش‌تنظیم‌ها، برون‌بری/درون‌بری، CSS سفارشی**، و رابطی صیقلی و در‌دسترس با تم‌های روشن / تیره / سیاه / سیستم برای پنل.

---

## 🚀 نصب (حالتِ توسعه‌دهنده)

۱. `chrome://extensions` را باز کنید (Chrome، Edge یا Brave).
۲. **حالتِ توسعه‌دهنده** (Developer mode) را از بالا-راست روشن کنید.
۳. روی **Load unpacked** بزنید و پوشهٔ این پروژه را انتخاب کنید.
۴. یک چتِ Claude باز کنید و روی آیکنِ افزونه بزنید تا تنظیمات باز شود.

میانبرهای صفحه‌کلید را می‌توان در `chrome://extensions/shortcuts` تنظیم کرد (به‌صورتِ پیش‌فرض چیزی تنظیم نشده است).

---

## 🔒 حریمِ خصوصی

این افزونه **هیچ داده‌ای جمع نمی‌کند** — بدونِ آنالیتیکس، تله‌متری یا ردیابی. تنظیمات فقط در `chrome.storage.local` روی دستگاهِ شما ذخیره می‌شوند. تنها درخواست‌های شبکه، **فایل‌های فونت** هستند که هنگامِ انتخابِ فونتِ قابلِ دانلود از Google Fonts / jsDelivr گرفته می‌شوند. برای جزئیات [PRIVACY.md](PRIVACY.md) را ببینید.

---

## 📁 ساختارِ پروژه

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

## 📝 مجوز

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

ساخته شده با ❤️ توسطِ **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)

</div>
