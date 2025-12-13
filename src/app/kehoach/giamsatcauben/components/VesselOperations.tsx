import React, { useState } from 'react';
import { Vessel, CargoItem, YardBlock } from '../types';
import { MOCK_CARGO, MOCK_YARD, MOCK_YARD_INVENTORY } from '../constants';
import { X, Box, Layers, Database, ArrowRight, ArrowLeft, Search, Calendar, MapPin } from 'lucide-react';

interface VesselOperationsProps {
    vessel: Vessel | null;
    onClose: () => void;
}

export const VesselOperations: React.FC<VesselOperationsProps> = ({ vessel, onClose }) => {
    const [selectedYardId, setSelectedYardId] = useState<string | null>(null);

    if (!vessel) return null;

    const selectedYard = selectedYardId ? MOCK_YARD.find(y => y.id === selectedYardId) : null;

    // Render the Grid of Yard Cards
    const renderYardList = () => (
        <div className="flex flex-col gap-[10px] animate-in slide-in-from-right-8 duration-500 ease-out">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-[16px] font-heading font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                    <Database size={16} /> Kế hoạch bãi (Yard Plan)
                </h3>
                <div className="flex gap-2">
                    <input type="text" placeholder="Tìm kiếm bãi..." className="text-sm px-3 h-9 rounded border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-[10px]">
                {MOCK_YARD.map((yard) => {
                    const percent = (yard.current / yard.capacity) * 100;
                    return (
                        <div
                            key={yard.id}
                            className="bg-white rounded p-0 shadow-card border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group overflow-hidden flex flex-col cursor-pointer"
                            onClick={() => setSelectedYardId(yard.id)}
                        >
                            <div className="p-[10px] flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className={`text-[18px] font-heading font-bold ${yard.color}`}>{yard.code}</h4>
                                            <span className="text-xs font-medium bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{yard.name}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                            Hàng hóa: <span className="font-semibold text-slate-700">{yard.cargoType}</span>
                                        </div>
                                    </div>
                                    <button className="text-slate-300 group-hover:text-blue-600 transition-colors bg-slate-50 group-hover:bg-blue-50 p-1.5 rounded-full">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>

                                <div className="mt-2">
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-500 font-medium">Sức chứa</span>
                                        <span className="font-mono font-bold text-slate-700">
                                            {yard.current.toLocaleString()} / {yard.capacity.toLocaleString()}
                                            <span className={`ml-2 ${percent > 90 ? 'text-red-500' : 'text-emerald-500'}`}>({percent.toFixed(2)}%)</span>
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${percent > 90 ? 'bg-red-500' : percent > 50 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed info footer */}
                            <div className="bg-slate-50 px-[10px] py-1.5 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500 group-hover:bg-blue-50/50 transition-colors">
                                <span>Zone A-12</span>
                                <span className="uppercase tracking-wider font-bold text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                                    Chi tiết <ArrowRight size={10} />
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // Render the Details View for a Specific Yard
    const renderYardDetail = () => {
        if (!selectedYard) return null;
        const percent = (selectedYard.current / selectedYard.capacity) * 100;

        return (
            <div className="flex flex-col h-full animate-in slide-in-from-right-12 duration-500 ease-out">
                {/* Detail Header */}
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-200">
                    <button
                        onClick={() => setSelectedYardId(null)}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h3 className="text-[18px] font-heading font-bold text-slate-800 flex items-center gap-2">
                            {selectedYard.code} <span className="text-sm font-sans font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{selectedYard.name}</span>
                        </h3>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-[10px] mb-4">
                    <div className="bg-white p-[10px] rounded border border-slate-200 shadow-card">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Sức chứa</div>
                        <div className="text-base font-mono font-bold text-slate-800">
                            {percent.toFixed(1)}% <span className="text-xs text-slate-400 font-normal">({selectedYard.current}/{selectedYard.capacity})</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                            <div className={`h-full rounded-full ${percent > 90 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${percent}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-white p-[10px] rounded border border-slate-200 shadow-card">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Tổng Items</div>
                        <div className="text-2xl font-bold text-slate-800">{MOCK_YARD_INVENTORY.length}</div>
                    </div>
                    <div className="bg-white p-[10px] rounded border border-slate-200 shadow-card">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Trạng thái</div>
                        <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700">
                            Operating
                        </div>
                    </div>
                </div>

                {/* Visual Map (Mini-grid) */}
                <div className="mb-4 bg-slate-100 p-[10px] rounded border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-slate-500 uppercase">Sơ đồ vị trí</h4>
                        <div className="flex gap-3 text-[10px]">
                            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-300 rounded-sm"></div> Trống</div>
                            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-sm"></div> Có hàng</div>
                            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-400 rounded-sm"></div> Đã đặt chỗ</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-10 gap-1 h-20">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-sm transition-colors ${[2, 5, 6, 12, 13, 25, 26, 27].includes(i) ? 'bg-blue-500 shadow-sm' :
                                        [15, 16].includes(i) ? 'bg-orange-400 shadow-sm' : 'bg-white border border-slate-200'
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Inventory List */}
                <div className="flex-1 overflow-hidden flex flex-col bg-white rounded border border-slate-200 shadow-card">
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                        <h4 className="font-bold text-slate-700 text-sm font-heading">Danh sách hàng tồn</h4>
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Xuất Excel</button>
                    </div>
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-xs uppercase">Vị trí</th>
                                    <th className="px-4 py-2 font-semibold text-xs uppercase">Vận đơn (BL)</th>
                                    <th className="px-4 py-2 font-semibold text-xs uppercase">Hàng hóa</th>
                                    <th className="px-4 py-2 font-semibold text-xs uppercase text-right">SL</th>
                                    <th className="px-4 py-2 font-semibold text-xs uppercase">Ngày vào</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MOCK_YARD_INVENTORY.map((item) => (
                                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-4 py-2 font-mono text-xs text-slate-600">
                                            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-slate-400" /> {item.location}</span>
                                        </td>
                                        <td className="px-4 py-2 font-medium text-slate-800">{item.billOfLading}</td>
                                        <td className="px-4 py-2 text-slate-600">{item.commodity}</td>
                                        <td className="px-4 py-2 text-right font-mono font-medium">
                                            {item.quantity} <span className="text-xs text-slate-400 ml-0.5">{item.unit}</span>
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-500">{item.dateIn}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-all duration-300 font-sans">
            {/* Header */}
            <div className="bg-white px-[10px] py-[10px] border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white p-1.5 rounded shadow-sm">
                        <Layers size={20} />
                    </div>
                    <div>
                        <h2 className="text-[18px] font-heading font-bold text-slate-800 flex items-center gap-2">
                            KẾ HOẠCH LÀM HÀNG - <span className="text-blue-600">{vessel.name}</span>
                        </h2>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-0.5">
                            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono text-xs">Voyage: {vessel.voyage}</span>
                            <span>•</span>
                            <span>ETA: {vessel.arrivalTime.toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Content Grid */}
            <div className="flex-1 overflow-auto p-[10px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[10px] h-full">

                    {/* Left Column: Cargo List (30-40%) */}
                    <div className="lg:col-span-4 flex flex-col gap-[10px]">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-[16px] font-heading font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                                <Box size={16} /> Danh sách hàng hóa
                            </h3>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">Total: {MOCK_CARGO.length}</span>
                        </div>

                        <div className="space-y-[10px]">
                            {MOCK_CARGO.map((cargo) => (
                                <div key={cargo.id} className="bg-white rounded p-[10px] shadow-card border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${cargo.color}`}></div>
                                    <div className="flex justify-between items-start mb-2 pl-2">
                                        <div>
                                            <div className="text-xs text-slate-500 font-mono mb-0.5">{cargo.billOfLading}</div>
                                            <div className="font-bold text-slate-800 text-sm font-heading">{cargo.commodity}</div>
                                        </div>
                                        <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded border border-slate-200">
                                            {cargo.hatch}
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between pl-2 mt-2 border-t border-slate-100 pt-2">
                                        <div className="text-xs text-slate-500">Số lượng</div>
                                        <div className="text-base font-bold text-slate-800">
                                            {cargo.quantity} <span className="text-xs font-medium text-slate-500">{cargo.unit}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="border-2 border-dashed border-slate-200 rounded p-3 flex items-center justify-center text-slate-400 text-sm hover:border-blue-300 hover:text-blue-500 cursor-pointer transition-colors bg-slate-50/50">
                                + Thêm hàng hóa
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Yard Plan / Details (60-70%) */}
                    <div className="lg:col-span-8 h-full">
                        {selectedYardId ? renderYardDetail() : renderYardList()}
                    </div>

                </div>
            </div>
        </div>
    );
};
