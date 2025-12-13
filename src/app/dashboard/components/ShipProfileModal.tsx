'use client';

import React from 'react';
import { X, Ship, MapPin, Calendar, Box, Anchor, Flag, Navigation, Clock, Activity } from 'lucide-react';
import { Berth } from '../types';

interface ShipProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    berth: Berth | null;
}

export const ShipProfileModal: React.FC<ShipProfileModalProps> = ({ isOpen, onClose, berth }) => {
    if (!isOpen || !berth) return null;

    // Mock extended data
    const shipDetails = {
        imo: '9456781',
        callSign: '3FTE4',
        flag: 'Panama',
        type: 'General Cargo',
        buildYear: 2015,
        loa: '180m',
        beam: '30m',
        draft: '10.5m',
        voyage: 'V.2406-05',
        lastPort: 'Singapore',
        nextPort: 'Hai Phong, VN',
        agent: 'Gemadept Shipping',
        cargoManifest: [
            { hatch: 1, cargo: berth.cargoType, weight: 2500, status: 'Completed' },
            { hatch: 2, cargo: berth.cargoType, weight: 3200, status: 'Working' },
            { hatch: 3, cargo: 'Hàng thiết bị', weight: 1500, status: 'Pending' },
        ]
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">

                {/* Header Image/Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors backdrop-blur-md"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Main Content Container */}
                <div className="px-6 pb-6">
                    <div className="relative -mt-10 mb-6 flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="w-24 h-24 bg-white rounded shadow p-2 flex items-center justify-center border-4 border-white">
                                <Ship size={48} className="text-blue-600" />
                            </div>
                            <div className="pt-12">
                                <h2 className="text-[20px] font-bold text-slate-800 font-display mb-4">{berth.shipName}</h2>
                                <div className="flex items-center gap-3 text-[14px] text-slate-500">
                                    <span className="flex items-center gap-1"><Flag size={14} /> {shipDetails.flag}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span>IMO: {shipDetails.imo}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span className="text-blue-600 font-medium">{shipDetails.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block text-right self-end pb-1">
                            <div className="text-[14px] text-slate-500">Đại lý</div>
                            <div className="font-bold text-slate-700">{shipDetails.agent}</div>
                        </div>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-5">
                            {/* Status Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[10px]">
                                <div className="bg-slate-50 p-[10px] rounded border border-slate-100">
                                    <div className="text-[12px] text-slate-500 mb-1 flex items-center gap-1"><Navigation size={12} /> Chuyến số</div>
                                    <div className="font-bold text-slate-800">{shipDetails.voyage}</div>
                                </div>
                                <div className="bg-slate-50 p-[10px] rounded border border-slate-100">
                                    <div className="text-[12px] text-slate-500 mb-1 flex items-center gap-1"><MapPin size={12} /> Cảng đến</div>
                                    <div className="font-bold text-slate-800 truncate">{shipDetails.lastPort}</div>
                                </div>
                                <div className="bg-slate-50 p-[10px] rounded border border-slate-100">
                                    <div className="text-[12px] text-slate-500 mb-1 flex items-center gap-1"><Anchor size={12} /> Vị trí</div>
                                    <div className="font-bold text-blue-600">{berth.name}</div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="bg-white rounded border border-slate-200 p-4 shadow-sm">
                                <h3 className="font-bold text-slate-800 text-[16px] mb-4 flex items-center gap-2 font-display">
                                    <Calendar size={18} className="text-blue-500" /> Lịch trình & Thời gian
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                                        <div>
                                            <p className="text-[12px] text-slate-500">Thời gian cập bến (ATA)</p>
                                            <p className="text-[14px] font-semibold text-slate-700">12/06/2024 - 14:30</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[12px] text-slate-500">Dự kiến rời bến (ETD)</p>
                                            <p className="text-[14px] font-semibold text-slate-700">14/06/2024 - 18:00</p>
                                        </div>
                                    </div>
                                    <div className="relative pt-2">
                                        <div className="flex justify-between text-[12px] font-medium text-slate-400 mb-2">
                                            <span>Tiến độ tổng thể</span>
                                            <span className="text-blue-600">{berth.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded h-2">
                                            <div className="bg-blue-600 h-2 rounded" style={{ width: `${berth.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cargo Details */}
                            <div>
                                <h3 className="font-bold text-slate-800 text-[16px] mb-3 flex items-center gap-2 font-display">
                                    <Box size={18} className="text-emerald-500" /> Chi tiết hầm hàng
                                </h3>
                                <div className="space-y-2">
                                    {shipDetails.cargoManifest.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 rounded border border-slate-100 bg-white hover:border-blue-200 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                    H{item.hatch}
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-slate-700">{item.cargo}</p>
                                                    <p className="text-[12px] text-slate-500">{item.weight.toLocaleString()} tấn</p>
                                                </div>
                                            </div>
                                            <span className={`text-[12px] font-semibold px-2 py-0.5 rounded ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                                    item.status === 'Working' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {item.status === 'Completed' ? 'Hoàn thành' : item.status === 'Working' ? 'Đang làm hàng' : 'Chờ làm'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                            <div className="bg-slate-50 rounded p-4 border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-3 text-[14px] uppercase tracking-wide">Thông số kỹ thuật</h3>
                                <ul className="space-y-2 text-[14px]">
                                    <li className="flex justify-between">
                                        <span className="text-slate-500">Chiều dài (LOA)</span>
                                        <span className="font-medium text-slate-700">{shipDetails.loa}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-slate-500">Chiều rộng (Beam)</span>
                                        <span className="font-medium text-slate-700">{shipDetails.beam}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-slate-500">Mớn nước (Draft)</span>
                                        <span className="font-medium text-slate-700">{shipDetails.draft}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-slate-500">Năm đóng</span>
                                        <span className="font-medium text-slate-700">{shipDetails.buildYear}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-amber-50 rounded p-4 border border-amber-100">
                                <h3 className="font-bold text-amber-800 mb-2 text-[14px] flex items-center gap-2">
                                    <Activity size={16} /> Lưu ý vận hành
                                </h3>
                                <p className="text-[13px] text-amber-700 leading-relaxed">
                                    Tàu yêu cầu quy trình làm hàng đặc biệt cho hầm số 2. Cần bố trí xe nâng 10 tấn hỗ trợ giải phóng hàng quá khổ.
                                </p>
                            </div>

                            <button className="w-full h-9 bg-blue-600 text-white rounded text-[14px] font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
                                Xuất báo cáo tàu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
