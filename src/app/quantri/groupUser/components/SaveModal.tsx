import React from 'react';
import { X, Save, CheckCircle } from 'lucide-react';

interface SaveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    count: number;
}

export const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose, onConfirm, count }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header - Yellow for Save */}
                <div className="bg-yellow-500 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/20 rounded-lg text-white">
                            <Save size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white">Xác nhận lưu</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-yellow-100 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                            <CheckCircle size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">
                            Lưu {count} bản ghi?
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Bạn đang chuẩn bị lưu các thay đổi vào hệ thống. Dữ liệu sẽ được cập nhật và áp dụng ngay lập tức.
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
                            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg shadow-yellow-500/30 transition-all active:scale-95"
                        >
                            Đồng ý lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveModal;
