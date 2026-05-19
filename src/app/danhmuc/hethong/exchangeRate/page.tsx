'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { DollarSign, Info, ChevronDown } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/DataTable';
import { ExchangeRate } from './types';
import { INITIAL_RATES } from './constants';

const ExchangeRatePage: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRate[]>(INITIAL_RATES);
  const [isDirty, setIsDirty] = useState(false);

  // Inline update handler
  const handleUpdateRate = useCallback((id: string, field: keyof ExchangeRate, value: any) => {
    setRates(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
    setIsDirty(true);
  }, []);

  const handleDelete = useCallback((ids: string[]) => {
    setRates(prev => prev.filter(r => !new Set(ids).has(r.id)));
    setIsDirty(true);
  }, []);

  const handleAdd = useCallback((count: number) => {
    const newRates: ExchangeRate[] = Array.from({ length: count }).map((_, i) => ({
      id: (Date.now() + i).toString(),
      code: '',
      value: 0,
      description: '',
      lastUpdated: new Date().toLocaleString(),
      isActive: true,
    }));
    setRates(prev => [...newRates, ...prev]);
    setIsDirty(true);
  }, []);

  const handleSave = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsDirty(false);
  }, []);

  /** Column definitions — inside component so they can access handleUpdateRate */
  const exchangeRateColumns: ColumnDef<ExchangeRate>[] = useMemo(() => [
    {
      key: 'code',
      label: 'Mã tỷ giá',
      minWidth: '120px',
      sortable: true,
      render: (_value: any, row: ExchangeRate) => (
        <input
          type="text"
          value={row.code}
          placeholder="Mã"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleUpdateRate(row.id, 'code', e.target.value.toUpperCase())}
          className="bg-transparent font-black text-gray-900 text-[14px] focus:outline-none w-full focus:bg-blue-50/50 rounded px-1 py-0.5 transition-colors"
        />
      ),
    },
    {
      key: 'value',
      label: 'Tỷ giá',
      minWidth: '140px',
      sortable: true,
      render: (_value: any, row: ExchangeRate) => (
        <input
          type="text"
          value={row.value.toLocaleString('vi-VN')}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const cleanValue = e.target.value.replace(/[^\d.,]/g, '').replace(/,/g, '.');
            const numValue = parseFloat(cleanValue) || 0;
            handleUpdateRate(row.id, 'value', numValue);
          }}
          className="bg-transparent font-mono font-bold text-gray-800 text-[15px] focus:outline-none w-full focus:bg-blue-50/50 rounded px-1 py-0.5 transition-colors"
        />
      ),
    },
    {
      key: 'description',
      label: 'Diễn giải',
      minWidth: '200px',
      sortable: true,
      render: (_value: any, row: ExchangeRate) => (
        <input
          type="text"
          value={row.description}
          placeholder="Nhập diễn giải..."
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleUpdateRate(row.id, 'description', e.target.value)}
          className="bg-transparent text-gray-500 text-sm italic focus:outline-none w-full focus:bg-blue-50/50 focus:not-italic rounded px-1 py-0.5 transition-colors"
        />
      ),
    },
    {
      key: 'isActive',
      label: 'Trạng thái',
      render: (_value: any, row: ExchangeRate) => (
        <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
          <select
            value={row.isActive ? 'active' : 'inactive'}
            onChange={(e) => handleUpdateRate(row.id, 'isActive', e.target.value === 'active')}
            className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-[11px] font-bold uppercase cursor-pointer focus:outline-none border transition-all bg-white ${
              row.isActive
                ? 'text-emerald-600 border-emerald-200 hover:border-emerald-400 bg-emerald-50'
                : 'text-rose-600 border-rose-200 hover:border-rose-400 bg-rose-50'
            }`}
          >
            <option value="active">Đang hiệu lực</option>
            <option value="inactive">Hết hiệu lực</option>
          </select>
          <ChevronDown
            className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${
              row.isActive ? 'text-emerald-400' : 'text-rose-400'
            }`}
            size={12}
          />
        </div>
      ),
    },
  ], [handleUpdateRate]);

  return (
    <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 p-[10px]">
      {/* Table Card */}
      <div className="flex-1 bg-white rounded-[4px] shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.02)] overflow-hidden border border-[#f0f0f0]">
        <DataTable<ExchangeRate>
          data={rates}
          columns={exchangeRateColumns}
          rowKey="id"
          searchableFields={['code', 'description']}
          pageSize={10}
          title="Tỷ Giá"
          subtitle="Thiết lập và quản lý tỷ giá ngoại tệ áp dụng cho dịch vụ cảng"
          headerIcon={<DollarSign size={22} />}
          emptyMessage="Không tìm thấy dữ liệu tỷ giá"
          onDelete={handleDelete}
          onAdd={handleAdd}
          onSave={handleSave}
          isDirty={isDirty}
          isSaving={false}
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
    </div>
  );
};

export default ExchangeRatePage;
