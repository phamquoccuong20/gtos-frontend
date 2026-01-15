"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  X,
  Ship,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import AreaTable from './Table/AreaTable';
import { MOCK_AREAS } from './constants';
import { Area } from './types';
import AddRowsModal from '@/components/AddRowsModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

const AreaManagementPage: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>(MOCK_AREAS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'single' | 'bulk', id?: string }>({ type: 'bulk' });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredAreas = useMemo(() => {
    return areas.filter(area => 
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [areas, searchTerm]);

  const totalPages = Math.ceil(filteredAreas.length / rowsPerPage);

  const paginatedAreas = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredAreas.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAreas, currentPage]);

  const handleOpenDeleteSingle = (id: string) => {
    setDeleteTarget({ type: 'single', id });
    setIsDeleteModalOpen(true);
  };

  const handleOpenDeleteBulk = () => {
    if (selectedIds.length === 0) return;
    setDeleteTarget({ type: 'bulk' });
    setIsDeleteModalOpen(true);
  };

  const handleUpdateArea = (updatedArea: Area) => {
    setAreas(prev => prev.map(area => area.id === updatedArea.id ? updatedArea : area));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = paginatedAreas.map(a => a.id);
    const allVisibleSelected = visibleIds.every(id => selectedIds.includes(id));
    if (allVisibleSelected) {
      setSelectedIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleConfirmAdd = (count: number) => {
    setIsModalOpen(false);
    const newRows: Area[] = Array.from({ length: count }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      index: 0,
      code: '',
      name: '',
      capacity: 0,
      type: 'Nội bộ',
    }));
    setAreas(prev => {
      const combined = [...newRows, ...prev];
      return combined.map((area, idx) => ({ ...area, index: idx + 1 }));
    });
    setCurrentPage(1);
    setToast({ show: true, message: `Đã thêm ${count} dòng mới!`, type: 'success' });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToast({ show: true, message: 'Dữ liệu đã được lưu thành công!', type: 'success' });
    }, 800);
  };

   const executeDelete = () => {
    if (deleteTarget.type === 'single' && deleteTarget.id) {
      const updatedAreas = areas.filter(area => area.id !== deleteTarget.id);
      setAreas(updatedAreas.map((area, idx) => ({ ...area, index: idx + 1 })));
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== deleteTarget.id));
      setToast({ show: true, message: 'Đã xóa thành công!', type: 'success' });
    } else if (deleteTarget.type === 'bulk') {
      const updatedAreas = areas.filter(area => !selectedIds.includes(area.id));
      setAreas(updatedAreas.map((area, idx) => ({ ...area, index: idx + 1 })));
      setSelectedIds([]);
      setToast({ show: true, message: `Đã xóa ${selectedIds.length} mục!`, type: 'success' });
    }
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    executeDelete();
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-x-hidden antialiased">
      {/* Toast Notification */}
      <div className={`fixed top-6 right-6 z-[120] transition-all duration-500 transform ${toast?.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className={`bg-white border-l-4 ${toast?.type === 'success' ? 'border-emerald-500' : 'border-red-500'} px-5 py-3.5 rounded-[4px] shadow-xl flex items-center gap-4 min-w-[320px]`}>
          <div className={`w-9 h-9 rounded-[4px] flex items-center justify-center ${toast?.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            {toast?.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-sm">{toast?.type === 'success' ? 'Thành công' : 'Thông báo'}</h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{toast?.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-slate-300 hover:text-slate-500 transition-colors"><X size={16} /></button>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-5">
        {/* Header Section */}
        <div className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-[4px] flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <Ship size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Vùng Phụ</h2>
              </div>
            <p className="text-sm text-slate-500 mt-0.5">Quản lý bãi phụ và sức chứa cảng Tân Thuận</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleOpenDeleteBulk}
              disabled={selectedIds.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-[4px] font-semibold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-30 transition-all min-w-[80px] justify-center"
            >
              <Trash2 size={16} />
              <span>Xóa{selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}</span>
            </button>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-[4px] font-semibold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-50"
            >
              <Plus size={18} />
              <span>Thêm dòng</span>
            </button>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-2 bg-white border border-orange-500 text-orange-600 rounded-[4px] font-bold text-sm hover:bg-orange-50 transition-all disabled:opacity-50 min-w-[80px] justify-center"
            >
              <Save size={18} />
              <span>{isSaving ? 'Lưu...' : 'Lưu'}</span>
            </button>
          </div>
        </div>

        {/* Table Container with Padding */}
        <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-sm overflow-hidden">
          <AreaTable 
            areas={paginatedAreas} 
            totalResults={filteredAreas.length}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onDelete={handleOpenDeleteSingle}
            onUpdate={handleUpdateArea}
            selectedIds={selectedIds}
            toggleSelect={toggleSelect}
            toggleSelectAll={toggleSelectAll}
          />
        </div>
      </main>



      <AddRowsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        count={selectedIds.length}
        entityName="dòng"
      />
    </div>
  );
};

export default AreaManagementPage;
