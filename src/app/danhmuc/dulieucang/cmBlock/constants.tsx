
import React from 'react';
import { 
  Warehouse, 
  Anchor, 
  Settings, 
  DoorOpen, 
  Grid3X3,
  Search,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  XCircle,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import { YardData, BerthData, BittData, EquipmentData, GateData, TabType } from './types';

export const YARD_DATA: YardData[] = [
  { id: 1, location: 'BCSBTDTT2', description: 'BÃI CON SÂU BỜ TƯỜNG BIỂN ĐÔNG', capacity: 6656, type: 'Nội bộ', crane: '' },
  { id: 2, location: 'BCSBVTT2', description: 'BÃI CON SÂU CỔNG BÙI VĂN BA', capacity: 6400, type: 'Nội bộ', crane: '' },
  { id: 3, location: 'BCSCC2TT2', description: 'BÃI CON SÂU TRƯỚC CẦU CÂN 2', capacity: 6656, type: 'Nội bộ', crane: '' },
  { id: 4, location: 'BCSKCXTT2', description: 'BÃI CON SÂU CỔNG KCX', capacity: 6400, type: 'Nội bộ', crane: '' },
  { id: 5, location: 'C1-HN', description: 'C1 GIÁP KHU HÀNG NỘI', capacity: 7208, type: 'Nội bộ', crane: '' },
  { id: 6, location: 'C1K2', description: 'C1 GIÁP KHO 2', capacity: 7208, type: 'Nội bộ', crane: '' },
  { id: 7, location: 'C1ND', description: 'C1 KHU HÀNG NỘI ĐỊA', capacity: 10816, type: 'Nội bộ', crane: '' },
  { id: 8, location: 'C1RC', description: 'C1 RỬA CONT', capacity: 9120, type: 'Nội bộ', crane: '' },
  { id: 9, location: 'C4BS', description: 'BÃI C4 BỜ SÔNG GIÁP DỊCH VỤ', capacity: 3054.4, type: 'Nội bộ', crane: '' },
  { id: 10, location: 'C4BT', description: 'BÃI C4 BỜ TƯỜNG GIÁP DỊCH VỤ', capacity: 3054.4, type: 'Nội bộ', crane: '' },
  { id: 11, location: 'C4N1', description: 'BÃI C4 ĐỐI DIỆN NỀN 1', capacity: 2124.8, type: 'Nội bộ', crane: '' },
];

export const BERTH_DATA: BerthData[] = [
  { id: 1, berthCode: 'K12', depth: 30, tonnage: 50000, fromMeter: 148, toMeter: 291, type: 'Nội bộ' },
  { id: 2, berthCode: 'K12A', depth: 25, tonnage: 50000, fromMeter: 7, toMeter: 125, type: 'Nội bộ' },
  { id: 3, berthCode: 'K12B', depth: 35, tonnage: 50000, fromMeter: 320, toMeter: 522, type: 'Nội bộ' },
  { id: 4, berthCode: 'K12C', depth: 25, tonnage: 50000, fromMeter: 0, toMeter: 182, type: 'Nội bộ' },
  { id: 5, berthCode: 'TT2', depth: 35, tonnage: 50000, fromMeter: 1, toMeter: 222, type: 'Nội bộ' },
];

export const BITT_DATA: BittData[] = [
  { id: 1, berthCode: 'TT2', bittCode: 'Bit00', fromMeter: 0, toMeter: 0 },
  { id: 2, berthCode: 'K12', bittCode: 'Bit01', fromMeter: 1, toMeter: 12 },
  { id: 3, berthCode: 'K12A', bittCode: 'Bit02', fromMeter: 13, toMeter: 30 },
  { id: 4, berthCode: 'K12B', bittCode: 'Bit03', fromMeter: 31, toMeter: 45 },
  { id: 5, berthCode: 'K12C', bittCode: 'Bit04', fromMeter: 46, toMeter: 61 },
  { id: 6, berthCode: 'TT2', bittCode: 'Bit05', fromMeter: 62, toMeter: 79 },
  { id: 7, berthCode: 'TT2', bittCode: 'Bit06', fromMeter: 80, toMeter: 97 },
  { id: 8, berthCode: 'TT2', bittCode: 'Bit07', fromMeter: 98, toMeter: 115 },
  { id: 9, berthCode: 'TT2', bittCode: 'Bit08', fromMeter: 116, toMeter: 132 },
  { id: 10, berthCode: 'TT2', bittCode: 'Bit09', fromMeter: 133, toMeter: 150 },
  { id: 11, berthCode: 'TT2', bittCode: 'Bit10', fromMeter: 151, toMeter: 166 },
];

export const EQUIPMENT_DATA: EquipmentData[] = [
  { id: 1, category: 'Yard Tractor', equipmentCode: 'CP2', equipmentName: 'CP2', type: 'Nội bộ' },
  { id: 2, category: 'Yard Tractor', equipmentCode: 'CP3', equipmentName: 'CP3', type: 'Nội bộ' },
  { id: 3, category: 'Yard Tractor', equipmentCode: 'CP4', equipmentName: 'CP4', type: 'Nội bộ' },
  { id: 4, category: 'Yard Tractor', equipmentCode: 'CP6', equipmentName: 'CP6', type: 'Nội bộ' },
  { id: 5, category: 'Yard Tractor', equipmentCode: 'CT', equipmentName: 'CT', type: 'Nội bộ' },
  { id: 6, category: 'Yard Tractor', equipmentCode: 'GW1', equipmentName: 'GW1', type: 'Nội bộ' },
  { id: 7, category: 'Yard Tractor', equipmentCode: 'GW2', equipmentName: 'GW2', type: 'Nội bộ' },
  { id: 8, category: 'Gantry Crane', equipmentCode: 'GW3', equipmentName: 'GW3', type: 'Nội bộ' },
  { id: 9, category: 'Gantry Crane', equipmentCode: 'GW4', equipmentName: 'GW4', type: 'Nội bộ' },
  { id: 10, category: 'Gantry Crane', equipmentCode: 'GW5', equipmentName: 'GW5', type: 'Nội bộ' },
  { id: 11, category: 'Romooc', equipmentCode: 'HS645', equipmentName: 'HS645', type: 'Nội bộ' },
];

export const GATE_DATA: GateData[] = [
  { id: 1, gateCode: 'IN1', gateName: 'Cổng vào 01', inOutDirection: 'Vào', importExportDirection: 'Nhập' },
  { id: 2, gateCode: 'IN2', gateName: 'Cổng vào 02', inOutDirection: 'Vào', importExportDirection: 'Xuất' },
  { id: 3, gateCode: 'OUT1', gateName: 'Cổng ra 01', inOutDirection: 'Ra', importExportDirection: 'Nhập' },
  { id: 4, gateCode: 'OUT2', gateName: 'Cổng ra 02', inOutDirection: 'Ra', importExportDirection: 'Xuất' },
];

export const TABS_CONFIG = [
  { id: TabType.YARD, label: 'Bãi', icon: Warehouse },
  { id: TabType.BERTH, label: 'Bến', icon: Anchor },
  { id: TabType.BITT, label: 'Bitt', icon: Grid3X3 },
  { id: TabType.EQUIPMENT, label: 'Thiết bị', icon: Settings },
  { id: TabType.GATE, label: 'Cổng', icon: DoorOpen },
];

export const ICONS = {
  Search,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  XCircle,
  ChevronDown,
  LayoutGrid
};
