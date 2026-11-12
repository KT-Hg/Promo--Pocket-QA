# Tasks — Cập nhật promo theo giao diện extension v1.0.30

Plan, review, gap matrix, quyết định: [`tasks/promo-130-plan.md`](promo-130-plan.md) (mục 8: đối chiếu local, chỗ đổi so
với mục 5). Extension: `../Pocket QA`, bản Store 1.0.30 = **`4fb11ce`** (*chờ xác nhận — câu hỏi 1*); bản promo đang mô tả
1.0.27 = `e98ed43`. Nguyên tắc chốt 2026-11-12: **ưu tiên giống extension thực tế**.

## Trước Task 1
- [ ] Trả lời 3 câu hỏi mở (plan mục 7); mặc định: Store = `4fb11ce` · thông điệp "tắt trên mỗi tab" vào **FAQ** ·
  **Phase 1 deploy trước**. Ghi câu trả lời vào plan mục 7.
- [ ] `c8ba363` (chữ trang API Tests: Data → Tools; popup không đổi) có lên Store trước Checkpoint 1 không? Quyết định
  `<store>` cho Task 4 và `alt` của `api-env` — plan mục 9.
- [x] Nhánh làm việc: `git switch -c promo-130 master`.

## Verification chung (không có test suite / build)
- Bản Store ra thư mục tạm, **không** dùng working tree của extension:
  `rm -rf "$TEMP/pqa-130" && mkdir -p "$TEMP/pqa-130" && git -C "../Pocket QA" archive 4fb11ce | tar -x -C "$TEMP/pqa-130"`.
- Preview: `.claude/launch.json` → `promo-static` (http://localhost:8383). Không dùng `npx serve` (mất query string).
- Viewports: **1366×657**, **1280×632**, **375×812**; EN + VI; light + dark.
- Trong trang (xem đầu `check-layout.js`): `await checkLayout()` → mọi mảng rỗng; trang feature: `checkShape()` → `[]`;
  section mới: `hiddenByFit()` → `[]` ở 1366×657 và 1280×632.
- Console trang + iframe không lỗi; trong frame `__promoDemoGuard === 'extension-fence v2'`.
- Sửa `.js`/`.css` của trang → `node stamp-assets.mjs`; sửa `demo.*` → `node sync-from-source.mjs`. Không sửa tay
  `popup-demo.html`.
- Ảnh: chụp bằng `EXT_REPO="$TEMP/pqa-130" node capture-shots.mjs <tên>`; có cặp `-dark`, có `.webp`, `alt` + `caption`
  EN/VI, ghi vào bảng screenshots của `README.md`. Chỉ ảnh thật — không chụp ổn định được thì bỏ ảnh, không làm giả.
- Chữ: tên nút/tab chép đúng UI, kể cả bản VI (bảng chuỗi ở file bàn giao §8, hoặc `popup.html` / `popup/help/card-help-data.js`
  của `4fb11ce`).

---

## Phase 1 — Đúng với bản Store (tuần tự trên nhánh `promo-130`)

## Task 1: Vendor 1.0.30 và trạng thái demo như popup thật

**Description:** Kéo `popup.html` + CSS của `4fb11ce` vào `vendor/`, rồi sửa trạng thái giả trong `demo.js` để demo chỉ
hiện thứ popup thật hiện được: thanh trạng thái *Active* + **Turn off** (tab đã bật, `allowAllTabs` tắt — như
`popup/tab-activation.js:138–147`), hàng action dựng y hệt `createActionListItem` (`popup/record/preview.js:449`): tên ở
`.value-main`, selector ở `.value-target`, 🔒 `.secret-mark` cho ô mật khẩu, nút `+` `.ins-gap`; Settings như bản cài mới
(4 nhóm thông báo bật, countdown bật 3 s). README promo theo 1.0.30.

**Acceptance criteria:**
- [x] `vendor/version.txt` = `1.0.30`; footer + thẻ Version = 1.0.30; `popup-demo.html` sinh lại.
- [x] Mọi chuỗi `demo.js` gán vào DOM có trong `4fb11ce` (không còn `Active on this tab`, không còn `value-label`); các bước
  ghi có tên (*Email*, *Password* 🔒, *Log in*), selector ở dòng dưới; rê chuột hàng hiện `+` với `title`
  *Insert an action below action N*.
- [x] `notifyOnComplete` checked; `screenshotCountdownEnabled` checked, `#screenshotCountdownRow` hiện, giá trị 3; comment
  và README không còn nhắc tab *Data* / lock / *activating* (bảng Runtime state, What's interactive, `:222`, `:247` → `4fb11ce`).

**Verification:**
- [x] `node update-vendor.mjs "$TEMP/pqa-130"` chạy sạch; `node sync-from-source.mjs`; `node stamp-assets.mjs`.
- [x] `grep -n "Active on this tab\|value-label\|activating" demo.js README.md` rỗng (trừ chỗ cố ý, ghi lý do).
- [x] Mỗi chuỗi mới: `git -C "../Pocket QA" grep -n "<chuỗi>" 4fb11ce` có kết quả.
- [x] Mở `popup-demo.html?tab=tabRecord|tabData|tabCapture|tabHighlight|tabSettings`, light + dark: nhãn *Run several ·
  on a schedule · from a CSV* + 3 thẻ ở Record & Play; Tools không lock; hotkey Settings không mờ; guard còn `extension-fence v2`.

**Done 2026-11-12:** vendor từ `4fb11ce` (`c8ba363` không đổi popup/CSS — plan mục 9). Thêm: ô *Other pages* ở
tab Highlight hiện `— Other pages —` như `popup/highlight.js` (trước đó là chuỗi tự đặt). Ngoại lệ có chủ ý: toast
*Preview only — install Pocket QA to use this* của guard demo.

**Dependencies:** câu hỏi 1

**Files likely touched:** `vendor/*` (sinh), `popup-demo.html` (sinh), `demo.js`, `README.md`, `index.html`/`feature.html`
(chỉ dấu version, do script)

**Estimated scope:** M

## Task 1b: So pixel demo ↔ popup thật

**Description:** Thêm chế độ `parity` vào `capture-shots.mjs`: seed popup thật (`$TEMP/pqa-130`) bằng đúng dữ liệu
`demo.js` dùng (scenario *Login flow* với các bước Task 1, 4 biến, highlight, `lastRun` đặt thẳng vào `chrome.storage.local`,
`activatedTabs` cho tab mẫu), chụp 5 tab ở 480 px light + dark; chụp `popup-demo.html` cùng tab, cùng cỡ; so bằng Pillow
`ImageChops.difference`, in vùng khác (bbox). Chỗ nào không seed được y hệt thì sửa `demo.js` theo popup thật, không ngược lại.

**Acceptance criteria:**
- [ ] `node capture-shots.mjs parity` sinh 20 ảnh (5 tab × 2 theme × demo/thật) + báo cáo bbox khác biệt mỗi cặp.
- [ ] Khác biệt chỉ nằm ở vùng liệt kê trong README (thời gian tương đối, banner cập nhật…), mỗi vùng một lý do.
- [ ] Cặp `shot-popup-original` / `shot-popup-demo` trong README thay bằng kết quả parity.

**Verification:**
- [ ] Chạy 2 lần liền: cùng bbox (không nhiễu).
- [ ] Cố ý đổi một chữ trong `demo.js` → parity báo khác ở đúng chỗ đó → hoàn lại.

**Dependencies:** Task 1

**Files likely touched:** `capture-shots.mjs`, `demo.js` (nếu lệch), `README.md`, `screenshots/shot-popup-*`

**Estimated scope:** M — rủi ro cao nhất Phase 1, làm ngay sau Task 1

## Task 2: Sửa chữ đang sai, EN + VI

**Description:** Mọi dòng ở plan mục 3a trong `features-en.js` / `features-vi.js`: Data → **Tools** (6 `tabLabel` + 13 dòng
mỗi ngôn ngữ), Activate → **Turn on** (hỏi khi Start Recording / Play / 🎯 Pick), Schedule/CSV ở Record & Play → *Run
several · on a schedule · from a CSV*, progress panel → run panel + Now Playing có ■ Stop, Scroll/Segment **↕ Down / ↔
Across**, SQL mở bằng tiếng Anh, thông báo bật sẵn, thêm hàng *Finished · no checks* vào bảng verdict `run-results`.

**Acceptance criteria:**
- [ ] `grep -n "Data tab\|Data →\|Data ›\|tab Data\|Activate\|activated\|kích hoạt\|Scroll V\|Segment V\|Vietnamese by default\|progress panel" features-*.js`
  chỉ còn chỗ cố ý (ghi lý do trong commit).
- [ ] Bảng verdict có *✓ Finished · no checks* + ý gợi ý thêm Assert; `settings` không còn "Tick the categories".
- [ ] Shape EN = VI.

**Verification:**
- [ ] `checkShape()` = `[]`; `checkLayout()` sạch trên `recording`, `playback`, `csv`, `run-results`, `screenshots`,
  `settings`, `sql-test-designer` + 6 trang Tools, EN + VI.
- [ ] `node stamp-assets.mjs`.

**Dependencies:** Task 1 (chữ phải khớp demo mới)

**Files likely touched:** `features-en.js`, `features-vi.js`

**Estimated scope:** M

## Task 3: Hero trang `csv` mở đúng thẻ (`card=`)

**Description:** Tham số mới `card=<id>` trong deep link của demo (§10 `demo.js`): bỏ `collapsed` của thẻ đó và
`scrollIntoView({ block: 'nearest' })`. `feature.js` (`syncPreview`, `:207`) thêm `&card=` khi feature có `card`. `csv`:
`tab: 'tabRecord'`, `card: 'csvRunCard'` ở cả EN và VI.

**Acceptance criteria:**
- [ ] `feature.html?id=csv` mở popup ở Record & Play, thẻ CSV Data-Driven Run mở sẵn, trong khung nhìn, light + dark.
- [ ] Đổi theme / đổi ngôn ngữ vẫn giữ `card=`; trang không có `card` không đổi hành vi.

**Verification:**
- [ ] Kiểm ở 1366×657, 1280×632, 375×812; `checkShape()` = `[]` (field `card` có ở cả hai file).
- [ ] `node sync-from-source.mjs`; `node stamp-assets.mjs`.

**Dependencies:** Task 2 (cùng sửa `features-*.js`)

**Files likely touched:** `demo.js`, `feature.js`, `features-en.js`, `features-vi.js`

**Estimated scope:** S

## Task 4: Chụp lại toàn bộ ảnh từ `4fb11ce` (gộp Task 21 cũ)

**Description:** Sửa setup `pop-schedule` (`capture-shots.mjs:315`) sang `tab('tabRecord')`; seed thêm một bước mật khẩu
(`secret: true`) và tên bước cho `pop-actions`; thêm `sql-workspace` (`sqltest.html`) và `db-manager` vào `SHOTS` thay
`sqlcases-analysis` / `dbtools-manager`. Chụp từ `<store>` (plan mục 9: `4fb11ce`, hoặc commit phát hành `c8ba363` nếu
nó lên Store trước) — `api-env` hiện *From the Data tab* / *From the Tools tab* tuỳ bản; `alt` EN/VI chép đúng chữ trong ảnh.
Chạy hết `SHOTS`, so với ảnh cũ, chỉ commit ảnh khác; kiểm `dbtools-rollback`
(`css/dbtools.css` đổi 177 dòng); chụp lại `og-image.png`. Đóng Task 21 trong `promo-update-todo.md`.

**Acceptance criteria:**
- [ ] `grep -rn "shot-sqlcases\|shot-dbtools-manager" --include=*.js --include=*.html --include=*.md . | grep -v tasks/`
  rỗng; `src` trong `features-*.js` trỏ `shot-sql-workspace*` / `shot-db-manager*`; ảnh cũ đã xoá.
- [ ] Mọi ảnh dùng trên site có light + dark, `.png` + `.webp`, chụp từ `$TEMP/pqa-130`; README ghi `4fb11ce`.
- [ ] `og-image.png` hiện thanh trạng thái *Active* + hàng action mới.

**Verification:**
- [ ] `EXT_REPO="$TEMP/pqa-130" node capture-shots.mjs` không shot nào lỗi.
- [ ] Xem từng ảnh đổi trên trang của nó ở 1366×657, light + dark; `checkLayout()` sạch.

**Dependencies:** Task 1b (cùng sửa `capture-shots.mjs`), Task 2–3 (cùng sửa `features-*.js`)

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `README.md`, `og-image.png`,
`screenshots/*`, `tasks/promo-update-todo.md`

**Estimated scope:** M

## Task 5: Soát Privacy / Permissions với 1.0.30

**Description:** Đối chiếu thẻ Privacy và Permissions với `git diff e98ed43 4fb11ce`: chỉ thêm key `allowAllTabs`
(`storage.local`), manifest chỉ đổi `version` → chữ giữ nguyên, sửa comment `index.html:336` và `:389` sang
`v1.0.30, 4fb11ce`. Nếu câu hỏi 2 chọn thẻ Privacy thay vì FAQ thì thêm thẻ ở đây (kiểm một-section-một-màn).

**Acceptance criteria:**
- [ ] `grep -n "1.0.27\|e98ed43" index.html` rỗng.
- [ ] Không có request mạng / permission mới trong diff (ghi lệnh đã chạy vào commit message).

**Verification:**
- [ ] `git -C "../Pocket QA" diff e98ed43 4fb11ce -- manifest.json` chỉ `version`; `checkLayout()` trên trang chủ sạch.

**Dependencies:** Task 1

**Files likely touched:** `index.html`

**Estimated scope:** XS

## Checkpoint 1 — merge + deploy
- [ ] 12 trang + trang chủ không còn câu sai so với `4fb11ce` (rà lại bảng 3a từng dòng).
- [ ] Task 1b: khác biệt chỉ trong danh sách cho phép.
- [ ] `checkLayout()` sạch ở mọi cỡ trong README, EN + VI, light + dark; `checkShape()` = `[]`.
- [ ] Người dùng duyệt → merge `promo-130` vào `master` → push (GitHub Pages deploy) → kiểm site thật.
- [ ] Người dùng chốt danh sách section/ảnh của Phase 2.

---

## Phase 2 — Nội dung mới (mỗi task: chụp ảnh của trang + viết section; tuần tự vì cùng sửa `features-*.js`)

Task 6 cũ (8 ảnh một lượt, cỡ L) đã tách vào các task dưới — xem plan mục 8. Mỗi section ≤ 5 point + 1 ảnh.

## Task 7a: `recording` — *Insert anywhere, copy whole blocks*

**Description:** Ảnh `pop-insert`: hàng giả nét đứt *New action goes in at #N · Switch … › case "…"* trong một case + pill
vị trí ở thẻ Add (seed scenario có Switch, bấm `.ins-gap` thật). Section mới: `+` chèn ở bất kỳ đâu, Copy/Paste cả khối
Switch/Condition, Paste vào scenario rỗng, case chạy scenario khác có hàng riêng. Sửa point của *The action list*.

**Acceptance criteria:**
- [ ] `capture-shots.mjs pop-insert` cho ảnh ổn định (chạy 2 lần giống nhau), light + dark.
- [ ] Section EN + VI, chữ trên hàng giả chép đúng `popup/record/insert-point.js`.

**Verification:** Verification chung; `hiddenByFit()` = `[]` cho section mới.

**Dependencies:** Checkpoint 1

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `README.md`, `screenshots/*`

**Estimated scope:** M

## Task 7b: `recording` — *While you record*

**Description:** Ảnh `page-recording`: khung *● Recording — Pocket QA* + ■ Stop trên trang mẫu Checkout, chụp lúc chưa có
thao tác (đứng yên). Dựng cách chụp overlay trên trang (tab web + `activatedTabs`, như `capture-shots.mjs:617`) để Task 8
dùng lại. Section: bước được đặt tên theo phần tử, 🔒 ô mật khẩu, khung đang ghi, Start thành *● Recording…*.

**Acceptance criteria:**
- [ ] Ảnh chụp từ `content.js` thật (khung ghi ~dòng 121–135), không vẽ lại.
- [ ] `recording` ≤ 8 section nội dung sau Task 7a + 7b.

**Verification:** Verification chung; `hiddenByFit()` = `[]`.

**Dependencies:** Task 7a

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `README.md`, `screenshots/*`

**Estimated scope:** M

## Task 7c: `recording` — 👁 vào section *Selectors*

**Description:** Thêm point 👁 (rê → viền phần tử trên trang; bấm → cuộn tới + nháy; câu báo *not found / hidden / several
/ off-screen / under the popup*) vào section *Selectors*. Ảnh `pop-eye` (👁 + câu báo dưới ô) **chỉ khi** chụp ổn định
được popup + trang cùng lúc; không thì chỉ chữ.

**Acceptance criteria:**
- [ ] Câu báo chép đúng `popup/record/show-on-page.js:78–96`.
- [ ] Không ảnh giả; nếu bỏ `pop-eye`, ghi lý do vào task này.

**Verification:** Verification chung; section *Selectors* vẫn ≤ 5 point, `hiddenByFit()` = `[]`.

**Dependencies:** Task 7b

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`

**Estimated scope:** S

## Task 8: `playback` — *Watch a run*

**Description:** Ảnh `page-run` (run panel trên trang dừng ở bước lỗi, ⏸ hổ phách chờ Retry/Skip/Stop — đứng yên) và
`pop-nowplaying` (Now Playing trong popup, ■ Stop, thanh tiến độ). Section *Watch a run*; point *Schedules* nói chỗ mới.

**Acceptance criteria:**
- [ ] Cả hai ảnh từ extension thật, chụp 2 lần giống nhau.
- [ ] Chữ ▶/⏸/⏳, ■ Stop khớp `content.js` RUN PANEL / `bg/run-panel.js`.

**Verification:** Verification chung; `hiddenByFit()` = `[]`.

**Dependencies:** Task 7b (dùng lại cách chụp overlay)

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `README.md`, `screenshots/*`

**Estimated scope:** M

## Task 9: `run-results` — *Finished · no checks*

**Description:** Ảnh `pop-lastrun-nochecks` (`lastRun` không Assert nào, `data-status="unchecked"` + dòng gợi ý). Point:
thông báo kết thúc bật sẵn; bug report / thất bại đọc theo tên bước; câu *Element not found on the page within 5 s (looked
for it by ID and CSS)*.

**Acceptance criteria:**
- [ ] Chữ verdict + gợi ý chép đúng `shared/verdict.js:37` và popup.
- [ ] Ảnh light + dark.

**Verification:** Verification chung; `hiddenByFit()` = `[]`.

**Dependencies:** Task 8

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `README.md`, `screenshots/*`

**Estimated scope:** S

## Task 10: `settings` — *Turn on, Turn off, all tabs*

**Description:** Ảnh `pop-turnon` (hộp *Off on this tab*: Turn on + link *Not ask again: Allow on all tabs in Settings →*,
mở bằng Start Recording trên tab chưa bật). Section *Turn on, Turn off, all tabs* (vì sao mặc định tắt: hotkey không bao
giờ bắt phím ở site khác); *Notifications* nói 4 nhóm bật sẵn.

**Acceptance criteria:**
- [ ] Chữ hộp hỏi chép đúng `popup/tab-activation.js` (`TAB_OFF`, ~dòng 48).
- [ ] Ảnh light + dark, từ popup thật.

**Verification:** Verification chung; `hiddenByFit()` = `[]`.

**Dependencies:** Task 9

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `README.md`, `screenshots/*`

**Estimated scope:** S

## Task 11: `db-test-session`, `sql-test-designer`, `api-tests`

**Description:** Ảnh `db-risk`: thử đường thật trước (trang mẫu kiểu Adminer qua server cục bộ, `DELETE FROM orders` →
Execute để `dbtools/capture-sql.js` tự hỏi); không được thì gắn panel thật và gọi `panel.preview()` với `risk.*` (cách đã làm
cho `dbtools-rollback`). Point trên `db-test-session`: hỏi trước lệnh đổi cả bảng (không `WHERE`; `WHERE` khớp mọi dòng;
vượt trần snapshot) — *Run anyway* / *Cancel and fix it*. Mỗi trang 3 trang tool thêm một point: một giao diện, cột trái thu gọn.

**Acceptance criteria:**
- [ ] Chữ chép đúng `dbtools/i18n/en.js` / `vi.js` (`risk.*`).
- [ ] Ảnh `db-risk` từ code thật của extension, light + dark.

**Verification:** Verification chung trên 3 trang; `hiddenByFit()` = `[]`.

**Dependencies:** Task 10

**Files likely touched:** `capture-shots.mjs`, `features-en.js`, `features-vi.js`, `README.md`, `screenshots/*`

**Estimated scope:** M

## Task 12: Trang chủ — thẻ Features, FAQ

**Description:** Thẻ Features khớp trang (recording: bước có tên, chèn ở đâu cũng được); FAQ *"Why does it ask to turn on a
tab?"* (nếu câu hỏi 2 = FAQ); `og-image.png` nếu hero đổi.

**Acceptance criteria:**
- [ ] `#faq` vẫn một màn ở 1366×657 / 1280×632 (lố thì đưa vào `.more` trên điện thoại).
- [ ] EN + VI cùng shape.

**Verification:** `checkLayout()` trang chủ sạch, EN + VI, light + dark.

**Dependencies:** Task 7a–11

**Files likely touched:** `index.html`, `site.js` (nếu chữ i18n ở đó), `og-image.png`

**Estimated scope:** S

## Checkpoint 2 — merge + push
- [ ] Section mới: `hiddenByFit()` = `[]` ở 1366×657 / 1280×632; `checkShape()` = `[]`; `checkLayout()` sạch, EN + VI,
  light + dark.
- [ ] Mọi ảnh mới có trong bảng screenshots README, chụp từ `4fb11ce`.
- [ ] Người dùng duyệt → merge → push → kiểm site thật.
