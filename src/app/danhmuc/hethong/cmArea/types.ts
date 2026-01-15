
export type AreaType = 'Nội bộ' | 'Thuê';

export interface Area {
  id: string;
  index: number;
  code: string;
  name: string;
  capacity: number;
  type: AreaType;
}

export interface Stats {
  totalAreas: number;
  totalCapacity: number;
  internalCount: number;
  externalCount: number;
}
