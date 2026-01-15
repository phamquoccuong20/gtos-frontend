
"use client";

import React from 'react';
import * as Icons from 'lucide-react';
import { Country } from '@/types/types';

interface NationalTableProps {
  countries: Country[];
  onSelect: (country: Country) => void;
  selectedId?: number;
  checkedIds: Set<number>;
  onToggleCheck: (id: number) => void;
  onToggleCheckAll: () => void;
  onUpdateDraft?: (updated: Country) => void;
  onRemoveDraft?: (id: number) => void;
}

const NationalTable: React.FC<NationalTableProps> = ({ 
  countries, 
  onSelect, 
  selectedId,
  checkedIds,
  onToggleCheck,
  onToggleCheckAll,
  onUpdateDraft,
  onRemoveDraft
}) => {
  const isAllChecked = countries.length > 0 && checkedIds.size === countries.length;

  return (
    <div className="w-full bg-white rounded-[4px] overflow-hidden border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-[#d0ebff] border-b border-slate-200">
              <th className="px-6 py-4 w-12 text-center whitespace-nowrap">
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleCheckAll(); }}
                  className={`w-5 h-5 rounded-[4px] border-2 transition-all flex items-center justify-center ${
                    isAllChecked 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {isAllChecked && <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              </th>
              <th className="px-4 py-4 text-[11px] font-black text-[#1971c2] uppercase tracking-wider w-16 text-center whitespace-nowrap">STT</th>
              <th className="px-6 py-4 text-[11px] font-black text-[#1971c2] uppercase tracking-wider whitespace-nowrap">Mã Quốc Gia</th>
              <th className="px-6 py-4 text-[11px] font-black text-[#1971c2] uppercase tracking-wider whitespace-nowrap">Tên Quốc Gia</th>
              <th className="px-6 py-4 text-[11px] font-black text-[#1971c2] uppercase tracking-wider whitespace-nowrap">Khu Vực</th>
              <th className="px-6 py-4 text-[11px] font-black text-[#1971c2] uppercase tracking-wider text-center whitespace-nowrap">Quốc Kỳ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {countries.map((country, idx) => {
              const isChecked = checkedIds.has(country.id);
              const isDraft = country.isDraft;
              const isNew = isDraft && (!country.name || !country.code);
              
              return (
                <tr 
                  key={country.id} 
                  onClick={() => onSelect(country)}
                  className={`group cursor-pointer transition-all duration-150 ${
                    selectedId === country.id ? 'bg-blue-50/50' : isChecked ? 'bg-blue-50/20' : isDraft ? 'bg-blue-50/10' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleCheck(country.id); }}
                      className={`w-5 h-5 rounded-[4px] border-2 transition-all flex items-center justify-center ${
                        isChecked 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-200' 
                          : 'bg-white border-slate-300 group-hover:border-blue-300 hover:border-blue-400'
                      }`}
                    >
                      {isChecked && <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500 font-medium text-center">
                    {isNew ? (
                      <span className="flex items-center justify-center">
                        <Icons.PlusCircle className="w-3.5 h-3.5 text-blue-400" />
                      </span>
                    ) : (
                      <div className="relative inline-block">
                        {idx + 1}
                        {isDraft && !isNew && (
                           <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                    )}
                  </td>
                  
                  {/* Mã Quốc Gia */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-[4px] border uppercase ${
                      isDraft ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {country.code || '...'}
                    </span>
                  </td>

                  {/* Tên Quốc Gia */}
                  <td className="px-6 py-4">
                    <div>
                      <p className={`text-sm font-semibold ${isDraft && !country.name ? 'text-slate-300 italic' : 'text-slate-800'}`}>
                        {country.name || 'Chưa nhập tên...'}
                      </p>
                      <p className="text-[10px] text-slate-400 italic">{country.nativeName}</p>
                    </div>
                  </td>

                  {/* Khu Vực */}
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-600 font-medium">
                      {country.region || '-'}
                    </span>
                  </td>

                  {/* Quốc Kỳ */}
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-6 bg-slate-100 rounded-[4px] overflow-hidden shadow-sm ring-1 ring-slate-200">
                      <img 
                        src={`https://flagcdn.com/w80/${(country.flagCode || 'un').toLowerCase()}.png`} 
                        alt={country.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination Placeholder */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div className="flex flex-col">
            <span>Hiển thị <b>{countries.length}</b> mục</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-[4px] border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50">
            <Icons.ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 rounded-[4px] bg-blue-600 text-white font-bold">1</button>
          <button className="px-3 py-1.5 rounded-[4px] border border-slate-200 bg-white hover:bg-slate-50">2</button>
          <button className="p-1.5 rounded-[4px] border border-slate-200 bg-white hover:bg-slate-50">
            <Icons.ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NationalTable;
