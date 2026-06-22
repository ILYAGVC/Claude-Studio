# Claude Studio — RTL, גופנים רב-לשוניים וערכות נושא ל-Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · **עברית** · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

<div dir="rtl">

תוסף דפדפן מבוסס Manifest V3 שהופך את אפליקציית הווב של **Claude** (`claude.ai` /
`claude.com`) לפעולה מימין לשמאל ומאפשר לך להתאים אישית באופן מלא את הטיפוגרפיה וערכת הנושא שלה.

![icon](icons/icon128.png)

> **תוסף עצמאי ולא רשמי — אינו קשור, מאושר או ממומן
> על ידי Anthropic. "Claude" הוא סימן מסחרי של Anthropic.**

---

## ✨ תכונות

- **מימין לשמאל וכיווניות** — `אוטומטי` (זיהוי לפי בלוק, מתאים ביותר לשיחות
  דו-לשוניות), RTL כפוי, או LTR כפוי. החל באופן עצמאי על התשובות של Claude,
  על ההודעות שלך, על תיבת הכתיבה, ועל רשימת השיחות בסרגל הצד.
- **יישור** — התחלה (עוקב אחר הכיווניות), ימין, מרכז, שמאל, או יישור לשני הצדדים.
- **למעלה מ-50 גופנים, מקובצים לפי כתב** — פרסית, ערבית, עברית, אורדו, לטינית,
  קירילית, דוונאגרי, יפנית, סינית, קוריאנית, תאית, בנגלית — עם בורר
  הניתן לחיפוש ומציג תצוגה מקדימה, ושבבי סינון לכל שפה. גופנים נפרדים עבור
  גוף הטקסט, כותרות, וקוד — כל אחד גופן ווב הניתן להורדה (Google Fonts / jsDelivr).
- **טיפוגרפיה** — גודל גופן, משקל, גובה שורה, ריווח אותיות/מילים/פסקאות,
  והגבלת רוחב קריאה, כולם עם מחוונים חיים.
- **ספרות מקומיות** — הצג מספרים בספרות של השפה שלך (פרסית,
  ערבית, אורדו, פשטו, הינדי, בנגלית, תאית). נעול עם הסבר עבור שפות
  שכבר משתמשות בספרות מערביות סטנדרטיות.
- **מתמטיקה וקוד נשארים תקינים** — נוסחאות KaTeX ובלוקי קוד נשארים
  משמאל לימין וללא פגיעה.
- **ערכות נושא של Claude** — החלף את Claude עצמו בין אוטומטי / בהיר / כהה /
  שחור בניגודיות גבוהה, בנוסף לצבע הדגשה מותאם אישית.
- **ממשק ב-25 שפות** — פאנל ההגדרות מזהה אוטומטית את שפת הדפדפן
  שלך בהפעלה הראשונה ומתורגם באופן מלא ל-25 שפות.
- **תצוגה מקדימה חיה** — ראה בדיוק כיצד Claude ייראה (ערכת הנושא והצבע שלו)
  לפני ההחלה.
- **קביעות מוגדרות מראש, ייצוא/ייבוא, CSS מותאם אישית**, וממשק משתמש מלוטש
  ונגיש למקלדת עם ערכות נושא בהירה / כהה / שחורה / מערכת לפאנל.

---

## 🚀 התקנה (מצב מפתח)

1. פתח את `chrome://extensions` (Chrome, Edge, או Brave).
2. הפעל את **מצב מפתח** (בפינה הימנית העליונה).
3. לחץ על **טעינת חבילה לא ארוזה** ובחר את תיקיית הפרויקט הזו.
4. פתח שיחת Claude ולחץ על סמל התוסף כדי לפתוח את ההגדרות.

ניתן להקצות קיצורי מקלדת בכתובת `chrome://extensions/shortcuts` (אין כאלה
מוגדרים כברירת מחדל).

---

## 🔒 פרטיות

התוסף **אינו אוסף כל מידע** — ללא אנליטיקה, ללא טלמטריה, ללא מעקב.
ההגדרות נשמרות אך ורק ב-`chrome.storage.local` במכשיר שלך. בקשות הרשת היחידות
הן **קובצי גופנים** הנמשכים מ-Google Fonts / jsDelivr כאשר אתה
בוחר גופן הניתן להורדה. ראה [PRIVACY.md](PRIVACY.md) לפרטים.

---

## 📁 מבנה הפרויקט

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

## 📝 רישיון

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

נעשה עם ❤️ על ידי **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)

</div>
