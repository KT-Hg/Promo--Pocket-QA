# Implementation Plan: Cập nhật promo theo extension v1.0.25 → HEAD, trang feature chi tiết hơn

Task chi tiết (acceptance criteria, verification): [`tasks/promo-update-todo.md`](promo-update-todo.md).
`tasks/plan.md` / `todo.md` (review-fixes) và `redesign-*` là các đợt trước — không đụng tới.

## Overview
Promo đang mô tả extension **v1.0.24** (vendor sync 2026-10-21, commit `374b9f3`). Extension đã có thêm 3 bản
phát hành (1.0.25–1.0.27, đang trên Store) và một tính năng lớn chưa phát hành (**API Tests** + giao diện
chung `tool-base` cho các trang tool). Đồng thời các trang `feature.html?id=…` mỏng: một tính năng có cả một
màn hình UI (vd. Diagram ở tab Schema của SQL Test Case Designer) chỉ được một dòng, và dòng đó còn hay bị giấu
sau "Show the rest". Plan này: (1) review có hệ thống — ra một **gap matrix** cho từng trang; (2) dựng cách
chụp ảnh UI thật từ extension; (3) viết lại các trang theo gap matrix, chia hai đợt theo bản đang có trên Store.

## Hiện trạng đã xác minh (2026-11-02)

**Phiên bản**
- `vendor/version.txt` = 1.0.24. Extension `manifest.json` = 1.0.27. Store (shields.io) = **v1.0.27**.
- Bump 1.0.27 là `060fcf0` (2026-10-30). Mọi commit API Tests (`ddca568`…) và `tool-base` (`9d25060`) đến **sau**
  → chưa có trên Store. Không quảng cáo chúng trước khi Store lên 1.0.28.

**Thay đổi extension từ `9e77d06` (baseline của lần sync trước) tới HEAD — 46 commit, 87 file**
| Đã phát hành (≤ `060fcf0`) | Chưa phát hành |
|---|---|
| Đổi tên biến ở Data tab → đổi trong **mọi scenario** (`${…}`, Read DOM target, form đang mở, Undo/Redo), toast đếm số chỗ, cảnh báo cột CSV còn tên cũ | **API Tests** (`apitest.html`): folder + request, Send, Paste cURL, Copy cURL, OPTIONS, response nhị phân |
| Modal biến từ chối tên trùng / tên chứa `}` hoặc `${` | Checks + verdict Passed/Failed/Broken; key JSON → check |
| Switch: edit đi theo action, đánh số theo vị trí (bỏ `displayNo`), Switch mới đặt trước các case, chặn case cắt ngang khối Switch khác | Environments, lưu giá trị từ response (token), auth Bearer/Basic/API key đặt trên folder |
| Upload File báo rõ file không có trên đĩa; hàng Upload File có màu riêng | Run folder / selected / all, kết quả giữ lại, xuất CSV |
| Thông báo validation nằm dưới hàng, không đè vào ô | Postman Collection v2.1 export (Newman/CI) + import collection/environment |
| `docs/store-description-en.txt` / `-vi.txt` (copy chính thức) | Gợi ý biến khi gõ `${` (`css/var-suggest.css`), header dạng bảng |
| | `tool-base.css`: SQL/DB/API chung một giao diện, cột trái thu gọn được; `sqlcases.html→sqltest.html`, `dbtools.html→dbtest.html` |

- `popup.html` so với `vendor/popup.html`: chỉ thêm thẻ **API Tests** ở tab Data + `<link>` `css/var-suggest.css`.
  `css/popup/` đổi 5 file (01, 02, 03 −117 dòng, 04, 12) → phải xem lại preview tab Data/Record sau khi vendor.
- Permissions trong `manifest.json` không đổi.
- Privacy ở `index.html:368` ("One request out, once a day") **sẽ sai** khi API Tests phát hành: request do người
  dùng gửi tới server họ chọn, request non-GET mang `Origin: chrome-extension://…`, `Set-Cookie` là thật, Backup
  chứa token (help card `apicases` của extension).

**Vì sao trang feature thiếu chi tiết** (đo trên site live, 1366×657, `feature.html?id=sql-test-designer`)
1. **Nguồn viết chỉ là README extension.** README không nhắc Diagram, Compare mode, hints, "What was parsed",
   tùy chọn giới hạn decision table… trong khi UI có (`sqltest.html`, `sqlcases/diagram.js`, 38 key `dg.*`,
   16 key `diff.*`, 12 key `hint.*` trong `sqlcases/i18n/en.js`). Kết quả: Diagram chỉ có 1 bullet.
2. **Luật một-section-một-màn cắt list.** Section "Inside the analysis screen" = 1 ảnh + 6 point → `site.js` giữ
   2 point, giấu 4 (Compare mode, stat row, filters, inspector) sau "Show the rest". List dài hơn = bị giấu nhiều hơn.
3. **Ít ảnh thật.** 5 ảnh cho 11 trang; 7/11 trang không có ảnh nào trong các section.

**Nhánh `taste-restyle` đang dở và hỏng:** `feature.html` đã bỏ `#heroIcon`/eyebrow, `features-*.js` đã bỏ
`icon`/`eyebrow`, nhưng `feature.js:59` vẫn gán `innerHTML` cho `#heroIcon` → `TypeError`, trang feature ở
localhost không render nội dung. Phải chốt trước mọi việc khác (Task 1).

## Architecture Decisions
- **Nguồn sự thật, theo thứ tự:** UI thật (`*.html`, catalog `sqlcases/i18n/`, `dbtools/i18n/`, help card
  `popup/help/card-help-data.js`, help modal của từng trang tool) → README extension → store description.
  Gap matrix ghi rõ `file:line` nguồn cho từng dòng để lần sau review lại nhanh.
- **"Chi tiết hơn" = thêm section, không kéo dài list.** Mỗi section một chủ đề, một ảnh thật, 3–5 point. Ví dụ
  SQL: tách "Inside the analysis screen" thành *Schema & diagram*, *Compare before/after*, *Case list & inspector*,
  *Findings & coverage*. `feature.js` đã render mảng `sections` bất kỳ và `.fnav` đã cuộn ngang
  (`site.css:432`) → **không sửa `feature.js` / `site.js`** cho việc này.
- **Thước đo "không bị giấu":** thêm `hiddenByFit()` vào `check-layout.js` (liệt kê item bị giấu sau
  "Show the rest"). Mục tiêu: `[]` ở 1366×657 và 1280×632 cho mọi section mới; mobile được phép cắt (đúng thiết kế).
- **Ảnh chụp từ extension thật, một script:** `capture-shots.mjs` trong repo promo, tìm repo extension giống
  `update-vendor.mjs` (arg → `EXT_REPO` → `../Pocket QA`), dùng lại `launchWithExtension()` + `page.screenshot`
  của `tools/lib/cdp-browser.mjs` (đã chạy e2e của extension trong Edge/Chromium), seed dữ liệu bằng chính message
  của extension (`CREATE_SCENARIO`, `SAVE_VARIABLES`… như `tools/e2e.mjs`) hoặc `chrome.storage` cho DB session.
  Mỗi shot: light + dark, `.png` + `.webp` lossless qua Pillow, như các ảnh cũ (WebP của CDP lossy kể cả quality 100).
  Thay cho các harness dùng-một-lần mô tả trong README.
- **Ảnh section cắt sát thành phần** (dialog Diagram, thanh triage, inspector, modal biến…), không chụp cả trang
  → giao diện `tool-base` (đổi top bar + cột trái) không làm chúng lỗi thời. Ảnh toàn trang tool chụp lại ở đợt B.
- **Hai đợt theo Store.** Đợt A = v1.0.27 (đã phát hành): làm và deploy ngay. Đợt B = API Tests + `tool-base`:
  làm trên nhánh riêng, merge khi Store = 1.0.28. Vendor đợt A lấy từ `060fcf0`
  (`git archive` ra thư mục tạm → `node update-vendor.mjs <thư mục>`) để preview không lộ thẻ API Tests sớm.
- **EN/VI cùng shape:** mọi chuỗi mới vào cả `features-en.js` và `features-vi.js`; `checkShape()` phải `[]`.
- **Sau mỗi lần sửa `.js`/`.css` của trang: `node stamp-assets.mjs`; sửa `demo.*`: `node sync-from-source.mjs`.**

## Task List
Thứ tự và chi tiết trong [`promo-update-todo.md`](promo-update-todo.md).

### Phase 0: Nền
- [x] Task 1: Chốt WIP `taste-restyle`, mở nhánh làm việc

### Phase 1: Review — đầu ra `tasks/promo-update-gaps.md`
- [x] Task 2: `hiddenByFit()` + báo cáo item bị giấu trên 11 trang
- [x] Task 3: Gap matrix — 9 trang của popup
- [x] Task 4: Gap matrix — 3 trang tool (SQL, DB, API Tests)

### Checkpoint 1: Người dùng duyệt gap matrix, chốt phạm vi section/ảnh

### Phase 2: Ảnh chụp thật
- [x] Task 5: `capture-shots.mjs` + shot đầu tiên (dialog Diagram)

### Phase 3: Đợt A — v1.0.27
- [ ] Task 6: Vendor v1.0.27, preview popup đúng bản Store
- [ ] Task 7: SQL Test Case Designer chi tiết (Schema & diagram, Compare, Case list, Findings)
- [ ] Task 8: Variables — đổi tên biến, chặn tên sai, gợi ý `${`
- [ ] Task 9: Recording & Playback — Switch, Upload File, validation
- [ ] Task 10: Run results · CSV · Export theo gap matrix
- [ ] Task 11: Screenshots · Highlights · Settings theo gap matrix
- [ ] Task 12: DB Test Session theo gap matrix
- [ ] Task 13: Trang chủ — copy theo store description, thẻ feature khớp trang

### Checkpoint A: 11 trang đạt check-layout/checkShape/hiddenByFit, EN+VI, light+dark → người dùng duyệt → deploy

### Phase 4: Đợt B — khi Store = 1.0.28
- [ ] Task 14: Vendor HEAD (thẻ API Tests, `var-suggest.css`)
- [ ] Task 15: Trang `api-tests` (trang thứ 12) + thẻ ở trang chủ
- [ ] Task 16: Privacy / Permissions / FAQ cho API Tests
- [ ] Task 17: Chụp lại ảnh toàn trang tool theo `tool-base`, đổi tên file trong README

### Checkpoint B: 12 trang đạt, Store đã 1.0.28 → người dùng duyệt → deploy

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Branded Chrome bỏ qua `--load-extension` | High | `findBrowser()` của extension đã ưu tiên Edge/Chromium; Windows có sẵn Edge. Task 5 làm sớm để biết ngay |
| Seed trạng thái phức tạp (Compare mode, DB session cần Adminer) | Med | SQL chạy được độc lập (chỉ cần nhập query); DB seed `chrome.storage` theo shape `dbtools/session.js` như harness cũ |
| Thêm section → trang dài, section vượt một màn | Med | ≤5 point/section, đo bằng `hiddenByFit()` + `checkLayout()` ở 3 viewport |
| Ảnh lỗi thời khi `tool-base` phát hành | Med | Ảnh section cắt sát thành phần; ảnh toàn trang chụp lại ở Task 17 |
| Quảng cáo tính năng chưa có trên Store | High | Đợt B nhánh riêng; vendor đợt A từ `060fcf0`; kiểm tra shields.io trước khi merge |
| Bản dịch VI kém tự nhiên | Med | Lấy câu chữ VI từ catalog/help card VI của extension trước khi tự dịch; người dùng đọc lại ở mỗi checkpoint |
| WIP `taste-restyle` có ý đồ thiết kế chưa rõ | Med | Open Question 1; mặc định hoàn thiện theo hướng WIP đang đi (bỏ icon/eyebrow) |

## Open Questions
1. WIP trên `taste-restyle` (bỏ icon/eyebrow/emoji): **hoàn thiện rồi commit** (mặc định) hay bỏ?
2. Đợt B: **chờ Store 1.0.28** (mặc định) hay đăng trang API Tests sớm với nhãn "Sắp có"?
3. Trần mỗi trang: mặc định ≤ 8 section nội dung (không tính overview/steps/notes/more) — đủ chưa?
4. Ảnh mới có cần cặp light + dark như ảnh cũ không? (mặc định: có)
