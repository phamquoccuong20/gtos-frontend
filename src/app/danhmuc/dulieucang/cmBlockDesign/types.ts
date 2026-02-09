export interface YardItem {
  id: string;
  code: string;
  quantity: number;
  weight: number;
}

export interface YardSection {
  id: string;
  name: string;
  label: string;
  capacity: number;
  currentValue: number;
  items: YardItem[];
  colorTheme: string;
}

export interface YardStats {
  totalCapacity: number;
  totalUsed: number;
  totalQuantity: number;
}
