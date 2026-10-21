# Tasks — Sửa vấn đề từ review trang promo

Plan & quyết định kiến trúc: [`tasks/plan.md`](plan.md). Kiểm tra bằng preview `promo-static`
(http://localhost:8383) ở 1025×768, 1440×900, 375×812, light + dark.

---

## Phase 1: Chuyển đổi (critical)

## Task 1: CTA cài đặt trỏ về Chrome Web Store

**Description:** Hiện mọi CTA ("Try it free", "▶ See the popup", "See the popup" ở CTA card) đều trỏ
`#demo`, không có link cài. Thêm link store
(`https://chromewebstore.google.com/detail/hghkokkjbpedgjbpohpkgmejkeobocam`) cho các CTA cài đặt,
giữ "See the popup" làm nút phụ.

**Acceptance criteria:**
- [x] Nav (cả 2 trang): nút chính là "Add to Chrome" (bỏ "— free" ở nav cho vừa màn 360px; hero + CTA card vẫn ghi "— free"), `href` = store URL, `target="_blank" rel="noopener"`.
- [x] Hero: nút chính = Add to Chrome, nút phụ = "▶ See the popup" (`#demo`); "See features" thành link chữ "See all features →".
- [x] CTA card cuối (cả 2 trang): Add to Chrome (chính) + See the popup (ghost, dùng `.cta .btn--ghost` đã có).

**Verification:**
- [x] `grep -c "chromewebstore.google.com" index.html feature.html` ≥ 2 mỗi file
- [x] Manual: 3 link store đúng `href` + `target=_blank` (chưa mở thử trang store); nút ghost trên nền gradient đọc rõ

**Dependencies:** None (chặn bởi Open Question 1–2 — xác nhận URL và chữ "free")

**Files likely touched:** `index.html`, `feature.html`, `promo.css` (nếu cần style nút ghost ở hero)

**Estimated scope:** S

---

## Task 2: "See the popup" cuộn tới đúng popup

**Description:** `id="demo"` đang nằm trên `.hero__grid` (chứa luôn nút) → trên desktop bấm không làm gì,
trên mobile dừng ở phần chữ cách popup ~685px. Chuyển `id="demo"` sang `.hero__mockup` và thêm
`scroll-margin-top` để không bị nav sticky (64px) che.

**Acceptance criteria:**
- [x] 375×812: bấm "▶ See the popup" → mép trên popup nằm trong viewport, ngay dưới nav.
- [x] 1025×768: không có hiện tượng "bấm không phản hồi" — mockup căn trong viewport.
- [x] `index.html#demo` từ `feature.html` vào thẳng popup; nút icon extension trong mockup (`extBtn`, `landing.js`) vẫn chạy.

**Verification:**
- [x] Manual ở cả 2 viewport, kiểm tra `document.querySelector('#demo').getBoundingClientRect().top` ≈ 64–80 sau khi bấm

**Dependencies:** None

**Files likely touched:** `index.html`, `promo.css`

**Estimated scope:** XS

---

## Task 3: Nội dung hiện khi không có JS + theme áp trước first paint

**Description:** `.reveal { opacity:0 }` làm cả trang trắng khi JS lỗi, và hero (LCP) phải chờ fade-in.
Theme được áp ở script cuối `<body>` nên người dùng dark mode có thể thấy nháy sáng, và
`prefers-color-scheme` bị bỏ qua. Thêm một inline script trong `<head>` cho cả 2 trang: thêm class `js`
lên `<html>`, áp `demoPageTheme` đã lưu hoặc theme hệ thống.

**Acceptance criteria:**
- [x] CSS: `.js .reveal { opacity:0; … }` thay cho `.reveal`; hero (`.hero__copy`, `.hero__mockup`) bỏ class `reveal`.
- [x] Tắt JS → toàn bộ nội dung index hiển thị; feature.html hiện thông báo `<noscript>` ngắn + link về index.
- [x] Chưa lưu theme + OS dark → trang mở ở dark; đã lưu theme → không nháy theme khác khi tải lại.
- [x] `landing.js` / `feature.js` bỏ đoạn đọc localStorage ban đầu đã trùng với inline script (giữ toggle).

**Verification:**
- [x] Manual: bỏ class `js` khỏi `<html>` (cùng nhánh CSS như khi tắt JS) → mọi `.reveal` opacity 1
- [x] Manual: `resize_window colorScheme: dark`, xóa `demoPageTheme` → reload → dark
- [x] `node stamp-feature-js.mjs` sau khi sửa `feature.js`

**Dependencies:** None

**Files likely touched:** `index.html`, `feature.html`, `promo.css`, `landing.js`, `feature.js`

**Estimated scope:** M

---

### Checkpoint 1 (sau T1–T3)
- [x] Mọi CTA cài đặt mở store; See the popup đúng trên desktop + mobile
- [x] Tắt JS vẫn đọc được index; không nháy theme
- [x] Console sạch; không cuộn ngang ở 375px
- [x] Người dùng xem lại trước khi qua Phase 2

---

## Phase 2: Accessibility & mobile

## Task 4: Tương phản màu đạt WCAG AA

**Description:** Đo được: chữ primary `#3b82f6` trên nền sáng 3.46–3.68 (badge 3.03), chữ trắng trên nút
gradient / CTA card 3.68, chữ muted `#64748b` trên `#f7f8fb` 4.48 — đều < 4.5. Thêm token màu chữ link
riêng, làm gradient đậm hơn, chỉnh muted.

**Acceptance criteria:**
- [x] Token `--p-link` (light `#1d4ed8` — `#2563eb` chỉ đạt 4.26 trên nền badge; dark giữ màu ≥ 4.5 trên `--p-card`) dùng cho eyebrow, "Learn more", badge, `.fnav__link[aria-current]`, link chữ.
- [x] Gradient nút + CTA card: chữ trắng ≥ 4.5:1 ở **cả hai đầu** gradient (vd. `#2563eb → #7c3aed`).
- [x] `--p-muted` light ≥ 4.5:1 trên `--p-bg`, `--p-bg-alt`, `--p-card`.

**Verification:**
- [x] Chạy lại script WCAG cho mọi cặp trên, light + dark: link ≥ 5.53, muted `#596779` ≥ 5.43 trên nền chữ, chữ trắng trên gradient 5.17 / 5.70, dark link `#60a5fa` ≥ 6.64
- [x] Manual: so sánh trước/sau — thương hiệu xanh-tím vẫn giữ

**Dependencies:** T1 (nút mới cũng dùng gradient)

**Files likely touched:** `promo.css`

**Estimated scope:** S

---

## Task 5: Popup preview vừa mọi màn hình + link xem full-size trên mobile

**Description:** Trang feature: iframe 480px bị cắt (455/500px ở 1025px, 326/500px ở 375px, phải cuộn ngang
bên trong); khối sticky cao 733px với `top:128px` → nút "Explore every tab" không bao giờ hiện trên màn
768px. Index mobile: popup scale 0.68 → chữ 7–8px.

**Acceptance criteria:**
- [x] `feature.js`: scale iframe theo chiều rộng khung (cùng cách `fitPopup()` của `landing.js`, cập nhật khi resize); `.detail-preview__frame-wrap` không còn cuộn ngang.
- [x] `.detail-preview` chỉ sticky khi viewport đủ cao để chứa cả khối (media query `min-height`), còn lại `position: static`.
- [x] ≤560px (cả 2 trang): link "Open full-size preview ↗" tới `popup-demo.html?tab=…` (tab mới) để pinch-zoom native.

**Verification:**
- [x] 1025×768 (scale 0.906) và 375×812 (scale 0.6375): mép phải/dưới iframe sau scale nằm trong khung, không còn thanh cuộn ngang; thấy đủ 5 tab. (`scrollWidth` vẫn đọc 500 vì tính hộp chưa scale, nhưng khung là `overflow: hidden` nên không cuộn được.)
- [x] 1025×768: cuộn qua Overview thấy được nút "Explore every tab"
- [x] `node stamp-feature-js.mjs`

**Dependencies:** T3 (cùng sửa `feature.js`)

**Files likely touched:** `feature.js`, `feature.html`, `index.html`, `promo.css`

**Estimated scope:** M

---

## Task 6: Phản hồi khi bấm control bị khóa trong popup demo

**Description:** Control bị khóa chỉ có `cursor: not-allowed` (không tồn tại trên cảm ứng) → tap "Start
Recording" không có gì xảy ra. Dùng lại `#toast` thật của popup (`.toast.show.toast-info`, có sẵn
`role="status"`) trong guard click hiện có của `demo.js`.

**Acceptance criteria:**
- [x] Bấm control bị khóa → toast "Preview only — install Pocket QA to use this" trong ~2.5s; bấm liên tục không xếp chồng toast.
- [x] Tab + theme toggle vẫn chạy; không thêm listener mới ngoài guard (giữ "extension fence").
- [x] Đổi dòng gợi ý dưới hero: bỏ chữ "live preview", nói rõ chỉ tab + theme tương tác được, và 🌙 ở đây là nút trong popup.

**Verification:**
- [x] Manual: tap thật vào Start Recording (375px) + `.click()` vào "+ Add Row" → toast; bấm 3 lần vẫn chỉ 1 toast; tab + theme vẫn chạy
- [x] Console trong iframe: `__promoDemoGuard === 'extension-fence v2'` (fence không đổi nên giữ v2)
- [x] `node sync-from-source.mjs` (stamp hash `demo.js`)

**Dependencies:** None — **có thể chạy song song** với T4/T5

**Files likely touched:** `demo.js`, `demo.css`, `popup-demo.html` (do script sinh ra), `index.html`

**Estimated scope:** S

---

### Checkpoint 2 (sau T4–T6)
- [x] Không còn cặp màu < 4.5:1 cho chữ thường
- [x] Preview không bị cắt ở 1025 và 375; tap control bị khóa có phản hồi
- [ ] Người dùng xem lại

---

## Phase 3: Nội dung & niềm tin

## Task 7: Sửa copy mâu thuẫn + meta description + thẻ thứ 12

**Description:** Hero ghi "5 code export formats" nhưng mô tả hero và bước Export chỉ liệt kê 4 (thiếu JS
Bookmarklet). Meta description dài 276 ký tự. Lưới feature 11 thẻ / 3 cột → hàng cuối hụt 1 ô.

**Acceptance criteria:**
- [ ] Hero sub + step "Export" nhất quán với "5 formats" (có Bookmarklet); hero sub ngắn lại (≤ 3 dòng ở 1025px).
- [ ] Meta description index ≤ 160 ký tự, có từ khóa chính (record & replay, Chrome extension, Selenium/Playwright export).
- [ ] Thẻ thứ 12 = thẻ CTA cài đặt (style `.feature--cta`) → lưới đầy ở 3 cột và 2 cột.

**Verification:**
- [ ] `grep` đếm định dạng export trong `index.html` khớp nhau
- [ ] Manual 1025 / 820 / 375: lưới không có ô trống

**Dependencies:** T1, T4

**Files likely touched:** `index.html`, `promo.css`

**Estimated scope:** S

---

## Task 8: Section Privacy & Permissions + FAQ + footer links

**Description:** Extension ghi lại thao tác gõ phím (demo còn hiện bước `#password`) nhưng trang không nói
gì về dữ liệu. Thêm section `#privacy` trên index: dữ liệu lưu cục bộ, request ra ngoài duy nhất, bảng
quyền + lý do. Thêm FAQ ngắn (`<details>`) và footer có link.

**Acceptance criteria:**
- [ ] Bảng đủ 10 quyền trong `manifest.json` (gồm `<all_urls>`, optional `desktopCapture`), mỗi lý do kiểm chứng được bằng code extension (ghi nguồn file trong commit message, không trên trang).
- [ ] Nêu đúng network: chỉ `update-config.json` (kill-switch) + Chrome update check; không có analytics/telemetry — **chỉ viết sau khi grep lại xác nhận**.
- [ ] Footer (cả 2 trang): Add to Chrome · Features · How it works · Privacy · (GitHub nếu có, Q6) · version · ©. Nav có link "Privacy".

**Verification:**
- [ ] Đối chiếu từng dòng bảng với `../Pocket QA/manifest.json` + code dùng quyền đó
- [ ] Manual: `<details>` mở/đóng bằng bàn phím; footer wrap gọn ở 375px

**Dependencies:** T7 (cùng sửa `index.html`); Open Question 4, 6

**Files likely touched:** `index.html`, `feature.html`, `promo.css`, `update-vendor.mjs` (nếu đổi markup dòng version ở footer — regex `<div>v… · Manifest V3`)

**Estimated scope:** M

---

## Task 9: Chụp lại screenshot export (5 định dạng), bỏ ghi chú "earlier build"

**Description:** `feature.js:640` tự nhận screenshot export lấy từ "an earlier build that offered two
formats". Chụp lại `shot-export-js(-dark).png` và `shot-export-py(-dark).png` từ build hiện tại theo quy
trình harness trong README (mục "Screenshot comparison"), rồi xóa ghi chú.

**Acceptance criteria:**
- [ ] 4 PNG mới cho thấy modal Export hiện tại (đúng 480px, light + dark), code do generator thật sinh ra.
- [ ] Ghi chú ở `feature.js:640` bị xóa; README vẫn đúng.
- [ ] Không thêm file nào vào repo extension (harness ở thư mục tạm).

**Verification:**
- [ ] Mở `feature.html?id=export`, đổi theme popup → ảnh đổi light/dark đúng
- [ ] `node stamp-feature-js.mjs`

**Dependencies:** None (repo extension ở `../Pocket QA`) — **có thể chạy song song** với Phase 2/3

**Files likely touched:** `screenshots/shot-export-*.png`, `feature.js`, `feature.html` (stamp)

**Estimated scope:** M

---

### Checkpoint 3 (sau T7–T9)
- [ ] Đọc lại toàn trang: không còn số liệu mâu thuẫn, không còn "live preview" sai
- [ ] Mọi claim privacy có nguồn trong code extension
- [ ] Người dùng duyệt nội dung privacy trước khi publish

---

## Phase 4: SEO, hiệu năng, polish

## Task 10: OG / Twitter / canonical / theme-color / JSON-LD + ảnh og

**Description:** Chia sẻ link lên Zalo/Slack/Facebook hiện không có ảnh/tiêu đề đẹp. Thêm meta đầy đủ và
ảnh `og-image.png` 1200×630 (cắt/resize từ `shot-landing-hero.png` 1280×940 bằng Pillow, đã có sẵn).

**Acceptance criteria:**
- [ ] `index.html`: `og:title/description/image/url/type`, `twitter:card=summary_large_image`, `link rel=canonical`, `meta theme-color` (light + dark), `apple-touch-icon`, JSON-LD `SoftwareApplication` (`operatingSystem: Chrome`, `offers.price: 0` chỉ nếu Q2 xác nhận free).
- [ ] `feature.html`: og/twitter chung (ảnh og chung); `feature.js` cập nhật `og:title/description` theo feature (cho crawler có chạy JS).
- [ ] URL tuyệt đối dùng URL production (Q3).

**Verification:**
- [ ] JSON-LD parse được (`JSON.parse` trong console)
- [ ] Sau deploy: kiểm tra bằng một công cụ xem trước link (vd. opengraph.xyz) — **bước của người dùng**

**Dependencies:** T7 (meta description); Open Question 2, 3

**Files likely touched:** `index.html`, `feature.html`, `feature.js`, `og-image.png` (mới)

**Estimated scope:** S

---

## Task 11: Screenshot PNG → WebP

**Description:** 10 ảnh trên trang feature nặng 82–220KB mỗi ảnh. Chuyển sang WebP bằng Pillow (Chrome 109+
và Safari 14+ đều hỗ trợ), giữ PNG gốc cho README và các lần chụp lại.

**Acceptance criteria:**
- [ ] Mỗi `src`/`srcDark` trong `feature.js` trỏ `.webp`; tổng dung lượng ảnh giảm ≥ 50%.
- [ ] Nhìn bằng mắt không khác bản PNG (chữ code trong ảnh export vẫn sắc nét — lossless nếu cần).
- [ ] README ghi chú: chụp lại → xuất PNG → chạy lại bước chuyển WebP (một dòng lệnh).

**Verification:**
- [ ] So sánh tổng byte trước/sau; mở 5 trang feature có ảnh, cả 2 theme
- [ ] `node stamp-feature-js.mjs`

**Dependencies:** T9 (cùng thư mục `screenshots/`)

**Files likely touched:** `screenshots/*.webp` (mới), `feature.js`, `feature.html` (stamp), `README.md`

**Estimated scope:** S

---

## Task 12 (tùy chọn — Q7): Icon emoji → SVG inline

**Description:** Emoji hiển thị khác nhau giữa các OS; "↺" là ký tự trơn, lệch phong cách. Thay 11 icon
feature bằng SVG inline (vd. bộ Lucide, license ISC) ở `index.html` và trường `icon` trong `feature.js`.
Không dùng sprite ngoài + `<use href>` vì trang hay được mở qua `file://` (README).

**Acceptance criteria:**
- [ ] 11 icon cùng phong cách, `aria-hidden="true"`, màu theo `currentColor`/token.
- [ ] Icon giống nhau giữa thẻ trên index và hero trang feature.

**Verification:**
- [ ] Manual: Windows + (nếu có) macOS/iOS; light + dark
- [ ] `node stamp-feature-js.mjs`

**Dependencies:** T7

**Files likely touched:** `index.html`, `feature.js`, `feature.html` (stamp), `promo.css`

**Estimated scope:** M

---

## Task 13 (tùy chọn — Q7): Trang feature tĩnh cho SEO / social preview

**Description:** HTML tĩnh của `feature.html` chỉ có title "Feature — Pocket QA" và "…"; mọi nội dung nằm
trong `feature.js`. Crawler của mạng xã hội không chạy JS → preview chung chung. Viết script Node sinh
`features/<id>.html` với `<title>`, description, og và hero điền sẵn; phần thân vẫn do `feature.js` render.

**Acceptance criteria:**
- [ ] Tách `FEATURES`/`ORDER` khỏi IIFE để Node đọc được (vd. `vm.runInNewContext`), trình duyệt vẫn chạy như cũ.
- [ ] 11 file sinh ra ổn định (chạy lại không đổi diff); link ở index, "Explore other features", prev/next trỏ URL mới; `feature.html?id=x` cũ redirect sang URL mới.
- [ ] `update-vendor.mjs` cập nhật version footer ở cả các file mới; `stamp-feature-js.mjs` stamp cả các file mới.

**Verification:**
- [ ] `curl` (không JS) một trang feature → thấy đúng title/description/og
- [ ] Mở cả 11 trang, kiểm tra prev/next và link cũ `?id=`

**Dependencies:** T10, T12 (nếu làm)

**Files likely touched:** script mới, `feature.js`, `feature.html`, `index.html`, `update-vendor.mjs`, `stamp-feature-js.mjs`

**Estimated scope:** L — tách thành 2 task (tách dữ liệu / script sinh trang) nếu được duyệt

---

### Checkpoint: Complete
- [ ] Mọi acceptance criteria đạt
- [ ] Chạy lại checklist review ban đầu (CTA, mobile, contrast, SEO, console) — không còn mục 🔴/🟠
- [ ] README cập nhật (bảng Files, mục mới về privacy/og/WebP)
- [ ] Người dùng duyệt trước khi commit/push
