
"use client";

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Country } from '@/types/types';

interface UpdateCountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: Country | null;
  onUpdate: (updated: Country) => void;
}

const UpdateCountryModal: React.FC<UpdateCountryModalProps> = ({ 
  isOpen, 
  onClose, 
  country, 
  onUpdate 
}) => {
  const [formData, setFormData] = useState<Country | null>(null);

  useEffect(() => {
    if (country) {
      setFormData(country);
    }
  }, [country]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onUpdate(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[4px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-[#1864ab] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Icons.Edit3 className="w-5 h-5" />
             <h3 className="font-black text-sm uppercase tracking-widest">Hiệu chỉnh thông tin</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-[4px] transition-colors">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mã ISO Quốc Gia</label>
              <input 
                type="text" 
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[4px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mã Cờ (Flag Code)</label>
              <input 
                type="text" 
                value={formData.flagCode}
                onChange={(e) => setFormData({...formData, flagCode: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[4px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tên Quốc Gia (Tiếng Việt)</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[4px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tên Bản Địa / Quốc Tế</label>
            <input 
              type="text" 
              value={formData.nativeName}
              onChange={(e) => setFormData({...formData, nativeName: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[4px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Khu vực / Châu lục</label>
            <select 
              value={formData.region}
              onChange={(e) => setFormData({...formData, region: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[4px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none"
            >
              <option value="Southeast Asia">Southeast Asia</option>
              <option value="Europe">Europe</option>
              <option value="East Asia">East Asia</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
             <button 
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase text-[10px] tracking-widest"
             >
               Bỏ qua
             </button>
             <button 
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-black rounded-[4px] shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all text-[10px] uppercase tracking-widest"
             >
               Lưu thông tin
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCountryModal;
