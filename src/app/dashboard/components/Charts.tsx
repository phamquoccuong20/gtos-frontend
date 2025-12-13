'use client';

import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendData, CargoStat } from '../types';

// --- Trend Chart ---

interface TrendChartProps {
    data: TrendData[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorImport" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExport" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} stroke="transparent" />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ fontSize: '13px', fontWeight: 600, padding: '2px 0' }}
                    labelStyle={{ color: '#64748b', marginBottom: '8px', fontSize: '12px' }}
                />
                <Area
                    type="monotone"
                    dataKey="import"
                    name="Nhập khẩu"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorImport)"
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                />
                <Area
                    type="monotone"
                    dataKey="export"
                    name="Xuất khẩu"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorExport)"
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#059669' }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

// --- Cargo Bar List ---

interface CargoListProps {
    data: CargoStat[];
}

export const CargoList: React.FC<CargoListProps> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="space-y-6">
            {data.map((item, index) => (
                <div key={index} className="group">
                    <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                            <span className="font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">{item.value.toLocaleString()} <span className="text-slate-400 text-xs font-normal">tấn</span></span>
                    </div>
                    <div className="w-full bg-slate-50 rounded-full h-2.5 overflow-hidden border border-slate-100">
                        <div
                            className={`h-full rounded-full ${item.color} opacity-80 group-hover:opacity-100 transition-all duration-500`}
                            style={{ width: `${(item.value / maxValue) * 100}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Equipment Pie Chart with Custom Labels ---

interface EquipmentProps {
    data: { name: string; value: number; color: string }[];
}

// Helper math to calculate label position
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, percent, payload } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    // Starting point of the line (on the pie slice)
    const sx = cx + (outerRadius) * cos;
    const sy = cy + (outerRadius) * sin;

    // Elbow point of the line
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;

    // Ending point of the line (text anchor)
    const ex = mx + (cos >= 0 ? 1 : -1) * 15;
    const ey = my;

    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            {/* The connecting line */}
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.color} fill="none" strokeWidth={1} />
            <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />

            {/* Top text: Name */}
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-6} textAnchor={textAnchor} fill="#334155" fontSize={11} fontWeight={600}>
                {payload.name}
            </text>

            {/* Bottom text: Value & Percentage */}
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={12} textAnchor={textAnchor} fill={payload.color} fontSize={10} fontWeight={500}>
                {`${payload.value} (${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export const EquipmentChart: React.FC<EquipmentProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={95}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Tỷ lệ']}
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ paddingTop: '24px' }}
                    formatter={(value) => <span className="text-slate-600 font-medium text-xs ml-1">{value}</span>}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};
