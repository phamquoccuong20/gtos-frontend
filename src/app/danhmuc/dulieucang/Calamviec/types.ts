export interface Shift {
  id: number;
  code: string;
  category: 'hanh_chinh' | 'ca_ngay' | 'ca_dem';
  startTime: string;
  endTime: string;
  note: string; // Used as "Khu vực / Ghi chú"
  selected: boolean;
}

export type ShiftCategoryFilter = 'all' | 'ca_ngay' | 'ca_dem' | 'hanh_chinh';
