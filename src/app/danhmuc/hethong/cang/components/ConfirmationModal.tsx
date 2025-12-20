
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
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
      <div className="relative bg-white rounded-lg shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] w-full max-w-[400px] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <AlertTriangle size={22} />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-slate-900 mb-1 font-accent uppercase tracking-tight">
                {title}
              </h3>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {message}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[14px] font-medium text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-md shadow-sm transition-all"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2 text-[14px] font-bold text-white bg-red-500 hover:bg-red-600 rounded-md shadow-sm shadow-red-100 transition-all"
          >
            Đồng ý xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
