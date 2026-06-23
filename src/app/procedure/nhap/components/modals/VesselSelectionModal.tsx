import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Check,
  ChevronDown
} from 'lucide-react';

export interface SelectionVessel {
  stt: number;
  name: string;
  inboundVoyage: string;
  outboundVoyage: string;
  eta: string;
  etd: string;
  atb: string;
  inboundLane: string;
  outboundLane: string;
}

interface VesselSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (vessel: SelectionVessel) => void;
}

const MOCK_VESSELS: SelectionVessel[] = [
  { stt: 1, name: 'HOANG DUY 03', inboundVoyage: '9999', outboundVoyage: '9999', eta: '28/02/2026 18:12:36', etd: '28/02/2026 18:12:40', atb: '28/02/2026', inboundLane: 'FHS', outboundLane: '' },
  { stt: 2, name: 'STAR TYCHE', inboundVoyage: '2555', outboundVoyage: '2555', eta: '28/02/2026 18:03:02', etd: '28/02/2026 18:03:05', atb: '28/02/2026', inboundLane: 'CMTR', outboundLane: '' },
  { stt: 3, name: 'VINHCEH', inboundVoyage: '1', outboundVoyage: '1', eta: '28/02/2026 17:59:06', etd: '28/02/2026 17:59:11', atb: '28/02/2026', inboundLane: 'CN-VN', outboundLane: '' },
  { stt: 4, name: 'VIET THUAN 095-02', inboundVoyage: '9999', outboundVoyage: '9999', eta: '28/02/2026 07:00:00', etd: '02/03/2026 07:00:00', atb: '27/02/2026', inboundLane: 'CN-VT', outboundLane: '' },
  { stt: 5, name: 'NAU2', inboundVoyage: '9999', outboundVoyage: '9999', eta: '26/02/2026 23:38:25', etd: '27/02/2026 07:00:00', atb: '26/02/2026', inboundLane: 'EKO', outboundLane: '' },
  { stt: 6, name: 'NAU1', inboundVoyage: '9999', outboundVoyage: '9999', eta: '26/02/2026 23:37:56', etd: '27/02/2026 07:00:00', atb: '26/02/2026', inboundLane: 'EKO', outboundLane: '' },
];

const VesselSelectionModal: React.FC<VesselSelectionModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVessel, setSelectedVessel] = useState<SelectionVessel | null>(null);
  const [searchName, setSearchName] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [vesselStatus, setVesselStatus] = useState<'in' | 'out'>('in');

  if (!isOpen) return null;

  const filteredVessels = MOCK_VESSELS.filter(vessel => {
    const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.inboundVoyage.includes(searchTerm) ||
      vessel.outboundVoyage.includes(searchTerm);
    const matchesFormName = searchName ? vessel.name.toLowerCase().includes(searchName.toLowerCase()) : true;
    return matchesSearch && matchesFormName;
  });

  const handleConfirm = () => {
    if (selectedVessel) {
      onSelect(selectedVessel);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[1000px] rounded-custom shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-[#3b82f6] font-bold text-lg">Danh mục tàu</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Filter Section */}
        <div className="p-4 bg-white space-y-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <label className="text-[13px] font-medium text-slate-500">Tàu</label>
              <input 
                type="text" 
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Tên tàu"
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-custom text-[13px] w-[200px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[13px] font-medium text-slate-500">Năm</label>
              <div className="relative">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none px-3 py-1.5 bg-white border border-slate-200 rounded-custom text-[13px] w-[120px] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer pr-8"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  id="den-cang" 
                  name="vessel-status-sel" 
                  checked={vesselStatus === 'in'}
                  onChange={() => setVesselStatus('in')}
                  className="text-emerald-600 focus:ring-emerald-500" 
                />
                <label htmlFor="den-cang" className="text-[13px] font-medium text-slate-600">Đến cảng</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  id="roi-cang" 
                  name="vessel-status-sel" 
                  checked={vesselStatus === 'out'}
                  onChange={() => setVesselStatus('out')}
                  className="text-emerald-600 focus:ring-emerald-500" 
                />
                <label htmlFor="roi-cang" className="text-[13px] font-medium text-slate-600">Rời cảng</label>
              </div>
            </div>
            <div className="ml-auto">
              <button className="flex items-center gap-2 px-4 py-1.5 text-[13px] font-bold text-orange-500 border border-orange-200 hover:bg-orange-50 rounded-custom transition-all">
                <Search size={14} />
                Nạp dữ liệu
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-[13px] font-medium text-slate-500">Tìm:</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[200px] pl-3 pr-8 py-1.5 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="text-[13px] font-medium text-slate-500">
              Số dòng: <span className="text-slate-800 font-bold">{filteredVessels.length}</span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto p-4 bg-slate-50">
          <div className="bg-white border border-slate-200 rounded-custom overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-[11px]">
              <thead className="sticky top-0 z-10 bg-[#cbd5e1]/50 backdrop-blur-sm">
                <tr>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-center w-12 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      STT <ChevronDown size={12} />
                    </div>
                  </th>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-left min-w-[150px] whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      Tên tàu <div className="flex flex-col"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
                    </div>
                  </th>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-left whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      Chuyến nhập <div className="flex flex-col ml-1"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
                    </div>
                  </th>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-left whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      Chuyến xuất <div className="flex flex-col ml-1"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
                    </div>
                  </th>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-left whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      ETA <div className="flex flex-col ml-1"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
                    </div>
                  </th>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-left whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      ETD <div className="flex flex-col ml-1"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
                    </div>
                  </th>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-left whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      ATB <div className="flex flex-col ml-1"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
                    </div>
                  </th>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-left whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      Lane nhập <div className="flex flex-col ml-1"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
                    </div>
                  </th>
                  <th className="p-2 border border-slate-300 text-slate-700 font-bold uppercase text-left whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      Lane xuất <div className="flex flex-col ml-1"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVessels.map((vessel) => (
                  <tr 
                    key={vessel.stt}
                    onClick={() => setSelectedVessel(vessel)}
                    className={`cursor-pointer transition-colors ${selectedVessel?.stt === vessel.stt ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}
                  >
                    <td className="p-2 border border-slate-200 text-center">{vessel.stt}</td>
                    <td className="p-2 border border-slate-200 font-medium">{vessel.name}</td>
                    <td className="p-2 border border-slate-200 text-center">{vessel.inboundVoyage}</td>
                    <td className="p-2 border border-slate-200 text-center">{vessel.outboundVoyage}</td>
                    <td className="p-2 border border-slate-200">{vessel.eta}</td>
                    <td className="p-2 border border-slate-200">{vessel.etd}</td>
                    <td className="p-2 border border-slate-200">{vessel.atb}</td>
                    <td className="p-2 border border-slate-200">{vessel.inboundLane}</td>
                    <td className="p-2 border border-slate-200">{vessel.outboundLane}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-3 bg-white">
          <button 
            onClick={handleConfirm}
            disabled={!selectedVessel}
            className={`flex items-center gap-2 px-8 py-2 text-[14px] font-bold text-white rounded-custom shadow-sm transition-all ${selectedVessel ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-300 cursor-not-allowed'}`}
          >
            <Check size={18} />
            Xác nhận
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-8 py-2 text-[14px] font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-custom shadow-sm transition-all"
          >
            <X size={18} />
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default VesselSelectionModal;
