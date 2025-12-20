/**
 * Constants for Exchange Rate module
 */

import { ExchangeRate } from './types';

export const INITIAL_RATES: ExchangeRate[] = [
  { id: '1', code: 'USD', value: 25450, description: 'Đô la Mỹ', lastUpdated: '2024-05-20 09:30', isActive: true },
  { id: '2', code: 'VND', value: 1, description: 'Việt Nam Đồng', lastUpdated: '2024-05-20 00:00', isActive: true },
  { id: '3', code: 'EUR', value: 27120, description: 'Euro', lastUpdated: '2024-05-20 09:35', isActive: true },
  { id: '4', code: 'JPY', value: 162.5, description: 'Yên Nhật', lastUpdated: '2024-05-20 09:15', isActive: false },
  { id: '5', code: 'CNY', value: 3510, description: 'Nhân dân tệ', lastUpdated: '2024-05-20 09:20', isActive: true },
  { id: '6', code: 'GBP', value: 32150, description: 'Bảng Anh', lastUpdated: '2024-05-20 09:40', isActive: true },
  { id: '7', code: 'AUD', value: 16800, description: 'Đô la Úc', lastUpdated: '2024-05-20 09:45', isActive: true },
  { id: '8', code: 'CAD', value: 18500, description: 'Đô la Canada', lastUpdated: '2024-05-20 09:50', isActive: true },
  { id: '9', code: 'SGD', value: 18850, description: 'Đô la Singapore', lastUpdated: '2024-05-20 09:55', isActive: true },
  { id: '10', code: 'HKD', value: 3250, description: 'Đô la Hồng Kông', lastUpdated: '2024-05-20 10:00', isActive: true },
  { id: '11', code: 'THB', value: 695, description: 'Bạt Thái Lan', lastUpdated: '2024-05-20 10:05', isActive: true },
  { id: '12', code: 'KRW', value: 18.2, description: 'Won Hàn Quốc', lastUpdated: '2024-05-20 10:10', isActive: true },
];

export const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
export const DEFAULT_ITEMS_PER_PAGE = 5;
export const MAX_ROWS_TO_ADD = 50;
export const TOAST_DURATION_MS = 3000;
