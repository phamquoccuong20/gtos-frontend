
import React from 'react';
import { Trash2, X, AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count?: number;
  entityName?: string; // e.g., "người dùng", "dịch vụ", "dòng"
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  count = 1,
  entityName = "mục"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[400px] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X size={20} />
        </button>

        <div className="p-6 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center animate-pulse-slow">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[20px] font-bold text-slate-800 mb-2">
            Xác nhận xóa
          </h3>

          {/* Description */}
          <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
            Bạn có chắc chắn muốn xóa <span className="font-bold text-red-600">{count} {entityName}</span> đã chọn không?
            <br />
            Hành động này không thể hoàn tác.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 h-[42px] text-[14px] font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all"
            >
              Hủy bỏ
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 h-[42px] text-[14px] font-semibold text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 shadow-md shadow-red-200 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Xóa bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
