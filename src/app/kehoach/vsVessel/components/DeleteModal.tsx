
import React from 'react';
import { Icons } from '../constants';

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm, count }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 text-rose-600 mb-4">
            <Icons.Trash />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Xác nhận xóa dữ liệu</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Bạn có chắc chắn muốn xóa <span className="font-bold text-rose-600">{count}</span> tàu đã chọn không? Hành động này không thể hoàn tác.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md transition-colors text-sm"
            >
              Hủy bỏ
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-md transition-colors text-sm shadow-md shadow-rose-200"
            >
              Xác nhận xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
