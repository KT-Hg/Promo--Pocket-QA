# Implementation Plan: Sửa toàn bộ vấn đề từ review trang promo Pocket QA

## Overview
Biến trang promo từ "trưng bày đẹp" thành "trang chuyển đổi": thêm đường cài đặt, sửa CTA hỏng,
đảm bảo nội dung hiển thị khi không có JS, đạt tương phản WCAG AA, popup preview vừa mọi màn hình,
bổ sung privacy/permissions, sửa copy mâu thuẫn, và thêm meta chia sẻ/SEO. Không có build step —
trang tĩnh, kiểm tra bằng preview server `promo-static` (port 8383) + trình duyệt.

## Facts đã xác minh (từ repo extension `../Pocket QA`)
- **Store URL:** `https://chromewebstore.google.com/detail/hghkokkjbpedgjbpohpkgmejkeobocam`
  (`popup/update-banner.js:32`, `STORE_ITEM_ID`).
- **Permissions** (`manifest.json`): `tabs`, `storage`, `scripting`, `downloads`, `alarms`, `debugger`,
  `windows`, `notifications`, host `<all_urls>`, optional `desktopCapture`.
- **Network ra ngoài:** chỉ 1 request — GET `https://kt-hg.github.io/Pocket-QA/update-config.json`
  (kill-switch, `bg/remote-config.js:21`) + `chrome.runtime.requestUpdateCheck()` của Chrome.
  Các `fetch()` còn lại đều là `data:`/blob URL nội bộ.
- **Repo promo:** `github.com/KT-Hg/Promo--Pocket-QA` → GitHub Pages có thể là
  `https://kt-hg.github.io/Promo--Pocket-QA/` (cần xác nhận, xem Open Questions).

## Architecture Decisions
- **Một inline `<script>` trong `<head>`** (cả `index.html` và `feature.html`) làm 2 việc: gắn class
  `js` lên `<html>` và áp theme đã lưu / `prefers-color-scheme` trước first paint. `.reveal` chỉ ẩn
  khi có `.js` → không JS vẫn thấy nội dung; đồng thời hết nháy theme sáng.
- **Hero không dùng `.reveal`** — phần trên màn hình đầu tiên không cần fade-in, và nó là phần tử LCP.
- **`id="demo"` chuyển sang `.hero__mockup`** — mọi link `#demo` / `index.html#demo` tự đúng, không cần JS.
- **Store link hard-code trong HTML** (4–6 chỗ). Không tạo config/JS chỉ để chèn 1 URL không đổi.
- **Preview trên trang feature scale bằng JS** (giống `fitPopup()` của `landing.js`): CSS chưa chia
  length → số không đơn vị được trên Chrome 109+. Chép ~10 dòng sang `feature.js`, không tạo file
  shared cho 2 caller.
- **Mobile nav: không làm hamburger.** Hero đã có nút "See features"; footer sẽ có nav links (T9).
  Thêm hamburger khi có số liệu cho thấy người dùng mobile cần.
- **Không bịa social proof.** Testimonial / số người dùng / rating chỉ thêm khi có số liệu thật.
- **Mọi task sửa `feature.js` phải chạy `node stamp-feature-js.mjs`; sửa `demo.js`/`demo.css` phải
  chạy `node sync-from-source.mjs`** (cache-busting hash, xem README).

## Verification chung (không có test suite / build)
- Preview: `.claude/launch.json` → `promo-static` (http://localhost:8383).
- Viewports: **1025×768** (laptop), **1440×900**, **375×812** (mobile); light + dark.
- Console không lỗi; `scrollWidth === innerWidth` (không cuộn ngang trang).
- Contrast: tính lại bằng script WCAG (scratchpad) cho các cặp màu đã sửa.

## Task List
Chi tiết, acceptance criteria và verification từng task: [`tasks/todo.md`](todo.md).

### Phase 1: Chuyển đổi (critical)
- [x] T1: CTA cài đặt trỏ về Chrome Web Store
- [x] T2: "See the popup" cuộn tới đúng popup
- [x] T3: Nội dung hiện khi không có JS + theme áp trước first paint

### Checkpoint 1
- [x] Mọi CTA cài đặt mở store; See the popup đúng trên desktop + mobile; tắt JS vẫn đọc được trang

### Phase 2: Accessibility & mobile
- [x] T4: Tương phản màu đạt WCAG AA
- [x] T5: Popup preview vừa mọi màn hình (trang feature) + link xem full-size trên mobile
- [x] T6: Phản hồi khi bấm control bị khóa trong popup demo

### Checkpoint 2
- [x] Không còn cặp màu < 4.5:1 cho chữ thường; preview không bị cắt ở 1025 và 375; tap Start Recording có toast

### Phase 3: Nội dung & niềm tin
- [x] T7: Sửa copy mâu thuẫn + meta description + thẻ thứ 12
- [x] T8: Section Privacy & Permissions + FAQ + footer links
- [x] T9: Chụp lại screenshot export (5 định dạng), bỏ ghi chú "earlier build"

### Checkpoint 3
- [x] Đọc lại toàn trang: không còn mâu thuẫn số liệu; mọi claim privacy có nguồn trong code extension

### Phase 4: SEO, hiệu năng, polish
- [ ] T10: OG / Twitter / canonical / theme-color / JSON-LD + ảnh og 1200×630
- [ ] T11: Screenshot PNG → WebP
- [ ] T12 (tùy chọn): Icon emoji → SVG inline
- [ ] T13 (tùy chọn): Trang feature tĩnh cho SEO / social preview

### Checkpoint: Complete
- [ ] Mọi acceptance criteria đạt; review lại bằng checklist review ban đầu; người dùng duyệt

## Thứ tự & song song
- T1→T2→T3 tuần tự (cùng sửa `index.html`/`feature.html`).
- **Có thể song song:** T6 (`demo.js`, `demo.css`) và T9 (repo extension + `screenshots/`) không đụng
  file của task khác. T11 phải chạy **sau** T9 (cùng thư mục `screenshots/`).
- T4, T5, T7, T8, T10 đều sửa `promo.css` hoặc `index.html` → tuần tự.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Store listing chưa public / ID sai | High | Mở URL thử trước khi commit T1; hỏi người dùng (Q1) |
| Inline head script + `.js` gate làm nội dung nháy ẩn→hiện | Med | Hero bỏ `.reveal`; chỉ section dưới fold còn animate |
| Claim privacy sai sự thật | High | Mỗi dòng trong bảng permissions dẫn về file/hàm cụ thể trong extension; không viết điều chưa thấy trong code |
| Đổi `id="demo"` làm lệch `landing.js` (extBtn) | Low | extBtn đang `scrollIntoView` `#demo` với `block:'center'` → vẫn đúng; kiểm tra lại |
| Toast trong iframe phá "extension fence" của `demo.js` | Med | Toast gắn vào guard sẵn có, không thêm listener mới; kiểm tra `__promoDemoGuard` |
| Recapture screenshot (T9) cần harness tạm ở repo extension | Med | Làm theo quy trình README "Screenshot comparison"; không thêm file vào repo nào |
| `update-vendor.mjs` chỉ cập nhật version ở `index.html`/`feature.html` | Low | Nếu T13 tạo thêm HTML, mở rộng vòng lặp version trong script |

## Open Questions
1. ~~Store listing đã public chưa?~~ **Đã trả lời:** đúng URL, đã public.
2. ~~Extension miễn phí hoàn toàn?~~ **Đã trả lời:** miễn phí hoàn toàn.
3. URL production cho `canonical`/`og:url`: `https://kt-hg.github.io/Promo--Pocket-QA/`?
4. ~~Privacy: section hay trang riêng?~~ **Đã trả lời:** một section trên trang chủ (`index.html#privacy`).
5. Có số liệu thật nào (lượt cài, rating, quote người dùng) để làm social proof không?
6. ~~Link GitHub cho footer?~~ **Đã trả lời:** không có.
7. Làm T12 (SVG icons) và T13 (trang feature tĩnh) không, hay bỏ?
