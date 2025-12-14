/**
 * User entity representing a system user
 */
export interface User {
    id: number;
    group: string; // Nhóm
    portCode: string; // Mã Cảng (TTP)
    username: string; // Tên đăng nhập
    fullName: string; // Họ tên
    idNumber: string; // ĐKKD / CMND
    address: string; // Địa chỉ
    phone: string; // Số điện thoại
    email: string; // Email
    status: boolean; // Trạng thái (Active/Inactive)
    avatarUrl?: string; // Optional avatar
}

/**
 * Sidebar navigation item type
 */
export type SidebarItem = {
    label: string;
    icon: any;
    active?: boolean;
    subItems?: string[];
    isOpen?: boolean;
};

/**
 * Sort configuration for table
 */
export interface SortConfig {
    key: keyof User;
    direction: 'asc' | 'desc';
}

/**
 * Column filters type
 */
export type ColumnFilters = Partial<Record<keyof User, string>>;
