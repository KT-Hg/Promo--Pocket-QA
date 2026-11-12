/**
 * features-vi.js — Vietnamese text of the feature pages. Same shape as FEATURES_EN in
 * features-en.js, translatable strings only: tab, image src and code samples come from the English
 * object. Anything missing here falls back to English (feature.js). UI labels stay in English, as the popup
 * shows them (Start Recording, Add Manual Action, Passed / Failed…).
 */
var FEATURES_VI = {
  recording: {
    title: 'Ghi lại bằng một click',
    lead: 'Bật Pocket QA trên một tab, bấm Start Recording rồi làm thao tác một lần. Mỗi cú click và mỗi ô bạn nhập liệu đều thành một bước sửa được — không phải tự viết selector.',
    facts: [['17', 'loại hành động'], ['8', 'selector lưu cho mỗi phần tử'], ['50', 'bước hoàn tác']],
    tabLabel: 'tab Record & Play',
    points: [
      'Ghi lại click và dữ liệu nhập — thao tác gõ được gộp thành một bước cho mỗi ô, và chữ gõ ngay trước một cú click được ghi trước cú click đó.',
      'Chỉ tab bắt đầu ghi mới được ghi lại, và các cú click do chính script của trang tự phát ra bị bỏ qua: kịch bản chỉ chứa những gì <em>bạn</em> đã làm.',
      'Mọi thứ khác là một trong 17 loại hành động, thêm bằng <b>Add Manual Action</b> — hover, dropdown, kéo thả, chờ, Run JS, điều kiện, assert, switch, Read DOM, chụp màn hình và tải file lên.',
      'Mọi bước đều sửa được: chỉnh selector, đổi giá trị, đặt nhãn, tắt bước, hoặc kéo sang vị trí mới.',
      'Hoàn tác/làm lại tối đa 50 bước trong lúc sửa; lịch sử được xoá khi bạn bắt đầu kịch bản mới hoặc mở một kịch bản khác.',
      '<b>Pick element</b> chọn phần tử đích ngay trên trang thay vì phải viết selector.'
    ],
    steps: [
      ['Bật tab', 'Mở popup trên trang muốn tự động hoá và bấm <b>Turn on</b> ở thanh trạng thái — hoặc bấm luôn Start Recording, nó sẽ hỏi.'],
      ['Ghi lại', 'Bấm <b>▶ Start Recording</b> (<span class="kbd">Alt+R</span>) và làm thao tác một lần — click và nhập liệu được ghi ngay khi bạn làm.'],
      ['Dừng &amp; lưu', 'Bấm <b>■ Stop</b> (<span class="kbd">Alt+S</span>), đặt tên kịch bản và xếp vào một thư mục.'],
      ['Tinh chỉnh', 'Thêm những gì bộ ghi không thấy được — hover, thời gian chờ, Assert — bằng Add Manual Action, rồi kéo vào đúng chỗ.']
    ],
    sections: [
      {
        title: 'Thao tác trên trang',
        nav: 'Thao tác trang',
        lead: 'Tổng cộng mười bảy khối. Click và Input được ghi tự động; số còn lại lấy từ Add Manual Action.',
        table: {
          head: ['Hành động', 'Chức năng'],
          rows: [
            ['Click', 'Một cú click chuột lên phần tử đích.'],
            ['Input', 'Đặt giá trị cho ô nhập và phát <code>input</code>, <code>change</code>, <code>blur</code> như khi gõ.'],
            ['Hover', 'Phát các sự kiện rê chuột — mở menu và tooltip.'],
            ['Dropdown', 'Một cú click thật cho dropdown bỏ qua click giả lập, kèm tuỳ chọn <b>Choose item #</b>.'],
            ['Drag &amp; Drop', 'Kéo thả HTML5 từ selector nguồn sang đích.']
          ]
        }
      },
      {
        title: 'Điều khiển và logic',
        nav: 'Điều khiển &amp; logic',
        lead: 'Những bước biến một bản ghi thành bài test: chờ, script, kiểm tra và rẽ nhánh.',
        table: {
          head: ['Hành động', 'Chức năng'],
          rows: [
            ['Navigate', 'Mở một URL — dùng được <code>${variables}</code>.'],
            ['Wait', 'Tạm dừng một số mili giây.'],
            ['Run JS', 'Chạy script của bạn trên trang, kể cả khi Content Security Policy chặn.'],
            ['Condition (If)', 'Một trong 12 phép kiểm tra; khi sai, N bước tiếp theo bị bỏ qua.'],
            ['Assert (Expect)', 'Cũng 12 phép đó nhưng bắt buộc đúng — sai thì được ghi nhận, lần chạy vẫn tiếp.'],
            ['Switch', 'Theo giá trị biến: kịch bản khác, một bước nhảy, hoặc khối bước của một case.']
          ]
        }
      },
      {
        title: 'Thao tác dữ liệu',
        nav: 'Thao tác dữ liệu',
        lead: 'Đọc trang, giữ ảnh của trang, và đưa file vào trang.',
        table: {
          head: ['Hành động', 'Chức năng'],
          rows: [
            ['Read DOM → Variable', 'Lưu chữ, giá trị ô nhập hoặc thuộc tính vào biến cho các bước sau.'],
            ['Screenshot', 'Vùng đang hiển thị, toàn trang hoặc một phần tử.'],
            ['Screenshot → Variable', 'Ảnh chụp giữ trong biến, để ảnh của từng dòng CSV nằm trong kết quả.'],
            ['Upload File', 'File trên máy vào <code>&lt;input type="file"&gt;</code> hoặc vùng kéo thả.']
          ]
        }
      },
      {
        title: 'Danh sách bước',
        nav: 'Danh sách bước',
        lead: 'Mọi bước vẫn sửa được sau khi ghi: sửa selector, đặt nhãn, tắt đi, kéo sang chỗ khác.',
        images: [{
          alt: 'Danh sách bước của kịch bản Checkout: navigate; nhập Email và Password, mỗi bước đọc theo tên với selector ở dòng dưới, Password có dấu 🔒; Apply; một Condition bảo vệ Close; một Switch theo ${role} với case admin hai bước và case user một bước; bước Upload File có màu riêng; và Log out bị tắt — mỗi bước có Disable, Copy, Edit và Delete.',
          caption: 'Bước theo tên, mật khẩu 🔒, một Condition, một khối Switch, một bước bị tắt.'
        }],
        points: [
          'Số của một bước là vị trí của nó; các case của Switch thụt vào dưới hàng tiêu đề, mỗi case một màu.',
          'Các bước một Condition bảo vệ thụt vào dưới nó với viền vàng cam, và thu gọn bằng ▾.',
          'Tắt một Switch hay Condition sẽ tắt các bước dưới nó; từng bước vẫn bật lại riêng được.',
          'Undo, redo tới 50 lần sửa; ô nhập sai báo lỗi ngay dưới hàng của nó.'
        ]
      },
      {
        title: 'Chèn ở đâu cũng được, chép cả khối',
        nav: 'Chèn &amp; chép',
        lead: 'Nút <b>+</b> dưới bất kỳ bước nào đặt hành động kế tiếp ngay tại đó — cả bên trong một case của Switch hay một Condition.',
        images: [{
          alt: 'Danh sách bước của kịch bản Checkout có một Switch theo ${role}: dưới All orders, trong case “admin”, một hàng nét đứt ghi assert — New action goes in at #6 · Switch 4 › case “admin” — kèm ↑, ↓ và ✕; dưới danh sách, thẻ Add Manual Action ghi Insert at #6 · Switch 4 › case “admin”.',
          caption: 'Nút + dưới All orders: bước mới vào #6, bên trong case “admin”.'
        }],
        points: [
          'Rê chuột lên một hàng và bấm <b>+</b> ở khe dưới nó: một hàng nét đứt đứng đúng chỗ hành động sẽ vào, ↑ ↓ dời nó, ✕ bỏ nó.',
          'Add Manual Action và Paste đều vào đúng chỗ đó, và thẻ Add ghi rõ vị trí.',
          '<b>Copy</b> trên một Switch hay Condition lấy cả khối của nó; <b>Paste</b> đặt lại cả khối trong một bước, kể cả vào kịch bản trống.',
          'Case của Switch chạy một kịch bản khác có hàng riêng: <i>↗ runs scenario “…”</i>.'
        ]
      },
      {
        title: 'Trong lúc ghi',
        nav: 'Trong lúc ghi',
        lead: 'Trang web cho biết nó đang được ghi, và mỗi bước được đặt tên theo thứ bạn đã click hay nhập vào.',
        images: [{
          alt: 'Trang Checkout mẫu trong lúc ghi: góc dưới bên phải có thanh ● Recording — Pocket QA với nút đỏ ■ Stop.',
          caption: 'Đang ghi: trang báo rõ, và nút ■ Stop của chính nó dừng ghi.'
        }],
        points: [
          'Trong popup, Start Recording thành <b>● Recording…</b> và Stop chuyển đỏ; trên trang, thanh ở góc dưới phải có nút <b>■ Stop</b> riêng.',
          'Bước được đặt tên theo phần tử — label, placeholder, aria-label hoặc chữ trên nó — nên danh sách đọc là <i>Email</i>, <i>Password</i>, <i>Log in</i>, selector ở dòng dưới.',
          'Nhập vào ô mật khẩu thì bước có dấu <b>🔒</b>: mật khẩu được giữ nguyên như đã gõ, nên hãy đưa vào biến để nó không lọt vào file xuất.',
          'Click lên chính thanh đó không bao giờ bị ghi lại.'
        ]
      },
      {
        title: 'Selector vẫn chạy khi giao diện đổi',
        nav: 'Selector',
        lead: 'Tối đa tám selector cho mỗi phần tử, thử từ chính xác nhất — class đổi tên hiếm khi làm hỏng lần chạy, và phần tử chưa có thì được chờ.',
        images: [{
          alt: 'Add Manual Action với bước Click: ô selector ghi input, và bên dưới: 2 matches — playback uses the first (solid outline: “Email”). Pick again or narrow the selector.',
          caption: '👁 thử selector trên trang trước khi bạn lưu.'
        }],
        points: [
          'Thử theo thứ tự: loại bạn chọn, Full XPath, ID, XPath, CSS (cả xuyên shadow root), data-testid, data-id, name, text — bỏ id không ổn định như <span class="nw"><code>:r0:</code></span> của React.',
          '<b>Pick element</b>: rê chuột trên trang rồi click, kể cả trong iframe; <b>👁</b> cạnh ô cho thấy trên trang selector tìm được gì.',
          '<b>Child Condition</b> tìm một dòng trong danh sách theo giá trị, chữ, id, class hoặc loại; <code>${variables}</code> dùng được trong mọi selector.'
        ]
      },
      {
        title: 'Lưu, thư mục và kịch bản',
        nav: 'Kịch bản',
        lead: 'Kịch bản nằm trong thư mục và tìm được ngay khi gõ.',
        images: [{
          alt: 'Thẻ Manage Scenarios: ô tìm kiếm, bộ lọc thư mục, menu sắp xếp, bốn kịch bản đã lưu và các nút Play, Rename, Duplicate, Move, Delete.',
          caption: 'Manage Scenarios: tìm, lọc, sắp xếp, chạy.'
        }],
        points: [
          '<b>New</b> kèm tên tạo kịch bản ngay: mọi thứ sau đó tự lưu vào nó.',
          'Tìm ngay khi gõ, lọc theo thư mục, sắp xếp bốn kiểu — kiểu sắp xếp được nhớ.',
          'Đổi tên, nhân bản, di chuyển hoặc xoá; đổi tên thư mục không làm mất liên kết kịch bản.',
          'Xoá thư mục sẽ chuyển kịch bản của nó về No Folder, không bao giờ xoá chúng.'
        ]
      }
    ],
    notes: [
      'Bộ ghi chỉ ghi click và nhập liệu. Hover, chờ và kéo thả được thêm bằng tay, nên bản ghi không bao giờ đầy những chuyển động chuột thừa.',
      'Pocket QA tắt trên mỗi tab cho tới khi bạn bật (hoặc bật <b>Allow on all tabs</b> trong Settings) — thanh trạng thái hiện <b>Active</b> hoặc <b>Off on this tab</b>.',
      'Phím tắt Start/Stop chỉ hoạt động trên tab đã bật Pocket QA và chỉ với lần bấm phím thật: trang web không thể tự bắt đầu ghi bằng cách giả lập phím.'
    ]
  },

  playback: {
    title: 'Phát lại không đứt quãng',
    lead: 'Phát lại một kịch bản một lần, chạy lặp, nối nhiều kịch bản hoặc hẹn lịch — và để nó chạy tiếp qua iframe, tải lại trang, dropdown gốc và hộp chọn file, những chỗ khiến hầu hết công cụ ghi phải dừng.',
    facts: [['5', 'cách chạy'], ['Hằng ngày', 'hẹn lịch'], ['Retry · Skip · Stop', 'khi một bước lỗi']],
    tabLabel: 'tab Record & Play',
    points: [
      'Chạy một lần, lặp N lần với thời gian nghỉ giữa các vòng, hoặc tạo một <b>Sequence</b> trong đó mỗi kịch bản có thời gian nghỉ riêng.',
      'Hẹn giờ cho kịch bản — một lần hoặc <b>Repeat daily</b> — và nó tự chạy ở chế độ nền.',
      'Các bước chạy được bên trong iframe, và lần chạy tiếp tục từ chỗ dừng khi trang tải lại giữa chừng.',
      'Bước bị lỗi sẽ hỏi <b>Retry / Skip / Stop</b>, nên một phần tử chập chờn không làm hỏng cả lần chạy.',
      'Dropdown gốc bỏ qua click giả lập sẽ nhận một cú click thật, tin cậy.',
      'Run panel trên trang và Now Playing trong popup cho thấy bước đang chạy, kèm nút ■ Stop; một thông báo cho biết lần chạy kết thúc ra sao.'
    ],
    steps: [
      ['Chọn kịch bản', 'Chọn trong Manage Scenarios — hoặc chọn nhiều, theo thứ tự, trong Sequence Scenarios.'],
      ['Chọn cách chạy', 'Đặt số vòng lặp và thời gian nghỉ, hoặc một giờ chạy ở Scheduled Playback, cuối tab Record & Play.'],
      ['Bấm ▶ Play', 'Bảng Now Playing theo dõi từng bước; <b>Stop</b> kết thúc lần chạy bất cứ lúc nào.'],
      ['Xem kết quả', 'Kết quả hiện trên thẻ Last run, huy hiệu trên thanh công cụ và trong thông báo.']
    ],
    sections: [
      {
        title: 'Năm cách chạy một kịch bản',
        nav: 'Chế độ chạy',
        table: {
          head: ['Chế độ', 'Ở đâu', 'Chức năng'],
          rows: [
            ['Chạy một lần', 'Record &amp; Play', 'Phát kịch bản đã chọn một lần, từ đầu đến cuối.'],
            ['Lặp', 'Record &amp; Play', 'Lặp lại N lần với thời gian nghỉ giữa các vòng; biến được tạo mới ở mỗi vòng.'],
            ['Sequence', 'Record &amp; Play → Sequence Scenarios', 'Chạy nhiều kịch bản theo thứ tự, mỗi kịch bản có thời gian nghỉ riêng — một lần chạy, một kết quả.'],
            ['Hẹn lịch', 'Record &amp; Play → Scheduled Playback', 'Bắt đầu kịch bản vào giờ đã đặt, một lần hoặc mỗi ngày, từ một alarm chạy nền.'],
            ['Chạy theo&nbsp;CSV', 'Record &amp; Play → <span class="nw">CSV Data-Driven Run</span>', 'Chạy một lần cho mỗi dòng của file CSV — xem <a href="feature.html?id=csv">Chạy theo dữ liệu CSV</a>.']
          ]
        }
      },
      {
        title: 'Theo dõi lần chạy',
        nav: 'Theo dõi',
        lead: 'Lần chạy hiện ngay nơi bạn đang nhìn: trên trang nó phát, và trong popup.',
        images: [
          {
            alt: 'Trang Checkout mẫu với lần chạy dừng ở bước thứ tư: hộp hỏi ghi Action 4 of 5 failed — click “Place order” — Element not found on the page within 5 s (looked for it by CSS), kèm Retry, Skip và Stop; góc dưới phải là run panel màu hổ phách ghi Checkout with coupon · step 4 failed, có nút ■ Stop.',
            caption: 'Dừng ở bước lỗi: câu hỏi, và run panel màu hổ phách.'
          },
          {
            alt: 'Phần trên của popup trong cùng lần chạy: thanh trạng thái, rồi Now Playing — Checkout with coupon, step 4 failed, nút ■ Stop và thanh tiến độ màu hổ phách — phía trên các tab.',
            caption: 'Cùng lần chạy trong popup: Now Playing, có ■ Stop riêng.'
          }
        ],
        points: [
          'Trên trang, góc dưới phải: <b>▶</b> tên kịch bản và bước đang chạy, một thanh cho cả lần chạy, và <b>■ Stop</b>.',
          'Dừng ở bước lỗi thì chuyển màu hổ phách (<b>⏸</b>) trong lúc trang hỏi <b>Retry / Skip / Stop</b>; <b>⏳</b> khi đang chờ kịch bản kế tiếp.',
          'Trong popup, <b>Now Playing</b> hiện cùng lần chạy với nút ■ Stop riêng; thẻ Last run ẩn cho tới khi chạy xong.',
          'Panel tự tránh đi khi chụp ảnh, nên ảnh chụp không bao giờ dính nó.'
        ]
      },
      {
        title: 'Chạy nối tiếp',
        nav: 'Chạy nối tiếp',
        lead: 'Nhiều kịch bản liên tiếp, mỗi kịch bản có thời gian chờ riêng — một lần chạy, một kết quả.',
        images: [{
          alt: 'Thẻ Sequence Scenarios: ô chọn kịch bản với + Add, menu thời gian chờ, ba kịch bản trong hàng đợi có Disable, Copy, Edit và Delete, ô tên sequence, Start Sequence, Stop và Save as Scenario.',
          caption: 'Ba kịch bản trong hàng đợi, mỗi cái một thời gian chờ.'
        }],
        points: [
          'Thêm một kịch bản bao nhiêu lần cũng được, mỗi lần một thời gian chờ riêng.',
          'Từng mục: tắt, nhân bản, đổi thời gian chờ hoặc xoá — hay kéo để đổi thứ tự.',
          '<b>Save as Scenario</b> gộp hàng đợi thành một kịch bản; thời gian chờ thành bước Wait.',
          'Badge hiện SEQ khi đang chạy; Stop dừng sau khi xong kịch bản đang chạy.'
        ]
      },
      {
        title: 'Hẹn lịch',
        nav: 'Hẹn lịch',
        lead: 'Chạy kịch bản vào giờ đã đặt, một lần hoặc mỗi ngày — tự bắt đầu dù popup đóng.',
        images: [{
          alt: 'Thẻ Scheduled Playback: ô chọn kịch bản, ô giờ và phút với AM/PM, nhãn, URL trang, ô Repeat daily, nút + Add, và hai lịch đã lưu — 8:00 AM hằng ngày và 1:30 PM một lần — có Disable, Copy, Edit và Delete.',
          caption: 'Hai lịch: một lịch hằng ngày, một lịch một lần.'
        }],
        points: [
          'Ở cuối tab Record &amp; Play, dưới nhãn <i>Run several · on a schedule · from a CSV</i>: chọn kịch bản và giờ, tick Repeat daily để chạy mỗi ngày.',
          'Sửa, tắt hoặc sao chép một lịch ngay trên hàng của nó.',
          'Alarm chạy nền kiểm tra mỗi phút; một lịch không bao giờ chạy hai lần trong một phút.',
          'Chrome phải đang mở vào giờ đó — trình duyệt đã tắt thì không chạy gì.'
        ]
      },
      {
        title: 'Làm cho trang web thật',
        nav: 'Trang thật',
        lead: 'Những bước thường buộc công cụ ghi phải quay về code viết tay thì ở đây được hỗ trợ đầy đủ.',
        points: [
          '<b>Dropdown → Choose item #</b> chọn mục theo vị trí: đếm từ 1 như danh sách hiển thị, <code>-1</code> cho mục cuối, <code>random</code> cho một mục bất kỳ đang bật, hoặc một <code>${variable}</code>.',
          'Danh sách ảo hoá (<span class="nw">react-window</span>, MUI) được cuộn cho tới khi mục cần chọn thật sự được render.',
          '<b>Upload File</b> đưa file trên máy vào <code>&lt;input type="file"&gt;</code> hoặc vùng kéo thả, tên file dùng được <code>${variable}</code> — file không còn trên đĩa thì bước lỗi và nêu tên file.',
          '<b>Run JS</b> chạy script của bạn trên trang qua DevTools protocol, nên Content Security Policy của trang không chặn được.',
          '<b>Drag &amp; Drop</b> phát sự kiện kéo HTML5 thật từ nguồn sang đích.',
          'Navigate và Wait chạy từ background worker, nên việc chuyển trang không bao giờ cắt ngang lần chạy.'
        ]
      },
      {
        title: 'Click through — hoặc bắt chỗ người dùng không bấm được',
        nav: 'Click through',
        lead: 'Khi phát lại, sự kiện được gửi thẳng tới phần tử, nên mặc định một bước tác động lên phần tử bất kể nó trông thế nào. Tắt <b>Click through</b> thì bước đó sẽ lỗi đúng như khi người dùng thật bị kẹt.',
        points: [
          'Tắt cho một hành động (ô đánh dấu dưới Label) hoặc cho cả kịch bản (⊘ trên thanh công cụ của kịch bản).',
          'Khi tắt, Click, Hover, Input, Dropdown, Drag &amp; Drop và Upload File sẽ lỗi nếu phần tử không có kích thước, bị vô hiệu hoá hoặc chỉ đọc, hoặc bị thứ khác che.',
          'Lỗi đi kèm hộp hỏi Retry / Skip / Stop như thường lệ — nên bài test bắt được cái nút không ai bấm được.',
          'Một bước chỉ click xuyên qua khi cả bước và kịch bản của nó cho phép; Switch sang kịch bản khác thì theo thiết lập của kịch bản đó.'
        ]
      }
    ],
    notes: [
      'Upload File hoạt động trong trang và các frame cùng origin; trong frame khác origin, bước này lỗi và cho biết lý do.',
      'Chụp cửa sổ không thể là một bước phát lại — bạn phải tự chọn cửa sổ. Các hành động Screenshot đã có chụp vùng hiển thị, cả trang và phần tử.'
    ]
  },

  'run-results': {
    title: 'Assertion, kết quả & bug report',
    lead: 'Mỗi lần chạy kết thúc bằng một kết luận — Passed, Failed, Test broken hoặc Stopped. Khi không đạt, bug report kèm các bước tái hiện và ảnh chụp lúc lỗi chỉ cách một cú click.',
    facts: [['12', 'loại kiểm tra'], ['4', 'kết luận'], ['5 s', 'Assert chờ trang tải']],
    tabLabel: 'tab Record & Play',
    points: [
      '<b>Assert (Expect)</b> kiểm tra những gì trang phải hiển thị — một phần tử, một đoạn chữ, một giá trị, URL, class hoặc thuộc tính: tổng cộng 12 phép kiểm tra.',
      'Assert có chờ: kiểm tra mỗi 250 ms trong tối đa 5 giây, nên trang còn đang tải không bị tính là lỗi.',
      'Assert là kiểm tra mềm: phép nào sai được ghi nhận và lần chạy vẫn tiếp tục — lần chạy CSV hay theo lịch không bao giờ bị kẹt ở hộp hỏi.',
      'Lỗi đầu tiên quyết định kết luận. Một cú click hỏng làm Assert kế tiếp sai là bài test hỏng, không phải ứng dụng lỗi.',
      'Thẻ <b>Last run</b> ở đầu tab Record &amp; Play liệt kê mọi lỗi — bấm vào một lỗi để nhảy tới bước đó.',
      '<b>Bug report</b> viết sẵn issue cho bạn: các bước tái hiện, URL, môi trường và ảnh chụp để đính kèm.'
    ],
    steps: [
      ['Thêm Assert', 'Add Manual Action → Assert (Expect): chọn phép kiểm tra, phần tử và giá trị mong đợi.'],
      ['Chạy', 'Play, lặp, sequence, CSV hay hẹn lịch — Assert không bao giờ làm lần chạy tạm dừng.'],
      ['Xem kết luận', 'Trong thông báo, trên huy hiệu ở thanh công cụ và trên thẻ Last run.'],
      ['Báo lỗi', 'Bug report → <b>Copy</b> phần Markdown, <b>Download screenshot</b>, rồi dán cả hai vào công cụ quản lý lỗi.']
    ],
    sections: [
      {
        title: 'Bốn kết luận, một quy tắc',
        nav: 'Kết luận',
        lead: 'Lỗi đầu tiên quyết định — nó thường là nguyên nhân của mọi lỗi phía sau.',
        table: {
          head: ['Kết luận', 'Khi nào'],
          rows: [
            ['Passed', 'Không có lỗi, lần chạy đi tới cuối, và có ít nhất một Assert đã chạy.'],
            ['Finished&nbsp;· no&nbsp;checks', 'Không có lỗi và đi tới cuối, nhưng không Assert nào chạy — chưa kiểm gì trên trang.'],
            ['Failed', 'Lỗi đầu tiên là một Assert sai — trang hiển thị sai.'],
            ['Test&nbsp;broken', 'Lỗi đầu tiên là thứ khác — không tìm thấy phần tử, lỗi script, khối bước hỏng. Bài test không kiểm tra được.'],
            ['Stopped', 'Không có lỗi nhưng lần chạy chưa tới cuối — bạn đã dừng nó, hoặc tab của nó bị đóng. Không bao giờ được tính là Passed.']
          ]
        },
        points: [
          '<b>Thông báo</b>: <code>Failed — "Checkout"</code>, kèm số phép kiểm tra sai và số bước bị hỏng.',
          '<b>Huy hiệu</b>: dấu chéo đỏ, dấu ! vàng hoặc ô vuông xám trên biểu tượng ở thanh công cụ cho tới lần chạy sau, hoặc tới khi bạn mở popup.',
          '<b>Lần chạy CSV</b>: kết luận của từng dòng nằm trong cột Run Result riêng — <code>12 passed · 2 failed · 1 broken</code>.',
          '<b>Sequence</b> có một kết luận chung, xét lỗi của từng kịch bản theo thứ tự.'
        ]
      },
      {
        title: 'Thẻ Last run',
        nav: 'Last run',
        lead: 'Ở đầu tab Record &amp; Play: lần Play hoặc Resume gần nhất kết thúc ra sao — tới lần chạy sau.',
        images: [{
          alt: 'Thẻ Last run của một lần chạy “Checkout with coupon” bị Failed: kết luận, thời gian, một dòng lỗi — #4 Check the toast, mong đợi chữ chứa Saved, nhận được Error: coupon expired — và nút Bug report.',
          caption: 'Một lần chạy thật bị lỗi: mong đợi gì, trang có gì.'
        }, {
          alt: 'Thẻ Last run của một lần chạy không có Assert: ✓ Finished · no checks, Checkout with coupon, just now, và gợi ý: No Assert ran, so nothing was checked. Add an Assert (Add Manual Action) to check the page shows what it should.',
          caption: 'Không Assert nào chạy: Finished · no checks, không phải Passed.'
        }],
        points: [
          'Kết luận, kịch bản và thời điểm — mỗi lỗi một dòng, kèm số thứ tự bước.',
          'Assert sai ghi cả hai phía: <code>Expected text "Saved", got "Error"</code>.',
          'Bấm vào một lỗi để nhảy tới bước đó trong danh sách.',
          'Không Assert nào chạy? Thẻ ghi <b>✓ Finished · no checks</b>, màu xám, kèm gợi ý thêm một Assert.',
          '× ẩn thẻ này cho tới lần chạy sau.'
        ]
      },
      {
        title: '12 phép kiểm tra cho Condition và Assert',
        nav: '12 phép kiểm tra',
        lead: 'Cùng một danh sách cho cả hai: Condition quyết định có bỏ qua bước hay không, Assert quyết định lần chạy có đạt hay không.',
        table: {
          head: ['Phép kiểm tra', 'Đúng khi'],
          rows: [
            ['Element exists / does not exist', 'Selector tìm thấy một phần tử — hoặc không tìm thấy phần tử nào.'],
            ['Element is visible / is hidden', 'Phần tử đang hiển thị trên trang — hoặc không.'],
            ['Text contains / Text equals', 'Chữ của phần tử chứa — hoặc khớp chính xác — giá trị mong đợi.'],
            ['Value contains / Value equals', 'Giá trị hiện tại của ô nhập chứa — hoặc khớp chính xác — giá trị đó.'],
            ['URL contains / URL equals', 'Địa chỉ trang chứa — hoặc khớp chính xác — giá trị đó.'],
            ['Has class', 'Phần tử có class đã cho.'],
            ['Has attribute', 'Phần tử có thuộc tính đã cho.']
          ]
        }
      },
      {
        title: 'Bug report tự viết',
        nav: 'Bug report',
        lead: 'Trên thẻ Last run của lần chạy failed hoặc broken: Markdown sẵn cho Jira, GitHub hay công cụ bất kỳ.',
        images: [{
          alt: 'Hộp thoại Bug report của lần chạy đó: Markdown gồm lỗi, trang, thời gian, kết quả và môi trường, rồi các bước tái hiện, mỗi bước mang tên phần tử của nó — Email, Coupon, Apply — với giá trị đã gõ hiện thành dấu chấm, ô Include typed values, và nút Copy, Download screenshot.',
          caption: 'Báo cáo của lần chạy phía trên, giá trị đã gõ được ẩn.'
        }],
        points: [
          'Lỗi đầu tiên, trang, thời điểm, kết quả, trình duyệt, hệ điều hành và phiên bản Pocket QA.',
          'Các bước tái hiện viết thành câu; bước bị Condition bỏ qua được lược đi.',
          'Giá trị đã gõ hiện ••• cho tới khi tick <b>Include typed values</b> — không bao giờ được nhớ.',
          '<b>Download screenshot</b>: trang ở đúng lúc lỗi đầu tiên xảy ra.'
        ]
      }
    ],
    notes: [
      'Phép kiểm tra chữ, giá trị, class hoặc thuộc tính mà không có phần tử thì được tính là <b>broken</b>, không phải failed — bài test không kiểm tra được.',
      'Giá trị của ô mật khẩu không bao giờ rời khỏi trang: Assert của nó chỉ báo là không khớp.',
      'Không có ảnh chụp khi tab của lần chạy không nằm phía trước (chạy nền); báo cáo ghi rõ điều đó thay vì đính kèm nhầm trang.',
      'Sequence và lần chạy CSV không tạo thẻ Last run — kết quả nằm trong thông báo và trong file CSV xuất ra.'
    ]
  },

  variables: {
    title: 'Biến & logic',
    lead: 'Biến một bản ghi dùng một lần thành script thật: biến dùng lại ở mọi nơi dưới dạng <code>${var}</code>, giá trị đọc từ trang ngay lúc chạy, cùng điều kiện và switch rẽ nhánh theo chúng.',
    facts: [['4', 'loại biến'], ['12', 'phép kiểm tra điều kiện'], ['3', 'lớp ưu tiên']],
    tabLabel: 'tab Tools',
    points: [
      'Bốn loại biến: <b>Static</b>, <b>Random</b> (chữ, số, cả hai, hoặc mốc ngày giờ), <b>Pick</b> (một giá trị trong danh sách) và <b>Fallback</b> (thử A, rồi B, rồi C).',
      '<code>${var}</code> dùng được trong selector, giá trị, URL, script, giá trị mong đợi, tên file và nhiều chỗ khác.',
      'Gõ <code>${</code> (hoặc <span class="kbd">Ctrl+Space</span>) trong một trường để xem gợi ý — biến của bạn, biến do các bước trước ghi ra và các cột của file CSV đã tải.',
      '<b>Read DOM → Variable</b> đọc chữ, chữ hiển thị, giá trị ô nhập hoặc một thuộc tính trong lúc chạy — toàn bộ, hoặc chỉ phần bạn đánh dấu.',
      '<b>Condition (If)</b> bỏ qua N bước tiếp theo khi phép kiểm tra sai.',
      '<b>Switch</b> chạy một kịch bản khác, nhảy trong kịch bản này, hoặc chỉ chạy khối bước của nhánh khớp.'
    ],
    steps: [
      ['Khai báo', 'Tools → Variables: thêm tên, chọn loại, đặt giá trị.'],
      ['Sử dụng', 'Gõ <code>${name}</code> vào bất kỳ trường nào của bước — danh sách gợi ý sẽ điền giúp.'],
      ['Lấy giá trị', 'Thêm một bước Read DOM để lưu thứ gì đó trên trang thành biến mới.'],
      ['Rẽ nhánh', 'Thêm Condition hoặc Switch hành động theo những gì trang hiển thị hay giá trị một biến đang giữ.']
    ],
    sections: [
      {
        title: 'Bốn loại biến',
        nav: 'Loại biến',
        lead: 'Chọn loại trong form — popup tự viết cú pháp cho bạn.',
        table: {
          head: ['Loại', 'Lưu dưới dạng', 'Khi chạy'],
          rows: [
            ['Static', '<code>https://staging.example.com</code>', 'Dùng nguyên giá trị.'],
            ['Random', '<code>{random:alphanumeric:8}</code>', 'Tạo mới mỗi lần chạy — chữ, số, cả hai, hoặc <code>datetime</code>&nbsp;(<span class="nw">YYYY-MM-DD_HH-MM-SS</span>).'],
            ['Pick', '<code>{pick:alice|bob|carol}</code>', 'Chọn ngẫu nhiên một giá trị mỗi lần chạy; cột CSV cùng tên sẽ ghi đè.'],
            ['Fallback', '<code>{fallback:A|B|C}</code>', 'Thử lần lượt cho tới khi một giá trị khớp trên trang; giá trị đó được giữ tới hết lần chạy.']
          ]
        },
        points: [
          '<b>Thứ tự ưu tiên</b>: cột của dòng CSV thắng giá trị do Read DOM ghi trong lúc chạy, và giá trị đó thắng biến đã lưu.',
          'Giá trị được tính lại từ đầu ở mỗi vòng lặp và không bao giờ được ghi ngược — lần chạy không thể ghi đè biến bạn đã lưu.',
          'Tên không có trong bảng thì giữ nguyên <code>${name}</code> trên trang, nên gõ sai sẽ lộ ra thay vì thành ô trống.'
        ]
      },
      {
        title: 'Đổi tên không làm vỡ kịch bản',
        nav: 'Đổi tên',
        lead: 'Đổi tên một biến ở tab Tools thì mọi kịch bản dùng nó đổi theo.',
        images: [{
          alt: 'Thẻ Variables sau khi đổi userEmail thành loginEmail, cùng thông báo: “loginEmail” saved · 3 references in 2 scenarios updated.',
          caption: 'userEmail → loginEmail: 3 chỗ trong 2 kịch bản.'
        }],
        points: [
          'Mọi <code>${name}</code>, và tên trần trong Switch, Read DOM hay Screenshot → Variable.',
          'Bước đang mở trong form và lịch sử Undo cũng đổi theo.',
          'Tên đã có ở biến khác, hoặc kịch bản nào đó đang ghi vào, sẽ bị từ chối.',
          'File xuất, bản backup và cột CSV giữ tên cũ — cột của file CSV đang nạp sẽ được chỉ ra.'
        ]
      },
      {
        title: 'Read DOM → Variable',
        nav: 'Read DOM',
        lead: 'Lấy một giá trị trên trang để dùng trong các bước sau — số đơn hàng, id được sinh ra, giá tiền.',
        points: [
          '<b>Read from</b>: Text content, Visible text (những gì người dùng thấy — lựa chọn đang chọn của &lt;select&gt;, giá trị của ô nhập), Input value, hoặc bất kỳ Attribute nào.',
          '<b>Save part of the text</b>: chép nguyên đoạn chữ rồi đặt <code>${name}</code> vào phần cần giữ — <code>Order #${orderId} ·</code> — mỗi chỗ đánh dấu thành một biến.',
          '<b>Try on</b>: dán một đoạn chữ mẫu để xem mẫu trích ra được gì trước khi chạy.',
          'Dùng được với Child Condition và với phần tử chọn bên trong iframe.'
        ]
      },
      {
        title: 'Condition, switch và khối bước',
        nav: 'Rẽ nhánh',
        lead: 'Rẽ nhánh theo những gì trang hiển thị hoặc giá trị của biến, không cần rời popup.',
        images: [{
          alt: 'Danh sách bước có một Condition bảo vệ một bước và một Switch theo ${role}: case admin chạy bước 7 và 8, case user chạy bước 9, rồi kịch bản chạy tiếp ở bước 10.',
          caption: 'Switch ${role}: admin chạy 7–8, user chạy 9, rồi tới 10.'
        }],
        points: [
          '<b>Condition (If)</b>: một trong 12 phép kiểm tra — sai thì bỏ qua N bước tiếp theo.',
          '<b>Switch</b>: mỗi giá trị chạy kịch bản khác, nhảy tới bước khác, hoặc chỉ chạy khối của nó.',
          '<b>Always</b>: không cần biến — một kịch bản hay đoạn #–# của nó chạy mỗi lần.',
          'Switch mới đứng trước các bước của nó; không case nào được cắt ngang khối của Switch khác.'
        ]
      }
    ],
    notes: [
      'Biến là toàn cục trong tiện ích và được lưu trong trình duyệt — không gắn với một kịch bản nào.',
      'Bước Read DOM bị lỗi và bị bỏ qua sẽ để trống biến của nó, nên một Condition phía sau có thể kiểm tra điều đó.',
      'Khi xuất code, khối Switch được viết thành <code>if / else if</code>; Switch sang kịch bản khác không xuất được và được đánh dấu, không bị lược bỏ.'
    ]
  },

  csv: {
    title: 'Chạy theo dữ liệu CSV',
    lead: 'Tải file CSV lên và phát lại cùng một kịch bản cho mỗi dòng — tiêu đề cột tự thành <code>${variables}</code>, nên một bản ghi chạy được cả bộ dữ liệu và mỗi dòng có kết luận riêng.',
    facts: [['1', 'bản ghi, bao nhiêu dòng cũng được'], ['3', 'định dạng xuất'], ['Mỗi dòng', 'một kết luận pass / fail']],
    tabLabel: 'tab Record & Play',
    points: [
      'Dòng đầu đặt tên cho biến: cột <code>email</code> thành <code>${email}</code>, không cần bước ánh xạ.',
      'Các cột của một dòng ghi đè biến đã lưu cùng tên, chỉ trong dòng đó.',
      'Thời gian nghỉ giữa các dòng tuỳ chỉnh, từ 0.5 s tới 10 s hoặc một giá trị riêng, để không gây áp lực lên trang đích.',
      'Tiến trình hiển thị trực tiếp từng dòng, kèm đếm ngược tới dòng tiếp theo.',
      'Các bước Screenshot → Variable đưa ảnh chụp của từng dòng vào kết quả.',
      'Xuất ra Excel XLSX có ảnh trong ô, HTML có ảnh nhúng, hoặc ZIP gồm ảnh chụp + CSV.'
    ],
    steps: [
      ['Ghi với biến', 'Đặt <code>${name}</code> vào chỗ cần dữ liệu — thông tin đăng nhập, từ khoá tìm kiếm, số lượng.'],
      ['Tải CSV lên', 'Record & Play → <span class="nw">CSV Data-Driven Run</span>: dòng tiêu đề đặt tên cho biến, và bản xem trước cho thấy dữ liệu đã đọc.'],
      ['Chạy', 'Mỗi dòng chạy một lần, kết luận của từng dòng được thu thập ngay trong lúc chạy.'],
      ['Xuất', 'XLSX, HTML hoặc ZIP — định dạng nào cũng kết thúc bằng cột Run Result và Action Failed.']
    ],
    sections: [
      {
        title: 'Kết quả có thể bàn giao ngay',
        nav: 'Kết quả',
        table: {
          head: ['Định dạng', 'Bạn nhận được'],
          rows: [
            ['Excel XLSX', 'Mỗi dòng CSV một dòng, ảnh chụp nhúng trong ô, cột Run Result và Action Failed ở cuối.'],
            ['HTML', 'Một báo cáo độc lập có ảnh nhúng — mở được bằng mọi trình duyệt.'],
            ['ZIP', '<code>results.csv</code> cùng một thư mục cho mỗi dòng, chứa ảnh chụp của dòng đó.']
          ]
        },
        points: [
          '<b>Run Result</b> là kết luận của dòng — Passed, Failed, Test broken hoặc Stopped.',
          '<b>Action Failed</b> liệt kê từng lỗi kèm lý do: <code>[7] assert "Check toast": Expected text "Saved", got "Error"</code>.',
          'Lần chạy kết thúc đếm các dòng theo cùng cách: <code>12 passed · 2 failed · 1 broken</code>.',
          'File CSV của bạn có thể có sẵn cột tên Run Result — các cột thêm vào được phân biệt theo vị trí, nên cột đó vẫn giữ giá trị của nó.'
        ]
      },
      {
        title: 'Thư mục ZIP đặt tên theo ý bạn',
        nav: 'Cấu trúc ZIP',
        lead: 'Phần <b>Advanced</b> của tuỳ chọn xuất ZIP đặt tên thư mục của từng dòng theo chính dữ liệu của dòng đó — sẵn sàng lưu trữ, không phải đổi tên sau.',
        points: [
          '<b>Folder name</b>: <code>abc ${name}</code> → <code>abc john/</code>, <code>abc kate/</code> — cột CSV hoặc biến lần chạy ghi.',
          '<b>Add row number</b>: <code>abc john_01</code>, <code>abc kate_02</code>.',
          'Hai dòng trùng một tên sẽ được thêm <code>_2</code>, <code>_3</code>; ký tự Windows không chấp nhận được đổi thành <code>_</code>.',
          'Trong mỗi thư mục, ảnh được đặt tên theo Filename của bước Screenshot → Variable — <code>a/b</code> tạo một thư mục con.',
          'Đổi tên sau khi chạy rồi tải lại — không cần chạy lại.'
        ]
      }
    ],
    notes: [
      'Đổi định dạng xuất sau khi chạy sẽ xoá kết quả đã gom — hãy chọn định dạng trước.',
      'Ký tự phân cách được tự nhận diện và giá trị trong dấu ngoặc kép được đọc đúng, nên file CSV lưu từ Excel dùng được ngay.',
      'Đổi tên một biến sau khi đã nạp CSV thì popup chỉ ra cột vẫn mang tên cũ.',
      'Code xuất ra cũng đọc được cùng file CSV và chạy một lần cho mỗi dòng — xem <a href="feature.html?id=export">Xuất code</a>.'
    ]
  },

  screenshots: {
    title: 'Ảnh chụp & công cụ ảnh',
    lead: 'Sáu kiểu chụp bao quát mọi thứ, từ vùng đang hiển thị tới cả một cửa sổ ứng dụng — kiểu nào cũng có một bản Edit mở ảnh thẳng trong trình sửa ảnh.',
    facts: [['6', 'kiểu chụp'], ['10', 'phím tắt chụp & ghi'], ['3 · 5 · 10 s', 'đếm ngược']],
    tabLabel: 'tab Capture',
    points: [
      'Chụp Visible, Full Page, Scroll (Down / Across), Segment (Down / Across), Element và Window.',
      'Mỗi chế độ có một bản <b>Edit</b> mở trình sửa ảnh ngay sau khi chụp.',
      'Đếm ngược 3, 5 hoặc 10 giây trước khi chụp vùng hiển thị — đủ thời gian mở dropdown hay trạng thái hover cần có trong ảnh.',
      'Watermark với token <code>{url}</code> và <code>{datetime}</code>, in thẳng lên ảnh.',
      '<b>Image Diff</b> so sánh hai ảnh chụp theo từng điểm ảnh, độ nhạy tuỳ chỉnh.',
      'Tự lưu với tiền tố tên file, hoặc hỏi nơi lưu cho từng ảnh.'
    ],
    steps: [
      ['Chọn chế độ', 'Tab Capture — lọc theo All, Visible, Scroll, Segment, Element hoặc Window.'],
      ['Chụp', 'Bấm nút của chế độ đó, hoặc nhấn phím tắt mà không cần mở popup.'],
      ['Sửa nếu cần', 'Bản Edit mở trình sửa ảnh: cắt, chú thích, làm mờ, đóng dấu.'],
      ['Lưu', 'Tự tải xuống, hoặc lưu vào thư mục bạn chọn.']
    ],
    sections: [
      {
        title: 'Sáu kiểu chụp',
        nav: 'Kiểu chụp',
        table: {
          head: ['Chế độ', 'Cách hoạt động', 'Phím tắt'],
          rows: [
            ['Visible', 'Vùng đang hiển thị, đúng như bạn thấy.', '<span class="kbd">Alt+P</span>'],
            ['Full Page', 'Toàn bộ trang trong một ảnh — xử lý cả header cố định, đặt zoom 100% khi chụp.', '<span class="kbd">Alt+Shift+F</span>'],
            ['Scroll ↕&nbsp;Down / ↔&nbsp;Across', 'Cuộn trang và ghép thành ảnh toàn cảnh dọc hoặc ngang.', '<span class="kbd">Alt+V</span> / <span class="kbd">Alt+H</span>'],
            ['Segment ⬍&nbsp;Down / ⬌&nbsp;Across', 'Đánh dấu điểm đầu, cuộn tới điểm cuối, dừng — chỉ lấy phần đã đánh dấu.', '<span class="kbd">Alt+Shift+V</span> / <span class="kbd">Alt+Shift+H</span>, rồi <span class="kbd">Alt+X</span>'],
            ['Element', 'Đúng khung của một phần tử.', '<span class="kbd">Alt+E</span>'],
            ['Window', 'Bất kỳ cửa sổ ứng dụng nào trên màn hình — gồm cả khung trình duyệt và DevTools.', '—']
          ]
        }
      },
      {
        title: 'Chụp cửa sổ',
        nav: 'Chụp cửa sổ',
        lead: 'Mọi chế độ khác đi qua trang web, vốn không thấy được gì ngoài vùng hiển thị. Chụp cửa sổ thì đi qua hệ điều hành.',
        points: [
          'Chụp bất kỳ cửa sổ ứng dụng nào đúng như trên màn hình — trình duyệt có DevTools, trình soạn thảo, terminal — theo điểm ảnh vật lý.',
          'Lần đầu sẽ xin quyền chụp màn hình tuỳ chọn; từ chối thì mọi tính năng khác vẫn nguyên vẹn.',
          'Chỉ đưa ra các cửa sổ, không bao giờ cả màn hình. Khung hình trống đầu tiên được phát hiện và chụp lại, không bao giờ lưu thành ảnh đen.',
          'Đếm ngược bắt đầu sau khi bạn chọn cửa sổ và hiện trong một cửa sổ nhỏ luôn nổi trên cùng và trên huy hiệu thanh công cụ — cả hai đều không lọt vào ảnh.',
          'Huỷ bất cứ lúc nào bằng nút Cancel hoặc <span class="kbd">Esc</span>.'
        ]
      },
      {
        title: 'Bên trong Image Editor',
        nav: 'Image Editor',
        lead: 'Mọi ảnh chụp — hoặc ảnh bất kỳ từ clipboard hay file — mở trong trình sửa có cửa sổ riêng.',
        images: [{
          alt: 'Image Editor đang mở một ảnh chụp dashboard mẫu, có khung chữ nhật và mũi tên chú thích, bảng Stamp mở bên phải với các tuỳ chọn watermark thời gian.',
          caption: 'Một khung chữ nhật, một mũi tên và bảng Stamp.'
        }],
        points: [
          'Crop, Draw, Rectangle, Ellipse, Arrow, Text và Blur — mỗi công cụ một phím: C, D, R, E, A, T, B.',
          'Xoay, lật, và hoàn tác hay làm lại mọi thao tác.',
          'Chỉnh độ sáng, tương phản, bão hoà, độ nét; đổi kích thước chính xác hoặc theo 10–300%.',
          'Đóng dấu thời gian hay chữ riêng ở 1 trong 9 vị trí; phóng to, về 1:1 chỉ bằng một phím.'
        ]
      },
      {
        title: 'So sánh ảnh',
        nav: 'So sánh ảnh',
        lead: 'Hai ảnh chụp, trước và sau một lần deploy: cái gì đã đổi, tính bằng điểm ảnh và đánh dấu trên ảnh.',
        images: [{
          alt: 'Hộp thoại Image Diff: đã chọn ảnh A và ảnh B, độ nhạy 10, đã bấm Compare, kết quả 4,123 px (0.65% diện tích), và ảnh xem trước với dòng thay đổi được tô màu hồng tím, cùng nút Save result.',
          caption: 'Một dòng thay đổi: 4,123 px, 0.65% ảnh.'
        }],
        points: [
          'Chọn ảnh A và ảnh B từ máy — hai ảnh bất kỳ, không chỉ ảnh chụp.',
          'Độ nhạy: thấp thì bắt cả thay đổi rất nhỏ, cao thì bỏ qua nhiễu.',
          'Số điểm ảnh thay đổi, tỉ lệ trên diện tích, và vùng thay đổi được đánh dấu trên ảnh.',
          '<b>Save result</b> lưu lại ảnh đã đánh dấu.'
        ]
      },
      {
        title: 'Tệp, tên và cài đặt',
        nav: 'Cài đặt',
        lead: 'Ảnh lưu vào đâu và đặt tên ra sao — chỉnh một lần trong tab Settings.',
        images: [{
          alt: 'Thẻ Screenshot settings: chế độ lưu, tiền tố tên file với ví dụ trực tiếp, thêm kiểu chụp vào tên file, đếm ngược, định dạng và cỡ chữ watermark, tốc độ cuộn segment, và nút Save Settings.',
          caption: 'Thẻ Screenshot trong tab Settings.'
        }],
        points: [
          '<b>Auto</b> lưu thẳng vào Downloads/screenshots; <b>Ask</b> để bạn đặt tên từng ảnh.',
          'Tên là tiền tố cộng thời điểm; thêm kiểu chụp (<code>_full</code>, <code>_elem</code>…) nếu bạn chụp lẫn nhiều kiểu.',
          'Watermark: <code>{url}</code> và <code>{datetime}</code> in thẳng vào ảnh, cỡ chữ tuỳ chỉnh.',
          'Tốc độ cuộn segment, dọc và ngang riêng — chậm lại cho trang tải ảnh muộn.'
        ]
      }
    ],
    notes: [
      'Không chụp được cửa sổ đang thu nhỏ — hãy mở lại cửa sổ trước.',
      'Chụp Segment cố ý giữ mức zoom của trình duyệt: khoảng đã đánh dấu được đo ở mức zoom đó.',
      'Chụp cửa sổ không thể là một bước được ghi. Trong kịch bản, các hành động Screenshot đã có chụp vùng hiển thị, cả trang và phần tử.',
      'Trên các trang mà content script không tới được (trang chrome://, Web Store), đếm ngược chạy trên huy hiệu thanh công cụ.'
    ]
  },

  export: {
    title: 'Xuất code 5 định dạng',
    lead: 'Biến mọi kịch bản đã ghi thành code test thật, chạy được — năm định dạng, sinh mới từ các bước hiện tại của kịch bản, không lặng lẽ bỏ sót bước nào.',
    facts: [['5', 'định dạng đầu ra'], ['8', 'locator dự phòng mỗi bước'], ['4', 'biến môi trường ghi đè']],
    tabLabel: 'tab Tools',
    points: [
      'JS Bookmarklet, Selenium Python (script hoặc pytest), Playwright Test, Robot Framework và Selenium Java (TestNG).',
      'Lấy lần phát lại làm chuẩn: code làm đúng như một lần chạy — cùng các locator dự phòng, và dùng helper trong trang của chính tiện ích ở mọi chỗ mà lệnh driver thông thường sẽ hành xử khác.',
      'Mỗi bước được đánh dấu OK, Verify hoặc Skip trong tab Actions, kèm lý do, và một comment ghi lại điều đó trong code.',
      'Assert vẫn có chờ và là kiểm tra mềm: mỗi phép sai được báo, và bài test thất bại ở cuối với danh sách tất cả các phép sai.',
      'Trỏ cùng một file sang staging, đổi trình duyệt, chạy headless hoặc ghi đè biến từ môi trường — không cần xuất lại.',
      'Bước lỗi tự nêu tên — <code>Step 3: click — Sign in: no element found by …</code> — và lưu ảnh chụp trang.'
    ],
    steps: [
      ['Chọn kịch bản', 'Tools → Export Code — danh sách được nhóm theo thư mục và mở sẵn ở kịch bản bạn đang chọn.'],
      ['Chọn định dạng', 'Năm nút; nút nào cũng mở cùng một cửa sổ bốn tab: Code, Variables, Actions, Settings.'],
      ['Tinh chỉnh', 'URL bắt đầu, trình duyệt, headless, thời gian nghỉ, thời gian chờ, file dữ liệu CSV — code cập nhật ngay khi bạn gõ.'],
      ['Copy hoặc tải xuống', 'Rồi chạy bằng <code>pytest</code>, <code>npx playwright test</code>, <code>robot</code> hoặc <code>mvn test</code>.']
    ],
    sections: [
      {
        title: 'Năm định dạng',
        nav: 'Định dạng',
        table: {
          head: ['Định dạng', 'File', 'Chạy bằng'],
          rows: [
            ['JS Bookmarklet', '<code>&lt;name&gt;_bookmarklet.js</code>, hoặc một URL bookmark một dòng', 'Trình duyệt — một bookmark hoặc Console. Không cần cài gì.'],
            ['Selenium&nbsp;Python', '<code>&lt;name&gt;_selenium.py</code> (script) hoặc <code>test_&lt;name&gt;.py</code> (pytest)', '<code>python</code> / <code>pytest</code> với Selenium 4'],
            ['Playwright&nbsp;Test', '<code>&lt;name&gt;.spec.js</code>', '<code>npx playwright test</code> — mỗi bước là một <code>test.step</code>, có trace khi lỗi'],
            ['Robot&nbsp;Framework', '<code>&lt;name&gt;.robot</code>', '<code>robot</code> với SeleniumLibrary — các bước đọc như keyword'],
            ['Selenium&nbsp;Java', '<code>&lt;Name&gt;Test.java</code>', '<code>mvn test</code> / <code>gradle test</code> với Selenium 4 và TestNG 7']
          ]
        }
      },
      {
        title: 'Từ popup đến code',
        nav: 'Ảnh chụp',
        lead: 'Cùng kịch bản “Login flow”, xuất theo hai cách — đầu ra thật. Dòng cảnh báo đếm các bước cần kiểm tra; bấm vào sẽ mở chúng trong tab Actions.',
        images: [
          {
            alt: 'Cửa sổ Export JS của kịch bản Login flow ở Step 1 của code bookmarklet được sinh ra, có các tab Code/Variables/Actions/Settings và cảnh báo 1 bước cần kiểm tra, 1 bước bị bỏ qua.',
            caption: 'JS Bookmarklet, cùng các tab Variables, Actions và Settings.'
          },
          {
            alt: 'Cửa sổ Export Python của cùng kịch bản Login flow ở Step 1 của code Selenium được sinh ra.',
            caption: 'Selenium Python; ↧ Steps nhảy qua phần helper.'
          }
        ]
      },
      {
        title: 'Mỗi định dạng hỗ trợ những gì',
        nav: 'Phạm vi hỗ trợ',
        lead: 'Click, Input, Hover, Dropdown, Drag &amp; Drop, Wait, Read DOM và Condition chạy ở cả năm. Phần còn lại:',
        table: {
          head: ['Bước', 'Bookmarklet', 'Selenium', 'Playwright', 'Robot', 'Java'],
          rows: [
            ['Navigate', 'Kiểm tra', 'Có', 'Có', 'Có', 'Có'],
            ['Run JS', 'Kiểm tra', 'Kiểm tra', 'Kiểm tra', 'Kiểm tra', 'Kiểm tra'],
            ['Chụp màn hình, Upload&nbsp;File', '—', 'Có', 'Có', 'Có', 'Có'],
            ['Trong iframe', 'Cùng site', 'Có', 'Có', 'Có', 'Có'],
            ['Khối Switch theo biến', 'Có', 'Có', 'Có', 'Có', 'Có'],
            ['Switch sang kịch bản, #N, Always', '—', '—', '—', '—', '—'],
            ['Assert mềm', 'Có', 'Có', 'Có', 'Có', 'Có']
          ]
        }
      },
      {
        title: 'Chạy ở mọi nơi, không cần xuất lại',
        nav: 'Môi trường',
        lead: 'Các bản xuất Selenium, Playwright, Robot và Java đọc một vài biến môi trường, nên một file dùng được cho mọi môi trường.',
        table: {
          head: ['Biến', 'Chức năng', 'Định dạng'],
          rows: [
            ['<code>PQA_BASE_URL</code>', 'Một site khác để chạy — mọi URL thuộc site của trang đầu tiên sẽ trỏ tới trang tương ứng ở đó.', 'Selenium, Playwright, Robot, Java'],
            ['<code>PQA_BROWSER</code>', '<code>Chrome</code>, <code>Edge</code>, <code>Firefox</code> hoặc <code>Safari</code>, thay cho trình duyệt lúc xuất.', 'Selenium, Robot, Java'],
            ['<code>PQA_HEADLESS</code>', '<code>1</code> để chạy không có cửa sổ trình duyệt, <code>0</code> để có cửa sổ.', 'Selenium, Robot, Java'],
            ['<code>PQA_&lt;name&gt;</code>', 'Giá trị của biến <code>&lt;name&gt;</code> — <code>PQA_username=bob</code>.', 'Selenium, Playwright, Robot, Java']
          ]
        }
      }
    ],
    notes: [
      '<b>Data file (CSV)</b>: pytest, Playwright, Robot (qua DataDriver) và Java chạy bài test một lần cho mỗi dòng của file CSV đặt cạnh nó.',
      'Bookmarklet dừng ở bước Navigate và chạy tiếp từ bước sau khi bạn bấm lại nó trên trang mới — bookmarklet không sống sót qua một lần tải trang.',
      'Giá trị biến được gắn cố định lúc xuất — sửa bảng Variables rồi xuất lại, hoặc ghi đè bằng <code>PQA_&lt;name&gt;</code>.',
      'Bước đã tắt (⊘) không được xuất. Chữ trong kịch bản chỉ nằm trong chuỗi hoặc comment — kịch bản nhập từ ngoài không thể lén chèn code.'
    ]
  },

  highlights: {
    title: 'Đánh dấu theo mẫu URL',
    lead: 'Đánh dấu bất kỳ trang nào bằng màu và ghi chú, tự hiện lại ở lần truy cập sau — gom theo mẫu URL, nên một bộ đánh dấu dùng được cho mọi trang có chung bố cục.',
    facts: [['5', 'màu'], ['Ghi chú', 'trên mọi đánh dấu'], ['JSON', 'xuất file']],
    tabLabel: 'tab Highlight',
    points: [
      'Bật Highlight ON, chọn chữ trên trang, rồi chọn vàng, xanh lá, hồng, xanh dương hoặc cam trong tooltip.',
      'Thêm ghi chú cho bất kỳ đánh dấu nào; rê chuột lên sau đó để đọc.',
      'Đánh dấu hiện lại ở lần truy cập sau — kể cả trên nội dung tải muộn.',
      'Tìm kiếm toàn văn trên mọi đánh dấu đã lưu, có bộ lọc màu.',
      'Thống kê cho trang này, tổng cộng và theo từng trang, có phân tích theo màu.',
      'Xuất mọi đánh dấu ra JSON.'
    ],
    steps: [
      ['Bật lên', 'Tab Highlight → Highlight ON.'],
      ['Chọn chữ', 'Một tooltip nhỏ đưa ra năm màu và ô ghi chú.'],
      ['Quay lại', 'Đánh dấu được khôi phục khi truy cập lại, theo trang hoặc theo mẫu URL.'],
      ['Xem lại', 'Tìm kiếm, lọc và chuyển giữa các trang đã đánh dấu ngay từ popup.']
    ],
    sections: [
      {
        title: 'Trên trang',
        nav: 'Trên trang',
        lead: 'Đánh dấu ngay nơi bạn đọc: chọn đoạn chữ, chọn một màu.',
        points: [
          'Chọn chữ → một bảng nhỏ hiện năm màu và ô ghi chú.',
          'Bấm vào một đánh dấu để đổi màu, sửa ghi chú hoặc xoá riêng nó.',
          'Rê chuột lên đánh dấu có ghi chú để đọc, không cần bấm.',
          'Chúng trở lại ở lần ghé sau, kể cả sau khi khởi động lại — cả với nội dung tải muộn.',
          'Công tắc trong popup ẩn tất cả; bật lại thì mọi đánh dấu quay về.'
        ]
      },
      {
        title: 'Trong popup',
        nav: 'Trong popup',
        lead: 'Tab Highlight tìm lại những gì bạn đã đánh dấu, ở trang này hay trang khác.',
        images: [{
          alt: 'Tab Highlight: Highlight ON, Export, thống kê 3 trên trang này, 4 tổng cộng, 2 trang, trang hiện tại, menu Other pages, ô tìm kiếm với bộ lọc màu, ba đánh dấu vàng, hồng và xanh lá, và nút Clear page highlights.',
          caption: '3 đánh dấu trên trang này, 4 trên 2 trang.'
        }],
        points: [
          'Tìm theo chữ, hoặc lọc theo màu — mỗi chấm màu đếm số đánh dấu của nó.',
          'Số đánh dấu trên trang này, tổng cộng, và trên bao nhiêu trang.',
          '<b>Other pages</b>: đọc đánh dấu của trang khác mà không cần mở nó.',
          'Xuất tất cả ra JSON, hoặc chỉ xoá đánh dấu của trang này.'
        ]
      },
      {
        title: 'Mẫu URL',
        nav: 'Mẫu URL',
        lead: 'Mặc định, một đánh dấu thuộc về trang nơi nó được tạo. Một mẫu — có ký tự đại diện ở đường dẫn <em>và</em> subdomain — gom nhiều trang vào cùng một bộ đánh dấu.',
        table: {
          head: ['Mẫu', 'Khớp với'],
          rows: [
            ['<code>site.com/*/settings</code>', '<code>site.com/team/settings</code>, <code>site.com/billing/settings</code>'],
            ['<code>*.myapp.com/app/*</code>', '<code>eu.myapp.com/app/orders</code>, <code>us.myapp.com/app/users</code>'],
            ['<code>site.com/products</code>', '<code>site.com/products?page=2</code> — mẫu không ghi query thì khớp với mọi query']
          ]
        },
        points: [
          'Công cụ dựng mẫu lấy từ URL của tab: bấm vào một phần để đổi chính xác → <code>*</code> → bỏ.',
          '<code>*</code> là đúng một đoạn đường dẫn, không vượt qua <code>?</code> hay <code>#</code>.',
          'Thêm hoặc bỏ một mẫu sẽ gom lại dữ liệu đã lưu — mỗi đánh dấu vẫn nhớ trang của nó.',
          '<code>#anchor</code> vẫn là cùng trang; <code>#/route</code> là một trang riêng.'
        ]
      }
    ],
    notes: [
      'Đánh dấu được lưu trong trình duyệt và không bao giờ rời khỏi đó, trừ file JSON bạn xuất ra.',
      'Khi Highlight OFF, bộ máy đánh dấu thậm chí không được chèn vào trang.',
      'Huy hiệu của tab Highlight cho biết trang hiện tại có bao nhiêu đánh dấu.'
    ]
  },

  'sql-test-designer': {
    title: 'SQL Test Case Designer',
    lead: 'Dán một câu SQL để nhận danh sách test case dựng sẵn — phân vùng tương đương, giá trị biên, bảng quyết định, cùng các trường hợp biên NULL và JOIN mà hầu hết kế hoạch test thủ công bỏ sót — kèm dữ liệu test mà mỗi case cần.',
    facts: [['4', 'nhóm kỹ thuật'], ['4', 'định dạng xuất'], ['VI / EN', 'giao diện']],
    tabLabel: 'tab Tools',
    points: [
      'Phân tích <code>SELECT</code> (join, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>, <code>LIMIT</code>, <code>UNION</code>, CTE, <code>CASE</code>) cùng <code>INSERT</code>, <code>UPDATE</code> và <code>DELETE</code>.',
      'Case EP/BVA lấy thẳng từ điều kiện của câu truy vấn, với bước giá trị biên theo kiểu dữ liệu suy ra.',
      'Bảng quyết định bao phủ logic của câu truy vấn — đầy đủ tới giới hạn bạn đặt, rồi pairwise, rồi MC/DC khi điều kiện nhiều dần.',
      'Các case NULL, logic ba giá trị và số lượng bản ghi khi JOIN — những chỗ dễ bỏ sót khi làm tay.',
      'Phần Findings chỉ ra lỗi trong chính câu truy vấn — join bằng dấu phẩy, <code>= NULL</code>, <code>DELETE</code> không có <code>WHERE</code>.',
      'Mọi thứ chạy cục bộ trong trang — câu SQL của bạn không bao giờ rời khỏi trình duyệt.'
    ],
    steps: [
      ['Mở công cụ', 'Tools → SQL Test Case Designer mở trong một tab riêng.'],
      ['Dán câu truy vấn', 'Hoặc chọn một trong sáu câu mẫu. Dấu backtick của MySQL, ngoặc vuông của SQL Server, dấu nháy ANSI và tham số <code>?</code> / <code>:name</code> / <code>@name</code> / <code>$1</code> đều đọc được.'],
      ['Xem các case', 'Lọc theo độ ưu tiên, mệnh đề hoặc cột; bấm vào một case để xem các dòng dữ liệu nó cần.'],
      ['Xuất', 'CSV cho TestRail hoặc Jira, JSON, Data CSV theo từng bảng, hoặc Verify SQL.']
    ],
    sections: [
      {
        title: 'Kỹ thuật',
        nav: 'Kỹ thuật',
        table: {
          head: ['Kỹ thuật', 'Kết quả tạo ra'],
          rows: [
            ['EP + BVA', 'Một giá trị cho mỗi lớp tương đương của từng vị từ, cộng giá trị biên và hai giá trị kề nó. Bước nhảy theo kiểu dữ liệu — 1 cho số nguyên, 0.01 cho tiền, một ngày cho kiểu ngày; chuỗi có thêm case về độ dài, chuỗi rỗng và khoảng trắng.'],
            ['Bảng quyết định + độ bao phủ', 'Bảng quy tắc đầy đủ 2ⁿ tới giới hạn bạn đặt (mặc định 4 điều kiện), rồi pairwise — mọi cặp điều kiện — tới 8, rồi MC/DC: một cặp quy tắc cho mỗi điều kiện. <code>CASE</code> được bao phủ theo nhánh, gồm cả nhánh NULL ẩn khi thiếu <code>ELSE</code>.'],
            ['NULL &amp; logic ba giá trị', '<code>&lt;&gt;</code> làm rơi các dòng NULL, <code>NOT IN</code> trên một NULL, <code>COUNT(col)</code> so với <code>COUNT(*)</code>, khoá join NULL không bao giờ khớp, khoá nhóm NULL dồn thành một nhóm.'],
            ['JOIN / GROUP BY /&nbsp;ORDER–LIMIT', 'Mỗi join ở dạng 1:1, mồ côi và 1:n; một <code>WHERE</code> trên bảng outer join âm thầm biến nó thành inner join; nhóm rỗng, một nhóm và nhiều nhóm; giá trị bằng nhau trong <code>ORDER BY</code>; trang ở đúng, dưới và vượt số dòng.']
          ]
        }
      },
      {
        title: 'Lược đồ và sơ đồ quan hệ',
        nav: 'Sơ đồ',
        lead: 'Không đọc database nào: lược đồ suy ra từ câu truy vấn, xem dạng danh sách lẫn dạng sơ đồ.',
        images: [{
          alt: 'Hộp thoại Table relationships cho một join bốn bảng: customers, orders, order_items và products là các ô liệt kê cột kèm nhãn PK và FK, nối bằng đường chân chim, có nút phóng to/thu nhỏ, Fit và dòng hướng dẫn di chuyển.',
          caption: 'Schema → Diagram cho một join bốn bảng.'
        }],
        points: [
          'Cột, kiểu dữ liệu suy ra, khoá chính và khoá ngoại đọc từ điều kiện join.',
          'Đường chân chim từ mỗi khoá ngoại tới bảng của nó: thấy ngay bảng trung tâm, bảng nhánh.',
          'Kéo ô, kéo nền, cuộn để phóng to hoặc bấm Fit; rê chuột lên bảng để làm nổi bảng liên quan.',
          'Bảng không có khoá được thêm cột <code>id</code>, ghi rõ: đoán sai sẽ lộ ra ngay ở đây.'
        ]
      },
      {
        title: 'So sánh trước và sau',
        nav: 'So sánh',
        lead: 'Dán bản cũ và bản mới của câu truy vấn: mỗi case được xếp theo việc thay đổi đã làm với nó.',
        images: [{
          alt: 'Chế độ Compare sau khi sửa một câu báo cáo: ba bộ đếm — 16 Impacted, 39 Unrelated, 20 No longer applies — phía trên tab Changes detected, liệt kê một bộ lọc quốc gia bị bỏ và khoảng tuổi đổi từ 18–65 thành 21–65.',
          caption: '16 case cần chạy lại, 39 case giữ lại, 20 case nên bỏ.'
        }],
        points: [
          '<b>Impacted</b>: case chạm tới chỗ vừa đổi — cần chạy lại.',
          '<b>Unrelated</b>: không bị ảnh hưởng, vẫn nên giữ cho test hồi quy.',
          '<b>No longer applies</b>: điều kiện, join hay mệnh đề của nó đã mất — nên bỏ.',
          '<b>Changes detected</b>: khác biệt theo mười hai phần, từ bảng, join tới phân trang.'
        ]
      },
      {
        title: 'Danh sách case và khung chi tiết',
        nav: 'Danh sách case',
        lead: 'Không gian làm việc ba cột trong tab riêng, không phải bảng nhỏ trong popup.',
        images: [{
          alt: 'SQL Test Case Designer: cột truy vấn bên trái với câu SQL đã dán, danh sách case được sinh ở giữa với thống kê và bộ lọc kỹ thuật, và khung chi tiết case bên phải với lý do, các dòng dữ liệu mẫu và câu truy vấn cần chạy.',
          caption: 'Câu truy vấn, danh sách case và chi tiết một case — 67 case từ một câu.'
        }],
        points: [
          'Trên danh sách: số case, case ưu tiên cao, điều kiện, join và bảng.',
          'Tìm kiếm; lọc theo ưu tiên, mệnh đề, cột hay “có dữ liệu mẫu”; dòng đầy đủ hoặc gọn.',
          'Mỗi case ghi kỹ thuật, từ EP, BVA tới Pairwise, MC/DC; case trùng được gộp.',
          'Khung chi tiết: vì sao case quan trọng, các dòng cần chuẩn bị và câu truy vấn cần chạy.',
          'Cột truy vấn thu gọn được (☰ trên thanh trên, ⟨ ở đầu cột) cho danh sách rộng hơn — cùng khung với trang API và DB.'
        ]
      },
      {
        title: 'Cảnh báo, độ phủ và kết quả phân tích',
        nav: 'Cảnh báo',
        lead: 'Ba khung về chính câu truy vấn, đóng sẵn tới khi cần — Findings tự mở khi có lỗi thật.',
        images: [{
          alt: 'Khung Coverage cho một mệnh đề WHERE năm điều kiện: pairwise, 6 trên 32 tổ hợp, độ phủ điều kiện 100% và độ phủ quyết định 50% dạng thanh, cùng năm điều kiện đã đánh số bên dưới.',
          caption: 'Vượt giới hạn bảng đầy đủ: pairwise, 6 trên 32 tổ hợp.'
        }],
        points: [
          '<b>Findings</b>: 15 loại lỗi — join bằng dấu phẩy, <code>= NULL</code>, <code>LIMIT</code> thiếu <code>ORDER BY</code>…',
          '<b>Coverage</b>: theo mệnh đề, chế độ bảng quyết định, độ phủ điều kiện và quyết định.',
          '<b>What was parsed</b>: bảng, điều kiện đánh số kèm kiểu, join, phân trang.',
          'Giá trị lấy từ Sample values, và tham số chưa có giá trị, cũng được nêu ra.'
        ]
      },
      {
        title: 'Dữ liệu test và giá trị mẫu',
        nav: 'Dữ liệu test',
        lead: 'Mỗi case kèm các dòng cần nhập trước khi chạy và câu truy vấn để chạy sau đó — dữ liệu mẫu đọc rồi nhập, dành cho tester thủ công.',
        points: [
          'Mỗi bảng một khối, giá trị đang được test được tô nổi, các dòng con đã trỏ sẵn tới dòng cha.',
          'Điều kiện về số dòng được tôn trọng: <code>HAVING COUNT(o.id) &gt; 3</code> tạo sẵn bốn dòng con, case join mồ côi thì không tạo dòng nào.',
          'Câu truy vấn cần chạy có kết quả mong đợi đặt ngay bên cạnh, nên lần chạy thủ công tự kiểm tra được.',
          'Mỗi giá trị mẫu cho biết nó ảnh hưởng tới đâu — <code>66 cells</code>, hoặc “not used by any case” — có ↺ để trả lại từng giá trị và Reset all cho tất cả; chúng được giữ qua các lần mở.',
          '<b>Giá trị mẫu</b>: đặt một tham số bind (<code>:min = 18</code>) thì các case biên của nó thành 17 / 18 / 19 thật; đổi giá trị mẫu của một cột thì mọi case và dữ liệu mẫu dùng cột đó đều đổi theo.',
          'Không sửa được khoá — chúng liên kết các dòng dữ liệu mẫu, và gõ đè lên sẽ phá vỡ đúng phép join mà dữ liệu mẫu được tạo ra để test.'
        ]
      },
      {
        title: 'Xuất',
        nav: 'Xuất',
        table: {
          head: ['Định dạng', 'Nội dung'],
          rows: [
            ['CSV', 'UTF-8 có BOM, mọi trường đều trong dấu nháy — mở gọn trong Excel (kể cả dấu tiếng Việt) và nhập được vào TestRail hoặc Jira.'],
            ['JSON', 'Các case cùng kết quả phân tích — bảng, join, điều kiện đã đánh số, tham số, findings, độ bao phủ — và các giá trị mẫu đang áp dụng. Có cả Copy JSON vào clipboard.'],
            ['Data CSV', 'Mỗi bảng một file, mỗi dòng dữ liệu mẫu được gắn với case mà nó thuộc về.'],
            ['Verify SQL', 'Câu truy vấn cho từng case, kèm kết quả mong đợi dưới dạng comment phía trên.']
          ]
        }
      }
    ],
    notes: [
      'CTE có case riêng, đánh dấu <code>CTE · tên ·</code>. Subquery lồng trong câu lệnh chỉ được báo — hãy dán riêng nó để có case của nó.',
      'Không có schema trực tiếp: kiểu dữ liệu của cột lấy từ giá trị literal trong phép so sánh trước, rồi tới tên cột. Khi cả hai đều không rõ, case sẽ ghi rõ điều đó.',
      'Kết quả mong đợi nêu điều mà ngữ nghĩa SQL yêu cầu, không phải dữ liệu hiện có của bạn.',
      'Giao diện mở bằng tiếng Anh và chuyển sang tiếng Việt qua nút quả địa cầu — case được sinh theo ngôn ngữ đang dùng, nên file xuất luôn khớp với màn hình.'
    ]
  },

  'db-test-session': {
    title: 'DB Test Session & Rollback',
    lead: 'Thoải mái thay đổi dữ liệu test trong Adminer — mọi thao tác ghi đều được lưu vào một phiên, và một click đưa cơ sở dữ liệu về như cũ, kèm câu SQL chính xác hiện ra trước khi chạy.',
    facts: [['8', 'loại thao tác ghi được lưu'], ['1 click', 'để rollback'], ['0', 'byte rời khỏi trình duyệt']],
    tabLabel: 'tab Tools',
    points: [
      'Bắt đầu phiên từ bảng nhỏ mà Adminer hiện ở góc dưới bên phải; chưa bắt đầu thì không có gì được ghi.',
      'Ghi lại form sửa, sửa ô trong lưới, xoá hàng loạt và xoá cả kết quả, sửa hàng loạt, các lệnh <code>INSERT</code> và <code>UPDATE</code>/<code>DELETE</code> bạn gõ ở trang SQL.',
      '↺ Roll back all, hoặc ↺ Undo last (<span class="kbd">Alt+Shift+Z</span>) cho thay đổi vừa làm — luôn có bản xem trước từng thay đổi và câu SQL bên dưới.',
      'Kiểm tra lệch dữ liệu đọc lại từng dòng trước: nếu có người sửa sau bạn, bạn thấy giá trị đã ghi và giá trị hiện tại cạnh nhau rồi chọn bỏ qua hoặc ghi đè.',
      '↷ Re-apply đưa lại giá trị của lần test khi một lần rollback hoá ra là quyết định sai.',
      'Từ chối những gì không hoàn tác an toàn được — và nêu lý do ngay trên thay đổi đó.'
    ],
    steps: [
      ['Mở Adminer', 'Một bảng nhỏ hiện ở góc dưới bên phải. Công tắc Adminer panel ở tab Tools bật/tắt bảng này.'],
      ['▶ Start session', 'Đặt tên cho lần test — từ đây mọi thao tác ghi đều được lưu.'],
      ['Test', 'Sửa, xoá và thêm dữ liệu như bình thường; mỗi thay đổi được ghi vào nhật ký của bảng.'],
      ['↺ Roll back all', 'Đọc bản xem trước câu SQL, xác nhận, và dữ liệu trở lại như cũ.']
    ],
    sections: [
      {
        title: 'Bên trong một phiên test',
        nav: 'Ảnh chụp',
        lead: 'Một phiên mẫu — áp mã giảm giá khi thanh toán, rồi hoàn tiền — từ bảng Adminer và trang quản lý.',
        images: [
          {
            alt: 'Bản xem trước Undo SQL mở từ bảng Adminer: công tắc Step by step / Merged, mỗi thay đổi một dòng tóm tắt với một UPDATE products bị bỏ qua được đánh dấu, và bảy câu lệnh UPDATE, INSERT, DELETE sẽ chạy; bên cạnh là bảng đang ghi, có nút Roll back all và Undo last cùng nhật ký các thay đổi đã ghi.',
            caption: '↺ Roll back all hiện câu SQL trước; không gì chạy tới khi bạn xác nhận.'
          },
          {
            alt: 'Trang Test sessions & rollback: danh sách phiên bên trái, bảy thay đổi của phiên đang chọn bên phải, với trước/sau của một DELETE trên cart_items và một UPDATE trên orders đang mở, và một thay đổi đã được hoàn tác.',
            caption: 'Trang quản lý: mọi phiên, trước và sau của từng thay đổi.'
          }
        ],
        points: [
          'Bảng luôn gọn: đang ghi hay không, bao nhiêu thay đổi, vài nút cần dùng giữa lúc test.',
          '<b>Merged</b> gộp A→B→C trên một dòng thành một câu lệnh đưa thẳng về A.',
          'Hoàn tác hoặc áp lại một thay đổi ngay trên dòng của nó, hoặc đánh dấu vài cái và chỉ rollback chúng.',
          'Xuất phiên ra <code>.sql</code> hoặc <code>.json</code>.',
          'Trang quản lý dùng chung khung với trang SQL và API: cột phiên bên trái thu gọn bằng ☰ hoặc ⟨.'
        ]
      },
      {
        title: 'Phiên qua nhiều lần chạy',
        nav: 'Phiên',
        lead: 'Một phiên sống lâu hơn lần test: kết thúc nó, rollback hôm nay, ghi tiếp ngày mai.',
        points: [
          '<b>■ End</b> giữ phiên trên bảng, vẫn cách Roll back all một lần bấm; <b>↻ Resume</b> ghi tiếp vào nó.',
          'Bấm tên phiên để xem mọi phiên của database này, lọc khi gõ — Enter để tiếp tục phiên đầu.',
          'Mỗi database chỉ một phiên ghi: bắt đầu hay tiếp tục phiên khác sẽ kết thúc nó, và báo trước.',
          'Rollback không dùng hết phiên: chạy lại bài test thì cùng thao tác hoàn tác lại được đề xuất.',
          '<b>↷ Re-apply</b> đưa giá trị của bài test trở lại — trừ SQL gõ tay, được liệt kê là bỏ qua kèm lý do.',
          'Khi đóng, bảng vẫn hiện <b>⚠ n</b> nếu có cảnh báo; <b>⇤</b> chuyển nó sang góc kia.'
        ]
      },
      {
        title: 'Những gì được ghi lại',
        nav: 'Những gì được ghi',
        lead: 'Giá trị cũ được đọc trước khi ghi, qua chính form sửa của từng dòng — không lấy từ lưới đã bị Adminer rút gọn.',
        table: {
          head: ['Nơi bạn thay đổi', 'Những gì được lưu', 'Hoàn tác bằng'],
          rows: [
            ['Form sửa dòng, “Save and continue”', 'Dòng trước mỗi lần lưu.', '<code>UPDATE</code> trở lại, chỉ cột đã đổi'],
            ['Delete trên form sửa', 'Toàn bộ dòng.', '<code>INSERT</code> lại'],
            ['Một ô được sửa trong lưới', 'Dòng đó, trước và sau.', '<code>UPDATE</code> trở lại'],
            ['Dòng đã đánh dấu hoặc cả kết quả → Delete', 'Mọi dòng khớp, không chỉ trang đang xem.', '<code>INSERT</code> lại'],
            ['Dòng đã đánh dấu → Edit', 'Từng dòng trước khi sửa.', '<code>UPDATE</code> trở lại'],
            ['<code>UPDATE</code> / <code>DELETE</code> ở trang SQL', 'Các dòng, đọc trước khi câu lệnh chạy.', '<code>UPDATE</code> / <code>INSERT</code> từng dòng'],
            ['<code>INSERT</code> — form, Clone, trang SQL', 'Khoá của dòng mới.', '<code>DELETE</code> đúng những dòng đó']
          ]
        }
      },
      {
        title: 'Cả bảng thì hỏi trước',
        nav: 'Cả bảng',
        lead: 'Trên trang SQL của Adminer, câu lệnh có thể đổi cả một bảng sẽ chờ bạn trả lời rồi mới chạy.',
        images: [{
          alt: 'Câu hỏi của bảng Adminer: This statement may change a whole table — DELETE orders: no WHERE, every row of the table is hit; câu lệnh sẽ chạy, DELETE FROM orders; và nút Copy, Cancel and fix it, Run anyway.',
          caption: 'DELETE không có WHERE: Run anyway, hoặc Cancel and fix it.'
        }],
        points: [
          '<b>Không có <code>WHERE</code></b>: mọi dòng của bảng đều bị đổi.',
          '<b><code>WHERE</code> khớp mọi dòng</b> — phát hiện khi đọc các dòng trước lúc chạy.',
          '<b>Nhiều dòng hơn giới hạn snapshot</b>: không rollback được.',
          '<b>Cancel and fix it</b> không chạy gì và giữ câu lệnh trong ô soạn; <b>Run anyway</b> gửi nó đi.'
        ]
      },
      {
        title: 'An toàn từ thiết kế',
        nav: 'An toàn',
        lead: 'Không phải transaction — Adminer mở kết nối mới mỗi request — mà là changeset phát ngược thành SQL bạn đọc trước.',
        points: [
          '<b>Kiểm tra lệch dữ liệu</b>: mỗi dòng được đọc lại trước khi hoàn tác; chỉ so các cột bạn đã ghi.',
          '<b>Từ chối</b>, và ghi rõ trên thay đổi: không có khoá, hai bảng, không <code>WHERE</code>, cột BLOB, nhập CSV trong lưới, quá giới hạn dòng.',
          'Mới nhất trước, mỗi lần gửi một thay đổi, dừng ở lỗi đầu tiên.',
          'Chạy từ tab Adminer, nơi có cookie phiên — hoặc <b>Copy undo SQL</b> rồi tự chạy.',
          'Một changeset thuộc về một database và không bao giờ được đề xuất trên database khác.'
        ]
      },
      {
        title: 'Cài đặt và giới hạn',
        nav: 'Cài đặt',
        lead: 'Settings của trang quản lý — cho nhóm có database hay quy tắc khác.',
        images: [{
          alt: 'Hộp thoại Settings của trang Test sessions: bật tích hợp Adminer, cho tiện ích tự chạy undo SQL, đọc lại dòng trước khi hoàn tác, mặc định gộp câu lệnh theo dòng, chụp dòng trước câu lệnh gõ tay, giới hạn 200 dòng, giới hạn quét khoá INSERT 10000, và menu Force engine.',
          caption: 'Settings trên trang Test sessions.'
        }],
        points: [
          'Để tiện ích tự chạy undo SQL, hoặc chỉ hiện ra cho bạn tự chạy.',
          'Tắt kiểm tra lệch dữ liệu, hoặc đặt Merged làm mặc định.',
          'Giới hạn dòng mỗi câu lệnh (200) và bảng lớn nhất được quét tìm khoá của INSERT (10 000).',
          'Engine tự nhận — MySQL, PostgreSQL, SQL Server, SQLite, Oracle — hoặc chỉ định.'
        ]
      }
    ],
    notes: [
      'Chỉ thao tác ghi qua Adminer mới được lưu — thay đổi do chính ứng dụng của bạn tự làm không có trong nhật ký.',
      'Tiện ích sẽ báo khi không khôi phục được: cột có <code>ON UPDATE CURRENT_TIMESTAMP</code>, hoặc dòng bị xoá bởi <code>ON DELETE CASCADE</code>.',
      'Tìm các dòng của một <code>INSERT</code> bằng cách so sánh khoá cũng có thể bắt nhầm dòng người khác thêm trong cùng giây — những dòng đó được đánh dấu “found by difference”.',
      'Không có gì rời khỏi trình duyệt: changeset nằm trong bộ nhớ cục bộ của tiện ích.'
    ]
  },

  'api-tests': {
    title: 'API Tests',
    lead: 'Giữ request API cạnh bài test giao diện: dán một cURL, gửi đi, kiểm tra response — và chạy cả thư mục với token mà một request đã lưu.',
    facts: [['5', 'loại kiểm tra'], ['v2.1', 'xuất &amp; nhập Postman'], ['CSV', 'kết quả chạy']],
    tabLabel: 'tab Tools',
    points: [
      'Dán cURL từ DevTools — method, URL, header và body tự điền; Copy cURL làm chiều ngược lại.',
      'Kiểm tra status, JSON path, header, body và thời gian — mỗi lần Send một kết luận.',
      'Môi trường cho từng server, và giá trị lưu từ response, như token đăng nhập.',
      'Auth đặt một lần trên thư mục — Bearer, Basic hoặc API key — dùng chung cho các request.',
      'Chạy cả thư mục từng request một; hỏi trước mọi thao tác ghi và nêu tên host.',
      'Xuất sang Postman để chạy Newman trong CI, và nhập lại collection Postman.'
    ],
    steps: [
      ['Mở công cụ', 'Tools → API Tests → <b>Manage API tests</b> mở một tab riêng.'],
      ['Thêm request', '<b>＋ Request</b>, hoặc <b>Paste cURL</b> từ DevTools → Network → Copy as cURL.'],
      ['Kiểm tra', 'Thêm check, hoặc bấm vào một key trong JSON response để kiểm tra nó.'],
      ['Chạy', 'Send từng cái, hoặc <b>▶ Run folder</b>; lưu kết quả ra CSV hoặc thư mục cho Postman.']
    ],
    sections: [
      {
        title: 'Gửi request và đọc response',
        nav: 'Gửi',
        lead: 'Request mở cạnh thư mục của nó: sáu tab ở trên, câu trả lời ở dưới. Cột thư mục thu gọn được (☰, ⟨), như ở trang SQL và DB.',
        images: [{
          alt: 'Request Get order: GET ${baseUrl}/orders/42 trong thư mục Shop, tab Headers có Accept: application/json, các nút thêm nhanh Accept JSON, Bearer token, No cache, và cookie của trình duyệt ở mục Also sent; bên dưới là response — Passed, 200 OK trong khoảng 100 ms, 194 B đã giải nén, và URL đã điền biến.',
          caption: 'Get order đã gửi: Passed, 200 OK trong khoảng 100 ms.'
        }],
        points: [
          'Đủ method, cả <b>OPTIONS</b>; body dạng <b>JSON</b>, <b>Form</b> hoặc <b>Text</b>, và <b>Format</b> căn lại JSON.',
          '<b>Paste cURL</b> từ DevTools điền sẵn một request; <b>Copy cURL</b> làm chiều ngược lại, biến đã điền.',
          'Header dạng bảng: bỏ tick để giữ mà không gửi, <b>Bulk edit</b> dán nhiều dòng, gõ <code>${</code> để gợi ý biến.',
          'Status, thời gian và kích thước; ảnh hay file được hiện ra, hoặc lưu bằng <b>Download</b>.',
          'Không vướng CORS; cookie của site được gửi kèm, trừ khi tắt ở tab <b>Settings</b>.'
        ]
      },
      {
        title: 'Check và kết luận',
        nav: 'Check',
        lead: 'Mỗi request được kiểm tra ở mỗi lần Send — không có check thì phải trả về 2xx.',
        images: [{
          alt: 'Request List paid orders, tab Checks: status is 200 đạt; JSON total = 3 sai, kèm “Expected total = "3", got 2”; time dưới 500 đạt. Response ghi Failed cùng lý do đó, và 200 OK.',
          caption: 'Một trong ba check không đúng: Failed, kèm lý do.'
        }],
        points: [
          '<b>Status</b> <code>201</code>, <code>2xx</code>, <code>200,201</code>, <code>not5xx</code>; <b>JSON path</b> =, contains, exists, does not exist, &gt;, &lt;.',
          '<b>Header</b> exists, = hoặc contains; <b>body</b> có hoặc không chứa; tổng <b>thời gian</b> dưới một ngưỡng.',
          'Bấm vào một key trong JSON response để biến nó thành check; giá trị mong đợi dùng được <code>${var}</code>.',
          '<b>Failed</b>: có check sai — API sai. <b>Broken</b>: không có response, quá thời gian, không phải JSON — bài test sai.'
        ]
      },
      {
        title: 'Môi trường, giá trị lưu và auth',
        nav: 'Môi trường',
        lead: 'Đăng nhập một lần; mọi request sau đó đều gửi token.',
        images: [{
          alt: 'Dialog Environments: Dev đang dùng, và Staging. Dev đặt baseUrl là https://api.shop.example, email, password và token. Ở mục From the Data tab, email của tab Tools bị gạch kèm “set here”, còn locale en-US vẫn được dùng.',
          caption: 'email của Dev thắng email ở tab Tools; locale vẫn lấy từ tab Tools.'
        }],
        points: [
          '<code>${name}</code> lấy từ biến ở tab Tools, rồi từ môi trường đang dùng — môi trường thắng.',
          '<b>Save values</b> ghi một JSON path, header, status hoặc một phần body vào môi trường.',
          'Request đăng nhập lưu <code>token</code>; <b>Bearer</b> <code>${token}</code> của thư mục gửi nó cho mọi request sau.',
          '<b>Auth</b> trên thư mục hoặc một request: Bearer, Basic, hoặc API key ở header hay query.'
        ]
      },
      {
        title: 'Chạy nhiều request',
        nav: 'Chạy',
        lead: 'Từng request một, nên giá trị một request lưu sẵn có cho request sau.',
        images: [{
          alt: 'Thư mục Shop sau Run folder, với “Last run · 3 passed · 1 failed · 1 broken”: Log in POST đạt; Get order GET đạt; List paid orders GET sai, “Expected total = "3", got 2”; Cancel order DELETE đạt, 204; Daily report GET bị broken, “The response is not JSON”.',
          caption: 'Chạy một thư mục: 3 passed, 1 failed, 1 broken — mỗi cái nói rõ vì sao.'
        }],
        points: [
          '<b>▶ Run folder</b>, Run all, <b>Run N shown</b> sau khi lọc, Run selected, hoặc Send trên một hàng.',
          'Lần chạy có POST, PUT, PATCH hay DELETE sẽ hỏi trước, nêu tên host; ⏹ Stop để dừng.',
          'Mỗi request giữ kết quả lần chạy cuối, kể cả sau khi đóng trang; lọc danh sách theo nó.',
          '<b>Export ▾ → Results</b> lưu chúng ra CSV.'
        ]
      },
      {
        title: 'Postman và CI',
        nav: 'Postman',
        lead: 'Thư mục xuất cho Postman chạy được trong CI bằng Newman; collection Postman nhập ngược lại được.',
        images: [{
          alt: 'Import from Postman với một collection đã chọn: Shop API — 4 thư mục, 7 request. Requests go to shop.example.com, auth.partner.test và admin.shop.example.com. Left out or changed: script không chạy, auth oauth2 chuyển thành None, field form bị bỏ, body GraphQL gửi dạng JSON, PURGE gửi thành GET. Ô Also add the environment đã tick.',
          caption: 'Trước khi thêm: request sẽ đi đâu, và những gì bị bỏ.'
        }],
        points: [
          'Collection v2.1: <code>${x}</code> thành <code>{{x}}</code>, check và giá trị lưu thành test script.',
          'Token và mật khẩu viết thẳng sẽ để trống, trừ khi tick Include secret values.',
          'Trong CI: <code>npx newman run Shop.postman_collection.json</code>.',
          'Nhập collection v2.0 / v2.1 hoặc file môi trường: host và những gì bị bỏ hiện ra trước; script của Postman không bao giờ chạy.'
        ]
      }
    ],
    notes: [
      'Không đặt được Cookie, Origin, Host, Referer và User-Agent: cookie của chính trình duyệt được gửi kèm.',
      'Request không phải GET mang <code>Origin: chrome-extension://…</code> — server chặn CSRF theo Origin có thể trả 403.',
      '<code>Set-Cookie</code> ghi thật vào trình duyệt: gọi logout là đăng xuất thật.',
      'Không tắt kiểm tra SSL, không client certificate, không proxy; luôn đi theo redirect. Thời gian chỉ có tổng, kích thước là sau khi giải nén.',
      'Môi trường giữ token và mật khẩu nguyên văn: dialog Environments hiện chúng, file Backup mang theo chúng. Nhãn trong trang API Tests là tiếng Anh.'
    ]
  },
  settings: {
    title: 'Phím tắt, sao lưu & cài đặt',
    lead: 'Những thứ bạn chỉ đặt một lần: phím tắt cho việc ghi và mọi kiểu chụp, thông báo theo từng loại, nhập/xuất và sao lưu toàn bộ — trong một popup nhớ cách bạn làm việc.',
    facts: [['10', 'phím tắt đổi được'], ['4', 'loại thông báo'], ['1 file', 'sao lưu toàn bộ']],
    tabLabel: 'tab Settings',
    points: [
      'Mọi phím tắt đều đổi được, và thiết lập được đồng bộ theo hồ sơ Chrome của bạn.',
      'Nhập và xuất kịch bản hoặc cả thư mục dưới dạng JSON; sao lưu và khôi phục toàn bộ dữ liệu trong một file.',
      'File nhập có bước Run JS hoặc Upload File sẽ cảnh báo trước, nêu rõ các thư mục mà bước tải file sẽ đọc.',
      'Thông báo theo từng loại — kết quả chạy, lỗi và cảnh báo, kết quả chụp, lần chạy theo lịch — cả bốn loại bật sẵn.',
      'Giao diện sáng và tối; kéo năm tab theo thứ tự bạn muốn, và tab dùng gần nhất sẽ mở lại.',
      'Nút <b>?</b> trên mỗi thẻ mở một hướng dẫn ngắn, bằng tiếng Việt hoặc tiếng Anh.'
    ],
    steps: [
      ['Đặt phím tắt', 'Settings → Hotkeys: bấm Set rồi nhấn tổ hợp phím mới.'],
      ['Tinh chỉnh việc chụp', 'Chế độ lưu (tự động hoặc hỏi), tiền tố tên file, watermark, đếm ngược và tốc độ cuộn khi chụp segment.'],
      ['Chọn thông báo', 'Cả bốn loại bật sẵn; bỏ chọn loại bạn không cần.'],
      ['Sao lưu', 'Backup / Restore lưu mọi thứ vào một file — khôi phục được trên bất kỳ máy nào.']
    ],
    sections: [
      {
        title: 'Turn on, Turn off và mọi tab',
        nav: 'Turn on',
        lead: 'Pocket QA tắt trên mỗi tab cho tới khi bạn bật nó ở đó — để phím tắt không bao giờ bắt phím trên một trang bạn không định dùng.',
        images: [{
          alt: 'Câu hỏi Start Recording hiện ra trên tab Pocket QA đang tắt: Off on this tab — Pocket QA is off on this tab. Turn it on to record, play or pick elements here — it stays on for this tab until you turn it off or close the tab. Nút Cancel, Turn on, và link Not ask again: Allow on all tabs in Settings →.',
          caption: 'Record, Play, Sequence, chạy CSV hay 🎯 Pick hỏi một lần cho mỗi tab.'
        }],
        points: [
          'Thanh trạng thái ghi <b>Active</b> kèm nút <b>Turn off</b>, hoặc <b>Off on this tab</b> kèm nút <b>Turn on</b>.',
          'Tab đã bật giữ nguyên trạng thái cho tới khi bạn tắt hoặc đóng tab; Turn off tải lại trang, mọi kịch bản vẫn còn.',
          '<b>Settings → Tabs → Allow on all tabs</b> bật cho mọi trang web cùng lúc — thanh trạng thái khi đó ghi <b>Active · all tabs</b>.',
          'Trang của trình duyệt — New Tab, Settings, Web Store — vẫn không dùng được trong cả hai trường hợp.'
        ]
      },
      {
        title: 'Phím tắt mặc định',
        nav: 'Phím tắt',
        table: {
          head: ['Hành động', 'Mặc định'],
          rows: [
            ['Start / Stop Recording', '<span class="kbd">Alt+R</span> / <span class="kbd">Alt+S</span>'],
            ['Screenshot&nbsp;(Visible)', '<span class="kbd">Alt+P</span>'],
            ['Screenshot (Full Page)', '<span class="kbd">Alt+Shift+F</span>'],
            ['Screenshot (Scroll V / H)', '<span class="kbd">Alt+V</span> / <span class="kbd">Alt+H</span>'],
            ['Segment V / H — Start', '<span class="kbd">Alt+Shift+V</span> / <span class="kbd">Alt+Shift+H</span>'],
            ['Segment — Stop &amp; Capture', '<span class="kbd">Alt+X</span>'],
            ['Screenshot&nbsp;(Element)', '<span class="kbd">Alt+E</span>']
          ]
        },
        points: [
          'Bấm Set rồi bấm chính tổ hợp phím; Esc để huỷ. Reset to defaults đưa tất cả về mặc định.',
          'Chỉ phản hồi lần bấm phím thật, trên trang http, https và file; Start/Stop cần tab đã bật Pocket QA.',
          'Trong Adminer, <span class="kbd">Alt+Shift+Z</span> hoàn tác thay đổi cơ sở dữ liệu vừa được ghi.'
        ]
      },
      {
        title: 'Nhập, xuất và sao lưu',
        nav: 'Sao lưu',
        lead: 'Import / Export chuyển kịch bản. Backup / Restore chuyển tất cả.',
        images: [{
          alt: 'Thẻ Backup / Restore trong tab Settings: Backup All Data, ô chọn file và Restore All Data.',
          caption: 'Backup / Restore trong tab Settings.'
        }],
        points: [
          '<b>Import / Export</b>: một kịch bản hay cả thư mục dạng JSON; file thư mục tạo lại thư mục đó.',
          '<b>Backup</b>: kịch bản, thư mục, biến, đánh dấu và mẫu URL, lịch hẹn, cài đặt.',
          '<b>Restore</b> ghi đè chứ không gộp — và bỏ qua những gì thuộc về máy cũ.',
          'File nhập có bước Run JS hoặc Upload File sẽ cảnh báo trước, nêu tên thư mục nó sẽ đọc.'
        ]
      },
      {
        title: 'Thông báo & cập nhật',
        nav: 'Cập nhật',
        points: [
          '<b>Lần chạy đạt hoặc bị dừng</b> — phát lại, sequence, CSV.',
          '<b>Lỗi &amp; cảnh báo</b> — lần chạy hoặc hành động bị lỗi, lần chạy tạm dừng, tab bị đóng, bộ nhớ đầy.',
          '<b>Kết quả chụp</b> — nơi ảnh chụp được lưu, khi popup đang đóng.',
          '<b>Lần chạy theo lịch</b> tự bắt đầu.',
          'Thẻ Version hiện phiên bản đã cài, phiên bản mới nhất trên store và lần kiểm tra gần nhất — tự động mỗi ngày một lần, qua cơ chế kiểm tra cập nhật của chính Chrome.'
        ]
      }
    ],
    notes: [
      'Khi một phiên bản mới đã có trên store quá thời gian ân hạn, một banner đếm ngược 5 ngày cuối; sau đó, việc bắt đầu lần chạy và lần chụp mới phải chờ cập nhật — dừng, xuất và sao lưu thì luôn hoạt động.',
      'Popup nhớ tab mở gần nhất, thứ tự các tab và những thẻ bạn đã thu gọn.',
      'Mọi thứ được lưu cục bộ trong trình duyệt; chỉ cài đặt — phím tắt, cách đặt tên ảnh chụp, công tắc thông báo — được đồng bộ qua hồ sơ Chrome của bạn.'
    ]
  }
};
