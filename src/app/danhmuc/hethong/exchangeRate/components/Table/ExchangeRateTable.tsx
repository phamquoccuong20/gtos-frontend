'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ExchangeRate } from '../../types';

interface ExchangeRateTableProps {
  paginatedRates: ExchangeRate[];
  selectedIds: Set<string>;
  currentPage: number;
  itemsPerPage: number;
  onToggleSelectAll: () => void;
  onToggleSelect: (id: string) => void;
  onUpdateRate: (id: string, field: keyof ExchangeRate, value: any) => void;
}

/**
 * ExchangeRateTable Component
 * Renders the exchange rate data in a table format with inline editing
 */
const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({
  paginatedRates,
  selectedIds,
  currentPage,
  itemsPerPage,
  onToggleSelectAll,
  onToggleSelect,
  onUpdateRate,
}) => {
  const allCurrentPaginatedSelected = paginatedRates.length > 0 && 
    paginatedRates.every(r => selectedIds.has(r.id));

  return (
    <div className="overflow-x-auto border border-gray-100 rounded-lg shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#d0ebff] text-[10px] uppercase tracking-widest font-bold text-[#1971c2]">
            <th className="p-[14px] w-12 text-center">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 accent-blue-600 cursor-pointer" 
                checked={allCurrentPaginatedSelected} 
                onChange={onToggleSelectAll} 
              />
            </th>
            <th className="p-[14px] text-left w-16">STT</th>
            <th className="p-[14px] text-left">Mã tỷ giá</th>
            <th className="p-[14px] text-left">TỶ GIÁ</th>
            <th className="p-[14px] text-left">Diễn giải</th>
            <th className="p-[14px] text-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {paginatedRates.map((rate, index) => (
            <tr 
              key={rate.id} 
              className={`group transition-all ${
                selectedIds.has(rate.id) ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'
              }`}
            >
              <td className="p-[14px] text-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 accent-blue-600 cursor-pointer" 
                  checked={selectedIds.has(rate.id)} 
                  onChange={() => onToggleSelect(rate.id)} 
                />
              </td>
              <td className="p-[14px] text-sm font-bold text-gray-400">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="p-[14px]">
                <input 
                  type="text" 
                  value={rate.code}
                  placeholder="Mã"
                  onChange={(e) => onUpdateRate(rate.id, 'code', e.target.value.toUpperCase())}
                  className="bg-transparent font-black text-gray-900 focus:outline-none w-16"
                />
              </td>
              <td className="p-[14px]">
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    value={rate.value.toLocaleString('vi-VN')}
                    onChange={(e) => {
                      // Remove all non-numeric characters except decimal point
                      const cleanValue = e.target.value.replace(/[^\d.,]/g, '').replace(/,/g, '.');
                      const numValue = parseFloat(cleanValue) || 0;
                      onUpdateRate(rate.id, 'value', numValue);
                    }}
                    className="bg-transparent font-mono font-bold text-gray-800 focus:outline-none text-lg w-32"
                  />
                </div>
              </td>
              <td className="p-[14px]">
                <input 
                  type="text" 
                  value={rate.description}
                  placeholder="Nhập diễn giải..."
                  onChange={(e) => onUpdateRate(rate.id, 'description', e.target.value)}
                  className="bg-transparent text-gray-500 text-sm focus:outline-none w-full italic"
                />
              </td>
              <td className="p-[14px] text-center">
                <div className="relative inline-block">
                  <select
                    value={rate.isActive ? 'active' : 'inactive'}
                    onChange={(e) => onUpdateRate(rate.id, 'isActive', e.target.value === 'active')}
                    className={`appearance-none pl-3 pr-8 py-1 rounded text-[10px] font-bold uppercase cursor-pointer focus:outline-none border transition-all bg-white ${
                      rate.isActive 
                        ? 'text-green-600 border-green-200 hover:border-green-400' 
                        : 'text-red-600 border-red-200 hover:border-red-400'
                    }`}
                  >
                    <option value="active">Đang hiệu lực</option>
                    <option value="inactive">Hết hiệu lực</option>
                  </select>
                  <ChevronDown 
                    className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${
                      rate.isActive ? 'text-green-400' : 'text-red-400'
                    }`} 
                    size={12} 
                  />
                </div>
              </td>
            </tr>
          ))}
          {paginatedRates.length === 0 && (
            <tr>
              <td colSpan={6} className="p-10 text-center text-gray-400 italic text-sm">
                Không tìm thấy dữ liệu tỷ giá nào phù hợp...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRateTable;
