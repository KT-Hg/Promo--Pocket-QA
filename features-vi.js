/**
 * features-vi.js — Vietnamese text of the feature pages. Same shape as FEATURES_EN in
 * features-en.js, translatable strings only: icon, tab, image src and code samples come from the English
 * object. Anything missing here falls back to English (feature.js). UI labels stay in English, as the popup
 * shows them (Start Recording, Add Manual Action, Passed / Failed…).
 */
var FEATURES_VI = {
  recording: {
    eyebrow: 'Record & Play',
    title: 'Ghi lại bằng một click',
    lead: 'Kích hoạt Pocket QA trên một tab, bấm Start Recording rồi làm thao tác một lần. Mỗi cú click và mỗi ô bạn nhập liệu đều thành một bước sửa được — không phải tự viết selector.',
    facts: [['17', 'loại hành động'], ['8', 'selector lưu cho mỗi phần tử'], ['50', 'bước hoàn tác']],
    tabLabel: 'tab Record & Play',
    points: [
      'Ghi lại click và dữ liệu nhập — thao tác gõ được gộp thành một bước cho mỗi ô, và chữ gõ ngay trước một cú click được ghi trước cú click đó.',
      'Chỉ tab bắt đầu ghi mới được ghi lại, và các cú click do chính script của trang tự phát ra bị bỏ qua: kịch bản chỉ chứa những gì <em>bạn</em> đã làm.',
      'Mọi thứ khác là một trong 17 loại hành động, thêm bằng <b>Add Manual Action</b> — hover, dropdown, kéo thả, chờ, Run JS, điều kiện, assert, switch, Read DOM, chụp màn hình và tải file lên.',
      'Mọi bước đều sửa được: chỉnh selector, đổi giá trị, đặt nhãn, tắt bước, hoặc kéo sang vị trí mới.',
      'Hoàn tác/làm lại tối đa 50 bước trong lúc sửa; lịch sử được xoá khi bạn bắt đầu kịch bản mới hoặc mở một kịch bản khác.',
      '🎯 <b>Pick element</b> chọn phần tử đích ngay trên trang thay vì phải viết selector.'
    ],
    steps: [
      ['Kích hoạt tab', 'Mở popup trên trang muốn tự động hoá và bấm <b>Activate</b> ở thanh trạng thái.'],
      ['Ghi lại', 'Bấm <b>▶ Start Recording</b> (<span class="kbd">Alt+R</span>) và làm thao tác một lần — click và nhập liệu được ghi ngay khi bạn làm.'],
      ['Dừng &amp; lưu', 'Bấm <b>■ Stop</b> (<span class="kbd">Alt+S</span>), đặt tên kịch bản và xếp vào một thư mục.'],
      ['Tinh chỉnh', 'Thêm những gì bộ ghi không thấy được — hover, thời gian chờ, Assert — bằng Add Manual Action, rồi kéo vào đúng chỗ.']
    ],
    sections: [
      {
        title: 'Thao tác trên trang và điều khiển',
        nav: 'Trang &amp; điều khiển',
        lead: 'Tổng cộng mười bảy khối xây dựng. Click và Input được ghi tự động; số còn lại lấy từ form Add Manual Action, mỗi loại có các trường riêng.',
        table: {
          head: ['Hành động', 'Nhóm', 'Chức năng'],
          rows: [
            ['Click', 'Trang', 'Một cú click chuột lên phần tử đích.'],
            ['Input', 'Trang', 'Đặt giá trị cho ô nhập và phát <code>input</code>, <code>change</code>, <code>blur</code> như khi người dùng gõ.'],
            ['Hover', 'Trang', 'Phát <code>mouseover</code>, <code>mouseenter</code> và <code>mousemove</code> — mở menu và tooltip.'],
            ['Dropdown (open / choose item)', 'Trang', 'Một cú click thật, tin cậy cho các dropdown bỏ qua click giả lập, kèm tuỳ chọn <b>Choose item #</b>.'],
            ['Drag &amp; Drop', 'Trang', 'Kéo thả HTML5 từ selector nguồn sang selector đích.'],
            ['Navigate', 'Điều&nbsp;khiển', 'Mở một URL — dùng được <code>${variables}</code>.'],
            ['Wait', 'Điều&nbsp;khiển', 'Tạm dừng một số mili giây.'],
            ['Run JS', 'Điều&nbsp;khiển', 'Chạy script của bạn trên trang, kể cả khi Content Security Policy của trang chặn script inline.']
          ]
        }
      },
      {
        title: 'Logic và dữ liệu',
        nav: 'Logic &amp; dữ liệu',
        lead: 'Những bước biến một bản ghi thành bài test: kiểm tra, rẽ nhánh, đọc dữ liệu trang, chụp ảnh và tải file lên.',
        table: {
          head: ['Hành động', 'Nhóm', 'Chức năng'],
          rows: [
            ['Condition (If)', 'Logic', 'Một trong 12 phép kiểm tra; khi sai, N bước tiếp theo bị bỏ qua.'],
            ['Assert (Expect)', 'Logic', 'Cũng 12 phép kiểm tra đó nhưng bắt buộc đúng — phép nào sai được ghi nhận và lần chạy vẫn tiếp tục.'],
            ['Switch (branch)', 'Logic', 'Chọn một kịch bản, một bước nhảy hoặc một khối bước theo giá trị của biến.'],
            ['Read DOM → Variable', 'Dữ liệu', 'Lưu chữ, giá trị ô nhập hoặc một thuộc tính trên trang vào biến.'],
            ['Screenshot&nbsp;(Visible)', 'Dữ liệu', 'Chụp vùng đang hiển thị.'],
            ['Screenshot (Full Page)', 'Dữ liệu', 'Chụp toàn bộ trang thành một ảnh.'],
            ['Screenshot&nbsp;(Element)', 'Dữ liệu', 'Chụp đúng khung của một phần tử.'],
            ['Screenshot → Variable (CSV)', 'Dữ liệu', 'Chụp vào một biến, để ảnh của từng dòng CSV nằm trong kết quả.'],
            ['Upload File', 'Dữ liệu', 'Đưa file trên máy vào <code>&lt;input type="file"&gt;</code> hoặc vùng kéo thả.']
          ]
        }
      },
      {
        title: 'Selector vẫn chạy khi giao diện đổi',
        nav: 'Selector',
        lead: 'Khi ghi, tối đa tám selector dự phòng được lưu cho mỗi phần tử. Lúc phát lại, chúng được thử từ chính xác nhất trở xuống cho tới khi tìm thấy — nên một class bị đổi tên hay một nút bị dời chỗ hiếm khi làm hỏng lần chạy.',
        table: {
          head: ['#', 'Chiến lược', 'Tìm theo'],
          rows: [
            ['1', 'Full XPath', 'Đúng vị trí đã ghi trong tài liệu.'],
            ['2', 'ID', '<code>getElementById</code> — luôn là duy nhất.'],
            ['3', 'XPath', 'XPath tương đối, neo vào id gần nhất.'],
            ['4', 'CSS', 'Đường dẫn CSS được tính ra.'],
            ['5', 'CSS xuyên shadow&nbsp;root', 'Cùng đường dẫn đó, đi vào các shadow root mở (LitElement, Stencil, …).'],
            ['6', 'data-testid', '<code>[data-testid="…"]</code>'],
            ['7', 'data-id', '<code>[data-id="…"]</code>'],
            ['8', 'Name', '<code>[name="…"]</code>'],
            ['9', 'Text', 'Khớp chính xác chữ trên thẻ đã ghi — cho link, nút và tiêu đề dài tối đa 50 ký tự.']
          ]
        },
        points: [
          'Loại selector bạn chọn trong form — CSS, XPath, Full XPath, ID, Name hoặc Text — luôn được thử trước; các loại còn lại giữ thứ tự này.',
          'Id không ổn định bị loại ngay khi ghi — id kiểu <code>:r0:</code> của React và UUID đổi sau mỗi lần tải trang.',
          'Chưa tìm thấy? Khi phát lại, tiện ích chờ phần tử xuất hiện, tối đa tới thời gian chờ, thay vì báo lỗi trên một trang chậm.',
          '<code>${variables}</code> dùng được trong mọi selector, nên một bước có thể nhắm vào một dòng khác ở mỗi lần chạy.'
        ]
      },
      {
        title: 'Chọn, nhắm và sắp xếp',
        nav: 'Chọn & sắp xếp',
        lead: 'Các công cụ quanh bộ ghi giúp kịch bản vẫn dễ đọc sau lần sửa thứ mười.',
        points: [
          '🎯 <b>Pick element</b>: rê chuột trên trang rồi click — các trường selector tự điền, kể cả trong iframe.',
          '<b>Child Condition</b> nhắm vào một khung chứa và tìm đúng phần tử con theo giá trị, chữ, id, class hoặc loại ô nhập — cho danh sách và bảng có các dòng hay đổi chỗ. Dùng được với Click, Input, Hover và Read DOM.',
          'Nhãn đặt tên cho bước bằng lời thường; nhãn hiện trong danh sách, trong code xuất ra và trong bug report.',
          'Bước bị tắt vẫn nằm trong danh sách với số thứ tự của nó, nên tắt một bước không làm đánh số lại các bước khác.',
          'Kịch bản nằm trong thư mục — đổi tên, nhân bản, di chuyển hoặc xoá, và sắp xếp theo mới nhất, cũ nhất hoặc theo tên.',
          'Gõ <code>${</code> vào bất kỳ trường nào sẽ gợi ý các biến dùng được ở đó.'
        ]
      }
    ],
    notes: [
      'Bộ ghi chỉ ghi click và nhập liệu. Hover, chờ và kéo thả được thêm bằng tay, nên bản ghi không bao giờ đầy những chuyển động chuột thừa.',
      'Ghi và phát lại cần kích hoạt tab trước — thanh trạng thái cho biết tab đã được kích hoạt chưa.',
      'Phím tắt Start/Stop chỉ hoạt động trên tab đã kích hoạt và chỉ với lần bấm phím thật: trang web không thể tự bắt đầu ghi bằng cách giả lập phím.'
    ]
  },

  playback: {
    eyebrow: 'Record & Play',
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
      'Bảng tiến trình cho thấy bước đang chạy, và một thông báo cho biết lần chạy kết thúc ra sao.'
    ],
    steps: [
      ['Chọn kịch bản', 'Chọn trong Manage Scenarios — hoặc chọn nhiều, theo thứ tự, trong Sequence Scenarios.'],
      ['Chọn cách chạy', 'Đặt số vòng lặp và thời gian nghỉ, hoặc một giờ chạy trong Data → Scheduled Playback.'],
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
            ['Hẹn lịch', 'Data → Scheduled Playback', 'Bắt đầu kịch bản vào giờ đã đặt, một lần hoặc mỗi ngày, từ một alarm chạy nền.'],
            ['Chạy theo&nbsp;CSV', 'Data → <span class="nw">CSV Data-Driven Run</span>', 'Chạy một lần cho mỗi dòng của file CSV — xem <a href="feature.html?id=csv">Chạy theo dữ liệu CSV</a>.']
          ]
        }
      },
      {
        title: 'Làm cho trang web thật',
        nav: 'Trang thật',
        lead: 'Những bước thường buộc công cụ ghi phải quay về code viết tay thì ở đây được hỗ trợ đầy đủ.',
        points: [
          '<b>Dropdown → Choose item #</b> chọn mục theo vị trí: đếm từ 1 như danh sách hiển thị, <code>-1</code> cho mục cuối, <code>random</code> cho một mục bất kỳ đang bật, hoặc một <code>${variable}</code>.',
          'Danh sách ảo hoá (<span class="nw">react-window</span>, MUI) được cuộn cho tới khi mục cần chọn thật sự được render.',
          '<b>Upload File</b> đưa file trên máy vào <code>&lt;input type="file"&gt;</code> hoặc vùng kéo thả — nhiều file cùng lúc, tên file dùng được <code>${variable}</code>.',
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
      'Lần chạy theo lịch dùng alarm của Chrome, nên Chrome phải đang mở vào giờ đã hẹn.',
      'Chụp cửa sổ không thể là một bước phát lại — bạn phải tự chọn cửa sổ. Các hành động Screenshot đã có chụp vùng hiển thị, cả trang và phần tử.'
    ]
  },

  'run-results': {
    eyebrow: 'Record & Play',
    title: 'Assertion, kết quả & bug report',
    lead: 'Mỗi lần chạy kết thúc bằng một kết luận — ✓ Passed, ✗ Failed, ⚠ Test broken hoặc ⏹ Stopped. Khi không đạt, bug report kèm các bước tái hiện và ảnh chụp lúc lỗi chỉ cách một cú click.',
    facts: [['12', 'loại kiểm tra'], ['4', 'kết luận'], ['5 s', 'Assert chờ trang tải']],
    tabLabel: 'tab Record & Play',
    points: [
      '<b>Assert (Expect)</b> kiểm tra những gì trang phải hiển thị — một phần tử, một đoạn chữ, một giá trị, URL, class hoặc thuộc tính: tổng cộng 12 phép kiểm tra.',
      'Assert có chờ: kiểm tra mỗi 250 ms trong tối đa 5 giây, nên trang còn đang tải không bị tính là lỗi.',
      'Assert là kiểm tra mềm: phép nào sai được ghi nhận và lần chạy vẫn tiếp tục — lần chạy CSV hay theo lịch không bao giờ bị kẹt ở hộp hỏi.',
      'Lỗi đầu tiên quyết định kết luận. Một cú click hỏng làm Assert kế tiếp sai là bài test hỏng, không phải ứng dụng lỗi.',
      'Thẻ <b>Last run</b> ở đầu tab Record &amp; Play liệt kê mọi lỗi — bấm vào một lỗi để nhảy tới bước đó.',
      '📋 <b>Bug report</b> viết sẵn issue cho bạn: các bước tái hiện, URL, môi trường và ảnh chụp để đính kèm.'
    ],
    steps: [
      ['Thêm Assert', 'Add Manual Action → Assert (Expect): chọn phép kiểm tra, phần tử và giá trị mong đợi.'],
      ['Chạy', 'Play, lặp, sequence, CSV hay hẹn lịch — Assert không bao giờ làm lần chạy tạm dừng.'],
      ['Xem kết luận', 'Trong thông báo, trên huy hiệu ở thanh công cụ và trên thẻ Last run.'],
      ['Báo lỗi', '📋 Bug report → <b>Copy</b> phần Markdown, <b>Download screenshot</b>, rồi dán cả hai vào công cụ quản lý lỗi.']
    ],
    sections: [
      {
        title: 'Bốn kết luận, một quy tắc',
        nav: 'Kết luận',
        lead: 'Lỗi đầu tiên quyết định — nó thường là nguyên nhân của mọi lỗi phía sau.',
        table: {
          head: ['Kết luận', 'Khi nào'],
          rows: [
            ['✓ Passed', 'Không có lỗi và lần chạy đi tới cuối.'],
            ['✗ Failed', 'Lỗi đầu tiên là một Assert sai — trang hiển thị sai.'],
            ['⚠ Test&nbsp;broken', 'Lỗi đầu tiên là thứ khác — không tìm thấy phần tử, lỗi script, khối bước hỏng. Bài test không kiểm tra được.'],
            ['⏹ Stopped', 'Không có lỗi nhưng lần chạy chưa tới cuối — bạn đã dừng nó, hoặc tab của nó bị đóng. Không bao giờ được tính là Passed.']
          ]
        },
        points: [
          '<b>Thông báo</b>: <code>✗ Failed — "Checkout"</code>, kèm số phép kiểm tra sai và số bước bị hỏng.',
          '<b>Huy hiệu</b>: ✗ đỏ, ! vàng hoặc ■ xám trên biểu tượng ở thanh công cụ cho tới lần chạy sau, hoặc tới khi bạn mở popup.',
          '<b>Lần chạy CSV</b>: kết luận của từng dòng nằm trong cột Run Result riêng — <code>12 passed · 2 failed · 1 broken</code>.',
          '<b>Sequence</b> có một kết luận chung, xét lỗi của từng kịch bản theo thứ tự.'
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
        },
        points: [
          'Assert sai sẽ cho biết nó mong đợi gì và trang thực tế có gì: <code>Expected text "Saved", got "Error"</code>.',
          'Phép kiểm tra chữ, giá trị, class hoặc thuộc tính mà không có phần tử thì được tính là <b>broken</b>, không phải failed — bài test không kiểm tra được.',
          'Giá trị của ô mật khẩu không bao giờ rời khỏi trang: Assert của nó chỉ báo là không khớp.'
        ]
      },
      {
        title: 'Bug report tự viết',
        nav: 'Bug report',
        lead: 'Trên thẻ Last run của một lần chạy failed hoặc broken, 📋 Bug report mở ra Markdown sẵn sàng cho Jira, GitHub hay bất kỳ công cụ nào đọc được Markdown.',
        points: [
          'Lỗi đầu tiên, URL của trang, thời điểm xảy ra (và ở vòng lặp nào), kết quả, trình duyệt, hệ điều hành và phiên bản Pocket QA.',
          '<b>Các bước tái hiện</b> viết thành câu — bước bị Condition bỏ qua được lược đi, nhánh Switch đã chạy được giữ lại.',
          'Giá trị được ẩn (•••) — những gì đã gõ, tải lên hoặc so sánh — cho tới khi bạn đánh dấu <b>Include typed values</b>; lựa chọn này không bao giờ được ghi nhớ.',
          'Ảnh chụp là trang ở đúng thời điểm lỗi đầu tiên xảy ra, chụp trước khi hộp hỏi lỗi kịp che mất.'
        ]
      }
    ],
    notes: [
      'Báo cáo mẫu phía trên chỉ để minh hoạ — bố cục là thật, còn cửa hàng và các giá trị là giả định.',
      'Không có ảnh chụp khi tab của lần chạy không nằm phía trước (chạy nền); báo cáo ghi rõ điều đó thay vì đính kèm nhầm trang.',
      'Sequence và lần chạy CSV không tạo thẻ Last run — kết quả nằm trong thông báo và trong file CSV xuất ra.',
      'Tên biến luôn hiện trong báo cáo (<code>${password}</code>); giá trị chỉ hiện khi đã đánh dấu Include typed values.'
    ]
  },

  variables: {
    eyebrow: 'Tab Data',
    title: 'Biến & logic',
    lead: 'Biến một bản ghi dùng một lần thành script thật: biến dùng lại ở mọi nơi dưới dạng <code>${var}</code>, giá trị đọc từ trang ngay lúc chạy, cùng điều kiện và switch rẽ nhánh theo chúng.',
    facts: [['4', 'loại biến'], ['12', 'phép kiểm tra điều kiện'], ['3', 'lớp ưu tiên']],
    tabLabel: 'tab Data',
    points: [
      'Bốn loại biến: <b>Static</b>, <b>Random</b> (chữ, số, cả hai, hoặc mốc ngày giờ), <b>Pick</b> (một giá trị trong danh sách) và <b>Fallback</b> (thử A, rồi B, rồi C).',
      '<code>${var}</code> dùng được trong selector, giá trị, URL, script, giá trị mong đợi, tên file và nhiều chỗ khác.',
      'Gõ <code>${</code> (hoặc <span class="kbd">Ctrl+Space</span>) trong một trường để xem gợi ý — biến của bạn, biến do các bước trước ghi ra và các cột của file CSV đã tải.',
      '<b>Read DOM → Variable</b> đọc chữ, chữ hiển thị, giá trị ô nhập hoặc một thuộc tính trong lúc chạy — toàn bộ, hoặc chỉ phần bạn đánh dấu.',
      '<b>Condition (If)</b> bỏ qua N bước tiếp theo khi phép kiểm tra sai.',
      '<b>Switch</b> chạy một kịch bản khác, nhảy trong kịch bản này, hoặc chỉ chạy khối bước của nhánh khớp.'
    ],
    steps: [
      ['Khai báo', 'Data → Variables: thêm tên, chọn loại, đặt giá trị.'],
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
          'Sắp xếp bảng theo tên, loại, lần sửa gần nhất hoặc thứ tự kéo thả tuỳ chỉnh.'
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
        points: [
          '<b>Condition (If)</b>: một trong 12 phép kiểm tra trên phần tử, chữ, giá trị, class, thuộc tính của nó, hoặc URL — sai thì bỏ qua N bước tiếp theo.',
          '<b>Switch on a variable</b>: mỗi giá trị chạy một kịch bản khác, nhảy tới một hành động trong kịch bản này, hoặc chỉ chạy khối bước của riêng nó.',
          'Chế độ <b>Always</b>: không cần biến — kịch bản đã chọn (hoặc một đoạn #–# của nó) được phát mỗi lần, rồi kịch bản này chạy tiếp. Viết bước đăng nhập một lần, dùng lại ở mọi nơi.',
          'Các bước trong một khối được đánh số theo nhánh (1.1, 1.2, 2.1…); kéo thả, xoá và hoàn tác đều giữ đúng mọi khoảng.'
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
    eyebrow: 'Tab Data',
    title: 'Chạy theo dữ liệu CSV',
    lead: 'Tải file CSV lên và phát lại cùng một kịch bản cho mỗi dòng — tiêu đề cột tự thành <code>${variables}</code>, nên một bản ghi chạy được cả bộ dữ liệu và mỗi dòng có kết luận riêng.',
    facts: [['1', 'bản ghi, bao nhiêu dòng cũng được'], ['3', 'định dạng xuất'], ['Mỗi dòng', 'một kết luận pass / fail']],
    tabLabel: 'tab Data',
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
      ['Tải CSV lên', 'Data → <span class="nw">CSV Data-Driven Run</span>: dòng tiêu đề đặt tên cho biến, và bản xem trước cho thấy dữ liệu đã đọc.'],
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
          'Mẫu <b>Folder name</b>: <code>abc ${name}</code> → <code>abc john/</code>, <code>abc kate/</code> — bất kỳ cột CSV nào, hoặc một biến do lần chạy ghi ra.',
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
      'Code xuất ra cũng đọc được cùng file CSV và chạy một lần cho mỗi dòng — xem <a href="feature.html?id=export">Xuất code</a>.'
    ]
  },

  screenshots: {
    eyebrow: 'Tab Capture',
    title: 'Ảnh chụp & công cụ ảnh',
    lead: 'Sáu kiểu chụp bao quát mọi thứ, từ vùng đang hiển thị tới cả một cửa sổ ứng dụng — kiểu nào cũng có một bản ✂ mở ảnh thẳng trong trình sửa ảnh.',
    facts: [['6', 'kiểu chụp'], ['10', 'phím tắt chụp & ghi'], ['3 · 5 · 10 s', 'đếm ngược']],
    tabLabel: 'tab Capture',
    points: [
      'Chụp Visible, Full Page, Scroll (dọc / ngang), Segment (dọc / ngang), Element và Window.',
      'Mỗi chế độ có một bản <b>✂ Edit</b> mở trình sửa ảnh ngay sau khi chụp.',
      'Đếm ngược 3, 5 hoặc 10 giây trước khi chụp vùng hiển thị — đủ thời gian mở dropdown hay trạng thái hover cần có trong ảnh.',
      'Watermark với token <code>{url}</code> và <code>{datetime}</code>, in thẳng lên ảnh.',
      '🔍 <b>Image Diff</b> so sánh hai ảnh chụp theo từng điểm ảnh, độ nhạy tuỳ chỉnh.',
      'Tự lưu với tiền tố tên file, hoặc hỏi nơi lưu cho từng ảnh.'
    ],
    steps: [
      ['Chọn chế độ', 'Tab Capture — lọc theo All, Visible, Scroll, Segment, Element hoặc Window.'],
      ['Chụp', 'Bấm nút của chế độ đó, hoặc nhấn phím tắt mà không cần mở popup.'],
      ['Sửa nếu cần', 'Bản ✂ mở trình sửa ảnh: cắt, chú thích, làm mờ, đóng dấu.'],
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
            ['Scroll V / H', 'Cuộn trang và ghép thành ảnh toàn cảnh dọc hoặc ngang.', '<span class="kbd">Alt+V</span> / <span class="kbd">Alt+H</span>'],
            ['Segment V / H', 'Đánh dấu điểm đầu, cuộn tới điểm cuối, dừng — chỉ lấy phần đã đánh dấu.', '<span class="kbd">Alt+Shift+V</span> / <span class="kbd">Alt+Shift+H</span>, rồi <span class="kbd">Alt+X</span>'],
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
        lead: 'Mọi ảnh chụp — hoặc bất kỳ ảnh nào từ clipboard hay từ file — đều mở được trong trình cắt và chú thích đầy đủ. Trình sửa mở trong cửa sổ riêng, không chen chúc trong popup.',
        images: [{
          alt: 'Image Editor đang mở một ảnh chụp dashboard mẫu, có khung chữ nhật và mũi tên chú thích, bảng Stamp mở bên phải với các tuỳ chọn watermark thời gian.',
          caption: 'Cắt, chú thích và đóng dấu mọi ảnh chụp — ở đây là khung chữ nhật + mũi tên đánh dấu và bảng Stamp đang mở.'
        }],
        points: [
          'Bảy công cụ trên một thanh bên: Crop, Draw, Rectangle, Ellipse, Arrow, Text và Blur — mỗi công cụ có phím tắt một chữ (C, D, R, E, A, T, B).',
          'Xoay 90° trái/phải, lật ngang hoặc dọc, và lịch sử hoàn tác/làm lại cho mọi thao tác.',
          'Bảng Adjust: thanh trượt độ sáng, tương phản, bão hoà và độ nét, đặt lại bằng một chạm.',
          'Bảng Resize: rộng/cao chính xác với tuỳ chọn khoá tỉ lệ, hoặc thanh trượt tỉ lệ&nbsp;10–300%.',
          'Bảng Stamp: watermark thời gian hoặc chữ tuỳ chỉnh ở 1 trong 9 vị trí, chỉnh được cỡ chữ và độ mờ.',
          'Phóng to/thu nhỏ với nút về 1:1, và bảng phím tắt chỉ cách một lần bấm phím.'
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
    eyebrow: 'Tab Data',
    title: 'Xuất code 5 định dạng',
    lead: 'Biến mọi kịch bản đã ghi thành code test thật, chạy được — năm định dạng, sinh mới từ các bước hiện tại của kịch bản, không lặng lẽ bỏ sót bước nào.',
    facts: [['5', 'định dạng đầu ra'], ['8', 'locator dự phòng mỗi bước'], ['4', 'biến môi trường ghi đè']],
    tabLabel: 'tab Data',
    points: [
      '⚡ JS Bookmarklet, 🐍 Selenium Python (script hoặc pytest), 🎭 Playwright Test, 🤖 Robot Framework và ☕ Selenium Java (TestNG).',
      'Lấy lần phát lại làm chuẩn: code làm đúng như một lần chạy — cùng các locator dự phòng, và dùng helper trong trang của chính tiện ích ở mọi chỗ mà lệnh driver thông thường sẽ hành xử khác.',
      'Mỗi bước được đánh dấu ✓ OK, ⚠ Verify hoặc — Skip trong tab Actions, kèm lý do, và một comment ghi lại điều đó trong code.',
      'Assert vẫn có chờ và là kiểm tra mềm: mỗi phép sai được báo, và bài test thất bại ở cuối với danh sách tất cả các phép sai.',
      'Trỏ cùng một file sang staging, đổi trình duyệt, chạy headless hoặc ghi đè biến từ môi trường — không cần xuất lại.',
      'Bước lỗi tự nêu tên — <code>Step 3: click — Sign in: no element found by …</code> — và lưu ảnh chụp trang.'
    ],
    steps: [
      ['Chọn kịch bản', 'Data → Export Code — danh sách được nhóm theo thư mục và mở sẵn ở kịch bản bạn đang chọn.'],
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
            ['⚡ JS Bookmarklet', '<code>&lt;name&gt;_bookmarklet.js</code>, hoặc một URL bookmark một dòng', 'Trình duyệt — một bookmark hoặc Console. Không cần cài gì.'],
            ['🐍 Selenium&nbsp;Python', '<code>&lt;name&gt;_selenium.py</code> (script) hoặc <code>test_&lt;name&gt;.py</code> (pytest)', '<code>python</code> / <code>pytest</code> với Selenium 4'],
            ['🎭 Playwright&nbsp;Test', '<code>&lt;name&gt;.spec.js</code>', '<code>npx playwright test</code> — mỗi bước là một <code>test.step</code>, có trace khi lỗi'],
            ['🤖 Robot&nbsp;Framework', '<code>&lt;name&gt;.robot</code>', '<code>robot</code> với SeleniumLibrary — các bước đọc như keyword'],
            ['☕ Selenium&nbsp;Java', '<code>&lt;Name&gt;Test.java</code>', '<code>mvn test</code> / <code>gradle test</code> với Selenium 4 và TestNG 7']
          ]
        },
        points: [
          'Tên file giữ được chữ của mọi ngôn ngữ, như <code>đăng_nhập_selenium.py</code> hoặc <code>ĐăngNhậpTest.java</code>.',
          'Tab Code tô màu cú pháp, nhảy qua phần helper tới Step 1, và tự xuống dòng câu dài nếu bạn muốn.',
          '<b>↻ Reload scenario</b> cập nhật các chỉnh sửa làm trong lúc cửa sổ đang mở; thiết lập của từng định dạng được ghi nhớ.'
        ]
      },
      {
        title: 'Từ popup đến code',
        nav: 'Ảnh chụp',
        lead: 'Cùng kịch bản “Login flow”, xuất theo hai cách — đầu ra thật từ bộ sinh code thật, không phải ảnh dựng.',
        images: [
          {
            alt: 'Cửa sổ Export JS của kịch bản Login flow ở Step 1 của code bookmarklet được sinh ra, có các tab Code/Variables/Actions/Settings và cảnh báo 1 bước cần kiểm tra, 1 bước bị bỏ qua.',
            caption: 'JS Bookmarklet — code cùng các tab Variables, Actions và Settings, sẵn sàng để copy hoặc tải xuống.'
          },
          {
            alt: 'Cửa sổ Export Python của cùng kịch bản Login flow ở Step 1 của code Selenium được sinh ra.',
            caption: 'Selenium Python — cùng kịch bản dưới dạng script độc lập; ↧ Steps nhảy qua phần helper tới Step 1.'
          }
        ],
        points: [
          'Dòng cảnh báo là thật: các bước mà một định dạng không diễn đạt được sẽ được đếm và nêu tên — bấm vào sẽ mở chúng trong tab Actions.',
          'Variables liệt kê mọi biến được gắn sẵn vào code; Actions liệt kê mọi bước với ✓ OK, ⚠ Verify hoặc — Skip.'
        ]
      },
      {
        title: 'Mỗi định dạng hỗ trợ những gì',
        nav: 'Phạm vi hỗ trợ',
        lead: 'Ở chỗ một định dạng không làm được như khi phát lại, bước đó sẽ ghi rõ — trong tab Actions và bằng comment trong code.',
        table: {
          head: ['Bước', 'Bookmarklet', 'Selenium', 'Playwright', 'Robot', 'Java'],
          rows: [
            ['Click, Input, Hover, Dropdown, Drag &amp; Drop, Wait, Read DOM,&nbsp;Condition', '✓', '✓', '✓', '✓', '✓'],
            ['Navigate', '⚠ mỗi trang một lần click', '✓', '✓', '✓', '✓'],
            ['Run JS', '⚠ dán nguyên văn', '⚠&nbsp;<code>execute_script</code>', '⚠&nbsp;<code>page.evaluate</code>', '⚠&nbsp;<code>Execute Javascript</code>', '⚠&nbsp;<code>executeScript</code>'],
            ['Chụp màn hình', '—', '✓', '✓', '✓', '✓'],
            ['Upload File (ô input hoặc vùng thả)', '—', '✓', '✓', '✓', '✓'],
            ['Bước được ghi trong iframe', '⚠ chỉ cùng site', '✓', '✓', '✓', '✓'],
            ['Khối Switch theo biến', '✓ <code>if / else if</code>', '✓ <code>if / elif</code>', '✓', '✓ <code>IF / ELSE IF</code>', '✓'],
            ['Switch sang kịch bản khác, tới #N, Always', '—', '—', '—', '—', '—'],
            ['Assert (mềm, có chờ)', '✓ một alert ở cuối', '✓ <code>AssertionError</code> ở&nbsp;cuối', '✓ <code>expect.soft</code>', '✓ Continue On Failure', '✓ <code>SoftAssert</code>']
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
        },
        points: [
          '<b>Data file (CSV)</b>: pytest, Playwright, Robot (qua DataDriver) và Java chạy bài test một lần cho mỗi dòng của file CSV đặt cạnh nó.',
          'Lần chạy headless có cửa sổ 1920 × 1080, nên trang responsive hiển thị bố cục desktop.',
          'Chữ trong kịch bản chỉ nằm trong chuỗi hoặc comment — một kịch bản nhập từ ngoài không thể lén chèn code vào bản xuất của bạn.'
        ]
      }
    ],
    notes: [
      'Bookmarklet dừng ở bước Navigate và chạy tiếp từ bước sau khi bạn bấm lại nó trên trang mới — bookmarklet không sống sót qua một lần tải trang.',
      'Giá trị biến được gắn cố định lúc xuất — sửa bảng Variables rồi xuất lại, hoặc ghi đè bằng <code>PQA_&lt;name&gt;</code>.'
    ]
  },

  highlights: {
    eyebrow: 'Tab Highlight',
    title: 'Đánh dấu theo mẫu URL',
    lead: 'Đánh dấu bất kỳ trang nào bằng màu và ghi chú, tự hiện lại ở lần truy cập sau — gom theo mẫu URL, nên một bộ đánh dấu dùng được cho mọi trang có chung bố cục.',
    facts: [['5', 'màu'], ['📝', 'ghi chú trên mọi đánh dấu'], ['JSON', 'xuất file']],
    tabLabel: 'tab Highlight',
    points: [
      'Bật Highlight ON, chọn chữ trên trang, rồi chọn vàng, xanh lá, hồng, xanh dương hoặc cam trong tooltip.',
      'Thêm 📝 ghi chú cho bất kỳ đánh dấu nào; rê chuột lên sau đó để đọc.',
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
          'Một công cụ dựng mẫu chuyển URL của tab hiện tại thành mẫu — không cần nhớ cú pháp.',
          'Thêm hoặc xoá một mẫu sẽ gom lại các đánh dấu đã lưu. Mỗi đánh dấu nhớ trang nơi nó được tạo, nên không cái nào bị mất khi quy tắc thay đổi.',
          'Link <code>#anchor</code> được tính là cùng một trang; hash <code>#/route</code> và <code>#!/route</code> được tính là trang thật, đúng cách các ứng dụng <span class="nw">single-page</span> dùng chúng.'
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
    eyebrow: 'Tab Data',
    title: 'SQL Test Case Designer',
    lead: 'Dán một câu SQL để nhận danh sách test case dựng sẵn — phân vùng tương đương, giá trị biên, bảng quyết định, cùng các trường hợp biên NULL và JOIN mà hầu hết kế hoạch test thủ công bỏ sót — kèm dữ liệu test mà mỗi case cần.',
    facts: [['4', 'nhóm kỹ thuật'], ['4', 'định dạng xuất'], ['VI / EN', 'giao diện']],
    tabLabel: 'tab Data',
    points: [
      'Phân tích <code>SELECT</code> (join, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>, <code>LIMIT</code>, <code>UNION</code>, CTE, <code>CASE</code>) cùng <code>INSERT</code>, <code>UPDATE</code> và <code>DELETE</code>.',
      'Case EP/BVA lấy thẳng từ điều kiện của câu truy vấn, với bước giá trị biên theo kiểu dữ liệu suy ra.',
      'Bảng quyết định bao phủ logic của câu truy vấn — chuyển sang MC/DC khi số điều kiện vượt một giới hạn tuỳ chỉnh.',
      'Các case NULL, logic ba giá trị và số lượng bản ghi khi JOIN — những chỗ dễ bỏ sót khi làm tay.',
      'Phần Findings chỉ ra lỗi trong chính câu truy vấn — join bằng dấu phẩy, <code>= NULL</code>, <code>DELETE</code> không có <code>WHERE</code>.',
      'Mọi thứ chạy cục bộ trong trang — câu SQL của bạn không bao giờ rời khỏi trình duyệt.'
    ],
    steps: [
      ['Mở công cụ', 'Data → SQL Test Case Designer mở trong một tab riêng.'],
      ['Dán câu truy vấn', 'Dấu backtick của MySQL, ngoặc vuông của SQL Server, dấu nháy ANSI và tham số <code>?</code> / <code>:name</code> / <code>@name</code> / <code>$1</code> đều đọc được.'],
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
            ['Bảng quyết định + độ bao phủ', 'Bảng quy tắc đầy đủ 2ⁿ khi số điều kiện còn dưới giới hạn, sau đó là MC/DC — một cặp quy tắc cho mỗi điều kiện. <code>CASE</code> được bao phủ theo nhánh, gồm cả nhánh NULL ẩn khi thiếu <code>ELSE</code>.'],
            ['NULL &amp; logic ba giá trị', '<code>&lt;&gt;</code> làm rơi các dòng NULL, <code>NOT IN</code> trên một NULL, <code>COUNT(col)</code> so với <code>COUNT(*)</code>, khoá join NULL không bao giờ khớp, khoá nhóm NULL dồn thành một nhóm.'],
            ['JOIN / GROUP BY /&nbsp;ORDER–LIMIT', 'Mỗi join ở dạng 1:1, mồ côi và 1:n; một <code>WHERE</code> trên bảng outer join âm thầm biến nó thành inner join; nhóm rỗng, một nhóm và nhiều nhóm; giá trị bằng nhau trong <code>ORDER BY</code>; trang ở đúng, dưới và vượt số dòng.']
          ]
        }
      },
      {
        title: 'Bên trong màn hình phân tích',
        nav: 'Không gian làm việc',
        lead: 'Một không gian làm việc ba cột riêng, không phải bảng nhỏ trong popup — mọi thứ một lần chạy cần đều hiện cùng lúc.',
        images: [{
          alt: 'SQL Test Case Designer: cột truy vấn bên trái với câu SQL đã dán, danh sách case được sinh ở giữa với thống kê và bộ lọc kỹ thuật, và khung chi tiết case bên phải với lý do, các dòng dữ liệu mẫu và câu truy vấn cần chạy.',
          caption: 'Từ trái sang phải: câu truy vấn đã dán, danh sách case được sinh, và khung chi tiết của một case đang chọn — 71 case từ một câu truy vấn.'
        }],
        points: [
          'Cột trái: câu truy vấn, các kỹ thuật đang áp dụng, sổ giá trị mẫu và schema suy ra — dưới dạng tab, nên mở cái này không đẩy cái khác ra khỏi màn hình.',
          'Tab Schema vẽ sơ đồ ER chỉ từ câu truy vấn — bảng là các ô, khoá ngoại là các đường nối; kéo, phóng to và di chuyển được.',
          'Chế độ Compare so sánh câu truy vấn “trước” và “sau”, rồi xếp mỗi case vào Changed, Unrelated hoặc Stale.',
          'Hàng thống kê trực tiếp phía trên danh sách — tổng số case, case ưu tiên cao, số điều kiện, số join và số bảng liên quan.',
          'Tìm kiếm cùng bộ lọc theo độ ưu tiên, mệnh đề và cột, nút “chỉ case có dữ liệu mẫu”, và chuyển giữa dòng đầy đủ/gọn.',
          'Bấm vào một case để mở khung chi tiết: lý do, các dòng dữ liệu cần chuẩn bị và câu truy vấn cần chạy.'
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
          'Schema được suy ra từ câu truy vấn — kiểu dữ liệu từ các giá trị literal, khoá từ tên và điều kiện join — và được hiển thị, nên đoán sai sẽ lộ ra trước khi ai đó nhập dữ liệu.',
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
            ['JSON', 'Các case cùng kết quả phân tích — bảng, join, điều kiện đã đánh số, tham số, findings, độ bao phủ — và các giá trị mẫu đang áp dụng.'],
            ['Data CSV', 'Mỗi bảng một file, mỗi dòng dữ liệu mẫu được gắn với case mà nó thuộc về.'],
            ['Verify SQL', 'Câu truy vấn cho từng case, kèm kết quả mong đợi dưới dạng comment phía trên.']
          ]
        }
      }
    ],
    notes: [
      'Chỉ câu lệnh ngoài cùng được phân tích. CTE và subquery được đánh dấu — hãy dán riêng từng cái để có case của nó.',
      'Không có schema trực tiếp: kiểu dữ liệu của cột lấy từ giá trị literal trong phép so sánh trước, rồi tới tên cột. Khi cả hai đều không rõ, case sẽ ghi rõ điều đó.',
      'Kết quả mong đợi nêu điều mà ngữ nghĩa SQL yêu cầu, không phải dữ liệu hiện có của bạn.',
      'Giao diện mặc định là tiếng Việt và chuyển sang tiếng Anh qua 🌐 — case được sinh theo ngôn ngữ đang dùng, nên file xuất luôn khớp với màn hình.'
    ]
  },

  'db-test-session': {
    eyebrow: 'Tab Data',
    title: 'DB Test Session & Rollback',
    lead: 'Thoải mái thay đổi dữ liệu test trong Adminer — mọi thao tác ghi đều được lưu vào một phiên, và một click đưa cơ sở dữ liệu về như cũ, kèm câu SQL chính xác hiện ra trước khi chạy.',
    facts: [['8', 'loại thao tác ghi được lưu'], ['1 click', 'để rollback'], ['0', 'byte rời khỏi trình duyệt']],
    tabLabel: 'tab Data',
    points: [
      'Bắt đầu phiên từ bảng nhỏ mà Adminer hiện ở góc dưới bên phải; chưa bắt đầu thì không có gì được ghi.',
      'Ghi lại form sửa, sửa ô trong lưới, xoá hàng loạt và xoá cả kết quả, sửa hàng loạt, các lệnh <code>INSERT</code> và <code>UPDATE</code>/<code>DELETE</code> bạn gõ ở trang SQL.',
      '↺ Roll back all, hoặc ↺ Undo last (<span class="kbd">Alt+Shift+Z</span>) cho thay đổi vừa làm — luôn có bản xem trước từng thay đổi và câu SQL bên dưới.',
      'Kiểm tra lệch dữ liệu đọc lại từng dòng trước: nếu có người sửa sau bạn, bạn thấy giá trị đã ghi và giá trị hiện tại cạnh nhau rồi chọn bỏ qua hoặc ghi đè.',
      '↷ Re-apply đưa lại giá trị của lần test khi một lần rollback hoá ra là quyết định sai.',
      'Từ chối những gì không hoàn tác an toàn được — và nêu lý do ngay trên thay đổi đó.'
    ],
    steps: [
      ['Mở Adminer', 'Một bảng nhỏ hiện ở góc dưới bên phải. Công tắc Adminer panel ở tab Data bật/tắt bảng này.'],
      ['▶ Start session', 'Đặt tên cho lần test — từ đây mọi thao tác ghi đều được lưu.'],
      ['Test', 'Sửa, xoá và thêm dữ liệu như bình thường; mỗi thay đổi được ghi vào nhật ký của bảng.'],
      ['↺ Roll back all', 'Đọc bản xem trước câu SQL, xác nhận, và dữ liệu trở lại như cũ.']
    ],
    sections: [
      {
        title: 'Bên trong một phiên test',
        nav: 'Ảnh chụp',
        lead: 'Một phiên mẫu — áp mã giảm giá khi thanh toán, rồi hoàn tiền — nhìn từ bảng Adminer và từ trang quản lý. Giao diện thật, và câu SQL là đầu ra của bộ sinh thật.',
        images: [
          {
            alt: 'Bản xem trước Undo SQL mở từ bảng Adminer: công tắc Step by step / Merged, mỗi thay đổi một dòng tóm tắt với một UPDATE products bị bỏ qua được đánh dấu, và bảy câu lệnh UPDATE, INSERT, DELETE sẽ chạy; bên cạnh là bảng đang ghi, có nút Roll back all và Undo last cùng nhật ký các thay đổi đã ghi.',
            caption: '↺ Roll back all mở câu SQL trước — mỗi thay đổi một dòng, dòng bị bỏ qua có ghi lý do, và không gì chạy cho tới khi bạn xác nhận.'
          },
          {
            alt: 'Trang Test sessions & rollback: danh sách phiên bên trái, bảy thay đổi của phiên đang chọn bên phải, với trước/sau của một DELETE trên cart_items và một UPDATE trên orders đang mở, và một thay đổi đã được hoàn tác.',
            caption: 'Trang quản lý — mọi phiên bên trái, trước/sau của từng thay đổi bên phải, hoàn tác từng cái hoặc tất cả cùng lúc.'
          }
        ],
        points: [
          'Bảng luôn gọn: đang ghi hay không, bao nhiêu thay đổi, và vài nút cần dùng giữa lúc test.',
          'Step by step phát lại từng thay đổi như khi ghi; Merged gộp nhiều lần sửa một dòng (A→B→C) thành một câu lệnh đưa thẳng về A.',
          'Mỗi dòng đã ghi trong nhật ký của bảng liên kết tới thay đổi đó trên trang quản lý, với phần so sánh đã mở sẵn.',
          'Hoàn tác hoặc áp lại một thay đổi ngay trên dòng của nó, hoặc đánh dấu vài thay đổi và chỉ rollback những cái đó.',
          'Một lần rollback không dùng hết phiên: chạy lại bài test thì phiên lại đề xuất cùng thao tác hoàn tác lần thứ hai.',
          'Xuất phiên ra <code>.sql</code> hoặc <code>.json</code>; trang quản lý chuyển được giữa tiếng Anh và tiếng Việt.'
        ]
      },
      {
        title: 'Những gì được ghi lại',
        nav: 'Những gì được ghi',
        lead: 'Giá trị cũ được đọc trước khi ghi — qua chính form sửa của từng dòng, vì Adminer rút gọn chữ dài trong lưới, và khôi phục một giá trị bị rút gọn như thể nó đầy đủ sẽ làm hỏng dòng đó.',
        table: {
          head: ['Nơi bạn thay đổi', 'Những gì được lưu', 'Hoàn tác bằng'],
          rows: [
            ['Form sửa dòng', 'Các giá trị trong form lúc tải — trước khi bạn chạm vào.', '<code>UPDATE</code> trở lại, chỉ các cột đã đổi'],
            ['“Save and continue editing”', 'Dòng trước và sau mỗi lần lưu, đọc lại để <code>now()</code> là giá trị thật.', '<code>UPDATE</code> trở lại, mỗi lần lưu một thay đổi'],
            ['Delete trên form sửa', 'Toàn bộ dòng.', '<code>INSERT</code> lại'],
            ['Một ô được sửa trong lưới', 'Mỗi dòng được sửa, đọc trước khi lưu và đọc lại sau đó.', '<code>UPDATE</code> trở lại'],
            ['Dòng đã đánh dấu hoặc cả kết quả → Delete', 'Mọi dòng sắp bị xoá — với cả kết quả là mọi dòng khớp, không chỉ trang đang xem.', '<code>INSERT</code> lại'],
            ['Dòng đã đánh dấu → Edit (sửa hàng loạt)', 'Từng dòng trước khi sửa.', '<code>UPDATE</code> trở lại'],
            ['<code>UPDATE</code> / <code>DELETE</code> ở trang SQL', 'Các dòng bị ảnh hưởng, đọc trước khi câu lệnh chạy.', '<code>UPDATE</code> / <code>INSERT</code> cho từng dòng'],
            ['<code>INSERT</code> — form, Clone hoặc trang SQL', 'Khoá của dòng mới.', '<code>DELETE</code> đúng những dòng đó']
          ]
        }
      },
      {
        title: 'An toàn từ thiết kế',
        nav: 'An toàn',
        lead: 'Đây không phải transaction — Adminer mở kết nối mới cho mỗi request — mà là một changeset do tiện ích giữ, phát ngược lại thành câu SQL thông thường để bạn đọc trước khi chạy.',
        points: [
          '<b>Kiểm tra lệch dữ liệu</b>: trước khi hoàn tác một thay đổi, tiện ích đọc lại dòng đó. Chỉ so sánh các cột mà thay đổi đó đã ghi, nên đồng nghiệp sửa cột khác không bị tính là xung đột.',
          '<b>Từ chối</b>: bảng không có khoá chính hoặc khoá duy nhất, câu lệnh không có <code>WHERE</code> hoặc ghi vào hai bảng, nhiều dòng hơn giới hạn (mặc định 200) — mỗi trường hợp hiện ngay trên thay đổi, không bao giờ bị lặng lẽ bỏ qua.',
          'Câu lệnh chạy từ mới nhất tới cũ nhất, mỗi lần gửi một thay đổi, và dừng ở lỗi đầu tiên — thay đổi được đánh dấu đã hoàn tác là thay đổi thật sự đã hoàn tác.',
          'Rollback chạy từ chính tab Adminer, nơi có cookie phiên của Adminer; nếu chưa mở tab nào, <b>Open Adminer</b> sẽ mở một tab và chạy tiếp.',
          'Một changeset thuộc về một cơ sở dữ liệu (origin, driver, server, database) và không bao giờ được đề xuất trên cơ sở dữ liệu khác.'
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

  settings: {
    eyebrow: 'Tab Settings',
    title: 'Phím tắt, sao lưu & cài đặt',
    lead: 'Những thứ bạn chỉ đặt một lần: phím tắt cho việc ghi và mọi kiểu chụp, thông báo theo từng loại, nhập/xuất và sao lưu toàn bộ — trong một popup nhớ cách bạn làm việc.',
    facts: [['10', 'phím tắt đổi được'], ['4', 'loại thông báo'], ['1 file', 'sao lưu toàn bộ']],
    tabLabel: 'tab Settings',
    points: [
      'Mọi phím tắt đều đổi được, và thiết lập được đồng bộ theo hồ sơ Chrome của bạn.',
      'Nhập và xuất kịch bản hoặc cả thư mục dưới dạng JSON; sao lưu và khôi phục toàn bộ dữ liệu trong một file.',
      'File nhập có bước Run JS hoặc Upload File sẽ cảnh báo trước, nêu rõ các thư mục mà bước tải file sẽ đọc.',
      'Thông báo theo từng loại: kết quả chạy, lỗi và cảnh báo, kết quả chụp, lần chạy theo lịch.',
      'Giao diện sáng và tối; kéo năm tab theo thứ tự bạn muốn, và tab dùng gần nhất sẽ mở lại.',
      'Nút <b>?</b> trên mỗi thẻ mở một hướng dẫn ngắn, bằng tiếng Việt hoặc tiếng Anh.'
    ],
    steps: [
      ['Đặt phím tắt', 'Settings → Hotkeys: bấm Set rồi nhấn tổ hợp phím mới.'],
      ['Tinh chỉnh việc chụp', 'Chế độ lưu (tự động hoặc hỏi), tiền tố tên file, watermark, đếm ngược và tốc độ cuộn khi chụp segment.'],
      ['Chọn thông báo', 'Đánh dấu các loại thông báo bạn muốn nhận.'],
      ['Sao lưu', 'Backup / Restore lưu mọi thứ vào một file — khôi phục được trên bất kỳ máy nào.']
    ],
    sections: [
      {
        title: 'Phím tắt mặc định',
        nav: 'Phím tắt',
        table: {
          head: ['Hành động', 'Mặc định'],
          rows: [
            ['Start Recording', '<span class="kbd">Alt+R</span>'],
            ['Stop Recording', '<span class="kbd">Alt+S</span>'],
            ['Screenshot&nbsp;(Visible)', '<span class="kbd">Alt+P</span>'],
            ['Screenshot (Full Page)', '<span class="kbd">Alt+Shift+F</span>'],
            ['Screenshot (Scroll V)', '<span class="kbd">Alt+V</span>'],
            ['Screenshot (Scroll H)', '<span class="kbd">Alt+H</span>'],
            ['Segment V — Start', '<span class="kbd">Alt+Shift+V</span>'],
            ['Segment H — Start', '<span class="kbd">Alt+Shift+H</span>'],
            ['Segment — Stop &amp; Capture', '<span class="kbd">Alt+X</span>'],
            ['Screenshot&nbsp;(Element)', '<span class="kbd">Alt+E</span>']
          ]
        },
        points: [
          'Start/Stop Recording chỉ hoạt động trên tab đã kích hoạt Pocket QA.',
          'Phím tắt chỉ phản hồi lần bấm phím thật — trang web không thể giả lập phím để bắt đầu ghi hay chụp ảnh.',
          'Trong Adminer, <span class="kbd">Alt+Shift+Z</span> hoàn tác thay đổi cơ sở dữ liệu vừa được ghi.'
        ]
      },
      {
        title: 'Nhập, xuất & sao lưu',
        nav: 'Sao lưu',
        points: [
          '<b>Import / Export</b>: một kịch bản hoặc cả thư mục dưới dạng JSON — để chia sẻ bài test với đồng đội hoặc lưu trong hệ thống quản lý phiên bản.',
          '<b>Backup / Restore</b>: mọi kịch bản, thư mục, biến và cài đặt trong một file.',
          'File nhập có bước Run JS hoặc Upload File sẽ cảnh báo trước khi được thêm vào, nên file được chia sẻ không thể lặng lẽ chạy code hay đọc thư mục của bạn.',
          'File xuất dùng tính năng mới hơn (khối Switch) sẽ ghi lại phiên bản đã tạo ra nó, để bản cũ hơn không đọc sai.'
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
