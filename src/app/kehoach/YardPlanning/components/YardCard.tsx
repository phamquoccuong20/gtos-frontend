import React from 'react';
import { YardBlock } from '../types';
import { Ship, Box, Weight, Layers, Info, Plus } from './Icons';
import ProgressBar from './ProgressBar';

interface YardCardProps {
  data: YardBlock;
  onClick: (block: YardBlock) => void;
  onViewDetails: (block: YardBlock) => void;
}

const YardCard: React.FC<YardCardProps> = ({ data, onClick, onViewDetails }) => {
  const totalQuantity = data.contents.reduce((acc, curr) => acc + curr.quantity, 0);

  // Logic: Get the first item to display as representative
  const displayItem = data.contents.length > 0 ? data.contents[0] : null;
  const otherItemsCount = data.contents.length > 1 ? data.contents.length - 1 : 0;

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card's main click (Select for add)
    onViewDetails(data);
  };

  return (
    <div
      onClick={() => onClick(data)}
      className="bg-white rounded border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer relative"
    >
      {/* Hover Overlay Action */}
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none z-0" />

      {/* Card Header */}
      <div className="p-[10px] border-b border-slate-100 flex justify-between items-center bg-slate-50/50 z-10 relative">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-blue-700 text-lg group-hover:text-blue-600 transition-colors">{data.name}</h3>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded border border-blue-100">
            {data.zone}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {data.contents.length > 0 && (
            <button
              onClick={handleInfoClick}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-md transition-colors z-20"
              title="Xem chi tiết hàng hóa"
            >
              <Info size={18} />
            </button>
          )}
          <div className="p-1.5 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity">
            <Plus size={18} />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-[10px] flex-1 flex flex-col gap-[10px] z-10">
        {/* Vessel Info */}
        <div className="flex items-start gap-3">
          <Ship size={18} className="text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-slate-700">{data.vesselName}</p>
            <p className="text-xs text-slate-500 font-mono">{data.vesselCode}</p>
          </div>
        </div>

        {/* Cargo Display - Only show 1 item */}
        <div className="flex flex-col gap-2 mt-1 min-h-[60px] justify-center">
          {displayItem ? (
            <div className="relative">
              <div className="flex items-center justify-between text-sm bg-slate-50 p-2.5 rounded border border-slate-100">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className={`w-2 h-8 rounded-sm shrink-0 ${displayItem.color.replace('text-', 'bg-').split(' ')[0].replace('100', '400')}`}></div>
                  <div className="truncate">
                    <p className="font-medium text-slate-700 truncate">{displayItem.cargoName}</p>
                    <p className="text-[10px] text-slate-500">{displayItem.quantity} {displayItem.unit}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-slate-700">{displayItem.weight} T</p>
                </div>
              </div>
              {/* ... other items count label ... */}
              {otherItemsCount > 0 && (
                <div className="absolute -bottom-2 right-2 bg-slate-600 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white shadow-sm">
                  +{otherItemsCount} loại khác
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-4 border-2 border-dashed border-slate-100 rounded text-slate-400 text-xs">
              Trống
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {data.contents.length > 0 && (
          <div className="flex items-center gap-4 mt-1 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Layers size={14} />
              <span className="text-xs font-medium">Tổng SL: <span className="text-slate-800">{totalQuantity}</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Weight size={14} />
              <span className="text-xs font-medium">Tổng TL: <span className="text-slate-800">{data.capacityCurrent} T</span></span>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer / Progress */}
      <div className="p-[10px] pt-0 mt-auto z-10">
        <ProgressBar current={data.capacityCurrent} max={data.capacityMax} />
      </div>
    </div>
  );
};

export default YardCard;