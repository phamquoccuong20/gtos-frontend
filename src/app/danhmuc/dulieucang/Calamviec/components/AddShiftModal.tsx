import React from 'react';
import { X, Plus, Layers } from 'lucide-react';

interface AddShiftModalProps {
    isOpen: boolean;
    rowsToAdd: number;
    onClose: () => void;
    onConfirm: () => void;
    setRowsToAdd: (val: number) => void;
}

export const AddShiftModal: React.FC<AddShiftModalProps> = ({
    isOpen,
    rowsToAdd,
    onClose,
    onConfirm,
    setRowsToAdd
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-[16px] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Layers size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-bold text-white">Thêm dữ liệu mới</h3>
                            <p className="text-[12px] text-blue-100">Thêm các dòng mới vào bảng ca làm việc</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-[20px]">
                    <div className="mb-4">
                        <label className="block text-[14px] font-semibold text-slate-700 mb-2">
                            Số dòng cần thêm
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={rowsToAdd}
                                onChange={(e) => setRowsToAdd(parseInt(e.target.value) || 1)}
                                className="w-full h-[44px] px-[14px] text-[16px] font-medium text-slate-800 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                autoFocus
                            />
                        </div>
                        <p className="text-[13px] text-slate-500 mt-2 flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            Nhập số lượng từ 1 đến 20 dòng
                        </p>
                    </div>

                    {/* Preview */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                            <Plus size={18} />
                        </div>
                        <div>
                            <p className="text-[14px] font-medium text-blue-800">
                                Sẽ thêm {rowsToAdd} dòng mới
                            </p>
                            <p className="text-[12px] text-blue-600">
                                Bạn có thể chỉnh sửa sau khi thêm
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
                        Hủy bỏ
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-[20px] h-[40px] text-[14px] font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30"
                    >
                        <Plus size={16} />
                        <span>Thêm {rowsToAdd} dòng</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
