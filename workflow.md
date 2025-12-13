1. Định nghĩa UI (UI Definitions)
Dự án sử dụng Ant Design (antd) làm thư viện UI chính, kết hợp với tùy chỉnh qua ConfigProvider và CSS global.
Typography & Fonts
Font Family Chính: "Roboto", sans-serif
Font Family Phụ: "Be Vietnam Pro", sans-serif (dùng cho các tiêu đề hoặc điểm nhấn nếu cần)
Font Size:
Mặc định: 14px
Panel Title: 18px - 20px (font-weight: 500/700)
Subtitle / Section Header: 16px (font-weight: 500)
Input Label: 14px (màu --text-primary hoặc #e4e6eb trong dark mode)
Input Text / Placeholder: 14px
Kích thước & Spacing (Metrics)
Border Radius: 4px (Áp dụng cho Button, Input, Select, Card, Modal)
Control Height (Input, Button, Select): 36px (Chuẩn hóa trong AntdThemeProvider)
Spacing:
Padding tiêu chuẩn cho Card/Panel: 10px
Gap giữa các input trong Form: 10px
Margin bottom cho Title: 12px
Box Shadow & Effects
Card Shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02) (Antd Default)
Hover Effect: Transition all 0.3s cho các tương tác.
Focus Ring: Màu #40a9ff (hoặc biến thể của Primary Color) với box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2).