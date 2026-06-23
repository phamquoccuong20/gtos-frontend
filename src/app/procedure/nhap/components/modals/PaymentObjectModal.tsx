import React, { useState } from 'react';
import { Search, X, Check, ChevronLeft } from 'lucide-react';

export interface PaymentObject {
  stt: number;
  maDT: string;
  mst: string;
  ten: string;
  diaChi: string;
  httt: string;
}

interface PaymentObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (obj: PaymentObject) => void;
}

const MOCK_PAYMENT_OBJECTS: PaymentObject[] = [
  {
    stt: 1,
    maDT: '.',
    mst: '0316055069',
    ten: 'CONG TY TNHH TU VAN DAO TAO PHAT TRIEN NGUON NHAN LUC T&D',
    diaChi: '965/16/23Q QUANG TRUNG, P14, GÒ VẤP, TPHCM',
    httt: 'THU SAU'
  },
  {
    stt: 2,
    maDT: '0302456789',
    mst: '0302456789',
    ten: 'cty tnhh i log',
    diaChi: '',
    httt: 'THU SAU'
  },
  {
    stt: 3,
    maDT: '0314314303',
    mst: '0314314303',
    ten: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam',
    diaChi: '23/15/16 Đường 16 Nối dài, Phường 4, Quận 8, TP.HCM Việt Nam.',
    httt: 'THU SAU'
  },
  {
    stt: 4,
    maDT: '0314315681',
    mst: '0314315681',
    ten: 'Công Ty TNHH An Tín Shipping',
    diaChi: '69/21 Trần Đình Xu, Phường Cầu Kho, Quận 1, TP.Hồ Chí Minh',
    httt: 'THU SAU'
  },
  {
    stt: 5,
    maDT: '0314315682',
    mst: '0314315682',
    ten: 'Công Ty TNHH Vận Tải Biển ABC',
    diaChi: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    httt: 'THU SAU'
  },
  {
    stt: 6,
    maDT: '0314315683',
    mst: '0314315683',
    ten: 'Công Ty Cổ Phần Giao Nhận Toàn Cầu',
    diaChi: '456 Lê Lợi, Quận 1, TP.HCM',
    httt: 'THU SAU'
  },
  {
    stt: 7,
    maDT: '0314315684',
    mst: '0314315684',
    ten: 'Công Ty TNHH Dịch Vụ Cảng Biển Việt',
    diaChi: '789 Tôn Đức Thắng, Quận 1, TP.HCM',
    httt: 'THU SAU'
  },
  {
    stt: 8,
    maDT: '0314315685',
    mst: '0314315685',
    ten: 'Công Ty TNHH Logistics Sao Việt',
    diaChi: '101 Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM',
    httt: 'THU SAU'
  },
  {
    stt: 9,
    maDT: '0314315686',
    mst: '0314315686',
    ten: 'Công Ty TNHH Vận Tải Đa Phương Thức',
    diaChi: '202 Võ Văn Kiệt, Quận 1, TP.HCM',
    httt: 'THU SAU'
  },
  {
    stt: 10,
    maDT: '0314315687',
    mst: '0314315687',
    ten: 'Công Ty TNHH Tiếp Vận Đại Dương',
    diaChi: '303 Nguyễn Tất Thành, Quận 4, TP.HCM',
    httt: 'THU SAU'
  }
];

const PaymentObjectModal: React.FC<PaymentObjectModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredObjects = MOCK_PAYMENT_OBJECTS.filter(obj => 
    obj.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obj.mst.includes(searchTerm) ||
    obj.maDT.includes(searchTerm)
  );

  const handleSelect = () => {
    const selected = MOCK_PAYMENT_OBJECTS.find(obj => obj.stt === selectedId);
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-custom shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
          <h3 className="text-[15px] font-semibold text-blue-800">Chọn đối tượng thanh toán</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <label className="text-[12px] text-slate-600 whitespace-nowrap">Tìm:</label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-10 py-1 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="text-[12px] text-slate-500">
              Số dòng: <span className="text-slate-900 font-medium">{filteredObjects.length.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto custom-scrollbar px-4 pb-4">
          <div className="border border-slate-300 rounded-sm overflow-hidden">
            <table className="w-full border-collapse text-[12px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#e2e8f0] border-b border-slate-300">
                  <th className="p-2 border-r border-slate-300 text-[#1e40af] font-bold uppercase text-center w-12">
                    <div className="flex items-center justify-center gap-1">
                      STT <div className="flex flex-col scale-75 opacity-50"><ChevronLeft size={10} className="rotate-90 -mb-1" /><ChevronLeft size={10} className="-rotate-90" /></div>
                    </div>
                  </th>
                  <th className="p-2 border-r border-slate-300 text-[#1e40af] font-bold uppercase text-center w-24">
                    <div className="flex items-center justify-center gap-1">
                      Mã ĐT <div className="flex flex-col scale-75 opacity-50"><ChevronLeft size={10} className="rotate-90 -mb-1" /><ChevronLeft size={10} className="-rotate-90" /></div>
                    </div>
                  </th>
                  <th className="p-2 border-r border-slate-300 text-[#1e40af] font-bold uppercase text-center w-32">
                    <div className="flex items-center justify-center gap-1">
                      MST <div className="flex flex-col scale-75 opacity-50"><ChevronLeft size={10} className="rotate-90 -mb-1" /><ChevronLeft size={10} className="-rotate-90" /></div>
                    </div>
                  </th>
                  <th className="p-2 border-r border-slate-300 text-[#1e40af] font-bold uppercase text-left">
                    <div className="flex items-center gap-1">
                      Tên <div className="flex flex-col scale-75 opacity-50"><ChevronLeft size={10} className="rotate-90 -mb-1" /><ChevronLeft size={10} className="-rotate-90" /></div>
                    </div>
                  </th>
                  <th className="p-2 border-r border-slate-300 text-[#1e40af] font-bold uppercase text-left">
                    <div className="flex items-center gap-1">
                      Địa Chỉ <div className="flex flex-col scale-75 opacity-50"><ChevronLeft size={10} className="rotate-90 -mb-1" /><ChevronLeft size={10} className="-rotate-90" /></div>
                    </div>
                  </th>
                  <th className="p-2 text-[#1e40af] font-bold uppercase text-center w-24">
                    <div className="flex items-center justify-center gap-1">
                      HTTT <div className="flex flex-col scale-75 opacity-50"><ChevronLeft size={10} className="rotate-90 -mb-1" /><ChevronLeft size={10} className="-rotate-90" /></div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredObjects.map((obj) => (
                  <tr 
                    key={obj.stt}
                    onClick={() => setSelectedId(obj.stt)}
                    className={`border-b border-slate-200 last:border-0 cursor-pointer transition-colors ${
                      selectedId === obj.stt ? 'bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-2 border-r border-slate-200 text-center text-slate-600">{obj.stt}</td>
                    <td className="p-2 border-r border-slate-200 text-center text-slate-600">{obj.maDT}</td>
                    <td className="p-2 border-r border-slate-200 text-center text-slate-600">{obj.mst}</td>
                    <td className="p-2 border-r border-slate-200 text-slate-700 font-medium whitespace-normal min-w-[250px]">{obj.ten}</td>
                    <td className="p-2 border-r border-slate-200 text-slate-500 whitespace-normal min-w-[300px]">{obj.diaChi}</td>
                    <td className="p-2 text-center text-slate-600">{obj.httt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 flex justify-end gap-2 bg-white">
          <button 
            onClick={handleSelect}
            disabled={selectedId === null}
            className={`flex items-center gap-2 px-4 py-1 rounded-custom text-[12px] font-medium transition-all ${
              selectedId !== null 
                ? 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50' 
                : 'bg-slate-50 border border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check size={14} className="text-blue-600" /> Chọn
          </button>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-1 bg-white border border-slate-300 text-slate-600 rounded-custom text-[12px] font-medium hover:bg-slate-50 transition-all"
          >
            <X size={14} /> Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentObjectModal;
