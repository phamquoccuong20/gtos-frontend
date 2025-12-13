import { Status, Berth, TrendData, CargoStat, EquipmentData, ReportItem } from './types';

// --- MOCK DATA ---
export const trendData: TrendData[] = [
    { month: 'T1', import: 4000, export: 2400 },
    { month: 'T2', import: 5000, export: 3000 },
    { month: 'T3', import: 4500, export: 3800 },
    { month: 'T4', import: 6200, export: 4500 },
    { month: 'T5', import: 5800, export: 3900 },
    { month: 'T6', import: 7000, export: 5200 },
];

export const cargoData: CargoStat[] = [
    { name: 'Cáp cuộn', value: 8500, color: 'bg-blue-500' },
    { name: 'Băng nóng', value: 6200, color: 'bg-indigo-500' },
    { name: 'Tole nóng', value: 5100, color: 'bg-cyan-500' },
    { name: 'Tole mạ', value: 3200, color: 'bg-teal-500' },
    { name: 'Tole cuộn', value: 1850, color: 'bg-emerald-500' },
];

export const berthData: Berth[] = [
    { id: 'Bến A1', name: 'Bến A1 (Cầu 1)', shipName: 'MV OCEAN STAR', cargoType: 'Tole nóng', eta: '14:30', progress: 80, status: Status.Active },
    { id: 'Bến A2', name: 'Bến A2 (Cầu 2)', shipName: 'MV PACIFIC GLORY', cargoType: 'Băng nóng', eta: '16:00', progress: 70, status: Status.Active },
    { id: 'Bến A3', name: 'Bến A3 (Cầu 3)', shipName: 'MV SUNRISE', cargoType: 'Cáp cuộn', eta: '12:45', progress: 50, status: Status.Active },
    { id: 'Bến B1', name: 'Bến B1', shipName: '-', cargoType: '-', eta: '-', progress: 0, status: Status.Idle },
    { id: 'Bến B2', name: 'Bến B2', shipName: 'MV DRAGON WAVE', cargoType: 'Bảo trì', eta: '18:00', progress: 0, status: Status.Maintenance },
];

// Data matched to the user's image
export const equipmentData: EquipmentData[] = [
    { name: 'Romooc', value: 29.59, color: '#8b5cf6' }, // Purple
    { name: 'Xe đầu kéo', value: 27.54, color: '#ff8042' }, // Salmon/Red
    { name: 'Xe nâng bãi', value: 46.24, color: '#06b6d4' }, // Cyan
    { name: 'Xe nâng hầm', value: 74.15, color: '#fbbf24' }, // Orange
];

export const activities = [
    { type: 'success', text: 'MV SUNRISE hoàn thành xếp hàng', time: '5 phút trước' },
    { type: 'warning', text: 'Bến B2 cần bảo trì định kỳ', time: '15 phút trước' },
    { type: 'info', text: 'Cập nhật lịch tàu tháng 7', time: '30 phút trước' },
];

export const reportData: ReportItem[] = [
    { id: 'IMP-24-001', cargo: 'Thép cuộn cán nóng', type: 'Tole nóng', ship: 'MV OCEAN STAR', weight: 1200, date: '12/06/2024', status: 'Completed' },
    { id: 'IMP-24-002', cargo: 'Cáp điện công nghiệp', type: 'Cáp cuộn', ship: 'MV SUNRISE', weight: 850, date: '12/06/2024', status: 'Processing' },
    { id: 'EXP-24-058', cargo: 'Tôn mạ kẽm lạnh', type: 'Tole mạ', ship: 'MV PACIFIC GLORY', weight: 2100, date: '11/06/2024', status: 'Completed' },
    { id: 'IMP-24-003', cargo: 'Thép hình chữ H', type: 'Sắt thép', ship: 'MV DRAGON WAVE', weight: 3200, date: '10/06/2024', status: 'Pending' },
    { id: 'EXP-24-059', cargo: 'Băng tải cao su', type: 'Băng nóng', ship: 'MV OCEAN STAR', weight: 500, date: '09/06/2024', status: 'Completed' },
    { id: 'IMP-24-004', cargo: 'Thép cuộn mạ màu', type: 'Tole cuộn', ship: 'MV SUNRISE', weight: 1100, date: '08/06/2024', status: 'Completed' },
];
