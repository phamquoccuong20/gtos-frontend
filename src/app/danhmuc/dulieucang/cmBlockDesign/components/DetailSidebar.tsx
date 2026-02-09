'use client';

import React from 'react';
import { YardSection, YardItem } from '../types';
import { ProgressBar } from './ProgressBar';

interface DetailSidebarProps {
  section: YardSection | null;
  onClose: () => void;
}

export const DetailSidebar: React.FC<DetailSidebarProps> = ({ section, onClose }) => {
  if (!section) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/10 backdrop-blur-sm p-4">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-md bg-white max-h-[70vh] rounded-[4px] shadow-2xl flex flex-col overflow-hidden animate-slide-in-right border border-slate-200">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">{section.name}</h2>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{section.label}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-[4px] hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-all hover:rotate-90"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>
        
        <div className="p-5 flex-grow overflow-y-auto space-y-6 bg-slate-50/30">
          <section>
            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">THỐNG KÊ CHIẾM DỤNG</h3>
            <div className="bg-white rounded-[4px] p-5 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-end mb-3">
                <span className="text-4xl font-black text-slate-900">
                  {((section.currentValue / section.capacity) * 100).toFixed(0)}<span className="text-xl">%</span>
                </span>
                <div className="text-right">
                   <p className="text-[9px] text-slate-400 font-bold uppercase">Sức chứa thực tế</p>
                   <span className="text-xs text-slate-700 font-black">
                    {section.currentValue.toLocaleString()} / {section.capacity.toLocaleString()}
                  </span>
                </div>
              </div>
              <ProgressBar value={section.currentValue} max={section.capacity} color="blue" />
            </div>
          </section>

          <section>
            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">DANH SÁCH LÔ HÀNG ({section.items.length})</h3>
            <div className="space-y-2">
              {section.items.length > 0 ? (
                section.items.map((item: YardItem) => (
                  <div key={item.id} className="p-3 rounded-[4px] border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-sm group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black text-slate-800 text-xs tracking-tight group-hover:text-blue-600 transition-colors">{item.code}</span>
                      <span className="bg-blue-50 text-blue-700 text-[8px] px-2 py-0.5 rounded-[4px] font-black border border-blue-100 uppercase tracking-tighter">Lưu kho</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-2 rounded-[4px]">
                        <p className="text-[8px] text-slate-400 font-bold uppercase mb-0.5">Số lượng</p>
                        <p className="font-black text-slate-800 text-sm">{item.quantity}</p>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-[4px]">
                        <p className="text-[8px] text-slate-400 font-bold uppercase mb-0.5">Trọng lượng</p>
                        <p className="font-black text-slate-800 text-sm">{item.weight.toLocaleString()}<span className="text-[9px] ml-1">KG</span></p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-[4px] border-2 border-dashed border-slate-200">
                  <i className="fas fa-box-open text-3xl text-slate-200 mb-3"></i>
                  <p className="text-xs text-slate-400 font-bold italic">Không có dữ liệu lưu trữ</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="p-3 border-t border-slate-100 bg-white">
          <button onClick={onClose} className="w-full py-2 bg-slate-900 text-white rounded-[4px] font-bold hover:bg-blue-600 shadow-lg transition-all active:scale-95 text-sm uppercase tracking-wider">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSidebar;
