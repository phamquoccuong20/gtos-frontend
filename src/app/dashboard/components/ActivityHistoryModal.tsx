'use client';

import React from 'react';
import { X, PlayCircle, PauseCircle, AlertTriangle, CheckCircle2, User, FileText } from 'lucide-react';
import { Berth, HistoryEvent } from '../types';

interface ActivityHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    berth: Berth | null;
}

export const ActivityHistoryModal: React.FC<ActivityHistoryModalProps> = ({ isOpen, onClose, berth }) => {
    if (!isOpen || !berth) return null;

    // Mock data tailored to the selected berth
    const historyData: HistoryEvent[] = [
        {
            id: '1',
            time: '10:15',
            date: 'Hôm nay',
            type: 'info',
            title: 'Cập nhật tiến độ',
            description: `Đã hoàn thành xếp dỡ hầm số 2. Sản lượng ghi nhận: 1,250 tấn.`,
            user: 'Nguyễn Văn A'
        },
        {
            id: '2',
            time: '09:30',
            date: 'Hôm nay',
            type: 'start',
            title: 'Bắt đầu ca làm việc',
            description: 'Tổ công nhân số 3 bắt đầu ca sáng. Thiết bị hoạt động: Cẩu bờ QC-01, QC-02.',
            user: 'Trần Văn B'
        },
        {
            id: '3',
            time: '08:45',
            date: 'Hôm nay',
            type: 'incident',
            title: 'Báo cáo sự cố kỹ thuật',
            description: 'Cần cẩu số 2 báo lỗi cảm biến tải trọng. Đã thông báo bộ phận kỹ thuật kiểm tra.',
            user: 'Lê Văn C'
        },
        {
            id: '4',
            time: '08:00',
            date: 'Hôm nay',
            type: 'start',
            title: 'Tàu cập bến an toàn',
            description: `Tàu ${berth.shipName} đã cập cầu bến an toàn. Bắt đầu thủ tục kiểm dịch và hải quan.`,
            user: 'Cảng vụ'
        },
        {
            id: '5',
            time: '18:00',
            date: 'Hôm qua',
            type: 'pause',
            title: 'Tạm ngưng do thời tiết',
            description: 'Mưa lớn gây ảnh hưởng tầm nhìn. Tạm ngưng hoạt động xếp dỡ toàn bến.',
            user: 'Nguyễn Văn A'
        }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'start': return <PlayCircle size={18} />;
            case 'pause': return <PauseCircle size={18} />;
            case 'incident': return <AlertTriangle size={18} />;
            case 'completion': return <CheckCircle2 size={18} />;
            default: return <FileText size={18} />;
        }
    };

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'start': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            case 'pause': return 'bg-orange-100 text-orange-600 border-orange-200';
            case 'incident': return 'bg-rose-100 text-rose-600 border-rose-200';
            case 'completion': return 'bg-blue-100 text-blue-600 border-blue-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 font-sans">

                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t">
                    <div>
                        <h3 className="text-[18px] font-bold text-slate-800 font-display">Lịch sử hoạt động</h3>
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

                {/* Body - Timeline */}
                <div className="p-5 overflow-y-auto flex-1 bg-white">
                    <div className="relative space-y-6 pl-2">
                        {historyData.map((event, index) => (
                            <div key={event.id} className="relative flex gap-4 group">

                                {/* Connecting Line - Only render if NOT the last item */}
                                {index !== historyData.length - 1 && (
                                    <div className="absolute left-[5.75rem] top-10 bottom-[-1.5rem] w-px bg-slate-200 group-hover:bg-slate-300 transition-colors"></div>
                                )}

                                {/* Time Column */}
                                <div className={`relative z-10 w-14 flex flex-col items-center text-right pt-1 shrink-0`}>
                                    <span className="text-[14px] font-bold text-slate-700">{event.time}</span>
                                    <span className="text-[10px] text-slate-400 font-medium uppercase">{event.date}</span>
                                </div>

                                {/* Dot/Icon */}
                                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0 ${getTypeStyles(event.type)}`}>
                                    {getIcon(event.type)}
                                </div>

                                {/* Content Card */}
                                <div className="flex-1 bg-slate-50 rounded border border-slate-100 p-3 hover:border-blue-200 hover:shadow-sm transition-all">
                                    <h4 className="text-[14px] font-bold text-slate-800 mb-1">{event.title}</h4>
                                    <p className="text-[13px] text-slate-600 leading-relaxed mb-2">{event.description}</p>

                                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50">
                                        <div className="flex items-center gap-1.5 text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100 text-[11px]">
                                            <User size={10} />
                                            <span>{event.user}</span>
                                        </div>
                                        {event.type === 'incident' && (
                                            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                                                Mức độ: Cao
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* End of Log */}
                    <div className="text-center mt-8 pb-2">
                        <span className="text-[12px] text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            Khởi tạo dữ liệu chuyến tàu lúc 06:00 - 12/06/2024
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex justify-end rounded-b">
                    <button
                        onClick={onClose}
                        className="h-9 px-4 rounded bg-white border border-slate-200 font-medium text-[14px] text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};
