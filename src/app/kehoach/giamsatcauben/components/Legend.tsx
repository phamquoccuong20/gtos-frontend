import React from 'react';

export const Legend: React.FC = () => {
    return (
        <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-amber-400/30"></div>
                <span className="text-slate-600 font-medium">Tàu kế hoạch</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-sky-500 ring-2 ring-sky-500/30"></div>
                <span className="text-slate-600 font-medium">Tàu cập cảng</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30"></div>
                <span className="text-slate-600 font-medium">Tàu rời cảng</span>
            </div>
        </div>
    );
};
