
export interface Ship {
  id: string;
  type: string;
  code: string;
  name: string;
  nationality: string;
  callSign: string;
  imo: string;
  loa: string;
  maxBeam: string;
  depth: string;
  holds: string;
  grt: string;
  dwt: string;
}

export type ViewMode = 'list' | 'edit' | 'add';
