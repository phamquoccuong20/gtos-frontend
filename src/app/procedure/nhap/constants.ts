import React from 'react';
import { 
  FileEdit, 
  RotateCw, 
  Truck, 
  BarChart3, 
  Ship,
  FilePlus2,
  Settings2,
  ClipboardCheck,
  Package
} from 'lucide-react';
import { ProcessGroup } from './types';

export const PROCESS_GROUPS: ProcessGroup[] = [
  {
    id: 'tau-bai',
    title: 'QUY TRÌNH TÀU - BÃI',
    color: 'bg-[#dc2626]', // Strong Red
    items: [
      { label: 'Nhập liệu hàng tổng hợp / Manifest', href: '#', icon: React.createElement(FileEdit, { size: 18 }) },
      { label: 'Lệnh giao hàng', href: '#', icon: React.createElement(ClipboardCheck, { size: 18 }) },
    ]
  },
  {
    id: 'tau-xe',
    title: 'QUY TRÌNH TÀU - XE',
    color: 'bg-[#6d28d9]', // Deep Violet
    items: [
      { label: 'Nhập liệu hàng tổng hợp / Manifest', href: '#', icon: React.createElement(FileEdit, { size: 18 }) },
      { label: 'Lệnh giao hàng', href: '#', icon: React.createElement(ClipboardCheck, { size: 18 }) },
      { label: 'Cập nhật & Điều chỉnh thông tin lệnh', href: '#', icon: React.createElement(RotateCw, { size: 18 }) },
      { label: 'Kế hoạch phương tiện nhận hàng từ tàu', href: '#', icon: React.createElement(Truck, { size: 18 }) },
    ]
  },
  {
    id: 'tau-sa-lan',
    title: 'QUY TRÌNH TÀU - SÀ LAN',
    color: 'bg-[#1d4ed8]', // Strong Blue
    items: [
      { label: 'Nhập liệu hàng tổng hợp / Manifest', href: '#', icon: React.createElement(FileEdit, { size: 18 }) },
      { label: 'Lệnh giao hàng', href: '#', icon: React.createElement(ClipboardCheck, { size: 18 }) },
      { label: 'Cập nhật & Điều chỉnh thông tin lệnh', href: '#', icon: React.createElement(RotateCw, { size: 18 }) },
      { label: 'Kế hoạch phương tiện nhận hàng từ tàu', href: '#', icon: React.createElement(Ship, { size: 18 }) },
    ]
  },
  {
    id: 'tau-xe-sa-lan',
    title: 'QUY TRÌNH TÀU - XE - SÀ LAN',
    color: 'bg-[#d97706]', // Dark Amber
    items: [
      { label: 'Nhập sản lượng sà lan tập trung', href: '#', icon: React.createElement(BarChart3, { size: 18 }) },
      { label: 'Cấu hình quy trình vận hành hỗn hợp', href: '#', icon: React.createElement(Settings2, { size: 18 }) },
    ]
  },
  {
    id: 'sa-lan-bai',
    title: 'QUY TRÌNH SÀ LAN - BÃI',
    color: 'bg-[#059669]', // Deep Emerald
    items: [
      { label: 'Nhập sản lượng hàng sà lan vào bãi', href: '#', icon: React.createElement(BarChart3, { size: 18 }) },
      { label: 'Quản lý sơ đồ vị trí lưu kho bãi', href: '#', icon: React.createElement(Package, { size: 18 }) },
    ]
  },
  {
    id: 'sa-lan-xe',
    title: 'QUY TRÌNH SÀ LAN - XE',
    color: 'bg-[#0891b2]', // Deep Cyan
    items: [
      { label: 'Nhập liệu hàng tổng hợp / Manifest', href: '#', icon: React.createElement(FileEdit, { size: 18 }) },
      { label: 'Lệnh giao hàng', href: '#', icon: React.createElement(ClipboardCheck, { size: 18 }) },
      { label: 'Cập nhật & Điều chỉnh thông tin lệnh', href: '#', icon: React.createElement(RotateCw, { size: 18 }) },
      { label: 'Kế hoạch xe nhận hàng từ sà lan', href: '#', icon: React.createElement(Truck, { size: 18 }) },
    ]
  },
  {
    id: 'sa-lan-sa-lan',
    title: 'QUY TRÌNH SÀ LAN - SÀ LAN',
    color: 'bg-[#334155]', // Slate Gray
    items: [
      { label: 'Nhập sản lượng hàng chuyển tải trực tiếp', href: '#', icon: React.createElement(BarChart3, { size: 18 }) },
      { label: 'Lập biên bản xác nhận chuyển tải', href: '#', icon: React.createElement(FilePlus2, { size: 18 }) },
    ]
  }
];
