import React from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    MoreHorizontal
} from 'lucide-react';
import { Shift } from '../types';
import { CategoryDropdown } from './CategoryDropdown';

interface ShiftTableProps {
    shifts: Shift[];
    paginatedShifts: Shift[];
    filteredShiftsLength: number;
    startIndex: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    isAllPageSelected: boolean;
    onToggleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleSelect: (id: number) => void;
    onUpdateShift: (id: number, field: keyof Shift, value: string) => void;
    onGoToPrevPage: () => void;
    onGoToNextPage: () => void;
}

// Helper to format time for display (e.g., "07:30" -> "07:30 AM")
const formatTimeDisplay = (time: string): string => {
    if (!time) return '--:--';
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
};

// Category badge config
const CATEGORY_CONFIG = {
    hanh_chinh: { label: 'Hành chính', className: 'bg-slate-100 text-slate-600 border-slate-200' },
    ca_ngay: { label: 'Ca Ngày', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    ca_dem: { label: 'Ca Đêm', className: 'bg-blue-50 text-blue-600 border-blue-200' },
};

export const ShiftTable: React.FC<ShiftTableProps> = ({
    paginatedShifts,
    filteredShiftsLength,
    startIndex,
    itemsPerPage,
    currentPage,
    totalPages,
    isAllPageSelected,
    onToggleSelectAll,
    onToggleSelect,
    onUpdateShift,
    onGoToPrevPage,
    onGoToNextPage
}) => {
    const safePage = Math.min(currentPage, totalPages);

    return (
        <div className="bg-white border border-slate-200 rounded-b shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse table-fixed">
                    <thead>
                        <tr className="bg-slate-50 text-[14px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                            <th className="p-[10px] w-[4%] text-center">
                                <input
                                    type="checkbox"
                                    onChange={onToggleSelectAll}
                                    checked={isAllPageSelected}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                                />
                            </th>
                            <th className="p-[10px] w-[6%] text-center border-r border-slate-200">STT</th>
                            <th className="p-[10px] w-[12%] text-left border-r border-slate-200">Mã ca</th>
                            <th className="p-[10px] w-[12%] text-center border-r border-slate-200">Phân loại</th>
                            <th className="p-[10px] w-[14%] text-center border-r border-slate-200">Bắt đầu</th>
                            <th className="p-[10px] w-[14%] text-center border-r border-slate-200">Kết thúc</th>
                            <th className="p-[10px] w-[33%] text-left border-r border-slate-200">Khu vực / Ghi chú</th>
                            <th className="p-[10px] w-[5%] text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedShifts.map((shift, index) => {
                            const categoryInfo = CATEGORY_CONFIG[shift.category];
                            return (
                                <tr
                                    key={shift.id}
                                    className={`group transition-colors border-b border-slate-100 last:border-b-0 ${shift.selected ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}
                                >
                                    <td className="p-[10px] text-center border-r border-slate-100">
                                        <input
                                            type="checkbox"
                                            checked={shift.selected}
                                            onChange={() => onToggleSelect(shift.id)}
                                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                                        />
                                    </td>
                                    <td className="p-[10px] text-center text-[14px] font-medium text-slate-400 border-r border-slate-100">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="p-[10px] border-r border-slate-100">
                                        <input
                                            type="text"
                                            value={shift.code}
                                            onChange={(e) => onUpdateShift(shift.id, 'code', e.target.value)}
                                            placeholder="Nhập mã ca..."
                                            className="w-full bg-transparent border-none outline-none text-[14px] font-bold text-slate-700 placeholder-slate-300"
                                        />
                                    </td>
                                    <td className="p-[10px] text-center border-r border-slate-100">
                                        <CategoryDropdown
                                            value={shift.category}
                                            onChange={(val) => onUpdateShift(shift.id, 'category', val)}
                                        />
                                    </td>
                                    <td className="p-[10px] border-r border-slate-100">
                                        <div className="flex items-center justify-center text-[14px] text-slate-600">
                                            <input
                                                type="time"
                                                value={shift.startTime}
                                                onChange={(e) => onUpdateShift(shift.id, 'startTime', e.target.value)}
                                                className="bg-transparent border-none outline-none text-[14px] text-slate-600 cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-[10px] border-r border-slate-100">
                                        <div className="flex items-center justify-center text-[14px] text-slate-600">
                                            <input
                                                type="time"
                                                value={shift.endTime}
                                                onChange={(e) => onUpdateShift(shift.id, 'endTime', e.target.value)}
                                                className="bg-transparent border-none outline-none text-[14px] text-slate-600 cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-[10px] border-r border-slate-100">
                                        <input
                                            type="text"
                                            value={shift.note}
                                            onChange={(e) => onUpdateShift(shift.id, 'note', e.target.value)}
                                            placeholder="Nhập ghi chú..."
                                            className="w-full bg-transparent border-none outline-none text-[14px] text-blue-600 placeholder-slate-300"
                                        />
                                    </td>
                                    <td className="p-[10px] text-center">
                                        <button className="text-slate-300 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {paginatedShifts.length === 0 && (
                            <tr>
                                <td colSpan={8} className="py-[10px] text-center text-slate-400 bg-slate-50/50">
                                    <div className="flex flex-col items-center gap-[10px]">
                                        <Search size={40} className="text-slate-200" />
                                        <p className="text-[14px]">Không tìm thấy dữ liệu phù hợp.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer */}
            <div className="bg-white border-t border-slate-200 px-[10px] py-[10px] flex justify-between items-center">
                <span className="text-[14px] text-slate-500">
                    Hiển thị {filteredShiftsLength > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredShiftsLength)} trên tổng số {filteredShiftsLength} kết quả
                </span>
                <div className="flex gap-[10px] items-center">
                    <button
                        onClick={onGoToPrevPage}
                        disabled={safePage === 1}
                        className="w-[36px] h-[36px] flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-500 transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="h-[36px] px-[10px] flex items-center justify-center bg-white border border-slate-200 rounded text-[14px] text-slate-600 min-w-[80px]">
                        Trang {safePage} / {totalPages}
                    </div>

                    <button
                        onClick={onGoToNextPage}
                        disabled={safePage === totalPages || totalPages === 0}
                        className="w-[36px] h-[36px] flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-500 transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
