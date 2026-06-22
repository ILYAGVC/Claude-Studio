# Claude Studio — Claude를 위한 RTL, 다국어 폰트 및 테마

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · **한국어** · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

**Claude** 웹 앱(`claude.ai` / `claude.com`)을 오른쪽에서 왼쪽(RTL)으로 표시하고, 타이포그래피와 테마를 완전히 사용자화할 수 있게 해주는 Manifest V3 브라우저 확장 프로그램입니다.

![icon](icons/icon128.png)

> **독립적인 비공식 확장 프로그램입니다 — Anthropic과 제휴, 보증 또는 후원 관계가 없습니다. "Claude"는 Anthropic의 상표입니다.**

---

## ✨ 기능

- **오른쪽에서 왼쪽 및 방향** — `자동`(블록별 감지, 이중 언어 채팅에 가장 적합), 강제 RTL, 또는 강제 LTR. Claude의 답변, 사용자의 메시지, 작성 입력란, 사이드바 채팅 목록에 각각 독립적으로 적용할 수 있습니다.
- **정렬** — 시작 정렬(방향을 따름), 오른쪽, 가운데, 왼쪽, 또는 양쪽 정렬.
- **문자 체계별로 분류된 50개 이상의 폰트** — 페르시아어, 아랍어, 히브리어, 우르두어, 라틴, 키릴, 데바나가리, 일본어, 중국어, 한국어, 태국어, 벵골어 — 검색 및 미리보기가 가능한 선택기와 언어별 필터 칩을 제공합니다. 본문, 제목, 코드에 각각 다른 폰트를 지정할 수 있습니다 — 각각 다운로드 가능한 웹 폰트(Google Fonts)입니다.
- **타이포그래피** — 글꼴 크기, 굵기, 줄 높이, 글자/단어/문단 간격, 읽기 너비 제한 등을 모두 실시간 슬라이더로 조정할 수 있습니다.
- **현지 숫자** — 사용자 언어 고유의 숫자(페르시아어, 아랍어, 우르두어, 파슈토어, 힌디어, 벵골어, 태국어)로 숫자를 표시합니다. 이미 표준 서양식 숫자를 사용하는 언어의 경우 설명과 함께 잠겨 있습니다.
- **수식과 코드는 그대로 유지** — KaTeX 수식과 코드 블록은 왼쪽에서 오른쪽 방향을 유지하며 손상되지 않습니다.
- **Claude 테마** — Claude 자체를 자동 / 라이트 / 다크 / 고대비 블랙 중에서 전환할 수 있으며, 사용자 지정 강조 색상도 추가할 수 있습니다.
- **25개 언어 인터페이스** — 설정 패널은 첫 실행 시 브라우저 언어를 자동으로 감지하며 25개 언어로 완전히 번역되어 있습니다.
- **실시간 미리보기** — 적용하기 전에 Claude가 어떻게 보일지(자체 테마 + 강조 색상) 정확히 확인할 수 있습니다.
- **프리셋, 내보내기/가져오기, 사용자 지정 CSS**, 그리고 라이트 / 다크 / 블랙 / 시스템 패널 테마를 갖춘 세련되고 키보드로 접근 가능한 UI.

---

## 🚀 설치 (개발자 모드)

1. `chrome://extensions`를 엽니다(Chrome, Edge 또는 Brave).
2. **개발자 모드**를 활성화합니다(오른쪽 위).
3. **압축해제된 확장 프로그램을 로드합니다**를 클릭하고 이 프로젝트 폴더를 선택합니다.
4. Claude 채팅을 열고 확장 프로그램 아이콘을 클릭하여 설정을 엽니다.

키보드 단축키는 `chrome://extensions/shortcuts`에서 지정할 수 있습니다(기본값으로 설정된 것은 없습니다).

---

## 🔒 개인정보 보호

이 확장 프로그램은 **어떤 데이터도 수집하지 않습니다** — 분석, 원격 측정, 추적이 일절 없습니다. 설정은 사용자 기기의 `chrome.storage.local`에만 저장됩니다. 유일한 네트워크 요청은 다운로드 가능한 폰트를 선택했을 때 Google Fonts에서 가져오는 **폰트 파일**뿐입니다. 자세한 내용은 [PRIVACY.md](PRIVACY.md)를 참고하세요.

---

## 📁 프로젝트 구조

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

## 📝 라이선스

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Made with ❤️ by **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
