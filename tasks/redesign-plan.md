# Implementation Plan: Redesign trang promo Pocket QA theo phong cách portfolio (bản Demo)

## Overview
Làm một bản **Demo** của trang promo trong thư mục riêng `redesign/` — không sửa file nào ở gốc repo.
Giao diện theo portfolio `https://kt-hg.github.io/` (token màu navy + cam, font Be Vietnam Pro, header cố định,
eyebrow có số thứ tự, card, stats grid) và theo `D:\CV\UI-design-rules.md` (song ngữ EN/VI không dịch chuyển,
một section = một màn hình, lưới thẳng hàng, ngắt chữ). Giữ các tính năng chính: popup thật trong iframe
(chỉ tab + theme tương tác), CTA Add to Chrome, lưới 12 thẻ feature, How it works, Privacy + quyền + FAQ,
11 trang feature (`feature.html?id=…`) với preview popup, bảng, ảnh light/dark, prev/next, version từ store.

Quyết định của người dùng (28/10/2026): **song ngữ EN/VI cả trang chủ lẫn trang feature**, **màu portfolio**,
**demo cả `index.html` và `feature.html`**.

## Kết quả (29/10/2026) — demo xong, chờ người dùng review
- **Xem:** `http://localhost:8383/redesign/` (cần server ở gốc repo, vd. `python -m http.server 8383`).
  File: `redesign/index.html`, `feature.html`, `site.css`, `site.js`, `feature.js`, `features-en.js`,
  `features-vi.js`, `check-layout.js`. Không file nào ở gốc repo bị sửa; chưa commit.
- **Đã kiểm tra** bằng `check-layout.js` (tràn section, dịch chuyển EN↔VI, cuộn ngang, header tràn, gạch nối cuối
  dòng, chữ lẻ — cả hai ngôn ngữ): trang chủ ở đủ 15 cỡ màn của rule §5; 11 trang feature ở 375×812, 768×1024
  (3 trang), 1024×768, 1366×768, 1920×1080. Tất cả 0 lỗi; console sạch; `checkShape()` = 0 chuỗi thiếu VI; số
  phần tử mỗi trang feature khớp dữ liệu gốc; `evenOut()` không tạo long task (> 50 ms) trên trang dài nhất
  (trước khi làm lại trang feature — số mới ở mục 9).
  Sau khi sửa menu (mục 7 dưới): chạy lại trang chủ ở 15 cỡ màn + 901 và 1023px (menu 6 mục rộng bằng nhau từ
  1024px, không tràn khung), 11 trang feature ở 375×812 và 3 trang ở 1024×768 / 1024×1366 / 1920×1080 — 0 lỗi;
  scroll spy sáng đúng mục ở cả 6 section (pane hiện, 1536×730).
- **Khác trang thật (cố ý, cần người dùng duyệt):**
  1. Hero: lead ngắn lại (bỏ "CSV" và "five formats" vì đã có ở stats — rule §6 không lặp); stats đổi thành
     17 action types · 8 selectors per element · CSV data-driven runs · 5 code export formats; bỏ link
     "See all features →" (menu đã có).
  2. Thẻ feature viết gọn; "One-click recording" → "Record in one click" (cả tiêu đề trang feature) vì cụm
     "One-click" luôn để lại một chữ lẻ khi xuống dòng; thẻ export ở trang chủ là "Code export".
  3. "free" chỉ còn ở nút hero, CTA trang feature và FAQ (trước: 4 chỗ); thẻ CTA thứ 12 là "Get Pocket QA".
  4. Privacy tách 2 section (Privacy / Permissions), FAQ gộp với CTA cuối; quyền hiện bằng tên trong manifest
     (`<all_urls>` thay cho "Read and change data on all websites").
  5. Điện thoại: thẻ thành hàng gọn, mô tả + giải thích privacy + quyền 4–10 nằm sau "Xem thêm"; nút
     "See the popup" trong thẻ CTA ẩn (đã có ở hero).
  6. Trang feature: "Explore other features" chỉ còn icon + tiêu đề (10 thẻ, 5 hoặc 2 cột); breadcrumb "Home" →
     "Pocket QA"; một số chuỗi EN có thêm `&nbsp;`/`.nw` để không ngắt sai.
  7. Menu (sửa sau review 29/10): 6 mục khớp 6 section đánh số — Features · Tools · How it works · Privacy ·
     Permissions · FAQ — như portfolio (trước: 4 mục, Tools/Permissions/FAQ không có link). Bỏ mục "Preview": hero
     không có mục (như portfolio), logo về đầu trang, nút "See the popup" tới popup. Nút "Add to Chrome" rời thanh
     header: từ 1024px, 6 mục bằng nhau + nút không vừa (thiếu ~140px ở 1024×768); nút còn trong menu ☰ (≤ 900px),
     hero, thẻ Tools, FAQ và footer. VI "Quyền riêng tư" → "Riêng tư" (menu, eyebrow, footer) để 6 mục vừa ở
     1024×1366; `.nav` gap 16 → 8px (chỉ là khoảng tối thiểu). Trang feature: khối CTA cuối nằm trong section
     "More features", nên mọi section (trừ hero) có link trên thanh "On this page".
  8. Hai câu quyền (EN) rút gọn để 2 dòng, không đổi ý: `tabs` "Find the tab you record or play on…", `<all_urls>`
     "…screenshot any site you test" — trước đó Permissions cao hơn màn 1px ở 1280×632.
  9. Trang feature làm lại theo rule của trang chủ (sau review 29/10: "trang feature chưa được như mong muốn"):
     - Mỗi section = một màn dưới header + thanh "On this page" (44px); eyebrow đánh số 01…0N, nhãn trùng link
       trên thanh (1:1, như menu trang chủ). Hero = hero trang chủ: chữ + mockup popup thật mở ở tab của tính năng,
       thêm nút "Add to Chrome — free" / "See the popup" (header không còn nút cài).
     - Overview: 6 thẻ (3×2); cách dùng: 4 thẻ bước; bảng, ảnh chụp hay code nằm cạnh danh sách điểm từ 1024px;
       "Good to know": thẻ "i"; "More features": 10 thẻ gọn cạnh khối CTA (như FAQ trang chủ). Bỏ link
       trước/sau (10 thẻ đã có); điện thoại ẩn breadcrumb (chỉ lặp logo, menu và tiêu đề).
     - Section còn cao hơn màn: `site.js` giữ các mục đầu của danh sách (`[data-fit]` = số mục luôn giữ) và đưa phần
       còn lại ra sau "Xem thêm", ở mọi bề rộng (trang chủ chỉ ở điện thoại); ảnh chụp và code thu nhỏ trước (tối
       thiểu 140/100px, code cuộn), câu dẫn dưới tiêu đề ẩn sau cùng. Cắt ở một ngôn ngữ rồi ngôn ngữ kia, nên hai
       ngôn ngữ ẩn cùng mục. Lưới bỏ cả hàng một lúc (không thẻ lẻ). Bảng giữ chiều cao từng dòng (`<tr>` nhận
       `height`) để vẫn cắt được dòng.
     - Ẩn nhiều nhất ở màn thấp: 1366×768 — 2/9 dòng "Logic & data", 3/13 mục Selectors, 5/9 dòng bảng hỗ trợ của
       Export; 1920×1080 — không ẩn gì; 375×667 — mỗi section còn 1–3 mục.
     - Bảng 17 loại hành động (một section ở trang thật) tách theo nhóm thành "Page & control" (8) và "Logic & data"
       (9), thêm câu dẫn cho phần sau. Một ví dụ tên file viết lại ("as in … or …") để hai tên code không dính thành
       một cụm quá dài.
     - Điện thoại: bảng ≤ 3 cột xếp chồng (mỗi dòng một khối, ô có nhãn cột); bảng rộng hơn (ma trận 6 cột) vẫn cuộn
       ngang trong thẻ.
     - Đã kiểm tra (Playwright, bản cache mới mỗi lượt): trang chủ + 11 trang feature × 15 cỡ màn × EN/VI — 0 section
       vượt màn, 0 xê dịch, 0 cuộn ngang, header không tràn, 0 chữ lẻ/gạch nối; console sạch; `checkShape()` = 0;
       "Xem thêm"/"Thu gọn" mở đủ 9/9 dòng rồi về lại 1 màn; thanh "On this page" sáng đúng 8/8 section; đổi theme
       tải lại popup đúng theme.
     - Cái giá: `evenOut()` (tải trang, đổi cỡ, bấm "Xem thêm") giờ là một long task 60–170 ms ở trang feature, ~70 ms
       ở trang chủ (trước đây < 50 ms), vì phải đổi ngôn ngữ để đo 8–12 lần.
  10. Thanh "On this page" làm lại (sau review 29/10): mỗi mục là một "chương" — số (01, 02…) trên tên, như eyebrow;
      cả nhóm canh giữa (trước: dồn trái, khoảng cách lệch); mục đang xem gạch chân cam, mục đã qua số cam. Không làm
      các mục rộng bằng nhau như menu trang chủ: đo 11 trang, cần tới 1415px trong khi khung chỉ 1072px
      (`Không gian làm việc`, `Trang & điều khiển`). Thanh cao 52px (từ 44px); chỗ nào không vừa thì cuộn ngang từ
      mục đầu (`justify-content: safe center`). Đã chạy lại 11 trang × 15 cỡ màn: 0 lỗi; scroll spy và bấm link
      (section nằm ngay dưới thanh, 116px) đúng.
      Sau đó (người dùng không thích lúc thanh nằm giữa màn, giữa hero và 01): thanh ra khỏi luồng trang
      (`position: fixed`), ẩn khi còn thấy hero, trượt ra từ dưới header khi đáy hero lên quá nửa màn (lúc đầu chờ
      đáy hero qua mép dưới thanh — người dùng thấy thanh biến mất khi 01 đã hiện, nên đổi); vào thẳng
      một `#section` thì thanh có sẵn. Đã chạy lại 11 trang × 6 cỡ màn: 0 lỗi. Phương án đã cân nhắc và bỏ: sidebar
      trái (nội dung hẹp ~220px → ẩn thêm nhiều dòng), cột số mép phải (ở 1366px lề chỉ ~115px, không đủ chỗ cho tên).
- **Lỗi có từ trước ở trang thật (báo riêng, chưa sửa):** preview ở `feature.html` dùng `loading="lazy"`; trong pane
  test, đổi theme trang làm `src` đổi nhưng iframe không tải lại → ảnh chụp không đổi theo theme. Bản demo bỏ
  `lazy` và đã chạy đúng.
- **Chưa kiểm tra:** thiết bị thật, Firefox/Safari, mở bằng `file://`; dark mode chỉ xem bằng ảnh, không đo tương
  phản lại (token lấy nguyên từ portfolio).

## Architecture Decisions
- **Thư mục `redesign/`, chỉ thêm file.** Tài nguyên dùng chung trỏ ngược lên gốc: `../popup-demo.html`,
  `../vendor/icon128.png`, `../screenshots/*.webp`, `../store-version.js`. Popup iframe vẫn là bản sinh từ
  `sync-from-source.mjs` → không đụng chuỗi vendor/sync.
- **File:** `redesign/index.html`, `redesign/feature.html`, `redesign/site.css` (dùng chung 2 trang),
  `redesign/site.js` (theme, ngôn ngữ, `evenOut()`, menu, reveal, fit popup), `redesign/feature.js` (renderer),
  `redesign/features-en.js` + `redesign/features-vi.js` (nội dung), `redesign/check-layout.js` (snippet kiểm tra).
  CSS tách file (khác portfolio để inline) vì 2 trang dùng chung.
- **Song ngữ theo đúng cơ chế portfolio:** mỗi chuỗi có cặp `<span lang="en">` / `<span lang="vi">`,
  CSS `html[lang="en"] [lang="vi"] { display:none }`; `evenOut()` đo cả 2 ngôn ngữ cho `labelled` (bề rộng) và
  `rows` (chiều cao, gồm mọi `section`); `noAnchor()` khi đổi ngôn ngữ. Không viết cơ chế riêng.
- **Key localStorage `lang` và `theme` giống portfolio.** Cùng origin `kt-hg.github.io` → chọn VI/dark ở portfolio
  rồi bấm "Demo" sang promo vẫn giữ lựa chọn. (Bản cũ dùng `demoPageTheme`; popup giữ `demoPopupTheme` riêng.)
- **Nội dung feature: 2 object song song** `FEATURES_EN` (chép nguyên văn từ `feature.js` gốc) và `FEATURES_VI`
  cùng hình dạng. Renderer ghép từng chuỗi thành cặp span; thiếu VI thì dùng EN (trang chạy được khi đang dịch dở).
  `check-layout.js` có thêm hàm so hình dạng hai object (cùng key, cùng độ dài mảng).
- **Popup trong iframe vẫn tiếng Anh** — extension không có `_locales`, popup là UI thật được vendor. Bản VI ghi rõ
  điều này ở dòng gợi ý dưới mockup. Ảnh chụp màn hình cũng giữ UI tiếng Anh; chỉ dịch caption.
- **Nhãn UI giữ nguyên tiếng Anh trong bản VI** (Start Recording, Add Manual Action, Passed/Failed/Broken…) vì
  người dùng sẽ thấy đúng chữ đó trong popup. Số liệu, tên riêng, phím tắt viết giống nhau ở 2 ngôn ngữ.
- **"Một section = một màn hình" áp dụng cho cả hai trang** (đổi 29/10; trước đó trang feature được dài hơn một
  màn). Trang feature: một màn dưới header + thanh "On this page"; phần không vừa nằm sau "Xem thêm" (mục 9 ở trên).
- **Bố cục trang chủ (7 section, mỗi cái ≤ 100svh − 64px):**
  1. Hero — chữ + mockup popup (≥1024: 2 cột; <1024: chữ và mockup mỗi phần cao một màn).
  2. `#features` "Record, run, report" — 6 thẻ (3×2).
  3. `#tools` "Test design & everyday tools" — 5 thẻ + thẻ CTA (3×2).
  4. `#how` How it works — 4 bước.
  5. `#privacy` — 4 điểm dữ liệu.
  6. `#permissions` — 10 quyền, lưới 2 cột × 5 hàng (thay bảng).
  7. `#faq` — FAQ + thẻ CTA cuối.
  Tách Features/Privacy vì đo ở 1366×657 hiện tại: features 1457px, privacy 1530px (≈ 2,3 màn).
  Menu: một mục cho mỗi section 01–06, cùng tên với eyebrow (như portfolio); hero không có mục.
- **Mobile ≤767px:** `.more` + nút "Read more / Xem thêm" cho thẻ 4–6 mỗi nhóm feature và quyền 5–10.
- **Hero stats 4 ô (2×2), không ô lẻ:** 17 action types · CSV data-driven · 5 export formats · Free, no account
  (đều đã có trên trang hiện tại / FAQ).
- **Giữ logic scale popup** (`fitPopup`, `fitHeroHeight` của `landing.js`, `fitPreview` của `feature.js`) — chép
  sang `site.js`/`feature.js` mới, đổi selector. Không tạo cách scale khác.
- **Không commit/push** trừ khi người dùng yêu cầu. Lưu ý: nếu push, `redesign/` sẽ public trên GitHub Pages
  (`/Promo--Pocket-QA/redesign/`) — có thể là điều muốn để xem trên điện thoại, cần hỏi trước.

## Bảng thuật ngữ EN → VI (dùng cho mọi task dịch)
| EN | VI | Ghi chú |
|---|---|---|
| scenario | kịch bản | |
| step | bước | |
| record / replay, playback | ghi lại / phát lại | "Record & replay" ở badge: "Ghi & phát lại" |
| run | lần chạy / chạy | |
| assertion, assert | assertion | giữ nguyên, như portfolio |
| variable | biến | `${var}` giữ nguyên |
| data-driven (CSV) | chạy theo dữ liệu (CSV) | theo portfolio |
| bug report | bug report | theo portfolio |
| export | xuất | "xuất&nbsp;XLSX/HTML/ZIP" |
| screenshot | ảnh chụp màn hình | |
| highlight | đánh dấu (highlight) | lần đầu kèm EN |
| test case | test case | |
| selector | selector | |
| permission | quyền | tên quyền (`tabs`…) giữ nguyên |
| Chrome extension | tiện ích Chrome | theo portfolio |
| UI label trong popup | giữ nguyên EN, in đậm | Start Recording, Add Manual Action… |

## Task List
Chi tiết, acceptance criteria, verification: [`tasks/redesign-todo.md`](redesign-todo.md).

### Phase 1: Nền tảng (rủi ro cao nhất trước)
- [x] T1: Khung trang + header/footer + theme/lang + hero có popup (EN/VI) + `check-layout.js`

### Checkpoint A — người dùng duyệt giao diện trước khi làm tiếp
- [x] Hero vừa 1 màn ở 1366×657 và 375×812; đổi EN/VI không xê dịch; màu/typo giống portfolio

### Phase 2: Trang chủ
- [x] T2: Hai section feature (12 thẻ, EN/VI, Read more trên mobile)
- [x] T3: How it works + Privacy + Permissions (EN/VI)
- [x] T4: FAQ + CTA + scroll spy menu + kiểm tra toàn trang chủ

### Checkpoint B
- [x] Checklist §7 của rule đạt ở 15 cỡ màn × EN/VI cho trang chủ; người dùng duyệt

### Phase 3: Trang feature
- [x] T5: Template `feature.html` + renderer + `features-en.js` (giao diện mới, chuỗi khung trang EN/VI)
- [x] T6: Dịch VI — recording, playback, run-results, variables
- [x] T7: Dịch VI — csv, screenshots, export, highlights
- [x] T8: Dịch VI — sql-test-designer, db-test-session, settings + kiểm tra toàn trang feature

### Checkpoint C — Hoàn tất
- [ ] Mọi acceptance criteria đạt; so với trang thật: không mất tính năng; người dùng duyệt

### Phase 4
- [x] ~~T9: Icon emoji → SVG nét (stroke) giống portfolio~~ — gộp vào T1/T2/T5 (Open Question 1)

## Thứ tự & song song
- T1 → T2 → T3 → T4 tuần tự (cùng `index.html`, `site.css`).
- T5 cần T1 (dùng `site.css`/`site.js`), không cần T2–T4.
- **Song song được:** T6, T7, T8 chỉ sửa các khối khác nhau trong `features-vi.js` — nếu chạy song song thì mỗi
  task ghi một file tạm `features-vi-<nhóm>.js`, gộp ở cuối T8. Mặc định làm tuần tự (một file).
- T6–T8 có thể làm song song với T2–T4 (khác file).

## Verification chung (không có test suite / build)
- Server: tiến trình `python -m http.server 8383` đang chạy ở gốc repo → `http://localhost:8383/redesign/`.
  (`preview_start promo-static` bị trùng cổng 8383; nếu tiến trình kia tắt thì dùng lại `promo-static`.)
- `check-layout.js` chạy qua `javascript_tool`, trả về: section nào tràn (cao hơn `innerHeight − 64`), phần tử
  `labelled`/`rows` có rect khác nhau giữa EN và VI, `scrollWidth > innerWidth`, dòng kết thúc bằng `-`.
- Cỡ màn (rule §5): 375×812 · 375×667 · 768×1024 · 920×800 · 1024×768 · 1024×1366 · 1280×720 · 1366×768 ·
  1440×900 · 1536×864 · 1920×1080 · 1366×657 · 1536×730 · 1280×632 · 1920×945 — EN + VI, light + dark (dark
  chỉ kiểm tra màu ở 1366×768 và 375×812).
- Pane ẩn: reload sau mỗi lần đổi cỡ; đổi ngôn ngữ bằng script có thể trễ một nhịp (rule §7).
- Console sạch (trang + iframe).

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Bản VI dài hơn → section trang chủ tràn ở 1280×632 / 1366×657 | High | Đo bản VI trước; xử lý theo thứ tự rule §2 (rút đoạn có dòng cuối ngắn → bỏ lặp → giảm gap ở breakpoint chật → đổi bố cục); không giảm cỡ chữ |
| Hero: mockup popup cao ~694px không vừa 593px | High | Giữ `fitHeroHeight` (scale tối thiểu 0.6); làm trong T1 để thấy sớm |
| Dịch sai nghĩa kỹ thuật / thổi phồng | High | Dịch từ EN hiện có, không thêm ý; bảng thuật ngữ; nhãn UI giữ EN; người dùng đọc lại VI ở Checkpoint C |
| `evenOut()` trên trang feature DOM lớn (2 ngôn ngữ × bảng dài) chậm khi resize | Med | Đã có `queueEven` (rAF); đo thời gian một lần `evenOut` ở trang `recording`; nếu > 50ms thì bỏ `rows` cấp bảng, chỉ giữ `section` |
| Popup iframe tiếng Anh trong bản VI gây khó hiểu | Low | Dòng gợi ý VI nói rõ popup là UI thật bằng tiếng Anh |
| Đổi key `demoPageTheme` → `theme` | Low | Người đã chọn theme ở trang cũ sẽ mở demo với theme hệ thống một lần; chấp nhận |
| `update-vendor.mjs` / `stamp-feature-js.mjs` không biết `redesign/` → version fallback cũ, không cache-bust | Low | Version live vẫn lấy từ store; khi đưa demo lên chính thức thì mở rộng 2 script (ngoài phạm vi demo) |
| Trang mở bằng `file://` (README) | Low | Chỉ dùng đường dẫn tương đối; không dùng `fetch` cho nội dung (data nạp bằng `<script>`) |

## Open Questions
1. ~~T9 (icon SVG nét như portfolio) — làm không?~~ **Đã trả lời:** có. Làm ngay trong T1/T2/T5 (vẽ icon SVG từ
   đầu thay vì làm emoji rồi đổi), nên T9 không còn là task riêng.
2. Khi demo được duyệt: thay thế file ở gốc hay giữ song song? **Hoãn:** người dùng review sau khi demo hoàn tất
   rồi quyết định. Vì vậy Checkpoint A/B chỉ gửi ảnh tiến độ, không dừng chờ duyệt.
3. Push `redesign/` lên GitHub Pages? **Hoãn:** quyết định sau; không push.
