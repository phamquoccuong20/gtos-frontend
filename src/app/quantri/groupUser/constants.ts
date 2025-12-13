import { UserGroup } from './types';

export const INITIAL_DATA: UserGroup[] = [
    { id: '1', code: 'BKDKT', name: 'BAN KINH DOANH KHAI THÁC', level: 0, note: '' },
    { id: '2', code: 'BKT', name: 'BAN KẾ TOÁN', level: 0, note: '' },
    { id: '3', code: 'ĐCG', name: 'ĐỘI CƠ GIỚI', level: 3, note: '' },
    { id: '4', code: 'ĐKH', name: 'ĐỘI KHO HÀNG', level: 3, note: '' },
    { id: '5', code: 'ĐỘI BẢO VỆ', name: 'ĐỘI BẢO VỆ', level: 0, note: '' },
    { id: '6', code: 'GroupAdmin', name: 'Nhóm Admin', level: 1, note: '' },
    { id: '7', code: 'GroupVesselOwner', name: 'Nhóm chủ tàu', level: 3, note: '' },
    { id: '8', code: 'KH', name: 'Khách hàng', level: 4, note: '' },
    { id: '9', code: 'QT', name: 'Quản trị', level: 2, note: '' },
    { id: '10', code: 'TALLY', name: 'TALLY', level: 2, note: '' },
    { id: '11', code: 'TBSX', name: 'TRỰC BAN SẢN XUẤT', level: 0, note: '' },
    { id: '12', code: 'GIAONHAN', name: 'Bộ phận giao nhận', level: 3, note: '' },
];

export const ITEMS_PER_PAGE = 10;
