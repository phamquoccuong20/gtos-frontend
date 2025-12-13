import { ServiceRecord } from './types';

export const ITEMS_PER_PAGE = 10;

export const INITIAL_DATA: ServiceRecord[] = [
    { id: '1', stt: 1, code: '00', name: 'Giá đỗ tại phao', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '2', stt: 2, code: '01', name: 'Giá đỗ tại cầu', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '3', stt: 3, code: '02', name: 'Giá tàu lai hỗ trợ', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '4', stt: 4, code: '03', name: 'Giá buộc mở dây', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '5', stt: 5, code: '04', name: 'Giá đổ rác', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '6', stt: 6, code: '05', name: 'Giá hành khách', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '7', stt: 7, code: '06', name: 'Giá đại lý', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '8', stt: 8, code: '07', name: 'Cước thông tin liên lạc', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '9', stt: 9, code: '08', name: 'Cước đi lại phục vụ Đại lý', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
    { id: '10', stt: 10, code: '10', name: 'Cước bốc xếp hàng', plan: '', isShip: true, isYard: true, isGate: true, selected: false },
];
