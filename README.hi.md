# Claude Studio — Claude के लिए RTL, बहुभाषी फ़ॉन्ट और थीम

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · **हिन्दी** · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

एक Manifest V3 ब्राउज़र एक्सटेंशन जो **Claude** वेब ऐप (`claude.ai` /
`claude.com`) को दाएँ‑से‑बाएँ बनाता है और आपको इसकी टाइपोग्राफ़ी और थीम को पूरी तरह से अनुकूलित करने देता है।

![icon](icons/icon128.png)

> **स्वतंत्र, अनौपचारिक एक्सटेंशन — Anthropic से संबद्ध, समर्थित या
> प्रायोजित नहीं है। “Claude” Anthropic का एक ट्रेडमार्क है।**

---

## ✨ विशेषताएँ

- **दाएँ‑से‑बाएँ और दिशा** — `Auto` (प्रति‑ब्लॉक पहचान, द्विभाषी
  चैट के लिए सर्वोत्तम), बलपूर्वक RTL, या बलपूर्वक LTR। इसे Claude के उत्तरों,
  आपके संदेशों, कंपोज़र, और साइडबार चैट सूची पर स्वतंत्र रूप से लागू करें।
- **संरेखण** — start (दिशा के अनुसार), दाएँ, मध्य, बाएँ, या जस्टिफ़ाई।
- **50+ फ़ॉन्ट, लिपि के अनुसार समूहित** — Persian, Arabic, Hebrew, Urdu, Latin,
  Cyrillic, Devanagari, Japanese, Chinese, Korean, Thai, Bengali — एक
  खोजने योग्य, पूर्वावलोकन वाले पिकर और प्रति‑भाषा फ़िल्टर चिप्स के साथ। बॉडी,
  शीर्षकों, और कोड के लिए अलग‑अलग फ़ॉन्ट — प्रत्येक एक डाउनलोड करने योग्य वेब फ़ॉन्ट (Google Fonts / jsDelivr)।
- **टाइपोग्राफ़ी** — फ़ॉन्ट आकार, वज़न, पंक्ति ऊँचाई, अक्षर/शब्द/पैराग्राफ़ अंतराल,
  और पठन‑चौड़ाई की सीमा, सभी लाइव स्लाइडर के साथ।
- **स्थानीय अंक** — संख्याओं को आपकी भाषा के अपने अंकों में दिखाएँ (Persian,
  Arabic, Urdu, Pashto, Hindi, Bengali, Thai)। उन भाषाओं के लिए स्पष्टीकरण के साथ लॉक किया गया है
  जो पहले से ही मानक पश्चिमी अंकों का उपयोग करती हैं।
- **गणित और कोड सही रहते हैं** — KaTeX सूत्र और कोड ब्लॉक
  बाएँ‑से‑दाएँ और अक्षुण्ण रहते हैं।
- **Claude थीमिंग** — Claude को स्वयं Auto / Light / Dark / उच्च‑कंट्रास्ट
  Black के बीच बदलें, साथ ही एक कस्टम एक्सेंट रंग।
- **25‑भाषा इंटरफ़ेस** — सेटिंग्स पैनल पहली बार चलने पर आपकी ब्राउज़र
  भाषा का स्वतः पता लगाता है और पूरी तरह से 25 भाषाओं में अनुवादित है।
- **लाइव पूर्वावलोकन** — लागू करने से पहले देखें कि Claude वास्तव में कैसा दिखेगा (इसकी
  अपनी थीम + एक्सेंट)।
- **प्रीसेट, निर्यात/आयात, कस्टम CSS**, और एक परिष्कृत, कीबोर्ड‑सुलभ UI
  जिसमें light / dark / black / system पैनल थीम हैं।

---

## 🚀 इंस्टॉल करें (डेवलपर मोड)

1. `chrome://extensions` खोलें (Chrome, Edge, या Brave)।
2. **Developer mode** सक्षम करें (ऊपर‑दाएँ)।
3. **Load unpacked** पर क्लिक करें और इस प्रोजेक्ट फ़ोल्डर का चयन करें।
4. एक Claude चैट खोलें और सेटिंग्स खोलने के लिए एक्सटेंशन आइकन पर क्लिक करें।

कीबोर्ड शॉर्टकट `chrome://extensions/shortcuts` पर असाइन किए जा सकते हैं (डिफ़ॉल्ट रूप से कोई
सेट नहीं है)।

---

## 🔒 गोपनीयता

यह एक्सटेंशन **कोई डेटा एकत्र नहीं करता** — कोई एनालिटिक्स नहीं, कोई टेलीमेट्री नहीं, कोई ट्रैकिंग नहीं।
सेटिंग्स केवल आपके डिवाइस पर `chrome.storage.local` में संग्रहीत होती हैं। एकमात्र
नेटवर्क अनुरोध **फ़ॉन्ट फ़ाइलें** हैं जो आपके द्वारा डाउनलोड करने योग्य फ़ॉन्ट चुनने पर Google Fonts / jsDelivr से
प्राप्त की जाती हैं। विवरण के लिए [PRIVACY.md](PRIVACY.md) देखें।

---

## 📁 प्रोजेक्ट संरचना

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

## 📝 लाइसेंस

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

❤️ के साथ **[ILYAGVC](https://github.com/ILYAGVC)** द्वारा बनाया गया — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
