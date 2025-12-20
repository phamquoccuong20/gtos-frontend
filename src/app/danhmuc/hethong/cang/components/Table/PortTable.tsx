
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Plus, Trash2, Anchor, Save, Loader2, Check,
  ArrowUpDown, X, Filter, RotateCcw,
  ArrowUp, ArrowDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Port } from '../../types';
import ConfirmationModal from '../ConfirmationModal';
import AddRowsModal from '../AddRowsModal';
import EditPortModal from '../EditPortModal';

interface PortTableProps {
  ports: Port[];
  onDelete: (id: string) => void;
  onAdd: (count: number) => void;
  onUpdate: (port: Port) => void;
  onSave: () => void;
  isDirty: boolean;
  isSaving: boolean;
}

type SortOrder = 'asc' | 'desc' | null;

const PortTable: React.FC<PortTableProps> = ({ 
  ports, 
  onDelete, 
  onAdd, 
  onUpdate,
  onSave, 
  isDirty, 
  isSaving 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPort, setEditingPort] = useState<Port | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const [activeFilterColumn, setActiveFilterColumn] = useState<keyof Port | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Port; order: SortOrder } | null>(null);
  const [columnFilters, setColumnFilters] = useState<Partial<Record<keyof Port, string>>>({});
  
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActiveFilterColumn(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveWithFeedback = async () => {
    if (!isDirty || isSaving) return;
    await onSave();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const filteredAndSortedPorts = useMemo(() => {
    let result = ports.filter(port => {
      const matchesSearch = 
        port.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        port.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        port.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesColumnFilters = (Object.keys(columnFilters) as Array<keyof Port>).every((key) => {
        const filterValue = columnFilters[key];
        if (!filterValue) return true;
        const portValue = String(port[key]).toLowerCase();
        return portValue.includes(filterValue.toLowerCase());
      });

      return matchesSearch && matchesColumnFilters;
    });

    if (sortConfig && sortConfig.order) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortConfig.order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        const numA = Number(valA);
        const numB = Number(valB);
        return sortConfig.order === 'asc' ? numA - numB : numB - numA;
      });
    }

    return result;
  }, [ports, searchTerm, columnFilters, sortConfig]);

  // Logic phân trang
  const totalPages = Math.ceil(filteredAndSortedPorts.length / pageSize);
  const paginatedPorts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedPorts.slice(start, start + pageSize);
  }, [filteredAndSortedPorts, currentPage]);

  useEffect(() => {
    // Nếu trang hiện tại lớn hơn tổng số trang (do xóa hàng), quay về trang cuối cùng có thể
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleAddWithJump = (count: number) => {
    onAdd(count);
    setCurrentPage(1); // Luôn về trang 1 khi thêm mới vì hàng mới nằm ở đầu
  };

  const toggleSelectAll = () => {
    const currentPageIds = paginatedPorts.map(p => p.id);
    const allSelectedOnPage = currentPageIds.every(id => selectedIds.has(id));

    const next = new Set(selectedIds);
    if (allSelectedOnPage) {
      currentPageIds.forEach(id => next.delete(id));
    } else {
      currentPageIds.forEach(id => next.add(id));
    }
    setSelectedIds(next);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const handleBulkDeleteConfirm = () => {
    selectedIds.forEach(id => onDelete(id));
    setSelectedIds(new Set());
  };

  const resetAllFilters = () => {
    setColumnFilters({});
    setSortConfig(null);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const isAllSelectedOnPage = paginatedPorts.length > 0 && paginatedPorts.every(p => selectedIds.has(p.id));

  const renderFilterPopover = (columnKey: keyof Port, label: string) => {
    if (activeFilterColumn !== columnKey) return null;

    return (
      <div 
        ref={popoverRef}
        className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-[4px] shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)] border border-[#f0f0f0] z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="p-[10px] space-y-[10px]">
          <div className="text-center py-2 border-b border-[#f0f0f0]">
            <span className="text-[14px] font-bold text-slate-800 uppercase font-accent">{label}</span>
          </div>

          <div className="space-y-1">
            <button 
              onClick={() => { setSortConfig({ key: columnKey, order: 'asc' }); setActiveFilterColumn(null); }}
              className={`w-full flex items-center h-[36px] gap-3 px-[10px] text-[14px] font-medium rounded-[4px] transition-all ${sortConfig?.key === columnKey && sortConfig.order === 'asc' ? 'bg-[#e6f7ff] text-[#1890ff]' : 'text-slate-700 hover:bg-[#fafafa]'}`}
            >
              <ArrowUp size={16} strokeWidth={2} />
              Sắp xếp A - Z
            </button>
            <button 
              onClick={() => { setSortConfig({ key: columnKey, order: 'desc' }); setActiveFilterColumn(null); }}
              className={`w-full flex items-center h-[36px] gap-3 px-[10px] text-[14px] font-medium rounded-[4px] transition-all ${sortConfig?.key === columnKey && sortConfig.order === 'desc' ? 'bg-[#e6f7ff] text-[#1890ff]' : 'text-slate-700 hover:bg-[#fafafa]'}`}
            >
              <ArrowDown size={16} strokeWidth={2} />
              Sắp xếp Z - A
            </button>
          </div>

          <div className="space-y-[6px] pt-2 border-t border-[#f0f0f0]">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase px-[10px] tracking-tight">
              <Filter size={12} />
              LỌC THEO GIÁ TRỊ
            </div>
            <div className="px-[10px]">
              <input 
                type="text"
                placeholder="Nhập giá trị..."
                className="w-full h-[36px] px-[10px] bg-white border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#40a9ff] focus:ring-4 focus:ring-[#1890ff]/10"
                value={columnFilters[columnKey] || ''}
                onChange={(e) => {
                  setColumnFilters(prev => ({ ...prev, [columnKey]: e.target.value }));
                  setCurrentPage(1);
                }}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-white relative">
      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Check size={20} strokeWidth={3} />
          <span className="font-bold text-sm">Dữ liệu đã được lưu thành công!</span>
        </div>
      )}

      {/* Header Row 1 */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-[#f0f0f0]">
        <div className="flex items-center gap-[12px]">
          <div className="w-[44px] h-[44px] bg-[#1890ff] rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-100">
            <Anchor size={22} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-slate-800 tracking-tight font-accent leading-tight">Danh mục Cảng</h2>
            <p className="text-slate-500 text-[13px] mt-0.5">Hệ thống quản lý dữ liệu cảng</p>
          </div>
        </div>
        
        <div className="flex items-center gap-[12px]">
          {selectedIds.size > 0 && (
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="h-[38px] flex items-center gap-2 px-4 border border-[#ff4d4f] text-[#ff4d4f] font-bold rounded-md hover:bg-[#fff1f0] text-[13px] transition-all"
            >
              <Trash2 size={16} />
              Xóa ({selectedIds.size})
            </button>
          )}

          <button 
            onClick={handleSaveWithFeedback}
            disabled={!isDirty || isSaving}
            className={`h-[38px] flex items-center gap-2 px-5 font-bold rounded-md text-[13px] transition-all border
              ${isDirty 
                ? 'bg-[#faad14] text-white border-[#faad14] hover:bg-[#d48806] shadow-md shadow-orange-100' 
                : 'bg-white text-slate-400 border-[#d9d9d9] cursor-not-allowed opacity-60'}`}
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Lưu
          </button>
          
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="h-[38px] flex items-center gap-2 px-5 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 shadow-sm text-[13px] transition-all"
          >
            <Plus size={16} strokeWidth={3} />
            Thêm mới
          </button>
        </div>
      </div>

      {/* Header Row 2 */}
      <div className="px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f0f0f0] bg-[#fafafa]/50">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhanh tên, mã hoặc quốc gia..."
            className="w-full h-[36px] pl-10 pr-4 bg-white border border-[#d9d9d9] rounded-md text-[14px] focus:border-[#1890ff] shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="text-[13px] text-slate-500 whitespace-nowrap">
            Tổng số: <span className="font-bold text-slate-900">{filteredAndSortedPorts.length}</span> dòng
          </div>

          {(Object.values(columnFilters).some(v => !!v) || sortConfig) && (
            <button 
              onClick={resetAllFilters}
              className="flex items-center gap-2 h-[32px] px-3 bg-white border border-[#d9d9d9] text-slate-600 rounded-md text-[13px] hover:text-[#1890ff] hover:border-[#1890ff] transition-all"
            >
              <RotateCcw size={14} />
              Làm mới
            </button>
          )}
        </div>
      </div>

      {/* Table Content Area */}
      <div className="px-6 py-5 flex-1">
        <div className="border border-[#d9d9d9] rounded-lg overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-[#d0ebff] border-b border-[#bae7ff]">
                  <th className="px-3 py-3 w-12 text-center">
                    <input 
                      type="checkbox" 
                      checked={isAllSelectedOnPage}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded-[2px] border-blue-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    />
                  </th>
                  <th className="px-3 py-3 text-[12px] font-bold text-[#1971c2] uppercase tracking-wider w-16 text-center">STT</th>
                  
                  <th className="px-3 py-3 text-[12px] font-bold text-[#1971c2] uppercase tracking-wider min-w-[160px] relative">
                    <div className="flex items-center justify-between gap-2">
                      <span>Quốc gia</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveFilterColumn(activeFilterColumn === 'country' ? null : 'country'); }}
                        className={`p-1 rounded transition-colors ${activeFilterColumn === 'country' || columnFilters['country'] || (sortConfig?.key === 'country') ? 'bg-[#1890ff] text-white' : 'hover:bg-blue-200/50 text-[#1971c2]/60'}`}
                      >
                        <ArrowUpDown size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                    {renderFilterPopover('country', 'QUỐC GIA')}
                  </th>

                  <th className="px-3 py-3 text-[12px] font-bold text-[#1971c2] uppercase tracking-wider min-w-[140px] relative">
                    <div className="flex items-center justify-between gap-2">
                      <span>MÃ CẢNG</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveFilterColumn(activeFilterColumn === 'code' ? null : 'code'); }}
                        className={`p-1 rounded transition-colors ${activeFilterColumn === 'code' || columnFilters['code'] || (sortConfig?.key === 'code') ? 'bg-[#1890ff] text-white' : 'hover:bg-blue-200/50 text-[#1971c2]/60'}`}
                      >
                        <ArrowUpDown size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                    {renderFilterPopover('code', 'MÃ CẢNG')}
                  </th>

                  <th className="px-3 py-3 text-[12px] font-bold text-[#1971c2] uppercase tracking-wider min-w-[240px] relative">
                    <div className="flex items-center justify-between gap-2">
                      <span>Tên Cảng Biển</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveFilterColumn(activeFilterColumn === 'name' ? null : 'name'); }}
                        className={`p-1 rounded transition-colors ${activeFilterColumn === 'name' || columnFilters['name'] || (sortConfig?.key === 'name') ? 'bg-[#1890ff] text-white' : 'hover:bg-blue-200/50 text-[#1971c2]/60'}`}
                      >
                        <ArrowUpDown size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                    {renderFilterPopover('name', 'TÊN CẢNG BIỂN')}
                  </th>

                  <th className="px-3 py-3 text-[12px] font-bold text-[#1971c2] uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {paginatedPorts.map((port) => {
                  const isSelected = selectedIds.has(port.id);
                  return (
                    <tr 
                      key={port.id} 
                      onClick={() => setEditingPort(port)}
                      className={`transition-all cursor-pointer ${isSelected ? 'bg-[#e6f7ff]/50' : 'hover:bg-[#f0f7ff]'}`}
                    >
                      <td className="px-3 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => toggleSelect(port.id)}
                          className="w-4 h-4 rounded-[2px] border-blue-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                      </td>
                      <td className="px-3 py-3.5 text-[14px] font-medium text-slate-500 text-center">
                        {port.stt === 0 ? <span className="text-blue-500 font-bold italic">Mới</span> : port.stt}
                      </td>
                      <td className="px-3 py-3.5">
                        <span className="text-[14px] text-slate-700 font-medium">{port.country || '---'}</span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className={`px-2 py-1 rounded border text-[11px] font-bold font-mono ${port.code ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-orange-50 text-orange-400 border-orange-100 italic'}`}>
                          {port.code || 'CHƯA NHẬP'}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-[14px] font-bold text-slate-900">{port.name || '---'}</td>
                      <td className="px-3 py-3.5">
                        {port.status === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Hoạt động
                          </span>
                        ) : port.status === 'maintenance' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-amber-50 text-amber-600 border border-amber-200 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Bảo trì
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-rose-50 text-rose-600 border border-rose-200 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            Đóng cửa
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {paginatedPorts.length === 0 && (
            <div className="py-24 text-center bg-white border-t border-[#f0f0f0]">
              <Anchor size={48} className="text-slate-200 mx-auto mb-4" />
              <h3 className="text-[18px] font-bold text-slate-900">Không tìm thấy dữ liệu</h3>
              <p className="text-slate-500 text-[14px] mt-1">Vui lòng kiểm tra lại từ khóa hoặc bộ lọc</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Pagination */}
      <div className="px-6 py-4 border-t border-[#f0f0f0] bg-[#fafafa]/30 flex items-center justify-between">
        <div className="text-[13px] text-slate-500">
          Trang <span className="font-bold text-slate-900">{currentPage}</span> trên <span className="font-bold text-slate-900">{totalPages || 1}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 flex items-center justify-center text-slate-600 bg-white border border-[#d9d9d9] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#1890ff] hover:border-[#1890ff] transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentPage(i + 1)}
              className={`h-8 w-8 rounded-md text-[13px] font-bold transition-all border ${currentPage === i + 1 ? 'bg-[#1890ff] text-white border-[#1890ff] shadow-sm' : 'bg-white border-[#d9d9d9] text-slate-600 hover:text-[#1890ff] hover:border-[#1890ff]'}`}
            >
              {i + 1}
            </button>
          )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="h-8 w-8 flex items-center justify-center text-slate-600 bg-white border border-[#d9d9d9] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#1890ff] hover:border-[#1890ff] transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Xác nhận xóa dữ liệu"
        message={`Hệ thống sẽ xóa vĩnh viễn ${selectedIds.size} danh mục cảng biển đã chọn. Bạn có chắc chắn muốn thực hiện hành động này không?`}
      />

      <AddRowsModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddWithJump}
      />

      <EditPortModal 
        isOpen={!!editingPort}
        port={editingPort}
        onClose={() => setEditingPort(null)}
        onSave={onUpdate}
      />
    </div>
  );
};

export default PortTable;
