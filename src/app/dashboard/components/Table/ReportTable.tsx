'use client';

import React from 'react';
import { X, Download, Filter, FileText, Search, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { ReportItem } from '../../types';
import { reportData } from '../../data';

interface ReportTableProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ReportTable: React.FC<ReportTableProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="text-[18px] font-bold text-slate-800 font-display">Chi tiết Hàng hóa Xuất/Nhập</h3>
                            <p className="text-[13px] text-slate-500">Dữ liệu cập nhật từ 01/06/2024 - 15/06/2024</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="px-5 py-3 flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Tìm theo mã vận đơn, tàu..."
                            className="pl-9 pr-4 h-9 border border-slate-200 rounded text-sm ant-focus w-64"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 h-9 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                            <Filter size={16} />
                            Bộ lọc
                        </button>
                        <button className="flex items-center gap-2 px-3 h-9 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors shadow-sm">
                            <Download size={16} />
                            Xuất Excel
                        </button>
                    </div>
                </div>

                {/* Table Area */}
                <div className="flex-1 overflow-auto p-0">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-blue-50 sticky top-0 z-10 border-b border-blue-100">
                            <tr>
                                <th className="px-6 py-3 text-xs font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">Mã Lô Hàng</th>
                                <th className="px-6 py-3 text-xs font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">Loại Hàng</th>
                                <th className="px-6 py-3 text-xs font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">Tàu Vận Chuyển</th>
                                <th className="px-6 py-3 text-xs font-bold text-blue-700 uppercase tracking-wider text-right whitespace-nowrap">Khối Lượng (Tấn)</th>
                                <th className="px-6 py-3 text-xs font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">Ngày Cập Nhật</th>
                                <th className="px-6 py-3 text-xs font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">Trạng Thái</th>
                                <th className="px-6 py-3 text-xs font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {reportData.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        <span className="font-semibold text-slate-700 text-sm">{item.id}</span>
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-slate-800">{item.cargo}</span>
                                            <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 rounded">{item.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-sm text-slate-600 whitespace-nowrap">
                                        {item.ship}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-slate-800 font-bold text-right whitespace-nowrap">
                                        {item.weight.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-slate-600 whitespace-nowrap">
                                        {item.date}
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                item.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    'bg-orange-50 text-orange-700 border-orange-100'
                                            }`}>
                                            {item.status === 'Completed' ? 'Hoàn thành' : item.status === 'Processing' ? 'Đang xử lý' : 'Chờ duyệt'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right whitespace-nowrap">
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                    <span>Hiển thị 6 / 128 kết quả</span>
                    <div className="flex gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-500">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-blue-600 text-white shadow-sm hover:bg-blue-700">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition-colors">3</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportTable;
