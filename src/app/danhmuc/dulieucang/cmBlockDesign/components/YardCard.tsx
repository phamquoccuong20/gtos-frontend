'use client';

import React from 'react';
import { YardSection } from '../types';
import { ProgressBar } from './ProgressBar';

interface YardCardProps {
  section: YardSection;
  index: number;
  onSelect: (section: YardSection) => void;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export const YardCard: React.FC<YardCardProps> = ({ 
  section, 
  index, 
  onSelect, 
  onDragStart, 
  onDragEnter, 
  onDragEnd,
  isDragging
}) => {
  const occupancyRate = ((section.currentValue / section.capacity) * 100).toFixed(1);
  const isFull = parseFloat(occupancyRate) >= 100;
  const isEmpty = section.currentValue === 0;

  return (
    <div 
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => onSelect(section)}
      className={`group relative bg-white border rounded-[4px] p-4 transition-all cursor-grab active:cursor-grabbing flex flex-col h-[320px] shadow-sm select-none ${
        isDragging 
          ? 'z-50 border-blue-600 border-2 shadow-2xl ring-4 ring-blue-100 scale-[1.02] bg-white opacity-100 grayscale-0 blur-none' 
          : 'border-slate-200 hover:shadow-xl hover:border-blue-400'
      } ${
        isFull ? 'border-red-200 bg-red-50/5' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-3 mt-1 shrink-0">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">{section.name}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{section.label}</p>
        </div>
        <div className={`px-2 py-1 rounded-[4px] text-[9px] font-black uppercase tracking-wider ${isEmpty ? 'bg-slate-100 text-slate-500 border border-slate-200' : 'bg-blue-600 text-white shadow-sm shadow-blue-100'}`}>
          {isEmpty ? 'Trống' : 'Hoạt động'}
        </div>
      </div>

      <div className="flex-grow overflow-hidden mb-3 space-y-2 pointer-events-none">
        {section.items.length > 0 ? (
          section.items.slice(0, 2).map(item => (
            <div key={item.id} className="text-[10px] bg-slate-50 border border-slate-100 p-2 rounded-[4px] flex flex-col gap-0.5 group-hover:bg-white transition-colors border-l-4 border-l-blue-500 shadow-sm">
              <span className="font-black text-slate-800 text-[11px]">{item.code}</span>
              <div className="flex justify-between text-slate-400 font-bold">
                <span>SL: <b className="text-slate-800">{item.quantity}</b></span>
                <span>TL: <b className="text-slate-800">{item.weight.toLocaleString()}</b></span>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300">
             <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-2 opacity-50">
                <i className="fas fa-box-open text-xl opacity-20"></i>
             </div>
             <span className="text-[10px] font-bold italic opacity-40">Trống dữ liệu</span>
          </div>
        )}
        {section.items.length > 2 && (
          <p className="text-center text-[9px] text-slate-400 font-bold italic">+{section.items.length - 2} lô hàng khác...</p>
        )}
      </div>

      <div className="mt-auto pt-3 border-t border-slate-100 pointer-events-none shrink-0">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.1em]">Sức chứa</span>
          <span className="text-xs font-black text-slate-800">
            {section.currentValue.toLocaleString()} <span className="text-slate-300 font-normal">/</span> {section.capacity.toLocaleString()}
          </span>
        </div>
        <ProgressBar value={section.currentValue} max={section.capacity} color={section.colorTheme} />
        <div className="flex justify-between mt-2">
            <span className="text-[10px] text-slate-400 font-bold">Chiếm dụng: {occupancyRate}%</span>
        </div>
      </div>
    </div>
  );
};

export default YardCard;
