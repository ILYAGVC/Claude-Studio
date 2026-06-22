# Claude Studio — Claude 向けの RTL、多言語フォント、テーマ

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · **日本語** · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

**Claude** ウェブアプリ（`claude.ai` /
`claude.com`）を右から左（RTL）に変え、タイポグラフィとテーマを自由にカスタマイズできる Manifest V3 ブラウザ拡張機能です。

![icon](icons/icon128.png)

> **これは独立した非公式の拡張機能であり、Anthropic と提携・承認・後援関係にはありません。「Claude」は Anthropic の商標です。**

---

## ✨ 機能

- **右から左（RTL）と書字方向** — `自動`（ブロックごとに検出、バイリンガルのチャットに最適）、強制 RTL、または強制 LTR。Claude の返信、あなたのメッセージ、入力欄、サイドバーのチャット一覧に、それぞれ独立して適用できます。
- **配置** — 行頭（書字方向に従う）、右、中央、左、または両端揃え。
- **50 種類以上のフォント、文字体系ごとに分類** — ペルシア語、アラビア語、ヘブライ語、ウルドゥー語、ラテン文字、キリル文字、デーヴァナーガリー、日本語、中国語、韓国語、タイ語、ベンガル語 — 検索とプレビューが可能なピッカーと、言語別フィルターチップ付き。本文、見出し、コードに別々のフォント — それぞれダウンロード可能なウェブフォント（Google Fonts / jsDelivr）。
- **タイポグラフィ** — フォントサイズ、太さ、行の高さ、文字間・単語間・段落間のスペース、読み幅の上限 — すべてリアルタイムのスライダーで調整できます。
- **現地数字** — その言語独自の数字（ペルシア語、アラビア語、ウルドゥー語、パシュトー語、ヒンディー語、ベンガル語、タイ語）で数を表示します。すでに標準的な西洋数字を使う言語では、説明とともにロックされます。
- **数式とコードは正しいまま** — KaTeX の数式やコードブロックは左から右のまま、崩れずに保たれます。
- **Claude のテーマ設定** — Claude 自体を 自動 / ライト / ダーク / 高コントラストのブラック の間で切り替えられ、さらにカスタムアクセントカラーも指定できます。
- **25 言語のインターフェース** — 設定パネルは初回起動時にブラウザの言語を自動検出し、25 言語に完全に翻訳されています。
- **ライブプレビュー** — 適用前に、Claude が実際にどう見えるか（Claude 自身のテーマ + アクセント）を確認できます。
- **プリセット、エクスポート/インポート、カスタム CSS**、そしてライト / ダーク / ブラック / システム のパネルテーマを備えた、洗練されたキーボード操作対応の UI。

---

## 🚀 インストール（開発者モード）

1. `chrome://extensions` を開きます（Chrome、Edge、または Brave）。
2. **デベロッパー モード** を有効にします（右上）。
3. **パッケージ化されていない拡張機能を読み込む** をクリックし、このプロジェクトのフォルダーを選択します。
4. Claude のチャットを開き、拡張機能のアイコンをクリックして設定を開きます。

キーボードショートカットは `chrome://extensions/shortcuts` で割り当てられます（デフォルトでは何も設定されていません）。

---

## 🔒 プライバシー

この拡張機能は **データを一切収集しません** — 分析もテレメトリも追跡もありません。設定はお使いのデバイスの `chrome.storage.local` にのみ保存されます。唯一のネットワークリクエストは、ダウンロード可能なフォントを選択したときに Google Fonts / jsDelivr から取得される **フォントファイル** です。詳細は [PRIVACY.md](PRIVACY.md) を参照してください。

---

## 📁 プロジェクト構成

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

## 📝 ライセンス

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Made with ❤️ by **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
