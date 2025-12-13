export interface Vessel {
  id: string;
  name: string;
  code: string; // Inbound/Outbound usually combined or separate
  inboundVoy: string;
  outboundVoy: string;
  year: string;
  eta: string;
  etd: string;
  ata: string; // Actual Time of Arrival
  inboundLane: string;
  outboundLane: string;
  status: 'arriving' | 'at_port' | 'departed';
  hatches: string[]; // List of available hatches for this vessel
}

export interface CargoSummary {
  id: string;
  vesselId: string; // Link cargo to specific vessel
  name: string;
  count: number; // Current available count
  initialCount: number; // For progress tracking
  unit: string;
  color: string;
  cargoType?: string; // e.g. Steel, General
  weightPerUnit?: number;
}

export interface YardBlockContent {
  cargoId: string;
  cargoName: string;
  quantity: number;
  unit: string;
  color: string;
  weight: number;
  vesselName?: string;
  vesselCode?: string;
}

export interface YardBlock {
  id: string;
  name: string;
  zone: string;
  vesselName: string;
  vesselCode: string;
  contents: YardBlockContent[]; // Changed from single fields to array
  capacityCurrent: number;
  capacityMax: number;
  status: 'active' | 'full' | 'warning';
}

export interface FilterState {
  vesselId: string | null;
  cargoType: string | null;
  hatch: string | null;
  dateRange: {
    start: string;
    end: string;
  };
}