'use client';

import React, { useState, useMemo } from 'react';
import {
    Search,
    Plus,
    Trash2,
    Save,
    Anchor
} from 'lucide-react';
import { ServiceRecord, SortField, SortOrder } from './types';
import { INITIAL_DATA, ITEMS_PER_PAGE } from './constants';
import { ServiceTable } from './components';
import AddRowsModal from '@/components/AddRowsModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function DichVuPage() {
    useDocumentTitle('Quản lý Dịch vụ - GTOS');
    const [data, setData] = useState<ServiceRecord[]>(INITIAL_DATA);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState<SortField>('stt');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isSaving, setIsSaving] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);

    // Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Search & Filter Logic
    const filteredData = useMemo(() => {
        // Hàm chuẩn hóa tiếng Việt để tìm kiếm không dấu chính xác hơn (xử lý cả chữ đ)
        const normalize = (str: string) => {
            return str
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d");
        };

        const searchTerm = normalize(search);

        return data.filter(item =>
            normalize(item.name).includes(searchTerm) ||
            normalize(item.code).includes(searchTerm) ||
            normalize(item.plan).includes(searchTerm) ||
            item.stt.toString().includes(searchTerm)
        ).sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            return sortOrder === 'asc'
                ? (aValue as number) - (bValue as number)
                : (bValue as number) - (aValue as number);
        });
    }, [data, search, sortField, sortOrder]);

    const handleConfirmAdd = (count: number) => {
        if (count > 0) {
            const newServices: ServiceRecord[] = [];
            const baseId = Date.now();

            for (let i = 0; i < count; i++) {
                newServices.push({
                    id: String(baseId + i),
                    code: '',
                    name: '',
                    plan: '',
                    stt: baseId + i,
                    isShip: false,
                    isYard: false,
                    isGate: false,
                    selected: false
                });
            }

            // Add new shifts at the beginning (top of list)
            setData([...newServices, ...data]);
            setCurrentPage(1); // Go to first page to see new rows
            setIsModalOpen(false);
            setIsSaving(true);
        }
    };

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = useMemo(() => {
        // Đảm bảo trang hiện tại luôn hợp lệ khi lọc dữ liệu
        const safePage = Math.max(1, Math.min(currentPage, totalPages));

        const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredData, currentPage, totalPages]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Actions
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const toggleSelectAll = () => {
        const currentIds = new Set(paginatedData.map(d => d.id));
        const allSelected = paginatedData.every(d => selectedIds.has(d.id));

        const newSelectedIds = new Set(selectedIds);
        if (allSelected) {
            currentIds.forEach(id => newSelectedIds.delete(id));
        } else {
            currentIds.forEach(id => newSelectedIds.add(id));
        }
        setSelectedIds(newSelectedIds);
    };

    const toggleSelectRow = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleFeature = (id: string, feature: 'isShip' | 'isYard' | 'isGate') => {
        setData(prev => prev.map(item =>
            item.id === id ? { ...item, [feature]: !item[feature] } : item
        ));
    };

    const updateField = (id: string, field: keyof ServiceRecord, value: string | number) => {
        setData(prev => prev.map(item => {
            if (item.id !== id) return item;

            if (field === 'stt') {
                return { ...item, [field]: Number(value) };
            }

            return { ...item, [field]: value };
        }));
    };

    const openDeleteModal = () => {
        if (selectedIds.size === 0) return;
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        // Filter out selected items
        const remainingData = data.filter(item => !selectedIds.has(item.id));

        // Reindex STT starting from 1
        const reindexedData = remainingData.map((item, index) => ({
            ...item,
            stt: index + 1
        }));

        setData(reindexedData);
        setSelectedIds(new Set());
        setIsDeleteModalOpen(false);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#f0f9ff] text-slate-800 font-sans pb-10">

            {/* Decorative Background */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-0" />

            {/* Main Container */}
            <div className="relative z-10 w-full px-[10px]">

                {/* Header Section - Framed Card */}
                <div className="mt-[20px] mb-[12px] bg-white border border-slate-200 rounded p-[10px] shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Left: Icon + Title + Description */}
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Anchor size={28} className="text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-bold text-slate-800 uppercase tracking-wide">
                                    Quản lý Dịch vụ
                                </h1>
                                <p className="text-[14px] text-slate-500 mt-0.5">
                                    Cấu hình các dịch vụ cảng cho tàu, bãi và cổng.
                                </p>
                            </div>
                        </div>

                        {/* Right: Stats + Actions */}
                        <div className="flex items-center gap-4">
                            {/* Quick Stats */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded border border-slate-100">
                                    <span className="text-[12px] text-slate-500 uppercase font-medium">Tổng số</span>
                                    <span className="text-[18px] font-bold text-slate-700">{data.length}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded border border-slate-100">
                                    <span className="text-[12px] text-slate-500 uppercase font-medium">Đã chọn</span>
                                    <span className="text-[18px] font-bold text-blue-600">{selectedIds.size}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">

                    {/* Toolbar */}
                    <div className="p-[10px] border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-[10px] bg-white sticky top-0 z-20">
                        {/* Search */}
                        <div className="relative group w-full lg:w-[420px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm mã hoặc tên dịch vụ..."
                                className="block w-full h-[36px] pl-9 pr-4 bg-slate-50 border border-slate-200 rounded text-[14px] focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all placeholder-slate-400"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-[10px] w-full lg:w-auto overflow-x-auto">
                            {selectedIds.size > 0 && (
                                <button
                                    onClick={openDeleteModal}
                                    className="flex items-center gap-2 px-4 h-[36px] text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all text-[14px] font-medium"
                                >
                                    <Trash2 size={16} />
                                    <span>Xóa ({selectedIds.size})</span>
                                </button>
                            )}

                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 h-[36px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-all text-[14px] font-medium"
                            >
                                {isSaving ? (
                                    <span className="w-4 h-4 border-2 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
                                ) : (
                                    <Save size={16} />
                                )}
                                <span>Lưu</span>
                            </button>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 h-[36px] rounded-lg text-[14px] font-medium hover:bg-blue-700 transition-all shadow-sm"
                            >
                                <Plus size={16} strokeWidth={2.5} />
                                <span>Thêm mới</span>
                            </button>
                        </div>
                    </div>

                    {/* Service Table */}
                    <ServiceTable
                        data={paginatedData}
                        selectedIds={selectedIds}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onSort={handleSort}
                        onSelectAll={toggleSelectAll}
                        onSelectRow={toggleSelectRow}
                        onToggleFeature={toggleFeature}
                        onUpdateField={updateField}
                        onPageChange={handlePageChange}
                        filteredDataCount={filteredData.length}
                    />
                </div>
            </div>

            {/* --- ADD ROW MODAL --- */}
            <AddRowsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAdd}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                count={selectedIds.size}
                entityName="dòng"
            />
        </div>
    );
}
