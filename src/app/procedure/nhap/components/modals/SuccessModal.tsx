import React from 'react';
import { Printer, AlertTriangle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  pinCode: string;
  orderNo: string;
  onNewOrder: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, pinCode, orderNo, onNewOrder }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header with Icon */}
        <div className="pt-8 pb-4 flex flex-col items-center border-b border-slate-50">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-amber-400 fill-amber-400" size={32} />
            <h3 className="text-2xl font-medium text-slate-700">Tạo lệnh thành công !</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center space-y-6">
          {/* QR Code Placeholder */}
          <div className="w-40 h-40 bg-white border-2 border-slate-100 p-2 rounded-lg shadow-sm">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderNo || 'TTP2603047868'}`} 
              alt="QR Code"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Details */}
          <div className="w-full space-y-3 text-sm">
            <div className="flex justify-between items-center px-4">
              <span className="text-slate-500 font-medium">PinCode :</span>
              <span className="text-slate-700 font-bold tracking-wider">{pinCode}</span>
            </div>
            <div className="flex justify-between items-center px-4">
              <span className="text-slate-500 font-medium">Số lệnh :</span>
              <span className="text-slate-700 font-bold tracking-wider">{orderNo}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-slate-50/50 flex justify-center gap-4">
          <button 
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white py-3 px-4 rounded-md font-bold text-sm transition-all shadow-sm uppercase"
          >
            <Printer size={18} />
            IN LỆNH (P)
          </button>
          <button 
            onClick={onNewOrder}
            className="flex-1 flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white py-3 px-4 rounded-md font-bold text-sm transition-all shadow-sm uppercase"
          >
            LÀM LỆNH MỚI
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
