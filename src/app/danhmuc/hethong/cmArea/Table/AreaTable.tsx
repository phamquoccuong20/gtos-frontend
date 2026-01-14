
import React, { useState, useEffect, useRef } from 'react';
import { Area, AreaType } from '../types';
import { Search, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';

interface AreaTableProps {
  areas: Area[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (area: Area) => void;
  selectedIds: string[];
  toggleSelect: (id: string) => void;
  toggleSelectAll: () => void;
}

const AreaTable: React.FC<AreaTableProps> = ({ 
  areas, 
  totalResults,
  currentPage,
  totalPages,
  onPageChange,
  searchTerm, 
  onSearchChange, 
  onUpdate, 
  selectedIds, 
  toggleSelect, 
  toggleSelectAll 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingRowRef = useRef<HTMLTableRowElement>(null);

  const isAllVisibleSelected = areas.length > 0 && areas.every(area => selectedIds.includes(area.id));

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (editingId && editingRowRef.current && !editingRowRef.current.contains(event.target as Node)) {
        setEditingId(null);
      }
    };
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, [editingId]);

  const handleInputChange = (id: string, field: keyof Area, value: string | number) => {
    const areaToUpdate = areas.find(a => a.id === id);
    if (areaToUpdate) onUpdate({ ...areaToUpdate, [field]: value });
  };

  return (
    <div className="w-full flex flex-col border border-slate-100 rounded-[4px] overflow-hidden">
      {/* Search Toolbar */}
      <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-md:max-w-none max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm theo mã vùng, tên khu vực..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-[4px] text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2 px-1">
          <span className="text-[14px] text-slate-500 font-bold tracking-wider">Tổng số:</span>
          <span className="text-[14px] text-blue-400 font-bold">{totalResults} dòng</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
          <thead>
            <tr className="bg-[#d0ebff] border-b border-blue-200/50">
              <th className="px-6 py-3 w-16 text-center">
                <input 
                  type="checkbox" 
                  checked={isAllVisibleSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-[#1971c2] rounded-[2px] border-blue-300 accent-[#1971c2] cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 w-16 text-[11px] font-bold text-[#1971c2] uppercase tracking-wider text-center">STT</th>
              <th className="px-6 py-3 w-[140px] text-[11px] font-bold text-[#1971c2] uppercase tracking-wider">Mã Area</th>
              <th className="px-6 py-3 text-[11px] font-bold text-[#1971c2] uppercase tracking-wider">Tên Vùng Phụ</th>
              <th className="px-6 pr-16 py-3 w-[200px] text-[11px] font-bold text-[#1971c2] uppercase tracking-wider text-right">Sức chứa</th>
              <th className="px-6 py-3 w-[180px] text-[11px] font-bold text-[#1971c2] uppercase tracking-wider text-center">Loại hình</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {areas.length > 0 ? (
              areas.map((area) => {
                const isEditing = editingId === area.id;
                return (
                  <tr 
                    key={area.id} 
                    ref={isEditing ? editingRowRef : null}
                    onClick={() => !isEditing && setEditingId(area.id)}
                    className={`group transition-colors ${isEditing ? 'bg-blue-50/40' : 'hover:bg-slate-50/50 cursor-pointer'} ${selectedIds.includes(area.id) ? 'bg-blue-50/20' : ''}`}
                  >
                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(area.id)}
                        onChange={() => toggleSelect(area.id)}
                        className="w-4 h-4 rounded-[2px] border-slate-300 accent-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-400 font-semibold text-center">{area.index}</td>
                    
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          type="text"
                          value={area.code}
                          onChange={(e) => handleInputChange(area.id, 'code', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs font-bold border border-blue-400 rounded-[4px] outline-none shadow-sm uppercase"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-[4px] border border-slate-200 uppercase tracking-wider whitespace-nowrap">{area.code || '--'}</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input 
                          type="text"
                          value={area.name}
                          onChange={(e) => handleInputChange(area.id, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 text-sm font-semibold border border-blue-400 rounded-[4px] outline-none shadow-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-800 font-semibold truncate">{area.name || <span className="text-slate-300 italic">Chưa nhập tên</span>}</span>
                          <Edit3 size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </td>

                    <td className="px-6 pr-16 py-4 text-right">
                      {isEditing ? (
                        <input 
                          type="number"
                          value={area.capacity}
                          onChange={(e) => handleInputChange(area.id, 'capacity', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-1.5 text-sm font-bold border border-blue-400 rounded-[4px] text-right outline-none shadow-sm"
                        />
                      ) : (
                        <span className="text-sm text-slate-700 font-bold tabular-nums">
                          {area.capacity.toLocaleString()}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {isEditing ? (
                        <select 
                          value={area.type}
                          onChange={(e) => handleInputChange(area.id, 'type', e.target.value as AreaType)}
                          className="w-full px-2 py-1.5 text-xs font-bold border border-blue-400 rounded-[4px] outline-none cursor-pointer"
                        >
                          <option value="Nội bộ">Nội bộ</option>
                          <option value="Thuê">Thuê</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-3 py-1 rounded-[4px] text-[10px] font-bold uppercase border ${
                          area.type === 'Nội bộ' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${area.type === 'Nội bộ' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                          {area.type}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan={6} className="py-20 text-center text-slate-400 font-medium">Không tìm thấy dữ liệu.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-end bg-slate-50/30">
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-[4px] border border-slate-200 bg-white text-slate-500 hover:text-blue-600 disabled:opacity-30 transition-all shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                return (
                  <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-8 h-8 rounded-[4px] text-xs font-bold transition-all ${currentPage === p ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'}`}
                  >
                    {p}
                  </button>
                );
              }
              return null;
            })}
          </div>
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-[4px] border border-slate-200 bg-white text-slate-500 hover:text-blue-600 disabled:opacity-30 transition-all shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreaTable;
