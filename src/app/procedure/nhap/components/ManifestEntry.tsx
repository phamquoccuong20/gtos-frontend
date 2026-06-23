import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Save, 
  Trash2, 
  FileSpreadsheet, 
  Download, 
  ChevronLeft,
  Filter,
  X,
  RefreshCw
} from 'lucide-react';
import VesselSearchModal, { Vessel } from './modals/VesselSearchModal';
import ManifestTable from './tables/ManifestTable';

interface ManifestEntryProps {
  onBack: () => void;
}

const ManifestEntry: React.FC<ManifestEntryProps> = ({ onBack }) => {
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [isAddRowsModalOpen, setIsAddRowsModalOpen] = useState(false);
  const [numRowsToAdd, setNumRowsToAdd] = useState<number>(1);
  const [rows, setRows] = useState<any[]>([]);
  const [selectedVessel, setSelectedVessel] = useState<string>('');
  const [eta, setEta] = useState<string>('');
  const [etd, setEtd] = useState<string>('');
  const [vesselType, setVesselType] = useState<'Nhập tàu' | 'Xuất tàu'>('Nhập tàu');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectVessel = (vessel: Vessel) => {
    setSelectedVessel(`${vessel.name} | ${vessel.voyageIn} | ${vessel.voyageOut} | ${vessel.eta}`);
    setEta(vessel.eta || '');
    setEtd(vessel.etd || '');
    setIsVesselModalOpen(false);
  };

  const handleAddRows = () => {
    const newRows = Array.from({ length: numRowsToAdd }, (_, i) => ({
      id: Date.now() + i,
      stt: rows.length + i + 1,
      bl: '',
      mark: '',
      consignee: '',
      cargoType: '',
      unit: '',
      qty: '',
      pcs: '',
      weight: '',
      avg: '',
      hold: '',
      domesticForeign: '',
      pol: '',
      pod: '',
      fpod: '',
      type: '',
      note: ''
    }));
    setRows([...rows, ...newRows]);
    setIsAddRowsModalOpen(false);
    setNumRowsToAdd(1);
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setRows(prevRows => prevRows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  const handleDeleteLastRow = () => {
    if (rows.length > 0) {
      setRows(rows.slice(0, -1));
    }
  };

  const handleClearAllRows = () => {
    setRows([]);
  };

  const filteredRows = rows.filter(row => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (row.bl && row.bl.toLowerCase().includes(term)) ||
      (row.consignee && row.consignee.toLowerCase().includes(term)) ||
      (row.mark && row.mark.toLowerCase().includes(term)) ||
      (row.cargoType && row.cargoType.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
      {/* Vessel Search Modal */}
      <VesselSearchModal 
        isOpen={isVesselModalOpen} 
        onClose={() => setIsVesselModalOpen(false)}
        onSelect={handleSelectVessel}
      />

      {/* Add Rows Modal */}
      {isAddRowsModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-custom shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-md font-bold text-slate-800">Thêm dòng mới</h3>
              <button onClick={() => setIsAddRowsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-custom transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600">Số lượng dòng cần thêm:</label>
                <input 
                  type="number" 
                  min="1"
                  max="100"
                  value={numRowsToAdd}
                  onChange={(e) => setNumRowsToAdd(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-custom text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-2 bg-slate-50/30">
              <button 
                onClick={() => setIsAddRowsModalOpen(false)}
                className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-100 rounded-custom transition-all"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={handleAddRows}
                className="px-6 py-2 text-[13px] font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-custom shadow-md transition-all"
              >
                Thêm ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="border-b border-gray-200 p-[14px] flex flex-col xl:flex-row xl:items-center justify-between bg-slate-50/50 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-custom transition-all text-slate-600"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
            Nhập liệu - Hàng tổng hợp / Manifest
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold text-blue-600 hover:bg-blue-50 rounded-custom transition-colors">
            <Download size={14} />
            TẢI TỆP MẪU
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold bg-orange-500 text-white hover:bg-orange-600 rounded-custom shadow-sm transition-all">
            <RefreshCw size={14} />
            NẠP DỮ LIỆU
          </button>
          <button 
            onClick={() => setIsAddRowsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-custom shadow-sm transition-all"
          >
            <Plus size={14} />
            THÊM DÒNG
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-custom shadow-sm transition-all">
            <Save size={14} />
            LƯU
          </button>
          <button 
            onClick={handleDeleteLastRow}
            className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold bg-rose-500 text-white hover:bg-rose-600 rounded-custom shadow-sm transition-all"
          >
            <Trash2 size={14} />
            XÓA DÒNG
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold bg-cyan-600 text-white hover:bg-cyan-700 rounded-custom shadow-sm transition-all">
            <FileSpreadsheet size={14} />
            NẠP FILE EXCEL
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-[14px] border-b border-gray-100 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">THÔNG TIN TÀU:</label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={selectedVessel}
                  onChange={(e) => setSelectedVessel(e.target.value)}
                  placeholder="Tên tàu | Chuyến nhập | Chuyến xuất"
                  className="w-full pl-3 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] placeholder:text-slate-500 placeholder:font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400 border-l border-slate-200 pl-2">
                  <Search 
                    size={14} 
                    className="cursor-pointer hover:text-blue-500 transition-colors" 
                    onClick={() => setIsVesselModalOpen(true)}
                  />
                  <X 
                    size={14} 
                    className="cursor-pointer hover:text-rose-500 transition-colors" 
                    onClick={() => {
                      setSelectedVessel('');
                      setEta('');
                      setEtd('');
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">ETA:</label>
              <input 
                type="text" 
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                placeholder="ETA"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] placeholder:text-slate-500 placeholder:font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">NHẬP TÀU:</label>
              <select 
                value={vesselType}
                onChange={(e) => setVesselType(e.target.value as 'Nhập tàu' | 'Xuất tàu')}
                disabled={!selectedVessel}
                className={`flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none ${!selectedVessel ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <option>Nhập tàu</option>
                <option>Xuất tàu</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">ETD:</label>
              <input 
                type="text" 
                value={etd}
                onChange={(e) => setEtd(e.target.value)}
                placeholder="ETD"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] placeholder:text-slate-500 placeholder:font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">LOẠI HÀNG:</label>
              <select className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer">
                <option>-- Tất cả --</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">NỘI/NGOẠI:</label>
              <select className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer">
                <option>-- Tất cả --</option>
                <option>Nội</option>
                <option>Ngoại</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Stats Section */}
      <div className="p-[14px] flex items-center justify-between bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 flex-1 max-w-[300px]">
          <label className="text-[12px] font-bold text-slate-500 shrink-0">TÌM:</label>
          <div className="relative flex-1">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full pl-3 pr-10 py-1.5 bg-white border border-slate-200 rounded-custom text-[13px] placeholder:text-slate-500 placeholder:font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleAddRows()}
              className="px-3 py-1.5 text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-custom transition-all flex items-center gap-1"
            >
              <Filter size={12} />
              THÊM 1 DÒNG NHANH
            </button>
            <button 
              onClick={handleClearAllRows}
              disabled={rows.length === 0}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-custom flex items-center gap-1 ${
                rows.length > 0 
                  ? 'text-rose-600 bg-rose-50 hover:bg-rose-100' 
                  : 'text-slate-400 bg-slate-50 cursor-not-allowed'
              }`}
            >
              <X size={12} />
              XÓA HẾT
            </button>
          </div>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <span className="text-[12px] font-bold text-slate-500">
            SỐ DÒNG: <span className="text-blue-600">{filteredRows.length}</span>
          </span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 overflow-hidden bg-slate-50 p-[14px]">
        <ManifestTable 
          rows={filteredRows}
          vesselType={vesselType}
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ManifestEntry;
