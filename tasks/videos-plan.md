# Implementation Plan: Đưa video demo lên trang promo

Nguồn: `demo-videos/web/HANDOFF-VIDEOS.md` (bàn giao 2026-11-15, video quay từ extension v1.0.31).
Task chi tiết: [`tasks/videos-todo.md`](videos-todo.md). (`tasks/plan.md` / `tasks/todo.md` còn task chưa tick của việc
cũ nên không ghi đè; theo lệ của repo, plan này có tên riêng.)

## Overview

Nhúng 13 video đã dựng xong (trailer 0:40 + 12 phần, mỗi phần khớp một trang trong `FEATURE_ORDER`), mỗi video hai bản
`en` / `vi`, tự host trên GitHub Pages. Không quay, dựng, nén lại hay đổi tên tệp nào. Kết quả: mỗi
`feature.html?id=<id>` có một section video ngay dưới hero; trang chủ có trailer trong mục `#how`; đổi ngôn ngữ thì video
đổi theo và video đang phát dừng lại; mở trang chưa bấm play thì không tải `.mp4` nào.

## Quyết định (người dùng chốt 2026-11-15)

| Câu hỏi | Chốt |
|---|---|
| Trailer trang chủ | Trong `#how` ("From click to replay in seconds"): video bên trái, 4 bước bên phải từ 1024px; dưới 1024px video trên, bước dưới. Hero giữ nguyên. |
| Video trang tính năng | Section đầu tiên ngay dưới hero, có mục trong pill "On this page". |
| Demo đầy đủ 20:27 (YouTube) | Để sau, khi có URL. Không làm chỗ trống sẵn. |

## Architecture Decisions

- **Hai `<video>` mỗi chỗ, một `lang="en"`, một `lang="vi"`.** Khớp cơ chế sẵn có: `site.css:56` ẩn ngôn ngữ kia bằng
  `display: none !important`, `evenOut()` đo cả hai. Không cần JS đổi `src`. Cái giá: trình duyệt tải cả hai poster
  (~75 KB mỗi cái), không tải video nào (`preload="none"`).
- **Dừng video khi đổi ngôn ngữ: một dòng trong handler `#lang-btn` của `site.js`** (`document.querySelectorAll('video')
  .forEach(v => v.pause())`). `site.js` chạy trên cả hai trang, nên một chỗ phủ cả trailer lẫn 12 trang tính năng.
- **Dữ liệu video nằm trong `features-en.js` / `features-vi.js`**, trường `video` của từng tính năng:
  EN `video: { file, title, length }`, VI `video: { file, title }`. `checkShape()` sẵn có sẽ báo nếu thiếu bản VI.
  `length` chỉ ở EN và thêm vào danh sách `skip` của `checkShape`: đo bằng ffprobe, 13 cặp EN/VI dài bằng nhau đến
  từng mili-giây.
- **Trailer viết thẳng vào `index.html`**: trang chủ là HTML tĩnh song ngữ, không dựng từ dữ liệu.
- **Khung video có kích thước từ đầu**: thuộc tính `width="1280" height="720"` + CSS `aspect-ratio: 16 / 9`; chiều rộng
  giới hạn theo `100svh` (cùng cách `.shot img` ở `site.css:530`) để section vừa một màn hình mà không có viền đen.
  `trim()` của `site.js` không co video, nên phần vừa màn hình là việc của CSS và `checkLayout()` kiểm.
- **Tệp chép vào `videos/en/` và `videos/vi/`**: chỉ `.mp4` `.jpg` `.vtt` (78 tệp, ~93 MB). Không `.srt`, không
  `HANDOFF-VIDEOS.md`, không Git LFS (Pages không phục vụ LFS). `demo-videos/` (5,5 GB, có `_tools`, `youtube`, `_old-*`)
  vào `.gitignore` để không bao giờ bị commit.
- **Thẻ video:** `controls preload="none" playsinline`, `poster`, `<track kind="captions">` **không** `default` (phụ đề
  đã gắn cứng trong hình), không `autoplay`, `aria-label` = tiêu đề video + độ dài, theo ngôn ngữ của thẻ.

## Task List

Chi tiết từng task (mô tả, tiêu chí, kiểm tra, tệp): [`tasks/videos-todo.md`](videos-todo.md).

### Phase 1: Một lát dọc chạy được
- [ ] Task 1: Chép tệp video vào `videos/`, chặn `demo-videos/` khỏi git
- [ ] Task 2: Trang `recording` có section video (dữ liệu + render + CSS + dừng khi đổi ngôn ngữ)

### Checkpoint 1: sau Task 2
- [ ] `feature.html?id=recording` đạt mọi tiêu chí ở 3 cỡ màn chính, EN + VI, sáng + tối
- [ ] Người dùng xem ảnh chụp và duyệt cách trình bày trước khi nhân ra 11 trang

### Phase 2: Phủ hết
- [ ] Task 3: 11 trang tính năng còn lại có video
- [ ] Task 4: Trailer trong `#how` trên trang chủ

### Checkpoint 2: sau Task 3–4
- [ ] `auditFeatures()` sạch cho cả 12 trang; `checkLayout()` sạch trên trang chủ, ở mọi cỡ màn trong README
- [ ] Network: không `.mp4` nào trước khi bấm play, trên cả 13 trang

### Phase 3: Hoàn tất
- [ ] Task 5: README, stamp, kiểm cuối
- [ ] Task 6: Deploy lên GitHub Pages và kiểm trên bản thật (cần người dùng đồng ý push)

### Checkpoint: Xong
- [ ] Đủ 6 điều ở "Xong khi" của handoff (§8), kiểm trên `https://kt-hg.github.io/Promo--Pocket-QA/`

## Dependency graph

```
Task 1 (tệp trong videos/)
  └── Task 2 (lát dọc: recording)
        ├── Task 3 (11 trang còn lại — chỉ dữ liệu)
        └── Task 4 (trailer — index.html, site.css)
              └── Task 5 (README, stamp, kiểm cuối) ← cần cả Task 3
                    └── Task 6 (push + kiểm trên Pages)
```

Task 3 và 4 không đụng chung tệp (3: `features-*.js`; 4: `index.html`, `site.css`) nên làm song song được, nhưng cả hai
nhỏ: làm tuần tự trong một phiên là đủ.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Section video cao hơn một màn hình ở màn thấp (1280×632, 1366×657, 375×667) | Med | Chiều rộng video theo `100svh` trừ header, tiêu đề, pill (`--fpill-zone`); kiểm bằng `checkLayout()` ở mọi cỡ trong README. |
| `#how` trên điện thoại: video + 4 thẻ bước vượt một màn hình | Med | Từ 1024px: hai cột. Dưới đó: nếu tràn, đưa câu mô tả bước vào `.more` ("Read more") như các mục khác của trang chủ. `checkLayout()` ở 375×812 và 375×667. |
| Video bị ẩn vẫn phát và ra tiếng sau khi đổi ngôn ngữ | High | `pause()` mọi `<video>` trong handler `#lang-btn`; kiểm bằng tay: bấm play, đổi ngôn ngữ, nghe. |
| Bật `default` trên `<track>` → hai lớp phụ đề | Med | Không `default`; tiêu chí task kiểm `track.mode === 'disabled'` lúc tải. |
| Poster của cả hai ngôn ngữ đều tải (~150 KB mỗi trang) | Low | Chấp nhận. Nếu cần nhẹ hơn: một `<video>` đổi `poster` theo `lang`. |
| `.vtt` bị phục vụ sai MIME (local `python -m http.server` trên Windows) | Low | Phụ đề không bật mặc định nên không ảnh hưởng người xem; kiểm `content-type: text/vtt` trên Pages ở Task 6. |
| Repo nặng thêm ~93 MB, mỗi lần thay video lại thêm | Low | Không nén lại, không đổi tệp trừ khi người dùng giao video mới; README ghi rõ. |
| Commit nhầm `demo-videos/` (5,5 GB) hoặc `HANDOFF-VIDEOS.md` | High | `.gitignore` ở Task 1; kiểm `git status` + `git ls-files` trước mỗi commit. |
| Cache trình duyệt / CDN giữ `site.js`, `feature.js`, `features-*.js` cũ | Med | `node stamp-assets.mjs` sau mỗi lần sửa `.js`/`.css`. |

## Open Questions

- Đã chốt hết cho phạm vi này. Khi có URL YouTube của bản 20:27 → một task mới: nút "Xem demo đầy đủ" + facade
  `youtube-nocookie.com` (thumbnail, bấm mới tải iframe).
- Lưu ý từ handoff §7, không chặn việc nhúng: giọng đọc là edge-tts (không phải API chính thức), người dùng nên kiểm tra
  điều khoản trước khi dùng thương mại.
