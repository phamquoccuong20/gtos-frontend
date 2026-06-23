import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface DeliveryOrderRow {
  stt: number;
  bl: string;
  mark: string;
  goods: string;
  qty_manifest: number;
  weight_manifest: number;
  qty_actual: number;
  weight_actual: number;
  unit: string;
  type: string;
  method_in: string;
  method_handling: string;
}

interface DeliveryOrderTableProps {
  rows: DeliveryOrderRow[];
}

export const DeliveryOrderTable: React.FC<DeliveryOrderTableProps> = ({ rows }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-custom overflow-auto shadow-sm h-full custom-scrollbar">
      <table className="w-full border-collapse text-[11px] min-w-[1200px]">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gradient-to-b from-[#f8fafc] to-[#cbd5e1] border-b border-slate-300">
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-center w-12 whitespace-nowrap">
              <div className="flex items-center justify-center gap-1">
                STT <ChevronLeft size={10} className="rotate-90 text-blue-400" />
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[120px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Số Vận Đơn <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Kí mã hiệu <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[150px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Hàng hóa <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-right w-32 whitespace-nowrap">
              <div className="flex items-center justify-end gap-1">
                Số lượng khai báo <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-right w-32 whitespace-nowrap">
              <div className="flex items-center justify-end gap-1">
                Trọng lượng khai báo <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-right w-32 whitespace-nowrap">
              <div className="flex items-center justify-end gap-1">
                Số lượng thực tế <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-right w-32 whitespace-nowrap">
              <div className="flex items-center justify-end gap-1">
                Trọng lượng thực tế <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left w-20 whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                ĐVT <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[100px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Loại hình <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[150px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Phương án vào <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
            <th className="p-2 border border-slate-300 text-blue-900 font-black uppercase text-left min-w-[180px] whitespace-nowrap">
              <div className="flex items-center justify-between gap-1">
                Phương án xếp dỡ vào <div className="flex flex-col opacity-40"><span className="text-[8px] leading-[4px]">▲</span><span className="text-[8px] leading-[4px]">▼</span></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={index} className="bg-white hover:bg-blue-50/30 transition-colors border-b border-slate-100 last:border-0">
                <td className="p-2 border-r border-slate-200 text-center text-slate-600">{row.stt}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.bl}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.mark}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600 font-medium">{row.goods}</td>
                <td className="p-2 border-r border-slate-200 text-right text-slate-600">{row.qty_manifest.toLocaleString()}</td>
                <td className="p-2 border-r border-slate-200 text-right text-slate-600 font-mono">{row.weight_manifest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="p-2 border-r border-slate-200 text-right text-slate-600">{row.qty_actual.toLocaleString()}</td>
                <td className="p-2 border-r border-slate-200 text-right text-slate-600 font-mono">{row.weight_actual.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.unit}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.type}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{row.method_in}</td>
                <td className="p-2 text-slate-600">{row.method_handling}</td>
              </tr>
            ))
          ) : (
            <tr className="bg-white hover:bg-blue-50/30 transition-colors">
              <td colSpan={12} className="p-12 text-center text-slate-400 italic font-medium">
                ----------- Không có dữ liệu hiển thị -----------
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryOrderTable;
