import React, { useState } from 'react';
import { X, Search, RotateCcw, ChevronDown, Check } from 'lucide-react';

interface BargeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (barge: any) => void;
}

const MOCK_BARGES = [
  { id: 1, code: 'SLKN', name: 'SÀ LAN KIM NGỌC', inbound: '111', outbound: '111' },
  { id: 2, code: 'SG96', name: 'SG9678', inbound: 'N001', outbound: 'N001' },
  { id: 3, code: 'HP02', name: 'HIEP PHUOC 02', inbound: '0403', outbound: '0403' },
  { id: 4, code: 'SLHD', name: 'SÀ LAN HOÀNG DUY', inbound: '333', outbound: '333' },
  { id: 5, code: 'SL11', name: 'SL11', inbound: '1', outbound: '1' },
  { id: 6, code: 'SG01', name: 'SAI GON 01', inbound: '101', outbound: '101' },
  { id: 7, code: 'HP01', name: 'HIEP PHUOC 01', inbound: '202', outbound: '202' },
];

export const BargeSelectionModal: React.FC<BargeSelectionModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredBarges = MOCK_BARGES.filter(barge => 
    barge.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    barge.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirm = () => {
    const selected = MOCK_BARGES.find(b => b.id === selectedId);
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[900px] rounded-custom shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-[#3b82f6] font-bold text-lg">Danh mục sà lan</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-500 text-amber-600 rounded-custom text-[12px] font-bold hover:bg-amber-50 transition-all">
              <RotateCcw size={16} />
              Nạp dữ liệu
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold text-slate-500">Tìm:</span>
            <div className="relative w-[250px]">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-3 pr-8 border border-slate-200 rounded-custom text-[12px] focus:outline-none focus:border-cyan-500"
                placeholder="Nhập mã hoặc tên sà lan..."
              />
              <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <span className="text-[12px] font-bold text-slate-600">Số dòng: {filteredBarges.length}</span>
        </div>

        {/* Table */}
        <div className="px-4 pb-4 flex-1 overflow-auto max-h-[400px]">
          <div className="border border-slate-200 rounded-custom overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#e2e8f0]">
                  <th className="px-3 py-2 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300 w-12">
                    <div className="flex items-center gap-1">STT <ChevronDown size={12} /></div>
                  </th>
                  <th className="px-4 py-2 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                    <div className="flex items-center justify-between">Mã sà lan <ChevronDown size={12} /></div>
                  </th>
                  <th className="px-4 py-2 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                    <div className="flex items-center justify-between">Tên sà lan <ChevronDown size={12} /></div>
                  </th>
                  <th className="px-4 py-2 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                    <div className="flex items-center justify-between">Chuyến nhập <ChevronDown size={12} /></div>
                  </th>
                  <th className="px-4 py-2 text-left text-[11px] font-bold text-slate-700">
                    <div className="flex items-center justify-between">Chuyến xuất <ChevronDown size={12} /></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBarges.map((barge, idx) => (
                  <tr 
                    key={barge.id}
                    onClick={() => setSelectedId(barge.id)}
                    onDoubleClick={() => {
                      onSelect(barge);
                      onClose();
                    }}
                    className={`border-b border-slate-200 cursor-pointer transition-colors ${
                      selectedId === barge.id ? 'bg-cyan-50' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'
                    } hover:bg-slate-100`}
                  >
                    <td className="px-3 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">{idx + 1}</td>
                    <td className="px-4 py-2 text-[12px] font-bold text-slate-700 border-r border-slate-200">{barge.code}</td>
                    <td className="px-4 py-2 text-[12px] text-slate-600 border-r border-slate-200 uppercase">{barge.name}</td>
                    <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">{barge.inbound}</td>
                    <td className="px-4 py-2 text-[12px] text-center text-slate-600">{barge.outbound}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-3 bg-slate-50/50">
          <button 
            onClick={handleConfirm}
            disabled={!selectedId}
            className={`flex items-center gap-2 px-8 py-2 rounded-custom text-[14px] font-bold transition-all shadow-sm ${
              selectedId ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-slate-300 text-white cursor-not-allowed'
            }`}
          >
            <Check size={18} />
            Xác nhận
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-8 py-2 bg-orange-500 text-white rounded-custom text-[14px] font-bold hover:bg-orange-600 transition-all shadow-sm"
          >
            <X size={18} />
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BargeSelectionModal;
