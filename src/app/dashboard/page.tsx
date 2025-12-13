'use client';

import React, { useState } from 'react';
import {
    Ship, Container, Activity, DollarSign, Bell,
    ArrowRight, Anchor, Settings2
} from 'lucide-react';

// Import components
import {
    StatCard,
    BerthCard,
    TrendChart,
    CargoList,
    EquipmentChart,
    DetailedReportModal,
    ShipProfileModal,
    UpdateProgressModal,
    ActivityHistoryModal,
    ReportIncidentModal
} from './components';

// Import types and data
import { Berth } from './types';
import { trendData, cargoData, berthData, equipmentData, activities } from './data';

export default function DashboardPage() {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedShipBerth, setSelectedShipBerth] = useState<Berth | null>(null);
    const [selectedUpdateBerth, setSelectedUpdateBerth] = useState<Berth | null>(null);
    const [selectedHistoryBerth, setSelectedHistoryBerth] = useState<Berth | null>(null);
    const [selectedIncidentBerth, setSelectedIncidentBerth] = useState<Berth | null>(null);

    const handleViewShipDetails = (berth: Berth) => {
        setSelectedShipBerth(berth);
    };

    const handleUpdateProgress = (berth: Berth) => {
        setSelectedUpdateBerth(berth);
    };

    const handleViewHistory = (berth: Berth) => {
        setSelectedHistoryBerth(berth);
    };

    const handleReportIncident = (berth: Berth) => {
        setSelectedIncidentBerth(berth);
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">

            {/* CONTENT SCROLL */}
            <div className="flex-1 overflow-y-auto p-[10px] space-y-[10px]">

                {/* 1. KEY METRICS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[10px]">
                    <StatCard
                        title="Tổng sản lượng"
                        value="24,850"
                        unit="T"
                        trend={12.5}
                        icon={Container}
                        colorClass="text-blue-600"
                    />
                    <StatCard
                        title="Tàu tại cảng"
                        value="05"
                        unit="tàu"
                        trend={-2.4}
                        icon={Ship}
                        colorClass="text-emerald-600"
                    />
                    <StatCard
                        title="Doanh thu ước tính"
                        value="10.2"
                        unit="tỷ"
                        trend={18.7}
                        icon={DollarSign}
                        colorClass="text-indigo-600"
                    />
                    <StatCard
                        title="Hiệu suất khai thác"
                        value="94.2"
                        unit="%"
                        trend={5.3}
                        icon={Activity}
                        colorClass="text-purple-600"
                    />
                </div>

                {/* 2. MAIN CHART SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px]">
                    {/* Chart Area */}
                    <div className="bg-white p-[10px] rounded shadow-soft lg:col-span-2 flex flex-col">
                        <div className="flex justify-between items-center mb-[10px]">
                            <div>
                                <h3 className="text-[16px] font-bold text-slate-800">Biểu đồ hàng hóa</h3>
                                <p className="text-[12px] text-slate-500">Thống kê Xuất/Nhập 6 tháng đầu năm</p>
                            </div>
                            <div className="flex gap-2">
                                <select className="h-9 bg-slate-50 border border-slate-200 text-[14px] font-medium text-slate-600 rounded px-3 ant-focus cursor-pointer hover:bg-slate-100 transition-colors">
                                    <option>Theo tháng</option>
                                    <option>Theo quý</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 min-h-[180px]">
                            <TrendChart data={trendData} />
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="bg-white p-[10px] rounded shadow-soft border border-slate-200 flex flex-col">
                        <h3 className="text-[16px] font-bold text-slate-800 mb-[4px]">Cơ cấu hàng hóa</h3>
                        <p className="text-[12px] text-slate-500 mb-[10px]">Phân loại theo nhóm hàng chính</p>
                        <div className="flex-1 flex flex-col justify-center">
                            <CargoList data={cargoData} />
                        </div>
                        <button
                            onClick={() => setIsReportModalOpen(true)}
                            className="w-full mt-4 h-9 rounded border border-slate-200 text-[14px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-center active:scale-[0.98]"
                        >
                            Xem báo cáo chi tiết <ArrowRight size={14} className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* 3. BERTH MONITORING */}
                <div>
                    <div className="flex items-center justify-between mb-[10px] px-1">
                        <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-[6px]">
                            <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-blue-600">
                                <Anchor size={14} />
                            </span>
                            Giám sát Cầu bến
                        </h3>
                        <div className="flex gap-[6px]">
                            <span className="flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-[6px] py-[2px] rounded border border-emerald-100"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>3 Đang làm hàng</span>
                            <span className="flex items-center text-[11px] font-semibold text-orange-700 bg-orange-50 px-[6px] py-[2px] rounded border border-orange-100"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1"></span>1 Bảo trì</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-[10px]">
                        {berthData.map((berth) => (
                            <div key={berth.id} className="h-full">
                                <BerthCard
                                    berth={berth}
                                    onViewDetails={handleViewShipDetails}
                                    onUpdateProgress={handleUpdateProgress}
                                    onViewHistory={handleViewHistory}
                                    onReportIncident={handleReportIncident}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. BOTTOM INFO */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px]">
                    {/* Equipment Chart */}
                    <div className="bg-white p-[10px] rounded shadow-soft border border-slate-200 flex items-center justify-center">
                        <div className="h-[250px] w-full">
                            <EquipmentChart data={equipmentData} />
                        </div>
                    </div>

                    <div className="bg-white p-[10px] rounded shadow-soft border border-slate-200 lg:col-span-2">
                        <div className="flex justify-between items-center mb-[10px]">
                            <div>
                                <h3 className="text-[16px] font-bold text-slate-800">Nhật ký điều hành</h3>
                                <p className="text-[12px] text-slate-500">Cập nhật thời gian thực</p>
                            </div>
                            <button className="p-1.5 text-slate-400 hover:text-blue-600 bg-slate-50 rounded hover:bg-blue-50 transition-colors"><Settings2 size={14} /></button>
                        </div>

                        <div className="space-y-0">
                            {activities.map((act, idx) => (
                                <div key={idx} className="flex gap-3 relative pb-5 last:pb-0 group">
                                    {/* Timeline line */}
                                    {idx !== activities.length - 1 && (
                                        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-100 group-hover:bg-slate-200 transition-colors"></div>
                                    )}

                                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${act.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                        act.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {act.type === 'success' ? <Activity size={14} /> : act.type === 'warning' ? <Bell size={14} /> : <Settings2 size={14} />}
                                    </div>

                                    <div className="flex-1 pt-0.5">
                                        <div className="flex justify-between mb-0.5">
                                            <p className="text-[14px] font-bold text-slate-800">{act.text}</p>
                                            <span className="text-[12px] font-medium text-slate-400 whitespace-nowrap ml-4">{act.time}</span>
                                        </div>
                                        <p className="text-[12px] text-slate-500">
                                            {act.type === 'success' ? 'Đã cập nhật dữ liệu vào hệ thống.' : 'Vui lòng kiểm tra và xử lý.'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL REPORTS */}
            <DetailedReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
            />

            {/* MODAL SHIP PROFILE */}
            <ShipProfileModal
                isOpen={!!selectedShipBerth}
                onClose={() => setSelectedShipBerth(null)}
                berth={selectedShipBerth}
            />

            {/* MODAL UPDATE PROGRESS */}
            <UpdateProgressModal
                isOpen={!!selectedUpdateBerth}
                onClose={() => setSelectedUpdateBerth(null)}
                berth={selectedUpdateBerth}
            />

            {/* MODAL ACTIVITY HISTORY */}
            <ActivityHistoryModal
                isOpen={!!selectedHistoryBerth}
                onClose={() => setSelectedHistoryBerth(null)}
                berth={selectedHistoryBerth}
            />

            {/* MODAL REPORT INCIDENT */}
            <ReportIncidentModal
                isOpen={!!selectedIncidentBerth}
                onClose={() => setSelectedIncidentBerth(null)}
                berth={selectedIncidentBerth}
            />
        </div>
    );
}
