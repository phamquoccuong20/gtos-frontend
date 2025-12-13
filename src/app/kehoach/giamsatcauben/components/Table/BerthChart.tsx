import React, { useRef, useState, useMemo } from 'react';
import { Vessel, VesselStatus } from '../../types';
import {
    PIXELS_PER_HOUR,
    PIXELS_PER_METER,
    METERS_PER_BITT,
    QUAY_TOTAL_LENGTH,
    BERTHS
} from '../../constants';
import { Ship, ArrowRight, CornerRightDown, Anchor, Clock, CheckCircle2 } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface BerthChartProps {
    vessels: Vessel[];
    startTime: Date;
    endTime: Date;
    onVesselClick?: (vessel: Vessel) => void;
}

const formatHour = (d: Date) => d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
const formatDate = (d: Date) => d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

interface VesselSegment extends Vessel {
    segStart: Date;
    segEnd: Date;
    uniqueKey: string;
    originalVessel: Vessel;
}

export const BerthChart: React.FC<BerthChartProps> = ({ vessels, startTime, endTime, onVesselClick }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredVessel, setHoveredVessel] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Calculate total dimensions
    const totalHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const chartWidth = totalHours * PIXELS_PER_HOUR;
    const chartHeight = QUAY_TOTAL_LENGTH * PIXELS_PER_METER;

    // 1. Generate Day Headers (Top Row)
    const dayHeaders = useMemo(() => {
        const headers = [];
        let current = new Date(startTime);
        current.setHours(0, 0, 0, 0); // Align to midnight

        // Ensure we cover the full range including the end day
        const endCap = new Date(endTime);
        if (endCap.getHours() > 0 || endCap.getMinutes() > 0) {
            endCap.setDate(endCap.getDate() + 1);
            endCap.setHours(0, 0, 0, 0);
        }

        while (current < endCap) {
            // Calculate position relative to startTime
            const diffHours = (current.getTime() - startTime.getTime()) / (1000 * 60 * 60);
            const left = diffHours * PIXELS_PER_HOUR;
            const width = 24 * PIXELS_PER_HOUR; // Fixed 24h width

            headers.push({
                left,
                width,
                label: formatDate(current),
                date: new Date(current)
            });

            // Next day
            current.setDate(current.getDate() + 1);
            if (headers.length > 30) break; // Safety break
        }
        return headers;
    }, [startTime, endTime]);

    // 2. Generate Hour Markers (Bottom Row)
    const hourMarkers = useMemo(() => {
        const markers = [];
        const current = new Date(startTime);
        current.setMinutes(0, 0, 0);

        if (current < startTime) {
            current.setTime(current.getTime() + 60 * 60 * 1000);
        }

        while (current < endTime) {
            const diffHours = (current.getTime() - startTime.getTime()) / (1000 * 60 * 60);
            markers.push({
                left: diffHours * PIXELS_PER_HOUR,
                label: formatHour(current),
                isMidnight: current.getHours() === 0,
            });
            current.setTime(current.getTime() + 60 * 60 * 1000);
        }
        return markers;
    }, [startTime, endTime]);

    // 3. Generate Bitt Markers (Y-axis - LEFT)
    const bittMarkers = useMemo(() => {
        const markers = [];
        const totalBitts = Math.floor(QUAY_TOTAL_LENGTH / METERS_PER_BITT);

        for (let i = 0; i <= totalBitts; i++) {
            if (i > 0 && i % 2 === 0) {
                markers.push({
                    top: (i * METERS_PER_BITT) * PIXELS_PER_METER,
                    label: i.toString(),
                    isMajor: true
                });
            } else {
                markers.push({
                    top: (i * METERS_PER_BITT) * PIXELS_PER_METER,
                    label: i.toString(),
                    isMajor: false
                });
            }
        }
        return markers;
    }, []);

    // 4. Generate Vessel Blocks (Continuous, not split by day)
    const vesselSegments: VesselSegment[] = useMemo(() => {
        const segments: VesselSegment[] = [];

        vessels.forEach(v => {
            // Filter out vessels that are completely outside the view range
            if (v.departureTime < startTime || v.arrivalTime > endTime) {
                return;
            }

            segments.push({
                ...v,
                segStart: v.arrivalTime,
                segEnd: v.departureTime,
                uniqueKey: v.id,
                originalVessel: v
            });
        });
        return segments;
    }, [vessels, startTime, endTime]);

    const getSegmentStyle = (seg: VesselSegment) => {
        const startDiffHours = (seg.segStart.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        const durationHours = (seg.segEnd.getTime() - seg.segStart.getTime()) / (1000 * 60 * 60);

        const top = seg.startPosition * PIXELS_PER_METER;
        const height = seg.length * PIXELS_PER_METER;

        return {
            left: `${startDiffHours * PIXELS_PER_HOUR}px`, // Can be negative if starts before view
            width: `${Math.max(1, durationHours * PIXELS_PER_HOUR)}px`,
            top: `${top}px`,
            height: `${height}px`,
        };
    };

    const getVesselStyles = (status: VesselStatus) => {
        switch (status) {
            case VesselStatus.PLANNED:
                return {
                    // Technical Blueprint: White background, Amber dashed border.
                    wrapper: 'bg-white hover:bg-amber-50',
                    style: {},
                    border: 'border-2 border-amber-400',
                    shadow: 'shadow-sm',
                    textPrimary: 'text-slate-800',
                    textSecondary: 'text-slate-500',
                    iconColor: 'text-amber-500',
                    badge: 'bg-amber-100 text-amber-700 border border-amber-200'
                };
            case VesselStatus.AT_BERTH:
                return {
                    // Solid Sky Blue: Matches the legend
                    wrapper: 'bg-sky-500 hover:bg-sky-600',
                    style: {},
                    border: 'border border-sky-600',
                    shadow: 'shadow-md shadow-sky-500/30',
                    textPrimary: 'text-white',
                    textSecondary: 'text-sky-100',
                    iconColor: 'text-white',
                    badge: 'bg-white/20 text-white border border-white/30 backdrop-blur-sm'
                };
            case VesselStatus.DEPARTED:
                return {
                    // Clean Emerald: Light background, solid border
                    wrapper: 'bg-emerald-50/80 hover:bg-emerald-100',
                    style: {},
                    border: 'border border-emerald-400',
                    shadow: '',
                    textPrimary: 'text-emerald-900',
                    textSecondary: 'text-emerald-700',
                    iconColor: 'text-emerald-500',
                    badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                };
            default:
                return {
                    wrapper: 'bg-slate-200',
                    style: {},
                    border: 'border-slate-300',
                    shadow: '',
                    textPrimary: 'text-slate-700',
                    textSecondary: 'text-slate-500',
                    iconColor: 'text-slate-500',
                    badge: 'bg-slate-300'
                };
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Helper to calculate progress (Simulated based on time)
    const getProgress = (start: Date, end: Date) => {
        const now = new Date();
        const total = end.getTime() - start.getTime();
        const elapsed = now.getTime() - start.getTime();
        const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
        return pct;
    };

    // Current time line
    const now = new Date();
    const currentTimeLeft = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60) * PIXELS_PER_HOUR;
    const isCurrentTimeVisible = currentTimeLeft >= 0 && currentTimeLeft <= chartWidth;

    return (
        <div className="flex flex-col h-full bg-white border border-slate-300 rounded shadow-sm overflow-hidden select-none font-sans">

            {/* Header Area */}
            <div className="flex flex-col border-b border-slate-300 bg-slate-50 z-20 shadow-sm">

                {/* Top Half: Date Headers */}
                <div className="flex h-8 border-b border-slate-200">
                    <div className="w-48 flex-shrink-0 border-r border-slate-300 bg-slate-100 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-slate-500">NGÀY</span>
                    </div>
                    <div className="flex-1 overflow-hidden relative" ref={(el) => {
                        if (el && scrollContainerRef.current) {
                            el.scrollLeft = scrollContainerRef.current.scrollLeft;
                        }
                    }}>
                        <div className="relative h-full" style={{ width: chartWidth }}>
                            {dayHeaders.map((day, idx) => (
                                <div
                                    key={`day-header-${idx}`}
                                    className="absolute top-0 bottom-0 flex items-center justify-center border-l border-slate-300 bg-slate-50/50"
                                    style={{ left: day.left, width: day.width }}
                                >
                                    <span className="text-xs font-bold text-slate-800 bg-slate-100/80 px-2 py-0.5 rounded shadow-sm border border-slate-200">
                                        {day.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Half: Hour Headers */}
                <div className="flex h-7 bg-slate-50">
                    <div className="w-48 flex-shrink-0 border-r border-slate-300 bg-slate-50 flex items-center justify-between px-2">
                        <span className="text-[10px] font-bold text-slate-400">BẾN / BITTS</span>
                        <CornerRightDown size={12} className="text-slate-300" />
                        <span className="text-[10px] font-bold text-slate-400">GIỜ</span>
                    </div>
                    <div className="flex-1 overflow-hidden relative" ref={(el) => {
                        if (el && scrollContainerRef.current) {
                            el.scrollLeft = scrollContainerRef.current.scrollLeft;
                        }
                    }}>
                        <div className="relative h-full" style={{ width: chartWidth }}>
                            {hourMarkers.map((m, idx) => (
                                <div
                                    key={`hour-${idx}`}
                                    className={`absolute h-full flex items-center justify-start pl-1 border-l ${m.isMidnight ? 'border-slate-400' : 'border-slate-200 dashed'}`}
                                    style={{ left: m.left }}
                                >
                                    <span className={`text-[10px] ${m.isMidnight ? 'font-bold text-slate-800' : 'text-slate-400'}`}>
                                        {m.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Main Chart Body */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* Left Sidebar: Berths & Bitts (Fixed) */}
                <div className="w-48 flex-shrink-0 bg-white border-r border-slate-300 overflow-hidden relative z-10">
                    <div className="absolute w-full" style={{ height: chartHeight, transform: `translateY(-${scrollContainerRef.current?.scrollTop || 0}px)` }}>

                        {/* Berth Labels Background */}
                        {BERTHS.map(berth => (
                            <div
                                key={`label-${berth.id}`}
                                className={`absolute left-0 w-full flex flex-col justify-center px-2 border-b border-slate-200 ${berth.color}`}
                                style={{
                                    top: berth.startMeter * PIXELS_PER_METER,
                                    height: (berth.endMeter - berth.startMeter) * PIXELS_PER_METER
                                }}
                            >
                                <span className="text-xs font-bold text-slate-700 uppercase leading-tight mb-1 font-heading">{berth.name}</span>
                                <span className="text-[9px] text-slate-500 font-mono">{berth.startMeter}m - {berth.endMeter}m</span>
                            </div>
                        ))}

                        {/* Bitt Ruler Overlay */}
                        <div className="absolute top-0 right-0 w-8 h-full border-l border-slate-200 bg-white/50">
                            {bittMarkers.map((m, idx) => (
                                <div key={`bitt-lbl-${idx}`} className="absolute right-0 w-full" style={{ top: m.top }}>
                                    <div className={`absolute right-0 top-0 h-px bg-slate-300 ${m.isMajor ? 'w-full' : 'w-2'}`}></div>
                                    {m.isMajor && (
                                        <span className="absolute right-1.5 -top-2 text-[9px] font-mono font-medium text-slate-500 bg-white/80 px-0.5">
                                            {m.label}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Scrollable Grid Area */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-auto relative bg-slate-50 cursor-grab active:cursor-grabbing"
                    onMouseMove={handleMouseMove}
                    onScroll={(e) => {
                        // Sync Header X-scroll
                        const headerRow1 = e.currentTarget.parentElement?.previousElementSibling?.firstElementChild?.lastElementChild;
                        const headerRow2 = e.currentTarget.parentElement?.previousElementSibling?.lastElementChild?.lastElementChild;
                        if (headerRow1) headerRow1.scrollLeft = e.currentTarget.scrollLeft;
                        if (headerRow2) headerRow2.scrollLeft = e.currentTarget.scrollLeft;

                        // Sync Sidebar Y-scroll
                        const sidebar = e.currentTarget.previousElementSibling?.firstElementChild as HTMLElement;
                        if (sidebar) sidebar.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;
                    }}
                >
                    <div className="relative" style={{ width: chartWidth, height: chartHeight }}>

                        {/* Background: Berth Zones (Horizontal) */}
                        {BERTHS.map(berth => (
                            <div
                                key={`bg-berth-${berth.id}`}
                                className={`absolute left-0 right-0 border-b border-slate-200 pointer-events-none ${berth.color}`}
                                style={{
                                    top: berth.startMeter * PIXELS_PER_METER,
                                    height: (berth.endMeter - berth.startMeter) * PIXELS_PER_METER
                                }}
                            />
                        ))}

                        {/* Background: Day Separators (Strong Vertical Lines) */}
                        {dayHeaders.map((day, idx) => (
                            <div
                                key={`bg-day-${idx}`}
                                className="absolute top-0 bottom-0 border-l border-slate-300 pointer-events-none"
                                style={{ left: day.left }}
                            />
                        ))}

                        {/* Background: Bitt Lines (Horizontal Faint) */}
                        {bittMarkers.filter(m => m.isMajor).map((m, idx) => (
                            <div
                                key={`grid-h-bitt-${idx}`}
                                className="absolute left-0 right-0 border-t border-slate-400/10 pointer-events-none"
                                style={{ top: m.top }}
                            />
                        ))}

                        {/* Background: Hour Lines (Vertical Faint) */}
                        {hourMarkers.map((m, idx) => (
                            <div
                                key={`grid-v-time-${idx}`}
                                className={`absolute top-0 bottom-0 border-l pointer-events-none ${m.isMidnight ? 'border-transparent' : 'border-slate-200/50 dashed'}`}
                                style={{ left: m.left }}
                            />
                        ))}

                        {/* Current Time Line */}
                        {isCurrentTimeVisible && (
                            <div
                                className="absolute top-0 bottom-0 border-l-2 border-red-500 z-10 pointer-events-none"
                                style={{ left: currentTimeLeft }}
                            >
                                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></div>
                                <div className="absolute top-0 left-0 bg-red-500 text-white text-[9px] px-1 rounded-r shadow-sm">NOW</div>
                            </div>
                        )}

                        {/* Vessel Segments */}
                        {vesselSegments.map((segment) => {
                            const styles = getVesselStyles(segment.status);
                            const progress = getProgress(segment.arrivalTime, segment.departureTime);
                            const isTallEnough = (segment.length * PIXELS_PER_METER) > 24;
                            const isWideEnough = (segment.segEnd.getTime() - segment.segStart.getTime()) > 3600000;

                            return (
                                <Tooltip
                                    key={segment.uniqueKey}
                                    visible={hoveredVessel === segment.uniqueKey}
                                    x={mousePos.x}
                                    y={mousePos.y}
                                    content={
                                        <div className="space-y-2 font-sans">
                                            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                                                <span className="font-bold text-lg text-slate-800 font-heading">{segment.name}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${segment.status === VesselStatus.AT_BERTH ? 'bg-sky-500' : segment.status === VesselStatus.PLANNED ? 'bg-amber-400' : 'bg-emerald-500'} text-white`}>
                                                    {segment.status === VesselStatus.PLANNED ? 'Kế hoạch' : segment.status === VesselStatus.AT_BERTH ? 'Cập cảng' : 'Rời cảng'}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600 text-xs">
                                                <span className="text-slate-500">Chuyến:</span> <span className="font-mono text-slate-800 font-semibold">{segment.voyage}</span>
                                                <span className="text-slate-500">Hàng hóa:</span> <span className="text-slate-800 font-semibold">{segment.cargoType}</span>
                                                <span className="text-slate-500">Vị trí:</span>
                                                <span className="text-slate-800 font-semibold">
                                                    {segment.startPosition}m - {segment.startPosition + segment.length}m
                                                    <span className="text-slate-400 ml-1 font-normal">(Bitt {Math.round(segment.startPosition / METERS_PER_BITT)} - {Math.round((segment.startPosition + segment.length) / METERS_PER_BITT)})</span>
                                                </span>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                                                <div className="flex items-center text-emerald-600 text-xs font-medium">
                                                    <ArrowRight className="w-3 h-3 mr-1" /> ETA: {segment.arrivalTime.toLocaleString('vi-VN')}
                                                </div>
                                                <div className="flex items-center text-red-600 text-xs font-medium">
                                                    <ArrowRight className="w-3 h-3 mr-1" /> ETD: {segment.departureTime.toLocaleString('vi-VN')}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div
                                        className={`absolute z-10 hover:z-30 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden group rounded-md
                      ${styles.wrapper} ${styles.border} ${styles.shadow}
                    `}
                                        style={{ ...getSegmentStyle(segment), ...styles.style }}
                                        onMouseEnter={() => setHoveredVessel(segment.uniqueKey)}
                                        onMouseLeave={() => setHoveredVessel(null)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onVesselClick && onVesselClick(segment.originalVessel);
                                        }}
                                    >
                                        {/* Content Container - Clean Layout */}
                                        <div className={`relative flex flex-col items-center justify-center w-full h-full text-center px-1 py-1`}>

                                            {isTallEnough && isWideEnough ? (
                                                <div className="flex flex-col items-center justify-center w-full gap-0.5">
                                                    {/* Icon & Name Row */}
                                                    <div className="flex items-center justify-center gap-1.5 max-w-full">
                                                        {segment.status === VesselStatus.AT_BERTH && (
                                                            <Ship className={`w-3.5 h-3.5 flex-shrink-0 ${styles.iconColor}`} />
                                                        )}
                                                        {segment.status === VesselStatus.PLANNED && (
                                                            <Ship className={`w-3.5 h-3.5 flex-shrink-0 ${styles.iconColor}`} />
                                                        )}
                                                        {segment.status === VesselStatus.DEPARTED && (
                                                            <Ship className={`w-3.5 h-3.5 flex-shrink-0 ${styles.iconColor}`} />
                                                        )}
                                                        <span className={`font-bold text-xs truncate leading-tight font-heading ${styles.textPrimary}`}>
                                                            {segment.name}
                                                        </span>
                                                    </div>

                                                    {/* Voyage Badge */}
                                                    {((segment.length * PIXELS_PER_METER) > 40) && (
                                                        <div className={`text-[9px] font-mono px-1.5 rounded-sm mt-0.5 max-w-full truncate ${styles.badge}`}>
                                                            {segment.voyage}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                // Minimal view for small blocks
                                                <div className={`w-full h-full flex items-center justify-center ${styles.textPrimary}`}>
                                                    <span className="text-[10px] font-bold truncate">...</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Progress Bar (Only for At Berth) - Slim at bottom */}
                                        {segment.status === VesselStatus.AT_BERTH && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/20">
                                                <div
                                                    className="h-full bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Tooltip>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
