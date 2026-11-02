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
- [ ] Mọi dòng SQL `none`/`thin`/`hidden` (đã phát hành) trong gap matrix được xử lý hoặc ghi lý do bỏ.
- [ ] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.
- [ ] Mỗi section mới có ảnh thật light + dark.

**Verification:**
- [ ] `node capture-shots.mjs sql-…` cho các ảnh mới; `node stamp-assets.mjs`
- [ ] `checkLayout()`, `checkShape()`, `hiddenByFit()` ở 3 viewport, EN + VI, light + dark

**Dependencies:** Task 5, Task 6

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`, `README.md`

**Estimated scope:** M

## Task 8: Variables — đổi tên biến, chặn tên sai, gợi ý `${`

**Description:** Thêm section *Rename a variable* vào `variables`: đổi trong mọi scenario (`${…}`, Read DOM target,
Switch, Screenshot → Variable, label), form Add Manual Action đang mở và Undo/Redo đi theo, toast đếm số chỗ, cảnh báo
cột CSV còn tên cũ; modal từ chối tên trùng hoặc chứa `}`/`${`. Ảnh: modal biến + toast. Thêm một dòng liên kết ở
trang `csv` về cảnh báo cột tên cũ.

**Acceptance criteria:**
- [ ] Mọi dòng `variables` thuộc 1.0.25–1.0.27 trong gap matrix được xử lý.
- [ ] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632 trên `variables` và `csv`.
- [ ] Ít nhất một ảnh thật mới cho trang `variables`.

**Verification:**
- [ ] So với hành vi thật (e2e `var-rename` của extension mô tả đúng điều ghi trên trang)
- [ ] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Task 5, Task 6

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`, `README.md`

**Estimated scope:** S

## Task 9: Recording & Playback — Switch, Upload File, validation

**Description:** Cập nhật `recording`/`playback` theo các thay đổi 1.0.25–1.0.26: Switch (số theo vị trí, edit đi theo
action, Switch mới đặt trước các case, chặn case cắt ngang khối), Upload File (báo file không có trên đĩa, màu riêng
trong list), validation dưới hàng. Thêm ảnh form Add Manual Action và Switch case builder nếu gap matrix đề xuất.

**Acceptance criteria:**
- [ ] Mọi dòng `recording`/`playback` thuộc 1.0.25–1.0.27 được xử lý.
- [ ] Không còn câu nào mô tả hành vi cũ (vd. số thứ tự cố định `displayNo`).
- [ ] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [ ] `grep` nội dung cũ theo gap matrix trả về rỗng
- [ ] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Task 5, Task 6

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`

**Estimated scope:** M

## Checkpoint: Sau Task 6–9
- [ ] 4 trang đã sửa đạt mọi check ở 3 viewport, EN + VI, light + dark
- [ ] Người dùng xem trang SQL + Variables, xác nhận "đủ chi tiết" trước khi làm tiếp các trang còn lại

## Task 10: Run results · CSV · Export theo gap matrix

**Description:** Áp mục đề xuất của gap matrix cho 3 trang: section mới cho mỗi chủ đề `thin`/`hidden`, ảnh thật
cho trang chưa có ảnh (run-results, csv).

**Acceptance criteria:**
- [ ] Mọi dòng đề xuất (đã duyệt ở Checkpoint 1) của 3 trang được xử lý.
- [ ] Mỗi trang có ít nhất một ảnh thật trong section.
- [ ] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [ ] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Checkpoint sau Task 6–9

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`, `README.md`

**Estimated scope:** M

## Task 11: Screenshots · Highlights · Settings theo gap matrix

**Description:** Như Task 10 cho 3 trang còn lại của popup (highlights hiện chỉ có 1 section, 0 ảnh).

**Acceptance criteria:**
- [ ] Mọi dòng đề xuất đã duyệt của 3 trang được xử lý.
- [ ] Mỗi trang có ít nhất một ảnh thật trong section.
- [ ] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [ ] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Checkpoint sau Task 6–9

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`, `README.md`

**Estimated scope:** M

## Task 12: DB Test Session theo gap matrix

**Description:** Áp đề xuất cho `db-test-session` (phần đã phát hành). Seed session bằng `chrome.storage` theo shape
`dbtools/session.js` trong `capture-shots.mjs`; ảnh cắt sát thành phần (panel Adminer, preview SQL, diff một dòng).

**Acceptance criteria:**
- [ ] Mọi dòng đề xuất đã duyệt được xử lý; không nhắc tính năng đang ẩn (snapshot, backup table) như đã có.
- [ ] `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.

**Verification:**
- [ ] `checkLayout()`, `checkShape()`, `hiddenByFit()`; `node stamp-assets.mjs`

**Dependencies:** Checkpoint sau Task 6–9

**Files likely touched:** `features-en.js`, `features-vi.js`, `capture-shots.mjs`, `screenshots/*`

**Estimated scope:** S

## Task 13: Trang chủ — copy theo store description, thẻ feature khớp trang

**Description:** Đối chiếu `index.html` (hero, stats, meta/og description, 11 thẻ feature, How it works, FAQ) với
`docs/store-description-en.txt`/`-vi.txt` và nội dung trang feature mới; sửa câu lệch, thêm FAQ nếu gap matrix đề xuất.

**Acceptance criteria:**
- [ ] Mô tả mỗi thẻ feature khớp lead của trang tương ứng.
- [ ] Không câu nào trên trang chủ mâu thuẫn store description.
- [ ] `checkLayout()` rỗng ở 3 viewport, EN + VI.

**Verification:**
- [ ] Đọc song song hai văn bản; `checkLayout()`; `node stamp-assets.mjs`

**Dependencies:** Task 7–12

**Files likely touched:** `index.html`

**Estimated scope:** S

## Checkpoint A: Đợt A xong
- [ ] 11 trang + trang chủ đạt mọi check, EN + VI, light + dark
- [ ] README promo cập nhật (bảng files, bảng screenshots, cách chụp)
- [ ] **Người dùng duyệt** → merge `promo-update` → deploy (bước của người dùng)

---

## Phase 4: Đợt B — khi Store = 1.0.28

## Task 14: Vendor HEAD (thẻ API Tests, `var-suggest.css`)

**Description:** Kiểm tra shields.io = 1.0.28, rồi `node update-vendor.mjs` từ repo extension thật. Preview tab Data
có thẻ API Tests; `<link>` `css/var-suggest.css` được vendor và trỏ đúng.

**Acceptance criteria:**
- [ ] `vendor/version.txt` = 1.0.28; thẻ API Tests hiện ở tab Data (light + dark).
- [ ] `sync-from-source.mjs` exit 0; console iframe không lỗi.

**Verification:**
- [ ] `node update-vendor.mjs` rồi `node sync-from-source.mjs`; so ảnh tab Data

**Dependencies:** Checkpoint A, Store = 1.0.28

**Files likely touched:** `vendor/*`, `popup-demo.html`, `demo.js`, `index.html`, `feature.html`

**Estimated scope:** S

## Task 15: Trang `api-tests` (trang thứ 12) + thẻ ở trang chủ

**Description:** Thêm `'api-tests'` vào `FEATURES_EN`/`FEATURES_VI` + `FEATURE_ORDER` (`tab: 'tabData'`). Section theo
gap matrix, mặc định: *Send & read the response* (Paste/Copy cURL), *Checks & the verdict*, *Environments, saved values,
auth*, *Running many* (+ CSV), *Postman & CI* (export v2.1 cho Newman, import), notes = *Limits of a browser*. Thêm thẻ
vào `#tools` trên `index.html` (6 thẻ — kiểm lưới), README "eleven" → "twelve". VI lấy từ help card `apicases` vi.

**Acceptance criteria:**
- [ ] Trang render đủ, prev/next + "Explore other features" có `api-tests`, popup hero mở tab Data.
- [ ] Mỗi section có ảnh thật light + dark; `hiddenByFit()` = `[]` ở 1366×657 và 1280×632.
- [ ] `checkShape()` = `[]`; lưới thẻ `#tools` không có thẻ lẻ hàng ở 3 viewport.

**Verification:**
- [ ] `node capture-shots.mjs api-…`; `node stamp-assets.mjs`
- [ ] `checkLayout()` trên `index.html` và trang mới, EN + VI, light + dark

**Dependencies:** Task 14

**Files likely touched:** `features-en.js`, `features-vi.js`, `index.html`, `capture-shots.mjs`, `README.md`

**Estimated scope:** M

## Task 16: Privacy / Permissions / FAQ cho API Tests

**Description:** Sửa section Privacy (`index.html:345`, `:368` "One request out…"): Pocket QA tự gọi một request/ngày;
request của API Tests đi tới server người dùng chọn, non-GET mang `Origin: chrome-extension://…`, `Set-Cookie` ghi
thật vào trình duyệt, Backup chứa case + environment (cả token). Thêm FAQ nếu cần.

**Acceptance criteria:**
- [ ] Không câu nào trên trang khẳng định extension "chỉ gửi một request".
- [ ] Bốn ý ở trên có mặt, EN + VI.
- [ ] `checkLayout()` rỗng cho section Privacy/FAQ ở 3 viewport.

**Verification:**
- [ ] Đối chiếu help card `apicases` "Limits of a browser"; **người dùng duyệt nội dung privacy**

**Dependencies:** Task 15

**Files likely touched:** `index.html`

**Estimated scope:** S

## Task 17: Chụp lại ảnh toàn trang tool theo `tool-base`

**Description:** Thay `shot-sqlcases-analysis*` và `shot-dbtools-manager*` bằng ảnh chụp từ `sqltest.html`/`dbtest.html`
mới (top bar + cột trái thu gọn) qua `capture-shots.mjs`; đổi tên file theo trang mới, sửa `src` trong `features-*.js`
và bảng screenshots trong README (cả `sqlcases.html`/`dbtools.html` → tên mới).

**Acceptance criteria:**
- [ ] Không còn ảnh/README nào nhắc `sqlcases.html` hay `dbtools.html`.
- [ ] Ảnh mới light + dark, `.png` + `.webp`; ảnh cũ bị xoá khỏi repo.

**Verification:**
- [ ] `grep -r "sqlcases.html\|dbtools.html"` rỗng; mở 2 trang feature xem ảnh ở light + dark

**Dependencies:** Task 14

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `screenshots/*`, `README.md`

**Estimated scope:** S

## Checkpoint B: Đợt B xong
- [ ] 12 trang + trang chủ đạt mọi check, EN + VI, light + dark; Store = 1.0.28
- [ ] **Người dùng duyệt** → merge → deploy (bước của người dùng)
