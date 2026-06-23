import React from 'react';
import { ProcessGroup } from '../types';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface ProcessCardProps {
  group: ProcessGroup;
  onItemClick: (label: string) => void;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ group, onItemClick }) => {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-custom overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-blue-300 flex flex-col h-full group/card">
      {/* Group Header - Simplified with only Text and Chevron */}
      <div className={`${group.color} p-[14px] flex items-center justify-between relative`}>
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 relative z-10">
          <h3 className="text-white font-black text-[13px] uppercase tracking-widest">
            {group.title}
          </h3>
        </div>
        
        <div className="bg-white/20 p-1 rounded-custom group-hover/card:bg-white/40 transition-all relative z-10 shadow-sm border border-white/10">
           <ChevronRight size={14} className="text-white" />
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 bg-white">
        <div className="flex flex-col">
          {group.items.map((item, index) => (
            <button 
              key={index}
              onClick={() => onItemClick(item.label)}
              className="group flex items-center gap-3 p-[14px] transition-all hover:bg-slate-50 border-b border-[#f3f4f6] last:border-0 relative text-left w-full"
            >
              {/* Subtle Indicator bar that appears on hover */}
              <div className="absolute left-0 w-1 h-0 bg-blue-600 transition-all group-hover:h-full top-0"></div>

              {/* Icon Container - Scaled down slightly to match smaller height */}
              <div className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-custom text-slate-400 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-200 group-hover:shadow-sm transition-all shrink-0">
                {React.cloneElement(item.icon as any, { size: 16 })}
              </div>
              
              {/* Label */}
              <div className="flex flex-col flex-1">
                <span className="text-[13px] font-bold text-[#334155] leading-tight group-hover:text-blue-700 transition-colors">
                  {item.label}
                </span>
              </div>

              {/* Action Indicator */}
              <div className="text-[#cbd5e1] group-hover:text-blue-500 transition-all transform group-hover:translate-x-1">
                {item.isExternal ? (
                  <ExternalLink size={12} />
                ) : (
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;
