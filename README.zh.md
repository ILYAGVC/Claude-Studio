# Claude Studio — 为 Claude 提供 RTL、多语言字体与主题

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · **中文** · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

一款基于 Manifest V3 的浏览器扩展，能让 **Claude** 网页应用（`claude.ai` /
`claude.com`）变为从右到左（RTL）显示，并允许你完全自定义其排版与主题。

![icon](icons/icon128.png)

> **这是一款独立的非官方扩展——与 Anthropic 无任何隶属、背书或赞助关系。“Claude”
> 是 Anthropic 的商标。**

---

## ✨ 功能特性

- **从右到左与文字方向** — `Auto`（按区块自动检测，最适合双语对话）、强制 RTL 或
  强制 LTR。可分别应用于 Claude 的回复、你的消息、输入框以及侧边栏的对话列表。
- **对齐方式** — 起始对齐（跟随文字方向）、右对齐、居中、左对齐或两端对齐。
- **50+ 字体，按文字系统分组** — 波斯语、阿拉伯语、希伯来语、乌尔都语、拉丁语、
  西里尔语、天城文、日语、中文、韩语、泰语、孟加拉语——配有可搜索、可预览的选择器
  以及按语言筛选的标签。正文、标题和代码可分别设置字体——每种都是可下载的网络字体（Google Fonts）。
- **排版** — 字号、字重、行高、字间距/词间距/段间距，以及阅读宽度限制，全部支持实时
  滑块调节。
- **本地数字** — 以你所用语言自身的数字显示（波斯语、阿拉伯语、乌尔都语、普什图语、
  印地语、孟加拉语、泰语）。对于已经使用标准西方数字的语言，此选项被锁定并附有说明。
- **数学与代码保持正确** — KaTeX 公式和代码块始终保持从左到右且完整无误。
- **Claude 主题** — 将 Claude 本身在 Auto / 浅色 / 深色 / 高对比度纯黑之间切换，
  并可设置自定义强调色。
- **25 种语言的界面** — 设置面板在首次运行时会自动检测你的浏览器语言，并已完整翻译为
  25 种语言。
- **实时预览** — 在应用前即可准确查看 Claude 的外观（其自身主题 + 强调色）。
- **预设、导出/导入、自定义 CSS**，以及一个精致、可通过键盘操作的界面，面板主题支持
  浅色 / 深色 / 纯黑 / 跟随系统。

---

## 🚀 安装（开发者模式）

1. 打开 `chrome://extensions`（Chrome、Edge 或 Brave）。
2. 启用 **开发者模式**（右上角）。
3. 点击 **加载已解压的扩展程序**，并选择此项目文件夹。
4. 打开一个 Claude 对话，点击扩展图标即可打开设置。

可在 `chrome://extensions/shortcuts` 处分配键盘快捷键（默认未设置任何快捷键）。

---

## 🔒 隐私

本扩展 **不收集任何数据**——没有分析统计，没有遥测，没有跟踪。设置仅存储在你设备上的
`chrome.storage.local` 中。唯一的网络请求是当你选择可下载字体时，从 Google Fonts
获取的 **字体文件**。详情请参阅 [PRIVACY.md](PRIVACY.md)。

---

## 📁 项目结构

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

## 📝 许可证

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

由 **[ILYAGVC](https://github.com/ILYAGVC)** 用 ❤️ 制作 — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
