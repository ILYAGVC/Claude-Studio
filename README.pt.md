# Claude Studio — RTL, Fontes Multilíngues e Temas para o Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · **Português** · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Uma extensão de navegador Manifest V3 que torna o aplicativo web do **Claude** (`claude.ai` /
`claude.com`) da direita para a esquerda e permite personalizar totalmente sua tipografia e tema.

![icon](icons/icon128.png)

> **Extensão independente e não oficial — não afiliada, endossada ou
> patrocinada pela Anthropic. "Claude" é uma marca registrada da Anthropic.**

---

## ✨ Recursos

- **Da direita para a esquerda e direção** — `Auto` (detecção por bloco, ideal para conversas
  bilíngues), RTL forçado ou LTR forçado. Aplique de forma independente às respostas do Claude,
  às suas mensagens, ao compositor e à lista de conversas da barra lateral.
- **Alinhamento** — início (segue a direção), direita, centro, esquerda ou justificado.
- **Mais de 50 fontes, agrupadas por escrita** — persa, árabe, hebraico, urdu, latim,
  cirílico, devanágari, japonês, chinês, coreano, tailandês, bengali — com um
  seletor pesquisável com pré-visualização e chips de filtro por idioma. Fontes separadas para
  o corpo do texto, títulos e código — cada uma uma fonte web descarregável (Google Fonts / jsDelivr).
- **Tipografia** — tamanho da fonte, peso, altura da linha, espaçamento entre letras/palavras/parágrafos
  e um limite de largura de leitura, tudo com controles deslizantes em tempo real.
- **Numerais locais** — mostre os números nos dígitos do seu próprio idioma (persa,
  árabe, urdu, pashto, hindi, bengali, tailandês). Bloqueado com uma explicação para os idiomas
  que já usam os dígitos ocidentais padrão.
- **Matemática e código permanecem corretos** — fórmulas KaTeX e blocos de código permanecem
  da esquerda para a direita e intactos.
- **Temas do Claude** — alterne o próprio Claude entre Auto / Claro / Escuro / um
  Preto de alto contraste, além de uma cor de destaque personalizada.
- **Interface em 25 idiomas** — o painel de configurações detecta automaticamente o idioma
  do seu navegador na primeira execução e está totalmente traduzido para 25 idiomas.
- **Pré-visualização em tempo real** — veja exatamente como o Claude vai ficar (seu próprio tema + destaque)
  antes de aplicar.
- **Predefinições, exportação/importação, CSS personalizado** e uma interface refinada e acessível por teclado,
  com temas de painel claro / escuro / preto / do sistema.

---

## 🚀 Instalação (modo de desenvolvedor)

1. Abra `chrome://extensions` (Chrome, Edge ou Brave).
2. Ative o **Modo de desenvolvedor** (canto superior direito).
3. Clique em **Carregar sem compactação** e selecione a pasta deste projeto.
4. Abra uma conversa do Claude e clique no ícone da extensão para abrir as configurações.

Os atalhos de teclado podem ser atribuídos em `chrome://extensions/shortcuts` (nenhum está
definido por padrão).

---

## 🔒 Privacidade

A extensão **não coleta nenhum dado** — sem análises, sem telemetria, sem rastreamento.
As configurações são armazenadas apenas em `chrome.storage.local` no seu dispositivo. As únicas
solicitações de rede são **arquivos de fontes** obtidos do Google Fonts / jsDelivr quando você
seleciona uma fonte descarregável. Consulte [PRIVACY.md](PRIVACY.md) para detalhes.

---

## 📁 Estrutura do projeto

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

## 📝 Licença

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Feito com ❤️ por **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
