/**
 * Type definitions for Exchange Rate module
 */

export interface ExchangeRate {
  id: string;
  code: string;
  value: number;
  description: string;
  lastUpdated: string;
  isActive: boolean;
}

export interface ToastMessage {
  title: string;
  detail: string;
}

export enum SidebarItem {
  DASHBOARD = 'Dashboards',
  SYSTEM = 'Quản trị hệ thống',
  CATALOG = 'Danh mục',
  PLANNING = 'Kế hoạch khai thác',
  PROCESS = 'Quy trình khai thác',
  REPORTS = 'Báo cáo',
  OTHERS = 'Khác'
}

export interface GeminiInsight {
  summary: string;
  recommendation: string;
  trend: 'up' | 'down' | 'stable';
}
