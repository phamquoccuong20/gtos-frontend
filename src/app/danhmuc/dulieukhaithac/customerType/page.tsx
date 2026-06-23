'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Users, RotateCcw } from 'lucide-react';
import Toast, { ToastMessage } from './components/Toast';
import { DataTable, ColumnDef } from '@/components/DataTable';
import ConfirmModal from './components/ConfirmModal';
import { CustomerType, ActivityLog } from './types';

// Default mock values
const INITIAL_CUSTOMERS: CustomerType[] = [
  { 
    id: 'ct-1', 
    code: 'FWD', 
    name: 'FORWARDER', 
    description: 'Đại lý giao nhận vận tải biển (Freight Forwarder)',
    createdAt: new Date().toLocaleDateString('vi-VN') 
  },
  { 
    id: 'ct-2', 
    code: 'OWN', 
    name: 'OWNER', 
    description: 'Chủ phương tiện tàu biển / Công ty vận tải biển',
    createdAt: new Date().toLocaleDateString('vi-VN') 
  },
  { 
    id: 'ct-3', 
    code: 'REC', 
    name: 'RECEIVER', 
    description: 'Người trực tiếp nhận hàng tại cảng bến',
    createdAt: new Date().toLocaleDateString('vi-VN') 
  }
];

export default function CustomerTypePage() {
  // States
  const [customers, setCustomers] = useState<CustomerType[]>(INITIAL_CUSTOMERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  
  const isLoaded = useRef(false);

  // Load state from localStorage on mount (prevents SSR Hydration mismatch)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCustomers = localStorage.getItem('gtos_customer_types');
      if (savedCustomers) {
        try {
          setCustomers(JSON.parse(savedCustomers));
        } catch (e) {
          console.error('Failed to parse customer types from storage', e);
        }
      }
      
      const savedLogs = localStorage.getItem('gtos_activity_logs');
      if (savedLogs) {
        try {
          setLogs(JSON.parse(savedLogs));
        } catch (e) {
          console.error('Failed to parse activity logs from storage', e);
        }
      }
      isLoaded.current = true;
    }
  }, []);

  // Auto-save logs to local storage only after initial load is complete
  useEffect(() => {
    if (!isLoaded.current) return;
    if (typeof window !== 'undefined') {
      localStorage.setItem('gtos_activity_logs', JSON.stringify(logs));
    }
  }, [logs]);

  // Toast utilities
  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity Log utilities
  const addLog = (action: ActivityLog['action'], details: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour12: false }),
      action,
      details
    };
    setLogs((prev) => [...prev, newLog].slice(-20)); // Keep last 20 logs for size limits
  };

  // Actions
  const handleUpdateRow = useCallback((id: string, field: keyof CustomerType, value: string) => {
    setCustomers((prev) => {
      // Duplicate check for Code inside setCustomers to avoid stale closure issues
      if (field === 'code') {
        const codeVal = value.toUpperCase().trim();
        if (!codeVal) return prev;
        const duplicate = prev.find(c => c.id !== id && c.code.toUpperCase() === codeVal);
        if (duplicate) {
          addToast('error', `Không thể cập nhật: Mã loại "${codeVal}" đã tồn tại.`);
          return prev;
        }
      }

      const next = prev.map((c) => {
        if (c.id === id) {
          const oldValue = c[field];
          if (oldValue === value) return c; // No change
          return { 
            ...c, 
            [field]: field === 'code' ? value.toUpperCase() : value
          };
        }
        return c;
      });
      return next;
    });
    setIsDirty(true);
  }, []);

  const handleAdd = useCallback((count: number) => {
    const newCustomers: CustomerType[] = [];
    const baseTime = Date.now();

    for (let i = 0; i < count; i++) {
      const newId = `ct-${baseTime}-${i}`;
      const suffix = count > 1 ? ` ${i + 1}` : '';
      newCustomers.push({
        id: newId,
        code: `NEW_CODE${count > 1 ? `_${i + 1}` : ''}`,
        name: `TÊN LOẠI MỚI${suffix}`,
        description: 'Nhấp để nhập thông tin chi tiết',
        createdAt: new Date().toLocaleDateString('vi-VN')
      });
    }

    setCustomers((prev) => [...newCustomers, ...prev]);
    setIsDirty(true);
    addToast('success', `Đã thêm thành công ${count} dòng mới!`);
    addLog('ADD', `Chèn mới ${count} dòng phân loại khách hàng trống.`);
  }, []);

  const handleDelete = useCallback((ids: string[]) => {
    setCustomers(prev => prev.filter(c => !ids.includes(c.id)));
    setIsDirty(true);
    addToast('success', `Đã xóa thành công ${ids.length} dòng đã chọn.`);
    addLog('DELETE', `Đã thực hiện xóa ${ids.length} dòng phân loại.`);
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    addLog('SAVE', 'Yêu cầu đồng bộ và lưu dữ liệu lên hệ thống trung tâm GTOS.');
    
    await new Promise(resolve => setTimeout(resolve, 800));

    if (typeof window !== 'undefined') {
      localStorage.setItem('gtos_customer_types', JSON.stringify(customers));
    }
    setIsSaving(false);
    setIsDirty(false);
    addToast('success', `Hệ thống GTOS đã lưu thành công ${customers.length} loại khách hàng bến cảng.`);
    addLog('SAVE', 'Hoàn tất đồng bộ dữ liệu vào bộ lưu trữ. Dữ liêu đã sẵn sàng phục vụ điều độ.');
  }, [customers]);

  const handleResetToDefault = useCallback(() => {
    setShowResetConfirmModal(true);
  }, []);

  const confirmResetToDefault = useCallback(() => {
    setCustomers(INITIAL_CUSTOMERS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gtos_customer_types');
    }
    setIsDirty(true);
    addToast('success', 'Đã khôi phục danh mục loại khách hàng chuẩn của Mỹ Thủy JVC.');
    addLog('RESET', 'Đặt lại cấu hình của danh mục phân loại khánh hàng về mặc định.');
  }, []);

  const extraActions = useMemo(() => (
    <button
      onClick={handleResetToDefault}
      className="h-[38px] flex items-center gap-2 px-4 border border-[#d9d9d9] text-slate-600 rounded-md hover:text-[#1890ff] hover:border-[#1890ff] text-[13px] font-bold transition-all bg-white cursor-pointer"
    >
      <RotateCcw size={16} />
      Đặt lại mặc định
    </button>
  ), [handleResetToDefault]);

  /** Column definitions for the CustomerType table */
  const customerColumns = useMemo<ColumnDef<CustomerType>[]>(() => [
    {
      key: 'code',
      label: 'Loại Khách Hàng',
      minWidth: '145px',
      sortable: true,
      render: (_value: any, row: CustomerType) => (
        <input
          type="text"
          value={row.code}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleUpdateRow(row.id, 'code', e.target.value)}
          className="bg-transparent font-mono font-bold text-slate-800 text-xs px-2.5 py-1.5 rounded-[4px] border border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 w-full focus:bg-white transition-all uppercase"
        />
      ),
    },
    {
      key: 'name',
      label: 'Tên loại khách hàng',
      minWidth: '240px',
      sortable: true,
      render: (_value: any, row: CustomerType) => (
        <input
          type="text"
          value={row.name}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleUpdateRow(row.id, 'name', e.target.value)}
          className="bg-transparent font-medium text-slate-800 text-xs px-2.5 py-1.5 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-blue-500 w-full focus:bg-white border border-transparent focus:border-slate-200 transition-all"
        />
      ),
    },
    {
      key: 'description',
      label: 'Mô tả / Ghi chú nghiệp vụ',
      minWidth: '320px',
      sortable: true,
      render: (_value: any, row: CustomerType) => (
        <input
          type="text"
          value={row.description}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleUpdateRow(row.id, 'description', e.target.value)}
          className="bg-transparent text-slate-500 text-xs px-2.5 py-1.5 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-blue-500 w-full focus:bg-white border border-transparent focus:border-slate-200 transition-all"
        />
      ),
    },
  ], [handleUpdateRow]);

  return (
    <div className="w-full flex-1 flex flex-col font-sans selection:bg-blue-100 smooth-all">
      {/* Toast notifications */}
      <Toast toasts={toasts} onClose={removeToast} />

      {/* Main Page Layout Wrapper */}
      <div className="w-full flex flex-col gap-5" style={{ padding: '14px' }}>
        
        {/* Table Container */}
        <div className="flex-1 bg-white rounded-[4px] shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.02)] overflow-hidden border border-[#f0f0f0]">
          <DataTable<CustomerType>
            data={customers}
            columns={customerColumns}
            rowKey="id"
            searchableFields={['code', 'name', 'description']}
            pageSize={10}
            title="DANH MỤC LOẠI KHÁCH HÀNG"
            headerIcon={<Users size={22} />}
            emptyMessage="Không tìm thấy loại khách hàng phù hợp"
            onDelete={handleDelete}
            onAdd={handleAdd}
            onSave={handleSave}
            isDirty={isDirty}
            isSaving={isSaving}
            extraActions={extraActions}
          />
        </div>

        {/* Footer info text */}
        <div className="text-center py-3 text-[12px] text-slate-500 font-normal select-none">
          © 2026 GTOS - Hệ thống Quản trị Cảng hiện đại. Được phát triển bởi <span className="text-[#1890ff] hover:underline cursor-pointer">CEH Software.</span>
        </div>

      </div>

      <ConfirmModal
        isOpen={showResetConfirmModal}
        onClose={() => setShowResetConfirmModal(false)}
        onConfirm={confirmResetToDefault}
        title="Xác nhận đặt lại"
        message="Bạn có chắc chắn muốn đặt lại danh sách loại khách hàng về mặc định ban đầu không? Thao tác này sẽ khôi phục lại cấu hình ban đầu."
        confirmText="Đồng ý đặt lại"
        cancelText="Hủy bỏ"
      />
    </div>
  );
}
