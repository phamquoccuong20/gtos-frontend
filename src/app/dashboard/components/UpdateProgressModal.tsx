'use client';

import React, { useState } from 'react';
import { X, Save, Calculator } from 'lucide-react';
import { Berth } from '../types';

interface UpdateProgressModalProps {
    isOpen: boolean;
    onClose: () => void;
    berth: Berth | null;
}

export const UpdateProgressModal: React.FC<UpdateProgressModalProps> = ({ isOpen, onClose, berth }) => {
    const [activeHatch, setActiveHatch] = useState<number>(1);
    const [weight, setWeight] = useState<string>('1250');
    const [status, setStatus] = useState<string>('working');

    if (!isOpen || !berth) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-sans">

                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-[18px] font-bold text-slate-800 font-display">Cập nhật tiến độ xếp dỡ</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[14px] font-medium text-blue-600">{berth.shipName}</span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-[14px] text-slate-500">{berth.name}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-5">

                    {/* 1. Hatch Selection */}
                    <div>
                        <label className="block text-[14px] font-medium text-slate-700 mb-2">Chọn hầm hàng</label>
                        <div className="flex gap-2.5">
                            {[1, 2, 3, 4].map((hatch) => (
                                <button
                                    key={hatch}
                                    onClick={() => setActiveHatch(hatch)}
                                    className={`flex-1 h-9 flex items-center justify-center rounded border text-[14px] font-medium transition-all ${activeHatch === hatch
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                                        }`}
                                >
                                    Hầm {hatch}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Progress Input */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">Sản lượng lũy kế (Tấn)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full h-9 pl-3 pr-9 border border-slate-200 rounded text-[14px] text-slate-800 ant-focus transition-all"
                                />
                                <Calculator className="absolute right-3 top-2 text-slate-400 w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">Trạng thái hầm</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full h-9 px-3 border border-slate-200 rounded text-[14px] font-medium text-slate-700 ant-focus transition-all appearance-none bg-white cursor-pointer"
                            >
                                <option value="working">⚡ Đang làm hàng</option>
                                <option value="paused">⏸️ Tạm ngưng</option>
                                <option value="completed">✅ Đã hoàn thành</option>
                                <option value="waiting">⏳ Chờ phương tiện</option>
                            </select>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex gap-2 justify-end">
                    <button
                        onClick={onClose}
                        className="h-9 px-4 rounded border border-slate-200 font-medium text-[14px] text-slate-600 hover:bg-white hover:border-slate-300 transition-all"
                    >
                        Hủy bỏ
                    </button>
                    <button className="h-9 px-4 rounded bg-blue-600 font-medium text-[14px] text-white hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-all active:scale-95">
                        <Save size={16} /> Lưu cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
};
