import React, { useState } from 'react';
import { Search, X, Check, Plus } from 'lucide-react';

interface CustomerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (customer: any) => void;
}

const mockCustomers = [
  { id: 1, code: '.', mst: '0316055069', name: 'CONG TY TNHH TU VAN DAO TAO PHAT TRIEN NGUON NHAN LUC T&D', address: '965/16/23Q QUANG TRUNG, P14, GÒ VẤP, TPHCM', httt: 'THU SAU', paymentTypeId: 'CRE' },
  { id: 2, code: '0302456789', mst: '0302456789', name: 'cty tnhh i log', address: '', httt: 'THU SAU', paymentTypeId: 'CRE' },
  { id: 3, code: '0314314303', mst: '0314314303', name: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam', address: '23/15/16 Đường 16 Nối dài, Phường 4, Quận 8, TP.HCM Việt Nam', httt: 'THU SAU', paymentTypeId: 'CRE' },
  { id: 4, code: '0314315681', mst: '0314315681', name: 'Công Ty TNHH An Tín Shipping', address: '69/21 Trần Đình Xu,Phường Cầu Kho,Quận 1,TP.Hồ Chí Minh', httt: 'THU SAU', paymentTypeId: 'CRE' },
  { id: 5, code: '0314317745', mst: '0314317745', name: 'Công ty TNHH T&P Logistics', address: '9-11 Đường D52, Phường 12, Quận Tân Bình, TPHCM', httt: 'THU SAU', paymentTypeId: 'CRE' },
  { id: 6, code: '0314318259', mst: '0314318259', name: 'Công Ty TNHH Thương Mại Dịch Vụ Xuất Nhập Khẩu Việt Liên Minh', address: '128/10 Trần Kế Xương Phường 7 Quận Phú Nhuận TP Hồ Chí Minh', httt: 'THU SAU', paymentTypeId: 'CRE' },
];

const CustomerSearchModal: React.FC<CustomerSearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSelect = () => {
    if (selectedId) {
      const customer = mockCustomers.find(c => c.id === selectedId);
      if (customer) {
        onSelect(customer);
      }
    }
  };

  const filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.mst.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-custom shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <h2 className="text-lg font-bold text-blue-600">Chọn chủ hàng</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-custom transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Search & Stats */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2 w-full max-w-md">
            <label className="text-[13px] text-slate-600 whitespace-nowrap">Tìm:</label>
            <div className="relative flex-1">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div className="text-[13px] text-slate-600">
            Số dòng: {filteredCustomers.length.toLocaleString()}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-slate-50 p-4">
          <div className="bg-white border border-slate-200 rounded-custom overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-[#e6f0f9] text-[12px] text-slate-700 border-b border-slate-200">
                  <th className="p-2.5 font-bold border-r border-slate-200 w-16 text-center">STT</th>
                  <th className="p-2.5 font-bold border-r border-slate-200">Mã ĐT</th>
                  <th className="p-2.5 font-bold border-r border-slate-200">MST</th>
                  <th className="p-2.5 font-bold border-r border-slate-200">Tên</th>
                  <th className="p-2.5 font-bold border-r border-slate-200">Địa Chỉ</th>
                  <th className="p-2.5 font-bold border-r border-slate-200">
                    <div className="flex items-center justify-between">
                      HTTT
                      <div className="flex flex-col ml-2">
                        <span className="text-[8px] leading-[4px] text-slate-400">▲</span>
                        <span className="text-[8px] leading-[4px] text-slate-400">▼</span>
                      </div>
                    </div>
                  </th>
                  <th className="p-2.5 font-bold">
                    <div className="flex items-center justify-between">
                      PaymentTypeID
                      <div className="flex flex-col ml-2">
                        <span className="text-[8px] leading-[4px] text-slate-400">▲</span>
                        <span className="text-[8px] leading-[4px] text-slate-400">▼</span>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr 
                    key={customer.id} 
                    onClick={() => setSelectedId(customer.id)}
                    className={`text-[13px] border-b border-slate-100 cursor-pointer transition-colors ${selectedId === customer.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                  >
                    <td className="p-2.5 border-r border-slate-200 text-center text-slate-500">{index + 1}</td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-700">{customer.code}</td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-700">{customer.mst}</td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-800 font-medium whitespace-normal min-w-[250px]">{customer.name}</td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-600 whitespace-normal min-w-[300px]" title={customer.address}>{customer.address}</td>
                    <td className="p-2.5 border-r border-slate-200 text-slate-700">{customer.httt}</td>
                    <td className="p-2.5 text-slate-700">{customer.paymentTypeId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <button className="flex items-center gap-2 px-4 py-1.5 text-[13px] text-emerald-600 border border-emerald-200 hover:bg-emerald-50 rounded-custom transition-all">
            <Plus size={16} />
            Thêm khách hàng
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSelect}
              disabled={!selectedId}
              className={`flex items-center gap-2 px-6 py-1.5 text-[13px] border rounded-custom transition-all ${selectedId ? 'text-blue-600 border-blue-600 hover:bg-blue-50' : 'text-slate-400 border-slate-200 cursor-not-allowed'}`}
            >
              <Check size={16} />
              Chọn
            </button>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-1.5 text-[13px] text-slate-600 border border-slate-300 hover:bg-slate-50 rounded-custom transition-all"
            >
              <X size={16} />
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSearchModal;
