import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    selectedCount: number;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    selectedCount,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 animate-fade-in">
            <div className="bg-white rounded shadow-sm w-full max-w-sm overflow-hidden border border-slate-200">
                <div className="p-[10px] text-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-[12px]">
                        <AlertTriangle className="text-red-600" size={24} />
                    </div>
                    <h3 className="text-[18px] font-bold text-slate-800 mb-[12px]">Xác nhận xóa</h3>
                    <p className="text-[14px] text-slate-500 mb-[12px]">
                        Bạn có chắc chắn muốn xóa <span className="font-bold text-slate-800">{selectedCount}</span> người dùng đã chọn không? Hành động này không thể hoàn tác.
                    </p>
                    <div className="flex items-center justify-center gap-[10px]">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 h-[36px] text-[14px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 h-[36px] text-[14px] font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                        >
                            Xóa bỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
