import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Filter,
    X
} from 'lucide-react';
import { Shift } from '../types';
import { CategoryDropdown } from './CategoryDropdown';

interface SortConfig {
    key: keyof Shift;
    direction: 'asc' | 'desc';
}

interface ColumnFilters {
    [key: string]: string;
}

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
    
    // Filter states
    const [activeMenuColumn, setActiveMenuColumn] = useState<keyof Shift | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});
    const menuRef = useRef<HTMLDivElement>(null);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenuColumn(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSort = (key: keyof Shift, direction: 'asc' | 'desc') => {
        setSortConfig({ key, direction });
        setActiveMenuColumn(null);
    };

    const handleColumnFilter = (key: keyof Shift, value: string) => {
        setColumnFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearColumnFilter = (key: keyof Shift) => {
        setColumnFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[key];
            return newFilters;
        });
    };

    // Apply filtering and sorting to data
    const processedShifts = React.useMemo(() => {
        let result = [...paginatedShifts];

        // Apply column filters
        Object.entries(columnFilters).forEach(([key, value]) => {
            if (value) {
                result = result.filter(shift => {
                    const fieldValue = shift[key as keyof Shift];
                    if (typeof fieldValue === 'string') {
                        return fieldValue.toLowerCase().includes(value.toLowerCase());
                    }
                    return true;
                });
            }
        });

        // Apply sorting
        if (sortConfig) {
            result.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                
                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortConfig.direction === 'asc' 
                        ? aVal.localeCompare(bVal) 
                        : bVal.localeCompare(aVal);
                }
                return 0;
            });
        }

        return result;
    }, [paginatedShifts, columnFilters, sortConfig]);

    // Render Header Menu
    const renderHeaderMenu = (columnKey: keyof Shift, title: string) => {
        const isActive = activeMenuColumn === columnKey;
        const currentSort = sortConfig?.key === columnKey ? sortConfig.direction : null;
        const currentFilter = columnFilters[columnKey];
        const isFiltered = !!currentFilter;

        return (
            <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuColumn(isActive ? null : columnKey);
                    }}
                    className={`p-1 rounded-md transition-all duration-200 ${isActive || isFiltered || currentSort
                        ? 'bg-blue-200 text-blue-700'
                        : 'text-[#1971c2]/60 hover:bg-blue-100 hover:text-blue-600'
                        }`}
                >
                    <ArrowUpDown size={12} />
                </button>

                {isActive && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 z-50"
                    >
                        <div className="p-1">
                            <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-50 mb-1">
                                {title}
                            </div>

                            {/* Sorting Options */}
                            <button
                                onClick={() => handleSort(columnKey, 'asc')}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${currentSort === 'asc' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <ArrowUp size={14} />
                                <span>Sắp xếp A - Z</span>
                            </button>
                            <button
                                onClick={() => handleSort(columnKey, 'desc')}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${currentSort === 'desc' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <ArrowDown size={14} />
                                <span>Sắp xếp Z - A</span>
                            </button>

                            <div className="my-1 border-t border-slate-100"></div>

                            {/* Filtering Options */}
                            <div className="px-3 py-2">
                                <div className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1">
                                    <Filter size={10} />
                                    Lọc theo giá trị
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Nhập để lọc..."
                                        value={currentFilter || ''}
                                        onChange={(e) => handleColumnFilter(columnKey, e.target.value)}
                                        className="w-full pl-2 pr-7 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        autoFocus
                                    />
                                    {currentFilter && (
                                        <button
                                            onClick={() => clearColumnFilter(columnKey)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {(currentFilter || currentSort) && (
                                <div className="mt-1 pt-1 border-t border-slate-100">
                                    <button
                                        onClick={() => {
                                            clearColumnFilter(columnKey);
                                            if (currentSort) setSortConfig(null);
                                            setActiveMenuColumn(null);
                                        }}
                                        className="w-full text-center py-1.5 text-xs text-red-600 hover:bg-red-50 rounded font-medium transition-colors"
                                    >
                                        Xóa lọc & sắp xếp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white border border-slate-200 rounded-b shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse table-fixed">
                    <thead>
                        <tr className="bg-[#d0ebff] text-[12px] font-bold text-[#1971c2] uppercase tracking-wider border-b border-blue-200">
                            <th className="p-[10px] w-[4%] text-center">
                                <input
                                    type="checkbox"
                                    onChange={onToggleSelectAll}
                                    checked={isAllPageSelected}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                                />
                            </th>
                            <th className="p-[10px] w-[6%] text-center border-r border-slate-200">STT</th>
                            <th className="p-[10px] w-[12%] text-left border-r border-slate-200">
                                <div className="flex items-center justify-between">
                                    <span>Mã ca</span>
                                    {renderHeaderMenu('code', 'Mã ca')}
                                </div>
                            </th>
                            <th className="p-[10px] w-[12%] text-center border-r border-slate-200">
                                <div className="flex items-center justify-between">
                                    <span>Phân loại</span>
                                    {renderHeaderMenu('category', 'Phân loại')}
                                </div>
                            </th>
                            <th className="p-[10px] w-[14%] text-center border-r border-slate-200">
                                <div className="flex items-center justify-between">
                                    <span>Bắt đầu</span>
                                    {renderHeaderMenu('startTime', 'Bắt đầu')}
                                </div>
                            </th>
                            <th className="p-[10px] w-[14%] text-center border-r border-slate-200">
                                <div className="flex items-center justify-between">
                                    <span>Kết thúc</span>
                                    {renderHeaderMenu('endTime', 'Kết thúc')}
                                </div>
                            </th>
                            <th className="p-[10px] w-[33%] text-left">Khu vực / Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedShifts.map((shift, index) => {
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
                                    <td className="p-[10px]">
                                        <input
                                            type="text"
                                            value={shift.note}
                                            onChange={(e) => onUpdateShift(shift.id, 'note', e.target.value)}
                                            placeholder="Nhập ghi chú..."
                                            className="w-full bg-transparent border-none outline-none text-[14px] text-blue-600 placeholder-slate-300"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                        {processedShifts.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-[10px] text-center text-slate-400 bg-slate-50/50">
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
