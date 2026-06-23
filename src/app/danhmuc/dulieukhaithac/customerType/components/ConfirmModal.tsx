import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ"
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[400px] overflow-hidden animate-in zoom-in-95 duration-200 z-[2001]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <X size={20} />
        </button>

        <div className="p-6 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center animate-pulse">
              <AlertCircle size={24} className="text-amber-600" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[20px] font-bold text-slate-800 mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
            {message}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 h-[42px] text-[14px] font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 h-[42px] text-[14px] font-semibold text-white bg-amber-500 border border-transparent rounded-lg hover:bg-amber-600 shadow-md shadow-amber-200 transition-all flex items-center justify-center cursor-pointer"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
