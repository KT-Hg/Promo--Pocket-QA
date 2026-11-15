# Tasks — Đưa video demo lên trang promo

Plan, quyết định, rủi ro: [`tasks/videos-plan.md`](videos-plan.md). Nguồn: `demo-videos/web/HANDOFF-VIDEOS.md`
(bảng tên tệp §3, cách nhúng §5, "Xong khi" §8).

## Trước Task 1
- [x] Chốt vị trí (2026-11-15): trailer trong `#how` · video tính năng = section ngay dưới hero · YouTube 20:27 để sau.
- [x] Nhánh làm việc: `git switch -c videos master`.

## Verification chung (không có test suite / build)
- Preview: `.claude/launch.json` → `promo-static` (http://localhost:8383).
- Viewports chính: **1366×657**, **1280×632**, **375×812**; EN + VI; sáng + tối. Kiểm cuối: mọi cỡ trong README
  "Layout rules".
- Trong trang (xem đầu `check-layout.js`): `await checkLayout()` → mọi mảng rỗng; trang tính năng: `checkShape()` → `[]`;
  `hiddenByFit()` không thêm mục mới so với trước khi có video.
- Không tải video trước khi bấm play:
  `performance.getEntriesByType('resource').filter(e => /\.mp4/.test(e.name))` → `[]`.
- Thẻ video đúng:
  ```js
  [...document.querySelectorAll('video')].map(v => ({ lang: v.lang, preload: v.preload, autoplay: v.autoplay,
    def: v.querySelector('track[kind="captions"]')?.default, label: v.getAttribute('aria-label'), poster: v.poster }))
  ```
  → mỗi chỗ đúng 2 thẻ (`en`, `vi`), `preload: 'none'`, `autoplay: false`, `def: false`, `label` có tiêu đề + độ dài.
- Sửa `.js`/`.css` của trang → `node stamp-assets.mjs`.
- Trước mỗi commit: `git status` không có `demo-videos/`; `git ls-files | grep -i handoff` rỗng.

---

## Phase 1 — Một lát dọc chạy được

## Task 1: Chép tệp video vào `videos/`, chặn `demo-videos/` khỏi git

**Description:** Chép `.mp4` `.jpg` `.vtt` từ `demo-videos/web/en/` và `demo-videos/web/vi/` sang `videos/en/` và
`videos/vi/`, giữ nguyên tên và nội dung từng byte. Không chép `.srt` và `HANDOFF-VIDEOS.md`. Thêm `demo-videos/` vào
`.gitignore` (thư mục 5,5 GB có `_tools`, `youtube`, `_old-*`, `.mp3`).

**Acceptance criteria:**
- [x] `videos/en/` và `videos/vi/` mỗi thư mục có đúng 39 tệp (13 × `.mp4` `.jpg` `.vtt`), không `.srt`, không `.md`.
- [x] Mỗi tệp giống hệt bản nguồn (cùng MD5).
- [x] `git status` không còn liệt kê `demo-videos/`.

**Verification:**
- [x] `ls videos/en | wc -l` và `ls videos/vi | wc -l` → 39; `ls videos/*/*.srt videos/*/*.md` → không có.
- [x] `(cd demo-videos/web && md5sum {en,vi}/*.{mp4,jpg,vtt}) | (cd videos && md5sum -c --quiet)` → không dòng lỗi
  nào.
- [x] `du -sh videos` ≈ 93 MB; không tệp nào > 50 MB (`find videos -size +50M` rỗng).

**Dependencies:** None

**Files likely touched:**
- `.gitignore`
- `videos/en/*`, `videos/vi/*` (tệp mới)

**Estimated scope:** XS

## Task 2: Trang `recording` có section video

**Description:** Lát dọc trên một trang. Thêm trường `video` cho `recording` vào hai tệp dữ liệu, thêm khung section
`#video` vào `feature.html` ngay sau hero, `feature.js` điền hai `<video>` (EN, VI) và một mục "Video" ở đầu pill.
`site.css` định cỡ khung 16:9 vừa một màn hình. `site.js` dừng mọi video khi bấm đổi ngôn ngữ. `check-layout.js`
thêm `length` vào `skip` của `checkShape`.

Dữ liệu:
- EN: `video: { file: 'pocket-qa-01-record-a-test-in-one-click', title: 'Record a test in one click', length: '2:23' }`
- VI: `video: { file: 'pocket-qa-01-ghi-kich-ban-chi-voi-mot-cu-nhap', title: 'Ghi kịch bản chỉ với một cú nhấp' }`

Mỗi thẻ: `<video controls preload="none" playsinline width="1280" height="720" lang="en|vi" poster="videos/<lang>/<file>.jpg"
src="videos/<lang>/<file>.mp4" aria-label="<title> (<length>)">` + `<track kind="captions" srclang="<lang>" label="English|Tiếng
Việt" src="videos/<lang>/<file>.vtt">`, không `default`. Tiêu đề section: "Watch the demo · 2:23" / "Xem video demo · 2:23" (lấy từ
`length`). Section cần `.container.collapsible` bên trong, vì `feature.js` gắn nút "Show the rest" vào mọi section có
trong pill.

**Acceptance criteria:**
- [x] `feature.html?id=recording`: section video là section đầu tiên sau hero, hiện đúng video theo ngôn ngữ đang chọn;
  pill có mục "Video" / "Video" đầu danh sách; nền xen kẽ `.alt` vẫn đúng.
- [x] Bấm play bản EN rồi đổi sang VI: bản EN dừng (`paused === true`), bản VI hiện poster, chưa phát; không tiếng nào
  còn chạy.
- [x] Section vừa một màn hình, không viền đen quanh video, không xê dịch khi đổi ngôn ngữ, ở 1366×657, 1280×632,
  375×812.

**Verification:**
- [x] `checkShape()` → `[]`; `await checkLayout()` → mọi mảng rỗng ở 3 cỡ màn chính, EN + VI.
- [x] Snippet "Thẻ video đúng" và "Không tải video" ở trên đều đạt; sau khi bấm play, `.mp4` mới tải và video bắt đầu
  phát. (`206` để Task 6: `python -m http.server` không hỗ trợ Range, trả `200`.)
- [x] Bấm play bằng chuột trong Browser pane, đổi ngôn ngữ, rồi
  `[...document.querySelectorAll('video')].every(v => v.paused)` → `true`.
- [x] Console không lỗi. `node stamp-assets.mjs` đã chạy. Ảnh chụp desktop + phone, EN + VI, gửi người dùng.

**Dependencies:** Task 1

**Files likely touched:**
- `features-en.js`, `features-vi.js` (trường `video` của `recording`)
- `feature.html` (khung section `#video`), `feature.js` (điền video + mục pill)
- `site.css` (`.vbox`), `site.js` (1 dòng `pause()` trong handler `#lang-btn`)
- `check-layout.js` (thêm `'length'` vào `skip`)

**Estimated scope:** Medium (7 tệp, đa số chỉ vài dòng)

### Checkpoint 1: sau Task 2
- [x] Mọi tiêu chí Task 2 đạt ở 3 cỡ màn chính, EN + VI, sáng + tối.
- [ ] Người dùng xem ảnh chụp và duyệt cách trình bày (tiêu đề, cỡ video, vị trí) trước khi nhân ra 11 trang.
- [x] Commit trên nhánh `videos`.

---

## Phase 2 — Phủ hết

## Task 3: 11 trang tính năng còn lại có video

**Description:** Thêm trường `video` cho 11 tính năng còn lại theo bảng handoff §3 (tên tệp) và tiêu đề (EN/VI). Chỉ
dữ liệu; mã render đã có từ Task 2.

| id | `length` |
|---|---|
| `playback` | 1:53 |
| `run-results` | 2:02 |
| `variables` | 2:28 |
| `csv` | 1:52 |
| `screenshots` | 1:33 |
| `export` | 1:31 |
| `highlights` | 1:03 |
| `sql-test-designer` | 1:22 |
| `db-test-session` | 1:21 |
| `api-tests` | 1:47 |
| `settings` | 0:51 |

(Độ dài đo bằng ffprobe 2026-11-15; EN và VI dài bằng nhau.)

**Acceptance criteria:**
- [ ] Cả 12 trang có section video; tên tệp đúng bảng handoff, đúng thứ tự `FEATURE_ORDER`.
- [ ] Mọi `.mp4` `.jpg` `.vtt` mà 12 trang trỏ tới đều tồn tại (không 404).
- [ ] Không trang nào thêm lỗi layout so với trước khi có video.

**Verification:**
- [ ] `checkShape()` → `[]`.
- [ ] Từ một trang bất kỳ, kiểm 72 URL (12 × 2 ngôn ngữ × 3 đuôi) bằng `HEAD`, không tải thân video:
  ```js
  const urls = FEATURE_ORDER.flatMap(id => ['en/' + FEATURES_EN[id].video.file, 'vi/' + FEATURES_VI[id].video.file])
    .flatMap(f => ['.mp4', '.jpg', '.vtt'].map(x => 'videos/' + f + x));
  (await Promise.all(urls.map(u => fetch(u, { method: 'HEAD' }).then(r => r.ok ? null : u)))).filter(Boolean)
  ```
  → `[]`.
- [ ] `await auditFeatures()` ở 1366×657, 1280×632, 375×812: mỗi trang chỉ có mảng rỗng (trừ `hidden` vốn có).

**Dependencies:** Task 2

**Files likely touched:**
- `features-en.js`, `features-vi.js`

**Estimated scope:** Small

## Task 4: Trailer trong `#how` trên trang chủ

**Description:** Trong `index.html` mục `#how`, thêm hai `<video>` trailer (`pocket-qa-trailer-en`, `pocket-qa-trailer-vi`;
"Pocket QA – No-code web testing (trailer)" / "Pocket QA – Kiểm thử web không cần code (trailer)", 0:40) cạnh danh sách
4 bước. Từ 1024px: video bên trái, bước bên phải (lưới 2×2). Dưới 1024px: video trên, bước dưới. Thẻ video theo cùng
mẫu Task 2, dùng lại CSS `.vbox` nếu được (`--fpill-zone` chỉ có trên `.doc`, trang chủ phải tự đặt). Việc dừng khi đổi ngôn ngữ đã có từ Task 2.

**Acceptance criteria:**
- [ ] `#how` hiện trailer đúng ngôn ngữ; đổi ngôn ngữ thì trailer đang phát dừng.
- [ ] `#how` vẫn vừa một màn hình ở mọi cỡ trong README; trên điện thoại nếu tràn thì câu mô tả bước vào `.more`
  ("Read more") như các mục khác.
- [ ] Mở trang chủ chưa bấm play: không `.mp4` nào được tải; popup trong hero vẫn như cũ.

**Verification:**
- [ ] `await checkLayout()` → mọi mảng rỗng ở 375×812, 375×667, 768×1024, 1024×768, 1280×632, 1366×657, 1920×1080;
  EN + VI.
- [ ] Snippet "Thẻ video đúng" và "Không tải video" đạt; thử play + đổi ngôn ngữ bằng chuột.
- [ ] Console không lỗi. `node stamp-assets.mjs` đã chạy. Ảnh chụp desktop + phone gửi người dùng.

**Dependencies:** Task 2 (CSS và `pause()`); không phụ thuộc Task 3

**Files likely touched:**
- `index.html`
- `site.css`

**Estimated scope:** Small

### Checkpoint 2: sau Task 3–4
- [ ] `auditFeatures()` sạch cho cả 12 trang; `checkLayout()` sạch trên trang chủ, ở mọi cỡ màn trong README.
- [ ] Không `.mp4` nào tải trước khi bấm play, trên cả 13 trang.
- [ ] Commit trên nhánh `videos`.

---

## Phase 3 — Hoàn tất

## Task 5: README, stamp, kiểm cuối

**Description:** Ghi video vào README: dòng `videos/` trong bảng "Files"; một mục ngắn "Demo videos" (nguồn là repo
extension, tên tệp phải giữ nguyên vì khớp bản YouTube, thay video = chép đè cùng tên + sửa `length` nếu đổi, không
nén lại, không LFS, trường `video` trong `features-*.js`). Chạy lại toàn bộ kiểm tra ở mọi cỡ màn, sáng + tối.

**Acceptance criteria:**
- [ ] README mô tả `videos/` và cách thay một video.
- [ ] Mọi điều ở "Xong khi" của handoff §8 đạt trên localhost.
- [ ] `git ls-files` không có `HANDOFF-VIDEOS.md`, không có gì dưới `demo-videos/`.

**Verification:**
- [ ] `node stamp-assets.mjs` → "already up to date" cho cả hai trang.
- [ ] `auditFeatures()` + `checkLayout()` trang chủ ở mọi cỡ trong README (gồm 1366×657, 1536×730, 1280×632,
  1920×945), EN + VI.
- [ ] Bàn phím: Tab tới được nút play của video; trình đọc màn hình đọc `aria-label` đúng ngôn ngữ.

**Dependencies:** Task 3, Task 4

**Files likely touched:**
- `README.md`

**Estimated scope:** XS

## Task 6: Deploy lên GitHub Pages và kiểm trên bản thật

**Description:** Hỏi người dùng trước khi merge/push. Sau khi Pages build xong, kiểm trên
`https://kt-hg.github.io/Promo--Pocket-QA/`.

**Acceptance criteria:**
- [ ] Trang chủ và 12 trang tính năng phát được video ở cả hai ngôn ngữ trên bản thật.
- [ ] `.mp4` trả `206` khi tua (Range), phát ngay khi mới tải một phần (faststart); `.vtt` có
  `content-type: text/vtt`.
- [ ] Không `.mp4` nào tải trước khi bấm play.

**Verification:**
- [ ] Browser pane: Network trên trang chủ và 2–3 trang tính năng, trước và sau khi bấm play.
- [ ] Hard-reload (Ctrl+Shift+R) để chắc là đang xem bản mới (`?v=` mới trong HTML).

**Dependencies:** Task 5, người dùng đồng ý push

**Files likely touched:** none (deploy)

**Estimated scope:** XS

### Checkpoint: Xong
- [ ] Đủ 6 điều ở "Xong khi" của handoff §8, kiểm trên bản thật.

---

## Để sau
- Nút "Xem demo đầy đủ" (20:27, YouTube) + facade `youtube-nocookie.com`: thêm khi người dùng đưa URL.
