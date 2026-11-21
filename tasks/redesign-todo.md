# Tasks — Redesign Demo (phong cách portfolio, EN/VI)

Plan, quyết định kiến trúc, bảng thuật ngữ: [`tasks/redesign-plan.md`](redesign-plan.md).
Mọi file mới nằm trong `redesign/`; **không sửa file nào ở gốc repo**. Kiểm tra ở
`http://localhost:8383/redesign/` bằng `redesign/check-layout.js` (xem "Verification chung" trong plan).

---

## Phase 1: Nền tảng

## Task 1: Khung trang + header/footer + theme/lang + hero có popup

**Description:** Dựng `redesign/index.html` chỉ có header, hero và footer theo portfolio: token màu light/dark
(navy `#1f4e79` + cam `#c2410c`/`#ea7a2e`), Be Vietnam Pro, header cố định 64px (brand có logo Pocket QA, menu
Preview · Features · How it works · Privacy, nút VI/EN, nút theme SVG, nút Add to Chrome, ☰ ≤900px), script
trước first paint (`js`, `lang`, `theme`), `evenOut()`/`noAnchor()`/`animate()` chép từ portfolio. Hero: badge,
h1 "Record any web workflow. / Replay it forever.", lead, 3 CTA (Add to Chrome — free · ▶ See the popup ·
See all features →), stats 2×2, mockup browser + `../popup-demo.html` (giữ `fitPopup`/`fitHeroHeight`), dòng
gợi ý về popup. Footer: link + version (`../store-version.js`). Kèm `check-layout.js`.

**Acceptance criteria:**
- [x] Đổi EN↔VI: brand, link menu, nút, ô stats, header giữ nguyên vị trí + kích thước (đo bằng `check-layout.js`); không cuộn trang.
- [x] Hero ≤ một màn ở 1366×657, 1280×632, 1024×768 (mockup scale, không cắt) và ở 375×812 (chữ và mockup mỗi phần một màn).
- [x] Popup iframe: đổi tab + theme trong popup vẫn chạy, nút extension trên thanh mockup cuộn tới popup; `#demo` không bị header che.

**Verification:**
- [x] `check-layout.js` ở 1366×657, 1024×768, 375×812, EN + VI: 0 tràn, 0 lệch, không cuộn ngang
- [x] Manual: so ảnh chụp với portfolio ở 1366×768 light + dark (màu, chữ, header)
- [x] Console trang + iframe không lỗi; tắt JS (bỏ class `js`) vẫn đọc được hero

**Dependencies:** None

**Files likely touched:** `redesign/index.html`, `redesign/site.css`, `redesign/site.js`, `redesign/check-layout.js`

**Estimated scope:** M

---

### Checkpoint A (sau T1) — ảnh tiến độ, không dừng chờ duyệt (người dùng review khi demo hoàn tất)
- [x] Gửi ảnh 1366×768 (EN light, VI dark) và 375×812 (EN, VI)

---

## Phase 2: Trang chủ

## Task 2: Hai section feature (12 thẻ, EN/VI)

**Description:** `#features` "Record, run, report" (recording, playback, run-results, variables, csv, export) và
`#tools` "Test design & everyday tools" (screenshots, highlights, sql-test-designer, db-test-session, settings +
thẻ CTA Add to Chrome). Thẻ = `.card` của portfolio (icon, tiêu đề, 1 câu, "Learn more →" tới
`feature.html?id=…` trong `redesign/`). Eyebrow có số: "01 · Features", "02 · Tools".

**Acceptance criteria:**
- [x] Mỗi section ≤ một màn ở mọi cỡ màn ≥ 768 rộng, cả EN và VI; lưới 3 cột (≥900) / 2 cột (≥600) / 1 cột, không thẻ lẻ hàng cuối.
- [x] ≤767px: thẻ 4–6 mỗi section là `.more`, nút "Read more / Xem thêm" mở ra và gọi lại `evenOut()`.
- [x] Thẻ cùng hàng cao bằng nhau ở cả 2 ngôn ngữ (thẻ nằm trong `rows`); nội dung VI cùng dữ kiện với EN.

**Verification:**
- [x] `check-layout.js` đủ 15 cỡ màn × EN/VI cho 2 section này
- [x] Manual: bấm 12 thẻ → đúng `feature.html?id=…` (tạm thời 404 tới khi xong T5 — chấp nhận), thẻ CTA mở store tab mới

**Dependencies:** T1

**Files likely touched:** `redesign/index.html`, `redesign/site.css`, `redesign/site.js`

**Estimated scope:** S

---

## Task 3: How it works + Privacy + Permissions (EN/VI)

**Description:** `#how`: 4 bước Record → Refine → Run → Export (dạng timeline/step của portfolio). `#privacy`:
4 điểm (lưu cục bộ, settings sync, một request mỗi ngày, DB rollback chỉ trên Adminer) dạng `.checks`/card 2×2.
`#permissions`: 10 quyền, lưới 2 cột × 5 hàng (tên quyền `code` + lý do). Nội dung lấy nguyên từ `index.html`
gốc (đã đối chiếu code extension v1.0.24) — chỉ dịch, không thêm claim.

**Acceptance criteria:**
- [x] 3 section đều ≤ một màn ở mọi cỡ màn, EN + VI; ≤767px quyền 5–10 là `.more`.
- [x] Đủ 10 quyền như bảng gốc; mỗi câu VI cùng nghĩa câu EN (không thêm/bớt dữ kiện).
- [x] Ô quyền cùng hàng cao bằng nhau, tên quyền thẳng cột.

**Verification:**
- [x] `check-layout.js` 15 cỡ màn × EN/VI
- [x] So từng dòng với `index.html` gốc (`#privacy`) — 4 điểm + 10 quyền

**Dependencies:** T2

**Files likely touched:** `redesign/index.html`, `redesign/site.css`

**Estimated scope:** S

---

## Task 4: FAQ + CTA + scroll spy + kiểm tra toàn trang chủ

**Description:** `#faq`: 4 câu `<details>` (giữ nội dung gốc) + thẻ CTA "Stop repeating yourself" (Add to Chrome —
free · See the popup). Mở/đóng `<details>` gọi `evenOut()` để section không đổi chiều cao khi đổi ngôn ngữ. Menu
tô `active` theo section (scroll spy như portfolio). Chạy checklist §7 cho toàn trang chủ.

**Acceptance criteria:**
- [x] `#faq` ≤ một màn khi đóng hết; mở 1 câu bất kỳ không làm tràn ở ≥ 1024×768 (mobile được dài hơn).
- [x] Checklist §7 đạt cho toàn trang: tràn section, dịch chuyển, chữ lẻ, gạch nối, tràn ngang, console.
- [x] So với trang thật: mọi link/CTA/tính năng của `index.html` gốc đều còn (store ×4, `#demo`, 12 feature link, privacy, FAQ, version live).

**Verification:**
- [x] `check-layout.js` 15 cỡ màn × EN/VI, light + dark (dark ở 1366×768, 375×812)
- [x] Bàn phím: Tab qua menu, nút VI/EN, theme, ☰, `<details>`; Esc đóng menu

**Dependencies:** T3

**Files likely touched:** `redesign/index.html`, `redesign/site.css`, `redesign/site.js`

**Estimated scope:** S

---

### Checkpoint B (sau T2–T4)
- [x] Trang chủ đạt checklist §7 ở 15 cỡ màn × EN/VI
- [x] Người dùng duyệt trang chủ (gửi ảnh từng section, EN + VI)

---

## Phase 3: Trang feature

## Task 5: Template feature + renderer + nội dung EN

**Description:** `redesign/feature.html` dùng header/footer/CSS mới: crumb, hero (icon, eyebrow, tiêu đề, lead,
facts dạng stats), thanh "On this page" sticky dưới header, Overview + live preview (`../popup-demo.html?tab=…&theme=…`,
`fitPreview`), How to use it, detail sections (bảng, ảnh light/dark theo theme popup qua `postMessage`, points,
code), Good to know, Explore other features + prev/next. `features-en.js` = `FEATURES` + `ORDER` chép nguyên văn
từ `feature.js` gốc (ảnh đổi sang `../screenshots/…`). Renderer ghép cặp span EN/VI, thiếu VI → dùng EN.
Chuỗi khung trang (Overview, How to use it, Good to know, Learn more, Previous/Next…) có VI ngay trong task này.

**Acceptance criteria:**
- [x] Đủ 11 trang `?id=` render như trang gốc về nội dung (đếm số point/step/section/hàng bảng/ảnh khớp gốc); id sai → về `index.html#features`.
- [x] "Explore other features" 10 thẻ không để thẻ lẻ (2 cột hoặc 5 cột); scroll spy + preview scale + ảnh light/dark vẫn chạy.
- [x] Đổi EN↔VI không xê dịch header, thanh "On this page", nút, section (đo bằng `check-layout.js`).

**Verification:**
- [x] Script đếm phần tử trên trang gốc và trang demo cho cả 11 id — khớp
- [x] `check-layout.js` ở `recording`, `export`, `screenshots` × 1366×768, 1024×768, 375×812 × EN/VI
- [x] Đo thời gian một lần `evenOut()` ở `recording` (ngưỡng 50ms, xem Risks)

**Dependencies:** T1

**Files likely touched:** `redesign/feature.html`, `redesign/feature.js`, `redesign/features-en.js`, `redesign/site.css`, `redesign/check-layout.js` (thêm so hình dạng EN/VI)

**Estimated scope:** M

---

## Task 6: Dịch VI — recording, playback, run-results, variables

**Description:** Thêm 4 feature vào `FEATURES_VI` (cùng hình dạng EN), theo bảng thuật ngữ; nhãn UI giữ EN,
`code` giữ nguyên, số liệu/phím tắt giống EN; từ có gạch nối bọc `.nw`, cụm liền dùng `&nbsp;` (rule §4).

**Acceptance criteria:**
- [x] Hàm so hình dạng trong `check-layout.js` báo 0 khác biệt cho 4 id này.
- [x] Không câu VI nào thêm/bớt dữ kiện so với EN (tự đối chiếu từng cặp).
- [x] `check-layout.js` trên 4 trang ở 1366×768 + 375×812 VI: không gạch nối cuối dòng, không tràn ngang.

**Verification:**
- [x] Mở 4 trang ở VI, đọc lướt; đổi EN↔VI không xê dịch

**Dependencies:** T5

**Files likely touched:** `redesign/features-vi.js`

**Estimated scope:** M (≈ 3.300 từ)

---

## Task 7: Dịch VI — csv, screenshots, export, highlights

**Description:** Như T6 cho 4 feature tiếp theo (gồm caption ảnh của screenshots/export).

**Acceptance criteria:**
- [x] Hình dạng khớp EN cho 4 id; caption ảnh có VI.
- [x] Không thêm/bớt dữ kiện; `code` mẫu export giữ nguyên.
- [x] Không gạch nối cuối dòng, không tràn ngang (1366×768 + 375×812 VI).

**Verification:**
- [x] Mở 4 trang ở VI; đổi theme popup → ảnh vẫn đổi light/dark

**Dependencies:** T5 (độc lập với T6)

**Files likely touched:** `redesign/features-vi.js`

**Estimated scope:** M (≈ 3.000 từ)

---

## Task 8: Dịch VI — sql-test-designer, db-test-session, settings + kiểm tra toàn trang feature

**Description:** Như T6 cho 3 feature cuối, rồi chạy checklist §7 cho trang feature (11 id, ưu tiên các cỡ màn
trong plan) và hàm so hình dạng cho cả 11 id.

**Acceptance criteria:**
- [x] Hình dạng EN/VI khớp cho đủ 11 id — không còn chuỗi rơi về EN.
- [x] Checklist §7 (trừ "một section một màn", đã miễn cho trang feature) đạt ở 11 id × 1366×768, 375×812 × EN/VI.
- [x] So với trang feature thật: không mất tính năng (preview deep link, full-size link mobile, prev/next, version live).

**Verification:**
- [x] `check-layout.js` + so hình dạng; console sạch trên 11 trang

**Dependencies:** T5 (T6, T7 nếu gộp file)

**Files likely touched:** `redesign/features-vi.js`

**Estimated scope:** M (≈ 2.600 từ)

---

### Checkpoint C — Hoàn tất
- [x] Mọi acceptance criteria T1–T8 đạt
- [ ] Người dùng đọc lại bản VI (trang chủ + ít nhất 2 trang feature)
- [ ] Người dùng quyết định Open Question 2 (thay thế trang gốc hay không) và 3 (push hay không)

---

## Phase 4 (tùy chọn — Open Question 1)

## Task 9: Icon emoji → SVG nét giống portfolio

**Description:** 12 icon thẻ feature + icon hero trang feature đổi sang SVG `stroke="currentColor"` (class `.i`
của portfolio), inline trong HTML và trường `icon` của `features-en.js` (dùng chung cho VI).

**Acceptance criteria:**
- [x] 12 icon cùng nét 1.8, `aria-hidden="true"`, màu theo token; giống nhau giữa thẻ trang chủ và hero trang feature.
- [x] Không còn emoji trong thẻ/icon (dòng gợi ý popup có thể giữ).

**Verification:**
- [x] Manual light + dark ở 1366×768 và 375×812

**Dependencies:** T4, T5

**Files likely touched:** `redesign/index.html`, `redesign/features-en.js`, `redesign/site.css`

**Estimated scope:** S
