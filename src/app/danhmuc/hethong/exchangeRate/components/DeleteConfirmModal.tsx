'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  selectedCount: number;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * Delete Confirmation Modal Component
 * Modal dialog for confirming deletion of selected rows
 */
const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  selectedCount,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Warning Header */}
        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm border border-red-100">
            <AlertTriangle size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Xác nhận xóa</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bạn có chắc chắn muốn xóa <span className="text-red-600 font-bold">{selectedCount}</span> dòng đã chọn không? Hành động này không thể hoàn tác.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-500 text-white rounded text-sm font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
          >
            Xóa ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
