
import React, { useState, useEffect } from 'react';
import { X, Layers, Plus } from 'lucide-react';

interface AddRowsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (count: number) => void;
}

const AddRowsModal: React.FC<AddRowsModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (isOpen) setCount(1);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count > 0) {
      onConfirm(count);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] w-full max-w-[480px] overflow-hidden animate-in zoom-in-95 duration-200">
        <form onSubmit={handleSubmit}>
          {/* Header with Blue Background */}
          <div className="bg-[#2f54eb] px-6 py-5 text-white relative">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Layers size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold leading-none mb-1 font-accent">Thêm dữ liệu mới</h3>
                <p className="text-white/80 text-[13px]">Thêm các dòng mới vào bảng danh mục</p>
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

          <div className="p-6 space-y-6">
            {/* Input Section */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium text-slate-700">Số dòng cần thêm</label>
              <div className="relative">
                <input 
                  type="number" 
                  min="1" 
                  max="100"
                  autoFocus
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                  className="w-full h-[46px] px-4 bg-white border border-[#d9d9d9] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#2f54eb] text-[16px] font-semibold transition-all"
                />
              </div>
              <p className="text-[12px] text-blue-500 flex items-center gap-1.5 font-medium">
                <span className="inline-block w-1 h-1 rounded-full bg-blue-500"></span>
                Nhập số lượng từ 1 đến 100 dòng
              </p>
            </div>

            {/* Info Summary Box */}
            <div className="bg-[#e6f7ff] border border-[#91d5ff] rounded-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-500 shadow-sm border border-blue-100 flex-shrink-0">
                <Plus size={20} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-blue-700">Sẽ thêm {count || 0} dòng mới</h4>
                <p className="text-[12px] text-blue-600/80">Bạn có thể chỉnh sửa thông tin chi tiết sau khi thêm vào danh sách.</p>
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="px-6 py-5 flex items-center justify-center gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="min-w-[120px] h-[40px] px-4 text-[14px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-[#d9d9d9] rounded-lg transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="min-w-[160px] h-[40px] px-6 text-[14px] font-bold text-white bg-[#2f54eb] hover:bg-[#1d39c4] rounded-lg shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} strokeWidth={3} />
              Thêm {count || 0} dòng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRowsModal;
