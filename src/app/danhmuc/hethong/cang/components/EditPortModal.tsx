
import React, { useState, useEffect } from 'react';
import { X, Edit3, Save, ChevronDown } from 'lucide-react';
import { Port } from '../types';

interface EditPortModalProps {
  isOpen: boolean;
  port: Port | null;
  onClose: () => void;
  onSave: (updatedPort: Port) => void;
}

const COUNTRIES = [
  'Việt Nam', 'Singapore', 'Nhật Bản', 'Đan Mạch', 'Australia', 
  'Kuwait', 'Bờ Biển Ngà', 'Iraq', 'Norway', 'Vương quốc Anh', 
  'Mexico', 'Hoa Kỳ', 'Trung Quốc', 'Hàn Quốc', 'Đức', 'Pháp'
];

const EditPortModal: React.FC<EditPortModalProps> = ({ isOpen, port, onClose, onSave }) => {
  const [formData, setFormData] = useState<Port | null>(null);

  useEffect(() => {
    if (port) {
      setFormData({ ...port });
    }
  }, [port, isOpen]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] w-full max-w-[550px] overflow-hidden animate-in zoom-in-95 duration-200 font-accent">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="bg-[#2f54eb] px-6 py-5 text-white relative">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Edit3 size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold leading-none mb-1">Thông tin chi tiết</h3>
                <p className="text-white/80 text-[13px]">Cập nhật thông tin danh mục cảng biển</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {/* Quốc Gia - Chuyển thành Select */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Quốc gia</label>
              <div className="relative">
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full h-[42px] pl-4 pr-10 bg-[#f8fafc] border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2f54eb] font-semibold text-slate-700 appearance-none transition-all cursor-pointer"
                  required
                >
                  <option value="" disabled>Chọn quốc gia...</option>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Mã Cảng */}
            <div className="space-y-1.5 col-span-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Mã Cảng</label>
              <input 
                type="text" 
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full h-[42px] px-4 bg-[#f8fafc] border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2f54eb] font-mono font-bold text-slate-700 transition-all"
                placeholder="Ví dụ: VN-SGN"
                required
              />
            </div>

            {/* Tên Cảng Biển */}
            <div className="space-y-1.5 col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Tên Cảng Biển</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-[42px] px-4 bg-[#f8fafc] border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2f54eb] font-bold text-slate-800 transition-all"
                placeholder="Nhập tên cảng biển đầy đủ..."
                required
              />
            </div>

            {/* Trạng thái */}
            <div className="space-y-1.5 col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Trạng thái hoạt động</label>
              <div className="relative">
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-[42px] pl-4 pr-10 bg-[#f8fafc] border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2f54eb] font-semibold text-slate-700 appearance-none transition-all cursor-pointer"
                >
                  <option value="active">Hoạt động</option>
                  <option value="maintenance">Bảo trì</option>
                  <option value="closed">Đóng cửa</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="px-6 py-5 flex items-center justify-center gap-3 border-t border-slate-100 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="min-w-[120px] h-[40px] px-6 text-[14px] font-medium text-slate-500 hover:text-slate-800 bg-white border border-[#d9d9d9] rounded-lg transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="min-w-[160px] h-[40px] px-8 text-[14px] font-bold text-white bg-[#2f54eb] hover:bg-[#1d39c4] rounded-lg shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Cập nhật dữ liệu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPortModal;
