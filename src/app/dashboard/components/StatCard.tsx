'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    unit?: string;
    trend: number;
    icon: LucideIcon;
    colorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    unit,
    trend,
    icon: Icon,
    colorClass,
}) => {
    const isPositive = trend >= 0;

    // Map text color to background color
    const getBgColor = (textColor: string) => {
        const colorMap: { [key: string]: string } = {
            'text-blue-600': 'bg-blue-100',
            'text-emerald-600': 'bg-emerald-100',
            'text-indigo-600': 'bg-indigo-100',
            'text-purple-600': 'bg-purple-100',
        };
        return colorMap[textColor] || 'bg-slate-100';
    };

    return (
        <div className="bg-white p-[10px] rounded shadow-soft border border-slate-200 hover:shadow-md transition-all duration-300 relative overflow-hidden group">

            <div className="flex justify-between items-start mb-2 relative z-10">
                <div className={`p-2 rounded ${getBgColor(colorClass)}`}>
                    <Icon className={`w-5 h-5 ${colorClass}`} />
                </div>

                <div className={`flex items-center text-xs font-medium px-2 py-0.5 rounded border ${isPositive
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                    {isPositive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                    {Math.abs(trend)}%
                </div>
            </div>

            <div className="mt-2 relative z-10">
                <p className="text-slate-500 text-[14px]">{title}</p>
                <div className="flex items-baseline mt-1">
                    <h3 className="text-[24px] font-bold text-slate-800 tracking-tight">{value}</h3>
                    {unit && <span className="ml-1 text-[14px] text-slate-500 font-medium">{unit}</span>}
                </div>
            </div>
        </div>
    );
};
