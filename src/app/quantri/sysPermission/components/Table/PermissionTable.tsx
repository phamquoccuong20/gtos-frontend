'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MenuItem, Permission } from '../../types';
import { Search, Save, CheckSquare, Square, Filter, AlertTriangle, X, ChevronRight, ChevronDown, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface PermissionTableProps {
  data: MenuItem[];
  onSave: (data: MenuItem[]) => void;
}

const PermissionTable: React.FC<PermissionTableProps> = ({ data, onSave }) => {
  const [items, setItems] = useState<MenuItem[]>(data);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [expandedHeaders, setExpandedHeaders] = useState<number[]>([]);

  // Filter & Sort State
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>({
    name: '',
    parentCode: ''
  });

  // Ref for click outside to close filter dropdown
  const headerRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveFilterColumn(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handlePermissionChange = (id: number, type: keyof MenuItem['permissions']) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          permissions: {
            ...item.permissions,
            [type]: !item.permissions[type]
          }
        };
      }
      return item;
    }));
  };

  const handleToggleRow = (id: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const allChecked = Object.values(item.permissions).every(Boolean);
        return {
          ...item,
          permissions: {
            view: !allChecked,
            add: !allChecked,
            edit: !allChecked,
            delete: !allChecked,
          }
        };
      }
      return item;
    }));
  };

  const handleSelectAll = (select: boolean) => {
    setItems(prev => prev.map(item => ({
      ...item,
      permissions: {
        view: select,
        add: select,
        edit: select,
        delete: select
      }
    })));
  };

  const handleSaveClick = () => {
    setIsConfirmOpen(true);
  };

  const confirmSave = () => {
    onSave(items);
    setIsConfirmOpen(false);
  };

  const toggleHeader = (id: number) => {
    setExpandedHeaders(prev => 
      prev.includes(id) ? prev.filter(headerId => headerId !== id) : [...prev, id]
    );
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
    setActiveFilterColumn(null);
  };

  const handleColumnFilterChange = (key: string, value: string) => {
    setColumnFilters(prev => ({ ...prev, [key]: value }));
  };

  // --- Filtering & Sorting Logic ---
  let currentHeaderId = -1;
  
  // First, filter based on search inputs
  let processedItems = items.filter(item => {
    // Global Search
    if (globalSearch) {
      const matchGlobal = item.name.toLowerCase().includes(globalSearch.toLowerCase()) || 
                          (item.parentCode && item.parentCode.toLowerCase().includes(globalSearch.toLowerCase()));
      if (!matchGlobal) return false;
    }

    // Column Filters
    if (columnFilters.name && !item.name.toLowerCase().includes(columnFilters.name.toLowerCase())) {
       return false;
    }
    if (columnFilters.parentCode && !item.parentCode.toLowerCase().includes(columnFilters.parentCode.toLowerCase())) {
       return false;
    }

    return true;
  });

  // Then apply sorting if active
  if (sortConfig) {
    // When sorting is active, we might need to ignore the tree structure or sort within groups.
    // For simplicity in this UI demo, we will sort the flat list but keep headers at top if they match
    processedItems.sort((a, b) => {
      const valA = (a[sortConfig.key as keyof MenuItem] || '').toString().toLowerCase();
      const valB = (b[sortConfig.key as keyof MenuItem] || '').toString().toLowerCase();
      
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  } else {
    // If no sort, maintain Hierarchy visibility logic
    processedItems = processedItems.filter(item => {
      if (item.isHeader) {
        currentHeaderId = item.id;
        // If searching/filtering, always show matching headers
        if (globalSearch || columnFilters.name || columnFilters.parentCode) return true;
        return true; 
      }
      
      // If searching/filtering, show matches regardless of expansion
      if (globalSearch || columnFilters.name || columnFilters.parentCode) return true;

      // Otherwise respect expansion
      return expandedHeaders.includes(currentHeaderId);
    });
  }

  // Antd style shadow
  const cardShadowClass = "shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.02)]";

  // --- Render Filter Popup ---
  const renderFilterPopup = (columnKey: string, title: string) => (
    <div 
      className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-[10px] bg-slate-50 border-b border-slate-100">
         <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
      </div>
      
      <div className="p-2 space-y-1">
        <button 
          onClick={() => handleSort(columnKey, 'asc')}
          className={`w-full text-left px-3 py-2 text-[14px] rounded-[4px] flex items-center gap-2 hover:bg-blue-50 transition-colors ${sortConfig?.key === columnKey && sortConfig.direction === 'asc' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-slate-700'}`}
        >
          <ArrowUp size={14} /> Sắp xếp A - Z
        </button>
        <button 
           onClick={() => handleSort(columnKey, 'desc')}
           className={`w-full text-left px-3 py-2 text-[14px] rounded-[4px] flex items-center gap-2 hover:bg-blue-50 transition-colors ${sortConfig?.key === columnKey && sortConfig.direction === 'desc' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-slate-700'}`}
        >
          <ArrowDown size={14} /> Sắp xếp Z - A
        </button>
      </div>

      <div className="h-px bg-slate-100 mx-2 my-1"></div>

      <div className="p-3">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 mb-2 uppercase">
           <Filter size={10} /> Lọc theo giá trị
        </div>
        <input 
          type="text"
          value={columnFilters[columnKey] || ''}
          onChange={(e) => handleColumnFilterChange(columnKey, e.target.value)}
          placeholder="Nhập để lọc..."
          className="w-full h-[36px] px-3 border border-slate-200 rounded-[4px] text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-slate-300"
          autoFocus
        />
      </div>
      
      {/* Clear Filter Button */}
      {(columnFilters[columnKey] || sortConfig?.key === columnKey) && (
        <div className="p-2 border-t border-slate-100 bg-slate-50">
           <button 
             onClick={() => {
                handleColumnFilterChange(columnKey, '');
                if (sortConfig?.key === columnKey) setSortConfig(null);
                setActiveFilterColumn(null);
             }}
             className="w-full text-center text-[12px] text-red-500 hover:text-red-700 font-medium py-1"
           >
             Xóa lọc / Sắp xếp
           </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={`bg-white rounded-[4px] border border-slate-200 flex flex-col h-full relative z-0 ${cardShadowClass}`}>
        {/* Table Toolbar */}
        <div className="p-[10px] border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-[10px]">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full h-[36px] pl-9 pr-3 border border-slate-200 rounded-[4px] leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition duration-150 ease-in-out text-[14px]"
              placeholder="Tìm kiếm tất cả..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center gap-[10px]">
            <div className="flex bg-slate-100 p-1 rounded-[4px]">
              <button 
                onClick={() => handleSelectAll(true)}
                className="h-[28px] px-3 text-[12px] font-medium text-slate-600 hover:text-blue-700 hover:bg-white rounded-[3px] transition-all shadow-sm flex items-center gap-1"
              >
                <CheckSquare size={14} /> Chọn tất cả
              </button>
              <div className="w-px bg-slate-300 mx-1 my-0.5"></div>
              <button 
                onClick={() => handleSelectAll(false)}
                className="h-[28px] px-3 text-[12px] font-medium text-slate-600 hover:text-red-700 hover:bg-white rounded-[3px] transition-all shadow-sm flex items-center gap-1"
              >
                <Square size={14} /> Bỏ chọn
              </button>
            </div>
            
            <button 
              onClick={handleSaveClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 h-[36px] rounded-[4px] text-[14px] font-medium transition-colors shadow-sm"
            >
              <Save size={16} />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-slate-200 table-fixed">
            <thead className="bg-[#d0ebff] sticky top-0 z-10" ref={headerRef}>
              <tr>
                {/* STT - 5% */}
                <th scope="col" className="px-4 py-3 text-left text-[12px] font-bold text-[#1971c2] uppercase tracking-wider w-[60px]">
                  STT
                </th>
                
                {/* Tên danh mục - Fixed 300px */}
                <th scope="col" className="relative px-4 py-3 text-left text-[12px] font-bold text-[#1971c2] uppercase tracking-wider w-[300px]">
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-blue-200/50 -mx-2 px-2 py-1 rounded transition-colors group select-none"
                    onClick={() => setActiveFilterColumn(activeFilterColumn === 'name' ? null : 'name')}
                  >
                    <span>Tên danh mục</span>
                    <div className={`p-1 rounded hover:bg-blue-300/50 transition-colors ${activeFilterColumn === 'name' || columnFilters.name || sortConfig?.key === 'name' ? 'bg-blue-300/50 text-blue-800' : 'opacity-50 group-hover:opacity-100'}`}>
                       <ArrowUpDown size={13} />
                    </div>
                  </div>
                  {activeFilterColumn === 'name' && renderFilterPopup('name', 'Họ và tên')}
                </th>

                {/* ParentCode (was Mã cha) - 15% */}
                <th scope="col" className="relative px-4 py-3 text-left text-[12px] font-bold text-[#1971c2] uppercase tracking-wider hidden md:table-cell w-[180px]">
                   <div 
                     className="flex items-center justify-between cursor-pointer hover:bg-blue-200/50 -mx-2 px-2 py-1 rounded transition-colors group select-none"
                     onClick={() => setActiveFilterColumn(activeFilterColumn === 'parentCode' ? null : 'parentCode')}
                   >
                      <span>ParentCode</span>
                      <div className={`p-1 rounded hover:bg-blue-300/50 transition-colors ${activeFilterColumn === 'parentCode' || columnFilters.parentCode || sortConfig?.key === 'parentCode' ? 'bg-blue-300/50 text-blue-800' : 'opacity-50 group-hover:opacity-100'}`}>
                        <ArrowUpDown size={13} />
                      </div>
                   </div>
                   {activeFilterColumn === 'parentCode' && renderFilterPopup('parentCode', 'ParentCode')}
                </th>
                
                {/* Permissions - Even widths (10% each or fixed w-[100px]) */}
                <th scope="col" className="px-2 py-3 text-center text-[12px] font-bold text-[#1971c2] uppercase tracking-wider w-[100px]">
                  Xem
                </th>
                <th scope="col" className="px-2 py-3 text-center text-[12px] font-bold text-[#1971c2] uppercase tracking-wider w-[100px]">
                  Thêm
                </th>
                <th scope="col" className="px-2 py-3 text-center text-[12px] font-bold text-[#1971c2] uppercase tracking-wider w-[100px]">
                  Sửa
                </th>
                <th scope="col" className="px-2 py-3 text-center text-[12px] font-bold text-[#1971c2] uppercase tracking-wider w-[100px]">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {processedItems.map((item, index) => {
                const isHeader = item.isHeader;
                const isExpanded = expandedHeaders.includes(item.id);

                return (
                  <tr 
                    key={item.id} 
                    onClick={isHeader ? () => toggleHeader(item.id) : undefined}
                    className={`
                      transition-colors duration-150
                      ${isHeader ? 'bg-blue-50/60 hover:bg-blue-100/60 cursor-pointer select-none' : 'hover:bg-slate-50'}
                    `}
                  >
                    <td className={`px-4 py-2.5 text-[14px] truncate ${isHeader ? 'font-bold text-blue-800' : 'text-slate-500'}`}>
                      {item.stt}
                    </td>
                    <td className="px-4 py-2.5 truncate">
                      <div className="flex items-center">
                         {isHeader && (
                           <div className="mr-2 text-blue-600 flex-shrink-0">
                             {isExpanded || globalSearch || columnFilters.name || columnFilters.parentCode || sortConfig ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                           </div>
                         )}
                         <div className={`text-[14px] truncate ${isHeader ? 'font-bold text-blue-900' : 'font-medium text-slate-700'}`}>
                           {item.name}
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-[14px] text-slate-400 hidden md:table-cell truncate">
                      {item.parentCode || '-'}
                    </td>
                    
                    {/* Permissions Checkboxes */}
                    {(['view', 'add', 'edit', 'delete'] as (keyof Permission)[]).map((perm) => (
                      <td key={perm} className="px-2 py-2.5 text-center">
                        <div className="flex justify-center">
                          <label className="relative inline-flex items-center cursor-pointer group" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              className="peer sr-only"
                              checked={item.permissions[perm]}
                              onChange={() => handlePermissionChange(item.id, perm)}
                            />
                            <div className={`
                              w-5 h-5 border rounded-[4px] transition-all duration-200 flex items-center justify-center
                              peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-blue-500/50
                              ${item.permissions[perm] 
                                ? 'bg-blue-600 border-blue-600' 
                                : 'bg-white border-slate-300 group-hover:border-blue-400'}
                            `}>
                              <svg 
                                className={`w-3.5 h-3.5 text-white transform transition-transform duration-200 ${item.permissions[perm] ? 'scale-100' : 'scale-0'}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </label>
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
              
              {processedItems.length === 0 && (
                 <tr>
                   <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                         <Filter size={32} className="text-slate-200" />
                         <p>Không tìm thấy dữ liệu phù hợp</p>
                      </div>
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer / Pagination mock */}
        <div className="border-t border-slate-200 p-[10px] bg-slate-50 rounded-b-[4px] flex justify-between items-center text-[12px] text-slate-500">
           <span>Hiển thị {processedItems.length} dòng</span>
           <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-200 rounded-[4px] bg-white hover:bg-slate-50 disabled:opacity-50 h-[28px] flex items-center">Trước</button>
              <button className="px-3 py-1 border border-slate-200 rounded-[4px] bg-white hover:bg-slate-50 disabled:opacity-50 h-[28px] flex items-center">Sau</button>
           </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[4px] shadow-xl max-w-md w-full overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-[10px]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-slate-900 font-['Be_Vietnam_Pro']">Xác nhận lưu thay đổi</h3>
                    <p className="text-[14px] text-slate-500 mt-1">Bạn có chắc chắn muốn cập nhật phân quyền cho nhóm tài khoản này không?</p>
                  </div>
                </div>
                <button onClick={() => setIsConfirmOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="bg-slate-50 px-[10px] py-3 flex justify-end gap-[10px] border-t border-slate-100">
              <button 
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 h-[36px] text-[14px] font-medium text-slate-700 bg-white border border-slate-300 rounded-[4px] hover:bg-slate-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={confirmSave}
                className="px-4 h-[36px] text-[14px] font-medium text-white bg-blue-600 rounded-[4px] hover:bg-blue-700 transition-colors shadow-sm"
              >
                Đồng ý lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PermissionTable;
