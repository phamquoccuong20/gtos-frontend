
import React from 'react';
import { Ship } from '../types';
import { Icons } from '../constants';

interface ShipTableProps {
  filteredShips: Ship[];
  selectedShipIds: Set<string>;
  selectedShip: Ship | null;
  toggleSelectAll: () => void;
  toggleSelectShip: (e: React.MouseEvent, id: string) => void;
  handleEdit: (ship: Ship) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SortIcon = () => (
  <svg className="w-3 h-3 text-blue-500/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 15l5 5 5-5" /><path d="M7 9l5-5 5 5" />
  </svg>
);

export const ShipTable: React.FC<ShipTableProps> = ({
  filteredShips,
  selectedShipIds,
  selectedShip,
  toggleSelectAll,
  toggleSelectShip,
  handleEdit,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="border border-slate-200 rounded-[4px] overflow-hidden flex flex-col flex-1 min-h-0 bg-white">
      <div className="p-[14px] border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shrink-0">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <span className="text-xs font-bold text-slate-400 uppercase">Tìm:</span>
          <div className="relative flex-1">
            <span className="absolute right-3 top-2.5 text-slate-400"><Icons.Search /></span>
            <input 
              type="text" 
              placeholder="Tìm kiếm nhanh..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pr-10 pl-[14px] py-2 border border-slate-200 rounded-[4px] bg-slate-50 text-sm focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase text-slate-400">
           <span className="text-slate-600">Số dòng: <strong className="text-blue-600 text-sm">{filteredShips.length}</strong></span>
        </div>
      </div>

      <div className="overflow-auto relative h-full">
        <table className="w-full text-left border-separate border-spacing-0 min-w-[1600px]">
          <thead className="bg-[#d0ebff] text-[#1971c2] text-[11px] font-bold uppercase sticky top-0 z-30 shadow-sm">
            <tr>
              <th className="p-2 border-b border-r border-blue-200/50 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  checked={filteredShips.length > 0 && selectedShipIds.size === filteredShips.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-2 border-b border-r border-blue-200/50 w-16 text-center whitespace-nowrap">STT</th>
              <th className="p-2 border-b border-r border-blue-200/50 w-32 whitespace-nowrap">
                <div className="flex items-center gap-1">Mã tàu <SortIcon /></div>
              </th>
              <th className="p-2 border-b border-r border-blue-200/50 w-64 whitespace-nowrap">
                <div className="flex items-center gap-1">Tên tàu <SortIcon /></div>
              </th>
              <th className="p-2 border-b border-r border-blue-200/50 w-36 whitespace-nowrap">
                <div className="flex items-center gap-1">Loại tàu <SortIcon /></div>
              </th>
              <th className="p-2 border-b border-r border-blue-200/50 w-56 whitespace-nowrap">
                <div className="flex items-center gap-1">Quốc gia <SortIcon /></div>
              </th>
              <th className="p-2 border-b border-r border-blue-200/50 w-32 whitespace-nowrap">
                <div className="flex items-center gap-1">Call Sign <SortIcon /></div>
              </th>
              <th className="p-2 border-b border-r border-blue-200/50 w-32 whitespace-nowrap">
                <div className="flex items-center gap-1">IMO <SortIcon /></div>
              </th>
              <th className="p-2 border-b border-r border-blue-200/50 w-24 text-center whitespace-nowrap">LOA</th>
              <th className="p-2 border-b border-r border-blue-200/50 w-24 text-center whitespace-nowrap">Max Beam</th>
              <th className="p-2 border-b border-r border-blue-200/50 w-24 text-center whitespace-nowrap">Độ sâu</th>
              <th className="p-2 border-b border-r border-blue-200/50 w-24 text-center whitespace-nowrap">Số hầm</th>
              <th className="p-2 border-b border-r border-blue-200/50 w-24 text-center whitespace-nowrap">GRT</th>
              <th className="p-2 border-b w-32 text-center whitespace-nowrap">DWT</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredShips.length > 0 ? (
              filteredShips.map((ship, index) => (
                <tr 
                  key={ship.id} 
                  onClick={() => handleEdit(ship)}
                  className={`group cursor-pointer transition-colors ${selectedShipIds.has(ship.id) ? 'bg-emerald-50/50' : 'hover:bg-slate-50/80'} ${selectedShip?.id === ship.id ? 'bg-blue-100/30 ring-1 ring-inset ring-blue-200' : ''}`}
                >
                  <td className="p-[14px] border-b border-r border-slate-100 text-center">
                     <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        checked={selectedShipIds.has(ship.id)}
                        onClick={(e) => toggleSelectShip(e, ship.id)}
                        onChange={() => {}}
                     />
                  </td>
                  <td className="p-[14px] text-xs text-center text-slate-400 border-b border-r border-slate-100">{index + 1}</td>
                  <td className="p-[14px] text-xs font-bold text-blue-700 border-b border-r border-slate-100">{ship.code}</td>
                  <td className="p-[14px] text-xs font-semibold text-slate-700 border-b border-r border-slate-100">{ship.name}</td>
                  
                  <td className="p-[14px] text-xs text-slate-600 border-b border-r border-slate-100">{ship.type}</td>
                  <td className="p-[14px] text-xs text-slate-600 border-b border-r border-slate-100 truncate max-w-[200px]" title={ship.nationality}>{ship.nationality}</td>
                  <td className="p-[14px] text-xs text-slate-600 border-b border-r border-slate-100">{ship.callSign}</td>
                  <td className="p-[14px] text-xs text-slate-500 italic border-b border-r border-slate-100">{ship.imo}</td>
                  <td className="p-[14px] text-xs text-slate-600 border-b border-r border-slate-100 text-center">{ship.loa}</td>
                  <td className="p-[14px] text-xs text-slate-600 border-b border-r border-slate-100 text-center">{ship.maxBeam}</td>
                  <td className="p-[14px] text-xs text-slate-600 border-b border-r border-slate-100 text-center">{ship.depth}</td>
                  <td className="p-[14px] text-xs text-slate-600 border-b border-r border-slate-100 text-center">{ship.holds}</td>
                  <td className="p-[14px] text-xs text-slate-600 border-b border-r border-slate-100 text-center">{Number(ship.grt).toLocaleString()}</td>
                  <td className="p-[14px] text-xs text-slate-600 border-b text-center overflow-hidden">{Number(ship.dwt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={14} className="p-[40px] text-center text-slate-400 italic text-sm bg-slate-50/30">
                  Không tìm thấy dữ liệu tàu phù hợp...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
