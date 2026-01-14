"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, Search, Users } from 'lucide-react';
import { User, SortConfig, ColumnFilters } from './types';
import { MOCK_USERS, DEFAULT_FORM_DATA } from './constants';
import { Modal, UserGroupTable } from './components';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

/**
 * SysUsers Page - Main page for user management
 */
export default function SysUsersPage() {
    // User Data State
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Search & Filter State
    const [globalSearch, setGlobalSearch] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});

    // Sort State
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);

    // Dropdown Menu State
    const [activeMenuColumn, setActiveMenuColumn] = useState<keyof User | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<User>>(DEFAULT_FORM_DATA);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [globalSearch, columnFilters]);

    // Filter and Sort users
    const filteredUsers = useMemo(() => {
        let result = users.filter(user => {
            // 1. Global Search
            const searchLower = globalSearch.toLowerCase();
            const matchesGlobal =
                user.fullName.toLowerCase().includes(searchLower) ||
                user.username.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower) ||
                user.group.toLowerCase().includes(searchLower);

            if (!matchesGlobal) return false;

            // 2. Column Filters
            for (const [key, filterValue] of Object.entries(columnFilters)) {
                if (!filterValue) continue;

                const userValue = user[key as keyof User];

                if (key === 'status') {
                    if (filterValue === 'active' && user.status !== true) return false;
                    if (filterValue === 'inactive' && user.status !== false) return false;
                } else {
                    if (!String(userValue).toLowerCase().includes(String(filterValue).toLowerCase())) return false;
                }
            }

            return true;
        });

        // 3. Sort
        if (sortConfig) {
            result.sort((a, b) => {
                if (sortConfig.key === 'status') {
                    return sortConfig.direction === 'asc'
                        ? a.status === b.status ? 0 : a.status ? -1 : 1
                        : a.status === b.status ? 0 : a.status ? 1 : -1;
                }

                const aValue = a[sortConfig.key] ? String(a[sortConfig.key]).toLowerCase() : '';
                const bValue = b[sortConfig.key] ? String(b[sortConfig.key]).toLowerCase() : '';

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [users, globalSearch, columnFilters, sortConfig]);

    // Handle Page Change
    const handlePageChange = (page: number) => {
        const totalPages = Math.ceil(filteredUsers.length / 5);
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Handle Select All
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(filteredUsers.map(u => u.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Handle Single Select
    const handleSelectOne = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // Handle Sort
    const handleSort = (key: keyof User, direction: 'asc' | 'desc') => {
        setSortConfig({ key, direction });
        setActiveMenuColumn(null);
    };

    // Handle Column Filter
    const handleColumnFilter = (key: keyof User, value: string) => {
        setColumnFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Clear Filter for a column
    const clearColumnFilter = (key: keyof User) => {
        setColumnFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[key];
            return newFilters;
        });
    };

    // Clear All Filters
    const clearAllFilters = () => {
        setColumnFilters({});
        setGlobalSearch('');
    };

    // Clear Sort
    const clearSort = () => {
        setSortConfig(null);
    };

    const handleConfirmDelete = () => {
        // Filter out selected items
        const remainingData = users.filter(item => !selectedIds.includes(item.id));

        // Reindex STT starting from 1
        const reindexedData = remainingData.map((item, index) => ({
            ...item,
            stt: index + 1
        }));

        setUsers(reindexedData);
        setSelectedIds([]);
        setIsDeleteModalOpen(false);
    };

    // Handle Form Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle Status Change
    const handleStatusChange = (status: boolean) => {
        setFormData(prev => ({ ...prev, status }));
    };

    // Open Modal for Create
    const handleOpenCreateModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEditModal = (user: User) => {
        setFormData({ ...user });
        setEditingId(user.id);
        setIsModalOpen(true);
    };

    // Handle Save User
    const handleSaveUser = () => {
        if (!formData.username || !formData.fullName) {
            alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            return;
        }

        if (editingId) {
            setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } as User : u));
        } else {
            const newUser: User = {
                id: Date.now(),
                group: formData.group || 'Nhóm Admin',
                portCode: formData.portCode || 'TTP',
                username: formData.username || '',
                fullName: formData.fullName || '',
                idNumber: formData.idNumber || '',
                address: formData.address || '',
                phone: formData.phone || '',
                email: formData.email || '',
                status: formData.status !== undefined ? formData.status : true,
                avatarUrl: undefined
            };
            setUsers([newUser, ...users]);
        }

        setIsModalOpen(false);
        resetForm();
    };

    // Trigger Delete Confirmation
    const handleDeleteSelected = () => {
        setIsDeleteModalOpen(true);
    };

    // Confirm Delete Action
    const confirmDelete = () => {
        setUsers(users.filter(u => !selectedIds.includes(u.id)));
        setSelectedIds([]);
        setIsDeleteModalOpen(false);
    };

    // Reset Form
    const resetForm = () => {
        setEditingId(null);
        setFormData(DEFAULT_FORM_DATA);
    };

    return (
        <>
            <div className="p-[10px]">
                {/* Page Header */}
                <div className="bg-white p-[10px] rounded shadow-sm border border-slate-200 mt-[20px] mb-[12px] flex flex-col md:flex-row md:items-center justify-between gap-[10px]">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded text-white">
                            <Users size={20} />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-bold text-slate-800">Quản lý Người dùng</h1>
                            <p className="text-[12px] text-slate-400">Danh sách tài khoản hệ thống và phân quyền</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-[10px]">
                        {selectedIds.length > 0 && (
                            <button
                                onClick={handleDeleteSelected}
                                className="flex items-center gap-2 px-4 h-[36px] bg-red-50 text-red-600 border border-red-200 rounded text-[14px] font-medium hover:bg-red-100 transition-all"
                            >
                                <Trash2 size={16} />
                                <span>Xóa ({selectedIds.length})</span>
                            </button>
                        )}

                        <button
                            onClick={handleOpenCreateModal}
                            className="flex items-center gap-2 px-4 h-[36px] bg-blue-600 text-white rounded text-[14px] font-medium hover:bg-blue-700 transition-all"
                        >
                            <Plus size={16} />
                            <span>Thêm mới</span>
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white rounded shadow-sm border border-slate-200 mb-[10px]">
                    <div className="p-[10px] flex flex-col sm:flex-row sm:items-center justify-between gap-[10px]">
                        <div className="flex items-center gap-[10px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tất cả..."
                                    className="pl-9 pr-4 h-[36px] w-64 text-[14px] border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={globalSearch}
                                    onChange={(e) => setGlobalSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-[10px]">
                            <div className="text-[14px] text-slate-500">
                                Tổng số dòng: <span className="font-semibold text-slate-900">{filteredUsers.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <UserGroupTable
                    users={users}
                    filteredUsers={filteredUsers}
                    selectedIds={selectedIds}
                    currentPage={currentPage}
                    sortConfig={sortConfig}
                    columnFilters={columnFilters}
                    activeMenuColumn={activeMenuColumn}
                    globalSearch={globalSearch}
                    onSelectAll={handleSelectAll}
                    onSelectOne={handleSelectOne}
                    onSort={handleSort}
                    onColumnFilter={handleColumnFilter}
                    onClearColumnFilter={clearColumnFilter}
                    onSetActiveMenuColumn={setActiveMenuColumn}
                    onClearAllFilters={clearAllFilters}
                    onEditUser={handleOpenEditModal}
                    onPageChange={handlePageChange}
                    onClearSort={clearSort}
                />

                {/* Modals */}
                <Modal
                    isOpen={isModalOpen}
                    editingId={editingId}
                    formData={formData}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveUser}
                    onInputChange={handleInputChange}
                    onStatusChange={handleStatusChange}
                />

                <ConfirmDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    count={selectedIds.length}
                    entityName="người dùng"
                />
            </div>
        </>
    );
}
