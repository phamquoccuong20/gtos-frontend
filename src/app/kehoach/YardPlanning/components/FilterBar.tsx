import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { FilterState, Vessel } from '../types';
import { Ship, ChevronDown, Search } from './Icons';

interface FilterBarProps {
  vessels: Vessel[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onOpenVesselModal: () => void;
  availableHatches: string[]; // New prop for dynamic hatches
}

const FilterBar: React.FC<FilterBarProps> = ({ vessels, filters, setFilters, onOpenVesselModal, availableHatches }) => {
  // Find selected vessel for display
  const selectedVessel = vessels.find(v => v.id === filters.vesselId);

  return (
    <div className="bg-white rounded shadow-sm border border-slate-200 p-[14px] mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[14px]">

        {/* Vessel Selector (Read-only Input + Search Button) */}
        <div className="md:col-span-4 relative group">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Tàu chuyển
          </label>
          <div className="flex w-full shadow-sm rounded">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                <Ship size={18} />
              </div>
              <input
                type="text"
                readOnly
                onClick={onOpenVesselModal}
                value={selectedVessel ? `${selectedVessel.name} | ${selectedVessel.inboundVoy} | ${selectedVessel.outboundVoy} | ${selectedVessel.ata ? selectedVessel.ata.split(' ')[0] : '--'}` : ''}
                placeholder="Nhấn để chọn tàu..."
                className={`w-full pl-10 pr-4 py-2 rounded-l border border-r-0 outline-none cursor-pointer transition-all truncate
                  ${selectedVessel
                    ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold'
                    : 'border-slate-300 bg-white text-slate-500 hover:border-blue-400'
                  }`}
              />
            </div>

            {/* Merged Search Button */}
            <button
              onClick={onOpenVesselModal}
              className="px-5 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 border border-blue-600 transition-colors flex items-center justify-center"
              title="Tìm kiếm tàu"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Dependent Filters */}
        <div className={`md:col-span-3 transition-opacity duration-300 ${!filters.vesselId ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Loại hàng hóa
          </label>
          <div className="relative">
            <select
              disabled={!filters.vesselId}
              className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none"
            >
              <option value="">Tất cả hàng hóa</option>
              <option value="steel">Sắt thép</option>
              <option value="general">Hàng bách hóa</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className={`md:col-span-2 transition-opacity duration-300 ${!filters.vesselId ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Hầm
          </label>
          <div className="relative">
            <select
              disabled={!filters.vesselId}
              value={filters.hatch || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, hatch: e.target.value }))}
              className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none"
            >
              <option value="">Chọn hầm</option>
              {availableHatches.map(hatch => (
                <option key={hatch} value={hatch}>{hatch}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Khoảng thời gian
          </label>
          <div className="relative">
            <DatePicker.RangePicker
              value={[
                filters.dateRange.start ? dayjs(filters.dateRange.start) : null,
                filters.dateRange.end ? dayjs(filters.dateRange.end) : null,
              ]}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={(dates) => {
                setFilters((prev) => ({
                  ...prev,
                  dateRange: {
                    start: dates && dates[0] ? dates[0].format('YYYY-MM-DD HH:mm') : '',
                    end: dates && dates[1] ? dates[1].format('YYYY-MM-DD HH:mm') : '',
                  },
                }));
              }}
              className="w-full py-2 rounded border-slate-200 hover:border-blue-400 focus:border-blue-500"
              style={{ height: '38px', borderColor: '#e2e8f0' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;