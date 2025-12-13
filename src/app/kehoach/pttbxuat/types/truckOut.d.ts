export interface VesselInfo {
  VoyageKey: string;
  VesselName: string;
  InboundVoyage: string;
  OutboundVoyage: string;
  ATA: string;
  ETA: string;
  ETD: string;
  VesselType: number;
}

export interface TruckOutItem {
  DeviceID: string;
  isLease: number;
  Cellar?: number;
  [key: string]: any;
}

export interface TruckOutResponse {
  result: {
    Cellars: number[];
    result: TruckOutItem[];
  };
  errCode: number;
}
