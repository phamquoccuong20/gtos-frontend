import React, { useState } from 'react';
import { Search, X, RefreshCw, Check } from 'lucide-react';

export interface Vessel {
  stt: number;
  name: string;
  voyageIn: string;
  voyageOut: string;
  eta: string;
  etd: string;
  laneIn: string;
  laneOut: string;
}

const MOCK_VESSELS: Vessel[] = [
  { stt: 1, name: 'BMST', voyageIn: '1302', voyageOut: '1302', eta: '13/02/2026 11:30:28', etd: '13/02/2026 11:30:32', laneIn: 'CMC', laneOut: '' },
  { stt: 2, name: 'TÀU HOÀNG DUY 67', voyageIn: '9999', voyageOut: '9999', eta: '12/02/2026 11:26:57', etd: '12/02/2026 11:27:01', laneIn: 'CMTR', laneOut: '' },
  { stt: 3, name: 'PABELA', voyageIn: '1111', voyageOut: '1111', eta: '10/02/2026 16:24:16', etd: '10/02/2026 16:24:18', laneIn: 'CZ', laneOut: '' },
  { stt: 4, name: 'TRUNG THANG 568', voyageIn: '9999', voyageOut: '9999', eta: '10/02/2026 10:00:00', etd: '11/02/2026 20:00:00', laneIn: 'FHS', laneOut: '' },
  { stt: 5, name: 'TAU HOANG DUY 36', voyageIn: '400', voyageOut: '400', eta: '09/02/2026 00:00:00', etd: '12/02/2026 00:00:00', laneIn: 'CN-VN', laneOut: '' },
  { stt: 6, name: 'DINH GIA 79', voyageIn: '9999', voyageOut: '9999', eta: '06/02/2026 13:00:00', etd: '08/02/2026 23:00:00', laneIn: 'FHS', laneOut: '' },
];

interface VesselSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (vessel: Vessel) => void;
}

const VesselSearchModal: React.FC<VesselSearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [searchName, setSearchName] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [vesselStatus, setVesselStatus] = useState<'in' | 'out'>('in');

  if (!isOpen) return null;

  const filteredVessels = MOCK_VESSELS.filter(vessel => {
    const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.voyageIn.includes(searchTerm) ||
      vessel.voyageOut.includes(searchTerm);
    const matchesFormName = searchName ? vessel.name.toLowerCase().includes(searchName.toLowerCase()) : true;
    return matchesSearch && matchesFormName;
  });

  const handleSelect = () => {
    if (selectedVessel) {
      onSelect(selectedVessel);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-custom shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-blue-800">Danh mục tàu</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-custom transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Search Form */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-3 space-y-1">
              <label className="text-[12px] font-bold text-slate-500">Tàu</label>
              <input 
                type="text" 
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Tên tàu"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-[12px] font-bold text-slate-500">Năm</label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div className="md:col-span-4 flex items-center gap-6 pb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="vesselStatus" 
                  checked={vesselStatus === 'in'}
                  onChange={() => setVesselStatus('in')}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-[13px] font-medium text-slate-700">Đến cảng</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="vesselStatus" 
                  checked={vesselStatus === 'out'}
                  onChange={() => setVesselStatus('out')}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-[13px] font-medium text-slate-700">Rời cảng</span>
              </label>
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-orange-600 border border-orange-200 hover:bg-orange-50 rounded-custom transition-all">
                <RefreshCw size={16} />
                Nạp dữ liệu
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-3 flex-1 max-w-sm">
              <label className="text-[12px] font-bold text-slate-500 shrink-0">Tìm:</label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="text-[12px] font-bold text-slate-500">
              Số dòng: <span className="text-blue-600">{filteredVessels.length}</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto border-t border-slate-200">
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 z-10 bg-blue-50">
              <tr>
                <th className="p-2 border border-slate-200 text-blue-800 font-bold uppercase text-center w-12">STT</th>
                <th className="p-2 border border-slate-200 text-blue-800 font-bold uppercase text-left min-w-[150px]">Tên tàu</th>
                <th className="p-2 border border-slate-200 text-blue-800 font-bold uppercase text-left min-w-[100px]">Chuyến nhập</th>
                <th className="p-2 border border-slate-200 text-blue-800 font-bold uppercase text-left min-w-[100px]">Chuyến xuất</th>
                <th className="p-2 border border-slate-200 text-blue-800 font-bold uppercase text-left min-w-[150px]">ETA</th>
                <th className="p-2 border border-slate-200 text-blue-800 font-bold uppercase text-left min-w-[150px]">ETD</th>
                <th className="p-2 border border-slate-200 text-blue-800 font-bold uppercase text-left min-w-[100px]">Lane nhập</th>
                <th className="p-2 border border-slate-200 text-blue-800 font-bold uppercase text-left min-w-[100px]">Lane xuất</th>
              </tr>
            </thead>
            <tbody>
              {filteredVessels.map((vessel) => (
                <tr 
                  key={vessel.stt} 
                  className={`cursor-pointer transition-colors group ${
                    selectedVessel?.stt === vessel.stt ? 'bg-blue-100' : 'bg-white hover:bg-blue-50'
                  }`}
                  onClick={() => setSelectedVessel(vessel)}
                >
                  <td className="p-2 border border-slate-100 text-center text-slate-600">{vessel.stt}</td>
                  <td className="p-2 border border-slate-100 font-bold text-slate-800">{vessel.name}</td>
                  <td className="p-2 border border-slate-100 text-center text-slate-600">{vessel.voyageIn}</td>
                  <td className="p-2 border border-slate-100 text-center text-slate-600">{vessel.voyageOut}</td>
                  <td className="p-2 border border-slate-100 text-slate-600">{vessel.eta}</td>
                  <td className="p-2 border border-slate-100 text-slate-600">{vessel.etd}</td>
                  <td className="p-2 border border-slate-100 text-center text-slate-600">{vessel.laneIn}</td>
                  <td className="p-2 border border-slate-100 text-center text-slate-600">{vessel.laneOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-3 bg-slate-50/50">
          <button 
            onClick={handleSelect}
            disabled={!selectedVessel}
            className={`flex items-center gap-2 px-6 py-2 font-bold rounded-custom transition-all shadow-md ${
              selectedVessel ? 'bg-cyan-600 hover:bg-cyan-700 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check size={18} />
            Xác nhận
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2 bg-rose-500 text-white font-bold rounded-custom hover:bg-rose-600 transition-all shadow-md"
          >
            <X size={18} />
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default VesselSearchModal;
