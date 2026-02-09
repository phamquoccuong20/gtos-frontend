import { YardSection } from './types';
import { YARD_DATA } from '../cmBlock/constants';

// Mảng màu để phân bố cho các khu vực
const COLOR_THEMES = [
  'blue', 'yellow', 'amber', 'indigo', 'emerald', 'rose', 'sky', 'orange',
  'teal', 'cyan', 'violet', 'fuchsia', 'pink', 'lime', 'green', 'stone'
];

// Chuyển đổi dữ liệu từ cmBlock sang định dạng cmBlockDesign
export const MOCK_YARD_DATA: YardSection[] = YARD_DATA.map((yard, index) => ({
  id: yard.id.toString(),
  name: yard.location,
  label: yard.description,
  capacity: yard.capacity,
  currentValue: 0, // Giá trị hiện tại mặc định là 0
  items: [], // Danh sách lô hàng mặc định rỗng
  colorTheme: COLOR_THEMES[index % COLOR_THEMES.length]
}));
