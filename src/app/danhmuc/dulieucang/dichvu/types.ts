export interface ServiceRecord {
  id: string;
  stt: number;
  code: string;
  name: string;
  plan: string; // Phương án
  isShip: boolean; // Tàu
  isYard: boolean; // Bãi
  isGate: boolean; // Cổng
  selected: boolean;
}

export type SortField = 'stt' | 'code' | 'name' | 'plan';
export type SortOrder = 'asc' | 'desc';
