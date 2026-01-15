
export enum TabType {
  YARD = 'BÃI',
  BERTH = 'BẾN',
  BITT = 'BITT',
  EQUIPMENT = 'THIẾT BỊ',
  GATE = 'CỔNG'
}

export interface YardData {
  id: number;
  location: string;
  description: string;
  capacity: number;
  type: string;
  crane: string;
}

export interface BerthData {
  id: number;
  berthCode: string;
  depth: number;
  tonnage: number;
  fromMeter: number;
  toMeter: number;
  type: string;
}

export interface BittData {
  id: number;
  berthCode: string;
  bittCode: string;
  fromMeter: number;
  toMeter: number;
}

export interface EquipmentData {
  id: number;
  category: string;
  equipmentCode: string;
  equipmentName: string;
  type: string;
}

export interface GateData {
  id: number;
  gateCode: string;
  gateName: string;
  inOutDirection: string;
  importExportDirection: string;
}
