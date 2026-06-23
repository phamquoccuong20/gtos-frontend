import React from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface OrderUpdateRow {
  stt: number;
  soLenh: string;
  phuongAn: string;
  ngayTao: string;
  ngayHoanTat: string;
  hanLenh: string;
  huong: string;
  ptgn: string;
  loaiHang: string;
  soLuong: number;
  trongLuong: number;
  noiNgoai: string;
  tauChuyen: string;
  soVanDon: string;
  soBooking: string;
  httt: string;
  soHoaDon: string;
  ngayHoaDon: string;
  soPhieuTinhCuoc: string;
  maBieuCuoc: string;
  soTien: string;
  nguoiThanhToan: string;
  chuHang: string;
  nguoiTao: string;
  sdt: string;
  ghiChu: string;
}

interface OrderUpdateTableProps {
  tableData: OrderUpdateRow[];
  isLoading: boolean;
  selectedVessel: any;
}

export const OrderUpdateTable: React.FC<OrderUpdateTableProps> = ({ tableData, isLoading, selectedVessel }) => {
  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-custom overflow-auto shadow-sm custom-scrollbar">
      <table className="w-full border-collapse text-[11px] min-w-[3000px]">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gradient-to-b from-[#f8fafc] to-[#cbd5e1] border-b border-slate-300">
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-center w-12 whitespace-nowrap">
              <div className="flex items-center justify-center gap-1">
                STT <ChevronDown size={10} className="text-blue-400" />
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Số lệnh <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[120px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Phương án <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[140px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Ngày tạo lệnh <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[140px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Ngày hoàn tất <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[140px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Hạn lệnh <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[80px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Hướng <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[80px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                PTGN <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Loại hàng <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-right min-w-[80px] whitespace-nowrap">
              <div className="flex items-center justify-end gap-1">
                Số lượng <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-right min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-end gap-1">
                Trọng lượng <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Nội/ngoại <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[150px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Tàu/chuyến <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[120px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Số vận đơn <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[120px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Số booking <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                HTTT <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[120px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Số hóa đơn <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[120px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Ngày hóa đơn <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[150px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Số phiếu tính cước <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[120px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Mã biểu cước <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-right min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-end gap-1">
                Số tiền <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[150px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Người thanh toán <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[250px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Chủ hàng <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Người tạo <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[180px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Số điện thoại/CMND <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[150px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Ghi chú <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={26} className="p-12 text-center bg-slate-50/30">
                <div className="flex flex-col items-center justify-center gap-3 text-blue-500">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                  <p className="text-[14px] font-medium">Đang tải dữ liệu...</p>
                </div>
              </td>
            </tr>
          ) : tableData.length > 0 ? (
            tableData.map((row, index) => (
              <tr key={index} className="bg-white hover:bg-blue-50/30 transition-colors border-b border-slate-100 last:border-0">
                <td className="p-2 border-r border-slate-200 text-center text-slate-600">{row.stt}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.soLenh}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.phuongAn}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.ngayTao}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.ngayHoanTat}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.hanLenh}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.huong}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.ptgn}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.loaiHang}</td>
                <td className="p-2 border-r border-slate-200 text-right text-slate-600">{row.soLuong}</td>
                <td className="p-2 border-r border-slate-200 text-right text-slate-600 font-medium">{row.trongLuong.toFixed(3)}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.noiNgoai}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.tauChuyen}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.soVanDon}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.soBooking}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.httt}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.soHoaDon}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.ngayHoaDon}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.soPhieuTinhCuoc}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.maBieuCuoc}</td>
                <td className="p-2 border-r border-slate-200 text-right text-slate-600">{row.soTien}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.nguoiThanhToan}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.chuHang}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.nguoiTao}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.sdt}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.ghiChu}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={26} className="p-12 text-center bg-slate-50/30">
                <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                  <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100">
                    <Search size={32} className="opacity-20" />
                  </div>
                  <p className="text-[14px] font-medium">
                    {!selectedVessel ? 'Vui lòng chọn tàu chuyến để hiển thị dữ liệu' : 'Không có dữ liệu'}
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderUpdateTable;
