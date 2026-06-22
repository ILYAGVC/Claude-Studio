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

/* --- Default settings (tiny subset — only what the SW needs) --- */
const FALLBACK = {
  enabled: true,
  allowRemoteFonts: true
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
  // Only strip CSP when the extension is on and remote fonts are allowed.
  await updateCspRule(s.enabled !== false && s.allowRemoteFonts !== false);
}

/* --- Re-inject the content script + CSS into already-open Claude tabs ---
 * After an extension reload/update the content scripts in open tabs become
 * orphaned (they lose access to the extension APIs and stop reacting to
 * settings changes), and MV3 does NOT auto-inject the new version. We inject
 * it ourselves so the user does not have to refresh the page. The fresh
 * instance signals older ones to shut down (see content.js "crx:shutdown"). */
async function injectClaudeTabs() {
  let tabs;
  try {
    tabs = await chrome.tabs.query({ url: CLAUDE_TABS });
  } catch (e) {
    return;
  }
  for (const tab of tabs) {
    if (!tab.id) continue;
    // Skip tabs that are still loading or discarded — they will inject via the manifest.
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
      enabled: true,
      allowRemoteFonts: true
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

/* --- React to settings changes (enabled or allowRemoteFonts) --- */
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[KEY]) {
    const nv = changes[KEY].newValue || {};
    updateCspRule(nv.enabled !== false && nv.allowRemoteFonts !== false);
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
