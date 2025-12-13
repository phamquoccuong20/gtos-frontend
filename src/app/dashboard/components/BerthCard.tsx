'use client';

import React, { useState } from 'react';
import { Ship, Clock, Box, Anchor, MoreHorizontal, Eye, Edit3, FileClock, AlertTriangle } from 'lucide-react';
import { Berth, Status } from '../types';

interface BerthCardProps {
    berth: Berth;
    onViewDetails?: (berth: Berth) => void;
    onUpdateProgress?: (berth: Berth) => void;
    onViewHistory?: (berth: Berth) => void;
    onReportIncident?: (berth: Berth) => void;
}

export const BerthCard: React.FC<BerthCardProps> = ({
    berth,
    onViewDetails,
    onUpdateProgress,
    onViewHistory,
    onReportIncident
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isIdle = berth.status === Status.Idle;

    const handleViewDetails = () => {
        setIsMenuOpen(false);
        if (onViewDetails) {
            onViewDetails(berth);
        }
    };

    const handleUpdateProgress = () => {
        setIsMenuOpen(false);
        if (onUpdateProgress) {
            onUpdateProgress(berth);
        }
    }

    const handleViewHistory = () => {
        setIsMenuOpen(false);
        if (onViewHistory) {
            onViewHistory(berth);
        }
    }

    const handleReportIncident = () => {
        setIsMenuOpen(false);
        if (onReportIncident) {
            onReportIncident(berth);
        }
    }

    const getStatusStyles = (status: Status) => {
        switch (status) {
            case Status.Active: return {
                bg: 'bg-emerald-500',
                text: 'text-emerald-700',
                badge: 'bg-emerald-50 border-emerald-100',
                label: 'Đang khai thác'
            };
            case Status.Maintenance: return {
                bg: 'bg-orange-500',
                text: 'text-orange-700',
                badge: 'bg-orange-50 border-orange-100',
                label: 'Bảo trì'
            };
            case Status.Idle: return {
                bg: 'bg-slate-400',
                text: 'text-slate-500',
                badge: 'bg-slate-50 border-slate-100',
                label: 'Đang trống'
            };
            default: return {
                bg: 'bg-slate-400',
                text: 'text-slate-500',
                badge: 'bg-slate-50 border-slate-100',
                label: 'Không xác định'
            };
        }
    };

    const style = getStatusStyles(berth.status);

    return (
        <div className="bg-white rounded p-[10px] border border-slate-200 shadow-soft h-full flex flex-col relative group hover:border-blue-300 transition-all duration-300">

            {/* Click Outside Handler for Menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-3 relative z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center font-bold text-slate-700 border border-slate-100 shadow-sm text-xs">
                        {berth.id.replace('Bến ', '')}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-[14px]">{berth.name}</h4>
                        <div className={`text-[10px] font-bold uppercase tracking-wide inline-flex items-center px-1.5 py-0.5 rounded border ${style.badge} ${style.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.bg}`}></span>
                            {style.label}
                        </div>
                    </div>
                </div>

                {/* Dropdown Menu Trigger */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`transition-colors p-1 rounded ${isMenuOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-300 hover:text-slate-600 hover:bg-slate-50'}`}
                    >
                        <MoreHorizontal size={16} />
                    </button>

                    {/* Dropdown Content */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded shadow-lg border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                            <div className="p-1 space-y-0.5">
                                <button
                                    onClick={handleViewDetails}
                                    disabled={isIdle}
                                    className={`w-full text-left flex items-center gap-2 px-3 py-2 text-[14px] rounded transition-colors ${isIdle ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                                        }`}
                                >
                                    <Eye size={14} /> Xem hồ sơ tàu
                                </button>
                                <button
                                    onClick={handleUpdateProgress}
                                    disabled={isIdle}
                                    className={`w-full text-left flex items-center gap-2 px-3 py-2 text-[14px] rounded transition-colors ${isIdle ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                                        }`}
                                >
                                    <Edit3 size={14} /> Cập nhật tiến độ
                                </button>
                                <button
                                    onClick={handleViewHistory}
                                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-[14px] text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded transition-colors"
                                >
                                    <FileClock size={14} /> Lịch sử hoạt động
                                </button>
                            </div>
                            <div className="h-px bg-slate-100 my-0.5 mx-1.5"></div>
                            <div className="p-1">
                                <button
                                    onClick={handleReportIncident}
                                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-[14px] text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                >
                                    <AlertTriangle size={14} /> Báo cáo sự cố
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            {!isIdle ? (
                <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-3">
                        <div className="flex items-start gap-2 mb-2">
                            <div className="mt-0.5 p-1 bg-blue-50 text-blue-600 rounded">
                                <Ship size={14} />
                            </div>
                            <div>
                                <p className="text-[12px] text-slate-400 font-normal">Tàu cập bến</p>
                                <p className="text-[14px] font-bold text-slate-800 leading-tight">{berth.shipName}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[12px]">
                            <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                <p className="text-slate-400 mb-0.5 flex items-center"><Box size={10} className="mr-1" /> Hàng hóa</p>
                                <p className="font-semibold text-slate-700 truncate">{berth.cargoType}</p>
                            </div>
                            <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                <p className="text-slate-400 mb-0.5 flex items-center"><Clock size={10} className="mr-1" /> ETA</p>
                                <p className="font-semibold text-slate-700">{berth.eta}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="flex justify-between text-[12px] mb-1">
                            <span className="text-slate-500 font-medium">Tiến độ bốc dỡ</span>
                            <span className="text-blue-600 font-bold">{berth.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded h-1.5">
                            <div
                                className="bg-blue-500 h-full rounded transition-all duration-500"
                                style={{ width: `${berth.progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded bg-slate-50/50">
                    <Anchor size={20} className="text-slate-300 mb-1" />
                    <span className="text-[12px] font-medium text-slate-400">Sẵn sàng đón tàu</span>
                </div>
            )}
        </div>
    );
};
