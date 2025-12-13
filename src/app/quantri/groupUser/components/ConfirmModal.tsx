import React from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    count: number;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, count }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header - Red for Danger */}
                <div className="bg-rose-600 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/20 rounded-lg text-white">
                            <AlertTriangle size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white">Xác nhận xóa</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-rose-100 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-4">
                            <Trash2 size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">
                            Xóa {count} nhóm đã chọn?
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Hành động này sẽ xóa hoàn toàn dữ liệu khỏi hệ thống và <span className="font-semibold text-rose-600">không thể hoàn tác</span>. Bạn có chắc chắn muốn tiếp tục?
                        </p>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-lg shadow-rose-500/30 transition-all active:scale-95"
                        >
                            Đồng ý xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
