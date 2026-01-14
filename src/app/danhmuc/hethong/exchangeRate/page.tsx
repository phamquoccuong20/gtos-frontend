'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Search, 
  Info,
  DollarSign,
} from 'lucide-react';

// Local imports
import { ExchangeRate, ToastMessage } from './types';
import { INITIAL_RATES, ITEMS_PER_PAGE_OPTIONS, DEFAULT_ITEMS_PER_PAGE, TOAST_DURATION_MS } from './constants';
import AddRowsModal from '@/components/AddRowsModal';
import {
  ExchangeRateTable,
  DeleteConfirmModal,
  ToastNotification,
  Pagination,
} from './components';

/**
 * Exchange Rate Management Page
 * Main page component for managing exchange rates
 */
const ExchangeRatePage: React.FC = () => {
  // Data state
  const [rates, setRates] = useState<ExchangeRate[]>(INITIAL_RATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // UI state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage>({ title: '', detail: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowsToAdd, setRowsToAdd] = useState(1);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  // Filtered and paginated data
  const filteredRates = useMemo(() => {
    return rates.filter(rate => 
      rate.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      rate.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rates, searchQuery]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredRates.length / itemsPerPage);
  
  const paginatedRates = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRates.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRates, currentPage, itemsPerPage]);

  // Toast helper
  const showToastMessage = (title: string, detail: string) => {
    setToastMessage({ title, detail });
    setShowToast(true);
    setTimeout(() => setShowToast(false), TOAST_DURATION_MS);
  };

  // Handler: Add new rows
  const handleConfirmAdd = (count?: number) => {
    const finalCount = count || rowsToAdd;
    const newRates: ExchangeRate[] = Array.from({ length: finalCount }).map((_, i) => ({
      id: (Date.now() + i).toString(),
      code: '',
      value: 0,
      description: '',
      lastUpdated: new Date().toLocaleString(),
      isActive: true
    }));
    setRates([...newRates, ...rates]);
    setShowAddModal(false);
    setRowsToAdd(1);
    setCurrentPage(1);
    
    showToastMessage(
      'Thêm dòng thành công',
      `Đã thêm ${finalCount} dòng mới vào danh sách.`
    );
  };

  // Handler: Update a rate field
  const handleUpdateRate = (id: string, field: keyof ExchangeRate, value: any) => {
    setRates(rates.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Handler: Delete selected rows
  const handleConfirmDelete = () => {
    const count = selectedIds.size;
    const newRates = rates.filter(r => !selectedIds.has(r.id));
    setRates(newRates);
    setSelectedIds(new Set());
    setShowDeleteModal(false);
    
    // Adjust page if current page becomes empty
    const newTotalPages = Math.ceil(newRates.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
    
    showToastMessage(
      'Xóa thành công',
      `Đã xóa ${count} dòng dữ liệu khỏi hệ thống.`
    );
  };

  // Handler: Toggle select all (current page only)
  const handleToggleSelectAll = () => {
    const currentPaginatedIds = paginatedRates.map(r => r.id);
    const allCurrentPaginatedSelected = currentPaginatedIds.every(id => selectedIds.has(id));
    
    const next = new Set(selectedIds);
    if (allCurrentPaginatedSelected) {
      currentPaginatedIds.forEach(id => next.delete(id));
    } else {
      currentPaginatedIds.forEach(id => next.add(id));
    }
    setSelectedIds(next);
  };

  // Handler: Toggle single row selection
  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // Handler: Save all data
  const handleSave = () => {
    showToastMessage(
      'Cập nhật thành công',
      'Dữ liệu tỷ giá đã được đồng bộ trên toàn hệ thống GTOS.'
    );
  };

  return (
    <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 p-[10px]">
      {/* Header Card */}
      <div className="bg-white border border-gray-200 rounded p-[14px] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <DollarSign size={24} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Tỷ Giá</h1>
            <p className="text-sm text-gray-400 font-medium italic">Thiết lập và quản lý tỷ giá ngoại tệ áp dụng cho dịch vụ cảng</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <button 
              onClick={() => setShowDeleteModal(true)} 
              className="flex items-center gap-2 px-4 py-2.5 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-all font-bold text-sm animate-in fade-in zoom-in duration-200"
            >
              <Trash2 size={16} />
              Xóa ({selectedIds.size})
            </button>
          )}

          <button 
            onClick={() => setShowAddModal(true)} 
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all font-bold text-sm shadow-md shadow-blue-500/10"
          >
            <Plus size={18} strokeWidth={3} />
            Thêm dòng
          </button>
          <button 
            onClick={handleSave} 
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-all font-bold text-sm shadow-md shadow-emerald-500/10"
          >
            <Save size={18} />
            Lưu Hệ Thống
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
        {/* Search & Stats Header */}
        <div className="p-[14px] border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mã ngoại tệ, diễn giải..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded text-sm focus:ring-4 focus:ring-blue-500/5 focus:outline-none focus:border-blue-200 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Hiển thị</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-gray-200 rounded text-xs font-bold px-2 py-1 focus:outline-none focus:border-blue-500"
              >
                {ITEMS_PER_PAGE_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              TỔNG CỘNG: <span className="text-blue-600 font-black">{filteredRates.length}</span> NGOẠI TỆ
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="p-[14px] pb-0 overflow-hidden">
          <ExchangeRateTable
            paginatedRates={paginatedRates}
            selectedIds={selectedIds}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onToggleSelectAll={handleToggleSelectAll}
            onToggleSelect={handleToggleSelect}
            onUpdateRate={handleUpdateRate}
          />
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Info Box */}
      <div className="bg-blue-50/50 rounded p-[14px] border border-blue-100/50 flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-sm border border-blue-100 shrink-0">
          <Info className="text-blue-500" size={20} />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-blue-900">Quy định Cảng</p>
          <p className="text-xs text-blue-800/70 leading-relaxed font-medium">
            Tỷ giá niêm yết được áp dụng cho toàn bộ các hóa đơn phát sinh trong ngày. Mọi thay đổi tỷ giá sau 10:00 AM cần có sự phê duyệt trực tiếp của Ban Giám đốc thông qua hệ thống phê duyệt trực tuyến.
          </p>
        </div>
      </div>

      {/* Modals */}
      <AddRowsModal
        isOpen={showAddModal}
        onConfirm={handleConfirmAdd}
        onClose={() => setShowAddModal(false)}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        selectedCount={selectedIds.size}
        onConfirm={handleConfirmDelete}
        onClose={() => setShowDeleteModal(false)}
      />

      {/* Toast Notification */}
      <ToastNotification
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ExchangeRatePage;
