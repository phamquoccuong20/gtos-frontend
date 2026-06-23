import React from 'react';

interface ManifestRow {
  id: number;
  stt: number;
  bl?: string;
  mark?: string;
  consignee?: string;
  cargoType?: string;
  unit?: string;
  qty?: string;
  pcs?: string;
  weight?: string;
  avg?: string;
  hold?: string;
  domesticForeign?: string;
  pol?: string;
  pod?: string;
  fpod?: string;
  type?: string;
  note?: string;
}

interface ManifestTableProps {
  rows: ManifestRow[];
  vesselType: 'Nhập tàu' | 'Xuất tàu';
  onInputChange: (id: number, field: string, value: string) => void;
}

export const ManifestTable: React.FC<ManifestTableProps> = ({ rows, vesselType, onInputChange }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-custom overflow-auto shadow-sm h-full custom-scrollbar">
      <table className="w-full border-collapse text-[12px] min-w-[1800px]">
        <thead className="sticky top-0 z-10">
          <tr className="bg-slate-200/80 backdrop-blur-sm">
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-center w-12 whitespace-nowrap">STT</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left min-w-[120px] whitespace-nowrap">
              {vesselType === 'Nhập tàu' ? 'SỐ VẬN ĐƠN' : 'SỐ TỜ KHAI'}
            </th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left min-w-[100px] whitespace-nowrap">MÃ KÝ HIỆU</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left min-w-[150px] whitespace-nowrap">CHỦ HÀNG</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left min-w-[100px] whitespace-nowrap">LOẠI HÀNG</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left min-w-[100px] whitespace-nowrap">ĐƠN VỊ TÍNH</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-right w-20 whitespace-nowrap">KIỆN</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-right w-20 whitespace-nowrap">PCS</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-right w-24 whitespace-nowrap">TRỌNG LƯỢNG (TẤN)</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-right w-24 whitespace-nowrap">TRUNG BÌNH</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left w-20 whitespace-nowrap">HẦM</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left min-w-[100px] whitespace-nowrap">NỘI/NGOẠI</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left w-20 whitespace-nowrap">POL</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left w-20 whitespace-nowrap">POD</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left w-20 whitespace-nowrap">FPOD</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left min-w-[100px] whitespace-nowrap">LOẠI HÌNH</th>
            <th className="p-2 border border-slate-300 text-slate-700 font-black uppercase text-left min-w-[150px] whitespace-nowrap">GHI CHÚ</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr key={row.id} className="bg-white hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                <td className="p-2 border-r border-slate-200 text-center text-slate-600">{row.stt}</td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.bl || ''} 
                    onChange={(e) => onInputChange(row.id, 'bl', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.mark || ''} 
                    onChange={(e) => onInputChange(row.id, 'mark', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.consignee || ''} 
                    onChange={(e) => onInputChange(row.id, 'consignee', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.cargoType || ''} 
                    onChange={(e) => onInputChange(row.id, 'cargoType', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.unit || ''} 
                    onChange={(e) => onInputChange(row.id, 'unit', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.qty || ''} 
                    onChange={(e) => onInputChange(row.id, 'qty', e.target.value)}
                    className="w-full bg-transparent outline-none text-right" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.pcs || ''} 
                    onChange={(e) => onInputChange(row.id, 'pcs', e.target.value)}
                    className="w-full bg-transparent outline-none text-right" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.weight || ''} 
                    onChange={(e) => onInputChange(row.id, 'weight', e.target.value)}
                    className="w-full bg-transparent outline-none text-right" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.avg || ''} 
                    onChange={(e) => onInputChange(row.id, 'avg', e.target.value)}
                    className="w-full bg-transparent outline-none text-right" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.hold || ''} 
                    onChange={(e) => onInputChange(row.id, 'hold', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.domesticForeign || ''} 
                    onChange={(e) => onInputChange(row.id, 'domesticForeign', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.pol || ''} 
                    onChange={(e) => onInputChange(row.id, 'pol', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.pod || ''} 
                    onChange={(e) => onInputChange(row.id, 'pod', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.fpod || ''} 
                    onChange={(e) => onInputChange(row.id, 'fpod', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2 border-r border-slate-200">
                  <input 
                    type="text" 
                    value={row.type || ''} 
                    onChange={(e) => onInputChange(row.id, 'type', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="text" 
                    value={row.note || ''} 
                    onChange={(e) => onInputChange(row.id, 'note', e.target.value)}
                    className="w-full bg-transparent outline-none" 
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white hover:bg-blue-50/30 transition-colors">
              <td colSpan={17} className="p-12 text-center text-slate-400 italic font-medium">
                ----------- Không có dữ liệu hiển thị -----------
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManifestTable;
