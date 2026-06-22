/* ===================================================================
 *  Claude Studio — settings panel theme bootstrap
 *  Applies the last-used panel theme + accent SYNCHRONOUSLY, before the
 *  first paint, so the popup never flashes the default theme while the
 *  async chrome.storage read is still in flight. popup.js keeps these
 *  localStorage mirrors up to date on every theme/accent change.
 *  (Must stay an external file — the extension CSP forbids inline scripts.)
 * =================================================================== */
(function () {
  try {
    var t = localStorage.getItem("crx_theme");
    // "system" (or unset) intentionally leaves data-theme off so the CSS
    // prefers-color-scheme fallback applies — matches applyTheme().
    if (t === "light" || t === "dark" || t === "black") {
      document.documentElement.setAttribute("data-theme", t);
    }
    var a = localStorage.getItem("crx_accent");
    if (a && /^#[0-9a-fA-F]{6}$/.test(a)) {
      document.documentElement.style.setProperty("--accent", a);
    }
  } catch (e) {}
})();
