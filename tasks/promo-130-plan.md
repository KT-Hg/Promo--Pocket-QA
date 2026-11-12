# Plan: cập nhật Promo theo giao diện extension v1.0.30

Đợt trước: [`promo-update-plan.md`](promo-update-plan.md) (1.0.24 → 1.0.27, đã xong tới Checkpoint B). Task 21 của đợt đó
(chụp lại ảnh trang tool khi `tool-base` lên Store) được gộp vào plan này (Task 4).

Plan này **chưa sửa code**: chỉ có review (mục 1–3) và kế hoạch (mục 4–7).

Khôi phục trên máy local từ Phụ lục A của file bàn giao (commit cloud `3eb627b`/`ebf3459` chưa từng lên GitHub). Mục 1–7
giữ nguyên văn; **mục 8** ghi kết quả đối chiếu local và chỗ đổi so với mục 5. Task chi tiết (acceptance criteria,
verification, file): [`promo-130-todo.md`](promo-130-todo.md).

## 1. Hiện trạng đã xác minh (2026-11-12)

| | Giá trị | Nguồn |
|---|---|---|
| Promo đang mô tả | **1.0.27**, vendor dựng từ `e98ed43` (`vendor/popup.html` khớp từng byte) | `vendor/version.txt`, `diff` |
| Store | **v1.0.30**, *last updated* 2026-11-11 | shields.io |
| Bản Store (`<store>`) | **`4fb11ce`** (bump 1.0.30, cũng là HEAD; `tools/pack.mjs` đóng gói từ HEAD) — *cần người dùng xác nhận* | `git log`, `566701c` |
| Khoảng thay đổi | `e98ed43..4fb11ce` = 60 commit, 86 file (không tính `tests/`) | `git diff --stat` |
| Permissions | **Không đổi** (manifest chỉ đổi `version`) | `git diff manifest.json` |
| `<head>` của `popup.html` | **Không đổi** (cùng danh sách stylesheet) | `git diff popup.html` |
| Chạy thử `node update-vendor.mjs` trên một bản sao promo với `git archive 4fb11ce` | **Chạy sạch**, `version.txt` = 1.0.30, `popup-demo.html` sinh lại được | scratchpad, không đụng repo |

Footer và thẻ Version đã hiện **1.0.30** (đọc trực tiếp từ Store) — trong khi popup demo, chữ và ảnh vẫn là 1.0.27, nên
site đang tự mâu thuẫn với số phiên bản của chính nó.

## 2. Review: thay đổi giao diện extension `e98ed43 → 4fb11ce`

### A. Popup — cấu trúc (ảnh hưởng demo và nhiều trang)
| # | Thay đổi | Commit |
|---|---|---|
| A1 | Tab **Data → Tools** (id vẫn là `tabData`) | `236e39f` |
| A2 | **Scheduled Playback** và **CSV Data-Driven Run** rời Data, xuống cuối **Record & Play**, dưới nhãn nhóm *Run several · on a schedule · from a CSV* (`.tab-group-label`). Tab Tools hết lock overlay (`#dataGatedZone`, `#lockOverlayData` bị xoá) | `236e39f` |
| A3 | **Activate → Turn on**, **Remove → Turn off** (nút xám). Thanh trạng thái: *Active* / *Active · all tabs* / *Off on this tab* (chấm xám, không còn đỏ). Hết khoá trên trang web: Record, Play, Sequence, CSV, 🎯 Pick hỏi **"Off on this tab"** (Turn on + link *Allow on all tabs in Settings →*). Overlay khoá chỉ còn ở trang trình duyệt: *Not available on this page* + hướng dẫn mở trang http/https | `8ed0823`, `9a7d240`, `6683859`, `845b185` |
| A4 | Settings: thẻ mới **Tabs → Allow on all tabs** ở đầu tab; câu 🔒 của hotkey đổi chữ | `845b185` |
| A5 | **Now Playing** làm lại thành "run panel trong popup": thẻ bo góc, ■ Stop, thanh tiến độ cả lượt chạy ở đáy, màu hổ phách khi dừng ở bước lỗi | `845b185` |
| A6 | **Last run**: chạy không có Assert nào → *✓ Finished · no checks* (xám, `data-status="unchecked"`) + dòng gợi ý thêm Assert; thẻ ẩn trong lúc đang chạy | `3b2cf94`, `b57d1fa` |
| A7 | **Danh sách action**: bước ghi lại được **đặt tên theo phần tử** (aria-label, label, placeholder, chữ trên nút…) — hàng đọc theo tên, selector xuống dòng dưới (`.value-target`, mono; `.value-label` **bị xoá**); ô mật khẩu có **🔒**; **+** ở khe dưới mỗi hàng → hàng giả nét đứt *"New action goes in at #8 · Switch 6 › case "admin""* với ↑ ↓ ✕, thẻ Add hiện pill vị trí; **Copy một Switch/Condition kèm khối của nó**, Paste cả khối, Paste vào scenario rỗng; case chạy scenario khác có hàng riêng *↗ runs scenario "…"* | `81706cb`, `c52ea99`, `87a8f32`, `af9dee0`, `9ef40b3`, `41c1db8` |
| A8 | **Add Manual Action**: **👁** trong ô Selector / Drop on (rê chuột → viền phần tử trên trang, bấm → cuộn tới + nháy; báo *not found / hidden / several / off-screen / under the popup*); dòng *Picked* ghi tên phần tử; **Cancel** luôn có | `845b185` |
| A9 | Save Scenario: placeholder *Name for a new scenario \**; lưu xong scenario **được chọn sẵn** để Play; trùng tên thì hỏi | `9c18614` |
| A10 | Capture: **↕ V / ↔ H → ↕ Down / ↔ Across** (cả Segment và ✂), thêm dòng chú giải nút xanh / nút ✂ / Scroll / Segment | `6950f02` |
| A11 | Mặc định: **cả 4 nhóm thông báo bật** (`notifyOnComplete` → true); countdown chụp ảnh ghi đúng là *On (default)* | `4a343cd`, `9a7d240` |
| A12 | Chỉ là hành vi (không thấy trên demo tĩnh): danh sách không nháy, bộ lọc folder được nhớ, thẻ Add cuộn về dưới header | `25b60e0`, `706dbb5`, `263a654` |

### B. Trên trang web (ngoài popup — promo hiện chưa nói gì)
| # | Thay đổi | Commit |
|---|---|---|
| B1 | **Khung đang ghi** góc dưới phải: *● Recording — Pocket QA* + ■ Stop; trong popup Start thành *● Recording…* (khoá), Stop đỏ | `aafca2e` |
| B2 | **Run panel** trên trang đang chạy: ▶/⏸/⏳, tên scenario, bước, thanh tiến độ, ■ Stop; tự ẩn khi chụp ảnh / ảnh lỗi | `845b185` |
| B3 | **Viền phần tử** khi rê 👁 (A8) | `845b185` |
| B4 | Lỗi không tìm thấy phần tử: *Element not found on the page within 5 s (looked for it by ID and CSS)* | `81706cb` |

### C. Trang tool
| # | Thay đổi | Commit |
|---|---|---|
| C1 | `tool-base.css`: SQL / API / DB **một giao diện**, **cột trái thu gọn được** (☰ trên thanh trên, ⟨ ở đầu cột, tab *… ›* ở mép); trang DB có subtitle + nút 🌙 | `9d25060` |
| C2 | Trang SQL **mở bằng tiếng Anh** (🌐 để sang tiếng Việt) | `0248d03` |
| C3 | Trang SQL của Adminer (DB Test Session) **hỏi trước câu lệnh đổi cả bảng**: không có `WHERE`; `WHERE` khớp mọi dòng; vượt trần snapshot (không rollback được). *Run anyway* / *Cancel and fix it* | `dcda0d1` |

## 3. Gap matrix — Promo đang sai / đang thiếu

### 3a. Đang sai (bắt buộc sửa) — dòng EN; `features-vi.js` có dòng tương ứng
| Chỗ | Đang nói | Đúng ở 1.0.30 | Theo |
|---|---|---|---|
| `recording` lead, step 1, notes 2–3 (`features-en.js:20,33,135,136`; VI `:10,22,119,120`) | "Activate the tab… click **Activate**", "need the tab activated" | Turn on / hỏi khi Start Recording; hotkey Start/Stop chỉ chạy trên tab đã bật | A3 |
| `playback` step 2, bảng "Where" (`:157,171,172`) | *Data → Scheduled Playback*, *Data → CSV Data-Driven Run* | Record & Play → nhóm *Run several…* | A2 |
| `playback` point (`:153`) | "A progress panel shows the step in flight" | Run panel trên trang + Now Playing trong popup, có ■ Stop | A5, B2 |
| `csv` `tab: 'tabData'` (`:442`) | Hero mở popup ở tab chứa thẻ CSV | Thẻ CSV đã sang Record & Play (và đóng sẵn) → hero mở sai chỗ | A2 |
| `csv` step 1 (`:454`) | *Data → CSV Data-Driven Run* | Record & Play → … | A2 |
| `tabLabel: 'Data tab'` ×6 trang (`variables`, `csv`, `export`, `sql-test-designer`, `db-test-session`, `api-tests`) + 13 dòng khác có "Data →" / "the Data tab" (EN), 13 dòng "tab Data" / "Data →" (VI) | Data | **Tools** | A1 |
| `run-results` bảng verdict (`:270`) | Passed = "No failure, and the run reached its end" | Không Assert nào → *Finished · no checks*, không phải Passed | A6 |
| `screenshots` (`:515,537,538`) | Scroll V / H, Segment V / H | Down / Across | A10 |
| `settings` (`:1174,1181,1202,1227`) | "Tick the categories you want", "Start/Stop need the tab activated", Run passed… như tuỳ chọn bật thêm | Cả 4 nhóm bật sẵn; Turn on; thiếu *Allow on all tabs* | A3, A4, A11 |
| `sql-test-designer` note (`:927`) | "The interface is Vietnamese by default" | Mặc định tiếng Anh | C2 |
| `demo.js` §4 | *Active on this tab*, ẩn cả hai nút | *Active* + **Turn off** (tab đã bật, không bật all tabs) | A3 |
| `demo.js` §5 | Hàng có label dùng `.value-label` (CSS đã xoá → chữ trơn dưới selector); bước ghi không có tên; không có 🔒 | Tên ở dòng chính, selector ở `.value-target`; ô mật khẩu có 🔒 | A7 |
| `demo.js` §8c | `notifyOnComplete` = false; countdown tắt | Cả 4 thông báo bật; countdown bật, 3 s (`background.js:54`) — countdown đã sai từ trước | A11 |
| README promo | Bảng *Runtime state* (🔒 "available after activating", "Data › DB Test Session"), *What's interactive* (tab "Data"), "1.0.27 on the Store = `e98ed43`" | Tools, Turn on, 1.0.30 = `4fb11ce` | A1, A3 |
| `og-image.png` | Hero với popup 1.0.27 | Chụp lại sau khi vendor (thanh trạng thái + hàng action đổi) | — |
| Comment Privacy (`index.html` ~dòng 336) | "checked against … v1.0.27 (e98ed43)" | Soát lại với 1.0.30: chỉ thêm key `allowAllTabs` (`storage.local`), không có request mới → chữ giữ nguyên, sửa comment | — |

### 3b. Ảnh lỗi thời
| Ảnh | Lý do | Việc |
|---|---|---|
| `pop-actions` | Hàng đặt tên + selector dòng dưới, không có 🔒 | Chụp lại; seed thêm một bước mật khẩu (`secret: true`) |
| `pop-schedule` | Setup gọi `tab('tabData')` → thẻ giờ nằm ở Record & Play, **script sẽ hỏng** | Sửa setup sang `tabRecord`, chụp lại |
| `pop-lastrun`, `pop-bugreport`, `pop-shot-settings`, `pop-backup`, `pop-manage`, `pop-sequence`, `pop-rename`, `pop-highlights`, `pop-image-diff` | CSS popup đổi ở 7 file | Chụp lại hết; giữ cái nào giống byte-cho-byte |
| `sqlcases-analysis`, `dbtools-manager` | Trước `tool-base` (Task 21 cũ) | Chụp lại → tên mới `sql-workspace`, `db-manager`; xoá ảnh cũ |
| `sql-diagram`, `sql-compare`, `sql-coverage`, `db-settings`, `api-*` | Cắt sát thành phần, nhưng `tool-base` đổi token/nút/modal | Chụp lại, so sánh, giữ cái không đổi |
| `dbtools-rollback`, `export-js/py`, `image-editor` (harness cũ) | `css/dbtools.css` đổi 177 dòng; export/editor gần như không đổi | Chỉ kiểm `dbtools-rollback`; chụp lại nếu khác |

### 3c. Đang thiếu (nên thêm)
| Trang | Nội dung mới | Ảnh đề xuất |
|---|---|---|
| `recording` | Chèn action ở bất kỳ đâu (+), Copy/Paste cả khối Switch/Condition; bước được đặt tên, 🔒 mật khẩu, khung đang ghi trên trang; 👁 xem phần tử trên trang | `pop-insert` (hàng giả trong một case + pill vị trí ở thẻ Add), `page-recording` (khung *● Recording* trên trang mẫu Checkout) |
| `playback` | Xem lượt chạy: run panel trên trang (■ Stop, ⏸ hổ phách khi chờ Retry/Skip/Stop), Now Playing trong popup; Schedule/CSV giờ ở Record & Play | `page-run` (trang Checkout dừng ở bước lỗi — trạng thái đứng yên, chụp ổn định), `pop-nowplaying` |
| `run-results` | *Finished · no checks* + gợi ý; thông báo kết thúc bật sẵn; bug report/thất bại đọc theo tên bước; câu "not found" mới | `pop-lastrun-nochecks` |
| `settings` | Turn on / Turn off / *Allow on all tabs* (vì sao mặc định tắt: hotkey không bao giờ bắt phím ở site khác) | `pop-turnon` — hộp hỏi *Off on this tab* |
| `db-test-session` | Hỏi trước câu lệnh đổi cả bảng (3 trường hợp) | `db-risk` — chính `panel.preview()` của extension |
| `sql`, `db`, `api` | Một giao diện chung, cột trái thu gọn | Ảnh toàn trang mới (3b) |
| `index` | Thẻ Features (recording: bước có tên, chèn ở đâu cũng được); FAQ *"Why does it ask to turn on a tab?"* | `og-image.png` chụp lại |

## 4. Quyết định kiến trúc

### Nguyên tắc chung — người dùng chốt 2026-11-12: **ưu tiên giống extension thực tế**
Khi hai cách đều được, chọn cách giống bản Store hơn, kể cả khi tốn công hơn:
- **Demo chỉ hiện thứ popup thật có thể hiện.** Không chữ tự đặt (*Active on this tab* không có trong extension → bỏ),
  không trạng thái mâu thuẫn nhau. Hàng action dựng y hệt `createActionListItem` của `4fb11ce`: tên ở dòng chính,
  `.value-target`, `.secret-mark` 🔒, `title` / `aria-label`, và cả nút **+** (`.ins-gap`) — CSS thật tự hiện nó khi rê chuột,
  guard của demo chặn cú click như mọi nút khác.
- **Một trạng thái nhất quán, như một popup có thật:** Last run *3 minutes ago* nghĩa là vừa Play trên tab này → tab đã bật
  → thanh trạng thái *Active* + **Turn off**, hotkey ở Settings không mờ. Mọi giá trị khác = **bản cài mới** (4 nhóm thông báo
  bật, countdown bật 3 s, *Allow on all tabs* tắt).
- **Chữ trên trang gọi đúng tên trên UI** (Turn on, Off on this tab, Tools, *Run several · on a schedule · from a CSV*,
  ↕ Down / ↔ Across, *Finished · no checks*, Allow on all tabs…), chép từ `popup.html` / help card, không diễn đạt lại tên nút.
  Bản VI cũng giữ tên nút tiếng Anh như popup.
- **UI mới chỉ bằng ảnh chụp từ extension thật** — không mockup, không vẽ lại. Không chụp được bằng extension thật thì
  không có ảnh (chỉ chữ), chứ không làm giả.
- **Đo được, không chỉ nhìn bằng mắt:** demo và popup thật được so từng pixel với cùng dữ liệu (Task 1b).

### Cách làm
- **Nguồn sự thật = bản Store `4fb11ce`**, như các đợt trước: vendor từ `git archive 4fb11ce` ra thư mục tạm → `node update-vendor.mjs <thư mục>`;
  ảnh từ `EXT_REPO=<thư mục đó> node capture-shots.mjs`. Không chụp từ working tree.
- **Demo vẫn là preview tĩnh**, chỉ sửa trạng thái giả (`demo.js` §4, §5, §8c). Thứ có sẵn trong markup/CSS thật (👁 trong ô
  Selector, + khi rê hàng, nhãn nhóm thẻ) tự hiện; thứ chỉ có khi chạy (hàng giả của +, run panel, câu báo của 👁) không dựng
  lại trong demo — có ảnh thật ở trang feature.
- **Hero của trang `csv` mở đúng thẻ**: `csv.tab = 'tabRecord'` + tham số mới `card=<id>` (`demo.js` bỏ `collapsed`,
  `scrollIntoView` thẻ đó; `feature.js` thêm `&card=` khi feature có `card`). Đây là lần đầu plan đụng `feature.js` — một dòng.
- **UI trên trang (B1–B3) chỉ ở dạng ảnh thật** trên trang feature, không vẽ lại trong khung trình duyệt ở hero
  (vẽ tay sẽ phá nguyên tắc "100% UI thật").
- **Thêm section, không kéo dài list** (như đợt trước): ≤ 5 point + 1 ảnh mỗi section, ≤ 8 section nội dung mỗi trang
  (`recording` đang 6 → thêm 2 là chạm trần). Đo bằng `hiddenByFit()` — mục tiêu `[]` ở 1366×657 và 1280×632 cho section mới.
- **EN/VI cùng shape**; tên nút giữ tiếng Anh như popup (Turn on, Tools, Finished · no checks…); câu VI lấy từ help card VI
  của extension (`popup/help/card-help-data.js`) trước khi tự dịch.
- Sau mỗi lần sửa `.js`/`.css`: `node stamp-assets.mjs`; sửa `demo.*`: `node sync-from-source.mjs`.

## 5. Task list

### Phase 1 — "Đúng với bản Store" (một nhánh, merge + deploy trước)
- [ ] **Task 1 — Vendor 1.0.30 + trạng thái demo** (M)
  `update-vendor.mjs` từ `4fb11ce`; `demo.js` §4 (*Active* + Turn off), §5 (hàng theo tên + `.value-target`, đặt tên các bước
  ghi: *Email*, *Password* 🔒, *Log in*), §8c (4 thông báo bật, countdown bật 3 s); sửa comment nhắc Data/lock; README
  promo (bảng Runtime state, What's interactive, dòng bản Store). Hàng action theo đúng markup thật, kể cả `.ins-gap`.
  *Đạt khi:* demo không còn chuỗi nào không có trong extension (`grep` từng chuỗi `demo.js` gán vào DOM trong `4fb11ce`);
  `__promoDemoGuard` vẫn `extension-fence v2`.
- [ ] **Task 1b — So pixel demo ↔ popup thật** (M) — *mới, theo nguyên tắc "giống thực tế"*
  Thêm vào `capture-shots.mjs` một chế độ `parity`: seed popup thật (`4fb11ce`) bằng đúng dữ liệu `demo.js` dùng (scenario
  *Login flow*, 4 biến, highlight, `lastRun` đặt thẳng vào `chrome.storage.local`, tab mẫu đã bật), chụp 5 tab ở 480 px light +
  dark; chụp `popup-demo.html` cùng tab, cùng cỡ; so bằng Pillow `ImageChops.difference`. Thay cặp ảnh
  `shot-popup-original` / `shot-popup-demo` trong README bằng kết quả này.
  *Đạt khi:* khác biệt chỉ nằm ở vùng đã liệt kê trong README (thời gian tương đối, banner cập nhật…), mỗi vùng có lý do.
- [ ] **Task 2 — Sửa chữ đang sai, EN + VI** (M)
  Mọi dòng ở 3a: Data → Tools, Activate → Turn on, chỗ của Schedule/CSV, Down/Across, SQL mở bằng tiếng Anh, thông báo
  bật sẵn, thêm hàng *Finished · no checks* vào bảng verdict.
  *Đạt khi:* `grep -n "Data tab\|Data →\|tab Data\|Activate\|kích hoạt\|Scroll V\|Vietnamese by default"` trên
  `features-*.js` chỉ còn chỗ cố ý; `checkShape()` = `[]`.
- [ ] **Task 3 — Hero mở đúng thẻ** (S)
  `card=` trong `demo.js` + `feature.js`; `csv` → `tabRecord` + `card=csvRunCard`.
  *Đạt khi:* `feature.html?id=csv` mở popup với thẻ CSV mở sẵn, trong khung nhìn, ở cả hai theme.
- [ ] **Task 4 — Chụp lại toàn bộ ảnh từ `4fb11ce`** (M, gộp Task 21 cũ)
  Sửa setup `pop-schedule`; seed bước mật khẩu cho `pop-actions`; thêm `sql-workspace`, `db-manager` vào `SHOTS`; chạy hết, so
  với ảnh cũ, chỉ commit ảnh khác; xoá `shot-sqlcases-analysis*`, `shot-dbtools-manager*`; WebP; `og-image.png`.
  *Đạt khi:* `grep -rn "shot-sqlcases\|shot-dbtools-manager"` rỗng; ảnh light + dark, `.png` + `.webp`.
- [ ] **Task 5 — Soát Privacy / Permissions với 1.0.30** (S) — chỉ sửa comment nếu không có gì mới.

**Checkpoint 1:** 12 trang + trang chủ không còn câu sai so với Store; Task 1b không còn khác biệt ngoài danh sách cho phép;
`checkLayout()` sạch ở các cỡ trong README, EN + VI, light + dark → người dùng duyệt → merge → deploy.

### Phase 2 — Nội dung mới (sau khi người dùng chốt danh sách section/ảnh ở Checkpoint 1)
- [ ] **Task 6 — Ảnh mới trong `capture-shots.mjs`** (M–L): `pop-insert`, `page-recording`, `page-run`, `pop-nowplaying`,
  `pop-lastrun-nochecks`, `pop-turnon` (hộp *Off on this tab*), `pop-eye` (👁 + câu báo dưới ô), `db-risk`. Chụp phần tử,
  không chụp cả cửa sổ, như mọi shot khác.
  `db-risk`: thử đường thật trước — trang mẫu kiểu Adminer do server cục bộ phục vụ, gõ `DELETE FROM orders` rồi Execute để
  `dbtools/capture-sql.js` tự hỏi; không được thì gắn panel thật và gọi chính `panel.preview()` với `risk.*` (cách đã làm cho
  `dbtools-rollback`). `pop-eye` cần popup và trang web cùng lúc: không ổn định thì bỏ ảnh, không làm giả.
- [ ] **Task 7 — `recording`** (M): section *Insert anywhere, copy whole blocks* và *While you record* (tên bước, 🔒, khung
  trên trang); 👁 vào section *Selectors*; sửa point của *The action list*.
- [ ] **Task 8 — `playback`** (M): section *Watch a run* (run panel + Now Playing); point của *Schedules* nói chỗ mới.
- [ ] **Task 9 — `run-results`** (S): *Finished · no checks* có ảnh; thông báo bật sẵn; bug report theo tên bước.
- [ ] **Task 10 — `settings`** (S): section *Turn on, Turn off, all tabs*; *Notifications* nói bật sẵn.
- [ ] **Task 11 — `db-test-session`, `sql-test-designer`, `api-tests`** (S): hỏi trước lệnh đổi cả bảng; một giao diện,
  cột trái thu gọn (một point mỗi trang).
- [ ] **Task 12 — Trang chủ** (S): thẻ Features khớp trang; FAQ thêm câu Turn on (kiểm một-section-một-màn); `og-image` nếu hero đổi.

**Checkpoint 2:** `hiddenByFit()` `[]` cho section mới ở 1366×657 / 1280×632, `checkShape()` `[]`, `checkLayout()` sạch, EN +
VI, light + dark → người dùng duyệt → merge → push.

**Song song được:** Task 1b, Task 2 và Task 4 độc lập sau Task 1 (1b và 4 cùng sửa `capture-shots.mjs` → làm 1b trước). Task 7–11 đều sửa `features-*.js` → làm tuần tự. Task 6 trước 7–9.

## 6. Rủi ro
| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Bản Store không phải `4fb11ce` | Med | Người dùng xác nhận trước Task 1 (Open Question 1) |
| Hộp hỏi *Off on this tab* chặn các shot cần chạy/ghi | Med | `capture-shots.mjs` đã đặt `activatedTabs` cho tab mẫu; nếu chưa đủ, đặt thêm `allowAllTabs: true` khi seed |
| Run panel / khung ghi là overlay trên trang, đang chạy thì động | Med | Chụp lúc đứng yên: run dừng ở bước lỗi (chờ Retry/Skip/Stop), ghi khi chưa có thao tác |
| 👁 cần popup và trang web cùng lúc (popup mở dạng tab trong script) | Med | Không ổn định thì bỏ ảnh, giữ chữ — không làm giả |
| So pixel (Task 1b) nhiễu vì font / thời gian / banner | Med | Cùng Chromium, cùng CSS, cùng cỡ; vùng được phép khác liệt kê sẵn trong README, mỗi vùng một lý do |
| Dữ liệu `demo.js` không seed được y hệt vào popup thật | Med | Dùng chính message của extension (`SAVE_VARIABLES`, `CREATE_SCENARIO`…) như `capture-shots`; chỗ nào không seed được thì sửa `demo.js` theo popup thật, không ngược lại |
| Thêm section làm trang dài, lố một màn | Med | ≤ 5 point/section, đo `hiddenByFit()` + `checkLayout()` |
| Thêm câu FAQ làm `#faq` cao hơn một màn | Low | Câu ngắn; nếu lố thì đưa vào `.more` trên điện thoại |
| `card=` deep link vướng cuộn trong iframe | Low | `scrollIntoView({ block: 'nearest' })` trong frame; kiểm ở 3 viewport |

## 7. Câu hỏi
**Đã chốt** theo "ưu tiên giống extension thực tế" (2026-11-12):
- ~~Thanh trạng thái của demo?~~ → **"Active" + Turn off** — trạng thái thật, nhất quán với Last run vừa chạy trên tab.
- ~~Hero trang `csv`?~~ → **`card=` mở sẵn thẻ CSV thật** ở Record & Play, như người dùng tự mở.
- ~~UI trên trang ở hero?~~ → **Chỉ ảnh chụp thật** ở trang feature, không vẽ lại.
- ~~Ảnh `db-risk`?~~ → **Làm, bằng code thật** của extension (Task 6).
- Thêm: so pixel demo ↔ popup thật (Task 1b).

**Còn mở** (mặc định in đậm):
1. Bản 1.0.30 trên Store dựng từ **`4fb11ce`** (HEAD hiện tại)?
2. Thông điệp "tắt trên mỗi tab cho tới khi bạn bật": **FAQ** hay cả một thẻ trong Privacy (đang 4 thẻ vừa một màn)?
3. Hai lần merge: **Phase 1 deploy trước**, Phase 2 sau — hay gộp một lần?

## 8. Đối chiếu bàn giao trên máy local (2026-11-12)

### Đã kiểm lại — khớp bàn giao
| Điều bàn giao nói | Kết quả local |
|---|---|
| Promo vendor = `e98ed43` | `vendor/popup.html` đã commit khớp từng byte với `e98ed43:popup.html`; working tree chỉ khác CRLF (`core.autocrlf=true`) |
| Extension = `4fb11ce` | `../Pocket QA` HEAD = `main` = `4fb11ce`, không có thay đổi chưa commit |
| `git diff e98ed43 4fb11ce` | 86 file (không tính `tests/`); manifest chỉ đổi `version` |
| Số dòng gap 3a | Khớp hết (`features-en.js:20,33,135,136,153,157,171,172,270,442,454,515,537,538,927,1174,1181,1202,1227`) |
| `tabLabel` Data | 6 trang EN (`:349,443,622,799,937,1052`) + 6 VI (`:319,407,567,730,858,965`); 13 dòng khác mỗi ngôn ngữ |
| `demo.js` | §4 `'Active on this tab'` (`:131`); §5 `.value-label` (`:183`); §8c `notifyOnComplete` false (`:461`), không seed countdown |
| Mặc định extension | `NOTIFY_DEFAULT` 4 nhóm `true` (`bg/notify.js:34`); countdown `true` / 3 s (`background.js:52–55`); *Active* + `#deactivateTab` khi tab đã bật, `allowAllTabs` false (`popup/tab-activation.js:138–147`) |
| Markup hàng action | `createActionListItem` (`popup/record/preview.js:449`): `mainText = a.label \|\| value`, `.value-target`, `.secret-mark`, `_gapBtn` → `.ins-gap`; CSS `.value-label` không còn |
| Id cần dùng | `csvRunCard`, `scheduledPlaybackCard`, `deactivateTab`, `allowAllTabs`, `allowAllTabsCard`, `screenshotCountdownRow` có trong `popup.html` của `4fb11ce` |
| `pop-schedule` hỏng | `capture-shots.mjs:315` `tab('tabData')` rồi mở `#scheduledPlaybackCard`. (`pop-rename`, `:371`, cũng gọi `tab('tabData')` nhưng thẻ Variables vẫn ở `tabData` → **không hỏng**) |

### Bàn giao thiếu
- `index.html:389` comment `PERMISSIONS (manifest.json, v1.0.27)` — sửa cùng comment Privacy `:336` ở Task 5.
- README: `shot-tab-data.png` mô tả "Data tab" (`:222`), `api-env` nói "Data tab variables" (`:234`), dòng `api-*` "Taken from
  the Store build, `e98ed43`" (`:234`) — vào Task 1 (chữ) và Task 4 (ảnh).
- `extVersion` trong `index.html` / `feature.html` **không** cần sửa tay: `update-vendor.mjs` tự đóng dấu.

### Chỉ đúng trên cloud — bỏ trên máy local
- Không có commit nào kẹt: local và `origin/master` đều ở `2fa16c0`; push từ máy local như mọi đợt trước.
- Không cần `CHROMIUM_PATH`: `findBrowser()` thấy Edge ở `Program Files (x86)`. Pillow 12.3.0, Node 24.12 có sẵn.
- Đường dẫn: extension `../Pocket QA` (mặc định của mọi script); bản Store giải nén ra `"$TEMP/pqa-130"` thay cho `/tmp/pqa-130`.

### Đổi so với mục 5
1. **Phase 1 làm tuần tự 1 → 1b → 2 → 3 → 4 → 5**, không song song: Task 2, 3, 4 cùng sửa `features-*.js` (Task 3 đổi
   `csv.tab`/`card`, Task 4 đổi `src` sang `sql-workspace`/`db-manager`), 1b và 4 cùng sửa `capture-shots.mjs`, 1 và 4 cùng
   sửa README. Làm 1b sớm vì rủi ro cao nhất của Phase 1 (seed popup thật bằng dữ liệu demo).
2. **Task 6 tách vào Task 7–11** (cắt dọc theo trang): mỗi task chụp ảnh của chính trang đó rồi viết section — xong một
   task là một trang hoàn chỉnh, không còn task cỡ L. Task 7 dựng cách chụp overlay trên trang mẫu (`page-recording`),
   Task 8 dùng lại (`page-run`).

## 9. Extension đổi sau bàn giao: `c8ba363` (2026-11-12)

`c8ba363` *docs: say Tools tab, not Data tab* — commit duy nhất sau `4fb11ce`; manifest vẫn `1.0.30`.

| | Ảnh hưởng tới promo |
|---|---|
| `popup.html`, `css/`, `popup/`, `icons/` | **Không đổi** → vendor và `demo.js` của Task 1 giữ nguyên |
| Trang API Tests (`apitest.html`, `apicases/ui/*`) | Chữ *Data tab* → *Tools tab*: mục **From the Tools tab** + câu helper trong dialog Environments, `title` của ô chọn môi trường, gợi ý ở Headers, lỗi *No value for … — add it to the environment or the Tools tab* |
| Ảnh `api-env` | Chụp từ `4fb11ce` hiện *From the Data tab*; chụp từ `c8ba363` hiện *From the Tools tab* |
| `alt` của `api-env` (`features-en.js:1110`, `features-vi.js:1017`) | Đang chép chữ *From the Data tab* → phải khớp ảnh đang dùng |
| Store | `c8ba363` **chưa lên Store** (Store cập nhật 2026-11-11, commit 2026-11-12; muốn đưa lên phải tăng version, vd. 1.0.31) |

**Cách xử lý:** gọi bản Store lúc làm Task 4 là `<store>`. Task 1–3 không phụ thuộc vì popup giống hệt. Task 4 chụp `api-*`
từ `<store>`, và Task 2 viết `alt` của `api-env` theo đúng chữ trong ảnh đó. Nếu phát hành `c8ba363` (1.0.31) trước
Checkpoint 1 thì `<store>` = commit phát hành, và chạy lại `update-vendor.mjs` để version thành 1.0.31. Nếu không thì
`<store>` = `4fb11ce`, và chú thích giữ *From the Data tab* (đúng chữ trên bản đang cài).
