/* ===================================================================
 *  Claude RTL — Service Worker
 *  - Initialize default settings
 *  - Handle the keyboard shortcut (toggle on/off)
 *  - Strip the CSP header on Claude domains so remote fonts can load
 *  - Re-inject the content script into open Claude tabs after an
 *    extension reload/update so changes apply without a page refresh
 * =================================================================== */

const KEY = "crx_settings";
const RULE_ID = 1001;

/* Content script files, in the same order as manifest content_scripts. */
const CONTENT_JS = [
  "src/lib/defaults.js",
  "src/lib/fonts.js",
  "src/content/content.js"
];
const CONTENT_CSS = ["src/content/inject.css"];
const CLAUDE_TABS = ["*://claude.ai/*", "*://*.claude.ai/*", "*://claude.com/*", "*://*.claude.com/*"];

/* --- Default settings: only the subset the SW reads (full defaults live in defaults.js) --- */
const FALLBACK = {
  enabled: true
};

function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(KEY, (o) => resolve(o && o[KEY] ? o[KEY] : null));
  });
}
function setSettings(s) {
  return new Promise((resolve) => chrome.storage.local.set({ [KEY]: s }, resolve));
}

/* --- declarativeNetRequest rule: remove the CSP header on Claude domains --- */
async function updateCspRule(allow) {
  try {
    const addRules = allow
      ? [
          {
            id: RULE_ID,
            priority: 1,
            action: {
              type: "modifyHeaders",
              responseHeaders: [
                { header: "content-security-policy", operation: "remove" }
              ]
            },
            condition: {
              requestDomains: ["claude.ai", "claude.com"],
              resourceTypes: ["main_frame"]
            }
          }
        ]
      : [];
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID],
      addRules: addRules
    });
  } catch (e) {
    console.warn("[Claude RTL] CSP rule update failed:", e);
  }
}

async function syncCspFromSettings() {
  const s = (await getSettings()) || FALLBACK;
  // Strip CSP whenever the extension is on (unset/undefined counts as on) so web fonts load.
  await updateCspRule(s.enabled !== false);
}

/* --- Re-inject content script + CSS into already-open Claude tabs ---
 * MV3 does NOT auto-inject the new version after a reload/update, leaving open
 * tabs with orphaned scripts (no extension-API access, deaf to settings changes).
 * Re-injecting avoids a manual refresh; the fresh instance tells older ones to
 * shut down (see content.js "crx:shutdown"). */
async function injectClaudeTabs() {
  let tabs;
  try {
    tabs = await chrome.tabs.query({ url: CLAUDE_TABS });
  } catch (e) {
    return;
  }
  for (const tab of tabs) {
    if (!tab.id) continue;
    // Loading/discarded tabs will inject via the manifest on their own — skip to avoid a double inject.
    if (tab.discarded || tab.status === "loading") continue;
    try {
      await chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: CONTENT_CSS });
    } catch (e) {}
    try {
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: CONTENT_JS });
    } catch (e) {}
  }
}

/* --- Install / update --- */
chrome.runtime.onInstalled.addListener(async () => {
  const s = await getSettings();
  if (!s) {
    await setSettings({
      enabled: true
    });
  }
  await syncCspFromSettings();
  await injectClaudeTabs();
});

chrome.runtime.onStartup &&
  chrome.runtime.onStartup.addListener(async () => {
    await syncCspFromSettings();
    await injectClaudeTabs();
  });

/* --- React to settings changes (enabled toggled) --- */
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[KEY]) {
    const nv = changes[KEY].newValue || {};
    updateCspRule(nv.enabled !== false);
  }
});

/* --- Keyboard shortcut: toggle the whole extension on/off --- */
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-rtl") {
    const s = (await getSettings()) || {};
    s.enabled = !(s.enabled !== false);
    await setSettings(s);
  }
});
