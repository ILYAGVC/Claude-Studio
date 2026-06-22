# Privacy Policy — Claude Studio

**Last updated:** 2026-06-22

Claude Studio is an independent, unofficial browser extension that restyles the
Claude web app (claude.ai / claude.com): right-to-left layout, multilingual
fonts, typography, and theme/accent customization. It is **not affiliated with,
endorsed by, or sponsored by Anthropic**. “Claude” is a trademark of Anthropic.

## What we collect

**Nothing.** The extension does not collect, transmit, sell, or share any
personal data. There is no analytics, no telemetry, and no tracking of any kind.

## What is stored, and where

Your settings (direction, fonts, typography, theme, accent colors, presets,
interface language, etc.) are stored **locally on your device** using the
browser's `chrome.storage.local` API. They never leave your browser and are not
sent to us or anyone else. You can export, import, or reset them at any time from
the extension's settings panel.

## Network requests

The extension itself makes **no requests to any server we control**.

When you select a downloadable web font (and when the extension's own settings
panel is opened, which loads a few interface fonts), your browser fetches those
font files directly from public font CDNs:

- **Google Fonts** — `fonts.googleapis.com`, `fonts.gstatic.com`
- **jsDelivr** — `cdn.jsdelivr.net`

As with loading any web font, those services may receive your IP address and
standard request headers (User-Agent, Referer) as part of serving the file. We
do not control and cannot access that data. No personal data is added to these
requests by the extension.

## Permissions and why they are used

- **storage** — save your appearance settings locally on your device.
- **declarativeNetRequestWithHostAccess** — on `claude.ai` / `claude.com` only,
  remove the `Content-Security-Policy` response header on the top-level document
  of those two domains so the browser is allowed to download the web fonts you
  select. The extension **injects and executes no remote code** — the only
  cross-origin resources it loads are font files. No other website is affected.
- **scripting** — re-apply the styling content script to already-open Claude
  tabs after the extension updates, so you do not have to refresh the page.
- **host permissions** (`claude.ai`, `claude.com`) — the extension only restyles
  these two sites and does nothing on any other website.

## No remote code

The extension does not download or execute any remote code. All executable code
ships inside the package; the only remote resources are font files.

## Changes

If this policy changes, the updated version will be published at this location
and the “Last updated” date above will change.

## Contact

For questions about this policy, open an issue on the extension's repository.
