'use client';

import React, { useState } from 'react';
import { MOCK_VESSELS } from './constants';
import { Vessel } from './types';
import { BerthChart, Legend, VesselOperations } from './components';
import { RefreshCw, Calendar as CalendarIcon, Ship, ArrowRight } from 'lucide-react';

export default function GiamSatCauBenPage() {
    // Helper to format for input type="datetime-local"
    function formatDateTimeInput(date: Date) {
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date.getTime() - tzOffset)).toISOString().slice(0, 16);
        return localISOTime;
    }

    // State for Inputs (Start empty - no default values)
    const [inputStartTime, setInputStartTime] = useState<string>('');
    const [inputEndTime, setInputEndTime] = useState<string>('');

    // State for Chart (Applied after clicking button)
    const [chartStartTime, setChartStartTime] = useState<Date | null>(null);
    const [chartEndTime, setChartEndTime] = useState<Date | null>(null);

    // State to track if data has been loaded
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    // New State for Vessel Selection
    const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);

    const handleLoadData = () => {
        if (!inputStartTime || !inputEndTime) {
            alert('Vui lòng chọn thời gian bắt đầu và kết thúc');
            return;
        }

        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            // Parse selected dates
            const startDate = new Date(inputStartTime + 'T00:00:00');
            const endDate = new Date(inputEndTime + 'T23:59:59');

            // Find earliest vessel arrival time within the selected range
            const vesselsInRange = MOCK_VESSELS.filter(v =>
                v.arrivalTime >= startDate && v.arrivalTime <= endDate
            );

            let chartStart = startDate;
            if (vesselsInRange.length > 0) {
                const earliestArrival = new Date(Math.min(...vesselsInRange.map(v => v.arrivalTime.getTime())));
                // Start 1 hour before earliest vessel, but not before start date
                chartStart = new Date(Math.max(startDate.getTime(), earliestArrival.getTime() - 60 * 60 * 1000));
            }

            setChartStartTime(chartStart);
            setChartEndTime(endDate);
            setIsDataLoaded(true);
            setLoading(false);
        }, 600);
    };

    const handleVesselClick = (vessel: Vessel) => {
        setSelectedVessel(vessel);
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden font-sans">
            {/* Page Header - Similar to reference design */}
            <header className="bg-white border-b border-slate-200 shadow-sm z-30 flex-shrink-0 mt-[10px] mx-[10px] rounded-lg">
                <div className="px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
                            <Ship size={20} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800 leading-tight">Giám sát Cầu bến</h1>
                            <p className="text-xs text-slate-500">Quản lý và theo dõi lịch trình tàu cập cảng</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLoadData}
                        disabled={loading}
                        className="h-9 px-4 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        Nạp dữ liệu
                    </button>
                </div>
            </header>

            {/* Main Workspace Wrapper (Relative container for Control Bar + Chart + Overlay) */}
            <div className="flex-1 flex flex-col min-h-0 relative">

                {/* Control Bar - Date Filters & Legend */}
                <div className="bg-white border border-slate-200 px-[10px] py-2 flex flex-wrap items-center justify-between gap-[10px] z-20 flex-shrink-0 shadow-sm mx-[10px] rounded-lg mt-[10px]">
                    <div className="flex flex-wrap items-center gap-3">

                        {/* Start Date Input Group */}
                        <div className="group flex items-center bg-white border border-slate-200 rounded-lg h-10 px-3 hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
                            <div className="flex items-center justify-center w-7 h-7 bg-blue-50 rounded-md mr-2">
                                <CalendarIcon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">Từ ngày</span>
                                <input
                                    type="date"
                                    value={inputStartTime}
                                    onChange={(e) => setInputStartTime(e.target.value)}
                                    className="bg-transparent border-none text-sm font-semibold text-slate-700 focus:ring-0 p-0 outline-none h-5 w-[130px] cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100">
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                        </div>

                        {/* End Date Input Group */}
                        <div className="group flex items-center bg-white border border-slate-200 rounded-lg h-10 px-3 hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
                            <div className="flex items-center justify-center w-7 h-7 bg-emerald-50 rounded-md mr-2">
                                <CalendarIcon className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">Đến ngày</span>
                                <input
                                    type="date"
                                    value={inputEndTime}
                                    onChange={(e) => setInputEndTime(e.target.value)}
                                    className="bg-transparent border-none text-sm font-semibold text-slate-700 focus:ring-0 p-0 outline-none h-5 w-[130px] cursor-pointer"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mr-4">
                        <Legend />
                    </div>
                </div>

                {/* Chart Content Area */}
                <main className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
                    <div className="absolute inset-0 p-[10px] flex flex-col min-h-0">
                        {isDataLoaded && chartStartTime && chartEndTime ? (
                            <div className="flex-1 min-h-0 shadow-card rounded ring-1 ring-slate-900/5 h-full bg-white">
                                <BerthChart
                                    vessels={MOCK_VESSELS}
                                    startTime={chartStartTime}
                                    endTime={chartEndTime}
                                    onVesselClick={handleVesselClick}
                                />
                            </div>
                        ) : (
                            <div className="flex-1 min-h-0 shadow-card rounded ring-1 ring-slate-900/5 h-full bg-white flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Ship className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Chưa có dữ liệu</h3>
                                    <p className="text-sm text-slate-500 max-w-sm">
                                        Vui lòng chọn <strong>Từ ngày</strong> và <strong>Đến ngày</strong> rồi bấm <strong>"Nạp dữ liệu"</strong> để xem lịch trình tàu cập cảng.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

            </div>

            {/* Operation Details Section (Full Screen Overlay - Fixed to viewport) */}
            {selectedVessel && (
                <div className="fixed inset-0 z-[100] bg-slate-50 animate-in slide-in-from-bottom-full duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col shadow-2xl">
                    <VesselOperations
                        vessel={selectedVessel}
                        onClose={() => setSelectedVessel(null)}
                    />
                </div>
            )}

        </div>
    );
}
