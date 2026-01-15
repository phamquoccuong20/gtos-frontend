
"use client";

import React from 'react';
import * as Icons from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  count 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-sm rounded-[4px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 animate-bounce-subtle">
            <Icons.AlertTriangle className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Xác nhận xóa</h3>
          <p className="text-slate-500 font-medium">
            Bạn có chắc chắn muốn xóa <span className="text-red-600 font-bold">{count}</span> quốc gia đã chọn? 
            Hành động này không thể hoàn tác.
          </p>
        </div>

        <div className="px-6 pb-8 flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-[4px] transition-colors uppercase text-xs tracking-widest"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-3 bg-red-600 text-white font-bold rounded-[4px] shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
          >
            <Icons.Trash2 className="w-4 h-4" />
            Xác nhận
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmationModal;
