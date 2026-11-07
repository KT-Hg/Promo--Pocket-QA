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

## Gap matrix — 3 trang tool (Task 4)

Viết tắt thêm: `st:N` = `Pocket QA/sqltest.html:N` · `sq:key` = khoá trong `sqlcases/i18n/en.js` · `dt:N` =
`Pocket QA/dbtest.html:N` · `help:430` = help card `dbtools`, `help:395` = `apicases` · **thấy** = đã bấm thử trên
`sqltest.html` thật (preview `ext-static`, cổng 8384) ngày 2026-11-02: query mẫu "Report query", Analyze (67 case),
4 tab rail, Diagram, Compare mode (16 Impacted · 39 Unrelated · 20 No longer applies), 4 tab insight.

Phát hành: SQL và DB sau `060fcf0` chỉ đổi vỏ (`tool-base`, cột trái thu gọn, đổi tên file) → mọi dòng tính năng
là `released` trừ dòng ghi **1.0.28**. API Tests toàn bộ là **1.0.28**.

### sql-test-designer — *SQL Test Case Designer*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | SELECT / INSERT / UPDATE / DELETE, quote kiểu MySQL / SQL Server / ANSI, tham số `?` `:name` `@name` `$1` | R:524 | ok fe:689, fe:698 | — |
| 2 | 4 kỹ thuật (EP+BVA, Decision Table, NULL/3VL, JOIN/GROUP/ORDER-LIMIT) | R:546, st help | ok fe:704–713 | — |
| 3 | **Decision table 3 bậc**: đủ 2ⁿ tới N điều kiện (tuỳ chọn *Full decision table up to*, mặc định 4) → **Pairwise** tới 8 → MC/DC | st:93–101 (`sq:ui.mcdcHint`), `decision-table.js:166–173` | **sai** fe:691, fe:710 (bỏ qua Pairwise) | **P1** · sửa 2 câu, nói có tuỳ chọn |
| 4 | **CTE được phân tích riêng** (case có tiền tố `CTE · tên ·`); chỉ subquery lồng mới chỉ được báo | `sq:find.cteOne`, `generate.js:237–248` | **sai** fe:763 ("CTEs and subqueries are flagged") | **P1** · sửa note |
| 5 | Tên 3 nhóm của Compare: **Impacted / Unrelated / No longer applies** | st:177–185 | **sai** fe:729 ("Changed, Unrelated or Stale") | **P1** · dùng đúng tên UI |
| 6 | Pane Techniques: bật/tắt từng kỹ thuật, số case mỗi kỹ thuật (`4/4 on · 67 cases`), tuỳ chọn tách cả điều kiện trong `ON` | st:88–106, **thấy** | none | P2 · ý trong *Techniques* |
| 7 | 6 query mẫu (Examples…): report, bẫy NULL, WHERE nhiều điều kiện, CASE, UPDATE, INSERT | st:72, `sqlcases/ui/examples.js` | none | P2 · bước *Paste a query* |
| 8 | **Diagram** (tab Schema → Diagram): dialog *Table relationships*, đếm bảng · link, hộp bảng có PK/FK, đường nối kiểu crow's foot, kéo hộp, kéo nền để pan, cuộn để zoom, − / + / Fit, hover để làm nổi những gì bảng chạm tới; báo rõ khi không có link | st:121–127, st:430–437, `sq:dg.diagram*`, `diagram.js`, **thấy** | thin fe:728 (1 dòng; bị giấu ở 375) | **P2 (ví dụ của người dùng)** · section mới *Schema & diagram* + ảnh |
| 9 | Pane Schema: cột, kiểu, PK, FK → bảng đích, NOT NULL, id "added" khi bảng không có khoá, cột không rõ thuộc bảng nào | `sq:dg.pk`…`sq:dg.note.*`, **thấy** | thin fe:743 | P2 · cùng section |
| 10 | Compare: diff theo 12 mặt (bảng, join, ON, WHERE, HAVING, GROUP BY, aggregate, ORDER BY, LIMIT/OFFSET, SELECT list, CASE, cột được ghi) + "logic AND/OR/NOT đổi dạng" + "đổi loại câu lệnh"; danh sách case *No longer applicable* | `sq:diff.*`, st:69–85, st:203–215, **thấy** | thin fe:729, bị giấu ở 1280 | P2 · section mới *Compare before/after* + ảnh |
| 11 | Findings: 15 loại — comma join, JOIN không ON, NATURAL, WHERE trên bảng outer-join, `= NULL`, `NOT IN` subquery, LIMIT không ORDER BY, khoá phân trang, DML không WHERE, aggregate bị join nhân bản, không suy được kiểu, chia cho 0 / NULL literal, CTE, subquery; báo tham số đã/chưa gán | `sq:find.*` | thin fe:693 (3 ví dụ) | P2 · section mới *Findings & coverage* |
| 12 | Coverage: theo mệnh đề — đủ bảng *8 of 8 combinations*, condition / decision coverage %, danh sách điều kiện | st:200, **thấy** | thin (chỉ trong JSON fe:755) | P2 · cùng section + ảnh |
| 13 | *What was parsed*: loại câu lệnh, bảng, điều kiện đánh số kèm kiểu suy ra, join, result shape | st:206, **thấy** | none | P2 · cùng section |
| 14 | Panel đóng sẵn, dòng tóm tắt có số; Findings tự mở khi query có lỗi | R:533–544 | none | P3 |
| 15 | Stat row 5 số | st:146–151 | ok fe:730, **hidden** | P2 · *Case list & inspector* |
| 16 | Tìm, lọc (ưu tiên, mệnh đề, bảng/cột, có dữ liệu mẫu), Full / Dense, cột kỹ thuật có mã (EP, BVA, Decision Table, MC/DC, Pairwise, Branch Coverage, NULL/3VL, Structure) | st:229–276, `sq:tech.code.*` | ok fe:731, **hidden** | P2 · cùng section |
| 17 | Case trùng dữ liệu được gộp ("Also matches: …") | `sq:case.mergedNote` | none | P3 |
| 18 | Inspector: vì sao case quan trọng, dòng cần chuẩn bị (ô đang test tô sáng), yêu cầu không biểu diễn được bằng dòng, query + kết quả mong đợi | `sq:dg.rationale`…`sq:dg.requirements` | ok fe:732, fe:740–742 | — |
| 19 | Sample values: tham số + giá trị mẫu cột, phạm vi ảnh hưởng (`66 cells`, "not used by any case"), ↺ từng giá trị, Reset all, báo giá trị sai kiểu, nhớ qua phiên | st:109–115, R:581–608, **thấy** | ok fe:744–745, thin phần phạm vi / reset | P3 · 1 ý |
| 20 | Export: CSV, JSON, **Copy JSON to clipboard**, Data CSV, Verify SQL | st:155–164 | ok fe:749–757 (thiếu Copy JSON) | P3 |
| 21 | Help *How the cases are derived* | st:306–430 | none | P3 · notes |
| 22 | Mặc định tiếng Việt, EN qua 🌐, sinh case theo ngôn ngữ đang dùng | R:529 | ok fe:766 | — |
| 23 | Cột trái thu gọn (☰ / ⟨ / *Query ›*), giao diện chung `tool-base` | st:32, st:61, st:302, `9d25060` | none · **1.0.28** | Task 17 |

**Section đề xuất** (4 → 7, trong trần 8 của plan)
- *Techniques* — giữ bảng, sửa hàng Decision table (#3); thêm #6.
- **mới** *Schema & diagram* / *Lược đồ & sơ đồ quan hệ* — ảnh: dialog Diagram (shot đầu của Task 5). Ý: #8, #9, "sai thì thấy ngay trước khi gõ dữ liệu".
- **mới** *Compare before/after* / *So sánh trước/sau* — ảnh: thanh triage + tab *Changes detected*. Ý: #5, #10.
- *Case list & inspector* / *Danh sách case & inspector* — tách từ *Inside the analysis screen*, giữ ảnh workspace. Ý: #15, #16, #18, #17.
- **mới** *Findings, coverage & what was parsed* / *Cảnh báo, độ phủ & kết quả phân tích* — ảnh: tab Coverage. Ý: #11, #12, #13, #14.
- *Test data & sample values* — giữ, thêm #19.
- *Export* — thêm Copy JSON.
- Notes: sửa #4; thêm #7, #21.

### db-test-session — *DB Test Session & Rollback*

| # | Khả năng | Nguồn | Promo | Ưu tiên · đề xuất |
|---|---|---|---|---|
| 1 | Panel góc dưới phải, ▶ Start session, công tắc ở thẻ Data | help:430, R:765 | ok fe:778, fe:786 | — |
| 2 | Các kiểu ghi được ghi lại (form, Save and continue, xoá, sửa ô grid, tick rồi Delete / Edit / Clone, xoá cả kết quả, UPDATE / DELETE / INSERT ở trang SQL) | help:430, R:815 | ok fe:820–834, **hidden** 4 | P2 · gọn bảng |
| 3 | ↺ Roll back all, ↺ Undo last (Alt+Shift+Z), preview mỗi dòng một thay đổi (gom theo bảng khi > 12) rồi SQL | R:780–788 | ok fe:780, fe:793–801 | — |
| 4 | Step by step / Merged | R:800 | ok fe:812 | — |
| 5 | Drift: bảng cột / đã ghi / hiện tại, *Skip these rows* / *Overwrite anyway*; chỉ so cột mình đã ghi | R:880–886 | ok fe:781, fe:842 | — |
| 6 | ↷ Re-apply; bỏ qua câu lệnh gõ tay ở trang SQL, có lý do | help:430, R:789–795 | thin fe:782 | P3 |
| 7 | **■ End / ↻ Resume / ▶ New session**; bấm tên session → mọi session của database đó, có ô lọc khi > 6, Enter để resume; mỗi database chỉ một session ghi | help:430, R:796–799 | none | P2 · section mới *Sessions over time* |
| 8 | Panel: badge ⚠ n khi đóng, mỗi dòng log có giờ, bấm dòng *Recorded* mở diff ở trang quản lý, dòng trạng thái tự mờ sau ~8 s, ⇤ chuyển góc | R:769–776 | thin fe:811, fe:813 | P3 · cùng section |
| 9 | **Copy undo SQL** để tự chạy | help:430 | none | P2 · *Safe by design* |
| 10 | Trang quản lý: ↺ / ↷ từng thay đổi, tick nhiều, nút nói đúng việc sẽ làm (*Roll back all 12*, *Roll back 3 selected*, *Run 3 again*), Export `.sql` / `.json`, Rename, Delete, **Clean up…** session đã kết thúc | dt:38–62, R:800–808 | ok fe:814–816, thiếu Rename / Delete / Clean up | P3 |
| 11 | **Settings**: bật tích hợp, cho extension tự chạy undo SQL, bật/tắt drift check, Merged làm mặc định, đọc dòng trước câu lệnh gõ tay, trần số dòng (200), trần quét khoá INSERT (10 000), ép engine (mysql / pgsql / mssql / sqlite / oracle), dung lượng đang dùng | dt:84–103 (trừ phần bị ẩn, xem #16) | none | P2 · section mới *Settings & limits* + ảnh |
| 12 | Từ chối: bảng không khoá, ghi 2 bảng, không WHERE, cột BLOB / file, vượt trần, CSV import trong grid, INSERT không phân biệt được (> trần quét); DDL không được ghi | R:861–872, help:430 | ok fe:843 (thiếu BLOB, CSV import, DDL, trần quét) | P2 · bổ sung 1 ý |
| 13 | `ON UPDATE CURRENT_TIMESTAMP`, `ON DELETE CASCADE`, "found by difference" | R:874–878 | ok fe:852–853 | — |
| 14 | Chạy rollback từ tab Adminer; *Open Adminer* | R:808–811 | ok fe:845 | — |
| 15 | Chỉ lưu local, khoá theo origin + driver + server + database | R:890 | ok fe:846, fe:854 | — |
| 16 | Snapshot, backup table, bảo vệ database khi Playback — **có code nhưng đang ẩn** (`TABLE_COPIES = false`) | `dbtools/features.js:14`, `manager/actions.js:366–367` | không nhắc (đúng) | — · tiếp tục không nhắc |
| 17 | Cột trái thu gọn, `tool-base`, `dbtools.html → dbtest.html` | `9d25060`, `d26264d` | none · **1.0.28** | Task 17 |

**Section đề xuất**
- *Inside a test session* — giữ 2 ảnh, rút còn 4 ý (chuyển phần re-apply / export sang section khác).
- **mới** *Sessions over time* / *Phiên qua nhiều lần chạy* — ảnh: panel với danh sách session mở từ tên. Ý: #7, #6, #8.
- *What it records* — gọn bảng; thêm DDL / BLOB / CSV import (#12).
- *Safe by design* — thêm #9.
- **mới** *Settings & limits* / *Cài đặt & giới hạn* — ảnh: dialog Settings (không có phần đang ẩn). Ý: #11, các engine hỗ trợ.

### api-tests — trang mới, toàn bộ **1.0.28** (Task 15) — *đã thay bằng bảng ở mục Đợt B cuối file*

Giao diện `apitest.html` chỉ có tiếng Anh (0 `data-i18n`) → trang VI ghi rõ nhãn UI giữ tiếng Anh, như popup.

| # | Khả năng | Nguồn | Section đề xuất |
|---|---|---|---|
| 1 | Trang riêng mở từ Data → API Tests → *Manage API tests*; folder + request, giữ qua các lần mở | ph:834–842, R:658 | lead + At a glance |
| 2 | Gửi: đủ method (cả OPTIONS), body JSON / Form / Plain text / None, response nhị phân, Copy cURL; Paste cURL từ DevTools (bỏ header Cookie) | help:395, R:663–668, `02497bb` `d8e799e` | *Send & read the response* |
| 3 | Không vướng CORS (gửi từ trang extension), cookie của trình duyệt đi kèm (tắt trong tab Settings), timeout | help:395 | cùng section |
| 4 | Checks: status (`201`, `2xx`, `200,201`, `not5xx`), JSON path (equals / contains / exists / not exists / > / <), header, body, time; bấm key trong JSON để thêm check; mặc định phải 2xx; giá trị mong đợi dùng được `${var}` | R:684–694 | *Checks & the verdict* + ảnh |
| 5 | Verdict Passed / Failed / Broken, cùng luật với popup | R:696–700 | cùng section |
| 6 | Biến: từ Data tab rồi từ environment (environment thắng); quản lý environment ở top bar | R:702–704 | *Environments, saved values & auth* + ảnh |
| 7 | Save values: JSON path / header / status / body hoặc một phần (Extract như Read DOM) → environment đang dùng | R:705–707 | cùng section |
| 8 | Auth: None / Bearer / Basic / API key (header hoặc query) đặt trên folder rồi kế thừa, hoặc trên request; header cùng tên thắng | R:708–709 | cùng section |
| 9 | Bảng Headers có gợi ý tên / giá trị; gợi ý `${` | `487061e` `b0726a4` `dba535d` | cùng section (P3) |
| 10 | Run folder / Run all / *Run N shown* / Run selected / ▶ một hàng; lần lượt từng request; hỏi trước khi chạy POST/PUT/PATCH/DELETE và nêu host; ⏹ Stop | R:712–716 | *Running many* + ảnh |
| 11 | Mỗi request giữ kết quả cuối (verdict, status, time, URL đã che secret, 2 KB body đã che), lọc list theo kết quả; *Export ▾ → Results* ra CSV | R:716–719 | cùng section |
| 12 | Export Postman Collection v2.1: `${x}` → `{{x}}`, check → `pm.test`, saved value → `pm.environment.set`, có check 2xx mặc định và timeout; dòng `// pocket-qa:` để import ngược lại nguyên vẹn; secret để trống trừ khi tick *Include secret values* | R:722–728 | *Postman & CI* |
| 13 | Import collection v2.0 / v2.1 hoặc environment (≤ 5 MB): xem trước host và những gì bị bỏ; folder lồng → `Parent / Child`; auth của folder; biến collection → environment; không bao giờ chạy script Postman; GraphQL → JSON body; từ chối v1 | R:729–734 | cùng section |
| 14 | Chạy trong CI bằng Newman (`npx newman run … --env-var baseUrl=…`) | R:676–680 | cùng section (code mẫu) |
| 15 | Giới hạn của trình duyệt: không đặt được Cookie / Origin / Host / Referer / User-Agent; non-GET mang `Origin: chrome-extension://…`; `Set-Cookie` là thật; không tắt SSL, không client cert, không proxy, luôn theo redirect; time chỉ có tổng, size là byte đã giải nén; Backup chứa token | help:395, R:735–745 | notes *Limits of a browser* |
| 16 | Ảnh hưởng tới trang chủ: Privacy "One request out" sai khi phát hành | `index.html:368` | Task 16 |

### Tổng kết Task 4

| | Dòng | P1 | P2 | P3 | Đủ / không nhắc | 1.0.28 |
|---|---:|---:|---:|---:|---:|---:|
| sql-test-designer | 23 | 3 | 10 | 5 | 4 | 1 |
| db-test-session | 17 | 0 | 5 | 3 | 8 | 1 |
| api-tests | 16 | — | — | — | — | 16 |

- **3 lỗi P1 trên trang SQL đều có từ trước 1.0.25** — promo viết theo README extension, mà README cũng chưa nói Pairwise
  và vẫn ghi "CTEs … flagged" (R:647). README extension lỗi thời ở 2 chỗ này (việc của repo extension).
- Section mới: SQL 3 · DB 2 · API 5 (trang mới) — ảnh mới: SQL 3 · DB 2 · API 4.
- Cộng Task 3: **15 section mới + trang API, ~19 ảnh mới cho đợt A, ~6 ảnh cho đợt B** (4 của API + 2 ảnh toàn
  trang SQL / DB chụp lại ở Task 17).

Section mới đề xuất: recording 2 · playback 2 · run-results 1 · variables 1 · screenshots 2 · highlights 2 = **10 section,
mỗi section một ảnh thật**. Ảnh thêm vào section có sẵn: playback (Now Playing), run-results (Bug report), csv, variables
(block Switch, dùng chung với recording), settings (Backup) = 4 ảnh mới. Tổng **~14 ảnh mới** cho trang popup ở đợt A.

---

## Đợt B — review `060fcf0..e98ed43` (Task 14, 2026-11-03)

Bản Store 1.0.27 = **`e98ed43`** (người dùng xác nhận). Mọi `file:line` dưới đây là ở `e98ed43`
(`git show e98ed43:<file>`), không phải `main` hay working copy (`list-editing` có WIP). Viết tắt: `ui/` =
`apicases/ui/`, `R:` = README extension, `api.html` = `apitest.html`.

### Delta `060fcf0..main` — 33 commit (31 trong bản Store) + nhánh `list-editing`

| Nhóm | Commit | Trong bản Store | Promo impact → task |
|---|---|---|---|
| API Tests — trang, folder/request, Send, cURL | `ddca568` `fd66c81` `708975a` `d8e799e` `aac0bdb` `02497bb` | có | Trang `api-tests` → Task 15, 18 |
| API Tests — check, verdict, environment, save values | `4597088` `729b7a9` `1ca86bf` `4bedc51` `adfadef` | có | Task 15, 18, 19 |
| API Tests — Headers dạng bảng, gợi ý `${`, auth | `487061e` `dba535d` `b0726a4` `ae2784d` `c331884` | có | Task 18, 19 (1 ý) |
| API Tests — chạy nhiều, Postman export/import, CSV kết quả | `db1ff8a` `fc80f61` `19c9258` `2211f3b` `78ff3d2` | có | Task 19 |
| API Tests — README + help card `apicases` + nút `?` ở thẻ | `e98ed43` | có | Nguồn chữ EN/VI → Task 18–19; vendor → Task 17 |
| Popup: thẻ API Tests (`popup.html:836`), `css/var-suggest.css` tách từ `03-variables.css` | `ddca568` `5218c13` (+ `dba535d`) | có | Task 17 — `update-vendor.mjs` đọc mọi `<link href="css/…">` nên tự lấy `vendor/var-suggest.css` |
| Đổi tên trang: `sqlcases→sqltest`, `dbtools→dbtest`, `apicases→apitest` | `d26264d` `a2c4867` | có | README promo (Task 20); ảnh giữ (giao diện chưa đổi) |
| Chỉ test / e2e | `7067a4c` `46bf875` `e41f012` `37d8438` `c8d6f98` `0f31528` | có | không |
| `tool-base`: một giao diện SQL/DB/API, cột trái thu gọn | `9d25060` | **không** | Task 21 (bản sau) |
| Docs: Export Code guide, README + help SQL | `00590ec` | **không** (chỉ docs) | không — promo đã đúng, xem dưới |
| `list-editing`: `25b60e0` list không nháy, `706dbb5` bộ lọc folder được nhớ, WIP action vừa lưu nhấp nháy | chưa vào `main` | **không** | Task 21 |

Popup ở `e98ed43` so với `vendor/`: `popup.html` chỉ khác 2 chỗ (`<link>` `css/var-suggest.css`, khối thẻ API Tests
`popup.html:828–842`); `css/popup/` chỉ khác `03-variables.css`. Permissions không đổi.

**`00590ec` so với promo:** đã khớp, không cần sửa. Robot qua DataDriver + Java có data file: `features-en.js:708`,
`features-vi.js:645`. Pairwise tới 8 sau giới hạn bảng đầy đủ: en `:803`, `:822` · vi `:734`, `:753`. CTE có case riêng,
subquery lồng chỉ được báo: en `:924` · vi `:847`.

### api-tests — gap matrix theo code UI

Thay cho bảng *api-tests* ở Task 4 (viết từ README). Giao diện chỉ tiếng Anh: trang VI giữ nhãn nút tiếng Anh.

| # | Khả năng (nhãn UI đúng nguyên văn) | Nguồn ở `e98ed43` | Khác README / bảng cũ | Section |
|---|---|---|---|---|
| 1 | Data → thẻ **API Tests** → *Manage API tests* mở trang riêng. 3 cột: **Folders** · danh sách request · request đang mở. Lưu ở `apiCasesState`, còn nguyên khi mở lại. Trống: "No API tests yet" kèm gợi ý Paste cURL / Postman | `popup.html:836`, `api.html:18–58`, `apicases/model.js:17`, `ui/list.js:177–178` | — | lead · At a glance |
| 2 | **Send** (Ctrl+Enter); method GET … HEAD, **OPTIONS**; tab **Headers · Auth · Body · Checks · Save values · Settings**; body **None / JSON / Text / Form**, nút **Format** cho JSON; GET/HEAD gửi không body | `ui/response.js:58`, `model.js:22–23`, `ui/editor.js:25–26`, `:97` | README ghi "Plain text" — UI là **Text** | *Send & read the response* |
| 3 | Response: status, `ms`, kích thước (đã giải nén), "Redirected to …"; JSON xem được, bấm key; nhị phân → *Binary · type · size* + **Download**, ảnh xem trực tiếp; body dài chỉ hiện phần đầu | `ui/response.js:91–164`, `ui/json-view.js` | thêm: xem trước ảnh, cắt body dài | cùng section |
| 4 | **Paste cURL** (DevTools → Copy as cURL (bash)) → **Add request**; bỏ header trình duyệt tự đặt và Cookie. **Copy cURL**: biến đã điền, "a terminal sends it without the browser's cookies" | `ui/paste-curl.js:31–47`, `ui/editor.js:60–73` | — | cùng section |
| 5 | Tab **Settings**: Timeout (mặc định 30 s, tối đa 60), **Send the site's cookies** (mặc định bật; `Set-Cookie` đổi cookie thật — logout là đăng xuất thật) | `ui/editor.js:130–146`, `model.js:24–25` | — | cùng section + notes |
| 6 | **Checks**: Status `is` (`200 · 2xx · 200,201 · not5xx`) · JSON `= / contains / exists / does not exist / > / <` · Header `exists / = / contains` · Body `contains / does not contain` · Time `<` ms. Không check nào → phải 2xx. **＋ Add check**, bấm key trong response để thêm, kéo để sắp xếp; `${` trong giá trị | `ui/checks.js:15–24`, `:97`, `:164–165`, `shared/api-response.js:242` | bảng cũ thiếu toán tử Header/Body | *Checks & the verdict* |
| 7 | Mỗi check ✓ / ✗ / ⚠; verdict **Passed / Failed / Broken** (Broken = test sai: không response, timeout, không phải JSON, biến trống, không lấy được giá trị) | `ui/checks.js:27`, `ui/response.js:91–94`, help `card-help-data.js:378` | — | cùng section |
| 8 | **Environment** ở top bar + **Manage**: ＋ New · Duplicate · Delete (có Undo) · **In use**; mỗi environment một bảng Variable/Value; khối **From the Data tab** = biến của popup, environment thắng khi trùng tên | `api.html:24–25`, `ui/environments.js:38–56`, `:82–83`, `:107–147` | — | *Environments, saved values & auth* |
| 9 | **Save values** (**＋ Save a value**): từ **JSON path / Header / Status / Body** (body: cả body hoặc mẫu `token=${token};`) → environment đang dùng sau mỗi Send; toast "Saved token to "Dev""; tên kiểu token/secret/pass/key bị che, 👁 để xem; **Save as variable…** từ key trong response | `ui/extracts.js:20–31`, `:64–109`, `ui/editor.js:175` | — | cùng section |
| 10 | **Auth**: **Inherit from folder (Shop: Bearer)** · No auth · Bearer token · Basic auth · API key (Header hoặc Query `?name=value`); dialog *Auth of "folder"*; header cùng tên ở tab Headers thắng | `model.js:62`, `ui/auth.js:17`, `:52–53`, `:82`, `:89`, `:107–123` | — | cùng section |
| 11 | Headers dạng bảng: tick để gửi/không, gợi ý tên/giá trị ngay dưới ô, mẫu nhanh **Accept JSON · Bearer token · No cache**, **Bulk edit** dạng text, dòng **Also sent** (header tự thêm); gõ `${` gợi ý biến | `ui/headers.js:26–28`, `:58–66`, `:78`, `:127–131`, `ui/var-suggest.js` | mới so với bảng cũ: mẫu nhanh, Bulk edit, Also sent | 1 ý trong *Send…* |
| 12 | Chạy: **▶ Run folder** / **▶ Run all** / **▶ Run N shown** (theo bộ lọc) / **▶ Run selected** / Send trên một hàng; lần lượt từng request, **Delay** giữa hai request; hỏi trước khi gửi request ghi dữ liệu, nêu host, nút **Send**; **⏹ Stop** | `ui/run-bar.js:36–41`, `:79–102`, `ui/list.js:73–76`, `apicases/run.js:71–78` | mới: Delay | *Running many* |
| 13 | Kết quả: thanh "Last run 10:42 · 3 passed · 1 failed · 2 not run", mỗi hàng giữ kết quả cuối; lọc theo tên/URL, method, **✓ Passed / ✗ Failed / ⚠ Broken / · Not run**; chọn nhiều → Run selected / Move to… / Delete (có **Undo**); kéo để sắp xếp | `ui/run-bar.js:31–33`, `:103`, `api.html:46–53`, `ui/list.js:34`, `:62–76`, `:106–108` | mới: Undo, Move to | cùng section |
| 14 | **Export ▾** → **Postman collection** (v2.1: `${x}`→`{{x}}`, check → `pm.test`, save value → `pm.environment.set`, dòng `// pocket-qa:` để import lại nguyên vẹn; **Include secret values** mặc định tắt) · **Results** (CSV kết quả cuối) | `ui/exports.js:49–61`, `postman-export.js:6–31`, `results-csv.js:16` | — | *Postman & CI* |
| 15 | **Import** → *Import from Postman*: collection hoặc environment ≤ 5 MB; xem trước **Requests go to** (host) và **Left out or changed**; folder lồng → "Parent / Child"; script Postman không bao giờ chạy; GraphQL → JSON `{ query, variables }`; environment được thêm, không tự dùng | `ui/import.js:16–89`, `postman-import.js:11–26`, `:111`, `:139` | — | cùng section |
| 16 | CI: `npx newman run Shop.postman_collection.json --env-var baseUrl=…` | `R:663–679` | — | cùng section (khối code) |
| 17 | *Limits of a browser*: không đặt được Cookie/Origin/Host/Referer/User-Agent; non-GET mang `Origin: chrome-extension://…`; `Set-Cookie` thật; không tắt SSL, không client cert, không proxy, luôn theo redirect; time chỉ có tổng, size đã giải nén; Backup chứa case + environment (cả token) | `R:735–745`, help `card-help-data.js:378` | — | notes |
| 18 | Ảnh hưởng trang chủ: `index.html:345`, `:368` (Privacy "one request"), `:400` (`<all_urls>`) | — | — | Task 16 |

Không đưa lên trang: Duplicate/Delete request, Rename folder (thao tác thường), `Showing the first … of …` (chi tiết nhỏ).

### Section & ảnh chốt cho Task 15–19

Trang `api-tests`: lead, *At a glance* (#1, #2, #6, #8, #12), steps = *From a cURL to a run in CI* (R:663, rút 5 bước),
5 section, notes. Trong trần 8 section.

| Section (EN / VI) | Ý | Shot | Vùng cắt |
|---|---|---|---|
| *Send & read the response* / *Gửi request & đọc response* | #2–5, #11 | `api-send` | `#insp` sau Send `Get order`: tab Body/Headers + response JSON 200 |
| *Checks & the verdict* / *Check & kết luận* | #6–7 | `api-checks` | `#insp` tab Checks: 4 check, 1 ✗ (verdict **Failed**, dòng lý do) |
| *Environments, saved values & auth* / *Môi trường, giá trị lưu & auth* | #8–10 | `api-env` | dialog Environments: `Dev` In use, `baseUrl`, `token` bị che, khối *From the Data tab* |
| *Running many* / *Chạy nhiều request* | #12–13 | `api-run` | `.main` sau ▶ Run folder: thanh Last run + hàng ✓ ✗ ⚠ |
| *Postman & CI* / *Postman & CI* | #14–16 | `api-import` | dialog *Import from Postman* đang xem trước (`tests/fixtures/postman-sample.json` ở `e98ed43`) |
| notes *Limits of a browser* | #17 | — | — |

Tuỳ chọn nếu còn chỗ trong *Running many*: `api-ask` (hỏi trước khi gửi DELETE, nêu host).

**Seed cho `capture-shots.mjs`** (Task 15): `chrome.storage.local` `apiCasesState` theo shape `apicases/model.js`
(kiểm qua normalize khi load), environment `Dev` = `{ baseUrl: http://<host giả>:<port>, token: '' }`, folder **Shop**
(auth Bearer `${token}`):
- `Log in` — POST `${baseUrl}/auth/login`, Auth **No auth**, Save value `token` ← JSON `access_token`
- `Get order` — GET `${baseUrl}/orders/42`; check status 2xx, `data.status` = `PAID`, `data.total` > 0, header
  `Content-Type` contains `json`
- `List orders` — GET `${baseUrl}/orders?status=PAID`
- `Cancel order` — DELETE `${baseUrl}/orders/43` (để có hỏi-trước-khi-ghi)
- `Daily report` — GET `${baseUrl}/reports/today`, check JSON trên body HTML → **Broken**

Route giả (server cục bộ có sẵn của script): `POST /auth/login` → `{ "access_token": "…" }`, `GET /orders/42` → JSON
order, `GET /orders` → danh sách, `DELETE /orders/43` → 204, `GET /reports/today` → `text/html`. Một check cố ý sai
(vd. `data.total` > 1000) để có ✗.

### Bấm thử trên bản Store (Task 15, 2026-11-03)

Chạy `capture-shots.mjs` + một probe dùng một lần trên bản `e98ed43` giải nén ra thư mục tạm (`git archive`), Edge
headless. API giả = CDP `Fetch.requestPaused` trả lời `https://api.shop.example` ngay trong trình duyệt — `fetch()` của
trang extension bị chặn được, không cần server, không ra mạng.

| # | Thấy ở | Ghi chú |
|---|---|---|
| 1 | `api-run` (đầu cột giữa: *Shop 5*, ＋ Request), diff `popup.html` | thẻ popup thấy qua diff, sẽ thấy trong preview ở Task 17 |
| 2 | `api-send`, probe | 6 tab đúng như bảng; body None / JSON / Text / Form |
| 3 | `api-send` | `200 OK · 105 ms · 194 B decoded`, URL đã điền biến, JSON tô màu |
| 4 | probe | dialog *Paste a cURL command* đúng chữ bảng; title Copy cURL "variables filled in" |
| 5 | probe | Settings: Timeout "(at most 60)", *Send the site's cookies* + câu logout |
| 6 | `api-checks` (Status / JSON / Time), code | toán tử Header / Body theo code, chưa mở trên UI |
| 7 | `api-checks`, `api-run` | ✗ Failed "Expected total = "3", got 2"; ⚠ "The response is not JSON" |
| 8 | `api-env` | biến Data tab trùng tên bị gạch, kèm "set here" — đúng ý "environment thắng" |
| 9 | `api-run` (Log in ✓ rồi Get order dùng token) | tab *Save values 1* |
| 10 | `api-run` (nút *🔑 Auth: Bearer* ở đầu folder), probe | dialog *Auth of "Shop"*; tab Auth: *Inherit from folder (Shop: Bearer)* |
| 11 | `api-send` | mẫu nhanh, Bulk edit, *Also sent* (Cookie; Content-Type khi body JSON) |
| 12 | `api-ask`, `api-run`, probe | câu hỏi "Send 1 POST, 1 DELETE to api.shop.example?"; *▶ Run 1 shown* khi lọc; Delay |
| 13 | `api-run`, probe | "Last run 09:34 PM · 3 passed · 1 failed · 1 broken"; bulk: Run selected / Move to… / Delete / Clear |
| 14 | probe | menu Export: *📦 Postman collection .json · Include secret values · 📊 Results .csv* |
| 15 | `api-import` | *Shop API — 4 folders, 7 requests*, 3 host, 7 dòng "Left out or changed" (script, oauth2, form-data, GraphQL, PURGE) |
| 16–17 | — | README / help card, không phải UI — không cần bấm |

**Phát hiện thêm**
- Dialog Environments hiện **token / password nguyên văn** (chỉ hàng *Save values* mới che) → thêm vào ý Privacy của Task 16
  cùng "Backup chứa token".
- *Also sent* không liệt kê Authorization của auth folder (chỉ Cookie, Content-Type) — không ảnh hưởng chữ promo.
- Giờ trên thanh run theo locale trình duyệt (`09:34 PM`).
- Seed: giá trị lưu dùng field `varName` (không phải `name`) — đã sửa trong `API_STATE`.

**Ảnh đã chụp** (light + dark, `.png` + `.webp`): `api-send` 480×1029, `api-checks` 480×849, `api-env` 860×437,
`api-ask` 440×152, `api-run` 700×449, `api-import` 600×527. Chạy lại lần 2: `api-env`, `api-ask`, `api-import` giống hệt;
`api-send`, `api-checks` chỉ khác số ms; `api-run` khác giờ chạy và số ms từng hàng.
