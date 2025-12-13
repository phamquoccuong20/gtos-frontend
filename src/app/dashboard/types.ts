export enum Status {
    Active = 'Active',
    Idle = 'Idle',
    Maintenance = 'Maintenance',
    Warning = 'Warning',
}

export interface Berth {
    id: string;
    name: string;
    shipName: string;
    cargoType: string;
    eta: string;
    progress: number; // 0-100
    status: Status;
}

export interface CargoStat {
    name: string;
    value: number; // tons
    color: string;
}

export interface ActivityLog {
    id: string;
    type: 'success' | 'warning' | 'info';
    message: string;
    time: string;
}

export interface TrendData {
    month: string;
    import: number;
    export: number;
}

export interface EquipmentData {
    name: string;
    value: number;
    color: string;
}

export interface ReportItem {
    id: string;
    cargo: string;
    type: string;
    ship: string;
    weight: number;
    date: string;
    status: 'Completed' | 'Processing' | 'Pending';
}

export interface HistoryEvent {
    id: string;
    time: string;
    date: string;
    type: 'start' | 'pause' | 'incident' | 'completion' | 'info';
    title: string;
    description: string;
    user: string;
}
