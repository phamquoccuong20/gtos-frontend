'use client';

import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  Trash2, 
  CheckCheck, 
  XSquare, 
  RotateCcw, 
  Search, 
  Smile, 
  Check, 
  X,
  Plus,
  AlertCircle
} from 'lucide-react';
import { CustomerType } from '../types';

interface TableProps {
  customers: CustomerType[];
  selectedIds: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onDeselectAll: () => void;
  onDeleteSelected: () => void;
  onAddRow: () => void;
  onUpdateRow: (id: string, field: keyof CustomerType, value: string) => void;
  onDeleteRow: (id: string) => void;
  onResetToDefault: () => void;
}

export default function Table({
  customers,
  selectedIds,
  searchQuery,
  setSearchQuery,
  onToggleSelect,
  onToggleSelectAll,
  onDeselectAll,
  onDeleteSelected,
  onAddRow,
  onUpdateRow,
  onDeleteRow,
  onResetToDefault
}: TableProps) {
  const [editingCell, setEditingCell] = useState<{ id: string; field: 'code' | 'name' | 'description' } | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [sortField, setSortField] = useState<keyof CustomerType | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Handle sorting
  const handleSort = (field: keyof CustomerType) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter & Sort
  const filteredCustomers = customers.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  const sortedCustomers = [...filteredCustomers];
  if (sortField) {
    sortedCustomers.sort((a, b) => {
      const aValue = String(a[sortField]).toLowerCase();
      const bValue = String(b[sortField]).toLowerCase();
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Cell editing handlers
  const startEdit = (id: string, field: 'code' | 'name' | 'description', value: string) => {
    setEditingCell({ id, field });
    setTempValue(value);
  };

  const saveEdit = () => {
    if (editingCell) {
      onUpdateRow(editingCell.id, editingCell.field, tempValue.trim());
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  // Text Highlighting Helper
  const renderHighlightedText = (text: string, search: string) => {
    if (!search) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === search.toLowerCase() ? (
            <mark 
              key={index} 
              className="bg-yellow-100 text-yellow-900 border border-yellow-200 px-0.5" 
              style={{ borderRadius: '2px' }}
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-[14px]">
      {/* Top Controller Bar - Designed meticulously like the user's mock, but much cleaner! */}
      <div 
        className="bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row gap-4 items-center justify-between"
        style={{
          borderRadius: '4px', // STRICT RULE
          padding: '14px',    // STRICT RULE
        }}
      >
        {/* Search Field */}
        <div className="w-full sm:w-auto flex items-center flex-1 max-w-sm">
          <div className="relative w-full">
            <input
              id="search-input"
              type="text"
              placeholder="Nhập mã hoặc tên loại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 smooth-all"
              style={{
                borderRadius: '4px', // STRICT RULE
              }}
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                id="btn-clear-search"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 hover:text-slate-600 text-slate-400 flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Counter and Bulk Action Selector Buttons */}
        <div className="flex items-center gap-[14px] flex-wrap justify-end w-full sm:w-auto">
          <div className="text-xs font-semibold text-slate-600 bg-blue-50 border border-blue-100 py-1.5 px-3 uppercase tracking-wider" style={{ borderRadius: '4px' }}>
            Số dòng: <span className="font-bold text-blue-700 font-mono text-sm">{sortedCustomers.length}</span>
          </div>

          <div className="flex items-center gap-[10px]">
            <button
              id="btn-select-all"
              onClick={onToggleSelectAll}
              disabled={filteredCustomers.length === 0}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-700 px-3 py-1.5 cursor-pointer smooth-all disabled:opacity-40"
              style={{ borderRadius: '4px' }}
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              Chọn tất cả
            </button>

            <button
              id="btn-deselect-all"
              onClick={onDeselectAll}
              disabled={selectedIds.length === 0}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-700 px-3 py-1.5 cursor-pointer smooth-all disabled:opacity-40"
              style={{ borderRadius: '4px' }}
            >
              <XSquare className="w-3.5 h-3.5 text-rose-500" />
              Bỏ chọn ({selectedIds.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div 
        className="bg-white border border-slate-200 shadow-xs overflow-x-auto smooth-all"
        style={{
          borderRadius: '4px', // STRICT RULE
        }}
      >
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr 
              className="border-b border-blue-200 text-xs font-bold tracking-wider"
              style={{ backgroundColor: '#d0ebff', color: '#1971c2' }}
            >
              {/* Checkbox item */}
              <th className="p-[14px] w-12 text-center select-none">
                <input
                  id="checkbox-th"
                  type="checkbox"
                  checked={sortedCustomers.length > 0 && selectedIds.length === sortedCustomers.length}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 text-[#1971c2] border-blue-300 pointer-events-auto cursor-pointer focus:ring-[#1971c2] rounded-[4px]"
                  style={{ borderRadius: '4px' }}
                />
              </th>
              
              {/* STT */}
              <th 
                className="p-[14px] w-16 text-center select-none cursor-pointer smooth-all"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>STT</span>
                  <ArrowUpDown className="w-3 h-3 text-[#1971c2]/70" />
                </div>
              </th>

              {/* Loại Khách Hàng (Code) */}
              <th 
                className="p-[14px] w-48 text-left select-none cursor-pointer smooth-all"
                onClick={() => handleSort('code')}
              >
                <div className="flex items-center gap-1">
                  <span>Loại Khách Hàng</span>
                  <ArrowUpDown className="w-3 h-3 text-[#1971c2]/70" />
                </div>
              </th>

              {/* Tên loại khách hàng (Name) */}
              <th 
                className="p-[14px] text-left select-none cursor-pointer smooth-all"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  <span>Tên loại khách hàng</span>
                  <ArrowUpDown className="w-3 h-3 text-[#1971c2]/70" />
                </div>
              </th>

              {/* Description column */}
              <th 
                className="p-[14px] text-left select-none cursor-pointer smooth-all hidden md:table-cell"
                onClick={() => handleSort('description')}
              >
                <div className="flex items-center gap-1">
                  <span>Mô tả / Ghi chú nghiệp vụ</span>
                  <ArrowUpDown className="w-3 h-3 text-[#1971c2]/70" />
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {sortedCustomers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-[14px] text-center text-slate-400 py-12">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <span className="font-semibold text-slate-500 text-sm">Không tìm thấy loại khách hàng phù hợp</span>
                    <span className="text-xs text-slate-400 max-w-xs">
                      Hãy thay đổi từ khóa tìm kiếm hoặc bấm nút bên dưới để khôi phục danh sách mặc định.
                    </span>
                    <button
                      id="btn-re-load-default"
                      onClick={onResetToDefault}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1.5 cursor-pointer font-bold smooth-all"
                      style={{ borderRadius: '4px' }}
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      Khôi phục mặc định
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              sortedCustomers.map((customer, index) => {
                const isSelected = selectedIds.includes(customer.id);
                return (
                  <tr 
                    key={customer.id} 
                    className={`smooth-all ${isSelected ? 'bg-blue-50/45 hover:bg-blue-50/70' : 'hover:bg-slate-50'}`}
                  >
                    {/* Checkbox cell */}
                    <td className="p-[14px] text-center select-none">
                      <input
                        id={`checkbox-item-${customer.id}`}
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(customer.id)}
                        className="w-4 h-4 text-blue-600 border-slate-300 cursor-pointer pointer-events-auto rounded-[4px]"
                        style={{ borderRadius: '4px' }}
                      />
                    </td>

                    {/* STT (continuous numbering) */}
                    <td className="p-[14px] text-center font-mono font-medium text-slate-400">
                      {index + 1}
                    </td>

                    {/* Code Cell */}
                    <td className="p-[14px] font-mono font-bold text-slate-800">
                      {editingCell && editingCell.id === customer.id && editingCell.field === 'code' ? (
                        <input
                          id={`input-edit-code-${customer.id}`}
                          type="text"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value.toUpperCase())}
                          onBlur={saveEdit}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="w-full bg-white border border-blue-400 px-2 py-1 focus:outline-hidden font-bold font-mono focus:ring-1 focus:ring-blue-500 text-xs text-blue-700"
                          style={{ borderRadius: '4px' }}
                        />
                      ) : (
                        <div 
                          className="group flex items-center justify-between cursor-pointer hover:bg-slate-100/80 px-2 py-1 smooth-all"
                          style={{ borderRadius: '4px' }}
                          onClick={() => startEdit(customer.id, 'code', customer.code)}
                          title="Nhấp đúp hoặc bấm để sửa lỗi"
                        >
                          <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-[4px] border border-slate-200">
                            {renderHighlightedText(customer.code, searchQuery)}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Name Cell */}
                    <td className="p-[14px] font-medium text-slate-800">
                      {editingCell && editingCell.id === customer.id && editingCell.field === 'name' ? (
                        <input
                          id={`input-edit-name-${customer.id}`}
                          type="text"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          onBlur={saveEdit}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="w-full bg-white border border-blue-400 px-2 py-1 focus:outline-hidden font-medium focus:ring-1 focus:ring-blue-500 text-xs text-blue-700"
                          style={{ borderRadius: '4px' }}
                        />
                      ) : (
                        <div 
                          className="group flex items-center justify-between cursor-pointer hover:bg-slate-100/80 px-2 py-1 smooth-all"
                          style={{ borderRadius: '4px' }}
                          onClick={() => startEdit(customer.id, 'name', customer.name)}
                          title="Bấm để sửa"
                        >
                          <span>{renderHighlightedText(customer.name, searchQuery)}</span>
                        </div>
                      )}
                    </td>

                    {/* Description Cell */}
                    <td className="p-[14px] text-slate-500 hidden md:table-cell">
                      {editingCell && editingCell.id === customer.id && editingCell.field === 'description' ? (
                        <input
                          id={`input-edit-desc-${customer.id}`}
                          type="text"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          onBlur={saveEdit}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="w-full bg-white border border-blue-400 px-2 py-1 focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-xs"
                          style={{ borderRadius: '4px' }}
                        />
                      ) : (
                        <div 
                          className="group flex items-center justify-between cursor-pointer hover:bg-slate-100/80 px-2 py-1 smooth-all"
                          style={{ borderRadius: '4px' }}
                          onClick={() => startEdit(customer.id, 'description', customer.description)}
                          title="Bấm để sửa"
                        >
                          <span className="italic">{renderHighlightedText(customer.description || 'Chưa có thông tin mô tả chi tiết', searchQuery)}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
