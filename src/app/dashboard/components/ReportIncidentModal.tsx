'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, Camera, AlertCircle } from 'lucide-react';
import { Berth } from '../types';

interface ReportIncidentModalProps {
    isOpen: boolean;
    onClose: () => void;
    berth: Berth | null;
}

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({ isOpen, onClose, berth }) => {
    const [severity, setSeverity] = useState('medium');
    const [incidentType, setIncidentType] = useState('equipment');

    if (!isOpen || !berth) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-sans">

                {/* Header - Red accent for incident */}
                <div className="px-5 py-4 border-b border-rose-100 flex justify-between items-center bg-rose-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm border border-rose-200">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h3 className="text-[18px] font-bold text-slate-800 font-display">Báo cáo sự cố</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[14px] font-medium text-slate-600">{berth.name}</span>
                                <span className="text-xs text-slate-400">•</span>
                                <span className="text-[14px] text-blue-600 font-medium">{berth.shipName}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-100 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body - 2 Column Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Column: Input Fields */}
                    <div className="space-y-4">
                        {/* 1. Incident Type */}
                        <div>
                            <label className="block text-[14px] font-bold text-slate-700 mb-2">Loại sự cố</label>
                            <select
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                                className="w-full h-10 px-3 border border-slate-200 rounded text-[14px] text-slate-700 ant-focus bg-white"
                            >
                                <option value="equipment">🛠️ Hư hỏng thiết bị / Cần cẩu</option>
                                <option value="cargo">📦 Hư hỏng hàng hóa</option>
                                <option value="safety">⛑️ Tai nạn / An toàn lao động</option>
                                <option value="environment">💧 Sự cố môi trường (Tràn dầu, hóa chất)</option>
                                <option value="other">📝 Khác</option>
                            </select>
                        </div>

                        {/* 2. Severity Level */}
                        <div>
                            <label className="block text-[14px] font-bold text-slate-700 mb-2">Mức độ nghiêm trọng</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setSeverity('low')}
                                    className={`h-9 rounded border flex items-center justify-center text-[13px] font-medium transition-all ${severity === 'low'
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm ring-1 ring-emerald-500'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-emerald-50 hover:border-emerald-200'
                                        }`}
                                >
                                    Thấp
                                </button>
                                <button
                                    onClick={() => setSeverity('medium')}
                                    className={`h-9 rounded border flex items-center justify-center text-[13px] font-medium transition-all ${severity === 'medium'
                                            ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-sm ring-1 ring-orange-500'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-orange-50 hover:border-orange-200'
                                        }`}
                                >
                                    Trung bình
                                </button>
                                <button
                                    onClick={() => setSeverity('high')}
                                    className={`h-9 rounded border flex items-center justify-center text-[13px] font-medium transition-all ${severity === 'high'
                                            ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm ring-1 ring-rose-500'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-rose-50 hover:border-rose-200'
                                        }`}
                                >
                                    Cao
                                </button>
                            </div>
                        </div>

                        {/* 3. Description */}
                        <div>
                            <label className="block text-[14px] font-bold text-slate-700 mb-2">Mô tả chi tiết</label>
                            <textarea
                                className="w-full p-3 border border-slate-200 rounded text-[14px] text-slate-700 ant-focus h-28 resize-none"
                                placeholder="Mô tả hiện trường, nguyên nhân sơ bộ..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Column: Upload & Warning */}
                    <div className="flex flex-col gap-4">
                        {/* 4. Evidence Upload */}
                        <div className="flex-1 flex flex-col">
                            <label className="block text-[14px] font-bold text-slate-700 mb-2">Hình ảnh / Minh chứng</label>
                            <div className="flex-1 border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer group min-h-[140px]">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                    <Camera className="text-slate-400 group-hover:text-blue-500" size={20} />
                                </div>
                                <p className="text-[13px] text-slate-600 font-medium text-center">Nhấn để chụp hoặc tải ảnh lên</p>
                                <p className="text-[11px] text-slate-400 mt-1">Hỗ trợ JPG, PNG (Tối đa 5MB)</p>
                            </div>
                        </div>

                        {/* Warning Note */}
                        <div className="flex gap-3 p-3 bg-amber-50 rounded border border-amber-100">
                            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-[12px] text-amber-800 leading-snug">
                                Báo cáo sẽ được gửi ngay đến <span className="font-bold">Ban An Toàn</span>. Vui lòng xác nhận thông tin.
                            </p>
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
                    <button className="h-9 px-6 rounded bg-rose-600 font-medium text-[14px] text-white hover:bg-rose-700 shadow-sm flex items-center gap-2 transition-all active:scale-95">
                        <AlertTriangle size={16} /> Gửi báo cáo khẩn
                    </button>
                </div>
            </div>
        </div>
    );
};
