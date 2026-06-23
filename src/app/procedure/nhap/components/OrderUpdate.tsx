import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  X, 
  Save, 
  Calendar
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import VesselSelectionModal, { SelectionVessel } from './modals/VesselSelectionModal';
import OrderUpdateTable from './tables/OrderUpdateTable';

interface OrderUpdateProps {
  onBack: () => void;
}

const ALL_MOCK_DATA = [
  {
    stt: 1,
    soLenh: '2602280003',
    phuongAn: 'GIAO THẲNG',
    ngayTao: '11/03/2026 00:00:00',
    ngayHoanTat: '28/02/2026 13:22:17',
    hanLenh: '28/02/2026 23:59:59',
    huong: 'Nhập',
    ptgn: '',
    loaiHang: 'Băng nóng',
    soLuong: 20,
    trongLuong: 20.0,
    noiNgoai: 'Ngoại',
    tauChuyen: 'NAU1 | 9999 | 9999',
    soVanDon: 'AA',
    soBooking: '',
    httt: 'Thu ngay',
    soHoaDon: '',
    ngayHoaDon: '',
    soPhieuTinhCuoc: 'TTP260228000003',
    maBieuCuoc: '',
    soTien: '',
    nguoiThanhToan: '0314315681',
    chuHang: 'Công Ty Cổ Phần Giao Nhận Vận Tải Cát Lái',
    nguoiTao: 'admin',
    sdt: '',
    ghiChu: ''
  },
  {
    stt: 2,
    soLenh: '2602260004',
    phuongAn: 'GIAO THẲNG',
    ngayTao: '26/02/2026 17:22:29',
    ngayHoanTat: '26/02/2026 17:22:36',
    hanLenh: '26/02/2026 23:59:59',
    huong: 'Nhập',
    ptgn: '',
    loaiHang: 'Băng nóng',
    soLuong: 20,
    trongLuong: 45.0,
    noiNgoai: 'Ngoại',
    tauChuyen: 'NAU1 | 9999 | 9999',
    soVanDon: '2602-01',
    soBooking: '',
    httt: 'Thu ngay',
    soHoaDon: '',
    ngayHoaDon: '',
    soPhieuTinhCuoc: 'TTP260226000004',
    maBieuCuoc: '',
    soTien: '',
    nguoiThanhToan: '0314315681',
    chuHang: 'Công Ty TNHH Thương Mại Dịch Vụ Xuất Nhập Khẩu Việt Liên Minh',
    nguoiTao: 'admin',
    sdt: '',
    ghiChu: ''
  },
  {
    stt: 3,
    soLenh: '2602260005',
    phuongAn: 'GIAO THẲNG',
    ngayTao: '26/02/2026 17:22:41',
    ngayHoanTat: '26/02/2026 17:23:42',
    hanLenh: '26/02/2026 23:59:59',
    huong: 'Nhập',
    ptgn: '',
    loaiHang: 'Băng nóng',
    soLuong: 20,
    trongLuong: 40.0,
    noiNgoai: 'Ngoại',
    tauChuyen: 'HOANG DUY 03 | 9999 | 9999',
    soVanDon: '2602-02',
    soBooking: '',
    httt: 'Thu ngay',
    soHoaDon: '',
    ngayHoaDon: '',
    soPhieuTinhCuoc: 'TTP260226000005',
    maBieuCuoc: '',
    soTien: '',
    nguoiThanhToan: '0314317745',
    chuHang: 'Công Ty TNHH Thương Mại Dịch Vụ Xuất Nhập Khẩu Việt Liên Minh',
    nguoiTao: 'admin',
    sdt: '',
    ghiChu: ''
  },
  {
    stt: 4,
    soLenh: '2602270003',
    phuongAn: 'GIAO THẲNG',
    ngayTao: '27/02/2026 17:07:58',
    ngayHoanTat: '27/02/2026 17:08:12',
    hanLenh: '27/02/2026 23:59:59',
    huong: 'Nhập',
    ptgn: '',
    loaiHang: 'Đường rây',
    soLuong: 10,
    trongLuong: 30.0,
    noiNgoai: 'Ngoại',
    tauChuyen: 'STAR TYCHE | 2555 | 2555',
    soVanDon: '2602-03',
    soBooking: '',
    httt: 'Thu ngay',
    soHoaDon: '',
    ngayHoaDon: '',
    soPhieuTinhCuoc: 'TTP260227000003',
    maBieuCuoc: '',
    soTien: '',
    nguoiThanhToan: '0302456789',
    chuHang: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam',
    nguoiTao: 'admin',
    sdt: '',
    ghiChu: ''
  }
];

const OrderUpdate: React.FC<OrderUpdateProps> = ({ onBack }) => {
  const [operation, setOperation] = useState<'NÂNG HẠ' | 'DỊCH VỤ'>('NÂNG HẠ');
  const [isCommonService, setIsCommonService] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState<SelectionVessel | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(new Date(2026, 1, 26, 0, 0, 0));
  const [toDate, setToDate] = useState<Date | null>(new Date(2026, 2, 4, 23, 59, 59));
  const [isLoading, setIsLoading] = useState(false);

  const parseDateStr = (dateStr: string) => {
    try {
      const [datePart, timePart] = dateStr.split(' ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);
      const date = new Date(year, month - 1, day, hour, minute, second);
      return isNaN(date.getTime()) ? 0 : date.getTime();
    } catch (e) {
      return 0;
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  const tableData = ALL_MOCK_DATA.filter(item => {
    // Vessel filter
    if (selectedVessel && !item.tauChuyen.toLowerCase().includes(selectedVessel.name.toLowerCase())) {
      return false;
    }
    
    // Date filter
    const itemTime = parseDateStr(item.ngayTao);
    const startTime = fromDate ? fromDate.getTime() : 0;
    const endTime = toDate ? toDate.getTime() : Infinity;
    if (itemTime < startTime || itemTime > endTime) {
      return false;
    }

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchSearch = item.soLenh.toLowerCase().includes(term) ||
        item.soVanDon.toLowerCase().includes(term) ||
        item.soBooking.toLowerCase().includes(term) ||
        item.chuHang.toLowerCase().includes(term) ||
        item.soPhieuTinhCuoc.toLowerCase().includes(term);
      if (!matchSearch) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="border-b border-gray-200 p-[14px] flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-custom transition-all text-slate-600"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-black text-[#1e293b] uppercase tracking-tight">
            Cập nhật thông tin lệnh
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-custom text-[12px] font-bold transition-all shadow-sm">
            <Save size={16} />
            Lưu dữ liệu
          </button>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#f59e0b] text-[#f59e0b] hover:bg-amber-50 rounded-custom text-[12px] font-bold transition-all shadow-sm"
          >
            <Search size={16} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Đang nạp...' : 'Nạp dữ liệu'}
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-[14px] border-b border-gray-100 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Inputs */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-[12px] font-bold text-slate-500 w-24 shrink-0">Tàu/chuyến</label>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={selectedVessel ? `${selectedVessel.name} | ${selectedVessel.inboundVoyage} | ${selectedVessel.outboundVoyage} | ${selectedVessel.atb}` : ''}
                  readOnly
                  placeholder="Chọn tàu chuyến"
                  className="w-full pl-3 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-custom text-[13px] focus:outline-none"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button 
                    onClick={() => setIsVesselModalOpen(true)}
                    className="p-1 text-amber-500 hover:bg-amber-50 rounded transition-colors"
                  >
                    <Search size={14} />
                  </button>
                  <button 
                    onClick={() => setSelectedVessel(null)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-[12px] font-bold text-slate-500 w-24 shrink-0">Tìm kiếm</label>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Số lệnh, số PIN, số Bill, số Booking"
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-[12px] font-bold text-slate-500 w-24 shrink-0">Ngày tạo lệnh</label>
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1">
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm:ss"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholderText="Từ ngày"
                    portalId="root-portal"
                  />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <span className="text-slate-400">~</span>
                <div className="relative flex-1">
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm:ss"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-custom text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholderText="Đến ngày"
                    portalId="root-portal"
                  />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Options */}
          <div className="flex items-start gap-4 flex-1">
            <div className="space-y-4 min-w-[200px]">
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-bold text-slate-500 w-20 shrink-0">Tác nghiệp</span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      onClick={() => setOperation('NÂNG HẠ')}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${operation === 'NÂNG HẠ' ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300'}`}
                    >
                      {operation === 'NÂNG HẠ' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-[12px] font-bold text-slate-700">NÂNG HẠ</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      onClick={() => setOperation('DỊCH VỤ')}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${operation === 'DỊCH VỤ' ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300'}`}
                    >
                      {operation === 'DỊCH VỤ' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-[12px] font-bold text-slate-700">DỊCH VỤ</span>
                  </label>
                </div>
              </div>

              {operation === 'NÂNG HẠ' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="ha-hang-ou" className="w-4 h-4 border-slate-300 rounded text-cyan-500 focus:ring-cyan-500" />
                    <label htmlFor="ha-hang-ou" className="text-[12px] font-bold text-slate-600 cursor-pointer">Hạ hàng</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="lay-hang-ou" className="w-4 h-4 border-slate-300 rounded text-cyan-500 focus:ring-cyan-500" />
                    <label htmlFor="lay-hang-ou" className="text-[12px] font-bold text-slate-600 cursor-pointer">Lấy hàng</label>
                  </div>
                </div>
              )}
            </div>

            {operation === 'DỊCH VỤ' && (
              <div className="flex items-center gap-3 pt-8 md:pt-10">
                <input 
                  type="checkbox" 
                  id="dich-vu-thong-thuong-ou" 
                  checked={isCommonService}
                  onChange={(e) => setIsCommonService(e.checked)}
                  className="w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" 
                />
                <label htmlFor="dich-vu-thong-thuong-ou" className="text-[12px] font-bold text-slate-600 cursor-pointer">
                  Dịch vụ thông thường
                </label>
              </div>
            )}

            {operation === 'NÂNG HẠ' && (
              <div className="space-y-4 pt-8 md:pt-10">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="xuat-giao-thang-ou" className="w-4 h-4 border-slate-300 rounded text-cyan-500 focus:ring-cyan-500" />
                  <label htmlFor="xuat-giao-thang-ou" className="text-[12px] font-bold text-slate-600 cursor-pointer">Xuất giao thẳng</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="nhap-giao-thang-ou" className="w-4 h-4 border-slate-300 rounded text-cyan-500 focus:ring-cyan-500" />
                  <label htmlFor="nhap-giao-thang-ou" className="text-[12px] font-bold text-slate-600 cursor-pointer">Nhập giao thẳng</label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-hidden bg-slate-50 p-[14px] flex flex-col gap-3">
        <OrderUpdateTable 
          tableData={tableData}
          isLoading={isLoading}
          selectedVessel={selectedVessel}
        />
      </div>

      <VesselSelectionModal 
        isOpen={isVesselModalOpen}
        onClose={() => setIsVesselModalOpen(false)}
        onSelect={(vessel) => setSelectedVessel(vessel)}
      />
    </div>
  );
};

export default OrderUpdate;
