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
