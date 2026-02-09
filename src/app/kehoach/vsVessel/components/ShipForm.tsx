
import React from 'react';
import { Ship } from '../types';
import { SHIP_TYPES, COUNTRIES } from '../constants';

interface ShipFormProps {
  formData: Partial<Ship>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const ShipForm: React.FC<ShipFormProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
      {/* Form left */}
      <div className="bg-white rounded-[4px] border border-slate-200 overflow-hidden">
        <div className="bg-slate-50/80 border-b border-slate-200 p-[14px]">
          <h2 className="font-bold text-blue-800 text-sm flex items-center gap-2 uppercase">
            <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
            Thông tin chung
          </h2>
        </div>
        <div className="p-[14px] grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Loại tàu</label>
            <select name="type" value={formData.type || ''} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-[4px] p-[10px] text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              {SHIP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Mã tàu (Tự động/4 ký tự)</label>
            <input 
              name="code" 
              value={formData.code || ''} 
              onChange={handleInputChange} 
              maxLength={4}
              placeholder="Mã..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-[4px] p-[10px] text-sm font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Tên tàu</label>
            <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Nhập tên tàu..." className="w-full bg-slate-50 border border-slate-200 rounded-[4px] p-[10px] text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Quốc gia</label>
            <select name="nationality" value={formData.nationality || ''} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-[4px] p-[10px] text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Call Sign</label>
            <input name="callSign" value={formData.callSign || ''} onChange={handleInputChange} placeholder="Hô hiệu..." className="w-full bg-slate-50 border border-slate-200 rounded-[4px] p-[10px] text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">IMO Number</label>
            <input name="imo" value={formData.imo || ''} onChange={handleInputChange} placeholder="Nhập số IMO..." className="w-full bg-slate-50 border border-slate-200 rounded-[4px] p-[10px] text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
      </div>

      {/* Form right */}
      <div className="bg-white rounded-[4px] border border-slate-200 overflow-hidden">
        <div className="bg-slate-50/80 border-b border-slate-200 p-[14px]">
          <h2 className="font-bold text-emerald-800 text-sm flex items-center gap-2 uppercase">
            <span className="w-1 h-4 bg-emerald-600 rounded-full"></span>
            Kích thước - Sức chứa
          </h2>
        </div>
        <div className="p-[14px] grid grid-cols-2 gap-[14px]">
          {[
            { label: 'Chiều dài (LOA)', name: 'loa', unit: 'm' },
            { label: 'Chiều rộng (Max Beam)', name: 'maxBeam', unit: 'm' },
            { label: 'Độ sâu (Depth)', name: 'depth', unit: 'm' },
            { label: 'Số hầm (Holds)', name: 'holds', unit: '' },
            { label: 'Trọng tải (GRT)', name: 'grt', unit: '' },
            { label: 'Trọng tải toàn phần (DWT)', name: 'dwt', unit: '' }
          ].map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">{field.label}</label>
              <div className="relative">
                <input 
                  name={field.name} 
                  type="number" 
                  value={(formData as any)[field.name] || ''} 
                  onChange={handleInputChange} 
                  placeholder="0.0" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-[4px] p-[10px] text-sm focus:ring-2 focus:ring-emerald-500 outline-none pr-8" 
                />
                {field.unit && <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">{field.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
