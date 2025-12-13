import { Vessel, VesselStatus, Berth, CargoItem, YardBlock, YardInventoryItem } from './types';

// Visual Constants
export const PIXELS_PER_HOUR = 40; // Horizontal scale: 40px per hour
export const PIXELS_PER_METER = 0.5; // Vertical scale: 0.5px per meter
export const METERS_PER_BITT = 20; // 1 Bitt = 20 meters

// Layout
export const QUAY_TOTAL_LENGTH = 700; // Total meters

export const BERTHS: Berth[] = [
    { id: 'b1', name: 'Bến Container 1', startMeter: 0, endMeter: 250, color: 'bg-blue-50/30' },
    { id: 'b2', name: 'Bến Tổng Hợp 2', startMeter: 250, endMeter: 450, color: 'bg-indigo-50/30' },
    { id: 'b3', name: 'Bến Xăng Dầu 3', startMeter: 450, endMeter: 700, color: 'bg-slate-50/30' },
];

// Generate dates
const now = new Date();
// Normalize to start of today for consistent mocking
const baseDate = new Date(now);
baseDate.setHours(0, 0, 0, 0);

const addHours = (d: Date, h: number) => new Date(d.getTime() + h * 60 * 60 * 1000);

export const MOCK_VESSELS: Vessel[] = [
    {
        id: 'v1',
        name: 'MSC GULSUN',
        voyage: 'V.2025-01',
        status: VesselStatus.DEPARTED,
        startPosition: 50, // Starts at ~Bitt 2.5
        length: 150,
        arrivalTime: addHours(baseDate, 6),
        departureTime: addHours(baseDate, 14),
        cargoType: 'Container',
    },
    {
        id: 'v2',
        name: 'WAN HAI 305',
        voyage: 'WH-882',
        status: VesselStatus.AT_BERTH,
        startPosition: 260, // Starts at ~Bitt 13
        length: 120,
        arrivalTime: addHours(baseDate, 10),
        departureTime: addHours(baseDate, 34), // Spans next day
        cargoType: 'General Cargo',
    },
    {
        id: 'v3',
        name: 'EVER GIVEN',
        voyage: 'EG-001',
        status: VesselStatus.PLANNED,
        startPosition: 40,
        length: 180,
        arrivalTime: addHours(baseDate, 20),
        departureTime: addHours(baseDate, 44),
        cargoType: 'Container',
    },
    {
        id: 'v4',
        name: 'MAERSK HANOI',
        voyage: 'MH-992',
        status: VesselStatus.PLANNED,
        startPosition: 500, // Berth 3
        length: 100,
        arrivalTime: addHours(baseDate, 28),
        departureTime: addHours(baseDate, 52),
        cargoType: 'Liquid Bulk',
    },
    {
        id: 'v5',
        name: 'CMA CGM',
        voyage: 'CM-099',
        status: VesselStatus.PLANNED,
        startPosition: 300,
        length: 140,
        arrivalTime: addHours(baseDate, 40),
        departureTime: addHours(baseDate, 60),
        cargoType: 'Container',
    }
];

export const MOCK_CARGO: CargoItem[] = [
    { id: 'c1', billOfLading: 'BL-882-001', commodity: 'Cáp cuộn', quantity: 20, unit: 'Cuộn', hatch: 'Hầm 2', color: 'bg-sky-500' },
    { id: 'c2', billOfLading: 'BL-882-002', commodity: 'Thép tấm', quantity: 50, unit: 'Tấm', hatch: 'Hầm 3', color: 'bg-slate-600' },
    { id: 'c3', billOfLading: 'BL-882-003', commodity: 'Băng nóng', quantity: 39, unit: 'Kiện', hatch: 'Hầm 1', color: 'bg-orange-500' },
];

export const MOCK_YARD: YardBlock[] = [
    { id: 'y1', code: 'VCK2', name: 'Bãi Container K2', capacity: 2800, current: 106.38, color: 'text-emerald-600', cargoType: 'Sắt thép' },
    { id: 'y2', code: 'SBBS', name: 'Sân Bãi Sông', capacity: 4864, current: 311.48, color: 'text-orange-500', cargoType: 'Tole cuộn' },
    { id: 'y3', code: 'N3', name: 'Kho Nhập 3', capacity: 5000, current: 4200, color: 'text-red-500', cargoType: 'Băng nóng' },
    { id: 'y4', code: 'VCCDCT', name: 'Bãi VCC', capacity: 2800, current: 166.67, color: 'text-emerald-600', cargoType: 'Sắt Lòng máng' },
];

export const MOCK_YARD_INVENTORY: YardInventoryItem[] = [
    { id: 'i1', billOfLading: 'BL-882-001', commodity: 'Cáp cuộn', quantity: 5, unit: 'Cuộn', location: 'A-01-01', dateIn: '10/12/2025 08:30', status: 'STORED' },
    { id: 'i2', billOfLading: 'BL-882-001', commodity: 'Cáp cuộn', quantity: 3, unit: 'Cuộn', location: 'A-01-02', dateIn: '10/12/2025 09:15', status: 'STORED' },
    { id: 'i3', billOfLading: 'BL-882-002', commodity: 'Thép tấm', quantity: 12, unit: 'Tấm', location: 'B-05-11', dateIn: '11/12/2025 14:20', status: 'STORED' },
    { id: 'i4', billOfLading: 'BL-882-003', commodity: 'Băng nóng', quantity: 10, unit: 'Kiện', location: 'C-02-01', dateIn: '12/12/2025 10:00', status: 'OUTGOING' },
    { id: 'i5', billOfLading: 'BL-882-003', commodity: 'Băng nóng', quantity: 8, unit: 'Kiện', location: 'C-02-02', dateIn: '12/12/2025 10:45', status: 'STORED' },
    { id: 'i6', billOfLading: 'BL-OTHER-99', commodity: 'Hàng rời', quantity: 50, unit: 'Tấn', location: 'D-01-01', dateIn: '09/12/2025 07:00', status: 'STORED' },
];
