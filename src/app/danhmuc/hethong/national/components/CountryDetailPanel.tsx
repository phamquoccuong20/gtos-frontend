
"use client";

import React from 'react';
import * as Icons from 'lucide-react';
import { Country } from '@/types/types';

interface CountryDetailPanelProps {
  country: Country | null;
  onClose: () => void;
}

const CountryDetailPanel: React.FC<CountryDetailPanelProps> = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l border-slate-200">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-800 uppercase tracking-tight">Chi tiết quốc gia</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-[4px] transition-colors">
          <Icons.X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        {/* Header Info */}
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-20 rounded-[4px] overflow-hidden shadow-xl ring-4 ring-white mb-4">
            <img 
               src={`https://flagcdn.com/w320/${country.flagCode.toLowerCase()}.png`} 
               alt={country.name} 
               className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-none">{country.name}</h2>
          <p className="text-slate-400 font-medium text-sm mt-1">{country.nativeName}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-[4px] border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">ISO Code</p>
            <p className="text-lg font-black text-blue-600">{country.code}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-[4px] border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Region</p>
            <p className="text-sm font-bold text-slate-700">{country.region}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 space-y-3">
          <button className="w-full py-3 bg-slate-900 text-white rounded-[4px] font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95">
            <Icons.FileText className="w-4 h-4" />
            Xuất Báo Cáo Logistic
          </button>
          <button className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-[4px] font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
            <Icons.Share2 className="w-4 h-4" />
            Chia sẻ dữ liệu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailPanel;
