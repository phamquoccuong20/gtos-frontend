import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  ChevronLeft,
  ChevronDown,
  X,
  Calendar,
  FileText,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Save
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import VesselSelectionModal, { SelectionVessel } from './modals/VesselSelectionModal';
import PaymentObjectModal, { PaymentObject } from './modals/PaymentObjectModal';
import SuccessModal from './modals/SuccessModal';
import DeliveryOrderTable from './tables/DeliveryOrderTable';

interface DeliveryOrderProps {
  onBack: () => void;
}

const MOCK_MANIFEST_DATA: Record<string, string[]> = {
  'HOANG DUY 03': ['STK00000001', 'STK00000002', 'STK00000003'],
  'STAR TYCHE': ['STK11111111', 'STK22222222'],
  'VINHCEH': ['STK00000000', 'STK0334487271', 'STK04203183201', 'STK04203183333', 'SĐT0334487271'],
  'VIET THUAN 095-02': ['STK99999999'],
  'NAU2': ['STK88888888'],
  'NAU1': ['STK77777777'],
};

const MOCK_BL_DETAILS: Record<string, { consignee: string }> = {
  'STK00000000': { consignee: 'CÔNG TY TNHH THÉP HÒA PHÁT DUNG QUẤT' },
  'STK0334487271': { consignee: 'TỔNG CÔNG TY TÂN CẢNG SÀI GÒN' },
  'STK04203183201': { consignee: 'CÔNG TY CP CẢNG ĐÀ NẴNG' },
  'STK04203183333': { consignee: 'CÔNG TY TNHH SAMSUNG ELECTRONICS VIỆT NAM' },
  'SĐT0334487271': { consignee: 'CÔNG TY CP LOGISTICS VINALINK' },
  'STK00000001': { consignee: 'CÔNG TY CP THÉP VIỆT Ý' },
  'STK11111111': { consignee: 'CÔNG TY TNHH VẬN TẢI BIỂN MAERSK VIỆT NAM' },
};

const DeliveryOrder: React.FC<DeliveryOrderProps> = ({ onBack }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [rows, setRows] = useState<any[]>([]);
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [selectedVessel, setSelectedVessel] = useState<SelectionVessel | null>(null);
  const [selectedPaymentObject, setSelectedPaymentObject] = useState<{ ten: string; mst: string } | null>(null);
  const [billOfLadings, setBillOfLadings] = useState<string[]>([]);
  const [selectedBL, setSelectedBL] = useState('');
  const [selectedConsignee, setSelectedConsignee] = useState('');
  const [isBLDropdownOpen, setIsBLDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Chọn dịch vụ');
  const [expiryDate, setExpiryDate] = useState<Date | null>(new Date(2026, 2, 3, 23, 59, 59));
  const [orderNo, setOrderNo] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [orderSequence, setOrderSequence] = useState(6);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString('vi-VN'));
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('vi-VN'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedVessel) {
      const bls = MOCK_MANIFEST_DATA[selectedVessel.name] || [];
      setBillOfLadings(bls);
      setSelectedBL(''); 
      setSelectedConsignee('');
    } else {
      setBillOfLadings([]);
      setSelectedBL('');
      setSelectedConsignee('');
    }
  }, [selectedVessel]);

  useEffect(() => {
    if (selectedBL && MOCK_BL_DETAILS[selectedBL]) {
      setSelectedConsignee(MOCK_BL_DETAILS[selectedBL].consignee);
      setRows([
        {
          stt: 1,
          bl: selectedBL,
          mark: 'N/M',
          goods: 'THÉP CUỘN CÁC LOẠI',
          qty_manifest: 150,
          weight_manifest: 3500.50,
          qty_actual: 150,
          weight_actual: 3500.50,
          unit: 'CUỘN',
          type: 'NHẬP KHẨU',
          method_in: 'GIAO THẲNG',
          method_handling: 'CẨU TÀU'
        }
      ]);
    } else {
      setSelectedConsignee('');
      setRows([]);
    }
  }, [selectedBL]);

  const handleReset = () => {
    setSelectedVessel(null);
    setSelectedPaymentObject(null);
    setSelectedBL('');
    setSelectedConsignee('');
    setSelectedService('Chọn dịch vụ');
    setRows([]);
    setBillOfLadings([]);
    setIsSuccessModalOpen(false);
    setShowToast(false);
  };

  const handleSave = () => {
    if (!selectedVessel) {
      setToastMessage('Vui lòng chọn tàu chuyến');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    if (!selectedBL) {
      setToastMessage('Vui lòng chọn số vận đơn');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const now = new Date();
    const yy = now.getFullYear().toString().slice(-2);
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const dd = now.getDate().toString().padStart(2, '0');
    const datePart = `${yy}${mm}${dd}`;
    const newOrderNo = `${datePart}000${orderSequence}`;
    
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newPinCode = `TTP${datePart}${randomSuffix}`;

    setOrderNo(newOrderNo);
    setPinCode(newPinCode);
    setOrderSequence(prev => prev + 1);
    setIsSuccessModalOpen(true);
    setToastMessage('Lưu thành công');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
      {/* Vessel Selection Modal */}
      <VesselSelectionModal 
        isOpen={isVesselModalOpen}
        onClose={() => setIsVesselModalOpen(false)}
        onSelect={(vessel) => setSelectedVessel(vessel)}
      />

      {/* Payment Object Modal */}
      <PaymentObjectModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelect={(obj) => setSelectedPaymentObject({ ten: obj.ten, mst: obj.mst })}
      />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        pinCode={pinCode}
        orderNo={orderNo}
        onNewOrder={handleReset}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-[300] ${toastType === 'success' ? 'bg-emerald-500' : 'bg-rose-500'} text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-right-full duration-300`}>
          {toastType === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="border-b border-gray-200 p-[14px] flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-custom transition-all text-slate-600"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
            Lệnh giao hàng
          </h2>
        </div>
      </div>

      {/* Form Section 1 */}
      <div className="p-[14px] border-b border-gray-100 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-4">
          {/* Left Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Ngày lệnh</label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={currentTime}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none"
                />
                <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Hạn lệnh</label>
              <div className="relative flex-1">
                <DatePicker
                  selected={expiryDate}
                  onChange={(date: Date | null) => setExpiryDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm:ss"
                  timeIntervals={15}
                  dateFormat="HH:mm:ss dd/MM/yyyy"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  portalId="root-portal"
                />
                <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 min-w-[100px]">
                <input type="checkbox" id="salan-do" className="rounded-custom border-slate-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="salan-do" className="text-[12px] font-bold text-slate-500">Sà lan</label>
              </div>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Mã/Năm/Chuyến"
                  className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-blue-500" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Đính kèm dịch vụ</label>
              <div className="relative flex-1">
                <div 
                  onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer flex justify-between items-center"
                >
                  <span className={selectedService === 'Chọn dịch vụ' ? 'text-slate-400' : 'text-slate-700'}>
                    {selectedService}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>
                
                {isServiceDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsServiceDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-custom shadow-lg z-20 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div 
                        onClick={() => {
                          setSelectedService('Chọn tất cả');
                          setIsServiceDropdownOpen(false);
                        }}
                        className="px-3 py-2 text-[13px] hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-50"
                      >
                        Chọn tất cả
                      </div>
                      <div 
                        onClick={() => {
                          setSelectedService('Cân Hàng');
                          setIsServiceDropdownOpen(false);
                        }}
                        className="px-3 py-2 text-[13px] hover:bg-blue-50 cursor-pointer transition-colors"
                      >
                        Cân Hàng
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Tàu/chuyến *</label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Tàu/chuyến"
                  value={selectedVessel ? `${selectedVessel.name} / ${selectedVessel.inboundVoyage}` : ''}
                  readOnly
                  onClick={() => setIsVesselModalOpen(true)}
                  className="w-full pl-3 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400 border-l border-slate-200 pl-2">
                  <Search 
                    size={14} 
                    className="cursor-pointer hover:text-blue-500" 
                    onClick={() => setIsVesselModalOpen(true)}
                  />
                  <X 
                    size={14} 
                    className="cursor-pointer hover:text-rose-500" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVessel(null);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Số vận đơn</label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Số vận đơn"
                  value={selectedBL}
                  onChange={(e) => setSelectedBL(e.target.value)}
                  onFocus={() => setIsBLDropdownOpen(true)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {isBLDropdownOpen && billOfLadings.length > 0 && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsBLDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-custom shadow-lg z-20 max-h-[200px] overflow-auto animate-in fade-in slide-in-from-top-1 duration-200">
                      {billOfLadings.map((bl) => (
                        <div 
                          key={bl}
                          onClick={() => {
                            setSelectedBL(bl);
                            setIsBLDropdownOpen(false);
                          }}
                          className="px-3 py-2 text-[13px] hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                        >
                          {bl}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Chủ hàng</label>
              <input 
                type="text" 
                placeholder="Chủ hàng"
                value={selectedConsignee}
                onChange={(e) => setSelectedConsignee(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Chứng từ giao</label>
              <input 
                type="text" 
                placeholder="Chứng từ giao"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Ngày giới thiệu</label>
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={currentTime}
                    readOnly
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <input type="checkbox" id="baikho-do" defaultChecked className="rounded-custom border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="baikho-do" className="text-[12px] font-bold text-slate-500">Bãi/Kho hàng</label>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Giấy giới thiệu</label>
              <input 
                type="text" 
                placeholder="Giấy giới thiệu"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Đại diện</label>
              <div className="flex gap-2 flex-1">
                <input 
                  type="text" 
                  placeholder="CMND/ĐT"
                  className="w-1/3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Họ tên"
                  className="w-1/3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Email *"
                  className="w-1/3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Ghi chú</label>
              <textarea 
                placeholder="Ghi chú"
                rows={1}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="p-[14px] border-b border-gray-100 bg-slate-50/30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Đối tượng TT *</label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Đối tượng thanh toán"
                  value={selectedPaymentObject ? selectedPaymentObject.ten : ''}
                  readOnly
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full pl-3 pr-10 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                />
                <Search 
                  size={14} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-blue-500" 
                  onClick={() => setIsPaymentModalOpen(true)}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0 min-w-[100px]">Hình thức TT *</label>
              <select className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer">
                <option>Thu Sau</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 col-span-2">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0">Số Hợp Đồng *</label>
                <select className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer">
                  <option value="">Chọn hợp đồng</option>
                  <option value="HD001">HD001/2024 - Cảng Tân Thuận</option>
                  <option value="HD002">HD002/2024 - Cảng Sài Gòn</option>
                </select>
              </div>
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <label className="text-[12px] font-bold text-slate-500 whitespace-nowrap shrink-0">Đơn vị tính</label>
                <select className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer">
                  <option>Số lượng</option>
                  <option>Trọng lượng</option>
                  <option>Thể tích</option>
                </select>
              </div>
              <div className="flex items-center gap-4 px-4 py-2 bg-white border border-slate-200 rounded-custom">
                <div className="flex items-center gap-2">
                  <input type="radio" id="khaibao-do" name="type-do" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="khaibao-do" className="text-[12px] font-bold text-slate-500">Khai Báo</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="thucte-do" name="type-do" className="text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="thucte-do" className="text-[12px] font-bold text-slate-500">Thực Tế</label>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8 text-[12px] font-medium text-slate-400 italic">
              <div className="flex items-center gap-2">
                <FileText size={14} />
                <span>- {selectedPaymentObject ? selectedPaymentObject.ten : '[Tên đối tượng thanh toán]'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar 1 */}
      <div className="p-[14px] flex items-center justify-between bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setRows([])}
            className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold text-rose-500 border border-rose-200 hover:bg-rose-50 rounded-custom transition-all"
          >
            <Trash2 size={14} />
            Xóa dòng
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-custom transition-all"
          >
            <PlusCircle size={14} />
            Làm mới
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold bg-indigo-600 text-white hover:bg-indigo-700 rounded-custom shadow-sm transition-all">
            <FileText size={14} />
            Xem lệnh
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-custom shadow-sm transition-all"
          >
            <Save size={14} />
            Lưu thu sau
          </button>
        </div>
      </div>

      {/* Action Bar 2 (Search & Selection) */}
      <div className="p-[14px] flex items-center justify-between bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 flex-1">
          <label className="text-[12px] font-bold text-slate-500">Tìm:</label>
          <div className="relative max-w-[300px] flex-1">
            <input 
              type="text" 
              placeholder="Tìm kiếm dòng hàng..."
              className="w-full pl-3 pr-10 py-1.5 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[12px] font-bold text-slate-500">
            Số dòng: <span className="text-blue-600">{rows.length}</span>
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-[11px] font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-custom transition-all flex items-center gap-2 shadow-sm">
              <CheckCircle2 size={12} className="text-emerald-500" />
              Chọn tất cả
            </button>
            <button 
              disabled={rows.length === 0}
              className={`px-3 py-1.5 text-[11px] font-bold border rounded-custom flex items-center gap-2 shadow-sm ${
                rows.length > 0 
                  ? 'text-slate-600 bg-white border-slate-200 hover:bg-slate-50 cursor-pointer' 
                  : 'text-slate-400 bg-slate-50 border-slate-100 cursor-not-allowed'
              }`}
            >
              <X size={12} />
              Bỏ chọn
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-hidden bg-slate-50 p-[14px]">
        <DeliveryOrderTable rows={rows} />
      </div>
    </div>
  );
};

export default DeliveryOrder;
