import { User } from './types';

/**
 * Items per page for pagination
 */
export const ITEMS_PER_PAGE = 5;

/**
 * Available user groups
 */
export const USER_GROUPS = [
    'Nhóm Admin',
    'Nhóm Kế Toán',
    'Nhóm Vận Hành',
    'Nhóm Kỹ Thuật',
    'Nhóm CSKH',
    'Nhóm API',
] as const;

/**
 * Default form data for new user
 */
export const DEFAULT_FORM_DATA: Partial<User> = {
    group: 'Nhóm Admin',
    portCode: 'TTP',
    username: '',
    fullName: '',
    idNumber: '',
    address: '',
    phone: '',
    email: '',
    status: true,
};

/**
 * Mock users data
 */
export const MOCK_USERS: User[] = [
    {
        id: 1,
        group: 'Nhóm Admin',
        portCode: 'TTP',
        username: 'admin',
        fullName: 'Administrator',
        idNumber: '221231234',
        address: 'Q.7, TP.HCM',
        phone: '0902120031',
        email: 'admin@gtos.com.vn',
        status: true,
    },
    {
        id: 2,
        group: 'Nhóm Kế Toán',
        portCode: 'TTP',
        username: 'anhbtk',
        fullName: 'Bùi Thị Kim Anh',
        idNumber: '079182938',
        address: '',
        phone: '0909112233',
        email: 'anhbtk@gtos.com.vn',
        status: true,
    },
    {
        id: 3,
        group: 'Nhóm Admin',
        portCode: 'TTP',
        username: 'anhnnl',
        fullName: 'Nguyễn Nhật Linh Anh',
        idNumber: '',
        address: 'Hà Nội',
        phone: '0912334455',
        email: 'linhanh@gmail.com',
        status: false,
    },
    {
        id: 4,
        group: 'Nhóm Vận Hành',
        portCode: 'TTP',
        username: 'anhnt',
        fullName: 'Nguyễn Tuấn Anh',
        idNumber: '281923011',
        address: '',
        phone: '0988776655',
        email: 'tuananh@vimc.vn',
        status: true,
    },
    {
        id: 5,
        group: 'Nhóm Admin',
        portCode: 'TTP',
        username: 'anth',
        fullName: 'Trịnh Hữu Ân',
        idNumber: '',
        address: '',
        phone: '',
        email: '',
        status: true,
    },
    {
        id: 6,
        group: 'Nhóm API',
        portCode: 'TTP',
        username: 'api_system',
        fullName: 'System API',
        idNumber: '',
        address: 'Server Internal',
        phone: '',
        email: 'api@gtos.dev',
        status: true,
    },
    {
        id: 7,
        group: 'Nhóm Kỹ Thuật',
        portCode: 'TTP',
        username: 'baolq',
        fullName: 'Lương Quốc Bảo',
        idNumber: '213123111',
        address: '',
        phone: '0977112233',
        email: 'baolq@gtos.com.vn',
        status: true,
    },
    {
        id: 8,
        group: 'Nhóm Admin',
        portCode: 'TTP',
        username: 'binhdt',
        fullName: 'Đỗ Trọng Bình',
        idNumber: '',
        address: '',
        phone: '',
        email: '',
        status: false,
    },
    {
        id: 9,
        group: 'Nhóm Admin',
        portCode: 'TTP',
        username: 'binhlt',
        fullName: 'Lê Thái Bình',
        idNumber: '',
        address: '',
        phone: '',
        email: '',
        status: true,
    },
    {
        id: 10,
        group: 'Nhóm Admin',
        portCode: 'TTP',
        username: 'binhmv',
        fullName: 'Mai Văn Bình',
        idNumber: '213009988',
        address: 'Đà Nẵng',
        phone: '0913882299',
        email: 'binhmv@gtos.com.vn',
        status: true,
    },
    {
        id: 11,
        group: 'Nhóm CSKH',
        portCode: 'TTP',
        username: 'thuynt',
        fullName: 'Nguyễn Thanh Thủy',
        idNumber: '023123888',
        address: 'Q.4, TP.HCM',
        phone: '0933445566',
        email: 'thuynt@saigonport.vn',
        status: true,
    },
];
