export enum VesselStatus {
    PLANNED = 'PLANNED',
    AT_BERTH = 'AT_BERTH',
    DEPARTED = 'DEPARTED'
}

export interface Berth {
    id: string;
    name: string;
    startMeter: number;
    endMeter: number;
    color: string;
}

export interface Vessel {
    id: string;
    name: string;
    voyage: string;
    status: VesselStatus;
    startPosition: number; // Meters from start of quay
    length: number; // Length of ship in meters
    arrivalTime: Date;
    departureTime: Date;
    cargoType: string;
    color?: string;
}

export interface TimeRange {
    start: Date;
    end: Date;
}

// Types for Operations View
export interface CargoItem {
    id: string;
    billOfLading: string;
    commodity: string;
    quantity: number;
    unit: string;
    hatch: string; // Hầm hàng
    color: string;
}

export interface YardBlock {
    id: string;
    code: string;
    name: string;
    capacity: number;
    current: number;
    color: string;
    cargoType: string;
}

export interface YardInventoryItem {
    id: string;
    billOfLading: string;
    commodity: string;
    quantity: number;
    unit: string;
    location: string; // e.g., "A-01-02"
    dateIn: string;
    status: 'STORED' | 'OUTGOING';
}
