'use client';

import React from 'react';
import { X, Layers, Plus } from 'lucide-react';

interface AddRowsModalProps {
  isOpen: boolean;
  rowsToAdd: number;
  onRowsChange: (value: number) => void;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * Add Rows Modal Component
 * Modal dialog for adding new rows to the exchange rate table
 */
const AddRowsModal: React.FC<AddRowsModalProps> = ({
  isOpen,
  rowsToAdd,
  onRowsChange,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#2962FF] p-[14px] text-white relative">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center">
              <Layers size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Thêm dữ liệu mới</h2>
              <p className="text-xs text-blue-100">Thêm các dòng mới vào bảng tỷ giá</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-100 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-[14px] space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Số dòng cần thêm</label>
            <input 
              type="number" 
              min="1" 
              max="50"
              value={rowsToAdd}
              onChange={(e) => onRowsChange(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:ring-4 focus:ring-blue-500/5 focus:outline-none focus:border-blue-500 transition-all font-bold"
            />
            <p className="text-[10px] text-blue-600 font-medium flex items-center gap-1.5">
              <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
              Nhập số lượng từ 1 đến 50 dòng
            </p>
          </div>

          {/* Info summary inside modal */}
          <div className="bg-blue-50 rounded p-[14px] flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center">
              <Plus size={18} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-blue-900">Sẽ thêm {rowsToAdd} dòng mới</p>
              <p className="text-blue-700/70">Dòng mới sẽ được đưa lên trang đầu</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-[14px] pt-0 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-[#2962FF] text-white rounded text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            Thêm {rowsToAdd} dòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRowsModal;
