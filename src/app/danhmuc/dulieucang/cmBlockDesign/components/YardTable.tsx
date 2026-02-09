'use client';

import React from 'react';
import { YardSection } from '../types';

interface YardTableProps {
  data: YardSection[];
  onRowClick?: (section: YardSection) => void;
}

export const YardTable: React.FC<YardTableProps> = ({ data, onRowClick }) => {
  const getStatusBadge = (section: YardSection) => {
    const percentage = (section.currentValue / section.capacity) * 100;
    if (percentage >= 100) {
      return <span className="px-2 py-1 text-[10px] font-bold rounded bg-red-100 text-red-700">Đầy bãi</span>;
    }
    if (percentage > 70) {
      return <span className="px-2 py-1 text-[10px] font-bold rounded bg-orange-100 text-orange-700">Sắp đầy</span>;
    }
    if (section.currentValue === 0) {
      return <span className="px-2 py-1 text-[10px] font-bold rounded bg-slate-100 text-slate-600">Trống</span>;
    }
    return <span className="px-2 py-1 text-[10px] font-bold rounded bg-emerald-100 text-emerald-700">Hoạt động</span>;
  };

  const getProgressColor = (section: YardSection) => {
    const percentage = (section.currentValue / section.capacity) * 100;
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-orange-500';
    if (percentage > 40) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">STT</th>
              <th className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Mã khu vực</th>
              <th className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Tên khu vực</th>
              <th className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Sức chứa</th>
              <th className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Đang sử dụng</th>
              <th className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Tỷ lệ</th>
              <th className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Số lô hàng</th>
              <th className="px-4 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((section, index) => {
              const percentage = ((section.currentValue / section.capacity) * 100).toFixed(1);
              return (
                <tr 
                  key={section.id}
                  onClick={() => onRowClick?.(section)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-800">{section.name}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{section.label}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700">{section.capacity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700">{section.currentValue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${getProgressColor(section)} rounded-full transition-all`}
                          style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{percentage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{section.items.length}</td>
                  <td className="px-4 py-3">{getStatusBadge(section)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex justify-between items-center">
        <span className="text-xs text-slate-500">
          Tổng: <b className="text-slate-700">{data.length}</b> khu vực
        </span>
        <div className="flex gap-4 text-xs">
          <span className="text-slate-500">
            Tổng sức chứa: <b className="text-slate-700">{data.reduce((sum, s) => sum + s.capacity, 0).toLocaleString()}</b>
          </span>
          <span className="text-slate-500">
            Đang sử dụng: <b className="text-slate-700">{data.reduce((sum, s) => sum + s.currentValue, 0).toLocaleString()}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default YardTable;
