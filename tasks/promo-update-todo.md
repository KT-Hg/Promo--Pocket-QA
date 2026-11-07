# Tasks — Cập nhật promo theo extension v1.0.25 → HEAD

Plan, hiện trạng đã xác minh, quyết định kiến trúc: [`tasks/promo-update-plan.md`](promo-update-plan.md).
Extension: `../Pocket QA` (baseline lần sync trước `9e77d06`, bản Store 1.0.27 = `060fcf0`).

## Verification chung (không có test suite / build)
- Preview: `.claude/launch.json` → `promo-static` (http://localhost:8383).
- Viewports: **1366×657**, **1280×632**, **375×812**; EN + VI; light + dark.
- Trong trang (xem đầu `check-layout.js`): `await checkLayout()` → mọi mảng rỗng; trang feature: `checkShape()` → `[]`;
  từ Task 2: `hiddenByFit()` → `[]` ở 1366×657 và 1280×632 (mobile được phép cắt).
- Console trang + iframe không lỗi.
- Sửa `.js`/`.css` của trang → `node stamp-assets.mjs`; sửa `demo.*` → `node sync-from-source.mjs`.
- Ảnh mới: có cặp `-dark`, có `.webp`, `alt` + `caption` EN/VI, được ghi vào bảng screenshots của `README.md`.

---

## Phase 0: Nền

## Task 1: Chốt WIP `taste-restyle`, mở nhánh làm việc

**Description:** Nhánh `taste-restyle` có thay đổi chưa commit (bỏ icon/eyebrow/emoji ở `feature.html`,
`features-*.js`, đổi chữ "Read more" → "Show the rest" trong `site.js`, `.gitignore` thêm `.taste-skill/`) nhưng
`feature.js:59` vẫn gán `#heroIcon` → `TypeError`, trang feature không render. Hoàn thiện cho khớp (bỏ phần
`feature.js` còn đọc `icon`/`eyebrow`), commit, rồi mở nhánh `promo-update` từ đó. Nếu người dùng chọn bỏ WIP
(Open Question 1) thì `git stash` và mở nhánh từ `master`.

**Acceptance criteria:**
- [x] 11 trang `feature.html?id=…` render đủ, console không lỗi.
- [x] `feature.js` không còn tham chiếu `heroIcon`, `heroEyebrow`, `.icon`, `.eyebrow` đã bỏ.
- [x] WIP được commit trên `taste-restyle` (`09dc537`); nhánh `promo-update` mở từ commit đó.

**Verification:**
- [x] `node stamp-assets.mjs`
- [x] Mở 11 trang ở 1366×657: `checkLayout()` + `checkShape()` rỗng (thêm `sql-test-designer` ở 375×812)
- [x] `git status` sạch trước khi mở nhánh mới (trừ các file plan chưa track)

**Ghi chú:** nút cắt list trên trang feature giờ là "Show the rest" / "Xem phần còn lại" (theo comment WIP trong
`site.js`); trang chủ vẫn "Read more" và vẫn có eyebrow `01 ·` — chưa thuộc WIP này. Thanh "On this page" giữ số
`01…` (taste-skill cũng cấm đánh số, để lại cho đợt restyle trang chủ).

**Dependencies:** None (cần trả lời Open Question 1, mặc định: hoàn thiện)

**Files likely touched:** `feature.js`, `feature.html`, `features-en.js`, `features-vi.js`, `site.js`

**Estimated scope:** S

---

## Phase 1: Review — đầu ra `tasks/promo-update-gaps.md`

## Task 2: `hiddenByFit()` + báo cáo item bị giấu trên 11 trang

**Description:** Thêm vào `check-layout.js` một hàm ~10 dòng: với mỗi section, liệt kê `li`/`tr`/`figure` bị giấu
sau nút "Show the rest" (`checkVisibility()` = false khi nút đang hiện). Chạy trên 11 trang ở 1366×657, 1280×632,
375×812, ghi bảng vào `tasks/promo-update-gaps.md` (mục "Bị giấu hôm nay"). Đây là bằng chứng cho lý do 2 trong plan
và là thước đo cho mọi task nội dung sau.

**Acceptance criteria:**
- [x] `hiddenByFit()` trả `[{section, hidden: [text…], shrunk}]`, `[]` khi không có gì bị giấu hay thu nhỏ.
- [x] Bảng 11 trang × 3 viewport trong gaps file (số item bị giấu + 60 ký tự đầu mỗi item).
- [x] Trên `sql-test-designer` ở 1366×657 hàm báo đúng các item của "Inside the analysis screen" đếm bằng tay —
  giờ là 3 (site live là 4: bỏ eyebrow ở Task 1 nhường chỗ cho một dòng).

**Verification:**
- [x] So kết quả hàm với đếm tay (item không render khi nút "Show the rest" đang hiện) trên `sql-test-designer`
- [x] Đầu file `check-layout.js` có dòng hướng dẫn gọi `hiddenByFit()`

**Dependencies:** Task 1

**Files likely touched:** `check-layout.js`, `tasks/promo-update-gaps.md`

**Estimated scope:** S

## Task 3: Gap matrix — 9 trang của popup

**Description:** Với recording, playback, run-results, variables, csv, screenshots, export, highlights, settings:
liệt kê mọi khả năng người dùng thấy được, từ (theo thứ tự ưu tiên) `popup.html`, help card
`popup/help/card-help-data.js` (20 card, 17 thuộc popup: addManual, recording, save, sequence, variables, csv, schedule,
exportCode, capture, screenshot, highlight, hotkeys, notifications, importExport, backup, folders, manage), README extension
(§Popup Tabs, §Action Types, §Switch blocks, §Run Result, §Variable System, §Screenshot Capture, §CSV, §Hotkeys),
`docs/store-description-en.txt`, và `git log 9e77d06..060fcf0`. Mỗi dòng: khả năng · nguồn `file:line` · độ phủ
trên promo (`none` / `thin` = một câu / `hidden` = bị giấu ở 1366×657 / `ok`) · đề xuất (section mới nào, ảnh nào).

**Acceptance criteria:**
- [x] Mỗi trang có bảng riêng; mỗi dòng có nguồn `file:line` và một mức độ phủ (91 dòng, 8 P1 · 28 P2 · 18 P3).
- [x] Mọi thay đổi 1.0.25–1.0.27 (bảng "Đã phát hành" trong plan) xuất hiện ít nhất một dòng.
- [x] Mỗi trang có danh sách section đề xuất (tên EN/VI, ảnh cần chụp, ý chính) — 10 section mới, ~14 ảnh.

**Verification:**
- [x] Đối chiếu 5 dòng `ok` (fe:25, 134, 200, 383, 670) và 5 trích dẫn `help:N` với file thật — khớp
- [x] 17 card của popup đều được dẫn; `sqlcases`, `apicases`, `dbtools` để Task 4

**Phát hiện thêm:** help card `exportCode` của extension ghi Robot / Java "no data file yet", trái với README extension
và code — lỗi ở repo extension, promo đúng.

**Dependencies:** Task 2

**Files likely touched:** `tasks/promo-update-gaps.md`

**Estimated scope:** M

## Task 4: Gap matrix — 3 trang tool (SQL, DB, API Tests)

**Description:** Cùng format Task 3 cho `sql-test-designer`, `db-test-session` và trang mới `api-tests`. Nguồn:
`sqltest.html` + `sqlcases/i18n/en.js` (nhóm key `ui.` `dg.` `diff.` `find.` `hint.` `vb.` `tech.`) + help modal;
`dbtest.html` + `dbtools/i18n/en.js`; `apitest.html` + help card `apicases` + README §API Tests; README §SQL, §DB.
Ghi riêng cái nào đã phát hành / chưa (API Tests, `tool-base`). Đã biết cho SQL: Diagram (`dg.*`: PK/FK, crow's foot,
kéo/pan/zoom/Fit, hover để xem bảng liên quan, trường hợp không có link), Compare before/after (`diff.*`: triage
Changed/Unrelated/Stale), "What was parsed", hints, tùy chọn giới hạn decision table + join conditions, query mẫu.

**Acceptance criteria:**
- [x] 3 bảng (SQL 23 · DB 17 · API 16 dòng); mỗi panel/tab/dialog của 3 trang tool có ít nhất một dòng.
- [x] Mỗi dòng đánh dấu `released` / `1.0.28` (SQL/DB sau 1.0.27 chỉ đổi vỏ; API toàn bộ 1.0.28).
- [x] Danh sách section đề xuất cho mỗi trang (SQL 4 → 7, DB +2, API 5).

**Verification:**
- [x] Mở `sqltest.html` thật (preview `ext-static` mới thêm vào `.claude/launch.json`), bấm qua 4 tab rail, Diagram,
  Compare mode và 4 tab insight — tìm ra lỗi tên 3 nhóm Compare (#5) mà README không cho thấy
- [x] Mọi `data-i18n` khác nhau trong `sqltest.html` (liệt kê bằng script, 81 khoá) thuộc về ít nhất một dòng, trừ
  khoá vỏ trang (tiêu đề, phụ đề, nút theme, 3 bước của màn hình trống)

**Phát hiện thêm:** 3 lỗi P1 của trang SQL (Pairwise, CTE, tên nhóm Compare) có từ trước 1.0.25 — 2 trong số đó do README
extension lỗi thời (R:551, R:647).

**Dependencies:** Task 2

**Files likely touched:** `tasks/promo-update-gaps.md`

**Estimated scope:** M

## Checkpoint 1: Sau Task 2–4
- [ ] Gap matrix đủ 12 trang, có số liệu "bị giấu"
- [ ] **Người dùng duyệt**: chốt section nào thêm, ảnh nào chụp, trả lời Open Questions 2–4

---

## Phase 2: Ảnh chụp thật

## Task 5: `capture-shots.mjs` + shot đầu tiên (dialog Diagram)

**Description:** Script Node trong repo promo: tìm repo extension như `update-vendor.mjs`, `import` động
`<ext>/tools/lib/cdp-browser.mjs`, `launchWithExtension(ext)`, mở trang `chrome-extension://<id>/…`, seed, setup,
chụp vùng cắt sẵn ở light rồi dark, ghi `screenshots/<name>.png` + `.webp`. Danh sách shot là một mảng
`{ name, page, seed?, setup, clip }` trong chính file — không config riêng. Shot đầu: `sqltest.html`, nhập query
3 bảng có JOIN, Analyze, tab Schema → Diagram, chụp dialog.

**Acceptance criteria:**
- [x] `node capture-shots.mjs sql-diagram` tạo 4 file (`.png`/`.webp` × light/dark), chạy lại cho ảnh giống hệt
  (md5 khớp qua 2 lần chạy; ~4 s cho cả hai theme).
- [x] Không thêm dependency npm; profile tạm, không đụng Downloads của người dùng. WebP lossless làm bằng Pillow — cùng
  quy ước sẵn có trong README (WebP của Chrome lossy cả ở quality 100, đã thử) — script báo lỗi nếu thiếu Pillow.
- [x] Lỗi rõ ràng khi không tìm thấy Edge/Chromium hoặc repo extension, hoặc khi gõ sai tên shot (đã thử 2 trường hợp sau).

**Verification:**
- [x] Mở 4 ảnh, so với UI thật mở bằng tay (preview `ext-static`); viewport 1100×700 để dialog `86vh` ra số nguyên
  (680 làm hàng pixel cuối lẫn nền), bấm **Fit** để sơ đồ lấp khung
- [x] README promo: thêm `capture-shots.mjs` vào bảng file, mục "Capturing a shot", đoạn harness cũ thành "How the older
  shots were made"

**Ghi chú:** ảnh chụp từ extension ở `../Pocket QA` (HEAD, đã có `tool-base`); dialog Diagram không thuộc phần vỏ đổi ở
1.0.28 nên dùng được cho đợt A.

**Dependencies:** Checkpoint 1

**Files likely touched:** `capture-shots.mjs`, `README.md`, `screenshots/shot-sql-diagram*.{png,webp}`

**Estimated scope:** M

---

## Phase 3: Đợt A — v1.0.27

## Task 6: Vendor v1.0.27, preview popup đúng bản Store

**Description:** `git -C "../Pocket QA" archive 060fcf0` ra thư mục tạm, `node update-vendor.mjs <thư mục>`. Kiểm
tra preview: 5 file `css/popup` đổi (đặc biệt `03-variables.css` −117 dòng → bảng biến), footer + Settings › Version
= 1.0.27. Seed thêm trong `demo.js` nếu UI mới cần dữ liệu để không lộ là preview tĩnh.

**Acceptance criteria:**
- [x] `vendor/version.txt` = 1.0.27; preview không có thẻ API Tests.
- [x] 5 tab popup hiển thị đủ dữ liệu demo ở light + dark, không control nào trống.
- [x] `sync-from-source.mjs` exit 0.

**Verification:**
- [x] `node update-vendor.mjs <tmp>` (tmp = `git archive 060fcf0`) — tự chạy `stamp-assets` + `sync-from-source`
- [x] So 5 tab trước/sau bằng số đo thay cho ảnh: vị trí, kích thước, màu chữ/nền/viền của mọi phần tử hiện ra (thẻ đã mở
  hết) trên bản `master` và bản mới — 0 khác biệt ở 5 tab × 2 theme (611 phần tử / theme). Thẻ Version = 1.0.27; console
  của demo không lỗi

**Kết quả:** ở 1.0.27 `popup.html` không đổi so với bản vendor cũ; 4 file CSS đổi (màu hàng Upload File, lỗi validation
dưới hàng, độ rộng cột số `--idx-w` có fallback 18px = giá trị preview thật tính cho 9 bước của demo) — demo không dựng
Upload File hay block Switch nên không thấy khác. `demo.js` không cần seed thêm. Comment "checked against v1.0.24" ở
Privacy / Permissions của `index.html` đổi thành 1.0.27 sau khi xác nhận manifest chỉ đổi version và không có lệnh mạng
mới.

**Dependencies:** Task 1

**Files likely touched:** `vendor/*`, `popup-demo.html`, `demo.js`, `index.html`, `feature.html`

**Estimated scope:** M

## Task 7: SQL Test Case Designer chi tiết

**Description:** Viết lại `sql-test-designer` theo gap matrix (Task 4). Hướng mặc định: giữ *Techniques*, *Test data &
sample values*, *Export*; tách *Inside the analysis screen* thành *Schema & diagram* (ảnh Task 5), *Compare
before/after* (ảnh triage + diff), *Case list & inspector* (ảnh workspace hiện có), *Findings & coverage* (ảnh
insight). Notes thêm tùy chọn giới hạn decision table / join conditions và query mẫu. Câu VI lấy từ
`sqlcases/i18n/vi.js` khi có.

**Acceptance criteria:**
- [x] Mọi dòng SQL `none`/`thin`/`hidden` (đã phát hành) trong gap matrix được xử lý hoặc ghi lý do bỏ — bỏ: #6 (pane
  Techniques, không còn chỗ trong section có bảng), #14, #17, #21 (P3).
- [x] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.
- [x] Mỗi section mới có ảnh thật light + dark (`sql-diagram`, `sql-compare`, `sql-coverage`).

**Verification:**
- [x] `node capture-shots.mjs`; `node stamp-assets.mjs`
- [x] `auditFeatures(['sql-test-designer'])` (mới trong `check-layout.js`) ở 1366×657 và 1280×632: mọi danh sách rỗng

**Bài học cho Task 8–15:** section "ảnh + ý" chỉ vừa một màn ở 1366×657 khi mỗi ý ≤ ~100 ký tự (2 dòng), chú thích
1 dòng, lead ≤ 2 dòng; thêm ý vào section có bảng làm bảng hẹp lại và bị cắt.

**Dependencies:** Task 5, Task 6

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`, `README.md`

**Estimated scope:** M

## Task 8: Variables — đổi tên biến, chặn tên sai, gợi ý `${`

**Description:** Thêm section *Rename a variable* vào `variables`: đổi trong mọi scenario (`${…}`, Read DOM target,
Switch, Screenshot → Variable, label), form Add Manual Action đang mở và Undo/Redo đi theo, toast đếm số chỗ, cảnh báo
cột CSV còn tên cũ; modal từ chối tên trùng hoặc chứa `}`/`${`. Ảnh: modal biến + toast. Thêm một dòng liên kết ở
trang `csv` về cảnh báo cột tên cũ.

**Acceptance criteria:**
- [x] Mọi dòng `variables` thuộc 1.0.25–1.0.27 trong gap matrix được xử lý.
- [x] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632 trên `variables` và `csv`.
- [x] Ít nhất một ảnh thật mới cho trang `variables`.

**Verification:**
- [x] So với hành vi thật (e2e `var-rename` của extension mô tả đúng điều ghi trên trang)
- [x] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Task 5, Task 6

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`, `README.md`

**Estimated scope:** S

## Task 9: Recording & Playback — Switch, Upload File, validation

**Description:** Cập nhật `recording`/`playback` theo các thay đổi 1.0.25–1.0.26: Switch (số theo vị trí, edit đi theo
action, Switch mới đặt trước các case, chặn case cắt ngang khối), Upload File (báo file không có trên đĩa, màu riêng
trong list), validation dưới hàng. Thêm ảnh form Add Manual Action và Switch case builder nếu gap matrix đề xuất.

**Acceptance criteria:**
- [x] Mọi dòng `recording`/`playback` thuộc 1.0.25–1.0.27 được xử lý.
- [x] Không còn câu nào mô tả hành vi cũ (vd. số thứ tự cố định `displayNo`).
- [x] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [x] `grep` nội dung cũ theo gap matrix trả về rỗng
- [x] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Task 5, Task 6

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`

**Estimated scope:** M

## Checkpoint: Sau Task 6–9
- [x] 4 trang đã sửa đạt mọi check ở 3 viewport, EN + VI, light + dark
- [x] Người dùng xem trang SQL + Variables, xác nhận "đủ chi tiết" trước khi làm tiếp các trang còn lại

## Task 10: Run results · CSV · Export theo gap matrix

**Description:** Áp mục đề xuất của gap matrix cho 3 trang: section mới cho mỗi chủ đề `thin`/`hidden`, ảnh thật
cho trang chưa có ảnh (run-results, csv).

**Acceptance criteria:**
- [x] Mọi dòng đề xuất (đã duyệt ở Checkpoint 1) của 3 trang được xử lý.
- [x] Mỗi trang có ít nhất một ảnh thật trong section.
- [x] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [x] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Checkpoint sau Task 6–9

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`, `README.md`

**Estimated scope:** M

## Task 11: Screenshots · Highlights · Settings theo gap matrix

**Description:** Như Task 10 cho 3 trang còn lại của popup (highlights hiện chỉ có 1 section, 0 ảnh).

**Acceptance criteria:**
- [x] Mọi dòng đề xuất đã duyệt của 3 trang được xử lý.
- [x] Mỗi trang có ít nhất một ảnh thật trong section.
- [x] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [x] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Checkpoint sau Task 6–9

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`, `README.md`

**Estimated scope:** M

## Task 12: DB Test Session theo gap matrix

**Description:** Áp đề xuất cho `db-test-session` (phần đã phát hành). Seed session bằng `chrome.storage` theo shape
`dbtools/session.js` trong `capture-shots.mjs`; ảnh cắt sát thành phần (panel Adminer, preview SQL, diff một dòng).

**Acceptance criteria:**
- [x] Mọi dòng đề xuất đã duyệt được xử lý; không nhắc tính năng đang ẩn (snapshot, backup table) như đã có.
- [x] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [x] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Checkpoint sau Task 6–9

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`

**Estimated scope:** S

## Task 13: Trang chủ — copy theo store description, thẻ feature khớp trang

**Description:** Đối chiếu `index.html` (hero, stats, meta/og description, 11 thẻ feature, How it works, FAQ) với
`docs/store-description-en.txt`/`-vi.txt` và nội dung trang feature mới; sửa câu lệch, thêm FAQ nếu gap matrix đề xuất.

**Acceptance criteria:**
- [x] Mô tả mỗi thẻ feature khớp lead của trang tương ứng.
- [x] Không câu nào trên trang chủ mâu thuẫn store description.
- [x] `checkLayout()` rỗng ở 3 viewport, EN + VI.

**Verification:**
- [x] Đọc song song hai văn bản; `checkLayout()`; `node stamp-assets.mjs`

**Dependencies:** Task 7–12

**Files likely touched:** `index.html`

**Estimated scope:** S

**Kết quả Task 8–13 (2026-11-02):** 11 ảnh popup mới chụp từ popup thật (`pop-*`) + `db-settings`; mọi trang:
`auditFeatures()` rỗng ở 1366×657 và 1280×632, ở 375×812 chỉ còn item bị giấu (đúng thiết kế). Không làm: ảnh CSV đang chạy
(P2 #7 csv), ảnh highlight trên trang và panel Adminer (cần Adminer thật) — các section đó chỉ có chữ. Task 13: thẻ trang chủ
không mâu thuẫn với nội dung mới, chỉ đổi comment 1.0.24 → 1.0.27 (Task 6).

## Checkpoint A: Đợt A xong
- [x] 11 trang + trang chủ đạt mọi check, EN + VI, light + dark
- [x] README promo cập nhật (bảng files, bảng screenshots, cách chụp)
- [x] **Người dùng duyệt** → merge `promo-update` → deploy (bước của người dùng) — merge `f62fe1c`, đã push (`origin/master` = `2fa0372`)

---

## Phase 4: Đợt B — API Tests (đã có trên Store, bản 1.0.27)

Viết lại 2026-11-03, rồi sửa cùng ngày khi người dùng xác nhận **1.0.27 trên Store đã có API Tests** (Store *last
updated* = CN 01-11). Không chờ 1.0.28: promo đang **chậm hơn** bản thật, và Privacy ở trang chủ đang sai ngay lúc này.
Hiện trạng, quyết định, rủi ro: mục *Đợt B* trong [`promo-update-plan.md`](promo-update-plan.md).

**Bản Store** = `e98ed43`, người dùng xác nhận 2026-11-03 (Sun 11-01 23:35: API Tests đủ, đã đổi tên `sqltest.html`/`dbtest.html`,
**chưa** có giao diện `tool-base` `9d25060` 11-02). Gọi là `<store>` bên dưới.
Mọi ảnh chụp từ một worktree của `<store>` (repo extension đang ở `list-editing` có WIP chưa commit):
`git -C "../Pocket QA" worktree add "<tạm>/pqa-store" <store>` → `EXT_REPO="<tạm>/pqa-store" node capture-shots.mjs …`.

### Phase 4a: Review thay đổi extension

## Task 14: Delta review `060fcf0..<store>` → gap matrix

**Description:** Gap matrix `api-tests` (Task 4) viết ngày 11-02 từ README + help card. Review lại theo nhóm, chia hai cột
**trong bản Store** / **sau bản Store**: API Tests (`apitest.html`, `apicases/`, `css/apicases.css`,
`shared/api-response.js`, `shared/file-export.js`), đổi tên trang tool (`d26264d`), popup (`popup.html` +thẻ API Tests,
`css/var-suggest.css` tách từ `03-variables.css`, help card `apicases`) — trong bản Store; `tool-base` `9d25060`, docs
`00590ec`, nhánh `list-editing` — sau. Đối chiếu 16 dòng API với **code UI ở `<store>`** (`apicases/ui/*.js`,
`apitest.html`), không chỉ README: nhãn nút, toán tử check, menu Export/Import. Kiểm `00590ec` với promo (trang
`export`: Robot qua DataDriver, Java qua TestNG có data file; SQL: Pairwise tới 8, CTE có case riêng) — commit đó chỉ sửa
docs cho khớp code đã có, nên chữ promo phải đúng sẵn.

**Acceptance criteria:**
- [x] Commit `<store>` được **người dùng xác nhận** và ghi vào plan (`e98ed43`, 2026-11-03).
- [x] `promo-update-gaps.md` có bảng *Delta `060fcf0..main`*: nhóm commit → trong/sau bản Store → promo impact → task.
- [x] 16 dòng `api-tests` có nguồn `file:line` ở `<store>`; danh sách section + ảnh (tên shot, seed, vùng cắt) cho Task 15–19.

**Verification:**
- [x] `git -C "../Pocket QA" log --oneline 060fcf0..main` — mọi commit có mặt trong bảng (33/33, cả 2 commit `list-editing`)
- [x] `grep -n "DataDriver\|TestNG\|Pairwise\|CTE" features-en.js features-vi.js` khớp `00590ec` — không cần sửa

**Dependencies:** Checkpoint A

**Files likely touched:** `tasks/promo-update-gaps.md`, `tasks/promo-update-plan.md`

**Estimated scope:** S (một file, đọc nhiều)

## Task 15: `capture-shots.mjs` cho `apitest.html` — API giả + shot đầu

**Description:** Rủi ro kỹ thuật lớn nhất, làm sớm. `apitest.html` cần `chrome.storage` và response thật → chụp qua
trình duyệt có extension như shot SQL, từ worktree `<store>`. Thêm vào server cục bộ sẵn có của `capture-shots.mjs`
vài route giả (vd. `POST /auth/login` → `{token}`, `GET /orders/42` → JSON, một `POST` cho bước hỏi-trước-khi-ghi), seed
`apiCasesState` (`apicases/model.js:17`): folder *Shop*, login + order, auth Bearer `${token}`. Shot đầu `api-send`:
request đã Send, response JSON, tab Checks có verdict. Host trông thật bằng `--host-resolver-rules` nếu
`launchWithExtension` nhận thêm flag, không thì để `127.0.0.1`. Dùng chính các lần chạy này để bấm thử 16 dòng
gap matrix → cột **thấy**.

**Acceptance criteria:**
- [x] `EXT_REPO=<worktree store> node capture-shots.mjs api-send` ra `shot-api-send{,-dark}.{png,webp}`, response từ route giả. (Thay worktree bằng `git archive e98ed43` ra thư mục tạm — không đụng repo extension; route giả = CDP `Fetch`, không cần server. Chụp luôn `api-checks`, `api-env`, `api-ask`, `api-run`, `api-import` cho Task 18–19.)
- [x] Không cần mạng ngoài; chạy lại cho cùng ảnh (không giờ/ngày đổi trong vùng cắt). — Không cần mạng ✓; 3/6 shot giống hệt; `api-send`/`api-checks` khác số ms, `api-run` khác giờ chạy + ms — **người dùng chấp nhận (2026-11-04)**, không giả lập đồng hồ (như các shot popup có giờ).
- [x] Gap matrix: 16 dòng API có **thấy** hoặc ghi chú khác biệt (bảng *Bấm thử trên bản Store*, 18 dòng).

**Verification:**
- [x] Chạy 2 lần, so ảnh (Pillow `ImageChops`); mở ảnh light + dark

**Dependencies:** Task 14

**Files likely touched:** `capture-shots.mjs`, `screenshots/*`, `tasks/promo-update-gaps.md`

**Estimated scope:** M

## Checkpoint B1: Sau Task 14–15
- [x] **Người dùng duyệt** gap matrix API + danh sách section/ảnh, trả lời Open Questions 5–9 của plan — duyệt theo mặc định, 2026-11-04

### Phase 4b: Sửa ngay cái đang sai

## Task 16: Privacy / Permissions cho API Tests — merge riêng, trước

**Description:** Trang live đang nói sai: `index.html:345` ("the one request it makes"), `:368` ("One request out, once
a day"). Viết lại: Pocket QA tự gọi một request/ngày; request của API Tests chỉ đi khi bấm Send/Run, tới server người dùng
chọn, kèm cookie của trình duyệt (tắt được ở tab Settings của request), non-GET mang `Origin: chrome-extension://…`,
`Set-Cookie` là thật; Backup chứa case + environment (cả token), và dialog Environments hiện token nguyên văn (Task 15). Permissions: `<all_urls>` (`index.html:400`) thêm
"request của API Tests đi không vướng CORS" — manifest không đổi quyền. Nhánh nhỏ `promo-privacy-api`, merge + push
ngay khi người dùng duyệt, không chờ trang API.

**Acceptance criteria:**
- [x] Không câu nào khẳng định extension chỉ gửi một request; các ý trên có mặt, EN + VI. — `68b887c` trên `promo-privacy-api`. Trừ 2 ý chuyển sang notes trang API (Task 19): `Origin: chrome-extension://…` và token hiện nguyên văn trong dialog Environments — 6 thẻ cao 780px trong màn 593px ở 1366×657, nên giữ 4 thẻ (thẻ 4 gộp API + SQL hoàn tác).
- [x] `checkLayout()` rỗng cho Privacy/Permissions ở 3 viewport. — 1366×657, 1280×632, 375×812 rỗng; so với `master` ở 10 viewport: Privacy không cao hơn ở đâu, Permissions y nguyên (overflow có sẵn ở 1280×585, 375×548, 360×612 là của `master`).

**Verification:**
- [x] Đối chiếu help card `apicases` *Giới hạn của trình duyệt* ở `<store>` ✓; **người dùng duyệt nội dung privacy** ✓ — merge `4d06c86` vào `master`, đã push (2026-11-07)

**Dependencies:** Task 14 (chắc ý nào có trong bản Store)

**Files likely touched:** `index.html`

**Estimated scope:** S

### Phase 4c: Trang API Tests, nhánh `promo-api-store`

## Task 17: Vendor bản Store — thẻ API Tests ở tab Data

**Description:** Đợt A vendor từ `060fcf0` để giấu thẻ API Tests — giờ thẻ đó có trên Store nên preview đang thiếu.
`git -C "../Pocket QA" archive <store>` ra thư mục tạm → `node update-vendor.mjs <thư mục>` → `node sync-from-source.mjs`.
Diff `popup.html` chỉ có `<link>` `css/var-suggest.css` và thẻ *API Tests* (`#openApiCases`). `03-variables.css` −117
dòng chuyển sang `var-suggest.css` → so ảnh tab Data/Record trước–sau. `version.txt` vẫn 1.0.27.

**Acceptance criteria:**
- [ ] Preview tab Data có thẻ API Tests (light + dark); nút bị chặn như mọi nút khác (`demo.js` `BLOCKED`).
- [ ] `sync-from-source.mjs` exit 0; console trang + iframe không lỗi; tab Record/Data không lệch ngoài thẻ mới.

**Verification:**
- [ ] So ảnh `shot-tab-data` cũ/mới; `checkLayout()` trên `index.html`

**Dependencies:** Task 14

**Files likely touched:** `vendor/*`, `popup-demo.html`

**Estimated scope:** S

## Task 18: Trang `api-tests` — khung + *Send & read the response* + *Checks & the verdict*

**Description:** Thêm `'api-tests'` vào `FEATURES_EN`/`FEATURES_VI` (`tab: 'tabData'`) và `FEATURE_ORDER` (sau
`db-test-session`). Lead + At a glance + steps (theo *From a cURL to a run in CI* của README extension), 2 section đầu
theo gap matrix, ảnh `api-send` + 1 ảnh checks. VI lấy câu chữ từ help card `apicases` vi; nhãn UI giữ tiếng Anh
(`apitest.html` không có i18n) và nói rõ một lần.

**Acceptance criteria:**
- [ ] `feature.html?id=api-tests` render đủ; prev/next và "Explore other features" có trang mới; hero mở tab Data có thẻ API Tests.
- [ ] `checkShape()` = `[]`; `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [ ] `node stamp-assets.mjs`; Verification chung ở 3 viewport, EN + VI, light + dark

**Dependencies:** Checkpoint B1, Task 17

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`

**Estimated scope:** M

## Task 19: Trang `api-tests` — environments/auth, chạy nhiều, Postman & CI, giới hạn

**Description:** Các section còn lại: *Environments, saved values & auth* (ảnh dialog Environments / Save values),
*Running many* (ảnh folder đã Run: ✓ ✗ ⚠, hỏi trước POST, Export → Results CSV), *Postman & CI* (Export v2.1, Import có
xem trước, khối code `npx newman run …`), notes *Limits of a browser* — phải có `Origin: chrome-extension://…` và
"dialog Environments hiện token nguyên văn" (chuyển từ Privacy trang chủ, Task 16). ≤ 8 section nội dung.

**Acceptance criteria:**
- [ ] Mỗi section có ảnh thật light + dark (trừ *Postman & CI* nếu chỉ cần khối code — ghi lý do).
- [ ] Notes có đủ 6 ý *Limits of a browser* (README extension `## API Tests`).
- [ ] `checkShape()`, `hiddenByFit()` như Task 18.

**Verification:**
- [ ] `EXT_REPO=<worktree store> node capture-shots.mjs api-…`; `node stamp-assets.mjs`; Verification chung

**Dependencies:** Task 18

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`

**Estimated scope:** M

## Task 20: Trang chủ & README — 12 tính năng

**Description:** Thẻ *API Tests* trong `#tools` (`index.html:232`, thành 6 thẻ — kiểm lưới không lẻ hàng), link
`feature.html?id=api-tests`; FAQ trỏ sang trang API nếu Task 16 cần. "eleven" → "twelve" ở `README.md:8`, `:81`, comment
`features-en.js:2` (+ VI). Meta description / `og:description` (`index.html:12`, `:24`) theo Open Question 7 của plan.
README promo: bảng screenshots thêm shot API; `sqlcases.html`/`dbtools.html` → `sqltest.html`/`dbtest.html` trong mô tả
(`README.md:225–259`) — tên đã đổi từ bản Store (`d26264d`), ảnh thì giữ (giao diện chưa đổi).

**Acceptance criteria:**
- [ ] Lưới `#tools` không có thẻ lẻ hàng ở 1366×657, 1280×632, 375×812.
- [ ] `grep -rn -i "eleven\|mười một"` và `grep -rn "sqlcases.html\|dbtools.html"` (trừ `tasks/`, `.claude/`) rỗng.

**Verification:**
- [ ] `checkLayout()` trên `index.html`, EN + VI, light + dark

**Dependencies:** Task 18

**Files likely touched:** `index.html`, `README.md`, `features-en.js`, `features-vi.js`

**Estimated scope:** S

## Checkpoint B: Đợt B xong
- [ ] 12 trang + trang chủ đạt `checkLayout`/`checkShape`/`hiddenByFit`, EN + VI, light + dark
- [ ] Không câu nào nói về thứ chỉ có sau `<store>` (`tool-base`, `list-editing`)
- [ ] **Người dùng đọc** trang `api-tests` (cả VI) → merge `promo-api-store` → push (bước của người dùng)

### Phase 4d: Bản sau (1.0.28)

## Task 21: Khi bản có `tool-base` lên Store — chụp lại ảnh toàn trang tool

**Description:** `shot-sqlcases-analysis*`, `shot-dbtools-manager*` là giao diện trước `tool-base` — vẫn đúng với bản
Store hiện tại. Khi Store có `9d25060`: chụp lại từ `sqltest.html` / `dbtest.html` (worktree của commit phát hành), tên
mới `shot-sql-workspace*` / `shot-db-manager*`, sửa `src` trong `features-*.js` và README, xoá ảnh cũ; chụp lại các shot
`api-*` nếu khung trang đổi. Cùng lúc: `git log <store>..<commit mới>` để xem `list-editing` (danh sách action không
nháy, bộ lọc folder được nhớ, action vừa lưu nhấp nháy) có đáng một dòng trên trang `recording` không.

**Acceptance criteria:**
- [ ] Store có `tool-base`; ảnh mới light + dark, `.png` + `.webp`; `grep -rn "shot-sqlcases\|shot-dbtools-manager"` rỗng.

**Verification:**
- [ ] Mở `sql-test-designer`, `db-test-session`, `api-tests` ở light + dark; `hiddenByFit()` không đổi

**Dependencies:** Checkpoint B, Store có `9d25060`

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `screenshots/*`, `README.md`

**Estimated scope:** S
