<div dir="rtl">

# Claude Studio — RTL وخطوط متعددة اللغات وسمات لـ Claude

[English](README.md) · [فارسی](README.fa.md) · **العربية** · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

إضافة متصفح (Manifest V3) تجعل تطبيق **Claude** على الويب (`claude.ai` / `claude.com`) من اليمين إلى اليسار، وتتيح لك تخصيص طباعته وسمته بالكامل.

![icon](icons/icon128.png)

> **إضافة مستقلة وغير رسمية — لا صلة لها بشركة Anthropic ولا اعتماد منها. «Claude» علامة تجارية مملوكة لشركة Anthropic.**

---

## ✨ الميزات

- **الاتجاه ومن اليمين لليسار** — «تلقائي» (كشف اتجاه كل فقرة، الأفضل للمحادثات ثنائية اللغة)، أو RTL إجباري، أو LTR إجباري. يُطبَّق بشكل مستقل على ردود Claude ورسائلك ومربع الكتابة وقائمة المحادثات في الشريط الجانبي.
- **المحاذاة** — البداية (تتبع الاتجاه)، يمين، توسيط، يسار، أو ضبط.
- **أكثر من 50 خطاً مجمَّعة حسب الكتابة** — الفارسية والعربية والعبرية والأردية واللاتينية والسيريلية والديفاناغارية واليابانية والصينية والكورية والتايلاندية والبنغالية — مع منتقٍ قابل للبحث وللمعاينة وشرائح تصفية لكل لغة. خطوط منفصلة للنص والعناوين والشيفرة — كلٌّ منها خط ويب قابل للتنزيل (Google Fonts / jsDelivr).
- **الطباعة** — حجم الخط وسماكته وتباعد الأسطر والحروف والكلمات والفقرات وحد عرض القراءة، كلها بأشرطة تمرير حية.
- **الأرقام المحلية** — عرض الأرقام بأرقام لغتك (الفارسية والعربية والأردية والبشتو والهندية والبنغالية والتايلاندية). تُقفَل مع شرح للغات التي تستخدم الأرقام الغربية القياسية أصلاً.
- **الرياضيات والشيفرة تبقى سليمة** — تبقى صيغ KaTeX وكتل الشيفرة من اليسار إلى اليمين وسليمة.
- **سمات Claude** — تبديل Claude نفسه بين تلقائي / فاتح / داكن / أسود عالي التباين، إضافةً إلى لون مميِّز مخصص.
- **واجهة بـ 25 لغة** — تكتشف لوحة الإعدادات لغة متصفحك عند أول تشغيل، وهي مترجمة بالكامل إلى 25 لغة.
- **معاينة حية** — شاهد بالضبط كيف سيبدو Claude (بسمته ولونه المميِّز) قبل التطبيق.
- **إعدادات مسبقة وتصدير/استيراد وCSS مخصص**، وواجهة أنيقة يمكن الوصول إليها بلوحة المفاتيح مع سمات فاتح / داكن / أسود / حسب النظام.

---

## 🚀 التثبيت (وضع المطوّر)

1. افتح `chrome://extensions` (Chrome أو Edge أو Brave).
2. فعِّل **وضع المطوّر** (Developer mode) من أعلى اليمين.
3. انقر **Load unpacked** واختر مجلد هذا المشروع.
4. افتح محادثة Claude وانقر أيقونة الإضافة لفتح الإعدادات.

يمكن تعيين اختصارات لوحة المفاتيح من `chrome://extensions/shortcuts` (لا شيء مُعيَّن افتراضياً).

---

## 🔒 الخصوصية

الإضافة **لا تجمع أي بيانات** — لا تحليلات ولا قياس عن بُعد ولا تتبُّع. تُحفظ الإعدادات فقط في `chrome.storage.local` على جهازك. طلبات الشبكة الوحيدة هي **ملفات الخطوط** التي تُجلب من Google Fonts / jsDelivr عند اختيار خط قابل للتنزيل. راجع [PRIVACY.md](PRIVACY.md) للتفاصيل.

---

## 📁 بنية المشروع

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

## 📝 الترخيص

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

صُنع بـ ❤️ بواسطة **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)

</div>
