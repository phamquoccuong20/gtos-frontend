import React, { useState, useEffect } from 'react';
import { X, Layers, Plus } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (count: number) => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (isOpen) {
            setCount(1);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(count);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Blue Header */}
                <div className="bg-blue-600 px-6 py-5 flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className="p-2 bg-blue-500/50 rounded-lg text-white">
                            <Layers size={24} />
                        </div>
                        <div className="text-white">
                            <h3 className="text-lg font-bold">Thêm dữ liệu mới</h3>
                            <p className="text-blue-100 text-sm mt-0.5 font-light">Thêm các dòng mới vào danh sách nhóm</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-blue-200 hover:text-white transition-colors mt-1"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Số dòng cần thêm
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min={1}
                                max={20}
                                value={count}
                                onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 0)))}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium text-slate-700"
                            />
                        </div>
                        <p className="text-slate-400 text-xs mt-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Nhập số lượng từ 1 đến 20 dòng
                        </p>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-4 mb-6">
                        <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm mt-1">
                            <Plus size={18} />
                        </div>
                        <div>
                            <p className="font-semibold text-blue-900">
                                Sẽ thêm {count} dòng mới
                            </p>
                            <p className="text-sm text-blue-700/80 mt-0.5">
                                Bạn có thể chỉnh sửa nội dung chi tiết sau khi thêm vào danh sách.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all active:scale-95"
                        >
                            + Thêm {count} dòng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
