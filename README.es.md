# Claude Studio — RTL, fuentes multilingües y temas para Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · **Español** · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · [Tiếng Việt](README.vi.md) · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Una extensión de navegador con Manifest V3 que vuelve la aplicación web de **Claude** (`claude.ai` /
`claude.com`) de derecha a izquierda y te permite personalizar por completo su tipografía y su tema.

![icon](icons/icon128.png)

> **Extensión independiente y no oficial: no está afiliada a Anthropic, ni
> respaldada ni patrocinada por ella. «Claude» es una marca registrada de Anthropic.**

---

## ✨ Funciones

- **De derecha a izquierda y dirección** — `Auto` (detección por bloque, ideal para
  conversaciones bilingües), RTL forzado o LTR forzado. Aplícalo de forma independiente a las
  respuestas de Claude, tus mensajes, el editor y la lista de chats de la barra lateral.
- **Alineación** — al inicio (sigue la dirección), a la derecha, centrada, a la izquierda o justificada.
- **Más de 50 fuentes, agrupadas por sistema de escritura** — persa, árabe, hebreo, urdu, latino,
  cirílico, devanagari, japonés, chino, coreano, tailandés, bengalí, con un
  selector que permite buscar y previsualizar, y chips de filtro por idioma. Fuentes separadas para
  el cuerpo, los títulos y el código, cada una una fuente web descargable (Google Fonts).
- **Tipografía** — tamaño de fuente, grosor, altura de línea, espaciado entre letras, palabras y párrafos,
  y un límite de ancho de lectura, todo con controles deslizantes en tiempo real.
- **Numerales locales** — muestra los números con los dígitos propios de tu idioma (persa,
  árabe, urdu, pastún, hindi, bengalí, tailandés). Bloqueado, con una explicación, para los idiomas
  que ya usan los dígitos occidentales estándar.
- **Las matemáticas y el código se mantienen correctos** — las fórmulas de KaTeX y los bloques de código permanecen
  de izquierda a derecha e intactos.
- **Temas de Claude** — cambia el propio Claude entre Auto / Claro / Oscuro / un
  negro de alto contraste, además de un color de acento personalizado.
- **Interfaz en 25 idiomas** — el panel de ajustes detecta automáticamente el idioma de tu navegador
  en la primera ejecución y está totalmente traducido a 25 idiomas.
- **Vista previa en tiempo real** — observa exactamente cómo se verá Claude (su propio tema + acento)
  antes de aplicar los cambios.
- **Preajustes, exportar/importar, CSS personalizado**, y una interfaz pulida y accesible desde el teclado
  con temas de panel claro / oscuro / negro / del sistema.

---

## 🚀 Instalación (modo desarrollador)

1. Abre `chrome://extensions` (Chrome, Edge o Brave).
2. Activa el **modo de desarrollador** (arriba a la derecha).
3. Haz clic en **Cargar descomprimida** y selecciona la carpeta de este proyecto.
4. Abre un chat de Claude y haz clic en el icono de la extensión para abrir los ajustes.

Los atajos de teclado se pueden asignar en `chrome://extensions/shortcuts` (no hay ninguno
configurado de forma predeterminada).

---

## 🔒 Privacidad

La extensión **no recopila ningún dato**: sin analíticas, sin telemetría, sin seguimiento.
Los ajustes se guardan únicamente en `chrome.storage.local` en tu dispositivo. Las únicas
solicitudes de red son los **archivos de fuentes** descargados de Google Fonts cuando
seleccionas una fuente descargable. Consulta [PRIVACY.md](PRIVACY.md) para más detalles.

---

## 📁 Estructura del proyecto

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

## 📝 Licencia

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Hecho con ❤️ por **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
