'use client';

import React from 'react';
import { Users, Truck, Anchor, Landmark } from 'lucide-react';
import { CustomerType } from '../types';

interface StatsGridProps {
  customers: CustomerType[];
}

export default function StatsGrid({ customers }: StatsGridProps) {
  // Count frequency of common codes as fun statistics
  const countByCode = (codePrefix: string) => {
    return customers.filter(c => c.code.toUpperCase().includes(codePrefix.toUpperCase())).length;
  };

  const fwdCount = countByCode('FWD');
  const ownCount = countByCode('OWN');
  const recCount = countByCode('REC');

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Stat Card */}
      <div 
        className="bg-white border border-slate-200/80 shadow-xs flex items-center justify-between smooth-all hover:border-blue-300"
        style={{
          borderRadius: '4px', // STRICT RULE
          padding: '14px',    // STRICT RULE
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tổng số Loại</span>
          <span className="text-2xl font-bold text-slate-900 leading-none">{customers.length}</span>
          <span className="text-[10px] text-slate-500 font-medium">Danh mục hiện có</span>
        </div>
        <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-[4px]">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* Forwarder Stat Card */}
      <div 
        className="bg-white border border-slate-200/80 shadow-xs flex items-center justify-between smooth-all hover:border-amber-300"
        style={{
          borderRadius: '4px', // STRICT RULE
          padding: '14px',    // STRICT RULE
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Forwarders (FWD)</span>
          <span className="text-2xl font-bold text-amber-600 leading-none">{fwdCount}</span>
          <span className="text-[10px] text-slate-500 font-medium">Bên đại lý giao nhận</span>
        </div>
        <div className="w-10 h-10 bg-amber-50 text-amber-600 flex items-center justify-center rounded-[4px]">
          <Truck className="w-5 h-5" />
        </div>
      </div>

      {/* Owner Stat Card */}
      <div 
        className="bg-white border border-slate-200/80 shadow-xs flex items-center justify-between smooth-all hover:border-emerald-300"
        style={{
          borderRadius: '4px', // STRICT RULE
          padding: '14px',    // STRICT RULE
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chủ tàu (OWN)</span>
          <span className="text-2xl font-bold text-emerald-600 leading-none">{ownCount}</span>
          <span className="text-[10px] text-slate-500 font-medium">Đơn vị chủ phương tiện</span>
        </div>
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-[4px]">
          <Anchor className="w-5 h-5" />
        </div>
      </div>

      {/* Receiver Stat Card */}
      <div 
        className="bg-white border border-slate-200/80 shadow-xs flex items-center justify-between smooth-all hover:border-purple-300"
        style={{
          borderRadius: '4px', // STRICT RULE
          padding: '14px',    // STRICT RULE
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Người nhận (REC)</span>
          <span className="text-2xl font-bold text-purple-600 leading-none">{recCount}</span>
          <span className="text-[10px] text-slate-500 font-medium">Doanh nghiệp thụ hưởng</span>
        </div>
        <div className="w-10 h-10 bg-purple-50 text-purple-600 flex items-center justify-center rounded-[4px]">
          <Landmark className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
