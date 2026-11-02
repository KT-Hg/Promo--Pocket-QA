# Gap matrix — promo vs extension

Đầu ra Phase 1 của [`promo-update-plan.md`](promo-update-plan.md). Task 2: nội dung đang bị giấu; Task 3–4: gap matrix
từng trang (thêm vào bên dưới).

## Bị giấu hôm nay (Task 2)

Đo ngày 2026-11-02 trên nhánh `promo-update` (sau Task 1), bằng `hiddenByFit()` trong `check-layout.js`:
mỗi trang mở trong iframe đúng kích thước viewport, đợi `site.js` fit xong. **Ẩn** = item (`li`, hàng bảng, câu
lead) nằm sau "Show the rest"; **Thu nhỏ** = ảnh/code bị giảm chiều cao cho vừa một màn. Cột "Item" đếm `li` + hàng
bảng; cột 375 tính cả thẻ "Explore other features" bị cắt (ở desktop chúng không bị cắt).

### Tổng hợp

| Trang | Item | 1366×657 ẩn / thu nhỏ | 1280×632 ẩn / thu nhỏ | 375×812 ẩn / thu nhỏ |
|---|---:|---:|---:|---:|
| recording | 52 | **10** / 0 | **13** / 0 | 30 / 0 |
| playback | 31 | 0 / 0 | 0 / 0 | 10 / 0 |
| run-results | 39 | 4 / 0 | 6 / 0 | 18 / 1 |
| variables | 31 | 1 / 0 | 1 / 0 | 11 / 0 |
| csv | 28 | 0 / 0 | 1 / 0 | 11 / 0 |
| screenshots | 34 | 2 / 1 | 2 / 1 | 13 / 1 |
| export | 41 | **11** / 2 | **12** / 2 | 23 / 2 |
| highlights | 22 | 0 / 0 | 0 / 0 | 5 / 0 |
| sql-test-designer | 37 | 3 / 1 | 4 / 1 | 15 / 0 |
| db-test-session | 36 | **7** / 0 | **7** / 2 | 19 / 2 |
| settings | 38 | 2 / 0 | 3 / 0 | 10 / 0 |
| **Tổng** | **389** | **40 / 4** | **49 / 6** | **165 / 6** |

Ở desktop, 10–13% nội dung đã viết không hiện ra nếu người đọc không bấm "Show the rest". Trên điện thoại là 33%
(128/389, không tính 37 thẻ Explore bị cắt) — đúng thiết kế, nhưng cũng cho thấy kéo dài list là cách thêm chi tiết
kém hiệu quả.

### Chi tiết ở 1366×657 (1280×632 giấu thêm phần in nghiêng)

- **recording**
  - *Page and control actions* (bảng): Wait, Run JS · *Navigate*
  - *Logic and data actions* (bảng): Screenshot (Element), Screenshot → Variable (CSV), Upload File
  - *Selectors that survive a redesign*: hàng 6–9 của bảng chiến lược selector · *hàng 5*; điểm "`${variables}` work
    inside any selector…" · *"Nothing found yet? Playback waits…"*
- **run-results**
  - *12 checks for Conditions and Asserts* (bảng): URL contains / equals, Has class, Has attribute · *Value contains / equals*
  - *A bug report that writes itself*: "The screenshot is the page the moment the first failure…" · *"Values stay hidden (•••)…"*
- **variables** — *Conditions, switches and blocks*: "Steps inside a block are numbered by case (1.1, 1.2, 2.1…)…"
  (câu này còn mô tả cách đánh số đã đổi ở 1.0.26 → Task 9)
- **csv** — *ZIP folders named your way*: *"Change the names after a run and download again…"*
- **screenshots** — *Inside the Image Editor*: Stamp panel (watermark), Zoom 1:1 + bảng phím tắt; ảnh editor bị thu nhỏ
- **export**
  - *Five formats* (bảng): Robot Framework, Selenium Java
  - *From popup to code*: 2 ảnh modal bị thu nhỏ
  - *What each format covers* (bảng): Screenshots, Upload File, iframe, Switch block, Switch to another scenario,
    Assert (soft) · *Run JS*
  - *Run it anywhere…*: `PQA_HEADLESS`, `PQA_<name>`, "A scenario's own text only ever lands in a string…"
- **sql-test-designer** — *Inside the analysis screen*: stat row, search + filters, inspector · *Compare mode*; ảnh
  workspace bị thu nhỏ. Diagram vẫn hiện ở desktop (1 dòng); ở 375×812 bị giấu cùng 4 điểm khác (5/6)
- **db-test-session**
  - *Inside a test session*: undo/re-apply một thay đổi, chạy lại sau rollback, export `.sql`/`.json` · *2 ảnh thu nhỏ*
  - *What it records* (bảng): Delete theo dòng chọn, mass edit, UPDATE/DELETE ở trang SQL, INSERT
- **settings** — *Default hotkeys* (bảng): Segment — Stop & Capture, Screenshot (Element) · *Segment H — Start*

### Nhận xét cho Phase 3
1. **Bảng dài là nguồn giấu lớn nhất** (recording, export, run-results, db, settings): một bảng 9–17 hàng không bao
   giờ vừa một màn. Tách bảng theo nhóm thành section riêng (recording đã làm với 17 action, vẫn chưa đủ), hoặc đổi
   những bảng tra cứu thuần (hotkeys, 12 checks) sang dạng lưới gọn hơn.
2. **Section "ảnh + 6 điểm"** (sql, screenshots, db): ảnh bị thu nhỏ trước, rồi điểm bị cắt. Theo plan: một section =
   một ảnh + 3–5 điểm.
3. **Trang không giấu gì** (playback, highlights) là trang ít nội dung nhất — cũng là ứng viên thêm section (Task 11).

## Gap matrix — 9 trang của popup (Task 3)

Nguồn đọc ngày 2026-11-02, extension `060fcf0` (v1.0.27, bản đang trên Store). Viết tắt:
`fe:N` = `features-en.js:N` (promo) · `help:N` = `Pocket QA/popup/help/card-help-data.js:N` (khối tiếng Anh) ·
`R:N` = `Pocket QA/README.md:N` · `ph:N` = `Pocket QA/popup.html:N` · hash = commit extension trong 1.0.25–1.0.27.

Độ phủ: `none` chưa có · `thin` một câu / nhắc qua · `hidden` có nhưng bị giấu ở 1366×657 · `ok` ·
**`sai`** mô tả sai hoặc lỗi thời. Ưu tiên: **P1** sai / thay đổi đã phát hành · **P2** chi tiết người dùng thấy
ngay trong UI · **P3** chi tiết nhỏ.

Mọi help card của popup (17/20; `sqlcases`, `apicases`, `dbtools` thuộc Task 4) đều được dẫn ở ít nhất một dòng dưới đây.

### recording — *Record in one click*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | Ghi click + input, gõ gộp một bước/ô, chữ gõ trước click ghi trước | help:17, R:13 | ok fe:25 | — |
| 2 | Chỉ ghi tab bắt đầu; bỏ click do script trang tự bắn | R:61 | ok fe:26 | — |
| 3 | 17 action qua Add Manual Action | help:72, ph:171 | ok fe:27, bảng fe:40–76, **hidden** 5 hàng | P2 · chia bảng nhỏ hơn (≤6 hàng/section) |
| 4 | Danh sách action: kéo thả, ✎, ⊘, 🗑, badge đếm; ⊘ một Switch/Condition tắt luôn các bước dưới nó, bật lại riêng được | help:17 (Preview Actions) | thin fe:28 | P2 · section mới *The action list* + ảnh |
| 5 | Condition "Then run" N bước: thụt lề, viền amber, thu gọn ▾ | help:90 | none | P2 · trong *The action list* |
| 6 | Số `#N` = vị trí; block Switch thụt lề, hàng tiêu đề, màu theo case, tooltip `Switch 4 › case "admin"`, bước lạc ngoài case có ⚠ | R:166, `aa55013` | none (fe:110 còn đúng) | P1 · trong *The action list* |
| 7 | Hàng Upload File có màu riêng | `b1ad6a3` | none | P3 · thấy trong ảnh action list |
| 8 | Lỗi validation nằm dưới hàng, không đè vào ô | `3d08a71` | none | P3 · một ý về form |
| 9 | **New** có tên → tạo scenario rỗng ngay, mọi thao tác tự lưu vào đó; Save trùng tên trong folder thì hỏi | help:127, help:130 | none | P2 · section mới *Save, folders & scenarios* |
| 10 | Manage: tìm tức thì, 4 kiểu sort (nhớ), ✎ ⧉ ⇄ 🗑; xoá không tự gỡ khỏi Schedule/Sequence | help:143 | thin fe:111 | P2 · cùng section |
| 11 | Folder: đổi tên giữ liên kết (ID), xoá folder → scenario về "No Folder" | help:159–163 | none | P3 · cùng section |
| 12 | 9 chiến lược selector, bỏ id không ổn định, chờ element | R:1132 | ok fe:77–100, **hidden** 5 | P2 · gọn bảng (một dòng thứ tự), giữ 4 ý |
| 13 | Pick element (cả iframe), Child Condition, label | help:72 | ok fe:107–109 | — |
| 14 | Gợi ý `${` | help:72 | ok fe:112 | — |

**Section đề xuất**
- *Page and control actions* / *Thao tác trang & điều khiển* — giữ, bỏ cột Group (tên section đã nói), ≤8 hàng.
- *Logic and data actions* / *Thao tác logic & dữ liệu* — giữ; gộp 4 Screenshot thành một hàng "Screenshot (Visible / Full Page / Element / → Variable)" để bảng còn 6 hàng.
- **mới** *The action list* / *Danh sách bước* — ảnh: preview list có Condition (viền amber), một Switch block 2 case, một Upload File, một bước ⊘. Ý: #4, #5, #6, Undo 50.
- **mới** *Save, folders & scenarios* / *Lưu, thư mục & kịch bản* — ảnh: thẻ Manage Scenarios. Ý: #9, #10, #11 (thay *Pick, target and organise*; Pick/Child Condition chuyển vào *Selectors*).
- *Selectors that survive a redesign* — gọn bảng, thêm Pick element + Child Condition.

### playback — *Playback that keeps going*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | Single, loop N×, sequence, schedule, CSV | R:14 | ok fe:131–132, fe:146–157 | — |
| 2 | Chạy trong iframe, chạy tiếp sau khi trang reload | R:14, R:1118 | ok fe:133 | — |
| 3 | Retry / Skip / Stop | help:143 | ok fe:134 | — |
| 4 | Dropdown trusted click, Choose item #, list ảo | help:85 | ok fe:164–165 | — |
| 5 | Upload File nhiều file, tên file `${var}` | R:18 | ok fe:166 | — |
| 6 | Upload File báo rõ file không còn trên đĩa | `2cc1c80` | none | P1 · một ý ở *Built for real pages* |
| 7 | Sequence: ⊘ ⧉ ✎ 🗑 từng mục, kéo thả, một scenario nhiều lần, delay mục đầu = chờ trước khi chạy, badge SEQ | help:198 | thin fe:131, fe:153 | P2 · section mới *Sequences* + ảnh |
| 8 | Sequence → **Save as Scenario**: gộp thành một scenario, delay thành bước Wait | help:207, ph:748 | none | P2 · trong *Sequences* |
| 9 | Schedule: giờ AM/PM, nhãn, Repeat daily, ✎ sửa, ⊘ tạm tắt, ⧉ nhân bản; kiểm mỗi phút, không chạy trùng | help:223–233 | thin fe:132 | P2 · section mới *Schedules* + ảnh |
| 10 | Click through | R:63 | ok fe:172–182 | — |
| 11 | Panel Now Playing, badge ▶ / SEQ | help:143, help:198 | thin fe:136 | P3 · ảnh panel Now Playing ở *Five ways to run* |

**Section đề xuất**
- *Five ways to run a scenario* — giữ, thêm ảnh panel Now Playing.
- **mới** *Sequences* / *Chạy nối tiếp* — ảnh: thẻ Sequence Scenarios có 3 mục, một mục ⊘. Ý: #7, #8, một verdict cho cả chuỗi.
- **mới** *Schedules* / *Hẹn giờ* — ảnh: thẻ Scheduled Playback có 2 lịch. Ý: #9, Chrome phải đang mở (chuyển từ notes).
- *Built for real pages* — thêm #6.

### run-results — *Assertions, verdicts & bug reports*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | Assert 12 kiểm tra, chờ tới 5 s (mỗi 250 ms), soft | help:72, R:207 | ok fe:199–201 | — |
| 2 | Luật verdict: lỗi đầu tiên quyết định | R:223 | ok fe:214–231 | — |
| 3 | Thẻ Last run: danh sách lỗi, bấm để nhảy tới bước | R:241–243 | thin fe:203, không ảnh | P2 · section mới *The Last run card* + ảnh |
| 4 | Bug report: trường, ẩn giá trị •••, ảnh lúc lỗi | R:247 | ok fe:256–285 (mẫu code), **hidden** 1 | P2 · thêm ảnh modal Bug report thật bên cạnh mẫu |
| 5 | 12 kiểm tra (bảng 7 hàng) | help:72 | ok fe:234–253, **hidden** 3 | P2 · đổi sang lưới 2 cột ngắn hơn |
| 6 | Badge, notification, CSV, sequence | R:223 | ok fe:227–230 | — |

**Section đề xuất**
- **mới** *The Last run card* / *Thẻ Last run* — ảnh: thẻ Last run của một lần chạy Failed có 2 lỗi. Ý: verdict, danh sách lỗi, bấm để nhảy, Bug report.
- *12 checks* — lưới gọn; *A bug report that writes itself* — ảnh modal + mẫu Markdown.

### variables — *Variables & logic*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | 4 kiểu Static / Random / Pick / Fallback | help:284 | ok fe:303, fe:318–334 | — |
| 2 | **Đổi tên biến → đổi ở mọi scenario**: `${…}` và tên trần (Switch, Read DOM, Screenshot → Variable, label), form đang mở, Undo/Redo; toast đếm số chỗ; file export, backup, cột CSV giữ tên cũ | help:115, `e692dd0`…`35b794e` | none | **P1** · section mới *Rename without breaking* + ảnh |
| 3 | Modal từ chối tên trùng hoặc tên chứa `}` / `${` | `b10dfc2` | none | P1 · cùng section |
| 4 | **Đánh số bước trong block** | R:166 (số = vị trí `#N`) | **sai** fe:355 ("1.1, 1.2, 2.1…") | **P1** · sửa câu theo R:166 |
| 5 | Switch mới đặt trước bước đầu nó chọn; case đi theo bước khi Delete/kéo; form từ chối case cắt ngang block Switch con; bước đang sửa đi theo | R:181–186, `aa55013` `03c3371` `09aafaa` | none | P1 · 1–2 ý trong *Branching* |
| 6 | Tên chưa có trong bảng giữ nguyên `${name}` (gõ sai lộ ra trên trang) | help:285 | none | P2 · *Four types* |
| 7 | Bảng tự lưu khi sửa, không có nút Save | help:285 | none | P3 · notes |
| 8 | Pick có mục ∅ Blank; Fallback ∅ khớp ô trống | help:291, help:293 | none | P3 · *Four types* |
| 9 | Đổi kiểu giữ dữ liệu của mọi kiểu | help:298 | none | P3 · notes |
| 10 | Sort: Custom được giữ riêng, hover tên xem ngày tạo/sửa, Export Code theo thứ tự đang hiện | help:296 | thin fe:333 | P3 |
| 11 | Random tối đa 512 ký tự; Datetime | help:288 | ok fe:325 (thiếu 512) | P3 |
| 12 | Gợi ý `${` / Ctrl+Space | help:72 | ok fe:305 | — |
| 13 | Read DOM (nguồn, lấy một phần, Try on) | help:72 | ok fe:337–345 | — |
| 14 | Condition, Switch, Always | help:72, R:148 | ok fe:352–354 | — |
| 15 | Ưu tiên CSV > Read DOM > biến đã lưu | R:908 | ok fe:331 | — |

**Section đề xuất**
- **mới** *Rename without breaking* / *Đổi tên không vỡ kịch bản* — ảnh: modal sửa biến + toast báo số scenario đã đổi. Ý: #2, #3, cảnh báo cột CSV (liên kết trang csv).
- *Conditions, switches and blocks* — sửa #4, thêm #5; ảnh preview block Switch (dùng chung shot với recording).
- *Four types of variable* — thêm #6, #8.

### csv — *CSV data-driven runs*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | Header thành biến, ghi đè biến đã lưu | help:252 | ok fe:382–383 | — |
| 2 | Dấu phân cách `,` / `;`, preview số dòng | help:252 | ok fe:391, fe:438 | — |
| 3 | Delay, tiến trình Row X / Y, đếm ngược | help:252, ph:94 | ok fe:384–385 | — |
| 4 | Dòng lỗi → chạy tiếp dòng sau | help:252 | thin (ngầm hiểu) | P3 |
| 5 | Screenshot → Variable mỗi dòng; XLSX / HTML / ZIP; đặt tên folder ZIP | help:252, R:1275 | ok fe:386–433, **hidden** 1 ở 1280 | — |
| 6 | Cột CSV còn tên biến cũ sau khi đổi tên → popup báo | `35b794e`, help:115 | none | P1 · một ý |
| 7 | Chưa có ảnh nào | — | — | P2 · ảnh thẻ CSV đang chạy (Row 3 / 10) hoặc file XLSX kết quả |

**Section đề xuất** — thêm ảnh vào *Results you can hand over*; #6 vào notes.

### screenshots — *Screenshots & image tools*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | 6 kiểu chụp + nút Edit | help:465 | ok fe:451–452, fe:466–478 | — |
| 2 | Window capture | help:465 | ok fe:481–490 | — |
| 3 | Đếm ngược chỉ cho Visible; pill trong trang hoặc badge | help:548 | ok fe:453, fe:516 | — |
| 4 | Watermark `{url}` `{datetime}`; window capture bỏ `{url}` | help:548 | ok fe:454 (thiếu ý sau) | P3 |
| 5 | Tên file: prefix + thời điểm, tuỳ chọn **Include capture type** (`_full`, `_elem`, `_window`…), dòng ví dụ sống | help:552 | none | P2 · section mới *Files, names & settings* |
| 6 | Auto (vào `Downloads/screenshots/`) / Ask | help:548 | ok fe:456 | — |
| 7 | Tốc độ cuộn Segment 0.1–10, V/H riêng, chậm cho lazy load | help:555 | thin (settings fe:875) | P3 · cùng section |
| 8 | Thẻ cài đặt chụp cần bấm **Save Settings** | help:548 | none | P3 · cùng section |
| 9 | **Image Diff**: ảnh A/B, sensitivity, số pixel đổi + % diện tích, ảnh đánh dấu lưu được | help:477, ph:1637 | thin fe:455 | P2 · section mới *Image Diff* + ảnh |
| 10 | Image Editor mở ảnh từ clipboard, kéo thả, file | help:465 | thin fe:495 | — |
| 11 | Image Editor: công cụ, Adjust, Resize, Stamp, zoom | R:1271 | ok fe:493–509, **hidden** 2 + ảnh thu nhỏ | P2 · tách 2 section (Tools · Adjust, resize & stamp) |

**Section đề xuất**
- **mới** *Image Diff* / *So sánh ảnh* — ảnh: modal Image Diff có kết quả. Ý: #9, so trước/sau deploy.
- **mới** *Files, names & settings* / *Tệp, tên & cài đặt* — ảnh: thẻ Screenshot settings. Ý: #5, #6, #7, #8, #4.
- *Inside the Image Editor* tách đôi.

### export — *Code export in five formats*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | 5 định dạng, tên file | help:324, R:269 | ok fe:543–559, **hidden** 2 | P2 · bảng gọn hơn |
| 2 | Cửa sổ 4 tab Code · Variables · Actions · Settings | help:324 | ok fe:537, fe:562–585 (2 ảnh thu nhỏ) | P2 · section ảnh không kèm point |
| 3 | Định dạng nào làm được gì | help:324 | ok fe:588–604, **hidden** 6 | P2 · đổi bảng 6 cột thành danh sách ngoại lệ (bước nào bị Verify/Skip ở đâu) |
| 4 | Biến môi trường `PQA_*`, Data file (CSV) | help:324, R:330 | ok fe:607–624, **hidden** 3 | P2 · tách bảng env / point Data file |
| 5 | Settings: WebDriver (Chrome / Firefox / Edge / Safari), Output script / pytest, 🔄 lấy URL tab | help:324 | thin fe:538 | P3 |
| 6 | Thứ tự locator dự phòng | help:324 | ok fe:524 (fact 8) | — |
| 7 | Bước ⊘ không được export; Condition đếm theo danh sách gốc | help:324 | none | P3 · notes |

Ghi chú bên lề: help card `exportCode` của extension ghi Robot / Java "no data file yet", nhưng README extension
(R:458, R:489) và promo (fe:620) ghi là có. Promo đúng; help card của extension đã lỗi thời (việc của repo extension).

**Section đề xuất** — giữ 4 section, chỉ đổi cách trình bày (#1–#4) cho hết bị giấu; không cần thêm section.

### highlights — *Highlights by URL pattern* (1 section, 0 ảnh)

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | Tạo trên trang: chọn chữ → panel 5 màu + ghi chú | help:503 | ok fe:641–642 | — |
| 2 | Bấm vào highlight: đổi màu, sửa ghi chú, xoá riêng nó | help:503 | none | P2 · section mới *On the page* |
| 3 | Khôi phục khi quay lại, cả nội dung tải muộn | R:86 | ok fe:643 | — |
| 4 | Tìm kiếm, lọc màu (số trên chấm màu), stats | help:503 | ok fe:644–645 | — |
| 5 | Dropdown trang: đọc highlight của trang khác không cần mở | help:510 | none | P2 · section mới *In the popup* |
| 6 | Clear page highlights | help:512 | none | P3 · cùng section |
| 7 | Export JSON | help:503 | ok fe:646 | — |
| 8 | URL pattern: `*` đúng một đoạn path, không vượt `?` / `#`; builder 🌐 bấm từng đoạn exact → `*` → bỏ | help:516–518 | thin fe:668 | P2 · *URL patterns* |
| 9 | Thêm/bỏ pattern → vẽ lại từ tập khác, không mất | help:503 | ok fe:669 | — |
| 10 | Hash: `#anchor` cùng trang, `#/route` khác trang | R:91 | ok fe:670 | — |
| 11 | Công tắc tắt = ẩn, dữ liệu giữ nguyên | help:521 | thin fe:676 | P3 · notes |

**Section đề xuất**
- **mới** *On the page* / *Trên trang* — ảnh: trang mẫu có 3 highlight, panel màu + ghi chú đang mở. Ý: #1, #2, hover xem ghi chú.
- **mới** *In the popup* / *Trong popup* — ảnh: tab Highlight có list, chấm màu, stats, dropdown trang. Ý: #4, #5, #6, #7.
- *URL patterns* — thêm #8; ảnh builder 🌐 nếu chụp được.

### settings — *Hotkeys, backup & settings*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | Đặt phím: Set → bấm tổ hợp, Esc huỷ, **Reset to defaults**; chỉ chạy trên http/https/file | help:531–535 | thin fe:874 | P2 · *Hotkeys* |
| 2 | Bảng 10 phím mặc định | help:531 | ok fe:881–902, **hidden** 2 | P2 · lưới 2 cột gọn |
| 3 | Import: một scenario, mảng, file folder (tạo lại folder); ID mới; bỏ mục không phải scenario | help:176–182 | thin fe:908 | P2 · *Import, export & backup* |
| 4 | Backup chứa scenario, folder, biến, highlight + pattern, lịch hẹn, cài đặt | help:594 | thin fe:909 (thiếu highlight, lịch) | P1 · sửa câu (đang thiếu) |
| 5 | Restore **ghi đè, không gộp**; cố ý bỏ qua tab đã activate, checkpoint dở, dữ liệu CSV tạm, thông tin update cũ | help:595–600 | none | P2 · cùng section |
| 6 | Cảnh báo import có Run JS / Upload File | R:101 | ok fe:868, fe:910 | — |
| 7 | 4 nhóm thông báo + thông báo "update required" không tắt được | help:568–575 | ok fe:918–921, thin fe:927 | P3 |
| 8 | Theme, thứ tự tab, tab cuối, thẻ thu gọn, nút ? | R:23 | ok fe:870–871, fe:928 | — |
| 9 | Thẻ Version, khoá update | R:1308–1337 | ok fe:922, fe:927 | — |

**Section đề xuất**
- *Default hotkeys* — lưới gọn, thêm #1.
- *Import, export & backup* — ảnh: thẻ Backup / Restore. Ý: #3, #4 (sửa), #5, #6.
- Cài đặt chụp ảnh chuyển sang trang screenshots (*Files, names & settings*), trang settings chỉ liên kết.

### Tổng kết Task 3

| Ưu tiên | Số dòng | Gồm |
|---|---:|---|
| **P1** (sai, hoặc đã phát hành mà chưa có) | 8 | recording #6 · playback #6 · variables #2 #3 #4 #5 · csv #6 · settings #4 |
| P2 | 28 | mọi trang — phần lớn là chi tiết UI có sẵn trong help card mà promo chỉ nhắc qua hoặc đang bị giấu |
| P3 | 18 | chi tiết nhỏ, làm nếu còn chỗ |
| — | 37 | đã đủ, giữ nguyên |

91 dòng; 54 cần làm.

Section mới đề xuất: recording 2 · playback 2 · run-results 1 · variables 1 · screenshots 2 · highlights 2 = **10 section,
mỗi section một ảnh thật**. Ảnh thêm vào section có sẵn: playback (Now Playing), run-results (Bug report), csv, variables
(block Switch, dùng chung với recording), settings (Backup) = 4 ảnh mới. Tổng **~14 ảnh mới** cho trang popup ở đợt A.
