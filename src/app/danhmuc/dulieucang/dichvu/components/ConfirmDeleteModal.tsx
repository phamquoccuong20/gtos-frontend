import React from 'react';
import { Trash2, X, AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedCount: number;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    selectedCount
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/30 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-[16px] border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-lg">
                            <Trash2 size={20} className="text-red-600" />
                        </div>
                        <h3 className="text-[16px] font-bold text-slate-800">Xác nhận xóa</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-[20px]">
                    <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
                        <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>
                        <div>
                            <p className="text-[14px] font-semibold text-red-800 mb-1">
                                Bạn có chắc chắn muốn xóa {selectedCount} dòng đã chọn?
                            </p>
                            <p className="text-[13px] text-red-600">
                                Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-[20px] py-[16px] bg-slate-50 border-t border-slate-200 flex justify-end gap-[10px]">
                    <button
                        onClick={onClose}
                        className="px-[20px] h-[40px] text-[14px] font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 hover:border-slate-400 transition-all"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-[20px] h-[40px] text-[14px] font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
                    >
                        <Trash2 size={16} />
                        <span>Xác nhận xóa</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
