# Claude Studio — RTL, phông chữ đa ngôn ngữ và giao diện cho Claude

[English](README.md) · [فارسی](README.fa.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [اردو](README.ur.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [Bahasa Indonesia](README.id.md) · [Türkçe](README.tr.md) · [日本語](README.ja.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Українська](README.uk.md) · **Tiếng Việt** · [ไทย](README.th.md) · [Ελληνικά](README.el.md) · [বাংলা](README.bn.md) · [پښتو](README.ps.md)

Một tiện ích mở rộng trình duyệt Manifest V3 giúp ứng dụng web **Claude** (`claude.ai` /
`claude.com`) hiển thị từ phải sang trái và cho phép bạn tùy chỉnh hoàn toàn kiểu chữ cùng giao diện của nó.

![icon](icons/icon128.png)

> **Tiện ích độc lập, không chính thức — không có liên kết, không được chứng thực hoặc
> tài trợ bởi Anthropic. “Claude” là thương hiệu của Anthropic.**

---

## ✨ Tính năng

- **Phải sang trái & hướng văn bản** — `Auto` (phát hiện theo từng khối, tốt nhất cho
  các cuộc trò chuyện song ngữ), buộc RTL, hoặc buộc LTR. Áp dụng độc lập cho câu trả lời của Claude,
  tin nhắn của bạn, ô soạn thảo và danh sách trò chuyện ở thanh bên.
- **Căn lề** — đầu dòng (theo hướng văn bản), phải, giữa, trái, hoặc căn đều hai bên.
- **Hơn 50 phông chữ, nhóm theo hệ chữ viết** — Ba Tư, Ả Rập, Do Thái, Urdu, Latinh,
  Cyrillic, Devanagari, Nhật, Trung, Hàn, Thái, Bengali — với bộ chọn có thể tìm kiếm,
  xem trước và các nhãn lọc theo từng ngôn ngữ. Phông chữ riêng cho
  nội dung, tiêu đề và mã — mỗi loại là một phông chữ web có thể tải xuống (Google Fonts / jsDelivr).
- **Kiểu chữ** — cỡ chữ, độ đậm, chiều cao dòng, khoảng cách chữ/từ/đoạn,
  và giới hạn chiều rộng đọc, tất cả đều có thanh trượt điều chỉnh trực tiếp.
- **Chữ số bản địa** — hiển thị số bằng chữ số riêng của ngôn ngữ bạn (Ba Tư,
  Ả Rập, Urdu, Pashto, Hindi, Bengali, Thái). Bị khóa kèm giải thích đối với những ngôn ngữ
  vốn đã dùng chữ số phương Tây tiêu chuẩn.
- **Toán học & mã vẫn chính xác** — công thức KaTeX và khối mã vẫn giữ
  hướng trái sang phải và nguyên vẹn.
- **Tùy biến giao diện Claude** — chuyển chính Claude giữa Auto / Sáng / Tối / màu
  Đen tương phản cao, cùng với một màu nhấn tùy chỉnh.
- **Giao diện 25 ngôn ngữ** — bảng cài đặt tự động phát hiện ngôn ngữ trình duyệt
  của bạn trong lần chạy đầu tiên và được dịch đầy đủ sang 25 ngôn ngữ.
- **Xem trước trực tiếp** — thấy chính xác Claude sẽ trông như thế nào (giao diện riêng + màu nhấn)
  trước khi áp dụng.
- **Cài đặt sẵn, xuất/nhập, CSS tùy chỉnh**, và một giao diện được trau chuốt, thao tác được bằng bàn phím
  với các chủ đề bảng điều khiển sáng / tối / đen / theo hệ thống.

---

## 🚀 Cài đặt (chế độ nhà phát triển)

1. Mở `chrome://extensions` (Chrome, Edge, hoặc Brave).
2. Bật **Developer mode** (góc trên bên phải).
3. Nhấp **Load unpacked** và chọn thư mục dự án này.
4. Mở một cuộc trò chuyện Claude và nhấp vào biểu tượng tiện ích để mở phần cài đặt.

Có thể gán phím tắt tại `chrome://extensions/shortcuts` (mặc định không có phím tắt nào
được đặt).

---

## 🔒 Quyền riêng tư

Tiện ích **không thu thập dữ liệu** — không phân tích, không đo từ xa, không theo dõi.
Cài đặt chỉ được lưu trong `chrome.storage.local` trên thiết bị của bạn. Các yêu cầu
mạng duy nhất là **tệp phông chữ** được tải từ Google Fonts / jsDelivr khi bạn
chọn một phông chữ có thể tải xuống. Xem [PRIVACY.md](PRIVACY.md) để biết chi tiết.

---

## 📁 Cấu trúc dự án

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

## 📝 Giấy phép

[MIT](LICENSE) © [ILYAGVC](https://github.com/ILYAGVC)

Được tạo với ❤️ bởi **[ILYAGVC](https://github.com/ILYAGVC)** — [github.com/ILYAGVC/Claude-Studio](https://github.com/ILYAGVC/Claude-Studio)
