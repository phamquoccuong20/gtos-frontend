import React from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

interface ConfirmSaveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmSaveModal: React.FC<ConfirmSaveModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded shadow-lg w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="p-[10px] border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-100 text-green-600 p-1.5 rounded">
                            <Save size={18} />
                        </div>
                        <h3 className="text-[16px] font-bold text-slate-800">Xác nhận lưu</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-[20px]">
                    <div className="flex items-start gap-3">
                        <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <p className="text-[14px] text-slate-700 font-medium mb-1">
                                Bạn có chắc chắn muốn lưu các thay đổi?
                            </p>
                            <p className="text-[14px] text-slate-500">
                                Tất cả các thay đổi sẽ được lưu vào hệ thống.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-[10px] bg-slate-50 border-t border-slate-200 flex justify-end gap-[10px]">
                    <button
                        onClick={onClose}
                        className="px-[16px] h-[36px] text-[14px] font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-100 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-[16px] h-[36px] text-[14px] font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-all flex items-center gap-2"
                    >
                        <Save size={14} />
                        <span>Xác nhận lưu</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
