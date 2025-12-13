import React from 'react';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserGroup } from '../../types';

interface UserGroupTableProps {
  paginatedData: UserGroup[];
  filteredDataLength: number;
  selectedIds: Set<string>;
  modifiedIds: Set<string>;
  isAllSelected: boolean;
  currentPage: number;
  totalPages: number;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: string) => void;
  onUpdate: (id: string, field: keyof UserGroup, value: string | number) => void;
  onPageChange: (page: number) => void;
}

export const UserGroupTable: React.FC<UserGroupTableProps> = ({
  paginatedData,
  filteredDataLength,
  selectedIds,
  modifiedIds,
  isAllSelected,
  currentPage,
  totalPages,
  onSelectAll,
  onSelectOne,
  onUpdate,
  onPageChange,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
      {/* HEADER ROW */}
      <div className="hidden md:grid grid-cols-12 bg-blue-50 text-xs font-bold text-blue-700 uppercase tracking-wider select-none">
        <div className="col-span-1 flex items-center justify-center py-3 px-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
            checked={isAllSelected}
            onChange={onSelectAll}
          />
        </div>
        <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-blue-900 py-3 px-4">
          Mã Nhóm <ArrowUpDown size={12} />
        </div>
        <div className="col-span-4 flex items-center gap-1 cursor-pointer hover:text-blue-900 py-3 px-4">
          Tên Nhóm <ArrowUpDown size={12} />
        </div>
        <div className="col-span-2 py-3 px-4">Phân Cấp</div>
        <div className="col-span-3 py-3 px-4">Ghi chú</div>
      </div>

      {/* LIST ITEMS */}
      <div className="flex-1">
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => {
            const isSelected = selectedIds.has(item.id);
            const isModified = modifiedIds.has(item.id);
            return (
              <div
                key={item.id}
                className={`group relative md:grid md:grid-cols-12 items-center transition-colors
                   ${isSelected ? 'bg-blue-50/60' : isModified ? 'bg-yellow-50/30' : 'hover:bg-slate-50'}
                `}
              >
                {/* Column 0: Checkbox */}
                <div className="col-span-1 py-3 px-2 flex justify-center items-center relative h-full">
                  {isModified && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400" title="Đã chỉnh sửa"></div>
                  )}
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    checked={isSelected}
                    onChange={() => onSelectOne(item.id)}
                  />
                </div>

                {/* Column 1: Code (Editable) */}
                <div className="col-span-2 py-3 px-4 h-full flex items-center">
                  <input
                    type="text"
                    value={item.code}
                    onChange={(e) => onUpdate(item.id, 'code', e.target.value)}
                    className={`w-full font-mono text-sm font-bold text-slate-700 px-2 py-1.5 rounded border outline-none transition-all
                        ${isModified ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}
                    `}
                  />
                </div>

                {/* Column 2: Name (Editable) */}
                <div className="col-span-4 py-3 px-4 h-full flex items-center">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
                    className="w-full font-semibold text-sm md:text-base text-slate-800 bg-transparent border border-transparent rounded px-2 py-1.5 hover:bg-white hover:border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300"
                    placeholder="Nhập tên nhóm..."
                  />
                </div>

                {/* Column 3: Level (Editable Number) */}
                <div className="col-span-2 py-3 px-4 h-full flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Level</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={item.level}
                    onChange={(e) => onUpdate(item.id, 'level', parseInt(e.target.value) || 0)}
                    className="w-16 font-bold text-sm text-center text-slate-700 bg-white border border-slate-200 rounded px-1 py-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                {/* Column 4: Note (Editable) */}
                <div className="col-span-3 py-3 px-4 h-full flex items-center">
                  <input
                    type="text"
                    value={item.note}
                    onChange={(e) => onUpdate(item.id, 'note', e.target.value)}
                    placeholder="Chưa có ghi chú..."
                    className="w-full text-sm text-slate-600 bg-transparent border border-transparent rounded px-2 py-1.5 hover:bg-white hover:border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:italic placeholder:text-slate-300"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 h-full flex flex-col justify-center">
            <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search className="text-slate-300" size={32} />
            </div>
            <h3 className="text-slate-600 font-medium text-lg">Không tìm thấy dữ liệu</h3>
            <p className="text-slate-400 text-sm mt-1">Vui lòng thử lại với từ khóa khác</p>
          </div>
        )}
      </div>

      {/* Footer Pagination */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 font-medium flex justify-between items-center sticky bottom-0 z-10">
        <div className="flex gap-4 items-center">
          <span>Hiển thị {paginatedData.length} / {filteredDataLength} bản ghi</span>
          {selectedIds.size > 0 && (
            <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Đã chọn: {selectedIds.size}</span>
          )}
          {modifiedIds.size > 0 && (
            <span className="text-yellow-700 font-bold bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">Đã sửa: {modifiedIds.size}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Trang trước"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-semibold min-w-[90px] text-center shadow-sm">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Trang sau"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGroupTable;
