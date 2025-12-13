export interface UserGroup {
    id: string;
    code: string;
    name: string;
    level: number;
    note: string;
}

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export type SortConfig = {
    key: keyof UserGroup;
    direction: SortDirection;
} | null;
