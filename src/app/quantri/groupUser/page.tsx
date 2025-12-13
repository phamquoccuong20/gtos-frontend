"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
    Search,
    Plus,
    Trash2,
    Users,
    Save,
} from 'lucide-react';
import { INITIAL_DATA, ITEMS_PER_PAGE } from './constants';
import { UserGroup } from './types';
import {
    Modal,
    ConfirmModal,
    SaveModal,
    FilterTab,
    UserGroupTable
} from './components';

export default function GroupUserPage() {
    const [data, setData] = useState<UserGroup[]>(INITIAL_DATA);
    const [searchQuery, setSearchQuery] = useState('');

    // Track modified items
    const [modifiedIds, setModifiedIds] = useState<Set<string>>(new Set());

    // Modals state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const [filterLevel, setFilterLevel] = useState<number | 'all'>('all');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);

    // Filter Data
    const filteredData = useMemo(() => {
        let processed = [...data];

        // Search
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            processed = processed.filter(item =>
                item.code.toLowerCase().includes(lowerQuery) ||
                item.name.toLowerCase().includes(lowerQuery)
            );
        }

        // Filter by Level tab
        if (filterLevel !== 'all') {
            processed = processed.filter(item => item.level === filterLevel);
        }

        return processed;
    }, [data, searchQuery, filterLevel]);

    // Pagination Logic
    const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterLevel]);

    // Selection Logic
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const allIds = new Set(filteredData.map(item => item.id));
            setSelectedIds(allIds);
        } else {
            setSelectedIds(new Set());
        }
    };

    const handleSelectOne = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const isAllSelected = filteredData.length > 0 && filteredData.every(item => selectedIds.has(item.id));

    const handleAdd = (count: number) => {
        const newItems: UserGroup[] = Array.from({ length: count }).map((_, index) => ({
            id: Math.random().toString(36).substr(2, 9),
            code: `NEW${Math.floor(Math.random() * 10000)}`,
            name: 'Nhóm mới',
            level: 0,
            note: ''
        }));

        // Mark new items as modified so they count towards save
        setModifiedIds(prev => {
            const next = new Set(prev);
            newItems.forEach(item => next.add(item.id));
            return next;
        });

        setData([...newItems, ...data]);
    };

    const handleUpdate = (id: string, field: keyof UserGroup, value: string | number) => {
        // Add to modified list
        setModifiedIds(prev => new Set(prev).add(id));

        setData(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const handleBulkDeleteClick = () => {
        if (selectedIds.size === 0) return;
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setData(data.filter(item => !selectedIds.has(item.id)));

        // Remove deleted items from modifiedIds tracking
        setModifiedIds(prev => {
            const next = new Set(prev);
            selectedIds.forEach(id => next.delete(id));
            return next;
        });

        setSelectedIds(new Set());
        setIsDeleteModalOpen(false);
    };

    const handleSaveClick = () => {
        // If no changes, maybe show a toast or just open modal with 0 count
        setIsSaveModalOpen(true);
    };

    const confirmSave = () => {
        // Simulation of save action
        alert(`Đã lưu thành công ${modifiedIds.size} bản ghi vào hệ thống!`);
        setModifiedIds(new Set()); // Reset modified tracking after save
        setIsSaveModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">

            {/* Header */}
            <header className="bg-white border border-slate-200 shadow-sm z-20 mt-[10px] mx-[10px] rounded-lg">
                <div className="px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-600/20">
                            <Users size={20} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800">Quản lý Nhóm</h1>
                            <p className="text-xs text-slate-400 font-medium">Danh sách phân quyền hệ thống</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Bulk Delete Button - Only shows when items are selected */}
                        {selectedIds.size > 0 && (
                            <button
                                onClick={handleBulkDeleteClick}
                                className="bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-200"
                            >
                                <Trash2 size={18} />
                                <span className="hidden sm:inline">Xóa ({selectedIds.size})</span>
                            </button>
                        )}

                        {/* Save Button */}
                        <button
                            onClick={handleSaveClick}
                            className={`
                border px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2
                ${modifiedIds.size > 0
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                                }
              `}
                        >
                            <Save size={18} className={modifiedIds.size > 0 ? "fill-yellow-700/20" : ""} />
                            <span className="hidden sm:inline">Lưu {modifiedIds.size > 0 && `(${modifiedIds.size})`}</span>
                        </button>

                        {/* Add Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm shadow-blue-500/30 transition-all flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Thêm mới</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="mx-[10px] py-4">

                {/* Search & Filter Bar - Wrapped in Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative shadow-sm w-full md:w-96 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm mã hoặc tên nhóm..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <FilterTab label="Tất cả" active={filterLevel === 'all'} onClick={() => setFilterLevel('all')} />
                            <FilterTab label="Level 0" active={filterLevel === 0} onClick={() => setFilterLevel(0)} />
                            <FilterTab label="Level 1" active={filterLevel === 1} onClick={() => setFilterLevel(1)} />
                            <FilterTab label="Level 2" active={filterLevel === 2} onClick={() => setFilterLevel(2)} />
                            <FilterTab label="Level 3" active={filterLevel === 3} onClick={() => setFilterLevel(3)} />
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <UserGroupTable
                    paginatedData={paginatedData}
                    filteredDataLength={filteredData.length}
                    selectedIds={selectedIds}
                    modifiedIds={modifiedIds}
                    isAllSelected={isAllSelected}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onSelectAll={handleSelectAll}
                    onSelectOne={handleSelectOne}
                    onUpdate={handleUpdate}
                    onPageChange={setCurrentPage}
                />

            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAdd}
            />

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                count={selectedIds.size}
            />

            <SaveModal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                onConfirm={confirmSave}
                count={modifiedIds.size}
            />
        </div>
    );
}
