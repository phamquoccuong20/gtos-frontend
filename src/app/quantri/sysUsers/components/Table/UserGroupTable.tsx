import React, { useRef, useEffect } from 'react';
import {
    Search,
    CheckCircle,
    XCircle,
    Shield,
    X,
    Smartphone,
    AtSign,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Filter,
    ListFilter
} from 'lucide-react';
import { User, SortConfig, ColumnFilters } from '../../types';
import { ITEMS_PER_PAGE } from '../../constants';

interface UserGroupTableProps {
    users: User[];
    filteredUsers: User[];
    selectedIds: number[];
    currentPage: number;
    sortConfig: SortConfig | null;
    columnFilters: ColumnFilters;
    activeMenuColumn: keyof User | null;
    globalSearch: string;
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectOne: (id: number) => void;
    onSort: (key: keyof User, direction: 'asc' | 'desc') => void;
    onColumnFilter: (key: keyof User, value: string) => void;
    onClearColumnFilter: (key: keyof User) => void;
    onSetActiveMenuColumn: (column: keyof User | null) => void;
    onClearAllFilters: () => void;
    onEditUser: (user: User) => void;
    onPageChange: (page: number) => void;
    onClearSort: () => void;
}

export const UserGroupTable: React.FC<UserGroupTableProps> = ({
    users,
    filteredUsers,
    selectedIds,
    currentPage,
    sortConfig,
    columnFilters,
    activeMenuColumn,
    globalSearch,
    onSelectAll,
    onSelectOne,
    onSort,
    onColumnFilter,
    onClearColumnFilter,
    onSetActiveMenuColumn,
    onClearAllFilters,
    onEditUser,
    onPageChange,
    onClearSort,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onSetActiveMenuColumn(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onSetActiveMenuColumn]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const isAllSelected = filteredUsers.length > 0 && selectedIds.length === filteredUsers.length;

    // Render Header Menu
    const renderHeaderMenu = (columnKey: keyof User, title: string) => {
        const isActive = activeMenuColumn === columnKey;
        const currentSort = sortConfig?.key === columnKey ? sortConfig.direction : null;
        const currentFilter = columnFilters[columnKey];
        const isFiltered = !!currentFilter;

        return (
            <div className="relative inline-block ml-2" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSetActiveMenuColumn(isActive ? null : columnKey);
                    }}
                    className={`p-1 rounded-md transition-all duration-200 ${isActive || isFiltered || currentSort
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                        }`}
                >
                    {isFiltered ? <ListFilter size={14} strokeWidth={2.5} /> : <ArrowUpDown size={14} />}
                </button>

                {isActive && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 z-50 animate-zoom-in"
                    >
                        <div className="p-1">
                            <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-50 mb-1">
                                {title}
                            </div>

                            {/* Sorting Options */}
                            <button
                                onClick={() => onSort(columnKey, 'asc')}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${currentSort === 'asc' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <ArrowUp size={14} />
                                <span>Sắp xếp A - Z</span>
                                {currentSort === 'asc' && <CheckCircle size={12} className="ml-auto text-indigo-600" />}
                            </button>
                            <button
                                onClick={() => onSort(columnKey, 'desc')}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${currentSort === 'desc' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <ArrowDown size={14} />
                                <span>Sắp xếp Z - A</span>
                                {currentSort === 'desc' && <CheckCircle size={12} className="ml-auto text-indigo-600" />}
                            </button>

                            <div className="my-1 border-t border-slate-100"></div>

                            {/* Filtering Options */}
                            <div className="px-3 py-2">
                                <div className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1">
                                    <Filter size={10} />
                                    Lọc theo giá trị
                                </div>

                                {columnKey === 'status' ? (
                                    <div className="space-y-1">
                                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer p-1 hover:bg-slate-50 rounded">
                                            <input
                                                type="radio"
                                                name="statusFilter"
                                                checked={!currentFilter}
                                                onChange={() => onClearColumnFilter('status')}
                                                className="text-indigo-600 focus:ring-indigo-500"
                                            />
                                            Tất cả
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer p-1 hover:bg-slate-50 rounded">
                                            <input
                                                type="radio"
                                                name="statusFilter"
                                                checked={currentFilter === 'active'}
                                                onChange={() => onColumnFilter('status', 'active')}
                                                className="text-indigo-600 focus:ring-indigo-500"
                                            />
                                            Hoạt động
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer p-1 hover:bg-slate-50 rounded">
                                            <input
                                                type="radio"
                                                name="statusFilter"
                                                checked={currentFilter === 'inactive'}
                                                onChange={() => onColumnFilter('status', 'inactive')}
                                                className="text-indigo-600 focus:ring-indigo-500"
                                            />
                                            Đã khóa
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Nhập để lọc..."
                                            value={currentFilter || ''}
                                            onChange={(e) => onColumnFilter(columnKey, e.target.value)}
                                            className="w-full pl-2 pr-7 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                            autoFocus
                                        />
                                        {currentFilter && (
                                            <button
                                                onClick={() => onClearColumnFilter(columnKey)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                <X size={12} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {(currentFilter || currentSort) && (
                                <div className="mt-1 pt-1 border-t border-slate-100">
                                    <button
                                        onClick={() => {
                                            onClearColumnFilter(columnKey);
                                            if (currentSort) onClearSort();
                                            onSetActiveMenuColumn(null);
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
        <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
            {/* Table */}
            <div className="overflow-x-auto custom-scrollbar flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#d0ebff] border-b border-blue-200 text-[12px] uppercase tracking-wider text-[#1971c2] font-bold">
                            <th className="py-2 px-4 w-12 text-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-blue-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                                    checked={isAllSelected}
                                    onChange={onSelectAll}
                                />
                            </th>
                            <th className="py-2 px-4">
                                <div className="flex items-center justify-between">
                                    <span>Nhóm / Cảng</span>
                                    {renderHeaderMenu('group', 'Nhóm người dùng')}
                                </div>
                            </th>
                            <th className="py-2 px-4">
                                <div className="flex items-center justify-between">
                                    <span>Tài khoản</span>
                                    {renderHeaderMenu('username', 'Tài khoản')}
                                </div>
                            </th>
                            <th className="py-2 px-4">
                                <div className="flex items-center justify-between">
                                    <span>Thông tin cá nhân</span>
                                    {renderHeaderMenu('fullName', 'Họ và tên')}
                                </div>
                            </th>
                            <th className="py-2 px-4 hidden xl:table-cell">
                                <div className="flex items-center justify-between">
                                    <span>Liên hệ</span>
                                    {renderHeaderMenu('email', 'Email / SĐT')}
                                </div>
                            </th>
                            <th className="py-2 px-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <span>Trạng thái</span>
                                    {renderHeaderMenu('status', 'Trạng thái')}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {paginatedUsers.map((user) => (
                            <tr
                                key={user.id}
                                onClick={() => onEditUser(user)}
                                className={`group hover:bg-indigo-50/40 transition-colors cursor-pointer ${selectedIds.includes(user.id) ? 'bg-indigo-50/50' : ''
                                    }`}
                            >
                                <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                                        checked={selectedIds.includes(user.id)}
                                        onChange={() => onSelectOne(user.id)}
                                    />
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-slate-700">{user.group}</span>
                                        <span className="inline-flex items-center w-fit px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600 uppercase">
                                            {user.portCode}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                                            {user.avatarUrl ? (
                                                <img src={user.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <Shield size={16} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{user.username}</p>
                                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                                                <span className="tracking-widest">••••••••</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-800">{user.fullName}</span>
                                        {user.idNumber && <span className="text-xs text-slate-500">ID: {user.idNumber}</span>}
                                        {user.address && (
                                            <span className="text-xs text-slate-400 truncate max-w-[200px]" title={user.address}>
                                                {user.address}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 hidden xl:table-cell">
                                    <div className="flex flex-col gap-2">
                                        {user.phone && (
                                            <div className="flex items-center gap-3 group/item">
                                                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-100 transition-colors shadow-sm">
                                                    <Smartphone size={14} className="stroke-[2.5px]" />
                                                </div>
                                                <span className="text-sm text-slate-600 font-medium">{user.phone}</span>
                                            </div>
                                        )}
                                        {user.email && (
                                            <div className="flex items-center gap-3 group/item cursor-pointer">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:bg-blue-100 transition-colors shadow-sm">
                                                    <AtSign size={14} className="stroke-[2.5px]" />
                                                </div>
                                                <span className="text-sm text-slate-600 group-hover/item:text-blue-600 transition-colors truncate max-w-[180px]">
                                                    {user.email}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    {user.status ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                            <CheckCircle size={12} className="fill-green-500 text-white" />
                                            Hoạt động
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                            <XCircle size={12} className="fill-red-500 text-white" />
                                            Đã khóa
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {paginatedUsers.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Search size={32} className="text-slate-300" />
                                        <p>Không tìm thấy dữ liệu phù hợp.</p>
                                        {(Object.keys(columnFilters).length > 0 || globalSearch) && (
                                            <button onClick={onClearAllFilters} className="text-indigo-600 text-sm hover:underline mt-1">
                                                Xóa bộ lọc và tìm kiếm lại
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-[10px] border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[12px] text-slate-500 mt-auto">
                <span>
                    Hiển thị {filteredUsers.length === 0 ? 0 : startIndex + 1} đến{' '}
                    {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} của {filteredUsers.length} dòng
                </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1.5 border border-slate-200 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 border rounded transition-colors ${currentPage === page
                                ? 'border-indigo-500 bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                                : 'border-slate-200 bg-white hover:bg-slate-100 hover:text-indigo-600 text-slate-600'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-1.5 border border-slate-200 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserGroupTable;
