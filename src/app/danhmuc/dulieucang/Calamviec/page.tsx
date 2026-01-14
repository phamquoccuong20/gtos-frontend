"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    CheckCircle2,
    Clock,
    Plus,
    Search,
    Trash2,
    Save
} from 'lucide-react';
import { Shift, ShiftCategoryFilter } from './types';
import AddRowsModal from '@/components/AddRowsModal';
import { ShiftTable } from './components/ShiftTable';
import { ConfirmSaveModal } from './components/ConfirmSaveModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

const Page = () => {
    // --- State ---
    const [shifts, setShifts] = useState<Shift[]>([
        { id: 1, code: 'HC-01', category: 'hanh_chinh', startTime: '07:30', endTime: '16:30', note: 'Khối văn phòng & Kế hoạch', selected: false },
        { id: 2, code: 'CA-S1', category: 'ca_ngay', startTime: '06:00', endTime: '14:00', note: 'Đội bốc xếp 1 - Cầu tàu A', selected: false },
        { id: 3, code: 'CA-S2', category: 'ca_ngay', startTime: '14:00', endTime: '22:00', note: 'Đội bốc xếp 2 - Cầu tàu A', selected: false },
        { id: 4, code: 'CA-D1', category: 'ca_dem', startTime: '22:00', endTime: '06:00', note: 'Đội trực đêm & An ninh', selected: false },
        { id: 5, code: 'CONT-1', category: 'hanh_chinh', startTime: '06:00', endTime: '18:00', note: 'Khu vực bãi Container A', selected: false },
        { id: 6, code: 'CONT-2', category: 'ca_dem', startTime: '18:00', endTime: '06:00', note: 'Khu vực bãi Container B', selected: false },
        ...Array.from({ length: 13 }).map((_, i) => ({
            id: i + 7,
            code: `CONT-${i + 3}`,
            category: (['ca_ngay', 'ca_dem', 'hanh_chinh'] as const)[i % 3],
            startTime: '06:00',
            endTime: '06:00',
            note: `Khu vực bãi Container ${String.fromCharCode(67 + (i % 3))}`,
            selected: false
        }))
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<ShiftCategoryFilter>('all');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Track changes state
    const [hasChanges, setHasChanges] = useState(false);
    const initialShiftsRef = useRef<string>(JSON.stringify(shifts));

    // Save confirmation modal state
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    // Delete confirmation modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // --- Derived State (Filter & Pagination) ---
    const filteredShifts = shifts.filter(s => {
        const matchesSearch = s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.note.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredShifts.length / itemsPerPage) || 1;

    // --- Effects ---
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [filteredShifts.length, totalPages, currentPage]);

    // --- Pagination Slice ---
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * itemsPerPage;
    const paginatedShifts = filteredShifts.slice(startIndex, startIndex + itemsPerPage);

    const selectedCount = shifts.filter(s => s.selected).length;
    const isAllPageSelected = paginatedShifts.length > 0 && paginatedShifts.every(s => s.selected);

    // --- Handlers ---
    const updateShift = (id: number, field: keyof Shift, value: string) => {
        setShifts(shifts.map(s => s.id === id ? { ...s, [field]: value } : s));
        setHasChanges(true);
    };

    const toggleSelect = (id: number) => {
        setShifts(shifts.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
    };

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const currentIds = paginatedShifts.map(s => s.id);
        setShifts(shifts.map(s => currentIds.includes(s.id) ? { ...s, selected: isChecked } : s));
    };

    const deleteSelected = () => {
        setShifts(prev => prev.filter(s => !s.selected));
        setHasChanges(true);
    };

    const handleConfirmDelete = () => {
        setShifts(prev => prev.filter(s => !s.selected));
        setHasChanges(true);
        setIsDeleteModalOpen(false);
    };

    const openDeleteModal = () => {
        const count = shifts.filter(s => s.selected).length;
        if (count === 0) return;
        setIsDeleteModalOpen(true);
    };

    const handleOpenAddModal = () => {
        setIsModalOpen(true);
    };

    const handleConfirmAdd = (count: number) => {
        if (count > 0) {
            const newShifts: Shift[] = [];
            const baseId = Date.now();

            for (let i = 0; i < count; i++) {
                newShifts.push({
                    id: baseId + i,
                    code: '',
                    category: 'hanh_chinh',
                    startTime: '',
                    endTime: '',
                    note: '',
                    selected: false
                });
            }

            // Add new shifts at the beginning (top of list)
            setShifts([...newShifts, ...shifts]);
            setCurrentPage(1); // Go to first page to see new rows
            setIsModalOpen(false);
            setHasChanges(true);
        }
    };

    const handleSave = () => {
        // Here you would typically call an API to save the data
        console.log('Saving shifts:', shifts);

        // Update the initial reference
        initialShiftsRef.current = JSON.stringify(shifts);
        setHasChanges(false);
    };

    const openSaveModal = () => {
        setIsSaveModalOpen(true);
    };

    const goToPrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
    const goToNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    // Tab config
    const tabs: { key: ShiftCategoryFilter; label: string }[] = [
        { key: 'all', label: 'Tất cả' },
        { key: 'ca_ngay', label: 'Ca Ngày / SX' },
        { key: 'ca_dem', label: 'Ca Đêm' },
        { key: 'hanh_chinh', label: 'Hành chính' },
    ];

    return (
        <>
            {/* Header Section - wrapped in bordered card */}
            <div className="mt-[20px] mb-[12px] bg-white border border-slate-200 rounded p-[10px] shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-[10px]">
                    <div className="flex items-center gap-[10px]">
                        {/* Icon */}
                        <div className="bg-blue-600 text-white p-2.5 rounded">
                            <Clock size={24} />
                        </div>
                        {/* Title & Description */}
                        <div>
                            <h1 className="text-[18px] font-bold text-slate-800">CA LÀM VIỆC</h1>
                            <p className="text-slate-500 text-[14px]">Cấu hình thời gian làm việc cho các đội xếp dỡ, cầu tàu và kho bãi.</p>
                        </div>
                    </div>

                    {/* Quick Stats in Header */}
                    <div className="flex gap-[10px]">
                        <div className="bg-slate-50 p-[10px] rounded border border-slate-200 flex items-center gap-[10px]">
                            <div className="bg-blue-50 text-blue-600 p-2 rounded">
                                <CheckCircle2 size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wide">Tổng số</div>
                                <div className="text-[18px] font-bold text-slate-700 leading-none">{shifts.length}</div>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-[10px] rounded border border-slate-200 flex items-center gap-[10px]">
                            <div className="bg-orange-50 text-orange-500 p-2 rounded">
                                <Clock size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wide">Đã chọn</div>
                                <div className="text-[18px] font-bold text-slate-700 leading-none">{selectedCount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-[10px] mb-[10px] border-b border-slate-200">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setCategoryFilter(tab.key)}
                        className={`px-[10px] py-2 text-[14px] font-medium transition-colors relative
                            ${categoryFilter === tab.key
                                ? 'text-blue-600'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {tab.label}
                        {categoryFilter === tab.key && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
                        )}
                    </button>
                ))}
            </div>

            {/* Action Toolbar */}
            <div className="bg-white p-[10px] rounded-t border border-b-0 border-slate-200 flex flex-col md:flex-row justify-between items-center gap-[10px] shadow-sm">

                {/* Left: Search */}
                <div className="relative w-full md:w-80 group">
                    <input
                        type="text"
                        placeholder="Tìm kiếm mã ca, khu vực..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-[36px] pl-9 pr-4 bg-slate-50 border border-slate-200 rounded text-[14px] focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder-slate-400"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-[10px] w-full md:w-auto">
                    {selectedCount > 0 && (
                        <button
                            onClick={openDeleteModal}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-[10px] h-[36px] text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded text-[14px] font-medium transition-all"
                        >
                            <Trash2 size={14} />
                            <span>Xóa ({selectedCount})</span>
                        </button>
                    )}

                    <button
                        onClick={handleOpenAddModal}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-[10px] h-[36px] text-white bg-blue-600 hover:bg-blue-700 rounded text-[14px] font-medium transition-all shadow-sm"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        <span>Thêm dòng</span>
                    </button>

                    {hasChanges && (
                        <button
                            onClick={openSaveModal}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-[10px] h-[36px] text-white bg-green-600 hover:bg-green-700 rounded text-[14px] font-medium transition-all shadow-sm"
                        >
                            <Save size={16} />
                            <span>Lưu</span>
                        </button>
                    )}

                </div>
            </div>

            {/* Data Table */}
            <ShiftTable
                shifts={shifts}
                paginatedShifts={paginatedShifts}
                filteredShiftsLength={filteredShifts.length}
                startIndex={startIndex}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                totalPages={totalPages}
                isAllPageSelected={isAllPageSelected}
                onToggleSelectAll={toggleSelectAll}
                onToggleSelect={toggleSelect}
                onUpdateShift={updateShift}
                onGoToPrevPage={goToPrevPage}
                onGoToNextPage={goToNextPage}
            />

            {/* --- ADD ROW MODAL --- */}
            <AddRowsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAdd}
            />

            {/* --- SAVE CONFIRMATION MODAL --- */}
            <ConfirmSaveModal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                onConfirm={handleSave}
            />

            {/* --- DELETE CONFIRMATION MODAL --- */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                count={selectedCount}
                entityName="dòng"
            />
        </>
    );
};

export default Page;
