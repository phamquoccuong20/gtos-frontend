import React from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface MockOrder {
  orderNo: string;
  owner: string;
  vesselName: string;
  billQty: string;
  billWeight: string;
}

interface VehiclePlanRow {
  id: number;
  owner: string;
  orderNo: string;
  vehicleName: string;
  note: string;
  trailerNo?: string;
  weight?: string;
  driver?: string;
  contact?: string;
  billQty?: string;
  billWeight?: string;
  planQty?: string;
  planWeight?: string;
}

interface VehiclePlanTableProps {
  selectedVessel: any;
  transportType: 'Xe' | 'Sà lan';
  tableData: VehiclePlanRow[];
  selectedRows: Set<number>;
  toggleRowSelection: (id: number) => void;
  toggleAllSelection: () => void;
  handleInputChange: (id: number, field: string, value: string) => void;
  mockOrders: MockOrder[];
  onBargeSelectTrigger: (id: number) => void;
}

export const VehiclePlanTable: React.FC<VehiclePlanTableProps> = ({
  selectedVessel,
  transportType,
  tableData,
  selectedRows,
  toggleRowSelection,
  toggleAllSelection,
  handleInputChange,
  mockOrders,
  onBargeSelectTrigger
}) => {
  return (
    <div className="border border-slate-200 rounded-custom overflow-hidden shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#e2e8f0]">
            <th className="px-3 py-2.5 text-center text-[11px] font-bold text-slate-700 border-r border-slate-300 w-10">
              <input 
                type="checkbox" 
                checked={selectedRows.size === tableData.length && tableData.length > 0}
                onChange={toggleAllSelection}
                className="w-3.5 h-3.5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
              />
            </th>
            <th className="px-3 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300 w-12">
              <div className="flex items-center gap-1 whitespace-nowrap">STT <ChevronDown size={12} /></div>
            </th>
            <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
              <div className="flex items-center justify-between whitespace-nowrap">Chủ hàng <ChevronDown size={12} /></div>
            </th>
            <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
              <div className="flex items-center justify-between whitespace-nowrap">Lệnh giao hàng <ChevronDown size={12} /></div>
            </th>
            {transportType === 'Xe' ? (
              <>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">Tên phương tiện <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">Số Romooc <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">Tải trọng (KG) <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">Tên tài xế <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">CCCD/SĐT <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700">
                  <div className="flex items-center justify-between whitespace-nowrap">Ghi chú <ChevronDown size={12} /></div>
                </th>
              </>
            ) : (
              <>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">Số lượng theo Bill <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">Trọng lượng theo bill <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">Số lượng dự kiến <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 border-r border-slate-300">
                  <div className="flex items-center justify-between whitespace-nowrap">Trọng lượng dự kiến <ChevronDown size={12} /></div>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-700">
                  <div className="flex items-center justify-between whitespace-nowrap">Tên phương tiện <ChevronDown size={12} /></div>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {selectedVessel ? (
            tableData.length > 0 ? (
              tableData.map((row, idx) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                    selectedRows.has(row.id) ? 'bg-cyan-50/50' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'
                  }`}
                >
                  <td className="px-3 py-2 text-center border-r border-slate-200 w-10">
                    <input 
                      type="checkbox" 
                      checked={selectedRows.has(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-2 text-[12px] font-medium text-slate-700 border-r border-slate-200 uppercase">
                    <input 
                      type="text"
                      value={row.owner}
                      readOnly
                      className="w-full bg-transparent border-none focus:outline-none text-[12px] font-medium uppercase text-slate-400"
                      placeholder="Tự động"
                    />
                  </td>
                  <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                    <select 
                      value={row.orderNo}
                      onChange={(e) => handleInputChange(row.id, 'orderNo', e.target.value)}
                      className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center cursor-pointer"
                    >
                      <option value="">-- Chọn lệnh --</option>
                      {mockOrders
                        .filter(order => order.vesselName === selectedVessel.name)
                        .map(order => (
                          <option key={order.orderNo} value={order.orderNo}>
                            {order.orderNo}
                          </option>
                        ))
                      }
                    </select>
                  </td>
                  {transportType === 'Xe' ? (
                    <>
                      <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.vehicleName}
                          onChange={(e) => handleInputChange(row.id, 'vehicleName', e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center"
                        />
                      </td>
                      <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.trailerNo}
                          onChange={(e) => handleInputChange(row.id, 'trailerNo', e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center"
                        />
                      </td>
                      <td className="px-4 py-2 text-[12px] text-right text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.weight}
                          onChange={(e) => handleInputChange(row.id, 'weight', e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-right"
                        />
                      </td>
                      <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.driver}
                          onChange={(e) => handleInputChange(row.id, 'driver', e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center"
                        />
                      </td>
                      <td className="px-4 py-2 text-[12px] text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.contact}
                          onChange={(e) => handleInputChange(row.id, 'contact', e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none text-[12px]"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.billQty}
                          readOnly
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center text-slate-400"
                          placeholder="Tự động"
                        />
                      </td>
                      <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.billWeight}
                          readOnly
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center text-slate-400"
                          placeholder="Tự động"
                        />
                      </td>
                      <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.planQty}
                          onChange={(e) => handleInputChange(row.id, 'planQty', e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center"
                        />
                      </td>
                      <td className="px-4 py-2 text-[12px] text-center text-slate-600 border-r border-slate-200">
                        <input 
                          type="text"
                          value={row.planWeight}
                          onChange={(e) => handleInputChange(row.id, 'planWeight', e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center"
                        />
                      </td>
                      <td className="px-4 py-2 text-[12px] text-center text-slate-600">
                        <input 
                          type="text"
                          value={row.vehicleName}
                          readOnly
                          onClick={() => onBargeSelectTrigger(row.id)}
                          className="w-full bg-transparent border-none focus:outline-none text-[12px] text-center cursor-pointer hover:bg-slate-50"
                          placeholder="Chọn sà lan..."
                        />
                      </td>
                    </>
                  )}
                  {transportType === 'Xe' && (
                    <td className="px-4 py-2 text-[12px] text-slate-600">
                      <input 
                        type="text"
                        value={row.note}
                        onChange={(e) => handleInputChange(row.id, 'note', e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none text-[12px]"
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={transportType === 'Xe' ? 10 : 9} className="px-4 py-12 text-center bg-slate-50/30">
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                    <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100">
                      <div className="w-8 h-8 flex items-center justify-center border border-dashed border-slate-300 rounded text-slate-300 font-bold">+</div>
                    </div>
                    <p className="text-[14px] font-medium">Không có dữ liệu kế hoạch cho tàu này. Vui lòng thêm dòng mới.</p>
                  </div>
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={transportType === 'Xe' ? 10 : 9} className="px-4 py-12 text-center bg-slate-50/30">
                <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                  <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100">
                    <Search size={32} className="opacity-20" />
                  </div>
                  <p className="text-[14px] font-medium uppercase tracking-wider">Vui lòng chọn tàu chuyến để hiển thị dữ liệu</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehiclePlanTable;
